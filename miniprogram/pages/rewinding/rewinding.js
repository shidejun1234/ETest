let request = require('../../utils/request.js');
let app = getApp();
let api = app.globalData.api;
Page({

    data: {
        testList: [],
        answerList: [],
        checkAnswerList: [],
        current: 0,
        showFeedback: false,
        showMenu: false,
        showMask: false,
        amount: 0,
    },

    onLoad: function(options) {
        wx.showLoading({
            title: '试题加载中'
        })
        let testList = this.data.testList;
        this.setTest(testList,options.id,options.key);
    },

    setTest(testList,id,key) {
        request.getRewinding(id,key)
            .then((res) => {
                let question = res.data;
                this.setData({
                    testList: question,
                    total: question.length,
                });
                wx.hideLoading();
            })
            .catch((error) => {
                console.log(error)
            })
    },

    showNotice() {
        this.setData({
            showNotice: true,
            showMask: true
        });
    },

    hiddenNotice() {
        this.setData({
            showNotice: false,
            showMask: false
        });
    },

    toTest(e) {
        this.setData({
            current: e.currentTarget.dataset.key
        })
        this.hiddenMenu();
    },

    showMenu() {
        this.setData({
            showMenu: true,
            showMask: true
        });
    },

    hiddenMenu() {
        this.setData({
            showMenu: false,
            showMask: false
        });
    },

    showFeedback() {
        this.setData({
            showFeedback: true,
            showMask: true
        });
    },

    hiddenFeedback() {
        this.setData({
            showFeedback: false,
            showMask: false
        });
    },

    doFeedback(e) {
        if (this.trim(e.detail.value.feedback) == '') {
            wx.showToast({
                title: '请输入反馈内容',
                icon: 'none'
            });
            return;
        }
        let feedback = e.detail.value.feedback;
        let question = this.data.testList[this.data.current].id;
        let user = app.globalData.user
        request.feedback(user, feedback, question)
            .then((res) => {
                this.hiddenFeedback();
                wx.showToast({
                    title: '提交成功',
                    icon: 'none'
                });
            })
            .catch((error) => {
                console.log(error);
            })
    },

    prev() {
        let current = this.data.current - 1;
        if (current < 0) {
            wx.showToast({
                title: '这是第一题了',
                icon: 'none'
            })
            return;
        }
        this.setData({
            current: current
        });
    },

    next() {
        let current = this.data.current + 1;
        if (current > this.data.testList.length - 1) {
            wx.showToast({
                title: '这是最后一题了',
                icon: 'none'
            })
            return;
        }
        this.setData({
            current: current
        });
    },

    trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    }

})