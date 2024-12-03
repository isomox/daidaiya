/*
* 可通过 $page 获取或修改当前页面的 变量 状态 handler lifecycle 等信息
* 可通过 app 获取或修改全局应用的 变量 状态 等信息
* 具体可以 console.info 在编辑器Console面板查看更多信息
* 如果需要 async-await，请在方法前 async
*/
export default {
  onPageLoad(query) {
    //console.log('---------> LifeCycle onPageLoad', query)
    try {
      $w.page.dataset.state.seriesFloatHide = !!wx?.getStorageSync?.('seriesFloatHide');
    } catch(e) {
      $w.page.dataset.state.seriesFloatHide = JSON.parse(localStorage.getItem('seriesFloatHide') || 'false');
    }
  },
  async onPageShow() {
    console.log('---------> series LifeCycle onPageShow', $w.page.dataset.state.videoListShow)
    // 非首次进入
    if ($w.page.dataset.state.videoListShow?._id) {
      $w.queryBalance?.trigger?.();
      $w.utils.showLoading({ title: '加载中...'});
      setTimeout(() => {
        console.log('---------> series dealPayState', $w.app.common.dealPayState({ type: 'get' }))
        $w.utils.hideLoading();
        if ($w.app.common.dealPayState({ type: 'get' }) === 'success') {
          $w.page.handler.chooseSection?.({ data: { type: 'back' } });
        }
        $w.app.common.dealPayState({ value: '' })
      }, 1000)
      return;
    }
    await $w.queryVideoDetail?.trigger?.();
    await $w.queryFollow?.trigger?.();
    $w.queryVideo?.trigger?.({pageSize: $w.queryVideoDetail.data?.renew_count || 1});
  },
  onPageReady() {
    //console.log('---------> LifeCycle onPageReady')
  },
  onPageHide() {
    //console.log('---------> LifeCycle onPageHide')
    $w.video1?.pause?.()
    $w.page.dataset.state.retryTimer = null
  },
  onPageUnload() {
    //console.log('---------> LifeCycle onPageUnload')
    $w.video1?.pause?.()
  },
}