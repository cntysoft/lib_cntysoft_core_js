/*
 * Cntysoft Cloud Software Team
 * 
 * @author Changwang <chenyongwang1104@163.com>
 * copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * license    http://www.cntysoft.com/license/new-bsd     New BSD License
 */
/**
 * 前端的文件系统，直接放在Kernel里面，用Core App来响应，文件系统数据调用,只是提供简单的封装
 */
Ext.define('Cntysoft.Kernel.Filesystem', {
    /**
     * 查看文件内容
     * 
     * @param {String} filename 文件名称
     */
    cat : function(filename, callback, scope)
    {
        return Cntysoft.callApi('Core', 'cat', {
            filename : filename
        }, callback, scope);
    },
    /**
     * 保存指定文件
     * 
     * @param {Object} data data.filename data.content
     */
    save : function(data, callback, scope)
    {
        return Cntysoft.callApi('Core', 'save', data, callback, scope);
    },
    /**
     * 重命名文件名
     * 
     * @param {String} Object {oldName : 'oldName', newName : 'newName'}
     */
    rename : function(data, callback, scope)
    {
        return Cntysoft.callApi('Core', 'rename', data, callback, scope);
    },
    /**
     * 删除指定文件
     * 
     * @param {String} filename
     */
    deleteFile : function(filename, callback, scope)
    {
        return Cntysoft.callApi('Core', 'deleteFile', {
            filename : filename
        }, callback, scope);
    },
    /**
     * 批量删除文件，放在一次请求中可以加快速度
     * 
     * @param {Array} files
     */
    deleteFiles : function(files, callback, scope)
    {
        return Cntysoft.callApi('Core', 'deleteFiles',{
            files : files
        },callback, scope);
    },
    /**
     * 删除指定文件夹
     * 
     * @param string dirname
     */
    deleteDir : function(dirname, callback, scope)
    {
        return Cntysoft.callApi('Core', 'deleteDir', {
            dirname : dirname
        }, callback, scope);
    },
    /**
     * 批量删除文件夹，放在一次请求中可以加快速度
     * 
     * @param {Array} dirs
     */
    deleteDirs : function(dirs, callback, scope)
    {
        return Cntysoft.callApi('Core', 'deleteDirs', {
            dirs : dirs
        }, callback, scope);
    },
    /**
     * 创建一个文件夹
     * 
     * @param {String} dirname
     */
    createDir : function(dirname, callback, scope)
    {
        return Cntysoft.callApi('Core', 'createDir',{
            dirname : dirname
        }, callback, scope);
    },
    /**
     * 粘贴剪切板的文件或者文件夹
     * {
     *      type : 'type',
     *      items : 'items'
     * }
     * 
     *
     * @param {Object} data
     */
    paste : function(data, callback, scope)
    {
       return Cntysoft.callApi('Core', 'paste',data, callback, scope);
    }
});