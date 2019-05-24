<template>
    <div class="findPwd">
        <div class="StepHeader">
            <h1 class="title">找回密码</h1>
            <h2 class="subtitle">验证码将会发送至你的注册邮箱或手机</h2>
        </div>
        <Form ref="formRegister" :model="formRegister" :rules="ruleRegister" inline class="design">
            <FormItem prop="phone" class="inputBox userBox">
                <Input type="text" v-model="formRegister.phone" placeholder="phone" @on-enter="handleRegister('formRegister')">
                </Input>
            </FormItem>
            <FormItem prop="code" class="inputBox pwsBox">
                <Input type="text" v-model="formRegister.code" placeholder="code" @on-enter="handleRegister('formRegister')">
                </Input>
                <button class="Button getCode" @click="getCode" :disabled="disabled">{{getCodetxt}}</button>
            </FormItem>
            <FormItem>
                <Button type="primary" class="SignFlow-submitButton" @click="nextStep('formRegister')" :loading="loading">下一步</Button> 
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
                    phone: '',
                    code: ''
                },
                ruleRegister:{
                    phone: [
                        { validator: validate.validatePhone, trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请输入验证码!', trigger: 'blur' },
                    ]
                },
                getCodetxt: '获取短信验证码',
                disabled:false,  //是否可点击
                loading: false,
                newcode:''
            }
        },
        methods: {
            nextStep(name) {
                let that = this;
                let registerData ={};
                    registerData.phone = that.formRegister.phone;
                    registerData.code = that.formRegister.code;
                that.$refs[name].validate((valid) => {
                    utils.ajax.get(['/register', '?', utils.qs(registerData)].join('')).then(function(res){
                        if(that.getCodetxt=='获取短信验证码'){
                            that.$Message.warning('请输入验证码');
                            that["loading"]=false;
                        }else{
                            if( that.newcode == that.formRegister.code){
                                that.$router.push({name:'setPwd'})  
                            }else{
                                that.$Message.warning('请输入正确的验证码');
                                that["loading"]=false;
                            }; 
                        }
                    }).catch(function(err){
                        that.$Message.warning('请求失败');
                        that["loading"]=false;
                    })
                })
            },
            getCode() {
                var that = this;
                utils.ajax.get('/register').then(function(res){
                    let  valid =  /^1\d{10}$/;
                    var phoneExec = valid.exec(that.formRegister.phone)
                    if(that.formRegister.phone == ''){
                        that.$Message.warning('手机号不为空！');
                        that["loading"] = false;
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
    .findPwd{
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
