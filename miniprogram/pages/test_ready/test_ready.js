let request = require('../../utils/request.js');
let app = getApp();
let api = app.globalData.api;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showToast: false,
        showMask: false,
        refresh: false
    },

    onShow() {
        if (this.data.key == 'wrong'&&this.data.refresh) {
            this.onLoad({
                key: 'wrong'
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        switch (options.key) {
            case 'rand':
                wx.setNavigationBarTitle({
                    title: '模拟考试',
                })
                this.setData({
                    key: options.key,
                    keyType: '考试'
                });
                break;
            case 'order':
                wx.setNavigationBarTitle({
                    title: '顺序练题',
                })
                this.setData({
                    key: options.key,
                    keyType: '练习'
                })
                break;
            case 'wrong':
                wx.setNavigationBarTitle({
                    title: '顺序错题',
                })
                this.setData({
                    key: options.key,
                    keyType: '测试'
                });
                break;
        }
        wx.getSetting({
            success: (res) => {
                if (!res.authSetting['scope.userInfo'] || !wx.getStorageSync('userInfo')) {
                    app.globalData.login = 0;
                    wx.switchTab({
                        url: '../index/index',
                    })
                } else {
                    this.setData({
                        userInfo: wx.getStorageSync('userInfo')
                    })
                }
            }
        });
        let subject = app.globalData.subject;
        this.getQuestion(subject);
    },

    getQuestion(subject) {
        request.getTest(subject.id, this.data.key, app.globalData.user)
            .then((res) => {
                let test = res.data;
                test.subject = subject.id;
                this.setData({
                    subject: subject,
                    tabList: [{
                        key: this.data.keyType + '科目',
                        val: subject.name
                    }, {
                        key: '试题数量',
                        val: test.num + '题'
                    }, {
                        key: this.data.keyType + '时间',
                        val: test.time + '分钟'
                    }, {
                        key: '合格标准',
                        val: `满分${test.total}分，${test.qualified}分合格`
                    }],
                    test: test,
                    refresh: true
                });
            })
            .catch((error) => {
                console.log(error)
            })
    },

    myTest(e) {
        wx.navigateTo({
            url: '../my_test/my_test?key=' + e.currentTarget.dataset.key + '&type=' + this.data.key,
        })
    },

    start() {
        if (this.data.test.num == 0) {
            if (this.data.key == 'wrong') {
                wx.showToast({
                    title: '没有错题',
                    icon: 'none'
                })
            } else {
                wx.showToast({
                    title: 'sorry，这个科目暂时没有题目',
                    icon: 'none'
                })
            }
            return;
        }
        this.hiddenToast();
        wx.navigateTo({
            url: '../test/test?test=' + JSON.stringify(this.data.test) + '&key=' + this.data.key,
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