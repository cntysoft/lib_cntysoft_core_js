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
        var isSync = (callback && Ext.isFunction(callback)) ? false : true;
        scope = scope || this;
        if(isSync){
            return Cntysoft.callSys(this.scriptName, method, params, true);
        } else{
            return Cntysoft.callSys(
            this.scriptName,
            method, params, false,
            callback,
            scope
            );
        }
    }
});