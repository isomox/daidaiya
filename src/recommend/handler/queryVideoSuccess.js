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
export default async function ({ event, data }) {
  let isNoBalance = false;
  let { records } = event.detail;
  const indexStart = ($w.page.dataset.state.videoList[$w.page.dataset.state.videoList.length - 1]?.index || -1) + 1;
  records = [...$w.page.dataset.state.videoList, ...records.map((v, i) => ({ ...v, index: indexStart + i }))];
  $w.page.dataset.state.videoList = JSON.parse(JSON.stringify(records));
  if (event.detail?.records) {
    const operateCache = {};
    event.detail.records.forEach(v => {
      operateCache[`${v.video_id?._id}-${v.series_number}`] = { ...v, isLike: v.section_user_like_id?.find?.(item => item.owner === $w.app.dataset.state.videoUserInfo.owner)?.like_status === '1' }
    });
    $w.page.dataset.state.operateCache = operateCache;
  }
  const { index } = $w.page.dataset.state.videoListShow || {};
  $w.page.dataset.state.videoListShow = records[index || 0] || {};
  try {
    $w.utils.showLoading({ title: '加载中...'});
    const result =  await $w.app.cloud.callDataSource({
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
    // if (e?.message?.includes('balance is insufficient')) {
      isNoBalance = true
      $w.page.dataset.state.videoListShow.isNoBalance = true;
      $w.page.dataset.state.videoListShow.display_url = '';
      $w.video1?.stop?.();
      $w.modal1?.open?.()
    // }
  }
  $w.utils.hideLoading();
  setTimeout(() => {
    $w.page.dataset.state.isNoBalance = isNoBalance;
    if (isNoBalance) return;
    $w.video1?.play?.();
  }, 500)
}