<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" @change="doSomethingElse" ref="logIng" class="login">
        <div class="loginope" v-loading.body="loading" element-loading-text="登录中....">
            <h3>泡泡</h3>
            <div class="loginIng">
                <div>用户名：</div>
                <div><input type="text" v-model="user.name"></div>
            </div>
            <div class="loginIng">
                <div>密&nbsp;&nbsp;&nbsp;&nbsp;码：</div>
                <div><input type="password" v-model="user.password" v-focus></div>
            </div>
            <div class="loginBut">
                <div>
                    <el-checkbox class="memory" v-model="checked">记住密码</el-checkbox>
                </div>
                <div>
                    <div class="but" @click="loginClick">登陆</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    export default {
        name: 'login',
        data() {
            return {
                checked: false,
                user: {
                    name: '',
                    password: ''
                },
                loading: false
            }
        },
        created: function () {
            var self = this
            sessionStorage.removeItem('userId')
            sessionStorage.removeItem('userName')
            var name = localStorage.getItem('name')
            var psw = localStorage.getItem('psd')
            var checkStr = localStorage.getItem('check');
            if (checkStr == 'true') {
                self.checked = true
            } else {
                self.checked = false
            }
            self.user.name = name
            self.user.password = psw
        },
        mounted: function () {
            var self = this
        },
        methods: {
            loginClick() {
                var self = this
                var memoryStr = this.checked
                if (memoryStr == true) {
                    localStorage.setItem('name', this.user.name)
                    localStorage.setItem('psd', this.user.password)
                    localStorage.setItem('check', this.checked);
                } else {
                    localStorage.removeItem('name', this.user.name)
                    localStorage.removeItem('psd', this.user.password)
                    localStorage.removeItem('check', this.checked);
                }
                if (this.user.name == null || this.user.password == null) {
                    this.$message({
                        type: 'info',
                        message: '账号或密码不能为空!'
                    });
                } else {
                    self.loading = true
                    self.getLogin({
                        account: self.user.name,
                        password: self.user.password
                    }).then((data) => {
                        console.log(data)
                        if (data.status == 200) {
                            self.loading = false
                            sessionStorage.setItem('symid', data.symid)
                            self.$router.push({
                                path: '/home'
                            })
                            self.$message({
                                type: 'success',
                                message: '登录成功!'
                            })
                            self.user.name = ''
                            self.user.password = ''
                        } else if (data.status == 205) {
                            self.loading = false
                            self.$message({
                                type: 'info',
                                message: '账号或密码错误!'
                            });
                            self.user.name = ''
                            self.user.password = ''
                        } else {
                            self.loading = false
                            self.$message({
                                type: 'info',
                                message: '服务器错误!'
                            });
                            self.user.name = ''
                            self.user.password = ''
                        }
                    }).catch(msg => {
                        console.log(msg)
                        if (msg.status == 500) {
                            this.$message({
                                type: 'info',
                                message: '服务器没有启动!'
                            });
                            this.loading = false
                        }
                        if (msg.status == 504) {
                            this.$message({
                                type: 'info',
                                message: '请求超时，服务器没有启动!'
                            });
                            this.loading = false
                        }
                    });
                }
            },
            doSomethingElse() {
                console.log('3213123')
            },
             ...mapActions(['getLogin'])
        }
    }

</script>
<style scoped>
    .login {
        height: 100vh;
        background: url('/staticp/img/loginbg1.jpg') no-repeat;
        background-size: 100vw 100vh;
    }
    
    .loginope {
        z-index: 1;
        position: fixed;
        left: calc((100vw - 488px) / 2);
        top: calc((100vh - 305px) /2);
        width: 488px;
        height: 305px;
        border: 1px solid rgba(0, 230, 168, 0.1);
        background-color: rgba(0, 230, 168, 0.1);
    }
    
    .loginope h3 {
        width: 100%;
        margin: 0;
        padding: 0;
        text-align: center;
        height: 60px;
        line-height: 60px;
        font-size: 26px;
        color: #fff;
        font-family: "microsoft yahei", Helvetica, Tahoma, Arial, "Microsoft jhengHei", sans-serif;
    }
    
    .loginope>div {
        height: 50px;
        margin-top: 20px;
    }
    
    .loginIng {
        display: flex;
        align-items: center;
        height: 50px;
        justify-content: center;
        width: 345px;
        margin: 0 auto;
    }
    
    .loginIng>div:nth-child(1) {
        width: 100px;
        height: 50px;
        overflow: hidden;
        font-size: 15px;
        color: #fff;
        line-height: 50px;
        text-align: center;
        float: left;
    }
    
    .loginIng>div:nth-child(2) {
        width: 240px;
        height: 50px;
        display: flex;
        align-content: center;
        line-height: 50px;
        float: right;
    }
    
    .loginIng>div:nth-child(2) input {
        margin-top: 7px;
        width: 220px;
        height: 33px;
        border-radius: 4px;
        background-color: #fff;
        border: 0;
        font-size: 18px;
        padding-left: 10px;
        line-height: 33px;
    }
    
    .loginBut {
        color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 35px;
        line-height: 35px;
    }
    
    .loginBut>div:nth-child(1) {
        font-size: 14px;
        margin-left: 92px;
        float: left;
        height: 35px;
    }
    
    .memory {
        color: #fff;
        height: 35px;
        line-height: 35px;
    }
    
    .loginBut>div:nth-child(2) .but {
        font-size: 16px;
        width: 95px;
        height: 33px;
        line-height: 33px;
        background-color: rgba(0, 230, 168, 0.5);
        border: 0;
        border-radius: 3px;
        margin-right: 90px;
        text-align: center;
        cursor: pointer;
        float: right;
    }
</style>