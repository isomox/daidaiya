/**
 * 
 * 可通过 $page 获取或修改当前页面的 变量 状态 handler lifecycle 等信息
 * 可通过 app 获取或修改全局应用的 变量 状态 等信息
 * 具体可以console.info 在编辑器Console面板查看更多信息
 * 注意：该方法仅在所属的页面有效
 * 如果需要 async-await，请修改成 export default async function() {}
 * 帮助文档 https://cloud.tencent.com/document/product/1301/57912
 **/
/**
 * @param {Object} event - 事件对象
 * @param {string} event.type - 事件名
 * @param {any} event.detail - 事件携带自定义数据
 *
 * @param {Object} data
 * @param {any} data.target - 获取事件传参的数据
 **/
let retryTimes = 0;
export default async function (isForword) {
  console.log('videochange', { isForword })
  let isNoBalance = false;
  $w.video1?.pause?.();
  if (isForword !== 'back') {
    const { index: lastIndex } = $w.page.dataset.state.videoListShow
    const current = isForword ? lastIndex + 1 : lastIndex - 1;
    const currentVideo = $w.video1;
    const next = $w.page.dataset.state.videoList[current]
    if (!currentVideo || !next) return;
    $w.page.dataset.state.videoListShow = JSON.parse(JSON.stringify(next));
  }
  console.log('======videochange', retryTimes, isForword, $w.page.dataset.state.videoListShow)
  try {
    $w.utils.showLoading({ title: '加载中...'});
    const result = await $w.app.cloud.callDataSource({
      dataSourceName: 'zdydm_xyqe7jc',
      methodName: 'method_c6e4e519dea4dc4', // 付费看剧
      params: {
        section_id: $w.page.dataset.state.videoListShow?._id,
        video_id: $w.page.dataset.state.videoListShow?.video_id?._id,
        tfid: $w.app.dataset.state.launchQuery?.tfid || '', // 投放链接
        agent_id: $w.app.dataset.state.launchQuery?.invite_code || '', // 代理商
      }
    })
    isNoBalance = false;
    const {display_url = ''} = result;
    $w.page.dataset.state.videoListShow.isNoBalance = false
    $w.page.dataset.state.videoListShow.display_url = display_url;$w.page.dataset.state.retryTimer && clearTimeout($w.page.dataset.state.retryTimer);
    console.log('======videochange ok', retryTimes, $w.page.dataset.state.videoListShow);
  } catch (e) {
    // no money
    isNoBalance = true;
    $w.modal1?.open?.();
    $w.page.dataset.state.videoListShow.isNoBalance = true;
    $w.page.dataset.state.videoListShow.display_url = '';
    $w.video1?.stop?.();
    if (isForword === 'back' && retryTimes < 20) {
      $w.utils.showLoading({ title: '加载中...'});
      $w.page.dataset.state.retryTimer = setTimeout(() => {
        retryTimes += 1;
        $w.page.handler.videoChange(isForword)
      }, 3000)
      return;
    }
  }
  setTimeout(async () => {
    $w.utils.hideLoading();
    $w.page.dataset.state.isNoBalance = isNoBalance;
    retryTimes = 0;
    if (isNoBalance) return;
    $w.modal1?.close?.()
    $w.video1?.play();
    const { index } = $w.page.dataset.state.videoListShow;
    const { pageNo, pageSize } = $w.page.dataset.state.queryVideoParams;
    if (index >= (pageNo - 1) * pageSize + pageSize / 2) {
      $w.page.dataset.state.queryVideoParams = { pageNo: pageNo + 1, pageSize };
      await $w.queryVideo.trigger({ pageNo: pageNo + 1 });
    }
  }, isForword === 'back' ? 3000 : 500)
}