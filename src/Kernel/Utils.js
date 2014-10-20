/*
 * Cntysoft Cloud Software Team
 * 
 * @author SOFTBOY <cntysoft@163.com>
 * copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * license    http://www.cntysoft.com/license/new-bsd     New BSD License
 */
/**
 * 内核一些帮助函数, 这些函数只由系统调用方便才使用
 *
 * @class Cntysoft.Kernel.Utils
 * @singleton
 */
Ext.define('Cntysoft.Kernel.Utils',{
   singleton : true,
   /**
    * 生成一个错误对象
    * @return {boolean}
    */
   generateErrorObj : function(msg, ext, level)
   {
      //进行一些基本的保证
      level = Ext.isNumber(level) ? level : Cntysoft.Const.ERROR_LEVEL_RUNTIME;
      var error = {
         status : false,
         msg : msg,
         level : level
      };
      if(Ext.isObject(ext)){
         Ext.appyIf(level, ext);
      }
      return error;
   },
   /**
    * 方法没有被实现
    *
    * @param {String} cls
    * @param {String} method
    * @throw {Exception}
    */
   methodNotSupported : function(cls, method)
   {
      Cntysoft.raiseError(
         cls,
         method,
         'class : ' + cls + ' method : ' + method + ' is not supported'
      );
   },
   /**
    * 处理API调用出错的情况
    *
    * @param {Object} response API调用响应对象
    * @param {Object} errorMap 指定的错误代码与描述信息映射数据
    * @param {Object} errorMapArgs 提供给ErrorMap的参数
    */
   processApiError : function(response, errorMap, errorMapArgs, callback, scope)
   {
      if(!response.status){
         var msg;
         var desMsg;
         var errorCode = response.errorCode;
         var context = response.errorInfo.context;
         if(window.CNTYSOFT_IS_DEBUG){
            msg = response.msg;
         } else{
            msg = Cntysoft.GET_LANG_TEXT('ERROR.API_CALL_ERROR');
         }
         desMsg = msg;
         if(errorMap){
            //上下文有关
            if(context){
               errorMap = errorMap[context];
               if(errorMapArgs && errorMapArgs[context]){
                  //容错
                  errorMapArgs = errorMapArgs[context];
               }
            }
            if(errorMap[errorCode]){
               if(errorMapArgs && errorMapArgs[errorCode]){
                  var args = errorMapArgs[errorCode];
                  if(!Ext.isArray(args)){
                     Cntysoft.raiseError(
                        Ext.getClassName(this),
                        'processApiError',
                        'errorMap args item must be the type of array'
                     );
                  }
                  args.unshift(errorMap[errorCode]);
                  desMsg = Ext.String.format.apply(Ext.String, args);
               } else{
                  desMsg = errorMap[errorCode];
               }
            }
         }
         Cntysoft.showErrorWindow(desMsg, callback, scope);
         if(window.CNTYSOFT_IS_DEBUG){
            Cntysoft.raiseError(
               Ext.getClassName(this),
               'processApiError',
               msg
            );
         }
      }
   },
   /**
    * 根据树的节点获取节点的数据
    */
   getTreePath : function(node)
   {
      var nodes = [node.get('id')];
      while(node.parentNode){
         node = node.parentNode;
         nodes.push(node.get('id'));
      }
      nodes.reverse();
      return '/' + nodes.join('/');
   }
}, function(){
   var alias =  Ext.Function.alias;
   /**
    * 建立别名
    */
   Ext.apply(Cntysoft,{
      processApiError : alias(this, 'processApiError')
   });
})