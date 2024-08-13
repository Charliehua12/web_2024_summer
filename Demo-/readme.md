- 此为完整zip压缩版，另一个为pm2打包版，不确定pm2打包版是否可以在别人电脑运行，不过字全zip版方法经过测试可以在别人电脑运行，只是需要本地下载mysql
- https://github.com/Charliehua12/web_2024_summer
- 上述是github仓库地址

# WELCOME TO coteam ！！！
## 作者叨叨
  曾几何时，我天真的选择了web这一个暑期学校课程，我曾经信誓旦旦地跟同学们说
  
 “我不信一个web的大作业能比C语言的大作业还难”
  
  现在成🤡了，不得不感概从零基础一手搭建前端后端学习mysql与ai和浏览器and乱七八糟的知识斗智斗勇远超乎想象
  千言万语我只能说：“这把高端局，尽力了尽力了”
  
  实现不佳还请担待！讲个笑话，为什么github上面先是一个Demo-，里面还有一个Demo？？？因为最开始写的Demo以及第二次写的Demo+都不知道因为什么原因写着写着就运行不起来了，尤其是后端！！！气死人了，莫名其妙就不能运行了，所以只能重新配置环境重新写，所以github上的Demo-实际上是第三代版本了QWQ
## 关于运行
前端：
- cd frontend
- npm run dev

后端：
- cd backend
- npm run dev

mysql:（本地安装了mysql才能运行）

mysql -u root -p -h localhost -P 3306

- SOS
- SOS 输入密码请输入自己账号的密码！！！ ，并且！！！修改Demo-\Demo\backend\src\config\config.default.ts的内容，将password修改为自己的密码！！！！！！
- SOS
- 经过实验此方法可以在别人电脑运行

CREATE DATABASE coteam;

USE coteam;

CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

### 备用手段
- 若实在无法运行，可以私信我腾讯会议共享屏幕由我来指导运行，如果嫌弃麻烦可以查看zip里面的Attention视频，里面有在本地运行跑起来的效果。。。 
- 即使运行也欢迎查看！！！

## 关于功能与技术栈
  不知道为什么，反正我自己看moddle上面评分任务的8条实际上只有7条🤔，反正在上面的7条功能理论上都实现了（）。。。
  
  亮点：比较好看的list颜色和UI互动，为list，task，comment以及各种按钮增加了动态变大效果，并且都有重命名（评论没有重命名，感觉不需要），增加，删除功能，附件同理
  
  
  技术栈：使用mysql存储数据 并使用typeorm进行操纵，用于存储各种类型的数据并查询。使用了bcrypt用于密码加密，使用jwt用于在中间件中鉴别用户身份，提供对部分api的保护。
  阿弥陀佛
