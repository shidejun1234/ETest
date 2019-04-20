// pages/test/test.js
let time1;
Page({

    data: {
        testList: [],
        answerList: [],
        checkAnswerList: [],
        time: '90:00',
        current: 0,
        showFeedback: false,
        showMenu: false,
        showMase: false,
        amount: 0,
        showNotice: false,
        showResult: false
    },

    onLoad: function(options) {
        console.log(options)
        let time = 60 * 90;
        this.getTime(time);
        let testList = this.data.testList;
        this.setTest(testList);
    },

    submit(e) {
        if (!e.currentTarget.dataset.key) {
            if (this.data.total !== this.data.amount) {
                this.showNotice();
                return;
            }
        } else {
            this.hiddenNotice();
        }
        let score = 0;
        let answerList = this.data.answerList;
        let checkAnswerList = this.data.checkAnswerList;
        for (let i = 0; i < answerList.length; i++) {
            if (answerList[i] === checkAnswerList[i]) {
                score += 1;
            }
        }
        score = score / answerList.length * 100;
        score = Math.round(score);
        this.showResult();
        clearInterval(time1);
        let useM = 89 - this.data.time.split(':')[0];
        if (useM < 10) {
            useM = '0' + useM;
        }
        let useS = 60 - this.data.time.split(':')[1];
        if (useS < 10) {
            useS = '0' + useS;
        }
        this.setData({
            score: score,
            useM: useM,
            useS: useS
        });
    },

    showResult() {
        this.setData({
            showResult: true,
            showMask: true
        });
    },

    hiddenResult() {
        this.setData({
            showResult: false,
            showMask: false
        });
        wx.navigateBack({

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

    setTest(testList) {
        let tl = [{
            id: 1,
            title: '你是不是个智障',
            type: '选择题',
            options: [{
                key: 'A',
                val: '是'
            }, {
                key: 'B',
                val: '是吧'
            }, {
                key: 'C',
                val: '可能是'
            }, {
                key: 'D',
                val: '你猜是不是'
            }],
            answer: 'D'
        }, {
            id: 2,
            title: '2你是不是个智障',
            type: '判断题',
            options: [{
                key: 'A',
                val: '是'
            }, {
                key: 'B',
                val: '是吧'
            }],
            answer: 'B'
        }];
        for (let i = 2; i < 12; i++) {
            let ll = [{
                id: i + 1,
                title: i + 1 + '你是不是个智障',
                type: '判断题',
                options: [{
                    key: 'A',
                    val: '是'
                }, {
                    key: 'B',
                    val: '是吧'
                }],
                answer: 'B'
            }]
            tl[i] = ll[0];
        }
        let answerList = [];
        for (let i = 0; i < tl.length; i++) {
            testList[i] = tl[i];
            testList[i].check = false;
            testList[i].checkAnswer = '';
            answerList[i] = tl[i].answer;
        }
        this.setData({
            testList: testList,
            total: testList.length,
            answerList: answerList
        });
    },

    getTime(time) {
        time1 = setInterval(() => {
            time -= 1;
            let m = parseInt(time / 60);
            let s = parseInt(time % 60);
            if (m < 10) {
                m = '0' + m;
            }
            if (s < 10) {
                s = '0' + s;
            }
            this.setData({
                time: `${m}:${s}`
            });
            if (time == 0) {
                clearInterval(time1)
            }
        }, 1000);
    },

    trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    }

})