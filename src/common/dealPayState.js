
/*
* 函数里面访问：通过 app.common.[name] 访问这里定义的方法或值
* 函数外面访问：通过 import（如在页面的 handler 引用的例子：import sayHi from '../../common/[name]'）
*/
export default function setPayState({value = '', type = 'set'} = {}) {
  console.log('======setPayState', { value, type })
  if (type === 'get') {
    try {
      return wx.getStorageSync('payInfo')
    } catch (e) { }
    try {
      return localStorage.getItem('payInfo')
    } catch (e) { }
    return '';
  }
  try {
    wx.setStorageSync('payInfo', value)
  } catch (e) { }
  try {
    localStorage.setItem('payInfo', value)
  } catch (e) { }
}
