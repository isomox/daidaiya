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
export default function({event, data}) {
  const { series_number, type = 'like' } = data.target || {};
  const operateCache = $w.page.dataset.state.operateCache
  if (series_number && operateCache[series_number]) {
    if (type === 'like') {
      const isLike = !operateCache[series_number].isLike
      operateCache[series_number].like_count = operateCache[series_number].like_count || 0
      operateCache[series_number].like_count += (isLike ? 1 : -1);
      operateCache[series_number].isLike = isLike;
      $w.page.dataset.state.operateCache = JSON.parse(JSON.stringify(operateCache));
    }
  }
}