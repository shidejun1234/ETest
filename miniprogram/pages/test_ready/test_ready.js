let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showToast:false,
        showMask:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        wx.getSetting({
            success: (res) => {
                if (!res.authSetting['scope.userInfo'] || !wx.getStorageSync('userInfo')) {
                    wx.switchTab({
                        url: '../index/index',
                    })
                } else {
                    let userInfo = wx.getStorageSync('userInfo');
                    if (userInfo) {
                        this.setData({
                            userInfo: userInfo
                        });
                        console.log(userInfo)
                    }
                }
            }
        });
        let subject = app.globalData.subject;
        this.setData({
            subject: subject,
            tabList: [{
                key: '考试科目',
                val: subject.name
            }, {
                key: '试题数量',
                val: '100题'
            }, {
                key: '考试时间',
                val: '90分钟'
            }, {
                key: '合格标准',
                val: '满分100分，80分合格'
            }]
        });
    },

    start() {
        this.hiddenToast();
        wx.navigateTo({
            url: '../test/test?tid='+this.data.subject.id,
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