/**
 * 可通过 app 获取或修改全局应用的 变量 状态 等信息
 * 具体可以console.info 在编辑器Console面板查看更多信息
 * 如果需要 async-await，请在方法前 async
 **/
const defaultNavStyle = {
  statusBarHeight: '24px', // 状态栏高度
  titleBarHeight: '48px', // 标题栏高度
  navBarHeight: '72px', // 导航栏总高度
}
export default {
  onAppLaunch(launchOpts) {
    try {
      $w.app.dataset.state.launchQuery = launchOpts?.query || {};
      $w.app.dataset.state.videoUserInfo = !!wx.getStorageSync ? wx.getStorageSync('videoUserInfo') : JSON.parse(localStorage.getItem('videoUserInfo') || '{}');
      $w.app.common?.getVideoUserInfo?.(launchOpts);
    } catch(e) {}
    try {
      if (typeof wx.getSystemInfoSync === 'function') {
        const { statusBarHeight, platform, system } = wx.getSystemInfoSync();
        const isIos = /ios/i.test(platform) || /ios/i.test(system.toLowerCase());
        const titleBarHeight = isIos ? 44 : 48;
        $w.app.dataset.state.isIOS = isIos;
        $w.app.dataset.state.navstyle = {
          statusBarHeight: `${statusBarHeight}px`, // 状态栏高度
          titleBarHeight:`${titleBarHeight}px`, // 标题栏高度
          navBarHeight: `${statusBarHeight + titleBarHeight}px`, // 导航栏总高度
        }
      } else {
        $w.app.dataset.state.navstyle = defaultNavStyle
      }
    } catch(e) {
        $w.app.dataset.state.navstyle = defaultNavStyle
    }
    $w.app.common.getPlayerManager().appOnLaunchFunc()
  },
  onAppShow(appShowOpts) {
    const launchQuery = $w.app.dataset.state.launchQuery;
    console.log('---------> LifeCycle onAppShow', appShowOpts, launchQuery);
    if (appShowOpts?.query?.dramaId && ($w.app.dataset.state.adScene.includes(appShowOpts.scene) || launchQuery.dramaId !== appShowOpts?.query?.dramaId)) {
      $w.app.dataset.state.launchQuery = appShowOpts.query;
      $w.app.common.getPlayerManager().navigateToPlayer({
        ...appShowOpts?.query,
        type: 'redirectTo'
      })
    }
  },
  onAppHide() {
    //console.log('---------> LifeCycle onAppHide')
  },
  onAppError(options) {
    //console.log('---------> LifeCycle onAppError', options)
  },
  onAppPageNotFound(options) {
    //console.log('---------> LifeCycle onAppPageNotFound', options)
  },
  onAppUnhandledRejection(options) {
    //console.log('---------> LifeCycle onAppUnhandledRejection', options)
  }
}