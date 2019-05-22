<template>
    <div class="loginBox loginBg">
        <div class="designBox">
            <h3 class="title">ADMIN</h3>
            <div class="slogen">{{register}}<!-- -->admin，发现更多可信赖的解答</div>
            <Form ref="formLogin" :model="formLogin" :rules="ruleLogin" inline class="design" v-if="flag">
                <FormItem prop="username" class="inputBox userBox">
                    <Input type="text" v-model="formLogin.username" placeholder="请输入手机号或邮箱" @on-enter="handleLogin('formLogin')">
                    </Input>
                </FormItem>
                <FormItem prop="password" class="inputBox pwsBox">
                    <Input type="password" v-model="formLogin.password" placeholder="请输入密码" @on-enter="handleLogin('formLogin')" :maxlength="5">
                    </Input>
                </FormItem>
                <div class="options">
                    <button type="button" class="switchType plain"></button>
                    <button type="button" class="cannotLogin plain"></button>
                </div>
                <FormItem>
                    <Button type="primary" class="SignFlow-submitButton" @click="handleLogin('formLogin')">登录</Button> 
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
                </FormItem>
                <div class="options">
                    <button type="button" class="switchType plain">手机验证码登录</button>
                    <button type="button" class="cannotLogin plain">忘记密码？</button>
                </div>
                <FormItem>
                    <Button type="primary" class="SignFlow-submitButton" @click="handleRegister('formRegister')">注册</Button> 
                </FormItem>
            </Form>
            <div class="SignContainer-switch" @click="loginRegister">{{existing}}<span>{{login}}</span></div>
        </div>
    </div>
</template>

<script>
import utils from '../../libs/util.js';
import Axios from 'axios';
export default {
    name:'loginBox',
    data () {
        const validateUser =(rule,value,callback)=>{
            if(value === ''){
                callback(new Error('请输入手机号'));
            }else{
                let validateUser =  /^1\d{10}$/;
                if(!validateUser.exec(this.formLogin.username)){
                    callback(new Error('手机号格式不正确'))
                }
                callback();
            }
        };
        const validatePwd =(rule,value,callback)=>{
            if(value === ''){
                callback(new Error('请输入密码'));
            }else{
                let validatePwd =  /^(\w){6,20}$/;
                if(!validatePwd.exec(this.formLogin.validatePwd)){
                    callback(new Error('密码不正确'))
                }
                callback();
            }
        };
        
        const validatePhone =(rule,value,callback)=>{
            if(value === ''){
                callback(new Error('请输入手机号'));
            }else{
                let validatePhone =  /^1\d{10}$/;
                if(!validatePhone.exec(this.formRegister.phone)){
                    callback(new Error('手机号格式不正确'))
                }
                callback();
            }
        };

        return {
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
                    { validator: validateUser, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePwd },
                ]
            },
            ruleRegister:{
                phone: [
                    { validator: validatePhone, trigger: 'blur' }
                ],
                code: [
                   { required: true, message: '请输入验证码!', trigger: 'blur' },
                ]
            },
            existing:'没有帐号？',
            login:'注册',
            register:'登录',
            flag:true,
        }
    },
    created(){
        
    },
    methods: {
        loginRegi(name) {
            var $this = this;
            $this.$refs[name].validate((valid) => {
                console.log(valid)
               if (valid) {
                   var loginData ={};
                   loginData.username = $this.formLogin.username;
                    loginData.password = $this.formLogin.password;
                    console.log(loginData)
                    utils.ajax.post(['/login', '?', utils.qs(loginData)].join('')).then(function(res){
                       console.log(res)
                   })
                } else {
                        this.$Message.warning('表单验证失败!');
                }
            })
        },
        handleLogin(name) {
            this.loginRegi(name);
        },
        handleRegister(name) {
            this.loginRegi(name);
        },
        loginRegister(){
            this.flag=!this.flag;
            if(this.flag==true){
                this.existing='没有帐号？',
                this.login='注册',
                this.register='登录'
            }else if(this.flag==false){
                this.existing='已有帐号？',
                this.login='登录',
                this.register='注册'
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
                    margin-bottom: 24px;
                    input{
                        width: 100%;
                        height: 34px;
                        border: none;
                        outline:none;
                    }
                    .ivu-form-item-error-tip{
                        // position: absolute;
                        // top: 16px;
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

