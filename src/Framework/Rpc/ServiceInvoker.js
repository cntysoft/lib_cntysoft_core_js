/*
 * Cntysoft Cloud Software Team
 * 
 * @author SOFTBOY <cntysoft@163.com>
 * @copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * @license    http://www.cntysoft.com/license/new-bsd     New BSD License
 */
Ext.define("Cntysoft.Framework.Rpc.ServiceInvoker", {
   mixins: {
      observable: "Ext.mixin.Observable"
   },
   requires: [
      "Cntysoft.Framework.Net.WebSocket",
      "Ext.util.HashMap",
      "Cntysoft.Framework.Rpc.Response"
   ],
   statics: {
      REQUEST_SEED: 1,
      SUPER_SERIAL_NUM: 0
   },
   /**
    * @var {Cntysoft.Framework.Net.WebSocket} socket
    */
   socket: null,
   /**
    * @var {String} serviceHost
    */
   serviceHost: "",
   /**
    * @var {String} errorString
    */
   errorString: "",
   /**
    * @var {Boolean} connected
    */
   connected: false,
   /**
    * @var {Ext.util.HashMap} callbacks
    */
   callbacks: null,
   constructor: function(config)
   {
      Ext.apply(this, config);
      this.mixins.observable.constructor.call(this, config);
      if(Ext.isEmpty(this.serviceHost)){
         Cntysoft.raiseError(Ext.getClassName(this), 'constructor', "serviceHost can not empty");
      }
      this.callbacks = new Ext.util.HashMap();
   },
   connectToServer: function()
   {
      try{
         this.socket = new Cntysoft.Framework.Net.WebSocket({
            hostUrl: this.serviceHost,
            listeners: {
               opened: function(event){
                  this.connected = true;
                  if(this.hasListeners.connected){
                     this.fireEvent("connected", this, event);
                  }
               },
               close: function(event)
               {
                  this.resetStatus();
                  this.connected = false;
                  if(this.hasListeners.serveroffline){
                     this.fireEvent("serveroffline", this, event);
                  }
               },
               error: function(event)
               {
                  this.resetStatus();
                  this.connected = false;
                  if(this.hasListeners.connecterror){
                     this.fireEvent("connecterror", this, event);
                  }
               },
               message: function(event)
               {
                  this.unboxMessage(event.data);
               },
               scope: this
            }
         });
         return true;
      }catch(ex){
         this.errorString = ex;
         return false;
      }
   },
   disconnectFromServer: function()
   {
      if(this.socket){
         this.socket.close();
         Ext.destroy(this.socket);
      }
      this.socket = null;
      this.connected = false;
   },
   request: function(request, callback, scope)
   {
      if(this.connected==false){
         this.addListener({
            connected: function(){
               this.request(request, callback, scope);
            },
            scope: this
         })
         this.connectToServer();
         return;
      }

      callback = Ext.isFunction(callback)?callback:Ext.emptyFn;
      scope = scope?scope:this;
      var serial = this.generateRequestSerial();
      request.setSerial(serial);
      this.callbacks.add(serial, [callback, scope]);
      return this.writeRequestToSocket(request);
   },
   writeRequestToSocket: function(request)
   {
      var package = Ext.util.Base64.encode(request.toJson());
      var length = package.length;
      var binaryData = new Uint8Array(length);
      for(var i = 0; i<length; i++){
         binaryData[i] = package.charCodeAt(i);
      }
      try{
         this.socket.send(binaryData);
         return true;
      }catch(ex){
         this.errorString = ex;
         return false;
      }
   },
   resetStatus: function()
   {
      this.errorCode = -1;
      this.errorString = "";
   },
   unboxMessage: function(responseJson)
   {
      responseJson = Ext.decode(responseJson);
      var response = new Cntysoft.Framework.Rpc.Response(responseJson.signature, responseJson.status);
      if(response.getStatus()){
         if(!Ext.isEmpty(responseJson.data)){
            var data = responseJson.data;
            for(var key in data){
               response.setDataItem(key, data[key]);
            }
         }
         if(!Ext.isEmpty(responseJson.extraData)){
            response.setExtraData(Ext.JSON.decode(Ext.util.Base64.decode(responseJson.extraData)));
         }
      }else{
         response.setErrorCode(responseJson.errorCode);
         response.setErrorString(responseJson.errorString);
      }
      response.setIsFinal(responseJson.final);
      response.setSerial(responseJson.serial);
      if(this.self.SUPER_SERIAL_NUM==response.getSerial()&&!response.getStatus()){
         //超级错误
         this.disconnectFromServer();
         Cntysoft.raiseError(Ext.getClassName(this), "processResponse", response.getErrorString());
      }
      this.processResponse(response);
   },
   processResponse: function(response)
   {
      var slotIndex = response.getSerial();
      if(this.callbacks.containsKey(slotIndex)){
         var slot = this.callbacks.get(slotIndex);
         slot[0].call(slot[1], response);
         if(response.getIsFinal()){
            this.callbacks.removeAtKey(slotIndex);
         }
      }
   },
   getErrorCode: function()
   {
      return this.errorCode;
   },
   getErrorString: function()
   {
      return this.errorString;
   },
   generateRequestSerial: function()
   {
      return this.self.REQUEST_SEED++;
   },
   destroy: function()
   {
      this.disconnectFromServer();
      Ext.destroy(this.callbacks);
      delete this.callbacks;
   }
});