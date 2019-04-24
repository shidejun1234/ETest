let request = require('../../utils/request.js');
let app = getApp();
let api = app.globalData.api;
Page({

    data: {},

    onLoad: function(options) {
        request.getMyText(app.globalData.user,app.globalData.subject.id)
            .then((res) => {
                this.setData({
                    testList: res.data
                })
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