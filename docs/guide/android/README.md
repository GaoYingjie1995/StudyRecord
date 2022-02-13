# JetPack

## 向项目中添加组件

架构组件可从 Google 的 Maven 代码库中获得。为了使用这些组件，您必须将代码库添加到项目中。

打开**项目**的 `build.gradle` 文件（而不是应用或模块的该文件）并添加 `google()` 代码库，如下所示：

```groovy
allprojects {
    repositories {
        google()
        jcenter()
    }
}
```



### 声明依赖项

- [Futures（可在 androidx.concurrent 中找到）](https://developer.android.google.cn/jetpack/androidx/releases/concurrent)

  ```groovy
  dependencies {
      implementation "androidx.concurrent:concurrent-futures:1.1.0"
  
      // Kotlin
      implementation "androidx.concurrent:concurrent-futures-ktx:1.1.0"
  }
  ```

- [生命周期组件（包括 ViewModel）](https://developer.android.google.cn/jetpack/androidx/releases/lifecycle)

  ### kotlin

  ```groovy
      dependencies {
          def lifecycle_version = "2.4.0"
          def arch_version = "2.1.0"
  
          // ViewModel
          implementation "androidx.lifecycle:lifecycle-viewmodel-ktx:$lifecycle_version"
          // ViewModel utilities for Compose
          implementation "androidx.lifecycle:lifecycle-viewmodel-compose:$lifecycle_version"
          // LiveData
          implementation "androidx.lifecycle:lifecycle-livedata-ktx:$lifecycle_version"
          // Lifecycles only (without ViewModel or LiveData)
          implementation "androidx.lifecycle:lifecycle-runtime-ktx:$lifecycle_version"
  
          // Saved state module for ViewModel
          implementation "androidx.lifecycle:lifecycle-viewmodel-savedstate:$lifecycle_version"
  
          // Annotation processor
          kapt "androidx.lifecycle:lifecycle-compiler:$lifecycle_version"
          // alternately - if using Java8, use the following instead of lifecycle-compiler
          implementation "androidx.lifecycle:lifecycle-common-java8:$lifecycle_version"
  
          // optional - helpers for implementing LifecycleOwner in a Service
          implementation "androidx.lifecycle:lifecycle-service:$lifecycle_version"
  
          // optional - ProcessLifecycleOwner provides a lifecycle for the whole application process
          implementation "androidx.lifecycle:lifecycle-process:$lifecycle_version"
  
          // optional - ReactiveStreams support for LiveData
          implementation "androidx.lifecycle:lifecycle-reactivestreams-ktx:$lifecycle_version"
  
          // optional - Test helpers for LiveData
          testImplementation "androidx.arch.core:core-testing:$arch_version"
      }
      
  ```

  ###  java

  ```groovy
      dependencies {
          def lifecycle_version = "2.4.0"
          def arch_version = "2.1.0"
  
          // ViewModel
          implementation "androidx.lifecycle:lifecycle-viewmodel:$lifecycle_version"
          // LiveData
          implementation "androidx.lifecycle:lifecycle-livedata:$lifecycle_version"
          // Lifecycles only (without ViewModel or LiveData)
          implementation "androidx.lifecycle:lifecycle-runtime:$lifecycle_version"
  
          // Saved state module for ViewModel
          implementation "androidx.lifecycle:lifecycle-viewmodel-savedstate:$lifecycle_version"
  
          // Annotation processor
          annotationProcessor "androidx.lifecycle:lifecycle-compiler:$lifecycle_version"
          // alternately - if using Java8, use the following instead of lifecycle-compiler
          implementation "androidx.lifecycle:lifecycle-common-java8:$lifecycle_version"
  
          // optional - helpers for implementing LifecycleOwner in a Service
          implementation "androidx.lifecycle:lifecycle-service:$lifecycle_version"
  
          // optional - ProcessLifecycleOwner provides a lifecycle for the whole application process
          implementation "androidx.lifecycle:lifecycle-process:$lifecycle_version"
  
          // optional - ReactiveStreams support for LiveData
          implementation "androidx.lifecycle:lifecycle-reactivestreams:$lifecycle_version"
  
          // optional - Test helpers for LiveData
          testImplementation "androidx.arch.core:core-testing:$arch_version"
      }
      
  ```

- [导航（包括 SafeArgs）](https://developer.android.google.cn/jetpack/androidx/releases/navigation)

  在应用或模块的 `build.gradle` 文件中添加所需工件的依赖项：

  ```groovy
  dependencies {
    def nav_version = "2.3.5"
  
    // Java language implementation
    implementation "androidx.navigation:navigation-fragment:$nav_version"
    implementation "androidx.navigation:navigation-ui:$nav_version"
  
    // Kotlin
    implementation "androidx.navigation:navigation-fragment-ktx:$nav_version"
    implementation "androidx.navigation:navigation-ui-ktx:$nav_version"
  
    // Feature module Support
    implementation "androidx.navigation:navigation-dynamic-features-fragment:$nav_version"
  
    // Testing Navigation
    androidTestImplementation "androidx.navigation:navigation-testing:$nav_version"
  
    // Jetpack Compose Integration
    implementation "androidx.navigation:navigation-compose:2.4.0-rc01"
  }
  ```

  ### Safe Args

  如需将 [Safe Args](https://developer.android.google.cn/topic/libraries/architecture/navigation/navigation-pass-data#Safe-args) 添加到您的项目，请在顶层 `build.gradle` 文件中包含以下 `classpath`：

  [Groovy](https://developer.android.google.cn/jetpack/androidx/releases/navigation#groovy)[Kotlin](https://developer.android.google.cn/jetpack/androidx/releases/navigation#kotlin)

  ```groovy
  buildscript {
      repositories {
          google()
      }
      dependencies {
          def nav_version = "2.3.5"
          classpath "androidx.navigation:navigation-safe-args-gradle-plugin:$nav_version"
      }
  }
  ```

  您还必须应用以下两个可用插件之一。

  如需生成适用于 Java 模块或 Java 和 Kotlin 混合模块的 Java 语言代码，请将以下行添加到**应用或模块**的 `build.gradle` 文件中：

  ```groovy
  plugins {
    id 'androidx.navigation.safeargs'
  }
  ```

  此外，如需生成适用于仅 Kotlin 模块的 Kotlin 语言代码，请添加以下行：

  ```groovy
  plugins {
    id 'androidx.navigation.safeargs.kotlin'
  }
  ```

- [Paging](https://developer.android.google.cn/jetpack/androidx/releases/paging)

  ```groovy
  dependencies {
    def paging_version = "3.1.0"
  
    implementation "androidx.paging:paging-runtime:$paging_version"
  
    // alternatively - without Android dependencies for tests
    testImplementation "androidx.paging:paging-common:$paging_version"
  
    // optional - RxJava2 support
    implementation "androidx.paging:paging-rxjava2:$paging_version"
  
    // optional - RxJava3 support
    implementation "androidx.paging:paging-rxjava3:$paging_version"
  
    // optional - Guava ListenableFuture support
    implementation "androidx.paging:paging-guava:$paging_version"
  
    // optional - Jetpack Compose integration
    implementation "androidx.paging:paging-compose:1.0.0-alpha14"
  }
  ```

- [Room](https://developer.android.google.cn/jetpack/androidx/releases/room)

  Room 的依赖项包括[测试 Room 迁移](https://developer.android.google.cn/training/data-storage/room#db-migration-testing)和 [Room RxJava](https://developer.android.google.cn/training/data-storage/room/accessing-data#query-rxjava)。

  在应用或模块的 `build.gradle` 文件中添加所需工件的依赖项：

  ```groovy
  dependencies {
      def room_version = "2.4.0"
  
      implementation "androidx.room:room-runtime:$room_version"
      annotationProcessor "androidx.room:room-compiler:$room_version"
  
      // optional - RxJava2 support for Room
      implementation "androidx.room:room-rxjava2:$room_version"
  
      // optional - RxJava3 support for Room
      implementation "androidx.room:room-rxjava3:$room_version"
  
      // optional - Guava support for Room, including Optional and ListenableFuture
      implementation "androidx.room:room-guava:$room_version"
  
      // optional - Test helpers
      testImplementation "androidx.room:room-testing:$room_version"
  
      // optional - Paging 3 Integration
      implementation "androidx.room:room-paging:2.4.0"
  }
  ```

  如需了解如何使用 Kotlin 扩展，请参阅 [ktx 文档](https://developer.android.google.cn/kotlin/ktx)。

  如需详细了解依赖项，请参阅[添加构建依赖项](https://developer.android.google.cn/studio/build/dependencies)。

  ## 配置编译器选项

  Room 具有以下注解处理器选项：

  - `room.schemaLocation`：配置并启用将数据库架构导出到给定目录中的 JSON 文件的功能。如需了解详情，请参阅 [Room 迁移](https://developer.android.google.cn/training/data-storage/room/migrating-db-versions#export-schema)。
  - `room.incremental`：启用 Gradle 增量注解处理器。
  - `room.expandProjection`：配置 Room 以重写查询，使其顶部星形投影在展开后仅包含 DAO 方法返回类型中定义的列。

  以下代码段举例说明了如何配置这些选项：

  ```groovy
  android {
      ...
      defaultConfig {
          ...
          javaCompileOptions {
              annotationProcessorOptions {
                  arguments += [
                      "room.schemaLocation":"$projectDir/schemas".toString(),
                      "room.incremental":"true",
                      "room.expandProjection":"true"]
              }
          }
      }
  }
  ```

- [WorkManager](https://developer.android.google.cn/jetpack/androidx/releases/work)

```groovy
dependencies {
    def work_version = "2.7.1"

    // (Java only)
    implementation "androidx.work:work-runtime:$work_version"

    // Kotlin + coroutines
    implementation "androidx.work:work-runtime-ktx:$work_version"

    // optional - RxJava2 support
    implementation "androidx.work:work-rxjava2:$work_version"

    // optional - GCMNetworkManager support
    implementation "androidx.work:work-gcm:$work_version"

    // optional - Test helpers
    androidTestImplementation "androidx.work:work-testing:$work_version"

    // optional - Multiprocess support
    implementation "androidx.work:work-multiprocess:$work_version"
}
```

## ViewBinding

### ViewBinding 设置

视图绑定功能可按模块启用。要在某个模块中启用视图绑定，请将 `viewBinding` 元素添加到其 `build.gradle` 文件中，如下例所示：

```groovy
android {
        ...
        viewBinding {
            enabled = true
        }
    }
    
```

生成绑定类的名称：将 XML 文件的名称转换为驼峰式大小写，并在末尾添加“Binding”一词  

在生成绑定类时忽略某个布局文件，请将 `tools:viewBindingIgnore="true"` 属性添加到相应布局文件的根视图中：

```xml
<LinearLayout
            
            tools:viewBindingIgnore="true" >
        
    </LinearLayout>
```

### Activity中用法

如需设置绑定类的实例以供 Activity 使用，请在 Activity 的 [`onCreate()`](https://developer.android.google.cn/reference/kotlin/android/app/Activity#oncreate) 方法中执行以下步骤：

1. 调用生成的绑定类中包含的静态 `inflate()` 方法。此操作会创建该绑定类的实例以供 Activity 使用。
2. 通过调用 `getRoot()` 方法获取对根视图的引用。
3. 将根视图传递到 [`setContentView()`](https://developer.android.google.cn/reference/kotlin/android/app/Activity#setcontentview_1)，使其成为屏幕上的活动视图。

```kotlin
private lateinit var binding: ResultProfileBinding

    override fun onCreate(savedInstanceState: Bundle) {
        super.onCreate(savedInstanceState)
        binding = ResultProfileBinding.inflate(layoutInflater)
        val view = binding.root
        setContentView(view)
    }
```

#### Activity基类封装

```kotlin
abstract class BaseVBindingActivity<VB : ViewBinding?> : AppCompatActivity() {

    protected val mVBinding :VB by lazy { getViewBinding() }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(mVBinding!!.root)
    }

    protected abstract fun getViewBinding(): VB
}
```

### Fragment中用法

如需设置绑定类的实例以供 Fragment 使用，请在 Fragment 的 [`onCreateView()`](https://developer.android.google.cn/reference/kotlin/androidx/fragment/app/Fragment#oncreateview) 方法中执行以下步骤：

1. 调用生成的绑定类中包含的静态 `inflate()` 方法。此操作会创建该绑定类的实例以供 Fragment 使用。
2. 通过调用 `getRoot()` 方法对根视图的引用。
3. 从 `onCreateView()` 方法返回根视图，使其成为屏幕上的活动视图。
3. Fragment的 bingding 需要在视图生命周期销毁时置 null ，Activity不需要。因为 activity 的生命周期和 viewBinding 是同步的。

```kotlin
 private var _binding: ResultProfileBinding? = null
    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = ResultProfileBinding.inflate(inflater, container, false)
        val view = binding.root
        return view
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
```

#### Fragment基类封装

```kotlin
abstract class BaseVBindingFragment<VB : ViewBinding> : Fragment() {
    private var _binding :VB? = null;
    protected val vBinding :VB get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = getViewBinding(inflater, container);
        return vBinding.root
    }

    protected abstract fun getViewBinding(inflater: LayoutInflater, container: ViewGroup?): VB

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

}
```



## LiveData概览

LiveData 是一种可观察的数据存储类，具有感知activity fragment更新和service生命周期的能力，能确保只更新处于活跃生命周期状态的应用组件观察者。只有当Obserer类的生命周期处于STARTED或RESUMED状态，LiveData会更新通知。



### 创建LiveData

LiveData 是一种可用于任何数据的封装容器，其中包括可实现 `Collections` 的对象，如 `List`。[`LiveData`](https://developer.android.google.cn/reference/androidx/lifecycle/LiveData) 对象通常存储在 [`ViewModel`](https://developer.android.google.cn/reference/androidx/lifecycle/ViewModel) 对象中，并可通过 getter 方法进行访问，如以下示例中所示：

```kotlin
class NameViewModel : ViewModel() {

    // Create a LiveData with a String
    val currentName: MutableLiveData<String> by lazy {
        MutableLiveData<String>()
    }

    // Rest of the ViewModel...
}
```



### 观察LiveData

```kotlin
class NameActivity : AppCompatActivity() {

    // Use the 'by viewModels()' Kotlin property delegate
    // from the activity-ktx artifact
    private val model: NameViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Other code to setup the activity...

        // Create the observer which updates the UI.
        val nameObserver = Observer<String> { newName ->
            // Update the UI, in this case, a TextView.
            nameTextView.text = newName
        }

        // Observe the LiveData, passing in this activity as the LifecycleOwner and the observer.
        model.currentName.observe(this, nameObserver)
    }
}
```

### 转换LiveData

您可能希望在将 [`LiveData`](https://developer.android.google.cn/reference/androidx/lifecycle/LiveData) 对象分派给观察者之前对存储在其中的值进行更改，或者您可能需要根据另一个实例的值返回不同的 `LiveData` 实例。[`Lifecycle`](https://developer.android.google.cn/reference/android/arch/lifecycle/package-summary) 软件包会提供 [`Transformations`](https://developer.android.google.cn/reference/androidx/lifecycle/Transformations) 类，该类包括可应对这些情况的辅助程序方法。

- [`Transformations.map()`](https://developer.android.google.cn/reference/androidx/lifecycle/Transformations#map(android.arch.lifecycle.LiveData, android.arch.core.util.Function))

  对存储在 `LiveData` 对象中的值应用函数，并将结果传播到下游。

```kotlin
val userLiveData: LiveData<User> = UserLiveData()
val userName: LiveData<String> = Transformations.map(userLiveData) {
    user -> "${user.name} ${user.lastName}"
}
```

[`Transformations.switchMap()`](https://developer.android.google.cn/reference/androidx/lifecycle/Transformations#switchMap(android.arch.lifecycle.LiveData, android.arch.core.util.Function>))

与 `map()` 类似，对存储在 `LiveData` 对象中的值应用函数，并将结果解封和分派到下游。传递给 `switchMap()` 的函数必须返回 `LiveData` 对象，如以下示例中所示：

```kotlin
private fun getUser(id: String): LiveData<User> {
  ...
}
val userId: LiveData<String> = ...
val user = Transformations.switchMap(userId) { id -> getUser(id) }
```

您可以使用转换方法在观察者的生命周期内传送信息。除非观察者正在观察返回的 `LiveData` 对象，否则不会计算转换。因为转换是以延迟的方式计算，所以与生命周期相关的行为会隐式传递下去，而不需要额外的显式调用或依赖项。

如果您认为 [`ViewModel`](https://developer.android.google.cn/reference/androidx/lifecycle/ViewModel) 对象中需要有 `Lifecycle` 对象，那么进行转换或许是更好的解决方案。例如，假设您有一个界面组件，该组件接受地址并返回该地址的邮政编码。您可以为此组件实现简单的 `ViewModel`，如以下示例代码所示：

```kotlin
class MyViewModel(private val repository: PostalCodeRepository) : ViewModel() {

    private fun getPostalCode(address: String): LiveData<String> {
        // DON'T DO THIS
        return repository.getPostCode(address)
    }
}
```

然后，该界面组件需要取消注册先前的 `LiveData` 对象，并在每次调用 `getPostalCode()` 时注册到新的实例。此外，如果重新创建了该界面组件，它会再触发一次对 `repository.getPostCode()` 方法的调用，而不是使用先前调用所得的结果。

您也可以将邮政编码查询实现为地址输入的转换，如以下示例中所示：

```kotlin
class MyViewModel(private val repository: PostalCodeRepository) : ViewModel() {
    private val addressInput = MutableLiveData<String>()
    val postalCode: LiveData<String> = Transformations.switchMap(addressInput) {
            address -> repository.getPostCode(address) }

    private fun setInput(address: String) {
        addressInput.value = address
    }
}
```

在这种情况下，`postalCode` 字段定义为 `addressInput` 的转换。只要您的应用具有与 `postalCode` 字段关联的活跃观察者，就会在 `addressInput` 发生更改时重新计算并检索该字段的值。

此机制允许较低级别的应用创建以延迟的方式按需计算的 `LiveData` 对象。`ViewModel` 对象可以轻松获取对 `LiveData` 对象的引用，然后在其基础之上定义转换规则。

### 合并多个 LiveData 源

[`MediatorLiveData`](https://developer.android.google.cn/reference/androidx/lifecycle/MediatorLiveData) 是 [`LiveData`](https://developer.android.google.cn/reference/androidx/lifecycle/LiveData) 的子类，允许您合并多个 LiveData 源。只要任何原始的 LiveData 源对象发生更改，就会触发 `MediatorLiveData` 对象的观察者。

例如，如果界面中有可以从本地数据库或网络更新的 `LiveData` 对象，则可以向 `MediatorLiveData` 对象添加以下源：

- 与存储在数据库中的数据关联的 `LiveData` 对象。
- 与从网络访问的数据关联的 `LiveData` 对象。

```kotlin
class LiveDataVM : ViewModel() {
    val data1 : MutableLiveData<UserInfo> = MutableLiveData();
    val data2 : MutableLiveData<UserInfo> = MutableLiveData();
    val mediatorMerger = MediatorLiveData<UserInfo>()
}

class MainActivity : AppCompatActivity() {
//    private val livaDataVm  by lazy { ViewModelProvider(this).get(LiveDataVM::class.java) }
    private val liveDataVm  by viewModels<LiveDataVM>()
    private val mainBinding by lazy {
        ActivityMainBinding.inflate(layoutInflater);
    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(mainBinding.root)
        
        liveDataVm.mediatorMerger.addSource(liveDataVm.data1, Observer {
            liveDataVm.mediatorMerger.value = it;
        })
        liveDataVm.mediatorMerger.addSource(liveDataVm.data2, Observer {
            liveDataVm.mediatorMerger.value = it;
        })
        liveDataVm.mediatorMerger.observe(this, Observer {
            mainBinding.textView2.text = it.name
        })
        mainBinding.btMerge1.setOnClickListener {
            liveDataVm.data1.value = UserInfo("leo",18)
        }
        mainBinding.btMerge2.setOnClickListener {
            liveDataVm.data2.value = UserInfo("tony",20)
        }

    }
}


```



## ViewModel

### ViewModel 生命周期

[`ViewModel`](https://developer.android.google.cn/reference/androidx/lifecycle/ViewModel) 对象存在的时间范围是获取 [`ViewModel`](https://developer.android.google.cn/reference/androidx/lifecycle/ViewModel) 时传递给 [`ViewModelProvider`](https://developer.android.google.cn/reference/androidx/lifecycle/ViewModelProvider) 的 [`Lifecycle`](https://developer.android.google.cn/reference/androidx/lifecycle/Lifecycle)。[`ViewModel`](https://developer.android.google.cn/reference/androidx/lifecycle/ViewModel) 将一直留在内存中，直到限定其存在时间范围的 [`Lifecycle`](https://developer.android.google.cn/reference/androidx/lifecycle/Lifecycle) 永久消失：对于 activity，是在 activity 完成时；而对于 fragment，是在 fragment 分离时。

图 1 说明了 Activity 经历屏幕旋转而后结束时所处的各种生命周期状态。该图还在关联的 Activity 生命周期的旁边显示了 [`ViewModel`](https://developer.android.google.cn/reference/androidx/lifecycle/ViewModel) 的生命周期。此图表说明了 Activity 的各种状态。这些基本状态同样适用于 Fragment 的生命周期。

您通常在系统首次调用 Activity 对象的 `onCreate()` 方法时请求 [`ViewModel`](https://developer.android.google.cn/reference/androidx/lifecycle/ViewModel)。系统可能会在 activity 的整个生命周期内多次调用 `onCreate()`，如在旋转设备屏幕时。[`ViewModel`](https://developer.android.google.cn/reference/androidx/lifecycle/ViewModel) 存在的时间范围是从您首次请求 [`ViewModel`](https://developer.android.google.cn/reference/androidx/lifecycle/ViewModel) 直到 activity 完成并销毁。

![ViewModel生命周期](https://developer.android.google.cn/images/topic/libraries/architecture/viewmodel-lifecycle.png)

### ViewModel 实例对象的获取方式

```kotlin
val myViewModel1 by viewModels<MyViewModel>() //activity-ktx 扩展库提供
val myViewModel2  = ViewModelProvider(this).get(MyViewModel::class.java);//需要在activity onCreated之后调用
val myViewModel3  by ViewModelLazy(MyViewModel::class,{viewModelStore},{defaultViewModelProviderFactory})

//需要在activity onCreated之后调用
val myViewModel4  = ViewModelProvider(viewModelStore,defaultViewModelProviderFactory).get(MyViewModel::class.java);
```



## Lifecycle

[`Lifecycle`](https://developer.android.google.cn/reference/androidx/lifecycle/Lifecycle?hl=zh-cn) 是一个类，用于存储有关组件（如 Activity 或 Fragment）的生命周期状态的信息，并允许其他对象观察此状态。

[`Lifecycle`](https://developer.android.google.cn/reference/androidx/lifecycle/Lifecycle) 使用两种主要枚举跟踪其关联组件的生命周期状态：

- 事件

  从框架和 [`Lifecycle`](https://developer.android.google.cn/reference/androidx/lifecycle/Lifecycle) 类分派的生命周期事件。这些事件映射到 Activity 和 Fragment 中的回调事件。

- 状态

  由 [`Lifecycle`](https://developer.android.google.cn/reference/androidx/lifecycle/Lifecycle) 对象跟踪的组件的当前状态。

![生命周期状态示意图](https://developer.android.google.cn/images/topic/libraries/architecture/lifecycle-states.svg)

### DefaultLifecycleObserver

通过实现 [`DefaultLifecycleObserver`](https://developer.android.google.cn/reference/androidx/lifecycle/DefaultLifecycleObserver) 并替换相应的方法（如 `onCreate` 和 `onStart` 等）来监控组件的生命周期状态。然后，您可以通过调用 [`Lifecycle`](https://developer.android.google.cn/reference/androidx/lifecycle/Lifecycle) 类的 [`addObserver()`](https://developer.android.google.cn/reference/androidx/lifecycle/Lifecycle#addObserver(androidx.lifecycle.LifecycleObserver)) 方法并传递观察器的实例来添加观察器，如下例所示：

```kotlin
class MyObserver : DefaultLifecycleObserver {
    override fun onResume(owner: LifecycleOwner) {
        connect()
    }

    override fun onPause(owner: LifecycleOwner) {
        disconnect()
    }
}

myLifecycleOwner.getLifecycle().addObserver(MyObserver())
```

`myLifecycleOwner` 对象实现了 [`LifecycleOwner`](https://developer.android.google.cn/reference/androidx/lifecycle/LifecycleOwner) 接口，我们将在接下来的部分中对该接口进行说明。

### LifecycleOwner

[`LifecycleOwner`](https://developer.android.google.cn/reference/androidx/lifecycle/LifecycleOwner) 是单一方法接口，表示类具有 [`Lifecycle`](https://developer.android.google.cn/reference/androidx/lifecycle/Lifecycle)。它具有一种方法（即 [`getLifecycle()`](https://developer.android.google.cn/reference/androidx/lifecycle/LifecycleOwner#getLifecycle())），该方法必须由类实现。

此接口从各个类（如 `Fragment` 和 `AppCompatActivity`）抽象化 [`Lifecycle`](https://developer.android.google.cn/reference/androidx/lifecycle/Lifecycle) 的所有权，并允许编写与这些类搭配使用的组件。任何自定义应用类均可实现 [`LifecycleOwner`](https://developer.android.google.cn/reference/androidx/lifecycle/LifecycleOwner) 接口。

实现 [`DefaultLifecycleObserver`](https://developer.android.google.cn/reference/androidx/lifecycle/DefaultLifecycleObserver) 的组件可与实现 [`LifecycleOwner`](https://developer.android.google.cn/reference/androidx/lifecycle/LifecycleOwner) 的组件完美配合，因为所有者可以提供生命周期，而观察者可以注册以观察生命周期。

### 实现自定义 LifecycleOwner

支持库 26.1.0 及更高版本中的 Fragment 和 Activity 已实现 [`LifecycleOwner`](https://developer.android.google.cn/reference/androidx/lifecycle/LifecycleOwner) 接口。

如果您有一个自定义类并希望使其成为 [`LifecycleOwner`](https://developer.android.google.cn/reference/androidx/lifecycle/LifecycleOwner)，您可以使用 [LifecycleRegistry](https://developer.android.google.cn/reference/androidx/lifecycle/LifecycleRegistry) 类，但需要将事件转发到该类，如以下代码示例中所示：

```kotlin
class MyActivity : Activity(), LifecycleOwner {

    private lateinit var lifecycleRegistry: LifecycleRegistry

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        lifecycleRegistry = LifecycleRegistry(this)
        lifecycleRegistry.markState(Lifecycle.State.CREATED)
    }

    public override fun onStart() {
        super.onStart()
        lifecycleRegistry.markState(Lifecycle.State.STARTED)
    }

    override fun getLifecycle(): Lifecycle {
        return lifecycleRegistry
    }
}
```



## Navigation

```groovy
  def nav_version = "2.4.0"

  // Java language implementation
  implementation "androidx.navigation:navigation-fragment:$nav_version"
  implementation "androidx.navigation:navigation-ui:$nav_version"
  // Kotlin
  implementation "androidx.navigation:navigation-fragment-ktx:$nav_version"
  implementation "androidx.navigation:navigation-ui-ktx:$nav_version"

//如需将 Safe Args 添加到您的项目，请在顶层 build.gradle 文件中包含以下 classpath：
classpath "androidx.navigation:navigation-safe-args-gradle-plugin:$nav_version"
如需生成适用于 Java 模块或 Java 和 Kotlin 混合模块的 Java 语言代码，请将以下行添加到应用或模块的 build.gradle 文件中：
plugins {
  id 'androidx.navigation.safeargs'
}
此外，如需生成适用于仅 Kotlin 模块的 Kotlin 语言代码，请添加以下行
plugins {
  id 'androidx.navigation.safeargs.kotlin'
}
```

### 向 Activity 添加 NavHost

导航宿主必须派生于 [`NavHost`](https://developer.android.google.cn/reference/androidx/navigation/NavHost)。Navigation 组件的默认 `NavHost` 实现 ([`NavHostFragment`](https://developer.android.google.cn/reference/androidx/navigation/fragment/NavHostFragment)) 负责处理 fragment 目的地的交换。

### 通过 XML 添加 NavHostFragment

以下 XML 示例显示了作为应用主 Activity 一部分的 `NavHostFragment`：

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <androidx.appcompat.widget.Toolbar
        />

    <androidx.fragment.app.FragmentContainerView
        android:id="@+id/nav_host_fragment"
        android:name="androidx.navigation.fragment.NavHostFragment"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintBottom_toBottomOf="parent"
        app:defaultNavHost="true"
        app:navGraph="@navigation/nav_graph" />

    <com.google.android.material.bottomnavigation.BottomNavigationView
        />

</androidx.constraintlayout.widget.ConstraintLayout>
```

- `android:name` 属性包含 `NavHost` 实现的类名称。
- `app:navGraph` 属性将 `NavHostFragment` 与导航图相关联。导航图会在此 `NavHostFragment` 中指定用户可以导航到的所有目的地。
- `app:defaultNavHost="true"` 属性确保您的 `NavHostFragment` 会拦截系统返回按钮。请注意，只能有一个默认 `NavHost`。如果同一布局（例如，双窗格布局）中有多个宿主，请务必仅指定一个默认 `NavHost`。

### 导航到目的地

导航到目的地是使用 [`NavController`](https://developer.android.google.cn/reference/androidx/navigation/NavController) 完成的，它是一个在 `NavHost` 中管理应用导航的对象。每个 `NavHost` 均有自己的相应 `NavController`。您可以使用以下方法之一检索 `NavController`：

**Kotlin**：

- [`Fragment.findNavController()`](https://developer.android.google.cn/reference/kotlin/androidx/navigation/fragment/package-summary#(androidx.fragment.app.Fragment).findNavController())
- [`View.findNavController()`](https://developer.android.google.cn/reference/kotlin/androidx/navigation/package-summary#(android.view.View).findNavController())
- [`Activity.findNavController(viewId: Int)`](https://developer.android.google.cn/reference/kotlin/androidx/navigation/package-summary#(android.app.Activity).findNavController(kotlin.Int))

**Java**：

- [`NavHostFragment.findNavController(Fragment)`](https://developer.android.google.cn/reference/androidx/navigation/fragment/NavHostFragment#findNavController(android.support.v4.app.Fragment))
- [`Navigation.findNavController(Activity, @IdRes int viewId)`](https://developer.android.google.cn/reference/androidx/navigation/Navigation#findNavController(android.app.Activity, int))
- [`Navigation.findNavController(View)`](https://developer.android.google.cn/reference/androidx/navigation/Navigation#findNavController(android.view.View))

```kotlin
val navHostFragment =
        supportFragmentManager.findFragmentById(R.id.nav_host_fragment) as NavHostFragment
val navController = navHostFragment.navController
```

检索 `NavController` 之后，您可以调用 [`navigate()`](https://developer.android.google.cn/reference/androidx/navigation/NavController#navigate(androidx.navigation.NavDirections)) 的某个重载，以在各个目的地之间导航。每个重载均支持多种导航场景



### 目的地之间传递数据

#### 定义目的地参数

如需在目的地之间传递数据，首先请按照以下步骤将参数添加到接收它的目的地来定义参数：

1. 在 [Navigation Editor](https://developer.android.google.cn/topic/libraries/architecture/navigation/navigation-implementing) 中，点击接收参数的目的地。
2. 在 **Attributes** 面板中，点击 **Add** (**+**)。
3. 在显示的 **Add Argument Link** 窗口中，输入参数名称、参数类型、参数是否可为 null，以及默认值（如果需要）。
4. 点击 **Add**。请注意，该参数现在会显示在 **Attributes** 面板的 **Arguments** 列表中。
5. 接下来，点击会将您转到此目的地的相应操作。在 **Attributes** 面板中，您现在应该会在 **Argument Default Values** 部分中看到新添加的参数。
6. 您还可以看到该参数已添加到 XML 中。点击 **Text** 标签页以切换到 XML 视图，就会发现您的参数已添加到接收该参数的目的地。相关示例如下所示：

```xml
 <fragment android:id="@+id/myFragment" >
     <argument
         android:name="myArg"
         app:argType="integer"
         android:defaultValue="0" />
 </fragment>
```



#### 支持的参数类型

Navigation 库支持以下参数类型：

| 类型                | app:argType 语法                                               | 是否支持默认值？                                             | 是否由路由处理？ | 是否可为 null？ |
| :------------------ |:-------------------------------------------------------------| :----------------------------------------------------------- | :--------------- | :-------------- |
| 整数                | app:argType="integer"                                        | 是                                                           | 是               | 否              |
| 浮点数              | app:argType="float"                                          | 是                                                           | 是               | 否              |
| 长整数              | app:argType="long"                                           | 是 - 默认值必须始终以“L”后缀结尾（例如“123L”）。             | 是               | 否              |
| 布尔值              | app:argType="boolean"                                        | 是 -“true”或“false”                                          | 是               | 否              |
| 字符串              | app:argType="string"                                         | 是                                                           | 是               | 是              |
| 资源引用            | app:argType="reference"                                      | 是 - 默认值必须为“@resourceType/resourceName”格式（例如，“@style/myCustomStyle”）或“0” | 是               | 否              |
| 自定义 Parcelable   | app:argType="\<type\>"，其中 \<type\> 是 `Parcelable` 的完全限定类名称   | 支持默认值“@null”。不支持其他默认值。                        | 否               | 是              |
| 自定义 Serializable | app:argType="\<type\>"，其中 \<type\> 是 `Serializable` 的完全限定类名称 | 支持默认值“@null”。不支持其他默认值。                        | 否               | 是              |
| 自定义 Enum         | app:argType="\<type\>"，其中 \<type\> 是 Enum 的完全限定名称            | 是 - 默认值必须与非限定名称匹配（例如，“SUCCESS”匹配 MyEnum.SUCCESS）。 | 否               | 否              |

**注意**：仅在引用类型中支持对资源的引用。在其他任何类型中使用资源引用都会导致异常。



#### 使用 Safe Args 传递安全的数据

启用 Safe Args 后，生成的代码会为每个操作包含以下类型安全的类和方法，以及每个发送和接收目的地。

- 为生成操作的每一个目的地创建一个类。该类的名称是在源目的地的名称后面加上“Directions”。例如，如果源目的地是名为 `SpecifyAmountFragment` 的 Fragment，则生成的类的名称为 `SpecifyAmountFragmentDirections`。

  该类会为源目的地中定义的每个操作提供一个方法。

- 对于用于传递参数的每个操作，都会创建一个 inner 类，该类的名称根据操作的名称确定。例如，如果操作名称为 `confirmationAction,`，则类名称为 `ConfirmationAction`。如果您的操作包含不带 `defaultValue` 的参数，则您可以使用关联的 action 类来设置参数值。

- 为接收目的地创建一个类。该类的名称是在目的地的名称后面加上“Args”。例如，如果目的地 Fragment 的名称为 `ConfirmationFragment,`，则生成的类的名称为 `ConfirmationFragmentArgs`。可以使用该类的 `fromBundle()` 方法检索参数。

以下示例说明了如何使用这些方法来设置参数并将其传递给 [`navigate()`](https://developer.android.google.cn/reference/androidx/navigation/NavController#navigate(int)) 方法：

```kotlin
override fun onClick(v: View) {
   val amountTv: EditText = view!!.findViewById(R.id.editTextAmount)
   val amount = amountTv.text.toString().toInt()
   val action = SpecifyAmountFragmentDirections.confirmationAction(amount)
   v.findNavController().navigate(action)
}
```



在接收目的地的代码中，请使用 [`getArguments()`](https://developer.android.google.cn/reference/androidx/fragment/app/Fragment#getArguments()) 方法来检索 bundle 并使用其内容。使用 `-ktx` 依赖项时，Kotlin 用户还可以使用 `by navArgs()` 属性委托来访问参数。

```kotlin
val args: ConfirmationFragmentArgs by navArgs()

override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
    val tv: TextView = view.findViewById(R.id.textViewAmount)
    val amount = args.amount
    tv.text = amount.toString()
}
```



#### 将 Safe Args 用于全局操作

将 Safe Args 用于[全局操作](https://developer.android.google.cn/topic/libraries/architecture/navigation/navigation-global-action)时，您必须为根 `<navigation>` 元素提供一个 `android:id` 值，如以下示例中所示：

```xml
<?xml version="1.0" encoding="utf-8"?>
<navigation xmlns:app="http://schemas.android.com/apk/res-auto"
            xmlns:tools="http://schemas.android.com/tools"
            xmlns:android="http://schemas.android.com/apk/res/android"
            android:id="@+id/main_nav"
            app:startDestination="@id/mainFragment">

    ...

</navigation>
```

Navigation 会根据 `android:id` 值为 `<navigation>` 元素生成一个 `Directions` 类。例如，如果您有具有 `android:id=@+id/main_nav` 的 `<navigation>` 元素，则生成的类的名称为 `MainNavDirections`。`<navigation>` 元素中的所有目的地都生成了方法，以使用前一节中所述的相同方法来访问所有关联的全局操作。

#### 使用 Bundle 对象在目的地之间传递参数

如果您不使用 Gradle，仍然可以使用 `Bundle` 对象在目的地之间传递参数。创建 `Bundle` 对象并使用 [`navigate()`](https://developer.android.google.cn/reference/androidx/navigation/NavController#navigate(int)) 将它传递给目的地，如下所示：

[Kotlin](https://developer.android.google.cn/guide/navigation/navigation-pass-data#kotlin)[Java](https://developer.android.google.cn/guide/navigation/navigation-pass-data#java)

```kotlin
val bundle = bundleOf("amount" to amount)
view.findNavController().navigate(R.id.confirmationAction, bundle)
```

在接收目的地的代码中，请使用 [`getArguments()`](https://developer.android.google.cn/reference/androidx/fragment/app/Fragment#getArguments()) 方法来检索 `Bundle` 并使用其内容：

[Kotlin](https://developer.android.google.cn/guide/navigation/navigation-pass-data#kotlin)[Java](https://developer.android.google.cn/guide/navigation/navigation-pass-data#java)

```kotlin
val tv = view.findViewById<TextView>(R.id.textViewAmount)
tv.text = arguments?.getString("amount")
```

### 嵌套图 多返回栈

自 2.4.0 版本开始 navigation 支持使用 `setupWithNavController` 时保存并恢复每个菜单项的状态。

```xml
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/mobile_navigation"
    app:startDestination="@id/nav_home"> //使用id

    <include app:graph="@navigation/nav_home"/>
    <include app:graph="@navigation/nav_dashboard"/>
    <include app:graph="@navigation/nav_notifications"/>
</navigation>
```

结合 BottomNavigationView 使用 ，BottomNavigationView 的 menu item id 必须与 导航图的 id 保持一致，否则 setupWithNavController 无法与 navigation 正确绑定使用

```xml
    <!--与导航图的id保持一致-->
    <item
        android:id="@+id/nav_home"
        android:icon="@drawable/ic_home_black_24dp"
        android:title="@string/title_home" />

<!--    <item-->
<!--        android:id="@+id/nav_dashboard"-->
<!--        android:icon="@drawable/ic_dashboard_black_24dp"-->
<!--        android:title="@string/title_dashboard" />-->

<!--    <item-->
<!--        android:id="@+id/nav_notifications"-->
<!--        android:icon="@drawable/ic_notifications_black_24dp"-->
<!--        android:title="@string/title_notifications" />-->
```





































