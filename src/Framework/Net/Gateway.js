/*
 * Cntysoft Cloud Software Team
 *
 * @author SOFTBOY <cntysoft@163.com>
 * copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * license    http://www.cntysoft.com/license/new-bsd     New BSD License
 */
/**
 * 系统通信网关类定义，思考一个问题在这里传递信息是通过事件呢？还是通过回调函数呢？
 */
Ext.define('Cntysoft.Framework.Net.Gateway', {
   requires : [
      'Cntysoft.Framework.Net.Connection',
      'Cntysoft.Kernel.Utils',
      'Cntysoft.Utils.Common'
   ],
   singleton : true,
   statics : {
      /**
       * 这个调用类型是系统框架进行响应的类型
       */
      CALL_TYPE_SYS : 'Sys',
      /**
       * 这个类型服务器端是响应的APP程序进行响应
       */
      CALL_TYPE_APP : 'App',
      /**
       * 获取系统支持的调用类型
       *
       * @return {String[]}
       */
      getSupportCallTypes : function(){
         return [
            this.CALL_TYPE_APP,
            this.CALL_TYPE_SYS
         ];
      },
      /**
       * 验证是否为合法的数据调用类型
       *
       * @param  {String} type
       * @return {Boolean}
       */
      isValidType : function(type){
         return Ext.Array.contains(this.getSupportCallTypes(), type);
      }
   },
   /**
    * 不安全的类型判断
    *
    * @property {Boolean} isGateway
    */
   isGateway : true,
   /**
    * 底层数据链接服务对象
    *
    * @property {Cntysoft.Framework.Net.Connection} connection
    */
   connection : null,
   /**
    * 本次请求的获取的数据
    *
    * @property {Object} response
    */
   response : null,
   /**
    * 进行一次远程数据调用,底层调用接口
    *
    * @private
    * @param  {Cntysoft.Framework.Net.Request} Request
    * @return {Cntysoft.Framework.Net.Request|Object}
    */
   call : function(request)
   {
      /**
       * 不可靠的类型判断
       */
      if(!request.isRequest){
         Cntysoft.raiseError(
            Ext.getClassName(me),
            'call',
            'Argument type error'
         );
      }
      /**
       * 这里同步数据的获取通过一个类字段获取
       */
      this.connection.request(request);
      if(request.isSync()){
         return this.response;
      } else{
         return request;
      }
   },
   /**
    * 调用App数据接口
    *
    * callback 接受的参数
    * (success,data)
    * 当调用成功是data存放了服务器返回的数据
    * 当调用失败的时候data存放了出错信息
    *
    * @param {String} module
    * @param {String} name
    * @param {String} method
    * @param {Object} params
    * @param {Function} callback
    * @param {Object} scope
    * @return {Object}
    */
   callApp : function(module, name, method, params, callback, scope)
   {
      var S = this.self;
      var request = new Cntysoft.Framework.Net.Request(S.CALL_TYPE_APP);
      var fn = this.getCallback(callback, scope);
      request.setCallbacks({
         callback : fn,
         scope : this
      });
      request.setSync(false);
      request.set(params);
      request.setInvokeInfo({
         module : module,
         name : name,
         method : method
      });
      return this.call(request);
   },

   /**
    * 同步调用App数据接口
    *
    * callback 接受的参数
    * (success,data)
    * 当调用成功是data存放了服务器返回的数据
    * 当调用失败的时候data存放了出错信息
    *
    * @param {String} module
    * @param {String} name
    * @param {String} method
    * @param {Object} params
    * @return {Object}
    */
   callAppSync : function(module, name, method, params)
   {
      var S = this.self;
      var request = new Cntysoft.Framework.Net.Request(S.CALL_TYPE_APP);
      var fn = this.getCallback(Ext.emptyFn, this);
      request.setCallbacks({
         callback : fn,
         scope : this
      });
      request.setSync(true);
      request.set(params);
      request.setInvokeInfo({
         module : module,
         name : name,
         method : method
      });
      return this.call(request);
   },

   /**
    * 调用系统框架数据接口
    *
    * callback 接受的参数
    * (success,data)
    * 当调用成功是data存放了服务器返回的数据
    * 当调用失败的时候data存放了出错信息
    *
    * @param {String} name
    * @param {String} method
    * @param {Object} params
    * @param {Boolean} sync
    * @param {Function} callback
    * @param {Object} scope
    * @return {Object}
    */
   callSys : function(name, method, params, callback, scope)
   {
      var S = this.self;
      var request = new Cntysoft.Framework.Net.Request(S.CALL_TYPE_SYS);
      var fn = this.getCallback(callback, scope);
      request.setCallbacks({
         callback : fn,
         scope : this
      });
      request.setSync(false);
      request.set(params);
      request.setInvokeInfo({
         name : name,
         method : method
      });
      return this.call(request);
   },

   /**
    * 调用系统框架数据接口
    *
    * callback 接受的参数
    * (success,data)
    * 当调用成功是data存放了服务器返回的数据
    * 当调用失败的时候data存放了出错信息
    *
    * @param {String} name
    * @param {String} method
    * @param {Object} params
    * @return {Object}
    */
   callSysSync : function(name, method, params)
   {
      var S = this.self;
      var request = new Cntysoft.Framework.Net.Request(S.CALL_TYPE_SYS);
      var fn = this.getCallback(Ext.emptyFn, this);
      request.setCallbacks({
         callback : fn,
         scope : this
      });
      request.setSync(true);
      request.set(params);
      request.setInvokeInfo({
         name : name,
         method : method
      });
      return this.call(request);
   },

   /**
    * 获取三种情况的回调函数
    *
    * @private
    * @param  {Function} callback
    * @return {Function}
    */
   getCallback : function(callback, scope)
   {
      /**
       * 在这里的回调函数进行点修正
       */
      scope = scope ? scope : this;
      var me = this;
      var data;
      var fn = function(options, success, response){
         //根据成功与否构造返回数据
         if(!success){
            //失败默认返回错误信息ExtJs自己封装过后的数据
            data = response;
            //在这里抛出异常
            Cntysoft.raiseError(
               Ext.getClassName(this),
               'callSys',
               Cntysoft.GET_LANG_TEXT('ERROR.API_CALL_ERR')
            );
         } else{
            //获取            我们系统返回的相关数据
            //本系统所有API调用都是以JSON数据的方式进行返回
            data = Ext.decode(response.responseText);

         }
            //检查是否登录过期
            if(false == data.status){
                if(WebOs.isReady()){
                    if(data.errorCode == 59){
                        Cntysoft.showErrorWindow(Cntysoft.GET_LANG_TEXT('MSG.MULTI_LOGIN_FAIL'), function(){
                            WebOs.logout(null, true);
                        }, this);
                        //停止投递
                        return;
                    }else if(data.errorCode == 60 || data.authFail){
                         Cntysoft.showErrorWindow(Cntysoft.GET_LANG_TEXT('MSG.SYS_AUTH_FAIL'), function(){
                            WebOs.logout(null, true);
                        }, this);
                        //停止投递
                        return;
                    }

                }
            }
         //@todo 是否处理逻辑错误
         //data.status == false的情况
         if(!options.async){
            me.response = data;
         } else{
            //回调函数调用
            Ext.callback(callback, scope, [data]);
         }
      };
      return fn;
   },
   /**
    * 资源清除
    */
   destroy : function()
   {
      delete this.connection;
      delete this.data;
   }

}, function(){
   var alias =  Ext.Function.alias;
   /**
    * 建立别名
    */
   Ext.apply(Cntysoft,{
      DataGateway : this,
      callApp : alias(this, 'callApp'),
      callSys : alias(this, 'callSys'),
      callAppSync : alias(this, 'callAppSync'),
      callSysSync : alias(this, 'callSysSync')
   });
   this.connection = Cntysoft.Framework.Net.Connection;
});
