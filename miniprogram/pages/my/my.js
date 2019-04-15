// pages/my/my.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mode: ["我的收藏", "我的订单", "我的地址", "联系客服", "关于我们"]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var userInfo = wx.getStorageSync('userInfo');
        if (userInfo){
            this.setData({
                userInfo: userInfo,
                isLogin:true
            });
        }        
    },

    onGotUserInfo: function (e) {
        if (e.detail.userInfo) {
            wx.setStorageSync('userInfo', e.detail.userInfo);
            this.setData({
                userInfo: e.detail.userInfo,
                isLogin: true
            });
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})