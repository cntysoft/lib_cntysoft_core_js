/*
 * Cntysoft Cloud Software Team
 *
 * @author SOFTBOY <cntysoft@163.com>
 * @copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * @license    http://www.cntysoft.com/license/new-bsd     New BSD License
 */
Ext.define('Cntysoft.Kernel.LangManager',{
   extend : 'Ext.util.HashMap',
   singleton : true,
   /**
    * @param {String} key
    * @param {Cntysoft.Kernel.AbstractLangHelper} lang
    */
   register : function(key, lang)
   {
      if(this.hasLang(key)){
         Cntysoft.raiseError(Ext.getClassName(this), 'register', 'Lang Object '+key + ' already exist');
      }
      this.add(key, lang);
   },
   /**
    * 获取指定的语言对象
    *
    * @param {String} key
    * @return {Cntysoft.Kernel.AbstractLangHelper}
    * @throws {Ext.Error}
    */
   getLang : function(key)
   {
      if(this.hasLang(key)){
         return this.get(key);
      }else{
         Cntysoft.raiseError(Ext.getClassName(this), 'getLang', 'Lang Object '+key + ' is not exist');
      }
   },
   /**
    * 判断是否具有指定的语言对象
    *
    * @param {String} key
    * @return {Boolean}
    */
   hasLang : function(key)
   {
      return this.containsKey(key);
   }
},function(langManager){
   Ext.apply(Cntysoft,{
      LangManager : langManager
   });
});