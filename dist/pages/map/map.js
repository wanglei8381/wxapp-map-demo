Page({
  data: {
    longitude: 116.407526,
    latitude: 39.90403,
    scale: 12,
    includePoints: [
      {
        ongitude: 116.407526,
        latitude: 39.90403
      },
      {
        ongitude: 117.179643,
        latitude: 31.837537
      }
    ],
    showLocation: true,
    markers: [
      {
        id: 0,
        longitude: 116.407526,
        latitude: 39.90403,
        iconPath: '/images/location.png',
        title: '五矿电子商务有限公司',
        rotate: 0,
        alpha: 0.5,
        width: 32,
        height: 32
      },
      {
        id: 1,
        longitude: 116.386103,
        latitude: 39.871075,
        iconPath: '/images/location2.png',
        title: '北京南站',
        rotate: 0,
        alpha: 0.5,
        width: 32,
        height: 32,
        callout: {
          content: '北京南站',
          color: '#316ccb',
          fontSize: 12,
          borderRadius: 2,
          bgColor: '#ffffff',
          padding: 6
        }
      }
    ],

    polyline: [{
      points: [
        { latitude: 39.90403, longitude: 116.407526 },
        { latitude: 39.871075, longitude: 116.386103 }
      ],
      color: '#000000AA',
      width: 2,
      dottedLine: true
    }],

    circles: [
      {
        latitude: 39.90403,
        longitude: 116.407526,
        color: '#ff000099',
        fillColor: '#316ccb99',
        radius: 1500,
        strokeWidth: 2
      }
    ],

    controls: [
      {
        id: 0,
        position: {
          left: 10,
          top: 50,
          width: 32,
          height: 32
        },
        iconPath: '/images/con-local.png',
        clickable: true
      }
    ]
  },

  bindmarkertap (e) {
    console.log('bindmarkertap', e)
  },

  bindcallouttap (e) {
    console.log('bindcallouttap', e)
  },

  bindcontroltap (e) {
    console.log('bindcontroltap', e)
  },

  bindregionchange (e) {
    console.log('bindregionchange', e)
  },

  bindtap (e) {
    console.log('bindtap', e)
  },

  onReady () {
    wx.getLocation({
      type: 'gcj02',
      success (res) {
        console.log(res)
      }
    })
  }
})
