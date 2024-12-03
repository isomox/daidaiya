
/*
* 函数里面访问：通过 app.common.[name].xxx 访问这里定义的方法或值
* 函数外面访问：通过 import（如在页面的 handler 引用的例子：import { xxx } from '../../common/[name]'）
*/
export default async function getVideoUserInfo(launchOpts) {
    console.log('launchOpts', launchOpts);
  let videoUserInfo = {}
  let platform = ''
  if (wx.getSystemInfoSync) {
   platform = (await wx.getSystemInfoSync())?.platform
  }
  try {
    const res = await $w.app?.cloud?.callDataSource?.({
      dataSourceName: 'zdydm_xyqe7jc',
      methodName: 'method_51b9a143c237d18',
      params: {
        mini_program_id: $w.app.mpAppId,
        inviter_id: launchOpts?.query?.inviteId || '', // 邀请用户id
        system_os_type: platform,
        tfid: launchOpts?.query?.tfid || '', // 投放链接
        agent_id: launchOpts?.query?.invite_code || '', // 代理商
      }
    });
    videoUserInfo = {...res, isVip: !!res?.membership_type};
  } catch (e) {
    videoUserInfo = {}
  }
  $w.app.dataset.state.videoUserInfo = videoUserInfo;
  try {
    wx.setStorage({ key: 'videoUserInfo', value: res })
  } catch (e) { }
  try {
    localStorage.setItem('videoUserInfo', JSON.stringify(res))
  } catch (e) { }
}
