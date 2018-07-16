!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).Raven=t()}}(function(){return function t(e,r,n){function o(i,s){if(!r[i]){if(!e[i]){var l="function"==typeof require&&require;if(!s&&l)return l(i,!0);if(a)return a(i,!0);var u=new Error("Cannot find module '"+i+"'");throw u.code="MODULE_NOT_FOUND",u}var c=r[i]={exports:{}};e[i][0].call(c.exports,function(t){var r=e[i][1][t];return o(r||t)},c,c.exports,t,e,r,n)}return r[i].exports}for(var a="function"==typeof require&&require,i=0;i<n.length;i++)o(n[i]);return o}({1:[function(t,e,r){function n(t){this.name="RavenConfigError",this.message=t}n.prototype=new Error,n.prototype.constructor=n,e.exports=n},{}],2:[function(t,e,r){e.exports={wrapMethod:function(t,e,r){var n=t[e],o=t;if(e in t){var a="warn"===e?"warning":e;t[e]=function(){var t=[].slice.call(arguments),i=""+t.join(" "),s={level:a,logger:"console",extra:{arguments:t}};"assert"===e?!1===t[0]&&(i="Assertion failed: "+(t.slice(1).join(" ")||"console.assert"),s.extra.arguments=t.slice(1),r&&r(i,s)):r&&r(i,s),n&&Function.prototype.apply.call(n,o,t)}}}}},{}],3:[function(t,e,r){(function(r){var n=t(6),o=t(7),a=t(1),i=t(5),s=i.isError,l=i.isObject,u=i.isErrorEvent,c=i.isUndefined,f=i.isFunction,p=i.isString,h=i.isArray,g=i.isEmptyObject,d=i.each,_=i.objectMerge,v=i.truncate,m=i.objectFrozen,b=i.hasKey,y=i.joinRegExp,x=i.urlencode,w=i.uuid4,E=i.htmlTreeAsString,P=i.isSameException,k=i.isSameStacktrace,S=i.parseUrl,T=i.fill,O=t(2).wrapMethod,L="source protocol user pass host port path".split(" "),C=/^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/;function I(){return+new Date}var R="undefined"!=typeof window?window:void 0!==r?r:"undefined"!=typeof self?self:{},D=R.document,j=R.navigator;function U(t,e){return f(e)?function(r){return e(r,t)}:e}function F(){for(var t in this._hasJSON=!("object"!=typeof JSON||!JSON.stringify),this._hasDocument=!c(D),this._hasNavigator=!c(j),this._lastCapturedException=null,this._lastData=null,this._lastEventId=null,this._globalServer=null,this._globalKey=null,this._globalProject=null,this._globalContext={},this._globalOptions={logger:"javascript",ignoreErrors:[],ignoreUrls:[],whitelistUrls:[],includePaths:[],collectWindowErrors:!0,maxMessageLength:0,maxUrlLength:250,stackTraceLimit:50,autoBreadcrumbs:!0,instrument:!0,sampleRate:1},this._ignoreOnError=0,this._isRavenInstalled=!1,this._originalErrorStackTraceLimit=Error.stackTraceLimit,this._originalConsole=R.console||{},this._originalConsoleMethods={},this._plugins=[],this._startTime=I(),this._wrappedBuiltIns=[],this._breadcrumbs=[],this._lastCapturedEvent=null,this._keypressTimeout,this._location=R.location,this._lastHref=this._location&&this._location.href,this._resetBackoff(),this._originalConsole)this._originalConsoleMethods[t]=this._originalConsole[t]}F.prototype={VERSION:"3.20.1",debug:!1,TraceKit:n,config:function(t,e){var r=this;if(r._globalServer)return this._logDebug("error","Error: Raven has already been configured"),r;if(!t)return r;var o=r._globalOptions;e&&d(e,function(t,e){"tags"===t||"extra"===t||"user"===t?r._globalContext[t]=e:o[t]=e}),r.setDSN(t),o.ignoreErrors.push(/^Script error\.?$/),o.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/),o.ignoreErrors=y(o.ignoreErrors),o.ignoreUrls=!!o.ignoreUrls.length&&y(o.ignoreUrls),o.whitelistUrls=!!o.whitelistUrls.length&&y(o.whitelistUrls),o.includePaths=y(o.includePaths),o.maxBreadcrumbs=Math.max(0,Math.min(o.maxBreadcrumbs||100,100));var a={xhr:!0,console:!0,dom:!0,location:!0,sentry:!0},i=o.autoBreadcrumbs;"[object Object]"==={}.toString.call(i)?i=_(a,i):!1!==i&&(i=a),o.autoBreadcrumbs=i;var s={tryCatch:!0},l=o.instrument;return"[object Object]"==={}.toString.call(l)?l=_(s,l):!1!==l&&(l=s),o.instrument=l,n.collectWindowErrors=!!o.collectWindowErrors,r},install:function(){var t=this;return t.isSetup()&&!t._isRavenInstalled&&(n.report.subscribe(function(){t._handleOnErrorStackInfo.apply(t,arguments)}),t._patchFunctionToString(),t._globalOptions.instrument&&t._globalOptions.instrument.tryCatch&&t._instrumentTryCatch(),t._globalOptions.autoBreadcrumbs&&t._instrumentBreadcrumbs(),t._drainPlugins(),t._isRavenInstalled=!0),Error.stackTraceLimit=t._globalOptions.stackTraceLimit,this},setDSN:function(t){var e=this,r=e._parseDSN(t),n=r.path.lastIndexOf("/"),o=r.path.substr(1,n);e._dsn=t,e._globalKey=r.user,e._globalSecret=r.pass&&r.pass.substr(1),e._globalProject=r.path.substr(n+1),e._globalServer=e._getGlobalServer(r),e._globalEndpoint=e._globalServer+"/"+o+"api/"+e._globalProject+"/store/",this._resetBackoff()},context:function(t,e,r){return f(t)&&(r=e||[],e=t,t=void 0),this.wrap(t,e).apply(this,r)},wrap:function(t,e,r){var n=this;if(c(e)&&!f(t))return t;if(f(t)&&(e=t,t=void 0),!f(e))return e;try{if(e.__raven__)return e;if(e.__raven_wrapper__)return e.__raven_wrapper__}catch(t){return e}function o(){var o=[],a=arguments.length,i=!t||t&&!1!==t.deep;for(r&&f(r)&&r.apply(this,arguments);a--;)o[a]=i?n.wrap(t,arguments[a]):arguments[a];try{return e.apply(this,o)}catch(e){throw n._ignoreNextOnError(),n.captureException(e,t),e}}for(var a in e)b(e,a)&&(o[a]=e[a]);return o.prototype=e.prototype,e.__raven_wrapper__=o,o.__raven__=!0,o.__orig__=e,o},uninstall:function(){return n.report.uninstall(),this._unpatchFunctionToString(),this._restoreBuiltIns(),Error.stackTraceLimit=this._originalErrorStackTraceLimit,this._isRavenInstalled=!1,this},captureException:function(t,e){var r=!s(t),o=!u(t),a=u(t)&&!t.error;if(r&&o||a)return this.captureMessage(t,_({trimHeadFrames:1,stacktrace:!0},e));u(t)&&(t=t.error),this._lastCapturedException=t;try{var i=n.computeStackTrace(t);this._handleStackInfo(i,e)}catch(e){if(t!==e)throw e}return this},captureMessage:function(t,e){if(!this._globalOptions.ignoreErrors.test||!this._globalOptions.ignoreErrors.test(t)){var r,o=_({message:t+""},e=e||{});try{throw new Error(t)}catch(t){r=t}r.name=null;var a=n.computeStackTrace(r),i=h(a.stack)&&a.stack[1],s=i&&i.url||"";if((!this._globalOptions.ignoreUrls.test||!this._globalOptions.ignoreUrls.test(s))&&(!this._globalOptions.whitelistUrls.test||this._globalOptions.whitelistUrls.test(s))){if(this._globalOptions.stacktrace||e&&e.stacktrace){e=_({fingerprint:t,trimHeadFrames:(e.trimHeadFrames||0)+1},e);var l=this._prepareFrames(a,e);o.stacktrace={frames:l.reverse()}}return this._send(o),this}}},captureBreadcrumb:function(t){var e=_({timestamp:I()/1e3},t);if(f(this._globalOptions.breadcrumbCallback)){var r=this._globalOptions.breadcrumbCallback(e);if(l(r)&&!g(r))e=r;else if(!1===r)return this}return this._breadcrumbs.push(e),this._breadcrumbs.length>this._globalOptions.maxBreadcrumbs&&this._breadcrumbs.shift(),this},addPlugin:function(t){var e=[].slice.call(arguments,1);return this._plugins.push([t,e]),this._isRavenInstalled&&this._drainPlugins(),this},setUserContext:function(t){return this._globalContext.user=t,this},setExtraContext:function(t){return this._mergeContext("extra",t),this},setTagsContext:function(t){return this._mergeContext("tags",t),this},clearContext:function(){return this._globalContext={},this},getContext:function(){return JSON.parse(o(this._globalContext))},setEnvironment:function(t){return this._globalOptions.environment=t,this},setRelease:function(t){return this._globalOptions.release=t,this},setDataCallback:function(t){var e=this._globalOptions.dataCallback;return this._globalOptions.dataCallback=U(e,t),this},setBreadcrumbCallback:function(t){var e=this._globalOptions.breadcrumbCallback;return this._globalOptions.breadcrumbCallback=U(e,t),this},setShouldSendCallback:function(t){var e=this._globalOptions.shouldSendCallback;return this._globalOptions.shouldSendCallback=U(e,t),this},setTransport:function(t){return this._globalOptions.transport=t,this},lastException:function(){return this._lastCapturedException},lastEventId:function(){return this._lastEventId},isSetup:function(){return!!this._hasJSON&&(!!this._globalServer||(this.ravenNotConfiguredError||(this.ravenNotConfiguredError=!0,this._logDebug("error","Error: Raven has not been configured.")),!1))},afterLoad:function(){var t=R.RavenConfig;t&&this.config(t.dsn,t.config).install()},showReportDialog:function(t){if(D){var e=(t=t||{}).eventId||this.lastEventId();if(!e)throw new a("Missing eventId");var r=t.dsn||this._dsn;if(!r)throw new a("Missing DSN");var n=encodeURIComponent,o="";o+="?eventId="+n(e),o+="&dsn="+n(r);var i=t.user||this._globalContext.user;i&&(i.name&&(o+="&name="+n(i.name)),i.email&&(o+="&email="+n(i.email)));var s=this._getGlobalServer(this._parseDSN(r)),l=D.createElement("script");l.async=!0,l.src=s+"/api/embed/error-page/"+o,(D.head||D.body).appendChild(l)}},_ignoreNextOnError:function(){var t=this;this._ignoreOnError+=1,setTimeout(function(){t._ignoreOnError-=1})},_triggerEvent:function(t,e){var r,n;if(this._hasDocument){for(n in e=e||{},t="raven"+t.substr(0,1).toUpperCase()+t.substr(1),D.createEvent?(r=D.createEvent("HTMLEvents")).initEvent(t,!0,!0):(r=D.createEventObject()).eventType=t,e)b(e,n)&&(r[n]=e[n]);if(D.createEvent)D.dispatchEvent(r);else try{D.fireEvent("on"+r.eventType.toLowerCase(),r)}catch(t){}}},_breadcrumbEventHandler:function(t){var e=this;return function(r){if(e._keypressTimeout=null,e._lastCapturedEvent!==r){var n;e._lastCapturedEvent=r;try{n=E(r.target)}catch(t){n="<unknown>"}e.captureBreadcrumb({category:"ui."+t,message:n})}}},_keypressEventHandler:function(){var t=this;return function(e){var r;try{r=e.target}catch(t){return}var n=r&&r.tagName;if(n&&("INPUT"===n||"TEXTAREA"===n||r.isContentEditable)){var o=t._keypressTimeout;o||t._breadcrumbEventHandler("input")(e),clearTimeout(o),t._keypressTimeout=setTimeout(function(){t._keypressTimeout=null},1e3)}}},_captureUrlChange:function(t,e){var r=S(this._location.href),n=S(e),o=S(t);this._lastHref=e,r.protocol===n.protocol&&r.host===n.host&&(e=n.relative),r.protocol===o.protocol&&r.host===o.host&&(t=o.relative),this.captureBreadcrumb({category:"navigation",data:{to:e,from:t}})},_patchFunctionToString:function(){var t=this;t._originalFunctionToString=Function.prototype.toString,Function.prototype.toString=function(){return"function"==typeof this&&this.__raven__?t._originalFunctionToString.apply(this.__orig__,arguments):t._originalFunctionToString.apply(this,arguments)}},_unpatchFunctionToString:function(){this._originalFunctionToString&&(Function.prototype.toString=this._originalFunctionToString)},_instrumentTryCatch:function(){var t=this,e=t._wrappedBuiltIns;function r(e){return function(r,n){for(var o=new Array(arguments.length),a=0;a<o.length;++a)o[a]=arguments[a];var i=o[0];return f(i)&&(o[0]=t.wrap(i)),e.apply?e.apply(this,o):e(o[0],o[1])}}var n=this._globalOptions.autoBreadcrumbs;function o(r){var o=R[r]&&R[r].prototype;o&&o.hasOwnProperty&&o.hasOwnProperty("addEventListener")&&(T(o,"addEventListener",function(e){return function(o,a,i,s){try{a&&a.handleEvent&&(a.handleEvent=t.wrap(a.handleEvent))}catch(t){}var l,u,c;return n&&n.dom&&("EventTarget"===r||"Node"===r)&&(u=t._breadcrumbEventHandler("click"),c=t._keypressEventHandler(),l=function(t){if(t){var e;try{e=t.type}catch(t){return}return"click"===e?u(t):"keypress"===e?c(t):void 0}}),e.call(this,o,t.wrap(a,void 0,l),i,s)}},e),T(o,"removeEventListener",function(t){return function(e,r,n,o){try{r=r&&(r.__raven_wrapper__?r.__raven_wrapper__:r)}catch(t){}return t.call(this,e,r,n,o)}},e))}T(R,"setTimeout",r,e),T(R,"setInterval",r,e),R.requestAnimationFrame&&T(R,"requestAnimationFrame",function(e){return function(r){return e(t.wrap(r))}},e);for(var a=["EventTarget","Window","Node","ApplicationCache","AudioTrackList","ChannelMergerNode","CryptoOperation","EventSource","FileReader","HTMLUnknownElement","IDBDatabase","IDBRequest","IDBTransaction","KeyOperation","MediaController","MessagePort","ModalWindow","Notification","SVGElementInstance","Screen","TextTrack","TextTrackCue","TextTrackList","WebSocket","WebSocketWorker","Worker","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"],i=0;i<a.length;i++)o(a[i])},_instrumentBreadcrumbs:function(){var t=this,e=this._globalOptions.autoBreadcrumbs,r=t._wrappedBuiltIns;if(e.xhr&&"XMLHttpRequest"in R){var n=XMLHttpRequest.prototype;T(n,"open",function(e){return function(r,n){return p(n)&&-1===n.indexOf(t._globalKey)&&(this.__raven_xhr={method:r,url:n,status_code:null}),e.apply(this,arguments)}},r),T(n,"send",function(e){return function(r){var n=this;function o(){if(n.__raven_xhr&&4===n.readyState){try{n.__raven_xhr.status_code=n.status}catch(t){}t.captureBreadcrumb({type:"http",category:"xhr",data:n.__raven_xhr})}}for(var a,i,s=["onload","onerror","onprogress"],l=0;l<s.length;l++)(a=s[l])in(i=n)&&f(i[a])&&T(i,a,function(e){return t.wrap(e)});return"onreadystatechange"in n&&f(n.onreadystatechange)?T(n,"onreadystatechange",function(e){return t.wrap(e,void 0,o)}):n.onreadystatechange=o,e.apply(this,arguments)}},r)}e.xhr&&"fetch"in R&&T(R,"fetch",function(e){return function(r,n){for(var o=new Array(arguments.length),a=0;a<o.length;++a)o[a]=arguments[a];var i,s=o[0],l="GET";"string"==typeof s?i=s:"Request"in R&&s instanceof R.Request?(i=s.url,s.method&&(l=s.method)):i=""+s,o[1]&&o[1].method&&(l=o[1].method);var u={method:l,url:i,status_code:null};return t.captureBreadcrumb({type:"http",category:"fetch",data:u}),e.apply(this,o).then(function(t){return u.status_code=t.status,t})}},r),e.dom&&this._hasDocument&&(D.addEventListener?(D.addEventListener("click",t._breadcrumbEventHandler("click"),!1),D.addEventListener("keypress",t._keypressEventHandler(),!1)):(D.attachEvent("onclick",t._breadcrumbEventHandler("click")),D.attachEvent("onkeypress",t._keypressEventHandler())));var o=R.chrome,a=!(o&&o.app&&o.app.runtime)&&R.history&&history.pushState&&history.replaceState;if(e.location&&a){var i=R.onpopstate;R.onpopstate=function(){var e=t._location.href;if(t._captureUrlChange(t._lastHref,e),i)return i.apply(this,arguments)};var s=function(e){return function(){var r=arguments.length>2?arguments[2]:void 0;return r&&t._captureUrlChange(t._lastHref,r+""),e.apply(this,arguments)}};T(history,"pushState",s,r),T(history,"replaceState",s,r)}if(e.console&&"console"in R&&console.log){var l=function(e,r){t.captureBreadcrumb({message:e,level:r.level,category:"console"})};d(["debug","info","warn","error","log"],function(t,e){O(console,e,l)})}},_restoreBuiltIns:function(){for(var t;this._wrappedBuiltIns.length;){var e=(t=this._wrappedBuiltIns.shift())[0],r=t[1],n=t[2];e[r]=n}},_drainPlugins:function(){var t=this;d(this._plugins,function(e,r){var n=r[0],o=r[1];n.apply(t,[t].concat(o))})},_parseDSN:function(t){var e=C.exec(t),r={},n=7;try{for(;n--;)r[L[n]]=e[n]||""}catch(e){throw new a("Invalid DSN: "+t)}if(r.pass&&!this._globalOptions.allowSecretKey)throw new a("Do not specify your secret key in the DSN. See: http://bit.ly/raven-secret-key");return r},_getGlobalServer:function(t){var e="//"+t.host+(t.port?":"+t.port:"");return t.protocol&&(e=t.protocol+":"+e),e},_handleOnErrorStackInfo:function(){this._ignoreOnError||this._handleStackInfo.apply(this,arguments)},_handleStackInfo:function(t,e){var r=this._prepareFrames(t,e);this._triggerEvent("handle",{stackInfo:t,options:e}),this._processException(t.name,t.message,t.url,t.lineno,r,e)},_prepareFrames:function(t,e){var r=this,n=[];if(t.stack&&t.stack.length&&(d(t.stack,function(e,o){var a=r._normalizeFrame(o,t.url);a&&n.push(a)}),e&&e.trimHeadFrames))for(var o=0;o<e.trimHeadFrames&&o<n.length;o++)n[o].in_app=!1;return n=n.slice(0,this._globalOptions.stackTraceLimit)},_normalizeFrame:function(t,e){var r={filename:t.url,lineno:t.line,colno:t.column,function:t.func||"?"};return t.url||(r.filename=e),r.in_app=!(this._globalOptions.includePaths.test&&!this._globalOptions.includePaths.test(r.filename)||/(Raven|TraceKit)\./.test(r.function)||/raven\.(min\.)?js$/.test(r.filename)),r},_processException:function(t,e,r,n,o,a){var i,s=(t?t+": ":"")+(e||"");if((!this._globalOptions.ignoreErrors.test||!this._globalOptions.ignoreErrors.test(e)&&!this._globalOptions.ignoreErrors.test(s))&&(o&&o.length?(r=o[0].filename||r,o.reverse(),i={frames:o}):r&&(i={frames:[{filename:r,lineno:n,in_app:!0}]}),(!this._globalOptions.ignoreUrls.test||!this._globalOptions.ignoreUrls.test(r))&&(!this._globalOptions.whitelistUrls.test||this._globalOptions.whitelistUrls.test(r)))){var l=_({exception:{values:[{type:t,value:e,stacktrace:i}]},culprit:r},a);this._send(l)}},_trimPacket:function(t){var e=this._globalOptions.maxMessageLength;if(t.message&&(t.message=v(t.message,e)),t.exception){var r=t.exception.values[0];r.value=v(r.value,e)}var n=t.request;return n&&(n.url&&(n.url=v(n.url,this._globalOptions.maxUrlLength)),n.Referer&&(n.Referer=v(n.Referer,this._globalOptions.maxUrlLength))),t.breadcrumbs&&t.breadcrumbs.values&&this._trimBreadcrumbs(t.breadcrumbs),t},_trimBreadcrumbs:function(t){for(var e,r,n,o=["to","from","url"],a=0;a<t.values.length;++a)if((r=t.values[a]).hasOwnProperty("data")&&l(r.data)&&!m(r.data)){n=_({},r.data);for(var i=0;i<o.length;++i)e=o[i],n.hasOwnProperty(e)&&n[e]&&(n[e]=v(n[e],this._globalOptions.maxUrlLength));t.values[a].data=n}},_getHttpData:function(){if(this._hasNavigator||this._hasDocument){var t={};return this._hasNavigator&&j.userAgent&&(t.headers={"User-Agent":navigator.userAgent}),this._hasDocument&&(D.location&&D.location.href&&(t.url=D.location.href),D.referrer&&(t.headers||(t.headers={}),t.headers.Referer=D.referrer)),t}},_resetBackoff:function(){this._backoffDuration=0,this._backoffStart=null},_shouldBackoff:function(){return this._backoffDuration&&I()-this._backoffStart<this._backoffDuration},_isRepeatData:function(t){var e=this._lastData;return!(!e||t.message!==e.message||t.culprit!==e.culprit)&&(t.stacktrace||e.stacktrace?k(t.stacktrace,e.stacktrace):!t.exception&&!e.exception||P(t.exception,e.exception))},_setBackoffState:function(t){if(!this._shouldBackoff()){var e=t.status;if(400===e||401===e||429===e){var r;try{r=t.getResponseHeader("Retry-After"),r=1e3*parseInt(r,10)}catch(t){}this._backoffDuration=r||(2*this._backoffDuration||1e3),this._backoffStart=I()}}},_send:function(t){var e=this._globalOptions,r={project:this._globalProject,logger:e.logger,platform:"javascript"},n=this._getHttpData();n&&(r.request=n),t.trimHeadFrames&&delete t.trimHeadFrames,(t=_(r,t)).tags=_(_({},this._globalContext.tags),t.tags),t.extra=_(_({},this._globalContext.extra),t.extra),t.extra["session:duration"]=I()-this._startTime,this._breadcrumbs&&this._breadcrumbs.length>0&&(t.breadcrumbs={values:[].slice.call(this._breadcrumbs,0)}),g(t.tags)&&delete t.tags,this._globalContext.user&&(t.user=this._globalContext.user),e.environment&&(t.environment=e.environment),e.release&&(t.release=e.release),e.serverName&&(t.server_name=e.serverName),f(e.dataCallback)&&(t=e.dataCallback(t)||t),t&&!g(t)&&(f(e.shouldSendCallback)&&!e.shouldSendCallback(t)||(this._shouldBackoff()?this._logDebug("warn","Raven dropped error due to backoff: ",t):"number"==typeof e.sampleRate?Math.random()<e.sampleRate&&this._sendProcessedPayload(t):this._sendProcessedPayload(t)))},_getUuid:function(){return w()},_sendProcessedPayload:function(t,e){var r=this,n=this._globalOptions;if(this.isSetup())if(t=this._trimPacket(t),this._globalOptions.allowDuplicates||!this._isRepeatData(t)){this._lastEventId=t.event_id||(t.event_id=this._getUuid()),this._lastData=t,this._logDebug("debug","Raven about to send:",t);var o={sentry_version:"7",sentry_client:"raven-js/"+this.VERSION,sentry_key:this._globalKey};this._globalSecret&&(o.sentry_secret=this._globalSecret);var a=t.exception&&t.exception.values[0];this._globalOptions.autoBreadcrumbs&&this._globalOptions.autoBreadcrumbs.sentry&&this.captureBreadcrumb({category:"sentry",message:a?(a.type?a.type+": ":"")+a.value:t.message,event_id:t.event_id,level:t.level||"error"});var i=this._globalEndpoint;(n.transport||this._makeRequest).call(this,{url:i,auth:o,data:t,options:n,onSuccess:function(){r._resetBackoff(),r._triggerEvent("success",{data:t,src:i}),e&&e()},onError:function(n){r._logDebug("error","Raven transport failed to send: ",n),n.request&&r._setBackoffState(n.request),r._triggerEvent("failure",{data:t,src:i}),n=n||new Error("Raven send failed (no additional details provided)"),e&&e(n)}})}else this._logDebug("warn","Raven dropped repeat event: ",t)},_makeRequest:function(t){var e=R.XMLHttpRequest&&new R.XMLHttpRequest;if(e&&("withCredentials"in e||"undefined"!=typeof XDomainRequest)){var r=t.url;"withCredentials"in e?e.onreadystatechange=function(){if(4===e.readyState)if(200===e.status)t.onSuccess&&t.onSuccess();else if(t.onError){var r=new Error("Sentry error code: "+e.status);r.request=e,t.onError(r)}}:(e=new XDomainRequest,r=r.replace(/^https?:/,""),t.onSuccess&&(e.onload=t.onSuccess),t.onError&&(e.onerror=function(){var r=new Error("Sentry error code: XDomainRequest");r.request=e,t.onError(r)})),e.open("POST",r+"?"+x(t.auth)),e.send(o(t.data))}},_logDebug:function(t){this._originalConsoleMethods[t]&&this.debug&&Function.prototype.apply.call(this._originalConsoleMethods[t],this._originalConsole,[].slice.call(arguments,1))},_mergeContext:function(t,e){c(e)?delete this._globalContext[t]:this._globalContext[t]=_(this._globalContext[t]||{},e)}},F.prototype.setUser=F.prototype.setUserContext,F.prototype.setReleaseContext=F.prototype.setRelease,e.exports=F}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{1:1,2:2,5:5,6:6,7:7}],4:[function(t,e,r){(function(r){var n=t(3),o="undefined"!=typeof window?window:void 0!==r?r:"undefined"!=typeof self?self:{},a=o.Raven,i=new n;i.noConflict=function(){return o.Raven=a,i},i.afterLoad(),e.exports=i}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{3:3}],5:[function(t,e,r){(function(t){var r="undefined"!=typeof window?window:void 0!==t?t:"undefined"!=typeof self?self:{};function n(t){return void 0===t}function o(t){return"[object String]"===Object.prototype.toString.call(t)}function a(){try{return new ErrorEvent(""),!0}catch(t){return!1}}function i(t,e){var r,o;if(n(t.length))for(r in t)s(t,r)&&e.call(null,r,t[r]);else if(o=t.length)for(r=0;r<o;r++)e.call(null,r,t[r])}function s(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function l(t){var e,r,n,a,i,s=[];if(!t||!t.tagName)return"";if(s.push(t.tagName.toLowerCase()),t.id&&s.push("#"+t.id),(e=t.className)&&o(e))for(r=e.split(/\s+/),i=0;i<r.length;i++)s.push("."+r[i]);var l=["type","name","title","alt"];for(i=0;i<l.length;i++)n=l[i],(a=t.getAttribute(n))&&s.push("["+n+'="'+a+'"]');return s.join("")}function u(t,e){return!!(!!t^!!e)}function c(t,e){if(u(t,e))return!1;var r,n,o=t.frames,a=e.frames;if(o.length!==a.length)return!1;for(var i=0;i<o.length;i++)if(r=o[i],n=a[i],r.filename!==n.filename||r.lineno!==n.lineno||r.colno!==n.colno||r.function!==n.function)return!1;return!0}e.exports={isObject:function(t){return"object"==typeof t&&null!==t},isError:function(t){switch({}.toString.call(t)){case"[object Error]":case"[object Exception]":case"[object DOMException]":return!0;default:return t instanceof Error}},isErrorEvent:function(t){return a()&&"[object ErrorEvent]"==={}.toString.call(t)},isUndefined:n,isFunction:function(t){return"function"==typeof t},isString:o,isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},isEmptyObject:function(t){for(var e in t)if(t.hasOwnProperty(e))return!1;return!0},supportsErrorEvent:a,wrappedCallback:function(t){return function(e,r){var n=t(e)||e;return r&&r(n)||n}},each:i,objectMerge:function(t,e){return e?(i(e,function(e,r){t[e]=r}),t):t},truncate:function(t,e){return!e||t.length<=e?t:t.substr(0,e)+"…"},objectFrozen:function(t){return!!Object.isFrozen&&Object.isFrozen(t)},hasKey:s,joinRegExp:function(t){for(var e,r=[],n=0,a=t.length;n<a;n++)o(e=t[n])?r.push(e.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")):e&&e.source&&r.push(e.source);return new RegExp(r.join("|"),"i")},urlencode:function(t){var e=[];return i(t,function(t,r){e.push(encodeURIComponent(t)+"="+encodeURIComponent(r))}),e.join("&")},uuid4:function(){var t=r.crypto||r.msCrypto;if(!n(t)&&t.getRandomValues){var e=new Uint16Array(8);t.getRandomValues(e),e[3]=4095&e[3]|16384,e[4]=16383&e[4]|32768;var o=function(t){for(var e=t.toString(16);e.length<4;)e="0"+e;return e};return o(e[0])+o(e[1])+o(e[2])+o(e[3])+o(e[4])+o(e[5])+o(e[6])+o(e[7])}return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0;return("x"===t?e:3&e|8).toString(16)})},htmlTreeAsString:function(t){for(var e,r=[],n=0,o=0,a=" > ".length;t&&n++<5&&!("html"===(e=l(t))||n>1&&o+r.length*a+e.length>=80);)r.push(e),o+=e.length,t=t.parentNode;return r.reverse().join(" > ")},htmlElementAsString:l,isSameException:function(t,e){return!u(t,e)&&(t=t.values[0],e=e.values[0],t.type===e.type&&t.value===e.value&&c(t.stacktrace,e.stacktrace))},isSameStacktrace:c,parseUrl:function(t){var e=t.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!e)return{};var r=e[6]||"",n=e[8]||"";return{protocol:e[2],host:e[4],path:e[5],relative:e[5]+r+n}},fill:function(t,e,r,n){var o=t[e];t[e]=r(o),t[e].__raven__=!0,t[e].__orig__=o,n&&n.push([t,e,o])}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],6:[function(t,e,r){(function(r){var n=t(5),o={collectWindowErrors:!0,debug:!1},a="undefined"!=typeof window?window:void 0!==r?r:"undefined"!=typeof self?self:{},i=[].slice,s="?",l=/^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;function u(){return"undefined"==typeof document||null==document.location?"":document.location.href}o.report=function(){var t,e,r=[],c=null,f=null,p=null;function h(t,e){var n=null;if(!e||o.collectWindowErrors){for(var a in r)if(r.hasOwnProperty(a))try{r[a].apply(null,[t].concat(i.call(arguments,2)))}catch(t){n=t}if(n)throw n}}function g(e,r,a,i,c){if(p)o.computeStackTrace.augmentStackTraceWithInitialElement(p,r,a,e),d();else if(c&&n.isError(c))h(o.computeStackTrace(c),!0);else{var f,g={url:r,line:a,column:i},_=void 0,v=e;if("[object String]"==={}.toString.call(e))(f=e.match(l))&&(_=f[1],v=f[2]);g.func=s,h({name:_,message:v,url:u(),stack:[g]},!0)}return!!t&&t.apply(this,arguments)}function d(){var t=p,e=c;c=null,p=null,f=null,h.apply(null,[t,!1].concat(e))}function _(t,e){var r=i.call(arguments,1);if(p){if(f===t)return;d()}var n=o.computeStackTrace(t);if(p=n,f=t,c=r,setTimeout(function(){f===t&&d()},n.incomplete?2e3:0),!1!==e)throw t}return _.subscribe=function(n){e||(t=a.onerror,a.onerror=g,e=!0),r.push(n)},_.unsubscribe=function(t){for(var e=r.length-1;e>=0;--e)r[e]===t&&r.splice(e,1)},_.uninstall=function(){e&&(a.onerror=t,e=!1,t=void 0),r=[]},_}(),o.computeStackTrace=function(){function t(t){if(void 0!==t.stack&&t.stack){for(var e,r,n,o=/^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,a=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i,i=/^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,l=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,c=/\((\S*)(?::(\d+))(?::(\d+))\)/,f=t.stack.split("\n"),p=[],h=(/^(.*) is undefined$/.exec(t.message),0),g=f.length;h<g;++h){if(r=o.exec(f[h])){var d=r[2]&&0===r[2].indexOf("native");r[2]&&0===r[2].indexOf("eval")&&(e=c.exec(r[2]))&&(r[2]=e[1],r[3]=e[2],r[4]=e[3]),n={url:d?null:r[2],func:r[1]||s,args:d?[r[2]]:[],line:r[3]?+r[3]:null,column:r[4]?+r[4]:null}}else if(r=i.exec(f[h]))n={url:r[2],func:r[1]||s,args:[],line:+r[3],column:r[4]?+r[4]:null};else{if(!(r=a.exec(f[h])))continue;r[3]&&r[3].indexOf(" > eval")>-1&&(e=l.exec(r[3]))?(r[3]=e[1],r[4]=e[2],r[5]=null):0!==h||r[5]||void 0===t.columnNumber||(p[0].column=t.columnNumber+1),n={url:r[3],func:r[1]||s,args:r[2]?r[2].split(","):[],line:r[4]?+r[4]:null,column:r[5]?+r[5]:null}}!n.func&&n.line&&(n.func=s),p.push(n)}return p.length?{name:t.name,message:t.message,url:u(),stack:p}:null}}function e(t,e,r,n){var o={url:e,line:r};if(o.url&&o.line){if(t.incomplete=!1,o.func||(o.func=s),t.stack.length>0&&t.stack[0].url===o.url){if(t.stack[0].line===o.line)return!1;if(!t.stack[0].line&&t.stack[0].func===o.func)return t.stack[0].line=o.line,!1}return t.stack.unshift(o),t.partial=!0,!0}return t.incomplete=!0,!1}function r(t,a){for(var i,l,c=/function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i,f=[],p={},h=!1,g=r.caller;g&&!h;g=g.caller)if(g!==n&&g!==o.report){if(l={url:null,func:s,line:null,column:null},g.name?l.func=g.name:(i=c.exec(g.toString()))&&(l.func=i[1]),void 0===l.func)try{l.func=i.input.substring(0,i.input.indexOf("{"))}catch(t){}p[""+g]?h=!0:p[""+g]=!0,f.push(l)}a&&f.splice(0,a);var d={name:t.name,message:t.message,url:u(),stack:f};return e(d,t.sourceURL||t.fileName,t.line||t.lineNumber,t.message||t.description),d}function n(e,n){var a=null;n=null==n?0:+n;try{if(a=t(e))return a}catch(t){if(o.debug)throw t}try{if(a=r(e,n+1))return a}catch(t){if(o.debug)throw t}return{name:e.name,message:e.message,url:u()}}return n.augmentStackTraceWithInitialElement=e,n.computeStackTraceFromStackProp=t,n}(),e.exports=o}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{5:5}],7:[function(t,e,r){function n(t,e){for(var r=0;r<t.length;++r)if(t[r]===e)return r;return-1}function o(t,e){var r=[],o=[];return null==e&&(e=function(t,e){return r[0]===e?"[Circular ~]":"[Circular ~."+o.slice(0,n(r,e)).join(".")+"]"}),function(a,i){if(r.length>0){var s=n(r,this);~s?r.splice(s+1):r.push(this),~s?o.splice(s,1/0,a):o.push(a),~n(r,i)&&(i=e.call(this,a,i))}else r.push(i);return null==t?i instanceof Error?function(t){var e={stack:t.stack,message:t.message,name:t.name};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}(i):i:t.call(this,a,i)}}(e.exports=function(t,e,r,n){return JSON.stringify(t,o(e,n),r)}).getSerialize=o},{}]},{},[4])(4)}),LPPlatform={},LPPlatform.lpIsExtension=function(){return!0},LPPlatform.openURL=function(t){bg.openURL(t)},LPPlatform.getBaseURL=function(){return bg.get("base_url")},LPPlatform.doAjax=function(t){$.ajax(t)},LPPlatform.ajax=function(t){bg.isOffline()?t.error&&t.error(null,null,"offline"):LPPlatform.doAjax(t)},LPPlatform.getOpenGroups=function(){var t=bg.localStorage_getItem(bg.db_prepend(bg.get("g_username_hash")+".savedtree"));if(null!==t){for(var e={},r=0,n=(t=LPProxy.decrypt(t).split(",")).length;r<n;++r){var o=t[r];0===o.indexOf("_")&&(o=o.substring(1)),e[o]=!0}return e}return null},LPPlatform.setOpenGroups=function(t){for(var e=0,r=t.length;e<r;++e)t[e]="_"+t[e];var n=LPProxy.encrypt(t.join(","));bg.localStorage_setItem(bg.db_prepend(bg.get("g_username_hash")+".savedtree"),n)},LPPlatform.initialized=function(){return!0},LPPlatform.getHTML=function(t,e){$.ajax({url:t,success:e,dataType:"text"})},LPPlatform.loadedPreferences=function(){return LPTools.hasProperties(bg.get("g_userprefs"))},LPPlatform.openAttachment=function(t){bg.openAttach(t._parentNote.getID(),t.getID())},LPPlatform.saveAttachment=function(t){bg.exportAttachment(t._parentNote.getID(),t.getID())},LPPlatform.logException=function(t){var e="string"==typeof t?t:t.message;t.stack&&(e+="\n"+t.stack),self.Raven&&self.Raven.captureException(t),LPPlatform.logError(e)},LPPlatform.logError=function(t){t="Page: "+window.location.href+" Error: "+t;try{console.error(t),bg.lpReportError("VAULT_4_0: "+t)}catch(t){}},LPPlatform.addEventListener=function(t){if(t){for(var e=[],r=1;r<arguments.length;++r)e.push(arguments[r]);t.addEventListener.apply(t,e)}},LPPlatform.removeEventListener=function(t){for(var e=[],r=1;r<arguments.length;++r)e.push(arguments[r]);t.removeEventListener.apply(t,e)},LPPlatform.handleAcctsIFrameLoaded=function(){},LPPlatform.canBackgroundOpenPopover=function(){return!0},LPPlatform.generateSharingKeys=function(t){bg.generateSharingKeys(t)},LPPlatform.getResourcePath=function(t){return t},LPPlatform.canPreventBlur=function(){return!0},LPPlatform.getBackgroundData=function(t){return t},LPPlatform.showIntroTutorial=function(){LPPlatform.openTour()},LPPlatform.setIntroTutorialDisable=function(t){return!1},LPPlatform.supportsBinary=function(){return!0},LPPlatform.openKeyboard=function(){bg.LPPlatform.openTabDialog("login",{virtualKeyboard:!0})},LPPlatform.getImportHandler=function(){return"importerHandler"},LPPlatform.showDownloader=function(){return!1},LPPlatform.openTour=function(t){LPRequire.requireJS(["lpPing","Tour/lpPingManager","Tour/introTourShade","Tour/introTourPreferences","Tour/FamilyOnboarding/familyOnboardingTour","Tour/OmarMigrationTour/omarMigrationTour","Tour/OmarVaultTour/omarVaultTour","Tour/Vault41Tour/vault41Tour","Tour/introTourData","Tour/introTourFlow","Tour/introTourQueue","Tour/introTour"],function(){IntroTour&&IntroTour.start(t)})},LPPlatform.allowClipboardCopy=function(){return LPFeatures.allowClipboardCopy()},LPPlatform.getVersion=function(){return bg.get("lpversion")},function(t){var e;t.getExtensionDropdownDelay=function(){return-1},t.closePopup=function(e){(e||0===Dialog.prototype.getDialogCount()&&0===LPDialog.getPendingCount())&&t.doClosePopup()},t.doClosePopup=function(){window.close()},t.closeTab=function(){window.close()},t.checkBrowserPasswordManager=function(t){},t.setupDropdownImportMenu=function(t){t.addClass("singleImportOption");var e=$("#importMenuItemMain");e.unbind("click"),e.bind("click",function(t){bg.lpevent("m_i"),bg.openimport()})},t.getUnavailablePreferences=function(){return{clearClipboardSecsVal:!bg.can_clear_clipboard(),openpopoverHk:!t.canBackgroundOpenPopover(),pollServerVal:bg.get("g_nopoll"),storeLostOTP:"0"===bg.get("g_prefoverrides").account_recovery,showvault:bg.get("g_hidevault")||bg.get("g_hideshowvault"),homeHk:bg.get("g_hidevault")||bg.get("g_hideshowvault"),saveallHk:bg.get("g_hidesaedhotkey"),searchHk:bg.get("g_hidesearch"),usepopupfill:!bg.get("g_offer_popupfill"),recentUsedCount:bg.get("g_hiderecentlyusedlistsize"),searchNotes:bg.get("g_hidenotes"),idleLogoffVal:!(bg.get("g_is_win")||bg.get("g_is_mac")||bg.get("g_is_linux")),enablenamedpipes:bg.get("lppassusernamehash")||!(bg.get("g_is_win")||bg.get("g_is_mac")||bg.get("g_is_linux"))||bg.is_chrome_portable(),enablenewlogin:!0,notificationsBottom:bg.get("LPContentScriptFeatures").new_save_site,showSaveSiteNotifications:bg.get("LPContentScriptFeatures").new_save_site}},t.getPreferencesRequiringBinary=function(){return{enablenamedpipes:!0}},t.handlePreferenceChanges=function(t){!1===t.storeLostOTP&&bg.DeleteOTP()},t.resizeTo=function(t,e){window.resizeTo(t,e)},t.openCreateAccount=function(){bg.LPPlatform.openTabDialog("createAccount")},t.showIntroTutorial=function(){var t=bg.get("LPContentScriptFeatures");if(LPProxy.isFamilyUser()||t&&"vault"!==t.intro_tutorial_version||"US"!==bg.get("countryfromip"))LPVault.openTour();else{var e=LPProxy.getModelCount();if(0===e){if(!LPProxy.getPreference("showIntroTutorial",!0))return void LPVault.openTour();1==bg.get("g_one_minute_inbox_importer_dialog_enabled")?dialogs.introTutorialInboxImporter.open():dialogs.introTutorialWelcome.open()}else 1===e&&bg.IntroTutorial.getState(function(t){t.enabled?(Topics.get(Topics.EXPAND_ALL).publish(),dialogs.introTutorialComplete.open({tutorialState:t})):LPVault.openTour()})}},t.onLoad=(e=!1,Topics.get(Topics.INITIALIZED).subscribe(function(){e=!0}),function(t){e?t():Topics.get(Topics.INITIALIZED).subscribe(t)})}(LPPlatform);
//# sourceMappingURL=sourcemaps/platform.js.map
