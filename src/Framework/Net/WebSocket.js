/*
 * Cntysoft Cloud Software Team
 *
 * @author SOFTBOY <cntysoft@163.com>
 * copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * license    http://www.cntysoft.com/license/new-bsd     New BSD License
 */
/**
 * WebSocket的简单封装
 */
Ext.define('Cntysoft.Framework.Net.WebSocket', {
   mixins: {
      observable: 'Ext.mixin.Observable'
   },
   statics: {
      CONNECTING: 0, //	连接还没开启。
      OPEN: 1, //连接已开启并准备好进行通信。
      CLOSING: 2, //连接正在关闭的过程中。
      CLOSED: 3, //连接已经关闭，或者连接无法建立,
      ERROR_CODE: {
      }
   },
   /**
    * @var {WebSocket} websocket
    */
   websocket: null,
   /**
    * @var {String} hostUrl websocket服务器地址
    */
   hostUrl: '',
   constructor: function(config)
   {
      Ext.apply(this, config);
      this.mixins.observable.constructor.call(this, config);
      if(this.hostUrl==''){
         Cntysoft.raiseError(Ext.getClassName(this), 'constructor', "hostUrl can not empty");
      }
      if(typeof MozWebSocket=='function'){
         WebSocket = MozWebSocket;
      }
      try{
         this.websocket = new WebSocket(this.hostUrl);
      }catch(ex){}
      this.websocket.onopen = Ext.bind(this.openedHandler, this);
      this.websocket.onclose = Ext.bind(this.closeHandler, this);
      this.websocket.onmessage = Ext.bind(this.messageHandler, this);
      this.websocket.onerror = Ext.bind(this.errorHandler, this);
   },
   setBinaryType: function(type)
   {
      if(type=="blob"||type=="arraybuffer"){
         this.websocket.binaryType = type;
      }
      return this;
   },
   getBinaryType: function()
   {
      return this.websocket.binaryType;
   },
   getBufferedAmount: function()
   {
      return this.websocket.bufferedAmount;
   },
   getReadyState: function()
   {
      return this.websocket.readyState;
   },
   send: function(data)
   {
      if(this.getReadyState()==this.self.OPEN){
         this.websocket.send(data);
      }
      return this;
   },
   close: function(code, reason)
   {
      code = code ? code : 1000;
      this.websocket.close(code, reason);
      return this;
   },
   openedHandler: function(event)
   {
      if(this.hasListeners.opened){
         this.fireEvent("opened", event);
      }
   },
   closeHandler: function(event)
   {
      if(this.hasListeners.close){
         this.fireEvent("close", event);
      }
   },
   errorHandler: function(event)
   {
      if(this.hasListeners.error){
         this.fireEvent("error", event);
      }
   },
   messageHandler: function(event)
   {
      if(this.hasListeners.message){
         this.fireEvent("message", event);
      }
   },
   destroy: function()
   {
      this.websocket.close();
      delete this.websocket;
      this.mixins.observable.destroy.call(this);
   }
});
