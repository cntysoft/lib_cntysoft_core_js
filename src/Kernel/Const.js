/*
 * Cntysoft Cloud Software Team
 * 
 * @author SOFTBOY <cntysoft@163.com>
 * @copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * @license    http://www.cntysoft.com/license/new-bsd     New BSD License
 */
/*
 * Cntysoft Cloud Software Team
 *
 * @author SOFTBOY <cntysoft@163.com>
 * copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * license    http://www.cntysoft.com/license/new-bsd     New BSD License
 */
/**
 * 系统范围以内的常量定义
 */
Ext.define('Cntysoft.Kernel.Const',{
   statics : {
      /**
       * 第三方扩展的文件夹名称，比如 CkEditor源文件就存放这里
       *
       * @readonly
       * @property {String} VENDER_DIR
       */
      VENDER_DIR : 'Vender',
      /**
       * 文件夹目录名称
       *
       * @readonly
       * @property {String} IMAGE_DIR
       */
      IMAGE_DIR : 'Images',
      /**
       * Ui文件夹名称，这个文件夹主要存放系统的模板文件，Css文件，图片文件等等
       *
       * @readonly
       * @property {String} UI_DIR
       */
      UI_DIR : 'Ui',
      /**
       * Data文件夹名称，这个文件夹主要存放系统的生成的缓存和系统范围里面使用的一些数据
       *
       * @readonly
       * @property {String} DATA_DIR
       */
      DATA_DIR : 'Data',
      /**
       * 系统上传文件夹名称
       *
       * @readonly
       * @property {String} UPLOAD_DIR
       */
      UPLOAD_DIR : 'UploadFiles',
      /**
       * 系统资源文件夹名称，一般存放ExtJs框架的一些图片和Css资源
       *
       * @readonly
       * @property {String} RESOURCE_DIR
       */
      RESOURCE_DIR : 'Resources',
      /**
       * Css文件存放的目录名称
       *
       * @readonly
       * @property {String} CSS_DIR
       */
      CSS_DIR : 'Css',
      /**
       * 常见的一些图片的格式的名称
       *
       * @readonly
       * @property {String} IMAGE_TYPES
       */
      IMAGE_TYPES : [
         'jpg',
         'jpeg',
         'gif',
         'png'
      ],
      /**
       * 运行平台名称, Windows平台的总称
       *
       * @readonly
       * @property {String} WIN
       */
      WIN : 'Windows',
      /**
       * 运行平台名称, Windows XP
       *
       * @readonly
       * @property {String} WINXP
       */
      WINXP : 'Windows xp',
      /**
       * 运行平台名称, Windows 7
       *
       * @readonly
       * @property {String} WIN7
       */
      WIN7 : 'Windows 7',
      /**
       * 运行平台名称, Windows 8
       *
       * @readonly
       * @property {String} WIN8
       */
      WIN8 : 'Windows 8',
      /**
       * 运行平台名称, Linux
       *
       * @readonly
       * @property {String} LINUX
       */
      LINUX : 'Linux',
      /**
       * 运行平台名称, UNIX
       *
       * @readonly
       * @property {String} UNIX
       */
      UNIX : 'Unix',
      /**
       * 运行平台名称, DOS
       *
       * @readonly
       * @property {String} DOS
       */
      DOS : 'Dos',
      /**
       * 运行平台名称, ANDORID
       *
       * @readonly
       * @property {String} ANDORID
       */
      ANDROID : 'Android',
      /**
       * 运行平台名称, WP7
       *
       * @readonly
       * @property {String} WP7
       */
      WP7 : 'Window Phone 7',
      /**
       * 运行平台名称, WP8
       *
       * @readonly
       * @property {String} WP8
       */
      WP8 : 'Window Phone 8',
      /**
       * 运行平台名称, BB
       *
       * @readonly
       * @property {String} BB
       */
      BB : 'Black Berry',
      /**
       * 运行平台名称, IOS
       *
       * @readonly
       * @property {String} IOS
       */
      IOS : 'ios',
      /**
       * 运行平台名称, SYMBIAN
       *
       * @readonly
       * @property {String} SYMBIAN
       */
      SYMBIAN : 'Symbian',
      /**
       * 运行平台名称, MACOS
       *
       * @readonly
       * @property {String} MACOS
       */
      MACOS : 'Mac OS',
      /**
       * 运行平台名称, FIREFOXOS
       *
       * @readonly
       * @property {String} FIREFOXOS
       */
      FIREFOXOS : 'Firefox OS'
   }
}, function(){
   Ext.apply(Cntysoft,{
      C : this,
      Const : this
   });
});