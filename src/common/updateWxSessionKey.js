
/*
 * 函数里面访问：通过 app.common.[name] 访问这里定义的方法或值
 * 函数外面访问：通过 import（如在页面的 handler 引用的例子：import sayHi from '../../common/[name]'）
 */
const login = () => new Promise((resolve) => {
  wx.login({
    async success(res) {
      if (res.code) {
        let result;
        try {
          // 更新sessionkey
          const data = await $w.app?.cloud?.callDataSource?.({
            dataSourceName: 'zdydm_xyqe7jc',
            methodName: 'method_4561ce2f4472481',
            params: {
              js_code: res.code,
            },
          });
          result = data.result;
        } catch (e) {
          console.log('checkSession method_4561ce2f4472481 error: ', e);
        }
        if (result) {
          console.log('更新sessionkey成功');
        } else {
          console.log('更新sessionkey失败');
        }
        resolve(res);
      } else {
        $w.utils.showToast({ title: '重新登录失败！', icon: 'none' });
        resolve(res);
      }
    },
  });
})
export default async function updateWxSessionKey() {
  return new Promise(async (resolve, reject) => {
    try {
      // 如果未查到用户，则强制获取sessionKey
      const data = await $w.app?.cloud?.callDataSource?.({
        dataSourceName: 'playlet_user_pinzmgy',
        methodName: 'wedaGetItemV2',
        params: {
          select: {
            $master: true,
          },
          filter: {
            where: {
              $and: [
                {
                  open_id: {
                    $eq: $w.auth.currentUser.openId,
                  },
                },
              ],
            },
          },
        },
      });
      if (!data?._id || !data.session_key) {
        const data = await login();
        resolve(data);
        return;
      }
    } catch (e) {
      //
    }
    try {
      const res = await $w.app?.cloud?.callDataSource?.({
        dataSourceName: 'zdydm_xyqe7jc',
        methodName: 'method_382ef2b692a57bb',
        params: {},
      });
      console.log('=======> checkSession res', res);
			if (res.errcode !== 0) {
				const data = await login();
				resolve(data);
				return;
			}
      resolve(res);
    } catch (error) {
      console.log('=======> checkSession error', error);
      // 更新sessionkey
      const data = await login();
      resolve(data);
    }
  });
}
