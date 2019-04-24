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
        showMase: false,
        amount: 0,
    },

    onLoad: function(options) {
        wx.showLoading({
            title: '试题加载中'
        })
        let testList = this.data.testList;
        this.setTest(testList,options.id);
    },

    setTest(testList,id) {
        request.getRewinding(id)
            .then((res) => {
                let question = JSON.parse(res.data.question)
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
        console.log(this.data.testList[this.data.current].id)
        this.hiddenFeedback();
        wx.showToast({
            title: '提交成功',
            icon: 'none'
        });
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

    check(e) {
        let testList = this.data.testList;
        let current = this.data.current;
        let checkAnswerList = this.data.checkAnswerList;
        if (testList[current].checkAnswer) {
            return;
        }
        let key = e.currentTarget.dataset.key;
        testList[current].check = true;
        testList[current].checkAnswer = key;
        checkAnswerList[current] = key;
        this.setData({
            testList: testList,
            checkAnswerList: checkAnswerList,
            amount: this.data.amount + 1
        });
    },

    trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    }

})