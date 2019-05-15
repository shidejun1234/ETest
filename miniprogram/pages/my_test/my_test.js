let request = require('../../utils/request.js');
let app = getApp();
let api = app.globalData.api;
Page({

    data: {},

    onLoad: function(options) {
        wx.showLoading({
            title: '试卷加载中',
        })
        if (options.key == 'all') {
            this.setData({
                title: '我的试卷'
            })
        } else if (options.key == 'wrong') {
            this.setData({
                title: '我的错题'
            })
        }
        wx.setNavigationBarTitle({
            title: app.globalData.subject.name
        })
        request.getMyText(app.globalData.user, app.globalData.subject.id, options.type, options.key)
            .then((res) => {
                this.setData({
                    key: options.key,
                    testList: res.data
                })
            })
            .then(() => {
                wx.hideLoading();
            })
            .catch((error) => {
                console.log(error)
            })
    },

    rewinding(e) {
        if (this.data.key == 'all') {
            wx.navigateTo({
                url: '../rewinding/rewinding?id=' + e.currentTarget.dataset.id + '&key=' + this.data.key
            })
        } else if (this.data.key == 'wrong') {
            wx.navigateTo({
                url: '../rewinding/rewinding?id=' + e.currentTarget.dataset.id + '&key=' + this.data.key
            })
        }
    }

})