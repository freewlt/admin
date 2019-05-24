
    const validateUser =(rule,value,callback)=>{
        if(value === ''){
            callback(new Error('请输入手机号'));
        }else{
            let validateUser =  /^1\d{10}$/;
            if(!validateUser.exec(this.formLogin.username)){
                callback(new Error('手机号格式不正确'));
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
                callback(new Error('密码不正确'));
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
                callback(new Error('手机号格式不正确'));
            }
            callback();
        }
    };
