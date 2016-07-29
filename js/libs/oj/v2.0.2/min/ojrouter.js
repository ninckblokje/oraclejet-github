/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore","knockout","signals","promise"],function(a,f,b){(function(){function d(){var b=window.location.href.split("#")[0];return b.substring(0,b.lastIndexOf("/"))}function c(b){var a={};b&&(b=b.split("\x26"),b.forEach(function(b){var d=b.split(/\=(.+)?/);b=d[0];b.length&&(a[b]||(a[b]=[]),d=d[1]&&decodeURIComponent(d[1].replace(/\+/g," ")),a[b].push(d))}));return a}function e(b,d){var c;d&&b.zo&&(a.l.om(d),b.zo.every(function(b){return b.vj===d?(c=b,!1):!0}));return c}function g(){return window.location.href.split("#")[0].replace(z,
"")}function h(b){return b.dm?h(b.dm)+"."+b.je:b.je}function k(b){return b?k(b.dm)+b.dB().vj+"/":"/"}function l(b,a){var d;b.mg.every(function(b){return b.em&&b.em!==a?!0:(d=b,!1)});return d}function m(){return K[0]&&K[0].cancel}function n(b){var d=b.charAt(0);b=b.slice(1);if("0"===d)b=decodeURIComponent(b);else if("1"===d)b=a.hQ.foa(b);else throw Error("Error retrieving bookmarkable data. Format is invalid");return JSON.parse(b)}function p(b,d){if(d&&0<Object.getOwnPropertyNames(d).length){var c;
c=-1===b.indexOf("?")?"?":"\x26";var e=b,f=JSON.stringify(d),g=encodeURIComponent(f),f=a.hQ.Kna(f),h=!1,k="oj_Router\x3d";f.length<=g.length&&(h=!0);k=h?k+("1"+f):k+("0"+g);if(1024<k.length)throw Error("Size of bookmarkable data is too big.");b=e+(c+k)}return b}function r(b,a,d){var c;b.mg.every(function(b){return b.em&&b.em!==d||!b.Xj(a)?!0:(c=b,!1)});return c}function s(b,a){var d=[],c=[],e=b,f=a.split("/"),g,h,k;for(f.splice(0,1);e;)c.unshift(e),e=e.dm;for(;g=f.shift();){e=c.shift();if(!e){if(e=
r(h,g,k),!e){R=a;break}}else if(!e.Xj(g))throw Error('Invalid path "'+a+'". State id "'+g+'" does not exist on router "'+e.je+'".');d.push({Gc:e,Yu:g});h=e;k=g}e=!0;for(c=d.length-1;0<=c&&e;c--)d[c].Yu===d[c].Gc.vk?d[c].Yu=null:e=!1;return d}function q(b,d,c){(b=b())||a.q.info("%s is false for state: %s",d,c);return b}function t(b,a,d,c){"function"===typeof b&&(a=a?a.then(function(a){a&&(a=q(b,d,c));return a}):new Promise(function(a){a(q(b,d,c))}));return a}function v(b,a){var d=b.dB(),c;if(d){for(c=
0;c<b.mg.length;c++)a=v(b.mg[c],a);c=d.XE&&d.XE.canExit?d.XE.canExit:d.jw;a=t(c,a,"canExit",d.vj)}return a}function x(b){if(m())return Promise.resolve(!1);a.q.info("Start _canExit.");b?(b=v(b,null),b=null===b?Promise.resolve(!0):b.then(function(b){return b&&!m()})):b=Promise.resolve(!0);return b}function u(b,d){if(m())return Promise.resolve();a.q.info("Start _canEnter.");var c=null;b.forEach(function(b){(b=b.Gc.Xj(b.value))&&(c=t(b.iw,c,"canEnter",b.vj))});return c=null===c?Promise.resolve({ZM:b,
origin:d}):c.then(function(a){var c;a&&!m()&&(c={ZM:b,origin:d});return c})}function w(b,d){var c=b.Gc.Xj(b.Gc.If()),e=b.value?b.Gc.Xj(b.value):void 0;return Promise.resolve().then(function(){a.q.info("Updating state of %s to %s.",h(b.Gc),b.value)}).then(c?c.Dw:void 0).then(function(){var a=b.Gc,c,e,f;if("popState"===d){e=a.Ut.length;for(c=e-1;0<=c;c--)if(a.Ut[c]===b.value){f=!0;a.Ut.splice(c,e-c);break}1===e-c&&(a.wx="back")}f||(delete a.wx,a.Ut.push(a.If()));a.If(b.value)}).then(e?e.Cw:void 0)}
function y(b){if(!b)return{hasChanged:!1};var d=Promise.resolve().then(function(){a.q.info("Entering _updateAll.");a.Za.GD=!0});b.ZM.forEach(function(a){d=d.then(function(){if(!m())return w(a,b.origin)})});return d.then(function(){var d=0<b.ZM.length&&!m();a.Za.GD=!1;a.q.info("_updateAll returns %s.",String(d));return{hasChanged:d}},function(b){a.Za.GD=!1;return Promise.reject(b)})}function C(b){var d={},c,e=b.split("?")[1]||"";a.q.info("Parsing: %s",b);b=A.zy(b);if(e=e.split("oj_Router\x3d")[1])e=
e.split("\x26")[0],d=n(e);if(a.q.option("level")===a.q.Zr)for(c in a.q.info("Bookmarkable data: "),d)a.q.info("   { router: %s, value: %s }",c,d[c]);b=A.parse(b).filter(function(b){var a=d[b.Gc.je];a&&(b.Gc.pj=a);return b.value!==b.Gc.If()});a.q.option("level")===a.q.Zr&&(a.q.info("Potential changes are: "),b.forEach(function(b){a.q.info("   { router: %s, value: %s }",h(b.Gc),b.value)}));return b}function J(b,a){var d;try{d=C(b)}catch(c){return Promise.reject(c)}return u(d,a).then(y)}function H(b){a.q.info("\x3e\x3e Executing: path\x3d%s, url\x3d%s, origin\x3d%s",
b.path,b.url,b.origin);return void 0!==b.url?"sync"===b.origin?J(b.url):x(b.Gc).then(function(a){return a?J(b.url,b.origin):{hasChanged:!1}}):b.Gc.gfa(b.path||null,b.replace)}function F(){var b=K[0];a.q.info("\x3e\x3e Resolving: path\x3d%s, url\x3d%s",b.path,b.url);b.cancel?(a.q.info("\x3e\x3e Cancelled: path\x3d%s, url\x3d%s",b.path,b.url),b=Promise.resolve({hasChanged:!1})):b=H(b);return b.then(function(b){var d=K.shift();a.q.info("\x3e\x3e Done with: path\x3d%s, url\x3d%s",d.path,d.url);a.Za.pu.dispatch(b);
return b},function(b){K=[];a.q.error("Error when executing transition: %s",b.message);a.Za.pu.dispatch({hasChanged:!1});return Promise.reject(b)})}function G(b){var d;d=K.push(b);a.q.info("\x3e\x3e Queue transition for path\x3d%s, url\x3d%s",b.path,b.url);1===d?I=F():(b=K[d-2],b.url||b.hoa||(a.q.info("\x3e\x3e Cancelling: path\x3d%s",b.path),b.cancel=!0),I=I.then(F));return I}function E(){var b,d,c=null;a.q.info("Handling popState event with URL: %s",window.location.href);for(b=0;b<D.mg.length;b++)if(d=
D.mg[b],D.If()&&D.If()===d.em){c=d;break}G({Gc:c,url:g(),origin:"popState"}).then(null,function(b){a.q.error("Error while changing state in handlePopState: %s",b.message)})}function B(){P||(A||(A=new a.Za.wP),z||(z=d()),window.addEventListener("popstate",E,!1),a.q.info("Initializing rootInstance."),a.q.info("Base URL is %s",z),a.q.info("This page is %s",L),a.q.info("Current URL is %s",window.location.href),P=!0)}var z,L=function(){var b="",a=window.location.pathname;-1!==a.indexOf(".html",a.length-
5)&&(b=a.split("/").pop());return b}(),A,P=!1,R,K=[],I;a.Za=function(b,a,d){var c=this;this.je=b;this.em=d||(a?a.If():void 0);this.dm=a;this.mg=[];this.pj=void 0;this.If=f.observable();this.ema=f.pureComputed({read:function(){return this.If()},write:function(b){this.go(b).then(null,function(b){throw b;})},owner:c});this.zo=null;this.vk=void 0;this.dB=f.pureComputed(function(){return f.ignoreDependencies(c.Xj,c,[c.If()])});this.pca=f.pureComputed(function(){var b,a=f.ignoreDependencies(c.Xj,c,[c.If()]);
a&&(b=a.value);return b});this.wx=void 0;this.Ut=[];this.wia=Object.create(null,{name:{value:f.pureComputed(function(){var b,a;a=this.If()||this.vk||this.zo[0];if(a=this.Xj(a))b=a.value,b&&"string"===typeof b||(b=a.vj);return b},c),enumerable:!0},params:{value:Object.create(null,{ojRouter:{value:new function(){Object.defineProperties(this,{parentRouter:{value:c,enumerable:!0},direction:{get:function(){return c.wx},enumerable:!0}})},enumerable:!0}}),enumerable:!0},lifecycleListener:{value:Object.create(null,
{attached:{value:function(b){var a=b.valueAccessor().params.ojRouter.parentRouter.dB();a&&(a.XE=b.viewModel)},writable:!0,enumerable:!0}}),enumerable:!0}});Object.defineProperties(this,{parent:{value:this.dm,enumerable:!0}})};o_("Router",a.Za,a);Object.defineProperties(a.Za.prototype,{name:{get:function(){return this.je},enumerable:!0},states:{get:function(){return this.zo},enumerable:!0},stateId:{get:function(){return this.ema},enumerable:!0},currentState:{get:function(){return this.dB},enumerable:!0},
currentValue:{get:function(){return this.pca},enumerable:!0},defaultStateId:{get:function(){return this.vk},set:function(b){this.vk=b},enumerable:!0},moduleConfig:{get:function(){return this.wia},enumerable:!0}});var D=new a.Za("root",void 0,void 0);a.Za.prototype.W2=function(b){var a;b&&"string"===typeof b&&(b=b.trim(),0<b.length&&this.mg.every(function(d){return d.je===b?(a=d,!1):!0}));return a};a.b.g("Router.prototype.getChildRouter",{W2:a.Za.prototype.W2});a.Za.prototype.s2=function(b,d){var c,
e;a.l.om(b);d=d||this.If();b=encodeURIComponent(b.trim());for(c=0;c<this.mg.length;c++){e=this.mg[c];if(e.je===b)throw Error('Invalid router name "'+b+'", it already exists.');if(e.em===d)throw Error('Cannot create more than one child router for parent state id "'+e.em+'".');}c=new a.Za(b,this,d);this.mg.push(c);return c};a.b.g("Router.prototype.createChildRouter",{s2:a.Za.prototype.s2});a.Za.prototype.Xj=function(b){return e(this,b)};a.Za.prototype.n2=function(b){this.If(void 0);delete this.vk;this.wx=
void 0;this.Ut=[];"function"===typeof b?(this.zo=null,this.Xj=b):(this.zo=[],delete this.Xj,Object.keys(b).forEach(function(d){var c=b[d];this.zo.push(new a.gs(d,c,this));"boolean"===typeof c.isDefault&&c.isDefault&&(this.vk=d)},this));return this};a.b.g("Router.prototype.configure",{n2:a.Za.prototype.n2});a.Za.prototype.D3=function(b){return this.Xj(b)};a.b.g("Router.prototype.getState",{D3:a.Za.prototype.D3});a.Za.prototype.go=function(b){B();return G({Gc:this,path:b,origin:"go"})};a.b.g("Router.prototype.go",
{go:a.Za.prototype.go});a.Za.prototype.gfa=function(b,d){function c(b){return b?J(f).then(function(b){if(b.hasChanged){var c=z+f;a.q.info("%s URL to %s",d?"Replacing":"Pushing",c);window.history[d?"replaceState":"pushState"](null,"",c)}return b}):{hasChanged:!1}}var e,f,q;e=!0;if(b)if("string"===typeof b)0<b.length&&(e=!1);else return Promise.reject(Error("Invalid object type for state id."));if(e&&(b=this.vk||null,!b))return a.q.option("level")===a.q.Zr&&a.q.info("Undefined state id with no default id on router %s",
h(this)),Promise.resolve({hasChanged:!1});e="/"===b.charAt(0)?b:k(this.dm)+b;a.q.info("Destination path: %s",e);try{q=s(this,e)}catch(l){return Promise.reject(l)}f=A.b2(q);a.q.option("level")===a.q.Zr&&a.q.info("Going to URL %s on router %s",f,h(this));q=A.zy(g());return d||A.zy(f)!==q?(a.q.info("Deferred mode or new URL is different."),x(this).then(c)):Promise.resolve({hasChanged:!1})};a.Za.prototype.P5=function(b){this.pj=b;b={};for(var a=this;a;)a.pj&&(b[a.je]=a.pj),a=a.dm;for(var a=this,d,c,e;a;){for(c=
0;c<a.mg.length;c++)if(e=a.mg[c],a.If()&&a.If()===e.em){e.pj&&(b[e.je]=e.pj);d=e;break}a=d;d=void 0}d=z+A.zy(g());d=p(d,b);window.history.replaceState(null,"",d)};a.b.g("Router.prototype.store",{P5:a.Za.prototype.P5});a.Za.prototype.t5=function(){return this.pj};a.b.g("Router.prototype.retrieve",{t5:a.Za.prototype.t5});a.Za.prototype.Du=function(){for(var b,d;0<this.mg.length;)this.mg[0].Du();if(this.dm){b=this.dm.mg;for(d=0;d<b.length;d++)if(b[d].je===this.je){b.splice(d,1);break}delete this.em}else z=
"",A={},this.je="root",window.removeEventListener("popstate",E),a.Za.pu.removeAll(),P=!1;delete this.wx;this.Ut=[];this.zo=null;delete this.vk;delete this.pj};a.b.g("Router.prototype.dispose",{Du:a.Za.prototype.Du});a.Za.pu=new b.Signal;a.Za.GD=!1;Object.defineProperties(a.Za,{rootInstance:{value:D,enumerable:!0},transitionedToState:{value:a.Za.pu,enumerable:!0}});a.Za.hc={};o_("Router.defaults",a.Za.hc,a);Object.defineProperties(a.Za.hc,{urlAdapter:{get:function(){A||(A=new a.Za.wP);return A},set:function(b){if(P)throw Error("Incorrect operation. Cannot change URL adapter after calling sync() or go().");
A=b},enumerable:!0,ME:!1},baseUrl:{get:function(){z||(z=d());return z},set:function(b){if(P)throw Error("Incorrect operation. Cannot change base URL after calling sync() or go().");z=b.replace(/\/$/,"")},enumerable:!0,ME:!1},rootInstanceName:{get:function(){return D.je},set:function(b){if(P)throw Error("Incorrect operation. Cannot change the name of the root instance after calling sync() or go().");a.l.om(b);D.je=encodeURIComponent(b.trim())},enumerable:!0,ME:!1}});a.Za.pP=function(){var b;B();a.q.info("Entering sync.");
if(R)return b={Gc:D,path:R,hoa:!0,replace:!0},R=void 0,G(b);if(a.Za.GD)return a.q.info("Sync called while updating, waiting for updates to end."),new Promise(function(b){a.Za.pu.addOnce(function(d){a.q.info("Sync updates done.");b(d)})});b={Gc:D,url:g(),origin:"sync"};return G(b)};o_("Router.sync",a.Za.pP,a);a.Za.wP=function(){this.parse=function(b){var a=D;b=b.split("/");var d=[],c;b.shift();do(c=b.shift())&&(0===c.length||/\.html$/i.test(c))&&(c=void 0),c=c||a.vk,d.push({value:c,Gc:a}),a=l(a,c);
while(a);return d};this.b2=function(b){var d="",c={};b.forEach(function(b){b.Yu&&(d+="/"+b.Yu);b.Gc.Gsa&&(c[b.Gc.je]=b.Gc.pj)});""===d&&(d="/"+L);try{d=p(d,c)}catch(e){a.q.error("Error while building URL: %s",e)}return d};this.zy=function(b){return b.split("?")[0]};this.u3=function(b){var a=b.indexOf("?"),d=null;-1!==a&&(d=b.substr(a+1));return c(d)}};o_("Router.urlPathAdapter",a.Za.wP,a);a.Za.ira=function(){this.parse=function(b){b=this.u3(b);var a=D,d=[],c;do{if(c=b[a.je])c=c[0],delete b[a.je];
c=c||a.vk;d.push({value:c,Gc:a});a=l(a,c)}while(a);return d};this.b2=function(b){var d="/"+L,c={},e="?";b.forEach(function(b){b.Yu&&(d+=e+b.Gc.je+"\x3d"+b.Yu,e="\x26");b.Gc.pj&&(c[b.Gc.je]=b.Gc.pj)});try{d=p(d,c)}catch(f){a.q.error("Error while building URL: %s",f)}return d};this.zy=function(b){var a=b.indexOf("oj_Router\x3d");return-1!==a?b.substr(0,a-1):b};this.u3=function(b){var a=b.indexOf("?"),d=null,d={};-1!==a&&(d=b.substr(a+1),d=c(d));return d}};o_("Router.urlParamAdapter",a.Za.ira,a);return D})();
(function(){function b(a,d){if(null===a)return"";var c,e,f={},g={},h="",q=2,t=3,v=2,x="",u=0,w=0,y,C,J,H=a.length;for(J=0;J<H;J++)if(y=a[J],Object.prototype.hasOwnProperty.call(f,y)||(f[y]=t++,g[y]=!0),C=h+y,Object.prototype.hasOwnProperty.call(f,C))h=C;else{if(Object.prototype.hasOwnProperty.call(g,h)){if(256>h.charCodeAt(0)){for(c=v;c--;)u<<=1,5==w?(w=0,x+=d(u),u=0):w++;e=h.charCodeAt(0);c=8}else{e=1;for(c=v;c--;)u=u<<1|e,5==w?(w=0,x+=d(u),u=0):w++,e=0;e=h.charCodeAt(0);c=16}for(;c--;)u=u<<1|e&
1,5==w?(w=0,x+=d(u),u=0):w++,e>>=1;q--;0==q&&(q=Math.pow(2,v),v++);delete g[h]}else for(e=f[h],c=v;c--;)u=u<<1|e&1,5==w?(w=0,x+=d(u),u=0):w++,e>>=1;q--;0==q&&(q=Math.pow(2,v),v++);f[C]=t++;h=String(y)}if(""!==h){if(Object.prototype.hasOwnProperty.call(g,h)){if(256>h.charCodeAt(0)){for(c=v;c--;)u<<=1,5==w?(w=0,x+=d(u),u=0):w++;e=h.charCodeAt(0);c=8}else{e=1;for(c=v;c--;)u=u<<1|e,5==w?(w=0,x+=d(u),u=0):w++,e=0;e=h.charCodeAt(0);c=16}for(;c--;)u=u<<1|e&1,5==w?(w=0,x+=d(u),u=0):w++,e>>=1;q--;0==q&&(q=
Math.pow(2,v),v++);delete g[h]}else for(e=f[h],c=v;c--;)u=u<<1|e&1,5==w?(w=0,x+=d(u),u=0):w++,e>>=1;q--;0==q&&v++}e=2;for(c=v;c--;)u=u<<1|e&1,5==w?(w=0,x+=d(u),u=0):w++,e>>=1;for(;;)if(u<<=1,5==w){x+=d(u);break}else w++;return x}function c(b,a){for(var d=[],c=4,f=4,g=3,h="",q="",t,v,x,u,w,y={val:a(0),position:32,index:1},q=0;3>q;q+=1)d[q]=q;h=0;x=Math.pow(2,2);for(u=1;u!=x;)v=y.val&y.position,y.position>>=1,0==y.position&&(y.position=32,y.val=a(y.index++)),h|=(0<v?1:0)*u,u<<=1;switch(h){case 0:h=
0;x=Math.pow(2,8);for(u=1;u!=x;)v=y.val&y.position,y.position>>=1,0==y.position&&(y.position=32,y.val=a(y.index++)),h|=(0<v?1:0)*u,u<<=1;w=e(h);break;case 1:h=0;x=Math.pow(2,16);for(u=1;u!=x;)v=y.val&y.position,y.position>>=1,0==y.position&&(y.position=32,y.val=a(y.index++)),h|=(0<v?1:0)*u,u<<=1;w=e(h);break;case 2:return""}for(t=q=d[3]=w;;){if(y.index>b)return"";h=0;x=Math.pow(2,g);for(u=1;u!=x;)v=y.val&y.position,y.position>>=1,0==y.position&&(y.position=32,y.val=a(y.index++)),h|=(0<v?1:0)*u,u<<=
1;switch(w=h){case 0:h=0;x=Math.pow(2,8);for(u=1;u!=x;)v=y.val&y.position,y.position>>=1,0==y.position&&(y.position=32,y.val=a(y.index++)),h|=(0<v?1:0)*u,u<<=1;d[f++]=e(h);w=f-1;c--;break;case 1:h=0;x=Math.pow(2,16);for(u=1;u!=x;)v=y.val&y.position,y.position>>=1,0==y.position&&(y.position=32,y.val=a(y.index++)),h|=(0<v?1:0)*u,u<<=1;d[f++]=e(h);w=f-1;c--;break;case 2:return q}0==c&&(c=Math.pow(2,g),g++);if(d[w])h=d[w];else if(w===f)h=t+t[0];else return null;q+=h;d[f++]=t+h[0];c--;t=h;0==c&&(c=Math.pow(2,
g),g++)}}a.hQ={Kna:function(a){return null===a?"":b(a,function(b){return f.charAt(b)})},foa:function(b){return null===b?"":""===b?null:c(b.length,function(a){var d=f;a=b.charAt(a);var c;h||(h={});if(!h[d])for(h[d]={},c=0;c<d.length;c++)h[d][d[c]]=c;return h[d][a]})}};var e=String.fromCharCode,f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",h})();(function(){a.gs=function(b,c,e){c=c||{};a.l.om(b);this.vj=encodeURIComponent(b.trim());(this.iw=c.canEnter)&&a.l.wu(this.iw);(this.Cw=
c.enter)&&a.l.wu(this.Cw);(this.jw=c.canExit)&&a.l.wu(this.jw);(this.Dw=c.exit)&&a.l.wu(this.Dw);this.J1=c.value;this.UY=c.label;this.YC=e;this.XE=void 0;Object.defineProperties(this,{id:{value:this.vj,enumerable:!0},value:{get:function(){return this.J1},set:function(b){this.J1=b},enumerable:!0},label:{get:function(){return this.UY},set:function(b){this.UY=b},enumerable:!0},canEnter:{get:function(){return this.iw},set:function(b){this.iw=b},enumerable:!0},enter:{get:function(){return this.Cw},set:function(b){this.Cw=
b},enumerable:!0},canExit:{get:function(){return this.jw},set:function(b){this.jw=b},enumerable:!0},exit:{get:function(){return this.Dw},set:function(b){this.Dw=b},enumerable:!0}})};o_("RouterState",a.gs,a);a.gs.prototype.go=function(){return this.YC?this.YC.go(this.vj):(a.Za.pu.dispatch({hasChanged:!1}),Promise.reject(Error("Router is not defined for this RouterState object.")))};a.b.g("RouterState.prototype.go",{go:a.gs.prototype.go});a.gs.prototype.h4=function(){if(!this.YC)throw Error("Router is not defined for this RouterState object.");
return this.YC.If()===this.vj};a.b.g("RouterState.prototype.isCurrent",{h4:a.gs.prototype.h4})})()});