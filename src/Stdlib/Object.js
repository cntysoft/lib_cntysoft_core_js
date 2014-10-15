/*
 * Cntysoft Cloud Software Team
 *
 * @author SOFTBOY <cntysoft@163.com>
 * copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * license    http://www.cntysoft.com/license/new-bsd     New BSD License
 */
/**
 * 一些数组相关的函数
 */
Ext.define('Cntysoft.Stdlib.Object', {
   statics : {
      /**
       * 判断一个对象是否具有指定的字段
       *
       * @param {Object} object
       * @param {Array} keys
       * @return {Boolean}
       */
      hasRequireKeys : function(object, keys)
      {
         for(var i = 0; i < keys.length; i++) {
            if(!object.hasOwnProperty(keys[i])){
               return false;
            }
         }
         return true;
      },
      /**
       * 确保必要字段存在， 如果不存在则抛出异常
       *
       * @param {Object} object
       * @param {Array} keys
       */
      ensureRequireKeys : function(object, keys)
      {
         var leaks = [];
         for(var i = 0; i < keys.length; i++) {
            if(!object.hasOwnProperty(keys[i])){
               leaks.push(keys[i]);
            }
         }
         if(leaks.length > 0){
            Cntysoft.raiseError(
               Ext.getClassName(this),
               'ensureRequireKeys',
               'Target object need fields : [' + leaks.join(',')+' ]'
            );
         }
      },
      /**
       * @param {Object} Object 被检查的权限树
       * @param {String} path 有待检查的检查项
       * @return {Boolean}
       */
      hasKeyPath : function(object, path)
      {
         //处理查询键
         var parts = path.split('.');
         var part;
         while(part = parts.shift()){
            if(!object.hasOwnProperty(part)){
               return false;
            }
            object = object[part];
         }
         return true;
      },
      /**
       * 根据路径获取相应的对象
       *
       * @param {Object} object 被检查的对象
       * @param {String} path 查看的路径
       * @return {Object|null}
       */
      followPath : function(object, path)
      {
         if(!object){
            return null;
         }
         //处理查询键
         var parts = path.split('.');
         var part;
         while(part = parts.shift()){
            if(!object.hasOwnProperty(part)){
               Cntysoft.raiseError(
                  Ext.getClassName(this),
                  'followPath',
                  'path : ' + path + ' is not exist'
               );
            }
            object = object[part];
         }
         return object;
      },
      /**
       * 复制对象指定的字段数据
       */
      copyFields : function(object, fields)
      {
         return Ext.copyTo({}, object, fields.join(','));
      },
      /**
       * 去掉对象字符串字段的空格
       *
       * @return {Object}
       */
      trimFields : function(target)
      {
         var item;
         for(var key in target) {
            item = target[key];
            if(Ext.isString(item)){
               target[key] = Ext.String.trim(item);
            }
         }
         return target;
      }
   }
});