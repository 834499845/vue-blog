<template>
    <div id="app" class="content">
        <div class="main">
            <div class="cont">
                <div>{{contObj.title}}</div>
                <div>
                    <div>
                        <div>
                            <span class="glyphicon glyphicon-time"></span>
                            <small>{{contObj.ctime | ctimeFun}}</small>
                        </div>
                        <div>
                            <span class="glyphicon glyphicon-tag"></span>
                            <span class="tall" v-for="(ta,index) in contObj.talls" @click="tallClick(index)">{{ta}}</span>
                        </div>
                    </div>
                    <div>
                        <span class="glyphicon glyphicon-eye-open"></span>
                        <small>{{contObj.read | readFun}} 人阅读</small>
                    </div>
                </div>
                <div>
                    <div>
                        <img src="/staticp/img/3123.png" alt="">
                    </div>
                    <div>
                        {{contObj.preface}}
                    </div>
                </div>
                <div>
                    <div class="txtclass" v-html="highlight(contObj.txt)">

                    </div>
                </div>
            </div>
            <div class="fenxiang">
                <div>
                </div>
                <div>
                    <span class="glyphicon glyphicon-comment"></span><small>评论</small>
                </div>
            </div>
        </div>
        <!--<div class="mmont">
            <div>
                <div>评论</div>
                <div><small>0</small>人参与</div>
            </div>
            <div class="montT">
                <div>
                    <textarea name="" placeholder="来说两句吧"></textarea>
                </div>
                <div>
                    <div>
                        快速登录：
                    </div>
                    <div>
                        <span class="glyphicon glyphicon-edit">发表跟帖</span>
                    </div>
                </div>
            </div>
            <div class="montP">
                <div>
                    <div @click="zuixinClick" :class="{bsClass:isXclasss,byClass:isByclasss}">
                        最新
                    </div>
                    <div @click="zuireClick" :class="{bsClass:!isXclasss,byClass:!isByclasss}">
                        最热
                    </div>
                </div>
                <div class="pl">
                    <ul>
                        <template v-if="plShow">
                            <li class="plcont">
                                <div>
                                    <img src="/staticp/img/成功.png" alt="">
                                </div>
                                <div class="plcont-c">
                                    <div>
                                        <div> <small>1213454453</small>[罗福斯 陕西西咸网友]</div>
                                        <div>2017-05-31 13:54:50</div>
                                    </div>
                                    <div>
                                        Bootstrap IE6兼容方案 Bsie弥补了Bootstrap对IE6的不兼容。目前，bsie能在IE6上支持大部分bootstrap的特性，可惜，还有一些实在无法支持...Bootstrap IE6兼容方案 Bsie弥补了Bootstrap对IE6的不兼容。目前，bsie能在IE6上支持大部分bootstrap的特性，可惜，还有一些实在无法支持...
                                    </div>
                                    <div>
                                        <div>
                                            <div>
                                                <span class="glyphicon glyphicon-thumbs-up"></span><small>0</small>
                                            </div>
                                            <div>
                                                <span class="glyphicon glyphicon-thumbs-down"></span><small>0</small>
                                            </div>
                                            <div>
                                                分享
                                            </div>
                                            <div>
                                                回复
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="pllast">
                                没有更多跟贴
                            </li>
                        </template>
                        <li v-else class="cpl">
                            网易云跟贴，有你更精彩
                        </li>
                    </ul>
                </div>
            </div>
        </div>-->
    </div>
</template>
<script>
    import { mapActions, mapState } from 'vuex'
    export default {
        name: 'content',
        data() {
            return {
                cliWindth: '',
                plShow: false,
                isXclasss: true,
                isByclasss: false,
                contObj: {
                    ctime: 0,
                    preface: '',
                    title: '',
                    txt: '',
                    _id: '',
                    talls: [],
                    __v: 0,
                    read: 0
                }
            }
        },
        created: function () {
            var self = this
            self.getDetails({
                id: self.$route.query.contId
            }).then((data) => {
                console.log('查询成功', data)
                if (data.status == 200) {
                    self.contObj = data.data
                } else {
                }
            }).catch(msg => {
                console.log(msg)
            })
        },
        filters: {
            ctimeFun: function (val) {
                if (val) {
                    var now = new Date(val)
                    var week = now.getDay()
                    var year = now.getYear() - 100;
                    var month = now.getMonth() + 1;
                    month = month > 9 ? month : "0" + month
                    var date = now.getDate();
                    date = date > 9 ? date : "0" + date
                    var hour = now.getHours();
                    hour = hour > 9 ? hour : "0" + hour
                    var minute = now.getMinutes();
                    minute = minute > 9 ? minute : "0" + minute
                    return "20" + year + "-" + month + "-" + date
                } else {
                    return '无'
                }
            },
            readFun: function (val) {
                if (val) {
                    if (val > 10000) {
                        var ss = Math.round(val / 10000)
                        return ss + '万+'
                    } else {
                        return val
                    }
                } else {
                    return 0
                }
            },
            showtxtFun: function (val) {
                var valStr = val.replace(/192.168.1.236/, "192.168.1.224")
                return valStr
            }
        },
        mounted() {
            var self = this
            window.onresize = function () {
                self.cliWindth = document.body.clientWidth
            }
        },
        watch: {
            // 监视搜索，发起搜索请求
            cliWindth: function (val, oldVal) {
                var self = this
                if (val >= 1185) {
                    self.$emit('childsay', 1200);
                } else if (val > 820 && val < 1185) {
                    self.$emit('childsay', 1000)
                } else if (val < 820) {
                    self.$emit('childsay', 820)
                }
            }
        },
        methods: {
            zuixinClick() {
                this.isXclasss = true
                this.isByclasss = false
            },
            zuireClick() {
                this.isXclasss = false
                this.isByclasss = true
            },
            tallClick(index) {
                var tagStr = this.contObj.talls[index]
                this.$router.push({
                    path: '/home/archives',
                    query: { sear: tagStr }
                })
            },
            ...mapActions(['getDetails'])
        }
    }

</script>
<style scoped>
    #app {
        width: 100%;
        min-height: 100px;
        background-color: #f5f8f9;
        overflow: hidden;
    }
    
    .main {
        overflow: hidden;
        width: 100%;
        min-height: 510px;
        background-color: #fff;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    }
    
    .cont {
        width: 100%;
        min-height: 510px;
    }
    
    .cont>div {
        width: 100%;
        color: #565a5f;
    }
    
    .cont>div:nth-child(1) {
        padding-left: 15px;
        /*overflow: hidden;*/
        min-height: 50px;
        /*line-height: 100px;*/
        /*white-space: nowrap;
        text-overflow: ellipsis;*/
        font-size: 36px;
        margin-top: 15px;
        color: #0097a7;
        cursor: pointer;
    }
    
    .cont>div:nth-child(1):hover {
        color: #38b7ea;
    }
    
    .cont>div:nth-child(2) {
        height: 45px;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
    }
    
    .cont>div:nth-child(2)>div:nth-child(1) {
        height: 100%;
        width: 80%;
        overflow: hidden;
        display: flex;
        flex-wrap: nowrap;
    }
    
    .cont>div:nth-child(2)>div:nth-child(2) {
        height: 100%;
        width: 20%;
    }
    
    .cont>div:nth-child(2)>div:nth-child(2)>span {
        height: 100%;
        width: 15px;
        display: block;
        float: left;
        line-height: 36px;
        margin-left: 10px;
    }
    
    .cont>div:nth-child(2)>div:nth-child(2)>small {
        height: 100%;
        min-width: 15px;
        display: block;
        float: left;
        margin-left: 3px;
        line-height: 40px;
    }
    
    .cont>div:nth-child(2)>div:nth-child(1)>div {
        /*border: 1px solid red;*/
    }
    
    .cont>div:nth-child(2)>div:nth-child(1)>div:nth-child(1) {
        height: 100%;
        min-width: 100px;
        display: flex;
        flex-wrap: nowrap;
    }
    
    .cont>div:nth-child(2)>div:nth-child(1)>div:nth-child(1)>span {
        height: 100%;
        width: 15px;
        display: block;
        line-height: 38px;
        margin-left: 10px;
    }
    
    .cont>div:nth-child(2)>div:nth-child(1)>div:nth-child(1)>small {
        margin-left: 10px;
        height: 100%;
        width: 75px;
        line-height: 40px;
        display: block;
    }
    
    .cont>div:nth-child(2)>div:nth-child(1)>div:nth-child(2) {
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-wrap: nowrap;
    }
    
    .cont>div:nth-child(2)>div:nth-child(1)>div:nth-child(2)>span {
        height: 100%;
        line-height: 38px;
        margin-left: 10px;
        cursor: pointer;
    }
    
    .cont>div:nth-child(2)>div:nth-child(1)>div:nth-child(2) .tall:hover {
        color: #38b7ea;
    }
    
    .cont>div:nth-child(3) {
        min-height: 70px;
        margin-bottom: 15px;
        width: 100%;
        background-color: #fcfcfc;
        overflow: hidden;
    }
    
    .cont>div:nth-child(3)>div {
        float: left;
        font-size: 15px;
    }
    
    .cont>div:nth-child(3)>div:nth-child(1) {
        width: 8%;
        min-width: 45px;
        height: 100%;
        overflow: hidden;
    }
    
    .cont>div:nth-child(3)>div:nth-child(2) {
        width: 92%;
        height: 80%;
        margin-top: 20px;
        margin-bottom: 10px;
    }
    
    .cont>div:nth-child(4) {
        min-height: 200px;
        /*overflow: hidden;*/
        /*padding-bottom: 10px;*/
    }
    
    .txtclass {
        margin: 0 auto;
        width: 96%;
    }
    
    .fenxiang {
        border-top: 1px solid #eceff2;
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .fenxiang>div {
        float: left;
    }
    
    .fenxiang>div:nth-child(2) {
        margin-right: 25px;
        display: flex;
        cursor: pointer;
    }
    
    .fenxiang>div:nth-child(2) span {
        height: 100%;
        width: 20px;
        display: block;
        line-height: 70px;
        color: #ccc;
    }
    
    .fenxiang>div:nth-child(2) small {
        height: 100%;
        width: 40px;
        display: block;
        line-height: 75px;
        color: #ccc;
    }
    
    .mmont {
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
        /*overflow: hidden;*/
        /*margin-top: 35px;*/
        background-color: #fff;
        min-height: 500px;
        width: 100%;
        margin-bottom: 10px;
        overflow: hidden;
        margin-top: 30px;
    }
    
    .mmont>div {
        margin: 0 auto;
        min-height: 50px;
        width: 90%;
    }
    
    .mmont>div:nth-child(1) {
        margin-top: 45px;
    }
    
    .mmont>div:nth-child(1)>div:nth-child(1) {
        float: left;
        font-size: 20px;
        font-weight: 700;
    }
    
    .mmont>div:nth-child(1)>div:nth-child(2) {
        float: right;
        color: #666;
        font-size: 14px;
    }
    
    .mmont>div:nth-child(1)>div:nth-child(2) small {
        font-size: 22px;
        color: #3264bb;
    }
    
    .mmont .montT {
        margin-top: 10px;
        height: 160px;
        border: 1px solid #dee4e9;
        border-radius: 2px;
    }
    
    .mmont .montT>div:nth-child(1) {
        width: 100%;
        height: 115px;
    }
    
    .mmont .montT textarea {
        width: 100%;
        height: 115px;
        border: 0;
        padding-top: 10px;
        padding-left: 10px;
        resize: none;
    }
    
    .mmont .montT>div:nth-child(2) {
        width: 100%;
        height: 43px;
        background-color: #f7f8f9;
    }
    
    .mmont .montT>div:nth-child(2)>div:nth-child(1) {
        float: left;
        line-height: 43px;
        color: #666;
        margin-left: 10px;
    }
    
    .mmont .montT>div:nth-child(2)>div:nth-child(2) {
        float: right;
        width: 110px;
        height: 100%;
        text-align: center;
        background-color: #3264b4;
        line-height: 43px;
        color: #fff;
        cursor: pointer;
    }
    
    .mmont .montP {
        margin-top: 25px;
        /*border: 1px solid #dee4e9;*/
    }
    
    .mmont .montP>div:nth-child(1) {
        height: 37px;
        /*border: 1px solid red;*/
        position: relative;
    }
    
    .mmont .montP>div:nth-child(1)::after {
        position: absolute;
        top: 36px;
        left: 170px;
        width: calc(100% - 170px);
        height: 1px;
        background-color: #eceff2;
        content: "";
    }
    
    .mmont .montP>div:nth-child(1) >div {
        height: 37px;
        width: 85px;
        float: left;
        line-height: 37px;
        text-align: center;
        cursor: pointer;
    }
    /*.mmont .montP>div:nth-child(1) >div:nth-child(1) {
        height: 37px;
        width: 85px;
        float: left;
        border: 1px solid #eceff2;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
        border-bottom: 0;
        color: #e71436;
    }
    
    .mmont .montP>div:nth-child(1) >div:nth-child(2) {
        height: 37px;
        width: 85px;
        float: left;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
        border-bottom: 1px solid #eceff2;
        color: #666;
    }*/
    
    .mmont .montP .bsClass {
        height: 37px;
        width: 85px;
        float: left;
        border: 1px solid #eceff2;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
        border-bottom: 0;
        color: #e71436;
    }
    
    .mmont .montP .byClass {
        height: 37px;
        width: 85px;
        float: left;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
        border-bottom: 1px solid #eceff2;
        color: #666;
    }
    
    .mmont .montP .pl {
        min-height: 190px;
        overflow: hidden;
        /*border: 1px solid red;*/
    }
    
    .pl>ul>li {
        /*min-height: 135px;*/
        /*border: 1px solid red;*/
        margin-top: 15px;
    }
    
    .plcont {
        min-height: 140px;
        height: 100%;
        /*border: 1px solid red;*/
        width: 100%;
        overflow: hidden;
    }
    
    .plcont>div {
        float: left;
    }
    
    .plcont>div:nth-child(1) {
        height: 66px;
        width: 66px;
        border-radius: 50%;
        overflow: hidden;
    }
    
    .plcont>div:nth-child(1) img {
        height: 100%;
        width: 100%;
    }
    
    .plcont-c {
        height: 100%;
        margin-left: 10px;
        width: calc(100% - 76px);
        overflow: hidden;
        /*border: 1px solid red;*/
    }
    
    .plcont-c>div {
        width: 100%;
        /*border: 1px solid red;*/
    }
    
    .plcont-c>div:nth-child(1) {
        height: 25px;
        line-height: 25px;
        color: #999;
    }
    
    .plcont-c>div:nth-child(1)>div:nth-child(1) {
        width: 50%;
        float: left;
        height: 100%;
        font-size: 14px;
    }
    
    .plcont-c>div:nth-child(1)>div:nth-child(1) small {
        color: #3fb0f3;
        margin-right: 10px;
    }
    
    .plcont-c>div:nth-child(1)>div:nth-child(2) {
        width: 50%;
        height: 100%;
        text-align: right;
        float: right;
        font-size: 12px;
    }
    
    .plcont-c>div:nth-child(2) {
        margin-top: 10px;
        min-height: 70px;
        color: #333;
        font-size: 14px;
    }
    
    .plcont-c>div:nth-child(3) {
        overflow: hidden;
        min-height: 25px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    
    .plcont-c>div:nth-child(3)>div {
        float: right;
        width: 200px;
        height: 20px;
    }
    
    .plcont-c>div:nth-child(3)>div>div {
        float: left;
        height: 100%;
        margin-left: 10px;
        cursor: pointer;
    }
    
    .plcont-c>div:nth-child(3)>div>div:nth-child(1) {
        color: #666;
    }
    
    .plcont-c>div:nth-child(3)>div>div:nth-child(1) span {
        color: #e71436;
    }
    
    .plcont-c>div:nth-child(3)>div>div:nth-child(1) small {
        margin-left: 5px;
    }
    
    .plcont-c>div:nth-child(3)>div>div:nth-child(2) small {
        margin-left: 5px;
    }
    
    .plcont-c>div:nth-child(3)>div>div:nth-child(2) {
        color: #666;
    }
    
    .plcont-c>div:nth-child(3)>div>div:nth-child(2) span {
        color: #3fb0f3;
    }
    
    .plcont-c>div:nth-child(3)>div>div:nth-child(3) {
        color: #666;
        border-left: 1px solid #eceff2;
        padding-left: 10px;
    }
    
    .plcont-c>div:nth-child(3)>div>div:nth-child(4) {
        color: #666;
        padding-left: 10px;
        border-left: 1px solid #eceff2;
    }
    
    .pl>ul .pllast {
        margin-top: 0;
        height: 66px;
        text-align: center;
        font-size: 20px;
        color: #999;
        line-height: 66px;
        border-top: 1px solid #eceff2;
    }
    
    .cpl {
        min-height: 135px;
        line-height: 135px;
        text-align: center;
        color: #999;
        font-size: 14px;
    }
</style>