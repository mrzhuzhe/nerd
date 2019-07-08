import promise from 'babel-runtime/core-js/promise';
/*
import find from 'babel-runtime/core-js/array/find';
import fill from 'babel-runtime/core-js/array/fill';
import copywithin from 'babel-runtime/core-js/array/copy-within';
import findIndex from 'babel-runtime/core-js/array/find-index'; */

window.Promise = promise;
/* window.Array.prototype.find = window.Array.prototype.find || function () {
    return find(this, arguments[0]);
};
window.Array.prototype.fill = window.Array.prototype.fill || function () {
    return fill(this, arguments[0]);
};
window.Array.prototype.findIndex = window.Array.prototype.findIndex || function () {
    return findIndex(this, arguments[0]);
};
window.Array.prototype.fill = fill;
window.Array.prototype.copywithin = copywithin;
window.Array.prototype.findIndex = findIndex;

if (!window.history || !window.history.pushState) {
  window.history = window.history || {};
  window.history.pushState = function () {};
} */
