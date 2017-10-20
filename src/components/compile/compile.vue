<template>
    <div id="app" class="former">
        <div class="nav">
            <input type="text" placeholder="请输入博客标题" v-model="title">
        </div>
        <div class="prefave">
            <textarea placeholder="文章前言" v-model="preface"></textarea>
        </div>
        <div class="mian">
            <div id="editorElem" style="text-align:left"></div>
        </div>
        <div class="labTall">
            <div>
                <div>标签类</div>
                <div @click="vitisClick">
                    新增标签
                </div>
            </div>
            <div>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
            </div>
        </div>
        <div class="add">
            <div @click="addClick">
                添加
            </div>
        </div>
    </div>
</template>
<script>
    import WangEditor from 'wangeditor'
    import { mapActions, mapState } from 'vuex'
    export default {
        name: 'former',
        data() {
            return {
                cliWindth: '',
                value: '',
                title: '',
                edito: '',
                preface: '',
                labxt: '',
                checkAll: true,
                checkedCities: [],
                cities: [],
                isIndeterminate: true
            }
        },
        created: function () {
            var self = this
            var symstr = sessionStorage.getItem('symid')
            if (!symstr) {
                var warningStr = "如果你想亮剑，那么先去登陆吧！！少年！！！"
                self.$alert(warningStr, '提示', {
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                    self.$router.push({
                        path: '/login'
                    })
                }).catch(() => {
                    self.$router.push({
                        path: '/login'
                    })
                });
            } else {
                // 获取标签云列表
                self.getTagList({
                }).then((data) => {
                    console.log('标签云列表', data)
                    if (data.status == 200) {
                        self.cities = data.data[0].names
                    }
                }).catch(msg => console.log(msg))
            }

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
            const editor = new WangEditor('editorElem')
            editor.config.menus = ['source', '|', 'bold', 'underline', 'italic', 'strikethrough', 'eraser', 'forecolor', 'bgcolor', '|', 'quote', 'fontfamily', 'fontsize', 'head', 'unorderlist', 'orderlist', 'alignleft', 'aligncenter', 'alignright',
                '|', 'link', 'unlink', 'table', 'img', 'video', 'insertcode', '|', 'undo', 'redo', 'fullscreen'
            ]
            editor.config.uploadImgUrl = '/upload';
            // editor.config.uploadImgFileName = 'myFileName'
            editor.config.uploadHeaders = {
                'Accept': 'text/x-json'
            };
            editor.onchange = function () {
                self.edito = this.$txt.html()
                console.log(self.edito)
            }
            editor.create()
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
            addClick() {
                var self = this
                var timestamp = new Date().getTime()
                var tallStr = self.checkedCities.join('-')
                var showStr = self.edito
                var strShow = showStr.split('>').splice(0, 4).join('>') + '>'
                console.log(self.preface)
                self.getAdd({
                    preface: self.preface,
                    title: self.title,
                    ctime: timestamp,
                    txt: self.edito,
                    talls: tallStr,
                    read: '0',
                    showtxt: strShow
                }).then((data) => {
                    console.log('添加成功', data)
                    if (data.status == 200) {
                        self.$message({
                            type: 'info',
                            message: '博客发表成功'
                        });
                    } else {
                        self.$message({
                            type: 'info',
                            message: '博客发表失败'
                        });
                    }
                }).catch(msg => {
                    console.log(msg)
                })
            },
            // 添加新的标签
            vitisClick() {
                var self = this
                this.$prompt('请输入新的标签类', '标签类', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    self.getTagAdd({
                        tagstr: value,
                    }).then((data) => {
                        if (data.status == 200) {
                            self.$message({
                                type: 'success',
                                message: '添加标签云成功'
                            });
                            self.getTagList({
                            }).then((data) => {
                                console.log('标签云列表', data)
                                if (data.status == 200) {
                                    self.cities = data.data[0].names
                                }
                            }).catch(msg => console.log(msg))
                        }

                    }).catch(msg => console.log(msg))
                }).catch(() => {
                    self.$message({
                        type: 'info',
                        message: '添加取消'
                    });
                });
            },
            // 选择标签
            handleCheckAllChange(event) {
                var self = this
                this.checkedCities = event.target.checked ? self.cities : [];
                this.isIndeterminate = false;
                console.log(this.checkedCities)
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
                console.log(this.checkedCities)
            },
            ...mapActions(['getAdd','getTagAdd','getTagList'])
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
    
    .el-checkbox-group>label:nth-child(1) {
        margin-left: 15px;
    }
    
    .el-checkbox {
        margin-top: 5px;
    }
    
    .nav {
        width: 100%;
        overflow: hidden;
        /*margin-top: 20px;*/
        height: 35px;
        margin-bottom: 10px;
    }
    
    .nav>input {
        width: 100%;
        border: 1px solid #ccc;
        height: 35px;
        line-height: 35px;
        border-radius: 3px;
        padding-left: 10px;
    }
    
    .prefave {
        margin-bottom: 10px;
        overflow: hidden;
    }
    
    .prefave textarea {
        width: 100%;
        height: 115px;
        border: 0;
        padding-top: 10px;
        padding-left: 10px;
        resize: none;
        border: 1px solid #ccc;
    }
    
    .cont {
        border: 1px solid red;
        min-height: 500px;
        background-color: #fff;
    }
    
    #editorElem {
        min-height: 500px;
    }
    
    .add {
        overflow: hidden;
        margin-top: 20px;
        height: 70px;
    }
    
    .add>div {
        float: right;
        margin-right: 40px;
        height: 38px;
        width: 120px;
        border-radius: 3px;
        background-color: #38b7ea;
        color: #fff;
        font-size: 16px;
        text-align: center;
        line-height: 38px;
        cursor: pointer;
    }
    
    .labTall {
        width: 100%;
        overflow: hidden;
        margin-top: 10px;
        background-color: #fff;
        margin-bottom: 10px;
    }
    
    .labTall>div {
        width: 90%;
        margin: 10px auto;
    }
    
    .labTall>div:nth-child(1) {
        display: flex;
        justify-content: space-between;
    }
    
    .labTall>div:nth-child(1)>div:nth-child(1) {
        width: 200px;
    }
    
    .labTall>div:nth-child(1)>div:nth-child(2) {
        width: 100px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        font-size: 15px;
        color: #38b7ea;
        border: 1px solid #ccc;
        cursor: pointer;
        border-radius: 3px;
    }
</style>