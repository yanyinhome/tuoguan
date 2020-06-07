const {override, fixBabelImports, addLessLoader, addPostcssPlugins, removeModuleScopePlugin} = require('customize-cra');
const px2rem = require('postcss-px2rem-exclude');
module.exports = override(
    //按需加载antd
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: 'css'
    }),
    /* 添加less引用 */
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
        '@primary-color': '#1DA57A'
        }
    }),
    /* 解除使用public限制 */
    removeModuleScopePlugin(),
    /*  自适应转换 */
<<<<<<< HEAD
    addPostcssPlugins([px2rem({remUnit: 75, exclude: /node_modules/i})]),
=======
    addPostcssPlugins([px2rem({remUnit: 75, exclude: './node_modules/i'})]),
>>>>>>> 2fc009ba0f9cfc52d22b61aaf91e67c58bf90d74
);
