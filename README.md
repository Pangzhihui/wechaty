# saveFile-bot 

## 功能

这个机器人的功能是通过与QQ邮箱进行绑定，把收到的聊天文件都以邮件的形式保存到邮箱中，解决因为文件没有及时保存而过期的问题

## 展示

<div align="center">
<a target="_blank" href="https://v.qq.com/x/page/g0515hgx4da.html"><img src="https://cloud.githubusercontent.com/assets/1361891/21722581/3ec957d0-d468-11e6-8888-a91c236e0ba2.jpg" border=0 width="60%"></a>
</div>

> Source code in the video can be found at here: [saveFile-bot](https://github.com/lijiarui/wechaty-getting-started)

## 运行

比如说, 你已经下载保存了项目中的代码文件 `saveFile.ts`.我们可以直接使用docker来运行

### Docker

[![Docker Pulls](https://img.shields.io/docker/pulls/zixia/wechaty.svg?maxAge=2592000)](https://hub.docker.com/r/zixia/wechaty/) [![Docker Stars](https://img.shields.io/docker/stars/zixia/wechaty.svg?maxAge=2592000)](https://hub.docker.com/r/zixia/wechaty/) [![Docker Layers](https://images.microbadger.com/badges/image/zixia/wechaty.svg)](https://microbadger.com/#/images/zixia/wechaty)

选择使用docker运行的原因不仅在于这种方式是最简单的，还在于可以摆脱很多因为没有安装依赖包而引发的问题

```shell
$ docker run -ti --rm --volume="$(pwd)":/bot zixia/wechaty saveFile.ts
```
如果之前您没有安装过nodemailer这个module，运行时可能会报错，用npm安装一下这个依赖包(命令如下)，再重新在docker中运行上面的命令就好了
```shell
$ npm install nodemailer
```

