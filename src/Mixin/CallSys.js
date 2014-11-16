/**
 * Cntysoft Cloud Software Team
 *
 * @author SOFTBOY <cntysoft@163.com>
 * copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * license    http://www.cntysoft.com/license/new-bsd     New BSD License
 */
/**
 * 进行服务器端脚本调用,主要是针对Framework层次的调用
 */
Ext.define('Cntysoft.Mixin.CallSys', {
   /**
    * @property {String} scriptName 调用的scriptName的服务器端类的名称
    */
   scriptName : null,
   /**
    * 调用系统服务器端的API函数， 一般是一些Framework提供给WEBOS端进行调用
    *
    * @param {String} method
    * @param {Object} params
    * @param {Function} callback
    * @param {Object} scope
    */
   callSys : function(method, params, callback, scope)
   {
      var params = params || {};
      scope = scope || this;
      Cntysoft.callSys(
         this.scriptName,
         method, params,
         callback,
         scope
      );
   },

   /**
    * 同步调用服务器端的SysHandler的API函数
    *
    * @param {String} method
    * @param {Object} params
    */
   callSysSync : function(method, params)
   {
      params = params || {};
      return Cntysoft.callSysSync(this.scriptName, method, params);
   }
});