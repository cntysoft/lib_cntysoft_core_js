/*
 * Cntysoft Cloud Software Team
 *
 * @author SOFTBOY <cntysoft@163.com>
 * copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * license    http://www.cntysoft.com/license/new-bsd     New BSD License
 */
/**
 * 符合系统的网络链接对象
 * 利用ExtJs系统提供的相关功能，根据自己的平台的特点，让调用后台php数据更加方便
 * 在这个类里面集成一些验证设施，不提供上传功能， 系统对于上传提供swfuploader支持
 * 对结果进行处理
 */
Ext.define('Cntysoft.Framework.Net.Connection', {
    extend : 'Ext.data.Connection',
    requires : [
        'Cntysoft.Framework.Net.Request',
        'Cntysoft.Kernel.Utils'
    ],
    singleton : true,
    statics : {
        /**
         * 默认的数据调用路由
         *
         * @property {String} API_ROUTE
         */
        API_ROUTE : 'ApiGate',
        /**
         * 系统支持的调用协议
         */
        PROTOCOL : 'http://',
        /**
         * 数据调用网关
         */
        API_GATE : null,
        /**
         * 系统数据请求类请求后台数据的时候使用的数据键，这个便于服务器端进行获取相关的信息
         *
         * @property {String} INVOKE_PARAM_KEY
         */
        INVOKE_PARAM_KEY : 'REQUEST_DATA',
        /**
         * 请求元信息
         *
         * @property {String} INVOKE_META_KEY
         */
        INVOKE_META_KEY : 'REQUEST_META',
        /**
         * 跟安全相关的一些的键值
         *
         * @property {String} INVOKE_SECURITY_KEY
         */
        INVOKE_SECURITY_KEY : 'REQUEST_SECURITY',
        /**
         * 获取系统API调用网关地址
         *
         * @return {String}
         */
        getApiGate : function()
        {
            if(null == this.API_GATE){
                /**
                 * 曾经在这里出现了一次错误
                 */
                var host = Cntysoft.Global.getDomainInfo().host;
                this.API_GATE = this.PROTOCOL + host + '/' + this.API_ROUTE;
            }
            return this.API_GATE;
        }
    },
    /**
     * 系统默认的请求方法
     *
     * @property {String} method
     */
    method : 'POST',
    /**
     * 默认传递的Header信息
     *
     * @property {Object} defaultHeaders
     */
    defaultHeaders : {
        PowerBy : 'SmartPlatfom'
    },
    /**
     * 进行一次数据请求
     *
     * @param  {Cntysoft.Framework.Net.Request} request
     * @return {Object}
     */
    request : function(request)
    {
        var options = this.buildInvokeInfo(request);
        return this.callParent([options]);
    },
    /**
     * 根据Request对象生成调用对象，这个对象可以发起一个标准的Ajax请求
     *
     * @param  {Reuqest} request
     * @return {Object}
     */
    buildInvokeInfo : function(request)
    {
        var S = this.self;
        var url;
        var options;
        var callMetaParams;
        var callParams = {};
        var dataKey = S.INVOKE_PARAM_KEY;
        var metaKey = S.INVOKE_META_KEY;
        var securityKey = S.INVOKE_SECURITY_KEY;
        var url = this.setupInvokeUrl(request.getCallType());
        var callMetaParams = request.getInvokeInfo();
        var params = request.getParams();
        params.each(function(key, value){
            callParams[key] = value;
        });
        if(null == callMetaParams){
            Cntysoft.raiseError(
                Ext.getClassName(this),
                'buildInvokeInfo',
                'api call invoke meta data is null'
            );
        }
        //安全数据相关的暂时不加
        options = {
            url : url,
            method : this.method,
            async : !request.isSync(),
            params : {}
        };
        options.params[metaKey] = Ext.JSON.encode(callMetaParams);
        options.params[dataKey] = Ext.JSON.encode(callParams);
        /**
         * 暂时不实现身份令牌
         */
        options.params[securityKey] = Ext.JSON.encode({});
        Ext.apply(options, request.getCallbacks());
        return options;
    },
    /**
     * 获取数据调用的请求地址
     *
     * @param  {String} callType
     * @return {String}
     */
    setupInvokeUrl : function(callType)
    {
        var S = this.self;
        return S.getApiGate() + '/' + callType;
    },

    /**
     * 设置调用api网关
     *
     * @param apiGate
     */
    setInvokeUrl : function(apiGate)
    {
        var host = Cntysoft.Global.getDomainInfo().host;
        this.self.API_GATE = this.self.PROTOCOL + host + '/' + apiGate;
    },

    /**
     * 前期我想限定只能使用POST方法
     *
     * @template
     * @private
     * @param {Object} options
     * @param {String} method
     * @return {String} The modified method
     */
    setupMethod : function(options, method)
    {
        return 'POST';
    },
    /**
     * 系统是不支持上传的
     *
     * @param  {Object}  options
     * @return {Boolean}
     */
    isFormUpload : function(options)
    {
        return false;
    },
    /**
     * Uploads a form using a hidden iframe.
     *
     * @param {String/HTMLElement/Ext.Element} form The form to upload
     * @param {String} url The url to post to
     * @param {String} params Any extra parameters to pass
     * @param {Object} options The initial options
     */
    upload : function(form, url, params, options)
    {
        Cntysoft.Utils.methodNotSupported(
            Ext.getClassName(this),
            'upload'
        );
    }
}, function(){
    Cntysoft.DataConn = Cntysoft.Framework.Net.Connection;
});