const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');

const config = require('./Config/key');

const { User } = require('./Model/User');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World! Happy New Year')
})

app.post('/register', (req, res) => {

  // 회원가입 정보를 client에서 가져옴
  // 그 정보를 데이터베이스에 Insert
  const user = new User(req.body)
  user.save((err, userInfo) => {
    if (err) 
      return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})