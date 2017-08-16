import Axe from 'axe'
import {
  isPlainObject,
  shallowEqual
} from 'utils'

export function provider (store) {
  // 全局mixin
  Axe.mixin({
    $store: store,
    onLoad () {
      if (!this.onStateChange && !this.mapState) return
      this.$unsubscribe = this.$store.subscribe(() => {
        var state = this.$store.getState()
        listener(this, state)
      })
    },

    onShow () {
      if (this._ready) {
        listener(this, this.$store.getState())
      }
    },

    onReady () {
      listener(this, this.$store.getState())
    },

    onUnload () {
      if (this.$unsubscribe) {
        this.$unsubscribe()
      }
    }
  })
}

function listener (axe, state) {
  if (!axe._active) return
  if (axe.mapState) {
    var nextState = axe.mapState(state)
    if (isPlainObject(nextState) && !shallowEqual(axe.state, nextState)) {
      axe.state = nextState
      axe.setData(axe.state)
    }
  }
  if (axe.onStateChange) {
    axe.onStateChange(state)
  }
}
