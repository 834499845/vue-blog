<template>
    <div id="app" class="home">
        <div v-show="bigShow" class="bignav">
            <div class="bignavLeft">
                <div>
                    <div>
                        <img src="/staticp/img/logo.png" alt="">
                    </div>
                    <div>
                        泡泡 Blog
                    </div>
                </div>
                <div>
                    <div v-for="(item,index) in paths" @click="pathClick(index)">
                        {{item.name}}
                    </div>
                </div>
            </div>
            <div class="bignavRigth">
                <div>
                    <input type="text" placeholder="搜索">
                </div>
                <div v-show="headShow" @click="headClick">
                    <div>
                        <img src="/staticp/img/logo.png" alt="">
                    </div>

                    <div>
                        <span>▼</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="nbignav" v-show="!bigShow">
            <div class="nbignavTop">
                <div class="nlogo">
                    <div>
                        <img src="/staticp/img/logo.png" alt="">
                    </div>
                    <div>
                        泡泡 Blog
                    </div>
                </div>
                <div class="nhead" @click="headClick">
                    <div>
                        <img src="/staticp/img/logo.png" alt="">
                    </div>
                    <div>
                        <span>▼</span>
                    </div>
                </div>
            </div>
            <div class="nbignavBot">
                <div v-for="(item,index) in paths" :class="{dclass:isDclass}" @click="pathClick(index)">
                    {{item.name}}
                </div>
                <div class="nseek">
                    <input type="text" placeholder="搜素">
                </div>
            </div>
        </div>
        <div class="headPopup" v-show="headPopupShow">
            <div>
                <img src="/staticp/img/logo.png" alt="">
            </div>
            <div>
                泡泡
            </div>
            <div>
                <p>喜欢交流分享，热衷计算机技术，致力于分享更好的知识。</p>
            </div>
            <div>
                中国-西安
            </div>
            <div>
                <!--<div>
                    关注我
                </div>-->
            </div>
            <div>
                <div>
                    <p>{{tatalNum}}</p>
                    <p>文章</p>
                </div>
                <div>
                    <p>{{talNUm}}</p>
                    <p>标签</p>
                </div>
            </div>
            <div>
                <div>
                    <a href="http://git.oschina.net/hey_jude" target="_blank">
                        <img src="/staticp/img/111.png" alt="">
                    </a>
                </div>
                <!--<div>
                    <img src="/static/img/2222.png" alt="">
                </div>
                <div>
                    <img src="/static/img/3333.png" alt="">
                </div>
                <div>
                    <img src="/static/img/4444.png" alt="">
                </div>-->
            </div>
        </div>
        <div class="main">
            <div class="mleft" v-show="lefyShow">
                <div>
                    <img src="/staticp/img/logo.png" alt="">
                </div>
                <div>
                    泡泡
                </div>
                <div>
                    <p>喜欢交流分享，热衷计算机技术，致力于分享更好的知识。</p>
                </div>
                <div>
                    中国-西安
                </div>
                <div>
                    <!--<div>
                        关注我
                    </div>-->
                </div>
                <div>
                    <div>
                        <p>{{tatalNum}}</p>
                        <p>文章</p>
                    </div>
                    <div>
                        <p>{{talNUm}}</p>
                        <p>标签</p>
                    </div>
                </div>
                <div>
                    <div>
                        <a href="http://git.oschina.net/hey_jude" target="_blank">
                            <img src="/staticp/img/111.png" alt="">
                        </a>
                    </div>
                    <!--<div>
                        <img src="/static/img/2222.png" alt="">
                    </div>
                    <div>
                        <img src="/static/img/3333.png" alt="">
                    </div>
                    <div>
                        <img src="/static/img/4444.png" alt="">
                    </div>-->
                </div>
            </div>
            <div class="mcont">
                <router-view @childsay="listenToMyBoy" class="view" keep-alive></router-view>
            </div>
            <div class="mright" v-show="rightShow">
                <div>
                    <div class="rTitle">公告</div>
                    <div class="rOne">
                        <!--<p>您好，你是第<small> 1864 </small>位访客</p>-->
                        <!--<p>QQ：834499845</p>-->
                        <!--<p>微信：你想支付吗？</p>-->
                        <!--<p>邮箱：834499845@qq.com</p>-->
                        <p>QQ交流群：566570237</p>
                        <p>欢迎交流与分享经验</p>
                    </div>
                </div>
                <div>
                    <div class="rTitle">归档</div>
                    <div class="rTwo">
                        <ul>
                            <li v-for="(item,index) in flies" @click="fliesClick(index)">
                                ▶{{item.time}}
                                <small>( {{item.num}} ) </small>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <div class="rTitle">标签云</div>
                    <div class="rThr">
                        <span v-for="(item,index) in tallys" @click="tallysClick(index)">{{item}}</span>
                    </div>
                </div>
                <div>
                    <div class="rTitle">链接</div>
                    <div class="rFour">
                        <ul>
                            <li v-for="(item,index) in links" @click="linksClick(index)">
                                ▶{{item.name}}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="foot">
            <div>
                <div>© 2017 泡泡</div>
                <div>本站总访问量<small> {{cookNUm}}</small> 次</div>
                <div>Powered by <small>Hexo</small>.</div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapState } from 'vuex'
    export default {
        name: 'home',
        data() {
            return {
                bigShow: true,
                isDclass: true,
                headShow: true,
                headPopupShow: false,
                lefyShow: true,
                rightShow: true,
                tatalNum: '0',
                cookNUm: 0,
                talNUm: 0,
                paths: [
                    { name: '主页', put: 'homepage' },
                    { name: '目录', put: 'catalog' },
                    { name: '亮剑', put: 'compile' },
                    { name: '关于我', put: 'about' }
                ],
                tallys: [
                ],
                links: [
                    { name: '暂无链接', path: 'http://www.baidu.com' }
                ],
                flies: [
                ]
            }
        },
        computed: mapState(['tagNameObg']),
        created: function () {
            var self = this
            self.listenToMyBoy(document.body.clientWidth)
            // 查询日期文件归档列表
            self.getFileLists({
            }).then((data) => {
                console.log('查询日期文件归档列表', data)
                if (data.status == 200) {
                    self.flies = data.data
                } else {
                }
            }).catch(msg => {
                console.log(msg)
            })
            // 获取博客总数
            self.getLists({
                num: 1,
                page: 1
            }).then((data) => {
                console.log('博客列表查询成功', data)
                if (data.status == 200) {
                    self.tatalNum = data.tatal
                } else {
                }
            }).catch(msg => {
                console.log(msg)
            })
            // 获取标签云列表
            self.getTagList({
            }).then((data) => {
                console.log('标签云列表', data)
                if (data.status == 200) {
                    if (data.data[0].names.length > 0) {
                        self.talNUm = data.data[0].names.length
                        self.tallys = data.data[0].names
                    } else {
                        self.talNUm = 0
                    }

                }
            }).catch(msg => console.log(msg))

        },
        filters: {
            ctimeFun: function (val) {
                // 1494916450000
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
                    return "20" + year + "-" + month + "-" + date + "  " + week
                } else {
                    return '无'
                }
            },
            fileCtimeFun: function (val) {
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

                    return month + "   20" + year
                } else {
                    return '无'
                }
            }
        },
        mounted() {
            var self = this
            window.onresize = function () {
                self.listenToMyBoy(document.body.clientWidth)
                if (document.body.clientWidth >= 1185) {
                    self.lefyShow = true
                    self.rightShow = true
                    // self.$emit('childsay', 1200);
                } else if (document.body.clientWidth > 820 && document.body.clientWidth < 1185) {
                    self.lefyShow = false
                    self.rightShow = true
                    // self.$emit('childsay', 1000)
                } else if (document.body.clientWidth < 820) {
                    self.lefyShow = false
                    self.rightShow = false
                    // self.$emit('childsay', 820)
                }
            }
            // 访问次数
            var caution = false

            function setCookie(name, value, expires, path, domain, secure) {

                var curCookie = name + "=" + escape(value) +

                    ((expires) ? "; expires=" + expires.toGMTString() : "") +

                    ((path) ? "; path=" + path : "") +

                    ((domain) ? "; domain=" + domain : "") +

                    ((secure) ? "; secure" : "")

                if (!caution || (name + "=" + escape(value)).length <= 4000)

                    document.cookie = curCookie

                else

                    if (confirm("Cookie exceeds 4KB and will be cut!"))

                        document.cookie = curCookie

            }
            function getCookie(name) {

                var prefix = name + "="

                var cookieStartIndex = document.cookie.indexOf(prefix)

                if (cookieStartIndex == -1)

                    return null

                var cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex + prefix.length)

                if (cookieEndIndex == -1)

                    cookieEndIndex = document.cookie.length

                return (document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex))

            }
            function deleteCookie(name, path, domain) {

                if (getCookie(name)) {

                    document.cookie = name + "=" +

                        ((path) ? "; path=" + path : "") +

                        ((domain) ? "; domain=" + domain : "") +

                        "; expires=Thu, 01-Jan-70 00:00:01 GMT"

                }

            }
            function fixDate(date) {

                var base = new Date(0)

                var skew = base.getTime()

                if (skew > 0)

                    date.setTime(date.getTime() - skew)

            }
            var now = new Date()
            fixDate(now)
            now.setTime(now.getTime() + 365 * 24 * 60 * 60 * 1000)
            var visits = getCookie("counter")
            if (!visits)
                visits = 1
            else
                visits = parseInt(visits) + 1
            setCookie("counter", visits, now)
            self.cookNUm = visits
        },
        watch: {
        },
        methods: {
            listenToMyBoy(val) {
                var self = this
                this.headPopupShow = false
                // console.log('这是最终值：', val)
                if (val <= 820) {
                    self.bigShow = false
                    self.lefyShow = false
                    self.rightShow = false
                } else if (val > 820 && val <= 1185) {
                    self.bigShow = true
                    self.headShow = true
                    self.lefyShow = false
                    self.rightShow = true
                } else {
                    self.bigShow = true
                    self.headShow = false
                    self.lefyShow = true
                    self.rightShow = true
                }
            },
            gitHubClick() {
                // location.href = 'http://git.oschina.net/hey_jude'

            },
            // 导航跳转
            pathClick(index) {
                var pathStr = this.paths[index].put
                this.$router.push({
                    path: '/home/' + pathStr
                })
            },
            // 显示任务信息
            headClick() {
                this.headPopupShow = !this.headPopupShow
            },
            // 标签云跳转
            tallysClick(index) {
                var tagStr = this.tallys[index]
                this.$router.push({
                    path: '/home/archives',
                    query: { sear: tagStr }
                })
            },
            // 归档跳转
            fliesClick(index) {
                var str = this.flies[index].time
                this.$router.push({
                    path: '/home/tags',
                    query: { sear: str }
                })
            },
            // 链接跳转
            linksClick(index) {
                // var pathStr = this.links[index].put
                // location.href = pathStr
            },
            ...mapActions(['getFileLists','getLists','getTagList'])
        }
    }

</script>
<style scoped>
    #app {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    
    .foot {
        margin-top: 40px;
        height: 100px;
        width: 100%;
        overflow: hidden;
        border-top: 1px solid #eceff2;
    }
    
    .foot>div {
        width: 160px;
        margin: 0 auto;
        height: 100%;
    }
    
    .foot>div>div {
        font-size: 14px;
        width: 100%;
        text-align: center;
        color: #565a5f;
    }
    
    .foot>div>div:nth-child(1) {
        margin-top: 20px;
    }
    
    .foot>div>div:nth-child(2) small {
        font-size: 16px;
        color: #0097a7;
    }
    
    .foot>div>div:nth-child(3) small {
        font-size: 16px;
        color: #6db7ec;
    }
    /*宽度大于820时，导航条*/
    
    .bignav {
        overflow: hidden;
        background-color: #ffffff;
        width: 100%;
        height: 66px;
        box-shadow: 0 0 10px #c8cbcc;
        position: relative;
    }
    
    .bignavLeft {
        position: absolute;
        top: 0;
        left: 26px;
        min-width: 300px;
        height: 100%;
    }
    
    .bignavLeft>div {
        float: left;
        height: 66px;
    }
    
    .bignavLeft>div:nth-child(1) {
        min-width: 175px;
    }
    
    .bignavLeft>div:nth-child(1)>div {
        float: left;
    }
    
    .bignavLeft>div:nth-child(1)>div:nth-child(1) {
        width: 50px;
        height: 50px;
        overflow: hidden;
        margin-top: 9px;
    }
    
    .bignavLeft>div:nth-child(1)>div:nth-child(1) img {
        width: 100%;
        height: 100%;
    }
    
    .bignavLeft>div:nth-child(1)>div:nth-child(2) {
        height: 66px;
        line-height: 66px;
        margin-left: 10px;
        font-size: 18px;
        cursor: pointer;
        color: #545a5f;
    }
    
    .bignavLeft>div:nth-child(1)>div:nth-child(2):hover {
        color: #38b7ea;
    }
    
    .bignavLeft>div:nth-child(2) {
        width: 300px;
    }
    
    .bignavLeft>div:nth-child(2)>div {
        width: 55px;
        float: left;
        height: 66px;
        line-height: 66px;
        text-align: center;
        margin-left: 3px;
        cursor: pointer;
        font-size: 15px;
        color: #545a5f;
    }
    
    .bignavLeft>div:nth-child(2)>div:nth-child(1) {
        margin-left: 30px;
    }
    
    .bignavLeft>div:nth-child(2)>div:hover {
        color: #38b7ea;
    }
    
    .bignavRigth {
        position: absolute;
        top: 0;
        right: 10px;
        min-width: 210px;
        height: 100%;
    }
    
    .bignavRigth>div {
        float: left;
    }
    
    .bignavRigth>div:nth-child(1) {
        min-width: 210px;
    }
    
    .bignavRigth>div:nth-child(1) input {
        border: 1px solid #eceff2;
        width: 200px;
        height: 34px;
        line-height: 34px;
        border-bottom-left-radius: 17px;
        border-bottom-right-radius: 17px;
        border-top-left-radius: 17px;
        border-top-right-radius: 17px;
        padding-left: 10px;
        margin-top: 16px;
        margin-left: 10px;
        font-size: 14px;
    }
    
    .bignavRigth>div:nth-child(2) {
        min-width: 66px;
        height: 66px;
        margin-left: 10px;
        cursor: pointer;
        overflow: hidden;
    }
    
    .bignavRigth>div:nth-child(2)>div {
        float: left;
    }
    
    .bignavRigth>div:nth-child(2)>div:nth-child(1) {
        width: 42px;
        height: 42px;
        overflow: hidden;
        margin-top: 13px;
        border-radius: 50%;
    }
    
    .bignavRigth>div:nth-child(2)>div:nth-child(2) {
        line-height: 66px;
        margin-left: 5px;
    }
    
    .bignavRigth>div:nth-child(2)>div:nth-child(1) img {
        width: 100%;
        height: 100%;
    }
    /*当宽度小于820时，导航条*/
    
    .nbignav {
        overflow: hidden;
        background-color: #ffffff;
        width: 100%;
        min-width: 400px;
        height: 120px;
        box-shadow: 0 0 10px #c8cbcc;
    }
    
    .nbignavTop {
        width: 100%;
        height: 66px;
        position: relative;
    }
    
    .nbignavTop .nlogo {
        position: absolute;
        top: 0;
        left: 35px;
        min-width: 175px;
        height: 100%;
    }
    
    .nlogo>div {
        float: left;
    }
    
    .nlogo>div:nth-child(1) {
        width: 50px;
        height: 50px;
        overflow: hidden;
        margin-top: 9px;
    }
    
    .nlogo>div:nth-child(1) img {
        width: 100%;
        height: 100%;
    }
    
    .nlogo>div:nth-child(2) {
        min-width: 66px;
        height: 66px;
        line-height: 66px;
        margin-left: 10px;
        cursor: pointer;
    }
    
    .nlogo>div:nth-child(2):hover {
        color: #38b7ea;
    }
    
    .nbignavTop .nhead {
        position: absolute;
        top: 0;
        right: 35px;
        min-width: 60px;
        height: 100%;
        cursor: pointer;
    }
    
    .nhead>div {
        float: left;
    }
    
    .nhead>div:nth-child(1) {
        width: 42px;
        height: 42px;
        overflow: hidden;
        margin-top: 13px;
        border-radius: 50%;
    }
    
    .nhead>div:nth-child(1) img {
        width: 100%;
        height: 100%;
    }
    
    .nhead>div:nth-child(2) {
        min-width: 10px;
        height: 66px;
        line-height: 66px;
        margin-left: 10px;
    }
    
    .nbignavBot {
        border-top: 1px solid #eceff2;
        height: 53px;
        width: 100%;
        min-width: 465px;
        overflow: hidden;
    }
    
    .nbignavBot .dclass {
        float: left;
        height: 100%;
        line-height: 53px;
        width: 60px;
        text-align: center;
        margin-left: 10px;
        font-size: 14px;
        color: #545a5f;
        cursor: pointer;
    }
    
    .nbignavBot .dclass:hover {
        color: #38b7ea;
    }
    
    .nbignavBot .nseek {
        width: 225px;
        overflow: hidden;
        height: 53px;
    }
    
    .nbignavBot .nseek input {
        border: 1px solid #eceff2;
        width: 200px;
        height: 34px;
        line-height: 34px;
        border-bottom-left-radius: 17px;
        border-bottom-right-radius: 17px;
        border-top-left-radius: 17px;
        border-top-right-radius: 17px;
        padding-left: 10px;
        margin-top: 7px;
        margin-left: 10px;
        font-size: 14px;
    }
    /*主体*/
    
    .main {
        overflow: hidden;
    }
    
    .main {
        margin: 0 auto;
        margin-top: 40px;
        width: 100%;
        overflow: hidden;
        display: flex;
        justify-content: space-around;
    }
    
    .main>div {
        float: left;
        overflow: hidden;
    }
    
    .mleft {
        margin-left: 30px;
        background-color: #fff;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
        width: 20%;
        max-width: 380px;
        min-width: 245px;
        min-height: 485px;
        height: 100%;
        overflow: hidden;
    }
    
    .mleft>div {
        /*border: 1px solid red;*/
        width: 100%;
    }
    
    .mleft>div:nth-child(1) {
        height: 175px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .mleft>div:nth-child(1) img {
        height: 175px;
        border-radius: 50%;
        width: 128px;
        height: 128px;
    }
    
    .mleft>div:nth-child(2) {
        height: 30px;
        line-height: 30px;
        font-size: 17px;
        color: #565a5f;
        text-align: center;
    }
    
    .mleft>div:nth-child(3) {
        font-size: 15px;
        color: #565a5f;
    }
    
    .mleft>div:nth-child(3) p {
        padding-right: 10px;
        padding-left: 10px;
        text-indent: 28px;
    }
    
    .mleft>div:nth-child(4) {
        margin-top: 10px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        font-size: 14px;
        color: #9a9ea3;
    }
    
    .mleft>div:nth-child(5) {
        margin-top: 20px;
    }
    
    .mleft>div:nth-child(5)>div {
        margin: 0 auto;
        line-height: 42px;
        text-align: center;
        width: 150px;
        height: 42px;
        background-color: #38b7ea;
        color: #fff;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        cursor: pointer;
    }
    
    .mleft>div:nth-child(5)>div:hover {
        background-color: rgba(73, 200, 251, 1);
    }
    
    .mleft>div:nth-child(6) {
        margin-top: 25px;
        height: 88px;
        border-bottom: 1px solid #eceff2;
        border-top: 1px solid #eceff2;
    }
    
    .mleft>div:nth-child(6)>div {
        float: left;
        width: 49.8%;
        height: 100%;
    }
    
    .mleft>div:nth-child(6)>div:nth-child(1) {
        border-right: 1px solid #eceff2;
    }
    
    .mleft>div:nth-child(6)>div>p {
        width: 100%;
        text-align: center;
        color: #565a5f;
        font-size: 14px;
    }
    
    .mleft>div:nth-child(6)>div>p:nth-child(1) {
        margin-top: 25px;
    }
    
    .mleft>div:nth-child(7) {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 90px;
    }
    
    .mleft>div:nth-child(7)>div {
        float: left;
        height: 34px;
        width: 34px;
        overflow: hidden;
        cursor: pointer;
    }
    
    .mleft>div:nth-child(7)>div img {
        height: 34px;
        width: 34px;
    }
    
    .mcont {
        margin-left: 20px;
        width: 52%;
        max-width: 995px;
        min-width: 628px;
        min-height: 580px;
        height: 100%;
    }
    /*.mcont>ul>li {
        background-color: #fff;
        border: 1px solid red;
        margin-top: 40px;
        max-width: 995px;
        min-width: 628px;
        min-height: 580px;
        height: 100%;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    }
    
    .mcont>ul>li:nth-child(1) {
        margin: 0;
    }*/
    
    .mright {
        margin-left: 20px;
        /*border: 1px solid red;*/
        width: 19%;
        max-width: 376px;
        min-width: 230px;
        min-height: 780px;
        height: 100%;
        overflow: hidden;
    }
    
    .mright>div {
        width: 100%;
        min-height: 35px;
        /*border: 1px solid red;*/
        border-bottom: 1px dotted #ccc;
        margin-top: 10px;
    }
    
    .mright>div:nth-child(1) {
        margin-top: 0;
        height: 125px;
    }
    
    .rTitle {
        /*border: 1px solid red;*/
        width: 100%;
        height: 25px;
        line-height: 25px;
        font-size: 14px;
        font-weight: 600;
    }
    
    .rOne {
        margin-top: 7px;
        width: 100%;
        height: 75px;
        background-color: #fff9c4;
        overflow: hidden;
    }
    
    .rOne>p:nth-child(1) {
        margin-top: 15px;
    }
    
    .rOne>p:nth-child(1) small {
        color: #0097ad;
    }
    
    .rOne>p:nth-child(6) {
        margin-top: 15px;
    }
    
    .rOne>p {
        padding-left: 15px;
        width: 100%;
        font-size: 12px;
        color: #565a5f;
        margin-top: 8px;
    }
    
    .rTwo {
        width: 100%;
        min-height: 50px;
    }
    
    .rTwo>ul>li {
        height: 45px;
        width: 100%;
        line-height: 45px;
        padding-left: 10px;
        color: #777777;
        cursor: pointer;
        font-size: 14px;
    }
    
    .rTwo>ul>li:hover {
        color: #333;
    }
    
    .rThr {
        margin-top: 15px;
        width: 100%;
        min-height: 50px;
        display: flex;
        flex-wrap: wrap;
    }
    
    .rThr>span {
        float: left;
        height: 22px;
        margin-left: 5px;
        cursor: pointer;
        color: #0097ad;
    }
    
    .rThr>span:hover {
        color: #333;
    }
    
    .rFour {
        width: 100%;
        min-height: 50px;
    }
    
    .rFour>ul>li {
        height: 45px;
        width: 100%;
        line-height: 45px;
        padding-left: 10px;
        color: #777777;
        cursor: pointer;
        font-size: 14px;
    }
    
    .rFour>ul>li:hover {
        color: #333;
    }
    /*头像弹出框*/
    
    .headPopup {
        position: fixed;
        right: 20px;
        top: 89px;
        margin-left: 30px;
        background-color: #fff;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
        width: 280px;
        min-height: 490px;
        overflow: hidden;
    }
    
    .headPopup>div {
        width: 100%;
    }
    
    .headPopup>div:nth-child(1) {
        height: 175px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .headPopup>div:nth-child(1) img {
        border-radius: 50%;
        width: 128px;
        height: 128px;
    }
    
    .headPopup>div:nth-child(2) {
        height: 30px;
        line-height: 30px;
        font-size: 17px;
        color: #565a5f;
        text-align: center;
    }
    
    .headPopup>div:nth-child(3) {
        font-size: 15px;
        color: #565a5f;
    }
    
    .headPopup>div:nth-child(3) p {
        padding-right: 10px;
        padding-left: 10px;
        text-indent: 28px;
        /*text-align: center;*/
    }
    
    .headPopup>div:nth-child(4) {
        margin-top: 10px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        font-size: 14px;
        color: #9a9ea3;
    }
    
    .headPopup>div:nth-child(5) {
        margin-top: 20px;
    }
    
    .headPopup>div:nth-child(5)>div {
        margin: 0 auto;
        line-height: 42px;
        text-align: center;
        width: 150px;
        height: 42px;
        background-color: #38b7ea;
        color: #fff;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
    }
    
    .headPopup>div:nth-child(6) {
        margin-top: 25px;
        height: 88px;
        border-bottom: 1px solid #eceff2;
        border-top: 1px solid #eceff2;
    }
    
    .headPopup>div:nth-child(6)>div {
        float: left;
        width: 49.8%;
        height: 100%;
    }
    
    .headPopup>div:nth-child(6)>div:nth-child(1) {
        border-right: 1px solid #eceff2;
    }
    
    .headPopup>div:nth-child(6)>div>p {
        width: 100%;
        text-align: center;
        color: #565a5f;
        font-size: 14px;
    }
    
    .headPopup>div:nth-child(6)>div>p:nth-child(1) {
        margin-top: 25px;
    }
    
    .headPopup>div:nth-child(7) {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 90px;
    }
    
    .headPopup>div:nth-child(7)>div {
        float: left;
        height: 34px;
        width: 34px;
        overflow: hidden;
    }
    
    .headPopup>div:nth-child(7)>div img {
        height: 34px;
        width: 34px;
        cursor: pointer;
    }
</style>