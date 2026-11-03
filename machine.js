// Two small interactions on the machine page.
//
// 1. The useless machine: turn the switch on, an arm comes out and turns it off.
// 2. The game: five tries at clicking as soon as the pad turns green.

(function () {
  var machine = document.querySelector(".machine");
  var toggle = document.getElementById("machine-toggle");
  var machineStatus = document.getElementById("machine-status");

  if (machine && toggle && machineStatus) {
    var busy = false;

    var setSwitch = function (isOn) {
      toggle.setAttribute("aria-checked", isOn ? "true" : "false");
      toggle.querySelector(".switch__label").textContent = isOn ? "On" : "Off";
      machine.classList.toggle("is-on", isOn);
    };

    toggle.addEventListener("click", function () {
      if (busy) return;

      // If it is already on, the user switched it off themselves.
      if (toggle.getAttribute("aria-checked") === "true") {
        setSwitch(false);
        machineStatus.textContent =
          "Off again. The machine is disappointed but not surprised.";
        return;
      }

      busy = true;
      setSwitch(true);
      machineStatus.textContent = "On. Something is happening inside the box.";

      window.setTimeout(function () {
        machine.classList.add("is-reaching");
        machineStatus.textContent = "A hand is coming out.";

        window.setTimeout(function () {
          setSwitch(false);
          machineStatus.textContent = "The hand turned it off. It always does.";

          window.setTimeout(function () {
            machine.classList.remove("is-reaching");
            busy = false;
            machineStatus.textContent =
              "The machine is off. It would like to stay that way.";
          }, 850);
        }, 850);
      }, 450);
    });
  }

  var pad = document.getElementById("game-pad");
  var gameStatus = document.getElementById("game-status");
  var bestOut = document.getElementById("game-best");

  if (!pad || !gameStatus || !bestOut) return;

  var TRIES = 5;
  var done = 0;
  var best = null;
  var phase = "idle";
  var startedAt = 0;
  var timer = null;

  var setPhase = function (next) {
    phase = next;
    pad.className = "game__pad game__pad--" + next;
  };

  var waitForGreen = function () {
    setPhase("waiting");
    pad.textContent = "Wait…";
    gameStatus.textContent = "Wait for green.";

    var delay = 900 + Math.random() * 1600;

    timer = window.setTimeout(function () {
      setPhase("ready");
      pad.textContent = "CLICK";
      gameStatus.textContent = "Now.";
      startedAt = Date.now();
    }, delay);
  };

  pad.addEventListener("click", function () {
    if (phase === "waiting") {
      window.clearTimeout(timer);
      setPhase("idle");
      pad.textContent = "Too early — click to try again";
      gameStatus.textContent = "You clicked before green. That one does not count.";
      return;
    }

    if (phase === "ready") {
      var ms = Date.now() - startedAt;
      done++;

      if (best === null || ms < best) {
        best = ms;
        bestOut.textContent = best + " ms";
      }

      if (done >= TRIES) {
        setPhase("idle");
        pad.textContent = "Click to play again";
        gameStatus.textContent = "Done. Best of five: " + best + " ms.";
      } else {
        gameStatus.textContent = ms + " ms. " + (TRIES - done) + " tries left.";
        waitForGreen();
      }
      return;
    }

    // phase is idle: start a new set of five.
    done = 0;
    best = null;
    bestOut.textContent = "—";
    setPhase("waiting");
    waitForGreen();
  });
})();
