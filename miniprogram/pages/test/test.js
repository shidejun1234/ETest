let request = require('../../utils/request.js');
let nowTime = require('../../utils/nowTime.js');
let app = getApp();
let api = app.globalData.api;
let time1;
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
        showNotice: false,
        showResult: false
    },

    onLoad: function(options) {
        wx.showLoading({
            title: '试题加载中'
        })
        let test = JSON.parse(options.test);
        let time = 60 * test.time;
        this.setData({
            test: test,
            type: options.key
        });
        this.getTime(time);
        let testList = this.data.testList;
        this.setTest(testList, test, options.key);
    },

    setTest(testList, test, key) {
        request.getQuestion(test.subject, test.num, key, app.globalData.user)
            .then((res) => {
                let answerList = [];
                for (let i = 0; i < res.data.length; i++) {
                    testList[i] = res.data[i];
                    testList[i].check = false;
                    testList[i].checkAnswer = '';
                    answerList[i] = res.data[i].answer;
                }
                this.setData({
                    testList: testList,
                    total: testList.length,
                    answerList: answerList,
                    create_time: nowTime.formatTime(new Date())
                });
                wx.hideLoading();
            })
            .catch((error) => {
                console.log(error)
            })
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
        let useM = this.data.test.time - 1 - this.data.time.split(':')[0];
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
        let test = this.data.test;
        test.user = app.globalData.user;
        test.score = score;
        test.use_time = `${useM}分${useS}秒`;
        test.create_time = this.data.create_time;
        let question = this.data.testList;
        let question_ids = '';
        let check_answer = [];
        question.forEach(function(item, key) {
            question_ids += item.id + ',';
            if (checkAnswerList[key] == undefined) {
                check_answer.push({
                    answer: 0
                })
            } else {
                check_answer.push({
                    answer: checkAnswerList[key]
                })
            }
        });
        test.question_ids = question_ids.substr(0, question_ids.length - 1);
        test.check_answer = JSON.stringify(check_answer);
        test.type = this.data.type
        console.log(test);
        let list = JSON.stringify(test);
        request.setTest(list);
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

    getTime(time) {
        time1 = setInterval(() => {
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
                clearInterval(time1);
                this.submit({
                    currentTarget: {
                        dataset: {
                            key: 'sub'
                        }
                    }
                })
            }
            time -= 1;
        }, 1000);
    },

    trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    }

})