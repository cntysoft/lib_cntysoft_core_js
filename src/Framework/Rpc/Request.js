/*
 * Cntysoft Cloud Software Team
 * 
 * @author SOFTBOY <cntysoft@163.com>
 * @copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * @license    http://www.cntysoft.com/license/new-bsd     New BSD License
 */
Ext.define("Cntysoft.Framework.Rpc.Request", {
   requires : [
      "Ext.util.MixedCollection"
   ],
   /**
    * @var {String} m_name
    */
   m_name: "",
   /**
    * @var {String} m_method
    */
   m_method: "",
   /**
    * @var {Object} m_args 传递的参数
    */
   m_args: null,
   /**
    * @var {String} m_extraData 额外的数据
    */
   m_extraData: "",
   /**
    * @var {Integer} m_serial
    */
   m_serial: -1,
   /**
    * @var {Integer} m_socketNum
    */
   m_socketNum: -1,
   
   constructor : function(name, method, args)
   {
      this.m_name = name;
      this.m_method = method;
      this.m_args = new Ext.util.MixedCollection();
      if(Ext.isObject(args)){
         Cntysoft.raiseError(Ext.getClassName(this), "constructor", "args must be object type");
      }
      if(!Ext.Object.isEmpty(args)){
         for(var key in args){
            this.m_args.add(key, args[key]);
         }
      }
   },
   
   setName : function(name)
   {
      this.m_name = name;
      return this;
   },
   
   getName : function()
   {
      return this.m_name;
   },
   
   setMethod : function(method)
   {
      this.m_nethod = method;
      return this;
   },
   
   getMethod : function()
   {
      return this.m_method;
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
   
   setSerial : function(serial)
   {
      this.m_serial = serial;
      return this;
   },
   
   getSerial : function()
   {
      return this.m_serial;
   },
   
   setSocketNum : function(socketNum)
   {
      this.m_socketNum = socketNum;
      return this;
   },
   
   getSocketNum : function()
   {
      return this.m_socketNum;
   },
   
   toJson : function()
   {
      var request = {
         name : this.m_name,
         method : this.m_method,
         serial : this.m_serial,
         socketNum : this.m_socketNum,
         extraData : this.m_extraData
      };
      var args = {};
      this.m_args.eachKey(function(key, item){
         args[key] = item;
      });
      request.args = args;
      return Ext.encode(request);
   },
   
   destroy : function()
   {
      this.m_args.clear();
      Ext.destroy(this.m_args);
      delete this.m_args;
   }
});