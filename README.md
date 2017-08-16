# 微信小程序demo

微信小程序主要有两个方法，App, Page
App是小程序的入口，Page是每个页面的入口
在Page中主要有两个属性data和setData,通过修改data的值来重绘页面的视图

页面初始化Page(options)
Page一旦初始化完成，再修改options也是无效的

小程序需要解决的问题
埋点
模块化
状态管理
异步流程库
...

如何对小程序进行扩展，来满足业务代码和工具代码分离呢

这就需要在Page初始化之前，对options做一些附加选项

混合模式

如：埋点
如果对每一个页面埋点，就需要在每个页面绑定一个方法onViewTap
如果在全局的options绑定一个onViewTap，每个页面的options再继承这个全局的options，
就可以解决这个问题。
// 全局绑定一个onViewTap
Axe.mixin({
  onViewTap () {
    console.log('onViewTap')
  }
})

如：模块化
一个页面有多个模块拼接而成，每个模块(wxml)有自己的样式(wxss)和逻辑(js)，模块在页面是否可见，顺序都是可配置的
模块的逻辑可以通过局部混合注入到页面中
// a, b, c都是模块的js
WPage({
  mixins: [a,b,c]
})

> css: BEM

简单规则定义：B-B__E-E_M-M

> js: Axe

js引入Axe框架，只是简单的代理小程序的App和Page函数，引入Event事件和Mixins，
完全不影响小程序自身的框架

WApp --> App

WPage --> Page

> 用法
* WApp(options)
* WPage(options)

> 静态方法
* Axe.mixin 全局混合

> 实例api
* on 绑定一个事件
* once 绑定一个一次事件
* off 卸载一个事件
* pause 暂停某个事件
* resume 恢复某个事件
* emit 触发事件
* data 属性代理小程序实例的
* setData 属性代理小程序实例的
* route 属性代理小程序实例的
* onInit 新增的生命周期钩子函数，在小程序实例初始化之前调用
* $bus 所有组件共享的事件对象
* $cxt 每个函数执行的上下文是Axe对象，可以通过$cxt获取小程序自己的执行的上下文

> mixins

混合的策略：
和生命周期有关的的会concat;
对于data如果属性存在且该属性的值是对象，递归继续遍历;
其他键名冲突时替换

全局混合Axe.mixin
主要混入一些全局变量和函数，如store

局部mixins
WPage({
  mixins:[{}]
})
主要是解决模块化

> redux

* $store：每个页面添加$store属性
* mapState：每个页面添加mapState函数选项，用于将redux的属性绑定到当前页面的state上
* state：每个页面添加state属性
* onStateChange：state每次改变会调用，将最新的state返回，每次打开页面都会先调用一次

> rxjs

* 引入rxjs的过程，下载rxjs源码，安装依赖，运行npm run global

> 模块化

```
一个页面有多个模块拼接而成，每个模块(wxml)有自己的样式(wxss)和逻辑(js)，模块在页面是否可见，顺序都是可配置的。
可以使用小程序的模板来实现组件化，但小程序模板只是wxml文件（视图层），没有独立的样式和js逻辑。
通过axe框架可以方便扩展小程序模块，为每一个模块引入独立的样式和逻辑，需要注意一些问题：
  1：页面需要先引入所有需要的模板
  2：页面的wxss需要引入所有需要的模板的wxss，命名可以通过命名空间来避免冲突
  3：页面的js需要引入所有需要的模板的js，通过minixs引入模板的js，需要注意模板的js的函数名冲突
  4：模块和模块之间的通信通过自定义事件（on, emit）来完成
  5：页面和页面之间的通信通过bus事件来完成
  6：通过redux实现模块或页面的数据的共享
  
 总之就是想让每个模块之间耦合度降低，模块之间独立，方便安装卸载，关注模块自身的复杂逻辑

```

> 模块的数据存储

小程序模块在redux数据中的获取和存储方式，对一个页面多次使用一个模块，数据不同；多个页面使用同一个模块，数据一样 

> 测试

使用jest测试框架，但只能测试纯粹的js业务逻辑，对于小程序的内置的api只能模拟，效果不太好
