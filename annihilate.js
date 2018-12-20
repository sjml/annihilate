var ctrls = null;
var spinner = null;
var aud = null;
var btn = null;
var interval = null;
var initial = null;
var min = null;
var max = null;

var waiting = null;

function play(e) {
  if (waiting) {
    clearTimeout(waiting);
    waiting = null;
  }
  var buttonPress = false;
  if (e && e.srcElement == btn) {
    buttonPress = true;
    btn.innerHTML = "restart"
  }

  var lower = Number(min.value);
  var upper = Number(max.value);

  if (interval.value == 0) {
  }
  else if (interval.value == 1) {
    lower *= 60;
    upper *= 60;
  }
  else if (interval.value == 2) {
    lower *= 3600;
    upper *= 3600;
  }
  else if (interval.value == 3) {
    lower *= 86400;
    upper *= 86400;
  }

  // account for duration of audio clip
  lower += aud.duration;
  upper += aud.duration;

  var next = Math.random() * (upper - lower) + lower;
  console.log(next);
  waiting = setTimeout(play, next * 1000);
  if (buttonPress && !initial.checked) {
    return Promise.resolve();
  }
  else {
    return aud.play();
  }
}

function setup() {
  ctrls = document.getElementsByClassName("controls")[0];
  spinner = document.getElementsByClassName("spinner")[0];
  aud = document.getElementById("creep");
  btn = document.getElementById("play");
  interval = document.getElementById("interval");
  initial = document.getElementById("initial");
  min = document.getElementById("min");
  max = document.getElementById("max");

  function reveal() {
    ctrls.classList.remove("gone");
    spinner.classList.add("gone");
    btn.onclick = function(e) {
      play(e);
    };
  }

  aud.load();
  if (aud.readyState < 4) {
    aud.oncanplaythrough = function() {
      reveal();
    };
  }
  else {
    reveal();
  }

}

