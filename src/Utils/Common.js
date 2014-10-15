/*
 * 系统一些通用的函数
 * 
 * @class Cntysoft.Kernel.Utils
 * @singleton
 * @author     SOFTBOY <cntysoft@163.com>
 * copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * license    http://www.cntysoft.com/license/new-bsd     New BSD License
 */
Ext.define('Cntysoft.Utils.Common', {
   requires : [
      'Cntysoft.Framework.Security.Hash.Sha'
   ],
   statics : {
      /**
       * 生成一个集合，主要进行一些检查
       *
       * @param {object} items
       * @param {Function} keyFn
       * @return {Ext.util.MixedCollection}
       */
      generateCollection : function(items, keyFn)
      {
         var keyFn = Ext.isFunction(keyFn)
            ? keyFn
            : function(config){
            return config.module + '.' + config.name;
         };
         var collection = new Ext.util.MixedCollection(false, keyFn);
         if(!Ext.isEmpty(items)){
            Ext.each(items, function(item){
               collection.add(item);
            });
         }
         return collection;
      },
      /**
       * 添加一个样式表
       *
       * @param {string} cssId 样式表的识别id
       * @param {string} cssUrl 样式表的url
       * @return {CSSStyleSheet}
       */
      createStyleSheet : function(cssId, cssUrl)
      {
         var doc = document, ss;
         ss = doc.createElement("link");
         ss.setAttribute("rel", "stylesheet");
         ss.setAttribute("type", "text/css");
         ss.setAttribute("id", cssId);
         ss.setAttribute("href", cssUrl);
         doc.getElementsByTagName("head")[0].appendChild(ss);
         return ss;
      },
      /**
       * @param {String} id
       */
      removeStyleSheet : Ext.Function.alias(Ext.util.CSS, 'removeStyleSheet'),
      /**
       * 将指定的密码用sha256算法处理
       *
       * @param {String} password
       * @return {String}
       */
      hashPwd : function(password)
      {
         var hasher = new Cntysoft.Framework.Security.Hash.Sha(password, 'ASCII');
         var ret = hasher.getHash('SHA-256', 'HEX');
         hasher.destroy();
         return ret;
      },
      /**
       * 获取密码强度
       *
       * @param {String} username
       * @param {String} password
       * @return {Integer}
       */
      markPwdDegree : function(username, password)
      {
         var score = 0;
         if(password.length < 4){
            return -4;
         }
         if(typeof (username) != 'undefined' && password.toLowerCase() == username.toLowerCase()){
            return -2;
         }
         score += password.length * 4;
         score += (this.repeatString(1, password).length - password.length) * 1;
         score += (this.repeatString(2, password).length - password.length) * 1;
         score += (this.repeatString(3, password).length - password.length) * 1;
         score += (this.repeatString(4, password).length - password.length) * 1;
         if(password.match(/(.*[0-9].*[0-9].*[0-9])/)){
            score += 5;
         }
         if(password.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)){
            score += 5;
         }
         if(password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)){
            score += 10;
         }
         if(password.match(/([a-zA-Z])/) && password.match(/([0-9])/)){
            score += 15;
         }
         if(password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([0-9])/)){
            score += 15;
         }
         if(password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([a-zA-Z])/)){
            score += 15;
         }
         if(password.match(/^\w+$/) || password.match(/^\d+$/)){
            score -= 10;
         }
         if(score < 0){
            score = 0;
         }
         if(score > 100){
            score = 100;
         }
         return score;
      },
      /**
       * @private
       */
      repeatString : function(len, str)
      {
         var res = "";
         for(var i = 0; i < str.length; i++) {
            var repeated = true;
            for(var j = 0, max = str.length - i - len; j < len && j < max; j++) {
               repeated = repeated && (str.charAt(j + i) == str.charAt(j + i + len));
            }
            if(j < len)
               repeated = false;
            if(repeated){
               i += len - 1;
               repeated = false;
            } else{
               res += str.charAt(i);
            }
         }
         return res;
      },
      /**
       * 重新加载指定的gridu页面
       *
       * @param {Ext.data.Store} store
       * @param {Object} params 重新加载时候的参数
       */
      reloadGridPage : function(store, params)
      {
         var totalPage = Math.ceil(store.getTotalCount() / store.pageSize);
         var currentPage = store.currentPage;
         store.addListener('load', function(store, records){
            if(totalPage == currentPage && currentPage > 1 && records.length == 0){
               store.currentPage = currentPage - 1;
               if(params){
                  store.load({
                     params : params
                  });
               }
               store.load();
            }
         }, this, {
            single : true
         });
         if(params){
            store.load({
               params : params
            });
         }else {
            store.load();
         }
      },
      /**
       * 获取当前的
       */
      getTimeStamp : function ()
      {
         return Math.round(new Date().getTime()/1000);
      },

      /**
       * 判断一个字母是否为大写
       *
       * @param {String} c
       * @return {Boolean}
       */
      isUpperCase : function(c)
      {
         return 'A' <= c && c <= 'Z';
      },

      /**
       * @param {Integer} timestamp
       * @return {String}
       */
      formatTimestamp2str : function(timestamp)
      {
         return Ext.Date.format(new Date(timestamp), 'Y-m-d H:i:s');
      }
   }

});