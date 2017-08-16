import axe from 'axe'
import { Subject } from 'rxjs'

axe.mixin({
  onInit () {
    var domStreams = this.domStreams
    if (domStreams && Array.isArray(domStreams)) {
      domStreams.forEach((key) => {
        this[key] = new Subject()
        var onKey = 'on' + key.trim().replace(/^[a-z]/, (s) => s.toUpperCase())
        this[onKey] = (e) => {
          this[key].next(e)
        }
      })
    }
  }
})
