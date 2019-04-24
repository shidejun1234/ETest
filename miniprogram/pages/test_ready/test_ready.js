let request = require('../../utils/request.js');
let app = getApp();
let api = app.globalData.api;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showToast: false,
        showMask: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.getSetting({
            success: (res) => {
                if (!res.authSetting['scope.userInfo'] || !wx.getStorageSync('userInfo')) {
                    app.globalData.login = 0;
                    wx.switchTab({
                        url: '../index/index',
                    })
                } else {
                    let userInfo = wx.getStorageSync('userInfo');
                    if (userInfo) {
                        this.setData({
                            userInfo: userInfo
                        });
                    }
                }
            }
        });
        let subject = app.globalData.subject;
        this.getQuestion(subject);
    },

    getQuestion(subject) {
        request.getTest(subject.id)
            .then((res) => {
                let test = res.data;
                test.subject = subject.id;
                this.setData({
                    subject: subject,
                    tabList: [{
                        key: '考试科目',
                        val: subject.name
                    }, {
                        key: '试题数量',
                        val: test.num + '题'
                    }, {
                        key: '考试时间',
                        val: test.time + '分钟'
                    }, {
                        key: '合格标准',
                        val: `满分${test.total}分，${test.qualified}分合格`
                    }],
                    test: test
                });
            })
            .catch((error) => {
                console.log(error)
            })
    },

    myTest(){
        wx.navigateTo({
            url: '../my_test/my_test',
        })
    },

    start() {
        if (this.data.test.num == 0) {
            wx.showToast({
                title: 'sorry，这个科目暂时没有题目',
                icon: 'none'
            })
            return;
        }
        this.hiddenToast();
        wx.navigateTo({
            url: '../test/test?test=' + JSON.stringify(this.data.test),
        })
    },

    showToast() {
        this.setData({
            showToast: true,
            showMask: true
        })
    },

    hiddenToast() {
        this.setData({
            showToast: false,
            showMask: false
        })
    }

})