let timer;
let totalsecond = 0;
let timeDisplay = document.getElementById("time");
let runningState = false;

function playSound(){
    document.getElementById("rokey-alarm").play();
}

document.getElementById("start").addEventListener("click", function () {
  if (runningState) return;
  startTimer();
});

document.getElementById("reset").addEventListener("click", function () {
  clearInterval(timer);
  runningState = false;
  totalsecond = 0;
  timeDisplay.innerHTML = "00 : 00 : 00";
  document.getElementById("hours").value = "";
  document.getElementById("minutes").value = "";
  document.getElementById("seconds").value = "";
});

function startTimer() {
  let h = parseInt(document.getElementById("hours").value) || 0;
  let m = parseInt(document.getElementById("minutes").value) || 0;
  let s = parseInt(document.getElementById("seconds").value) || 0;

  totalsecond = h * 3600 + m * 60 + s;

  if (totalsecond < 0) return;

  runningState = true;
  timer = setInterval(() => {
    if (totalsecond < 0) {
      clearInterval(timer);
      playSound();
      runningState = false;
      showModal();
      document.getElementById("hours").value = "";
      document.getElementById("minutes").value = "";
      document.getElementById("seconds").value = "";
      const duration = 15 * 1000,
        animationEnd = Date.now() + duration,
        defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // since particles fall down, start a bit higher than random
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          })
        );
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          })
        );
      }, 250);
      return;
    }
    displayTime();
    totalsecond--;
  }, 1000);
}

function displayTime() {
  let hrs = Math.floor(totalsecond / 3600);
  let min = Math.floor((totalsecond % 3600) / 60);
  let sec = totalsecond % 60;

  timeDisplay.innerHTML = `${hrs.toString().padStart(2, "0")} : ${min.toString().padStart(2, "0")} : ${sec.toString().padStart(2, "0")}`;
}

function showModal() {
  document.getElementById("timeUpModal").style.display = "block";
}

function closeModal() {
  document.getElementById("timeUpModal").style.display = "none";
}
