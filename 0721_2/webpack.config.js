
const path = require('path')//기본 내장으로 갖고 있음. >>따로 깔 필요는 없다.
const webpackPlugin =require('@pmmmwh/react-refresh-webpack-plugin') 
const  webpack  = require('webpack')
/**********7/6추가 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/**********/
//import webpack from 'webpack'실행안됨.

module.exports = {

    name: 'Sh',
    mode:'development',//배포할 때 사용할꺼면 production
    devtool:'eval',// hidden-source-map
    resolve:{
        extensions:['.js','.jsx']//배열로 받는 이유는 여러개를 받기 위해서
    },
    //입력받을 내용들(우리가 설정해주는 것임.)
    entry:{
        app:['./index.jsx']

    },//여러개 가져와야하기에 복수로 적어야 한다. 그래서 배열 형태임.

    module:{//무엇을 이용해서 해석하는지 .... webpack이 bable을 해석할 수 있는 아이로 됨.
        rules:[{
            test:/\.jsx?$/,//받을 파일 확장값
            loader:'babel-loader',
            options:{
                presets:[
                    ['@babel/preset-env',{
                        targets:{
                            browsers:['> 5% in KR', 'last 2 chrome versions']
                        }
                    }],//최신 문법을 옛날 문법에 맞게 바꿔주는 역할....진짜 너무 옛날버전까지 해서 정해줘야함.
                    
                    '@babel/preset-react'
                ],
                plugins:[
                    'react-refresh/babel'

                ]
            }
        },
    /**************7월 6일 추가함 */
        {
            test:/\.css$/,
            // use:['style-loader','css-loader']///순서 중요함(뒤에 있는 것 부터 해석하기 때문에)

            use:[MiniCssExtractPlugin.loader,'css-loader']
        }]

    },
    //webpack이 실행되면 무조건 실행해야할 플러그인
    plugins:[//전체적인 플러그인
        new webpackPlugin(),
        new webpack.LoaderOptionsPlugin({debug:true}),
        /*******7/6추가***/ 
        new MiniCssExtractPlugin({ filename: 'app.css' })//output에 만들어짐
    ],

    //내보낼 내용들// 경로와 파일며이 많다.
    output:{
        path: path.join(__dirname,'dist'),
        //'현재까지 디렉토리+ dist'의 경로//webpack1\dist까지임.
        filename:'app.js',
        publicPath:'/dist/'//저 폴더를 정적폴더로 만드는 것임
    },
    
    devServer:{//실행할 때 쓰는 것
        publicPath:'/dist/',
        hot:true,
        //hot은 바뀐 소스만 처리해서 바로 실행해줌. 서버를 다시 열 필요가 없음.
        //dev서버에서 dist 폴더가 만들어져서 돌아가고 있는 것임.
    }

}