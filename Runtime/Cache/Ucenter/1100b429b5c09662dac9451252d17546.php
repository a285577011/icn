<?php if (!defined('THINK_PATH')) exit();?><div class="theme-popover" style="display: block;">
	<span class="lgclose" data-dismiss="modal" aria-hidden="true"></span>
	<div class="enterpopup">
		<div class="enterpopup1">
			<img src="/Theme/Green/Common/Static/images/base/registerlogo.png" alt=""/><img src="/Theme/Green/Common/Static/images/base/registered-ad.png" alt="" style="margin-top: 24px;margin-left: 10px;"/>
		</div>
		<form method="post" action="<?php echo U('/Ucenter/Member/login@');?>">
		<div class="enterpopup2">
			<span class="lguser"></span>
			<input type="text" name="username" placeholder="手机号/用户帐号"/>
		</div>
		<div class="enterpopup3">
			<span class="lgpass"></span>
			<input type="password" name="password" placeholder="密码（6-20个字符，区分大小写）" maxlength="20"/>
		</div>
		<div class="enterpopup4">
			<input type="text" name="verify" id="verifycode" placeholder="验证码" class="code" maxlength="5" /> <img src="<?php echo U('verify@');?>" id="verifyimg" alt="" style="height: 30px;width: 130px;float: right;" />
		</div>
		<div class="clear">
		</div>
		<div class="enterpopup5">
			<button class="sure" style="width: 285px;height: 30px;">登录</button>
		</div>
		<div class="enterpopup6">
			<input type="checkbox" name="remember" value="1" style="width: 16px;height: 16px;border: 1px solid #d0d0d0;" class="remmberme"/>记住我 <a href="<?php echo U('Ucenter/Member/findpwd@');?>" target="_blank"><span>忘记密码</span></a>
		</div>
		</form>
		<div class="clear">
		</div>
		<div class="">
			<span class="wechatline"></span>
			<a href="<?php echo addons_url('SyncLogin://Base/login',array('type'=>'weixin'));?>"><span class="lgwechat"></span></a>
			<span class="wechatline"></span>
			<div class="text-center cl96 px12">使用微信登录</div>
		</div>
		<div class="enterpopup7">
			<a href="<?php echo U('Ucenter/Member/register@');?>" target="_blank"><span style="color: #FD7603">注册新用户&nbsp;&nbsp;&gt;</span></a>
		</div>
	</div>
</div>

<script type="text/javascript">
$(function() {
	var verifyimg = $("#verifyimg").attr("src");
	$("#verifyimg").click(function() {
		if (verifyimg.indexOf('?') > 0) {
			$("#verifyimg").attr("src", verifyimg + '&random=' + Math.random());
		} else {
			$("#verifyimg").attr("src", verifyimg.replace(/\?.*$/, '') + '?' + Math.random());
		}
	});
});

$("form").submit(function() {
	var self = $(this);
	$.post(self.attr("action"), self.serialize(), success, "json");
	return false;

	function success(data) {
		if (data.status) {
			setTimeout(function() {
				window.location.reload();
			}, 10);
		} else {
			alert(data.info);
			$("#verifyimg").click();
		}
	}
});
</script>