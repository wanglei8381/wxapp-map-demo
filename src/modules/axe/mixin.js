import { mergeOptions } from './options'
export function initMixin (Axe) {
  Axe.options = {}
  Axe.mixin = function (options) {
    mergeOptions(this.options, options, true)
    return this
  }
}

export function buildinMixin (Axe) {
  // 内置一些混合，添加_active，_ready，_active属性
  Axe.mixin({
    onLoad () {
      const axe = this
      Object.defineProperty(axe, 'data', {
        get () {
          return axe.$cxt.data
        }
      })
    },

    // app和page中
    onShow () {
      this._active = true
    },

    // app中
    onLaunch () {
      this._ready = true
    },

    // page中
    onReady () {
      this._ready = true
    },

    // app和page中
    onHide () {
      this._active = false
    }
  })
}
