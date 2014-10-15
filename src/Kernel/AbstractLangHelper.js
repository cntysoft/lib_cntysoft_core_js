/*
 * Cntysoft Cloud Software Team
 * 
 * @author SOFTBOY <cntysoft@163.com>
 * copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * license    http://www.cntysoft.com/license/new-bsd     New BSD License
 */
/**
 * 系统多语言处理抽象基类
 */
Ext.define('Cntysoft.Kernel.AbstractLangHelper', {
   /**
    * 语言数据
    *
    * @property {Object} data
    */
   data : {},
   /**
    * 获取指定的KEY的语言数据，支持点语法获取
    *
    *
    * 如果语言数据这样定义 :
    *
    *     {
     *         UI:{
     *             A : {
     *                 B : {
     *                     C : 'TEXT DATA'
     *                 }
     *             } 
     *         }
     *     }
    *
    * 那么可以通过一下方法获取语言数据
    *
    *     ...
    *     method : function()
    *     {
     *         alert(this.getText('A.B.C')));//alert TEXT DATA
     *     }
    */
   getText : function(key)
   {

      //局部化
      var data = this.data;
      if(Ext.isEmpty(key)){
         return data;
      }
      //根据KEY获取值 KEY可以按照名称空间组织 n1.n2.n3
      if(-1 == key.indexOf('.')){
         if(!Ext.isDefined(data[key])){
            Cntysoft.raiseError(Ext.getClassName(this), 'getText', key + ' is not exist');
         }
         return data[key];
      }
      var parts = key.split('.');
      var root = data;
      var part = parts.shift();
      while(part){
         if(!Ext.isDefined(root[part])){
            Cntysoft.raiseError(Ext.getClassName(this), 'getText', key + ' is not exist');
         }
         root = root[part];
         part = parts.shift();
      }
      return root;
   },
   /**
    * 获取所有语言的数据
    *
    * @return {Array}
    */
   getAllLangText : function()
   {
      return this.data;
   }
});