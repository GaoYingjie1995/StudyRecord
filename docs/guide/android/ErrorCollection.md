# Android 异常收集

## java.net.UnknownServiceException: CLEARTEXT communication to httpbin.org not permitted by network security policy

Android P 开始 Android 禁止未经加密的网络连接 

解决方式

 1. 使用 https 的请求方式

 2. 在 Manifest 中的 application 中添加 `android:usesCleartextTraffic="true"`

    ```xml
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:usesCleartextTraffic="true"
    android:theme="@style/Theme.MyJetPack">
    ```