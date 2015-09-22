/*
 * Cntysoft Cloud Software Team
 * 
 * @author SOFTBOY <cntysoft@163.com>
 * @copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * @license    http://www.cntysoft.com/license/new-bsd     New BSD License
 */
/**
 * 底层库标准路径静态类
 */
Ext.define('Cntysoft.Kernel.StdPath',{
   inheritableStatics : {
      /**
       * 获取App的根目录
       *
       * @param {String} module
       * @param {String} name
       * @returns {string}
       */
      getAppPath : function(module, name)
      {
         return '/Apps/'+module+'/'+name;
      },

      /**
       * 获取App的数据目录
       *
       * @param {String} module
       * @param {String} name
       * @returns {string}
       */
      getAppDataPath : function(module, name)
      {
         return this.getAppPath(module, name)+'/Data';
      },
      
      /**
       * @return {String}
       */
      getStaticsPath : function()
      {
         return '/Statics';
      },
      /**
       * 获取系统数据路径
       *
       * @return {String}
       */
      getSysDataPath : function()
      {
         return '/' + Cntysoft.Const.DATA_DIR;
      },
      /**
       * 返回系统第三方的JS库路径
       *
       * @returns {string}
       */
      getVenderPath : function()
      {
         return '/JsLibrary';
      },

      /**
       * 获取js代码路径
       *
       * @return {String}
       */
      getJsLibraryPath : function()
      {
         return '/JsLibrary'
      }
   }
});