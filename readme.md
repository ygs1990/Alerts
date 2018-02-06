##一、组件名称：Alerts
前段时间公司做项目要用到弹窗，并且弹窗的内容等各不相同，于是自己动手了个弹窗组件，下面是关于该组件的一些信息。

##二、Alerts功能：可根据需要
* 设置弹窗宽度
* 设置弹窗高度
* 设置弹窗背景色
* 设置弹窗标题
* 设置弹窗提示信息
* 为弹窗标题添加样式类
* 为弹窗内容添加样式类
* 设置弹窗确定按钮显示文本
* 设置弹窗取消按钮显示文本
* 设置是否显示弹窗
* 设置弹框信息是否居中
* 设置是否显示取消按钮
* 设置是否需要禁止鼠标滚动
* 执行确定后的回调

##三、Alerts具体参数如下：
 * wdith：弹窗宽度, number，默认为：500px
 * height: 弹窗高度, number，默认为：auto
 * bgColor: 弹窗背景色, string，默认为：#fff
 * title: 弹窗标题文本, string，默认为：提示
 * message: 弹窗内容文本, string，默认为：Hello World
 * titleClass: 添加弹窗标题样式类, string，默认为：string
 * contentClass: 添加弹窗内容样式类, string，默认为：string
 * confirmText: 设置确定按钮文本, string，默认为：确认
 * cancelText: 设置取消按钮文本, string，默认为：取消
 * show: 是否显示弹窗, boolean，默认为：true
 * center: 提示消息是否居中, boolean，默认为：false
 * hideCancelBtn: 设置是否显示取消按钮, boolean，默认为：false
 * scrollEvent: 弹窗时是否禁止鼠标滚动事件, boolean，默认为：false
 * confirmEvent: 点击确定按钮时执行的回调函数, function，默认为：空函数

##四、Alerts怎么使用？
* 首先在HTML头部引入CSS、image及js文件。
* 然后在HTML中建立一个容器用于存放弹窗信息并设置ID（建议）。
* 在js中调用Alerts,假设容器ID为pop,实例代码如下：

```javascript
$('#pop').Alerts({
    title: '您好！',
      center: true,
      message: '欢迎您使用该弹窗组件，enjoy your journey！',
      // 是否禁用鼠标滚动事件
      scrollEvent: true,
      confirmEvent: function() {
            console.log('It is just a test!');

            // 返回状态以决定是否进行二次弹窗
            return true;
      }
})
```

## 五、说明：
本组件未考虑IE9以下的版本兼容性，这与原项目稍有不同，大家可根据自己需要进行修改，扩展，无论是名称还是内容，希望对大家有所帮助。
