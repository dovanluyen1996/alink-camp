# alink-golf-tenki-client

> alink-golf-tenki-client

## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn run dev

# build for production with minification
yarn run build

# build for production and view the bundle analyzer report
yarn run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## CSS lint
``` bash
# run 
yarn stylelint [file|directory]

# Automatically fix
yarn stylelint --fix [file|directory]

# regexp
yarn stylelint src/**/*\[\.s*css\|\.vue\]
```

## Setup cordova

### install Cordova on Global

```
sudo yarn install -g cordova
```

### run iOS

```
cordova platform add ios
cordova run ios
```

### run Android

#### 環境

##### JDKインストール
brew install adoptopenjdk8

上記で出来ない （`Error: No similarly named formulae found.` が表示される） 場合

brew tap AdoptOpenJDK/openjdk  
brew install --cask adoptopenjdk8

##### パスを通す
export JAVA_HOME=`/usr/libexec/java_home -v "1.8"`
PATH=${JAVA_HOME}/bin:${PATH}

##### Gradleインストール
brew install gradle

##### Android SDK API 29をインストール
Android Studio > SDK Manager > 29を指定

```
cordova platform add android
cordova run android
```

### run Browser(debug)

```
cordova platform add browser
yarn run build
cordova build browser
yarn run browser
```

### Usage yarn commands

```
yarn run ios
yarn run ios:dev
yarn run ios:prd

yarn run android
yarn run android:dev
yarn run android:prd
```
