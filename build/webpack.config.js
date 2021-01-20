let path=require('path');
let webpack=require('webpack');
let VueLoaderPlugin=require("vue-loader/lib/plugin");

/* 每次打包前清除dist文件 */
let {CleanWebpackPlugin}=require("clean-webpack-plugin");

/* 判断开发环境 */
let base_env=process.env.NODE_ENV==='production';

module.exports={
    /* 打包出来的文件运行的环境 */
    target:'web',
    entry:path.resolve(process.cwd(),'./src/index.js'),
    /* webpack 如何输出结果的相关选项 */
    output:{
       //所有输出文件的目标路径 必须是绝对路径（使用Node.js的path模块）
       path:path.resolve(process.cwd(),'dist'),
       //[入口分开（entry chunk）的文件名模块（出口分块）]
       filename:'vy-element.js',
       //输出解析文件目录 
      // publicPath:'/assets/',
       //导出库的名称
       library:'vyElement',
       //到出库的类型
       libraryTarget:"umd",
       //在UMD库中使用命名的AMD模块
       umdNamedDefine:true,
    },
    /* 模块的配置 */
    module:{
        /* 模块规则（配置loader、解析器等选项） */
         rules:[
             {
                test:/\.css$/,
                use:['style-loader','css-loader']
             },
             {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                  loaders: {
                     css:[
                        'vue-style-loader',
                        {
                           loader:'css-loader'
                        }
                     ],
                     less:[
                        'vue-style-loader',
                        {
                           loader:'css-loader'
                        },
                        {
                           loader:'less-loader'
                        },
                        {
                           loader:'sass-loader'
                        },
                     ]
                  }
                  // other vue-loader options go here
                }
              },
              {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
              },
              {
                test:/\.less$/,
                use:[
                   {
                      loader:'style-loader'
                   },
                   {
                      loader:'css-loader'
                   },
                   {
                      loader:'less-loader'
                   }
                ]
              },
              {
                 test:/\.scss$/,
                 use:[
                  {
                     loader:'style-loader'
                  },
                  {
                     loader:'css-loader'
                  },
                  {
                     loader:'sass-loader'
                  }
               ]
              },
              {
                 test:/\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
                 loader:'url-loader',
                 options:{
                    limit:10000,
                  //   跨平台输出路径
                    name:path.posix.join('icon-font','[name].[ext]')
                 }
              },
              {
               test:/\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
               //file-loader 会把满足匹配条件的文件按照指定的方式输出
               loader:'file-loader',
               options:{
                //   跨平台输出路径
                  name:path.posix.join('icon-font','[name].[ext]')
               }
            }
         ]
    },
    /* 解析模块请求的选项;不适用对loader解析 */
    resolve:{
        /* 用于查找模块的目录 */
       modules:[
           'node_modules'
       ],
       // 使用的扩展名
       extensions:['.js','.json','.css','.jsx'],
       alias:{
          'vy-element':path.resolve(__dirname,'../'),
          '@':path.resolve(__dirname,'./src') 
       }
    },
    plugins:[
      new CleanWebpackPlugin(),
      new VueLoaderPlugin()
    ],
}

if(!base_env){
   module.exports.devtool='eval'
}else{
   module.exports.plugins = (module.exports.plugins || []).concat([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new webpack.LoaderOptionsPlugin({
         minimize:true
      })
   ])
}