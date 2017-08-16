import Axe from './axe'
import Event from '../event/index'
import {
  initMixin,
  buildinMixin
} from './mixin'

let app = null

// 初始化混合
initMixin(Axe)
// 内置的混合属性
buildinMixin(Axe)

export function WApp (options) {
  if (app) return app
  app = new Axe(options, App)
  app.$bus = new Event(app)
  return app
}

export function WPage (options) {
  let axe = new Axe(options, Page)
  axe.$root = app
  axe.$bus = app.$bus
  return axe
}

export default Axe
