var gutil = require('gulp-util')
var through = require('through2')

function px2rpx () {
  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file)
    }

    if (file.isStream()) {
      return cb(new gutil.PluginError('gulp-wxss', 'Streaming not supported'))
    }

    file.contents = new Buffer(file.contents.toString().replace(/(\d+)px/gm, '$1rpx'))

    cb(null, file)
  })
}

module.exports = px2rpx
