// 名字playlet-plugin必须和app.json里面引用的插件名一致
let playletPlugin = {} 
// 判断在小程序环境中猜初始化
if (typeof getCurrentPages === 'function') {
  try {
		playletPlugin = requirePlugin('playlet-plugin');
	} catch (error) {
		console.log('=======> plugin error', error);
	}
}
/**
 * 解析跳转到播放页面携带的额外参数
 * @param {*} extParam 
 * @returns 
 */
// const parseExtParam = (extParam = '') => {
//   const obj = {};
//   try {
//     decodeURIComponent(extParam)?.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (obj[k] = v));
//   } catch (error) {
//     //
//   }
//   return obj;
// }
/**
 * 单例子模式产生一个类或一个函数的唯一实例
 * @module AsyncSingletonLock
 * @param {Function} func 需要单例执行的方法
 * @param {Array} args 方法执行需要的参数
 * @param {String} singletonKey 缓存时挂载的key值
 *
 * @example
  async getLocation(params) {
    return AsyncSingletonLock(getLocationIn, [params || {}]);
  },
 */
function AsyncSingletonLock(func, args, singletonKey) {
  singletonKey = singletonKey || '_asyncSingleton';
  if (func[singletonKey]) return func[singletonKey];
  func[singletonKey] = func(...args);
  if (func[singletonKey].then) {
    func[singletonKey].then(
      () => {
        singletonKey = singletonKey || '_asyncSingleton';
        func[singletonKey] = null;
        delete func[singletonKey];
      },
      () => {
        singletonKey = singletonKey || '_asyncSingleton';
        func[singletonKey] = null;
        delete func[singletonKey];
      },
    );
  } else {
    console.warn('AsyncSingletonLock error: ', func, ' is not a Promise');
  }
  return func[singletonKey];
}
/*
* 函数里面访问：通过 app.common.[name] 访问这里定义的方法或值
* 函数外面访问：通过 import（如在页面的 handler 引用的例子：import sayHi from '../../common/[name]'）
*/
class PlayerManager {
  constructor() {
    this.sectionList = {}; // 剧集信息缓存表
    this.videoList = {}; // 剧目信息缓存表
    this.currentVideo = null; // 当前剧目信息
    this.currentSection = {}; // 当前剧集信息
    this.pm = null;
    this.encryptDataCache = null; // 当前剧集的播放签名缓存
    this.lockPlayCache = []; // 已经调用过扣币的待解锁的剧集缓存列表，充值后会清空
    this.requestEncryptForce = true; // 是否强制刷新签名
    this.currentAccount = null; // 用户账户信息
    this.init = this.init.bind(this);
    this.onCheckIsCanPlay = this.onCheckIsCanPlay.bind(this);
    this.getEncryptData = this.getEncryptData.bind(this);
    this.onShare = this.onShare.bind(this);
    this.onDataReport = this.onDataReport.bind(this);
    this.onBack = this.onBack.bind(this);
    this.navigateToPlayer = this.navigateToPlayer.bind(this);
    this.onPlayerLoad = this.onPlayerLoad.bind(this);
    this.appOnLaunchFunc = this.appOnLaunchFunc.bind(this);
    this.getSectionInfo = this.getSectionInfo.bind(this);
    this.getVideoInfo = this.getVideoInfo.bind(this);
    this.setLikeState = this.setLikeState.bind(this);
    this.collectVideo = this.collectVideo.bind(this);
    this.playSection = this.playSection.bind(this);
    this.dealSectionData = this.dealSectionData.bind(this);
    this.onShowChargeDialog = this.onShowChargeDialog.bind(this);
    this.showLeftSide = this.showLeftSide.bind(this);
    this.getCurrentAccount = this.getCurrentAccount.bind(this);
		this.chargeCallBack = this.chargeCallBack.bind(this);
    this.navBack = this.navBack.bind(this);
  }
  /**
   * 插件实例初始化
   * @param {*} info 
   */
  async init(info) {
    console.log('=======> _onPlayerLoad', info)
    this.pm = playletPlugin?.PlayletManager?.getPageManager(info.playerId)
    await AsyncSingletonLock(this.getSectionInfo, [info]); // 获取剧集信息
    // encryptedData是经过开发者后台加密后(不要在前端加密)的数据，具体实现见下面的加密章节
    const res = await AsyncSingletonLock(this.getEncryptData, [{ serialNo: info.serialNo }])
    // encryptedData是后台加密后的数据，具体实现见下面的加密章节
    this.pm.setCanPlaySerialList({
      data: res.encryptedData || '',
      freeList: res.freeList,
    })
    this.pm.onCheckIsCanPlay(this.onCheckIsCanPlay)
  }
  async onCheckIsCanPlay(param) {
    // TODO: 碰到不可以解锁的剧集，会触发此事件，这里可以进行扣币解锁逻辑，如果用户无足够的币，可调用下面的this.isCanPlay设置
    console.log('=======> onCheckIsCanPlay param', param)
    await AsyncSingletonLock(this.getSectionInfo, [param]);
    const { serialNo } = param;
    const res = await AsyncSingletonLock(this.getEncryptData, [{ serialNo: serialNo }]);
    // encryptedData是后台加密后的数据，具体实现见下面的加密章节
    this.pm.isCanPlay({
      data: res.encryptedData || '',
      serialNo: serialNo,
    })
  }
  async getEncryptData(obj) {
    const { serialNo } = obj
    // TODO: 此接口请求后台，返回下面的setCanPlaySerialList接口需要的加密参数
    const { srcAppid, dramaId } = this.pm?.getInfo()
    console.log('=======> getEncryptData start', srcAppid, dramaId, serialNo)
    const { data: encryptedData, free_list } = await AsyncSingletonLock(this.playSection, [{ serialNo }]); // 调用微搭看剧APIS
    return { encryptedData, freeList: free_list }
  }
  onShare() {
    // 关于分享的处理
    // 开启分享以及withShareTicket
    this.pm.setDramaFlag({
      share: true,
      withShareTicket: true
    })
    // 获取分享参数,页面栈只有短剧播放器一个页面的时候可获取到此参数
    // 例如从分享卡片进入、从投流广告直接跳转到播放器页面，从二维码直接进入播放器页面等情况
    playletPlugin?.getShareParams?.().then(res => {
      console.log('=======> getLaunch options query res', res)
      // 关于extParam的处理，需要先做decodeURIComponent之后才能得到原值
      const extParam = decodeURIComponent(res.extParam)
      console.log('=======> getLaunch options extParam', extParam)
      // 如果设置了withShareTicket为true，可通过文档的方法获取更多信息
      // https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share.html
      const enterOptions = wx.getEnterOptionsSync()
      console.log('=======> getLaunch options shareTicket', enterOptions.shareTicket)
    }).catch(err => {
      console.log('=======> getLaunch options query err', err)
    })
    // extParam除了可以通过在path传参，还可以通过下面的接口设置
    // pm.setExtParam('hellotest')
    // 分享部分end
  }
  /**
   * 播放器内相关事件的回调函数
   */
  onDataReport() {
    this.pm.onDataReport(async (data) => {
      if (!['VIDEO_TIME_UPDATE', 'VIDEO_PROGRESS', 'VIDEO_START_WAITING'].includes(data?.event)) {
        console.log('=======> onDataReport', data, this);
      }
      if (['UNLIKE', 'LIKE'].includes(data?.event)) {
        await this.setLikeState(data); // 点赞/取消点赞
      } else if (['LOAD', 'VIDEO_PLAY', 'CHANGE_SERIAL'].includes(data?.event)) {
        await AsyncSingletonLock(this.getSectionInfo, [data]); // 获取剧集信息
        await AsyncSingletonLock(this.playSection, [{ serialNo: +data.serialNo }]); // 调用微搭看剧APIS
      } else if (['UNFAV', 'FAV'].includes(data?.event)) {
        await this.collectVideo(data); // 追剧/取消追剧
      } else if (['REQUEST_ERROR'].includes(data?.event)) {
        // 21001	用户加密的sessionkey不存在
        // 21002: 商家的加密包未进行base64编码
        // 21003: 解密商家加密包失败，请确认是否按接入文档中给出的加密方案加密或sessionkey要使用当前用户最新的
        // 21004: 商家加密前的明文不是合法的json格式或者字段类型不对，请按接入文档排查
        // 21005:	商家加密中的必填参数值(openid、src_appid及drama_id)为空
        // 21006:	播放器的入参与商家加密包中的参数值不匹配
        if ([21001, 21002, 21003, 21004, 21005, 21006].includes(data.ret)) {
          this.requestEncryptForce = true;
        }
      }
    })
  }
  navBack() {
    if (getCurrentPages?.()?.length > 1) {
      this.pm?.navigateBack({ fail: console.log });
    } else {
      this.pm?.reLaunch({ url: '/pages/index/index', fail: console.log });
    }
  }
  /**
   * 播放器内左上角返回点击事件
   */
  onBack() {
    this.pm.onBack(async (data) => {
      console.log('=======> onBack', data);
      const { series_update_comment, newtv_online_comment } = $w.globalCfg.data?.records?.[0] || {};
      const subId = [series_update_comment, newtv_online_comment].filter(v => !!v);
      // 未配置订阅模版
      if (subId.length === 0) {
        this.navBack();
        return;
      }
      const { subscriptionsSetting } = await wx.getSetting({ withSubscriptions: true })
      // 存在用户未订阅的模板
      if (subId.some(v => subscriptionsSetting[v] !== 'accept')) {
        // 打开订阅弹窗
        this.showLeftSide(true)
        return;
      }
      this.navBack()
    })
  }
  onShowChargeDialog() {
    this.pm.onShowChargeDialog(async data => {
      console.log('=======> onShowChargeDialog', data);
      await this.getCurrentAccount();
    })
  }
  /**
   * 点击按钮触发此函数跳转到播放器页面
   * @param {*} obj.dramaId 是开发者通过媒资管理的API上传的剧目id，必填
   * @param {*} obj.srcAppid 是提审方的appid，必填
   * @param {*} obj.serialNo 是指定播放的剧集id，从1开始递增（不是媒资管理的mediaNo），选填，如果不传，进入播放器页面则会从上次播放的剧集开始继续播放
   * @param {*} obj.extParam 是可选的扩展参数，选填，PlayletManager.getInfo()可获得传入的此参数，分享的时候也会带上此参数，可以作为上报的参数使用。插件提供onPageLoad事件给开发者注册播放器页面的onLoad事件 
   * @param {*} obj.type 跳转类型
   */
  async navigateToPlayer(obj) {
    let { extParam, dramaId, srcAppid, serialNo, type = 'navigateTo' } = obj
    srcAppid = srcAppid || wx.getAccountInfoSync()?.miniProgram?.appId || '';
    let params = `dramaId=${dramaId}&srcAppid=${srcAppid}&extParam=${extParam || ''}`
    if (serialNo) {
      params = `${params}&serialNo=${serialNo}`
    }
		this.getCurrentAccount();
    const currentDramaId = this.pm?.getInfo()?.dramaId;
    console.log('=======> navigateToPlayer', { currentDramaId, ...obj });
    if (currentDramaId !== undefined && currentDramaId !== dramaId) {
      this.resetInnerState();
      await this.pm?.changeDrama({ queryString : `srcAppid=${srcAppid}&dramaId=${dramaId}`});
    }
    
    wx[type || 'navigateTo']?.({
      url: `plugin-private://wx94a6522b1d640c3b/pages/playlet/playlet?${params}`
    })
  }
  /**
   * 初始化PlayerManager实例，绑定相关监听函数
   * @param {*} info 
   */
  onPlayerLoad(info) {
    this.init(info)
    this.onShare()
    this.onDataReport()
    this.onBack()
    this.onShowChargeDialog()
  }
  /**
   * 在app.js中调用，exp: playerManager.appOnLaunchFunc()
   * 存在launchOpts对应的dramaId时，会自动跳转到播放页面
   */
  appOnLaunchFunc(launchOpts) {
    // 注册播放器页面的onLoad事件
    playletPlugin?.onPageLoad?.(this.onPlayerLoad)
    if (launchOpts?.query?.dramaId) {
      $w.app.common.getPlayerManager().navigateToPlayer({
        ...launchOpts?.query,
        type: 'redirectTo'
      })
    }
  }
  /**
   * 查询金豆值
   */
  async getCurrentAccount() {
    try {
      const res = await $w.app?.cloud?.callDataSource?.({
        dataSourceName: 'playlet_user_account_rp01onh',
        methodName: 'wedaGetRecordsV2',
        params: {
          select: {
            $master: true,
          },
        },
      });
      this.currentAccount = res?.records;
      $w.app.dataset.state.playerManagerInfo.currentAccount = res?.records;
    } catch (error) {
      //
    }
  }
  /**
   * 通过dramaId，从微搭获取剧目信息
   * @param {*} data 
   * @returns 
   */
  async getVideoInfo(data) {
    const { dramaId } = data || {};
    const video = this.videoList[dramaId];
    if (video) {
      this.currentVideo = video;
      $w.app.dataset.state.playerManagerInfo.currentVideo = video;
      return video;
    }
    try {
      const res = await $w.app?.cloud?.callDataSource?.({
        dataSourceName: 'laylet_video_lyoj260',
        methodName: 'wedaGetItemV2',
        params: {
          select: {
            $master: true,
          },
          filter: {
            where: {
              $and: [
                {
                  drama_id: {
                    $eq: dramaId
                  }
                }
              ],
            },
          },
        },
      });
      console.log('=======> getVideoInfo res', res);
      this.videoList[dramaId] = res;
      this.currentVideo = res;
      $w.app.dataset.state.playerManagerInfo.currentVideo = res;
      return this.currentVideo;
    } catch (error) {
      console.log('=======> getVideoInfo error', error);
    }
    return {};
  }
  /**
   * 通过dramaId和serialNo，从微搭获取剧集信息
   * @param {*} data 
   * @returns 
   */
  async getSectionInfo(data) {
    const { dramaId, serialNo } = data || {};
    const key = `${dramaId}_${serialNo}`;
    if (this.sectionList[key]) {
      this.currentSection = this.sectionList[key];
      return this.currentSection;
    }
    const video_id = (await this.getVideoInfo(data))?._id;
    try {
      const res = await $w.app?.cloud?.callDataSource?.({
        dataSourceName: 'playlet_section_u2l0sqa',
        methodName: 'wedaGetItemV2',
        params: {
          select: {
            $master: true,
          },
          filter: {
            where: {
              $and: [
                {
                  series_number: {
                    $eq: +serialNo,
                  },
                },
                {
                  video_id: {
                    $eq: video_id
                  }
                }
              ],
            },
          },
        },
      });
      console.log('=======> getSectionInfo res', res);
      this.sectionList[key] = { video_id, ...res };
      this.currentSection = this.sectionList[key];
      return this.currentSection;
    } catch (error) {
      console.log('=======> getSectionInfo error', error);
    }
    return {};
  }
  /**
   * 同步点赞信息到微搭
   * @param {*} data 
   * @returns 
   */
  async setLikeState(data) {
    const { event } = data || {};
    const { _id } = this.currentSection || {};
    if (!_id) return;
    try {
      const res = await $w.app?.cloud?.callDataSource?.({
        dataSourceName: 'zdydm_xyqe7jc',
        methodName: 'method_a39de228b1eda11',
        params: {
          section_id: _id,
          operate_type: { 'UNLIKE': '2', 'LIKE': '1' }[event],
        },
      });
      console.log('=======> setLikeState res', res);
    } catch (error) {
      console.log('=======> setLikeState error', error);
    }
  }
  /**
   * 同步追剧信息到微搭
   * @param {*} data 
   * @returns 
   */
  async collectVideo(data) {
    const { event } = data || {};
    const { video_id } = this.currentSection || {};
    if (!video_id) return;
    try {
      let res = {};
      // 查询是否已经追过
      const deleteId = event === 'UNFAV' && (await $w.app?.cloud?.callDataSource?.({
        dataSourceName: 'playlet_user_follow_b9g5hjw',
        methodName: 'wedaGetItemV2',
        params: {
          select: {
            $master: true,
          },
          filter: {
            where: {
              $and: [
                {
                  video_id: {
                    $eq: video_id
                  }
                }
              ],
            },
          },
        },
      }))?._id;
      // 如果追过，且现在不追，则删除
      if (deleteId) {
        res = await $w.app?.cloud?.callDataSource?.({
          dataSourceName: 'playlet_user_follow_b9g5hjw',
          methodName: 'wedaDeleteV2',
          params: {
            select: {
              $master: true,
            },
            filter: {
              where: {
                $and: [
                  {
                    _id: {
                      $eq: deleteId
                    }
                  },
                  {
                    mini_program_id: {
                      $eq: $w.app.mpAppId
                    }
                  }
                ],
              },
            },
          },
        });
      } else if (event === 'FAV') {
        res = await $w.app?.cloud?.callDataSource?.({
          dataSourceName: 'playlet_user_follow_b9g5hjw',
          methodName: 'wedaCreateV2',
          params: {
            data: {
              mini_program_id: { _id: $w.app.mpAppId },
              tfid: { _id: $w.app.dataset.state.launchQuery?.tfid || '' },
              agent_id: { _id: $w.app.dataset.state.launchQuery?.invite_code || '' },
              user_id: { _id: $w.app.dataset.state.videoUserInfo._id },
              video_id: { _id: video_id }
            }
          },
        });
      }
      console.log('=======> collectVideo res', res);
    } catch (error) {
      console.log('=======> collectVideo error', error);
    }
  }
  /**
   * 处理看剧请求
   * @param {*} param0.enbled 是否同时获取插件加密串
   * @returns 
   */
  async dealSectionData({ enbled = true, serialNo } = {}) {
    try {
      await $w.app.common.updateWxSessionKey();
      const result = await $w.app.cloud.callDataSource({
        dataSourceName: 'zdydm_xyqe7jc',
        methodName: 'method_c6e4e519dea4dc4', // 付费看剧
        params: {
          enbled, // 是否获取加密串
          section_id: this.currentSection?._id,
          video_id: this.currentVideo?._id,
          tfid: $w.app.dataset.state.launchQuery?.tfid || '', // 投放链接
          agent_id: $w.app.dataset.state.launchQuery?.invite_code || '', // 代理商
        }
			});
			const isFree = result?.lockDataSerialList?.filter(v => v.status === 1).find(v => +serialNo >= v.start_serial_no && +serialNo <= v.end_serial_no);
			if (enbled && !isFree) {
				this.pm?.showChargeDialog()
			}
      return result;
    } catch (error) {
      return null
    }
  }
  /**
   * 看剧，在这里获取插件的加密串和freeList
   * @param {*} data 
   */
  async playSection({ serialNo } = {}) {
    if (this.checkSectionPlayStatus(serialNo) && !this.requestEncryptForce) {
      AsyncSingletonLock(this.dealSectionData, [{ enbled: false, serialNo }]); // 不获取加密串，仅更新看剧状态
      return this.encryptDataCache;
    }
    const result = await this.dealSectionData({ enbled: true, serialNo }); // 获取加密串
    this.encryptDataCache = result;
    this.lockPlayCache.push(serialNo);
    this.requestEncryptForce = false;
    if (!result) {
      return this.encryptDataCache || { data: '', free_list: [{ start_serial_no: 1, end_serial_no: this.currentVideo?.recharge_start - 1 }] };
    }
    return result;
  }
  /**
   * 查询剧集的观看状态
   * @param {*} serialNo 
   * @returns 
   */
  checkSectionPlayStatus(serialNo) {
		const { data, free_list, lockDataSerialList } = this.encryptDataCache || {};
    if (!data || !free_list) return false;
    // 是否免费
    const isFree = (lockDataSerialList?.filter(v => v.status === 1) || free_list).find(v => v.start_serial_no <= serialNo && v.end_serial_no >= serialNo);
    // 是否已经请求过剧集状态
    const hasReqStatus = this.lockPlayCache.includes(serialNo)
    if (!isFree && hasReqStatus) {
			this.pm?.showChargeDialog()
		}
    return isFree || hasReqStatus;
  }
  /**
   * 充值成功的回调
   * @param {*} isSuccess 
   */
  async chargeCallBack(isSuccess) {
    if (isSuccess) {
      wx.showLoading({ title: '请稍后' });
      this.encryptDataCache = null;
      this.lockPlayCache = [];
      this.requestEncryptForce = true;
      await this.getCurrentAccount();
      await new Promise(resolve => {
        setTimeout(() => {
          resolve(true)
        }, 4000)
      })
      if (this.pm) {
        const { serialNo } = this.pm?.getInfo();
        const res = await AsyncSingletonLock(this.getEncryptData, [{ serialNo }])
        this.pm?.setCanPlaySerialList?.({
          data: res.encryptedData || '',
          freeList: res.freeList,
        })
      }
      await $w.app.common?.getVideoUserInfo?.();
      wx.hideLoading();
    }
  }
  resetInnerState() {
    this.sectionList = {}; // 剧集信息缓存表
    this.videoList = {}; // 剧目信息缓存表
    this.currentVideo = null; // 当前剧目信息
    this.currentSection = {}; // 当前剧集信息
    this.encryptDataCache = null; // 当前剧集的播放签名缓存
    this.lockPlayCache = []; // 已经调用过扣币的待解锁的剧集缓存列表，充值后会清空
    this.requestEncryptForce = true; // 是否强制刷新签名
    this.currentAccount = null; // 用户账户信息
    $w.app.dataset.state.playerManagerInfo = {
      currentVideo: null,
      currentAccount: null,
    }
  }
  /**
   * 是否显示open-area-left-side组件
   * @param {*} isShow 
   * @param {*} needBack 关闭组件后是否返回 
   */
  showLeftSide(isShow, needBack = false) {
    console.log('=======> showLeftSide', { isShow, needBack });
    if (needBack) {
      if (getCurrentPages?.()?.length > 1) {
        this.pm.navigateBack({ fail: console.log });
      } else {
        this.pm.reLaunch({ url: '/pages/index/index', fail: console.log });
      }
    }
    this.pm.updateOpenArea({
      leftsideAreaList: isShow ? [{ // left top width height定义每个元素的位置
        left: 10,
        top: 100,
        width: 400,
        height: 172
      }] : [],
    })
  }
}
const playerManager = new PlayerManager();
export default function getPlayerManager() {
  return playerManager;
}
