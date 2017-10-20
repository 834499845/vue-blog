<template>
    <div id="app" class="catalog">
        <div class="main">
            <ul>
                <li class="titleLi">
                    <div>
                        <span class="glyphicon glyphicon-tag"></span>
                    </div>
                    <div>
                        {{titleName}}
                    </div>
                </li>
                <li v-show="liShow" v-for="(item,index) in list" class="contLi">
                    <div>
                        <span></span>
                    </div>
                    <div class="contLg">
                        <div @click="contClick(index)">
                            {{item.title}}
                        </div>
                        <div>
                            <div>
                                <span class="glyphicon glyphicon-list-alt"></span>
                                <small> {{item.ctime | ctimeFun}}</small>
                            </div>
                            <div>
                                <span class="glyphicon glyphicon-tag"></span>
                                <small v-for="(cr,ind) in item.talls" @click="tallClick(index,ind)">{{cr}}</small>
                            </div>
                        </div>
                    </div>
                </li>
                <li v-show="!liShow" class="contLi">
                    <div>
                        <span></span>
                    </div>
                    <div class="contLg">
                        <div>
                            暂无博客
                        </div>
                        <div>

                        </div>
                    </div>
                </li>
                <li class="lastLi" id="lastLi">
                    <div class="lastSel">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSizeNum"
                            layout="total,prev, pager, next" :total="totalNum">
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
        name: 'catalog',
        data() {
            return {
                pageSizeNum: 10,
                currentPage: 1,
                totalNum: 0,
                cliWindth: '',
                listShow: true,
                liShow: false,
                titleName: '2017',
                list: [
                ],
                searStr: ''
            }
        },
        computed: mapState(['']),
        created: function () {
            window.scrollTo(0, 0);
            var self = this
            self.fetchData();
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
                    self.$emit('childsay', 1200);
                } else if (val > 820 && val < 1185) {
                    self.$emit('childsay', 1000)
                } else if (val < 820) {
                    self.$emit('childsay', 820)
                }
            },
            '$route': 'fetchData'
        },
        methods: {
            fetchData() {
                var self = this
                window.scrollTo(0, 0);
                self.titleName = self.$route.query.sear
                self.getFindTags({
                    num: self.pageSizeNum,
                    page: self.currentPage,
                    time: self.$route.query.sear
                }).then((data) => {
                    console.log('根据归档日期查询', data)
                    if (data.status == 200) {
                        self.list = data.data

                        if (data.data.length > 0) {
                            self.liShow = true
                            self.totalNum = data.tatal
                        } else {
                            self.liShow = false
                            self.totalNum = 0
                        }
                    } else {
                    }
                }).catch(msg => {
                    console.log(msg)
                })
            },
            // 点击分页
            handleSizeChange() {

            },
            handleCurrentChange(val) {
                var self = this
                self.currentPage = val
                self.getFindTags({
                    num: self.pageSizeNum,
                    page: val,
                    time: self.$route.query.sear
                }).then((data) => {
                    console.log('根据归档日期查询', data)
                    if (data.status == 200) {
                        self.list = data.data
                        if (data.data.length > 0) {
                            self.liShow = true
                            self.totalNum = data.tatal
                        } else {
                            self.liShow = false
                            self.totalNum = 0
                        }
                    } else {
                    }
                }).catch(msg => {
                    console.log(msg)
                })
            },
            contClick(index) {
                var self = this
                var idStr = this.list[index]._id
                this.$router.push({
                    path: '/home/content',
                    query: { contId: idStr }
                })
                var readNum = this.list[index].read
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
            tallClick(index, ind) {
                var tagStr = this.list[index].talls[ind]
                this.$router.push({
                    path: '/home/archives',
                    query: { sear: tagStr }
                })
            },
            ...mapActions(['getFindTags','getReadNum'])
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
        min-width: 628px;
        min-height: 200px;
        height: 100%;
    }
    
    .main>ul>li {
        width: 100%;
        min-height: 50px;
        height: 100%;
        overflow: hidden;
    }
    
    .main>ul .contLi {
        min-height: 100px;
        height: 100%;
    }
    
    .main>ul .titleLi {
        min-height: 45px;
        height: 100%;
        overflow: hidden;
    }
    
    .main>ul .titleLi>div:nth-child(1) {
        width: 45px;
        height: 50px;
        /*border: 1px solid red;*/
        overflow: hidden;
        position: relative;
    }
    
    .main>ul .titleLi>div:nth-child(1) span {
        width: 35px;
        height: 35px;
        display: block;
        border-radius: 50%;
        background-color: #38b7ea;
        line-height: 37px;
        text-align: center;
        color: #fff;
        font-size: 15px;
    }
    
    .main>ul .titleLi>div:nth-child(1)::before {
        position: absolute;
        top: 35px;
        left: 16px;
        background-color: #eceff2;
        width: 3px;
        height: 30px;
        content: "";
    }
    
    .main>ul .titleLi>div:nth-child(2) {
        overflow: hidden;
        height: 50px;
        line-height: 30px;
        color: #565a5f;
        padding-left: 10px;
    }
    
    .main>ul .contLi>div:nth-child(1) {
        width: 45px;
        min-height: 100px;
        height: 100%;
    }
    
    .main>ul .contLi>div:nth-child(1)>span {
        display: block;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: #38b7ea;
        margin-left: 10px;
        margin-top: 10px;
        position: relative;
    }
    
    .main>ul .contLi>div:nth-child(1)>span::after {
        position: absolute;
        top: -15px;
        left: 6px;
        background-color: #eceff2;
        width: 3px;
        height: 15px;
        content: "";
    }
    
    .main>ul .contLi>div:nth-child(1)>span::before {
        position: absolute;
        top: 15px;
        left: 6px;
        background-color: #eceff2;
        width: 3px;
        height: 75px;
        content: "";
    }
    
    .main>ul .contLi>div:nth-child(2) {
        width: 90%;
        /*border: 1px solid red;*/
        min-height: 85px;
        height: 100%;
        background-color: #fff;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
        position: relative;
    }
    
    .main>ul .contLi>div:nth-child(2)::before {
        position: absolute;
        content: "";
        height: 0;
        width: 0;
        pointer-events: none;
        border: solid transparent;
        border-color: rgba(136, 183, 213, 0);
        border-right-color: #fff;
        border-width: 10px;
        top: 50%;
        right: 100%;
        margin-top: -30px;
    }
    
    .main>ul .lastLi {
        width: 100%;
        height: 30px;
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }
    
    .main>ul .lastLi>div:nth-child(1) {
        width: 100%;
        display: flex;
        justify-content: center;
    }
    
    .contLg>div:nth-child(1) {
        padding-left: 10px;
        height: 44px;
        width: 95%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 44px;
        cursor: pointer;
    }
    
    .contLg>div:nth-child(1):hover {
        color: #38b7ea;
    }
    
    .contLg>div:nth-child(2) {
        border-top: 1px solid #eceff2;
        height: 40px;
        width: 95%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    
    .contLg>div:nth-child(2)>div {
        float: left;
        height: 40px;
        line-height: 40px;
        margin-left: 10px;
    }
    
    .contLg>div:nth-child(2)>div:nth-child(1) span {
        height: 40px;
        display: block;
        line-height: 40px;
        padding-bottom: 3px;
        margin-bottom: 5px;
    }
    
    .contLg>div:nth-child(2)>div:nth-child(1) small {
        height: 40px;
        line-height: 43px;
        display: block;
        cursor: pointer;
        margin-left: 10px;
    }
    
    .contLg>div:nth-child(2)>div:nth-child(2) span {
        height: 40px;
        display: block;
        line-height: 40px;
        padding-bottom: 3px;
        margin-bottom: 5px;
    }
    
    .contLg>div:nth-child(2)>div:nth-child(2) small {
        height: 40px;
        display: block;
        padding-bottom: 3px;
        margin-bottom: 5px;
        margin-left: 5px;
        cursor: pointer;
    }
    
    .contLg>div:nth-child(2)>div:nth-child(2) small:hover {
        color: #3eb9ea;
    }
    /*.contLg>div:nth-child(2)>div:nth-child(1) small:hover {
        color: #3eb9ea;
    }
    */
    
    .contLg>div:nth-child(2)>div:nth-child(1) {
        color: #6a6e68;
        display: flex;
    }
    
    .contLg>div:nth-child(2)>div:nth-child(2) {
        color: #6a6e68;
        display: flex;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    
    .main>ul>li>div {
        float: left;
    }
</style>