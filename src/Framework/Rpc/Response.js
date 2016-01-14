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
    * @var {String} m_signature
    */
   m_signature : "",
   /**
    * @var {Boolean} m_status
    */
   m_status : true,
   /**
    * @var {Integer} m_serial
    */
   m_serial : -1,
   /**
    * @var {Boolean} m_isFinal
    */
   m_isFinal : true,
   /**
    * @var {Integer} m_errorCode
    */
   m_errorCode : -1,
   /**
    * @var {String} m_errorString
    */
   m_errorString : "",
   /**
    * @var {Ext.util.HashMap} m_data
    */
   m_data : null,
   /**
    * @var {String} m_extraData
    */
   m_extraData : "",
   
   constructor : function(signature, status)
   {
      this.m_signature = signature;
      this.m_status = status;
      this.m_data = new Ext.util.HashMap();
   },
   
   setSignature : function(signature)
   {
      this.m_signature = signature;
      return this;
   },
   
   getSignature : function()
   {
      return this.m_signatire;
   },
   
   setStatus : function(status)
   {
      this.m_status = status;
      return this;
   },
   
   getStatus : function()
   {
      return this.m_status;
   },
   
   setSerial : function(serial)
   {
      this.m_serial = serial;
      return this;
   },
   
   getSerial : function()
   {
      return this.m_serial;
   },
   
   setIsFinal : function(flag)
   {
      this.m_isFinal = flag;
      return this;
   },
   
   getIsFinal : function()
   {
      return this.m_isFinal;
   },
   
   setErrorCode : function(code)
   {
      this.m_errorCode = code;
      return this.m_errorCode;
   },
   
   getErrorCode : function()
   {
      return this.m_errorCode;
   },
   
   setErrorString : function(errorString)
   {
      this.m_errorString = errorString;
      return this;
   },
   
   getErrorString : function()
   {
      return this.m_errorString;
   },
   
   setDataItem : function(key, value)
   {
      this.m_data.add(key, value);
      return this;
   },
   
   getDataItem : function(key)
   {
      return this.m_data.get(key);
   },
   
   getData : function()
   {
      return this.m_data;
   },
   
   setExtraData : function(data)
   {
      this.m_extraData = data;
      return this;
   },
   
   getExtraData : function()
   {
      return this.m_extraData;
   },
   
   destroy : function()
   {
      this.m_data.clear();
      Ext.destroy(this.m_data);
      delete this.m_data;
   }
});