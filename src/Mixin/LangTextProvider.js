/*
 * Cntysoft Cloud Software Team
 * 
 * @author SOFTBOY <cntysoft@163.com>
 * copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * license    http://www.cntysoft.com/license/new-bsd     New BSD License
 */
/**
 * 通用的语言提供Mixin类， 让想拥有语言需求的类都具有自己的语言对象的能力
 */
Ext.define('Cntysoft.Mixin.LangTextProvider',{
   /**
    * @property {Object} LANG_TEXT 语言对象
    */
   LANG_TEXT : null,
   /**
    * @property {String} LANG_CLS 要加载的语言类名称空间
    */
   LANG_NAMESPACE : '',
   constructor : function()
   {
      if(Ext.isString(this.LANG_NAMESPACE)){
         if('' == Ext.String.trim(this.LANG_NAMESPACE)){
            Cntysoft.raiseError(
               Ext.getClassName(this),
               'constructor',
               'LANG_NAMESPACE canot be empty'
            );
         }
      }
      //可以不进行处理
      this.setupLangNamespace();
   },
   /**
    * @template
    * 设置语言名称空间
    */
   setupLangNamespace : Ext.emptyFn,

   /**
    * 获取APP对象的语言信息
    * {@link Cntysoft.Kernel.AbstractLangHelper#getText}
    *
    * @param {String} key
    * @return {Object}
    */
   GET_LANG_TEXT : function(key)
   {
      var lang = this.getLangObj();
      return lang.getText(key);
   },
   /**
    * 获取根语言对象引用
    *
    * @return {Object}
    */
   GET_ROOT_LANG_TEXT : function()
   {
      var lang = this.getLangObj();
      return lang.getAllLangText();
   },

   /**
    * 获取语言对象
    *
    * @return {Cntysoft.Kernel.AbstractLangHelper}
    */
   getLangObj : function()
   {
      var lang;
      if(Ext.isString(this.LANG_NAMESPACE)){
         if(!Cntysoft.LangManager.hasLang(this.LANG_NAMESPACE)){
            Cntysoft.LangManager.register(this.LANG_NAMESPACE, Ext.create(this.LANG_NAMESPACE+'.'+Cntysoft.getLangType()));
         }
         lang = Cntysoft.LangManager.getLang(this.LANG_NAMESPACE);
      }else if(Ext.isArray(this.LANG_NAMESPACE)){
         var langs = this.LANG_NAMESPACE;
         var len = langs.length;
         var langKey = langs[len - 1];
         if(!Cntysoft.LangManager.hasLang(langKey)){
            var curLang;
            for(var i = 0; i < len; i++){
               curLang = Ext.create(langs[i]+'.'+Cntysoft.getLangType());
               if(i == 0){
                  lang = curLang;
               }else{
                  lang.merge(curLang);
               }
            }
            Cntysoft.LangManager.register(langKey, lang);
         }
         lang = Cntysoft.LangManager.getLang(langKey);
      }
      return lang;
   },

   destroy : function()
   {
      delete this.LANG_TEXT;
   }
});