## 运行项目

1.下载HBuilder（编译工具，安装依赖），可以仅作为编译工具，然后结合自己习惯的IDE开发

2.安装微信开发工具，windows需要设置HBuilder的微信开发工具路径

3.运行到微信小程序


## 两个webstorm配置参考

https://ask.dcloud.net.cn/article/36766

https://blog.csdn.net/weixin_44872995/article/details/105541806


## 踩过的坑

1.自定义组件不支持model写法，只能通过bind+emit方式实现双绑

2.tab页面不能用navigateTo跳转，只能用swtchTab

3.flex布局的vertical方向似乎有问题，用height+calc替代

4.