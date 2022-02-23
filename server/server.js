const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const http = require('http').createServer(app);

const router = express.Router();

app.use(bodyParser.json());
app.use('/api', bodyParser.urlencoded({extended: true}), router);
app.use(cors());

http.listen(8090, (req, res) => {
  console.log(`서버를 요청 받을 준ㄴㅁㅇ비가 되었습니다 👩`);
});

// 등록 되지 않은 패스에대해 페이지 오류 응답
// router.all('*', (req, res) => {
//   console.log(req.status);
//   // res.status(404).send({
//   //   errorMessage: 'Bye',
//   // });
// });

router.get('/', (req, res) => {
  res.send('Hello RESTFUL API ');
});

router.post('/user', (req, res) => {
  const {email, name, nickname} = req.body;

  res.status(201).send({});
});
