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
export default async function (isForword) {
  const { index: lastIndex } = $w.page.dataset.state.videoListShow
  const current = isForword ? lastIndex + 1 : lastIndex - 1;
  const currentVideo = $w.video1;
  const next = $w.page.dataset.state.videoList[current]
  if (!currentVideo || !next) return;
  let isNoBalance = false;
  currentVideo?.pause?.();
  $w.page.dataset.state.videoListShow = JSON.parse(JSON.stringify(next));
  await $w.app.common.updateWxSessionKey();
  try {
      $w.utils.showLoading({ title: '加载中...'});
      const result = await  $w.app.cloud.callDataSource({
      dataSourceName: 'zdydm_xyqe7jc',
      methodName: 'method_c6e4e519dea4dc4', // 付费看剧
      params: {
        section_id: $w.page.dataset.state.videoListShow?._id,
        video_id: $w.page.dataset.state.videoListShow?.video_id?._id,
        tfid: $w.app.dataset.state.launchQuery?.tfid || '', // 投放链接
        agent_id: $w.app.dataset.state.launchQuery?.invite_code || '', // 代理商
      }
    })
    const {display_url = ''} = result;
    $w.page.dataset.state.videoListShow.isNoBalance = false;
    $w.page.dataset.state.videoListShow.display_url = display_url;
  } catch (e) {
    // no money
      isNoBalance = true;
      currentVideo?.pause?.();
      $w.page.dataset.state.videoListShow.isNoBalance = true;
      $w.page.dataset.state.videoListShow.display_url = '';
      $w.video1?.stop?.();
      $w.modal3?.open?.();
  }
  $w.utils.hideLoading();
  setTimeout(async () => {
    $w.page.dataset.state.isNoBalance = isNoBalance;
    if (isNoBalance) return;
    $w.video1?.play();
  }, 500)
}