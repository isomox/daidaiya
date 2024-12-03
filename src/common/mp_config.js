export default {
  appJson: {
    // 小程序接口权限相关设置，可选
    /* permission: {
      'scope.userLocation': {
        desc: '你的位置信息将用于小程序位置接口的效果展示',
      },
    }, */
    "usingComponents": {
      "charge-dialog": "/materials/$template/layout_p1hn9s9m/index",
      "open-area-left-side": "/materials/$template/layout_qegz0wda/index"
    },
    // 正式上线前，请打开注释，将播放器插件引入
    // "plugins": {
    //   "playlet-plugin": {
    //     "version": "latest",
    //     "provider": "wx94a6522b1d640c3b",
    //     "genericsImplementation": {
    //       "playlet": {
    //         "charge-dialog": "/materials/$template/layout_p1hn9s9m/index",
    //         "open-area-left-side": "/materials/$template/layout_qegz0wda/index"
    //       }
    //     }
    //   }
    // },
  },
}
  