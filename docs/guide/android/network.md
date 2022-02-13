# Android 网络库

## Okhttp

### 基础使用

1. 创建 HttpClient

2. 创建 Request 通过Request.Builder() 构建

3. 通过 HttpClient 的newCall 方法创建 Call `A call is a request that has been prepared for execution. A call can be canceled. As this object represents a single request/response pair (stream), it cannot be executed twice.`

4. 通过Call 的 execute 执行同步请求   通过 enqueue 执行异步请求



### GET 的同步请求 :

   ```kotlin
   val httpClient = OkHttpClient()
   val request = Request.Builder()
       .url("http://httpbin.org/get")
       .build()
   val call = httpClient.newCall(request)
   val response = call.execute()
   if (response.isSuccessful) {
       Log.d("OkhttpActivity", "sync get response: "+response.body?.string())
   }
   ```

### GET 的异步请求:

   ```kotlin
   val httpClient = OkHttpClient();
   val request = Request.Builder()
       .url("http://httpbin.org/get")
       .build()
   httpClient.newCall(request).enqueue(object : Callback{
       override fun onFailure(call: Call, e: IOException) {
           e.printStackTrace()
       }
       override fun onResponse(call: Call, response: Response) {
           if (response.isSuccessful) {
               Log.e("OkhttpActivity", "onResponse success: "+response.body?.string() )
           }else {
               Log.e("OkhttpActivity", "onResponse failed:  $response")
           }
       }
   })
   Log.e("OkhttpActivity", "async get", )
   ```

### GET 请求携带参数

GET 请求的参数拼接在 url 中 。在 url 末尾通过 ?&key1=value1&key2=value2 拼接

```kotlin
val url = "http://httpbin.org/get?&account=leo&password=123456"
val request = Request.Builder()
    .url(url).build();
httpClient.newCall(request).enqueue(object : Callback{
    override fun onFailure(call: Call, e: IOException) {
        Log.e("OkhttpActivity", "getWithQuery: failed")
        e.printStackTrace()
    }

    override fun onResponse(call: Call, response: Response) {
        if (response.isSuccessful) {
            Log.e("OkhttpActivity", "onResponse: "+response.body?.string() )
        }
    }
})
```



### POST String

```kotlin
private fun postString() {

    val MEDIA_TYPE_MARKDOWN = "text/x-markdown; charset=utf-8".toMediaTypeOrNull()
    val postBody = "这是一个 post  string  请求"
    val request = Request.Builder()
        .url("http://httpbin.org/post")
        .post(postBody.toRequestBody(MEDIA_TYPE_MARKDOWN))
        .build()
    httpClient.newCall(request).enqueue(object :Callback {
        override fun onFailure(call: Call, e: IOException) {
            e.printStackTrace()
        }
        override fun onResponse(call: Call, response: Response) {
            if (response.isSuccessful) {
                Log.e("OkhttpActivity", "onResponse: "+response.body?.string())
            }else {
                Log.e("OkhttpActivity", "onResponse: "+response.message )
            }
        }

    })
}
```



### POST File

```kotlin
    private fun postFile() {

        val MEDIA_TYPE_MARKDOWN = "text/x-markdown; charset=utf-8".toMediaTypeOrNull()

        val file = File(getExternalFilesDir(""),"testFile.md");
        if (!file.exists()) {
            file.createNewFile();
        }
        val randomAccessFile = RandomAccessFile(file,"rw")
        randomAccessFile.writeUTF("这是一个 post 文件")
        val request = Request.Builder()
            .url("http://httpbin.org/post")
            .post(file.asRequestBody(MEDIA_TYPE_MARKDOWN))
            .build()
        httpClient.newCall(request).enqueue(object :Callback {
            override fun onFailure(call: Call, e: IOException) {
                e.printStackTrace()
            }
            override fun onResponse(call: Call, response: Response) {
                if (response.isSuccessful) {
                    Log.e("OkhttpActivity", "onResponse: "+response.body?.string())
                }else {
                    Log.e("OkhttpActivity", "onResponse: "+response.message )
                }
            }

        })
    }
```



### POST Form parameters

```kotlin
    private fun postFormBody() {

        val formBody = FormBody.Builder()
            .add("account","leopold")
            .add("password","123abc")
            .build()
        val request = Request.Builder()
            .url("http://httpbin.org/post")
            .post(formBody)
            .build()
        httpClient.newCall(request).enqueue(object :Callback {
            override fun onFailure(call: Call, e: IOException) {
                e.printStackTrace()
            }
            override fun onResponse(call: Call, response: Response) {
                if (response.isSuccessful) {
                    Log.e("OkhttpActivity", "onResponse: "+response.body?.string())
                }else {
                    Log.e("OkhttpActivity", "onResponse: "+response.message )
                }
            }

        })
    }
```



### POST MultipartBody

```kotlin
    private fun postMultiPartBody() {
        val MEDIA_TYPE_MARKDOWN = "text/x-markdown; charset=utf-8".toMediaTypeOrNull()
        val file = File(getExternalFilesDir(""),"testFile.md");
        if (!file.exists()) {
            file.createNewFile();
        }
        val randomAccessFile = RandomAccessFile(file,"rw")
        randomAccessFile.writeUTF("这是一个 post 文件")

        val multiPartBody = MultipartBody.Builder()
            .setType(MultipartBody.FORM)
            .addFormDataPart("key1","value1")
            .addFormDataPart("key2","mdFile",file.asRequestBody(MEDIA_TYPE_MARKDOWN))
            .build();

        val request = Request.Builder()
            .url("http://httpbin.org/post")
            .post(multiPartBody)
            .build()
        httpClient.newCall(request).enqueue(object :Callback {
            override fun onFailure(call: Call, e: IOException) {
                e.printStackTrace()
            }
            override fun onResponse(call: Call, response: Response) {
                if (response.isSuccessful) {
                    Log.e("OkhttpActivity", "onResponse: "+response.body?.string())
                }else {
                    Log.e("OkhttpActivity", "onResponse: "+response.message )
                }

            }

        })
    }
```



### Response  Caching

```kotlin
    private fun getCachingHttpClient() :OkHttpClient{
        val catchDir = getExternalFilesDir("cache");
        val client = OkHttpClient.Builder()
            .cache(Cache(cacheDir,10*1024*1024))
            .build();
        return client;
    }

```



### Canceling a Call

调用 Call.cancel 方法立即停止一个正在请求的 Call ,如果线程当前正在写入请求或读取响应，它将收到 IOException。

```kotlin
private fun cancelCall() {
        val executor = Executors.newScheduledThreadPool(1)
        val client = OkHttpClient()
        val request = Request.Builder()
            .url("http://httpbin.org/delay/2") // This URL is served with a 2 second delay.
            .build()
        
        val call = client.newCall(request)
        // 一秒后取消请求
        executor.schedule({
            Log.e("OkhttpActivity", "canceling", )
            call.cancel()
            Log.e("OkhttpActivity", "canceled", )
           
        }, 1, TimeUnit.SECONDS)
        Log.e("OkhttpActivity", "calling")
        call.enqueue(object :Callback {
            //取消请求将收到该条回调
            override fun onFailure(call: Call, e: IOException) {
                Log.e("OkhttpActivity", "onFailure: $e")
            }
            override fun onResponse(call: Call, response: Response) {
                Log.e("OkhttpActivity", "onResponse: ", )
            }
        })
    }

    /**
     val request = Request.Builder()
        .url("http://httpbin.org/delay/2") // This URL is served with a 2 second delay.
        .tag(tag)
        .build()
     * 通过 Request 传入TAG
     * 
     */
    fun cancelWithTag(httpClient: OkHttpClient,tag:Any){

        val queuedCalls = httpClient.dispatcher.queuedCalls()
        for (call in queuedCalls) {
            if (tag == call.request().tag()) {
                call.cancel()
            }
        }
        for (runningCall in httpClient.dispatcher.runningCalls()) {
            if (tag == runningCall.request().tag()) {
                runningCall.cancel()
            }
        }
    }
```



### Timeouts

```kotlin
 private val client: OkHttpClient = OkHttpClient.Builder()
      .connectTimeout(5, TimeUnit.SECONDS)
      .writeTimeout(5, TimeUnit.SECONDS)
      .readTimeout(5, TimeUnit.SECONDS)
      .callTimeout(10, TimeUnit.SECONDS)
      .build()
```



### Interceptor

```kotlin
class LoggingInterceptor implements Interceptor {
  @Override public Response intercept(Interceptor.Chain chain) throws IOException {
    Request request = chain.request();

    long t1 = System.nanoTime();
    logger.info(String.format("Sending request %s on %s%n%s",
        request.url(), chain.connection(), request.headers()));

    Response response = chain.proceed(request);

    long t2 = System.nanoTime();
    logger.info(String.format("Received response for %s in %.1fms%n%s",
        response.request().url(), (t2 - t1) / 1e6d, response.headers()));

    return response;
  }
}
```



![](https://square.github.io/okhttp/images/interceptors%402x.png)



### Rewriting Requests

拦截器可以添加、删除或替换请求头。它们还可以转换有一个请求的请求体。

```kotlin
/** This interceptor compresses the HTTP request body. Many webservers can't handle this! */
final class GzipRequestInterceptor implements Interceptor {
  @Override public Response intercept(Interceptor.Chain chain) throws IOException {
    Request originalRequest = chain.request();
    if (originalRequest.body() == null || originalRequest.header("Content-Encoding") != null) {
      return chain.proceed(originalRequest);
    }

    Request compressedRequest = originalRequest.newBuilder()
        .header("Content-Encoding", "gzip")
        .method(originalRequest.method(), gzip(originalRequest.body()))
        .build();
    return chain.proceed(compressedRequest);
  }

  private RequestBody gzip(final RequestBody body) {
    return new RequestBody() {
      @Override public MediaType contentType() {
        return body.contentType();
      }

      @Override public long contentLength() {
        return -1; // We don't know the compressed length in advance!
      }

      @Override public void writeTo(BufferedSink sink) throws IOException {
        BufferedSink gzipSink = Okio.buffer(new GzipSink(sink));
        body.writeTo(gzipSink);
        gzipSink.close();
      }
    };
  }
}
```



### CookieJar

```kotlin
val cookieMap :MutableMap<String,List<Cookie>> = mutableMapOf()
val client = OkHttpClient.Builder()
    .cookieJar(object :CookieJar{
        override fun loadForRequest(url: HttpUrl): List<Cookie> {
            return if (cookieMap.get(url.host) != null) cookieMap.get(url.host)!! else listOf<Cookie>()
        }

        override fun saveFromResponse(url: HttpUrl, cookies: List<Cookie>) {

            cookieMap.put(url.host,cookies);
        }
    })
```



## Retrofit

![注解](/imgs/img_retrofit.png)



### Retrofit 使用

#### 创建请求接口

```kotlin
interface HttpbinService {
    @GET("/get")
    fun get (@Query("account") account:String,@Query("password") pwd:String):Call<ResponseBody>

    @POST("/post")
    @FormUrlEncoded
    fun post(@Field("account") account:String, @Field("password") pwd:String):Call<ResponseBody>

}
```

#### 创建 Retrofit 对象

```kotlin
val retrofit = Retrofit.Builder()
            .baseUrl("http://httpbin.org")
            .build()
```

#### 通过 Retrofit 对象生成一个接口实现

```kotlin
val httpbinService = retrofit.create(HttpbinService::class.java)
```



### URL 操作

- 通过 @Path 传参

```java
@GET("group/{id}/users")
Call<List<User>> groupList(@Path("id") int groupId);
```

- 通过 @Query 传参

```java
@GET("group/{id}/users")
Call<List<User>> groupList(@Path("id") int groupId, @Query("sort") String sort);
```

- 通过 @QueryMap 传复杂参数

```java
@GET("group/{id}/users")
Call<List<User>> groupList(@Path("id") int groupId, @QueryMap Map<String, String> options);
```



### 请求体

- 通过 @Body 传递一个对象作为请求体

```java
@POST("users/new")
Call<User> createUser(@Body User user);
```

### Form 表单

传递 form 表单参数 ，在 post 请求方法上添加 @FormUrlEncoded 注解。参数键值对使用 @Field

```java
@FormUrlEncoded
@POST("user/edit")
Call<User> updateUser(@Field("first_name") String first, @Field("last_name") String last);
```

### 上传文件

1. 在方法上使用 @Multipart 注解 参数键值对使用 @Part 传递 MultipartBody.Part 参数

```java
@Multipart
@POST("file/upload/image/face")
Observable<ResponseResult<String>> uploadFace(@Part MultipartBody.Part body);

RequestBody requestBody = RequestBody.create(MediaType.parse("image/*"),file);
MultipartBody.Part part = MultipartBody.Part.createFormData("uploadFile",file.getName(),requestBody);
        

```

2. 通过 @Body 传参 MultipartBody

```java
@POST("measure/upload/ecg")
Observable<ResponseResult<UploadResult>> uploadEcgFile(@Body MultipartBody fileBody);

RequestBody requestFile = RequestBody.create(MediaType.parse("audio/*"),ecgFile) ;
MultipartBody multipartBody = new MultipartBody.Builder().setType(MultipartBody.FORM)
	.addFormDataPart("jsonData",JsonUtils.toJsonString(ecgEntity))
	.addFormDataPart("ecgFile",ecgFile.getName(),requestFile)
	.addFormDataPart("type", ecgEntity.getType())
	.build();

```



### 请求头

1. 在方法上添加 @Headers 注解

```java
@Headers("Cache-Control: max-age=640000")
@GET("widget/list")
Call<List<Widget>> widgetList();

@Headers({
    "Accept: application/vnd.github.v3.full+json",
    "User-Agent: Retrofit-Sample-App"
})
@GET("users/{username}")
Call<User> getUser(@Path("username") String username);
```

2. 动态添加

```java
@GET("user")
Call<User> getUser(@Header("Authorization") String authorization)
    
@GET("user")
Call<User> getUser(@HeaderMap Map<String, String> headers)
```



### 数据转换器

1. 添加数据转换器依赖

```groovy
def retrofit_version = "2.9.0"
    implementation "com.squareup.retrofit2:retrofit:$retrofit_version"
    implementation("com.squareup.retrofit2:converter-gson:$retrofit_version") //gson 数据转换器
```

2. 在构建 Retrofit 对象时添加数据转换器

 ```kotlin
 val retrofit = Retrofit.Builder()
             .baseUrl(base_url)
             .addConverterFactory(GsonConverterFactory.create())
             .build()
 ```

3. 创建请求响应基类  以 wanandroid api 为例

   ```java
   data class HttpResponse<T>(val errorMsg:String, val errorCode:Int, val data:T)
   ```

4. 修改请求方法的返回对象为响应基类

```kotlin
@FormUrlEncoded
@POST("/user/login")
fun login(@Field("username") account:String, @Field("password") pwd:String):Call<HttpResponse<LoginResult>>
```



```kotlin
    @Test
    fun loginTest() {
        val retrofit = Retrofit.Builder()
            .baseUrl(base_url)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
        val httpbinService = retrofit.create(HttpbinService::class.java)
        val call : Call<HttpResponse<LoginResult>> = httpbinService.login("leopold", "123456")

        val response = call.execute();
        if (response.isSuccessful) {
            println(response.body()?.data)
        }

    }
```







## HTTP content-type

Content-Type（内容类型），一般是指网页中存在的 Content-Type，用于定义网络文件的类型和网页的编码，决定浏览器将以什么形式、什么编码读取这个文件，这就是经常看到一些 PHP 网页点击的结果却是下载一个文件或一张图片的原因。

常见的媒体格式类型如下：

- text/html ： HTML格式
- text/plain ：纯文本格式
- text/xml ： XML格式
- image/gif ：gif图片格式
- image/jpeg ：jpg图片格式
- image/png：png图片格式

以application开头的媒体格式类型：

- application/xhtml+xml ：XHTML格式
- application/xml： XML数据格式
- application/atom+xml ：Atom XML聚合格式
- application/json： JSON数据格式
- application/pdf：pdf格式
- application/msword ： Word文档格式
- application/octet-stream ： 二进制流数据（如常见的文件下载）
- application/x-www-form-urlencoded ： \<form encType=””\>中默认的encType，form表单数据被编码为key/value格式发送到服务器（表单默认的提交数据的格式）

另外一种常见的媒体格式是上传文件之时使用的：

- multipart/form-data ： 需要在表单中进行文件上传时，就需要使用该格式

## HTTP content-type 对照表

| 文件扩展名                          | Content-Type(Mime-Type)                 | 文件扩展名 | Content-Type(Mime-Type)             |
| :---------------------------------- | :-------------------------------------- | :--------- | :---------------------------------- |
| .*（ 二进制流，不知道下载文件类型） | application/octet-stream                | .tif       | image/tiff                          |
| .001                                | application/x-001                       | .301       | application/x-301                   |
| .323                                | text/h323                               | .906       | application/x-906                   |
| .907                                | drawing/907                             | .a11       | application/x-a11                   |
| .acp                                | audio/x-mei-aac                         | .ai        | application/postscript              |
| .aif                                | audio/aiff                              | .aifc      | audio/aiff                          |
| .aiff                               | audio/aiff                              | .anv       | application/x-anv                   |
| .asa                                | text/asa                                | .asf       | video/x-ms-asf                      |
| .asp                                | text/asp                                | .asx       | video/x-ms-asf                      |
| .au                                 | audio/basic                             | .avi       | video/avi                           |
| .awf                                | application/vnd.adobe.workflow          | .biz       | text/xml                            |
| .bmp                                | application/x-bmp                       | .bot       | application/x-bot                   |
| .c4t                                | application/x-c4t                       | .c90       | application/x-c90                   |
| .cal                                | application/x-cals                      | .cat       | application/vnd.ms-pki.seccat       |
| .cdf                                | application/x-netcdf                    | .cdr       | application/x-cdr                   |
| .cel                                | application/x-cel                       | .cer       | application/x-x509-ca-cert          |
| .cg4                                | application/x-g4                        | .cgm       | application/x-cgm                   |
| .cit                                | application/x-cit                       | .class     | java/*                              |
| .cml                                | text/xml                                | .cmp       | application/x-cmp                   |
| .cmx                                | application/x-cmx                       | .cot       | application/x-cot                   |
| .crl                                | application/pkix-crl                    | .crt       | application/x-x509-ca-cert          |
| .csi                                | application/x-csi                       | .css       | text/css                            |
| .cut                                | application/x-cut                       | .dbf       | application/x-dbf                   |
| .dbm                                | application/x-dbm                       | .dbx       | application/x-dbx                   |
| .dcd                                | text/xml                                | .dcx       | application/x-dcx                   |
| .der                                | application/x-x509-ca-cert              | .dgn       | application/x-dgn                   |
| .dib                                | application/x-dib                       | .dll       | application/x-msdownload            |
| .doc                                | application/msword                      | .dot       | application/msword                  |
| .drw                                | application/x-drw                       | .dtd       | text/xml                            |
| .dwf                                | Model/vnd.dwf                           | .dwf       | application/x-dwf                   |
| .dwg                                | application/x-dwg                       | .dxb       | application/x-dxb                   |
| .dxf                                | application/x-dxf                       | .edn       | application/vnd.adobe.edn           |
| .emf                                | application/x-emf                       | .eml       | message/rfc822                      |
| .ent                                | text/xml                                | .epi       | application/x-epi                   |
| .eps                                | application/x-ps                        | .eps       | application/postscript              |
| .etd                                | application/x-ebx                       | .exe       | application/x-msdownload            |
| .fax                                | image/fax                               | .fdf       | application/vnd.fdf                 |
| .fif                                | application/fractals                    | .fo        | text/xml                            |
| .frm                                | application/x-frm                       | .g4        | application/x-g4                    |
| .gbr                                | application/x-gbr                       | .          | application/x-                      |
| .gif                                | image/gif                               | .gl2       | application/x-gl2                   |
| .gp4                                | application/x-gp4                       | .hgl       | application/x-hgl                   |
| .hmr                                | application/x-hmr                       | .hpg       | application/x-hpgl                  |
| .hpl                                | application/x-hpl                       | .hqx       | application/mac-binhex40            |
| .hrf                                | application/x-hrf                       | .hta       | application/hta                     |
| .htc                                | text/x-component                        | .htm       | text/html                           |
| .html                               | text/html                               | .htt       | text/webviewhtml                    |
| .htx                                | text/html                               | .icb       | application/x-icb                   |
| .ico                                | image/x-icon                            | .ico       | application/x-ico                   |
| .iff                                | application/x-iff                       | .ig4       | application/x-g4                    |
| .igs                                | application/x-igs                       | .iii       | application/x-iphone                |
| .img                                | application/x-img                       | .ins       | application/x-internet-signup       |
| .isp                                | application/x-internet-signup           | .IVF       | video/x-ivf                         |
| .java                               | java/*                                  | .jfif      | image/jpeg                          |
| .jpe                                | image/jpeg                              | .jpe       | application/x-jpe                   |
| .jpeg                               | image/jpeg                              | .jpg       | image/jpeg                          |
| .jpg                                | application/x-jpg                       | .js        | application/x-javascript            |
| .jsp                                | text/html                               | .la1       | audio/x-liquid-file                 |
| .lar                                | application/x-laplayer-reg              | .latex     | application/x-latex                 |
| .lavs                               | audio/x-liquid-secure                   | .lbm       | application/x-lbm                   |
| .lmsff                              | audio/x-la-lms                          | .ls        | application/x-javascript            |
| .ltr                                | application/x-ltr                       | .m1v       | video/x-mpeg                        |
| .m2v                                | video/x-mpeg                            | .m3u       | audio/mpegurl                       |
| .m4e                                | video/mpeg4                             | .mac       | application/x-mac                   |
| .man                                | application/x-troff-man                 | .math      | text/xml                            |
| .mdb                                | application/msaccess                    | .mdb       | application/x-mdb                   |
| .mfp                                | application/x-shockwave-flash           | .mht       | message/rfc822                      |
| .mhtml                              | message/rfc822                          | .mi        | application/x-mi                    |
| .mid                                | audio/mid                               | .midi      | audio/mid                           |
| .mil                                | application/x-mil                       | .mml       | text/xml                            |
| .mnd                                | audio/x-musicnet-download               | .mns       | audio/x-musicnet-stream             |
| .mocha                              | application/x-javascript                | .movie     | video/x-sgi-movie                   |
| .mp1                                | audio/mp1                               | .mp2       | audio/mp2                           |
| .mp2v                               | video/mpeg                              | .mp3       | audio/mp3                           |
| .mp4                                | video/mpeg4                             | .mpa       | video/x-mpg                         |
| .mpd                                | application/vnd.ms-project              | .mpe       | video/x-mpeg                        |
| .mpeg                               | video/mpg                               | .mpg       | video/mpg                           |
| .mpga                               | audio/rn-mpeg                           | .mpp       | application/vnd.ms-project          |
| .mps                                | video/x-mpeg                            | .mpt       | application/vnd.ms-project          |
| .mpv                                | video/mpg                               | .mpv2      | video/mpeg                          |
| .mpw                                | application/vnd.ms-project              | .mpx       | application/vnd.ms-project          |
| .mtx                                | text/xml                                | .mxp       | application/x-mmxp                  |
| .net                                | image/pnetvue                           | .nrf       | application/x-nrf                   |
| .nws                                | message/rfc822                          | .odc       | text/x-ms-odc                       |
| .out                                | application/x-out                       | .p10       | application/pkcs10                  |
| .p12                                | application/x-pkcs12                    | .p7b       | application/x-pkcs7-certificates    |
| .p7c                                | application/pkcs7-mime                  | .p7m       | application/pkcs7-mime              |
| .p7r                                | application/x-pkcs7-certreqresp         | .p7s       | application/pkcs7-signature         |
| .pc5                                | application/x-pc5                       | .pci       | application/x-pci                   |
| .pcl                                | application/x-pcl                       | .pcx       | application/x-pcx                   |
| .pdf                                | application/pdf                         | .pdf       | application/pdf                     |
| .pdx                                | application/vnd.adobe.pdx               | .pfx       | application/x-pkcs12                |
| .pgl                                | application/x-pgl                       | .pic       | application/x-pic                   |
| .pko                                | application/vnd.ms-pki.pko              | .pl        | application/x-perl                  |
| .plg                                | text/html                               | .pls       | audio/scpls                         |
| .plt                                | application/x-plt                       | .png       | image/png                           |
| .png                                | application/x-png                       | .pot       | application/vnd.ms-powerpoint       |
| .ppa                                | application/vnd.ms-powerpoint           | .ppm       | application/x-ppm                   |
| .pps                                | application/vnd.ms-powerpoint           | .ppt       | application/vnd.ms-powerpoint       |
| .ppt                                | application/x-ppt                       | .pr        | application/x-pr                    |
| .prf                                | application/pics-rules                  | .prn       | application/x-prn                   |
| .prt                                | application/x-prt                       | .ps        | application/x-ps                    |
| .ps                                 | application/postscript                  | .ptn       | application/x-ptn                   |
| .pwz                                | application/vnd.ms-powerpoint           | .r3t       | text/vnd.rn-realtext3d              |
| .ra                                 | audio/vnd.rn-realaudio                  | .ram       | audio/x-pn-realaudio                |
| .ras                                | application/x-ras                       | .rat       | application/rat-file                |
| .rdf                                | text/xml                                | .rec       | application/vnd.rn-recording        |
| .red                                | application/x-red                       | .rgb       | application/x-rgb                   |
| .rjs                                | application/vnd.rn-realsystem-rjs       | .rjt       | application/vnd.rn-realsystem-rjt   |
| .rlc                                | application/x-rlc                       | .rle       | application/x-rle                   |
| .rm                                 | application/vnd.rn-realmedia            | .rmf       | application/vnd.adobe.rmf           |
| .rmi                                | audio/mid                               | .rmj       | application/vnd.rn-realsystem-rmj   |
| .rmm                                | audio/x-pn-realaudio                    | .rmp       | application/vnd.rn-rn_music_package |
| .rms                                | application/vnd.rn-realmedia-secure     | .rmvb      | application/vnd.rn-realmedia-vbr    |
| .rmx                                | application/vnd.rn-realsystem-rmx       | .rnx       | application/vnd.rn-realplayer       |
| .rp                                 | image/vnd.rn-realpix                    | .rpm       | audio/x-pn-realaudio-plugin         |
| .rsml                               | application/vnd.rn-rsml                 | .rt        | text/vnd.rn-realtext                |
| .rtf                                | application/msword                      | .rtf       | application/x-rtf                   |
| .rv                                 | video/vnd.rn-realvideo                  | .sam       | application/x-sam                   |
| .sat                                | application/x-sat                       | .sdp       | application/sdp                     |
| .sdw                                | application/x-sdw                       | .sit       | application/x-stuffit               |
| .slb                                | application/x-slb                       | .sld       | application/x-sld                   |
| .slk                                | drawing/x-slk                           | .smi       | application/smil                    |
| .smil                               | application/smil                        | .smk       | application/x-smk                   |
| .snd                                | audio/basic                             | .sol       | text/plain                          |
| .sor                                | text/plain                              | .spc       | application/x-pkcs7-certificates    |
| .spl                                | application/futuresplash                | .spp       | text/xml                            |
| .ssm                                | application/streamingmedia              | .sst       | application/vnd.ms-pki.certstore    |
| .stl                                | application/vnd.ms-pki.stl              | .stm       | text/html                           |
| .sty                                | application/x-sty                       | .svg       | text/xml                            |
| .swf                                | application/x-shockwave-flash           | .tdf       | application/x-tdf                   |
| .tg4                                | application/x-tg4                       | .tga       | application/x-tga                   |
| .tif                                | image/tiff                              | .tif       | application/x-tif                   |
| .tiff                               | image/tiff                              | .tld       | text/xml                            |
| .top                                | drawing/x-top                           | .torrent   | application/x-bittorrent            |
| .tsd                                | text/xml                                | .txt       | text/plain                          |
| .uin                                | application/x-icq                       | .uls       | text/iuls                           |
| .vcf                                | text/x-vcard                            | .vda       | application/x-vda                   |
| .vdx                                | application/vnd.visio                   | .vml       | text/xml                            |
| .vpg                                | application/x-vpeg005                   | .vsd       | application/vnd.visio               |
| .vsd                                | application/x-vsd                       | .vss       | application/vnd.visio               |
| .vst                                | application/vnd.visio                   | .vst       | application/x-vst                   |
| .vsw                                | application/vnd.visio                   | .vsx       | application/vnd.visio               |
| .vtx                                | application/vnd.visio                   | .vxml      | text/xml                            |
| .wav                                | audio/wav                               | .wax       | audio/x-ms-wax                      |
| .wb1                                | application/x-wb1                       | .wb2       | application/x-wb2                   |
| .wb3                                | application/x-wb3                       | .wbmp      | image/vnd.wap.wbmp                  |
| .wiz                                | application/msword                      | .wk3       | application/x-wk3                   |
| .wk4                                | application/x-wk4                       | .wkq       | application/x-wkq                   |
| .wks                                | application/x-wks                       | .wm        | video/x-ms-wm                       |
| .wma                                | audio/x-ms-wma                          | .wmd       | application/x-ms-wmd                |
| .wmf                                | application/x-wmf                       | .wml       | text/vnd.wap.wml                    |
| .wmv                                | video/x-ms-wmv                          | .wmx       | video/x-ms-wmx                      |
| .wmz                                | application/x-ms-wmz                    | .wp6       | application/x-wp6                   |
| .wpd                                | application/x-wpd                       | .wpg       | application/x-wpg                   |
| .wpl                                | application/vnd.ms-wpl                  | .wq1       | application/x-wq1                   |
| .wr1                                | application/x-wr1                       | .wri       | application/x-wri                   |
| .wrk                                | application/x-wrk                       | .ws        | application/x-ws                    |
| .ws2                                | application/x-ws                        | .wsc       | text/scriptlet                      |
| .wsdl                               | text/xml                                | .wvx       | video/x-ms-wvx                      |
| .xdp                                | application/vnd.adobe.xdp               | .xdr       | text/xml                            |
| .xfd                                | application/vnd.adobe.xfd               | .xfdf      | application/vnd.adobe.xfdf          |
| .xhtml                              | text/html                               | .xls       | application/vnd.ms-excel            |
| .xls                                | application/x-xls                       | .xlw       | application/x-xlw                   |
| .xml                                | text/xml                                | .xpl       | audio/scpls                         |
| .xq                                 | text/xml                                | .xql       | text/xml                            |
| .xquery                             | text/xml                                | .xsd       | text/xml                            |
| .xsl                                | text/xml                                | .xslt      | text/xml                            |
| .xwd                                | application/x-xwd                       | .x_b       | application/x-x_b                   |
| .sis                                | application/vnd.symbian.install         | .sisx      | application/vnd.symbian.install     |
| .x_t                                | application/x-x_t                       | .ipa       | application/vnd.iphone              |
| .apk                                | application/vnd.android.package-archive | .xap       | application/x-silverlight-app       |

