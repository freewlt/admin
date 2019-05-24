<template>
    <div class="loginBox loginBg">
        <div class="designBox">
            <h3 class="title">ADMIN</h3>
            <div class="slogen">{{register}}admin，发现更多可信赖的解答</div>
            <Form ref="formLogin" :model="formLogin" :rules="ruleLogin" inline class="design" v-if="flag">
                <FormItem prop="username" class="inputBox userBox">
                    <Input type="text" v-model="formLogin.username" placeholder="请输入手机号或邮箱" @on-enter="handleLogin('formLogin')">
                    </Input>
                </FormItem>
                <FormItem prop="password" class="inputBox pwsBox">
                    <Input type="password" v-model="formLogin.password" placeholder="请输入密码" @on-enter="handleLogin('formLogin')" :maxlength="6">
                    </Input>
                </FormItem>
                <div class="options">
                    <button type="button" class="switchType plain" @click="phoneLogin">手机验证码登录</button>
                    <button type="button" class="cannotLogin plain" @click="forgetPwd">忘记密码？</button>
                </div>
                <FormItem>
                    <Button type="primary" class="SignFlow-submitButton" @click="handleLogin('formLogin')" :loading="loading">登录</Button> 
                </FormItem>
            </Form>
            <Form ref="formRegister" :model="formRegister" :rules="ruleRegister" inline class="design" v-else>
                <FormItem prop="phone" class="inputBox userBox">
                    <Input type="text" v-model="formRegister.phone" placeholder="phone" @on-enter="handleRegister('formRegister')">
                    </Input>
                </FormItem>
                <FormItem prop="code" class="inputBox pwsBox">
                    <Input type="text" v-model="formRegister.code" placeholder="code" @on-enter="handleRegister('formRegister')">
                    </Input>
                    <button class="Button getCode" @click="getCode" :disabled="disabled">{{getCodetxt}}</button>
                </FormItem>
                <div class="options">
                    <button type="button" class="switchType plain"></button>
                    <button type="button" class="cannotLogin plain"></button>
                </div>
                <FormItem>
                    <Button type="primary" class="SignFlow-submitButton" @click="handleRegister('formRegister')" :loading="loading2">注册</Button> 
                </FormItem>
            </Form>
            <div class="SignContainer-switch" @click="loginRegister">{{existing}}<span>{{login}}</span></div>
        </div>
    </div>
</template>

<script>
import utils from '../../libs/util.js';
import validate from '../../common/validate.js';
export default {
    name:'loginBox',
    data () {
        return {
            loading: false,
            loading2: false,
            getCodetxt: '获取短信验证码',
            disabled:false,  //是否可点击
            formLogin: {
                user: '',
                password: ''
            },
            formRegister: {
                phone: '',
                code: ''
            },
            ruleLogin: {
                username: [
                    { validator: validate.validateUser, trigger: 'blur' }
                ],
                password: [
                    { validator: validate.validatePwd },
                ]
            },
            ruleRegister:{
                phone: [
                    { validator: validate.validatePhone, trigger: 'blur' }
                ],
                code: [
                   { required: true, message: '请输入验证码!', trigger: 'blur' },
                ]
            },
            existing:'没有帐号？',
            login:'注册',
            register:'登录',
            flag:true,
            newcode:''
        }
    },
    methods: {
        loginRegi(name) {
            var that = this;
            that.$refs[name].validate((valid) => {
               if (valid) {
                    that["loading"] = true;
                    that["loading2"] = true;
                    if(that.login=='注册'){
                        var loginData ={};
                        loginData.username = that.formLogin.username;
                        loginData.password = that.formLogin.password;
                        utils.ajax.get(['/login', '?', utils.qs(loginData)].join('')).then(function(res){
                                var  account = res.data,
                                    len = account.length,
                                    usernameArr = [],
                                    passwordArr = [],
                                    ses = window.sessionStorage;
                                for(var i =0; i<len;i++){
                                    usernameArr.push(res.data[i].user);
                                    passwordArr.push(res.data[i].pwd);
                                }
                                if(usernameArr.indexOf(that.formLogin.username) ===-1){
                                    that.$Message.warning('账号不存在！')
                                    that["loading"] = false;
                                    that["loading2"] = false;
                                }else{
                                    var index = usernameArr.indexOf(that.formLogin.username);
                                    if(passwordArr[index] === that.formLogin.password){
                                        that.$router.push({name:'home'})  
                                    }else{
                                        that.$Message.warning('密码错误！')
                                        that["loading"] = false;
                                        that["loading2"] = false;
                                    }
                                }
                        }).catch(function(err){
                            that.$Message.warning('请求错误');
                            that["loading"] = false;
                            that["loading2"] = false;
                        })
                    }else{
                        var registerData ={};
                        registerData.phone = that.formRegister.phone;
                        registerData.code = that.formRegister.code;
                        utils.ajax.get(['/register', '?', utils.qs(registerData)].join('')).then(function(res){
                            if( that.newcode == that.formRegister.code){
                                that.$router.push({name:'register'})  
                            }else{
                                that.$Message.warning('验证码和手机号不统一！');
                            };   
                        }).catch(function(err){
                            that.$Message.warning('请求错误');
                            that["loading"] = false;
                            that["loading2"] = false;
                        })
                    }
                }
            })
        },
        handleLogin(name) {
            this.loginRegi(name);
        },
        handleRegister(name) {
            this.loginRegi(name);
        },
        phoneLogin(){
            this.flag=false;
        },
        forgetPwd(){
            this.$router.push({name:'findPwd'})
        },
        getCode() {
            var that = this;
            utils.ajax.get('/register').then(function(res){
                let  valid =  /^1\d{10}$/;
                var phoneExec = valid.exec(that.formRegister.phone)
                if(that.formRegister.phone == ''){
                    that.$Message.warning('手机号不为空！')
                }else if(phoneExec){
                    that.newcode = res.data.code;
                    let time = 60;
                    let timer = setInterval(() => {
                        if(time == 0) {
                            clearInterval(timer);
                            that.disabled = false;
                            that.getCodetxt = "获取验证码";
                        } else {
                            that.getCodetxt =time + '秒后重试';
                            that.disabled = true;
                            time--
                        }
                    },1000)
                }
            }).catch(function(err){
                that.$Message.warning('请求错误');
                that["loading"] = false;
                that["loading2"] = false;
            }) 
        },
        loginRegister(){
            var that = this;
            that.flag=!this.flag;
            if(that.flag==true){
                that.existing='没有帐号？',
                that.login='注册',
                that.register='登录'
            }else if(that.flag==false){
                that.existing='已有帐号？',
                that.login='登录',
                that.register='注册'
            }
        }
    },
}


</script>

<style lang="less">
    .loginBg{
        position: relative;
        width: 100%;
        height:100%;
        background:url('../../../static/images/1.jpg') no-repeat;
        background-size: 100% 100%;

    }
    .loginBox{
        .title{
            margin: 0;
            padding: 30px 0 0 0;
            text-align: center;
            color: #0084ff;
            font-size: 38px;
        }
        .slogen{
            margin: 15px 0;
            text-align: center;
            color: #0084ff;
            font-size: 20px;
        }
        .designBox{
            position: absolute;
            top: 27%;
            left:50%;
            width: 400px;
            margin: 0 auto;
            margin-left:-200px;
            background: #fff;
            .design{
                width: 85%;
                margin: 0 auto 34px;
                .ivu-form-item{
                    width: 100%; 
                    margin: 0 auto;
                }
                .inputBox{
                    position: relative;
                    width: 100%;
                    border-bottom: 1px solid #ccc;
                    margin-bottom: 20px;
                    input{
                        width: 100%;
                        height: 34px;
                        border: none;
                        outline:none;
                    }
                    .ivu-form-item-error-tip{
                        color: #f1403c;
                    }
                }
                .options{
                    display: flex;
                    -webkit-box-pack: justify;
                    -ms-flex-pack: justify;
                    justify-content: space-between;
                    height: 20px;
                    display: -webkit-box;
                    display: -ms-flexbox;
                    background: #fff;
                    button{
                        background: none;
                        border: none;
                        outline: none;
                        cursor: pointer;
                    }
                    .switchType{
                        color: #175199;
                    }
                }
                .SignFlow-submitButton {
                    width: 100%;
                    height: 36px;
                    margin-top: 10px;
                    color: #fff;
                    background-color: #0084ff;
                    border: none;
                    cursor: pointer;
                }
            }
            .getCode{
                position: absolute;
                right: 0;
                top: 0;
                border: none;
                background: none;
                color: #175199;
                outline: none;
                cursor: pointer;
            }
        }
        .SignContainer-switch {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            width: 100%;
            background-color: #f6f6f6;
            height: 58px;
            border-top: 1px solid #ebebeb;
            font-size: 16px;
            span {
                color: #175199;
                cursor: pointer;
            }
        }
      
    }
</style>

