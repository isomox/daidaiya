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
let currentRate = 1;
export default function({event, data}) {
  $w.page.dataset.state.rateTimer && clearTimeout($w.page.dataset.state.rateTimer);
  if (data.target === 'move') {
    return;
  }
  
  const currentVideo = $w.video1
  currentVideo?.playbackRate?.({rate: 1.0});
  if (data.target === 'start') {
    $w.page.dataset.state.touchInfo = {
      event: 'start',
      pageY: (event.originEvent || event).touches?.[0]?.pageY
    }
    $w.page.dataset.state.rateTimer = setTimeout(() => {
      currentVideo?.playbackRate?.({rate: 2.0});
      currentRate = 2;
      $w.utils.showToast({title: '2x', icon: 'none'});
    }, 1000)
  } else if (currentRate === 2) {
      $w.utils.showToast({title: '1x', icon: 'none'});
      currentRate = 1;
  }
  if (data.target === 'end') {
    const { pageY } = $w.page.dataset.state.touchInfo;
    const { pageY: changePageY} = (event.originEvent || event).changedTouches?.[0];
    
    // 向下滑动
    if (changePageY - pageY >= 55) {
      $w.page.handler.videoChange(false)
    } else if (changePageY - pageY <= -55) {
      $w.page.handler.videoChange(true)
    }
  }
}