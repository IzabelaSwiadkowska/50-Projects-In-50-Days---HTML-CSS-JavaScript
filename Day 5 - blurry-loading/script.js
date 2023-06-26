/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
/* eslint-disable no-multiple-empty-lines */

const loadText = document.querySelector('.loading-text');
const bg = document.querySelector('.bg');

let load = 0;
const int = setInterval(blurring, 30);

function blurring() {
  load += 1;
  if (load > 99) {
    clearInterval(int);
  }
  loadText.innerText = `${load}%`;
  loadText.style.opacity = scale(load, 0, 100, 1, 0);
  bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
}
// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) =>
  ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
