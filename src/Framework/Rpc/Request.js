/*
 * Cntysoft Cloud Software Team
 * 
 * @author SOFTBOY <cntysoft@163.com>
 * @copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * @license    http://www.cntysoft.com/license/new-bsd     New BSD License
 */
Ext.define("Cntysoft.Framework.Rpc.Request", {
   requires : [
      "Ext.util.HashMap"
   ],
   /**
    * @var {String} name
    */
   name: "",
   /**
    * @var {String} method
    */
   method: "",
   /**
    * @var {Ext.util.HashMap} args 传递的参数
    */
   args: null,
   /**
    * @var {String} extraData 额外的数据
    */
   extraData: "",
   /**
    * @var {Integer} serial
    */
   serial: -1,
   /**
    * @var {Integer} socketNum
    */
   socketNum: -1,
   
   constructor : function(name, method, args)
   {
      this.name = name;
      this.method = method;
      this.args = new Ext.util.HashMap();
      if(Ext.isObject(args)){
         Cntysoft.raiseError(Ext.getClassName(this), "constructor", "args must be object type");
      }
      if(!Ext.Object.isEmpty(args)){
         for(var key in args){
            this.args.add(key, args[key]);
         }
      }
   },
   
   setName : function(name)
   {
      this.name = name;
      return this;
   },
   
   getName : function()
   {
      return this.name;
   },
   
   setMethod : function(method)
   {
      this.method = method;
      return this;
   },
   
   getMethod : function()
   {
      return this.method;
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
   
   setSerial : function(serial)
   {
      this.serial = serial;
      return this;
   },
   
   getSerial : function()
   {
      return this.serial;
   },
   
   setSocketNum : function(socketNum)
   {
      this.socketNum = socketNum;
      return this;
   },
   
   getSocketNum : function()
   {
      return this.socketNum;
   },
   
   toJson : function()
   {
      var request = {
         name : this.name,
         method : this.method,
         serial : this.serial,
         socketNum : this.socketNum,
         extraData : this.extraData
      };
      var args = {};
      this.args.each(function(key, item){
         args[key] = item;
      });
      request.args = args;
      return Ext.encode(request);
   },
   
   destroy : function()
   {
      this.args.clear();
      Ext.destroy(this.args);
      delete this.args;
   }
});