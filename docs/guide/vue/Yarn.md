# Yarn

## 安装 Yarn

### 全局安装

```sh
npm install -g yarn
```

运行 `yarn --version`命令获取 yarn 版本

```sh
D:\JavaScript\VuePress>yarn --version
1.22.17
```

全局安装的 Yarn 是 1.x 版本，若使用 Yarn2 须按项目安装

### 按项目安装

1. 全局安装 Yarn 的最新版本：

```bash
npm install -g yarn
```

2. 进入你的项目目录：

```bash
cd ~/path/to/project
```

3. 运行以下命令：

```bash
yarn set version berry
```

> "Berry" 是 Yarn 2 发布序列的代号

## 用法

### 显示命令列表

```bash
yarn help
```

### 初始化一个新项目

```bash
yarn init
```

### 安装所有依赖项

```bash
yarn
yarn install
```

### 添加依赖项

```bash
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
```

### 将依赖项添加到不同的依赖类别中

```bash
yarn add [package] --dev  # dev dependencies
yarn add [package] --peer # peer dependencies
```

### 更新依赖项

```bash
yarn up [package]
yarn up [package]@[version]
yarn up [package]@[tag]
```

### 删除依赖项

```bash
yarn remove [package]
```

### 更新 Yarn 本体

```bash
yarn set version latest
yarn set version from sources
```

























