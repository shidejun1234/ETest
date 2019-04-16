Page({

    /**
     * 页面的初始数据
     */
    data: {
        index: 0,
        optionsList: [{
            id: 1,
            name: '模拟考试',
            img: '../../images/test-bar.png',
            src: ''
        }, {
            id: 2,
            name: '快速搜题',
            img: '../../images/search-bar.png',
            src: ''
        }, {
            id: 3,
            name: '模拟考试',
            img: '../../images/user-unlogin.png',
            src: ''
        }, {
            id: 4,
            name: '模拟考试',
            img: '../../images/user-unlogin.png',
            src: ''
        }, {
            id: 3,
            name: '模拟考试',
            img: '../../images/user-unlogin.png',
            src: ''
        }, {
            id: 4,
            name: '模拟考试',
            img: '../../images/user-unlogin.png',
            src: ''
        }, {
            id: 3,
            name: '模拟考试',
            img: '../../images/user-unlogin.png',
            src: ''
        }, {
            id: 4,
            name: '模拟考试',
            img: '../../images/user-unlogin.png',
            src: ''
        }],
        testList: [{
            id: 1,
            name: '计算机',
        }, {
            id: 2,
            name: '英语',
        }]
    },

    testChange(e) {
        console.log(e);
        this.setData({
            index: e.detail.value
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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