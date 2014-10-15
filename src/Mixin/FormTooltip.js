/*
 * Cntysoft Cloud Software Team
 * 
 * @author SOFTBOY <cntysoft@163.com>
 * copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * license    http://www.cntysoft.com/license/new-bsd     New BSD License
 */
/**
 * 定义表单项的提示器，一般是鼠标放在form表单输入框上显示一段提示信息
 */
Ext.define('Cntysoft.Mixin.FormTooltip', {
   /**
    * 信息提示对象
    *
    * @property {Ext.tip.ToolTip} toolTip
    */
   toolTip : null,
   constructor : function()
   {
      this.toolTip = new Ext.tip.ToolTip({
         autoHide : false,
         anchor : 'left'
      });
   },
   /**
    * 设置Tooltip提示
    */
   setupTooltipTarget : function(target)
   {
      var el = target.el;
      var me = this;
      el.addListener({
         mouseenter : function(){
            if(undefined != target.toolTipText){
               me.toolTip.setTarget(el);
               me.toolTip.update(target.toolTipText);
               me.toolTip.show();
            }
         },
         mouseleave : function(){
            me.toolTip.hide();
         },
         scope : this
      });
   },
   destroy : function()
   {
      if(this.toolTip){
         this.toolTip.destroy();
         delete this.toolTip;
      }
   }
});