/*
* 可通过 $page 获取或修改当前页面的 变量 状态 handler lifecycle 等信息
* 可通过 app 获取或修改全局应用的 变量 状态 等信息
* 具体可以 console.info 在编辑器Console面板查看更多信息
* 如果需要 async-await，请在方法前 async
*/
let scrollTimer = null
export default {
  onPageLoad(query) {
    //console.log('---------> LifeCycle onPageLoad', query)
    try {
      $w.page.dataset.state.topFloatHide = !!wx?.getStorageSync?.('topFloatHide');
    } catch(e) {
      $w.page.dataset.state.topFloatHide = JSON.parse(localStorage.getItem('topFloatHide') || 'false');
    }
  },
  onPageShow() {
    //console.log('---------> LifeCycle onPageShow')
  },
  onPageReady() {
    //console.log('---------> LifeCycle onPageReady')
  },
  onPageHide() {
    //console.log('---------> LifeCycle onPageHide')
  },
  onPageUnload() {
    //console.log('---------> LifeCycle onPageUnload')
  },
  onPageSroll() {
      $w.page.dataset.state.isPageScroll = true
    scrollTimer && clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      $w.page.dataset.state.isPageScroll = false
    }, 500);
    
  }
}