
# Android 开源项目

## 滴滴 DoKit

### [Gradle 依赖](https://xingyun.xiaojukeji.com/docs/dokit/#/androidGuide?id=_1-gradle-依赖)

```groovy
//核心模块

debugImplementation "io.github.didi.dokit:dokitx:${lastversion}"

//文件同步模块

debugImplementation "io.github.didi.dokit:dokitx-ft:${lastversion}"

//一机多控模块

debugImplementation "io.github.didi.dokit:dokitx-mc:${lastversion}"

//weex模块

debugImplementation "io.github.didi.dokit:dokitx-weex:${lastversion}"

//no-op 模块

releaseImplementation "io.github.didi.dokit:dokitx-no-op:${lastversion}"

```

### 初始化

```java
@Override
public void onCreate() {

   DoKit.Builder(this)
            .productId("需要使用平台功能的话，需要到dokit.cn平台申请id")
            .build()

} 
```

### [流量监控以及其他AOP功能（可选）](https://xingyun.xiaojukeji.com/docs/dokit/#/androidGuide?id=_3-流量监控以及其他aop功能（可选）)

AOP包括以下几个功能: 1)百度、腾讯、高德地图的经纬度模拟 2)UrlConnection、Okhttp 抓包以及后续的接口hook功能 3)App 启动耗时统计 4)慢函数 5)大图

在项目的 `build.gradle` 中添加 classpath。

```groovy
buildscript {
    dependencies {
        …
        classpath 'io.github.didi.dokit:dokitx-plugin:${lastversion}'
        …
    }
}
```

在 app 的 `build.gradle` 中添加 plugin。

```groovy
apply plugin: 'com.didi.dokit'
```

**插件配置选项:** 添加到app module 的build.gradle文件下 与android {}处于同一级

```groovy
dokitExt {
    //通用设置
    comm {
        //地图经纬度开关
        gpsSwitch true
        //网络开关
        networkSwitch true
        //大图开关
        bigImgSwitch true
        //webView js 抓包
        webViewSwitch true
    }

    slowMethod {
        //调用栈模式配置 对应gradle.properties中DOKIT_METHOD_STRATEGY=0
        stackMethod {
            //默认值为 5ms 小于该值的函数在调用栈中不显示
            thresholdTime 10
            //调用栈函数入口 千万不要用我默认的配置 如果有特殊需求修改成项目中自己的入口 假如不需要可以去掉该字段
            enterMethods = ["com.example.myjetpack.base.App"]
//            //黑名单 粒度最小到类 暂不支持到方法  千万不要用我默认的配置 如果有特殊需求修改成项目中自己的入口 假如不需要可				以去掉该字段
//            methodBlacklist = ["com.facebook.drawee.backends.pipeline.Fresco"]
        }
        //普通模式配置 对应gradle.properties中DOKIT_METHOD_STRATEGY=1
        normalMethod {
            //默认值为 500ms 小于该值的函数在运行时不会在控制台中被打印
            thresholdTime 500
            //需要针对函数插装的包名 千万不要用我默认的配置 如果有特殊需求修改成项目中自己的项目包名 假如不需要可以去掉该字				段
            packageNames = ["com.example.myjetpack"]
            //不需要针对函数插装的包名&类名 千万不要用我默认的配置 如果有特殊需求修改成项目中自己的项目包名 假如不需要可以去				掉该字段
//            methodBlacklist = ["com.didichuxing.doraemondemo.dokit"]
        }
    }
}

```

其中**strategy**和**methodSwitch**配置项已经弃用。新的配置开关位于项目根目录下的**gradle.properties**中。

具体的配置如下所示：

```groovy
// dokit全局配置
// 插件开关
DOKIT_PLUGIN_SWITCH=true
// DOKIT读取三方库会和booster冲突 如果你的项目中也集成了booster 建议将开关改成false
DOKIT_THIRD_LIB_SWITCH=true
// 插件日志
DOKIT_LOG_SWITCH=true
// 自定义Webview的全限定名 主要是作用于h5 js抓包和数据mock
DOKIT_WEBVIEW_CLASS_NAME=com/didichuxing/doraemonkit/widget/webview/MyWebView
// dokit 慢函数开关
DOKIT_METHOD_SWITCH=true
// dokit 函数调用栈层级
DOKIT_METHOD_STACK_LEVEL=4
// 0:默认模式 打印函数调用栈 需添加指定入口  默认为application onCreate 和attachBaseContext
// 1:普通模式 运行时打印某个函数的耗时 全局业务代码函数插入
DOKIT_METHOD_STRATEGY=0
```































