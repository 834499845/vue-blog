<template>
    <div id="app" class="about">
        <div class="main">
            <div class="mcont">
                <h1>扶我起来，我还能继续送</h1>
                <!--<h3>飞到城市另一边</h3>-->
                <div>
                    <p>你飞到城市另一边</p>
                    <p>你飞了好远好远</p>
                    <p>飞过了灰色的地平线</p>
                    <p>飞过了白天黑夜</p>
                    <p>你飞了好远好远</p>
                    <p>飞过了蓝色的海岸线</p>
                    <p>飞过我们的昨天</p>
                    <p>你啊你</p>
                    <p>是自在如风的少年</p>
                    <p>飞在天地间</p>
                    <p>比梦还遥远</p>
                    <p>你啊你</p>
                    <p>飞过了流转的时间</p>
                    <p>归来的时候</p>
                    <p>是否还有青春的容颜</p>
                    <!--<p><small></small>今夕何夕，见此邂逅</p>
                    <p><small></small>For thy sweet love remember'd such wealth brings That then I scorn to change my state with kings.不听不听，王八念经</p>
                    <p><small></small>“所谓世间，不就是你吗？”</p>-->
                </div>
                <div class="mabout">
                    <div>
                        <p>
                            <span class="glyphicon glyphicon-exclamation-sign"></span> 本文由 <a href="#">冬雪寒江</a> 创作，采用 <a
                                href="#">CC BY 4.0 CN协议</a> 进行许可。 可自由转载、引用，但需署名作者且注明文章出处。本位链接为
                            <a href="#">冬雪寒江抛直钓，春潮野渡泊孤舟。</a>
                        </p>
                    </div>
                </div>
                <div class="mmoney">
                    <!--<div>如果您觉得文章不错,可以请我喝一杯咖啡！</div>-->
                    <div>“余生请你指教。”</div>
                    <div>
                        <div @click="shangClick">
                            赏
                        </div>
                    </div>
                </div>
                <transition name="slide-fade">
                    <div class="shang" v-show="shangShow">
                        <div>
                            <img src="/staticp/img/shang.png" alt="">
                        </div>
                        <div>
                            <img src="/staticp/img/shang.png" alt="">
                        </div>
                    </div>
                </transition>

                <div class="fenxiang">
                    <div>
                    </div>
                    <div>
                        <span class="glyphicon glyphicon-comment"></span><small>评论</small>
                    </div>
                </div>
            </div>
            <!--评论-->
            <!--<div class="mmont">
                <div>
                    <div>评论</div>
                    <div><small>0</small>人参与</div>
                </div>
                <div class="montT">
                    <div>
                        <textarea name="" placeholder="来说两句吧" v-model="pltxt"></textarea>
                    </div>
                    <div>
                        <div>
                            快速登录：
                        </div>
                        <div @click="plClick">
                            <span class="glyphicon glyphicon-edit">发表跟帖</span>
                        </div>
                    </div>
                </div>
                <div class="montP">
                    <div>
                        <div @click="zuixinClick" :class="{bsClass:isXclasss,byClass:isByclasss}">
                            评论
                        </div>
                        <div @click="zuireClick" :class="{bsClass:!isXclasss,byClass:!isByclasss}">
                            最热
                        </div>
                        <div :class="{bsClass:!isXclasss,byClass:!isByclasss}"></div>
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
    </div>
</template>
<script>
    import { mapActions, mapState } from 'vuex'
    export default {
        name: 'about',
        data() {
            return {
                cliWindth: '',
                plShow: false,
                isXclasss: true,
                isByclasss: false,
                pltxt: '',
                shangShow: false
            }
        },
        created: function () {

        },
        filters: {
            strFun: function (val) {
                if (val) {
                    return val
                } else {
                    return '无'
                }
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
            // 最热
            zuixinClick() {
                this.isXclasss = true
                this.isByclasss = false
            },
            // 最热
            zuireClick() {
                this.isXclasss = false
                this.isByclasss = true
            },
            // 发表评论
            plClick() {

            },
            shangClick() {
                this.shangShow = !this.shangShow
            },
            ...mapActions([''])
        }
    }

</script>
<style scoped>
    #app {
        width: 100%;
        min-height: 100px;
        /*border: 1px solid red;*/
        background-color: #f5f8f9;
        overflow: hidden;
    }
    
    .main {
        width: 100%;
        min-height: 1000px;
        height: 100%;
    }
    
    .mcont {
        overflow: hidden;
        min-height: 100px;
        height: 100%;
        background-color: #fff;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
        margin-bottom: 35px;
    }
    
    .mcont>div {
        min-height: 50px;
        width: 94%;
        margin-left: 15px;
    }
    
    .mcont>h1 {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 65px;
        line-height: 80px;
        margin-left: 15px;
        color: #0097a7;
        text-align: center;
    }
    
    .mcont>h3 {
        margin: 0;
        padding: 0;
        width: 100%;
        color: #666;
        height: 60px;
        line-height: 60px;
        margin-left: 15px;
    }
    
    .mcont>div:nth-child(2)>p {
        text-align: center;
        margin-top: 0;
    }
    
    .mcont>div:nth-child(2)>p:nth-child(1) {
        margin-top: 15px;
    }
    
    .mcont>div:nth-child(3)>p small {
        display: inline-block;
        background-color: #222;
        border-radius: 50%;
        width: 10px;
        height: 10px;
        margin-left: 10px;
        margin-right: 10px;
    }
    
    .mabout {
        margin-top: 20px;
        height: 75px;
    }
    
    .mabout>div {
        margin: 0 auto;
        width: 90%;
        height: 100%;
        background-color: #f5f5f5;
        border: 1px solid #d3d3d3;
    }
    
    .mabout>div>p {
        width: 96%;
        margin-left: 15px;
        height: 50px;
        margin-top: 15px;
    }
    
    .mmoney {
        height: 175px;
        overflow: hidden;
    }
    
    .mmoney>div {
        width: 100%;
        text-align: center;
    }
    
    .mmoney>div:nth-child(1) {
        margin-top: 35px;
        color: #9d9d9d;
        font-size: 15px;
    }
    
    .mmoney>div:nth-child(2) {
        margin-top: 10px;
    }
    
    .mmoney>div:nth-child(2)>div {
        margin: 0 auto;
        width: 80px;
        height: 80px;
        border: 1px solid #c7c7c7;
        color: #ffa200;
        line-height: 80px;
        text-align: center;
        font-size: 34px;
        border-radius: 50%;
        cursor: pointer;
    }
    
    .shang {
        height: 320px;
        width: 100%;
        overflow: hidden;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    
    .shang>div {
        width: 227px;
        height: 240px;
    }
    
    .shang>div>img {
        width: 100%;
        height: 100%;
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
    
    .slide-fade-enter-active {
        transition: all 0.7s ease;
    }
    
    .slide-fade-enter,
    .slide-fade-leave-active {
        transform: translateY(-30px);
        opacity: 0;
    }
</style>