/*
 * 函数里面访问：通过 app.common.[name] 访问这里定义的方法或值
 * 函数外面访问：通过 import（如在页面的 handler 引用的例子：import sayHi from '../../common/[name]'）
 */
export default async function requestMidasPayment(data = {}, success) {
  if ($w.app.dataset.state.isIOS) {
    $w.utils.showToast({ title: '由于相关规范，IOS下该功能暂不可用', icon: 'none'})
    return;
  }
  const chargeInfo = data?.target || {};
  console.log('======chargeInfo', chargeInfo)
  await $w.app.common.updateWxSessionKey();
  try {
    $w.app.common.dealPayState({ value: '' })
    $w.utils.showLoading({title: '请稍后'})
    // 下单
    const orderData = await $w.app?.cloud?.callDataSource?.({
      dataSourceName: 'zdydm_xyqe7jc',
      methodName: 'method_ded99213c47dfe4',
      params: {
        recharge_plan_config_id: chargeInfo._id,
        tfid: $w.app.dataset.state.launchQuery?.tfid,
        agent_id: $w.app.dataset.state.launchQuery?.invite_code,
      },
    });
    const { order_id: orderId, offer_id: offerId } = orderData || {};
    console.log('method_ded99213c47dfe4 order: ', orderData);
    const signData = {
      offerId,
      buyQuantity: chargeInfo.gold_bean_count,
      // 0 正式  1 沙盒
      env: $w.env.type === 'preview' ? 1 : 0,
      currencyType: 'CNY',
      outTradeNo: orderId,
      attach: '',
    }
    const sign_data = JSON.stringify(signData);
    console.log('sign_data: ', sign_data)
    // 获取下单虚拟支付签名
    const { pay_sig: paySig, signature } = await $w.app?.cloud?.callDataSource?.({
      dataSourceName: 'zdydm_xyqe7jc',
      methodName: 'method_c2a64925ff4c645',
      params: {
        sign_data,
        env: signData.env,
      },
    });
    console.log('method_c2a64925ff4c645 paySig: ', paySig)
    console.log('method_c2a64925ff4c645 signature: ', signature)
    $w.utils.hideLoading();
    wx.requestVirtualPayment({
      signData: sign_data,
      mode: 'short_series_coin',
      paySig,
      signature,
      success(res) {
        $w.utils.showToast({ title: '支付成功！', icon: 'none' });
        // 广告回传
        $w.app?.cloud?.callDataSource?.({
          dataSourceName: 'zdydm_xyqe7jc',
          methodName: 'advertisementEvent',
          params: {
            cid: $w.app.dataset.state.launchQuery?.cid,
            ad_id: $w.app.dataset.state.launchQuery?.aid || $w.app.dataset.state.launchQuery?.advertiser_id,
            creative_type: $w.app.dataset.state.launchQuery?.creativetype,
            oaid: '',
            idfa: '',
            imei: '',
            platform: $w.app.dataset.state.launchQuery?.pt,
            click_id: $w.app.dataset.state.launchQuery?.gdt_vid || $w.app.dataset.state.launchQuery?.qz_gdt || $w.app.dataset.state.launchQuery?.clickid,
            product_price: chargeInfo.amount,
            order_id: orderId || '',
            order_cnt: chargeInfo.gold_bean_count,
            pay_amount: chargeInfo.amount,
            agent_id: $w.app.dataset.state.launchQuery?.invite_code,
            tfid: $w.app.dataset.state.launchQuery?.tfid,
            mini_program_id: $w.app.mpAppId,
          }
        });
        $w.app.common.dealPayState({ value: 'success' });
        $w.app.common.getPlayerManager()?.pm?.hideChargeDialog?.();
        $w.app.common.getPlayerManager()?.chargeCallBack?.(true);
        if (typeof success === 'function') {
          success();
        }
      },
      fail({ errMsg, errCode }) {
        console.error(errMsg, errCode);
        $w.app.common.dealPayState({ value: 'fail' });
        
        if (errCode === -2) {
          $w.utils.showToast({ title: '支付取消！', icon: 'none' });
        } else {
          $w.utils.showToast({ title: `支付失败！错误码${errCode}`, icon: 'none' });
        }
      },
    });
  } catch (e) {
    console.log('=======> requestMidasPayment err: ', e);
  }
}
