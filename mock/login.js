let Mock = require('mockjs');//引入mockjs模块
let Random = Mock.Random;

module.exports = function() {
    var data = {//定义等下要返回的json数据
        list: []
    };

    var  randomNum = Math.floor(Math.random() * 10);

    for (var i = 0; i < 100; i++) {

        data.list.push({
            id: i,//固有id
            randomNum: randomNum,//截取随机一到三个图片
        });
    }
    return data; //返回json数
  
}