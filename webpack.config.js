const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const isProduction = process.argv.indexOf('-p') !== -1;

const plugins = [];

let outputFilename = '[name].js';
if ( isProduction ) {
	plugins.push(new UglifyJSPlugin({
		compress:true ,
		comments:false
	}));

	outputFilename = '[name].min.js';
}

module.exports = {
	entry    :{
		'axe-comments':['./src/components/Main/Main.js']
	} ,
	output   :{
		path         :path.resolve('./dist') ,
		filename     :outputFilename ,
		libraryTarget:'var' ,
		library      :'AxeComments'
	} ,
	externals:{
		'react':'react' ,
		'prop-types':'PropTypes'
	} ,
	module   :{
		rules:[
			{test:/\.(js|jsx)$/ , loader:'babel-loader' , exclude:/node_modules/}
		]
	} ,
	plugins  :plugins
};