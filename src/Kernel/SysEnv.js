/*
 * Cntysoft Cloud Software Team
 *
 * @author SOFTBOY <cntysoft@163.com>
 * @copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * @license    http://www.cntysoft.com/license/new-bsd     New BSD License
 */
/**
 * 系统环境变量，一些共用的都可以在运行时在这里获取
 */
Ext.define('Cntysoft.Kernel.SysEnv', {
   extend : 'Ext.util.HashMap',
   /**
    * 构造函数
    * 把一些系统级别的变量放入系统变量
    */
   constructor : function()
   {
      this.callParent();
   },
   /**
    * 把一个变量放入环境变量对象中
    *
    * @param {string} key
    * @param {object} value
    * @return {Cntysoft.Kernel.SysEnv}
    * @throws Exception
    */
   set : function(key, value)
   {
      if(!Ext.isString(key)){
         Cntysoft.raiseError(
            Ext.getClassName(this),
            'get',
            'key must be type of string'
         );
      }
      this.add(key, value);
      return this;
   },
   /**
    * 替换一饿环境变量的值
    *
    * @param {string} key
    * @param {object} value
    * @return {Cntysoft.Kernel.SysEnv}
    * @throws Exception
    */
   replace : function(key, value)
   {
      if(!Ext.isString(key)){
         Cntysoft.raiseError(
            Ext.getClassName(this),
            'get',
            'key must be type of string'
         );
      }
      this.callParent([key, value]);
      return this;
   },
   /**
    * 获取系统环境变量
    *
    * @param {string} key
    * @return {object}
    */
   get : function(key)
   {
      if(!Ext.isString(key)){
         Cntysoft.raiseError(
            Ext.getClassName(this),
            'get',
            'key must be type of string'
         );
      }
      return this.callParent([key]);
   },
   /**
    * 删除一个环境变量
    * @param {string} key
    */
   del : function(key)
   {
      if(!Ext.isString(key)){
         Cntysoft.raiseError(
            Ext.getClassName(this),
            'del',
            'key must be type of string'
         );
      }
      return this.removeAtKey(key);
   }
});