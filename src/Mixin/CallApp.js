/*
 * Cntysoft Cloud Software Team
 * 
 * @author SOFTBOY <cntysoft@163.com>
 * copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * license    http://www.cntysoft.com/license/new-bsd     New BSD License
 */
/**
 * 进行服务器端脚本调用,主要是针对App的AjaxHandler层次的调用
 */
Ext.define('Cntysoft.Mixin.CallApp', {
   /**
    * @property {String} module APP的所属模块
    */
   module : null,
   /**
    * @property {String} name APP的识别名称，这个值在所属模块中是唯一的
    */
   name : null,
   /**
    * 异步调用服务器端的应用的API函数
    *
    * @param {String} method
    * @param {Object} params
    * @param {Function} callback
    * @param {Object} scope
    */
   callApp : function(method, params, callback, scope)
   {
      params = params || {};
      var isSync = (callback && Ext.isFunction(callback)) ? false : true;
      callback = Ext.isFunction(callback) ? callback : Ext.emptyFn;
      scope = scope || this;
      Cntysoft.callApp(
         this.module, this.name,
         method, params,
         function(){
            callback.apply(scope, arguments);
            if(this.isApiInvoke){
               this.exit();
            }
         },
         this
      );
   },

   /**
    * 同步调用服务器端的应用的API函数
    *
    * @param {String} method
    * @param {Object} params
    */
   callAppSync : function(method, params)
   {
      params = params || {};
      if(this.isApiInvoke){
         this.exit();
      }
      return Cntysoft.callAppSync(this.module, this.name, method, params);
   }
});