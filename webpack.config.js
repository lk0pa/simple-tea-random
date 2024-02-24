const path = require( "path" );
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = [ {

    mode: "production",
    entry: "./src/index.js",
    output: {

        filename: "bundle.js",
        path: path.resolve( __dirname, "dist" ),
        libraryTarget: "umd"

    },
    module: {

        rules: [
            
            {
            
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
          
            },
            {
                
                test: /\.svg$/,
                exclude: /node_modules/,
                loader: "svg-react-loader"
                
            }
        
        ]
      
    },
    externals: [

        "react",
        "react-dom"

    ],
    plugins: [
    
        new BundleAnalyzerPlugin( { analyzerMode: "static" } )
        
    ]

}, {
    
    mode: "development",
    entry: "./src/index.js",
    output: {

        filename: "dev.js",
        path: path.resolve( __dirname, "dist" ),
        libraryTarget: "umd"

    },
    module: {

        rules: [
            
            {
            
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
          
            },
            {
                
                test: /\.svg$/,
                exclude: /node_modules/,
                loader: "svg-react-loader"
                
            }
        
        ]
      
    },
    externals: [

        "react",
        "react-dom"

    ]
    
} ];