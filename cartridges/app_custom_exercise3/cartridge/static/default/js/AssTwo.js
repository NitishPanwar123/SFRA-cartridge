!function(e){var n={};function o(t){if(n[t])return n[t].exports;var l=n[t]={i:t,l:!1,exports:{}};return e[t].call(l.exports,l,l.exports,o),l.l=!0,l.exports}o.m=e,o.c=n,o.d=function(e,n,t){o.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,n){if(1&n&&(e=o(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var l in e)o.d(t,l,function(n){return e[n]}.bind(null,l));return t},o.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(n,"a",n),n},o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},o.p="",o(o.s=0)}([function(e,n){console.log("h");var o=document.getElementById("myModal"),t=document.getElementById("myBtn"),l=document.getElementById("close");t.onclick=function(){o.style.display="block"},window.onclick=function(e){e.target==o&&(o.style.display="none")};var r=document.getElementById("weeks");r.onchange=function(){console.log(r.value),week=r.value},document.getElementById("abc").onclick=function(){console.log("hit"),console.log(week)},l.onclick=function(){o.style.display="none",console.log(week);var e="https://zydf-004.sandbox.us01.dx.commercecloud.salesforce.com/on/demandware.store/Sites-nitish-Site/en_US/HelloV3-Start?store="+week;console.log(e),$.ajax({type:"GET",url:e,success:function(e,n,o){console.log("success")},error:function(e,n,o){console.log(o)}})}}]);