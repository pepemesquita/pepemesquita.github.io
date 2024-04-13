var Zo=Object.defineProperty;var Qo=(n,e,t)=>e in n?Zo(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var Jt=(n,e,t)=>(Qo(n,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerpolicy&&(s.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?s.credentials="include":i.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();function Tr(n,e){if(["link","go"].includes(n))if(e){const t=document.querySelector(e);t?t.scrollIntoView({behavior:"smooth",block:"start"}):window.scrollTo({top:0})}else window.scrollTo({top:0})}function Gn(n){const e=new URL(n||window.location.href).href;return e.endsWith("/")||e.includes(".")||e.includes("#")?e:`${e}/`}function ea(n){(!window.history.state||window.history.state.url!==n)&&window.history.pushState({url:n},"internalLink",n)}function ta(n){document.querySelector(n).scrollIntoView({behavior:"smooth",block:"start"})}function na(n){const e=Gn();return{type:"popstate",next:e}}function ra(n){var e;let t;if(n.altKey||n.ctrlKey||n.metaKey||n.shiftKey)return{type:"disqualified"};for(let r=n.target;r.parentNode;r=r.parentNode)if(r.nodeName==="A"){t=r;break}if(t&&t.host!==location.host)return t.target="_blank",{type:"external"};if(t&&"cold"in(t==null?void 0:t.dataset))return{type:"disqualified"};if(t!=null&&t.hasAttribute("href")){const r=t.getAttribute("href"),i=new URL(r,location.href);if(n.preventDefault(),r!=null&&r.startsWith("#"))return ta(r),{type:"scrolled"};const s=(e=r.match(/#([\w'-]+)\b/g))==null?void 0:e[0],o=Gn(i.href),a=Gn();return{type:"link",next:o,prev:a,scrollId:s}}else return{type:"noop"}}function ia(n){return new DOMParser().parseFromString(n,"text/html")}function Sr(n){document.body.querySelectorAll("[flamethrower-preserve]").forEach(e=>{let t=n.body.querySelector('[flamethrower-preserve][id="'+e.id+'"]');if(t){const r=e.cloneNode(!0);t.replaceWith(r)}}),document.body.replaceWith(n.body)}function sa(n){const e=o=>Array.from(o.querySelectorAll('head>:not([rel="prefetch"]')),t=e(document),r=e(n),{staleNodes:i,freshNodes:s}=oa(t,r);i.forEach(o=>o.remove()),document.head.append(...s)}function oa(n,e){const t=[],r=[];let i=0,s=0;for(;i<n.length||s<e.length;){const o=n[i],a=e[s];if(o!=null&&o.isEqualNode(a)){i++,s++;continue}const l=o?r.findIndex(u=>u.isEqualNode(o)):-1;if(l!==-1){r.splice(l,1),i++;continue}const c=a?t.findIndex(u=>u.isEqualNode(a)):-1;if(c!==-1){t.splice(c,1),s++;continue}o&&t.push(o),a&&r.push(a),i++,s++}return{staleNodes:t,freshNodes:r}}function Ar(){document.head.querySelectorAll("[data-reload]").forEach(Cr),document.body.querySelectorAll("script").forEach(Cr)}function Cr(n){const e=document.createElement("script"),t=Array.from(n.attributes);for(const{name:r,value:i}of t)e[r]=i;e.append(n.textContent),n.replaceWith(e)}const aa={log:!1,pageTransitions:!1};class la{constructor(e){this.opts=e,this.enabled=!0,this.prefetched=new Set,this.opts={...aa,...e!=null?e:{}},window!=null&&window.history?(document.addEventListener("click",t=>this.onClick(t)),window.addEventListener("popstate",t=>this.onPop(t)),this.prefetch()):(console.warn("flamethrower router not supported in this browser or environment"),this.enabled=!1)}go(e){const t=window.location.href,r=new URL(e,location.origin).href;return this.reconstructDOM({type:"go",next:r,prev:t})}back(){window.history.back()}forward(){window.history.forward()}get allLinks(){return Array.from(document.links).filter(e=>e.href.includes(document.location.origin)&&!e.href.includes("#")&&e.href!==(document.location.href||document.location.href+"/")&&!this.prefetched.has(e.href))}log(...e){this.opts.log&&console.log(...e)}prefetch(){if(this.opts.prefetch==="visible")this.prefetchVisible();else if(this.opts.prefetch==="hover")this.prefetchOnHover();else return}prefetchOnHover(){this.allLinks.forEach(e=>{const t=e.getAttribute("href");e.addEventListener("pointerenter",()=>this.createLink(t),{once:!0})})}prefetchVisible(){const e={root:null,rootMargin:"0px",threshold:1};"IntersectionObserver"in window&&(this.observer||(this.observer=new IntersectionObserver((t,r)=>{t.forEach(i=>{const s=i.target.getAttribute("href");if(this.prefetched.has(s)){r.unobserve(i.target);return}i.isIntersecting&&(this.createLink(s),r.unobserve(i.target))})},e)),this.allLinks.forEach(t=>this.observer.observe(t)))}createLink(e){const t=document.createElement("link");t.rel="prefetch",t.href=e,t.as="document",t.onload=()=>this.log("\u{1F329}\uFE0F prefetched",e),t.onerror=r=>this.log("\u{1F915} can't prefetch",e,r),document.head.appendChild(t),this.prefetched.add(e)}onClick(e){this.reconstructDOM(ra(e))}onPop(e){this.reconstructDOM(na())}async reconstructDOM({type:e,next:t,prev:r,scrollId:i}){if(!this.enabled){this.log("router disabled");return}try{if(this.log("\u26A1",e),["popstate","link","go"].includes(e)&&t!==r){this.opts.log&&console.time("\u23F1\uFE0F"),window.dispatchEvent(new CustomEvent("flamethrower:router:fetch")),e!="popstate"&&ea(t);const s=await(await fetch(t,{headers:{"X-Flamethrower":"1"}}).then(a=>{const l=a.body.getReader(),c=parseInt(a.headers.get("Content-Length"));let u=0;return new ReadableStream({start(d){function h(){l.read().then(({done:p,value:y})=>{if(p){d.close();return}u+=y.length,window.dispatchEvent(new CustomEvent("flamethrower:router:fetch-progress",{detail:{progress:Number.isNaN(c)?0:u/c*100,received:u,length:c||0}})),d.enqueue(y),h()})}h()}})}).then(a=>new Response(a,{headers:{"Content-Type":"text/html"}}))).text(),o=ia(s);sa(o),this.opts.pageTransitions&&document.createDocumentTransition?document.createDocumentTransition().start(()=>{Sr(o),Ar(),Tr(e,i)}):(Sr(o),Ar(),Tr(e,i)),window.dispatchEvent(new CustomEvent("flamethrower:router:end")),setTimeout(()=>{this.prefetch()},200),this.opts.log&&console.timeEnd("\u23F1\uFE0F")}}catch(s){return window.dispatchEvent(new CustomEvent("flamethrower:router:error",s)),this.opts.log&&console.timeEnd("\u23F1\uFE0F"),console.error("\u{1F4A5} router fetch failed",s),!1}}}const ca=n=>{const e=new la(n);if(n.log&&console.log("\u{1F525} flamethrower engaged"),window){const t=window;t.flamethrower=e}return e},ua="modulepreload",da=function(n){return"/"+n},Rr={},on=function(e,t,r){return!t||t.length===0?e():Promise.all(t.map(i=>{if(i=da(i),i in Rr)return;Rr[i]=!0;const s=i.endsWith(".css"),o=s?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${i}"]${o}`))return;const a=document.createElement("link");if(a.rel=s?"stylesheet":ua,s||(a.as="script",a.crossOrigin=""),a.href=i,document.head.appendChild(a),s)return new Promise((l,c)=>{a.addEventListener("load",l),a.addEventListener("error",()=>c(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>e())};function E(){}function sr(n){return n()}function Or(){return Object.create(null)}function Te(n){n.forEach(sr)}function or(n){return typeof n=="function"}function Z(n,e){return n!=n?e==e:n!==e||n&&typeof n=="object"||typeof n=="function"}let Xt;function Pr(n,e){return Xt||(Xt=document.createElement("a")),Xt.href=e,n===Xt.href}function fa(n){return Object.keys(n).length===0}function As(n,...e){if(n==null)return E;const t=n.subscribe(...e);return t.unsubscribe?()=>t.unsubscribe():t}function Ce(n,e,t){n.$$.on_destroy.push(As(e,t))}function f(n,e){n.appendChild(e)}function g(n,e,t){n.insertBefore(e,t||null)}function w(n){n.parentNode.removeChild(n)}function Xe(n,e){for(let t=0;t<n.length;t+=1)n[t]&&n[t].d(e)}function m(n){return document.createElement(n)}function Pn(n){return document.createElementNS("http://www.w3.org/2000/svg",n)}function A(n){return document.createTextNode(n)}function k(){return A(" ")}function ge(){return A("")}function D(n,e,t,r){return n.addEventListener(e,t,r),()=>n.removeEventListener(e,t,r)}function ha(n){return function(e){return e.stopPropagation(),n.call(this,e)}}function b(n,e,t){t==null?n.removeAttribute(e):n.getAttribute(e)!==t&&n.setAttribute(e,t)}function _t(n,e,t){e in n?n[e]=typeof n[e]=="boolean"&&t===""?!0:t:b(n,e,t)}function Cs(n){return n===""?null:+n}function pa(n){return Array.from(n.childNodes)}function j(n,e){e=""+e,n.wholeText!==e&&(n.data=e)}function Ee(n,e){n.value=e==null?"":e}function oe(n,e,t){n.classList[t?"add":"remove"](e)}function ee(n){const e={};for(const t of n)e[t.name]=t.value;return e}let Dt;function xt(n){Dt=n}function ma(){if(!Dt)throw new Error("Function called outside component initialization");return Dt}function je(n){ma().$$.on_mount.push(n)}function ga(n,e){const t=n.$$.callbacks[e.type];t&&t.slice().forEach(r=>r.call(this,e))}const At=[],It=[],en=[],xr=[],Rs=Promise.resolve();let Kn=!1;function Os(){Kn||(Kn=!0,Rs.then(X))}function ba(){return Os(),Rs}function Yn(n){en.push(n)}const xn=new Set;let Zt=0;function X(){const n=Dt;do{for(;Zt<At.length;){const e=At[Zt];Zt++,xt(e),wa(e.$$)}for(xt(null),At.length=0,Zt=0;It.length;)It.pop()();for(let e=0;e<en.length;e+=1){const t=en[e];xn.has(t)||(xn.add(t),t())}en.length=0}while(At.length);for(;xr.length;)xr.pop()();Kn=!1,xn.clear(),xt(n)}function wa(n){if(n.fragment!==null){n.update(),Te(n.before_update);const e=n.dirty;n.dirty=[-1],n.fragment&&n.fragment.p(n.ctx,e),n.after_update.forEach(Yn)}}const ya=new Set;function _a(n,e){n&&n.i&&(ya.delete(n),n.i(e))}const wn=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function va(n,e,t,r){const{fragment:i,on_mount:s,on_destroy:o,after_update:a}=n.$$;i&&i.m(e,t),r||Yn(()=>{const l=s.map(sr).filter(or);o?o.push(...l):Te(l),n.$$.on_mount=[]}),a.forEach(Yn)}function ka(n,e){const t=n.$$;t.fragment!==null&&(Te(t.on_destroy),t.fragment&&t.fragment.d(e),t.on_destroy=t.fragment=null,t.ctx=[])}function Ia(n,e){n.$$.dirty[0]===-1&&(At.push(n),Os(),n.$$.dirty.fill(0)),n.$$.dirty[e/31|0]|=1<<e%31}function te(n,e,t,r,i,s,o,a=[-1]){const l=Dt;xt(n);const c=n.$$={fragment:null,ctx:null,props:s,update:E,not_equal:i,bound:Or(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(l?l.$$.context:[])),callbacks:Or(),dirty:a,skip_bound:!1,root:e.target||l.$$.root};o&&o(c.root);let u=!1;if(c.ctx=t?t(n,e.props||{},(d,h,...p)=>{const y=p.length?p[0]:h;return c.ctx&&i(c.ctx[d],c.ctx[d]=y)&&(!c.skip_bound&&c.bound[d]&&c.bound[d](y),u&&Ia(n,d)),h}):[],c.update(),u=!0,Te(c.before_update),c.fragment=r?r(c.ctx):!1,e.target){if(e.hydrate){const d=pa(e.target);c.fragment&&c.fragment.l(d),d.forEach(w)}else c.fragment&&c.fragment.c();e.intro&&_a(n.$$.fragment),va(n,e.target,e.anchor,e.customElement),X()}xt(l)}let Q;typeof HTMLElement=="function"&&(Q=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){const{on_mount:n}=this.$$;this.$$.on_disconnect=n.map(sr).filter(or);for(const e in this.$$.slotted)this.appendChild(this.$$.slotted[e])}attributeChangedCallback(n,e,t){this[n]=t}disconnectedCallback(){Te(this.$$.on_disconnect)}$destroy(){ka(this,1),this.$destroy=E}$on(n,e){const t=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return t.push(e),()=>{const r=t.indexOf(e);r!==-1&&t.splice(r,1)}}$set(n){this.$$set&&!fa(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}});const bt=[];function Ea(n,e){return{subscribe:Le(n,e).subscribe}}function Le(n,e=E){let t;const r=new Set;function i(a){if(Z(n,a)&&(n=a,t)){const l=!bt.length;for(const c of r)c[1](),bt.push(c,n);if(l){for(let c=0;c<bt.length;c+=2)bt[c][0](bt[c+1]);bt.length=0}}}function s(a){i(a(n))}function o(a,l=E){const c=[a,l];return r.add(c),r.size===1&&(t=e(i)||E),a(n),()=>{r.delete(c),r.size===0&&(t(),t=null)}}return{set:i,update:s,subscribe:o}}function ar(n,e,t){const r=!Array.isArray(n),i=r?[n]:n,s=e.length<2;return Ea(t,o=>{let a=!1;const l=[];let c=0,u=E;const d=()=>{if(c)return;u();const p=e(r?l[0]:l,o);s?o(p):u=or(p)?p:E},h=i.map((p,y)=>As(p,_=>{l[y]=_,c&=~(1<<y),a&&d()},()=>{c|=1<<y}));return a=!0,d(),function(){Te(h),u()}})}const xe=Le(null);window.addEventListener("flamethrower:router:fetch",n=>{xe.set(null)});const Ue=Le(null),yn=Le(null);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ps=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Ta=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],o=n[t++],a=n[t++],l=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const s=n[t++],o=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},xs={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],o=i+1<n.length,a=o?n[i+1]:0,l=i+2<n.length,c=l?n[i+2]:0,u=s>>2,d=(s&3)<<4|a>>4;let h=(a&15)<<2|c>>6,p=c&63;l||(p=64,o||(h=64)),r.push(t[u],t[d],t[h],t[p])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Ps(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Ta(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],a=i<n.length?t[n.charAt(i)]:0;++i;const c=i<n.length?t[n.charAt(i)]:64;++i;const d=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||a==null||c==null||d==null)throw Error();const h=s<<2|a>>4;if(r.push(h),c!==64){const p=a<<4&240|c>>2;if(r.push(p),d!==64){const y=c<<6&192|d;r.push(y)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},Sa=function(n){const e=Ps(n);return xs.encodeByteArray(e,!0)},an=function(n){return Sa(n).replace(/\./g,"")},Ls=function(n){try{return xs.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oe(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Aa(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Oe())}function Ca(){try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Ns(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Ra(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Oa(){const n=Oe();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Mp(){return!Ca()&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Ds(){return typeof indexedDB=="object"}function Ms(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}function Pa(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}function xa(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const La=()=>xa().__FIREBASE_DEFAULTS__,Na=()=>{if(typeof process>"u")return;const n=process.env.__FIREBASE_DEFAULTS__,e=process.env.__FIREBASE_DEFAULTS_PATH__;if(n)return e&&console.warn("Values were provided for both __FIREBASE_DEFAULTS__ and __FIREBASE_DEFAULTS_PATH__. __FIREBASE_DEFAULTS_PATH__ will be ignored."),JSON.parse(n);if(e&&typeof require<"u")try{return require(e)}catch{console.warn(`Unable to read defaults from file provided to __FIREBASE_DEFAULTS_PATH__: ${e}`)}},Da=()=>{if(typeof document>"u")return;const n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/),e=n&&Ls(n[1]);return e&&JSON.parse(e)},lr=()=>La()||Na()||Da(),Ma=n=>{var e,t;return(t=(e=lr())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Ua=()=>{var n;return(n=lr())===null||n===void 0?void 0:n.config},Us=n=>{var e;return(e=lr())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fa{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Up(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n),a="";return[an(JSON.stringify(t)),an(JSON.stringify(o)),a].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ja="FirebaseError";class Ge extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=ja,Object.setPrototypeOf(this,Ge.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,gt.prototype.create)}}class gt{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?Ha(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new Ge(i,a,r)}}function Ha(n,e){return n.replace(Ba,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const Ba=/\{\$([^}]+)}/g;function $a(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Mt(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const s=n[i],o=e[i];if(Lr(s)&&Lr(o)){if(!Mt(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function Lr(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qt(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Ct(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function Rt(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function za(n,e){const t=new qa(n,e);return t.subscribe.bind(t)}class qa{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Va(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=Ln),i.error===void 0&&(i.error=Ln),i.complete===void 0&&(i.complete=Ln);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Va(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Ln(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wa=1e3,Ga=2,Ka=4*60*60*1e3,Ya=.5;function Nr(n,e=Wa,t=Ga){const r=e*Math.pow(t,n),i=Math.round(Ya*r*(Math.random()-.5)*2);return Math.min(Ka,r+i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function et(n){return n&&n._delegate?n._delegate:n}class We{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ct="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ja{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Fa;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Za(e))try{this.getOrInitializeService({instanceIdentifier:ct})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=ct){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ct){return this.instances.has(e)}getOptions(e=ct){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(e,t){var r;const i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(!!r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Xa(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=ct){return this.component?this.component.multipleInstances?e:ct:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Xa(n){return n===ct?void 0:n}function Za(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qa{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Ja(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var de;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(de||(de={}));const el={debug:de.DEBUG,verbose:de.VERBOSE,info:de.INFO,warn:de.WARN,error:de.ERROR,silent:de.SILENT},tl=de.INFO,nl={[de.DEBUG]:"log",[de.VERBOSE]:"log",[de.INFO]:"info",[de.WARN]:"warn",[de.ERROR]:"error"},rl=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=nl[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class cr{constructor(e){this.name=e,this._logLevel=tl,this._logHandler=rl,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in de))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?el[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,de.DEBUG,...e),this._logHandler(this,de.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,de.VERBOSE,...e),this._logHandler(this,de.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,de.INFO,...e),this._logHandler(this,de.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,de.WARN,...e),this._logHandler(this,de.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,de.ERROR,...e),this._logHandler(this,de.ERROR,...e)}}const il=(n,e)=>e.some(t=>n instanceof t);let Dr,Mr;function sl(){return Dr||(Dr=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function ol(){return Mr||(Mr=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Fs=new WeakMap,Jn=new WeakMap,js=new WeakMap,Nn=new WeakMap,ur=new WeakMap;function al(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(ot(n.result)),i()},o=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Fs.set(t,n)}).catch(()=>{}),ur.set(e,n),e}function ll(n){if(Jn.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});Jn.set(n,e)}let Xn={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Jn.get(n);if(e==="objectStoreNames")return n.objectStoreNames||js.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return ot(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function cl(n){Xn=n(Xn)}function ul(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Dn(this),e,...t);return js.set(r,e.sort?e.sort():[e]),ot(r)}:ol().includes(n)?function(...e){return n.apply(Dn(this),e),ot(Fs.get(this))}:function(...e){return ot(n.apply(Dn(this),e))}}function dl(n){return typeof n=="function"?ul(n):(n instanceof IDBTransaction&&ll(n),il(n,sl())?new Proxy(n,Xn):n)}function ot(n){if(n instanceof IDBRequest)return al(n);if(Nn.has(n))return Nn.get(n);const e=dl(n);return e!==n&&(Nn.set(n,e),ur.set(e,n)),e}const Dn=n=>ur.get(n);function Hs(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(n,e),a=ot(o);return r&&o.addEventListener("upgradeneeded",l=>{r(ot(o.result),l.oldVersion,l.newVersion,ot(o.transaction))}),t&&o.addEventListener("blocked",()=>t()),a.then(l=>{s&&l.addEventListener("close",()=>s()),i&&l.addEventListener("versionchange",()=>i())}).catch(()=>{}),a}const fl=["get","getKey","getAll","getAllKeys","count"],hl=["put","add","delete","clear"],Mn=new Map;function Ur(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Mn.get(e))return Mn.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=hl.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||fl.includes(t)))return;const s=async function(o,...a){const l=this.transaction(o,i?"readwrite":"readonly");let c=l.store;return r&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),i&&l.done]))[0]};return Mn.set(e,s),s}cl(n=>({...n,get:(e,t,r)=>Ur(e,t)||n.get(e,t,r),has:(e,t)=>!!Ur(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pl{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(ml(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function ml(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Zn="@firebase/app",Fr="0.8.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ft=new cr("@firebase/app"),gl="@firebase/app-compat",bl="@firebase/analytics-compat",wl="@firebase/analytics",yl="@firebase/app-check-compat",_l="@firebase/app-check",vl="@firebase/auth",kl="@firebase/auth-compat",Il="@firebase/database",El="@firebase/database-compat",Tl="@firebase/functions",Sl="@firebase/functions-compat",Al="@firebase/installations",Cl="@firebase/installations-compat",Rl="@firebase/messaging",Ol="@firebase/messaging-compat",Pl="@firebase/performance",xl="@firebase/performance-compat",Ll="@firebase/remote-config",Nl="@firebase/remote-config-compat",Dl="@firebase/storage",Ml="@firebase/storage-compat",Ul="@firebase/firestore",Fl="@firebase/firestore-compat",jl="firebase",Hl="9.11.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ln="[DEFAULT]",Bl={[Zn]:"fire-core",[gl]:"fire-core-compat",[wl]:"fire-analytics",[bl]:"fire-analytics-compat",[_l]:"fire-app-check",[yl]:"fire-app-check-compat",[vl]:"fire-auth",[kl]:"fire-auth-compat",[Il]:"fire-rtdb",[El]:"fire-rtdb-compat",[Tl]:"fire-fn",[Sl]:"fire-fn-compat",[Al]:"fire-iid",[Cl]:"fire-iid-compat",[Rl]:"fire-fcm",[Ol]:"fire-fcm-compat",[Pl]:"fire-perf",[xl]:"fire-perf-compat",[Ll]:"fire-rc",[Nl]:"fire-rc-compat",[Dl]:"fire-gcs",[Ml]:"fire-gcs-compat",[Ul]:"fire-fst",[Fl]:"fire-fst-compat","fire-js":"fire-js",[jl]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cn=new Map,Qn=new Map;function $l(n,e){try{n.container.addComponent(e)}catch(t){ft.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Ze(n){const e=n.name;if(Qn.has(e))return ft.debug(`There were multiple attempts to register component ${e}.`),!1;Qn.set(e,n);for(const t of cn.values())$l(t,n);return!0}function Tt(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Fp(n,e,t=ln){Tt(n,e).clearInstance(t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zl={["no-app"]:"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",["bad-app-name"]:"Illegal App name: '{$appName}",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["no-options"]:"Need to provide options, when not being deployed to hosting via source.",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function.",["idb-open"]:"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",["idb-get"]:"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",["idb-set"]:"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",["idb-delete"]:"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},at=new gt("app","Firebase",zl);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ql{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new We("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw at.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _n=Hl;function Bs(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:ln,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw at.create("bad-app-name",{appName:String(i)});if(t||(t=Ua()),!t)throw at.create("no-options");const s=cn.get(i);if(s){if(Mt(t,s.options)&&Mt(r,s.config))return s;throw at.create("duplicate-app",{appName:i})}const o=new Qa(i);for(const l of Qn.values())o.addComponent(l);const a=new ql(t,r,o);return cn.set(i,a),a}function Vl(n=ln){const e=cn.get(n);if(!e&&n===ln)return Bs();if(!e)throw at.create("no-app",{appName:n});return e}function ze(n,e,t){var r;let i=(r=Bl[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const a=[`Unable to register library "${i}" with version "${e}":`];s&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ft.warn(a.join(" "));return}Ze(new We(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wl="firebase-heartbeat-database",Gl=1,Ut="firebase-heartbeat-store";let Un=null;function $s(){return Un||(Un=Hs(Wl,Gl,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(Ut)}}}).catch(n=>{throw at.create("idb-open",{originalErrorMessage:n.message})})),Un}async function Kl(n){var e;try{return(await $s()).transaction(Ut).objectStore(Ut).get(zs(n))}catch(t){if(t instanceof Ge)ft.warn(t.message);else{const r=at.create("idb-get",{originalErrorMessage:(e=t)===null||e===void 0?void 0:e.message});ft.warn(r.message)}}}async function jr(n,e){var t;try{const i=(await $s()).transaction(Ut,"readwrite");return await i.objectStore(Ut).put(e,zs(n)),i.done}catch(r){if(r instanceof Ge)ft.warn(r.message);else{const i=at.create("idb-set",{originalErrorMessage:(t=r)===null||t===void 0?void 0:t.message});ft.warn(i.message)}}}function zs(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yl=1024,Jl=30*24*60*60*1e3;class Xl{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Ql(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Hr();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(i=>i.date===r)))return this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(i=>{const s=new Date(i.date).valueOf();return Date.now()-s<=Jl}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Hr(),{heartbeatsToSend:t,unsentEntries:r}=Zl(this._heartbeatsCache.heartbeats),i=an(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}}function Hr(){return new Date().toISOString().substring(0,10)}function Zl(n,e=Yl){const t=[];let r=n.slice();for(const i of n){const s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Br(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Br(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Ql{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ds()?Ms().then(()=>!0).catch(()=>!1):!1}async read(){return await this._canUseIndexedDBPromise?await Kl(this.app)||{heartbeats:[]}:{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return jr(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return jr(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Br(n){return an(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ec(n){Ze(new We("platform-logger",e=>new pl(e),"PRIVATE")),Ze(new We("heartbeat",e=>new Xl(e),"PRIVATE")),ze(Zn,Fr,n),ze(Zn,Fr,"esm2017"),ze("fire-js","")}ec("");var tc="firebase",nc="9.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ze(tc,nc,"app");function dr(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function qs(){return{["dependent-sdk-initialized-before-auth"]:"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const rc=qs,Vs=new gt("auth","Firebase",qs());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $r=new cr("@firebase/auth");function tn(n,...e){$r.logLevel<=de.ERROR&&$r.error(`Auth (${_n}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Be(n,...e){throw fr(n,...e)}function qe(n,...e){return fr(n,...e)}function ic(n,e,t){const r=Object.assign(Object.assign({},rc()),{[e]:t});return new gt("auth","Firebase",r).create(e,{appName:n.name})}function fr(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Vs.create(n,...e)}function V(n,e,...t){if(!n)throw fr(e,...t)}function Ye(n){const e="INTERNAL ASSERTION FAILED: "+n;throw tn(e),new Error(e)}function Qe(n,e){n||Ye(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zr=new Map;function Je(n){Qe(n instanceof Function,"Expected a class definition");let e=zr.get(n);return e?(Qe(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,zr.set(n,e),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sc(n,e){const t=Tt(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(Mt(s,e!=null?e:{}))return i;Be(i,"already-initialized")}return t.initialize({options:e})}function oc(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(Je);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function un(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function ac(){return qr()==="http:"||qr()==="https:"}function qr(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lc(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(ac()||Ns()||"connection"in navigator)?navigator.onLine:!0}function cc(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt{constructor(e,t){this.shortDelay=e,this.longDelay=t,Qe(t>e,"Short delay should be less than long delay!"),this.isMobile=Aa()||Ra()}get(){return lc()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hr(n,e){Qe(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ws{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;Ye("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;Ye("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;Ye("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uc={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dc=new Vt(3e4,6e4);function vn(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Wt(n,e,t,r,i={}){return Gs(n,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const a=qt(Object.assign({key:n.config.apiKey},o)).slice(1),l=await n._getAdditionalHeaders();return l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode),Ws.fetch()(Ks(n,n.config.apiHost,t,a),Object.assign({method:e,headers:l,referrerPolicy:"no-referrer"},s))})}async function Gs(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},uc),e);try{const i=new fc(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw Qt(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const a=s.ok?o.errorMessage:o.error.message,[l,c]=a.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Qt(n,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw Qt(n,"email-already-in-use",o);if(l==="USER_DISABLED")throw Qt(n,"user-disabled",o);const u=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw ic(n,u,c);Be(n,u)}}catch(i){if(i instanceof Ge)throw i;Be(n,"network-request-failed")}}async function kn(n,e,t,r,i={}){const s=await Wt(n,e,t,r,i);return"mfaPendingCredential"in s&&Be(n,"multi-factor-auth-required",{_serverResponse:s}),s}function Ks(n,e,t,r){const i=`${e}${t}?${r}`;return n.config.emulator?hr(n.config,i):`${n.config.apiScheme}://${i}`}class fc{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(qe(this.auth,"network-request-failed")),dc.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Qt(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=qe(n,e,r);return i.customData._tokenResponse=t,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hc(n,e){return Wt(n,"POST","/v1/accounts:delete",e)}async function pc(n,e){return Wt(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lt(n){if(!!n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function mc(n,e=!1){const t=et(n),r=await t.getIdToken(e),i=pr(r);V(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:Lt(Fn(i.auth_time)),issuedAtTime:Lt(Fn(i.iat)),expirationTime:Lt(Fn(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Fn(n){return Number(n)*1e3}function pr(n){var e;const[t,r,i]=n.split(".");if(t===void 0||r===void 0||i===void 0)return tn("JWT malformed, contained fewer than 3 sections"),null;try{const s=Ls(r);return s?JSON.parse(s):(tn("Failed to decode base64 JWT payload"),null)}catch(s){return tn("Caught error parsing JWT payload as JSON",(e=s)===null||e===void 0?void 0:e.toString()),null}}function gc(n){const e=pr(n);return V(e,"internal-error"),V(typeof e.exp<"u","internal-error"),V(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ft(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Ge&&bc(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function bc({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wc{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){!this.isRunning||(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){var e;try{await this.user.getIdToken(!0)}catch(t){((e=t)===null||e===void 0?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ys{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Lt(this.lastLoginAt),this.creationTime=Lt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dn(n){var e;const t=n.auth,r=await n.getIdToken(),i=await Ft(n,pc(t,{idToken:r}));V(i==null?void 0:i.users.length,t,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?vc(s.providerUserInfo):[],a=_c(n.providerData,o),l=n.isAnonymous,c=!(n.email&&s.passwordHash)&&!(a!=null&&a.length),u=l?c:!1,d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Ys(s.createdAt,s.lastLoginAt),isAnonymous:u};Object.assign(n,d)}async function yc(n){const e=et(n);await dn(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function _c(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function vc(n){return n.map(e=>{var{providerId:t}=e,r=dr(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kc(n,e){const t=await Gs(n,{},async()=>{const r=qt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,o=Ks(n,i,"/v1/token",`key=${s}`),a=await n._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",Ws.fetch()(o,{method:"POST",headers:a,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){V(e.idToken,"internal-error"),V(typeof e.idToken<"u","internal-error"),V(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):gc(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}async getToken(e,t=!1){return V(!this.accessToken||this.refreshToken,e,"user-token-expired"),!t&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await kc(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,o=new jt;return r&&(V(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(V(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(V(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new jt,this.toJSON())}_performRefresh(){return Ye("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tt(n,e){V(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class dt{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=dr(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new wc(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Ys(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Ft(this,this.stsTokenManager.getToken(this.auth,e));return V(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return mc(this,e)}reload(){return yc(this)}_assign(e){this!==e&&(V(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){return new dt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}))}_onReload(e){V(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await dn(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await Ft(this,hc(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,o,a,l,c,u;const d=(r=t.displayName)!==null&&r!==void 0?r:void 0,h=(i=t.email)!==null&&i!==void 0?i:void 0,p=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,y=(o=t.photoURL)!==null&&o!==void 0?o:void 0,_=(a=t.tenantId)!==null&&a!==void 0?a:void 0,S=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,O=(c=t.createdAt)!==null&&c!==void 0?c:void 0,x=(u=t.lastLoginAt)!==null&&u!==void 0?u:void 0,{uid:R,emailVerified:N,isAnonymous:re,providerData:se,stsTokenManager:M}=t;V(R&&M,e,"internal-error");const z=jt.fromJSON(this.name,M);V(typeof R=="string",e,"internal-error"),tt(d,e.name),tt(h,e.name),V(typeof N=="boolean",e,"internal-error"),V(typeof re=="boolean",e,"internal-error"),tt(p,e.name),tt(y,e.name),tt(_,e.name),tt(S,e.name),tt(O,e.name),tt(x,e.name);const J=new dt({uid:R,auth:e,email:h,emailVerified:N,displayName:d,isAnonymous:re,photoURL:y,phoneNumber:p,tenantId:_,stsTokenManager:z,createdAt:O,lastLoginAt:x});return se&&Array.isArray(se)&&(J.providerData=se.map(W=>Object.assign({},W))),S&&(J._redirectEventId=S),J}static async _fromIdTokenResponse(e,t,r=!1){const i=new jt;i.updateFromServerResponse(t);const s=new dt({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await dn(s),s}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Js.type="NONE";const Vr=Js;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nn(n,e,t){return`firebase:${n}:${e}:${t}`}class vt{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=nn(this.userKey,i.apiKey,s),this.fullPersistenceKey=nn("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?dt._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new vt(Je(Vr),e,r);const i=(await Promise.all(t.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let s=i[0]||Je(Vr);const o=nn(r,e.config.apiKey,e.name);let a=null;for(const c of t)try{const u=await c._get(o);if(u){const d=dt._fromJSON(e,u);c!==s&&(a=d),s=c;break}}catch{}const l=i.filter(c=>c._shouldAllowMigration);return!s._shouldAllowMigration||!l.length?new vt(s,e,r):(s=l[0],a&&await s._set(o,a.toJSON()),await Promise.all(t.map(async c=>{if(c!==s)try{await c._remove(o)}catch{}})),new vt(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wr(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Qs(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Xs(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(to(e))return"Blackberry";if(no(e))return"Webos";if(mr(e))return"Safari";if((e.includes("chrome/")||Zs(e))&&!e.includes("edge/"))return"Chrome";if(eo(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Xs(n=Oe()){return/firefox\//i.test(n)}function mr(n=Oe()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Zs(n=Oe()){return/crios\//i.test(n)}function Qs(n=Oe()){return/iemobile/i.test(n)}function eo(n=Oe()){return/android/i.test(n)}function to(n=Oe()){return/blackberry/i.test(n)}function no(n=Oe()){return/webos/i.test(n)}function In(n=Oe()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Ic(n=Oe()){var e;return In(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Ec(){return Oa()&&document.documentMode===10}function ro(n=Oe()){return In(n)||eo(n)||no(n)||to(n)||/windows phone/i.test(n)||Qs(n)}function Tc(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function io(n,e=[]){let t;switch(n){case"Browser":t=Wr(Oe());break;case"Worker":t=`${Wr(Oe())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${_n}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sc{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((o,a)=>{try{const l=e(s);o(l)}catch(l){a(l)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){var t;if(this.auth.currentUser===e)return;const r=[];try{for(const i of this.queue)await i(e),i.onAbort&&r.push(i.onAbort)}catch(i){r.reverse();for(const s of r)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:(t=i)===null||t===void 0?void 0:t.message})}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ac{constructor(e,t,r){this.app=e,this.heartbeatServiceProvider=t,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Gr(this),this.idTokenSubscription=new Gr(this),this.beforeStateQueue=new Sc(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Vs,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Je(t)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await vt.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var t;const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,a=i==null?void 0:i._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===a)&&(l==null?void 0:l.user)&&(i=l.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return V(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){var t;try{await dn(e)}catch(r){if(((t=r)===null||t===void 0?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=cc()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const t=e?et(e):null;return t&&V(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&V(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(Je(e))})}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new gt("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Je(e)||this._popupRedirectResolver;V(t,this,"argument-error"),this.redirectPersistenceManager=await vt.create(this,[Je(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t),o=this._isInitialized?Promise.resolve():this._initializationPromise;return V(o,this,"internal-error"),o.then(()=>s(this.currentUser)),typeof t=="function"?e.addObserver(t,r,i):e.addObserver(t)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return V(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=io(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={["X-Client-Version"]:this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());return r&&(t["X-Firebase-Client"]=r),t}}function En(n){return et(n)}class Gr{constructor(e){this.auth=e,this.observer=null,this.addObserver=za(t=>this.observer=t)}get next(){return V(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}function Cc(n,e,t){const r=En(n);V(r._canInitEmulator,r,"emulator-config-failed"),V(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!!(t!=null&&t.disableWarnings),s=so(e),{host:o,port:a}=Rc(e),l=a===null?"":`:${a}`;r.config.emulator={url:`${s}//${o}${l}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||Oc()}function so(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Rc(n){const e=so(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:Kr(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:Kr(o)}}}function Kr(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Oc(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gr{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Ye("not implemented")}_getIdTokenResponse(e){return Ye("not implemented")}_linkToIdToken(e,t){return Ye("not implemented")}_getReauthenticationResolver(e){return Ye("not implemented")}}async function Pc(n,e){return Wt(n,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xc(n,e){return kn(n,"POST","/v1/accounts:signInWithPassword",vn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lc(n,e){return kn(n,"POST","/v1/accounts:signInWithEmailLink",vn(n,e))}async function Nc(n,e){return kn(n,"POST","/v1/accounts:signInWithEmailLink",vn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ht extends gr{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new Ht(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new Ht(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if((t==null?void 0:t.email)&&(t==null?void 0:t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return xc(e,{returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return Lc(e,{email:this._email,oobCode:this._password});default:Be(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":return Pc(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return Nc(e,{idToken:t,email:this._email,oobCode:this._password});default:Be(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kt(n,e){return kn(n,"POST","/v1/accounts:signInWithIdp",vn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dc="http://localhost";class ht extends gr{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new ht(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Be("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=dr(t,["providerId","signInMethod"]);if(!r||!i)return null;const o=new ht(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return kt(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,kt(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,kt(e,t)}buildRequest(){const e={requestUri:Dc,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=qt(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mc(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Uc(n){const e=Ct(Rt(n)).link,t=e?Ct(Rt(e)).deep_link_id:null,r=Ct(Rt(n)).deep_link_id;return(r?Ct(Rt(r)).link:null)||r||t||e||n}class Tn{constructor(e){var t,r,i,s,o,a;const l=Ct(Rt(e)),c=(t=l.apiKey)!==null&&t!==void 0?t:null,u=(r=l.oobCode)!==null&&r!==void 0?r:null,d=Mc((i=l.mode)!==null&&i!==void 0?i:null);V(c&&u&&d,"argument-error"),this.apiKey=c,this.operation=d,this.code=u,this.continueUrl=(s=l.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=l.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=l.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){const t=Uc(e);try{return new Tn(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St{constructor(){this.providerId=St.PROVIDER_ID}static credential(e,t){return Ht._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=Tn.parseLink(t);return V(r,"argument-error"),Ht._fromEmailAndCode(e,r.code,r.tenantId)}}St.PROVIDER_ID="password";St.EMAIL_PASSWORD_SIGN_IN_METHOD="password";St.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oo{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt extends oo{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt extends Gt{constructor(){super("facebook.com")}static credential(e){return ht._fromParams({providerId:nt.PROVIDER_ID,signInMethod:nt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return nt.credentialFromTaggedObject(e)}static credentialFromError(e){return nt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return nt.credential(e.oauthAccessToken)}catch{return null}}}nt.FACEBOOK_SIGN_IN_METHOD="facebook.com";nt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt extends Gt{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return ht._fromParams({providerId:rt.PROVIDER_ID,signInMethod:rt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return rt.credentialFromTaggedObject(e)}static credentialFromError(e){return rt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return rt.credential(t,r)}catch{return null}}}rt.GOOGLE_SIGN_IN_METHOD="google.com";rt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class it extends Gt{constructor(){super("github.com")}static credential(e){return ht._fromParams({providerId:it.PROVIDER_ID,signInMethod:it.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return it.credentialFromTaggedObject(e)}static credentialFromError(e){return it.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return it.credential(e.oauthAccessToken)}catch{return null}}}it.GITHUB_SIGN_IN_METHOD="github.com";it.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st extends Gt{constructor(){super("twitter.com")}static credential(e,t){return ht._fromParams({providerId:st.PROVIDER_ID,signInMethod:st.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return st.credentialFromTaggedObject(e)}static credentialFromError(e){return st.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return st.credential(t,r)}catch{return null}}}st.TWITTER_SIGN_IN_METHOD="twitter.com";st.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await dt._fromIdTokenResponse(e,r,i),o=Yr(r);return new Et({user:s,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=Yr(r);return new Et({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function Yr(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn extends Ge{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,fn.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new fn(e,t,r,i)}}function ao(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?fn._fromErrorAndOperation(n,s,e,r):s})}async function Fc(n,e,t=!1){const r=await Ft(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Et._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jc(n,e,t=!1){var r;const{auth:i}=n,s="reauthenticate";try{const o=await Ft(n,ao(i,s,e,n),t);V(o.idToken,i,"internal-error");const a=pr(o.idToken);V(a,i,"internal-error");const{sub:l}=a;return V(n.uid===l,i,"user-mismatch"),Et._forOperation(n,s,o)}catch(o){throw((r=o)===null||r===void 0?void 0:r.code)==="auth/user-not-found"&&Be(i,"user-mismatch"),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lo(n,e,t=!1){const r="signIn",i=await ao(n,r,e),s=await Et._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function Hc(n,e){return lo(En(n),e)}function Bc(n,e){const t=Tn.parseLink(e);return(t==null?void 0:t.operation)==="EMAIL_SIGNIN"}async function $c(n,e,t){const r=et(n),i=St.credentialWithLink(e,t||un());return V(i._tenantId===(r.tenantId||null),r,"tenant-id-mismatch"),Hc(r,i)}function zc(n,e,t,r){return et(n).onIdTokenChanged(e,t,r)}function qc(n,e,t){return et(n).beforeAuthStateChanged(e,t)}function Vc(n,e,t,r){return et(n).onAuthStateChanged(e,t,r)}const hn="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class co{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(hn,"1"),this.storage.removeItem(hn),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wc(){const n=Oe();return mr(n)||In(n)}const Gc=1e3,Kc=10;class uo extends co{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=Wc()&&Tc(),this.fallbackToPolling=ro(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,l)=>{this.notifyListeners(o,l)});return}const r=e.key;if(t?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const o=this.storage.getItem(r);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(r,e.newValue):this.storage.removeItem(r);else if(this.localCache[r]===e.newValue&&!t)return}const i=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);Ec()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Kc):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Gc)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}uo.type="LOCAL";const Yc=uo;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fo extends co{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}fo.type="SESSION";const ho=fo;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jc(n){return Promise.all(n.map(async e=>{try{const t=await e;return{fulfilled:!0,value:t}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new Sn(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const a=Array.from(o).map(async c=>c(t.origin,s)),l=await Jc(a);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Sn.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function br(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xc{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((a,l)=>{const c=br("",20);i.port1.start();const u=setTimeout(()=>{l(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(d){const h=d;if(h.data.eventId===c)switch(h.data.status){case"ack":clearTimeout(u),s=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(h.data.response);break;default:clearTimeout(u),clearTimeout(s),l(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ve(){return window}function Zc(n){Ve().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function po(){return typeof Ve().WorkerGlobalScope<"u"&&typeof Ve().importScripts=="function"}async function Qc(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function eu(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function tu(){return po()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mo="firebaseLocalStorageDb",nu=1,pn="firebaseLocalStorage",go="fbase_key";class Kt{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function An(n,e){return n.transaction([pn],e?"readwrite":"readonly").objectStore(pn)}function ru(){const n=indexedDB.deleteDatabase(mo);return new Kt(n).toPromise()}function er(){const n=indexedDB.open(mo,nu);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(pn,{keyPath:go})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(pn)?e(r):(r.close(),await ru(),e(await er()))})})}async function Jr(n,e,t){const r=An(n,!0).put({[go]:e,value:t});return new Kt(r).toPromise()}async function iu(n,e){const t=An(n,!1).get(e),r=await new Kt(t).toPromise();return r===void 0?null:r.value}function Xr(n,e){const t=An(n,!0).delete(e);return new Kt(t).toPromise()}const su=800,ou=3;class bo{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await er(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>ou)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return po()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Sn._getInstance(tu()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Qc(),!this.activeServiceWorker)return;this.sender=new Xc(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);!r||((e=r[0])===null||e===void 0?void 0:e.fulfilled)&&((t=r[0])===null||t===void 0?void 0:t.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||eu()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await er();return await Jr(e,hn,"1"),await Xr(e,hn),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Jr(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>iu(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Xr(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=An(i,!1).getAll();return new Kt(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),su)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}bo.type="LOCAL";const au=bo;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lu(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}function cu(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=qe("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",lu().appendChild(r)})}function uu(n){return`__${n}${Math.floor(Math.random()*1e6)}`}new Vt(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function du(n,e){return e?Je(e):(V(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wr extends gr{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return kt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return kt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return kt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function fu(n){return lo(n.auth,new wr(n),n.bypassAuthState)}function hu(n){const{auth:e,user:t}=n;return V(t,e,"internal-error"),jc(t,new wr(n),n.bypassAuthState)}async function pu(n){const{auth:e,user:t}=n;return V(t,e,"internal-error"),Fc(t,new wr(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wo{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:o,type:a}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(l))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return fu;case"linkViaPopup":case"linkViaRedirect":return pu;case"reauthViaPopup":case"reauthViaRedirect":return hu;default:Be(this.auth,"internal-error")}}resolve(e){Qe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Qe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mu=new Vt(2e3,1e4);class yt extends wo{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,yt.currentPopupAction&&yt.currentPopupAction.cancel(),yt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return V(e,this.auth,"internal-error"),e}async onExecution(){Qe(this.filter.length===1,"Popup operations only handle one event");const e=br();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(qe(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(qe(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,yt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(qe(this.auth,"popup-closed-by-user"))},2e3);return}this.pollId=window.setTimeout(e,mu.get())};e()}}yt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gu="pendingRedirect",rn=new Map;class bu extends wo{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=rn.get(this.auth._key());if(!e){try{const r=await wu(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}rn.set(this.auth._key(),e)}return this.bypassAuthState||rn.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function wu(n,e){const t=vu(e),r=_u(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}function yu(n,e){rn.set(n._key(),e)}function _u(n){return Je(n._redirectPersistence)}function vu(n){return nn(gu,n.config.apiKey,n.name)}async function ku(n,e,t=!1){const r=En(n),i=du(r,e),o=await new bu(r,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Iu=10*60*1e3;class Eu{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Tu(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!yo(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(qe(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Iu&&this.cachedEventUids.clear(),this.cachedEventUids.has(Zr(e))}saveEventToCache(e){this.cachedEventUids.add(Zr(e)),this.lastProcessedEventTime=Date.now()}}function Zr(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function yo({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Tu(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return yo(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Su(n,e={}){return Wt(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Au=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Cu=/^https?/;async function Ru(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Su(n);for(const t of e)try{if(Ou(t))return}catch{}Be(n,"unauthorized-domain")}function Ou(n){const e=un(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!Cu.test(t))return!1;if(Au.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pu=new Vt(3e4,6e4);function Qr(){const n=Ve().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function xu(n){return new Promise((e,t)=>{var r,i,s;function o(){Qr(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Qr(),t(qe(n,"network-request-failed"))},timeout:Pu.get()})}if(!((i=(r=Ve().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=Ve().gapi)===null||s===void 0)&&s.load)o();else{const a=uu("iframefcb");return Ve()[a]=()=>{gapi.load?o():t(qe(n,"network-request-failed"))},cu(`https://apis.google.com/js/api.js?onload=${a}`).catch(l=>t(l))}}).catch(e=>{throw sn=null,e})}let sn=null;function Lu(n){return sn=sn||xu(n),sn}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nu=new Vt(5e3,15e3),Du="__/auth/iframe",Mu="emulator/auth/iframe",Uu={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Fu=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function ju(n){const e=n.config;V(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?hr(e,Mu):`https://${n.config.authDomain}/${Du}`,r={apiKey:e.apiKey,appName:n.name,v:_n},i=Fu.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${qt(r).slice(1)}`}async function Hu(n){const e=await Lu(n),t=Ve().gapi;return V(t,n,"internal-error"),e.open({where:document.body,url:ju(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Uu,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=qe(n,"network-request-failed"),a=Ve().setTimeout(()=>{s(o)},Nu.get());function l(){Ve().clearTimeout(a),i(r)}r.ping(l).then(l,()=>{s(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bu={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},$u=500,zu=600,qu="_blank",Vu="http://localhost";class ei{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Wu(n,e,t,r=$u,i=zu){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const l=Object.assign(Object.assign({},Bu),{width:r.toString(),height:i.toString(),top:s,left:o}),c=Oe().toLowerCase();t&&(a=Zs(c)?qu:t),Xs(c)&&(e=e||Vu,l.scrollbars="yes");const u=Object.entries(l).reduce((h,[p,y])=>`${h}${p}=${y},`,"");if(Ic(c)&&a!=="_self")return Gu(e||"",a),new ei(null);const d=window.open(e||"",a,u);V(d,n,"popup-blocked");try{d.focus()}catch{}return new ei(d)}function Gu(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ku="__/auth/handler",Yu="emulator/auth/handler";function ti(n,e,t,r,i,s){V(n.config.authDomain,n,"auth-domain-config-required"),V(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:_n,eventId:i};if(e instanceof oo){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",$a(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[l,c]of Object.entries(s||{}))o[l]=c}if(e instanceof Gt){const l=e.getScopes().filter(c=>c!=="");l.length>0&&(o.scopes=l.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const l of Object.keys(a))a[l]===void 0&&delete a[l];return`${Ju(n)}?${qt(a).slice(1)}`}function Ju({config:n}){return n.emulator?hr(n,Yu):`https://${n.authDomain}/${Ku}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jn="webStorageSupport";class Xu{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ho,this._completeRedirectFn=ku,this._overrideRedirectResult=yu}async _openPopup(e,t,r,i){var s;Qe((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=ti(e,t,r,un(),i);return Wu(e,o,br())}async _openRedirect(e,t,r,i){return await this._originValidation(e),Zc(ti(e,t,r,un(),i)),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(Qe(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Hu(e),r=new Eu(e);return t.register("authEvent",i=>(V(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(jn,{type:jn},i=>{var s;const o=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[jn];o!==void 0&&t(!!o),Be(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Ru(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return ro()||mr()||In()}}const Zu=Xu;var ni="@firebase/auth",ri="0.20.8";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qu{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{var i;e(((i=r)===null||i===void 0?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);!t||(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){V(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ed(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function td(n){Ze(new We("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),{apiKey:s,authDomain:o}=r.options;return((a,l)=>{V(s&&!s.includes(":"),"invalid-api-key",{appName:a.name}),V(!(o!=null&&o.includes(":")),"argument-error",{appName:a.name});const c={apiKey:s,authDomain:o,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:io(n)},u=new Ac(a,l,c);return oc(u,t),u})(r,i)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Ze(new We("auth-internal",e=>{const t=En(e.getProvider("auth").getImmediate());return(r=>new Qu(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),ze(ni,ri,ed(n)),ze(ni,ri,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nd=5*60,rd=Us("authIdTokenMaxAge")||nd;let ii=null;const id=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>rd)return;const i=t==null?void 0:t.token;ii!==i&&(ii=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function sd(n=Vl()){const e=Tt(n,"auth");if(e.isInitialized())return e.getImmediate();const t=sc(n,{popupRedirectResolver:Zu,persistence:[au,Yc,ho]}),r=Us("authTokenSyncURL");if(r){const s=id(r);qc(t,s,()=>s(t.currentUser)),zc(t,o=>s(o))}const i=Ma("auth");return i&&Cc(t,`http://${i}`),t}td("Browser");const _o="@firebase/installations",yr="0.5.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vo=1e4,ko=`w:${yr}`,Io="FIS_v2",od="https://firebaseinstallations.googleapis.com/v1",ad=60*60*1e3,ld="installations",cd="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ud={["missing-app-config-values"]:'Missing App configuration value: "{$valueName}"',["not-registered"]:"Firebase Installation is not registered.",["installation-not-found"]:"Firebase Installation not found.",["request-failed"]:'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',["app-offline"]:"Could not process request. Application offline.",["delete-pending-registration"]:"Can't delete installation while there is a pending registration request."},pt=new gt(ld,cd,ud);function Eo(n){return n instanceof Ge&&n.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function To({projectId:n}){return`${od}/projects/${n}/installations`}function So(n){return{token:n.token,requestStatus:2,expiresIn:fd(n.expiresIn),creationTime:Date.now()}}async function Ao(n,e){const r=(await e.json()).error;return pt.create("request-failed",{requestName:n,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function Co({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function dd(n,{refreshToken:e}){const t=Co(n);return t.append("Authorization",hd(e)),t}async function Ro(n){const e=await n();return e.status>=500&&e.status<600?n():e}function fd(n){return Number(n.replace("s","000"))}function hd(n){return`${Io} ${n}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pd({appConfig:n,heartbeatServiceProvider:e},{fid:t}){const r=To(n),i=Co(n),s=e.getImmediate({optional:!0});if(s){const c=await s.getHeartbeatsHeader();c&&i.append("x-firebase-client",c)}const o={fid:t,authVersion:Io,appId:n.appId,sdkVersion:ko},a={method:"POST",headers:i,body:JSON.stringify(o)},l=await Ro(()=>fetch(r,a));if(l.ok){const c=await l.json();return{fid:c.fid||t,registrationStatus:2,refreshToken:c.refreshToken,authToken:So(c.authToken)}}else throw await Ao("Create Installation",l)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oo(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function md(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gd=/^[cdef][\w-]{21}$/,tr="";function bd(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const t=wd(n);return gd.test(t)?t:tr}catch{return tr}}function wd(n){return md(n).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cn(n){return`${n.appName}!${n.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Po=new Map;function xo(n,e){const t=Cn(n);Lo(t,e),yd(t,e)}function Lo(n,e){const t=Po.get(n);if(!!t)for(const r of t)r(e)}function yd(n,e){const t=_d();t&&t.postMessage({key:n,fid:e}),vd()}let ut=null;function _d(){return!ut&&"BroadcastChannel"in self&&(ut=new BroadcastChannel("[Firebase] FID Change"),ut.onmessage=n=>{Lo(n.data.key,n.data.fid)}),ut}function vd(){Po.size===0&&ut&&(ut.close(),ut=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kd="firebase-installations-database",Id=1,mt="firebase-installations-store";let Hn=null;function _r(){return Hn||(Hn=Hs(kd,Id,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(mt)}}})),Hn}async function mn(n,e){const t=Cn(n),i=(await _r()).transaction(mt,"readwrite"),s=i.objectStore(mt),o=await s.get(t);return await s.put(e,t),await i.done,(!o||o.fid!==e.fid)&&xo(n,e.fid),e}async function No(n){const e=Cn(n),r=(await _r()).transaction(mt,"readwrite");await r.objectStore(mt).delete(e),await r.done}async function Rn(n,e){const t=Cn(n),i=(await _r()).transaction(mt,"readwrite"),s=i.objectStore(mt),o=await s.get(t),a=e(o);return a===void 0?await s.delete(t):await s.put(a,t),await i.done,a&&(!o||o.fid!==a.fid)&&xo(n,a.fid),a}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vr(n){let e;const t=await Rn(n.appConfig,r=>{const i=Ed(r),s=Td(n,i);return e=s.registrationPromise,s.installationEntry});return t.fid===tr?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function Ed(n){const e=n||{fid:bd(),registrationStatus:0};return Do(e)}function Td(n,e){if(e.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(pt.create("app-offline"));return{installationEntry:e,registrationPromise:i}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=Sd(n,t);return{installationEntry:t,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:Ad(n)}:{installationEntry:e}}async function Sd(n,e){try{const t=await pd(n,e);return mn(n.appConfig,t)}catch(t){throw Eo(t)&&t.customData.serverCode===409?await No(n.appConfig):await mn(n.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function Ad(n){let e=await si(n.appConfig);for(;e.registrationStatus===1;)await Oo(100),e=await si(n.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:r}=await vr(n);return r||t}return e}function si(n){return Rn(n,e=>{if(!e)throw pt.create("installation-not-found");return Do(e)})}function Do(n){return Cd(n)?{fid:n.fid,registrationStatus:0}:n}function Cd(n){return n.registrationStatus===1&&n.registrationTime+vo<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rd({appConfig:n,heartbeatServiceProvider:e},t){const r=Od(n,t),i=dd(n,t),s=e.getImmediate({optional:!0});if(s){const c=await s.getHeartbeatsHeader();c&&i.append("x-firebase-client",c)}const o={installation:{sdkVersion:ko,appId:n.appId}},a={method:"POST",headers:i,body:JSON.stringify(o)},l=await Ro(()=>fetch(r,a));if(l.ok){const c=await l.json();return So(c)}else throw await Ao("Generate Auth Token",l)}function Od(n,{fid:e}){return`${To(n)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kr(n,e=!1){let t;const r=await Rn(n.appConfig,s=>{if(!Mo(s))throw pt.create("not-registered");const o=s.authToken;if(!e&&Ld(o))return s;if(o.requestStatus===1)return t=Pd(n,e),s;{if(!navigator.onLine)throw pt.create("app-offline");const a=Dd(s);return t=xd(n,a),a}});return t?await t:r.authToken}async function Pd(n,e){let t=await oi(n.appConfig);for(;t.authToken.requestStatus===1;)await Oo(100),t=await oi(n.appConfig);const r=t.authToken;return r.requestStatus===0?kr(n,e):r}function oi(n){return Rn(n,e=>{if(!Mo(e))throw pt.create("not-registered");const t=e.authToken;return Md(t)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function xd(n,e){try{const t=await Rd(n,e),r=Object.assign(Object.assign({},e),{authToken:t});return await mn(n.appConfig,r),t}catch(t){if(Eo(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await No(n.appConfig);else{const r=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await mn(n.appConfig,r)}throw t}}function Mo(n){return n!==void 0&&n.registrationStatus===2}function Ld(n){return n.requestStatus===2&&!Nd(n)}function Nd(n){const e=Date.now();return e<n.creationTime||n.creationTime+n.expiresIn<e+ad}function Dd(n){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},n),{authToken:e})}function Md(n){return n.requestStatus===1&&n.requestTime+vo<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ud(n){const e=n,{installationEntry:t,registrationPromise:r}=await vr(e);return r?r.catch(console.error):kr(e).catch(console.error),t.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fd(n,e=!1){const t=n;return await jd(t),(await kr(t,e)).token}async function jd(n){const{registrationPromise:e}=await vr(n);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hd(n){if(!n||!n.options)throw Bn("App Configuration");if(!n.name)throw Bn("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!n.options[t])throw Bn(t);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function Bn(n){return pt.create("missing-app-config-values",{valueName:n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uo="installations",Bd="installations-internal",$d=n=>{const e=n.getProvider("app").getImmediate(),t=Hd(e),r=Tt(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},zd=n=>{const e=n.getProvider("app").getImmediate(),t=Tt(e,Uo).getImmediate();return{getId:()=>Ud(t),getToken:i=>Fd(t,i)}};function qd(){Ze(new We(Uo,$d,"PUBLIC")),Ze(new We(Bd,zd,"PRIVATE"))}qd();ze(_o,yr);ze(_o,yr,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nr="analytics",Vd="firebase_id",Wd="origin",Gd=60*1e3,Kd="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Fo="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const De=new cr("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jo(n){return Promise.all(n.map(e=>e.catch(t=>t)))}function Yd(n,e){const t=document.createElement("script");t.src=`${Fo}?l=${n}&id=${e}`,t.async=!0,document.head.appendChild(t)}function Jd(n){let e=[];return Array.isArray(window[n])?e=window[n]:window[n]=e,e}async function Xd(n,e,t,r,i,s){const o=r[i];try{if(o)await e[o];else{const l=(await jo(t)).find(c=>c.measurementId===i);l&&await e[l.appId]}}catch(a){De.error(a)}n("config",i,s)}async function Zd(n,e,t,r,i){try{let s=[];if(i&&i.send_to){let o=i.send_to;Array.isArray(o)||(o=[o]);const a=await jo(t);for(const l of o){const c=a.find(d=>d.measurementId===l),u=c&&e[c.appId];if(u)s.push(u);else{s=[];break}}}s.length===0&&(s=Object.values(e)),await Promise.all(s),n("event",r,i||{})}catch(s){De.error(s)}}function Qd(n,e,t,r){async function i(s,o,a){try{s==="event"?await Zd(n,e,t,o,a):s==="config"?await Xd(n,e,t,r,o,a):s==="consent"?n("consent","update",a):n("set",o)}catch(l){De.error(l)}}return i}function ef(n,e,t,r,i){let s=function(...o){window[r].push(arguments)};return window[i]&&typeof window[i]=="function"&&(s=window[i]),window[i]=Qd(s,n,e,t),{gtagCore:s,wrappedGtag:window[i]}}function tf(){const n=window.document.getElementsByTagName("script");for(const e of Object.values(n))if(e.src&&e.src.includes(Fo))return e;return null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nf={["already-exists"]:"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.",["already-initialized"]:"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-intialized instance.",["already-initialized-settings"]:"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.",["interop-component-reg-failed"]:"Firebase Analytics Interop Component failed to instantiate: {$reason}",["invalid-analytics-context"]:"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",["indexeddb-unavailable"]:"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",["fetch-throttle"]:"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.",["config-fetch-failed"]:"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}",["no-api-key"]:'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',["no-app-id"]:'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.'},Fe=new gt("analytics","Analytics",nf);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rf=30,sf=1e3;class of{constructor(e={},t=sf){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const Ho=new of;function af(n){return new Headers({Accept:"application/json","x-goog-api-key":n})}async function lf(n){var e;const{appId:t,apiKey:r}=n,i={method:"GET",headers:af(r)},s=Kd.replace("{app-id}",t),o=await fetch(s,i);if(o.status!==200&&o.status!==304){let a="";try{const l=await o.json();!((e=l.error)===null||e===void 0)&&e.message&&(a=l.error.message)}catch{}throw Fe.create("config-fetch-failed",{httpStatus:o.status,responseMessage:a})}return o.json()}async function cf(n,e=Ho,t){const{appId:r,apiKey:i,measurementId:s}=n.options;if(!r)throw Fe.create("no-app-id");if(!i){if(s)return{measurementId:s,appId:r};throw Fe.create("no-api-key")}const o=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},a=new ff;return setTimeout(async()=>{a.abort()},t!==void 0?t:Gd),Bo({appId:r,apiKey:i,measurementId:s},o,a,e)}async function Bo(n,{throttleEndTimeMillis:e,backoffCount:t},r,i=Ho){var s,o;const{appId:a,measurementId:l}=n;try{await uf(r,e)}catch(c){if(l)return De.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${l} provided in the "measurementId" field in the local Firebase config. [${(s=c)===null||s===void 0?void 0:s.message}]`),{appId:a,measurementId:l};throw c}try{const c=await lf(n);return i.deleteThrottleMetadata(a),c}catch(c){const u=c;if(!df(u)){if(i.deleteThrottleMetadata(a),l)return De.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${l} provided in the "measurementId" field in the local Firebase config. [${u==null?void 0:u.message}]`),{appId:a,measurementId:l};throw c}const d=Number((o=u==null?void 0:u.customData)===null||o===void 0?void 0:o.httpStatus)===503?Nr(t,i.intervalMillis,rf):Nr(t,i.intervalMillis),h={throttleEndTimeMillis:Date.now()+d,backoffCount:t+1};return i.setThrottleMetadata(a,h),De.debug(`Calling attemptFetch again in ${d} millis`),Bo(n,h,r,i)}}function uf(n,e){return new Promise((t,r)=>{const i=Math.max(e-Date.now(),0),s=setTimeout(t,i);n.addEventListener(()=>{clearTimeout(s),r(Fe.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function df(n){if(!(n instanceof Ge)||!n.customData)return!1;const e=Number(n.customData.httpStatus);return e===429||e===500||e===503||e===504}class ff{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function hf(n,e,t,r,i){if(i&&i.global){n("event",t,r);return}else{const s=await e,o=Object.assign(Object.assign({},r),{send_to:s});n("event",t,o)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pf(){var n;if(Ds())try{await Ms()}catch(e){return De.warn(Fe.create("indexeddb-unavailable",{errorInfo:(n=e)===null||n===void 0?void 0:n.toString()}).message),!1}else return De.warn(Fe.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function mf(n,e,t,r,i,s,o){var a;const l=cf(n);l.then(p=>{t[p.measurementId]=p.appId,n.options.measurementId&&p.measurementId!==n.options.measurementId&&De.warn(`The measurement ID in the local Firebase config (${n.options.measurementId}) does not match the measurement ID fetched from the server (${p.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(p=>De.error(p)),e.push(l);const c=pf().then(p=>{if(p)return r.getId()}),[u,d]=await Promise.all([l,c]);tf()||Yd(s,u.measurementId),i("js",new Date);const h=(a=o==null?void 0:o.config)!==null&&a!==void 0?a:{};return h[Wd]="firebase",h.update=!0,d!=null&&(h[Vd]=d),i("config",u.measurementId,h),u.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gf{constructor(e){this.app=e}_delete(){return delete Nt[this.app.options.appId],Promise.resolve()}}let Nt={},ai=[];const li={};let $n="dataLayer",bf="gtag",ci,$o,ui=!1;function wf(){const n=[];if(Ns()&&n.push("This is a browser extension environment."),Pa()||n.push("Cookies are not available."),n.length>0){const e=n.map((r,i)=>`(${i+1}) ${r}`).join(" "),t=Fe.create("invalid-analytics-context",{errorInfo:e});De.warn(t.message)}}function yf(n,e,t){wf();const r=n.options.appId;if(!r)throw Fe.create("no-app-id");if(!n.options.apiKey)if(n.options.measurementId)De.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${n.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Fe.create("no-api-key");if(Nt[r]!=null)throw Fe.create("already-exists",{id:r});if(!ui){Jd($n);const{wrappedGtag:s,gtagCore:o}=ef(Nt,ai,li,$n,bf);$o=s,ci=o,ui=!0}return Nt[r]=mf(n,ai,li,e,ci,$n,t),new gf(n)}function _f(n,e={}){const t=Tt(n,nr);if(t.isInitialized()){const i=t.getImmediate();if(Mt(e,t.getOptions()))return i;throw Fe.create("already-initialized")}return t.initialize({options:e})}function zo(n,e,t,r){n=et(n),hf($o,Nt[n.app.options.appId],e,t,r).catch(i=>De.error(i))}const di="@firebase/analytics",fi="0.8.1";function vf(){Ze(new We(nr,(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("installations-internal").getImmediate();return yf(r,i,t)},"PUBLIC")),Ze(new We("analytics-internal",n,"PRIVATE")),ze(di,fi),ze(di,fi,"esm2017");function n(e){try{const t=e.getProvider(nr).getImmediate();return{logEvent:(r,i,s)=>zo(t,r,i,s)}}catch(t){throw Fe.create("interop-component-reg-failed",{reason:t})}}}vf();const kf={apiKey:"AIzaSyDk8zKfPyu7HLmyBkXh2iwLhH1wqaNWDV4",authDomain:"zxce3-net.firebaseapp.com",databaseURL:"https://zxce3-net-default-rtdb.europe-west1.firebasedatabase.app",projectId:"zxce3-net",storageBucket:"zxce3-net.appspot.com",messagingSenderId:"135885650846",appId:"1:135885650846:web:47f057302db0f6ed4a748f",measurementId:"G-DV9DYH2SSE"},qo=Bs(kf),gn=sd(qo),If=_f(qo);function Ef(){zo(If,"page_view",{page_location:window.location.href})}async function Tf(){if(Bc(gn,window.location.href)){let n=window.localStorage.getItem("emailForSignIn");n||(n=window.prompt("Please provide your email for confirmation"));const e=$c(gn,n,window.location.href);return window.localStorage.removeItem("emailForSignIn"),Sf(e)}else return{res:null,serverError:"Invalid link"}}async function Sf(n){let e,t;try{e=await n,Ue.set(null),xe.set({message:"Access granted! Logged into the mainframe!",type:"success"})}catch(r){t=r.message,console.error(r),xe.set({message:t,type:"error"})}return{res:e,serverError:t}}async function Re(n){var e;try{if(!gn.currentUser){Ue.set("signin"),xe.set({message:"You must be signed in first",type:"info"});return}const{getFunctions:t,httpsCallable:r}=await on(()=>import("./index.esm.172abf45.js"),[]),i=t();return(await r(i,"userAPI")(n)).data}catch(t){console.log(t),xe.set({message:(e=t==null?void 0:t.message)!=null?e:"Unknown Error. Contact hello@fireship.io for help",type:"error"})}}function Af(){let n;window.addEventListener("flamethrower:router:fetch",()=>{var e;n=(e=document.getElementById("sidebar"))==null?void 0:e.scrollTop}),window.addEventListener("flamethrower:router:end",()=>{const e=document.getElementById("sidebar");e==null||e.scrollTo({top:n})})}const Ot=Le(!0),zn="himom";let wt="";function Cf(n){n.ctrlKey&&n.key==="b"&&(console.log("ctrlb"),n.preventDefault(),Ot.update(e=>!e)),n.key==="Escape"&&Ue.set(null),(n.key==="/"||n.ctrlKey&&n.key==="k")&&(n.preventDefault(),Ue.set("search")),zn.includes(n.key)?(wt+=n.key,wt===zn&&(console.log("HI MOM!"),Ue.set("himom"),wt=""),zn.includes(wt)||(wt="")):wt=""}window.addEventListener("keydown",Cf);function Rf(n){return{c(){this.c=E},m:E,p:E,i:E,o:E,d:E}}function Of(n,e,t){let{permalink:r}=e,{next:i}=e,{prev:s}=e,{vimeo:o}=e,{youtube:a}=e,{free:l}=e;return je(()=>{yn.set({permalink:r,next:i,prev:s,vimeo:o,free:l,youtube:a})}),n.$$set=c=>{"permalink"in c&&t(0,r=c.permalink),"next"in c&&t(1,i=c.next),"prev"in c&&t(2,s=c.prev),"vimeo"in c&&t(3,o=c.vimeo),"youtube"in c&&t(4,a=c.youtube),"free"in c&&t(5,l=c.free)},[r,i,s,o,a,l]}class Pf extends Q{constructor(e){super(),te(this,{target:this.shadowRoot,props:ee(this.attributes),customElement:!0},Of,Rf,Z,{permalink:0,next:1,prev:2,vimeo:3,youtube:4,free:5},null),e&&(e.target&&g(e.target,this,e.anchor),e.props&&(this.$set(e.props),X()))}static get observedAttributes(){return["permalink","next","prev","vimeo","youtube","free"]}get permalink(){return this.$$.ctx[0]}set permalink(e){this.$$set({permalink:e}),X()}get next(){return this.$$.ctx[1]}set next(e){this.$$set({next:e}),X()}get prev(){return this.$$.ctx[2]}set prev(e){this.$$set({prev:e}),X()}get vimeo(){return this.$$.ctx[3]}set vimeo(e){this.$$set({vimeo:e}),X()}get youtube(){return this.$$.ctx[4]}set youtube(e){this.$$set({youtube:e}),X()}get free(){return this.$$.ctx[5]}set free(e){this.$$set({free:e}),X()}}customElements.define("global-data",Pf);function xf(n){let e,t,r;return{c(){e=m("span"),e.innerHTML="<slot></slot>",this.c=E},m(i,s){g(i,e,s),t||(r=D(e,"click",n[0]),t=!0)},p:E,i:E,o:E,d(i){i&&w(e),t=!1,r()}}}function Lf(n,e,t){let{type:r="open"}=e,{name:i="default"}=e;function s(){r==="open"&&Ue.set(i),r==="close"&&Ue.set(null)}return n.$$set=o=>{"type"in o&&t(1,r=o.type),"name"in o&&t(2,i=o.name)},[s,r,i]}class Nf extends Q{constructor(e){super(),te(this,{target:this.shadowRoot,props:ee(this.attributes),customElement:!0},Lf,xf,Z,{type:1,name:2},null),e&&(e.target&&g(e.target,this,e.anchor),e.props&&(this.$set(e.props),X()))}static get observedAttributes(){return["type","name"]}get type(){return this.$$.ctx[1]}set type(e){this.$$set({type:e}),X()}get name(){return this.$$.ctx[2]}set name(e){this.$$set({name:e}),X()}}customElements.define("modal-action",Nf);function hi(n){let e,t,r;return{c(){e=m("kbd"),e.textContent="esc",b(e,"class","esc")},m(i,s){g(i,e,s),t||(r=D(e,"click",n[3]),t=!0)},p:E,d(i){i&&w(e),t=!1,r()}}}function Df(n){let e,t,r,i,s,o,a=n[1]&&hi(n);return{c(){e=m("div"),t=m("div"),a&&a.c(),r=k(),i=m("slot"),this.c=E,b(t,"class","inner"),oe(t,"inner-show",n[2]===n[0]),b(e,"class","backdrop"),oe(e,"show",n[2]===n[0])},m(l,c){g(l,e,c),f(e,t),a&&a.m(t,null),f(t,r),f(t,i),s||(o=[D(t,"click",ha(n[4])),D(e,"click",n[3])],s=!0)},p(l,[c]){l[1]?a?a.p(l,c):(a=hi(l),a.c(),a.m(t,r)):a&&(a.d(1),a=null),c&5&&oe(t,"inner-show",l[2]===l[0]),c&5&&oe(e,"show",l[2]===l[0])},i:E,o:E,d(l){l&&w(e),a&&a.d(),s=!1,Te(o)}}}function Mf(n,e,t){let r;Ce(n,Ue,l=>t(2,r=l));let{name:i="default"}=e,{esc:s=!1}=e;function o(){Ue.set(null)}function a(l){ga.call(this,n,l)}return n.$$set=l=>{"name"in l&&t(0,i=l.name),"esc"in l&&t(1,s=l.esc)},[i,s,r,o,a]}class Uf extends Q{constructor(e){super(),this.shadowRoot.innerHTML="<style>.backdrop{visibility:hidden;position:fixed;top:0px;right:0px;bottom:0px;left:0px;z-index:99;display:flex;flex-direction:column;align-items:center;background-color:rgb(0 0 0 / var(--tw-bg-opacity));--tw-bg-opacity:0.9;padding-top:5rem;opacity:0}.show{visibility:visible;opacity:1}.inner{margin-left:1.25rem;margin-right:1.25rem;height:auto;width:75%;max-width:100%;--tw-scale-x:.75;--tw-scale-y:.75;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));overflow-y:auto;border-radius:0.375rem;--tw-bg-opacity:1;background-color:rgb(42 46 53 / var(--tw-bg-opacity));padding-left:2rem;padding-right:2rem;padding-top:3rem;padding-bottom:3rem;opacity:0;--tw-shadow:0 5px 20px rgb(0 0 0 / 90%);--tw-shadow-colored:0 5px 20px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}@media(min-width: 768px){.inner{width:auto}}.inner-show{--tw-scale-x:1;--tw-scale-y:1;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:1;transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:200ms}.esc{position:absolute;top:1.5rem;right:1.5rem;cursor:pointer;border-radius:0.375rem;border-width:1px;border-style:solid;--tw-border-opacity:1;border-color:rgb(249 115 22 / var(--tw-border-opacity));--tw-bg-opacity:0.5;padding:0.375rem;font-size:0.75rem;line-height:1rem;--tw-text-opacity:1;color:rgb(178 190 205 / var(--tw-text-opacity));--tw-drop-shadow:drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.esc:hover{--tw-bg-opacity:1;background-color:rgb(249 115 22 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))}</style>",te(this,{target:this.shadowRoot,props:ee(this.attributes),customElement:!0},Mf,Df,Z,{name:0,esc:1},null),e&&(e.target&&g(e.target,this,e.anchor),e.props&&(this.$set(e.props),X()))}static get observedAttributes(){return["name","esc"]}get name(){return this.$$.ctx[0]}set name(e){this.$$set({name:e}),X()}get esc(){return this.$$.ctx[1]}set esc(e){this.$$set({esc:e}),X()}}customElements.define("modal-dialog",Uf);const Ir=Le(!1);let Vo;window.addEventListener("flamethrower:router:fetch",n=>{Vo=setTimeout(()=>{Ir.set(!0)},0)});window.addEventListener("flamethrower:router:end",n=>{clearTimeout(Vo),setTimeout(()=>{Ir.set(!1)},400)});function Ff(n){let e;return{c(){e=m("div"),this.c=E,b(e,"class","gradient-loader"),oe(e,"show",n[0])},m(t,r){g(t,e,r)},p(t,[r]){r&1&&oe(e,"show",t[0])},i:E,o:E,d(t){t&&w(e)}}}function jf(n,e,t){let r;return Ce(n,Ir,i=>t(0,r=i)),[r]}class Hf extends Q{constructor(e){super(),this.shadowRoot.innerHTML="<style>div{position:fixed;top:0px;left:0px;height:0.375rem;width:100%;--tw-translate-x:-100%;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:0;transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.show{--tw-translate-x:0px;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:1}.gradient-loader{background-image:linear-gradient(to right, var(--tw-gradient-stops));--tw-gradient-from:#f97316;--tw-gradient-to:rgb(249 115 22 / 0);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to);--tw-gradient-to:rgb(168 85 247 / 0);--tw-gradient-stops:var(--tw-gradient-from), #a855f7, var(--tw-gradient-to);--tw-gradient-to:#ec4899;background-size:200% 200%;animation:gradiant-move 1s infinite}@keyframes gradiant-move{0%{background-position:left}50%{background-position:right}100%{background-position:left}}</style>",te(this,{target:this.shadowRoot,props:ee(this.attributes),customElement:!0},jf,Ff,Z,{},null),e&&e.target&&g(e.target,this,e.anchor)}}customElements.define("route-loader",Hf);function pi(n){var h,p;let e,t,r=n[0].message+"",i,s,o,a=((p=n[0].icon)!=null?p:n[3][(h=n[0].type)!=null?h:"info"])+"",l,c,u,d;return{c(){e=m("div"),t=m("div"),i=A(r),s=k(),o=m("div"),l=A(a),b(t,"class","message"),b(o,"class","icon"),b(e,"class",c=`toast ${n[2]}`),oe(e,"active",n[1])},m(y,_){g(y,e,_),f(e,t),f(t,i),f(e,s),f(e,o),f(o,l),u||(d=D(e,"click",n[4]),u=!0)},p(y,_){var S,O;_&1&&r!==(r=y[0].message+"")&&j(i,r),_&1&&a!==(a=((O=y[0].icon)!=null?O:y[3][(S=y[0].type)!=null?S:"info"])+"")&&j(l,a),_&4&&c!==(c=`toast ${y[2]}`)&&b(e,"class",c),_&6&&oe(e,"active",y[1])},d(y){y&&w(e),u=!1,d()}}}function Bf(n){let e,t=n[0]&&pi(n);return{c(){t&&t.c(),e=ge(),this.c=E},m(r,i){t&&t.m(r,i),g(r,e,i)},p(r,[i]){r[0]?t?t.p(r,i):(t=pi(r),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},i:E,o:E,d(r){t&&t.d(r),r&&w(e)}}}function $f(n,e,t){let r,i=!1,s,o,a={success:"\u2714\uFE0F",error:"\u2620\uFE0F",info:"\u{1F4A1}"};je(()=>{xe.subscribe(c=>{t(0,s=c),clearTimeout(o),c&&(o=setTimeout(()=>{xe.set(null)},(c==null?void 0:c.delay)||1e4),t(1,i=!1),setTimeout(()=>{t(1,i=!0)},200))})});const l=()=>xe.set(null);return n.$$.update=()=>{n.$$.dirty&1&&t(2,r=(s==null?void 0:s.type)||"info")},[s,i,r,a,l]}class zf extends Q{constructor(e){super(),this.shadowRoot.innerHTML="<style>.toast{border:none;visibility:hidden;position:fixed;bottom:1.5rem;right:1.5rem;z-index:999;margin:1.5rem;display:flex;--tw-translate-x:20rem;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));cursor:pointer;opacity:0;transition-property:all;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.toast.active{visibility:visible;--tw-translate-x:0px;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:1}.toast .icon{display:grid;width:2.5rem;place-items:center;background-color:rgb(0 0 0 / var(--tw-bg-opacity));--tw-bg-opacity:0.8;padding-left:0.5rem;padding-right:0.5rem;padding-top:0.25rem;padding-bottom:0.25rem;font-family:cubano, sans-serif;font-size:1.125rem;line-height:1.75rem;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));--tw-shadow:0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.toast .message{background-color:rgb(0 0 0 / var(--tw-bg-opacity));--tw-bg-opacity:0.5;padding:1rem;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));--tw-shadow:0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.toast .message:hover{text-decoration-line:line-through}.toast.success .message{--tw-text-opacity:1;color:rgb(34 197 94 / var(--tw-text-opacity))}.toast.error .message{--tw-text-opacity:1;color:rgb(239 68 68 / var(--tw-text-opacity))}</style>",te(this,{target:this.shadowRoot,props:ee(this.attributes),customElement:!0},$f,Bf,Z,{},null),e&&e.target&&g(e.target,this,e.anchor)}}customElements.define("toast-message",zf);function qf(n){let e,t,r,i,s,o;return{c(){e=m("div"),t=m("span"),t.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg>',r=k(),i=m("span"),i.innerHTML='<slot name="collapse"></slot>',b(t,"class","btn"),b(e,"class","wrap")},m(a,l){g(a,e,l),f(e,t),g(a,r,l),g(a,i,l),s||(o=[D(t,"click",n[2]),D(i,"click",n[3])],s=!0)},p:E,d(a){a&&w(e),a&&w(r),a&&w(i),s=!1,Te(o)}}}function Vf(n){let e,t,r,i,s,o;return{c(){e=m("div"),t=m("span"),t.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"></path></svg> 
        <span class="text">ctrl+b</span>`,r=k(),i=m("slot"),b(t,"class","btn"),b(e,"class","wrap")},m(a,l){g(a,e,l),f(e,t),g(a,r,l),g(a,i,l),s||(o=D(t,"click",n[1]),s=!0)},p:E,d(a){a&&w(e),a&&w(r),a&&w(i),s=!1,o()}}}function Wf(n){let e;function t(s,o){return s[0]?Vf:qf}let r=t(n),i=r(n);return{c(){i.c(),e=ge(),this.c=E},m(s,o){i.m(s,o),g(s,e,o)},p(s,[o]){r===(r=t(s))&&i?i.p(s,o):(i.d(1),i=r(s),i&&(i.c(),i.m(e.parentNode,e)))},i:E,o:E,d(s){i.d(s),s&&w(e)}}}function Gf(n,e,t){let r;return Ce(n,Ot,a=>t(0,r=a)),[r,()=>Ot.set(!1),()=>Ot.set(!0),()=>Ot.set(!0)]}class Kf extends Q{constructor(e){super(),this.shadowRoot.innerHTML=`<style>.wrap{margin-right:1rem;display:flex;justify-content:space-between;padding:0.5rem
}.btn{display:none;cursor:pointer;border-radius:0.375rem;border-width:1px;border-style:solid;--tw-border-opacity:1;border-color:rgb(108 121 131 / var(--tw-border-opacity));padding:0.25rem;padding-left:0.5rem;padding-right:0.5rem;font-size:0.75rem;line-height:1rem;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))
}@media(min-width: 768px){.btn{display:inline
    }}.btn svg{position:relative;top:1px;margin-left:0.25rem;margin-right:0.25rem;width:0.5rem
}</style>`,te(this,{target:this.shadowRoot,props:ee(this.attributes),customElement:!0},Gf,Wf,Z,{},null),e&&e.target&&g(e.target,this,e.anchor)}}customElements.define("navbar-toggle",Kf);function mi(n){let e,t,r;return{c(){e=m("img"),Pr(e.src,t=n[0])||b(e,"src",t),b(e,"alt","special effect"),b(e,"style",r=`transform: translateX(${n[2]||0}px);`)},m(i,s){g(i,e,s)},p(i,s){s&1&&!Pr(e.src,t=i[0])&&b(e,"src",t),s&4&&r!==(r=`transform: translateX(${i[2]||0}px);`)&&b(e,"style",r)},d(i){i&&w(e)}}}function Yf(n){let e,t,r,i,s,o=n[1]&&mi(n);return{c(){e=m("span"),t=m("slot"),r=k(),o&&o.c(),this.c=E,b(e,"class","text")},m(a,l){g(a,e,l),f(e,t),f(e,r),o&&o.m(e,null),i||(s=[D(e,"mouseenter",n[5]),D(e,"mouseleave",n[3]),D(e,"mousemove",n[4])],i=!0)},p(a,[l]){a[1]?o?o.p(a,l):(o=mi(a),o.c(),o.m(e,null)):o&&(o.d(1),o=null)},i:E,o:E,d(a){a&&w(e),o&&o.d(),i=!1,Te(s)}}}function Jf(n,e,t){let{src:r}=e,i=!1,s=0;function o(){t(1,i=!1),t(2,s=0)}function a(c){t(2,s+=c.movementX)}const l=()=>t(1,i=!0);return n.$$set=c=>{"src"in c&&t(0,r=c.src)},[r,i,s,o,a,l]}class Xf extends Q{constructor(e){super(),this.shadowRoot.innerHTML=`<style>.text{position:relative
}img{position:absolute;bottom:50%;right:0px;width:13rem
}</style>`,te(this,{target:this.shadowRoot,props:ee(this.attributes),customElement:!0},Jf,Yf,Z,{src:0},null),e&&(e.target&&g(e.target,this,e.anchor),e.props&&(this.$set(e.props),X()))}static get observedAttributes(){return["src"]}get src(){return this.$$.ctx[0]}set src(e){this.$$set({src:e}),X()}}customElements.define("img-reveal",Xf);function Zf(n){let e,t,r;return{c(){e=m("div"),t=m("slot"),this.c=E,b(e,"class",n[1]),b(e,"style",r=`transition-delay: ${n[0]}ms`),oe(e,"visible",n[3])},m(i,s){g(i,e,s),f(e,t),n[5](e)},p(i,[s]){s&2&&b(e,"class",i[1]),s&1&&r!==(r=`transition-delay: ${i[0]}ms`)&&b(e,"style",r),s&10&&oe(e,"visible",i[3])},i:E,o:E,d(i){i&&w(e),n[5](null)}}}function Qf(n,e,t){let{delay:r=200}=e,{start:i="right"}=e,{repeat:s=!0}=e,o,a,l=!1;je(()=>(o=new IntersectionObserver(u=>{u.forEach(d=>{d.isIntersecting?t(3,l=!0):s&&t(3,l=!1)})}),o.observe(a),()=>{o==null||o.disconnect()}));function c(u){It[u?"unshift":"push"](()=>{a=u,t(2,a)})}return n.$$set=u=>{"delay"in u&&t(0,r=u.delay),"start"in u&&t(1,i=u.start),"repeat"in u&&t(4,s=u.repeat)},[r,i,a,l,s,c]}class eh extends Q{constructor(e){super(),this.shadowRoot.innerHTML="<style>@media(prefers-reduced-motion: no-preference){.top{transform:translateY(-20px);filter:hue-rotate(90deg);opacity:0;position:relative;transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:500ms}.right{transform:translateX(-20px);filter:hue-rotate(90deg);opacity:0;position:relative;transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:500ms}.visible{transform:translateX(0);filter:hue-rotate(0);opacity:1}}</style>",te(this,{target:this.shadowRoot,props:ee(this.attributes),customElement:!0},Qf,Zf,Z,{delay:0,start:1,repeat:4},null),e&&(e.target&&g(e.target,this,e.anchor),e.props&&(this.$set(e.props),X()))}static get observedAttributes(){return["delay","start","repeat"]}get delay(){return this.$$.ctx[0]}set delay(e){this.$$set({delay:e}),X()}get start(){return this.$$.ctx[1]}set start(e){this.$$set({start:e}),X()}get repeat(){return this.$$.ctx[4]}set repeat(e){this.$$set({repeat:e}),X()}}customElements.define("scroll-show",eh);function gi(n){let e,t,r,i=n[0].presence_count+"",s,o;return{c(){e=m("span"),e.innerHTML=`<span class="outer"></span> 
            <span class="inner"></span>`,t=k(),r=m("span"),s=A(i),o=A(" members online"),b(e,"class","ping"),b(r,"class","num")},m(a,l){g(a,e,l),g(a,t,l),g(a,r,l),f(r,s),g(a,o,l)},p(a,l){l&1&&i!==(i=a[0].presence_count+"")&&j(s,i)},d(a){a&&w(e),a&&w(t),a&&w(r),a&&w(o)}}}function th(n){let e,t=n[0]&&gi(n);return{c(){t&&t.c(),e=ge(),this.c=E},m(r,i){t&&t.m(r,i),g(r,e,i)},p(r,[i]){r[0]?t?t.p(r,i):(t=gi(r),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},i:E,o:E,d(r){t&&t.d(r),r&&w(e)}}}function nh(n,e,t){let r;return je(async()=>{let i=await fetch("https://discord.com/api/guilds/1015095797689360444/widget.json");t(0,r=await i.json())}),[r]}class rh extends Q{constructor(e){super(),this.shadowRoot.innerHTML=`<style>.ping{position:relative;display:inline-flex;height:0.75rem;width:0.75rem
}.outer{position:absolute;display:inline-flex;height:100%;width:100%
}@keyframes ping{75%,100%{transform:scale(2);opacity:0
    }}.outer{animation:ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;border-radius:9999px;--tw-bg-opacity:1;background-color:rgb(74 222 128 / var(--tw-bg-opacity));opacity:0.75
}.inner{position:relative;display:inline-flex;height:0.75rem;width:0.75rem;border-radius:9999px;--tw-bg-opacity:1;background-color:rgb(34 197 94 / var(--tw-bg-opacity))
}.num{font-family:cubano, sans-serif;font-size:1.125rem;line-height:1.75rem;--tw-text-opacity:1;color:rgb(34 197 94 / var(--tw-text-opacity))
}</style>`,te(this,{target:this.shadowRoot,props:ee(this.attributes),customElement:!0},nh,th,Z,{},null),e&&e.target&&g(e.target,this,e.anchor)}}customElements.define("discord-count",rh);const{window:ih}=wn;function sh(n){let e,t,r;return{c(){e=m("button"),e.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path></svg>',this.c=E,oe(e,"show",n[0])},m(i,s){g(i,e,s),t||(r=[D(ih,"scroll",n[1]),D(e,"click",oh)],t=!0)},p(i,[s]){s&1&&oe(e,"show",i[0])},i:E,o:E,d(i){i&&w(e),t=!1,Te(r)}}}function oh(){window.scrollTo({top:0,behavior:"smooth"})}function ah(n,e,t){let r=!1;function i(){t(0,r=window.scrollY>250)}return je(()=>()=>{window.removeEventListener("scroll",i)}),[r,i]}class lh extends Q{constructor(e){super(),this.shadowRoot.innerHTML=`<style>button{position:fixed;bottom:1.25rem;right:1.25rem;display:grid;height:2.5rem;width:2.5rem;--tw-translate-y:2rem;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));cursor:pointer;place-items:center;border-radius:9999px;border-style:none;background-color:rgb(0 0 0 / var(--tw-bg-opacity));--tw-bg-opacity:0.5;padding:0px;--tw-text-opacity:1;color:rgb(108 121 131 / var(--tw-text-opacity));opacity:0;outline:2px solid transparent;outline-offset:2px;transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms
}button:hover{--tw-text-opacity:1;color:rgb(249 115 22 / var(--tw-text-opacity))
}button svg{height:1.25rem;width:1.25rem
}.show{--tw-translate-y:0px;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:1
}</style>`,te(this,{target:this.shadowRoot,props:ee(this.attributes),customElement:!0},ah,sh,Z,{},null),e&&e.target&&g(e.target,this,e.anchor)}}customElements.define("scroll-up",lh);function ch(n){let e;return{c(){e=m("modal-dialog"),e.innerHTML=`<h1>Hi Mom!</h1> 
    <img src="/img/himom.gif" alt="hi mom"/>`,this.c=E,_t(e,"name","himom"),_t(e,"esc","true")},m(t,r){g(t,e,r)},p:E,i:E,o:E,d(t){t&&w(e)}}}class uh extends Q{constructor(e){super(),this.shadowRoot.innerHTML=`<style>h1{text-align:center;font-family:cubano, sans-serif;font-size:4.5rem;line-height:1;font-weight:400;--tw-text-opacity:1;color:rgb(236 72 153 / var(--tw-text-opacity))
}img{margin-left:auto;margin-right:auto;width:16rem
}</style>`,te(this,{target:this.shadowRoot,props:ee(this.attributes),customElement:!0},null,ch,Z,{},null),e&&e.target&&g(e.target,this,e.anchor)}}customElements.define("hi-mom",uh);var Wo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function dh(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Go={exports:{}};/*!
 * baffle 0.3.6 - A tiny javascript library for obfuscating and revealing text in DOM elements.
 * Copyright (c) 2016 Cam Wiegert <cam@camwiegert.com> - https://camwiegert.github.io/baffle
 * License: MIT
 */(function(n,e){(function(t,r){n.exports=r()})(Wo,function(){return function(t){function r(s){if(i[s])return i[s].exports;var o=i[s]={exports:{},id:s,loaded:!1};return t[s].call(o.exports,o,o.exports,r),o.loaded=!0,o.exports}var i={};return r.m=t,r.c=i,r.p="",r(0)}([function(t,r,i){function s(l){return l&&l.__esModule?l:{default:l}}var o=i(2),a=s(o);t.exports=a.default},function(t,r){function i(u,d){for(var h in d)d.hasOwnProperty(h)&&(u[h]=d[h]);return u}function s(u,d){return u.split("").map(d).join("")}function o(u){return u[Math.floor(Math.random()*u.length)]}function a(u,d){for(var h=0,p=u.length;h<p;h++)d(u[h],h)}function l(u){return u.map(function(d,h){return!!d&&h}).filter(function(d){return d!==!1})}function c(u){return typeof u=="string"?[].slice.call(document.querySelectorAll(u)):[NodeList,HTMLCollection].some(function(d){return u instanceof d})?[].slice.call(u):u.nodeType?[u]:u}Object.defineProperty(r,"__esModule",{value:!0}),r.extend=i,r.mapString=s,r.sample=o,r.each=a,r.getTruthyIndices=l,r.getElements=c},function(t,r,i){function s(h){return h&&h.__esModule?h:{default:h}}function o(h,p){if(!(h instanceof p))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(r,"__esModule",{value:!0});var a=i(1),l=i(3),c=s(l),u={characters:"AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz~!@#$%^&*()-+=[]{}|;:,./<>?",exclude:[" "],speed:50},d=function(){function h(p,y){o(this,h),this.options=(0,a.extend)(Object.create(u),y),this.elements=(0,a.getElements)(p).map(c.default),this.running=!1}return h.prototype.once=function(){var p=this;return(0,a.each)(this.elements,function(y){return y.write(p.options.characters,p.options.exclude)}),this.running=!0,this},h.prototype.start=function(){var p=this;return clearInterval(this.interval),(0,a.each)(this.elements,function(y){return y.init()}),this.interval=setInterval(function(){return p.once()},this.options.speed),this.running=!0,this},h.prototype.stop=function(){return clearInterval(this.interval),this.running=!1,this},h.prototype.set=function(p){return(0,a.extend)(this.options,p),this.running&&this.start(),this},h.prototype.text=function(p){var y=this;return(0,a.each)(this.elements,function(_){_.text(p(_.value)),y.running||_.write()}),this},h.prototype.reveal=function(){var p=this,y=arguments.length<=0||arguments[0]===void 0?0:arguments[0],_=arguments.length<=1||arguments[1]===void 0?0:arguments[1],S=y/this.options.speed||1,O=function(){clearInterval(p.interval),p.running=!0,p.interval=setInterval(function(){var x=p.elements.filter(function(R){return!R.bitmap.every(function(N){return!N})});(0,a.each)(x,function(R){var N=Math.ceil(R.value.length/S);R.decay(N).write(p.options.characters,p.options.exclude)}),x.length||(p.stop(),(0,a.each)(p.elements,function(R){return R.init()}))},p.options.speed)};return setTimeout(O,_),this},h}();r.default=function(h,p){return new d(h,p)}},function(t,r,i){function s(d,h){if(!d)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!h||typeof h!="object"&&typeof h!="function"?d:h}function o(d,h){if(typeof h!="function"&&h!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof h);d.prototype=Object.create(h&&h.prototype,{constructor:{value:d,enumerable:!1,writable:!0,configurable:!0}}),h&&(Object.setPrototypeOf?Object.setPrototypeOf(d,h):d.__proto__=h)}function a(d,h){if(!(d instanceof h))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(r,"__esModule",{value:!0});var l=i(1),c=function(){function d(h){a(this,d),this.value=h,this.init()}return d.prototype.init=function(){return this.bitmap=this.value.split("").map(function(){return 1}),this},d.prototype.render=function(){var h=this,p=arguments.length<=0||arguments[0]===void 0?[]:arguments[0],y=arguments.length<=1||arguments[1]===void 0?[]:arguments[1];return p.length?(0,l.mapString)(this.value,function(_,S){return y.indexOf(_)>-1?_:h.bitmap[S]?(0,l.sample)(p):_}):this.value},d.prototype.decay=function(){for(var h=arguments.length<=0||arguments[0]===void 0?1:arguments[0];h--;){var p=(0,l.getTruthyIndices)(this.bitmap);this.bitmap[(0,l.sample)(p)]=0}return this},d.prototype.text=function(){var h=arguments.length<=0||arguments[0]===void 0?this.value:arguments[0];return this.value=h,this.init(),this},d}(),u=function(d){function h(p){a(this,h);var y=s(this,d.call(this,p.textContent));return y.element=p,y}return o(h,d),h.prototype.write=function(p,y){return this.element.textContent=this.render(p,y),this},h}(c);r.default=function(d){return new u(d)}}])})})(Go);const fh=dh(Go.exports);function hh(n){let e,t;return{c(){e=m("div"),t=A(n[0]),this.c=E,b(e,"class","baffle")},m(r,i){g(r,e,i),f(e,t),n[6](e)},p(r,[i]){i&1&&j(t,r[0])},i:E,o:E,d(r){r&&w(e),n[6](null)}}}function ph(n,e,t){let{baff:r}=e,{speed:i=50}=e,{characters:s="\u2588\u2593\u2592\u2591s"}=e,{revealDuration:o=5e3}=e,{revealDelay:a=0}=e,l;je(()=>{const u=fh(l,{characters:s,speed:i});u.start(),u.reveal(o,a)});function c(u){It[u?"unshift":"push"](()=>{l=u,t(1,l)})}return n.$$set=u=>{"baff"in u&&t(0,r=u.baff),"speed"in u&&t(2,i=u.speed),"characters"in u&&t(3,s=u.characters),"revealDuration"in u&&t(4,o=u.revealDuration),"revealDelay"in u&&t(5,a=u.revealDelay)},[r,l,i,s,o,a,c]}class mh extends Q{constructor(e){super(),this.shadowRoot.innerHTML=`<style>.baffle{display:inline-block
}</style>`,te(this,{target:this.shadowRoot,props:ee(this.attributes),customElement:!0},ph,hh,Z,{baff:0,speed:2,characters:3,revealDuration:4,revealDelay:5},null),e&&(e.target&&g(e.target,this,e.anchor),e.props&&(this.$set(e.props),X()))}static get observedAttributes(){return["baff","speed","characters","revealDuration","revealDelay"]}get baff(){return this.$$.ctx[0]}set baff(e){this.$$set({baff:e}),X()}get speed(){return this.$$.ctx[2]}set speed(e){this.$$set({speed:e}),X()}get characters(){return this.$$.ctx[3]}set characters(e){this.$$set({characters:e}),X()}get revealDuration(){return this.$$.ctx[4]}set revealDuration(e){this.$$set({revealDuration:e}),X()}get revealDelay(){return this.$$.ctx[5]}set revealDelay(e){this.$$set({revealDelay:e}),X()}}customElements.define("baffle-text",mh);function bi(n,e,t){const r=n.slice();return r[1]=e[t],r}function wi(n,e,t){const r=n.slice();return r[4]=e[t],r}function yi(n,e,t){const r=n.slice();return r[7]=e[t],r}function _i(n){let e,t,r,i=n[0].basics.name+"",s,o,a,l=n[0].basics.label+"",c,u,d,h,p,y,_,S=n[0].basics.email+"",O,x,R,N,re,se,M,z=n[0].basics.profiles[0].username+"",J,W,q,L,G,ne,be,_e=n[0].basics.profiles[1].username+"",$e,Se,Ke,Ae,Me,He,lt,ve,Y=n[0].basics.summary+"",he,v,I,T,C,P,B,H,$,ae,le,we,ye,me,Ne,ie,pe=n[0].skills,fe=[];for(let U=0;U<pe.length;U+=1)fe[U]=vi(yi(n,pe,U));let Ie=n[0].interest,ke=[];for(let U=0;U<Ie.length;U+=1)ke[U]=ki(wi(n,Ie,U));let ce=n[0].education,K=[];for(let U=0;U<ce.length;U+=1)K[U]=Ii(bi(n,ce,U));return{c(){e=m("div"),t=m("div"),r=m("h1"),s=A(i),o=k(),a=m("h2"),c=A(l),u=k(),d=m("div"),h=m("div"),p=m("a"),y=m("span"),y.textContent="email",_=k(),O=A(S),R=k(),N=m("div"),re=m("a"),se=m("span"),se.textContent="code",M=k(),J=A(z),q=k(),L=m("div"),G=m("a"),ne=m("span"),ne.textContent="supervisor_account",be=k(),$e=A(_e),Ke=k(),Ae=m("div"),Me=m("div"),He=m("h2"),He.textContent="Summary",lt=k(),ve=m("p"),he=A(Y),v=k(),I=m("div"),T=m("h2"),T.textContent="Skills",C=k(),P=m("ul");for(let U=0;U<fe.length;U+=1)fe[U].c();B=k(),H=m("div"),$=m("h2"),$.textContent="Interest",ae=k(),le=m("ul");for(let U=0;U<ke.length;U+=1)ke[U].c();we=k(),ye=m("div"),me=m("h2"),me.textContent="Education",Ne=k(),ie=m("ul");for(let U=0;U<K.length;U+=1)K[U].c();b(r,"class","name"),b(a,"class","title"),b(y,"class","material-icons"),b(p,"href",x="mailto:"+n[0].basics.email),b(h,"class","email"),b(se,"class","material-icons"),b(re,"href",W=n[0].basics.profiles[0].url),b(N,"class","github"),b(ne,"class","material-icons"),b(G,"href",Se=n[0].basics.profiles[1].url),b(L,"class","linkedin"),b(d,"class","contact"),b(t,"class","header"),b(He,"class","title"),b(Me,"class","summary"),b(T,"class","title"),b(I,"class","skills"),b($,"class","title"),b(H,"class","interest"),b(me,"class","title"),b(ye,"class","education"),b(Ae,"class","body"),b(e,"class","resume")},m(U,ue){g(U,e,ue),f(e,t),f(t,r),f(r,s),f(t,o),f(t,a),f(a,c),f(t,u),f(t,d),f(d,h),f(h,p),f(p,y),f(p,_),f(p,O),f(d,R),f(d,N),f(N,re),f(re,se),f(re,M),f(re,J),f(d,q),f(d,L),f(L,G),f(G,ne),f(G,be),f(G,$e),f(e,Ke),f(e,Ae),f(Ae,Me),f(Me,He),f(Me,lt),f(Me,ve),f(ve,he),f(Ae,v),f(Ae,I),f(I,T),f(I,C),f(I,P);for(let F=0;F<fe.length;F+=1)fe[F].m(P,null);f(Ae,B),f(Ae,H),f(H,$),f(H,ae),f(H,le);for(let F=0;F<ke.length;F+=1)ke[F].m(le,null);f(Ae,we),f(Ae,ye),f(ye,me),f(ye,Ne),f(ye,ie);for(let F=0;F<K.length;F+=1)K[F].m(ie,null)},p(U,ue){if(ue&1&&i!==(i=U[0].basics.name+"")&&j(s,i),ue&1&&l!==(l=U[0].basics.label+"")&&j(c,l),ue&1&&S!==(S=U[0].basics.email+"")&&j(O,S),ue&1&&x!==(x="mailto:"+U[0].basics.email)&&b(p,"href",x),ue&1&&z!==(z=U[0].basics.profiles[0].username+"")&&j(J,z),ue&1&&W!==(W=U[0].basics.profiles[0].url)&&b(re,"href",W),ue&1&&_e!==(_e=U[0].basics.profiles[1].username+"")&&j($e,_e),ue&1&&Se!==(Se=U[0].basics.profiles[1].url)&&b(G,"href",Se),ue&1&&Y!==(Y=U[0].basics.summary+"")&&j(he,Y),ue&1){pe=U[0].skills;let F;for(F=0;F<pe.length;F+=1){const Pe=yi(U,pe,F);fe[F]?fe[F].p(Pe,ue):(fe[F]=vi(Pe),fe[F].c(),fe[F].m(P,null))}for(;F<fe.length;F+=1)fe[F].d(1);fe.length=pe.length}if(ue&1){Ie=U[0].interest;let F;for(F=0;F<Ie.length;F+=1){const Pe=wi(U,Ie,F);ke[F]?ke[F].p(Pe,ue):(ke[F]=ki(Pe),ke[F].c(),ke[F].m(le,null))}for(;F<ke.length;F+=1)ke[F].d(1);ke.length=Ie.length}if(ue&1){ce=U[0].education;let F;for(F=0;F<ce.length;F+=1){const Pe=bi(U,ce,F);K[F]?K[F].p(Pe,ue):(K[F]=Ii(Pe),K[F].c(),K[F].m(ie,null))}for(;F<K.length;F+=1)K[F].d(1);K.length=ce.length}},d(U){U&&w(e),Xe(fe,U),Xe(ke,U),Xe(K,U)}}}function vi(n){let e,t=n[7].name+"",r;return{c(){e=m("li"),r=A(t)},m(i,s){g(i,e,s),f(e,r)},p(i,s){s&1&&t!==(t=i[7].name+"")&&j(r,t)},d(i){i&&w(e)}}}function ki(n){let e,t,r=n[4].name+"",i,s,o,a=n[4].highlights+"",l,c;return{c(){e=m("li"),t=m("h3"),i=A(r),s=k(),o=m("p"),l=A(a),c=k(),b(t,"class","interest"),b(o,"class","highlights")},m(u,d){g(u,e,d),f(e,t),f(t,i),f(e,s),f(e,o),f(o,l),f(e,c)},p(u,d){d&1&&r!==(r=u[4].name+"")&&j(i,r),d&1&&a!==(a=u[4].highlights+"")&&j(l,a)},d(u){u&&w(e)}}}function Ii(n){let e,t,r=n[1].institution+"",i,s,o,a=n[1].area+"",l,c,u,d=n[1].studyType+"",h,p,y,_=n[1].gpa+"",S,O;return{c(){e=m("li"),t=m("h3"),i=A(r),s=k(),o=m("h4"),l=A(a),c=k(),u=m("p"),h=A(d),p=k(),y=m("p"),S=A(_),O=k(),b(t,"class","institution"),b(o,"class","area"),b(u,"class","studyType"),b(y,"class","gpa")},m(x,R){g(x,e,R),f(e,t),f(t,i),f(e,s),f(e,o),f(o,l),f(e,c),f(e,u),f(u,h),f(e,p),f(e,y),f(y,S),f(e,O)},p(x,R){R&1&&r!==(r=x[1].institution+"")&&j(i,r),R&1&&a!==(a=x[1].area+"")&&j(l,a),R&1&&d!==(d=x[1].studyType+"")&&j(h,d),R&1&&_!==(_=x[1].gpa+"")&&j(S,_)},d(x){x&&w(e)}}}function gh(n){let e,t=n[0]&&_i(n);return{c(){t&&t.c(),e=ge(),this.c=E},m(r,i){t&&t.m(r,i),g(r,e,i)},p(r,[i]){r[0]?t?t.p(r,i):(t=_i(r),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},i:E,o:E,d(r){t&&t.d(r),r&&w(e)}}}function bh(n,e,t){let r;return je(async()=>{let i=await fetch("https://gitconnected.com/v1/portfolio/zxce3");t(0,r=await i.json())}),[r]}class wh extends Q{constructor(e){super(),te(this,{target:this.shadowRoot,props:ee(this.attributes),customElement:!0},bh,gh,Z,{},null),e&&e.target&&g(e.target,this,e.anchor)}}customElements.define("my-resume",wh);function Ei(n){let e,t,r,i=n[0].cpu+"",s,o;return{c(){e=m("span"),e.innerHTML=`<span class="outer"></span> 
            <span class="inner"></span>`,t=k(),r=m("span"),s=A(i),o=A(" CPU"),b(e,"class","ping"),b(r,"class","num")},m(a,l){g(a,e,l),g(a,t,l),g(a,r,l),f(r,s),g(a,o,l)},p(a,l){l&1&&i!==(i=a[0].cpu+"")&&j(s,i)},d(a){a&&w(e),a&&w(t),a&&w(r),a&&w(o)}}}function yh(n){let e,t=n[0]&&Ei(n);return{c(){t&&t.c(),e=ge(),this.c=E},m(r,i){t&&t.m(r,i),g(r,e,i)},p(r,[i]){r[0]?t?t.p(r,i):(t=Ei(r),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},i:E,o:E,d(r){t&&t.d(r),r&&w(e)}}}function _h(n,e,t){setInterval(()=>{i()},5e3);let r;je(async()=>{i()});async function i(){let s=await fetch("https://stats.zxce3.net/api/all/limits");t(0,r=await s.json())}return[r]}class vh extends Q{constructor(e){super(),te(this,{target:this.shadowRoot,props:ee(this.attributes),customElement:!0},_h,yh,Z,{},null),e&&e.target&&g(e.target,this,e.anchor)}}customElements.define("server-stat",vh);const{window:kh}=wn;function Ih(n){let e,t,r;return{c(){e=m("span"),e.innerHTML="<slot></slot>",this.c=E,oe(e,"show",n[0])},m(i,s){g(i,e,s),t||(r=D(kh,"scroll",n[1]),t=!0)},p(i,[s]){s&1&&oe(e,"show",i[0])},i:E,o:E,d(i){i&&w(e),t=!1,r()}}}function Eh(n,e,t){let r=!1;function i(){t(0,r=window.scrollY>210)}return je(()=>()=>{window.removeEventListener("scroll",i)}),[r,i]}class Th extends Q{constructor(e){super(),this.shadowRoot.innerHTML="<style>span{bottom:4rem;position:fixed;right:1.25rem;display:grid;height:2.5rem;width:2.5rem;--tw-translate-y:2rem;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));cursor:pointer;place-items:center;border-radius:9999px;border-style:none;--tw-bg-opacity:1;background-color:rgb(0 0 0 / var(--tw-bg-opacity));padding:0px;--tw-text-opacity:1;color:rgb(108 121 131 / var(--tw-text-opacity));opacity:0;outline:2px solid transparent;outline-offset:2px;transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}span:hover{--tw-text-opacity:1;color:rgb(249 115 22 / var(--tw-text-opacity))}.show{--tw-translate-y:0px;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:1}</style>",te(this,{target:this.shadowRoot,props:ee(this.attributes),customElement:!0},Eh,Ih,Z,{},null),e&&e.target&&g(e.target,this,e.anchor)}}customElements.define("menu-handler",Th);const{window:Sh}=wn;function Ah(n){let e,t,r;return{c(){e=m("span"),e.innerHTML="<slot></slot>",this.c=E,oe(e,"show",n[0])},m(i,s){g(i,e,s),t||(r=D(Sh,"scroll",n[1]),t=!0)},p(i,[s]){s&1&&oe(e,"show",i[0])},i:E,o:E,d(i){i&&w(e),t=!1,r()}}}function Ch(n,e,t){let r=!1;function i(){t(0,r=window.scrollY>210)}return je(()=>()=>{window.removeEventListener("scroll",i)}),[r,i]}class Rh extends Q{constructor(e){super(),this.shadowRoot.innerHTML="<style>span{bottom:7rem;position:fixed;right:1.25rem;display:block;display:grid;height:2.5rem;width:2.5rem;--tw-translate-y:2rem;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));cursor:pointer;place-items:center;border-radius:9999px;border-style:none;--tw-bg-opacity:1;background-color:rgb(0 0 0 / var(--tw-bg-opacity));padding:0px;--tw-text-opacity:1;color:rgb(108 121 131 / var(--tw-text-opacity));opacity:0;outline:2px solid transparent;outline-offset:2px;transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}span:hover{--tw-text-opacity:1;color:rgb(249 115 22 / var(--tw-text-opacity))}@media(min-width: 1280px){span{display:none}}.show{--tw-translate-y:0px;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:1}</style>",te(this,{target:this.shadowRoot,props:ee(this.attributes),customElement:!0},Ch,Ah,Z,{},null),e&&e.target&&g(e.target,this,e.anchor)}}customElements.define("toc-handler",Rh);var Ko={exports:{}};/*! algoliasearch-lite.umd.js | 4.14.2 | © Algolia, inc. | https://github.com/algolia/algoliasearch-client-javascript */(function(n,e){(function(t,r){n.exports=r()})(Wo,function(){function t(v,I,T){return I in v?Object.defineProperty(v,I,{value:T,enumerable:!0,configurable:!0,writable:!0}):v[I]=T,v}function r(v,I){var T=Object.keys(v);if(Object.getOwnPropertySymbols){var C=Object.getOwnPropertySymbols(v);I&&(C=C.filter(function(P){return Object.getOwnPropertyDescriptor(v,P).enumerable})),T.push.apply(T,C)}return T}function i(v){for(var I=1;I<arguments.length;I++){var T=arguments[I]!=null?arguments[I]:{};I%2?r(Object(T),!0).forEach(function(C){t(v,C,T[C])}):Object.getOwnPropertyDescriptors?Object.defineProperties(v,Object.getOwnPropertyDescriptors(T)):r(Object(T)).forEach(function(C){Object.defineProperty(v,C,Object.getOwnPropertyDescriptor(T,C))})}return v}function s(v,I){if(v==null)return{};var T,C,P=function(H,$){if(H==null)return{};var ae,le,we={},ye=Object.keys(H);for(le=0;le<ye.length;le++)ae=ye[le],$.indexOf(ae)>=0||(we[ae]=H[ae]);return we}(v,I);if(Object.getOwnPropertySymbols){var B=Object.getOwnPropertySymbols(v);for(C=0;C<B.length;C++)T=B[C],I.indexOf(T)>=0||Object.prototype.propertyIsEnumerable.call(v,T)&&(P[T]=v[T])}return P}function o(v,I){return function(T){if(Array.isArray(T))return T}(v)||function(T,C){if(Symbol.iterator in Object(T)||Object.prototype.toString.call(T)==="[object Arguments]"){var P=[],B=!0,H=!1,$=void 0;try{for(var ae,le=T[Symbol.iterator]();!(B=(ae=le.next()).done)&&(P.push(ae.value),!C||P.length!==C);B=!0);}catch(we){H=!0,$=we}finally{try{B||le.return==null||le.return()}finally{if(H)throw $}}return P}}(v,I)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function a(v){return function(I){if(Array.isArray(I)){for(var T=0,C=new Array(I.length);T<I.length;T++)C[T]=I[T];return C}}(v)||function(I){if(Symbol.iterator in Object(I)||Object.prototype.toString.call(I)==="[object Arguments]")return Array.from(I)}(v)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function l(v){var I,T="algoliasearch-client-js-".concat(v.key),C=function(){return I===void 0&&(I=v.localStorage||window.localStorage),I},P=function(){return JSON.parse(C().getItem(T)||"{}")};return{get:function(B,H){var $=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{miss:function(){return Promise.resolve()}};return Promise.resolve().then(function(){var ae=JSON.stringify(B),le=P()[ae];return Promise.all([le||H(),le!==void 0])}).then(function(ae){var le=o(ae,2),we=le[0],ye=le[1];return Promise.all([we,ye||$.miss(we)])}).then(function(ae){return o(ae,1)[0]})},set:function(B,H){return Promise.resolve().then(function(){var $=P();return $[JSON.stringify(B)]=H,C().setItem(T,JSON.stringify($)),H})},delete:function(B){return Promise.resolve().then(function(){var H=P();delete H[JSON.stringify(B)],C().setItem(T,JSON.stringify(H))})},clear:function(){return Promise.resolve().then(function(){C().removeItem(T)})}}}function c(v){var I=a(v.caches),T=I.shift();return T===void 0?{get:function(C,P){var B=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{miss:function(){return Promise.resolve()}},H=P();return H.then(function($){return Promise.all([$,B.miss($)])}).then(function($){return o($,1)[0]})},set:function(C,P){return Promise.resolve(P)},delete:function(C){return Promise.resolve()},clear:function(){return Promise.resolve()}}:{get:function(C,P){var B=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{miss:function(){return Promise.resolve()}};return T.get(C,P,B).catch(function(){return c({caches:I}).get(C,P,B)})},set:function(C,P){return T.set(C,P).catch(function(){return c({caches:I}).set(C,P)})},delete:function(C){return T.delete(C).catch(function(){return c({caches:I}).delete(C)})},clear:function(){return T.clear().catch(function(){return c({caches:I}).clear()})}}}function u(){var v=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{serializable:!0},I={};return{get:function(T,C){var P=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{miss:function(){return Promise.resolve()}},B=JSON.stringify(T);if(B in I)return Promise.resolve(v.serializable?JSON.parse(I[B]):I[B]);var H=C(),$=P&&P.miss||function(){return Promise.resolve()};return H.then(function(ae){return $(ae)}).then(function(){return H})},set:function(T,C){return I[JSON.stringify(T)]=v.serializable?JSON.stringify(C):C,Promise.resolve(C)},delete:function(T){return delete I[JSON.stringify(T)],Promise.resolve()},clear:function(){return I={},Promise.resolve()}}}function d(v){for(var I=v.length-1;I>0;I--){var T=Math.floor(Math.random()*(I+1)),C=v[I];v[I]=v[T],v[T]=C}return v}function h(v,I){return I&&Object.keys(I).forEach(function(T){v[T]=I[T](v)}),v}function p(v){for(var I=arguments.length,T=new Array(I>1?I-1:0),C=1;C<I;C++)T[C-1]=arguments[C];var P=0;return v.replace(/%s/g,function(){return encodeURIComponent(T[P++])})}var y={WithinQueryParameters:0,WithinHeaders:1};function _(v,I){var T=v||{},C=T.data||{};return Object.keys(T).forEach(function(P){["timeout","headers","queryParameters","data","cacheable"].indexOf(P)===-1&&(C[P]=T[P])}),{data:Object.entries(C).length>0?C:void 0,timeout:T.timeout||I,headers:T.headers||{},queryParameters:T.queryParameters||{},cacheable:T.cacheable}}var S={Read:1,Write:2,Any:3},O=1,x=2,R=3;function N(v){var I=arguments.length>1&&arguments[1]!==void 0?arguments[1]:O;return i(i({},v),{},{status:I,lastUpdate:Date.now()})}function re(v){return typeof v=="string"?{protocol:"https",url:v,accept:S.Any}:{protocol:v.protocol||"https",url:v.url,accept:v.accept||S.Any}}var se="GET",M="POST";function z(v,I){return Promise.all(I.map(function(T){return v.get(T,function(){return Promise.resolve(N(T))})})).then(function(T){var C=T.filter(function(H){return function($){return $.status===O||Date.now()-$.lastUpdate>12e4}(H)}),P=T.filter(function(H){return function($){return $.status===R&&Date.now()-$.lastUpdate<=12e4}(H)}),B=[].concat(a(C),a(P));return{getTimeout:function(H,$){return(P.length===0&&H===0?1:P.length+3+H)*$},statelessHosts:B.length>0?B.map(function(H){return re(H)}):I}})}function J(v,I,T,C){var P=[],B=function(me,Ne){if(!(me.method===se||me.data===void 0&&Ne.data===void 0)){var ie=Array.isArray(me.data)?me.data:i(i({},me.data),Ne.data);return JSON.stringify(ie)}}(T,C),H=function(me,Ne){var ie=i(i({},me.headers),Ne.headers),pe={};return Object.keys(ie).forEach(function(fe){var Ie=ie[fe];pe[fe.toLowerCase()]=Ie}),pe}(v,C),$=T.method,ae=T.method!==se?{}:i(i({},T.data),C.data),le=i(i(i({"x-algolia-agent":v.userAgent.value},v.queryParameters),ae),C.queryParameters),we=0,ye=function me(Ne,ie){var pe=Ne.pop();if(pe===void 0)throw{name:"RetryError",message:"Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.",transporterStackTrace:G(P)};var fe={data:B,headers:H,method:$,url:q(pe,T.path,le),connectTimeout:ie(we,v.timeouts.connect),responseTimeout:ie(we,C.timeout)},Ie=function(ce){var K={request:fe,response:ce,host:pe,triesLeft:Ne.length};return P.push(K),K},ke={onSuccess:function(ce){return function(K){try{return JSON.parse(K.content)}catch(U){throw function(ue,F){return{name:"DeserializationError",message:ue,response:F}}(U.message,K)}}(ce)},onRetry:function(ce){var K=Ie(ce);return ce.isTimedOut&&we++,Promise.all([v.logger.info("Retryable failure",ne(K)),v.hostsCache.set(pe,N(pe,ce.isTimedOut?R:x))]).then(function(){return me(Ne,ie)})},onFail:function(ce){throw Ie(ce),function(K,U){var ue=K.content,F=K.status,Pe=ue;try{Pe=JSON.parse(ue).message}catch{}return function(Yt,On,Xo){return{name:"ApiError",message:Yt,status:On,transporterStackTrace:Xo}}(Pe,F,U)}(ce,G(P))}};return v.requester.send(fe).then(function(ce){return function(K,U){return function(ue){var F=ue.status;return ue.isTimedOut||function(Pe){var Yt=Pe.isTimedOut,On=Pe.status;return!Yt&&~~On==0}(ue)||~~(F/100)!=2&&~~(F/100)!=4}(K)?U.onRetry(K):~~(K.status/100)==2?U.onSuccess(K):U.onFail(K)}(ce,ke)})};return z(v.hostsCache,I).then(function(me){return ye(a(me.statelessHosts).reverse(),me.getTimeout)})}function W(v){var I={value:"Algolia for JavaScript (".concat(v,")"),add:function(T){var C="; ".concat(T.segment).concat(T.version!==void 0?" (".concat(T.version,")"):"");return I.value.indexOf(C)===-1&&(I.value="".concat(I.value).concat(C)),I}};return I}function q(v,I,T){var C=L(T),P="".concat(v.protocol,"://").concat(v.url,"/").concat(I.charAt(0)==="/"?I.substr(1):I);return C.length&&(P+="?".concat(C)),P}function L(v){return Object.keys(v).map(function(I){return p("%s=%s",I,(T=v[I],Object.prototype.toString.call(T)==="[object Object]"||Object.prototype.toString.call(T)==="[object Array]"?JSON.stringify(v[I]):v[I]));var T}).join("&")}function G(v){return v.map(function(I){return ne(I)})}function ne(v){var I=v.request.headers["x-algolia-api-key"]?{"x-algolia-api-key":"*****"}:{};return i(i({},v),{},{request:i(i({},v.request),{},{headers:i(i({},v.request.headers),I)})})}var be=function(v){var I=v.appId,T=function(P,B,H){var $={"x-algolia-api-key":H,"x-algolia-application-id":B};return{headers:function(){return P===y.WithinHeaders?$:{}},queryParameters:function(){return P===y.WithinQueryParameters?$:{}}}}(v.authMode!==void 0?v.authMode:y.WithinHeaders,I,v.apiKey),C=function(P){var B=P.hostsCache,H=P.logger,$=P.requester,ae=P.requestsCache,le=P.responsesCache,we=P.timeouts,ye=P.userAgent,me=P.hosts,Ne=P.queryParameters,ie={hostsCache:B,logger:H,requester:$,requestsCache:ae,responsesCache:le,timeouts:we,userAgent:ye,headers:P.headers,queryParameters:Ne,hosts:me.map(function(pe){return re(pe)}),read:function(pe,fe){var Ie=_(fe,ie.timeouts.read),ke=function(){return J(ie,ie.hosts.filter(function(K){return(K.accept&S.Read)!=0}),pe,Ie)};if((Ie.cacheable!==void 0?Ie.cacheable:pe.cacheable)!==!0)return ke();var ce={request:pe,mappedRequestOptions:Ie,transporter:{queryParameters:ie.queryParameters,headers:ie.headers}};return ie.responsesCache.get(ce,function(){return ie.requestsCache.get(ce,function(){return ie.requestsCache.set(ce,ke()).then(function(K){return Promise.all([ie.requestsCache.delete(ce),K])},function(K){return Promise.all([ie.requestsCache.delete(ce),Promise.reject(K)])}).then(function(K){var U=o(K,2);return U[0],U[1]})})},{miss:function(K){return ie.responsesCache.set(ce,K)}})},write:function(pe,fe){return J(ie,ie.hosts.filter(function(Ie){return(Ie.accept&S.Write)!=0}),pe,_(fe,ie.timeouts.write))}};return ie}(i(i({hosts:[{url:"".concat(I,"-dsn.algolia.net"),accept:S.Read},{url:"".concat(I,".algolia.net"),accept:S.Write}].concat(d([{url:"".concat(I,"-1.algolianet.com")},{url:"".concat(I,"-2.algolianet.com")},{url:"".concat(I,"-3.algolianet.com")}]))},v),{},{headers:i(i(i({},T.headers()),{"content-type":"application/x-www-form-urlencoded"}),v.headers),queryParameters:i(i({},T.queryParameters()),v.queryParameters)}));return h({transporter:C,appId:I,addAlgoliaAgent:function(P,B){C.userAgent.add({segment:P,version:B})},clearCache:function(){return Promise.all([C.requestsCache.clear(),C.responsesCache.clear()]).then(function(){})}},v.methods)},_e=function(v){return function(I,T){return I.method===se?v.transporter.read(I,T):v.transporter.write(I,T)}},$e=function(v){return function(I){var T=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},C={transporter:v.transporter,appId:v.appId,indexName:I};return h(C,T.methods)}},Se=function(v){return function(I,T){var C=I.map(function(P){return i(i({},P),{},{params:L(P.params||{})})});return v.transporter.read({method:M,path:"1/indexes/*/queries",data:{requests:C},cacheable:!0},T)}},Ke=function(v){return function(I,T){return Promise.all(I.map(function(C){var P=C.params,B=P.facetName,H=P.facetQuery,$=s(P,["facetName","facetQuery"]);return $e(v)(C.indexName,{methods:{searchForFacetValues:He}}).searchForFacetValues(B,H,i(i({},T),$))}))}},Ae=function(v){return function(I,T,C){return v.transporter.read({method:M,path:p("1/answers/%s/prediction",v.indexName),data:{query:I,queryLanguages:T},cacheable:!0},C)}},Me=function(v){return function(I,T){return v.transporter.read({method:M,path:p("1/indexes/%s/query",v.indexName),data:{query:I},cacheable:!0},T)}},He=function(v){return function(I,T,C){return v.transporter.read({method:M,path:p("1/indexes/%s/facets/%s/query",v.indexName,I),data:{facetQuery:T},cacheable:!0},C)}},lt=1,ve=2,Y=3;function he(v,I,T){var C,P={appId:v,apiKey:I,timeouts:{connect:1,read:2,write:30},requester:{send:function(B){return new Promise(function(H){var $=new XMLHttpRequest;$.open(B.method,B.url,!0),Object.keys(B.headers).forEach(function(ye){return $.setRequestHeader(ye,B.headers[ye])});var ae,le=function(ye,me){return setTimeout(function(){$.abort(),H({status:0,content:me,isTimedOut:!0})},1e3*ye)},we=le(B.connectTimeout,"Connection timeout");$.onreadystatechange=function(){$.readyState>$.OPENED&&ae===void 0&&(clearTimeout(we),ae=le(B.responseTimeout,"Socket timeout"))},$.onerror=function(){$.status===0&&(clearTimeout(we),clearTimeout(ae),H({content:$.responseText||"Network request failed",status:$.status,isTimedOut:!1}))},$.onload=function(){clearTimeout(we),clearTimeout(ae),H({content:$.responseText,status:$.status,isTimedOut:!1})},$.send(B.data)})}},logger:(C=Y,{debug:function(B,H){return lt>=C&&console.debug(B,H),Promise.resolve()},info:function(B,H){return ve>=C&&console.info(B,H),Promise.resolve()},error:function(B,H){return console.error(B,H),Promise.resolve()}}),responsesCache:u(),requestsCache:u({serializable:!1}),hostsCache:c({caches:[l({key:"".concat("4.14.2","-").concat(v)}),u()]}),userAgent:W("4.14.2").add({segment:"Browser",version:"lite"}),authMode:y.WithinQueryParameters};return be(i(i(i({},P),T),{},{methods:{search:Se,searchForFacetValues:Ke,multipleQueries:Se,multipleSearchForFacetValues:Ke,customRequest:_e,initIndex:function(B){return function(H){return $e(B)(H,{methods:{search:Me,searchForFacetValues:He,findAnswers:Ae}})}}}}))}return he.version="4.14.2",he})})(Ko);const Oh=Ko.exports,{window:Ph}=wn;function Ti(n,e,t){const r=n.slice();return r[14]=e[t],r[16]=t,r}function Si(n){let e,t,r;return{c(){e=m("input"),b(e,"class","input"),b(e,"name","search"),b(e,"type","text"),e.autofocus=!0,b(e,"placeholder","Search")},m(i,s){g(i,e,s),e.focus(),t||(r=D(e,"input",n[4]),t=!0)},p:E,d(i){i&&w(e),t=!1,r()}}}function Ai(n){let e;return{c(){e=m("p"),e.textContent="No results yet",b(e,"class","no-results")},m(t,r){g(t,e,r)},d(t){t&&w(e)}}}function Ci(n){let e,t,r=n[14].title+"",i,s,o,a,l=n[14].type+"",c,u,d,h=n[14]._snippetResult.summary.value+"",p,y,_,S;function O(){return n[9](n[16])}function x(){return n[10](n[16])}return{c(){e=m("a"),t=m("span"),i=A(r),s=k(),o=m("span"),a=A("in "),c=A(l),u=k(),d=m("span"),p=k(),b(t,"class","hit-title"),b(o,"class","hit-type"),b(d,"class","hit-description"),b(e,"class","hit"),b(e,"href",y=n[14].relpermalink),oe(e,"active",n[16]===n[2])},m(R,N){g(R,e,N),f(e,t),f(t,i),f(e,s),f(e,o),f(o,a),f(o,c),f(e,u),f(e,d),d.innerHTML=h,f(e,p),_||(S=[D(e,"mouseover",O),D(e,"focus",x)],_=!0)},p(R,N){n=R,N&2&&r!==(r=n[14].title+"")&&j(i,r),N&2&&l!==(l=n[14].type+"")&&j(c,l),N&2&&h!==(h=n[14]._snippetResult.summary.value+"")&&(d.innerHTML=h),N&2&&y!==(y=n[14].relpermalink)&&b(e,"href",y),N&4&&oe(e,"active",n[16]===n[2])},d(R){R&&w(e),_=!1,Te(S)}}}function xh(n){var q;let e,t,r,i,s,o,a,l,c,u,d,h,p,y,_,S,O,x,R,N,re,se,M=n[3]==="search"&&Si(n),z=!((q=n[0])!=null&&q.nbHits)&&Ai(),J=n[1],W=[];for(let L=0;L<J.length;L+=1)W[L]=Ci(Ti(n,J,L));return{c(){e=m("modal-dialog"),t=m("form"),M&&M.c(),r=k(),i=m("div"),z&&z.c(),s=k();for(let L=0;L<W.length;L+=1)W[L].c();o=k(),a=m("footer"),l=m("kbd"),l.textContent="\u21A9",c=k(),u=m("span"),u.textContent="select",d=k(),h=m("kbd"),h.textContent="\u2191",p=k(),y=m("kbd"),y.textContent="\u2193",_=k(),S=m("span"),S.textContent="navigate",O=k(),x=m("kbd"),x.textContent="esc",R=k(),N=m("span"),N.textContent="leave",this.c=E,b(i,"class","results"),b(u,"class","kbd-text"),b(S,"class","kbd-text"),b(N,"class","kbd-text"),_t(e,"name","search")},m(L,G){g(L,e,G),f(e,t),M&&M.m(t,null),f(e,r),f(e,i),z&&z.m(i,null),f(i,s);for(let ne=0;ne<W.length;ne+=1)W[ne].m(i,null);f(e,o),f(e,a),f(a,l),f(a,c),f(a,u),f(a,d),f(a,h),f(a,p),f(a,y),f(a,_),f(a,S),f(a,O),f(a,x),f(a,R),f(a,N),re||(se=[D(Ph,"keydown",n[8]),D(l,"click",n[7]),D(h,"click",n[5]),D(y,"click",n[6]),D(x,"click",n[11])],re=!0)},p(L,[G]){var ne;if(L[3]==="search"?M?M.p(L,G):(M=Si(L),M.c(),M.m(t,null)):M&&(M.d(1),M=null),(ne=L[0])!=null&&ne.nbHits?z&&(z.d(1),z=null):z||(z=Ai(),z.c(),z.m(i,s)),G&6){J=L[1];let be;for(be=0;be<J.length;be+=1){const _e=Ti(L,J,be);W[be]?W[be].p(_e,G):(W[be]=Ci(_e),W[be].c(),W[be].m(i,null))}for(;be<W.length;be+=1)W[be].d(1);W.length=J.length}},i:E,o:E,d(L){L&&w(e),M&&M.d(),z&&z.d(),Xe(W,L),re=!1,Te(se)}}}const Lh="8WWVHG0NWP",Nh="9af0a70088c996c627e1ebcf5566f1d9";function Dh(n,e,t){let r;Ce(n,Ue,O=>t(3,r=O));const s=Oh(Lh,Nh).initIndex("content");let o,a=[],l=0;je(()=>()=>{window.removeEventListener("keydown",p)});async function c(O){const x=O.target.value;t(0,o=await s.search(x,{hitsPerPage:7,attributesToSnippet:["summary"],highlightPreTag:'<mark class="high">',highlightPostTag:"</mark>"})),t(1,a=o.hits),t(2,l=0)}function u(){t(2,l=l<=0?l:l-1)}function d(){t(2,l=l>=a.length-1?l:l+1)}function h(){if(a[l]){const O=a[l].relpermalink;ir.go(O),Ue.set(null)}}function p(O){O.key==="ArrowUp"&&u(),O.key==="ArrowDown"&&d(),O.key==="Enter"&&h()}return[o,a,l,r,c,u,d,h,p,O=>t(2,l=O),O=>t(2,l=O),()=>Ue.set(null)]}class Mh extends Q{constructor(e){super(),this.shadowRoot.innerHTML="<style>a,a:hover,a:focus,a:active{text-decoration:none;color:inherit}form{overflow:hidden}.input{margin-right:0.5rem;display:block;width:100%;border-radius:0px;border-width:4px;border-top-width:0px;border-right-width:0px;border-left-width:0px;border-style:solid;--tw-border-opacity:1;border-bottom-color:rgb(168 85 247 / var(--tw-border-opacity));background-color:rgb(18 24 27 / var(--tw-bg-opacity));--tw-bg-opacity:0.5;padding:0.75rem;font-family:sofia-pro, sans-serif;font-size:1.25rem;line-height:1.75rem;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));outline:2px solid transparent;outline-offset:2px}.input:focus-visible{outline:2px solid transparent;outline-offset:2px}@media(min-width: 768px){.input{width:768px}}.results{min-height:200px;max-width:100%}.hit{margin-top:0.5rem;margin-bottom:0.5rem;display:block;border-width:1px;background-color:rgb(18 24 27 / var(--tw-bg-opacity));--tw-bg-opacity:0.5;padding:1rem;font-family:sofia-pro, sans-serif;text-decoration-line:none;--tw-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.hit-description{display:block;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(178 190 205 / var(--tw-text-opacity))}.hit-title{font-size:1.125rem;line-height:1.75rem;font-weight:700}.hit-type{font-weight:300;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))}.no-results{text-align:center;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(178 190 205 / var(--tw-text-opacity))}.active{--tw-bg-opacity:1;background-color:rgb(249 115 22 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))}.active .hit-description{--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))}footer{margin-top:1.5rem;font-size:0.75rem;line-height:1rem;--tw-text-opacity:1;color:rgb(178 190 205 / var(--tw-text-opacity))}kbd{cursor:pointer;border-radius:0.375rem;border-width:1px;border-style:solid;--tw-border-opacity:1;border-color:rgb(249 115 22 / var(--tw-border-opacity));background-color:transparent;--tw-bg-opacity:0.5;padding:0.375rem;font-size:0.75rem;line-height:1rem;--tw-text-opacity:1;color:rgb(178 190 205 / var(--tw-text-opacity));transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}kbd:hover{--tw-bg-opacity:1;background-color:rgb(249 115 22 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))}.kbd-text{margin-right:0.75rem}</style>",te(this,{target:this.shadowRoot,props:ee(this.attributes),customElement:!0},Dh,xh,Z,{},null),e&&e.target&&g(e.target,this,e.anchor)}}customElements.define("algolia-search",Mh);class Er{constructor(e,t,r){Jt(this,"vimeoPlayer");Jt(this,"ytPlayer");Jt(this,"listener");this.video=e,this.el=t,this.type=r}async setupPlayer(){if(this.type==="youtube"){const e=(await on(()=>import("./index.c85db6da.js").then(t=>t.i),[])).default;this.ytPlayer=e(this.el),this.ytPlayer.cueVideoById(this.video)}else{const e=(await on(()=>import("./player.es.da321c0d.js"),[])).default;this.vimeoPlayer=new e(this.el,{id:this.video})}}static async create(e,t,r){const i=new Er(e,t,r);return await i.setupPlayer(),i}play(){this.type==="youtube"?this.ytPlayer.playVideo():this.vimeoPlayer.play()}destroy(){this.type==="youtube"?(this.ytPlayer.off(this.listener),this.ytPlayer.destroy()):(this.vimeoPlayer.off("ended"),this.vimeoPlayer.destroy())}onEnded(e){this.type==="youtube"?this.listener=this.ytPlayer.on("stateChange",t=>{t.data===0&&e()}):this.listener=this.vimeoPlayer.on("ended",e)}}var Ss;const Bt=Le(JSON.parse((Ss=localStorage==null?void 0:localStorage.autoplay)!=null?Ss:!0));Bt.subscribe(n=>{localStorage&&(localStorage.autoplay=n)});function Yo(n=window.location.pathname){const e=n.split("/"),t=e.findIndex(r=>r==="courses")+1;return e==null?void 0:e[t]}const $t={"react-next-firebase":{id:"react-next-firebase",price:"price_1Lkgo6BF7AptWZlcBFVoputL",amount:20,legacy_sku:"sku_ItHZfVSApb3xkT"},git:{id:"git",price:"price_1LkgzcBF7AptWZlcF5NJQgKd",amount:10,legacy_sku:"sku_KBHTYbTWv1Hmb7"},angular:{id:"angular",price:"price_1Lkh0WBF7AptWZlcYUEGDHLz",amount:20,legacy_sku:"sku_Fn7Ojng8TLwnC4"},"flutter-firebase":{id:"flutter-firebase",price:"price_1Lkh1TBF7AptWZlcrWJiK3PT",amount:20,legacy_sku:"sku_FJCsh7mvjI83Kz"},dart:{id:"dart",price:"price_1Lkh20BF7AptWZlcqyViQgv0",amount:10,legacy_sku:"sku_KOyOvlrmLikRz8"},"vscode-tricks":{id:"vscode-tricks",price:"price_1Lkh2mBF7AptWZlcR0GhtjwH",amount:10,legacy_sku:"sku_Kf57qdqUerVTUS"},"firestore-data-modeling":{id:"firestore-data-modeling",price:"price_1Lkh3VBF7AptWZlcNiWVmDLI",amount:10,legacy_sku:"sku_FJEdx5Tz9dPrvm"},"firebase-security":{id:"firebase-security",price:"price_1Lkh4EBF7AptWZlcFv4ZvmIR",amount:10,legacy_sku:"sku_IVIjaiCRlivYD3"},"stripe-js":{id:"stripe-js",price:"price_1LnAhnBF7AptWZlc3VgezH7X",amount:20,legacy_sku:"sku_HG8dqucZV4x6F2"},lifetime:{id:"lifetime",price:"price_1LkhByBF7AptWZlcIUg2TjVg",amount:399},enterprise:{id:"enterprise",price:"price_1LkhByBF7AptWZlcx5vOdAnG",amount:299},month:{id:"pro",price:"price_1LkhBxBF7AptWZlcJB2I2IUt",amount:29},quarter:{id:"pro",price:"price_1LkhByBF7AptWZlcg9Zjbmw6",amount:69},year:{id:"pro",price:"price_1LkhByBF7AptWZlcVY5TwKdS",amount:199}},Pt=Le("month"),Jo=ar([yn],([n])=>{const e=Yo(n==null?void 0:n.permalink);return e&&$t[e]}),Uh=Le(null),zt=Le(null),Ri=Le(null),rr=Le(null);let qn,Vn,Wn;Vc(gn,async n=>{if(Uh.set(n),n){const{doc:e,onSnapshot:t,getFirestore:r}=await on(()=>import("./index.esm.3a5bd94c.js"),[]),i=r(),s=e(i,`users/${n.uid}`),o=e(i,`progress/${n.uid}`),a=e(i,`seats/${n.uid}`);qn=t(s,l=>{var c;zt.set(l.data()),(c=l.data())!=null&&c.enterprise&&(Wn=t(a,u=>{rr.set(u.data())}))}),Vn=t(o,l=>{Ri.set(l.data())})}else qn&&qn(),Vn&&Vn(),Wn&&Wn(),zt.set(null),Ri.set(null),rr.set(null)});const Oi=ar([zt,yn],([n,e])=>{var r,i,s;const t=Yo(e==null?void 0:e.permalink);return!!((n==null?void 0:n.is_pro)||((r=n==null?void 0:n.courses)==null?void 0:r[t])||((s=n==null?void 0:n.products)==null?void 0:s[(i=$t[t])==null?void 0:i.legacy_sku]))});ar(zt,n=>n?1:0);function Fh(n){var u;let e,t,r,i,s,o,a,l,c=((u=n[6])==null?void 0:u.price)&&Pi();return{c(){e=m("div"),t=m("if-user"),r=m("h5"),r.textContent="Permission Denied",i=k(),c&&c.c(),s=k(),o=m("div"),o.innerHTML=`<p><a href="/pro/" class="text-pro">Upgrade to PRO</a></p> 
        <p class="text-light">Unlock all Fireship content &amp;&amp; bonus perks</p>`,a=k(),l=m("modal-action"),l.innerHTML='You must be <span class="hl-blue">signed in</span> to watch.',b(r,"class","denied"),b(o,"class","buy-box green"),_t(l,"slot","signed-out"),_t(l,"name","signin"),_t(l,"type","open"),b(e,"class","upgrade-required")},m(d,h){g(d,e,h),f(e,t),f(t,r),f(t,i),c&&c.m(t,null),f(t,s),f(t,o),f(t,a),f(t,l)},p(d,h){var p;(p=d[6])!=null&&p.price?c||(c=Pi(),c.c(),c.m(t,s)):c&&(c.d(1),c=null)},d(d){d&&w(e),c&&c.d()}}}function jh(n){let e,t,r,i,s,o,a,l,c,u,d,h,p,y,_,S,O;return{c(){e=m("div"),t=m("div"),r=k(),i=m("div"),s=m("p"),o=A("Autoplaying next video in "),a=m("span"),l=A(n[3]),c=A(" seconds..."),u=k(),d=m("div"),h=m("button"),h.textContent="Cancel",p=k(),y=m("button"),y.textContent="Go",_=k(),b(t,"class","vid"),b(a,"class","big-text"),b(h,"class","btn"),b(y,"class","btn btn-blue"),b(i,"class","autoplay-cover"),oe(i,"active",n[2]),b(e,"class","wrapper")},m(x,R){g(x,e,R),f(e,t),n[11](t),f(e,r),f(e,i),f(i,s),f(s,o),f(s,a),f(a,l),f(s,c),f(i,u),f(i,d),f(d,h),f(d,p),f(d,y),f(e,_),S||(O=[D(h,"click",n[7]),D(y,"click",n[12])],S=!0)},p(x,R){R&8&&j(l,x[3]),R&4&&oe(i,"active",x[2])},d(x){x&&w(e),n[11](null),S=!1,Te(O)}}}function Pi(n){let e,t,r;return{c(){e=m("div"),e.innerHTML=`<buy-course></buy-course> 
          <p class="text-light">Lifetime access for a blazingly low price</p>`,t=k(),r=m("h3"),r.textContent="OR",b(e,"class","buy-box")},m(i,s){g(i,e,s),g(i,t,s),g(i,r,s)},d(i){i&&w(e),i&&w(t),i&&w(r)}}}function Hh(n){let e;function t(s,o){return s[0]||s[5]?jh:Fh}let r=t(n),i=r(n);return{c(){i.c(),e=ge(),this.c=E},m(s,o){i.m(s,o),g(s,e,o)},p(s,[o]){r===(r=t(s))&&i?i.p(s,o):(i.d(1),i=r(s),i&&(i.c(),i.m(e.parentNode,e)))},i:E,o:E,d(s){i.d(s),s&&w(e)}}}function Bh(n,e,t){let r,i,s,o;Ce(n,yn,M=>t(4,r=M)),Ce(n,Bt,M=>t(17,i=M)),Ce(n,Oi,M=>t(5,s=M)),Ce(n,Jo,M=>t(6,o=M));let{video:a}=e,{type:l}=e,{free:c=!1}=e,{single:u=!1}=e,d,h,p=!1,y,_,S=10,O;je(()=>{t(8,a||(a=(r==null?void 0:r.vimeo)||(r==null?void 0:r.youtube))),t(9,l=r!=null&&r.vimeo?"vimeo":"youtube");const M=Oi.subscribe(async z=>{a&&!O&&(z||c)&&(await ba(),x())});return()=>{O==null||O.destroy(),y&&clearTimeout(y),_&&clearInterval(_),h&&h(),M()}});async function x(){O=await Er.create(a,d,l);const M=window.location.search.includes("autoplay");h=Bt.subscribe(z=>{z&&M&&O.play()}),O.onEnded(()=>{!u&&i&&(r==null?void 0:r.next)&&(t(2,p=!0),R(),y=setTimeout(()=>{ir.go(r.next+"?autoplay=true")},1e4)),!u&&!(r!=null&&r.next)&&xe.set({message:"Well done! You reached the end of this course.",type:"success",icon:"\u{1F370}"})})}function R(){clearInterval(_),_=setInterval(()=>{t(3,S--,S)},1e3)}function N(){t(2,p=!1),t(3,S=10),clearTimeout(y),clearInterval(_)}function re(M){It[M?"unshift":"push"](()=>{d=M,t(1,d)})}const se=()=>ir.go(r.next+"?autoplay=true");return n.$$set=M=>{"video"in M&&t(8,a=M.video),"type"in M&&t(9,l=M.type),"free"in M&&t(0,c=M.free),"single"in M&&t(10,u=M.single)},[c,d,p,S,r,s,o,N,a,l,u,re,se]}class $h extends Q{constructor(e){super(),this.shadowRoot.innerHTML=`<style>.wrapper{position:relative;aspect-ratio:16 / 9;width:100%;background-color:rgb(0 0 0 / var(--tw-bg-opacity));--tw-bg-opacity:0.5
}.autoplay-cover{position:absolute;top:0px;right:0px;bottom:0px;left:0px;display:none;flex-direction:column;align-items:center;justify-content:center;background-color:rgb(0 0 0 / var(--tw-bg-opacity));--tw-bg-opacity:0.95;font-size:1.125rem;line-height:1.75rem
}.active{display:flex
}.btn{margin-left:0.25rem;margin-right:0.25rem;cursor:pointer;border-style:none;--tw-bg-opacity:1;background-color:rgb(239 68 68 / var(--tw-bg-opacity));padding-left:1rem;padding-right:1rem;padding-top:0.5rem;padding-bottom:0.5rem;font-family:cubano, sans-serif;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));outline:2px solid transparent;outline-offset:2px
}.btn-blue{--tw-bg-opacity:1;background-color:rgb(59 130 246 / var(--tw-bg-opacity))
}.upgrade-required{display:flex;aspect-ratio:16 / 9
}@keyframes pulse{50%{opacity:.5
    }}.upgrade-required{animation:pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;flex-direction:column;align-items:center;justify-content:center;background-color:rgb(0 0 0 / var(--tw-bg-opacity));--tw-bg-opacity:0.75;text-align:center;font-size:1.25rem;line-height:1.75rem
}.hl-blue{cursor:pointer;font-family:cubano, sans-serif;--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))
}.denied{display:none;--tw-text-opacity:1;color:rgb(239 68 68 / var(--tw-text-opacity))
}@media(min-width: 768px){.denied{display:block
    }}.big-text{font-family:cubano, sans-serif;font-size:2.25rem;line-height:2.5rem
}.buy-box{margin-left:auto;margin-right:auto;max-width:24rem;border-radius:0.5rem;border-width:1px;border-style:solid;--tw-border-opacity:1;border-color:rgb(59 130 246 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(18 24 27 / var(--tw-bg-opacity));padding:1.5rem;--tw-shadow:0 5px 20px rgb(0 0 0 / 30%);--tw-shadow-colored:0 5px 20px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}.buy-box.green{margin-top:1rem;--tw-border-opacity:1;border-color:rgb(34 197 94 / var(--tw-border-opacity))
}.buy-box p{margin-top:0px;margin-bottom:0px
}.text-light{margin-top:0px;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(108 121 131 / var(--tw-text-opacity))
}.text-pro{font-family:cubano, sans-serif;font-size:1.25rem;line-height:1.75rem;--tw-text-opacity:1;color:rgb(34 197 94 / var(--tw-text-opacity));text-decoration-line:none
}h3{display:none;font-family:cubano, sans-serif;--tw-text-opacity:1;color:rgb(108 121 131 / var(--tw-text-opacity))
}@media(min-width: 768px){h3{display:block
    }}iframe{position:absolute;top:0px;left:0px;height:100%;width:100%
}</style>`,te(this,{target:this.shadowRoot,props:ee(this.attributes),customElement:!0},Bh,Hh,Z,{video:8,type:9,free:0,single:10},null),e&&(e.target&&g(e.target,this,e.anchor),e.props&&(this.$set(e.props),X()))}static get observedAttributes(){return["video","type","free","single"]}get video(){return this.$$.ctx[8]}set video(e){this.$$set({video:e}),X()}get type(){return this.$$.ctx[9]}set type(e){this.$$set({type:e}),X()}get free(){return this.$$.ctx[0]}set free(e){this.$$set({free:e}),X()}get single(){return this.$$.ctx[10]}set single(e){this.$$set({single:e}),X()}}customElements.define("video-player",$h);function zh(n){let e,t,r,i,s,o;return{c(){e=m("label"),t=m("input"),r=k(),i=m("span"),this.c=E,b(t,"type","checkbox"),t.checked=n[0],b(i,"class","slider"),b(e,"class","switch")},m(a,l){g(a,e,l),f(e,t),f(e,r),f(e,i),s||(o=D(t,"change",n[1]),s=!0)},p(a,[l]){l&1&&(t.checked=a[0])},i:E,o:E,d(a){a&&w(e),s=!1,o()}}}function qh(n,e,t){let r;Ce(n,Bt,s=>t(0,r=s));function i(s){Bt.set(s.target.checked)}return[r,i]}class Vh extends Q{constructor(e){super(),this.shadowRoot.innerHTML=`<style>.switch{position:relative;display:inline-block;height:1.25rem;width:2.5rem
}.switch input{height:0px;width:0px;opacity:0
}.slider{position:absolute;top:0px;right:0px;bottom:0px;left:0px;cursor:pointer;border-radius:9999px;--tw-bg-opacity:1;background-color:rgb(69 78 86 / var(--tw-bg-opacity));transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms
}.slider:before{position:absolute;left:0.125rem;bottom:0.125rem;z-index:10;height:1rem;width:1rem;border-radius:9999px;--tw-bg-opacity:1;background-color:rgb(18 24 27 / var(--tw-bg-opacity));transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;content:""
}input:checked+.slider{--tw-bg-opacity:1;background-color:rgb(34 197 94 / var(--tw-bg-opacity))
}input:focus+.slider{--tw-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}input:checked+.slider:before{--tw-translate-x:1.25rem;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}</style>`,te(this,{target:this.shadowRoot,props:ee(this.attributes),customElement:!0},qh,zh,Z,{},null),e&&e.target&&g(e.target,this,e.anchor)}}customElements.define("autoplay-toggle",Vh);function Wh(n){let e;return{c(){e=m("span"),e.textContent="Course not available for single purchase",b(e,"class","btn yellow")},m(t,r){g(t,e,r)},p:E,d(t){t&&w(e)}}}function Gh(n){var y;let e,t,r=n[0]?"loading...":"buy this course",i,s,o,a,l=((y=n[2])==null?void 0:y.amount)+"",c,u,d,h,p=n[0]&&xi();return{c(){e=m("span"),p&&p.c(),t=k(),i=A(r),s=A(` 
      for `),o=m("strong"),a=A("$"),c=A(l),u=A("."),b(e,"class","btn"),b(o,"class","font-display")},m(_,S){g(_,e,S),p&&p.m(e,null),f(e,t),f(e,i),g(_,s,S),g(_,o,S),f(o,a),f(o,c),g(_,u,S),d||(h=D(e,"click",n[3]),d=!0)},p(_,S){var O;_[0]?p||(p=xi(),p.c(),p.m(e,t)):p&&(p.d(1),p=null),S&1&&r!==(r=_[0]?"loading...":"buy this course")&&j(i,r),S&4&&l!==(l=((O=_[2])==null?void 0:O.amount)+"")&&j(c,l)},d(_){_&&w(e),p&&p.d(),_&&w(s),_&&w(o),_&&w(u),d=!1,h()}}}function xi(n){let e;return{c(){e=m("loading-spinner")},m(t,r){g(t,e,r)},d(t){t&&w(e)}}}function Li(n){let e,t;return{c(){e=m("a"),t=A("Open Checkout Page"),b(e,"target","_blank"),b(e,"href",n[1])},m(r,i){g(r,e,i),f(e,t)},p(r,i){i&2&&b(e,"href",r[1])},d(r){r&&w(e)}}}function Kh(n){let e,t;function r(a,l){var c;return(c=a[2])!=null&&c.price?Gh:Wh}let i=r(n),s=i(n),o=n[1]&&Li(n);return{c(){s.c(),e=k(),o&&o.c(),t=ge(),this.c=E},m(a,l){s.m(a,l),g(a,e,l),o&&o.m(a,l),g(a,t,l)},p(a,[l]){i===(i=r(a))&&s?s.p(a,l):(s.d(1),s=i(a),s&&(s.c(),s.m(e.parentNode,e))),a[1]?o?o.p(a,l):(o=Li(a),o.c(),o.m(t.parentNode,t)):o&&(o.d(1),o=null)},i:E,o:E,d(a){s.d(a),a&&w(e),o&&o.d(a),a&&w(t)}}}function Yh(n,e,t){let r;Ce(n,Jo,a=>t(2,r=a));let i=!1,s;async function o(){var a;t(0,i=!0),t(1,s=await Re({fn:"createPaymentSession",payload:{productId:r.id,price:r.price,productType:"course"}})),s&&((a=window.open(s,"_blank"))==null||a.focus()),t(0,i=!1)}return[i,s,r,o]}class Jh extends Q{constructor(e){super(),this.shadowRoot.innerHTML=`<style>.btn{cursor:pointer;font-family:cubano, sans-serif;font-size:1.25rem;line-height:1.75rem;--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))
}.btn.yellow{cursor:default;--tw-text-opacity:1;color:rgb(234 179 8 / var(--tw-text-opacity))
}a{display:block;text-align:center;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))
}</style>`,te(this,{target:this.shadowRoot,props:ee(this.attributes),customElement:!0},Yh,Kh,Z,{},null),e&&e.target&&g(e.target,this,e.anchor)}}customElements.define("buy-course",Jh);function Ni(n){let e;return{c(){e=m("loading-spinner")},m(t,r){g(t,e,r)},d(t){t&&w(e)}}}function Di(n){let e,t;return{c(){e=m("a"),t=A("Open Checkout Page"),b(e,"target","_blank"),b(e,"href",n[1])},m(r,i){g(r,e,i),f(e,t)},p(r,i){i&2&&b(e,"href",r[1])},d(r){r&&w(e)}}}function Xh(n){let e,t,r=n[0]?"loading...":"subscribe",i,s,o,a,l,c=n[0]&&Ni(),u=n[1]&&Di(n);return{c(){e=m("button"),c&&c.c(),t=k(),i=A(r),s=k(),u&&u.c(),o=ge(),this.c=E,b(e,"class","btn btn-blue"),e.disabled=n[0]},m(d,h){g(d,e,h),c&&c.m(e,null),f(e,t),f(e,i),g(d,s,h),u&&u.m(d,h),g(d,o,h),a||(l=D(e,"click",n[2]),a=!0)},p(d,[h]){d[0]?c||(c=Ni(),c.c(),c.m(e,t)):c&&(c.d(1),c=null),h&1&&r!==(r=d[0]?"loading...":"subscribe")&&j(i,r),h&1&&(e.disabled=d[0]),d[1]?u?u.p(d,h):(u=Di(d),u.c(),u.m(o.parentNode,o)):u&&(u.d(1),u=null)},i:E,o:E,d(d){d&&w(e),c&&c.d(),d&&w(s),u&&u.d(d),d&&w(o),a=!1,l()}}}function Zh(n,e,t){let r;Ce(n,Pt,a=>t(3,r=a));let i=!1,s;async function o(){var l;t(0,i=!0);const a=$t[r].price;t(1,s=await Re({fn:"createSubscriptionSession",payload:{price:a}})),s&&((l=window.open(s,"_blank"))==null||l.focus()),t(0,i=!1)}return[i,s,o]}class Qh extends Q{constructor(e){super(),this.shadowRoot.innerHTML=`<style>.btn{margin-top:0.125rem;margin-bottom:0.125rem;display:inline-flex;cursor:pointer;border-style:none;--tw-bg-opacity:1;background-color:rgb(59 130 246 / var(--tw-bg-opacity));padding-left:1.25rem;padding-right:1.25rem;padding-top:0.5rem;padding-bottom:0.5rem;text-align:center;font-family:sofia-pro, sans-serif;font-size:0.875rem;line-height:1.25rem;font-weight:700;text-transform:uppercase;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));text-decoration-line:none;--tw-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);outline:2px solid transparent;outline-offset:2px
}.btn:hover{--tw-bg-opacity:1;background-color:rgb(29 78 216 / var(--tw-bg-opacity))
}.btn:disabled{cursor:not-allowed;opacity:0.7
}a{display:block;text-align:center;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))
}</style>`,te(this,{target:this.shadowRoot,props:ee(this.attributes),customElement:!0},Zh,Xh,Z,{},null),e&&e.target&&g(e.target,this,e.anchor)}}customElements.define("buy-pro",Qh);function Mi(n){let e,t,r,i,s,o,a,l;return{c(){e=m("div"),t=m("button"),t.textContent="-",r=k(),i=m("input"),s=k(),o=m("button"),o.textContent="+",b(t,"class","btn-o"),b(i,"type","number"),b(i,"min","5"),b(i,"max","50"),b(o,"class","btn-o"),b(e,"class","controls")},m(c,u){g(c,e,u),f(e,t),f(e,r),f(e,i),Ee(i,n[2]),f(e,s),f(e,o),a||(l=[D(t,"click",n[7]),D(i,"input",n[8]),D(i,"change",n[9]),D(o,"click",n[10])],a=!0)},p(c,u){u&4&&Cs(i.value)!==c[2]&&Ee(i,c[2])},d(c){c&&w(e),a=!1,Te(l)}}}function Ui(n){let e;return{c(){e=m("loading-spinner")},m(t,r){g(t,e,r)},d(t){t&&w(e)}}}function Fi(n){let e,t;return{c(){e=m("a"),t=A("Open Checkout Page"),b(e,"target","_blank"),b(e,"href",n[3])},m(r,i){g(r,e,i),f(e,t)},p(r,i){i&8&&b(e,"href",r[3])},d(r){r&&w(e)}}}function ep(n){let e,t,r,i=(n[1]?"loading...":n[4])+"",s,o,a,l,c,u=n[0]&&Mi(n),d=n[1]&&Ui(),h=n[3]&&Fi(n);return{c(){u&&u.c(),e=k(),t=m("button"),d&&d.c(),r=k(),s=A(i),o=k(),h&&h.c(),a=ge(),this.c=E,b(t,"class","btn"),t.disabled=n[1],oe(t,"btn-blue",n[0])},m(p,y){u&&u.m(p,y),g(p,e,y),g(p,t,y),d&&d.m(t,null),f(t,r),f(t,s),g(p,o,y),h&&h.m(p,y),g(p,a,y),l||(c=D(t,"click",n[6]),l=!0)},p(p,[y]){p[0]?u?u.p(p,y):(u=Mi(p),u.c(),u.m(e.parentNode,e)):u&&(u.d(1),u=null),p[1]?d||(d=Ui(),d.c(),d.m(t,r)):d&&(d.d(1),d=null),y&2&&i!==(i=(p[1]?"loading...":p[4])+"")&&j(s,i),y&2&&(t.disabled=p[1]),y&1&&oe(t,"btn-blue",p[0]),p[3]?h?h.p(p,y):(h=Fi(p),h.c(),h.m(a.parentNode,a)):h&&(h.d(1),h=null)},i:E,o:E,d(p){u&&u.d(p),p&&w(e),p&&w(t),d&&d.d(),p&&w(o),h&&h.d(p),p&&w(a),l=!1,c()}}}function tp(n,e,t){let r=!1,{enterprise:i=!1}=e,s=i?"upgrade my team":"upgrade for life",o=i?$t.enterprise.price:$t.lifetime.price,a=5,l="";function c(_){t(2,a=_),a<5&&(t(2,a=5),xe.set({message:"This plan has a 5 seat minimum",type:"error"})),a>50&&(t(2,a=50),xe.set({message:"Maximum 50 seats. Contact for larger plans",type:"error"}))}async function u(){var _;t(1,r=!0),t(3,l=await Re({fn:"createPaymentSession",payload:{productType:i?"enterprise":"lifetime",price:o,seats:i?a:1}})),l&&((_=window.open(l,"_blank"))==null||_.focus()),t(1,r=!1)}const d=()=>c(a-1);function h(){a=Cs(this.value),t(2,a)}const p=_=>c(_.target.value),y=()=>c(a+1);return n.$$set=_=>{"enterprise"in _&&t(0,i=_.enterprise)},[i,r,a,l,s,c,u,d,h,p,y]}class np extends Q{constructor(e){super(),this.shadowRoot.innerHTML=`<style>input{margin-left:auto;margin-right:auto;width:3rem;border-style:none;--tw-bg-opacity:1;background-color:rgb(18 24 27 / var(--tw-bg-opacity));padding:0.5rem;text-align:center;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));outline:2px solid transparent;outline-offset:2px
}.btn{margin-top:0.125rem;margin-bottom:0.125rem;display:inline-flex;cursor:pointer;border-style:none;--tw-bg-opacity:1;background-color:rgb(168 85 247 / var(--tw-bg-opacity));padding-left:1.25rem;padding-right:1.25rem;padding-top:0.5rem;padding-bottom:0.5rem;text-align:center;font-family:sofia-pro, sans-serif;font-size:0.875rem;line-height:1.25rem;font-weight:700;text-transform:uppercase;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));text-decoration-line:none;--tw-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);outline:2px solid transparent;outline-offset:2px
}.btn:hover{--tw-bg-opacity:1;background-color:rgb(126 34 206 / var(--tw-bg-opacity))
}.btn:disabled{cursor:not-allowed;opacity:0.7
}.btn-blue{--tw-bg-opacity:1;background-color:rgb(59 130 246 / var(--tw-bg-opacity))
}.btn-blue:hover{--tw-bg-opacity:1;background-color:rgb(29 78 216 / var(--tw-bg-opacity))
}.btn-o{margin:0px;cursor:pointer;border-radius:0.125rem;border-width:1px;border-style:solid;--tw-border-opacity:1;border-color:rgb(249 115 22 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(42 46 53 / var(--tw-bg-opacity));padding:0.375rem;font-family:sofia-pro, sans-serif;font-size:0.75rem;line-height:1rem;--tw-text-opacity:1;color:rgb(178 190 205 / var(--tw-text-opacity));outline:2px solid transparent;outline-offset:2px;transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms
}.btn-o:hover{--tw-bg-opacity:1;background-color:rgb(249 115 22 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))
}.controls{margin-top:0.75rem;margin-bottom:0.75rem;text-align:center
}a{display:block;text-align:center;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))
}</style>`,te(this,{target:this.shadowRoot,props:ee(this.attributes),customElement:!0},tp,ep,Z,{enterprise:0},null),e&&(e.target&&g(e.target,this,e.anchor),e.props&&(this.$set(e.props),X()))}static get observedAttributes(){return["enterprise"]}get enterprise(){return this.$$.ctx[0]}set enterprise(e){this.$$set({enterprise:e}),X()}}customElements.define("buy-lifetime",np);function ji(n){let e;return{c(){e=m("loading-spinner")},m(t,r){g(t,e,r)},d(t){t&&w(e)}}}function rp(n){let e,t,r=n[0]?"loading...":"subscription & invoices",i,s,o,a=n[0]&&ji();return{c(){e=m("button"),a&&a.c(),t=k(),i=A(r),this.c=E},m(l,c){g(l,e,c),a&&a.m(e,null),f(e,t),f(e,i),s||(o=D(e,"click",n[1]),s=!0)},p(l,[c]){l[0]?a||(a=ji(),a.c(),a.m(e,t)):a&&(a.d(1),a=null),c&1&&r!==(r=l[0]?"loading...":"subscription & invoices")&&j(i,r)},i:E,o:E,d(l){l&&w(e),a&&a.d(),s=!1,o()}}}function ip(n,e,t){let r=!1;async function i(){var o;t(0,r=!0);const s=await Re({fn:"createPortalSession",payload:{}});s&&((o=window.open(s,"_blank"))==null||o.focus()),t(0,r=!1)}return[r,i]}class sp extends Q{constructor(e){super(),this.shadowRoot.innerHTML=`<style>button{display:inline-flex;cursor:pointer;border-style:none;--tw-bg-opacity:1;background-color:rgb(59 130 246 / var(--tw-bg-opacity));padding-left:1.25rem;padding-right:1.25rem;padding-top:0.5rem;padding-bottom:0.5rem;text-align:center;font-family:sofia-pro, sans-serif;font-size:0.875rem;line-height:1.25rem;font-weight:700;text-transform:uppercase;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));text-decoration-line:none
}button:hover{--tw-bg-opacity:1;background-color:rgb(37 99 235 / var(--tw-bg-opacity))
}button:active{--tw-bg-opacity:1;background-color:rgb(29 78 216 / var(--tw-bg-opacity))
}</style>`,te(this,{target:this.shadowRoot,props:ee(this.attributes),customElement:!0},ip,rp,Z,{},null),e&&e.target&&g(e.target,this,e.anchor)}}customElements.define("customer-portal",sp);function Hi(n,e,t){const r=n.slice();return r[4]=e[t],r}function Bi(n){let e,t,r=n[0]?"loading...":"get receipts",i,s,o,a=n[0]&&$i();return{c(){e=m("button"),a&&a.c(),t=k(),i=A(r)},m(l,c){g(l,e,c),a&&a.m(e,null),f(e,t),f(e,i),s||(o=D(e,"click",n[2]),s=!0)},p(l,c){l[0]?a||(a=$i(),a.c(),a.m(e,t)):a&&(a.d(1),a=null),c&1&&r!==(r=l[0]?"loading...":"get receipts")&&j(i,r)},d(l){l&&w(e),a&&a.d(),s=!1,o()}}}function $i(n){let e;return{c(){e=m("loading-spinner")},m(t,r){g(t,e,r)},d(t){t&&w(e)}}}function zi(n){let e,t,r,i,s,o,a,l=n[1],c=[];for(let d=0;d<l.length;d+=1)c[d]=qi(Hi(n,l,d));let u=!n[1].length&&Vi();return{c(){e=m("button"),e.textContent="Hide Receipts",t=k(),r=m("ul");for(let d=0;d<c.length;d+=1)c[d].c();i=k(),u&&u.c(),s=ge()},m(d,h){g(d,e,h),g(d,t,h),g(d,r,h);for(let p=0;p<c.length;p+=1)c[p].m(r,null);g(d,i,h),u&&u.m(d,h),g(d,s,h),o||(a=D(e,"click",n[3]),o=!0)},p(d,h){if(h&2){l=d[1];let p;for(p=0;p<l.length;p+=1){const y=Hi(d,l,p);c[p]?c[p].p(y,h):(c[p]=qi(y),c[p].c(),c[p].m(r,null))}for(;p<c.length;p+=1)c[p].d(1);c.length=l.length}d[1].length?u&&(u.d(1),u=null):u||(u=Vi(),u.c(),u.m(s.parentNode,s))},d(d){d&&w(e),d&&w(t),d&&w(r),Xe(c,d),d&&w(i),u&&u.d(d),d&&w(s),o=!1,a()}}}function qi(n){let e,t,r=n[4].id+"",i,s,o,a,l,c=n[4].amount/100+"",u,d,h=new Date(n[4].created*1e3).toLocaleDateString()+"",p,y;return{c(){e=m("li"),t=m("a"),i=A(r),o=A(` for
        `),a=m("strong"),l=A("$"),u=A(c),d=A(" on "),p=A(h),y=k(),b(t,"target","_blank"),b(t,"href",s=n[4].receipt_url)},m(_,S){g(_,e,S),f(e,t),f(t,i),f(e,o),f(e,a),f(a,l),f(a,u),f(e,d),f(e,p),f(e,y)},p(_,S){S&2&&r!==(r=_[4].id+"")&&j(i,r),S&2&&s!==(s=_[4].receipt_url)&&b(t,"href",s),S&2&&c!==(c=_[4].amount/100+"")&&j(u,c),S&2&&h!==(h=new Date(_[4].created*1e3).toLocaleDateString()+"")&&j(p,h)},d(_){_&&w(e)}}}function Vi(n){let e;return{c(){e=m("p"),e.textContent="No charges found"},m(t,r){g(t,e,r)},d(t){t&&w(e)}}}function op(n){let e,t,r=!n[1]&&Bi(n),i=n[1]&&zi(n);return{c(){r&&r.c(),e=k(),i&&i.c(),t=ge(),this.c=E},m(s,o){r&&r.m(s,o),g(s,e,o),i&&i.m(s,o),g(s,t,o)},p(s,[o]){s[1]?r&&(r.d(1),r=null):r?r.p(s,o):(r=Bi(s),r.c(),r.m(e.parentNode,e)),s[1]?i?i.p(s,o):(i=zi(s),i.c(),i.m(t.parentNode,t)):i&&(i.d(1),i=null)},i:E,o:E,d(s){r&&r.d(s),s&&w(e),i&&i.d(s),s&&w(t)}}}function ap(n,e,t){let r=!1,i=null;async function s(){var l;t(0,r=!0);const a=(l=await Re({fn:"getCharges",payload:{}}))!=null?l:[];t(1,i=a.data||[]),t(0,r=!1)}return[r,i,s,()=>t(1,i=null)]}class lp extends Q{constructor(e){super(),this.shadowRoot.innerHTML=`<style>button{display:inline-flex;cursor:pointer;border-style:none;--tw-bg-opacity:1;background-color:rgb(59 130 246 / var(--tw-bg-opacity));padding-left:1.25rem;padding-right:1.25rem;padding-top:0.5rem;padding-bottom:0.5rem;text-align:center;font-family:sofia-pro, sans-serif;font-size:0.875rem;line-height:1.25rem;font-weight:700;text-transform:uppercase;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));text-decoration-line:none
}button:hover{--tw-bg-opacity:1;background-color:rgb(37 99 235 / var(--tw-bg-opacity))
}button:active{--tw-bg-opacity:1;background-color:rgb(29 78 216 / var(--tw-bg-opacity))
}a{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))
}</style>`,te(this,{target:this.shadowRoot,props:ee(this.attributes),customElement:!0},ap,op,Z,{},null),e&&e.target&&g(e.target,this,e.anchor)}}customElements.define("user-charges",lp);function Wi(n){let e=n[2][n[1]]+"",t,r,i,s;return{c(){t=A(e),r=m("span"),i=A("/"),s=A(n[1]),b(r,"class","period")},m(o,a){g(o,t,a),g(o,r,a),f(r,i),f(r,s)},p(o,a){a&2&&e!==(e=o[2][o[1]]+"")&&j(t,e),a&2&&j(s,o[1])},d(o){o&&w(t),o&&w(r)}}}function Gi(n){let e,t;return{c(){e=m("span"),t=A(n[1])},m(r,i){g(r,e,i),f(e,t)},p(r,i){i&2&&j(t,r[1])},d(r){r&&w(e)}}}function Ki(n){let e,t,r,i,s,o,a;return{c(){e=m("button"),e.textContent="Month",t=k(),r=m("button"),r.textContent="Quarter",i=k(),s=m("button"),s.textContent="Year",b(e,"class","btn"),oe(e,"active",n[1]=="month"),b(r,"class","btn"),oe(r,"active",n[1]=="quarter"),b(s,"class","btn"),oe(s,"active",n[1]=="year")},m(l,c){g(l,e,c),g(l,t,c),g(l,r,c),g(l,i,c),g(l,s,c),o||(a=[D(e,"click",n[3]),D(r,"click",n[4]),D(s,"click",n[5])],o=!0)},p(l,c){c&2&&oe(e,"active",l[1]=="month"),c&2&&oe(r,"active",l[1]=="quarter"),c&2&&oe(s,"active",l[1]=="year")},d(l){l&&w(e),l&&w(t),l&&w(r),l&&w(i),l&&w(s),o=!1,Te(a)}}}function cp(n){let e,t,r,i=n[0]=="amount"&&Wi(n),s=n[0]=="period"&&Gi(n),o=n[0]=="control"&&Ki(n);return{c(){i&&i.c(),e=k(),s&&s.c(),t=k(),o&&o.c(),r=ge(),this.c=E},m(a,l){i&&i.m(a,l),g(a,e,l),s&&s.m(a,l),g(a,t,l),o&&o.m(a,l),g(a,r,l)},p(a,[l]){a[0]=="amount"?i?i.p(a,l):(i=Wi(a),i.c(),i.m(e.parentNode,e)):i&&(i.d(1),i=null),a[0]=="period"?s?s.p(a,l):(s=Gi(a),s.c(),s.m(t.parentNode,t)):s&&(s.d(1),s=null),a[0]=="control"?o?o.p(a,l):(o=Ki(a),o.c(),o.m(r.parentNode,r)):o&&(o.d(1),o=null)},i:E,o:E,d(a){i&&i.d(a),a&&w(e),s&&s.d(a),a&&w(t),o&&o.d(a),a&&w(r)}}}function up(n,e,t){let r;Ce(n,Pt,c=>t(1,r=c));let{show:i="amount"}=e;const s={month:29,quarter:69,year:199},o=()=>Pt.set("month"),a=()=>Pt.set("quarter"),l=()=>Pt.set("year");return n.$$set=c=>{"show"in c&&t(0,i=c.show)},[i,r,s,o,a,l]}class dp extends Q{constructor(e){super(),this.shadowRoot.innerHTML=`<style>.btn{margin:0px;cursor:pointer;border-radius:0.375rem;border-width:1px;border-style:solid;--tw-border-opacity:1;border-color:rgb(249 115 22 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(42 46 53 / var(--tw-bg-opacity));padding:0.375rem;font-family:sofia-pro, sans-serif;font-size:0.75rem;line-height:1rem;--tw-text-opacity:1;color:rgb(178 190 205 / var(--tw-text-opacity));outline:2px solid transparent;outline-offset:2px;transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms
}.btn:hover{--tw-bg-opacity:1;background-color:rgb(249 115 22 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))
}.btn.active{--tw-bg-opacity:1;background-color:rgb(249 115 22 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))
}.period{font-family:sofia-pro, sans-serif;font-size:1rem;line-height:1.5rem;--tw-text-opacity:1;color:rgb(219 225 232 / var(--tw-text-opacity))
}</style>`,te(this,{target:this.shadowRoot,props:ee(this.attributes),customElement:!0},up,cp,Z,{show:0},null),e&&(e.target&&g(e.target,this,e.anchor),e.props&&(this.$set(e.props),X()))}static get observedAttributes(){return["show"]}get show(){return this.$$.ctx[0]}set show(e){this.$$set({show:e}),X()}}customElements.define("price-select",dp);function Yi(n,e,t){const r=n.slice();return r[13]=e[t],r}function Ji(n){var W;let e,t,r,i,s=n[5].length+"",o,a,l=((W=n[0])==null?void 0:W.seats)+"",c,u,d,h,p,y,_,S,O,x,R,N,re;function se(q,L){return q[5]?hp:fp}let M=se(n),z=M(n),J=n[1]&&Zi();return{c(){e=m("h2"),e.textContent="Assign Seats",t=k(),r=m("p"),i=A("You have used "),o=A(s),a=A(" of "),c=A(l),u=A(" seats"),d=k(),h=m("div"),z.c(),p=k(),y=m("div"),_=m("input"),S=k(),O=m("button"),J&&J.c(),x=A(`
            assign`),b(_,"type","email"),b(_,"placeholder","email"),_.required=!0,b(O,"class","btn"),O.disabled=R=n[1]||!n[2]||!n[3],b(y,"class","seat"),b(h,"class","wrap")},m(q,L){g(q,e,L),g(q,t,L),g(q,r,L),f(r,i),f(r,o),f(r,a),f(r,c),f(r,u),g(q,d,L),g(q,h,L),z.m(h,null),f(h,p),f(h,y),f(y,_),Ee(_,n[3]),n[12](_),f(y,S),f(y,O),J&&J.m(O,null),f(O,x),N||(re=[D(_,"input",n[11]),D(_,"input",n[7]),D(O,"click",n[8])],N=!0)},p(q,L){var G;L&32&&s!==(s=q[5].length+"")&&j(o,s),L&1&&l!==(l=((G=q[0])==null?void 0:G.seats)+"")&&j(c,l),M===(M=se(q))&&z?z.p(q,L):(z.d(1),z=M(q),z&&(z.c(),z.m(h,p))),L&8&&_.value!==q[3]&&Ee(_,q[3]),q[1]?J||(J=Zi(),J.c(),J.m(O,x)):J&&(J.d(1),J=null),L&14&&R!==(R=q[1]||!q[2]||!q[3])&&(O.disabled=R)},d(q){q&&w(e),q&&w(t),q&&w(r),q&&w(d),q&&w(h),z.d(),n[12](null),J&&J.d(),N=!1,Te(re)}}}function fp(n){let e;return{c(){e=m("p"),e.textContent="You have not assigned any seats yet"},m(t,r){g(t,e,r)},p:E,d(t){t&&w(e)}}}function hp(n){let e,t=n[5],r=[];for(let i=0;i<t.length;i+=1)r[i]=Xi(Yi(n,t,i));return{c(){for(let i=0;i<r.length;i+=1)r[i].c();e=ge()},m(i,s){for(let o=0;o<r.length;o+=1)r[o].m(i,s);g(i,e,s)},p(i,s){if(s&546){t=i[5];let o;for(o=0;o<t.length;o+=1){const a=Yi(i,t,o);r[o]?r[o].p(a,s):(r[o]=Xi(a),r[o].c(),r[o].m(e.parentNode,e))}for(;o<r.length;o+=1)r[o].d(1);r.length=t.length}},d(i){Xe(r,i),i&&w(e)}}}function Xi(n){let e,t=n[13]+"",r,i,s,o="revoke",a,l,c,u;function d(){return n[10](n[13])}return{c(){e=m("div"),r=A(t),i=k(),s=m("button"),a=A(o),l=k(),b(s,"class","btn btn-red"),s.disabled=n[1],b(e,"class","seat")},m(h,p){g(h,e,p),f(e,r),f(e,i),f(e,s),f(s,a),f(e,l),c||(u=D(s,"click",d),c=!0)},p(h,p){n=h,p&32&&t!==(t=n[13]+"")&&j(r,t),p&2&&(s.disabled=n[1])},d(h){h&&w(e),c=!1,u()}}}function Zi(n){let e;return{c(){e=m("loading-spinner")},m(t,r){g(t,e,r)},d(t){t&&w(e)}}}function pp(n){var r;let e,t=((r=n[6])==null?void 0:r.enterprise)&&Ji(n);return{c(){t&&t.c(),e=ge(),this.c=E},m(i,s){t&&t.m(i,s),g(i,e,s)},p(i,[s]){var o;(o=i[6])!=null&&o.enterprise?t?t.p(i,s):(t=Ji(i),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},i:E,o:E,d(i){t&&t.d(i),i&&w(e)}}}function mp(n,e,t){let r,i,s;Ce(n,rr,S=>t(0,i=S)),Ce(n,zt,S=>t(6,s=S));let o=!1,a=!1,l,c;function u(){t(2,a=c.validity.valid)}async function d(){t(1,o=!0),await Re({fn:"seatAssign",payload:{email:l}}),t(1,o=!1),t(3,l="")}async function h(S){t(1,o=!0),await Re({fn:"seatAssign",payload:{email:S,revoke:!0}}),t(1,o=!1)}const p=S=>h(S);function y(){l=this.value,t(3,l)}function _(S){It[S?"unshift":"push"](()=>{c=S,t(4,c)})}return n.$$.update=()=>{n.$$.dirty&1&&t(5,r=Object.keys((i==null?void 0:i.assigned)||{}))},[i,o,a,l,c,r,s,u,d,h,p,y,_]}class gp extends Q{constructor(e){super(),this.shadowRoot.innerHTML=`<style>.seat{margin-top:0.25rem;margin-bottom:0.25rem;display:flex;justify-content:space-between;--tw-bg-opacity:1;background-color:rgb(42 46 53 / var(--tw-bg-opacity));padding:0.75rem
}.btn{margin:0px;cursor:pointer;border-radius:0.125rem;border-width:1px;border-style:solid;--tw-border-opacity:1;border-color:rgb(59 130 246 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(42 46 53 / var(--tw-bg-opacity));padding:0.375rem;font-family:sofia-pro, sans-serif;font-size:0.75rem;line-height:1rem;--tw-text-opacity:1;color:rgb(178 190 205 / var(--tw-text-opacity));outline:2px solid transparent;outline-offset:2px;transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms
}.btn:hover{--tw-bg-opacity:1;background-color:rgb(59 130 246 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))
}.btn:disabled{cursor:not-allowed;opacity:0.6
}.btn-red{margin-left:0.5rem;--tw-border-opacity:1;border-color:rgb(239 68 68 / var(--tw-border-opacity))
}.btn-red:hover{--tw-bg-opacity:1;background-color:rgb(239 68 68 / var(--tw-bg-opacity))
}input{margin-right:0.75rem;width:100%;border-style:none;--tw-bg-opacity:1;background-color:rgb(18 24 27 / var(--tw-bg-opacity));padding:0.75rem;font-family:sofia-pro, sans-serif;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));outline:2px solid transparent;outline-offset:2px
}.wrap{display:flex;max-width:500px;flex-direction:column
}</style>`,te(this,{target:this.shadowRoot,props:ee(this.attributes),customElement:!0},mp,pp,Z,{},null),e&&e.target&&g(e.target,this,e.anchor)}}customElements.define("seat-assign",gp);function Qi(n,e,t){const r=n.slice();return r[4]=e[t],r}function es(n){let e,t,r=n[0]?"loading...":"get invoices",i,s,o,a=n[0]&&ts();return{c(){e=m("button"),a&&a.c(),t=k(),i=A(r)},m(l,c){g(l,e,c),a&&a.m(e,null),f(e,t),f(e,i),s||(o=D(e,"click",n[2]),s=!0)},p(l,c){l[0]?a||(a=ts(),a.c(),a.m(e,t)):a&&(a.d(1),a=null),c&1&&r!==(r=l[0]?"loading...":"get invoices")&&j(i,r)},d(l){l&&w(e),a&&a.d(),s=!1,o()}}}function ts(n){let e;return{c(){e=m("loading-spinner")},m(t,r){g(t,e,r)},d(t){t&&w(e)}}}function ns(n){let e,t,r,i,s,o,a,l=n[1],c=[];for(let d=0;d<l.length;d+=1)c[d]=rs(Qi(n,l,d));let u=!n[1].length&&is();return{c(){e=m("button"),e.textContent="Hide Invoices",t=k(),r=m("ul");for(let d=0;d<c.length;d+=1)c[d].c();i=k(),u&&u.c(),s=ge()},m(d,h){g(d,e,h),g(d,t,h),g(d,r,h);for(let p=0;p<c.length;p+=1)c[p].m(r,null);g(d,i,h),u&&u.m(d,h),g(d,s,h),o||(a=D(e,"click",n[3]),o=!0)},p(d,h){if(h&2){l=d[1];let p;for(p=0;p<l.length;p+=1){const y=Qi(d,l,p);c[p]?c[p].p(y,h):(c[p]=rs(y),c[p].c(),c[p].m(r,null))}for(;p<c.length;p+=1)c[p].d(1);c.length=l.length}d[1].length?u&&(u.d(1),u=null):u||(u=is(),u.c(),u.m(s.parentNode,s))},d(d){d&&w(e),d&&w(t),d&&w(r),Xe(c,d),d&&w(i),u&&u.d(d),d&&w(s),o=!1,a()}}}function rs(n){let e,t,r=n[4].id+"",i,s,o,a,l,c=n[4].amount_due/100+"",u,d,h=new Date(n[4].created*1e3).toLocaleDateString()+"",p,y;return{c(){e=m("li"),t=m("a"),i=A(r),o=A(` for
        `),a=m("strong"),l=A("$"),u=A(c),d=A(" on "),p=A(h),y=k(),b(t,"target","_blank"),b(t,"href",s=n[4].hosted_invoice_url)},m(_,S){g(_,e,S),f(e,t),f(t,i),f(e,o),f(e,a),f(a,l),f(a,u),f(e,d),f(e,p),f(e,y)},p(_,S){S&2&&r!==(r=_[4].id+"")&&j(i,r),S&2&&s!==(s=_[4].hosted_invoice_url)&&b(t,"href",s),S&2&&c!==(c=_[4].amount_due/100+"")&&j(u,c),S&2&&h!==(h=new Date(_[4].created*1e3).toLocaleDateString()+"")&&j(p,h)},d(_){_&&w(e)}}}function is(n){let e;return{c(){e=m("p"),e.textContent="No invoices found"},m(t,r){g(t,e,r)},d(t){t&&w(e)}}}function bp(n){let e,t,r=!n[1]&&es(n),i=n[1]&&ns(n);return{c(){r&&r.c(),e=k(),i&&i.c(),t=ge(),this.c=E},m(s,o){r&&r.m(s,o),g(s,e,o),i&&i.m(s,o),g(s,t,o)},p(s,[o]){s[1]?r&&(r.d(1),r=null):r?r.p(s,o):(r=es(s),r.c(),r.m(e.parentNode,e)),s[1]?i?i.p(s,o):(i=ns(s),i.c(),i.m(t.parentNode,t)):i&&(i.d(1),i=null)},i:E,o:E,d(s){r&&r.d(s),s&&w(e),i&&i.d(s),s&&w(t)}}}function wp(n,e,t){let r=!1,i=null;async function s(){var l;t(0,r=!0);const a=(l=await Re({fn:"getInvoices",payload:{}}))!=null?l:[];console.log(a),t(1,i=a.data||[]),t(0,r=!1)}return[r,i,s,()=>t(1,i=null)]}class yp extends Q{constructor(e){super(),this.shadowRoot.innerHTML=`<style>button{display:inline-flex;cursor:pointer;border-style:none;--tw-bg-opacity:1;background-color:rgb(59 130 246 / var(--tw-bg-opacity));padding-left:1.25rem;padding-right:1.25rem;padding-top:0.5rem;padding-bottom:0.5rem;text-align:center;font-family:sofia-pro, sans-serif;font-size:0.875rem;line-height:1.25rem;font-weight:700;text-transform:uppercase;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));text-decoration-line:none
}button:hover{--tw-bg-opacity:1;background-color:rgb(37 99 235 / var(--tw-bg-opacity))
}button:active{--tw-bg-opacity:1;background-color:rgb(29 78 216 / var(--tw-bg-opacity))
}a{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))
}</style>`,te(this,{target:this.shadowRoot,props:ee(this.attributes),customElement:!0},wp,bp,Z,{},null),e&&e.target&&g(e.target,this,e.anchor)}}customElements.define("user-invoices",yp);function ss(n,e,t){const r=n.slice();return r[8]=e[t],r}function os(n){let e,t,r=n[0]?"loading...":"manage subscription",i,s,o,a=n[0]&&as();return{c(){e=m("button"),a&&a.c(),t=k(),i=A(r)},m(l,c){g(l,e,c),a&&a.m(e,null),f(e,t),f(e,i),s||(o=D(e,"click",n[2]),s=!0)},p(l,c){l[0]?a||(a=as(),a.c(),a.m(e,t)):a&&(a.d(1),a=null),c&1&&r!==(r=l[0]?"loading...":"manage subscription")&&j(i,r)},d(l){l&&w(e),a&&a.d(),s=!1,o()}}}function as(n){let e;return{c(){e=m("loading-spinner")},m(t,r){g(t,e,r)},d(t){t&&w(e)}}}function ls(n){let e,t,r,i,s;function o(c,u){return c[1].length?vp:_p}let a=o(n),l=a(n);return{c(){e=m("button"),e.textContent="Hide Subscriptions",t=k(),l.c(),r=ge()},m(c,u){g(c,e,u),g(c,t,u),l.m(c,u),g(c,r,u),i||(s=D(e,"click",n[5]),i=!0)},p(c,u){a===(a=o(c))&&l?l.p(c,u):(l.d(1),l=a(c),l&&(l.c(),l.m(r.parentNode,r)))},d(c){c&&w(e),c&&w(t),l.d(c),c&&w(r),i=!1,s()}}}function _p(n){let e;return{c(){e=m("p"),e.textContent="No subscriptions found"},m(t,r){g(t,e,r)},p:E,d(t){t&&w(e)}}}function vp(n){let e,t=n[1],r=[];for(let i=0;i<t.length;i+=1)r[i]=ps(ss(n,t,i));return{c(){for(let i=0;i<r.length;i+=1)r[i].c();e=ge()},m(i,s){for(let o=0;o<r.length;o+=1)r[o].m(i,s);g(i,e,s)},p(i,s){if(s&27){t=i[1];let o;for(o=0;o<t.length;o+=1){const a=ss(i,t,o);r[o]?r[o].p(a,s):(r[o]=ps(a),r[o].c(),r[o].m(e.parentNode,e))}for(;o<r.length;o+=1)r[o].d(1);r.length=t.length}},d(i){Xe(r,i),i&&w(e)}}}function cs(n){let e,t,r=n[8].discount.coupon.percent_off+"",i,s,o=n[8].discount.coupon.duration+"",a;return{c(){e=m("p"),t=A("Discount: %"),i=A(r),s=A(" off "),a=A(o)},m(l,c){g(l,e,c),f(e,t),f(e,i),f(e,s),f(e,a)},p(l,c){c&2&&r!==(r=l[8].discount.coupon.percent_off+"")&&j(i,r),c&2&&o!==(o=l[8].discount.coupon.duration+"")&&j(a,o)},d(l){l&&w(e)}}}function us(n){let e,t,r=bn(n[8].current_period_end)+"",i,s,o,a,l,c,u=n[0]&&ds();function d(){return n[6](n[8])}return{c(){e=m("p"),t=A("Next payment "),i=A(r),s=k(),o=m("button"),u&&u.c(),a=A(`
            Cancel Subscription`),b(o,"class","cancel"),o.disabled=n[0]},m(h,p){g(h,e,p),f(e,t),f(e,i),g(h,s,p),g(h,o,p),u&&u.m(o,null),f(o,a),l||(c=D(o,"click",d),l=!0)},p(h,p){n=h,p&2&&r!==(r=bn(n[8].current_period_end)+"")&&j(i,r),n[0]?u||(u=ds(),u.c(),u.m(o,a)):u&&(u.d(1),u=null),p&1&&(o.disabled=n[0])},d(h){h&&w(e),h&&w(s),h&&w(o),u&&u.d(),l=!1,c()}}}function ds(n){let e;return{c(){e=m("loading-spinner")},m(t,r){g(t,e,r)},d(t){t&&w(e)}}}function fs(n){let e,t,r=bn(n[8].cancel_at)+"",i,s,o,a,l,c,u=n[0]&&hs();function d(){return n[7](n[8])}return{c(){e=m("p"),t=A("Your subscription is canceled. PRO access will end "),i=A(r),s=k(),o=m("button"),u&&u.c(),a=A(`
            Undo Cancellation`),b(e,"class","warn"),b(o,"class","undo"),o.disabled=n[0]},m(h,p){g(h,e,p),f(e,t),f(e,i),g(h,s,p),g(h,o,p),u&&u.m(o,null),f(o,a),l||(c=D(o,"click",d),l=!0)},p(h,p){n=h,p&2&&r!==(r=bn(n[8].cancel_at)+"")&&j(i,r),n[0]?u||(u=hs(),u.c(),u.m(o,a)):u&&(u.d(1),u=null),p&1&&(o.disabled=n[0])},d(h){h&&w(e),h&&w(s),h&&w(o),u&&u.d(),l=!1,c()}}}function hs(n){let e;return{c(){e=m("loading-spinner")},m(t,r){g(t,e,r)},d(t){t&&w(e)}}}function ps(n){let e,t,r,i=n[8].id+"",s,o,a,l,c=n[8].status+"",u,d,h,p,y=n[8].plan.amount/100+"",_,S,O=n[8].plan.interval_count+"",x,R,N=(n[8].plan.interval_count>1?n[8].plan.interval+"s":n[8].plan.interval)+"",re,se,M,z,J,W=n[8].discount&&cs(n),q=!n[8].canceled_at&&us(n),L=n[8].canceled_at&&n[8].status==="active"&&fs(n);return{c(){e=m("section"),t=m("h3"),r=A("ID: "),s=A(i),o=k(),a=m("p"),l=A("PRO Status: "),u=A(c),d=k(),h=m("p"),p=A("Plan: $"),_=A(y),S=A(` 
          per `),x=A(O),R=k(),re=A(N),se=k(),W&&W.c(),M=k(),q&&q.c(),z=k(),L&&L.c(),J=k()},m(G,ne){g(G,e,ne),f(e,t),f(t,r),f(t,s),f(e,o),f(e,a),f(a,l),f(a,u),f(e,d),f(e,h),f(h,p),f(h,_),f(h,S),f(h,x),f(h,R),f(h,re),f(e,se),W&&W.m(e,null),f(e,M),q&&q.m(e,null),f(e,z),L&&L.m(e,null),f(e,J)},p(G,ne){ne&2&&i!==(i=G[8].id+"")&&j(s,i),ne&2&&c!==(c=G[8].status+"")&&j(u,c),ne&2&&y!==(y=G[8].plan.amount/100+"")&&j(_,y),ne&2&&O!==(O=G[8].plan.interval_count+"")&&j(x,O),ne&2&&N!==(N=(G[8].plan.interval_count>1?G[8].plan.interval+"s":G[8].plan.interval)+"")&&j(re,N),G[8].discount?W?W.p(G,ne):(W=cs(G),W.c(),W.m(e,M)):W&&(W.d(1),W=null),G[8].canceled_at?q&&(q.d(1),q=null):q?q.p(G,ne):(q=us(G),q.c(),q.m(e,z)),G[8].canceled_at&&G[8].status==="active"?L?L.p(G,ne):(L=fs(G),L.c(),L.m(e,J)):L&&(L.d(1),L=null)},d(G){G&&w(e),W&&W.d(),q&&q.d(),L&&L.d()}}}function kp(n){let e,t,r=!n[1]&&os(n),i=n[1]&&ls(n);return{c(){r&&r.c(),e=k(),i&&i.c(),t=ge(),this.c=E},m(s,o){r&&r.m(s,o),g(s,e,o),i&&i.m(s,o),g(s,t,o)},p(s,[o]){s[1]?r&&(r.d(1),r=null):r?r.p(s,o):(r=os(s),r.c(),r.m(e.parentNode,e)),s[1]?i?i.p(s,o):(i=ls(s),i.c(),i.m(t.parentNode,t)):i&&(i.d(1),i=null)},i:E,o:E,d(s){r&&r.d(s),s&&w(e),i&&i.d(s),s&&w(t)}}}function bn(n){if(!n)return"never";let e=new Intl.RelativeTimeFormat("en",{numeric:"auto"}),t=-Math.floor((Date.now()-n*1e3)/1e3)/86400;return e.format(Math.floor(t),"day")}function Ip(n,e,t){let r=!1,i=null;async function s(){t(0,r=!0);const d=await Re({fn:"getSubscriptions",payload:{}});t(1,i=(d==null?void 0:d.data)||[]),console.log(i),t(0,r=!1)}async function o(d){t(0,r=!0),await Re({fn:"cancelSubscription",payload:{subscription:d}})&&(await s(),xe.set({message:"Subscription canceled. It was fun while it lasted",type:"info"})),t(0,r=!1)}async function a(d){t(0,r=!0),await Re({fn:"unCancelSubscription",payload:{subscription:d}})&&(await s(),xe.set({message:"Subscription reactivated!",type:"success"})),t(0,r=!1)}return[r,i,s,o,a,()=>t(1,i=null),d=>o(d.id),d=>a(d.id)]}class Ep extends Q{constructor(e){super(),this.shadowRoot.innerHTML=`<style>section{margin-top:1rem;margin-bottom:1rem;border-radius:0.5rem;--tw-bg-opacity:1;background-color:rgb(42 46 53 / var(--tw-bg-opacity));padding:1.5rem
}button{display:inline-flex;cursor:pointer;border-style:none;--tw-bg-opacity:1;background-color:rgb(59 130 246 / var(--tw-bg-opacity));padding-left:1.25rem;padding-right:1.25rem;padding-top:0.5rem;padding-bottom:0.5rem;text-align:center;font-family:sofia-pro, sans-serif;font-size:0.875rem;line-height:1.25rem;font-weight:700;text-transform:uppercase;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));text-decoration-line:none
}button:hover{--tw-bg-opacity:1;background-color:rgb(37 99 235 / var(--tw-bg-opacity))
}button:active{--tw-bg-opacity:1;background-color:rgb(29 78 216 / var(--tw-bg-opacity))
}button:disabled{cursor:not-allowed;opacity:0.7
}.cancel{--tw-bg-opacity:1;background-color:rgb(239 68 68 / var(--tw-bg-opacity))
}.cancel:hover{--tw-bg-opacity:1;background-color:rgb(220 38 38 / var(--tw-bg-opacity))
}.cancel:active{--tw-bg-opacity:1;background-color:rgb(185 28 28 / var(--tw-bg-opacity))
}.undo{--tw-bg-opacity:1;background-color:rgb(34 197 94 / var(--tw-bg-opacity))
}.undo:hover{--tw-bg-opacity:1;background-color:rgb(22 163 74 / var(--tw-bg-opacity))
}.undo:active{--tw-bg-opacity:1;background-color:rgb(21 128 61 / var(--tw-bg-opacity))
}.warn{--tw-text-opacity:1;color:rgb(234 179 8 / var(--tw-text-opacity))
}</style>`,te(this,{target:this.shadowRoot,props:ee(this.attributes),customElement:!0},Ip,kp,Z,{},null),e&&e.target&&g(e.target,this,e.anchor)}}customElements.define("manage-subscription",Ep);function ms(n,e,t){const r=n.slice();return r[8]=e[t],r}function gs(n){let e,t,r=n[0]?"loading...":"update payment method",i,s,o,a=n[0]&&bs();return{c(){e=m("button"),a&&a.c(),t=k(),i=A(r)},m(l,c){g(l,e,c),a&&a.m(e,null),f(e,t),f(e,i),s||(o=D(e,"click",n[3]),s=!0)},p(l,c){l[0]?a||(a=bs(),a.c(),a.m(e,t)):a&&(a.d(1),a=null),c&1&&r!==(r=l[0]?"loading...":"update payment method")&&j(i,r)},d(l){l&&w(e),a&&a.d(),s=!1,o()}}}function bs(n){let e;return{c(){e=m("loading-spinner")},m(t,r){g(t,e,r)},d(t){t&&w(e)}}}function ws(n){let e,t,r,i,s,o,a,l,c=n[0]?"loading...":"Add new card",u,d,h,p;function y(R,N){return R[1].length?Sp:Tp}let _=y(n),S=_(n),O=n[0]&&_s(),x=n[2]&&vs(n);return{c(){e=m("button"),e.textContent="Hide Payment Methods",t=k(),r=m("div"),i=m("h3"),i.textContent="Payment Methods",s=k(),S.c(),o=k(),a=m("button"),O&&O.c(),l=k(),u=A(c),d=k(),x&&x.c(),b(a,"class","update"),b(r,"class","wrap")},m(R,N){g(R,e,N),g(R,t,N),g(R,r,N),f(r,i),f(r,s),S.m(r,null),f(r,o),f(r,a),O&&O.m(a,null),f(a,l),f(a,u),f(r,d),x&&x.m(r,null),h||(p=[D(e,"click",n[6]),D(a,"click",n[5])],h=!0)},p(R,N){_===(_=y(R))&&S?S.p(R,N):(S.d(1),S=_(R),S&&(S.c(),S.m(r,o))),R[0]?O||(O=_s(),O.c(),O.m(a,l)):O&&(O.d(1),O=null),N&1&&c!==(c=R[0]?"loading...":"Add new card")&&j(u,c),R[2]?x?x.p(R,N):(x=vs(R),x.c(),x.m(r,null)):x&&(x.d(1),x=null)},d(R){R&&w(e),R&&w(t),R&&w(r),S.d(),O&&O.d(),x&&x.d(),h=!1,Te(p)}}}function Tp(n){let e;return{c(){e=m("p"),e.textContent="No payment methods found"},m(t,r){g(t,e,r)},p:E,d(t){t&&w(e)}}}function Sp(n){let e,t=n[1],r=[];for(let i=0;i<t.length;i+=1)r[i]=ys(ms(n,t,i));return{c(){e=m("ul");for(let i=0;i<r.length;i+=1)r[i].c()},m(i,s){g(i,e,s);for(let o=0;o<r.length;o+=1)r[o].m(e,null)},p(i,s){if(s&18){t=i[1];let o;for(o=0;o<t.length;o+=1){const a=ms(i,t,o);r[o]?r[o].p(a,s):(r[o]=ys(a),r[o].c(),r[o].m(e,null))}for(;o<r.length;o+=1)r[o].d(1);r.length=t.length}},d(i){i&&w(e),Xe(r,i)}}}function ys(n){let e,t=n[8].card.brand+"",r,i,s=n[8].card.last4+"",o,a,l=n[8].card.exp_month+"",c,u,d=n[8].card.exp_year+"",h,p,y,_,S,O;function x(){return n[7](n[8])}return{c(){e=m("li"),r=A(t),i=A(" ending in "),o=A(s),a=A(" expires "),c=A(l),u=A("/"),h=A(d),p=k(),y=m("span"),y.textContent="delete",_=k(),b(y,"class","warn")},m(R,N){g(R,e,N),f(e,r),f(e,i),f(e,o),f(e,a),f(e,c),f(e,u),f(e,h),f(e,p),f(e,y),f(e,_),S||(O=D(y,"click",x),S=!0)},p(R,N){n=R,N&2&&t!==(t=n[8].card.brand+"")&&j(r,t),N&2&&s!==(s=n[8].card.last4+"")&&j(o,s),N&2&&l!==(l=n[8].card.exp_month+"")&&j(c,l),N&2&&d!==(d=n[8].card.exp_year+"")&&j(h,d)},d(R){R&&w(e),S=!1,O()}}}function _s(n){let e;return{c(){e=m("loading-spinner")},m(t,r){g(t,e,r)},d(t){t&&w(e)}}}function vs(n){let e,t;return{c(){e=m("a"),t=A("Card Update Screen"),b(e,"href",n[2])},m(r,i){g(r,e,i),f(e,t)},p(r,i){i&4&&b(e,"href",r[2])},d(r){r&&w(e)}}}function Ap(n){let e,t,r=!n[1]&&gs(n),i=n[1]&&ws(n);return{c(){r&&r.c(),e=k(),i&&i.c(),t=ge(),this.c=E},m(s,o){r&&r.m(s,o),g(s,e,o),i&&i.m(s,o),g(s,t,o)},p(s,[o]){s[1]?r&&(r.d(1),r=null):r?r.p(s,o):(r=gs(s),r.c(),r.m(e.parentNode,e)),s[1]?i?i.p(s,o):(i=ws(s),i.c(),i.m(t.parentNode,t)):i&&(i.d(1),i=null)},i:E,o:E,d(s){r&&r.d(s),s&&w(e),i&&i.d(s),s&&w(t)}}}function Cp(n,e,t){let r=!1,i,s;async function o(){t(0,r=!0);const d=await Re({fn:"getPaymentMethods",payload:{}});t(1,i=(d==null?void 0:d.data)||[]),t(0,r=!1)}async function a(d){t(0,r=!0),await Re({fn:"deletePaymentMethod",payload:{pm:d}})&&await o(),t(0,r=!1)}async function l(){var d;t(0,r=!0),t(2,s=await Re({fn:"createSetupSession",payload:{}})),s&&((d=window.open(s,"_blank"))==null||d.focus()),t(0,r=!1)}return[r,i,s,o,a,l,()=>t(1,i=null),d=>a(d.id)]}class Rp extends Q{constructor(e){super(),this.shadowRoot.innerHTML=`<style>button{display:inline-flex;cursor:pointer;border-style:none;--tw-bg-opacity:1;background-color:rgb(59 130 246 / var(--tw-bg-opacity));padding-left:1.25rem;padding-right:1.25rem;padding-top:0.5rem;padding-bottom:0.5rem;text-align:center;font-family:sofia-pro, sans-serif;font-size:0.875rem;line-height:1.25rem;font-weight:700;text-transform:uppercase;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));text-decoration-line:none
}button:hover{--tw-bg-opacity:1;background-color:rgb(37 99 235 / var(--tw-bg-opacity))
}button:active{--tw-bg-opacity:1;background-color:rgb(29 78 216 / var(--tw-bg-opacity))
}.update{--tw-bg-opacity:1;background-color:rgb(34 197 94 / var(--tw-bg-opacity))
}.update:hover{--tw-bg-opacity:1;background-color:rgb(22 163 74 / var(--tw-bg-opacity))
}.update:active{--tw-bg-opacity:1;background-color:rgb(21 128 61 / var(--tw-bg-opacity))
}a{display:block;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))
}.warn{cursor:pointer;--tw-text-opacity:1;color:rgb(239 68 68 / var(--tw-text-opacity))
}.wrap{margin-top:4rem;margin-bottom:6rem
}</style>`,te(this,{target:this.shadowRoot,props:ee(this.attributes),customElement:!0},Cp,Ap,Z,{},null),e&&e.target&&g(e.target,this,e.anchor)}}customElements.define("update-payment",Rp);function ks(n){let e,t,r,i,s=n[1]&&Is();return{c(){e=m("button"),s&&s.c(),t=A(`
    update address`)},m(o,a){g(o,e,a),s&&s.m(e,null),f(e,t),r||(i=D(e,"click",n[6]),r=!0)},p(o,a){o[1]?s||(s=Is(),s.c(),s.m(e,t)):s&&(s.d(1),s=null)},d(o){o&&w(e),s&&s.d(),r=!1,i()}}}function Is(n){let e;return{c(){e=m("loading-spinner")},m(t,r){g(t,e,r)},d(t){t&&w(e)}}}function Es(n){let e,t,r,i,s,o,a,l,c,u,d,h,p,y,_,S,O,x,R,N,re,se,M,z,J,W,q,L,G,ne,be,_e,$e,Se,Ke,Ae=n[1]?"updating...":"save address",Me,He,lt,ve=n[1]&&Ts();return{c(){e=m("button"),e.textContent="Hide Address",t=k(),r=m("p"),r.textContent="This form will update your address in stripe and be reflected on invoices",i=k(),s=m("form"),o=m("label"),o.textContent="Name",a=k(),l=m("input"),c=k(),u=m("label"),u.textContent="Line 1",d=k(),h=m("input"),p=k(),y=m("label"),y.textContent="Line 2",_=k(),S=m("input"),O=k(),x=m("label"),x.textContent="City",R=k(),N=m("input"),re=k(),se=m("label"),se.textContent="State",M=k(),z=m("input"),J=k(),W=m("label"),W.textContent="Postal Code",q=k(),L=m("input"),G=k(),ne=m("label"),ne.textContent="Country Code (2 Digit)",be=k(),_e=m("input"),$e=k(),Se=m("button"),ve&&ve.c(),Ke=k(),Me=A(Ae),b(o,"for","name"),b(l,"name","name"),b(l,"type","text"),b(l,"maxlength","100"),b(u,"for","line1"),b(h,"name","line1"),b(h,"type","text"),b(h,"maxlength","100"),b(y,"for","line2"),b(S,"name","line2"),b(S,"type","text"),b(S,"maxlength","100"),b(x,"for","city"),b(N,"name","city"),b(N,"type","text"),b(N,"maxlength","50"),b(se,"for","state"),b(z,"name","state"),b(z,"type","text"),b(z,"maxlength","50"),b(W,"for","postal_code"),b(L,"name","postal_code"),b(L,"type","text"),b(L,"maxlength","20"),b(ne,"for","country"),b(_e,"name","country"),b(_e,"type","text"),b(_e,"maxlength","2"),b(Se,"class","update")},m(Y,he){g(Y,e,he),g(Y,t,he),g(Y,r,he),g(Y,i,he),g(Y,s,he),f(s,o),f(s,a),f(s,l),Ee(l,n[2]),f(s,c),f(s,u),f(s,d),f(s,h),Ee(h,n[3].line1),f(s,p),f(s,y),f(s,_),f(s,S),Ee(S,n[3].line2),f(s,O),f(s,x),f(s,R),f(s,N),Ee(N,n[3].city),f(s,re),f(s,se),f(s,M),f(s,z),Ee(z,n[3].state),f(s,J),f(s,W),f(s,q),f(s,L),Ee(L,n[3].postal_code),f(s,G),f(s,ne),f(s,be),f(s,_e),Ee(_e,n[3].country),g(Y,$e,he),g(Y,Se,he),ve&&ve.m(Se,null),f(Se,Ke),f(Se,Me),He||(lt=[D(e,"click",n[8]),D(l,"input",n[9]),D(h,"input",n[10]),D(S,"input",n[11]),D(N,"input",n[12]),D(z,"input",n[13]),D(L,"input",n[14]),D(_e,"input",n[15]),D(Se,"click",n[7])],He=!0)},p(Y,he){he&4&&l.value!==Y[2]&&Ee(l,Y[2]),he&8&&h.value!==Y[3].line1&&Ee(h,Y[3].line1),he&8&&S.value!==Y[3].line2&&Ee(S,Y[3].line2),he&8&&N.value!==Y[3].city&&Ee(N,Y[3].city),he&8&&z.value!==Y[3].state&&Ee(z,Y[3].state),he&8&&L.value!==Y[3].postal_code&&Ee(L,Y[3].postal_code),he&8&&_e.value!==Y[3].country&&Ee(_e,Y[3].country),Y[1]?ve||(ve=Ts(),ve.c(),ve.m(Se,Ke)):ve&&(ve.d(1),ve=null),he&2&&Ae!==(Ae=Y[1]?"updating...":"save address")&&j(Me,Ae)},d(Y){Y&&w(e),Y&&w(t),Y&&w(r),Y&&w(i),Y&&w(s),Y&&w($e),Y&&w(Se),ve&&ve.d(),He=!1,Te(lt)}}}function Ts(n){let e;return{c(){e=m("loading-spinner")},m(t,r){g(t,e,r)},d(t){t&&w(e)}}}function Op(n){let e,t,r=!n[0]&&ks(n),i=n[0]&&Es(n);return{c(){r&&r.c(),e=k(),i&&i.c(),t=ge(),this.c=E},m(s,o){r&&r.m(s,o),g(s,e,o),i&&i.m(s,o),g(s,t,o)},p(s,[o]){s[0]?r&&(r.d(1),r=null):r?r.p(s,o):(r=ks(s),r.c(),r.m(e.parentNode,e)),s[0]?i?i.p(s,o):(i=Es(s),i.c(),i.m(t.parentNode,t)):i&&(i.d(1),i=null)},i:E,o:E,d(s){r&&r.d(s),s&&w(e),i&&i.d(s),s&&w(t)}}}function Pp(n,e,t){let r,i;const s=Le("");Ce(n,s,R=>t(2,r=R));const o=Le({line1:"",line2:"",city:"",state:"",postal_code:"",country:""});Ce(n,o,R=>t(3,i=R));let a=!1,l=!1;async function c(){t(1,l=!0);const R=await Re({fn:"getCustomer",payload:{}});R!=null&&R.name&&s.set(R.name),R!=null&&R.address&&o.set(R.address),t(1,l=!1),t(0,a=!0)}async function u(){t(1,l=!0),await Re({fn:"changeAddress",payload:{address:i,name:r}})&&(xe.set({message:"Address updated",type:"success"}),t(0,a=!1)),t(1,l=!1)}const d=()=>t(0,a=!1);function h(){r=this.value,s.set(r)}function p(){i.line1=this.value,o.set(i)}function y(){i.line2=this.value,o.set(i)}function _(){i.city=this.value,o.set(i)}function S(){i.state=this.value,o.set(i)}function O(){i.postal_code=this.value,o.set(i)}function x(){i.country=this.value,o.set(i)}return[a,l,r,i,s,o,c,u,d,h,p,y,_,S,O,x]}class xp extends Q{constructor(e){super(),this.shadowRoot.innerHTML=`<style>button{display:inline-flex;cursor:pointer;border-style:none;--tw-bg-opacity:1;background-color:rgb(59 130 246 / var(--tw-bg-opacity));padding-left:1.25rem;padding-right:1.25rem;padding-top:0.5rem;padding-bottom:0.5rem;text-align:center;font-family:sofia-pro, sans-serif;font-size:0.875rem;line-height:1.25rem;font-weight:700;text-transform:uppercase;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));text-decoration-line:none
}button:hover{--tw-bg-opacity:1;background-color:rgb(37 99 235 / var(--tw-bg-opacity))
}button:active{--tw-bg-opacity:1;background-color:rgb(29 78 216 / var(--tw-bg-opacity))
}.update{margin-bottom:5rem;--tw-bg-opacity:1;background-color:rgb(34 197 94 / var(--tw-bg-opacity))
}.update:hover{--tw-bg-opacity:1;background-color:rgb(22 163 74 / var(--tw-bg-opacity))
}.update:active{--tw-bg-opacity:1;background-color:rgb(21 128 61 / var(--tw-bg-opacity))
}input{margin-right:0.75rem;margin-bottom:1rem;width:100%;border-style:solid;--tw-border-opacity:1;border-color:rgb(42 46 53 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(18 24 27 / var(--tw-bg-opacity));padding:0.75rem;font-family:sofia-pro, sans-serif;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));outline:2px solid transparent;outline-offset:2px
}</style>`,te(this,{target:this.shadowRoot,props:ee(this.attributes),customElement:!0},Pp,Op,Z,{},null),e&&e.target&&g(e.target,this,e.anchor)}}customElements.define("update-address",xp);function Lp(n){let e,t,r;return{c(){e=Pn("svg"),t=Pn("circle"),r=Pn("path"),this.c=E,b(t,"cx","12"),b(t,"cy","12"),b(t,"r","10"),b(t,"stroke","currentColor"),b(t,"stroke-width","4"),b(r,"fill","currentColor"),b(r,"d","M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"),b(e,"xmlns","http://www.w3.org/2000/svg"),b(e,"fill","none"),b(e,"viewBox","0 0 24 24")},m(i,s){g(i,e,s),f(e,t),f(e,r)},p:E,i:E,o:E,d(i){i&&w(e)}}}class Np extends Q{constructor(e){super(),this.shadowRoot.innerHTML=`<style>svg{margin-left:0.25rem;margin-right:0.25rem;width:0.875rem
}@keyframes spin{to{transform:rotate(360deg)
    }}svg{animation:spin 1s linear infinite
}circle{opacity:0.25
}path{opacity:0.75
}</style>`,te(this,{target:this.shadowRoot,props:ee(this.attributes),customElement:!0},null,Lp,Z,{},null),e&&e.target&&g(e.target,this,e.anchor)}}customElements.define("loading-spinner",Np);console.log(`%c  

d8888888P                            d8888b. 
     .d8'                                '88 
   .d8'   dP.  .dP .d8888b. .d8888b.  aaad8' 
 .d8'      '8bd8'  88'  '"" 88ooood8     '88 
d8'        .d88b.  88.  ... 88.  ...     .88 
Y8888888P dP'  'dP '88888P' '88888P' d88888P 
ooooooooooooooooooooooooooooooooooooooooooooo      
                                                 `,"font-family:monospace; color: orange;");window.addEventListener("flamethrower:router:end",n=>{Ef()});Af();Tf();const ir=ca({prefetch:"hover",log:!1});export{We as C,Ge as F,de as L,_n as S,Tt as _,Ma as a,Vl as b,Ze as c,Up as d,Mt as e,Fp as f,et as g,cr as h,Oe as i,Ds as j,Mp as k,dh as l,ze as r};
