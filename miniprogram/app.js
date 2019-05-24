//app.js
App({
    onLaunch: function() {
        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力')
        } else {
            wx.cloud.init({
                traceUser: true,
            })
        }

        this.globalData = {
            subject: '',
            login: 0,
            user: 0,
            // api: 'http://localhost/etest3/index/api/'
            api: 'https://e.fslujiaoxiang.cn/jiameng/zzshufulei/etest/index/api/'
        }
    },
})