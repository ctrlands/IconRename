## 预览
拖拽图标到对应区域完成图标快速重命名
<img src="https://github.com/ctrlands/IconRename/blob/master/show_1.png">
图标数据管理（增删改查）
<img src="https://github.com/ctrlands/IconRename/blob/master/show_2.png">

## 运行环境

1. 安装mysql
2. 安装node.js(10.0+)
3. Navica2(mysql图形化软件)或者其他
4. python(2.7.3 或者2.7.15, for node-sass)
5. 安装jdk环境(不确定是否需要)
6. 安装git(不确定是否需要)

## 参数配置

1. 数据库配置

	`AppRenameServe/db/config.js`

	打开这个文件, 修改数据库配置信息
	
## 运行

一.
1. 运行(前后端分离时)
 
	`AppRename`和`AppRenameServe`

	分别进入这个文件的根目录, shift + 鼠标右键, 选择'在此处打开powershell窗口', 输入命令行:

	`npm install`

	等待安装完成

	`npm start`

2. 打开浏览器, 在浏览器中输入http://localhost:4200

二.
1. 运行(前后端整合时)

	`Release/AppRenameServe`
	
	进入这个文件的根目录, shift + 鼠标右键, 选择'在此处打开powershell窗口', 输入命令行:

	`npm install`

	等待安装完成

	`npm start`
	
2. 打开浏览器, 在浏览器中输入http://localhost:3000








	
