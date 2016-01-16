/*
 * Cntysoft Cloud Software Team
 * 
 * @author SOFTBOY <cntysoft@163.com>
 * @copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * @license    http://www.cntysoft.com/license/new-bsd     New BSD License
 */
Ext.define("Cntysoft.Framework.Rpc.Response",{
   equires : [
      "Ext.util.HashMap"
   ],
   /**
    * @var {String} signature
    */
   signature : "",
   /**
    * @var {Boolean} status
    */
   status : true,
   /**
    * @var {Integer} serial
    */
   serial : -1,
   /**
    * @var {Boolean} isFinal
    */
   isFinal : true,
   /**
    * @var {Integer} errorCode
    */
   errorCode : -1,
   /**
    * @var {String} errorString
    */
   errorString : "",
   /**
    * @var {Ext.util.HashMap} data
    */
   data : null,
   /**
    * @var {String} extraData
    */
   extraData : "",
   
   constructor : function(signature, status)
   {
      this.signature = signature;
      this.status = status;
      this.data = new Ext.util.HashMap();
   },
   
   setSignature : function(signature)
   {
      this.signature = signature;
      return this;
   },
   
   getSignature : function()
   {
      return this.signatire;
   },
   
   setStatus : function(status)
   {
      this.status = status;
      return this;
   },
   
   getStatus : function()
   {
      return this.status;
   },
   
   setSerial : function(serial)
   {
      this.serial = serial;
      return this;
   },
   
   getSerial : function()
   {
      return this.serial;
   },
   
   setIsFinal : function(flag)
   {
      this.isFinal = flag;
      return this;
   },
   
   getIsFinal : function()
   {
      return this.isFinal;
   },
   
   setErrorCode : function(code)
   {
      this.errorCode = code;
      return this.errorCode;
   },
   
   getErrorCode : function()
   {
      return this.errorCode;
   },
   
   setErrorString : function(errorString)
   {
      this.errorString = errorString;
      return this;
   },
   
   getErrorString : function()
   {
      return this.errorString;
   },
   
   setDataItem : function(key, value)
   {
      this.data.add(key, value);
      return this;
   },
   
   getDataItem : function(key)
   {
      return this.data.get(key);
   },
   
   getData : function()
   {
      return this.data;
   },
   
   setExtraData : function(data)
   {
      this.extraData = data;
      return this;
   },
   
   getExtraData : function()
   {
      return this.extraData;
   },
   
   destroy : function()
   {
      this.data.clear();
      Ext.destroy(this.data);
      delete this.data;
   }
});