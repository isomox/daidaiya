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
  console.log('======queryVideoSuccess', $w.page.dataset.params)
  let isNoBalance = false;
  let { records } = event.detail;
  records = (records || $w.page.dataset.state.videoList).sort((a, b) => +a.series_number - b.series_number).map((v, i) => ({ ...v, index: i }));
  $w.page.dataset.state.videoList = JSON.parse(JSON.stringify(records));
  const currentIndex = +(data.target?.current_count || $w.page.dataset.params.current_count || 1) - 1;
  // 初始化待播放剧集列表
  if (currentIndex > 0 && currentIndex < records.length - 1) {
    $w.page.dataset.state.videoListShow = records[currentIndex]
  } else {
    $w.page.dataset.state.videoListShow = records[0];
  }
  // 缓存剧集播放状态：点赞等
  if (event.detail?.records) {
    const operateCache = {};
    records.forEach(v => {
      operateCache[v.series_number] = { ...v, isLike: v.section_user_like_id.find(item => item.owner === $w.app.dataset.state.videoUserInfo.owner)?.like_status === '1' }
    });
    $w.page.dataset.state.operateCache = operateCache;
  }
  if (!$w.page.dataset.state.videoListShow) return
  // 判断是否需要付费
  try {
    $w.utils.showLoading({ title: '加载中...'});
    const result = await $w.app.cloud.callDataSource({
      dataSourceName: 'zdydm_xyqe7jc',
      methodName: 'method_c6e4e519dea4dc4', // 付费看剧
      params: {
        section_id: $w.page.dataset.state.videoListShow?._id,
        video_id: $w.page.dataset.params.id,
        tfid: $w.app.dataset.state.launchQuery?.tfid || '', // 投放链接
        agent_id: $w.app.dataset.state.launchQuery?.invite_code || '', // 代理商
      }
    })
    const {display_url = ''} = result; 
    $w.page.dataset.state.videoListShow.isNoBalance = false;
    $w.page.dataset.state.videoListShow.display_url = display_url;
  } catch (e) {
    // no money
      isNoBalance = true
      $w.page.dataset.state.videoListShow.isNoBalance = true
      $w.page.dataset.state.videoListShow.display_url = '';
      $w.video1?.stop?.();
      $w.modal3?.open?.()
  }
  $w.utils.hideLoading();
  // 延迟开启播放
  setTimeout(() => {
    $w.page.dataset.state.isNoBalance = isNoBalance;
    if (isNoBalance) return;
    $w.video1?.play?.();
  }, 100)
}