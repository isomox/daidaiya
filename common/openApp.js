/*
	创建在h5端全局悬浮引导用户下载app的功能，
	如不需要本功能直接移除配置文件uni-starter.config.js下的h5/openApp即可
*/

import CONFIG from "../uni-starter.config.js";

const CONFIG_OPEN = CONFIG.h5.openApp || {};
// 仅H5端添加"打开APP"
export default function () {}
