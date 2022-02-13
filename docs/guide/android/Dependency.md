# Android 常用依赖

## Gradle的依赖引入方式

Gradle 新老版本关键字

| 4.x+版本配置              | 已弃用配置         |
| ------------------------- | ------------------ |
| api                       | compile            |
| implementation            | compile            |
| compileOnly               | provided           |
| runtimeOnly               | apk                |
| testImplementation        | testCompile        |
| androidTestImplementation | androidTestCompile |
| debugImplementation       | debugCompile       |
| releaseImplementation     | releaseCompile     |

- **api**

> 与compile对应，功能完全一样，会添加依赖到编译路径，并且会将依赖打包到输出（aar或apk），与implementation不同，这个依赖可以传递，其他module无论在编译时和运行时都可以访问这个依赖的实现，也就是会泄漏一些不应该不使用的实现。举个例子，A依赖B，B依赖C，如果都是使用api配置的话，A可以直接使用C中的类（编译时和运行时），而如果是使用implementation配置的话，在编译时，A是无法访问C中的类的。

- **implementation**

> 与compile对应，会添加依赖到编译路径，并且会将依赖打包到输出（aar或apk），但是**在编译时不会将依赖的实现暴露给其他module**，也就是只有在运行时其他module才能访问这个依赖中的实现;

> 简单的说，就是使用implementation指令的依赖不会传递;

> 使用这个配置，可以显著提升构建时间，因为它可以减少重新编译的module的数量。Google建议尽量使用这个依赖配置;

- **compileOnly**

> 与provided对应，Gradle把依赖加到编译路径，编译时使用，不会打包到输出（aar或apk）。这可以减少输出的体积，在只在编译时需要，在运行时可选的情况，很有用

- **apk**

> 只在生成apk的时候参与打包，编译时不会参与，很少用。

- **testImplementation**

> 只在单元测试代码的编译以及最终打包测试apk时有效。

- **androidTestImplementation**

> 只在Android相关单元测试代码的编译以及最终打包测试apk时有效。

- **debugImplementation**

> 只在 debug 模式的编译和最终的 debug apk 打包时有效

- **releaseImplementation**

> 仅仅针对 Release 模式的编译和最终的 Release apk 打包。



排除引用

有时候为了解决引入的冲突，需要在引入远端包的同时排除这些包的某几个依赖

```
dependencies {
    implementation ('com.github.bumptech.glide:glide:4.9.0'){
        exclude group:'com.android.support', module: 'support-fragment'
        exclude group:'com.android.support', module: 'support-core-ui'
        exclude group:'com.android.support', module: 'support-compat'
        exclude group:'com.android.support', module: 'support-annotations'
    }
}
```



## 网络

### OkHttp

```groovy
implementation("com.squareup.okhttp3:okhttp:4.9.3")
```

### Retrofit  

```groovy
def retrofit_version = "2.9.0"
    implementation "com.squareup.retrofit2:retrofit:$retrofit_version"
    implementation("com.squareup.retrofit2:converter-gson:$retrofit_version")
```

