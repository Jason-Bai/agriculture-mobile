var express = require('express');
var wechat = require('wechat');

var configs = require('./config');


var app = express();


var port = process.env.PORT || configs.services.port;

var wechatConfig = {
  token: configs.wechat.token,
  appid: configs.wechat.appId,
  encodingAESKey: configs.wechat.aesKey
};

app.set('port', port);
app.use(express.query());

app.use('/wechat', wechat(wechatConfig, function (req, res, next) {
  var message = rewq.weixin;
  if (message.FromUserName === 'diaosi') {
    res.reply('hehe');
  } else if (message.FromUserName === 'text') {
    res.reply({
      content: 'text object',
      type: 'text'
    });
  } else if (message.FromUserName === 'music') {
    res.reply({
      type: "music",
      content: {
        title: "来段音乐吧",
        description: "一无所有",
        musicUrl: "http://mp3.com/xx.mp3",
        hqMusicUrl: "http://mp3.com/xx.mp3",
        thumbMediaId: "thisThumbMediaId"
      }
    });
  } else {
    res.reply([
      {
        title: '你来我家接我吧',
        description: '这是女神与高富帅之间的对话',
        picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
        url: 'http://nodeapi.cloudfoundry.com/'
      }
    ]);
  }
}));

app.listen(app.get('port'), function () {
  console.log('Wechat Server running at ' + app.get('port' + ' port!'));
})