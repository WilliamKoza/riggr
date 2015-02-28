/* Part of the Riggr SPA framework <https://github.com/Fluidbyte/Riggr> and released under the MIT license. This notice must remain intact. */
!function(a,b){"function"==typeof define&&define.amd?define(["router","observer","knockout","jquery"],b):"object"==typeof exports?module.exports=b(require("router"),require("observer"),require("knockout"),require("jquery")):a.riggr=b(a.router,a.observer,a.ko,a.$)}(this,function(a,b,c,d){var e,f=0,g=0,h=!1,i=0,j=[],k={controllers:"controllers",views:"views",libs:"libs",sharedLibs:!1},l="appContainer",m="viewContainer",n=!1,o=function(a){h&&a&&(document.title=a+" | "+h),h&&!a&&(document.title=h),!h&&a&&(document.title=a)},p=function(a,b){var c,d=0,e=function(e,f){var g="[object Object]"===Object.prototype.toString.call(e)?!0:!1;g&&!k.sharedLibs&&console.error("The sharedLibs directory must be defined in the paths config before using a shared lib");var h=g?k.sharedLibs+"/"+e.path:k.libs+"/"+a.libs[e];require([h],function(h){a.libs[g?f:e]=h,d++,d===c&&b()})};if(a.hasOwnProperty("libs")){c=Object.keys(a.libs).length;for(var f in a.libs){var g=!1;"[object Object]"===Object.prototype.toString.call(a.libs[f])&&(g=f,f=a.libs[f]),e(f,g)}}else b()},q=function(a,f,g,h){var j=document.getElementById(m);d(j).fadeTo(i,0,function(){d(j).html(a),c.cleanNode(j),c.applyBindings(f,j),d(this).fadeTo(i,1),h&&f.load.apply(f,g),b.publish("onRoute")}),o(f.hasOwnProperty("pageTitle")?f.pageTitle:!1),e.timeStartRoute=+new Date},r=function(a){if(!a)return void console.error("Method register requires argument one to be controller scope");var b,d,e,f,g=document.getElementById(m);c.cleanNode(g);for(var h in a.observables)b=a.observables[h],(b.reset!==!1||void 0===a[h])&&(d=b.type||void 0!==b.value?!0:!1,f=d?b.value:b,e=c.observable,"array"===b.type?(e=c.observableArray,f=f&&f.length?JSON.parse(JSON.stringify(f)):[]):f="object"==typeof f?JSON.parse(JSON.stringify(f)):f,c.isObservable(a[h])?a[h](f):a[h]=d?e(f):f)},s=function(b,c){require([k.controllers+"/"+c],function(d){d.init&&"[object Function]"==={}.toString.call(d.init)&&!d.hasInit&&(d.init(),d.hasInit=!0),j.push(d);var e={};n&&(e.beforeAppRoute=n),e.before=d.hasOwnProperty("before")?function(){r(d),d.before.apply(d,arguments)}:function(a){r(d),a(!0)},e.load=d.hasOwnProperty("load")?function(){var a=arguments;require(["text!"+k.views+"/"+c+".html"],function(b){q(b,d,a,!0)})}:function(){require(["text!"+k.views+"/"+c+".html"],function(a){q(a,d,[],!1)})},d.hasOwnProperty("unload")&&(e.unload=d.unload.bind(d)),p(d,function(){a.on(b,e),g++,f===g&&t()})})},t=function(){require([k.controllers+"/app","text!"+k.views+"/app.html"],function(f,g){d("#"+l).html(g),c.applyBindings(f),b.subscribe("onRoute",function(){f.hasOwnProperty("onRoute")&&f.onRoute.apply(f),e.curRoute=window.location.hash.substr(1)}),f.hasOwnProperty("load")&&f.load.apply(f),a.process()})},u=function(a){e=a,Object.size=function(a){var b,c=0;for(b in a)a.hasOwnProperty(b)&&c++;return c},a.hasOwnProperty("paths")&&(k=a.paths),a.hasOwnProperty("beforeRoute")&&(n=a.beforeRoute.bind(a)),p(a,function(){h=a.hasOwnProperty("title")?a.title:!1,o("Loading"),i=a.hasOwnProperty("transition")?a.transition:0,f=Object.size(a.routes),a.init&&"[object Function]"==={}.toString.call(a.init)&&a.init(),a.timeStartRoute=+new Date;for(var b in a.routes)s(b,a.routes[b])})};return u});