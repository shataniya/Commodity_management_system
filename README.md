# 商品管理系统
具备增删改查以及商品展示功能的商品管理系统
# 安装所有的包
```javascript
// 首先要安装package.json里的所有依赖包
// npm
npm install
// yarn 
yarn install
```
# 1.配置.babelrc文件
```javascript
// .babelrc
{
    "presets": ["@babel/react"],
    "plugins": [
        ["import", {
          "libraryName": "antd",
          "libraryDirectory": "es",
          "style": "css"
        }]
      ]    
}
```
# 2.连接数据库
- 我没有提供数据库，因为数据实际上可以自己去抓取2333
- 可以连接一个空的数据库，在桌面上创建一个名为cms的文件夹【这里文件夹的名称不一定要求是cms，无所谓其实，可以是zhangsan】，使用这个空文件夹作为数据库，`在这里要确保安装了mongodb`，然后在终端运行以下命令：
```javascript
// 在终端上运行
mongod --dbpath cms文件夹的路径【这里是文件夹的绝对路径】 // 连接数据库
mongo                                              // 打开数据库，数据库的默认端口是27017
// 为了检测数据库是否成功开启，你可以在浏览器地址栏输入 http://localhost:27017
// 网页一旦显示 `It looks like you are trying to access MongoDB over HTTP on the native driver port.` 就说明数据库连接成功
```
# 3.运行服务器
- 内部的服务器我使用的是koa
```javascript
// 运行服务器, 使用一下命令
node server.js
// 如果你安装了 nodemon
nodemon server.js
```
# 4.运行项目
```javascript
// 使用一下命令运行项目
// npm 
npm run start
// yarn
yarn start
```
# 注意事项：
1. 在添加商品的时候，特别是上传图片的时候，建议要等待图片上传成功以及上传的图片成功显示出来，这时候才点击添加按钮【图片上传的时候实际上也会在本地下载图片，并且会保存在asset文件夹里】
