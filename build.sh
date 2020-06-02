#! /bin/bash

target=$1
echo STEP-1: 安装依赖模块...
mkdir -p ~/.gitlab-ci/npm/node_modules
ln -s ~/.gitlab-ci/npm/node_modules
npm install

echo STEP-1-1: 修改版本号
version="1.0.0"
sed -i "" "s/@version/$version/g" js/kmc-constants.js

echo STEP-1-2: 修改域名地址
if [ $target == "test" ]
then
    sed -i "" "s/@hostUrlType/$target/g" js/kmc-hostUrls.js
fi

echo STEP-2: 编译，生成 js 文件
npm run build

echo STEP-3: 导出代码到指定目录
mkdir -p h5App
echo '{"version":"'$version.$(date +%Y%m%d%H%M%S)'","codeVersion":"'$(git describe --always --tags)'","commit":"'$(git log --oneline -1|cut -c1-7)'"}' > config.txt
cp -R config.txt css dist images data view h5App
