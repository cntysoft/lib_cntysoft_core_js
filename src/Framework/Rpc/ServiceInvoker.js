/*
 * Cntysoft Cloud Software Team
 * 
 * @author SOFTBOY <cntysoft@163.com>
 * @copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * @license    http://www.cntysoft.com/license/new-bsd     New BSD License
 */
Ext.define("Cntysoft.Framework.Rpc.ServiceInvoker",{
   mixins : {
      observable : "Ext.mixin.Observable"
   },
   requires : [
      "Cntysoft.Framework.Net.WebSocket",
      "Ext.util.MixedCollection"
   ],
   
   statics : {
      REQUEST_SEED : 1
   },
   /**
    * @var {Cntysoft.Framework.Net.WebSocket} m_socket
    */
   m_socket : null,
   /**
    * @var {String} serviceHost
    */
   serviceHost : "",
   /**
    * @var {String} m_errorString
    */
   m_errorString : "",
   /**
    * @var {Boolean} m_connected
    */
   m_connected : false,
   
   /**
    * @var {Ext.util.MixedCollection} m_callbacks
    */
   m_callbacks : null,
   constructor : function(config)
   {
      Ext.apply(this, config);
      this.mixins.observable.constructor.call(this, config);
      if(Ext.isEmpty(this.serviceHost)){
         Cntysoft.raiseError(Ext.getClassName(this), 'constructor', "serviceHost can not empty");
      }
      this.m_callbacks = new Ext.util.MixedCollection();
   },
   
   connectToServer : function()
   {
      try{
         this.m_socket = new Cntysoft.Framework.Net.WebSocket({
            hostUrl : this.serviceHost,
            listeners : {
               opened : function(event){
                  this.m_connected = true;
                  if(this.hasListeners.connected){
                     this.fireEvent("connected", this, event);
                  }
               },
               close : function(event)
               {
                  this.m_connected = false;
                  if(this.hasListeners.serveroffline){
                     this.fireEvent("serveroffline", this, event);
                  }
               },
               scope : this
            }
         });
         return true;
      }catch(ex){
         this.m_errorString = ex;
         return false;
      }
   },
   
   disconnectFromServer : function()
   {
      this.m_socket.close();
      Ext.destroy(this.m_socket);
      this.m_socket = null;
      this.m_connected = false;
   },
   
   request : function(request, callback, scope)
   {
      if(this.m_connected == false){
         this.m_errorString = "websocket not connected"
         return false;
      }
      callback = Ext.isFunction(callback);
      scope = scope ? scope : this;
      var serial = this.generateRequestSerial();
      request.setSerial(serial);
      this.m_callbacks.add(serial, [callback, scope]);
      return this.writeRequestToSocket(request);
   },
   
   writeRequestToSocket : function(request)
   {
      var package = Ext.util.Base64.encode(request.toJson());
      var length = package.length;
      var binaryData = new Uint8Array(length);
      for(var i = 0; i < length; i++){
         binaryData[i] = package.charCodeAt(i);
      }
//      package += "\n\n\t";
      try{
         this.m_socket.send(binaryData);
         this.m_socket.send(binaryData);
         this.m_socket.send(binaryData);
         this.m_socket.send(binaryData);
         return true;
      }catch(ex){
         this.m_errorString = ex;
         return false;
      }
   },
   
   resetStatus : function()
   {
      this.m_errorString = "";
   },
   
   processResponse : function()
   {
      
   },
   
   getErrorCode : function()
   {
      return this.m_errorCode;
   },
   
   getErrorString : function()
   {
      return this.m_errorString;
   },
   
   generateRequestSerial : function()
   {
      return this.self.REQUEST_SEED++;
   },
   
   destroy : function()
   {
      this.disconnectFromServer();
   }
});