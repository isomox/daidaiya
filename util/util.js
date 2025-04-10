const timestampToTimes = (timestamp) => {
    let date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-'
    let M =
        (date.getMonth() + 1 < 10 ?
            '0' + (date.getMonth() + 1) :
            date.getMonth() + 1) + '-'
    let D =
        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '

    return Y + M + D 
};
const timestampToTime = (timestamp) => {
    let date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let M =
        (date.getMonth() + 1 < 10 ?
            '0' + (date.getMonth() + 1) :
            date.getMonth() + 1) + '-'
    let D =
        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    let h =
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    let m =
        (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) 
    return M + D + h + m 
};
const timestampyue = (timestamp) => {
    let date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-'
    let M =
        (date.getMonth() + 1 < 10 ?
            '0' + (date.getMonth() + 1) :
            date.getMonth() + 1) + '-'
    let D =
        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '

    return M + D 
};

function getstatus(lx){
	if(lx==1){return "待接单"; }
	else if(lx==2){return "已接单"; }
	else if(lx==3){return "派送中"; }
	else if(lx==4){return "已送达"; }
	else if(lx==5){return "已签收"; }
	else if(lx==6){return "已评价"; }
	else if(lx==9){return "订单取消"; }
}

function getcanshu(lx){
	let name="";
	
	if(lx==1){return "待接单"; }
	else if(lx==2){return "已接单"; }
	else if(lx==3){return "派送中"; }
	else if(lx==4){return "已送达"; }
	else if(lx==5){return "已签收"; }
	else if(lx==6){return "已评价"; }
	else if(lx==9){return "订单取消"; }
}

/**
 * 导出 
 **/
export {
    timestampToTimes,
	timestampToTime,
	timestampyue,
	getstatus
}