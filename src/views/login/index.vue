<template>
    <div class="loginBox loginBg">
        <div class="designBox">
            <h3 class="title">ADMIN</h3>
            <div class="slogen">{{register}}<!-- -->admin，发现更多可信赖的解答</div>
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline class="design" v-if="flag">
                <FormItem prop="user" class="inputBox userBox">
                    <Input type="text" v-model="formInline.user" placeholder="Username" @on-enter="handleSubmit('formInline')">
                    </Input>
                </FormItem>
                <FormItem prop="password" class="inputBox pwsBox">
                    <Input type="password" v-model="formInline.password" placeholder="Password" @on-enter="handleSubmit('formInline')">
                    </Input>
                </FormItem>
                <div class="options">
                    <button type="button" class="switchType plain">手机验证码登录</button>
                    <button type="button" class="cannotLogin plain">忘记密码？</button>
                </div>
                <FormItem>
                    <Button type="primary" class="SignFlow-submitButton" @click="handleSubmit('formInline')">注册</Button> 
                </FormItem>
            </Form>
            <Form ref="formLogin" :model="formLogin" :rules="ruleLogin" inline class="design" v-else>
                <FormItem prop="phone" class="inputBox userBox">
                    <Input type="text" v-model="formLogin.phone" placeholder="请输入手机号" @on-enter="handleSubmitDesign('formLogin')">
                    </Input>
                </FormItem>
                <FormItem prop="code" class="inputBox pwsBox">
                    <Input type="password" v-model="formLogin.code" placeholder="请输入验证码" @on-enter="handleSubmitDesign('formLogin')">
                    </Input>
                </FormItem>
                <div class="options">
                    <button type="button" class="switchType plain"></button>
                    <button type="button" class="cannotLogin plain"></button>
                </div>
                <FormItem>
                    <Button type="primary" class="SignFlow-submitButton" @click="handleSubmitDesign('formLogin')">登录</Button> 
                </FormItem>
            </Form>
            <div class="SignContainer-switch" @click="loginRegister">{{existing}}<span>{{login}}</span></div>
        </div>
    </div>
</template>

<script>
export default {
    name:'loginBox',
    data () {
        return {
            formInline: {
                user: '',
                password: ''
            },
            formLogin: {
                phone: '',
                code: ''
            },
            ruleInline: {
                user: [
                    { required: true, message: '请输入手机号或邮箱', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码.', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码不少于6位', trigger: 'blur' }
                ]
            },
            ruleLogin:{
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入验证码.', trigger: 'blur' },
                    { type: 'string', min: 4, message: '请输入验证码', trigger: 'blur' }
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
        handleSubmit(formInline) {
            this.$refs[formInline].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleSubmitDesign(formLogin) {
            this.$refs[formLogin].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
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
                .inputBox{
                    position: relative;
                    width: 100%;
                    border-bottom: 1px solid #ccc;
                    input{
                        width: 100%;
                        height: 48px;
                        border: none;
                        outline:none;
                    }
                    .ivu-form-item-error-tip{
                        // position: absolute;
                        // top: 16px;
                        background: #fff;
                        color: #f1403c;
                    }
                    
                }
                .options{
                    display: flex;
                    -webkit-box-pack: justify;
                    -ms-flex-pack: justify;
                    justify-content: space-between;
                    height: 20px;
                    margin-top: 12px;
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
                        margin-top: 30px;
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

