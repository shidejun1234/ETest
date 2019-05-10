let request = require('../../utils/request.js');
let app = getApp();
let api = app.globalData.api;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mode: [{
            name: '意见反馈',
            fun: 'showFeedback'
        }, {
            name: '联系我们',
            fun: 'contactMe'
        }, {
            name: '在线客服',
            fun: 'callCenter',
            openType: 'contact'
        }],
        showFeedback: false,
        showMask: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var userInfo = wx.getStorageSync('userInfo');
        if (userInfo) {
            this.setData({
                userInfo: userInfo,
                isLogin: true
            });
        }
    },

    showFeedback() {
        this.setData({
            showFeedback: true,
            showMask: true
        });
    },

    hiddenFeedback() {
        this.setData({
            showFeedback: false,
            showMask: false
        });
    },

    doFeedback(e) {
        if (this.trim(e.detail.value.feedback) == '') {
            wx.showToast({
                title: '请输入反馈内容',
                icon: 'none'
            });
            return;
        }
        let feedback = e.detail.value.feedback;
        let user = app.globalData.user
        request.feedback(user, feedback)
            .then((res) => {
                console.log(res);
                this.hiddenFeedback();
                wx.showToast({
                    title: '提交成功',
                    icon: 'none'
                });
            })
            .catch((error) => {
                console.log(error);
            })
    },

    contactMe() {
        wx.showModal({
            title: '联系我们',
            content: '如果想添加自己的题目可以发邮件\n\r1160907561@qq.com',
            showCancel: false
        })
    },

    onGotUserInfo: function(e) {
        if (e.detail.userInfo) {
            wx.setStorageSync('userInfo', e.detail.userInfo);
            this.setData({
                userInfo: e.detail.userInfo,
                isLogin: true
            });
        }
    },

    trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    }

})