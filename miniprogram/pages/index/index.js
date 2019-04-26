let request = require('../../utils/request.js');
let app = getApp();
let api = app.globalData.api;
let id = '';
let openid = '';
let cur_subject = '';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        api: api,
        red: false,
        showPer: false,
        showMask: true,
        optionsList: [{
            id: 1,
            name: '模拟考试',
            img: '../../images/test-bar.png',
            url: '../test_ready/test_ready'
        }, {
            id: 2,
            name: '快速搜题',
            img: '../../images/search-bar.png',
            url: '../search/search'
        }]
    },

    onShow() {
        if (app.globalData.login === 1) {
            return;
        }
        wx.showLoading({
            title: '页面加载中'
        })
        wx.login({
            success: (res) => {
                request.getOpenId(res.code)
                    .then(res => {
                        openid = res.data.openid;
                        wx.getSetting({
                            success: (res) => {
                                if (!res.authSetting['scope.userInfo'] || !wx.getStorageSync('userInfo')) {
                                    this.setData({
                                        showPer: true,
                                        showMask: true
                                    })
                                    wx.hideLoading();
                                } else {
                                    this.login(wx.getStorageSync('userInfo'));
                                }
                            }
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        })
    },

    nav(e) {
        if (!(this.data.pIndex + 1)) {
            wx.showToast({
                title: '请选择科目',
                icon: 'none'
            })
            this.setData({
                red: true
            });
            return;
        }
        let url = e.currentTarget.dataset.url;
        wx.navigateTo({
            url: url,
        })
    },

    testChange(e) {
        let key = e.detail.value
        this.setData({
            pIndex: e.detail.value,
            red: false
        });
        request.setCurSubject(this.data.testList[key].id, id)
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error);
            })
        app.globalData.subject = this.data.testList[key];
    },

    onGotUserInfo(e) {
        if (app.globalData.login===0) {
            this.setData({
                showPer: false,
                showMask: false
            })
            if (e.detail.userInfo) {
                let userInfo = e.detail.userInfo;
                this.login(userInfo);
                wx.setStorageSync('userInfo', userInfo);
            } else {
                this.setData({
                    showMask: true
                })
                this.onShow();
            }
        }
    },

    login(userInfo) {
        request.login(openid, userInfo)
            .then(res => {
                id = res.data.id;
                app.globalData.user = id;
                cur_subject = res.data.cur_subject;
            })
            .then(() => {
                return request.getSubject()
            })
            .then(res => {
                if (res.code === 0) {
                    this.setData({
                        testList: res.data
                    });
                    return res.data;
                } else {
                    wx.showToast({
                        title: res.message,
                    })
                    return 0;
                }
            })
            .then((res) => {
                if (res != 0) {
                    res.some((item, index) => {
                        if (item.id == cur_subject) {
                            this.setData({
                                pIndex: index,
                                showMask: false
                            })
                            app.globalData.subject = res[index];
                            return true;
                        }
                    })
                }
            })
            .then(() => {
                app.globalData.login = 1;
                wx.hideLoading();
            })
            .catch(error => {
                console.log(error)
            });
    },

    onShareAppMessage: function() {
        return {
            title: '模拟考试综合性在线学习平台',
            path: '/pages/index/index'
        }
    }

})