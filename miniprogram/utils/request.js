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
    return new Promise(function(resolve, reject) {
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

let getTest = (subject, type, user) => {
    return new Promise(function(resolve, reject) {
        wx.request({
            url: `${api}getTest`,
            method: 'POST',
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                subject: subject,
                type: type,
                user,user
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

let getQuestion = (subject, num, key,user) => {
    return new Promise(function(resolve, reject) {
        wx.request({
            url: `${api}getQuestion`,
            method: 'POST',
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                subject: subject,
                num: num,
                key: key,
                user: user
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

let setTest = (list) => {
    return new Promise(function(resolve, reject) {
        wx.request({
            url: `${api}setTest`,
            method: 'POST',
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                list: list
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

let getMyText = (user, subject, type) => {
    return new Promise(function(resolve, reject) {
        wx.request({
            url: `${api}getMyText`,
            method: 'POST',
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                user: user,
                subject: subject,
                type: type
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

let getRewinding = (id, key) => {
    return new Promise(function(resolve, reject) {
        wx.request({
            url: `${api}getRewinding`,
            method: 'POST',
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                id: id,
                type: key
            },
            success: (res) => {
                console.log(res)
                if (res) {
                    resolve(res.data);
                } else {
                    reject('error');
                }
            }
        });
    });
}

let searchQuestion = (key, subject) => {
    return new Promise(function(resolve, reject) {
        wx.request({
            url: `${api}searchQuestion`,
            method: 'GET',
            data: {
                key: key,
                subject: subject
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

let feedback = (user, feedback, question = 0) => {
    return new Promise(function(resolve, reject) {
        wx.request({
            url: `${api}feedback`,
            method: 'POST',
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                user: user,
                feedback: feedback,
                question: question
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
    setCurSubject: setCurSubject,
    getTest: getTest,
    getQuestion: getQuestion,
    setTest: setTest,
    getMyText: getMyText,
    getRewinding: getRewinding,
    searchQuestion: searchQuestion,
    feedback: feedback
}