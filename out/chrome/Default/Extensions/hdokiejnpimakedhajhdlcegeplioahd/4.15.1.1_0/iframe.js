bg=parent.bg,LPPlatform=parent.LPPlatform,goTo=function(e){if(0===e.indexOf(bg.get("base_url"))){var t=document.createElement("iframe");t.src=e,document.body.appendChild(t),LPPlatform.addEventListener(t,"load",function(){t.setAttribute("class","loaded"),LPPlatform.handleAcctsIFrameLoaded(t)})}},LPPlatform.addEventListener(window,"message",function(e){0===(e.origin+"/").indexOf(bg.get("base_url"))&&("getdata"===e.data.msg?bg.processCS(null,{cmd:"ipcgetdata",url:e.data.url,callback:function(t){"ipcgotdata"===t.cmd&&e.source.postMessage(LPPlatform.getBackgroundData(t),e.origin)}},null):"closeiframe"===e.data.msg?parent.LPProxy.closeIFrame():"websiteevent"==e.data.msg&&(g_websiteeventtarget=e,document.getElementById("eventtype").value=e.data.eventtype,document.getElementById("eventdata1").value=e.data.eventdata1,document.getElementById("eventdata2").value=e.data.eventdata2,document.getElementById("eventdata3").value=e.data.eventdata3,document.getElementById("eventdata4").value=e.data.eventdata4,document.getElementById("eventdata5").value=e.data.eventdata5,website_event()))});
//# sourceMappingURL=sourcemaps/iframe.js.map
