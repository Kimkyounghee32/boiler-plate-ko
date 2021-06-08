const mongoose =require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email : {
        type: String,
        trim: true, //유저가 이메일 입력했을때 혹시 잘못입력할 수 있는 스페이스(여백)을 없애주는 역할
        unique : 1 //중복된 이메일 없게=유니크하게
    },
    password: {
        type : String,
        minlength:5
    },
    lastname: {
        type : String,
        maxlength : 50
    },

    //롤을 주는 이유는 어떤 유저가 관리자가 될 수 도 있고 일반유저가 될 수도 있음
    //관리자는 그 일반 유저를 관리할 수 있고.
    //넘버가 1이면 관리자 0이면 일반유저 이런 식으로 역할을 주기위해서 롤을쓴다
    role : {
        type: Number,
        default : 0
    },

    image: String,
    token: {
        type : String
    },
    token: {
        type : String
    },

    tokenExp:{
        type:Number
    }

})

const User = mongoose.model('User', userSchema)

module.exports = {User}