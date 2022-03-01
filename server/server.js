const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const app = express();
const http = require('http').createServer(app);

const router = express.Router();

let phoneToken;

app.use(bodyParser.json());
app.use('/api', bodyParser.urlencoded({extended: true}), router);
app.use(cors());

process.env.GOOGLE_APPLICATION_CREDENTIALS =
  './awesometsproject-4ce9c-firebase-adminsdk-itjld-2b395d3208.json';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://awesometsproject-4ce9c.firebaseio.com',
});

const io = require('socket.io')(http, {
  transport: ['websocket'],
  cors: {origin: '*'},
});

http.listen(8090, (req, res) => {
  console.log(`서버를 요청 받ㅁㅇㄴㅇㅁㄴ을 준비가 되었습니다 👩`);
});

io.on('connection', socket => {
  console.log(`소켓 서버가 연결되었습니다 👨`);
});

router.get('/', (req, res) => {
  res.send('Hello RESTFUL API ');
});

router.post('/phoneToken', (req, res) => {
  phoneToken = req.body.token;
  res.send({});
});

router.post('/user', (req, res) => {
  if (phoneToken) {
    admin
      .messaging()
      .send({
        token: phoneToken,
        notification: {
          title: '배송 완료!',
          body: '배송이 성공적으로 완료되었습니다.',
        },
        android: {
          notification: {
            channelId: 'rn-01', // 채널아이디
            vibrateTimingsMillis: [0, 500, 500, 500], // 알림 유형?
            priority: 'high',
            defaultVibrateTimings: false,
          },
        },
        apns: {
          payload: {
            aps: {
              sound: 'default',
              category: 'riders',
            },
          },
        },
      })
      .then(console.log)
      .catch(console.error);
  }

  res.status(201).send({});
});
