/*
 * Cntysoft Cloud Software Team
 * 
 * @author SOFTBOY <cntysoft@163.com>
 * @copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * @license    http://www.cntysoft.com/license/new-bsd     New BSD License
 */
Ext.define('Cntysoft.Utils.ColRenderer', {
   requires : [
      'Cntysoft.Utils.Common'
   ],
   statics: {
      boolRenderer : function(value)
      {
         var L = Cntysoft.GET_LANG_TEXT();
         if(value){
            return L.UI.BTN.YES;
         }else{
            return L.UI.BTN.NO;
         }
      },

      statusRenderer : function(value)
      {
         var L = Cntysoft.GET_LANG_TEXT();
         if(value){
            return L.UI.LOCKED;
         }else{
            return L.UI.NORMAL;
         }
      },

      timestampRenderer : function(value)
      {
         var L = Cntysoft.GET_LANG_TEXT();

         if(null == value || (!Ext.isNumber(value) && '' == Ext.String.trim(value))){
            return L.MSG.NO_REC;
         }else{
            if(!Ext.isNumber(value)){
               value = parseInt(value, 10);
            }
            value *= 1000;

            return Cntysoft.Utils.Common.formatTimestamp2str(value);
         }
      }
   }
});