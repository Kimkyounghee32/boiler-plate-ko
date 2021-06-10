const express = require('express')
const app = express()
const port = 5000
const bodyParser =require('body-parser');

const config= require('./config/key');

const {User} =require("./models/User");


//바디파서는 클라이언트에서 오는 정보를 서버에서 분석해서 가져올수 있게 해주는거
//apllication/x-www.form-rulencoded 로 된것은 바디파서로 분석해서 가져올 수 있게 하는 코드
app.use(bodyParser.urlencoded({extended: true}));

//aplication/json 으로 된것을 바디파서로 분석해서 가져올 수 있게 하는 코드
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(()=> console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!~~~안녕하세요 새해복 많이 받으세요')
})


//여기서 부터
app.post('/register', (req, res) => {

  //회원가입 할때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다

  const user= new User(req.body) //바디파서를 이용해서 리퀘스트.바디로 클라이언트의 정보들을 받아준다

  //몽고DB에서 오는 메서드
  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err})
    return res.status(200).json({
      success: true
    })
  })

})

//여기까지가 회원가입을 위한 라우트


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})