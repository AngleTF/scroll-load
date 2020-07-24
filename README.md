# 加载插件
```html
<script src="js/scroll-load.js"></script>
```

# 使用
```js
let s = new scrollLoad({
	scrollArea: '.drop',
	loadOffset: 10,
	initPage: 1,
	autoLoad: true,
	loadFun: function (nextPage, scroll) {
		ajax({
		       	url:'www.baidu.com',
              		type:'get',
                	dataType:'json',
                	success: function(data) {
		              if(data.length == 10){
		                  scroll.ready();
		              }
                	},
                	error: function() {
		           
                	}
		})
	}
});
	
```

# 参数解释
|参数名|类型|例子|解释|
|---|---|---|---|
|scrollArea|object,string |.drop|加载的事件对象,默认为window|
|loadOffset|int|10|距离底部多少时开始加载,默认为30|
|initPage|int|1|开始的page页,默认为1|
|autoLoad|boole|true|首次是否加载一次|
|loadFun|function| |加载的函数, 其中传递了两个参数, 第一个为当前的page, 第二个为scroll-load自己|

# 注意事项
initPage参数会在loadFun调用完后自动加1, 所以不需要手动去维护

scrollLoad会对每次loadFun调用前进行锁定, 以免出现加载完所有数据后继续加载的情况, 在loadFun中需调用scroll.ready();

如需卸载事件请调用 实例.removeScrollEvent()
