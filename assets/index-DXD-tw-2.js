(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();SVGElement.prototype.setSVGAttributes=function(t){return Object.keys(t).forEach(n=>{this.setAttribute(n,t[n])}),this};function m(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function c(e){return e.toFixed(2)}const M=1e3;function we(e,t="default"){const n=M,r=M,s={x:n/2,y:r/2},o="#FCF4F1",l="#444444",a=M/4,u=a/4,d=m("svg").setSVGAttributes({viewBox:`0 0 ${n} ${r}`,preserveAspectRatio:"xMidYMid meet",xmlns:"http://www.w3.org/2000/svg",role:"img","aria-label":"Compass"});function b(){const p=m("defs"),h=m("filter").setSVGAttributes({id:"dropShadow"}),E=m("feDropShadow").setSVGAttributes({dx:c(M/40),dy:c(M/40),stdDeviation:"0.5","flood-color":l,"flood-opacity":"0.25"});return h.appendChild(E),p.appendChild(h),p}function x(){const h=a/3,E=M/50,g=a+a/4,_=M/60,G=a-h,V=a-h,O=M/90,B=a/1.8,y=a-h;function S(w){let f=0,C=0,k=0,I=o;return w%2!==0&&(f=O,C=B,k=y,I=`${o}cc`),w%2===0&&(f=_,C=G,k=V),w%4===0&&(f=E,C=g,k=0),{width:f,height:C,yOffset:k,fillColor:I}}const $=m("g");for(let w=0;w<16;w++){const{width:f,height:C,yOffset:k,fillColor:I}=S(w),Y=m("rect").setSVGAttributes({x:c(s.x-f/2),y:c(s.y+k),width:c(f),height:c(C),fill:I,rx:c(f),transform:`rotate(${w*90/4}, ${s.x}, ${s.y})`});$.appendChild(Y)}return $}function v(){const p=m("g"),h=m("circle").setSVGAttributes({cx:c(s.x),cy:c(s.y),r:c(a),fill:"none",stroke:o,"stroke-width":c(u)}),E=m("circle").setSVGAttributes({cx:c(s.x),cy:c(s.y),r:c(a),fill:"none",stroke:l,"stroke-width":c(u/4),opacity:"0.5"});return p.appendChild(h),p.appendChild(E),p}function L(){const p=M/7.5,h=l,E=p/75,g=o,_=[{label:"N",x:s.x,y:s.y-a-u-p/1.5},{label:"E",x:s.x-p/1.5-a-u,y:s.y},{label:"S",x:s.x,y:s.y+p/1+a+u},{label:"W",x:s.x+p/1.5+a+u,y:s.y}],G=m("g");for(let V of _){const O=m("text").setSVGAttributes({x:c(V.x),y:c(V.y),"font-family":"Arial","font-size":c(p),"text-anchor":"middle","dominant-baseline":"middle",fill:g,stroke:h,"stroke-width":c(E)});O.textContent=V.label,G.appendChild(O)}return G}function T(){const p=u/4,h=a/1.75,E=a/1.75,g=a/3,_=o,G=l,V=`${s.x},${s.y+a}`,O=`${s.x-h},${s.y-E} `,B=`${s.x+h},${s.y-E} `,y=`${s.x},${s.y-g} `;return m("polygon").setSVGAttributes({points:`${V} ${B} ${y} ${O}`,fill:_,stroke:G,"stroke-width":c(p),transform:`rotate(${e}, ${s.x}, ${s.y})`,filter:"url(#dropShadow)"})}return d.appendChild(b()),t!=="small"&&(d.appendChild(x()),d.appendChild(L())),d.appendChild(v()),d.appendChild(T()),d}const F=100,xe=6,A={light:"#fcfcfc",dark:"#444444",mercury:"#441414",glass:"#ddd"};function Se(e){const t=F,n=F,r=F/xe,s=F/5,o=n*2/3,l=n-n/6,a=(e-950)*.01,u=o*a,d=t/12,b=d*3.5/3,x=o+b/2,v=d-d/2,L=x-d/3,T=b-d/4,p=v-v/3,h=d,E=t/2/2,g={centerX:r*5-d/2,bottomY:l},_=m("svg").setSVGAttributes({viewBox:`0 0 ${t} ${n}`,preserveAspectRatio:"xMidYMid meet",xmlns:"http://www.w3.org/2000/svg","font-family":"inherit",role:"img","aria-label":`Barometer showing pressure: ${e} mbar`});function G(){const y=m("defs"),S=m("filter").setSVGAttributes({id:"dropShadow",x:"-50%",y:"-50%",width:"200%",height:"200%"}),$=m("feDropShadow").setSVGAttributes({dx:"0.5",dy:"0.5",stdDeviation:"0.75","flood-color":"#000","flood-opacity":"0.05"});return S.appendChild($),y.appendChild(S),y}function V(){const y=m("g").setSVGAttributes({class:"barometer-image"});function S(){const f=m("g").setSVGAttributes({id:"board",filter:"url(#dropShadow)"}),C=m("rect").setSVGAttributes({x:c(g.centerX-d/2),y:c(l-x),width:c(d),height:c(x),fill:A.light,rx:c(d/2)}),k=m("circle").setSVGAttributes({cx:c(g.centerX),cy:c(l),r:c(b),fill:A.light});return f.appendChild(C),f.appendChild(k),f}function $(){const f=m("g").setSVGAttributes({id:"tube",filter:"url(#dropShadow)"}),C=m("rect").setSVGAttributes({x:c(g.centerX-v/2),y:c(g.bottomY-L),width:c(v),height:c(L),fill:A.glass,rx:c(v/2)}),k=m("circle").setSVGAttributes({cx:c(g.centerX),cy:c(l),r:c(T),fill:A.glass});return f.appendChild(C),f.appendChild(k),f}function w(){const f=m("g").setSVGAttributes({id:"mercury-fill"}),C=m("rect").setSVGAttributes({x:c(g.centerX-p/2),y:c(g.bottomY-u),width:c(p),height:c(u),fill:A.mercury}),k=m("circle").setSVGAttributes({cx:c(g.centerX),cy:c(g.bottomY),r:c(T-T/8),fill:A.mercury});return f.appendChild(C),f.appendChild(k),f}return y.appendChild(S()),y.appendChild($()),y.appendChild(w()),y}function O(){const y=F/80,S=r*4,$=h/2;return m("line").setSVGAttributes({x1:c(S-$),x2:c(S+$),y1:c(l-u),y2:c(l-u),"stroke-width":c(y),stroke:A.light,"stroke-linecap":"round"})}function B(){const y="0.0025em",S=A.dark,$=m("g"),w=m("text").setSVGAttributes({x:c(E),y:c(l-u),"font-family":"inherit",class:"barometer-info","font-size":c(s),"font-weight":"bold","text-anchor":"middle","dominant-baseline":"middle",fill:A.light,stroke:S,"stroke-width":y,filter:"url(#dropShadow)"});w.innerHTML=`${e}`;const f=m("text").setSVGAttributes({x:c(E),y:c(l-u+s/1.5),class:"barometer-info","font-size":c(s*.6),"text-anchor":"middle","dominant-baseline":"middle",fill:A.light,stroke:S,"stroke-width":y});return f.innerHTML="mbar",$.appendChild(w),$.appendChild(f),$}return _.append(G(),V(),B(),O()),_}function i(e,t,...n){const r=document.createElement(e);for(let s in t)r.setAttribute(s,t[s]);return n.forEach(s=>{typeof s=="string"?r.appendChild(document.createTextNode(s)):r.appendChild(s)}),r}function U(e){const t=new Date(e*1e3),n=t.getMinutes().toString().padStart(2,"0");let r,s="AM",o=t.getHours();return o>=12&&(s="PM"),o=o%12,o===0&&(o=12),r=`${o}:${n} ${s}`,r}function D(e,t,n){switch(t){case"Kelvin":return(e*9/5-459.67).toFixed(0);case"Celsius":return(e*9/5+32).toFixed(0);case"Fahrenheit":default:return String(e)}}function re(e,t="m/s",n="mph"){return t==="m/s"&&n==="mph"?`${Math.floor(e*2.237)} mph`:`${e} m/s`}function $e(e,t,n){const r={value:String(e),units:t};return r.value=(e*621371e-9).toFixed(2),r.units=n,r}function Ce(e){return(e*100).toFixed(0)}function de(e,t,n){const r={value:String(e),units:"mm"};return r.value=(e*.0393701).toFixed(2),r.units=n,r}function ke(e){let t={value:"",class:""};return e<3&&(t.value="low",t.class="low"),e>=3&&e<6&&(t.value="moderate",t.class="moderate"),e>=6&&e<8&&(t.value="high",t.class="high"),e>=8&&e<11&&(t.value="very high",t.class="very-high"),e>=11&&(t.value="extreme",t.class="extreme"),t}const Le="data:image/svg+xml,%3csvg%20class='raindrop'%20aria-labelledby='svg%20raindrop'%20focusable='false'%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%20-5%2024%2024'%3e%3cstyle%3e%20.accent%20{%20fill:%20%23fcf4f1;%20animation:%20accent-animation%201.618s%20ease%20alternate%20infinite;%20}%20@keyframes%20accent-animation%20{%20100%25%20{%20fill:%20%236ea0d2;%20}%20}%20.droplet%20{%20fill:%23b7dcff;%20stroke:%20%23fcf4f1;%20stroke-width:%202px;%20animation:%20droplet-animation%201.618s%20ease%20alternate%20infinite;%20}%20@keyframes%20droplet-animation%20{%20100%25%20{%20fill:%20%23fcf4f1;%20}%20}%20%3c/style%3e%3c!--%20%3clink%20xmlns='http://www.w3.org/1999/xhtml'%20rel='stylesheet'%20href='../css/style.css'%20type='text/css'/%3e%20--%3e%3ctitle%3eraindrop%3c/title%3e%3cpath%20class='droplet'%20d='M12.17,10.12C12.38,13.49,10.3,16,8,16s-4.33-2.59-4.18-5.88S8,0,8,0,12,6.88,12.17,10.12Z'%20/%3e%3cpath%20class='accent'%20d='M4.67,11.13a7.58,7.58,0,0,0,1,2.62,3.47,3.47,0,0,0,2,1.25.47.47,0,0,0,.25-.91c-1.62-.41-1.88-1.8-2.26-3.22a.47.47,0,0,0-.91.26Z'%20style='fill:%23fcf4f1'/%3e%3c/svg%3e";function Te(e=[]){const t=i("button",{class:"notice-btn danger"},e[e.length-1].event),n=i("div",{class:"alert"},t),r=i("div",{class:"alert__container scrollbar"});return e.forEach(s=>{const o=H(s.end,{includesTime:!0}),l=H(s.start,{includesTime:!0}),a=i("span",{class:"txt-small"}," through "),u=i("div",{class:"alert__in-effect"},l,a,o),d=i("h5",{},s.sender_name),b=i("p",{},s.description),x=i("header",{class:"danger padding-box"},s.event),v=i("article",{},x,u,d,b);r.appendChild(v)}),n.appendChild(r),n}function Ve(e){const t=i("span",{class:"label"},"cloudiness"),n=i("span",{class:"txt-semi-bold"},`${e}`);return i("p",{id:"cloudiness",class:"percent"},t,n)}function H(e,t={}){const{includesTime:n=!1,includesYear:r=!1,includesDay:s=!0}=t,o=e*1e3,l=new Date(o).getFullYear(),a=new Date(o).toDateString().split(" ")[0],u=new Date(o).toDateString().split(" ")[1],d=new Date(o).toDateString().split(" ")[2],b=new Date(e).getTime(),x=i("span",{class:"date-time__hour"},`${U(b)}`),v=i("span",{class:"date-time__year"},`${l}`),L=i("span",{class:"date-time__day-name"},a),T=i("span",{class:"date-time__day"},d);return i("time",{class:"date date-time",title:`${u} ${d}, ${l}`,datetime:new Date(o).toISOString()},L,s?T:"",r?v:"",n?x:"")}function _e(e){const t=D(e,"Kelvin"),n=i("span",{class:"label"},"dew point"),r=i("span",{class:"txt-semi-bold"},`${t}`);return i("p",{id:"dew-point",class:"degree"},n,r)}function Ge(e){const t=i("span",{class:"label"},"humidity"),n=i("span",{class:"txt-semi-bold"},`${e}`);return i("p",{id:"humidity",class:"droplet percent"},t,n)}function K(e){const t=Se(e);return i("div",{class:"flex-center-all pressure"},t)}function Z(e){const t=i("img",{class:"raindroplet",src:Le,alt:"",width:"16",height:"16"});return i("p",{class:"probability-precipitation txt-semi-bold percent"},t,`${Ce(e)}`)}function R(e,t=!0){let n=e,r;typeof e=="object"&&(n=e["1h"]),r=de(n,"mm","inches");const s=i("span",{class:"label"},"rain"),o=i("span",{class:"units"},r.units),l=i("span",{class:"txt-semi-bold"},r.value);return i("p",{class:"rainfall"},t?s:"",l,o)}function q(e,t=!0){let n=e,r;typeof e=="object"&&(n=e["1h"]),r=de(n,"mm","inches");const s=i("span",{class:"label"},"snow"),o=i("span",{class:"units"},r.units),l=i("span",{class:"txt-semi-bold"},r.value);return i("p",{class:"snowfall"},t?s:"",l,o)}function Oe(e){const t=i("span",{class:"label"},"sunrise");return i("p",{class:"sunrise"},t,U(e))}function Ae(e){const t=i("span",{class:"label"},"sunset");return i("p",{class:"sunset"},t,U(e))}function me(e,t){const n="degree";function r(u){return`${D(u,"Kelvin")}`}const s=i("span",{class:"temperature__slash"},"/"),o=i("span",{class:`${n} feels-like`,title:`Feels like ${r(t)}`},`${r(t)}`),l=i("span",{class:`${n} actual`,title:`Actual temperature ${r(e)}`},`${r(e)}`);return i("p",{class:"temperature temperature__paragraph"},l,s,o)}function pe(e,t){if(typeof e=="object"||typeof t=="object"){console.error("WeatherData objects are not allowed, use DailyTemperature() instead");return}return me(e,t)}function fe(e){const{temp:t,feels_like:n}=e;if(typeof t!="object"||typeof n!="object"){console.error("WeatherData objects are required, use createTemperatureElement() instead");return}const r=[{name:"morning",value:"morn"},{name:"day",value:"day"},{name:"evening",value:"eve"},{name:"night",value:"night"}],s=[];return r.forEach(l=>{const a=i("span",{class:"label"},l.name),u=i("div",{class:"daily-temp"},a,i("div",{},me(t[l.value],n[l.value])));s.push(u)}),i("div",{class:"temperature-list"},s[0],s[1],s[2],s[3])}function he(e){const t="degree",n=i("span",{class:"label"},"high/low"),r=i("span",{class:`${t} value temperature__min`},`/${D(e.min,"Kelvin")}`),s=i("span",{class:`${t} value`},`${D(e.max,"Kelvin")}`);return i("p",{class:"high-low"},n,s,r)}function Q(e){const t=i("span",{class:"label"},"uv"),n=i("span",{class:"value"},`${e}`),r=i("p",{class:"uvi__index"},t,n),s=ke(e),o=i("span",{class:"label"},"UV risk"),l=i("span",{class:"value"},`${s.value}`),a=i("p",{class:`uvi__risk ${s.class}`},o,l);return i("div",{class:"uvi"},r,a)}function Me(e){const t=$e(e,"meters","miles"),n=i("span",{class:"label"},"visibility"),r=i("span",{class:"value"},t.value),s=i("span",{class:"units"},t.units);return i("p",{class:"visibility"},n,r,s)}function J(e){return i("p",{class:"description description-text txt-center"},`${e}`)}function X(e,t="default"){const{icon:n,main:r,description:s}=e;let o="",l="50";t==="large"&&(o="@2x",l="100");let a=`https://openweathermap.org/img/wn/${n}${o}.png`;const u=`${r}: ${s}`;return i("div",{class:"icon-container",title:u},i("img",{class:"icon",src:a,alt:u,width:l,height:l}))}function ee(e,t){const n=document.createElement("div"),r=document.createElement("p");return r.textContent=`${e}`,r.setAttribute("title",`${t}`),n.setAttribute("class","main"),n.appendChild(r),n}function te(e,t,n,r="default"){const s=`${re(n,"m/s","mph")}`;let o="";t!=null&&(o=`, gusts to ${re(t,"m/s","mph")}`);const l=we(e,r),a=i("span",{},o),u=i("p",{class:"speed"},s,a);return i("div",{class:"wind"},l,u)}const oe={result:null,convertToOpacity(e){return this.result=(e/60).toFixed(2),this},invert(){return this.result=1-this.result,this}};function ie(e){return e.getMinutes()}function j(e){return 60-e}function Be(e,t){const n=j(e),r=j(t);return n-r}function ne(e,t){const n=new Date(e);return n.setHours(n.getHours()-t),n}function Ie(e,t){const n=ne(t,1);return e>n&&e<t}function We(e,t){const n=ne(t,1);return e>n&&e<t}function Fe(e,t,n){const r=ne(n,1);return e>t&&e<r}function He(e,t){return t?oe.convertToOpacity(e).invert().result:oe.convertToOpacity(e).result}function ce(e,t,n=!1){const r=ie(e),s=ie(t);let o=s+j(r);return s>r&&(o=Be(r,s)),He(o,n)}function W(e){return new Date(e*1e3)}function ge(e){const{dt:t,sunrise:n,sunset:r}=e,s=W(t),o=W(n),l=W(r);let a=0;return Fe(s,o,l)&&(a=1),Ie(s,o)&&(a=ce(o,s)),We(s,l)&&(a=ce(l,s,!0)),a}function Pe(e,t){const n=W(e.dt),r=W(t.current.sunrise),s=W(t.current.sunset);for(;r.getDate()<n.getDate();)r.setDate(r.getDate()+1),s.setDate(s.getDate()+1);return{dt:n.getTime()/1e3,sunrise:r.getTime()/1e3,sunset:s.getTime()/1e3}}const De=document.querySelectorAll(".forecast-container");let P=!1,le,ae;for(const e of De)e.addEventListener("mousedown",t=>{P=!0,e.classList.add("active"),le=t.pageX-e.offsetLeft,ae=e.scrollLeft}),e.addEventListener("mouseleave",()=>{P=!1,e.classList.remove("active")}),e.addEventListener("mouseup",()=>{P=!1,e.classList.remove("active")}),e.addEventListener("mousemove",t=>{if(!P)return;t.preventDefault();const r=(t.pageX-e.offsetLeft-le)*3;e.scrollLeft=ae-r});const Re=document.getElementById("today-btn");Re.addEventListener("click",se);const qe=document.getElementById("hourly-btn");qe.addEventListener("click",se);const Xe=document.getElementById("daily-btn");Xe.addEventListener("click",se);function se(e){const t=e.target,n=document.querySelectorAll(".display-feature"),r=document.querySelectorAll(".display-btn");function s(){r.forEach(o=>{o.name===t.name?t.classList.add("active"):o.classList.remove("active")})}n.forEach(o=>{o.id===t.name?(o.classList.add("display"),s()):o.classList.remove("display")})}const N=document.getElementById("scroll-left"),z=document.getElementById("scroll-right"),Ye=document.getElementById("forecast-feature__container");let ye;N.addEventListener("mousedown",be);z.addEventListener("mousedown",be);Ye.addEventListener("mouseup",e=>{clearInterval(ye),je()});function be(e){const t=document.querySelector(".display-feature.display > .forecast-container"),r=t.querySelector(".card").offsetWidth;function s(){e.target.id==="scroll-left"?t.scrollLeft-=r:t.scrollLeft+=r}s(),ye=setInterval(s,600)}function je(){const e=document.querySelector(".display-feature.display > .forecast-container");e.scrollLeft===0?N.classList.add("noscroll"):N.classList.remove("noscroll"),e.scrollLeft+e.clientWidth===e.scrollWidth?z.classList.add("noscroll"):z.classList.remove("noscroll")}const Ne="https://api.elliotreed.net/weatherton",ze=document.documentElement,ve=document.getElementById("app-container");async function Ue(){ue(),setInterval(()=>{getCurrentWeather(),ue()},10*60*1e3)}async function ue(){const e=await Ze();tt(e)}function Ke(){return new Promise(function(e,t){navigator.geolocation?navigator.geolocation.getCurrentPosition(e,t):ve.innerText="Geolocation is not supported by this browser"})}async function Ze(){const e=await Ke(),t=Qe(e),n=Je(t);return et(n)}function Qe(e){const t=e.coords.latitude,n=e.coords.longitude;return`lat=${t}&lon=${n}`}function Je(e){return`${Ne}/?${e}`}function et(e){return fetch(e).then(n=>n.json()).then(n=>n).catch(n=>{ve.innerText=n.message})}function tt(e){return nt(e.alerts),st(e.current),it(e.daily[0]),rt(e),ot(e.daily),ze.style.setProperty("--dayBackgroundOpacity",ge({dt:e.current.dt,sunrise:e.current.sunrise,sunset:e.current.sunset})),!0}function nt(e){const t=`
    background:  #6ea0d2;
    color: #fcf4f1;
  `;if(!e){console.log("%c There are no weather alerts in this area.",t);return}const n=document.getElementById("alert"),r=Te(e);n.innerHTML="",n.appendChild(r)}function st(e){const{clouds:t,dew_point:n,dt:r,feels_like:s,humidity:o,pressure:l,rain:a,snow:u,sunrise:d,sunset:b,temp:x,uvi:v,visibility:L,weather:T,wind_deg:p,wind_speed:h}=e,E=document.getElementById("current-weather__container");let g=T[0];const _=Ve(t),G=H(r,{includesYear:!0,includesTime:!0}),V=J(g.description),O=_e(n),B=Ge(o),y=X(g,"large"),S=K(l),$=R(a),w=q(u),f=Oe(d),C=Ae(b),k=pe(x,s),I=Me(L),Y=te(p,null,h,76),Ee=Q(v);E.innerHTML="",E.append(G,y,k,V,e.snow!=null?w:"",e.rain!=null?$:"",S,Y,_,I,B,O,Ee,f,C)}function rt(e){const t=document.getElementById("hourly-weather__container"),n=e.hourly;t.innerHTML="",n.map(r=>{const s=r.weather[0],o=H(r.dt,{includesTime:!0,includesDay:!1}),l=Z(r.pop),a=R(r.rain),u=q(r.snow),d=X(s),b=pe(r.temp,r.feels_like);ee(s.main,s.description),J(s.description);const x=te(r.wind_deg,r.wind_speed,r.wind_gust,"small");K(r.pressure);const v=Q(r.uvi),L=i("div",{class:"card"},o,d,b,l,r.snow!=null?u:"",r.rain!=null?a:"",x,v),T=Pe(r,e),p=ge(T),h=`linear-gradient(to top, rgb(110 160 210 / ${p}), rgb(160 193 224 / ${p}))`;L.style.background=h,t.appendChild(L)})}function ot(e){const t=document.getElementById("daily-weather__container");t.innerHTML="",e.map(n=>{const r=n.weather[0],s=H(n.dt),o=he(n.temp),l=R(n.rain),a=q(n.snow),u=Z(n.pop),d=fe(n);ee(r.main,r.descriptions);const b=Q(n.uvi),x=J(r.description),v=X(r),L=te(n.wind_deg,n.wind_gust,n.wind_speed,"small");K(n.pressure);const T=i("div",{class:"card daily-forecast"},s,v,x,o,n.rain!=null?l:"",n.snow!=null?a:"",u,d,L,b);t.appendChild(T)})}function it(e){const t=document.getElementById("today-weather__container"),n=e.weather[0],r=X(n),s=Z(e.pop),o=R(e.rain),l=q(e.snow),a=fe(e),u=ee(n.main,n.description),d=he(e.temp),b=i("div",{class:"card today-forecast"},r,d,u,s,e.rain!=null?o:"",e.snow!=null?l:"",a);t.innerHTML="",t.appendChild(b)}Ue();function ct(){document.querySelector(".alert__container").classList.toggle("display")}function lt(){const e=document.querySelector(".alert__container");e&&e.classList.remove("display")}document.addEventListener("click",e=>{if(e.target.classList.contains("notice-btn")){ct();return}lt()});