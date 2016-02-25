/*
 * Cntysoft Cloud Software Team
 * 
 * @author SOFTBOY <cntysoft@163.com>
 * copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * license    http://www.cntysoft.com/license/new-bsd     New BSD License
 */
/**
 * 对JS安全md5 hash进行包装, 让其符合WEBOS的编码规范
 */
Ext.define('Cntysoft.Framework.Security.Hash.Md5', {
   mixins: {
      mashup : 'Ext.mixin.Mashup'
   },
   requiredScripts : [
      '/JsLibrary/md5.js'
   ],
   statics : {
      hash : function(data)
      {
         return hex_md5(data);
      }
   }
});