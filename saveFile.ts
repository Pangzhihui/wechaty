const QrcodeTerminal = require('qrcode-terminal')
var nodemailer = require('nodemailer');  

// import { inspect }            from 'util'
import { createWriteStream, writeFileSync }  from 'fs'

import {
  Config,
  Message,
  MsgType,
  Wechaty,
} from '../'
const bot = Wechaty.instance({ profile: Config.DEFAULT_PROFILE })
var flag1 = 0
var toEmail = ''

bot
.on('scan', (url, code) => {
  if (!/201|200/.test(String(code))) {
    const loginUrl = url.replace(/\/qrcode\//, '/l/')
    QrcodeTerminal.generate(loginUrl)
  }
  console.log(`${url}\n[${code}] Scan QR Code in above url to login: `)
})
.on('login', user => {
  console.log(`${user.name()} logined`)
  bot.say('请输入您要绑定的邮箱~');
})
.on('message', m => {
  console.log(`RECV: ${m}`)
  
  // console.log(inspect(m))
  saveRawObj(m.rawObj)
  
  	var reg=/^\d{5,12}@([q]{2}|[Q]{2})\.com$/;
	var isok = reg.test(`${m}`);

  	if (isok) {
      
      flag1 = 1
      toEmail = `${m}`
      bot.say('绑定成功，您收到的文件将以邮件形式发送到您的邮箱~');

    }
  
  if( flag1 === 1 ) {
  	
	
  	if ( m.type() === MsgType.IMAGE
    || m.type() === MsgType.EMOTICON
    || m.type() === MsgType.VIDEO
    || m.type() === MsgType.VOICE
    || m.type() === MsgType.MICROVIDEO
    || m.type() === MsgType.APP
    || (m.type() === MsgType.TEXT && m.typeSub() === MsgType.LOCATION)  // LOCATION
    ) {
        saveMediaFile(m) 
     }
    }
})
.init()
.catch(e => console.error('bot.init() error: ' + e))
  

function saveMediaFile(message: Message) {
  const filename2 = message.filename()
  const fromer = message.from()
  console.log('IMAGE local filename: ' + filename2)

  const fileStream = createWriteStream(filename2)

  console.log('start to readyStream()')
  message.readyStream()
          .then(stream => {
            stream.pipe(fileStream)
                  .on('close', () => {
                    console.log('finish readyStream()')
                  })
          })
          .catch(e => console.log('stream error:' + e))

  var transporter = nodemailer.createTransport({  
  service: 'qq',  
  auth: {  
    user: '1445939374@qq.com',  
    pass: 'fblewvrhepfwhedj' //授权码,通过QQ获取  
  
  }  
  });  
  var mailOptions = {  
    from: '1445939374@qq.com', // 发送者  
    to: toEmail, // 接受者,可以同时发送多个,以逗号隔开  
    subject: fromer+'发来'+filename2, // 标题  
    //text: 'Hello world', // 文本  
    html: '您好！您的微信好友'+fromer+'给您发来'+filename2,  
    attachments:[  
      {  
        filename : filename2,  
        path: filename2  
      }
    ]  
  };    
  
  transporter.sendMail(mailOptions, function (err, info) {  
    if (err) {  
      console.log(err);  
      return;  
    }  
  
    console.log('发送成功');  
  }); 


}

function saveRawObj(o) {
  writeFileSync('rawObj.log', JSON.stringify(o, null, '  ') + '\n\n\n', { flag: 'a' })
}
