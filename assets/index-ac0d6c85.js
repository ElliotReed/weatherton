(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const u of i.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerpolicy&&(i.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?i.credentials="include":o.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();function pe(e,t=50){const n="Your browser does not support HTML5 Canvas.",s="#FCF4F1",o="#444444",i=t/2,u=document.createElement("canvas"),a=t/5,r=u.getContext("2d"),l=t/25,y=t/25,g=4,v=`${o}66`;u.textContent=n,u.setAttribute("class","compass"),u.setAttribute("width",t),u.setAttribute("height",t),r.translate(i,i),r.strokeStyle=`${s}cc`,r.fillStyle=`${s}cc`,r.lineWidth=1;function b(){const d=a+a/2.5,m=4;r.save();for(let f=0;f<m;f++)r.lineWidth=2,r.rotate(Math.PI/(m/2)),r.beginPath(),r.moveTo(0,0),r.lineTo(d,0),r.closePath(),r.stroke();r.restore()}function w(){const d=a-a/3,m=a+a/3,f=8;r.save();for(let h=0;h<f;h++)h%2!=0&&(r.beginPath(),r.moveTo(d,0),r.lineTo(m,0),r.closePath(),r.stroke()),r.rotate(Math.PI/(f/2));r.restore()}function T(){const d=a-a/3,m=a,f=16;r.save();for(let h=0;h<f;h++)h%2!=0&&(r.beginPath(),r.moveTo(d,0),r.lineTo(m,0),r.closePath(),r.stroke()),r.rotate(Math.PI/(f/2));r.restore()}function L(){const d=a-a/2,m=a+a/2,f=a*2-a/4;r.save(),r.font=`${d}px Arial`,r.textAlign="center",r.textBaseline="bottom",r.fillText("N",0,-m),r.textBaseline="top",r.fillText("S",0,m),r.textBaseline="middle",r.fillText("E",f,0),r.fillText("W",-f,0),r.restore()}function O(){const d=a/4;r.save(),r.shadowOffsetX=l,r.shadowOffsetY=y,r.shadowBlur=g,r.shadowColor=v,r.beginPath(),r.lineWidth=d,r.arc(0,0,a,0,Math.PI*2,!0),r.closePath(),r.stroke(),r.lineWidth=.5,r.strokeStyle=o,r.stroke(),r.restore()}function p(){const d=a/2,m=a/2,f=a/4,h=s,x=o;r.save(),r.rotate(e*Math.PI/180),r.beginPath(),r.moveTo(0,-f),r.lineTo(-d,-m),r.lineTo(0,a),r.lineTo(d,-m),r.closePath(),r.fillStyle=h,r.fill(),r.strokeStyle=x,r.lineWidth=1,r.stroke(),r.restore()}return t>50&&(T(),w(),L(),b()),O(),p(),u}function he(e,t=50){const n="#fcfcfc",s="#ececec",o=t/10*5.5,i=t/10,u=t*2/3,a=t/5,r=document.createElement("canvas"),l=r.getContext("2d"),y="Your browser does not support HTML5 canvas",g="Arial",v="#441414",b=(e-950)*.01;r.textContent=y,r.setAttribute("class","barometer"),r.setAttribute("width",t),r.setAttribute("height",t),l.strokeStyle=n,l.fillStyle=n,l.textAlign="center",l.baseline="bottom";function w(){return a+o+o*b*-1}function T(){const p=["body","hole"],d=i/3,m=i/3,f=4,h="#22222266";function x(){for(let E=0;E<p.length;E++){l.save();let $=i/2;p[E]==="body"&&(l.shadowOffsetX=d,l.shadowOffsetY=m,l.shadowBlur=f,l.shadowColor=h),p[E]==="hole"&&(l.fillStyle=s,$=$*.618),l.beginPath(),l.arc(u+i/2,a,$,0,Math.PI,!0),l.fill(),l.closePath(),l.restore()}}function _(){let E=i/1.38;const $=a+o+E/1.5;for(let k=0;k<p.length;k++)l.save(),p[k]==="body"&&(l.shadowOffsetX=d,l.shadowOffsetY=m,l.shadowBlur=f,l.shadowColor=h),p[k]==="hole"&&(l.fillStyle=v,E=E*.618),l.beginPath(),l.arc(u+i/2,$,E,0,Math.PI*2,!0),l.fill(),l.closePath(),l.restore()}function P(){for(let E=0;E<p.length;E++){let $=u,k=a,Q=i,fe=o;l.save(),p[E]==="body"&&(l.shadowOffsetX=d,l.shadowOffsetY=m,l.shadowBlur=f,l.shadowColor=h),p[E]==="hole"&&(l.fillStyle=s,Q=i/2,$=u+i/4),l.fillRect($,k,Q,fe),l.restore()}}function I(){l.save(),l.fillStyle=v,l.fillRect(u+i/3,a+o,i/4,o*b*-1),l.restore()}x(),_(),P(),I()}function L(){const p=i,d=w(),m=u-p/2;l.save(),l.beginPath(),l.moveTo(m,d),l.lineTo(m-p,d),l.stroke(),l.closePath(),l.restore()}function O(){const f=t/3,h=f,x=w(),_=x+14;let P=`${e}`;var I="mbar";l.save(),l.textBaseline="middle",t>50?(l.font=`${12}px ${g}`,l.fillText(P,f,x),l.font=`${12}px ${g}`,l.fillText(I,h,_)):(l.translate(t/2,t/2),l.rotate(-Math.PI/2),l.font=`${12}px ${g}`,l.fillText(P,0,-14/2)),l.restore()}return T(),L(),O(),r}function c(e,t,...n){const s=document.createElement(e);for(let o in t)s.setAttribute(o,t[o]);return n.forEach(o=>{typeof o=="string"?s.appendChild(document.createTextNode(o)):s.appendChild(o)}),s}function V(e){const t=new Date(e*1e3),n=t.getMinutes().toString().padStart(2,"0");let s,o="AM",i=t.getHours();return i>=12&&(o="PM"),i=i%12,i===0&&(i=12),s=`${i}:${n} ${o}`,s}function B(e,t,n){if(t===n)return e;switch(t){case"Kelvin":if(n==="Fahrenheit")return`${parseInt(e*9/5-459.67)}`;if(n==="Celsius")return`${parseInt(e-273.15)}`;case"Celsius":if(n==="Fahrenheit")return`${parseInt(e*9/5+32)}`;if(n==="Kelvin")return`${parseInt(e+273.15)}`;case"Fahrenheit":if(n==="Kelvin")return`${parseInt((e+459.67)*9/5)}`;if(n==="Celsius")return`${parseInt((e-32)*9/5)}`;break;default:return`${e}`}}function J(e,t="m/s",n="mph"){return(t="m/s")&&(n="mph")?`${Math.floor(e*2.237)} mph`:`${e} m/s`}function ye(e,t,n){const s={value:e,units:t};return(t="meters")&&(n="miles")&&(s.value=(e*621371e-9).toFixed(2),s.units=n),s}function ge(e){return(e*100).toFixed(0)}function oe(e,t,n){const s={value:e,units:"mm"};return(n="inches")&&(s.value=(e*.0393701).toFixed(2),s.units=n),s}function Ee(e){let t={value:"",class:""};return e<3&&(t.value="low",t.class="low"),e>=3&&e<6&&(t.value="moderate",t.class="moderate"),e>=6&&e<8&&(t.value="high",t.class="high"),e>=8&&e<11&&(t.value="very high",t.class="very-high"),e>=11&&(t.value="extreme",t.class="extreme"),t}const ve="/weatherton/assets/raindrop-69b2cc51.svg";function be(e=[]){const t=c("button",{class:"notice-btn danger"},e[e.length-1].event),n=c("div",{class:"alert"},t),s=c("div",{class:"alert__container scrollbar"});return e.forEach(o=>{console.warn(o);const i=M(o.end,{includesTime:!0}),u=M(o.start,{includesTime:!0}),a=c("span",{class:"txt-small"}," through "),r=c("div",{class:"alert__in-effect"},u,a,i),l=c("h5",{},o.sender_name),y=c("p",{},o.description),g=c("header",{class:"danger padding-box"},o.event),v=c("article",{},g,r,l,y);s.appendChild(v)}),n.appendChild(s),n}function we(e){const t=c("span",{class:"label"},"cloudiness"),n=c("span",{class:"txt-semi-bold"},`${e}`);return c("p",{id:"cloudiness",class:"percent"},t,n)}function M(e,t={}){const{includesTime:n=!1,includesYear:s=!1,includesDay:o=!0}=t,i=e*1e3,u=new Date(i).getFullYear(),a=new Date(i).toDateString().split(" ")[0],r=new Date(i).toDateString().split(" ")[1],l=new Date(i).toDateString().split(" ")[2],y=new Date(e).getTime(),g=c("span",{class:"date-time__hour"},`${V(y)}`),v=c("span",{class:"date-time__year"},`${u}`),b=c("span",{class:"date-time__day-name"},a),w=c("span",{class:"date-time__day"},l);return c("time",{class:"date date-time",title:`${r} ${l}, ${u}`,datetime:`${r} ${l}, ${u}`},b,o?w:"",s?v:"",n?g:"")}function Te(e){const t=B(e,"Kelvin","Fahrenheit"),n=c("span",{class:"label"},"dew point"),s=c("span",{class:"txt-semi-bold"},`${t}`);return c("p",{id:"dew-point",class:"degree"},n,s)}function xe(e){const t=c("span",{class:"label"},"humidity"),n=c("span",{class:"txt-semi-bold"},`${e}`);return c("p",{id:"humidity",class:"droplet percent"},t,n)}function X(e,t=50){const n=he(e,t);return c("div",{id:"pressure",class:"flex-center-all"},n)}function q(e){const t=c("img",{class:"raindroplet",src:ve,alt:"",width:"16",height:"16"});return c("p",{id:"probability-precipitation",class:"txt-semi-bold percent"},t,`${ge(e)}`)}function F(e,t=!0){let n=e,s;typeof e=="object"&&(n=e["1h"]),s=oe(n,"mm","inches");const o=c("span",{class:"label"},"rain"),i=c("span",{class:"units"},s.units),u=c("span",{class:"txt-semi-bold"},s.value);return c("p",{id:"rainfall",class:""},t?o:"",u,i)}function W(e,t=!0){let n=e,s;typeof e=="object"&&(n=e["1h"]),s=oe(n,"mm","inches");const o=c("span",{class:"label"},"snow"),i=c("span",{class:"units"},s.units),u=c("span",{class:"txt-semi-bold"},s.value);return c("p",{id:"snowfall",class:""},t?o:"",u,i)}function $e(e){const t=c("span",{class:"label"},"sunrise");return c("p",{class:"sunrise"},t,V(e))}function Le(e){const t=c("span",{class:"label"},"sunset");return c("p",{class:"sunset"},t,V(e))}function re(e,t){const n="degree";function s(r){return`${B(r,"Kelvin","Fahrenheit")}`}const o=c("span",{class:"temperature__slash"},"/"),i=c("span",{class:`${n} feels-like`,title:`Feels like ${s(t)}`},`${s(t)}`),u=c("span",{class:`${n} actual`,title:`Actual temperature ${s(e)}`},`${s(e)}`);return c("p",{class:"temperature temperature__paragraph"},u,o,i)}function ie(e){const{temp:t,feels_like:n}=e;if(typeof t=="object"||typeof n=="object"){console.error("WeatherData objects are not allowed, use DailyTemperature() instead");return}return re(t,n)}function le(e){const{temp:t,feels_like:n}=e;if(typeof t!="object"||typeof n!="object"){console.error("WeatherData objects are required, use createTemperatureElement() instead");return}const s=[{name:"morning",value:"morn"},{name:"day",value:"day"},{name:"evening",value:"eve"},{name:"night",value:"night"}],o=[];return s.forEach(u=>{const a=c("span",{class:"label"},u.name),r=c("p",{class:"daily-temp"},a,c("span",{},re(t[u.value],n[u.value])));o.push(r)}),c("div",{class:"temperature-list"},o[0],o[1],o[2],o[3])}function ce(e){const t="degree",n=c("span",{class:"label"},"high/low"),s=c("span",{class:`${t} value temperature__min`},`/${B(e.min,"Kelvin","Fahrenheit")}`),o=c("span",{class:`${t} value`},`${B(e.max,"Kelvin","Fahrenheit")}`);return c("p",{class:"high-low"},n,o,s)}function R(e){const t=c("span",{class:"label"},"uv"),n=c("span",{class:"value"},`${e}`),s=c("p",{class:"uvi__index"},t,n),o=Ee(e),i=c("span",{class:"label"},"UV risk"),u=c("span",{class:"value"},`${o.value}`),a=c("p",{class:`uvi__risk ${o.class}`},i,u);return c("div",{class:"uvi"},s,a)}function Pe(e){const t=ye(e,"meters","miles"),n=c("span",{class:"label"},"visibility"),s=c("span",{class:"value"},t.value),o=c("span",{class:"units"},t.units);return c("p",{class:"visibility"},n,s,o)}function N(e){return c("p",{class:"description description-text txt-center"},`${e}`)}function A(e,t="default"){const{icon:n,main:s,description:o}=e;let i="",u="50px";t==="large"&&(i="@2x",u="100px");let a=`https://openweathermap.org/img/wn/${n}${i}.png`;const r=`${s}: ${o}`;return c("div",{class:"icon-container",title:r},c("img",{class:"icon",src:a,alt:r,width:u,height:u}))}function j(e,t){const n=document.createElement("div"),s=document.createElement("p");return s.textContent=`${e}`,s.setAttribute("title",`${t}`),n.setAttribute("class","main"),n.appendChild(s),n}function K(e,t){const{wind_deg:n,wind_gust:s,wind_speed:o}=e,i=`${J(o,"m/s","mph")}`;let u="";s!=null&&(u=`, gusts to ${J(s,"m/s","mph")}`);const a=pe(n,t),r=c("span",{},u),l=c("p",{class:"speed"},i,r);return c("div",{class:"wind"},a,l)}const Z={result:null,convertToOpacity(e){return this.result=(e/60).toFixed(2),this},invert(){return this.result=1-this.result,this}};function z(e){return e.getMinutes()}function Y(e){return 60-e}function ke(e,t){const n=Y(e),s=Y(t);return n-s}function U(e,t){const n=new Date(e);return n.setHours(n.getHours()-t),n}function Ce(e,t){const n=U(t,1);return e>n&&e<t}function Oe(e,t){const n=U(t,1);return e>n&&e<t}function _e(e,t,n){const s=U(n,1);return e>t&&e<s}function Ie(e,t){return t?Z.convertToOpacity(e).invert().result:Z.convertToOpacity(e).result}function ee(e,t,n=!1){const s=z(e),o=z(t);let i=o+Y(s);return o>s&&(i=ke(s,o)),Ie(i,n)}function C(e){return new Date(e*1e3)}function ae(e){const{dt:t,sunrise:n,sunset:s}=e,o=C(t),i=C(n),u=C(s);let a=0;return _e(o,i,u)&&(a=1),Ce(o,i)&&(a=ee(i,o)),Oe(o,u)&&(a=ee(u,o,!0)),a}function Me(e,t){const n=C(e.dt),s=C(t.current.sunrise),o=C(t.current.sunset);for(;s.getDate()<n.getDate();)s.setDate(s.getDate()+1),o.setDate(o.getDate()+1);return{dt:n.getTime()/1e3,sunrise:s.getTime()/1e3,sunset:o.getTime()/1e3}}const Se=document.querySelectorAll(".forecast-container");let S=!1,te,ne;for(const e of Se)e.addEventListener("mousedown",t=>{S=!0,e.classList.add("active"),te=t.pageX-e.offsetLeft,ne=e.scrollLeft}),e.addEventListener("mouseleave",()=>{S=!1,e.classList.remove("active")}),e.addEventListener("mouseup",()=>{S=!1,e.classList.remove("active")}),e.addEventListener("mousemove",t=>{if(!S)return;t.preventDefault();const s=(t.pageX-e.offsetLeft-te)*3;e.scrollLeft=ne-s});const Be=document.getElementById("today-btn");Be.addEventListener("click",G);const Fe=document.getElementById("hourly-btn");Fe.addEventListener("click",G);const We=document.getElementById("daily-btn");We.addEventListener("click",G);function G(e){const t=e.target,n=document.querySelectorAll(".display-feature"),s=document.querySelectorAll(".display-btn");function o(){s.forEach(i=>{i.name===t.name?t.classList.add("active"):i.classList.remove("active")})}n.forEach(i=>{i.id===t.name?(i.classList.add("display"),o()):i.classList.remove("display")})}const D=document.getElementById("scroll-left"),H=document.getElementById("scroll-right"),Ae=document.getElementById("forecast-feature__container");let ue;D.addEventListener("mousedown",de);H.addEventListener("mousedown",de);Ae.addEventListener("mouseup",e=>{clearInterval(ue),Ye()});function de(e){const t=document.querySelector(".display-feature.display > .forecast-container"),s=t.querySelector(".card").offsetWidth;function o(){e.target.id==="scroll-left"?t.scrollLeft-=s:t.scrollLeft+=s}o(),ue=setInterval(o,600)}function Ye(){const e=document.querySelector(".display-feature.display > .forecast-container");e.scrollLeft===0?D.classList.add("noscroll"):D.classList.remove("noscroll"),e.scrollLeft+e.clientWidth===e.scrollWidth?H.classList.add("noscroll"):H.classList.remove("noscroll")}const De="6cf9b9c5b948a69676088ed828c5535d",He="api.openweathermap.org/data/2.5",Ve=document.documentElement,me=document.getElementById("app-container");function Xe(){se(),setInterval(()=>{se()},10*60*1e3)}async function se(){const e=await Re();Ue(e)}function qe(){return new Promise(function(e,t){navigator.geolocation?navigator.geolocation.getCurrentPosition(e,t):me.innerText="Geolocation is not supported by this browser"})}async function Re(){const e=await qe(),t=Ne(e),n=je(t);return Ke(n)}function Ne(e){const t=e.coords.latitude,n=e.coords.longitude;return`lat=${t}&lon=${n}`}function je(e){return`${He}/onecall?${e}&appid=${De}`}function Ke(e){return fetch(`https://${e}`).then(n=>n.json()).then(n=>n).catch(n=>{me.innerText=n.message})}function Ue(e){return Ge(e.alerts),Qe(e.current),ze(e.daily[0]),Je(e),Ze(e.daily),Ve.style.setProperty("--dayBackgroundOpacity",ae(e.current)),!0}function Ge(e){const t=`
    background:  #6ea0d2;
    color: #fcf4f1;
  `;if(!e){console.log("%c There are no weather alerts in this area.",t);return}const n=document.getElementById("alert"),s=be(e);n.innerHTML="",n.appendChild(s)}function Qe(e){const{clouds:t,dew_point:n,dt:s,humidity:o,rain:i,snow:u,sunrise:a,sunset:r,uvi:l,weather:y}=e,g=document.getElementById("current-weather__container");let v=y[0];const b=we(t),w=M(s,{includesYear:!0,includesTime:!0}),T=N(v.description),L=Te(n),O=xe(o),p=A(v,"large"),d=X(e.pressure,76),m=F(i),f=W(u),h=$e(a),x=Le(r),_=ie(e),P=Pe(e.visibility),I=K(e,76),E=R(l);g.innerHTML="",g.append(w,p,_,T,e.snow!=null?f:"",e.rain!=null?m:"",d,I,b,P,O,L,E,h,x)}function Je(e){const t=document.getElementById("hourly-weather__container"),n=e.hourly;t.innerHTML="",n.map(s=>{const o=s.weather[0],i=M(s.dt,{includesTime:!0,includesDay:!1}),u=q(s.pop),a=F(s.rain),r=W(s.snow),l=A(o),y=ie(s);j(o.main,o.description),N(o.description);const g=K(s);X(s.pressure);const v=R(s.uvi),b=c("div",{class:"card"},i,l,y,u,s.snow!=null?r:"",s.rain!=null?a:"",g,v),w=Me(s,e),T=ae(w),L=`linear-gradient(to top, rgb(110 160 210 / ${T}), rgb(160 193 224 / ${T}))`;b.style.background=L,t.appendChild(b)})}function Ze(e){const t=document.getElementById("daily-weather__container");t.innerHTML="",e.map(n=>{const s=n.weather[0],o=M(n.dt),i=ce(n.temp),u=F(n.rain),a=W(n.snow),r=q(n.pop),l=le(n);j(s.main,s.descriptions);const y=R(n.uvi),g=N(s.description),v=A(s),b=K(n);X(n.pressure,60);const w=c("div",{class:"card daily-forecast"},o,v,g,i,n.rain!=null?u:"",n.snow!=null?a:"",r,l,b,y);t.appendChild(w)})}function ze(e){const t=document.getElementById("today-weather__container"),n=e.weather[0],s=A(n),o=q(e.pop),i=F(e.rain),u=W(e.snow),a=le(e),r=j(n.main,n.description),l=ce(e.temp),y=c("div",{class:"card today-forecast"},s,l,r,o,e.rain!=null?i:"",e.snow!=null?u:"",a);t.innerHTML="",t.appendChild(y)}Xe();function et(){document.querySelector(".alert__container").classList.toggle("display")}function tt(){const e=document.querySelector(".alert__container");e&&e.classList.remove("display")}document.addEventListener("click",e=>{if(e.target.classList.contains("notice-btn")){et();return}tt()});