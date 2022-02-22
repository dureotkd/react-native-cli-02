const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

const router = express.Router();

app.use(cors());
app.use('/api', express.urlencoded({extended: false}), router);

http.listen(8090, (req, res) => {
  console.log(`서버를 요청 받을 준비가 되었습니다 👩`);
});

router.get('/', (req, res) => {
  res.send('Hello RESTFUL API ');
});
