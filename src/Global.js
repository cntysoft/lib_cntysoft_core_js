Ext.define('Cntysoft.Global',{
   singleton : true,

   /**
    * 显示脚本加载提示信息对象
    */
   showLoadScriptMask : function()
   {
      Ext.getBody().mask(Cntysoft.GET_LANG_TEXT('MSG.LOAD_SCRIPT'));
   },
   /**
    * 隐藏脚本加载提示信息对象
    */
   hideLoadScriptMask : function()
   {
      Ext.getBody().unmask();
   },

   /**
    * 探测浏览器类型
    *
    * @param {Function} okCallback
    */
   detectBrowser : function(okCallback)
   {
      if(Ext.isIE8m){
         alert(Cntysoft.GET_LANG_TEXT('WEB_BROWSER_ERROR.IE'));
         this.removeLoadMsg();
         return;
      }
      okCallback();
   },
   /**
    * 获取系统域名信息
    *
    * @return {Object} 当全网站的域相关信息
    * @return {String} return.protocol
    * @return {String} return.host
    * @return {String} return.domain
    * @return {String} return.port
    */
   getDomainInfo : function()
   {
      if(null == this.domainInfo){
         var protocol;
         var host;
         var domain;
         var port;
         protocol = location.protocol;
         host = location.host;
         domain = protocol + '//' + host;
         port = location.port;
         this.domainInfo = {};
         Ext.apply(this.domainInfo, {
            protocol : protocol,
            host : host,
            domain : domain,
            port : port
         });
      }
      return this.domainInfo;
   },
   /**
    * 异步加载文件 , 这里的文件必须都是从WEB根目录进行计算
    *
    * 调用例子:
    *
    *     Cntysoft.loadFiles(
    *         [
    *             'WebOs/Cntysoft.js'
    *             'WebOs/Bootstrap.js'
    *         ],
    *         function(){
     *             alert('loaded');
     *         }
    *     )
    *
    * @param {Array} files 需要加载的文件列表
    * @param {Function} [callback] 加载完成的回调函数
    * @param {Object}  [scope] 回调函数的作用域
    */
   loadFiles : function(files, callback, scope)
   {
      callback = callback || Ext.emptyFn;
      scope = scope || this;
      if(files){
         var total = files.length;
         var loaded = 0;
         files = (typeof files === 'string') ? [files] : files;
         for(var i = 0; i < files.length; i++) {
            Ext.Loader.loadScript({
               url : files[i],
               onLoad : function(){
                  loaded++;
                  if(loaded === total){
                     callback.call(scope);
                  }
               },
               scope : this
            });
         }
      } else{
         callback.call(scope);
      }
   },
   /**
    * 异步按照顺序加载js代码文件
    *
    * 当我们在js脚本里面动态的创建script标签来异步加载js源文件的时候，顺序是得不到保证的，也就是说先创建的script的源码有可能后面执行
    * 这个函数通过串行加载强制保证了加载的顺序
    *
    *  <span style ="color:red">*注意* : 这个函数会影响加载速度</span>
    *
    *     Cntysoft.loadFilesOrder(
    *         [
    *             'A.js',
    *             'B.js',
    *             'C.js'
    *         ],
    *         function()
    *         {
     *             alert('loaded');
     *         }
    *     )
    *  这样文件的加载顺序就强制为 A.js => B.js => C.js
    *
    * @param {Array} files 需要加载的文件列表
    * @param {Function} [callback] 加载完成的回调函数
    * @param {Object}  [scope] 回调函数的作用域
    */
   loadFilesOrder : function(files, callback, scope)
   {
      var me = this;
      callback = callback || Ext.emptyFn;
      scope = scope || me;
      var file;
      if(files){
         files = (typeof files === 'string') ? [files] : files;
         file = files.shift();
         if(file){
            Ext.Loader.loadScript({
               url : file,
               onLoad : function()
               {
                  me.loadFilesOrder(files, callback, scope);
               },
               onError : function(col)
               {
                  console.log(col , file + ' Error');
               }
            });
         } else{
            callback.call(scope);
         }
      } else{
         callback.call(scope);
      }
   },

   /**
    * 获取指定对象方法的字符串名称格式为 <span style ="color:blue">*类名#方法名称*</span> ，用于生成调试信息
    *
    * @private
    * @param {Ext.Class} obj 对象引用
    * @param {String} method 方法名称
    * @return {String} 对象方法的字符串名称
    */
   getMethodName : function(obj, method)
   {
      return obj.$className + '#' + method;
   },

   /**
    * 抛出一个异常，加上了一些自己的逻辑, 将类名方法名称在异常信息中显示出来
    *
    * @param {String} cls 出现错误的类的名称
    * @param {String} method 出现错误的方法名称
    * @param {String} msg 错误提示语句
    * @throws {Exception}
    */
   raiseError : function(cls, method, msg)
   {
      msg = 'class : ' + cls + ' method : ' + method + ' msg : ' + msg;
      Ext.Error.raise({
         cls : cls,
         method : method,
         msg : msg
      });
   },

   /**
    * 向浏览器的console窗口输出一个对象的结构
    *
    * @param {Object} data
    */
   dump : function(data)
   {
      console.log(data);
   },

   /**
    * 显示一个信息提示的窗口
    *
    * @param {String}  title 窗口标题
    * @param {String}  msg 需要显示的提示信息
    * @param {Function}  fn 窗口关闭的时候的回调函数
    * @param {Object}  scope 回调函数作用域
    */
   showAlertWindow : function(title, msg, fn, scope)
   {
      var config = this.processWinArguments.apply(this, arguments);
      Ext.apply(config, {
         buttons : Ext.Msg.OK,
         icon : Ext.Msg.INFO
      });
      Ext.Msg.show(config);
   },

   /**
    * 显示信息提示窗口
    *
    * @param {String}  title 窗口标题
    * @param {String}  msg 需要显示的提示信息
    * @param {Function}  fn 窗口关闭的时候的回调函数
    * @param {Object}  scope 回调函数作用域
    */
   showInfoMsgWindow : function(title, msg, fn, scope)
   {
      var config = this.processWinArguments.apply(this, arguments);
      Ext.apply(config, {
         buttons : Ext.Msg.YESNO,
         icon : Ext.Msg.INFO
      });
      Ext.Msg.show(config);
   },
   /**
    * 获取提问窗口
    *
    * @param {String}  title 窗口标题
    * @param {String}  msg 需要显示的提示信息
    * @param {Function}  fn 窗口关闭的时候的回调函数
    * @param {Object}  scope 回调函数作用域
    */
   showQuestionWindow : function(title, msg, fn, scope)
   {
      var config = this.processWinArguments.apply(this, arguments);
      Ext.apply(config, {
         buttons : Ext.Msg.YESNO,
         icon : Ext.Msg.QUESTION
      });
      Ext.Msg.show(config);
   },
   /**
    * 在出错情况下的提问窗口
    *
    * @param {String} title 窗口标题
    * @param {String}  msg 需要显示的提示信息
    * @param {Function}  fn 窗口关闭的时候的回调函数
    * @param {Object}  scope 回调函数作用域
    */
   showErrorQuestionWindow : function(title, msg, fn, scope)
   {
      var config = this.processWinArguments.apply(this, arguments);
      Ext.apply(config, {
         buttons : Ext.Msg.YESNO,
         icon : Ext.Msg.ERROR
      });

      Ext.Msg.show(config);
   },
   /**
    * 显示错误提示窗口
    *
    * @param {String} title 窗口标题
    * @param {String}  msg 需要显示的提示信息
    * @param {Function}  fn 窗口关闭的时候的回调函数
    * @param {Object}  scope 回调函数作用域
    */
   showErrorWindow : function(title, msg, fn, scope)
   {
      var config = this.processWinArguments.apply(this, arguments);
      Ext.apply(config, {
         buttons : Ext.Msg.OK,
         icon : Ext.Msg.ERROR
      });
      Ext.Msg.show(config);
   },
   /**
    * 处理显示提示窗口的参数，方便其调用
    *
    * 调用这个函数的方法有
    *
    * * {@link Cntysoft#showAlertWindow}
    * * {@link Cntysoft#showInfoMsgWindow}
    * * {@link Cntysoft#showQuestionWindow}
    * * {@link Cntysoft#showErrorWindow}
    *
    * @private
    * @param {String}  title 窗口标题
    * @param {String}  msg 需要显示的提示信息
    * @param {Function}  fn 窗口关闭的时候的回调函数
    * @param {Object}  scope 回调函数作用域
    * @return {Object}
    * @return {Object} return.title
    * @return {Object} return.msg
    * @return {Object} return.fn
    * @return {Object} return.scope
    */
   processWinArguments : function(title, msg, fn, scope)
   {
      if(3 == arguments.length){
         scope = fn;
         fn = msg;
         msg = title;
         title = Cntysoft.GET_LANG_TEXT('UI.SYS_WIN_TITLE');
      } else if(1 == arguments.length){
         msg = title;
         title = Cntysoft.GET_LANG_TEXT('UI.SYS_WIN_TITLE');
         fn = Ext.emptyFn;
         scope = this;
      }
      return {
         title : title,
         msg : msg,
         fn : fn,
         scope : scope
      };
   },
   /**
    * 在新窗口打开一个指定的地址
    *
    * @param {String} url
    */
   gotoUrl : function(url)
   {
      window.open(url);
   },
   /**
    * 获取语言类型
    *
    * @return {String}
    */
   getLangType : function()
   {
      return this.language;
   }

}, function(g){
   alias = Ext.Function.alias;
   Ext.apply(Cntysoft,{
      raiseError : alias(g, 'raiseError'),
      getDomainInfo : alias(g, 'getDomainInfo'),
      processApiError : alias(g, 'processApiError'),
      showAlertWindow : alias(g, 'showAlertWindow'),
      showInfoMsgWindow : alias(g, 'showInfoMsgWindow'),
      showQuestionWindow : alias(g, 'showQuestionWindow'),
      showErrorQuestionWindow : alias(g, 'showErrorQuestionWindow'),
      showErrorWindow : alias(g, 'showErrorWindow'),
      showLoadScriptMask : alias(g, 'showLoadScriptMask'),
      hideLoadScriptMask : alias(g, 'hideLoadScriptMask')
   });
});