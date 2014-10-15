/**
 * Cntysoft Cloud Software Team
 * 
 * @author SOFTBOY <cntysoft@163.com>
 * copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * license    http://www.cntysoft.com/license/new-bsd     New BSD License
 */
/**
 * 一些使用的函数定义
 */
Ext.define('Cntysoft.Stdlib.Common', {
    statics : {
        /**
             * 格式化文件大小, 输出成带单位的字符串
             * @param {Number} size 文件大小
             * @param {Number} [pointLength=2] 精确到的小数点数。
             * @param {Array} [units=[ 'B', 'K', 'M', 'G', 'TB' ]] 单位数组。从字节，到千字节，一直往上指定。如果单位数组里面只指定了到了K(千字节)，同时文件大小大于M, 此方法的输出将还是显示成多少K.
             * @example
             * console.log( Base.formatSize( 100 ) );    // => 100B
             * console.log( Base.formatSize( 1024 ) );    // => 1.00K
             * console.log( Base.formatSize( 1024, 0 ) );    // => 1K
             * console.log( Base.formatSize( 1024 * 1024 ) );    // => 1.00M
             * console.log( Base.formatSize( 1024 * 1024 * 1024 ) );    // => 1.00G
             * console.log( Base.formatSize( 1024 * 1024 * 1024, 0, ['B', 'KB', 'MB'] ) );    // => 1024MB
         * 
         * @param {String} size
         * @return {String}
         */
        byteFormat :  function( size, pointLength, units ) {
                var unit;
    
                units = units || [ 'B', 'K', 'M', 'G', 'TB' ];
    
                while ( (unit = units.shift()) && size > 1024 ) {
                    size = size / 1024;
                }
    
                return (unit === 'B' ? size : size.toFixed( pointLength || 2 )) +
                        unit;
            },
        /**
         * 解析路径信息
         * 
         * @param {String} path 需要处理的路径信息
         * @return {Object}
         */
        pathInfo : function(path)
        {
            var dirname;
            var basename;
            var filename;
            var extension;
            if(!Ext.isString('path')){
                Cntysoft.raiseError(Ext.getClassName(this), 'pathInfo', 'path must be the type string');
            }
            var fs = path.lastIndexOf('/');
            if(-1 == fs){
                Cntysoft.raiseError(Ext.getClassName(this), 'pathInfo', 'path is not a valid path');
            }
            dirname = path.substring(0, fs);
            basename = path.substring(fs + 1);
            var ppos = basename.lastIndexOf('.');
            if(-1 == ppos){
                extension = null;
                filename = basename;
            } else{
                filename = basename.substring(0, ppos);
                extension = basename.substring(ppos + 1);
            }
            return {
                dirname : dirname,
                basename : basename,
                filename : filename,
                extension : extension
            };
        }
    }
});