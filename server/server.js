const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const http = require('http').createServer(app);

const router = express.Router();

app.use(bodyParser.json());
app.use('/api', bodyParser.urlencoded({extended: true}), router);
app.use(cors());

const io = require('socket.io')(http, {
  transport: ['websocket'],
  cors: {origin: '*'},
});

http.listen(8090, (req, res) => {
  console.log(`서버를 요청 받을 준비가 되었습니다 👩`);
});

io.on('connection', socket => {
  console.log(`소켓 서버가 연결되었습니다 👨`);
});

router.get('/', (req, res) => {
  res.send('Hello RESTFUL API ');
});

router.post('/user', (req, res) => {
  const {email, name, nickname} = req.body;

  console.log(email, name, nickname);

  res.status(201).send({});
});
