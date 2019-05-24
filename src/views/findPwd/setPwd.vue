<template>
    <div class="setPwd">
        <div class="StepHeader">
            <h1 class="title">设置密码</h1>
            <h2 class="subtitle">验证码将会发送至你的注册邮箱或手机</h2>
        </div>
        <Form ref="formRegister" :model="formRegister" :rules="ruleRegister" inline class="design">
            <FormItem prop="password" class="inputBox pwsBox">
                <Input type="password" v-model="formRegister.password" placeholder="请输入密码" @on-enter="handleLogin('formLogin')">
                </Input>
            </FormItem>
            <FormItem prop="pwdAgain" class="inputBox pwsBox">
                <Input type="password" v-model="formRegister.pwdAgain" placeholder="请输入密码" @on-enter="handleLogin('formLogin')">
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" class="SignFlow-submitButton" @click="confirm('formRegister')" :loading="loading">确认</Button> 
            </FormItem>
        </Form>

    </div>
</template>

<script>
    import utils from '../../libs/util.js';
    import validate from '../../common/validate.js';
    export default{
        name:'findPwd',
        data () {
            return {
                formRegister: {
                    password: '',
                    pwdAgain:""
                },
                ruleRegister:{
                    pwd: [
                        { validator: validate.validatePwd, trigger: 'blur' }
                    ],
                    pwdAgain: [
                        { validator: validate.validatePwdAgain, trigger: 'blur' },
                    ]
                },
                getCodetxt: '获取短信验证码',
                disabled:false,  //是否可点击
                loading: false,
                newcode:''
            }
        },
        methods: {
            confirm(name) {
                let that = this;
                that["loading"] = true;
                    let pwd = that.formRegister.password;
                    let pwdAgain = that.formRegister.pwdAgain;
                that.$refs[name].validate((valid) => {
                     if( pwd == pwdAgain){ 
                        utils.ajax.get(['/register', '?', utils.qs(pwd)].join('')).then(function(res){
                            if(that.formRegister.password=='' && that.formRegister.pwdAgain==''){
                                that.$Message.warning('密码不能为空');
                                that["loading"]=false;
                            }else{
                                 if(that.formRegister.password==that.formRegister.pwdAgain){
                                    that.$router.push({name:'login'}) 
                                }
                            }
                        }).catch(function(err){
                            that.$Message.warning('请求失败');
                            that["loading"]=false;
                        })
                    }else{
                        that.$Message.warning('密码不一致');
                         that["loading"]=false;
                    };  
                })
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
                }) 
            },
        }
    }
</script>

<style lang="less">
    .setPwd{
        width: 60%;
        margin: 100px auto;
        text-align: center;
        .StepHeader{
            padding: 20px 0;
            .subtitle{
                margin: 4px 0 40px;
                font-size: 15px;
                font-weight: 400;
                color: #8590a6;
            }
        }
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
    
</style>
