import ResizeObserver from 'resize-observer-polyfill'

if (typeof global !== 'undefined') {
  this.global.ResizeObserver = ResizeObserver
}
