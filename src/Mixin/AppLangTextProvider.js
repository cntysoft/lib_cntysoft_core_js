/*
 * Cntysoft Cloud Software Team
 * 
 * @author SOFTBOY <cntysoft@163.com>
 * copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * license    http://www.cntysoft.com/license/new-bsd     New BSD License
 */
/**
 * 这个让使用这个mixin的类具有访问指定Runable的语言数据的接口
 */
Ext.define('Cntysoft.Mixin.AppLangTextProvider', {
   /**
    * 目标Runable的元信息,
    *
    * @property {Array| String} appKey
    */
   appKey : null,
   /**
    * @property {Object} LANG_TEXT 语言对象
    */
   LANG_TEXT : null,
   /**
    * 获取APP对象的语言信息
    * {@link Cntysoft.Kernel.AbstractLangHelper#getText}
    *
    * @param {String} key
    * @return {Object}
    */
   GET_LANG_TEXT : function(key)
   {
      var lang;
      var langKey = this.appKey;
      if(Ext.isArray(langKey)){
         var len = langKey.length;
         var keyItem;
         for(var i = 0; i < len; i++) {
            keyItem = 'App.'+langKey[i];
            if(!Cntysoft.LangManager.hasLang(keyItem)){
               this.loadLang(keyItem);
            }
            lang = Cntysoft.LangManager.getLang(keyItem);
            try {
               return lang.getText(key);
            } catch (e) {
               continue;
            }
         }
         Cntysoft.raiseError(Ext.getClassName(this), 'GET_LANG_TEXT', key + ' is not exist');
      } else{
         langKey = 'App.'+langKey;
         if(!Cntysoft.LangManager.hasLang(langKey)){
            this.loadLang(langKey);
         }
         lang = Cntysoft.LangManager.getLang(langKey);
         return lang.getText(key);
      }
   },
   /**
    * 获取根语言对象引用
    *
    * @return {Object}
    */
   GET_ROOT_LANG_TEXT : function()
   {
      var lang;
      var langKey = this.appKey;
      if(!Cntysoft.LangManager.hasLang(langKey)){
         this.loadLang(langKey);
      }
      lang = Cntysoft.LangManager.getLang(langKey);
      return lang.getAllLangText();
   },
   /**
    * 加载语言对象
    */
   loadLang : function(key)
   {
      var cls = key+'.Lang.'+Christ.getLangType();
      Cntysoft.LangManager.register(key, Ext.create(cls));
   },
   destroy : function()
   {
      delete this.LANG_TEXT;
   }
});