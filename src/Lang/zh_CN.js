/**
 * @author SOFTBOY <cntysoft@163.com>
 * copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * license    http://www.cntysoft.com/license/new-bsd     New BSD License
 */
Ext.define('Cntysoft.Lang.zh_CN', {
   extend : 'Cntysoft.Kernel.AbstractLangHelper',
   data : {
      UI : {
         SYS_WIN_TITLE : '系统提示窗口 ',
         MENU : {
            ADD : '添加',
            DELETE : '删除',
            MODIFY : '修改'
         },
         BTN : {
            SAVE : '保存',
            RESTORE : '还原',
            RESET : '重置',
            CANCEL : '取消',
            EDIT : '编辑',
            SELECT : '选择',
            OK : '确定',
            LOGIN : '登录',
            LOGOUT : '注销登录',
            ENABLE : '启用',
            DISABLE : '禁用',
            YES : '是',
            NO : '否',
            UNIQUE : '检查是否唯一',
            PREV : '上一步',
            NEXT : '下一步'
         },
         LABEL : {
            USERNAME : '用户名',
            PASSWORD : '密码',
            VERIFY_PWD : '确认密码',
            EMAIL : '电子邮件',
            NICK_NAME : '昵称',
            YES : '是',
            NO : '否'
         },
         ENABLE : '启用',
         DISABLE : '禁用',
         LOCKED : '锁定',
         NORMAL : '正常'
      },
      WEEK_NAMES : {
         MONDAY : '星期一',
         TUESDAY : '星期二',
         WEDNESDAY : '星期三',
         THURSDAY : '星期四',
         FRIDAY : '星期五',
         SATURDAY : '星期六',
         SUNDAY : '星期天'
      },
      MSG : {
         SYS_RELOAD_INFO : '系统运行过程中不需要刷新,您确定要退出系统 ?',
         LOGOUT_SYS : '系统正在注销 ... ',
         LOGINING : '正在登陆系统 ...',
         LOAD_SCRIPT : '系统正在为您加载程序...',
         SAVE : '系统正在为您保存数据, 请稍候...',
         LOAD : '系统正在为您加载数据, 请稍候...',
         PREPARE_DESKTOP : '系统正在为您准备桌面 ...',
         OP : '系统操作正在进行, 请稍候...',
         UPLOADING : '正在上传，请稍后 ... ',
         UPLOAD_OK : '恭喜您, 上传成功',
         SAVE_OK : '恭喜您, 数据保存成功',
         LOAD_OK : '恭喜您, 加载完成',
         OP_OK : '恭喜您， 操作成功完成',
         DELETE : '正在为您删除数据 ... ',
         DELETE_OK : '恭喜您，数据删除成功',
         EMPTY_TEXT : '没有数据哦...',
         PWD_LEVEL_1 : '密码太简单',
         PWD_LEVEL_2 : '强度一般',
         PWD_LEVEL_3 : '复杂度达标',
         PWD_TOO_SHORT : '密码长度必须在6个字符以上',
         PAGE_TEXT : '当前显示 {0} - {1} / {2}',
         PAGE_EMPTY_TEXT : '没有数据',
         SYS_AUTH_FAIL : '<span style = "color:red">身份验证信息失效</span>, 系统即将注销, 可能的原因是COOKIE过期',
         MULTI_LOGIN_FAIL : '提示，当前帐号被其他人登录，您被迫下线。<span style = "color:red">可能密码已经泄露，请修改密码。</span>',
         REBOOT_ASK : '尊敬的 <span style = "color:blue;font-weight:bold">{0}</span> , 您确定要注销登录吗？',

         NO_REC : '暂无记录'
      },
      ERROR : {
         UPLOAD_ERR : '上传失败，失败原因 : <span style = "color:red">{0}</span>',
         LOAD_ERR : '数据加载出错, 您可以稍候再试, 或者联系网站管理员',
         SAVE_ERR : '系统保存数据出错, 您可以稍候再试, 或者联系网站管理员',
         OP_ERR : '系统操作出错, 您可以稍候再试, 或者联系网站管理员',
         API_CALL_ERROR : '系统API调用出错，您可以稍后再试，或者联系系统管理员',
         EMAIL_CANOT_EMPTY : '电子邮件地址不能为空',
         EMAIL_FORMAT_ERROR : '电子邮件格式错误, 请检查',
         NOT_EMPTY : '当前数据项不能为空',
         API_CALL_ERR : '数据请求错误，可能是数据请求超时，你可以稍候再试',
         PERMISSION_DENY : '权限不够，操作失败'
      },
      WEB_BROWSER_ERROR : {
         IE : '对不起，Cntysoft Cloud Software Team后端系统不支持IE9以下版本内核的浏览器，您需要升级您的浏览器，或者使用火狐或者谷歌浏览器。'
      },
      //几个重要的错误映射
      ERROR_MAP : {
         31 : '您没有足够的权限进行此操作，如果您是非法用户，请自觉离开， 如果是正常用户，可能您的权限被管理员取消。'
      }
   }
});