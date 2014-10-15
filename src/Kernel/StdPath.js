/*
 * Cntysoft Cloud Software Team
 * 
 * @author SOFTBOY <cntysoft@163.com>
 * @copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * @license    http://www.cntysoft.com/license/new-bsd     New BSD License
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
       * 获取平台的资源路径
       *
       * @return {String}
       */
      getPlatformResPath : function()
      {
         return '/Resources/Platform';
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
        *  获取系统的上传路径
        *
        * @returns {string}
        */
       getUploadPath : function()
       {
            return this.getSysDataPath() + Cntysoft.Const.UPLOAD_DIR;
       },
       /**
        * 获取系统允许的上传路径
        *@TODO 这个路径需要在斟酌
        *
        * @returns {string}
        */
       getUploadAllowPath : function()
       {
           return this.getUploadPath();
       },
       /**
        * 返回系统第三方的JS库路径
        *
        * @returns {string}
        */
       getVenderPath : function()
       {
           return '/JsLibrary';
       }
   }
});