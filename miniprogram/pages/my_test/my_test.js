let request = require('../../utils/request.js');
let app = getApp();
let api = app.globalData.api;
Page({

    data: {},

    onLoad: function(options) {
        wx.showLoading({
            title: '试卷加载中',
        })
        wx.setNavigationBarTitle({
            title: app.globalData.subject.name
        })
        request.getMyText(app.globalData.user,app.globalData.subject.id)
            .then((res) => {
                this.setData({
                    testList: res.data
                })
            })
            .then(()=>{
                wx.hideLoading();
            })
            .catch((error) => {
                console.log(error)
            })
    },

    rewinding(e){
        wx.navigateTo({
            url: '../rewinding/rewinding?id='+e.currentTarget.dataset.id,
        })
    }

})