/**
 * Cntysoft Cloud Software Team
 * 
 * @author SOFTBOY <cntysoft@163.com>
 * copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * license    http://www.cntysoft.com/license/new-bsd     New BSD License
 */
/**
 * 禁止UI元素出现上下文菜单
 */
Ext.define('Cntysoft.Mixin.ForbidContextMenu', {
    forbidContextMenu : function(){
        var me = this;
        me.addListener({
            afterrender : function(){
                var el = this.getTargetEl();
                el.addListener('contextmenu', function(e){
                    e.stopEvent();
                })
            },
            scope : me
        });
    }
});