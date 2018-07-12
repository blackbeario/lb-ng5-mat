var ExtensionLoginDialogSimple=function(e){ExtensionLoginDialog.call(this,e,{confirmOnClose:!0,responsive:!1})};ExtensionLoginDialogSimple.prototype=Object.create(ExtensionLoginDialog.prototype),ExtensionLoginDialogSimple.prototype.constructor=ExtensionLoginDialogSimple,function(){var e,i;function t(e,i,t){return function(o,a){var n=!1;return t&&(e.clearError(i),n=t.validate(o,function(t){e.addError(i,t)},a)),n}}ExtensionLoginDialogSimple.prototype.initialize=function(i){var o,a,n,r,l,s,d;ExtensionLoginDialog.prototype.initialize.apply(this,arguments),o=this,a=new FieldValidator({summary:{id:"validatorSummaryEmail",parentEl:$("label[for='loginDialogEmail'].error-summary"),labelEl:$("label[for='loginDialogEmail'].label")},validators:[{id:"emailRequired",name:LPTools.createElement("p",null,Strings.translateString("Email required")),errorMsg:LPTools.createElement("p",null,Strings.translateString("Please enter your email.")),isValid:function(e){return""!==e.email}}]}),o.inputFields.email.validate=t(o,"email",a),n=this,r=new FieldValidator({summary:{id:"validatorSummaryPassword",parentEl:$("label[for='loginDialogPassword'].error-summary"),labelEl:$("label[for='loginDialogPassword'].label")},validators:[{id:"passwordRequired",name:LPTools.createElement("p",null,Strings.translateString("Password required")),errorMsg:LPTools.createElement("p",null,Strings.translateString("Please enter your password.")),isValid:function(e){return""!==e.password}}]}),n.inputFields.password.validate=t(n,"password",r),this.inputFields.rememberPassword.getElement().bind("click",(l=this,s=!1,d=function(){s=!0,l.inputFields.rememberPassword.setValue(!0),e.hide()},function(){var i=l.inputFields.rememberPassword.getValue();!s&&i?(e.show(),dialogs.confirmation.open({title:Strings.translateString("Are you sure?"),text:Strings.translateString("Saving your Master Password on this device is like leaving the keys in the door to your Vault.")+"<br/><br/>"+Strings.translateString("You should make sure this device is in a secure location and unlikely to be lost or stolen before enabling this option."),handler:d,closeHandler:function(){e.hide()},onResize:l.data.onResize}),l.inputFields.rememberPassword.setValue(!1)):s=!1})),function(t){t.inputFields.email.getElement().change(function(e){t.inputFields.password.validate({email:t.inputFields.email.getValue()}),t.inputFields.email.validate({email:t.inputFields.email.getValue()})}),t.inputFields.password.onChange(function(e){e&&t.inputFields.password.validate({password:e})}),$("#forgotPassword").off("click"),$("#forgotPassword").bind("click",function(){LPPlatform.openURL(LPPlatform.getBaseURL()+"forgot.php"),t.close(!0)}),$("#newToLastPass").off("click"),$("#newToLastPass").bind("click",function(e){e.preventDefault(),t.data.isPopup?bg.get("LPContentScriptFeatures")&&"context"===bg.get("LPContentScriptFeatures").intro_tutorial_version?bg.showModalOverlay(function(){ExtensionDropdown.openDialog("createAccountIcon"),t.close(!0)}):(bg.LPPlatform.openTabDialog("createAccountSimple"),t.close(!0)):(dialogs.createAccountSimple.open(),t.close(!0))}),i.find(".showKeyboard").off("click"),i.find(".showKeyboard").bind("click",function(){t.data.isPopup?(bg.LPPlatform.openTabDialog("loginSimple",{virtualKeyboard:!0}),t.close(!0)):t.toggleKeyboard()});var o={parentEl:$("body")};t.data.isPopup&&(o.shadeStyle="light"),e=new BackgroundOverlay(o),t.data.isPopup||$("body").addClass("login-background")}(this)},ExtensionLoginDialogSimple.prototype.close=function(i){var t;i?Dialog.prototype.close.apply(this,arguments):(t=this,LPTools.getOption(t.data,"showcloseconfirm",!0)?(e.show(),dialogs.confirmation.open({title:"LastPass",text:Strings.translateString("Do you really want to quit? You cannot use LastPass without logging in to an account."),closeHandler:function(){e.hide()},handler:function(){t.close(!0)}})):t.close(!0))},ExtensionLoginDialogSimple.prototype.handleSubmit=(i=null,function(t){var o,a,n,r,l;t.email=bg.fix_username(t.email),bg.Preferences.set({rememberemail:t.rememberEmail,rememberpassword:t.rememberPassword}),bg.make_lp_key_hash(t.email,t.password,(o=bg,a=this,function(e,i){o.set("g_manual_login",!0),o.LP_do_login(t.email,t.password,t.rememberEmail,t.rememberPassword,null,t.rememberShowVault,e,i),a.data.isPopup&&(t.disablePasswordManager&&"undefined"==typeof InstallTrigger?o.disablepasswordmanager(t.disablePasswordManager,a):a.close(!0))})),this.sendTimingEvent("loginUser","start"),this.data.isPopup?t.disablePasswordManager&&bg.disablepasswordmanager(t.disablePasswordManager,this):(e.show(!0),n=this,r=this.title,l=t.disablePasswordManager,null===i&&(i=setInterval(function(){"undefined"==typeof VaultState&&bg.getData&&bg.getData({context:"login"}),bg.get("lploggedin")?(clearInterval(i),i=null,n.title===r&&(l&&"undefined"==typeof InstallTrigger?bg.disablepasswordmanager(l,n):n.close(!0))):"error"===bg.get("g_notification_type")&&(clearInterval(i),i=null,dialogs.alert.open({title:Strings.translateString("Login Error"),text:Strings.translateString(bg.get("g_notification_data").msg),onResize:n.data.onResize,handler:function(){e.hide()}}))},1e3)))}),ExtensionLoginDialogSimple.prototype.sendTimingEvent=function(e,i,t){bg.sendTimingEvent(e,i,t)},ExtensionLoginDialogSimple.prototype.addError=function(e,i){var t=this.inputFields[e];t&&(t._errors.push(i),t.clearErrors=function(){this._errors=[],t._errorElement&&t._errorElement.remove(),this._errorElement=null,t.inputObject.input[0].className=t.inputObject.input[0].className.replace(" errorInput","")},t.inputObject.input[0].className.includes("errorInput")||(t.inputObject.input[0].className+=" errorInput"))},ExtensionLoginDialogSimple.prototype.clearError=function(e){var i=this.inputFields[e];i&&i.clearErrors()},ExtensionLoginDialogSimple.prototype.validateField=function(e,i,t,o){var a=!1;return i&&(this.clearError(t),a=i.validate(e,function(e){this.addError(t,e)},!0),o&&(!1===a?o.hide():o.show())),a},ExtensionLoginDialogSimple.prototype.validate=function(e){var i=Dialog.prototype.validate.apply(this,arguments);return i=this.inputFields.email.validate(e),i&=this.inputFields.password.validate(e)}}();
//# sourceMappingURL=sourcemaps/extensionLoginDialogSimple.js.map
