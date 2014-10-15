/*
 * Cntysoft Cloud Software Team
 * 
 * @author SOFTBOY <cntysoft@163.com>
 * copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * license    http://www.cntysoft.com/license/new-bsd     New BSD License
 */
/**
 * 对JS安全hash进行包装, 让其符合WEBOS的编码规范
 */
Ext.define('Cntysoft.Framework.Security.Hash.Sha', {
   mixins: {
      mashup : 'Ext.mixin.Mashup'
   },
   requiredScripts : [
      '/JsLibrary/JsSha/sha.js'
   ],
   //HASH核心对象
   core : null,
   /**
    * inputFomat接受的值[HEX|ASCII|TEXT|B64]
    * charSize 的取值为8或者16
    */
   constructor : function(text, inputFormat, charSize)
   {
      this.core = new jsSHA(text, inputFormat, charSize);
   },
   /**
    * variant取值 SHA-1, SHA-224, SHA-256, SHA-384, or SHA-512
    * format取值B64 or HEX
    */
   getHash : function(variant, format, outputFormatOpts)
   {
      return this.core.getHash(variant, format, outputFormatOpts);
   },
   /**
    * variant取值 SHA-1, SHA-224, SHA-256, SHA-384, or SHA-512
    * format取值B64 or HEX
    */
   getHmac : function(key, inputFormat, variant, outputFormat, outputFormatOpts)
   {
      return this.getHMAC(key, inputFormat, variant, outputFormat, outputFormatOpts);
   },
   destroy : function()
   {
      delete this.core;
   }
});