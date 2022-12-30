(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const u of i.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerpolicy&&(i.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?i.credentials="include":r.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();function fe(e,t=50){const n="Your browser does not support HTML5 Canvas.",s="#FCF4F1",r="#444444",i=t/2,u=document.createElement("canvas"),a=t/5,o=u.getContext("2d"),l=t/25,y=t/25,E=4,v=`${r}66`;u.textContent=n,u.setAttribute("class","compass"),u.setAttribute("width",t),u.setAttribute("height",t),o.translate(i,i),o.strokeStyle=`${s}cc`,o.fillStyle=`${s}cc`,o.lineWidth=1;function b(){const d=a+a/2.5,m=4;o.save();for(let f=0;f<m;f++)o.lineWidth=2,o.rotate(Math.PI/(m/2)),o.beginPath(),o.moveTo(0,0),o.lineTo(d,0),o.closePath(),o.stroke();o.restore()}function w(){const d=a-a/3,m=a+a/3,f=8;o.save();for(let h=0;h<f;h++)h%2!=0&&(o.beginPath(),o.moveTo(d,0),o.lineTo(m,0),o.closePath(),o.stroke()),o.rotate(Math.PI/(f/2));o.restore()}function $(){const d=a-a/3,m=a,f=16;o.save();for(let h=0;h<f;h++)h%2!=0&&(o.beginPath(),o.moveTo(d,0),o.lineTo(m,0),o.closePath(),o.stroke()),o.rotate(Math.PI/(f/2));o.restore()}function C(){const d=a-a/2,m=a+a/2,f=a*2-a/4;o.save(),o.font=`${d}px Arial`,o.textAlign="center",o.textBaseline="bottom",o.fillText("N",0,-m),o.textBaseline="top",o.fillText("S",0,m),o.textBaseline="middle",o.fillText("E",f,0),o.fillText("W",-f,0),o.restore()}function k(){const d=a/4;o.save(),o.shadowOffsetX=l,o.shadowOffsetY=y,o.shadowBlur=E,o.shadowColor=v,o.beginPath(),o.lineWidth=d,o.arc(0,0,a,0,Math.PI*2,!0),o.closePath(),o.stroke(),o.lineWidth=.5,o.strokeStyle=r,o.stroke(),o.restore()}function p(){const d=a/2,m=a/2,f=a/4,h=s,T=r;o.save(),o.rotate(e*Math.PI/180),o.beginPath(),o.moveTo(0,-f),o.lineTo(-d,-m),o.lineTo(0,a),o.lineTo(d,-m),o.closePath(),o.fillStyle=h,o.fill(),o.strokeStyle=T,o.lineWidth=1,o.stroke(),o.restore()}return t>50&&($(),w(),C(),b()),k(),p(),u}function pe(e,t=50){const n="#fcfcfc",s="#ececec",r=t/10*5.5,i=t/10,u=t*2/3,a=t/5,o=document.createElement("canvas"),l=o.getContext("2d"),y="Your browser does not support HTML5 canvas",E="Arial",v="#441414",b=(e-950)*.01;o.textContent=y,o.setAttribute("class","barometer"),o.setAttribute("width",t),o.setAttribute("height",t),l.strokeStyle=n,l.fillStyle=n,l.textAlign="center",l.baseline="bottom";function w(){return a+r+r*b*-1}function $(){const p=["body","hole"],d=i/3,m=i/3,f=4,h="#22222266";function T(){for(let g=0;g<p.length;g++){l.save();let x=i/2;p[g]==="body"&&(l.shadowOffsetX=d,l.shadowOffsetY=m,l.shadowBlur=f,l.shadowColor=h),p[g]==="hole"&&(l.fillStyle=s,x=x*.618),l.beginPath(),l.arc(u+i/2,a,x,0,Math.PI,!0),l.fill(),l.closePath(),l.restore()}}function _(){let g=i/1.38;const x=a+r+g/1.5;for(let P=0;P<p.length;P++)l.save(),p[P]==="body"&&(l.shadowOffsetX=d,l.shadowOffsetY=m,l.shadowBlur=f,l.shadowColor=h),p[P]==="hole"&&(l.fillStyle=v,g=g*.618),l.beginPath(),l.arc(u+i/2,x,g,0,Math.PI*2,!0),l.fill(),l.closePath(),l.restore()}function L(){for(let g=0;g<p.length;g++){let x=u,P=a,Q=i,me=r;l.save(),p[g]==="body"&&(l.shadowOffsetX=d,l.shadowOffsetY=m,l.shadowBlur=f,l.shadowColor=h),p[g]==="hole"&&(l.fillStyle=s,Q=i/2,x=u+i/4),l.fillRect(x,P,Q,me),l.restore()}}function M(){l.save(),l.fillStyle=v,l.fillRect(u+i/3,a+r,i/4,r*b*-1),l.restore()}T(),_(),L(),M()}function C(){const p=i,d=w(),m=u-p/2;l.save(),l.beginPath(),l.moveTo(m,d),l.lineTo(m-p,d),l.stroke(),l.closePath(),l.restore()}function k(){const f=t/3,h=f,T=w(),_=T+14;let L=`${e}`;var M="mbar";l.save(),l.textBaseline="middle",t>50?(l.font=`${12}px ${E}`,l.fillText(L,f,T),l.font=`${12}px ${E}`,l.fillText(M,h,_)):(l.translate(t/2,t/2),l.rotate(-Math.PI/2),l.font=`${12}px ${E}`,l.fillText(L,0,-14/2)),l.restore()}return $(),C(),k(),o}function c(e,t,...n){const s=document.createElement(e);for(let r in t)s.setAttribute(r,t[r]);return n.forEach(r=>{typeof r=="string"?s.appendChild(document.createTextNode(r)):s.appendChild(r)}),s}function X(e){const t=new Date(e*1e3),n=t.getMinutes().toString().padStart(2,"0");let s,r="AM",i=t.getHours();return i>=12&&(r="PM"),i=i%12,i===0&&(i=12),s=`${i}:${n} ${r}`,s}function S(e,t,n){if(t===n)return e;switch(t){case"Kelvin":if(n==="Fahrenheit")return`${parseInt(e*9/5-459.67)}`;if(n==="Celsius")return`${parseInt(e-273.15)}`;case"Celsius":if(n==="Fahrenheit")return`${parseInt(e*9/5+32)}`;if(n==="Kelvin")return`${parseInt(e+273.15)}`;case"Fahrenheit":if(n==="Kelvin")return`${parseInt((e+459.67)*9/5)}`;if(n==="Celsius")return`${parseInt((e-32)*9/5)}`;break;default:return`${e}`}}function J(e,t="m/s",n="mph"){return(t="m/s")&&(n="mph")?`${Math.floor(e*2.237)} mph`:`${e} m/s`}function he(e,t,n){const s={value:e,units:t};return(t="meters")&&(n="miles")&&(s.value=(e*621371e-9).toFixed(2),s.units=n),s}function ye(e){return(e*100).toFixed(0)}function oe(e,t,n){const s={value:e,units:"mm"};return(n="inches")&&(s.value=(e*.0393701).toFixed(2),s.units=n),s}function Ee(e){let t={value:"",class:""};return e<3&&(t.value="low",t.class="low"),e>=3&&e<6&&(t.value="moderate",t.class="moderate"),e>=6&&e<8&&(t.value="high",t.class="high"),e>=8&&e<11&&(t.value="very high",t.class="very-high"),e>=11&&(t.value="extreme",t.class="extreme"),t}const ge="/weatherton/assets/raindrop-69b2cc51.svg";function ve(e=[]){const t=c("button",{class:"notice-btn danger"},e[e.length-1].event),n=c("div",{class:"alert"},t),s=c("div",{class:"alert__container scrollbar"});return e.forEach(r=>{console.warn(r);const i=I(r.end,{includesTime:!0}),u=I(r.start,{includesTime:!0}),a=c("span",{class:"txt-small"}," through "),o=c("div",{class:"alert__in-effect"},u,a,i),l=c("h5",{},r.sender_name),y=c("p",{},r.description),E=c("header",{class:"danger padding-box"},r.event),v=c("article",{},E,o,l,y);s.appendChild(v)}),n.appendChild(s),n}function be(e){const t=c("span",{class:"label"},"cloudiness"),n=c("span",{class:"txt-semi-bold"},`${e}`);return c("p",{id:"cloudiness",class:"percent"},t,n)}function I(e,t={}){const{includesTime:n=!1,includesYear:s=!1,includesDay:r=!0}=t,i=e*1e3,u=new Date(i).getFullYear(),a=new Date(i).toDateString().split(" ")[0],o=new Date(i).toDateString().split(" ")[1],l=new Date(i).toDateString().split(" ")[2],y=new Date(e).getTime(),E=c("span",{class:"date-time__hour"},`${X(y)}`),v=c("span",{class:"date-time__year"},`${u}`),b=c("span",{class:"date-time__day-name"},a),w=c("span",{class:"date-time__day"},l);return c("time",{class:"date date-time",title:`${o} ${l}, ${u}`,datetime:`${o} ${l}, ${u}`},b,r?w:"",s?v:"",n?E:"")}function we(e){const t=S(e,"Kelvin","Fahrenheit"),n=c("span",{class:"label"},"dew point"),s=c("span",{class:"txt-semi-bold"},`${t}`);return c("p",{id:"dew-point",class:"degree"},n,s)}function Te(e){const t=c("span",{class:"label"},"humidity"),n=c("span",{class:"txt-semi-bold"},`${e}`);return c("p",{id:"humidity",class:"droplet percent"},t,n)}function q(e,t=50){const n=pe(e,t);return c("div",{id:"pressure",class:"flex-center-all"},n)}function R(e){const t=c("img",{class:"raindroplet",src:ge,alt:"",width:"16",height:"16"});return c("p",{id:"probability-precipitation",class:"txt-semi-bold percent"},t,`${ye(e)}`)}function B(e,t=!0){let n=e,s;typeof e=="object"&&(n=e["1h"]),s=oe(n,"mm","inches");const r=c("span",{class:"label"},"rain"),i=c("span",{class:"units"},s.units),u=c("span",{class:"txt-semi-bold"},s.value);return c("p",{id:"rainfall",class:""},t?r:"",u,i)}function F(e,t=!0){let n=e,s;typeof e=="object"&&(n=e["1h"]),s=oe(n,"mm","inches");const r=c("span",{class:"label"},"snow"),i=c("span",{class:"units"},s.units),u=c("span",{class:"txt-semi-bold"},s.value);return c("p",{id:"snowfall",class:""},t?r:"",u,i)}function xe(e){const t=c("span",{class:"label"},"sunrise");return c("p",{class:"sunrise"},t,X(e))}function $e(e){const t=c("span",{class:"label"},"sunset");return c("p",{class:"sunset"},t,X(e))}function re(e,t){const n="degree";function s(o){return`${S(o,"Kelvin","Fahrenheit")}`}const r=c("span",{class:"temperature__slash"},"/"),i=c("span",{class:`${n} feels-like`,title:`Feels like ${s(t)}`},`${s(t)}`),u=c("span",{class:`${n} actual`,title:`Actual temperature ${s(e)}`},`${s(e)}`);return c("p",{class:"temperature temperature__paragraph"},u,r,i)}function ie(e){const{temp:t,feels_like:n}=e;if(typeof t=="object"||typeof n=="object"){console.error("WeatherData objects are not allowed, use DailyTemperature() instead");return}return re(t,n)}function le(e){const{temp:t,feels_like:n}=e;if(typeof t!="object"||typeof n!="object"){console.error("WeatherData objects are required, use createTemperatureElement() instead");return}const s=[{name:"morning",value:"morn"},{name:"day",value:"day"},{name:"evening",value:"eve"},{name:"night",value:"night"}],r=[];return s.forEach(u=>{const a=c("span",{class:"label"},u.name),o=c("p",{class:"daily-temp"},a,c("span",{},re(t[u.value],n[u.value])));r.push(o)}),c("div",{class:"temperature-list"},r[0],r[1],r[2],r[3])}function ce(e){const t="degree",n=c("span",{class:"label"},"high/low"),s=c("span",{class:`${t} value temperature__min`},`/${S(e.min,"Kelvin","Fahrenheit")}`),r=c("span",{class:`${t} value`},`${S(e.max,"Kelvin","Fahrenheit")}`);return c("p",{class:"high-low"},n,r,s)}function D(e){const t=c("span",{class:"label"},"uv"),n=c("span",{class:"value"},`${e}`),s=c("p",{class:"uvi__index"},t,n),r=Ee(e),i=c("span",{class:"label"},"UV risk"),u=c("span",{class:"value"},`${r.value}`),a=c("p",{class:`uvi__risk ${r.class}`},i,u);return c("div",{class:"uvi"},s,a)}function Le(e){const t=he(e,"meters","miles"),n=c("span",{class:"label"},"visibility"),s=c("span",{class:"value"},t.value),r=c("span",{class:"units"},t.units);return c("p",{class:"visibility"},n,s,r)}function N(e){return c("p",{class:"description description-text txt-center"},`${e}`)}function W(e,t="default"){const{icon:n,main:s,description:r}=e;let i="",u="50px";t==="large"&&(i="@2x",u="100px");let a=`https://openweathermap.org/img/wn/${n}${i}.png`;const o=`${s}: ${r}`;return c("div",{class:"icon-container",title:o},c("img",{class:"icon",src:a,alt:o,width:u,height:u}))}function j(e,t){const n=document.createElement("div"),s=document.createElement("p");return s.textContent=`${e}`,s.setAttribute("title",`${t}`),n.setAttribute("class","main"),n.appendChild(s),n}function K(e,t){const{wind_deg:n,wind_gust:s,wind_speed:r}=e,i=`${J(r,"m/s","mph")}`;let u="";s!=null&&(u=`, gusts to ${J(s,"m/s","mph")}`);const a=fe(n,t),o=c("span",{},u),l=c("p",{class:"speed"},i,o);return c("div",{class:"wind"},a,l)}const Z={result:null,convertToOpacity(e){return this.result=(e/60).toFixed(2),this},invert(){return this.result=1-this.result,this}};function z(e){return e.getMinutes()}function Y(e){return 60-e}function Pe(e,t){const n=Y(e),s=Y(t);return n-s}function U(e,t){const n=new Date(e);return n.setHours(n.getHours()-t),n}function Ce(e,t){const n=U(t,1);return e>n&&e<t}function ke(e,t){const n=U(t,1);return e>n&&e<t}function _e(e,t,n){const s=U(n,1);return e>t&&e<s}function Me(e,t){return t?Z.convertToOpacity(e).invert().result:Z.convertToOpacity(e).result}function ee(e,t,n=!1){const s=z(e),r=z(t);let i=r+Y(s);return r>s&&(i=Pe(s,r)),Me(i,n)}function A(e){return new Date(e*1e3)}function Ie(e){const{dt:t,sunrise:n,sunset:s}=e,r=A(t),i=A(n),u=A(s);let a=0;return _e(r,i,u)&&(a=1),Ce(r,i)&&(a=ee(i,r)),ke(r,u)&&(a=ee(u,r,!0)),a}const Oe=document.querySelectorAll(".forecast-container");let O=!1,te,ne;for(const e of Oe)e.addEventListener("mousedown",t=>{O=!0,e.classList.add("active"),te=t.pageX-e.offsetLeft,ne=e.scrollLeft}),e.addEventListener("mouseleave",()=>{O=!1,e.classList.remove("active")}),e.addEventListener("mouseup",()=>{O=!1,e.classList.remove("active")}),e.addEventListener("mousemove",t=>{if(!O)return;t.preventDefault();const s=(t.pageX-e.offsetLeft-te)*3;e.scrollLeft=ne-s});const Se=document.getElementById("today-btn");Se.addEventListener("click",G);const Be=document.getElementById("hourly-btn");Be.addEventListener("click",G);const Fe=document.getElementById("daily-btn");Fe.addEventListener("click",G);function G(e){const t=e.target,n=document.querySelectorAll(".display-feature"),s=document.querySelectorAll(".display-btn");function r(){s.forEach(i=>{i.name===t.name?t.classList.add("active"):i.classList.remove("active")})}n.forEach(i=>{i.id===t.name?(i.classList.add("display"),r()):i.classList.remove("display")})}const H=document.getElementById("scroll-left"),V=document.getElementById("scroll-right"),We=document.getElementById("forecast-feature__container");let ae;H.addEventListener("mousedown",ue);V.addEventListener("mousedown",ue);We.addEventListener("mouseup",e=>{clearInterval(ae),Ae()});function ue(e){const t=document.querySelector(".display-feature.display > .forecast-container"),s=t.querySelector(".card").offsetWidth;function r(){e.target.id==="scroll-left"?t.scrollLeft-=s:t.scrollLeft+=s}r(),ae=setInterval(r,600)}function Ae(){const e=document.querySelector(".display-feature.display > .forecast-container");e.scrollLeft===0?H.classList.add("noscroll"):H.classList.remove("noscroll"),e.scrollLeft+e.clientWidth===e.scrollWidth?V.classList.add("noscroll"):V.classList.remove("noscroll")}const Ye="6cf9b9c5b948a69676088ed828c5535d",He="api.openweathermap.org/data/2.5",Ve=document.documentElement,de=document.getElementById("app-container");function Xe(){se(),setInterval(()=>{se()},10*60*1e3)}async function se(){const e=await Re();Ke(e)}function qe(){return new Promise(function(e,t){navigator.geolocation?navigator.geolocation.getCurrentPosition(e,t):de.innerText="Geolocation is not supported by this browser"})}async function Re(){const e=await qe(),t=De(e),n=Ne(t);return je(n)}function De(e){const t=e.coords.latitude,n=e.coords.longitude;return`lat=${t}&lon=${n}`}function Ne(e){return`${He}/onecall?${e}&appid=${Ye}`}function je(e){return fetch(`https://${e}`).then(n=>n.json()).then(n=>n).catch(n=>{de.innerText=n.message})}function Ke(e){return Ue(e.alerts),Ge(e.current),Ze(e.daily[0]),Qe(e.hourly),Je(e.daily),Ve.style.setProperty("--dayBackgroundOpacity",Ie(e.current)),!0}function Ue(e){const t=`
    background:  #6ea0d2;
    color: #fcf4f1;
  `;if(!e){console.log("%c There are no weather alerts in this area.",t);return}const n=document.getElementById("alert"),s=ve(e);n.innerHTML="",n.appendChild(s)}function Ge(e){const{clouds:t,dew_point:n,dt:s,humidity:r,rain:i,snow:u,sunrise:a,sunset:o,uvi:l,weather:y}=e,E=document.getElementById("current-weather__container");let v=y[0];const b=be(t),w=I(s,{includesYear:!0,includesTime:!0}),$=N(v.description),C=we(n),k=Te(r),p=W(v,"large"),d=q(e.pressure,76),m=B(i),f=F(u),h=xe(a),T=$e(o),_=ie(e),L=Le(e.visibility),M=K(e,76),g=D(l);E.innerHTML="",E.append(w,p,_,$,e.snow!=null?f:"",e.rain!=null?m:"",d,M,b,L,k,C,g,h,T)}function Qe(e){const t=document.getElementById("hourly-weather__container");t.innerHTML="",e.map(n=>{const s=n.weather[0],r=I(n.dt,{includesTime:!0,includesDay:!1}),i=R(n.pop),u=B(n.rain),a=F(n.snow),o=W(s),l=ie(n);j(s.main,s.description),N(s.description);const y=K(n);q(n.pressure);const E=D(n.uvi),v=c("div",{class:"card"},r,o,l,i,n.snow!=null?a:"",n.rain!=null?u:"",y,E);t.appendChild(v)})}function Je(e){const t=document.getElementById("daily-weather__container");t.innerHTML="",e.map(n=>{const s=n.weather[0],r=I(n.dt),i=ce(n.temp),u=B(n.rain),a=F(n.snow),o=R(n.pop),l=le(n);j(s.main,s.descriptions);const y=D(n.uvi),E=N(s.description),v=W(s),b=K(n);q(n.pressure,60);const w=c("div",{class:"card daily-forecast"},r,v,E,i,n.rain!=null?u:"",n.snow!=null?a:"",o,l,b,y);t.appendChild(w)})}function Ze(e){const t=document.getElementById("today-weather__container"),n=e.weather[0],s=W(n),r=R(e.pop),i=B(e.rain),u=F(e.snow),a=le(e),o=j(n.main,n.description),l=ce(e.temp),y=c("div",{class:"card today-forecast"},s,l,o,r,e.rain!=null?i:"",e.snow!=null?u:"",a);t.innerHTML="",t.appendChild(y)}Xe();function ze(){document.querySelector(".alert__container").classList.toggle("display")}function et(){const e=document.querySelector(".alert__container");e&&e.classList.remove("display")}document.addEventListener("click",e=>{if(e.target.classList.contains("notice-btn")){ze();return}et()});
