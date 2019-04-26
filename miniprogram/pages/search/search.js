let request = require('../../utils/request.js');
let app = getApp();
let api = app.globalData.api;
Page({

    data: {
        searchkey: '',
        isSearch: false
    },

    onLoad: function(options) {
        wx.getSetting({
            success: (res) => {
                if (!res.authSetting['scope.userInfo'] || !wx.getStorageSync('userInfo')) {
                    app.globalData.login = 0;
                    wx.switchTab({
                        url: '../index/index',
                    })
                }
            }
        });
        wx.setNavigationBarTitle({
            title: app.globalData.subject.name
        })
    },

    searchInput(e) {
        this.setData({
            searchkey: e.detail.value
        })
    },

    search() {
        let searchkey = this.data.searchkey;
        if (searchkey == '') {
            wx.showToast({
                title: '关键词不能为空',
                icon: 'none'
            })
            return;
        }
        if (searchkey.length < 2) {
            wx.showToast({
                title: '关键词长度最少为2',
                icon: 'none'
            })
            return;
        }
        request.searchQuestion(searchkey, app.globalData.subject.id)
            .then((res) => {
                let searchList = res.data;
                res.data.forEach((item, key) => {
                    searchList[key].title = this.hilight_word(searchkey, item.title)
                })
                this.setData({
                    searchList: searchList,
                    total: searchList.length,
                    isSearch: true
                });
            })
            .catch((error) => {
                console.log(error)
            })
    },

    // 根据搜索字分割字符
    hilight_word: function(key, word) {
        let idx = word.indexOf(key),
            t = [];

        if (idx > -1) {
            if (idx == 0) {
                t = this.hilight_word(key, word.substr(key.length));
                t.unshift({
                    key: true,
                    str: key
                });
                return t;
            }

            if (idx > 0) {
                t = this.hilight_word(key, word.substr(idx));
                t.unshift({
                    key: false,
                    str: word.substring(0, idx)
                });
                return t;
            }
        }
        return [{
            key: false,
            str: word
        }];
    }

})