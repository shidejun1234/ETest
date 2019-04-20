let app = getApp();
let api = app.globalData.api;

let getSubject = () => {
    return new Promise(function(resolve, reject) {
        wx.request({
            url: `${api}getSubject`,
            success: (res) => {
                if (res) {
                    resolve(res.data);
                } else {
                    reject('error');
                }
            }
        })
    });
}

let getOpenId = (code) => {
    return new Promise(function(resolve, reject) {
        wx.request({
            url: `${api}getOpenId`,
            method: 'POST',
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                code: code
            },
            success: (res) => {
                if (res) {
                    resolve(res.data);
                } else {
                    reject('error');
                }
            }
        })
    });
}

let login = (openid, userInfo) => {
    return new Promise(function(resolve, reject) {
        wx.request({
            url: `${api}login`,
            method: 'POST',
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                openid: openid,
                nickName: userInfo.nickName,
                avatarUrl: userInfo.avatarUrl
            },
            success: (res) => {
                if (res) {
                    resolve(res.data);
                } else {
                    reject('error');
                }
            }
        })
    });
}


let setCurSubject = (cur_subject, id) => {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: `${api}setCurSubject`,
            method: 'POST',
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                cur_subject: cur_subject,
                id: id
            },
            success: (res) => {
                if (res) {
                    resolve(res.data);
                } else {
                    reject('error');
                }
            }
        });
    });
}

module.exports = {
    getSubject: getSubject,
    getOpenId: getOpenId,
    login: login,
    setCurSubject: setCurSubject
}