/*
 * Cntysoft Cloud Software Team
 *
 * @author SOFTBOY <cntysoft@163.com>
 * copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * license    http://www.cntysoft.com/license/new-bsd     New BSD License
 */
/**
 * Cntysoft SmartPlatform API 请求类定义
 */
Ext.define('Cntysoft.Framework.Net.Request', {
   statics : {
      API_CALL_APP : [
         'module',
         'name',
         'method'
      ],
      API_CALL_SYS : [
         'name',
         'method'
      ]
   },
   /**
    * 快速类型判断
    *
    * @property {Boolean} isRequest
    */
   isRequest : true,
   /**
    * 请求的回调函数
    *
    * @property {Object} callbacks
    */
   callbacks : {},
   /**
    * 数据调用是否未同步调用
    *
    * @property {boolean} sync
    */
   sync : false,
   /**
    *通信的类型
    *
    * @property {string} type
    */
   type : 'Sys',
   /**
    * 请求元数据
    *
    * @property {array} callData
    */
   callData : {},
   /**
    *请求参数
    *
    * @property {Ext.util.HashMap} params
    */
   params : null,
   /**
    * 本次请求的用户名称
    *
    * @property {String} username
    */
   username : null,
   /**
    * 本次请求的密码
    *
    * @property {String} password
    */
   password : null,
   /**
    * 构造函数 创建新的请求对象
    *
    * @param {String} type
    */
   constructor : function(type)
   {
      GATEWAY = Ext.getClass(Cntysoft.Framework.Net.Gateway);
      if(GATEWAY.isValidType('Sys')){
         this.type = type;
      }
      this.params = new Ext.util.HashMap();
   },
   /**
    * 设置是否为同步请求
    *
    * @param  {Boolean} flag
    * @return {Cntysoft.Framework.Net.Request}
    */
   setSync : function(flag)
   {
      this.sync = !!flag;
      return this;
   },
   /**
    * 设置调用的元信息
    *
    * @param {String} info
    * @param {String} type
    * @throws {Exception}
    */
   setInvokeInfo : function(info, type)
   {
      var GATEWAY = Ext.getClass(Cntysoft.Framework.Net.Gateway);
      var type = type ? type : this.type;
      if(!GATEWAY.isValidType(type)){
         Ext.Error.raise({
            sourceClass : Ext.getClassName(this),
            sourceMethod : 'setInvokeInfo',
            msg : 'invoke type ' + type + 'is not supported'
         });
         Cntysoft.raiseError(
            Ext.getClassName(this),
            'setInvokeInfo',
            'invoke type ' + type + 'is not supported'
         );
      }
      if(!this.checkInvokeInfo(info, type)){
         Cntysoft.raiseError(
            Ext.getClassName(me),
            'setInvokeInfo',
            'invoke info format error'
         );
      }
      this.callData[type] = info;
      return this;
   },
   /**
    * 获取调用类型
    *
    * @return {String}
    */
   getCallType : function()
   {
      return this.type;
   },
   /**
    * 获取调用信息
    *
    * @param  {String} type
    * @return {Object}
    */
   getInvokeInfo : function(type)
   {
      var callData = this.callData;
      var type = type ? type : this.type;
      if(!Ext.isDefined(callData[type])){
         return null;
      } else{
         return callData[type];
      }
   },
   /**
    * 设置数据请求参数，这些参数将会转换成JSON数据传递给服务器端
    *
    * @param {String} name
    * @param {Mixed} value
    */
   set : Ext.Function.flexSetter(function(name, value)
   {
      this.params.add(name, value);
      return this;
   }),
   /**
    * 获取请求参数
    *
    * @param  {String} key
    * @return {null | mixed}
    */
   get : function(key, defaultValue)
   {
      if(null == key){
         return this.params;
      }
      return Ext.containsKey(key)
         ? this.params.get(key) : null == defaultValue ? null : defaultValue;
   },
   /**
    * 获取所有的调用参数
    *
    * @return {Object}
    */
   getParams : function()
   {
      return this.params;
   },
   /**
    *判断是否为APP请求对象
    *
    *@return {Boolean}
    */
   isTypeAppCall : function()
   {
      var GATEWAY = Cntysoft.Framework.Net.Gateway;
      /**
       * 可能出现问题 class not exist
       */
      return me.type == GATEWAY.CALL_TYPE_APP;
   },
   /**
    *判断是否为Sys请求对象
    *
    * @return {Boolean}
    */
   isTypeSysCall : function()
   {
      var GATEWAY = Cntysoft.Framework.Net.Gateway;
      return this.type == GATEWAY.CALL_TYPE_SYS;
   },
   /**
    * 判断是否为同步调用
    *
    * @return {Boolean}
    */
   isSync : function()
   {
      return this.sync;
   },
   /**
    * 设置信息回调函数
    *
    * @param  {Object} callbacks
    * @return {Cntysoft.Framework.Net.Request}
    */
   setCallbacks : function(callbacks)
   {
      var success = Ext.isDefined(callbacks.success) && Ext.isFunction(callbacks.success)
         ? callbacks.success
         : Ext.emptyFn;
      var failure = Ext.isDefined(callbacks.failure) && Ext.isFunction(callbacks.failure)
         ? callbacks.failure
         : Ext.emptyFn;
      var callback = Ext.isDefined(callbacks.callback) && Ext.isFunction(callbacks.callback)
         ? callbacks.callback
         : Ext.emptyFn;
      var scope = callbacks.scope ? callbacks.scope : this;
      this.callbacks = {
         success : success,
         failure : failure,
         callback : callback,
         scope : scope
      };
      return this;
   },
   /**
    * 获取系统的回调函数
    *
    * @return {Object}
    */
   getCallbacks : function()
   {
      return this.callbacks;
   },
   /**
    * 设置请求用户名称
    *
    * @param  {String} username
    * @return {Cntysoft.Framework.Net.Request}
    */
   setUserName : function(username)
   {
      this.username = username;
      return this;
   },
   /**
    * 获取请求的用户名称
    *
    * @return {String}
    */
   getUserName : function()
   {
      return this.username;
   },
   /**
    * 设置请求密码
    *
    * @param  {String} password
    * @return {Cntysoft.Framework.Net.Request}
    */
   setPassword : function(password)
   {
      this.password = password;
      return this;
   },
   /**
    * 获取请求密码
    *
    * @return {String}
    */
   getPassword : function()
   {
      return this.password;
   },
   /**
    * 检查数据调用对象格式
    *
    * @private
    * @param {Object} info
    * @param {String} type
    * @return {Boolean}
    */
   checkInvokeInfo : function(info, type)
   {
      var S = this.self;
      var GATEWAY = Cntysoft.Framework.Net.Gateway;
      var fields;
      if(type == GATEWAY.CALL_TYPE_SYS){
         fields = S.API_CALL_SYS;
      } else if(type == GATEWAY.CALL_TYPE_APP){
         fields = S.API_CALL_APP;
      }
      for(var field in fields) {
         if(!info.hasOwnProperty(field)){
            return false;
         }
      }
      return true;
   }

});
