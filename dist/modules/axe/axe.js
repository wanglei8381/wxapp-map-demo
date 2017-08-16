import Event from '../event/index'
import { callHook } from './utils'
import {
  bindOptions,
  mergeOptions
} from './options'

let uid = 1
class Axe extends Event {
  constructor (options = {}, run) {
    super()
    // 上下文代指自己,主要给Event使用
    this._cxt = this
    // 是否是Page
    this._isPage = run === Page
    this._uid = uid++
    // 在app中执行了onLaunch，在page中执行了onReady
    this._ready = false
    // 在page中执行了onShow:_active=true, onHide:_active = false
    this._active = false

    let finalOptions = {}
    mergeOptions(finalOptions, options)
    mergeOptions(finalOptions, Axe.options)

    bindOptions(this, finalOptions)
    callHook('Init', this)
    run(this)
  }

  // 代理setData
  setData (data) {
    if (this.$cxt && this.$cxt.setData) {
      this.$cxt.setData(data)
    } else {
      console.log('[axe][setData]setData需要在onLoad后才可以使用')
    }
  }

  // 代理route
  get route () {
    if (this.$cxt) {
      return this.$cxt.route
    }
  }
}

export default Axe
