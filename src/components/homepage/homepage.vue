<template>
    <div id="app" class="homepage">
        <div class="mian">
            <ul>
                <li class="contLi" v-for="(item,index) in lists">
                    <div class="cont">
                        <div @click="contClick(index)">{{item.title}}</div>
                        <div>
                            <div>
                                <span class="glyphicon glyphicon-time"></span>
                                <small>{{item.ctime | ctimeFun}}</small>
                            </div>
                            <div>
                                <span class="glyphicon glyphicon-tag"></span>
                                <span class="tall" v-for="(ta,ind) in item.talls" @click="tallClick(index,ind)">{{ta}}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <img src="/staticp/img/3123.png" alt="">
                            </div>
                            <div>
                                <p>
                                    {{item.preface}}
                                </p>
                            </div>
                        </div>
                        <div>
                            <div class="showtxtCl" v-html="highlight(item.showtxt)">

                            </div>
                        </div>
                    </div>
                    <div class="fenxiang">
                        <div>
                            <!--<div class="jiathis_style">
                                <span class="jiathis_txt">分享到：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <a class="jiathis_button_qzone"></a> <span class="jiathis_txt">QQ空间&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <a class="jiathis_button_tsina"></a><span class="jiathis_txt">新浪微博&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <a class="jiathis_button_tqq"></a><span class="jiathis_txt">腾讯微博&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <a class="jiathis_button_weixin"></a><span class="jiathis_txt">微信&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <a class="jiathis_button_renren"></a><span class="jiathis_txt">人人网&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <a href="http://www.jiathis.com/share" class="jiathis jiathis_txt jiathis_separator jtico jtico_jiathis" target="_blank"></a>
                            </div>-->
                        </div>
                        <div>
                            <span class="glyphicon glyphicon-comment"></span><small>评论</small>
                        </div>
                    </div>
                </li>
                <li class="lastLi">
                    <div class="lastSel">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSizeNum"
                            layout="total,prev, pager, next" :total="pageTotal">
                            </el-pagination>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapState } from 'vuex'
    export default {
        name: 'homepage',
        data() {
            return {
                lists: [
                ],
                cliWindth: '',
                pageSizeNum: 10,
                currentPage: 1,
                pageTotal: 1,
                selIndex: 0
            }
        },
        created: function () {
            var self = this
            self.getLists({
                num: self.pageSizeNum,
                page: self.currentPage
            }).then((data) => {
                console.log('博客列表查询成功', data)
                if (data.status == 200) {
                    self.lists = data.data
                    if (data.data.length > 0) {
                        self.pageTotal = data.tatal
                    } else {
                        self.pageTotal = 1
                    }
                } else {
                }
            }).catch(msg => {
                console.log(msg)
            })
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
                    return "20" + year + "-" + month + "-" + date
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
            cliWindth: function (val, oldVal) {
                var self = this
                if (val >= 1185) {
                    self.lefyShow = true
                    self.rightShow = true
                    self.$emit('childsay', 1200);
                } else if (val > 820 && val < 1185) {
                    self.lefyShow = false
                    self.rightShow = true
                    self.$emit('childsay', 1000)
                } else if (val < 820) {
                    self.lefyShow = false
                    self.rightShow = false
                    self.$emit('childsay', 820)
                }
            }
        },
        methods: {
            // 分页
            handleSizeChange(val) {
            },
            handleCurrentChange(val) {
                console.log(val)
                var self = this
                self.currentPage = val
                self.getLists({
                    num: self.pageSizeNum,
                    page: val
                }).then((data) => {
                    console.log('博客列表查询成功', data)
                    if (data.status == 200) {
                        self.lists = data.data
                        if (data.data.length > 0) {
                            self.pageTotal = data.tatal
                        } else {
                            self.pageTotal = 1
                        }
                    } else {
                    }
                }).catch(msg => {
                    console.log(msg)
                })
            },
            // 跳转博客详情
            contClick(index) {
                var self = this
                var idStr = this.lists[index]._id
                this.$router.push({
                    path: '/home/content',
                    query: { contId: idStr }
                })
                var readNum = this.lists[index].read
                readNum = readNum + 1
                self.getReadNum({
                    id: idStr,
                    num: readNum
                }).then((data) => {
                    if (data.status == 200) {
                        console.log('更新阅读次数成功')
                    } else {
                        console.log('更新阅读次数失败')
                    }
                }).catch(msg => {
                    console.log(msg)
                })
            },
            // 标签云跳转
            tallClick(index, ind) {
                var tagStr = this.lists[index].talls[ind]
                this.$router.push({
                    path: '/home/archives',
                    query: { sear: tagStr }
                })
            },
            ...mapActions(['getLists','getReadNum'])
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
    
    .mian {
        max-width: 995px;
        min-width: 628px;
        height: 580px;
        height: 100%;
    }
    
    .mian>ul>li:nth-child(1) {
        margin-top: 0;
    }
    
    .mian>ul>li {
        overflow: hidden;
        width: 100%;
        min-height: 50px;
        margin-top: 10px;
    }
    
    .mian>ul .contLi {
        overflow: hidden;
        width: 100%;
        min-height: 370px;
        background-color: #fff;
        margin-top: 40px;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    }
    
    .main>ul .lastLi {
        overflow: hidden;
        width: 100%;
    }
    
    .lastSel {
        width: 100%;
        margin: 10px auto;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .cont {
        width: 100%;
        min-height: 310px;
        overflow: hidden;
    }
    
    .cont>div {
        width: 100%;
        color: #565a5f;
    }
    
    .cont>div:nth-child(1) {
        padding-left: 15px;
        min-height: 50px;
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
    }
    
    .cont>div:nth-child(2)>div {
        float: left;
    }
    
    .cont>div:nth-child(2)>div:nth-child(1) {
        height: 100%;
    }
    
    .cont>div:nth-child(2)>div:nth-child(1)>span {
        height: 100%;
        width: 15px;
        display: block;
        float: left;
        line-height: 38px;
        margin-left: 10px;
    }
    
    .cont>div:nth-child(2)>div:nth-child(1)>small {
        float: right;
        margin-left: 10px;
        height: 100%;
        width: 105px;
        line-height: 40px;
        display: block;
    }
    
    .cont>div:nth-child(2)>div:nth-child(2) {
        height: 100%;
    }
    
    .cont>div:nth-child(2)>div:nth-child(2)>span {
        height: 100%;
        display: block;
        float: left;
        line-height: 38px;
        /*border: 1px solid red;*/
        margin-left: 10px;
        cursor: pointer;
    }
    
    .cont>div:nth-child(2)>div:nth-child(2) .tall:hover {
        color: #38b7ea;
    }
    
    .cont>div:nth-child(3) {
        min-height: 70px;
        margin-bottom: 15px;
        width: 100%;
        background-color: #fcfcfc;
        overflow: hidden;
        display: flex;
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
        width: 89%;
        height: 80%;
        margin-top: 20px;
        margin-bottom: 10px;
    }
    
    .cont>div:nth-child(3)>div:nth-child(2)>p {
        word-wrap: break-word;
    }
    
    .cont>div:nth-child(4) {
        min-height: 30px;
        padding-bottom: 10px;
    }
    
    .showtxtCl {
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
</style>