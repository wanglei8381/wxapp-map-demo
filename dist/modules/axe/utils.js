import { isPlainObject } from '../../utils/index'
export function callHook (hookName, axe) {
  hookName = 'on' + hookName
  let hook = axe[hookName]
  if (hook) {
    hook()
  }
}

// 深度继承
export function extend (dist, src) {
  if (!isPlainObject(src)) return

  let keys = Object.keys(src)
  let key
  for (let i = 0, len = keys.length; i < len; i++) {
    key = keys[i]
    if (dist.hasOwnProperty(key)) {
      if (isPlainObject(dist[key]) && isPlainObject(src[key])) {
        extend(dist[key], src[key])
      } else {
        dist[key] = src[key]
      }
    } else {
      dist[key] = src[key]
    }
  }
}
