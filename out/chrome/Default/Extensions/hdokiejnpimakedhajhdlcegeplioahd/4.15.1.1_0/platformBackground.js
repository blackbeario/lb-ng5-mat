!function(e){var a;e.getBackgroundInterface=(a=null,function(e){return null===a&&((e=e||{}).source=window,e.direct=!0,a=Interfaces.createInstance(Interfaces.BackgroundInterface,e)),a}),e.getUILanguage=function(){return"en-US"}}(LPPlatform),function(e,a){e.getFavicon=function(e){e.callback&&e.callback(null)},e.onAuthRequired=function(e){return!1},e.once=function(e,a,t){if(e)var n=e(function(){n(),a.apply(t,arguments)})},e.getBigIcons=function(e,a){var t=(a=a||"big")+"icons",n=opendb();if(createDataTable(n),n){var r=function(a,t){e(t.rows.length>0&&null!==t.rows.item(0).data?t.rows.item(0).data:"")};if(g_indexeddb){var i={rows:{item:function(e){return this[e]},length:0}};n.transaction("LastPassData","readonly").objectStore("LastPassData").openCursor(IDBKeyRange.only(db_prepend(g_username_hash)+"_"+t)).onsuccess=function(e){var a=e.target.result;a?(i.rows[i.rows.length]=a.value,i.rows.length++,a.continue()):r(0,i)}}else n.transaction(function(e){e.executeSql("SELECT * FROM LastPassData WHERE username_hash=? AND type=?",[db_prepend(g_username_hash),t],r,function(e,a){console_log(a)})})}},e.saveBigIcons=function(e,a){var t=(a=a||"big")+"icons",n=opendb();createDataTable(n),n&&(g_indexeddb?n.transaction("LastPassData","readwrite").objectStore("LastPassData").put({username_hash:db_prepend(g_username_hash),type:t,data:e,usertype:db_prepend(g_username_hash)+"_"+t}):n.transaction(function(a){a.executeSql("REPLACE INTO LastPassData (username_hash, type, data) VALUES (?, ?, ?)",[db_prepend(g_username_hash),t,e],function(e,a){console_log("server.js : inserted")},function(e,a){console_log(a)})}))},e.updateBigIcons=function(){};var t,n,r,i,o,s,c,l,u=function(e,a){for(var t in e){var n=a[t];n&&(n.group=e[t])}};e.refreshGroupNames=function(e){e&&(u(e.sites,g_sites),u(e.notes,g_securenotes),u(e.applications,g_applications))},e.useDialogWindows=function(){return Preferences.get("htmlindialog")},t={},e.openTabDialog=function(a,n){var r,i,o={createAccountSimple:!0,siteTutorial:!0},s=a+(n?"-"+JSON.stringify(n):""),c=t[s];if(c)c.activate();else{var l={dialogWindow:e.useDialogWindows()&&!(n&&n.virtualKeyboard)},u={url:getchromeurl("tabDialog.html?dialog="+a),loadHandler:function(e){e.getTop().LPTabDialog.openDialog(a,n,l),t[s]=e},closeHandler:function(){delete t[s]},tabId:n&&n.tabId?n.tabId:void 0};if(u.tabId)e.navigateTab(u);else if(l.dialogWindow&&!o[a]){var f=Preferences.get("dialogSizePrefs"),d=f[a];u.features={height:d?d.height:600,width:d?d.width:800,left:d?d.left:0,top:d?d.top:0},u.features.width>window.screen.availWidth&&(u.features.width=window.screen.availWidth,u.features.left=0),u.features.height>window.screen.availHeight&&(u.features.height=window.screen.availHeight,u.features.top=0),u.closeHandler=(r=u.closeHandler,i=function(e){f[a]={height:e.outerHeight,width:e.outerWidth,left:e.screenLeft||e.screenX,top:e.screenTop||e.screenY},Preferences.set("dialogSizePrefs",f),delete t[s]},function(){r.apply(this,arguments),i.apply(this,arguments)}),e.openDialogWindow(u)}else if(o[a])e.openTab(u);else switch(Preferences.get("openpref")){case"tabs":e.openTab(u);break;case"windows":e.openWindow(u);break;case"same":e.openSame(u)}}},e.stringifyFeatures=function(e){var a=[];for(var t in e)a.push(t+"="+e[t]);return a.join(",")},e.doAjax=function(e){LPServer.ajax(e)},e.ajax=function(a){isOffline()?a.error&&a.error(null,null,"offline"):e.doAjax(a)},e.isEdge=function(){return is_edge()},e.copyDataIfEdge=function(a){return e.isEdge()&&void 0!==a?JSON.parse(JSON.stringify(a)):a},e.setUserPreference=(n=e.setUserPreference,function(e,a){n(e,a),g_userprefs_changed[e]=a}),e.setGlobalPreference=(r=e.setGlobalPreference,function(e,a){r(e,a),g_gblprefs_changed[e]=a}),e.writePreferences=function(){lpWriteAllPrefs()},e.closePopovers=function(){},e.showModalOverlay=function(a){e.getCurrentTabDetails(function(e){a(e.tabID)})},e.removeModalOverlay=function(e){},e.hideYoureAlmostDoneMarketingOverlay=function(e){},i={},o={},s={},c={},l={},a.LPTabs={get:function(e){if(e.interface){var a=[];for(var t in c)c[t].tabDetails.interfaceName===e.interface&&a.push(c[t]);return e.callback&&e.callback(a),a}if(void 0!==e.tabID){var n=c[e.tabID];if(n)return e.callback&&e.callback(n),n;if(e.callback){var r=s[e.tabID];r||(r=s[e.tabID]=[]),r.push(e.callback)}}return null}},e.getUnavailablePreferences=function(){return{clearClipboardSecsVal:!can_clear_clipboard(),openpopoverHk:!1,pollServerVal:g_nopoll,storeLostOTP:"0"===g_prefoverrides.account_recovery,showvault:g_hidevault||g_hideshowvault,homeHk:g_hidevault||g_hideshowvault,saveallHk:g_hidesaedhotkey,searchHk:g_hidesearch,usepopupfill:!g_offer_popupfill,recentUsedCount:g_hiderecentlyusedlistsize,searchNotes:g_hidenotes,idleLogoffVal:!(g_is_win||g_is_mac||g_is_linux),enablenamedpipes:lppassusernamehash||!(g_is_win||g_is_mac||g_is_linux)||is_chrome_portable(),enablenewlogin:!0}},e.initializeRequestFramework=function(e){var a=null,t=e.tabDetails||{},n=LPMessaging.getNewMessageSourceID(),r=!1,u=e.frameIdentity,f=!1,d=function(a){try{var t=!f;return t?(a.frameID=n,e.sendContentScript(a)):t}catch(e){return!1}},g=function(e){return d({type:"backgroundResponse",data:e})},p=Raven.wrap(function(f){switch(f.type){case"backgroundRequest":LPMessaging.handleRequest(Interfaces.BackgroundInterface,f.data,g,{additionalArguments:{tabURL:t.tabURL,tabID:t.tabID,windowID:t.windowID,frameID:n,top:r}});break;case"contentScriptRequest":case"contentScriptResponse":if(0===f.frameID)LPMessaging.handleResponse(f.data);else if(f.frameID){var p=i[f.frameID];p&&p(f)}break;case"initialize":!function(s){if(a=c[t.tabID],r=s.top,void 0!==t.tabID&&(r&&(o[t.tabID]=n),s.frameIdentity&&(u=t.tabID+"-"+s.frameIdentity)),d({type:"initialization",data:{tabID:t.tabID,frameID:n,topFrameID:o[t.tabID],request:s}}),s.extendFrame){var f=l[u].frameID,p=i[f];i[f]=function(e){d(e),p(e)}}else i[n]=d;if(s.interfaceName&&Interfaces.hasOwnProperty(s.interfaceName)){t.interfaceName||(t.interfaceName=s.interfaceName);var h=function(e){return LPMessaging.makeRequest(d,{type:"contentScriptRequest",sourceFrameID:0,data:e},g)},m=Interfaces.createInstance(Interfaces[s.interfaceName],{instance:s.extendFrame?l[u].interface:null,direct:!1,context:e.context||"background",requestFunction:h});if(u){var I=l[u];I&&I.frameID!==n&&I.disconnect(),l[u]={interface:m,disconnect:b,frameID:n}}"number"!=typeof t.tabID&&!t.tabID||s.interfaceName!==t.interfaceName||s.extendFrame||(a&&!r||(a&&a.disconnect(),a=c[t.tabID]=new LPTab(t)),a.addFrame(m,{topWindow:r,frameID:n,contentScriptRequester:h,childFrameCount:s.childFrameCount},b)),e.callback&&e.callback(m)}}(f.data);break;case"disconnect":b();break;case"initialized":r&&s[t.tabID]&&(s[t.tabID].forEach(function(e){e(a)}),delete s[t.tabID])}}),b=function(){if(!f){f=!0,delete i[n],delete l[u],o[t.tabID]===n&&delete o[t.tabID];var a=c[t.tabID];a&&(a.removeFrame(n),a.isEmpty()&&delete c[t.tabID]),e.onDisconnect&&e.onDisconnect()}};return{frameID:n,requestHandler:p,disconnectHandler:b}}}(LPPlatform,this);
//# sourceMappingURL=sourcemaps/platformBackground.js.map
