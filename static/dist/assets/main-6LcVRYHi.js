var li={exports:{}},Kl={},si={exports:{}},ae={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qd;function gm(){if(qd)return ae;qd=1;var i=Symbol.for("react.element"),d=Symbol.for("react.portal"),u=Symbol.for("react.fragment"),v=Symbol.for("react.strict_mode"),y=Symbol.for("react.profiler"),E=Symbol.for("react.provider"),C=Symbol.for("react.context"),P=Symbol.for("react.forward_ref"),S=Symbol.for("react.suspense"),D=Symbol.for("react.memo"),B=Symbol.for("react.lazy"),z=Symbol.iterator;function G(p){return p===null||typeof p!="object"?null:(p=z&&p[z]||p["@@iterator"],typeof p=="function"?p:null)}var V={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},W=Object.assign,Q={};function Y(p,j,ee){this.props=p,this.context=j,this.refs=Q,this.updater=ee||V}Y.prototype.isReactComponent={},Y.prototype.setState=function(p,j){if(typeof p!="object"&&typeof p!="function"&&p!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,p,j,"setState")},Y.prototype.forceUpdate=function(p){this.updater.enqueueForceUpdate(this,p,"forceUpdate")};function ve(){}ve.prototype=Y.prototype;function _e(p,j,ee){this.props=p,this.context=j,this.refs=Q,this.updater=ee||V}var pe=_e.prototype=new ve;pe.constructor=_e,W(pe,Y.prototype),pe.isPureReactComponent=!0;var ie=Array.isArray,he=Object.prototype.hasOwnProperty,de={current:null},xe={key:!0,ref:!0,__self:!0,__source:!0};function U(p,j,ee){var X,ce={},re=null,te=null;if(j!=null)for(X in j.ref!==void 0&&(te=j.ref),j.key!==void 0&&(re=""+j.key),j)he.call(j,X)&&!xe.hasOwnProperty(X)&&(ce[X]=j[X]);var ue=arguments.length-2;if(ue===1)ce.children=ee;else if(1<ue){for(var we=Array(ue),Pe=0;Pe<ue;Pe++)we[Pe]=arguments[Pe+2];ce.children=we}if(p&&p.defaultProps)for(X in ue=p.defaultProps,ue)ce[X]===void 0&&(ce[X]=ue[X]);return{$$typeof:i,type:p,key:re,ref:te,props:ce,_owner:de.current}}function q(p,j){return{$$typeof:i,type:p.type,key:j,ref:p.ref,props:p.props,_owner:p._owner}}function ge(p){return typeof p=="object"&&p!==null&&p.$$typeof===i}function Ne(p){var j={"=":"=0",":":"=2"};return"$"+p.replace(/[=:]/g,function(ee){return j[ee]})}var je=/\/+/g;function be(p,j){return typeof p=="object"&&p!==null&&p.key!=null?Ne(""+p.key):j.toString(36)}function ke(p,j,ee,X,ce){var re=typeof p;(re==="undefined"||re==="boolean")&&(p=null);var te=!1;if(p===null)te=!0;else switch(re){case"string":case"number":te=!0;break;case"object":switch(p.$$typeof){case i:case d:te=!0}}if(te)return te=p,ce=ce(te),p=X===""?"."+be(te,0):X,ie(ce)?(ee="",p!=null&&(ee=p.replace(je,"$&/")+"/"),ke(ce,j,ee,"",function(Pe){return Pe})):ce!=null&&(ge(ce)&&(ce=q(ce,ee+(!ce.key||te&&te.key===ce.key?"":(""+ce.key).replace(je,"$&/")+"/")+p)),j.push(ce)),1;if(te=0,X=X===""?".":X+":",ie(p))for(var ue=0;ue<p.length;ue++){re=p[ue];var we=X+be(re,ue);te+=ke(re,j,ee,we,ce)}else if(we=G(p),typeof we=="function")for(p=we.call(p),ue=0;!(re=p.next()).done;)re=re.value,we=X+be(re,ue++),te+=ke(re,j,ee,we,ce);else if(re==="object")throw j=String(p),Error("Objects are not valid as a React child (found: "+(j==="[object Object]"?"object with keys {"+Object.keys(p).join(", ")+"}":j)+"). If you meant to render a collection of children, use an array instead.");return te}function H(p,j,ee){if(p==null)return p;var X=[],ce=0;return ke(p,X,"","",function(re){return j.call(ee,re,ce++)}),X}function ne(p){if(p._status===-1){var j=p._result;j=j(),j.then(function(ee){(p._status===0||p._status===-1)&&(p._status=1,p._result=ee)},function(ee){(p._status===0||p._status===-1)&&(p._status=2,p._result=ee)}),p._status===-1&&(p._status=0,p._result=j)}if(p._status===1)return p._result.default;throw p._result}var se={current:null},I={transition:null},O={ReactCurrentDispatcher:se,ReactCurrentBatchConfig:I,ReactCurrentOwner:de};function T(){throw Error("act(...) is not supported in production builds of React.")}return ae.Children={map:H,forEach:function(p,j,ee){H(p,function(){j.apply(this,arguments)},ee)},count:function(p){var j=0;return H(p,function(){j++}),j},toArray:function(p){return H(p,function(j){return j})||[]},only:function(p){if(!ge(p))throw Error("React.Children.only expected to receive a single React element child.");return p}},ae.Component=Y,ae.Fragment=u,ae.Profiler=y,ae.PureComponent=_e,ae.StrictMode=v,ae.Suspense=S,ae.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=O,ae.act=T,ae.cloneElement=function(p,j,ee){if(p==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+p+".");var X=W({},p.props),ce=p.key,re=p.ref,te=p._owner;if(j!=null){if(j.ref!==void 0&&(re=j.ref,te=de.current),j.key!==void 0&&(ce=""+j.key),p.type&&p.type.defaultProps)var ue=p.type.defaultProps;for(we in j)he.call(j,we)&&!xe.hasOwnProperty(we)&&(X[we]=j[we]===void 0&&ue!==void 0?ue[we]:j[we])}var we=arguments.length-2;if(we===1)X.children=ee;else if(1<we){ue=Array(we);for(var Pe=0;Pe<we;Pe++)ue[Pe]=arguments[Pe+2];X.children=ue}return{$$typeof:i,type:p.type,key:ce,ref:re,props:X,_owner:te}},ae.createContext=function(p){return p={$$typeof:C,_currentValue:p,_currentValue2:p,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},p.Provider={$$typeof:E,_context:p},p.Consumer=p},ae.createElement=U,ae.createFactory=function(p){var j=U.bind(null,p);return j.type=p,j},ae.createRef=function(){return{current:null}},ae.forwardRef=function(p){return{$$typeof:P,render:p}},ae.isValidElement=ge,ae.lazy=function(p){return{$$typeof:B,_payload:{_status:-1,_result:p},_init:ne}},ae.memo=function(p,j){return{$$typeof:D,type:p,compare:j===void 0?null:j}},ae.startTransition=function(p){var j=I.transition;I.transition={};try{p()}finally{I.transition=j}},ae.unstable_act=T,ae.useCallback=function(p,j){return se.current.useCallback(p,j)},ae.useContext=function(p){return se.current.useContext(p)},ae.useDebugValue=function(){},ae.useDeferredValue=function(p){return se.current.useDeferredValue(p)},ae.useEffect=function(p,j){return se.current.useEffect(p,j)},ae.useId=function(){return se.current.useId()},ae.useImperativeHandle=function(p,j,ee){return se.current.useImperativeHandle(p,j,ee)},ae.useInsertionEffect=function(p,j){return se.current.useInsertionEffect(p,j)},ae.useLayoutEffect=function(p,j){return se.current.useLayoutEffect(p,j)},ae.useMemo=function(p,j){return se.current.useMemo(p,j)},ae.useReducer=function(p,j,ee){return se.current.useReducer(p,j,ee)},ae.useRef=function(p){return se.current.useRef(p)},ae.useState=function(p){return se.current.useState(p)},ae.useSyncExternalStore=function(p,j,ee){return se.current.useSyncExternalStore(p,j,ee)},ae.useTransition=function(){return se.current.useTransition()},ae.version="18.3.1",ae}var Xd;function gi(){return Xd||(Xd=1,si.exports=gm()),si.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ec;function ym(){if(ec)return Kl;ec=1;var i=gi(),d=Symbol.for("react.element"),u=Symbol.for("react.fragment"),v=Object.prototype.hasOwnProperty,y=i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,E={key:!0,ref:!0,__self:!0,__source:!0};function C(P,S,D){var B,z={},G=null,V=null;D!==void 0&&(G=""+D),S.key!==void 0&&(G=""+S.key),S.ref!==void 0&&(V=S.ref);for(B in S)v.call(S,B)&&!E.hasOwnProperty(B)&&(z[B]=S[B]);if(P&&P.defaultProps)for(B in S=P.defaultProps,S)z[B]===void 0&&(z[B]=S[B]);return{$$typeof:d,type:P,key:G,ref:V,props:z,_owner:y.current}}return Kl.Fragment=u,Kl.jsx=C,Kl.jsxs=C,Kl}var tc;function vm(){return tc||(tc=1,li.exports=ym()),li.exports}var n=vm(),k=gi(),hr={},ri={exports:{}},nt={},ai={exports:{}},ii={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var nc;function jm(){return nc||(nc=1,(function(i){function d(I,O){var T=I.length;I.push(O);e:for(;0<T;){var p=T-1>>>1,j=I[p];if(0<y(j,O))I[p]=O,I[T]=j,T=p;else break e}}function u(I){return I.length===0?null:I[0]}function v(I){if(I.length===0)return null;var O=I[0],T=I.pop();if(T!==O){I[0]=T;e:for(var p=0,j=I.length,ee=j>>>1;p<ee;){var X=2*(p+1)-1,ce=I[X],re=X+1,te=I[re];if(0>y(ce,T))re<j&&0>y(te,ce)?(I[p]=te,I[re]=T,p=re):(I[p]=ce,I[X]=T,p=X);else if(re<j&&0>y(te,T))I[p]=te,I[re]=T,p=re;else break e}}return O}function y(I,O){var T=I.sortIndex-O.sortIndex;return T!==0?T:I.id-O.id}if(typeof performance=="object"&&typeof performance.now=="function"){var E=performance;i.unstable_now=function(){return E.now()}}else{var C=Date,P=C.now();i.unstable_now=function(){return C.now()-P}}var S=[],D=[],B=1,z=null,G=3,V=!1,W=!1,Q=!1,Y=typeof setTimeout=="function"?setTimeout:null,ve=typeof clearTimeout=="function"?clearTimeout:null,_e=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function pe(I){for(var O=u(D);O!==null;){if(O.callback===null)v(D);else if(O.startTime<=I)v(D),O.sortIndex=O.expirationTime,d(S,O);else break;O=u(D)}}function ie(I){if(Q=!1,pe(I),!W)if(u(S)!==null)W=!0,ne(he);else{var O=u(D);O!==null&&se(ie,O.startTime-I)}}function he(I,O){W=!1,Q&&(Q=!1,ve(U),U=-1),V=!0;var T=G;try{for(pe(O),z=u(S);z!==null&&(!(z.expirationTime>O)||I&&!Ne());){var p=z.callback;if(typeof p=="function"){z.callback=null,G=z.priorityLevel;var j=p(z.expirationTime<=O);O=i.unstable_now(),typeof j=="function"?z.callback=j:z===u(S)&&v(S),pe(O)}else v(S);z=u(S)}if(z!==null)var ee=!0;else{var X=u(D);X!==null&&se(ie,X.startTime-O),ee=!1}return ee}finally{z=null,G=T,V=!1}}var de=!1,xe=null,U=-1,q=5,ge=-1;function Ne(){return!(i.unstable_now()-ge<q)}function je(){if(xe!==null){var I=i.unstable_now();ge=I;var O=!0;try{O=xe(!0,I)}finally{O?be():(de=!1,xe=null)}}else de=!1}var be;if(typeof _e=="function")be=function(){_e(je)};else if(typeof MessageChannel<"u"){var ke=new MessageChannel,H=ke.port2;ke.port1.onmessage=je,be=function(){H.postMessage(null)}}else be=function(){Y(je,0)};function ne(I){xe=I,de||(de=!0,be())}function se(I,O){U=Y(function(){I(i.unstable_now())},O)}i.unstable_IdlePriority=5,i.unstable_ImmediatePriority=1,i.unstable_LowPriority=4,i.unstable_NormalPriority=3,i.unstable_Profiling=null,i.unstable_UserBlockingPriority=2,i.unstable_cancelCallback=function(I){I.callback=null},i.unstable_continueExecution=function(){W||V||(W=!0,ne(he))},i.unstable_forceFrameRate=function(I){0>I||125<I?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):q=0<I?Math.floor(1e3/I):5},i.unstable_getCurrentPriorityLevel=function(){return G},i.unstable_getFirstCallbackNode=function(){return u(S)},i.unstable_next=function(I){switch(G){case 1:case 2:case 3:var O=3;break;default:O=G}var T=G;G=O;try{return I()}finally{G=T}},i.unstable_pauseExecution=function(){},i.unstable_requestPaint=function(){},i.unstable_runWithPriority=function(I,O){switch(I){case 1:case 2:case 3:case 4:case 5:break;default:I=3}var T=G;G=I;try{return O()}finally{G=T}},i.unstable_scheduleCallback=function(I,O,T){var p=i.unstable_now();switch(typeof T=="object"&&T!==null?(T=T.delay,T=typeof T=="number"&&0<T?p+T:p):T=p,I){case 1:var j=-1;break;case 2:j=250;break;case 5:j=1073741823;break;case 4:j=1e4;break;default:j=5e3}return j=T+j,I={id:B++,callback:O,priorityLevel:I,startTime:T,expirationTime:j,sortIndex:-1},T>p?(I.sortIndex=T,d(D,I),u(S)===null&&I===u(D)&&(Q?(ve(U),U=-1):Q=!0,se(ie,T-p))):(I.sortIndex=j,d(S,I),W||V||(W=!0,ne(he))),I},i.unstable_shouldYield=Ne,i.unstable_wrapCallback=function(I){var O=G;return function(){var T=G;G=O;try{return I.apply(this,arguments)}finally{G=T}}}})(ii)),ii}var lc;function wm(){return lc||(lc=1,ai.exports=jm()),ai.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var sc;function Nm(){if(sc)return nt;sc=1;var i=gi(),d=wm();function u(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,l=1;l<arguments.length;l++)t+="&args[]="+encodeURIComponent(arguments[l]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var v=new Set,y={};function E(e,t){C(e,t),C(e+"Capture",t)}function C(e,t){for(y[e]=t,e=0;e<t.length;e++)v.add(t[e])}var P=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),S=Object.prototype.hasOwnProperty,D=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,B={},z={};function G(e){return S.call(z,e)?!0:S.call(B,e)?!1:D.test(e)?z[e]=!0:(B[e]=!0,!1)}function V(e,t,l,s){if(l!==null&&l.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return s?!1:l!==null?!l.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function W(e,t,l,s){if(t===null||typeof t>"u"||V(e,t,l,s))return!0;if(s)return!1;if(l!==null)switch(l.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Q(e,t,l,s,r,a,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=s,this.attributeNamespace=r,this.mustUseProperty=l,this.propertyName=e,this.type=t,this.sanitizeURL=a,this.removeEmptyString=o}var Y={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Y[e]=new Q(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Y[t]=new Q(t,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){Y[e]=new Q(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Y[e]=new Q(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Y[e]=new Q(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){Y[e]=new Q(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){Y[e]=new Q(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){Y[e]=new Q(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){Y[e]=new Q(e,5,!1,e.toLowerCase(),null,!1,!1)});var ve=/[\-:]([a-z])/g;function _e(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(ve,_e);Y[t]=new Q(t,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(ve,_e);Y[t]=new Q(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(ve,_e);Y[t]=new Q(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){Y[e]=new Q(e,1,!1,e.toLowerCase(),null,!1,!1)}),Y.xlinkHref=new Q("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){Y[e]=new Q(e,1,!1,e.toLowerCase(),null,!0,!0)});function pe(e,t,l,s){var r=Y.hasOwnProperty(t)?Y[t]:null;(r!==null?r.type!==0:s||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(W(t,l,r,s)&&(l=null),s||r===null?G(t)&&(l===null?e.removeAttribute(t):e.setAttribute(t,""+l)):r.mustUseProperty?e[r.propertyName]=l===null?r.type===3?!1:"":l:(t=r.attributeName,s=r.attributeNamespace,l===null?e.removeAttribute(t):(r=r.type,l=r===3||r===4&&l===!0?"":""+l,s?e.setAttributeNS(s,t,l):e.setAttribute(t,l))))}var ie=i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,he=Symbol.for("react.element"),de=Symbol.for("react.portal"),xe=Symbol.for("react.fragment"),U=Symbol.for("react.strict_mode"),q=Symbol.for("react.profiler"),ge=Symbol.for("react.provider"),Ne=Symbol.for("react.context"),je=Symbol.for("react.forward_ref"),be=Symbol.for("react.suspense"),ke=Symbol.for("react.suspense_list"),H=Symbol.for("react.memo"),ne=Symbol.for("react.lazy"),se=Symbol.for("react.offscreen"),I=Symbol.iterator;function O(e){return e===null||typeof e!="object"?null:(e=I&&e[I]||e["@@iterator"],typeof e=="function"?e:null)}var T=Object.assign,p;function j(e){if(p===void 0)try{throw Error()}catch(l){var t=l.stack.trim().match(/\n( *(at )?)/);p=t&&t[1]||""}return`
`+p+e}var ee=!1;function X(e,t){if(!e||ee)return"";ee=!0;var l=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(g){var s=g}Reflect.construct(e,[],t)}else{try{t.call()}catch(g){s=g}e.call(t.prototype)}else{try{throw Error()}catch(g){s=g}e()}}catch(g){if(g&&s&&typeof g.stack=="string"){for(var r=g.stack.split(`
`),a=s.stack.split(`
`),o=r.length-1,c=a.length-1;1<=o&&0<=c&&r[o]!==a[c];)c--;for(;1<=o&&0<=c;o--,c--)if(r[o]!==a[c]){if(o!==1||c!==1)do if(o--,c--,0>c||r[o]!==a[c]){var m=`
`+r[o].replace(" at new "," at ");return e.displayName&&m.includes("<anonymous>")&&(m=m.replace("<anonymous>",e.displayName)),m}while(1<=o&&0<=c);break}}}finally{ee=!1,Error.prepareStackTrace=l}return(e=e?e.displayName||e.name:"")?j(e):""}function ce(e){switch(e.tag){case 5:return j(e.type);case 16:return j("Lazy");case 13:return j("Suspense");case 19:return j("SuspenseList");case 0:case 2:case 15:return e=X(e.type,!1),e;case 11:return e=X(e.type.render,!1),e;case 1:return e=X(e.type,!0),e;default:return""}}function re(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case xe:return"Fragment";case de:return"Portal";case q:return"Profiler";case U:return"StrictMode";case be:return"Suspense";case ke:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Ne:return(e.displayName||"Context")+".Consumer";case ge:return(e._context.displayName||"Context")+".Provider";case je:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case H:return t=e.displayName||null,t!==null?t:re(e.type)||"Memo";case ne:t=e._payload,e=e._init;try{return re(e(t))}catch{}}return null}function te(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return re(t);case 8:return t===U?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function ue(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function we(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Pe(e){var t=we(e)?"checked":"value",l=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),s=""+e[t];if(!e.hasOwnProperty(t)&&typeof l<"u"&&typeof l.get=="function"&&typeof l.set=="function"){var r=l.get,a=l.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return r.call(this)},set:function(o){s=""+o,a.call(this,o)}}),Object.defineProperty(e,t,{enumerable:l.enumerable}),{getValue:function(){return s},setValue:function(o){s=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ln(e){e._valueTracker||(e._valueTracker=Pe(e))}function Ot(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var l=t.getValue(),s="";return e&&(s=we(e)?e.checked?"true":"false":e.value),e=s,e!==l?(t.setValue(e),!0):!1}function pn(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function hn(e,t){var l=t.checked;return T({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:l??e._wrapperState.initialChecked})}function Xl(e,t){var l=t.defaultValue==null?"":t.defaultValue,s=t.checked!=null?t.checked:t.defaultChecked;l=ue(t.value!=null?t.value:l),e._wrapperState={initialChecked:s,initialValue:l,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function al(e,t){t=t.checked,t!=null&&pe(e,"checked",t,!1)}function il(e,t){al(e,t);var l=ue(t.value),s=t.type;if(l!=null)s==="number"?(l===0&&e.value===""||e.value!=l)&&(e.value=""+l):e.value!==""+l&&(e.value=""+l);else if(s==="submit"||s==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?xn(e,t.type,l):t.hasOwnProperty("defaultValue")&&xn(e,t.type,ue(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function ol(e,t,l){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var s=t.type;if(!(s!=="submit"&&s!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,l||t===e.value||(e.value=t),e.defaultValue=t}l=e.name,l!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,l!==""&&(e.name=l)}function xn(e,t,l){(t!=="number"||pn(e.ownerDocument)!==e)&&(l==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+l&&(e.defaultValue=""+l))}var At=Array.isArray;function Vt(e,t,l,s){if(e=e.options,t){t={};for(var r=0;r<l.length;r++)t["$"+l[r]]=!0;for(l=0;l<e.length;l++)r=t.hasOwnProperty("$"+e[l].value),e[l].selected!==r&&(e[l].selected=r),r&&s&&(e[l].defaultSelected=!0)}else{for(l=""+ue(l),t=null,r=0;r<e.length;r++){if(e[r].value===l){e[r].selected=!0,s&&(e[r].defaultSelected=!0);return}t!==null||e[r].disabled||(t=e[r])}t!==null&&(t.selected=!0)}}function Tn(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(u(91));return T({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function es(e,t){var l=t.value;if(l==null){if(l=t.children,t=t.defaultValue,l!=null){if(t!=null)throw Error(u(92));if(At(l)){if(1<l.length)throw Error(u(93));l=l[0]}t=l}t==null&&(t=""),l=t}e._wrapperState={initialValue:ue(l)}}function dl(e,t){var l=ue(t.value),s=ue(t.defaultValue);l!=null&&(l=""+l,l!==e.value&&(e.value=l),t.defaultValue==null&&e.defaultValue!==l&&(e.defaultValue=l)),s!=null&&(e.defaultValue=""+s)}function cl(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function ts(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Bn(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?ts(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Rn,Ut=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,l,s,r){MSApp.execUnsafeLocalFunction(function(){return e(t,l,s,r)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Rn=Rn||document.createElement("div"),Rn.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Rn.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function bt(e,t){if(t){var l=e.firstChild;if(l&&l===e.lastChild&&l.nodeType===3){l.nodeValue=t;return}}e.textContent=t}var Ht={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},wr=["Webkit","ms","Moz","O"];Object.keys(Ht).forEach(function(e){wr.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Ht[t]=Ht[e]})});function ns(e,t,l){return t==null||typeof t=="boolean"||t===""?"":l||typeof t!="number"||t===0||Ht.hasOwnProperty(e)&&Ht[e]?(""+t).trim():t+"px"}function ls(e,t){e=e.style;for(var l in t)if(t.hasOwnProperty(l)){var s=l.indexOf("--")===0,r=ns(l,t[l],s);l==="float"&&(l="cssFloat"),s?e.setProperty(l,r):e[l]=r}}var It=T({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Fn(e,t){if(t){if(It[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(u(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(u(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(u(61))}if(t.style!=null&&typeof t.style!="object")throw Error(u(62))}}function ul(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ml=null;function fl(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var pl=null,Dt=null,Wt=null;function ss(e){if(e=Rl(e)){if(typeof pl!="function")throw Error(u(280));var t=e.stateNode;t&&(t=Ds(t),pl(e.stateNode,e.type,t))}}function rs(e){Dt?Wt?Wt.push(e):Wt=[e]:Dt=e}function as(){if(Dt){var e=Dt,t=Wt;if(Wt=Dt=null,ss(e),t)for(e=0;e<t.length;e++)ss(t[e])}}function is(e,t){return e(t)}function os(){}var hl=!1;function ds(e,t,l){if(hl)return e(t,l);hl=!0;try{return is(e,t,l)}finally{hl=!1,(Dt!==null||Wt!==null)&&(os(),as())}}function L(e,t){var l=e.stateNode;if(l===null)return null;var s=Ds(l);if(s===null)return null;l=s[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(e=e.type,s=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!s;break e;default:e=!1}if(e)return null;if(l&&typeof l!="function")throw Error(u(231,t,typeof l));return l}var le=!1;if(P)try{var oe={};Object.defineProperty(oe,"passive",{get:function(){le=!0}}),window.addEventListener("test",oe,oe),window.removeEventListener("test",oe,oe)}catch{le=!1}function ze(e,t,l,s,r,a,o,c,m){var g=Array.prototype.slice.call(arguments,3);try{t.apply(l,g)}catch(N){this.onError(N)}}var Qt=!1,Lt=null,gn=!1,Nr=null,Sc={onError:function(e){Qt=!0,Lt=e}};function _c(e,t,l,s,r,a,o,c,m){Qt=!1,Lt=null,ze.apply(Sc,arguments)}function kc(e,t,l,s,r,a,o,c,m){if(_c.apply(this,arguments),Qt){if(Qt){var g=Lt;Qt=!1,Lt=null}else throw Error(u(198));gn||(gn=!0,Nr=g)}}function yn(e){var t=e,l=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(l=t.return),e=t.return;while(e)}return t.tag===3?l:null}function ji(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function wi(e){if(yn(e)!==e)throw Error(u(188))}function Ec(e){var t=e.alternate;if(!t){if(t=yn(e),t===null)throw Error(u(188));return t!==e?null:e}for(var l=e,s=t;;){var r=l.return;if(r===null)break;var a=r.alternate;if(a===null){if(s=r.return,s!==null){l=s;continue}break}if(r.child===a.child){for(a=r.child;a;){if(a===l)return wi(r),e;if(a===s)return wi(r),t;a=a.sibling}throw Error(u(188))}if(l.return!==s.return)l=r,s=a;else{for(var o=!1,c=r.child;c;){if(c===l){o=!0,l=r,s=a;break}if(c===s){o=!0,s=r,l=a;break}c=c.sibling}if(!o){for(c=a.child;c;){if(c===l){o=!0,l=a,s=r;break}if(c===s){o=!0,s=a,l=r;break}c=c.sibling}if(!o)throw Error(u(189))}}if(l.alternate!==s)throw Error(u(190))}if(l.tag!==3)throw Error(u(188));return l.stateNode.current===l?e:t}function Ni(e){return e=Ec(e),e!==null?bi(e):null}function bi(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=bi(e);if(t!==null)return t;e=e.sibling}return null}var Si=d.unstable_scheduleCallback,_i=d.unstable_cancelCallback,Cc=d.unstable_shouldYield,Ic=d.unstable_requestPaint,Be=d.unstable_now,Dc=d.unstable_getCurrentPriorityLevel,br=d.unstable_ImmediatePriority,ki=d.unstable_UserBlockingPriority,cs=d.unstable_NormalPriority,Lc=d.unstable_LowPriority,Ei=d.unstable_IdlePriority,us=null,St=null;function Tc(e){if(St&&typeof St.onCommitFiberRoot=="function")try{St.onCommitFiberRoot(us,e,void 0,(e.current.flags&128)===128)}catch{}}var pt=Math.clz32?Math.clz32:Fc,Bc=Math.log,Rc=Math.LN2;function Fc(e){return e>>>=0,e===0?32:31-(Bc(e)/Rc|0)|0}var ms=64,fs=4194304;function xl(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function ps(e,t){var l=e.pendingLanes;if(l===0)return 0;var s=0,r=e.suspendedLanes,a=e.pingedLanes,o=l&268435455;if(o!==0){var c=o&~r;c!==0?s=xl(c):(a&=o,a!==0&&(s=xl(a)))}else o=l&~r,o!==0?s=xl(o):a!==0&&(s=xl(a));if(s===0)return 0;if(t!==0&&t!==s&&(t&r)===0&&(r=s&-s,a=t&-t,r>=a||r===16&&(a&4194240)!==0))return t;if((s&4)!==0&&(s|=l&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=s;0<t;)l=31-pt(t),r=1<<l,s|=e[l],t&=~r;return s}function Pc(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Mc(e,t){for(var l=e.suspendedLanes,s=e.pingedLanes,r=e.expirationTimes,a=e.pendingLanes;0<a;){var o=31-pt(a),c=1<<o,m=r[o];m===-1?((c&l)===0||(c&s)!==0)&&(r[o]=Pc(c,t)):m<=t&&(e.expiredLanes|=c),a&=~c}}function Sr(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Ci(){var e=ms;return ms<<=1,(ms&4194240)===0&&(ms=64),e}function _r(e){for(var t=[],l=0;31>l;l++)t.push(e);return t}function gl(e,t,l){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-pt(t),e[t]=l}function $c(e,t){var l=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var s=e.eventTimes;for(e=e.expirationTimes;0<l;){var r=31-pt(l),a=1<<r;t[r]=0,s[r]=-1,e[r]=-1,l&=~a}}function kr(e,t){var l=e.entangledLanes|=t;for(e=e.entanglements;l;){var s=31-pt(l),r=1<<s;r&t|e[s]&t&&(e[s]|=t),l&=~r}}var ye=0;function Ii(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var Di,Er,Li,Ti,Bi,Cr=!1,hs=[],Yt=null,Jt=null,Kt=null,yl=new Map,vl=new Map,Zt=[],zc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Ri(e,t){switch(e){case"focusin":case"focusout":Yt=null;break;case"dragenter":case"dragleave":Jt=null;break;case"mouseover":case"mouseout":Kt=null;break;case"pointerover":case"pointerout":yl.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":vl.delete(t.pointerId)}}function jl(e,t,l,s,r,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:l,eventSystemFlags:s,nativeEvent:a,targetContainers:[r]},t!==null&&(t=Rl(t),t!==null&&Er(t)),e):(e.eventSystemFlags|=s,t=e.targetContainers,r!==null&&t.indexOf(r)===-1&&t.push(r),e)}function Oc(e,t,l,s,r){switch(t){case"focusin":return Yt=jl(Yt,e,t,l,s,r),!0;case"dragenter":return Jt=jl(Jt,e,t,l,s,r),!0;case"mouseover":return Kt=jl(Kt,e,t,l,s,r),!0;case"pointerover":var a=r.pointerId;return yl.set(a,jl(yl.get(a)||null,e,t,l,s,r)),!0;case"gotpointercapture":return a=r.pointerId,vl.set(a,jl(vl.get(a)||null,e,t,l,s,r)),!0}return!1}function Fi(e){var t=vn(e.target);if(t!==null){var l=yn(t);if(l!==null){if(t=l.tag,t===13){if(t=ji(l),t!==null){e.blockedOn=t,Bi(e.priority,function(){Li(l)});return}}else if(t===3&&l.stateNode.current.memoizedState.isDehydrated){e.blockedOn=l.tag===3?l.stateNode.containerInfo:null;return}}}e.blockedOn=null}function xs(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var l=Dr(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(l===null){l=e.nativeEvent;var s=new l.constructor(l.type,l);ml=s,l.target.dispatchEvent(s),ml=null}else return t=Rl(l),t!==null&&Er(t),e.blockedOn=l,!1;t.shift()}return!0}function Pi(e,t,l){xs(e)&&l.delete(t)}function Ac(){Cr=!1,Yt!==null&&xs(Yt)&&(Yt=null),Jt!==null&&xs(Jt)&&(Jt=null),Kt!==null&&xs(Kt)&&(Kt=null),yl.forEach(Pi),vl.forEach(Pi)}function wl(e,t){e.blockedOn===t&&(e.blockedOn=null,Cr||(Cr=!0,d.unstable_scheduleCallback(d.unstable_NormalPriority,Ac)))}function Nl(e){function t(r){return wl(r,e)}if(0<hs.length){wl(hs[0],e);for(var l=1;l<hs.length;l++){var s=hs[l];s.blockedOn===e&&(s.blockedOn=null)}}for(Yt!==null&&wl(Yt,e),Jt!==null&&wl(Jt,e),Kt!==null&&wl(Kt,e),yl.forEach(t),vl.forEach(t),l=0;l<Zt.length;l++)s=Zt[l],s.blockedOn===e&&(s.blockedOn=null);for(;0<Zt.length&&(l=Zt[0],l.blockedOn===null);)Fi(l),l.blockedOn===null&&Zt.shift()}var Pn=ie.ReactCurrentBatchConfig,gs=!0;function Vc(e,t,l,s){var r=ye,a=Pn.transition;Pn.transition=null;try{ye=1,Ir(e,t,l,s)}finally{ye=r,Pn.transition=a}}function Uc(e,t,l,s){var r=ye,a=Pn.transition;Pn.transition=null;try{ye=4,Ir(e,t,l,s)}finally{ye=r,Pn.transition=a}}function Ir(e,t,l,s){if(gs){var r=Dr(e,t,l,s);if(r===null)Yr(e,t,s,ys,l),Ri(e,s);else if(Oc(r,e,t,l,s))s.stopPropagation();else if(Ri(e,s),t&4&&-1<zc.indexOf(e)){for(;r!==null;){var a=Rl(r);if(a!==null&&Di(a),a=Dr(e,t,l,s),a===null&&Yr(e,t,s,ys,l),a===r)break;r=a}r!==null&&s.stopPropagation()}else Yr(e,t,s,null,l)}}var ys=null;function Dr(e,t,l,s){if(ys=null,e=fl(s),e=vn(e),e!==null)if(t=yn(e),t===null)e=null;else if(l=t.tag,l===13){if(e=ji(t),e!==null)return e;e=null}else if(l===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return ys=e,null}function Mi(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Dc()){case br:return 1;case ki:return 4;case cs:case Lc:return 16;case Ei:return 536870912;default:return 16}default:return 16}}var Gt=null,Lr=null,vs=null;function $i(){if(vs)return vs;var e,t=Lr,l=t.length,s,r="value"in Gt?Gt.value:Gt.textContent,a=r.length;for(e=0;e<l&&t[e]===r[e];e++);var o=l-e;for(s=1;s<=o&&t[l-s]===r[a-s];s++);return vs=r.slice(e,1<s?1-s:void 0)}function js(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ws(){return!0}function zi(){return!1}function lt(e){function t(l,s,r,a,o){this._reactName=l,this._targetInst=r,this.type=s,this.nativeEvent=a,this.target=o,this.currentTarget=null;for(var c in e)e.hasOwnProperty(c)&&(l=e[c],this[c]=l?l(a):a[c]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?ws:zi,this.isPropagationStopped=zi,this}return T(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var l=this.nativeEvent;l&&(l.preventDefault?l.preventDefault():typeof l.returnValue!="unknown"&&(l.returnValue=!1),this.isDefaultPrevented=ws)},stopPropagation:function(){var l=this.nativeEvent;l&&(l.stopPropagation?l.stopPropagation():typeof l.cancelBubble!="unknown"&&(l.cancelBubble=!0),this.isPropagationStopped=ws)},persist:function(){},isPersistent:ws}),t}var Mn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Tr=lt(Mn),bl=T({},Mn,{view:0,detail:0}),Hc=lt(bl),Br,Rr,Sl,Ns=T({},bl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Pr,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Sl&&(Sl&&e.type==="mousemove"?(Br=e.screenX-Sl.screenX,Rr=e.screenY-Sl.screenY):Rr=Br=0,Sl=e),Br)},movementY:function(e){return"movementY"in e?e.movementY:Rr}}),Oi=lt(Ns),Wc=T({},Ns,{dataTransfer:0}),Qc=lt(Wc),Yc=T({},bl,{relatedTarget:0}),Fr=lt(Yc),Jc=T({},Mn,{animationName:0,elapsedTime:0,pseudoElement:0}),Kc=lt(Jc),Zc=T({},Mn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Gc=lt(Zc),qc=T({},Mn,{data:0}),Ai=lt(qc),Xc={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},eu={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},tu={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function nu(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=tu[e])?!!t[e]:!1}function Pr(){return nu}var lu=T({},bl,{key:function(e){if(e.key){var t=Xc[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=js(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?eu[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Pr,charCode:function(e){return e.type==="keypress"?js(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?js(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),su=lt(lu),ru=T({},Ns,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Vi=lt(ru),au=T({},bl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Pr}),iu=lt(au),ou=T({},Mn,{propertyName:0,elapsedTime:0,pseudoElement:0}),du=lt(ou),cu=T({},Ns,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),uu=lt(cu),mu=[9,13,27,32],Mr=P&&"CompositionEvent"in window,_l=null;P&&"documentMode"in document&&(_l=document.documentMode);var fu=P&&"TextEvent"in window&&!_l,Ui=P&&(!Mr||_l&&8<_l&&11>=_l),Hi=" ",Wi=!1;function Qi(e,t){switch(e){case"keyup":return mu.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Yi(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var $n=!1;function pu(e,t){switch(e){case"compositionend":return Yi(t);case"keypress":return t.which!==32?null:(Wi=!0,Hi);case"textInput":return e=t.data,e===Hi&&Wi?null:e;default:return null}}function hu(e,t){if($n)return e==="compositionend"||!Mr&&Qi(e,t)?(e=$i(),vs=Lr=Gt=null,$n=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Ui&&t.locale!=="ko"?null:t.data;default:return null}}var xu={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ji(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!xu[e.type]:t==="textarea"}function Ki(e,t,l,s){rs(s),t=Es(t,"onChange"),0<t.length&&(l=new Tr("onChange","change",null,l,s),e.push({event:l,listeners:t}))}var kl=null,El=null;function gu(e){po(e,0)}function bs(e){var t=Un(e);if(Ot(t))return e}function yu(e,t){if(e==="change")return t}var Zi=!1;if(P){var $r;if(P){var zr="oninput"in document;if(!zr){var Gi=document.createElement("div");Gi.setAttribute("oninput","return;"),zr=typeof Gi.oninput=="function"}$r=zr}else $r=!1;Zi=$r&&(!document.documentMode||9<document.documentMode)}function qi(){kl&&(kl.detachEvent("onpropertychange",Xi),El=kl=null)}function Xi(e){if(e.propertyName==="value"&&bs(El)){var t=[];Ki(t,El,e,fl(e)),ds(gu,t)}}function vu(e,t,l){e==="focusin"?(qi(),kl=t,El=l,kl.attachEvent("onpropertychange",Xi)):e==="focusout"&&qi()}function ju(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return bs(El)}function wu(e,t){if(e==="click")return bs(t)}function Nu(e,t){if(e==="input"||e==="change")return bs(t)}function bu(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var ht=typeof Object.is=="function"?Object.is:bu;function Cl(e,t){if(ht(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var l=Object.keys(e),s=Object.keys(t);if(l.length!==s.length)return!1;for(s=0;s<l.length;s++){var r=l[s];if(!S.call(t,r)||!ht(e[r],t[r]))return!1}return!0}function eo(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function to(e,t){var l=eo(e);e=0;for(var s;l;){if(l.nodeType===3){if(s=e+l.textContent.length,e<=t&&s>=t)return{node:l,offset:t-e};e=s}e:{for(;l;){if(l.nextSibling){l=l.nextSibling;break e}l=l.parentNode}l=void 0}l=eo(l)}}function no(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?no(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function lo(){for(var e=window,t=pn();t instanceof e.HTMLIFrameElement;){try{var l=typeof t.contentWindow.location.href=="string"}catch{l=!1}if(l)e=t.contentWindow;else break;t=pn(e.document)}return t}function Or(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Su(e){var t=lo(),l=e.focusedElem,s=e.selectionRange;if(t!==l&&l&&l.ownerDocument&&no(l.ownerDocument.documentElement,l)){if(s!==null&&Or(l)){if(t=s.start,e=s.end,e===void 0&&(e=t),"selectionStart"in l)l.selectionStart=t,l.selectionEnd=Math.min(e,l.value.length);else if(e=(t=l.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var r=l.textContent.length,a=Math.min(s.start,r);s=s.end===void 0?a:Math.min(s.end,r),!e.extend&&a>s&&(r=s,s=a,a=r),r=to(l,a);var o=to(l,s);r&&o&&(e.rangeCount!==1||e.anchorNode!==r.node||e.anchorOffset!==r.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(r.node,r.offset),e.removeAllRanges(),a>s?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=l;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof l.focus=="function"&&l.focus(),l=0;l<t.length;l++)e=t[l],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var _u=P&&"documentMode"in document&&11>=document.documentMode,zn=null,Ar=null,Il=null,Vr=!1;function so(e,t,l){var s=l.window===l?l.document:l.nodeType===9?l:l.ownerDocument;Vr||zn==null||zn!==pn(s)||(s=zn,"selectionStart"in s&&Or(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),Il&&Cl(Il,s)||(Il=s,s=Es(Ar,"onSelect"),0<s.length&&(t=new Tr("onSelect","select",null,t,l),e.push({event:t,listeners:s}),t.target=zn)))}function Ss(e,t){var l={};return l[e.toLowerCase()]=t.toLowerCase(),l["Webkit"+e]="webkit"+t,l["Moz"+e]="moz"+t,l}var On={animationend:Ss("Animation","AnimationEnd"),animationiteration:Ss("Animation","AnimationIteration"),animationstart:Ss("Animation","AnimationStart"),transitionend:Ss("Transition","TransitionEnd")},Ur={},ro={};P&&(ro=document.createElement("div").style,"AnimationEvent"in window||(delete On.animationend.animation,delete On.animationiteration.animation,delete On.animationstart.animation),"TransitionEvent"in window||delete On.transitionend.transition);function _s(e){if(Ur[e])return Ur[e];if(!On[e])return e;var t=On[e],l;for(l in t)if(t.hasOwnProperty(l)&&l in ro)return Ur[e]=t[l];return e}var ao=_s("animationend"),io=_s("animationiteration"),oo=_s("animationstart"),co=_s("transitionend"),uo=new Map,mo="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function qt(e,t){uo.set(e,t),E(t,[e])}for(var Hr=0;Hr<mo.length;Hr++){var Wr=mo[Hr],ku=Wr.toLowerCase(),Eu=Wr[0].toUpperCase()+Wr.slice(1);qt(ku,"on"+Eu)}qt(ao,"onAnimationEnd"),qt(io,"onAnimationIteration"),qt(oo,"onAnimationStart"),qt("dblclick","onDoubleClick"),qt("focusin","onFocus"),qt("focusout","onBlur"),qt(co,"onTransitionEnd"),C("onMouseEnter",["mouseout","mouseover"]),C("onMouseLeave",["mouseout","mouseover"]),C("onPointerEnter",["pointerout","pointerover"]),C("onPointerLeave",["pointerout","pointerover"]),E("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),E("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),E("onBeforeInput",["compositionend","keypress","textInput","paste"]),E("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),E("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),E("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Dl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Cu=new Set("cancel close invalid load scroll toggle".split(" ").concat(Dl));function fo(e,t,l){var s=e.type||"unknown-event";e.currentTarget=l,kc(s,t,void 0,e),e.currentTarget=null}function po(e,t){t=(t&4)!==0;for(var l=0;l<e.length;l++){var s=e[l],r=s.event;s=s.listeners;e:{var a=void 0;if(t)for(var o=s.length-1;0<=o;o--){var c=s[o],m=c.instance,g=c.currentTarget;if(c=c.listener,m!==a&&r.isPropagationStopped())break e;fo(r,c,g),a=m}else for(o=0;o<s.length;o++){if(c=s[o],m=c.instance,g=c.currentTarget,c=c.listener,m!==a&&r.isPropagationStopped())break e;fo(r,c,g),a=m}}}if(gn)throw e=Nr,gn=!1,Nr=null,e}function Ee(e,t){var l=t[Xr];l===void 0&&(l=t[Xr]=new Set);var s=e+"__bubble";l.has(s)||(ho(t,e,2,!1),l.add(s))}function Qr(e,t,l){var s=0;t&&(s|=4),ho(l,e,s,t)}var ks="_reactListening"+Math.random().toString(36).slice(2);function Ll(e){if(!e[ks]){e[ks]=!0,v.forEach(function(l){l!=="selectionchange"&&(Cu.has(l)||Qr(l,!1,e),Qr(l,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[ks]||(t[ks]=!0,Qr("selectionchange",!1,t))}}function ho(e,t,l,s){switch(Mi(t)){case 1:var r=Vc;break;case 4:r=Uc;break;default:r=Ir}l=r.bind(null,t,l,e),r=void 0,!le||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(r=!0),s?r!==void 0?e.addEventListener(t,l,{capture:!0,passive:r}):e.addEventListener(t,l,!0):r!==void 0?e.addEventListener(t,l,{passive:r}):e.addEventListener(t,l,!1)}function Yr(e,t,l,s,r){var a=s;if((t&1)===0&&(t&2)===0&&s!==null)e:for(;;){if(s===null)return;var o=s.tag;if(o===3||o===4){var c=s.stateNode.containerInfo;if(c===r||c.nodeType===8&&c.parentNode===r)break;if(o===4)for(o=s.return;o!==null;){var m=o.tag;if((m===3||m===4)&&(m=o.stateNode.containerInfo,m===r||m.nodeType===8&&m.parentNode===r))return;o=o.return}for(;c!==null;){if(o=vn(c),o===null)return;if(m=o.tag,m===5||m===6){s=a=o;continue e}c=c.parentNode}}s=s.return}ds(function(){var g=a,N=fl(l),b=[];e:{var w=uo.get(e);if(w!==void 0){var R=Tr,M=e;switch(e){case"keypress":if(js(l)===0)break e;case"keydown":case"keyup":R=su;break;case"focusin":M="focus",R=Fr;break;case"focusout":M="blur",R=Fr;break;case"beforeblur":case"afterblur":R=Fr;break;case"click":if(l.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":R=Oi;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":R=Qc;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":R=iu;break;case ao:case io:case oo:R=Kc;break;case co:R=du;break;case"scroll":R=Hc;break;case"wheel":R=uu;break;case"copy":case"cut":case"paste":R=Gc;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":R=Vi}var $=(t&4)!==0,Re=!$&&e==="scroll",h=$?w!==null?w+"Capture":null:w;$=[];for(var f=g,x;f!==null;){x=f;var _=x.stateNode;if(x.tag===5&&_!==null&&(x=_,h!==null&&(_=L(f,h),_!=null&&$.push(Tl(f,_,x)))),Re)break;f=f.return}0<$.length&&(w=new R(w,M,null,l,N),b.push({event:w,listeners:$}))}}if((t&7)===0){e:{if(w=e==="mouseover"||e==="pointerover",R=e==="mouseout"||e==="pointerout",w&&l!==ml&&(M=l.relatedTarget||l.fromElement)&&(vn(M)||M[Tt]))break e;if((R||w)&&(w=N.window===N?N:(w=N.ownerDocument)?w.defaultView||w.parentWindow:window,R?(M=l.relatedTarget||l.toElement,R=g,M=M?vn(M):null,M!==null&&(Re=yn(M),M!==Re||M.tag!==5&&M.tag!==6)&&(M=null)):(R=null,M=g),R!==M)){if($=Oi,_="onMouseLeave",h="onMouseEnter",f="mouse",(e==="pointerout"||e==="pointerover")&&($=Vi,_="onPointerLeave",h="onPointerEnter",f="pointer"),Re=R==null?w:Un(R),x=M==null?w:Un(M),w=new $(_,f+"leave",R,l,N),w.target=Re,w.relatedTarget=x,_=null,vn(N)===g&&($=new $(h,f+"enter",M,l,N),$.target=x,$.relatedTarget=Re,_=$),Re=_,R&&M)t:{for($=R,h=M,f=0,x=$;x;x=An(x))f++;for(x=0,_=h;_;_=An(_))x++;for(;0<f-x;)$=An($),f--;for(;0<x-f;)h=An(h),x--;for(;f--;){if($===h||h!==null&&$===h.alternate)break t;$=An($),h=An(h)}$=null}else $=null;R!==null&&xo(b,w,R,$,!1),M!==null&&Re!==null&&xo(b,Re,M,$,!0)}}e:{if(w=g?Un(g):window,R=w.nodeName&&w.nodeName.toLowerCase(),R==="select"||R==="input"&&w.type==="file")var A=yu;else if(Ji(w))if(Zi)A=Nu;else{A=ju;var J=vu}else(R=w.nodeName)&&R.toLowerCase()==="input"&&(w.type==="checkbox"||w.type==="radio")&&(A=wu);if(A&&(A=A(e,g))){Ki(b,A,l,N);break e}J&&J(e,w,g),e==="focusout"&&(J=w._wrapperState)&&J.controlled&&w.type==="number"&&xn(w,"number",w.value)}switch(J=g?Un(g):window,e){case"focusin":(Ji(J)||J.contentEditable==="true")&&(zn=J,Ar=g,Il=null);break;case"focusout":Il=Ar=zn=null;break;case"mousedown":Vr=!0;break;case"contextmenu":case"mouseup":case"dragend":Vr=!1,so(b,l,N);break;case"selectionchange":if(_u)break;case"keydown":case"keyup":so(b,l,N)}var K;if(Mr)e:{switch(e){case"compositionstart":var Z="onCompositionStart";break e;case"compositionend":Z="onCompositionEnd";break e;case"compositionupdate":Z="onCompositionUpdate";break e}Z=void 0}else $n?Qi(e,l)&&(Z="onCompositionEnd"):e==="keydown"&&l.keyCode===229&&(Z="onCompositionStart");Z&&(Ui&&l.locale!=="ko"&&($n||Z!=="onCompositionStart"?Z==="onCompositionEnd"&&$n&&(K=$i()):(Gt=N,Lr="value"in Gt?Gt.value:Gt.textContent,$n=!0)),J=Es(g,Z),0<J.length&&(Z=new Ai(Z,e,null,l,N),b.push({event:Z,listeners:J}),K?Z.data=K:(K=Yi(l),K!==null&&(Z.data=K)))),(K=fu?pu(e,l):hu(e,l))&&(g=Es(g,"onBeforeInput"),0<g.length&&(N=new Ai("onBeforeInput","beforeinput",null,l,N),b.push({event:N,listeners:g}),N.data=K))}po(b,t)})}function Tl(e,t,l){return{instance:e,listener:t,currentTarget:l}}function Es(e,t){for(var l=t+"Capture",s=[];e!==null;){var r=e,a=r.stateNode;r.tag===5&&a!==null&&(r=a,a=L(e,l),a!=null&&s.unshift(Tl(e,a,r)),a=L(e,t),a!=null&&s.push(Tl(e,a,r))),e=e.return}return s}function An(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function xo(e,t,l,s,r){for(var a=t._reactName,o=[];l!==null&&l!==s;){var c=l,m=c.alternate,g=c.stateNode;if(m!==null&&m===s)break;c.tag===5&&g!==null&&(c=g,r?(m=L(l,a),m!=null&&o.unshift(Tl(l,m,c))):r||(m=L(l,a),m!=null&&o.push(Tl(l,m,c)))),l=l.return}o.length!==0&&e.push({event:t,listeners:o})}var Iu=/\r\n?/g,Du=/\u0000|\uFFFD/g;function go(e){return(typeof e=="string"?e:""+e).replace(Iu,`
`).replace(Du,"")}function Cs(e,t,l){if(t=go(t),go(e)!==t&&l)throw Error(u(425))}function Is(){}var Jr=null,Kr=null;function Zr(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Gr=typeof setTimeout=="function"?setTimeout:void 0,Lu=typeof clearTimeout=="function"?clearTimeout:void 0,yo=typeof Promise=="function"?Promise:void 0,Tu=typeof queueMicrotask=="function"?queueMicrotask:typeof yo<"u"?function(e){return yo.resolve(null).then(e).catch(Bu)}:Gr;function Bu(e){setTimeout(function(){throw e})}function qr(e,t){var l=t,s=0;do{var r=l.nextSibling;if(e.removeChild(l),r&&r.nodeType===8)if(l=r.data,l==="/$"){if(s===0){e.removeChild(r),Nl(t);return}s--}else l!=="$"&&l!=="$?"&&l!=="$!"||s++;l=r}while(l);Nl(t)}function Xt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function vo(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var l=e.data;if(l==="$"||l==="$!"||l==="$?"){if(t===0)return e;t--}else l==="/$"&&t++}e=e.previousSibling}return null}var Vn=Math.random().toString(36).slice(2),_t="__reactFiber$"+Vn,Bl="__reactProps$"+Vn,Tt="__reactContainer$"+Vn,Xr="__reactEvents$"+Vn,Ru="__reactListeners$"+Vn,Fu="__reactHandles$"+Vn;function vn(e){var t=e[_t];if(t)return t;for(var l=e.parentNode;l;){if(t=l[Tt]||l[_t]){if(l=t.alternate,t.child!==null||l!==null&&l.child!==null)for(e=vo(e);e!==null;){if(l=e[_t])return l;e=vo(e)}return t}e=l,l=e.parentNode}return null}function Rl(e){return e=e[_t]||e[Tt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Un(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(u(33))}function Ds(e){return e[Bl]||null}var ea=[],Hn=-1;function en(e){return{current:e}}function Ce(e){0>Hn||(e.current=ea[Hn],ea[Hn]=null,Hn--)}function Se(e,t){Hn++,ea[Hn]=e.current,e.current=t}var tn={},We=en(tn),Ge=en(!1),jn=tn;function Wn(e,t){var l=e.type.contextTypes;if(!l)return tn;var s=e.stateNode;if(s&&s.__reactInternalMemoizedUnmaskedChildContext===t)return s.__reactInternalMemoizedMaskedChildContext;var r={},a;for(a in l)r[a]=t[a];return s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=r),r}function qe(e){return e=e.childContextTypes,e!=null}function Ls(){Ce(Ge),Ce(We)}function jo(e,t,l){if(We.current!==tn)throw Error(u(168));Se(We,t),Se(Ge,l)}function wo(e,t,l){var s=e.stateNode;if(t=t.childContextTypes,typeof s.getChildContext!="function")return l;s=s.getChildContext();for(var r in s)if(!(r in t))throw Error(u(108,te(e)||"Unknown",r));return T({},l,s)}function Ts(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||tn,jn=We.current,Se(We,e),Se(Ge,Ge.current),!0}function No(e,t,l){var s=e.stateNode;if(!s)throw Error(u(169));l?(e=wo(e,t,jn),s.__reactInternalMemoizedMergedChildContext=e,Ce(Ge),Ce(We),Se(We,e)):Ce(Ge),Se(Ge,l)}var Bt=null,Bs=!1,ta=!1;function bo(e){Bt===null?Bt=[e]:Bt.push(e)}function Pu(e){Bs=!0,bo(e)}function nn(){if(!ta&&Bt!==null){ta=!0;var e=0,t=ye;try{var l=Bt;for(ye=1;e<l.length;e++){var s=l[e];do s=s(!0);while(s!==null)}Bt=null,Bs=!1}catch(r){throw Bt!==null&&(Bt=Bt.slice(e+1)),Si(br,nn),r}finally{ye=t,ta=!1}}return null}var Qn=[],Yn=0,Rs=null,Fs=0,it=[],ot=0,wn=null,Rt=1,Ft="";function Nn(e,t){Qn[Yn++]=Fs,Qn[Yn++]=Rs,Rs=e,Fs=t}function So(e,t,l){it[ot++]=Rt,it[ot++]=Ft,it[ot++]=wn,wn=e;var s=Rt;e=Ft;var r=32-pt(s)-1;s&=~(1<<r),l+=1;var a=32-pt(t)+r;if(30<a){var o=r-r%5;a=(s&(1<<o)-1).toString(32),s>>=o,r-=o,Rt=1<<32-pt(t)+r|l<<r|s,Ft=a+e}else Rt=1<<a|l<<r|s,Ft=e}function na(e){e.return!==null&&(Nn(e,1),So(e,1,0))}function la(e){for(;e===Rs;)Rs=Qn[--Yn],Qn[Yn]=null,Fs=Qn[--Yn],Qn[Yn]=null;for(;e===wn;)wn=it[--ot],it[ot]=null,Ft=it[--ot],it[ot]=null,Rt=it[--ot],it[ot]=null}var st=null,rt=null,Ie=!1,xt=null;function _o(e,t){var l=mt(5,null,null,0);l.elementType="DELETED",l.stateNode=t,l.return=e,t=e.deletions,t===null?(e.deletions=[l],e.flags|=16):t.push(l)}function ko(e,t){switch(e.tag){case 5:var l=e.type;return t=t.nodeType!==1||l.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,st=e,rt=Xt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,st=e,rt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(l=wn!==null?{id:Rt,overflow:Ft}:null,e.memoizedState={dehydrated:t,treeContext:l,retryLane:1073741824},l=mt(18,null,null,0),l.stateNode=t,l.return=e,e.child=l,st=e,rt=null,!0):!1;default:return!1}}function sa(e){return(e.mode&1)!==0&&(e.flags&128)===0}function ra(e){if(Ie){var t=rt;if(t){var l=t;if(!ko(e,t)){if(sa(e))throw Error(u(418));t=Xt(l.nextSibling);var s=st;t&&ko(e,t)?_o(s,l):(e.flags=e.flags&-4097|2,Ie=!1,st=e)}}else{if(sa(e))throw Error(u(418));e.flags=e.flags&-4097|2,Ie=!1,st=e}}}function Eo(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;st=e}function Ps(e){if(e!==st)return!1;if(!Ie)return Eo(e),Ie=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Zr(e.type,e.memoizedProps)),t&&(t=rt)){if(sa(e))throw Co(),Error(u(418));for(;t;)_o(e,t),t=Xt(t.nextSibling)}if(Eo(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(u(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var l=e.data;if(l==="/$"){if(t===0){rt=Xt(e.nextSibling);break e}t--}else l!=="$"&&l!=="$!"&&l!=="$?"||t++}e=e.nextSibling}rt=null}}else rt=st?Xt(e.stateNode.nextSibling):null;return!0}function Co(){for(var e=rt;e;)e=Xt(e.nextSibling)}function Jn(){rt=st=null,Ie=!1}function aa(e){xt===null?xt=[e]:xt.push(e)}var Mu=ie.ReactCurrentBatchConfig;function Fl(e,t,l){if(e=l.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(l._owner){if(l=l._owner,l){if(l.tag!==1)throw Error(u(309));var s=l.stateNode}if(!s)throw Error(u(147,e));var r=s,a=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===a?t.ref:(t=function(o){var c=r.refs;o===null?delete c[a]:c[a]=o},t._stringRef=a,t)}if(typeof e!="string")throw Error(u(284));if(!l._owner)throw Error(u(290,e))}return e}function Ms(e,t){throw e=Object.prototype.toString.call(t),Error(u(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Io(e){var t=e._init;return t(e._payload)}function Do(e){function t(h,f){if(e){var x=h.deletions;x===null?(h.deletions=[f],h.flags|=16):x.push(f)}}function l(h,f){if(!e)return null;for(;f!==null;)t(h,f),f=f.sibling;return null}function s(h,f){for(h=new Map;f!==null;)f.key!==null?h.set(f.key,f):h.set(f.index,f),f=f.sibling;return h}function r(h,f){return h=un(h,f),h.index=0,h.sibling=null,h}function a(h,f,x){return h.index=x,e?(x=h.alternate,x!==null?(x=x.index,x<f?(h.flags|=2,f):x):(h.flags|=2,f)):(h.flags|=1048576,f)}function o(h){return e&&h.alternate===null&&(h.flags|=2),h}function c(h,f,x,_){return f===null||f.tag!==6?(f=Ga(x,h.mode,_),f.return=h,f):(f=r(f,x),f.return=h,f)}function m(h,f,x,_){var A=x.type;return A===xe?N(h,f,x.props.children,_,x.key):f!==null&&(f.elementType===A||typeof A=="object"&&A!==null&&A.$$typeof===ne&&Io(A)===f.type)?(_=r(f,x.props),_.ref=Fl(h,f,x),_.return=h,_):(_=ir(x.type,x.key,x.props,null,h.mode,_),_.ref=Fl(h,f,x),_.return=h,_)}function g(h,f,x,_){return f===null||f.tag!==4||f.stateNode.containerInfo!==x.containerInfo||f.stateNode.implementation!==x.implementation?(f=qa(x,h.mode,_),f.return=h,f):(f=r(f,x.children||[]),f.return=h,f)}function N(h,f,x,_,A){return f===null||f.tag!==7?(f=Dn(x,h.mode,_,A),f.return=h,f):(f=r(f,x),f.return=h,f)}function b(h,f,x){if(typeof f=="string"&&f!==""||typeof f=="number")return f=Ga(""+f,h.mode,x),f.return=h,f;if(typeof f=="object"&&f!==null){switch(f.$$typeof){case he:return x=ir(f.type,f.key,f.props,null,h.mode,x),x.ref=Fl(h,null,f),x.return=h,x;case de:return f=qa(f,h.mode,x),f.return=h,f;case ne:var _=f._init;return b(h,_(f._payload),x)}if(At(f)||O(f))return f=Dn(f,h.mode,x,null),f.return=h,f;Ms(h,f)}return null}function w(h,f,x,_){var A=f!==null?f.key:null;if(typeof x=="string"&&x!==""||typeof x=="number")return A!==null?null:c(h,f,""+x,_);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case he:return x.key===A?m(h,f,x,_):null;case de:return x.key===A?g(h,f,x,_):null;case ne:return A=x._init,w(h,f,A(x._payload),_)}if(At(x)||O(x))return A!==null?null:N(h,f,x,_,null);Ms(h,x)}return null}function R(h,f,x,_,A){if(typeof _=="string"&&_!==""||typeof _=="number")return h=h.get(x)||null,c(f,h,""+_,A);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case he:return h=h.get(_.key===null?x:_.key)||null,m(f,h,_,A);case de:return h=h.get(_.key===null?x:_.key)||null,g(f,h,_,A);case ne:var J=_._init;return R(h,f,x,J(_._payload),A)}if(At(_)||O(_))return h=h.get(x)||null,N(f,h,_,A,null);Ms(f,_)}return null}function M(h,f,x,_){for(var A=null,J=null,K=f,Z=f=0,Ve=null;K!==null&&Z<x.length;Z++){K.index>Z?(Ve=K,K=null):Ve=K.sibling;var fe=w(h,K,x[Z],_);if(fe===null){K===null&&(K=Ve);break}e&&K&&fe.alternate===null&&t(h,K),f=a(fe,f,Z),J===null?A=fe:J.sibling=fe,J=fe,K=Ve}if(Z===x.length)return l(h,K),Ie&&Nn(h,Z),A;if(K===null){for(;Z<x.length;Z++)K=b(h,x[Z],_),K!==null&&(f=a(K,f,Z),J===null?A=K:J.sibling=K,J=K);return Ie&&Nn(h,Z),A}for(K=s(h,K);Z<x.length;Z++)Ve=R(K,h,Z,x[Z],_),Ve!==null&&(e&&Ve.alternate!==null&&K.delete(Ve.key===null?Z:Ve.key),f=a(Ve,f,Z),J===null?A=Ve:J.sibling=Ve,J=Ve);return e&&K.forEach(function(mn){return t(h,mn)}),Ie&&Nn(h,Z),A}function $(h,f,x,_){var A=O(x);if(typeof A!="function")throw Error(u(150));if(x=A.call(x),x==null)throw Error(u(151));for(var J=A=null,K=f,Z=f=0,Ve=null,fe=x.next();K!==null&&!fe.done;Z++,fe=x.next()){K.index>Z?(Ve=K,K=null):Ve=K.sibling;var mn=w(h,K,fe.value,_);if(mn===null){K===null&&(K=Ve);break}e&&K&&mn.alternate===null&&t(h,K),f=a(mn,f,Z),J===null?A=mn:J.sibling=mn,J=mn,K=Ve}if(fe.done)return l(h,K),Ie&&Nn(h,Z),A;if(K===null){for(;!fe.done;Z++,fe=x.next())fe=b(h,fe.value,_),fe!==null&&(f=a(fe,f,Z),J===null?A=fe:J.sibling=fe,J=fe);return Ie&&Nn(h,Z),A}for(K=s(h,K);!fe.done;Z++,fe=x.next())fe=R(K,h,Z,fe.value,_),fe!==null&&(e&&fe.alternate!==null&&K.delete(fe.key===null?Z:fe.key),f=a(fe,f,Z),J===null?A=fe:J.sibling=fe,J=fe);return e&&K.forEach(function(xm){return t(h,xm)}),Ie&&Nn(h,Z),A}function Re(h,f,x,_){if(typeof x=="object"&&x!==null&&x.type===xe&&x.key===null&&(x=x.props.children),typeof x=="object"&&x!==null){switch(x.$$typeof){case he:e:{for(var A=x.key,J=f;J!==null;){if(J.key===A){if(A=x.type,A===xe){if(J.tag===7){l(h,J.sibling),f=r(J,x.props.children),f.return=h,h=f;break e}}else if(J.elementType===A||typeof A=="object"&&A!==null&&A.$$typeof===ne&&Io(A)===J.type){l(h,J.sibling),f=r(J,x.props),f.ref=Fl(h,J,x),f.return=h,h=f;break e}l(h,J);break}else t(h,J);J=J.sibling}x.type===xe?(f=Dn(x.props.children,h.mode,_,x.key),f.return=h,h=f):(_=ir(x.type,x.key,x.props,null,h.mode,_),_.ref=Fl(h,f,x),_.return=h,h=_)}return o(h);case de:e:{for(J=x.key;f!==null;){if(f.key===J)if(f.tag===4&&f.stateNode.containerInfo===x.containerInfo&&f.stateNode.implementation===x.implementation){l(h,f.sibling),f=r(f,x.children||[]),f.return=h,h=f;break e}else{l(h,f);break}else t(h,f);f=f.sibling}f=qa(x,h.mode,_),f.return=h,h=f}return o(h);case ne:return J=x._init,Re(h,f,J(x._payload),_)}if(At(x))return M(h,f,x,_);if(O(x))return $(h,f,x,_);Ms(h,x)}return typeof x=="string"&&x!==""||typeof x=="number"?(x=""+x,f!==null&&f.tag===6?(l(h,f.sibling),f=r(f,x),f.return=h,h=f):(l(h,f),f=Ga(x,h.mode,_),f.return=h,h=f),o(h)):l(h,f)}return Re}var Kn=Do(!0),Lo=Do(!1),$s=en(null),zs=null,Zn=null,ia=null;function oa(){ia=Zn=zs=null}function da(e){var t=$s.current;Ce($s),e._currentValue=t}function ca(e,t,l){for(;e!==null;){var s=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,s!==null&&(s.childLanes|=t)):s!==null&&(s.childLanes&t)!==t&&(s.childLanes|=t),e===l)break;e=e.return}}function Gn(e,t){zs=e,ia=Zn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(Xe=!0),e.firstContext=null)}function dt(e){var t=e._currentValue;if(ia!==e)if(e={context:e,memoizedValue:t,next:null},Zn===null){if(zs===null)throw Error(u(308));Zn=e,zs.dependencies={lanes:0,firstContext:e}}else Zn=Zn.next=e;return t}var bn=null;function ua(e){bn===null?bn=[e]:bn.push(e)}function To(e,t,l,s){var r=t.interleaved;return r===null?(l.next=l,ua(t)):(l.next=r.next,r.next=l),t.interleaved=l,Pt(e,s)}function Pt(e,t){e.lanes|=t;var l=e.alternate;for(l!==null&&(l.lanes|=t),l=e,e=e.return;e!==null;)e.childLanes|=t,l=e.alternate,l!==null&&(l.childLanes|=t),l=e,e=e.return;return l.tag===3?l.stateNode:null}var ln=!1;function ma(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Bo(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Mt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function sn(e,t,l){var s=e.updateQueue;if(s===null)return null;if(s=s.shared,(me&2)!==0){var r=s.pending;return r===null?t.next=t:(t.next=r.next,r.next=t),s.pending=t,Pt(e,l)}return r=s.interleaved,r===null?(t.next=t,ua(s)):(t.next=r.next,r.next=t),s.interleaved=t,Pt(e,l)}function Os(e,t,l){if(t=t.updateQueue,t!==null&&(t=t.shared,(l&4194240)!==0)){var s=t.lanes;s&=e.pendingLanes,l|=s,t.lanes=l,kr(e,l)}}function Ro(e,t){var l=e.updateQueue,s=e.alternate;if(s!==null&&(s=s.updateQueue,l===s)){var r=null,a=null;if(l=l.firstBaseUpdate,l!==null){do{var o={eventTime:l.eventTime,lane:l.lane,tag:l.tag,payload:l.payload,callback:l.callback,next:null};a===null?r=a=o:a=a.next=o,l=l.next}while(l!==null);a===null?r=a=t:a=a.next=t}else r=a=t;l={baseState:s.baseState,firstBaseUpdate:r,lastBaseUpdate:a,shared:s.shared,effects:s.effects},e.updateQueue=l;return}e=l.lastBaseUpdate,e===null?l.firstBaseUpdate=t:e.next=t,l.lastBaseUpdate=t}function As(e,t,l,s){var r=e.updateQueue;ln=!1;var a=r.firstBaseUpdate,o=r.lastBaseUpdate,c=r.shared.pending;if(c!==null){r.shared.pending=null;var m=c,g=m.next;m.next=null,o===null?a=g:o.next=g,o=m;var N=e.alternate;N!==null&&(N=N.updateQueue,c=N.lastBaseUpdate,c!==o&&(c===null?N.firstBaseUpdate=g:c.next=g,N.lastBaseUpdate=m))}if(a!==null){var b=r.baseState;o=0,N=g=m=null,c=a;do{var w=c.lane,R=c.eventTime;if((s&w)===w){N!==null&&(N=N.next={eventTime:R,lane:0,tag:c.tag,payload:c.payload,callback:c.callback,next:null});e:{var M=e,$=c;switch(w=t,R=l,$.tag){case 1:if(M=$.payload,typeof M=="function"){b=M.call(R,b,w);break e}b=M;break e;case 3:M.flags=M.flags&-65537|128;case 0:if(M=$.payload,w=typeof M=="function"?M.call(R,b,w):M,w==null)break e;b=T({},b,w);break e;case 2:ln=!0}}c.callback!==null&&c.lane!==0&&(e.flags|=64,w=r.effects,w===null?r.effects=[c]:w.push(c))}else R={eventTime:R,lane:w,tag:c.tag,payload:c.payload,callback:c.callback,next:null},N===null?(g=N=R,m=b):N=N.next=R,o|=w;if(c=c.next,c===null){if(c=r.shared.pending,c===null)break;w=c,c=w.next,w.next=null,r.lastBaseUpdate=w,r.shared.pending=null}}while(!0);if(N===null&&(m=b),r.baseState=m,r.firstBaseUpdate=g,r.lastBaseUpdate=N,t=r.shared.interleaved,t!==null){r=t;do o|=r.lane,r=r.next;while(r!==t)}else a===null&&(r.shared.lanes=0);kn|=o,e.lanes=o,e.memoizedState=b}}function Fo(e,t,l){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var s=e[t],r=s.callback;if(r!==null){if(s.callback=null,s=l,typeof r!="function")throw Error(u(191,r));r.call(s)}}}var Pl={},kt=en(Pl),Ml=en(Pl),$l=en(Pl);function Sn(e){if(e===Pl)throw Error(u(174));return e}function fa(e,t){switch(Se($l,t),Se(Ml,e),Se(kt,Pl),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Bn(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Bn(t,e)}Ce(kt),Se(kt,t)}function qn(){Ce(kt),Ce(Ml),Ce($l)}function Po(e){Sn($l.current);var t=Sn(kt.current),l=Bn(t,e.type);t!==l&&(Se(Ml,e),Se(kt,l))}function pa(e){Ml.current===e&&(Ce(kt),Ce(Ml))}var De=en(0);function Vs(e){for(var t=e;t!==null;){if(t.tag===13){var l=t.memoizedState;if(l!==null&&(l=l.dehydrated,l===null||l.data==="$?"||l.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ha=[];function xa(){for(var e=0;e<ha.length;e++)ha[e]._workInProgressVersionPrimary=null;ha.length=0}var Us=ie.ReactCurrentDispatcher,ga=ie.ReactCurrentBatchConfig,_n=0,Le=null,Me=null,Oe=null,Hs=!1,zl=!1,Ol=0,$u=0;function Qe(){throw Error(u(321))}function ya(e,t){if(t===null)return!1;for(var l=0;l<t.length&&l<e.length;l++)if(!ht(e[l],t[l]))return!1;return!0}function va(e,t,l,s,r,a){if(_n=a,Le=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Us.current=e===null||e.memoizedState===null?Vu:Uu,e=l(s,r),zl){a=0;do{if(zl=!1,Ol=0,25<=a)throw Error(u(301));a+=1,Oe=Me=null,t.updateQueue=null,Us.current=Hu,e=l(s,r)}while(zl)}if(Us.current=Ys,t=Me!==null&&Me.next!==null,_n=0,Oe=Me=Le=null,Hs=!1,t)throw Error(u(300));return e}function ja(){var e=Ol!==0;return Ol=0,e}function Et(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Oe===null?Le.memoizedState=Oe=e:Oe=Oe.next=e,Oe}function ct(){if(Me===null){var e=Le.alternate;e=e!==null?e.memoizedState:null}else e=Me.next;var t=Oe===null?Le.memoizedState:Oe.next;if(t!==null)Oe=t,Me=e;else{if(e===null)throw Error(u(310));Me=e,e={memoizedState:Me.memoizedState,baseState:Me.baseState,baseQueue:Me.baseQueue,queue:Me.queue,next:null},Oe===null?Le.memoizedState=Oe=e:Oe=Oe.next=e}return Oe}function Al(e,t){return typeof t=="function"?t(e):t}function wa(e){var t=ct(),l=t.queue;if(l===null)throw Error(u(311));l.lastRenderedReducer=e;var s=Me,r=s.baseQueue,a=l.pending;if(a!==null){if(r!==null){var o=r.next;r.next=a.next,a.next=o}s.baseQueue=r=a,l.pending=null}if(r!==null){a=r.next,s=s.baseState;var c=o=null,m=null,g=a;do{var N=g.lane;if((_n&N)===N)m!==null&&(m=m.next={lane:0,action:g.action,hasEagerState:g.hasEagerState,eagerState:g.eagerState,next:null}),s=g.hasEagerState?g.eagerState:e(s,g.action);else{var b={lane:N,action:g.action,hasEagerState:g.hasEagerState,eagerState:g.eagerState,next:null};m===null?(c=m=b,o=s):m=m.next=b,Le.lanes|=N,kn|=N}g=g.next}while(g!==null&&g!==a);m===null?o=s:m.next=c,ht(s,t.memoizedState)||(Xe=!0),t.memoizedState=s,t.baseState=o,t.baseQueue=m,l.lastRenderedState=s}if(e=l.interleaved,e!==null){r=e;do a=r.lane,Le.lanes|=a,kn|=a,r=r.next;while(r!==e)}else r===null&&(l.lanes=0);return[t.memoizedState,l.dispatch]}function Na(e){var t=ct(),l=t.queue;if(l===null)throw Error(u(311));l.lastRenderedReducer=e;var s=l.dispatch,r=l.pending,a=t.memoizedState;if(r!==null){l.pending=null;var o=r=r.next;do a=e(a,o.action),o=o.next;while(o!==r);ht(a,t.memoizedState)||(Xe=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),l.lastRenderedState=a}return[a,s]}function Mo(){}function $o(e,t){var l=Le,s=ct(),r=t(),a=!ht(s.memoizedState,r);if(a&&(s.memoizedState=r,Xe=!0),s=s.queue,ba(Ao.bind(null,l,s,e),[e]),s.getSnapshot!==t||a||Oe!==null&&Oe.memoizedState.tag&1){if(l.flags|=2048,Vl(9,Oo.bind(null,l,s,r,t),void 0,null),Ae===null)throw Error(u(349));(_n&30)!==0||zo(l,t,r)}return r}function zo(e,t,l){e.flags|=16384,e={getSnapshot:t,value:l},t=Le.updateQueue,t===null?(t={lastEffect:null,stores:null},Le.updateQueue=t,t.stores=[e]):(l=t.stores,l===null?t.stores=[e]:l.push(e))}function Oo(e,t,l,s){t.value=l,t.getSnapshot=s,Vo(t)&&Uo(e)}function Ao(e,t,l){return l(function(){Vo(t)&&Uo(e)})}function Vo(e){var t=e.getSnapshot;e=e.value;try{var l=t();return!ht(e,l)}catch{return!0}}function Uo(e){var t=Pt(e,1);t!==null&&jt(t,e,1,-1)}function Ho(e){var t=Et();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Al,lastRenderedState:e},t.queue=e,e=e.dispatch=Au.bind(null,Le,e),[t.memoizedState,e]}function Vl(e,t,l,s){return e={tag:e,create:t,destroy:l,deps:s,next:null},t=Le.updateQueue,t===null?(t={lastEffect:null,stores:null},Le.updateQueue=t,t.lastEffect=e.next=e):(l=t.lastEffect,l===null?t.lastEffect=e.next=e:(s=l.next,l.next=e,e.next=s,t.lastEffect=e)),e}function Wo(){return ct().memoizedState}function Ws(e,t,l,s){var r=Et();Le.flags|=e,r.memoizedState=Vl(1|t,l,void 0,s===void 0?null:s)}function Qs(e,t,l,s){var r=ct();s=s===void 0?null:s;var a=void 0;if(Me!==null){var o=Me.memoizedState;if(a=o.destroy,s!==null&&ya(s,o.deps)){r.memoizedState=Vl(t,l,a,s);return}}Le.flags|=e,r.memoizedState=Vl(1|t,l,a,s)}function Qo(e,t){return Ws(8390656,8,e,t)}function ba(e,t){return Qs(2048,8,e,t)}function Yo(e,t){return Qs(4,2,e,t)}function Jo(e,t){return Qs(4,4,e,t)}function Ko(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Zo(e,t,l){return l=l!=null?l.concat([e]):null,Qs(4,4,Ko.bind(null,t,e),l)}function Sa(){}function Go(e,t){var l=ct();t=t===void 0?null:t;var s=l.memoizedState;return s!==null&&t!==null&&ya(t,s[1])?s[0]:(l.memoizedState=[e,t],e)}function qo(e,t){var l=ct();t=t===void 0?null:t;var s=l.memoizedState;return s!==null&&t!==null&&ya(t,s[1])?s[0]:(e=e(),l.memoizedState=[e,t],e)}function Xo(e,t,l){return(_n&21)===0?(e.baseState&&(e.baseState=!1,Xe=!0),e.memoizedState=l):(ht(l,t)||(l=Ci(),Le.lanes|=l,kn|=l,e.baseState=!0),t)}function zu(e,t){var l=ye;ye=l!==0&&4>l?l:4,e(!0);var s=ga.transition;ga.transition={};try{e(!1),t()}finally{ye=l,ga.transition=s}}function ed(){return ct().memoizedState}function Ou(e,t,l){var s=dn(e);if(l={lane:s,action:l,hasEagerState:!1,eagerState:null,next:null},td(e))nd(t,l);else if(l=To(e,t,l,s),l!==null){var r=Ze();jt(l,e,s,r),ld(l,t,s)}}function Au(e,t,l){var s=dn(e),r={lane:s,action:l,hasEagerState:!1,eagerState:null,next:null};if(td(e))nd(t,r);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,c=a(o,l);if(r.hasEagerState=!0,r.eagerState=c,ht(c,o)){var m=t.interleaved;m===null?(r.next=r,ua(t)):(r.next=m.next,m.next=r),t.interleaved=r;return}}catch{}finally{}l=To(e,t,r,s),l!==null&&(r=Ze(),jt(l,e,s,r),ld(l,t,s))}}function td(e){var t=e.alternate;return e===Le||t!==null&&t===Le}function nd(e,t){zl=Hs=!0;var l=e.pending;l===null?t.next=t:(t.next=l.next,l.next=t),e.pending=t}function ld(e,t,l){if((l&4194240)!==0){var s=t.lanes;s&=e.pendingLanes,l|=s,t.lanes=l,kr(e,l)}}var Ys={readContext:dt,useCallback:Qe,useContext:Qe,useEffect:Qe,useImperativeHandle:Qe,useInsertionEffect:Qe,useLayoutEffect:Qe,useMemo:Qe,useReducer:Qe,useRef:Qe,useState:Qe,useDebugValue:Qe,useDeferredValue:Qe,useTransition:Qe,useMutableSource:Qe,useSyncExternalStore:Qe,useId:Qe,unstable_isNewReconciler:!1},Vu={readContext:dt,useCallback:function(e,t){return Et().memoizedState=[e,t===void 0?null:t],e},useContext:dt,useEffect:Qo,useImperativeHandle:function(e,t,l){return l=l!=null?l.concat([e]):null,Ws(4194308,4,Ko.bind(null,t,e),l)},useLayoutEffect:function(e,t){return Ws(4194308,4,e,t)},useInsertionEffect:function(e,t){return Ws(4,2,e,t)},useMemo:function(e,t){var l=Et();return t=t===void 0?null:t,e=e(),l.memoizedState=[e,t],e},useReducer:function(e,t,l){var s=Et();return t=l!==void 0?l(t):t,s.memoizedState=s.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},s.queue=e,e=e.dispatch=Ou.bind(null,Le,e),[s.memoizedState,e]},useRef:function(e){var t=Et();return e={current:e},t.memoizedState=e},useState:Ho,useDebugValue:Sa,useDeferredValue:function(e){return Et().memoizedState=e},useTransition:function(){var e=Ho(!1),t=e[0];return e=zu.bind(null,e[1]),Et().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,l){var s=Le,r=Et();if(Ie){if(l===void 0)throw Error(u(407));l=l()}else{if(l=t(),Ae===null)throw Error(u(349));(_n&30)!==0||zo(s,t,l)}r.memoizedState=l;var a={value:l,getSnapshot:t};return r.queue=a,Qo(Ao.bind(null,s,a,e),[e]),s.flags|=2048,Vl(9,Oo.bind(null,s,a,l,t),void 0,null),l},useId:function(){var e=Et(),t=Ae.identifierPrefix;if(Ie){var l=Ft,s=Rt;l=(s&~(1<<32-pt(s)-1)).toString(32)+l,t=":"+t+"R"+l,l=Ol++,0<l&&(t+="H"+l.toString(32)),t+=":"}else l=$u++,t=":"+t+"r"+l.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Uu={readContext:dt,useCallback:Go,useContext:dt,useEffect:ba,useImperativeHandle:Zo,useInsertionEffect:Yo,useLayoutEffect:Jo,useMemo:qo,useReducer:wa,useRef:Wo,useState:function(){return wa(Al)},useDebugValue:Sa,useDeferredValue:function(e){var t=ct();return Xo(t,Me.memoizedState,e)},useTransition:function(){var e=wa(Al)[0],t=ct().memoizedState;return[e,t]},useMutableSource:Mo,useSyncExternalStore:$o,useId:ed,unstable_isNewReconciler:!1},Hu={readContext:dt,useCallback:Go,useContext:dt,useEffect:ba,useImperativeHandle:Zo,useInsertionEffect:Yo,useLayoutEffect:Jo,useMemo:qo,useReducer:Na,useRef:Wo,useState:function(){return Na(Al)},useDebugValue:Sa,useDeferredValue:function(e){var t=ct();return Me===null?t.memoizedState=e:Xo(t,Me.memoizedState,e)},useTransition:function(){var e=Na(Al)[0],t=ct().memoizedState;return[e,t]},useMutableSource:Mo,useSyncExternalStore:$o,useId:ed,unstable_isNewReconciler:!1};function gt(e,t){if(e&&e.defaultProps){t=T({},t),e=e.defaultProps;for(var l in e)t[l]===void 0&&(t[l]=e[l]);return t}return t}function _a(e,t,l,s){t=e.memoizedState,l=l(s,t),l=l==null?t:T({},t,l),e.memoizedState=l,e.lanes===0&&(e.updateQueue.baseState=l)}var Js={isMounted:function(e){return(e=e._reactInternals)?yn(e)===e:!1},enqueueSetState:function(e,t,l){e=e._reactInternals;var s=Ze(),r=dn(e),a=Mt(s,r);a.payload=t,l!=null&&(a.callback=l),t=sn(e,a,r),t!==null&&(jt(t,e,r,s),Os(t,e,r))},enqueueReplaceState:function(e,t,l){e=e._reactInternals;var s=Ze(),r=dn(e),a=Mt(s,r);a.tag=1,a.payload=t,l!=null&&(a.callback=l),t=sn(e,a,r),t!==null&&(jt(t,e,r,s),Os(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var l=Ze(),s=dn(e),r=Mt(l,s);r.tag=2,t!=null&&(r.callback=t),t=sn(e,r,s),t!==null&&(jt(t,e,s,l),Os(t,e,s))}};function sd(e,t,l,s,r,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(s,a,o):t.prototype&&t.prototype.isPureReactComponent?!Cl(l,s)||!Cl(r,a):!0}function rd(e,t,l){var s=!1,r=tn,a=t.contextType;return typeof a=="object"&&a!==null?a=dt(a):(r=qe(t)?jn:We.current,s=t.contextTypes,a=(s=s!=null)?Wn(e,r):tn),t=new t(l,a),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Js,e.stateNode=t,t._reactInternals=e,s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=r,e.__reactInternalMemoizedMaskedChildContext=a),t}function ad(e,t,l,s){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(l,s),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(l,s),t.state!==e&&Js.enqueueReplaceState(t,t.state,null)}function ka(e,t,l,s){var r=e.stateNode;r.props=l,r.state=e.memoizedState,r.refs={},ma(e);var a=t.contextType;typeof a=="object"&&a!==null?r.context=dt(a):(a=qe(t)?jn:We.current,r.context=Wn(e,a)),r.state=e.memoizedState,a=t.getDerivedStateFromProps,typeof a=="function"&&(_a(e,t,a,l),r.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(t=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),t!==r.state&&Js.enqueueReplaceState(r,r.state,null),As(e,l,r,s),r.state=e.memoizedState),typeof r.componentDidMount=="function"&&(e.flags|=4194308)}function Xn(e,t){try{var l="",s=t;do l+=ce(s),s=s.return;while(s);var r=l}catch(a){r=`
Error generating stack: `+a.message+`
`+a.stack}return{value:e,source:t,stack:r,digest:null}}function Ea(e,t,l){return{value:e,source:null,stack:l??null,digest:t??null}}function Ca(e,t){try{console.error(t.value)}catch(l){setTimeout(function(){throw l})}}var Wu=typeof WeakMap=="function"?WeakMap:Map;function id(e,t,l){l=Mt(-1,l),l.tag=3,l.payload={element:null};var s=t.value;return l.callback=function(){tr||(tr=!0,Ua=s),Ca(e,t)},l}function od(e,t,l){l=Mt(-1,l),l.tag=3;var s=e.type.getDerivedStateFromError;if(typeof s=="function"){var r=t.value;l.payload=function(){return s(r)},l.callback=function(){Ca(e,t)}}var a=e.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(l.callback=function(){Ca(e,t),typeof s!="function"&&(an===null?an=new Set([this]):an.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),l}function dd(e,t,l){var s=e.pingCache;if(s===null){s=e.pingCache=new Wu;var r=new Set;s.set(t,r)}else r=s.get(t),r===void 0&&(r=new Set,s.set(t,r));r.has(l)||(r.add(l),e=rm.bind(null,e,t,l),t.then(e,e))}function cd(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function ud(e,t,l,s,r){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,l.flags|=131072,l.flags&=-52805,l.tag===1&&(l.alternate===null?l.tag=17:(t=Mt(-1,1),t.tag=2,sn(l,t,1))),l.lanes|=1),e):(e.flags|=65536,e.lanes=r,e)}var Qu=ie.ReactCurrentOwner,Xe=!1;function Ke(e,t,l,s){t.child=e===null?Lo(t,null,l,s):Kn(t,e.child,l,s)}function md(e,t,l,s,r){l=l.render;var a=t.ref;return Gn(t,r),s=va(e,t,l,s,a,r),l=ja(),e!==null&&!Xe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r,$t(e,t,r)):(Ie&&l&&na(t),t.flags|=1,Ke(e,t,s,r),t.child)}function fd(e,t,l,s,r){if(e===null){var a=l.type;return typeof a=="function"&&!Za(a)&&a.defaultProps===void 0&&l.compare===null&&l.defaultProps===void 0?(t.tag=15,t.type=a,pd(e,t,a,s,r)):(e=ir(l.type,null,s,t,t.mode,r),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,(e.lanes&r)===0){var o=a.memoizedProps;if(l=l.compare,l=l!==null?l:Cl,l(o,s)&&e.ref===t.ref)return $t(e,t,r)}return t.flags|=1,e=un(a,s),e.ref=t.ref,e.return=t,t.child=e}function pd(e,t,l,s,r){if(e!==null){var a=e.memoizedProps;if(Cl(a,s)&&e.ref===t.ref)if(Xe=!1,t.pendingProps=s=a,(e.lanes&r)!==0)(e.flags&131072)!==0&&(Xe=!0);else return t.lanes=e.lanes,$t(e,t,r)}return Ia(e,t,l,s,r)}function hd(e,t,l){var s=t.pendingProps,r=s.children,a=e!==null?e.memoizedState:null;if(s.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Se(tl,at),at|=l;else{if((l&1073741824)===0)return e=a!==null?a.baseLanes|l:l,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Se(tl,at),at|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},s=a!==null?a.baseLanes:l,Se(tl,at),at|=s}else a!==null?(s=a.baseLanes|l,t.memoizedState=null):s=l,Se(tl,at),at|=s;return Ke(e,t,r,l),t.child}function xd(e,t){var l=t.ref;(e===null&&l!==null||e!==null&&e.ref!==l)&&(t.flags|=512,t.flags|=2097152)}function Ia(e,t,l,s,r){var a=qe(l)?jn:We.current;return a=Wn(t,a),Gn(t,r),l=va(e,t,l,s,a,r),s=ja(),e!==null&&!Xe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r,$t(e,t,r)):(Ie&&s&&na(t),t.flags|=1,Ke(e,t,l,r),t.child)}function gd(e,t,l,s,r){if(qe(l)){var a=!0;Ts(t)}else a=!1;if(Gn(t,r),t.stateNode===null)Zs(e,t),rd(t,l,s),ka(t,l,s,r),s=!0;else if(e===null){var o=t.stateNode,c=t.memoizedProps;o.props=c;var m=o.context,g=l.contextType;typeof g=="object"&&g!==null?g=dt(g):(g=qe(l)?jn:We.current,g=Wn(t,g));var N=l.getDerivedStateFromProps,b=typeof N=="function"||typeof o.getSnapshotBeforeUpdate=="function";b||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(c!==s||m!==g)&&ad(t,o,s,g),ln=!1;var w=t.memoizedState;o.state=w,As(t,s,o,r),m=t.memoizedState,c!==s||w!==m||Ge.current||ln?(typeof N=="function"&&(_a(t,l,N,s),m=t.memoizedState),(c=ln||sd(t,l,c,s,w,m,g))?(b||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=s,t.memoizedState=m),o.props=s,o.state=m,o.context=g,s=c):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),s=!1)}else{o=t.stateNode,Bo(e,t),c=t.memoizedProps,g=t.type===t.elementType?c:gt(t.type,c),o.props=g,b=t.pendingProps,w=o.context,m=l.contextType,typeof m=="object"&&m!==null?m=dt(m):(m=qe(l)?jn:We.current,m=Wn(t,m));var R=l.getDerivedStateFromProps;(N=typeof R=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(c!==b||w!==m)&&ad(t,o,s,m),ln=!1,w=t.memoizedState,o.state=w,As(t,s,o,r);var M=t.memoizedState;c!==b||w!==M||Ge.current||ln?(typeof R=="function"&&(_a(t,l,R,s),M=t.memoizedState),(g=ln||sd(t,l,g,s,w,M,m)||!1)?(N||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(s,M,m),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(s,M,m)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||c===e.memoizedProps&&w===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&w===e.memoizedState||(t.flags|=1024),t.memoizedProps=s,t.memoizedState=M),o.props=s,o.state=M,o.context=m,s=g):(typeof o.componentDidUpdate!="function"||c===e.memoizedProps&&w===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&w===e.memoizedState||(t.flags|=1024),s=!1)}return Da(e,t,l,s,a,r)}function Da(e,t,l,s,r,a){xd(e,t);var o=(t.flags&128)!==0;if(!s&&!o)return r&&No(t,l,!1),$t(e,t,a);s=t.stateNode,Qu.current=t;var c=o&&typeof l.getDerivedStateFromError!="function"?null:s.render();return t.flags|=1,e!==null&&o?(t.child=Kn(t,e.child,null,a),t.child=Kn(t,null,c,a)):Ke(e,t,c,a),t.memoizedState=s.state,r&&No(t,l,!0),t.child}function yd(e){var t=e.stateNode;t.pendingContext?jo(e,t.pendingContext,t.pendingContext!==t.context):t.context&&jo(e,t.context,!1),fa(e,t.containerInfo)}function vd(e,t,l,s,r){return Jn(),aa(r),t.flags|=256,Ke(e,t,l,s),t.child}var La={dehydrated:null,treeContext:null,retryLane:0};function Ta(e){return{baseLanes:e,cachePool:null,transitions:null}}function jd(e,t,l){var s=t.pendingProps,r=De.current,a=!1,o=(t.flags&128)!==0,c;if((c=o)||(c=e!==null&&e.memoizedState===null?!1:(r&2)!==0),c?(a=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(r|=1),Se(De,r&1),e===null)return ra(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(o=s.children,e=s.fallback,a?(s=t.mode,a=t.child,o={mode:"hidden",children:o},(s&1)===0&&a!==null?(a.childLanes=0,a.pendingProps=o):a=or(o,s,0,null),e=Dn(e,s,l,null),a.return=t,e.return=t,a.sibling=e,t.child=a,t.child.memoizedState=Ta(l),t.memoizedState=La,e):Ba(t,o));if(r=e.memoizedState,r!==null&&(c=r.dehydrated,c!==null))return Yu(e,t,o,s,c,r,l);if(a){a=s.fallback,o=t.mode,r=e.child,c=r.sibling;var m={mode:"hidden",children:s.children};return(o&1)===0&&t.child!==r?(s=t.child,s.childLanes=0,s.pendingProps=m,t.deletions=null):(s=un(r,m),s.subtreeFlags=r.subtreeFlags&14680064),c!==null?a=un(c,a):(a=Dn(a,o,l,null),a.flags|=2),a.return=t,s.return=t,s.sibling=a,t.child=s,s=a,a=t.child,o=e.child.memoizedState,o=o===null?Ta(l):{baseLanes:o.baseLanes|l,cachePool:null,transitions:o.transitions},a.memoizedState=o,a.childLanes=e.childLanes&~l,t.memoizedState=La,s}return a=e.child,e=a.sibling,s=un(a,{mode:"visible",children:s.children}),(t.mode&1)===0&&(s.lanes=l),s.return=t,s.sibling=null,e!==null&&(l=t.deletions,l===null?(t.deletions=[e],t.flags|=16):l.push(e)),t.child=s,t.memoizedState=null,s}function Ba(e,t){return t=or({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Ks(e,t,l,s){return s!==null&&aa(s),Kn(t,e.child,null,l),e=Ba(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Yu(e,t,l,s,r,a,o){if(l)return t.flags&256?(t.flags&=-257,s=Ea(Error(u(422))),Ks(e,t,o,s)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(a=s.fallback,r=t.mode,s=or({mode:"visible",children:s.children},r,0,null),a=Dn(a,r,o,null),a.flags|=2,s.return=t,a.return=t,s.sibling=a,t.child=s,(t.mode&1)!==0&&Kn(t,e.child,null,o),t.child.memoizedState=Ta(o),t.memoizedState=La,a);if((t.mode&1)===0)return Ks(e,t,o,null);if(r.data==="$!"){if(s=r.nextSibling&&r.nextSibling.dataset,s)var c=s.dgst;return s=c,a=Error(u(419)),s=Ea(a,s,void 0),Ks(e,t,o,s)}if(c=(o&e.childLanes)!==0,Xe||c){if(s=Ae,s!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=(r&(s.suspendedLanes|o))!==0?0:r,r!==0&&r!==a.retryLane&&(a.retryLane=r,Pt(e,r),jt(s,e,r,-1))}return Ka(),s=Ea(Error(u(421))),Ks(e,t,o,s)}return r.data==="$?"?(t.flags|=128,t.child=e.child,t=am.bind(null,e),r._reactRetry=t,null):(e=a.treeContext,rt=Xt(r.nextSibling),st=t,Ie=!0,xt=null,e!==null&&(it[ot++]=Rt,it[ot++]=Ft,it[ot++]=wn,Rt=e.id,Ft=e.overflow,wn=t),t=Ba(t,s.children),t.flags|=4096,t)}function wd(e,t,l){e.lanes|=t;var s=e.alternate;s!==null&&(s.lanes|=t),ca(e.return,t,l)}function Ra(e,t,l,s,r){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:s,tail:l,tailMode:r}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=s,a.tail=l,a.tailMode=r)}function Nd(e,t,l){var s=t.pendingProps,r=s.revealOrder,a=s.tail;if(Ke(e,t,s.children,l),s=De.current,(s&2)!==0)s=s&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&wd(e,l,t);else if(e.tag===19)wd(e,l,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}s&=1}if(Se(De,s),(t.mode&1)===0)t.memoizedState=null;else switch(r){case"forwards":for(l=t.child,r=null;l!==null;)e=l.alternate,e!==null&&Vs(e)===null&&(r=l),l=l.sibling;l=r,l===null?(r=t.child,t.child=null):(r=l.sibling,l.sibling=null),Ra(t,!1,r,l,a);break;case"backwards":for(l=null,r=t.child,t.child=null;r!==null;){if(e=r.alternate,e!==null&&Vs(e)===null){t.child=r;break}e=r.sibling,r.sibling=l,l=r,r=e}Ra(t,!0,l,null,a);break;case"together":Ra(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Zs(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function $t(e,t,l){if(e!==null&&(t.dependencies=e.dependencies),kn|=t.lanes,(l&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(u(153));if(t.child!==null){for(e=t.child,l=un(e,e.pendingProps),t.child=l,l.return=t;e.sibling!==null;)e=e.sibling,l=l.sibling=un(e,e.pendingProps),l.return=t;l.sibling=null}return t.child}function Ju(e,t,l){switch(t.tag){case 3:yd(t),Jn();break;case 5:Po(t);break;case 1:qe(t.type)&&Ts(t);break;case 4:fa(t,t.stateNode.containerInfo);break;case 10:var s=t.type._context,r=t.memoizedProps.value;Se($s,s._currentValue),s._currentValue=r;break;case 13:if(s=t.memoizedState,s!==null)return s.dehydrated!==null?(Se(De,De.current&1),t.flags|=128,null):(l&t.child.childLanes)!==0?jd(e,t,l):(Se(De,De.current&1),e=$t(e,t,l),e!==null?e.sibling:null);Se(De,De.current&1);break;case 19:if(s=(l&t.childLanes)!==0,(e.flags&128)!==0){if(s)return Nd(e,t,l);t.flags|=128}if(r=t.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),Se(De,De.current),s)break;return null;case 22:case 23:return t.lanes=0,hd(e,t,l)}return $t(e,t,l)}var bd,Fa,Sd,_d;bd=function(e,t){for(var l=t.child;l!==null;){if(l.tag===5||l.tag===6)e.appendChild(l.stateNode);else if(l.tag!==4&&l.child!==null){l.child.return=l,l=l.child;continue}if(l===t)break;for(;l.sibling===null;){if(l.return===null||l.return===t)return;l=l.return}l.sibling.return=l.return,l=l.sibling}},Fa=function(){},Sd=function(e,t,l,s){var r=e.memoizedProps;if(r!==s){e=t.stateNode,Sn(kt.current);var a=null;switch(l){case"input":r=hn(e,r),s=hn(e,s),a=[];break;case"select":r=T({},r,{value:void 0}),s=T({},s,{value:void 0}),a=[];break;case"textarea":r=Tn(e,r),s=Tn(e,s),a=[];break;default:typeof r.onClick!="function"&&typeof s.onClick=="function"&&(e.onclick=Is)}Fn(l,s);var o;l=null;for(g in r)if(!s.hasOwnProperty(g)&&r.hasOwnProperty(g)&&r[g]!=null)if(g==="style"){var c=r[g];for(o in c)c.hasOwnProperty(o)&&(l||(l={}),l[o]="")}else g!=="dangerouslySetInnerHTML"&&g!=="children"&&g!=="suppressContentEditableWarning"&&g!=="suppressHydrationWarning"&&g!=="autoFocus"&&(y.hasOwnProperty(g)?a||(a=[]):(a=a||[]).push(g,null));for(g in s){var m=s[g];if(c=r!=null?r[g]:void 0,s.hasOwnProperty(g)&&m!==c&&(m!=null||c!=null))if(g==="style")if(c){for(o in c)!c.hasOwnProperty(o)||m&&m.hasOwnProperty(o)||(l||(l={}),l[o]="");for(o in m)m.hasOwnProperty(o)&&c[o]!==m[o]&&(l||(l={}),l[o]=m[o])}else l||(a||(a=[]),a.push(g,l)),l=m;else g==="dangerouslySetInnerHTML"?(m=m?m.__html:void 0,c=c?c.__html:void 0,m!=null&&c!==m&&(a=a||[]).push(g,m)):g==="children"?typeof m!="string"&&typeof m!="number"||(a=a||[]).push(g,""+m):g!=="suppressContentEditableWarning"&&g!=="suppressHydrationWarning"&&(y.hasOwnProperty(g)?(m!=null&&g==="onScroll"&&Ee("scroll",e),a||c===m||(a=[])):(a=a||[]).push(g,m))}l&&(a=a||[]).push("style",l);var g=a;(t.updateQueue=g)&&(t.flags|=4)}},_d=function(e,t,l,s){l!==s&&(t.flags|=4)};function Ul(e,t){if(!Ie)switch(e.tailMode){case"hidden":t=e.tail;for(var l=null;t!==null;)t.alternate!==null&&(l=t),t=t.sibling;l===null?e.tail=null:l.sibling=null;break;case"collapsed":l=e.tail;for(var s=null;l!==null;)l.alternate!==null&&(s=l),l=l.sibling;s===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:s.sibling=null}}function Ye(e){var t=e.alternate!==null&&e.alternate.child===e.child,l=0,s=0;if(t)for(var r=e.child;r!==null;)l|=r.lanes|r.childLanes,s|=r.subtreeFlags&14680064,s|=r.flags&14680064,r.return=e,r=r.sibling;else for(r=e.child;r!==null;)l|=r.lanes|r.childLanes,s|=r.subtreeFlags,s|=r.flags,r.return=e,r=r.sibling;return e.subtreeFlags|=s,e.childLanes=l,t}function Ku(e,t,l){var s=t.pendingProps;switch(la(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ye(t),null;case 1:return qe(t.type)&&Ls(),Ye(t),null;case 3:return s=t.stateNode,qn(),Ce(Ge),Ce(We),xa(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(Ps(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,xt!==null&&(Qa(xt),xt=null))),Fa(e,t),Ye(t),null;case 5:pa(t);var r=Sn($l.current);if(l=t.type,e!==null&&t.stateNode!=null)Sd(e,t,l,s,r),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!s){if(t.stateNode===null)throw Error(u(166));return Ye(t),null}if(e=Sn(kt.current),Ps(t)){s=t.stateNode,l=t.type;var a=t.memoizedProps;switch(s[_t]=t,s[Bl]=a,e=(t.mode&1)!==0,l){case"dialog":Ee("cancel",s),Ee("close",s);break;case"iframe":case"object":case"embed":Ee("load",s);break;case"video":case"audio":for(r=0;r<Dl.length;r++)Ee(Dl[r],s);break;case"source":Ee("error",s);break;case"img":case"image":case"link":Ee("error",s),Ee("load",s);break;case"details":Ee("toggle",s);break;case"input":Xl(s,a),Ee("invalid",s);break;case"select":s._wrapperState={wasMultiple:!!a.multiple},Ee("invalid",s);break;case"textarea":es(s,a),Ee("invalid",s)}Fn(l,a),r=null;for(var o in a)if(a.hasOwnProperty(o)){var c=a[o];o==="children"?typeof c=="string"?s.textContent!==c&&(a.suppressHydrationWarning!==!0&&Cs(s.textContent,c,e),r=["children",c]):typeof c=="number"&&s.textContent!==""+c&&(a.suppressHydrationWarning!==!0&&Cs(s.textContent,c,e),r=["children",""+c]):y.hasOwnProperty(o)&&c!=null&&o==="onScroll"&&Ee("scroll",s)}switch(l){case"input":Ln(s),ol(s,a,!0);break;case"textarea":Ln(s),cl(s);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(s.onclick=Is)}s=r,t.updateQueue=s,s!==null&&(t.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=ts(l)),e==="http://www.w3.org/1999/xhtml"?l==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof s.is=="string"?e=o.createElement(l,{is:s.is}):(e=o.createElement(l),l==="select"&&(o=e,s.multiple?o.multiple=!0:s.size&&(o.size=s.size))):e=o.createElementNS(e,l),e[_t]=t,e[Bl]=s,bd(e,t,!1,!1),t.stateNode=e;e:{switch(o=ul(l,s),l){case"dialog":Ee("cancel",e),Ee("close",e),r=s;break;case"iframe":case"object":case"embed":Ee("load",e),r=s;break;case"video":case"audio":for(r=0;r<Dl.length;r++)Ee(Dl[r],e);r=s;break;case"source":Ee("error",e),r=s;break;case"img":case"image":case"link":Ee("error",e),Ee("load",e),r=s;break;case"details":Ee("toggle",e),r=s;break;case"input":Xl(e,s),r=hn(e,s),Ee("invalid",e);break;case"option":r=s;break;case"select":e._wrapperState={wasMultiple:!!s.multiple},r=T({},s,{value:void 0}),Ee("invalid",e);break;case"textarea":es(e,s),r=Tn(e,s),Ee("invalid",e);break;default:r=s}Fn(l,r),c=r;for(a in c)if(c.hasOwnProperty(a)){var m=c[a];a==="style"?ls(e,m):a==="dangerouslySetInnerHTML"?(m=m?m.__html:void 0,m!=null&&Ut(e,m)):a==="children"?typeof m=="string"?(l!=="textarea"||m!=="")&&bt(e,m):typeof m=="number"&&bt(e,""+m):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(y.hasOwnProperty(a)?m!=null&&a==="onScroll"&&Ee("scroll",e):m!=null&&pe(e,a,m,o))}switch(l){case"input":Ln(e),ol(e,s,!1);break;case"textarea":Ln(e),cl(e);break;case"option":s.value!=null&&e.setAttribute("value",""+ue(s.value));break;case"select":e.multiple=!!s.multiple,a=s.value,a!=null?Vt(e,!!s.multiple,a,!1):s.defaultValue!=null&&Vt(e,!!s.multiple,s.defaultValue,!0);break;default:typeof r.onClick=="function"&&(e.onclick=Is)}switch(l){case"button":case"input":case"select":case"textarea":s=!!s.autoFocus;break e;case"img":s=!0;break e;default:s=!1}}s&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Ye(t),null;case 6:if(e&&t.stateNode!=null)_d(e,t,e.memoizedProps,s);else{if(typeof s!="string"&&t.stateNode===null)throw Error(u(166));if(l=Sn($l.current),Sn(kt.current),Ps(t)){if(s=t.stateNode,l=t.memoizedProps,s[_t]=t,(a=s.nodeValue!==l)&&(e=st,e!==null))switch(e.tag){case 3:Cs(s.nodeValue,l,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Cs(s.nodeValue,l,(e.mode&1)!==0)}a&&(t.flags|=4)}else s=(l.nodeType===9?l:l.ownerDocument).createTextNode(s),s[_t]=t,t.stateNode=s}return Ye(t),null;case 13:if(Ce(De),s=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Ie&&rt!==null&&(t.mode&1)!==0&&(t.flags&128)===0)Co(),Jn(),t.flags|=98560,a=!1;else if(a=Ps(t),s!==null&&s.dehydrated!==null){if(e===null){if(!a)throw Error(u(318));if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(u(317));a[_t]=t}else Jn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ye(t),a=!1}else xt!==null&&(Qa(xt),xt=null),a=!0;if(!a)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=l,t):(s=s!==null,s!==(e!==null&&e.memoizedState!==null)&&s&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(De.current&1)!==0?$e===0&&($e=3):Ka())),t.updateQueue!==null&&(t.flags|=4),Ye(t),null);case 4:return qn(),Fa(e,t),e===null&&Ll(t.stateNode.containerInfo),Ye(t),null;case 10:return da(t.type._context),Ye(t),null;case 17:return qe(t.type)&&Ls(),Ye(t),null;case 19:if(Ce(De),a=t.memoizedState,a===null)return Ye(t),null;if(s=(t.flags&128)!==0,o=a.rendering,o===null)if(s)Ul(a,!1);else{if($e!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(o=Vs(e),o!==null){for(t.flags|=128,Ul(a,!1),s=o.updateQueue,s!==null&&(t.updateQueue=s,t.flags|=4),t.subtreeFlags=0,s=l,l=t.child;l!==null;)a=l,e=s,a.flags&=14680066,o=a.alternate,o===null?(a.childLanes=0,a.lanes=e,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=o.childLanes,a.lanes=o.lanes,a.child=o.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=o.memoizedProps,a.memoizedState=o.memoizedState,a.updateQueue=o.updateQueue,a.type=o.type,e=o.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),l=l.sibling;return Se(De,De.current&1|2),t.child}e=e.sibling}a.tail!==null&&Be()>nl&&(t.flags|=128,s=!0,Ul(a,!1),t.lanes=4194304)}else{if(!s)if(e=Vs(o),e!==null){if(t.flags|=128,s=!0,l=e.updateQueue,l!==null&&(t.updateQueue=l,t.flags|=4),Ul(a,!0),a.tail===null&&a.tailMode==="hidden"&&!o.alternate&&!Ie)return Ye(t),null}else 2*Be()-a.renderingStartTime>nl&&l!==1073741824&&(t.flags|=128,s=!0,Ul(a,!1),t.lanes=4194304);a.isBackwards?(o.sibling=t.child,t.child=o):(l=a.last,l!==null?l.sibling=o:t.child=o,a.last=o)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=Be(),t.sibling=null,l=De.current,Se(De,s?l&1|2:l&1),t):(Ye(t),null);case 22:case 23:return Ja(),s=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==s&&(t.flags|=8192),s&&(t.mode&1)!==0?(at&1073741824)!==0&&(Ye(t),t.subtreeFlags&6&&(t.flags|=8192)):Ye(t),null;case 24:return null;case 25:return null}throw Error(u(156,t.tag))}function Zu(e,t){switch(la(t),t.tag){case 1:return qe(t.type)&&Ls(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return qn(),Ce(Ge),Ce(We),xa(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return pa(t),null;case 13:if(Ce(De),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(u(340));Jn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Ce(De),null;case 4:return qn(),null;case 10:return da(t.type._context),null;case 22:case 23:return Ja(),null;case 24:return null;default:return null}}var Gs=!1,Je=!1,Gu=typeof WeakSet=="function"?WeakSet:Set,F=null;function el(e,t){var l=e.ref;if(l!==null)if(typeof l=="function")try{l(null)}catch(s){Te(e,t,s)}else l.current=null}function Pa(e,t,l){try{l()}catch(s){Te(e,t,s)}}var kd=!1;function qu(e,t){if(Jr=gs,e=lo(),Or(e)){if("selectionStart"in e)var l={start:e.selectionStart,end:e.selectionEnd};else e:{l=(l=e.ownerDocument)&&l.defaultView||window;var s=l.getSelection&&l.getSelection();if(s&&s.rangeCount!==0){l=s.anchorNode;var r=s.anchorOffset,a=s.focusNode;s=s.focusOffset;try{l.nodeType,a.nodeType}catch{l=null;break e}var o=0,c=-1,m=-1,g=0,N=0,b=e,w=null;t:for(;;){for(var R;b!==l||r!==0&&b.nodeType!==3||(c=o+r),b!==a||s!==0&&b.nodeType!==3||(m=o+s),b.nodeType===3&&(o+=b.nodeValue.length),(R=b.firstChild)!==null;)w=b,b=R;for(;;){if(b===e)break t;if(w===l&&++g===r&&(c=o),w===a&&++N===s&&(m=o),(R=b.nextSibling)!==null)break;b=w,w=b.parentNode}b=R}l=c===-1||m===-1?null:{start:c,end:m}}else l=null}l=l||{start:0,end:0}}else l=null;for(Kr={focusedElem:e,selectionRange:l},gs=!1,F=t;F!==null;)if(t=F,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,F=e;else for(;F!==null;){t=F;try{var M=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(M!==null){var $=M.memoizedProps,Re=M.memoizedState,h=t.stateNode,f=h.getSnapshotBeforeUpdate(t.elementType===t.type?$:gt(t.type,$),Re);h.__reactInternalSnapshotBeforeUpdate=f}break;case 3:var x=t.stateNode.containerInfo;x.nodeType===1?x.textContent="":x.nodeType===9&&x.documentElement&&x.removeChild(x.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(u(163))}}catch(_){Te(t,t.return,_)}if(e=t.sibling,e!==null){e.return=t.return,F=e;break}F=t.return}return M=kd,kd=!1,M}function Hl(e,t,l){var s=t.updateQueue;if(s=s!==null?s.lastEffect:null,s!==null){var r=s=s.next;do{if((r.tag&e)===e){var a=r.destroy;r.destroy=void 0,a!==void 0&&Pa(t,l,a)}r=r.next}while(r!==s)}}function qs(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var l=t=t.next;do{if((l.tag&e)===e){var s=l.create;l.destroy=s()}l=l.next}while(l!==t)}}function Ma(e){var t=e.ref;if(t!==null){var l=e.stateNode;switch(e.tag){case 5:e=l;break;default:e=l}typeof t=="function"?t(e):t.current=e}}function Ed(e){var t=e.alternate;t!==null&&(e.alternate=null,Ed(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[_t],delete t[Bl],delete t[Xr],delete t[Ru],delete t[Fu])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Cd(e){return e.tag===5||e.tag===3||e.tag===4}function Id(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Cd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function $a(e,t,l){var s=e.tag;if(s===5||s===6)e=e.stateNode,t?l.nodeType===8?l.parentNode.insertBefore(e,t):l.insertBefore(e,t):(l.nodeType===8?(t=l.parentNode,t.insertBefore(e,l)):(t=l,t.appendChild(e)),l=l._reactRootContainer,l!=null||t.onclick!==null||(t.onclick=Is));else if(s!==4&&(e=e.child,e!==null))for($a(e,t,l),e=e.sibling;e!==null;)$a(e,t,l),e=e.sibling}function za(e,t,l){var s=e.tag;if(s===5||s===6)e=e.stateNode,t?l.insertBefore(e,t):l.appendChild(e);else if(s!==4&&(e=e.child,e!==null))for(za(e,t,l),e=e.sibling;e!==null;)za(e,t,l),e=e.sibling}var Ue=null,yt=!1;function rn(e,t,l){for(l=l.child;l!==null;)Dd(e,t,l),l=l.sibling}function Dd(e,t,l){if(St&&typeof St.onCommitFiberUnmount=="function")try{St.onCommitFiberUnmount(us,l)}catch{}switch(l.tag){case 5:Je||el(l,t);case 6:var s=Ue,r=yt;Ue=null,rn(e,t,l),Ue=s,yt=r,Ue!==null&&(yt?(e=Ue,l=l.stateNode,e.nodeType===8?e.parentNode.removeChild(l):e.removeChild(l)):Ue.removeChild(l.stateNode));break;case 18:Ue!==null&&(yt?(e=Ue,l=l.stateNode,e.nodeType===8?qr(e.parentNode,l):e.nodeType===1&&qr(e,l),Nl(e)):qr(Ue,l.stateNode));break;case 4:s=Ue,r=yt,Ue=l.stateNode.containerInfo,yt=!0,rn(e,t,l),Ue=s,yt=r;break;case 0:case 11:case 14:case 15:if(!Je&&(s=l.updateQueue,s!==null&&(s=s.lastEffect,s!==null))){r=s=s.next;do{var a=r,o=a.destroy;a=a.tag,o!==void 0&&((a&2)!==0||(a&4)!==0)&&Pa(l,t,o),r=r.next}while(r!==s)}rn(e,t,l);break;case 1:if(!Je&&(el(l,t),s=l.stateNode,typeof s.componentWillUnmount=="function"))try{s.props=l.memoizedProps,s.state=l.memoizedState,s.componentWillUnmount()}catch(c){Te(l,t,c)}rn(e,t,l);break;case 21:rn(e,t,l);break;case 22:l.mode&1?(Je=(s=Je)||l.memoizedState!==null,rn(e,t,l),Je=s):rn(e,t,l);break;default:rn(e,t,l)}}function Ld(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var l=e.stateNode;l===null&&(l=e.stateNode=new Gu),t.forEach(function(s){var r=im.bind(null,e,s);l.has(s)||(l.add(s),s.then(r,r))})}}function vt(e,t){var l=t.deletions;if(l!==null)for(var s=0;s<l.length;s++){var r=l[s];try{var a=e,o=t,c=o;e:for(;c!==null;){switch(c.tag){case 5:Ue=c.stateNode,yt=!1;break e;case 3:Ue=c.stateNode.containerInfo,yt=!0;break e;case 4:Ue=c.stateNode.containerInfo,yt=!0;break e}c=c.return}if(Ue===null)throw Error(u(160));Dd(a,o,r),Ue=null,yt=!1;var m=r.alternate;m!==null&&(m.return=null),r.return=null}catch(g){Te(r,t,g)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Td(t,e),t=t.sibling}function Td(e,t){var l=e.alternate,s=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(vt(t,e),Ct(e),s&4){try{Hl(3,e,e.return),qs(3,e)}catch($){Te(e,e.return,$)}try{Hl(5,e,e.return)}catch($){Te(e,e.return,$)}}break;case 1:vt(t,e),Ct(e),s&512&&l!==null&&el(l,l.return);break;case 5:if(vt(t,e),Ct(e),s&512&&l!==null&&el(l,l.return),e.flags&32){var r=e.stateNode;try{bt(r,"")}catch($){Te(e,e.return,$)}}if(s&4&&(r=e.stateNode,r!=null)){var a=e.memoizedProps,o=l!==null?l.memoizedProps:a,c=e.type,m=e.updateQueue;if(e.updateQueue=null,m!==null)try{c==="input"&&a.type==="radio"&&a.name!=null&&al(r,a),ul(c,o);var g=ul(c,a);for(o=0;o<m.length;o+=2){var N=m[o],b=m[o+1];N==="style"?ls(r,b):N==="dangerouslySetInnerHTML"?Ut(r,b):N==="children"?bt(r,b):pe(r,N,b,g)}switch(c){case"input":il(r,a);break;case"textarea":dl(r,a);break;case"select":var w=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!a.multiple;var R=a.value;R!=null?Vt(r,!!a.multiple,R,!1):w!==!!a.multiple&&(a.defaultValue!=null?Vt(r,!!a.multiple,a.defaultValue,!0):Vt(r,!!a.multiple,a.multiple?[]:"",!1))}r[Bl]=a}catch($){Te(e,e.return,$)}}break;case 6:if(vt(t,e),Ct(e),s&4){if(e.stateNode===null)throw Error(u(162));r=e.stateNode,a=e.memoizedProps;try{r.nodeValue=a}catch($){Te(e,e.return,$)}}break;case 3:if(vt(t,e),Ct(e),s&4&&l!==null&&l.memoizedState.isDehydrated)try{Nl(t.containerInfo)}catch($){Te(e,e.return,$)}break;case 4:vt(t,e),Ct(e);break;case 13:vt(t,e),Ct(e),r=e.child,r.flags&8192&&(a=r.memoizedState!==null,r.stateNode.isHidden=a,!a||r.alternate!==null&&r.alternate.memoizedState!==null||(Va=Be())),s&4&&Ld(e);break;case 22:if(N=l!==null&&l.memoizedState!==null,e.mode&1?(Je=(g=Je)||N,vt(t,e),Je=g):vt(t,e),Ct(e),s&8192){if(g=e.memoizedState!==null,(e.stateNode.isHidden=g)&&!N&&(e.mode&1)!==0)for(F=e,N=e.child;N!==null;){for(b=F=N;F!==null;){switch(w=F,R=w.child,w.tag){case 0:case 11:case 14:case 15:Hl(4,w,w.return);break;case 1:el(w,w.return);var M=w.stateNode;if(typeof M.componentWillUnmount=="function"){s=w,l=w.return;try{t=s,M.props=t.memoizedProps,M.state=t.memoizedState,M.componentWillUnmount()}catch($){Te(s,l,$)}}break;case 5:el(w,w.return);break;case 22:if(w.memoizedState!==null){Fd(b);continue}}R!==null?(R.return=w,F=R):Fd(b)}N=N.sibling}e:for(N=null,b=e;;){if(b.tag===5){if(N===null){N=b;try{r=b.stateNode,g?(a=r.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(c=b.stateNode,m=b.memoizedProps.style,o=m!=null&&m.hasOwnProperty("display")?m.display:null,c.style.display=ns("display",o))}catch($){Te(e,e.return,$)}}}else if(b.tag===6){if(N===null)try{b.stateNode.nodeValue=g?"":b.memoizedProps}catch($){Te(e,e.return,$)}}else if((b.tag!==22&&b.tag!==23||b.memoizedState===null||b===e)&&b.child!==null){b.child.return=b,b=b.child;continue}if(b===e)break e;for(;b.sibling===null;){if(b.return===null||b.return===e)break e;N===b&&(N=null),b=b.return}N===b&&(N=null),b.sibling.return=b.return,b=b.sibling}}break;case 19:vt(t,e),Ct(e),s&4&&Ld(e);break;case 21:break;default:vt(t,e),Ct(e)}}function Ct(e){var t=e.flags;if(t&2){try{e:{for(var l=e.return;l!==null;){if(Cd(l)){var s=l;break e}l=l.return}throw Error(u(160))}switch(s.tag){case 5:var r=s.stateNode;s.flags&32&&(bt(r,""),s.flags&=-33);var a=Id(e);za(e,a,r);break;case 3:case 4:var o=s.stateNode.containerInfo,c=Id(e);$a(e,c,o);break;default:throw Error(u(161))}}catch(m){Te(e,e.return,m)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Xu(e,t,l){F=e,Bd(e)}function Bd(e,t,l){for(var s=(e.mode&1)!==0;F!==null;){var r=F,a=r.child;if(r.tag===22&&s){var o=r.memoizedState!==null||Gs;if(!o){var c=r.alternate,m=c!==null&&c.memoizedState!==null||Je;c=Gs;var g=Je;if(Gs=o,(Je=m)&&!g)for(F=r;F!==null;)o=F,m=o.child,o.tag===22&&o.memoizedState!==null?Pd(r):m!==null?(m.return=o,F=m):Pd(r);for(;a!==null;)F=a,Bd(a),a=a.sibling;F=r,Gs=c,Je=g}Rd(e)}else(r.subtreeFlags&8772)!==0&&a!==null?(a.return=r,F=a):Rd(e)}}function Rd(e){for(;F!==null;){var t=F;if((t.flags&8772)!==0){var l=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:Je||qs(5,t);break;case 1:var s=t.stateNode;if(t.flags&4&&!Je)if(l===null)s.componentDidMount();else{var r=t.elementType===t.type?l.memoizedProps:gt(t.type,l.memoizedProps);s.componentDidUpdate(r,l.memoizedState,s.__reactInternalSnapshotBeforeUpdate)}var a=t.updateQueue;a!==null&&Fo(t,a,s);break;case 3:var o=t.updateQueue;if(o!==null){if(l=null,t.child!==null)switch(t.child.tag){case 5:l=t.child.stateNode;break;case 1:l=t.child.stateNode}Fo(t,o,l)}break;case 5:var c=t.stateNode;if(l===null&&t.flags&4){l=c;var m=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":m.autoFocus&&l.focus();break;case"img":m.src&&(l.src=m.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var g=t.alternate;if(g!==null){var N=g.memoizedState;if(N!==null){var b=N.dehydrated;b!==null&&Nl(b)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(u(163))}Je||t.flags&512&&Ma(t)}catch(w){Te(t,t.return,w)}}if(t===e){F=null;break}if(l=t.sibling,l!==null){l.return=t.return,F=l;break}F=t.return}}function Fd(e){for(;F!==null;){var t=F;if(t===e){F=null;break}var l=t.sibling;if(l!==null){l.return=t.return,F=l;break}F=t.return}}function Pd(e){for(;F!==null;){var t=F;try{switch(t.tag){case 0:case 11:case 15:var l=t.return;try{qs(4,t)}catch(m){Te(t,l,m)}break;case 1:var s=t.stateNode;if(typeof s.componentDidMount=="function"){var r=t.return;try{s.componentDidMount()}catch(m){Te(t,r,m)}}var a=t.return;try{Ma(t)}catch(m){Te(t,a,m)}break;case 5:var o=t.return;try{Ma(t)}catch(m){Te(t,o,m)}}}catch(m){Te(t,t.return,m)}if(t===e){F=null;break}var c=t.sibling;if(c!==null){c.return=t.return,F=c;break}F=t.return}}var em=Math.ceil,Xs=ie.ReactCurrentDispatcher,Oa=ie.ReactCurrentOwner,ut=ie.ReactCurrentBatchConfig,me=0,Ae=null,Fe=null,He=0,at=0,tl=en(0),$e=0,Wl=null,kn=0,er=0,Aa=0,Ql=null,et=null,Va=0,nl=1/0,zt=null,tr=!1,Ua=null,an=null,nr=!1,on=null,lr=0,Yl=0,Ha=null,sr=-1,rr=0;function Ze(){return(me&6)!==0?Be():sr!==-1?sr:sr=Be()}function dn(e){return(e.mode&1)===0?1:(me&2)!==0&&He!==0?He&-He:Mu.transition!==null?(rr===0&&(rr=Ci()),rr):(e=ye,e!==0||(e=window.event,e=e===void 0?16:Mi(e.type)),e)}function jt(e,t,l,s){if(50<Yl)throw Yl=0,Ha=null,Error(u(185));gl(e,l,s),((me&2)===0||e!==Ae)&&(e===Ae&&((me&2)===0&&(er|=l),$e===4&&cn(e,He)),tt(e,s),l===1&&me===0&&(t.mode&1)===0&&(nl=Be()+500,Bs&&nn()))}function tt(e,t){var l=e.callbackNode;Mc(e,t);var s=ps(e,e===Ae?He:0);if(s===0)l!==null&&_i(l),e.callbackNode=null,e.callbackPriority=0;else if(t=s&-s,e.callbackPriority!==t){if(l!=null&&_i(l),t===1)e.tag===0?Pu($d.bind(null,e)):bo($d.bind(null,e)),Tu(function(){(me&6)===0&&nn()}),l=null;else{switch(Ii(s)){case 1:l=br;break;case 4:l=ki;break;case 16:l=cs;break;case 536870912:l=Ei;break;default:l=cs}l=Qd(l,Md.bind(null,e))}e.callbackPriority=t,e.callbackNode=l}}function Md(e,t){if(sr=-1,rr=0,(me&6)!==0)throw Error(u(327));var l=e.callbackNode;if(ll()&&e.callbackNode!==l)return null;var s=ps(e,e===Ae?He:0);if(s===0)return null;if((s&30)!==0||(s&e.expiredLanes)!==0||t)t=ar(e,s);else{t=s;var r=me;me|=2;var a=Od();(Ae!==e||He!==t)&&(zt=null,nl=Be()+500,Cn(e,t));do try{lm();break}catch(c){zd(e,c)}while(!0);oa(),Xs.current=a,me=r,Fe!==null?t=0:(Ae=null,He=0,t=$e)}if(t!==0){if(t===2&&(r=Sr(e),r!==0&&(s=r,t=Wa(e,r))),t===1)throw l=Wl,Cn(e,0),cn(e,s),tt(e,Be()),l;if(t===6)cn(e,s);else{if(r=e.current.alternate,(s&30)===0&&!tm(r)&&(t=ar(e,s),t===2&&(a=Sr(e),a!==0&&(s=a,t=Wa(e,a))),t===1))throw l=Wl,Cn(e,0),cn(e,s),tt(e,Be()),l;switch(e.finishedWork=r,e.finishedLanes=s,t){case 0:case 1:throw Error(u(345));case 2:In(e,et,zt);break;case 3:if(cn(e,s),(s&130023424)===s&&(t=Va+500-Be(),10<t)){if(ps(e,0)!==0)break;if(r=e.suspendedLanes,(r&s)!==s){Ze(),e.pingedLanes|=e.suspendedLanes&r;break}e.timeoutHandle=Gr(In.bind(null,e,et,zt),t);break}In(e,et,zt);break;case 4:if(cn(e,s),(s&4194240)===s)break;for(t=e.eventTimes,r=-1;0<s;){var o=31-pt(s);a=1<<o,o=t[o],o>r&&(r=o),s&=~a}if(s=r,s=Be()-s,s=(120>s?120:480>s?480:1080>s?1080:1920>s?1920:3e3>s?3e3:4320>s?4320:1960*em(s/1960))-s,10<s){e.timeoutHandle=Gr(In.bind(null,e,et,zt),s);break}In(e,et,zt);break;case 5:In(e,et,zt);break;default:throw Error(u(329))}}}return tt(e,Be()),e.callbackNode===l?Md.bind(null,e):null}function Wa(e,t){var l=Ql;return e.current.memoizedState.isDehydrated&&(Cn(e,t).flags|=256),e=ar(e,t),e!==2&&(t=et,et=l,t!==null&&Qa(t)),e}function Qa(e){et===null?et=e:et.push.apply(et,e)}function tm(e){for(var t=e;;){if(t.flags&16384){var l=t.updateQueue;if(l!==null&&(l=l.stores,l!==null))for(var s=0;s<l.length;s++){var r=l[s],a=r.getSnapshot;r=r.value;try{if(!ht(a(),r))return!1}catch{return!1}}}if(l=t.child,t.subtreeFlags&16384&&l!==null)l.return=t,t=l;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function cn(e,t){for(t&=~Aa,t&=~er,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var l=31-pt(t),s=1<<l;e[l]=-1,t&=~s}}function $d(e){if((me&6)!==0)throw Error(u(327));ll();var t=ps(e,0);if((t&1)===0)return tt(e,Be()),null;var l=ar(e,t);if(e.tag!==0&&l===2){var s=Sr(e);s!==0&&(t=s,l=Wa(e,s))}if(l===1)throw l=Wl,Cn(e,0),cn(e,t),tt(e,Be()),l;if(l===6)throw Error(u(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,In(e,et,zt),tt(e,Be()),null}function Ya(e,t){var l=me;me|=1;try{return e(t)}finally{me=l,me===0&&(nl=Be()+500,Bs&&nn())}}function En(e){on!==null&&on.tag===0&&(me&6)===0&&ll();var t=me;me|=1;var l=ut.transition,s=ye;try{if(ut.transition=null,ye=1,e)return e()}finally{ye=s,ut.transition=l,me=t,(me&6)===0&&nn()}}function Ja(){at=tl.current,Ce(tl)}function Cn(e,t){e.finishedWork=null,e.finishedLanes=0;var l=e.timeoutHandle;if(l!==-1&&(e.timeoutHandle=-1,Lu(l)),Fe!==null)for(l=Fe.return;l!==null;){var s=l;switch(la(s),s.tag){case 1:s=s.type.childContextTypes,s!=null&&Ls();break;case 3:qn(),Ce(Ge),Ce(We),xa();break;case 5:pa(s);break;case 4:qn();break;case 13:Ce(De);break;case 19:Ce(De);break;case 10:da(s.type._context);break;case 22:case 23:Ja()}l=l.return}if(Ae=e,Fe=e=un(e.current,null),He=at=t,$e=0,Wl=null,Aa=er=kn=0,et=Ql=null,bn!==null){for(t=0;t<bn.length;t++)if(l=bn[t],s=l.interleaved,s!==null){l.interleaved=null;var r=s.next,a=l.pending;if(a!==null){var o=a.next;a.next=r,s.next=o}l.pending=s}bn=null}return e}function zd(e,t){do{var l=Fe;try{if(oa(),Us.current=Ys,Hs){for(var s=Le.memoizedState;s!==null;){var r=s.queue;r!==null&&(r.pending=null),s=s.next}Hs=!1}if(_n=0,Oe=Me=Le=null,zl=!1,Ol=0,Oa.current=null,l===null||l.return===null){$e=1,Wl=t,Fe=null;break}e:{var a=e,o=l.return,c=l,m=t;if(t=He,c.flags|=32768,m!==null&&typeof m=="object"&&typeof m.then=="function"){var g=m,N=c,b=N.tag;if((N.mode&1)===0&&(b===0||b===11||b===15)){var w=N.alternate;w?(N.updateQueue=w.updateQueue,N.memoizedState=w.memoizedState,N.lanes=w.lanes):(N.updateQueue=null,N.memoizedState=null)}var R=cd(o);if(R!==null){R.flags&=-257,ud(R,o,c,a,t),R.mode&1&&dd(a,g,t),t=R,m=g;var M=t.updateQueue;if(M===null){var $=new Set;$.add(m),t.updateQueue=$}else M.add(m);break e}else{if((t&1)===0){dd(a,g,t),Ka();break e}m=Error(u(426))}}else if(Ie&&c.mode&1){var Re=cd(o);if(Re!==null){(Re.flags&65536)===0&&(Re.flags|=256),ud(Re,o,c,a,t),aa(Xn(m,c));break e}}a=m=Xn(m,c),$e!==4&&($e=2),Ql===null?Ql=[a]:Ql.push(a),a=o;do{switch(a.tag){case 3:a.flags|=65536,t&=-t,a.lanes|=t;var h=id(a,m,t);Ro(a,h);break e;case 1:c=m;var f=a.type,x=a.stateNode;if((a.flags&128)===0&&(typeof f.getDerivedStateFromError=="function"||x!==null&&typeof x.componentDidCatch=="function"&&(an===null||!an.has(x)))){a.flags|=65536,t&=-t,a.lanes|=t;var _=od(a,c,t);Ro(a,_);break e}}a=a.return}while(a!==null)}Vd(l)}catch(A){t=A,Fe===l&&l!==null&&(Fe=l=l.return);continue}break}while(!0)}function Od(){var e=Xs.current;return Xs.current=Ys,e===null?Ys:e}function Ka(){($e===0||$e===3||$e===2)&&($e=4),Ae===null||(kn&268435455)===0&&(er&268435455)===0||cn(Ae,He)}function ar(e,t){var l=me;me|=2;var s=Od();(Ae!==e||He!==t)&&(zt=null,Cn(e,t));do try{nm();break}catch(r){zd(e,r)}while(!0);if(oa(),me=l,Xs.current=s,Fe!==null)throw Error(u(261));return Ae=null,He=0,$e}function nm(){for(;Fe!==null;)Ad(Fe)}function lm(){for(;Fe!==null&&!Cc();)Ad(Fe)}function Ad(e){var t=Wd(e.alternate,e,at);e.memoizedProps=e.pendingProps,t===null?Vd(e):Fe=t,Oa.current=null}function Vd(e){var t=e;do{var l=t.alternate;if(e=t.return,(t.flags&32768)===0){if(l=Ku(l,t,at),l!==null){Fe=l;return}}else{if(l=Zu(l,t),l!==null){l.flags&=32767,Fe=l;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{$e=6,Fe=null;return}}if(t=t.sibling,t!==null){Fe=t;return}Fe=t=e}while(t!==null);$e===0&&($e=5)}function In(e,t,l){var s=ye,r=ut.transition;try{ut.transition=null,ye=1,sm(e,t,l,s)}finally{ut.transition=r,ye=s}return null}function sm(e,t,l,s){do ll();while(on!==null);if((me&6)!==0)throw Error(u(327));l=e.finishedWork;var r=e.finishedLanes;if(l===null)return null;if(e.finishedWork=null,e.finishedLanes=0,l===e.current)throw Error(u(177));e.callbackNode=null,e.callbackPriority=0;var a=l.lanes|l.childLanes;if($c(e,a),e===Ae&&(Fe=Ae=null,He=0),(l.subtreeFlags&2064)===0&&(l.flags&2064)===0||nr||(nr=!0,Qd(cs,function(){return ll(),null})),a=(l.flags&15990)!==0,(l.subtreeFlags&15990)!==0||a){a=ut.transition,ut.transition=null;var o=ye;ye=1;var c=me;me|=4,Oa.current=null,qu(e,l),Td(l,e),Su(Kr),gs=!!Jr,Kr=Jr=null,e.current=l,Xu(l),Ic(),me=c,ye=o,ut.transition=a}else e.current=l;if(nr&&(nr=!1,on=e,lr=r),a=e.pendingLanes,a===0&&(an=null),Tc(l.stateNode),tt(e,Be()),t!==null)for(s=e.onRecoverableError,l=0;l<t.length;l++)r=t[l],s(r.value,{componentStack:r.stack,digest:r.digest});if(tr)throw tr=!1,e=Ua,Ua=null,e;return(lr&1)!==0&&e.tag!==0&&ll(),a=e.pendingLanes,(a&1)!==0?e===Ha?Yl++:(Yl=0,Ha=e):Yl=0,nn(),null}function ll(){if(on!==null){var e=Ii(lr),t=ut.transition,l=ye;try{if(ut.transition=null,ye=16>e?16:e,on===null)var s=!1;else{if(e=on,on=null,lr=0,(me&6)!==0)throw Error(u(331));var r=me;for(me|=4,F=e.current;F!==null;){var a=F,o=a.child;if((F.flags&16)!==0){var c=a.deletions;if(c!==null){for(var m=0;m<c.length;m++){var g=c[m];for(F=g;F!==null;){var N=F;switch(N.tag){case 0:case 11:case 15:Hl(8,N,a)}var b=N.child;if(b!==null)b.return=N,F=b;else for(;F!==null;){N=F;var w=N.sibling,R=N.return;if(Ed(N),N===g){F=null;break}if(w!==null){w.return=R,F=w;break}F=R}}}var M=a.alternate;if(M!==null){var $=M.child;if($!==null){M.child=null;do{var Re=$.sibling;$.sibling=null,$=Re}while($!==null)}}F=a}}if((a.subtreeFlags&2064)!==0&&o!==null)o.return=a,F=o;else e:for(;F!==null;){if(a=F,(a.flags&2048)!==0)switch(a.tag){case 0:case 11:case 15:Hl(9,a,a.return)}var h=a.sibling;if(h!==null){h.return=a.return,F=h;break e}F=a.return}}var f=e.current;for(F=f;F!==null;){o=F;var x=o.child;if((o.subtreeFlags&2064)!==0&&x!==null)x.return=o,F=x;else e:for(o=f;F!==null;){if(c=F,(c.flags&2048)!==0)try{switch(c.tag){case 0:case 11:case 15:qs(9,c)}}catch(A){Te(c,c.return,A)}if(c===o){F=null;break e}var _=c.sibling;if(_!==null){_.return=c.return,F=_;break e}F=c.return}}if(me=r,nn(),St&&typeof St.onPostCommitFiberRoot=="function")try{St.onPostCommitFiberRoot(us,e)}catch{}s=!0}return s}finally{ye=l,ut.transition=t}}return!1}function Ud(e,t,l){t=Xn(l,t),t=id(e,t,1),e=sn(e,t,1),t=Ze(),e!==null&&(gl(e,1,t),tt(e,t))}function Te(e,t,l){if(e.tag===3)Ud(e,e,l);else for(;t!==null;){if(t.tag===3){Ud(t,e,l);break}else if(t.tag===1){var s=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&(an===null||!an.has(s))){e=Xn(l,e),e=od(t,e,1),t=sn(t,e,1),e=Ze(),t!==null&&(gl(t,1,e),tt(t,e));break}}t=t.return}}function rm(e,t,l){var s=e.pingCache;s!==null&&s.delete(t),t=Ze(),e.pingedLanes|=e.suspendedLanes&l,Ae===e&&(He&l)===l&&($e===4||$e===3&&(He&130023424)===He&&500>Be()-Va?Cn(e,0):Aa|=l),tt(e,t)}function Hd(e,t){t===0&&((e.mode&1)===0?t=1:(t=fs,fs<<=1,(fs&130023424)===0&&(fs=4194304)));var l=Ze();e=Pt(e,t),e!==null&&(gl(e,t,l),tt(e,l))}function am(e){var t=e.memoizedState,l=0;t!==null&&(l=t.retryLane),Hd(e,l)}function im(e,t){var l=0;switch(e.tag){case 13:var s=e.stateNode,r=e.memoizedState;r!==null&&(l=r.retryLane);break;case 19:s=e.stateNode;break;default:throw Error(u(314))}s!==null&&s.delete(t),Hd(e,l)}var Wd;Wd=function(e,t,l){if(e!==null)if(e.memoizedProps!==t.pendingProps||Ge.current)Xe=!0;else{if((e.lanes&l)===0&&(t.flags&128)===0)return Xe=!1,Ju(e,t,l);Xe=(e.flags&131072)!==0}else Xe=!1,Ie&&(t.flags&1048576)!==0&&So(t,Fs,t.index);switch(t.lanes=0,t.tag){case 2:var s=t.type;Zs(e,t),e=t.pendingProps;var r=Wn(t,We.current);Gn(t,l),r=va(null,t,s,e,r,l);var a=ja();return t.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,qe(s)?(a=!0,Ts(t)):a=!1,t.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,ma(t),r.updater=Js,t.stateNode=r,r._reactInternals=t,ka(t,s,e,l),t=Da(null,t,s,!0,a,l)):(t.tag=0,Ie&&a&&na(t),Ke(null,t,r,l),t=t.child),t;case 16:s=t.elementType;e:{switch(Zs(e,t),e=t.pendingProps,r=s._init,s=r(s._payload),t.type=s,r=t.tag=dm(s),e=gt(s,e),r){case 0:t=Ia(null,t,s,e,l);break e;case 1:t=gd(null,t,s,e,l);break e;case 11:t=md(null,t,s,e,l);break e;case 14:t=fd(null,t,s,gt(s.type,e),l);break e}throw Error(u(306,s,""))}return t;case 0:return s=t.type,r=t.pendingProps,r=t.elementType===s?r:gt(s,r),Ia(e,t,s,r,l);case 1:return s=t.type,r=t.pendingProps,r=t.elementType===s?r:gt(s,r),gd(e,t,s,r,l);case 3:e:{if(yd(t),e===null)throw Error(u(387));s=t.pendingProps,a=t.memoizedState,r=a.element,Bo(e,t),As(t,s,null,l);var o=t.memoizedState;if(s=o.element,a.isDehydrated)if(a={element:s,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){r=Xn(Error(u(423)),t),t=vd(e,t,s,l,r);break e}else if(s!==r){r=Xn(Error(u(424)),t),t=vd(e,t,s,l,r);break e}else for(rt=Xt(t.stateNode.containerInfo.firstChild),st=t,Ie=!0,xt=null,l=Lo(t,null,s,l),t.child=l;l;)l.flags=l.flags&-3|4096,l=l.sibling;else{if(Jn(),s===r){t=$t(e,t,l);break e}Ke(e,t,s,l)}t=t.child}return t;case 5:return Po(t),e===null&&ra(t),s=t.type,r=t.pendingProps,a=e!==null?e.memoizedProps:null,o=r.children,Zr(s,r)?o=null:a!==null&&Zr(s,a)&&(t.flags|=32),xd(e,t),Ke(e,t,o,l),t.child;case 6:return e===null&&ra(t),null;case 13:return jd(e,t,l);case 4:return fa(t,t.stateNode.containerInfo),s=t.pendingProps,e===null?t.child=Kn(t,null,s,l):Ke(e,t,s,l),t.child;case 11:return s=t.type,r=t.pendingProps,r=t.elementType===s?r:gt(s,r),md(e,t,s,r,l);case 7:return Ke(e,t,t.pendingProps,l),t.child;case 8:return Ke(e,t,t.pendingProps.children,l),t.child;case 12:return Ke(e,t,t.pendingProps.children,l),t.child;case 10:e:{if(s=t.type._context,r=t.pendingProps,a=t.memoizedProps,o=r.value,Se($s,s._currentValue),s._currentValue=o,a!==null)if(ht(a.value,o)){if(a.children===r.children&&!Ge.current){t=$t(e,t,l);break e}}else for(a=t.child,a!==null&&(a.return=t);a!==null;){var c=a.dependencies;if(c!==null){o=a.child;for(var m=c.firstContext;m!==null;){if(m.context===s){if(a.tag===1){m=Mt(-1,l&-l),m.tag=2;var g=a.updateQueue;if(g!==null){g=g.shared;var N=g.pending;N===null?m.next=m:(m.next=N.next,N.next=m),g.pending=m}}a.lanes|=l,m=a.alternate,m!==null&&(m.lanes|=l),ca(a.return,l,t),c.lanes|=l;break}m=m.next}}else if(a.tag===10)o=a.type===t.type?null:a.child;else if(a.tag===18){if(o=a.return,o===null)throw Error(u(341));o.lanes|=l,c=o.alternate,c!==null&&(c.lanes|=l),ca(o,l,t),o=a.sibling}else o=a.child;if(o!==null)o.return=a;else for(o=a;o!==null;){if(o===t){o=null;break}if(a=o.sibling,a!==null){a.return=o.return,o=a;break}o=o.return}a=o}Ke(e,t,r.children,l),t=t.child}return t;case 9:return r=t.type,s=t.pendingProps.children,Gn(t,l),r=dt(r),s=s(r),t.flags|=1,Ke(e,t,s,l),t.child;case 14:return s=t.type,r=gt(s,t.pendingProps),r=gt(s.type,r),fd(e,t,s,r,l);case 15:return pd(e,t,t.type,t.pendingProps,l);case 17:return s=t.type,r=t.pendingProps,r=t.elementType===s?r:gt(s,r),Zs(e,t),t.tag=1,qe(s)?(e=!0,Ts(t)):e=!1,Gn(t,l),rd(t,s,r),ka(t,s,r,l),Da(null,t,s,!0,e,l);case 19:return Nd(e,t,l);case 22:return hd(e,t,l)}throw Error(u(156,t.tag))};function Qd(e,t){return Si(e,t)}function om(e,t,l,s){this.tag=e,this.key=l,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function mt(e,t,l,s){return new om(e,t,l,s)}function Za(e){return e=e.prototype,!(!e||!e.isReactComponent)}function dm(e){if(typeof e=="function")return Za(e)?1:0;if(e!=null){if(e=e.$$typeof,e===je)return 11;if(e===H)return 14}return 2}function un(e,t){var l=e.alternate;return l===null?(l=mt(e.tag,t,e.key,e.mode),l.elementType=e.elementType,l.type=e.type,l.stateNode=e.stateNode,l.alternate=e,e.alternate=l):(l.pendingProps=t,l.type=e.type,l.flags=0,l.subtreeFlags=0,l.deletions=null),l.flags=e.flags&14680064,l.childLanes=e.childLanes,l.lanes=e.lanes,l.child=e.child,l.memoizedProps=e.memoizedProps,l.memoizedState=e.memoizedState,l.updateQueue=e.updateQueue,t=e.dependencies,l.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},l.sibling=e.sibling,l.index=e.index,l.ref=e.ref,l}function ir(e,t,l,s,r,a){var o=2;if(s=e,typeof e=="function")Za(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case xe:return Dn(l.children,r,a,t);case U:o=8,r|=8;break;case q:return e=mt(12,l,t,r|2),e.elementType=q,e.lanes=a,e;case be:return e=mt(13,l,t,r),e.elementType=be,e.lanes=a,e;case ke:return e=mt(19,l,t,r),e.elementType=ke,e.lanes=a,e;case se:return or(l,r,a,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case ge:o=10;break e;case Ne:o=9;break e;case je:o=11;break e;case H:o=14;break e;case ne:o=16,s=null;break e}throw Error(u(130,e==null?e:typeof e,""))}return t=mt(o,l,t,r),t.elementType=e,t.type=s,t.lanes=a,t}function Dn(e,t,l,s){return e=mt(7,e,s,t),e.lanes=l,e}function or(e,t,l,s){return e=mt(22,e,s,t),e.elementType=se,e.lanes=l,e.stateNode={isHidden:!1},e}function Ga(e,t,l){return e=mt(6,e,null,t),e.lanes=l,e}function qa(e,t,l){return t=mt(4,e.children!==null?e.children:[],e.key,t),t.lanes=l,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function cm(e,t,l,s,r){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=_r(0),this.expirationTimes=_r(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=_r(0),this.identifierPrefix=s,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Xa(e,t,l,s,r,a,o,c,m){return e=new cm(e,t,l,c,m),t===1?(t=1,a===!0&&(t|=8)):t=0,a=mt(3,null,null,t),e.current=a,a.stateNode=e,a.memoizedState={element:s,isDehydrated:l,cache:null,transitions:null,pendingSuspenseBoundaries:null},ma(a),e}function um(e,t,l){var s=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:de,key:s==null?null:""+s,children:e,containerInfo:t,implementation:l}}function Yd(e){if(!e)return tn;e=e._reactInternals;e:{if(yn(e)!==e||e.tag!==1)throw Error(u(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(qe(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(u(171))}if(e.tag===1){var l=e.type;if(qe(l))return wo(e,l,t)}return t}function Jd(e,t,l,s,r,a,o,c,m){return e=Xa(l,s,!0,e,r,a,o,c,m),e.context=Yd(null),l=e.current,s=Ze(),r=dn(l),a=Mt(s,r),a.callback=t??null,sn(l,a,r),e.current.lanes=r,gl(e,r,s),tt(e,s),e}function dr(e,t,l,s){var r=t.current,a=Ze(),o=dn(r);return l=Yd(l),t.context===null?t.context=l:t.pendingContext=l,t=Mt(a,o),t.payload={element:e},s=s===void 0?null:s,s!==null&&(t.callback=s),e=sn(r,t,o),e!==null&&(jt(e,r,o,a),Os(e,r,o)),o}function cr(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Kd(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var l=e.retryLane;e.retryLane=l!==0&&l<t?l:t}}function ei(e,t){Kd(e,t),(e=e.alternate)&&Kd(e,t)}function mm(){return null}var Zd=typeof reportError=="function"?reportError:function(e){console.error(e)};function ti(e){this._internalRoot=e}ur.prototype.render=ti.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(u(409));dr(e,t,null,null)},ur.prototype.unmount=ti.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;En(function(){dr(null,e,null,null)}),t[Tt]=null}};function ur(e){this._internalRoot=e}ur.prototype.unstable_scheduleHydration=function(e){if(e){var t=Ti();e={blockedOn:null,target:e,priority:t};for(var l=0;l<Zt.length&&t!==0&&t<Zt[l].priority;l++);Zt.splice(l,0,e),l===0&&Fi(e)}};function ni(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function mr(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Gd(){}function fm(e,t,l,s,r){if(r){if(typeof s=="function"){var a=s;s=function(){var g=cr(o);a.call(g)}}var o=Jd(t,s,e,0,null,!1,!1,"",Gd);return e._reactRootContainer=o,e[Tt]=o.current,Ll(e.nodeType===8?e.parentNode:e),En(),o}for(;r=e.lastChild;)e.removeChild(r);if(typeof s=="function"){var c=s;s=function(){var g=cr(m);c.call(g)}}var m=Xa(e,0,!1,null,null,!1,!1,"",Gd);return e._reactRootContainer=m,e[Tt]=m.current,Ll(e.nodeType===8?e.parentNode:e),En(function(){dr(t,m,l,s)}),m}function fr(e,t,l,s,r){var a=l._reactRootContainer;if(a){var o=a;if(typeof r=="function"){var c=r;r=function(){var m=cr(o);c.call(m)}}dr(t,o,e,r)}else o=fm(l,t,e,r,s);return cr(o)}Di=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var l=xl(t.pendingLanes);l!==0&&(kr(t,l|1),tt(t,Be()),(me&6)===0&&(nl=Be()+500,nn()))}break;case 13:En(function(){var s=Pt(e,1);if(s!==null){var r=Ze();jt(s,e,1,r)}}),ei(e,1)}},Er=function(e){if(e.tag===13){var t=Pt(e,134217728);if(t!==null){var l=Ze();jt(t,e,134217728,l)}ei(e,134217728)}},Li=function(e){if(e.tag===13){var t=dn(e),l=Pt(e,t);if(l!==null){var s=Ze();jt(l,e,t,s)}ei(e,t)}},Ti=function(){return ye},Bi=function(e,t){var l=ye;try{return ye=e,t()}finally{ye=l}},pl=function(e,t,l){switch(t){case"input":if(il(e,l),t=l.name,l.type==="radio"&&t!=null){for(l=e;l.parentNode;)l=l.parentNode;for(l=l.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<l.length;t++){var s=l[t];if(s!==e&&s.form===e.form){var r=Ds(s);if(!r)throw Error(u(90));Ot(s),il(s,r)}}}break;case"textarea":dl(e,l);break;case"select":t=l.value,t!=null&&Vt(e,!!l.multiple,t,!1)}},is=Ya,os=En;var pm={usingClientEntryPoint:!1,Events:[Rl,Un,Ds,rs,as,Ya]},Jl={findFiberByHostInstance:vn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},hm={bundleType:Jl.bundleType,version:Jl.version,rendererPackageName:Jl.rendererPackageName,rendererConfig:Jl.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ie.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Ni(e),e===null?null:e.stateNode},findFiberByHostInstance:Jl.findFiberByHostInstance||mm,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var pr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!pr.isDisabled&&pr.supportsFiber)try{us=pr.inject(hm),St=pr}catch{}}return nt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=pm,nt.createPortal=function(e,t){var l=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ni(t))throw Error(u(200));return um(e,t,null,l)},nt.createRoot=function(e,t){if(!ni(e))throw Error(u(299));var l=!1,s="",r=Zd;return t!=null&&(t.unstable_strictMode===!0&&(l=!0),t.identifierPrefix!==void 0&&(s=t.identifierPrefix),t.onRecoverableError!==void 0&&(r=t.onRecoverableError)),t=Xa(e,1,!1,null,null,l,!1,s,r),e[Tt]=t.current,Ll(e.nodeType===8?e.parentNode:e),new ti(t)},nt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(u(188)):(e=Object.keys(e).join(","),Error(u(268,e)));return e=Ni(t),e=e===null?null:e.stateNode,e},nt.flushSync=function(e){return En(e)},nt.hydrate=function(e,t,l){if(!mr(t))throw Error(u(200));return fr(null,e,t,!0,l)},nt.hydrateRoot=function(e,t,l){if(!ni(e))throw Error(u(405));var s=l!=null&&l.hydratedSources||null,r=!1,a="",o=Zd;if(l!=null&&(l.unstable_strictMode===!0&&(r=!0),l.identifierPrefix!==void 0&&(a=l.identifierPrefix),l.onRecoverableError!==void 0&&(o=l.onRecoverableError)),t=Jd(t,null,e,1,l??null,r,!1,a,o),e[Tt]=t.current,Ll(e),s)for(e=0;e<s.length;e++)l=s[e],r=l._getVersion,r=r(l._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[l,r]:t.mutableSourceEagerHydrationData.push(l,r);return new ur(t)},nt.render=function(e,t,l){if(!mr(t))throw Error(u(200));return fr(null,e,t,!1,l)},nt.unmountComponentAtNode=function(e){if(!mr(e))throw Error(u(40));return e._reactRootContainer?(En(function(){fr(null,null,e,!1,function(){e._reactRootContainer=null,e[Tt]=null})}),!0):!1},nt.unstable_batchedUpdates=Ya,nt.unstable_renderSubtreeIntoContainer=function(e,t,l,s){if(!mr(l))throw Error(u(200));if(e==null||e._reactInternals===void 0)throw Error(u(38));return fr(e,t,l,!1,s)},nt.version="18.3.1-next-f1338f8080-20240426",nt}var rc;function gc(){if(rc)return ri.exports;rc=1;function i(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i)}catch(d){console.error(d)}}return i(),ri.exports=Nm(),ri.exports}var ac;function bm(){if(ac)return hr;ac=1;var i=gc();return hr.createRoot=i.createRoot,hr.hydrateRoot=i.hydrateRoot,hr}var Sm=bm();function _m({size:i=20}){return n.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",width:i,height:i,children:n.jsx("path",{d:"M12 2 4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-2 13-2-2 1.41-1.41L10 12.17l4.59-4.58L16 9l-6 6z"})})}function km(){return n.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",width:20,height:20,children:n.jsx("path",{d:"M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"})})}function Em(){return n.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",width:20,height:20,children:n.jsx("path",{d:"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"})})}function Cm(){return n.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",width:20,height:20,children:n.jsx("path",{d:"M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"})})}function Im(){return n.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",width:20,height:20,children:n.jsx("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"})})}function Dm(){return n.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",width:18,height:18,children:n.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"})})}function Lm(){return n.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",width:16,height:16,children:n.jsx("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"})})}function Tm(){return n.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",width:11,height:11,children:n.jsx("path",{d:"M7 14l5-5 5 5H7z"})})}function Bm(){return n.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",width:11,height:11,children:n.jsx("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"})})}function Rm(){return n.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",width:11,height:11,children:n.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 5H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"})})}function Fm(){return n.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2.2,width:17,height:17,children:n.jsx("path",{d:"M5 12h14M13 6l6 6-6 6",strokeLinecap:"round",strokeLinejoin:"round"})})}function Pm({data:i,color:d,glow:u}){const E=Math.min(...i),C=Math.max(...i),P=i.map((V,W)=>{const Q=W/(i.length-1)*190,Y=50-(V-E)/(C-E||1)*42-4;return`${Q},${Y}`}),S=`M${P.join(" L")}`,D=`M0,50 L${P.join(" L")} L190,50 Z`,B=`g${d.replace("#","")}`,z=190,G=50-(i[i.length-1]-E)/(C-E||1)*42-4;return n.jsxs("svg",{width:190,height:50,viewBox:"0 0 190 50",style:{display:"block",overflow:"visible"},children:[n.jsx("defs",{children:n.jsxs("linearGradient",{id:B,x1:"0",y1:"0",x2:"0",y2:"1",children:[n.jsx("stop",{offset:"0%",stopColor:d,stopOpacity:".32"}),n.jsx("stop",{offset:"100%",stopColor:d,stopOpacity:"0"})]})}),n.jsx("path",{d:D,fill:`url(#${B})`}),n.jsx("path",{d:S,fill:"none",stroke:d,strokeWidth:"1.8",style:{filter:`drop-shadow(0 0 5px ${u})`}}),n.jsx("circle",{cx:z,cy:G,r:"3.5",fill:d,style:{filter:`drop-shadow(0 0 6px ${u})`}})]})}const Mm=[42,58,51,73,65,88,76,92,84,97,89,108],$m=[{init:"SK",name:"Somchai K.",action:"Payment received",amount:"฿32,000",status:"paid",color:"#3b82f6"},{init:"NW",name:"Narin W.",action:"Case filed",amount:"฿9,500",status:"filed",color:"#8b5cf6"},{init:"MT",name:"Malee T.",action:"Judgment issued",amount:"฿4,200",status:"judged",color:"#14b8a6"}],zm={paid:{color:"#16a34a",icon:n.jsx(Bm,{}),label:"Paid"},filed:{color:"#2563eb",icon:n.jsx(Tm,{}),label:"Filed"},judged:{color:"#7c3aed",icon:n.jsx(Rm,{}),label:"Judged"}};function Om(){return n.jsx("aside",{className:"rp","aria-hidden":"true",children:n.jsxs("div",{className:"rp-inner",children:[n.jsxs("div",{className:"rp-top",children:[n.jsxs("div",{className:"rp-tag",children:[n.jsx("span",{className:"rp-tag-dot"}),"Secured workspace"]}),n.jsx("h2",{className:"rp-headline",children:"LQD Management System"}),n.jsx("p",{className:"rp-sub",children:"ศูนย์กลางสำหรับจัดการข้อมูลลูกหนี้ บันทึกการชำระเงิน และติดตามพอร์ตงานคดี"})]}),n.jsxs("div",{className:"rp-card hero-card",children:[n.jsxs("div",{children:[n.jsx("p",{className:"hero-eyebrow",children:"PORTFOLIO SNAPSHOT"}),n.jsx("p",{className:"hero-num",children:"฿284,920"}),n.jsx("p",{className:"hero-caption",children:"Outstanding balance under active monitoring"})]}),n.jsx("div",{className:"hero-chart",children:n.jsx(Pm,{data:Mm,color:"#2563eb",glow:"rgba(37,99,235,.6)"})})]}),n.jsx("div",{className:"pills",children:[{label:"Active cases",val:"2,418",color:"#2563eb"},{label:"Filing",val:"684",color:"#4f46e5"},{label:"Judged",val:"86",color:"#0f766e"}].map((i,d)=>n.jsxs("div",{className:"rp-card pill",children:[n.jsx("p",{className:"pill-label",children:i.label}),n.jsx("p",{className:"pill-val",style:{color:i.color},children:i.val})]},i.label))}),n.jsxs("div",{className:"rp-card feed",children:[n.jsxs("div",{className:"feed-head",children:[n.jsx("p",{className:"feed-title",children:"Today's queue"}),n.jsxs("span",{className:"feed-live",children:[n.jsx("span",{className:"live-dot"}),"Updated"]})]}),n.jsx("div",{className:"feed-rows",children:$m.map((i,d)=>{const u=zm[i.status];return n.jsxs("div",{className:"feed-row",style:{animationDelay:`${.45+d*.09}s`},children:[n.jsx("div",{className:"avatar",style:{background:i.color},children:i.init}),n.jsxs("div",{className:"feed-info",children:[n.jsx("p",{className:"feed-name",children:i.name}),n.jsx("p",{className:"feed-action",children:i.action})]}),n.jsxs("div",{className:"feed-right",children:[n.jsx("p",{className:"feed-amount",children:i.amount}),n.jsxs("span",{className:"feed-badge",style:{color:u.color,borderColor:`${u.color}40`,background:`${u.color}12`},children:[u.icon,u.label]})]})]},d)})})]})]})})}function Am(){const[i,d]=k.useState(""),[u,v]=k.useState(""),[y,E]=k.useState(!1),[C,P]=k.useState(""),[S,D]=k.useState(!1),[B,z]=k.useState(!1),[G,V]=k.useState(!1),[W,Q]=k.useState(!1),Y=()=>P(""),ve=ie=>{P(ie),z(!0),setTimeout(()=>z(!1),420)},_e=async ie=>{if(ie.preventDefault(),Y(),!i.trim()||!u){ve("Please enter your username and password.");return}D(!0);try{const he=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:i.trim(),password:u})}),de=await he.json();he.ok?(sessionStorage.setItem("role",de.user.role),sessionStorage.setItem("display_name",de.user.display_name),de.password_warning_days?(sessionStorage.setItem("password_warning_days",de.password_warning_days),sessionStorage.removeItem("password_warning_seen")):(sessionStorage.removeItem("password_warning_days"),sessionStorage.removeItem("password_warning_seen")),window.location.href=de.redirect_to||"/inventory"):ve(de.error||"Incorrect username or password.")}catch{ve("Unable to connect to the server. Please try again.")}finally{D(!1)}},pe=!!C;return n.jsxs("main",{className:"lp",children:[n.jsx("div",{className:"lp-blob lp-blob1"}),n.jsx("div",{className:"lp-blob lp-blob2"}),n.jsxs("div",{className:"lp-logo",children:[n.jsx("div",{className:"lp-logo-icon",children:n.jsx(_m,{size:21})}),n.jsxs("div",{className:"lp-logo-text",children:[n.jsx("span",{className:"lp-logo-name",children:"LQD Tracking"}),n.jsx("span",{className:"lp-logo-sub",children:"Debt Management System"})]})]}),n.jsx("div",{className:"lp-center",children:n.jsxs("div",{style:{maxWidth:340,width:"100%"},children:[n.jsxs("h1",{className:"lp-h1",children:["Welcome back",n.jsx("span",{children:"."})]}),n.jsxs("p",{className:"lp-tagline",children:["เข้าสู่ระบบเพื่อบริหารจัดการพอร์ตหนี้",n.jsx("br",{}),"และติดตามสถานะคดี"]}),C&&n.jsxs("div",{className:`lp-err${B?" shake":""}`,children:[n.jsx("span",{className:"lp-err-ico",children:n.jsx(Dm,{})}),n.jsx("p",{className:"lp-err-msg",children:C}),n.jsx("button",{type:"button",onClick:Y,className:"lp-err-x",children:n.jsx(Lm,{})})]}),n.jsxs("form",{onSubmit:_e,className:B?"shake":"",children:[n.jsxs("div",{className:"lp-field",children:[n.jsx("label",{className:"lp-label",htmlFor:"username",children:"Username"}),n.jsxs("div",{className:`lp-input-wrap${pe?" errored":G?" focused":""}`,children:[n.jsx("span",{className:"lp-ico",children:n.jsx(km,{})}),n.jsx("input",{id:"username",className:"lp-inp",type:"text",autoComplete:"username",autoFocus:!0,placeholder:"Enter your username",value:i,onChange:ie=>{d(ie.target.value),Y()},onFocus:()=>V(!0),onBlur:()=>V(!1)})]})]}),n.jsxs("div",{className:"lp-field",children:[n.jsx("label",{className:"lp-label",htmlFor:"password",children:"Password"}),n.jsxs("div",{className:`lp-input-wrap${pe?" errored":W?" focused":""}`,children:[n.jsx("span",{className:"lp-ico",children:n.jsx(Em,{})}),n.jsx("input",{id:"password",className:"lp-inp",type:y?"text":"password",autoComplete:"current-password",placeholder:"Enter your password",value:u,onChange:ie=>{v(ie.target.value),Y()},onFocus:()=>Q(!0),onBlur:()=>Q(!1)}),n.jsx("button",{type:"button",className:"lp-eye",onClick:()=>E(ie=>!ie),children:y?n.jsx(Im,{}):n.jsx(Cm,{})})]})]}),n.jsx("button",{type:"submit",disabled:S,className:"lp-btn",children:S?n.jsxs(n.Fragment,{children:[n.jsx("span",{className:"lp-spin"}),"Signing in..."]}):n.jsxs(n.Fragment,{children:["Sign in",n.jsx(Fm,{})]})}),n.jsx("p",{className:"lp-forgot",children:"หากลืมรหัสผ่าน กรุณาติดต่อผู้ดูแลระบบ"})]})]})}),n.jsx("div",{className:"lp-foot",children:n.jsxs("div",{className:"lp-foot-stat",children:[n.jsx("span",{className:"lp-foot-dot"}),"All systems operational"]})})]})}function Vm(){return n.jsxs("div",{className:"shell",children:[n.jsx(Am,{}),n.jsx(Om,{})]})}function Um({roleLabel:i,avatar:d}){return n.jsxs("nav",{className:"fixed top-0 w-full z-50 bg-white border-b border-blue-100 flex justify-between items-center px-6 md:px-8 h-16 shadow-sm",children:[n.jsx("div",{className:"flex items-center gap-8 min-w-0",children:n.jsxs("span",{className:"text-xl tracking-tight text-primary font-headline flex items-center font-bold min-w-0",children:[n.jsx("div",{className:"w-10 h-10 bg-primary rounded-[10px] flex items-center justify-center shadow-lg shadow-indigo-200 mr-3 shrink-0",children:n.jsx("span",{className:"material-symbols-outlined text-white text-2xl font-normal",style:{fontVariationSettings:'"FILL" 1'},children:"shield"})}),n.jsx("span",{className:"truncate",children:"LQD Tracking Management System"})]})}),n.jsx("div",{className:"flex items-center gap-4",children:n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsxs("div",{className:"text-right hidden sm:block",children:[n.jsx("p",{className:"text-[10px] text-indigo-400 uppercase tracking-widest leading-none mb-1 font-bold",children:"System Role"}),n.jsx("p",{id:"nav-role",className:"text-xs text-indigo-900 font-semibold",children:i})]}),n.jsx("div",{className:"w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold border border-blue-100 shrink-0",children:n.jsx("span",{id:"nav-avatar",children:d})})]})})]})}function Hm({days:i,open:d,onClose:u}){return n.jsx("div",{id:"password-warning-modal",className:`${d?"flex":"hidden"} fixed inset-0 z-[90] items-center justify-center bg-slate-900/35 px-5 py-8`,children:n.jsxs("div",{className:"w-full max-w-[460px] overflow-hidden rounded-[16px] border border-blue-100 bg-white shadow-2xl",children:[n.jsxs("div",{className:"flex items-center justify-between border-b border-blue-50 px-5 py-4",children:[n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsx("div",{className:"grid h-10 w-10 place-items-center rounded-[12px] bg-blue-50 text-primary",children:n.jsx("span",{className:"material-symbols-outlined",style:{fontVariationSettings:'"FILL" 1'},children:"lock_clock"})}),n.jsx("h3",{className:"text-base font-bold text-slate-900",children:"Password Expiring"})]}),n.jsx("button",{type:"button",onClick:u,className:"text-slate-400 transition hover:text-slate-700","aria-label":"Close password warning",children:n.jsx("span",{className:"material-symbols-outlined",children:"close"})})]}),n.jsxs("div",{className:"space-y-5 p-5",children:[n.jsxs("p",{id:"password-warning-message",className:"text-sm font-medium leading-7 text-slate-600",children:["รหัสผ่านของคุณจะหมดอายุในอีก ",i||"-"," วัน กรุณาเปลี่ยนรหัสผ่านก่อนถึงกำหนด"]}),n.jsxs("div",{className:"grid grid-cols-1 gap-3 sm:grid-cols-2",children:[n.jsx("button",{type:"button",onClick:u,className:"h-11 rounded-[12px] border border-blue-100 bg-white text-sm font-bold text-slate-600 transition hover:bg-blue-50",children:"Later"}),n.jsx("button",{type:"button",onClick:()=>{window.location.href="/change-password"},className:"h-11 rounded-[12px] bg-primary text-sm font-bold text-white shadow-lg shadow-indigo-100 transition hover:bg-primary-muted",children:"Change Password"})]})]})]})})}function sl(i,d,u=!1){return[u?"hidden":"","group flex items-center gap-3 px-3.5 py-3 rounded-[10px] transition-all mb-1",i===d?"bg-primary text-white shadow-md shadow-indigo-100":"bg-transparent text-slate-600 hover:bg-blue-50 hover:text-primary font-medium"].filter(Boolean).join(" ")}function rl(i,d){return["material-symbols-outlined font-normal transition-colors",i!==d?"text-slate-400 group-hover:text-primary":""].filter(Boolean).join(" ")}function Wm({activePage:i,role:d,roleLabel:u,onLogout:v}){const y=d==="superadmin",E=d==="superadmin",C=d==="admin"||d==="superadmin";return n.jsxs("aside",{className:"fixed left-0 top-0 h-full w-56 z-40 bg-white border-r border-blue-100 flex flex-col p-3 gap-2 pt-20 hidden md:flex",children:[n.jsxs("div",{className:"px-3.5 py-4 mb-4 bg-blue-50/50 rounded-[12px] border border-blue-50",children:[n.jsx("h2",{className:"font-headline text-primary text-base font-bold",children:"LQD Debt Overview"}),n.jsxs("p",{id:"sidebar-role-label",className:"text-[10px] text-indigo-400 uppercase tracking-widest font-bold",children:[u," Terminal"]})]}),n.jsxs("nav",{className:"flex-1 space-y-1",children:[y&&n.jsxs("a",{id:"menu-users",href:"/users",className:sl(i,"users"),children:[n.jsx("span",{className:rl(i,"users"),style:i==="users"?{fontVariationSettings:'"FILL" 1'}:void 0,children:"manage_accounts"}),n.jsx("span",{className:`text-sm ${i==="users"?"font-semibold":""}`,children:"User Management"})]}),y&&n.jsxs("a",{id:"menu-password-policy",href:"/password-policy",className:sl(i,"password-policy"),children:[n.jsx("span",{className:rl(i,"password-policy"),style:i==="password-policy"?{fontVariationSettings:'"FILL" 1'}:void 0,children:"admin_panel_settings"}),n.jsx("span",{className:`text-sm ${i==="password-policy"?"font-semibold":""}`,children:"Password Policy"})]}),n.jsxs("a",{href:"/customer-list",className:sl(i,"customer-list",E),children:[n.jsx("span",{className:rl(i,"customer-list"),style:i==="customer-list"?{fontVariationSettings:'"FILL" 1'}:void 0,children:"groups"}),n.jsx("span",{className:`text-sm ${i==="customer-list"?"font-semibold":""}`,children:"Customer List"})]}),n.jsxs("a",{href:"/payment-record",className:sl(i,"payment-record",E),children:[n.jsx("span",{className:rl(i,"payment-record"),style:i==="payment-record"?{fontVariationSettings:'"FILL" 1'}:void 0,children:"history"}),n.jsx("span",{className:`text-sm ${i==="payment-record"?"font-semibold":""}`,children:"Payment Record"})]}),C&&n.jsxs("a",{id:"menu-import",href:"/data-import",className:sl(i,"data-import",E),children:[n.jsx("span",{className:rl(i,"data-import"),style:i==="data-import"?{fontVariationSettings:'"FILL" 1'}:void 0,children:"upload_file"}),n.jsx("span",{className:`text-sm ${i==="data-import"?"font-semibold":""}`,children:"Data Import Center"})]}),C&&n.jsxs("a",{id:"menu-report",href:"/report",className:sl(i,"report",E),children:[n.jsx("span",{className:rl(i,"report"),style:i==="report"?{fontVariationSettings:'"FILL" 1'}:void 0,children:"assessment"}),n.jsx("span",{className:`text-sm ${i==="report"?"font-semibold":""}`,children:"Report Center"})]})]}),n.jsx("div",{className:"mt-auto pt-4 border-t border-blue-50",children:n.jsxs("button",{type:"button",onClick:v,className:"w-full flex items-center gap-3 px-3.5 py-3 text-accent-coral text-sm hover:bg-red-50 rounded-[10px] transition-all font-bold cursor-pointer",children:[n.jsx("span",{className:"material-symbols-outlined font-normal",children:"logout"}),n.jsx("span",{children:"Log out"})]})})]})}const Qm={user:"User",admin:"Admin",superadmin:"Super Admin"};function Ym(i){var d;return((d=document.cookie.split("; ").find(u=>u.startsWith(`${i}=`)))==null?void 0:d.split("=")[1])||""}function Jm({activePage:i,children:d}){const[u]=k.useState(()=>sessionStorage.getItem("role")||""),[v]=k.useState(()=>sessionStorage.getItem("display_name")||""),[y,E]=k.useState(!1),[C]=k.useState(()=>sessionStorage.getItem("password_warning_days")),P=Qm[u]||u||"-",S=v.charAt(0)||"-";k.useEffect(()=>{if(C&&!sessionStorage.getItem("password_warning_seen")){sessionStorage.setItem("password_warning_seen","1");const B=window.setTimeout(()=>E(!0),300);return()=>window.clearTimeout(B)}},[C]);async function D(){const B=Ym("token");await fetch("/api/auth/logout",{method:"POST",headers:{Authorization:`Bearer ${B}`}}),document.cookie="token=; path=/; max-age=0",sessionStorage.clear(),window.location.href="/login"}return n.jsxs(n.Fragment,{children:[n.jsx(Um,{roleLabel:P,avatar:S}),n.jsx(Wm,{activePage:i,role:u,roleLabel:P,onLogout:D}),d,n.jsx(Hm,{days:C,open:y,onClose:()=>E(!1)})]})}const Km=`const role        = sessionStorage.getItem('role') || '';
    const displayName = sessionStorage.getItem('display_name') || '';

    function isAdminRole() {
        return role === 'admin';
    }

    function isUserRole() {
        return role === 'user';
    }

    function canRecordEnforcementRole() {
        return isUserRole() || isAdminRole();
    }

    function editPermissionMessage(caseStatus) {
        if (caseStatus === 'ยื่นฟ้อง') {
            return 'สถานะยื่นฟ้องอนุญาตให้ User และ Admin แก้ไขได้เท่านั้น';
        }
        return 'สถานะนี้อนุญาตให้แก้ไขได้เฉพาะ Admin เท่านั้น';
    }

    function canEditJudgmentData(caseStatus) {
        // ปิดบัญชีแล้วไม่ให้แก้จากหน้านี้ แม้เป็น admin
        if (caseStatus === 'ปิดบัญชี') return false;

        // สถานะยื่นฟ้องให้ user และ admin แก้ไขได้
        if (caseStatus === 'ยื่นฟ้อง') {
            return isUserRole() || isAdminRole();
        }

        // สถานะอื่นที่ยังแก้ได้ ต้องเป็น admin เท่านั้น
        return isAdminRole();
    }

    function canSeeAdminMenu() {
        // superadmin ยังเห็นเมนูส่วนจัดการระบบ/user ได้
        // แต่ไม่ได้สิทธิ์แก้ข้อมูลคดี
        return role === 'admin' || role === 'superadmin';
    }

    function getCookie(name) {
        return document.cookie.split('; ').find(r => r.startsWith(name + '='))?.split('=')[1] || '';
    }

    // ---- ดึง account_no จาก URL ----
    const urlParams  = new URLSearchParams(window.location.search);
    const accountNo  = urlParams.get('account') || '';
    let originalData = null;

    function getSafeReturnTo(fallback = '/customer-list') {
        const returnTo = urlParams.get('return_to') || '';
        if (returnTo.startsWith('/customer-list')) return returnTo;
        return fallback;
    }

    function setupUI() {
        if (!role) { window.location.href = '/login'; return; }
        if (!accountNo) { window.location.href = getSafeReturnTo('/customer-list'); return; }
        const backLink = document.getElementById('customer-detail-back-link');
        if (backLink) backLink.href = getSafeReturnTo('/customer-list');
        const roleLabels = { 'user': 'User', 'admin': 'Admin', 'superadmin': 'Super Admin' };
        const label = roleLabels[role] || role;
        document.getElementById('nav-role').textContent           = label;
        document.getElementById('sidebar-role-label').textContent = label + ' Terminal';
        document.getElementById('nav-avatar').textContent         = displayName.charAt(0) || '-';

        if (canSeeAdminMenu()) {
            document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'flex');
        }
    }

    function setDateRuleLocked(id, locked, title = '') {
        const display = document.getElementById('dp-display-' + id);
        if (!display) return;

        display.style.pointerEvents = locked ? 'none' : '';
        display.style.opacity = locked ? '1' : '';
        display.classList.toggle('cursor-not-allowed', locked);
        display.classList.toggle('dp-autocalc', locked);
        display.title = locked ? title : '';
    }

    function setJudgmentFormLocked(locked) {
        const editableInputIds = [
            'red-case-no',
            'total-debt',
            'principal',
            'interest-rate',
            'court-fee',
            'lawyer-fee',
            'installment-count',
            'installment-1',
            'installment-2',
            'installment-3',
            'installment-4',
            'default-interest-rate',
            'judgment-note'
        ];

        editableInputIds.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;

            el.readOnly = locked;
            el.classList.toggle('bg-slate-50/50', locked);
            el.classList.toggle('text-slate-500', locked);
            el.classList.toggle('cursor-not-allowed', locked);
        });

        applyRedCaseNoLock(locked);

        const editableDateIds = [
            'judgment-date',
            'first-due-date'
        ];

        editableDateIds.forEach(id => {
            setDateRuleLocked(id, locked);
        });

        // วันที่ยื่นฟ้องเป็นข้อมูลตั้งต้นของคดี ห้ามแก้ทั้งพิพากษาตามยอมและพิพากษาฝ่ายเดียว
        setDateRuleLocked('filing-date', true, 'วันที่ยื่นฟ้องไม่อนุญาตให้แก้ไขหลังสร้างคดี');

        const jtTrigger = document.getElementById('jt-trigger');
        if (jtTrigger) {
            jtTrigger.disabled = locked;
            jtTrigger.style.pointerEvents = locked ? 'none' : '';
            jtTrigger.classList.toggle('opacity-60', locked);
            jtTrigger.classList.toggle('cursor-not-allowed', locked);
        }

        const previewBtn = document.getElementById('preview-btn');
        if (previewBtn) {
            previewBtn.disabled = locked;
            previewBtn.classList.toggle('opacity-40', locked);
            previewBtn.classList.toggle('cursor-not-allowed', locked);
        }

        const monthlyBtn = document.getElementById('view-monthly-btn');
        const dailyBtn = document.getElementById('view-daily-btn');
        [monthlyBtn, dailyBtn].forEach(btn => {
            if (!btn) return;
            btn.disabled = false; // ปุ่มดูตารางยังให้กดได้
        });

        // หลัง lock/unlock ตามสิทธิ์แล้ว ให้ apply rule เฉพาะประเภทคำพิพากษาซ้ำ
        // เพื่อกันไม่ให้เคสพิพากษาฝ่ายเดียวถูกปลดล็อกกลับมาเป็นหลายงวด
        applyJudgmentTypeInputRules(false);
    }

    function applyRedCaseNoLock(lockedByPermission = false) {
        const el = document.getElementById('red-case-no');
        if (!el) return;

        const hasRecordedRedCaseNo = Boolean((originalData?.red_case_no || currentCus?.red_case_no || '').trim());
        const locked = lockedByPermission || hasRecordedRedCaseNo;

        el.readOnly = locked;
        el.disabled = locked;
        el.classList.toggle('autocalc-input', locked);
        el.classList.toggle('bg-slate-100', locked);
        el.classList.toggle('border-slate-300', locked);
        el.classList.toggle('text-slate-500', locked);
        el.classList.toggle('cursor-not-allowed', locked);
        el.style.opacity = locked ? '1' : '';
        el.title = hasRecordedRedCaseNo
            ? 'คดีหมายเลขแดงที่ถูกบันทึกครั้งแรกแล้ว ไม่อนุญาตให้แก้ไข'
            : '';
    }

    function getActiveJudgmentType() {
        const selected = document.getElementById('judgment-type')?.value || '';
        if (selected) return selected;

        // กรณีเป็นเคสที่บันทึกคำพิพากษาไปแล้ว dropdown จะถูกซ่อนไว้
        // ให้ใช้ case_status ปัจจุบันเป็นตัวบอกประเภทคำพิพากษาแทน
        return currentCus?.case_status || '';
    }

    function setInputRuleLocked(el, locked, title = '') {
        if (!el) return;

        el.readOnly = locked;
        el.classList.toggle('autocalc-input', locked);
        el.classList.toggle('bg-slate-100', locked);
        el.classList.toggle('border-slate-300', locked);
        el.classList.toggle('text-slate-500', locked);
        el.classList.toggle('cursor-not-allowed', locked);
        el.title = locked ? title : '';
    }

    function applyJudgmentTypeInputRules(triggerChanged = true) {
        const judgmentType = getActiveJudgmentType();
        const isDefaultJudgment = judgmentType === 'พิพากษาฝ่ายเดียว';
        const lockedByPermission = currentCus ? !canEditJudgmentData(currentCus.case_status) : false;

        const installmentCount = document.getElementById('installment-count');
        const installment2 = document.getElementById('installment-2');
        const installment3 = document.getElementById('installment-3');
        const installment4 = document.getElementById('installment-4');
        const followUpInstallments = [installment2, installment3, installment4];

        if (isDefaultJudgment) {
            if (installmentCount) {
                installmentCount.value = '1';
                hideFieldWarn('installment-count');
                setInputRuleLocked(installmentCount, true, 'พิพากษาฝ่ายเดียวกำหนดเป็น 1 งวดเท่านั้น');
            }

            followUpInstallments.forEach(el => {
                if (!el) return;
                el.value = '0.00';
                hideFieldWarn(el.id);
                setInputRuleLocked(el, true, 'พิพากษาฝ่ายเดียวไม่ต้องกรอกค่างวดที่ 2-4');
            });
        } else if (!lockedByPermission) {
            // พิพากษาตามยอม หรือยังไม่เลือกประเภท → ให้กลับไปใช้ logic เดิม
            setInputRuleLocked(installmentCount, false);
            followUpInstallments.forEach(el => setInputRuleLocked(el, false));
        }

        updateDateConstraints();
        calculateLastDueDate();
        validateBusinessRules(false);

        if (triggerChanged && typeof onInputChanged === 'function') {
            onInputChanged();
        }
    }

    // ---- โหลดข้อมูล customer จาก API ----
    async function loadCustomerData() {
        try {
            const res  = await fetch(\`/api/customers/\${accountNo}\`);
            if (!res.ok) { window.location.href = getSafeReturnTo('/customer-list'); return; }
            const data = await res.json();

            // สำคัญ: ต้อง set currentCus ก่อน set วันที่/เรียก applyJudgmentTypeInputRules
            // วันครบกำหนดงวดแรกเป็นวันเดียวกับวันพิพากษาได้ทั้งสองประเภท
            // ต้อง set currentCus ก่อน apply rule เพื่อไม่ให้ constraint ระหว่างโหลดล้างวันที่ API ส่งมา
            // ส่งผลให้วันที่ครบกำหนดงวดแรกที่ API ส่งมาโดน clear ทิ้งตอนเปิดหน้าใหม่
            currentCus = data;

            document.getElementById('account-no').value      = data.account_no || '';
            document.getElementById('customer-name').value   = data.name || '';

            const filingCapitalEl = document.getElementById('filing-capital');
            if (filingCapitalEl) {
                filingCapitalEl.value = Number(data.filing_capital || 0) > 0
                    ? Number(data.filing_capital).toLocaleString('th-TH', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })
                    : '0.00';
            }

            const defaultDateDisplay = document.getElementById('default-date-display');
            if (defaultDateDisplay) {
                defaultDateDisplay.value = fmtDate(data.default_date);
            }

            const preFilingDpdDisplay = document.getElementById('pre-filing-dpd-days-display');
            if (preFilingDpdDisplay) {
                const dpdDays = data.pre_filing_dpd_days;
                preFilingDpdDisplay.value = (dpdDays !== null && dpdDays !== undefined && dpdDays !== '')
                    ? \`\${Number(dpdDays).toLocaleString('th-TH')} วัน\`
                    : '-';
            }

            const filingNoteDisplay = document.getElementById('filing-note-display');
            const filingNoteDisplayText = document.getElementById('filing-note-display-text');
            const filingNoteTooltipText = document.getElementById('filing-note-tooltip-text');
            if (filingNoteDisplay && filingNoteDisplayText) {
                const filingNote = data.filing_note || '-';
                filingNoteDisplayText.textContent = filingNote;
                filingNoteDisplay.dataset.tooltip = filingNote;
                if (filingNoteTooltipText) filingNoteTooltipText.textContent = filingNote;
            }

            if (data.filing_date)   dpSelectDay('filing-date', data.filing_date);
            if (data.judgment_date) dpSelectDay('judgment-date', data.judgment_date);
            if (data.first_due_date) dpSelectDay('first-due-date', data.first_due_date);

            const redCaseNoEl = document.getElementById('red-case-no');
            if (redCaseNoEl) redCaseNoEl.value = data.red_case_no || '';
            const judgmentNoteEl = document.getElementById('judgment-note');
            if (judgmentNoteEl) {
                judgmentNoteEl.value = data.judgment_note || '';
                const counter = document.getElementById('judgment-note-counter');
                if (counter) counter.textContent = String(judgmentNoteEl.value.length);
            }

            const moneyFields = {
                'total-debt':           data.total_debt,
                'principal':            data.principal,
                'court-fee':            data.court_fee,
                'lawyer-fee':           data.lawyer_fee,
                'installment-1':        data.installment_1,
                'installment-2':        data.installment_2,
                'installment-3':        data.installment_3,
                'installment-4':        data.installment_4,
            };
            for (const [id, val] of Object.entries(moneyFields)) {
                const el = document.getElementById(id);
                if (el && val !== null && val !== undefined) {
                    el.value = Number(val) > 0
                        ? Number(val).toLocaleString('th-TH', { minimumFractionDigits: 2 })
                        : '0.00';
                }
            }

            document.getElementById('interest-rate').value          = formatRateDisplayValue(data.interest_rate ?? '');
            document.getElementById('installment-count').value      = data.installment_count ?? '';
            document.getElementById('default-interest-rate').value  = formatRateDisplayValue(data.default_interest_rate ?? '');

            calculateDiff();
            calculateLastDueDate();
            applyJudgmentTypeInputRules(false);

            document.getElementById('detail-subtitle').textContent =
                fmtAccNo(data.account_no) + ' - ' + data.name;

            originalData = {
                filing_date:           data.filing_date        || '',
                filing_capital:        Number(data.filing_capital || 0),
                red_case_no:           data.red_case_no        || '',
                judgment_date:         data.judgment_date      || '',
                judgment_note:         data.judgment_note      || '',
                first_due_date:        data.first_due_date     || '',
                total_debt:            Number(data.total_debt  || 0),
                principal:             Number(data.principal   || 0),
                interest_rate:         Number(data.interest_rate || 0),
                court_fee:             Number(data.court_fee   || 0),
                lawyer_fee:            Number(data.lawyer_fee  || 0),
                installment_count:     Number(data.installment_count || 0),
                default_interest_rate: Number(data.default_interest_rate || 0),
                installment_1:         Number(data.installment_1 || 0),
                installment_2:         Number(data.installment_2 || 0),
                installment_3:         Number(data.installment_3 || 0),
                installment_4:         Number(data.installment_4 || 0),
            };
            setSubmitEnabled(false);

            // Timestamps
            const fmtTs = (ts) => {
                if (!ts) return '-';
                try {
                    const d = new Date(ts.replace(' ', 'T') + (ts.includes('+') ? '' : 'Z'));
                    return \`\${String(d.getDate()).padStart(2,'0')}/\${String(d.getMonth()+1).padStart(2,'0')}/\${d.getFullYear()+543} \${String(d.getHours()).padStart(2,'0')}:\${String(d.getMinutes()).padStart(2,'0')}\`;
                } catch { return ts; }
            };
            document.getElementById('ts-created-at').textContent = fmtTs(data.created_at);
            document.getElementById('ts-updated-at').textContent = fmtTs(data.updated_at);

            // โหลด case status และแสดง progress bar
            // currentCus ถูก set ไว้ตั้งแต่ต้น loadCustomerData แล้ว
            applyJudgmentTypeInputRules(false);
            updateDateConstraints();
            validateBusinessRules(false);
            renderRetroactiveJudgment(data);
            if (data.case_status) {
                const logs = await loadStatusLogs()
                renderProgressBar(data.case_status, logs)
                updateSectionVisibility(data.case_status, data.latest_snapshot || null)
                if (['บังคับคดี', 'ปิดบัญชี'].includes(data.case_status)) {
                    fillEnforcementInfo(data)
                }
            }
            applyRedCaseNoLock(currentCus ? !canEditJudgmentData(currentCus.case_status) : false);

            previewDone = false;
            setSubmitEnabled(false);

            const warn = document.getElementById('preview-stale-warn');
            if (warn) warn.classList.add('hidden');

            const previewBtn = document.getElementById('preview-btn');
            if (previewBtn) previewBtn.dataset.manual = 'false';

            if (canAutoPreviewExistingData()) {
                await loadPreview();

                setSubmitEnabled(false);
            } else {
                document.getElementById('schedule-placeholder')?.classList.remove('hidden');
                document.getElementById('schedule-table-wrap')?.classList.add('hidden');
                document.getElementById('schedule-info')?.classList.add('hidden');
                document.getElementById('schedule-loading')?.classList.add('hidden');
            }

        } catch (err) {
            console.error('loadCustomerData error:', err);
        }
    }

    function showError(msg) {
        const banner = document.getElementById('error-banner');
        document.getElementById('error-text').textContent = msg;
        banner.classList.remove('hidden');
        banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function hideError() {
        document.getElementById('error-banner').classList.add('hidden');
    }

    // ---- Account No validation ----
    function handleAccountNoInput() {
        const el      = document.getElementById('account-no');
        const counter = document.getElementById('account-no-counter');
        const pos     = el.selectionStart;
        const cleaned = el.value.replace(/[^0-9]/g, '');
        const hadInvalid = cleaned !== el.value;
        el.value = cleaned;
        if (hadInvalid) {
            try { el.setSelectionRange(pos - 1, pos - 1); } catch(e) {}
            showFieldWarn('account-no', 'กรุณากรอกตัวเลขเท่านั้น ไม่อนุญาตให้ใช้ตัวอักษรหรืออักขระพิเศษ');
        } else {
            hideFieldWarn('account-no');
        }
        const len = el.value.length;
        counter.textContent = len + '/12';
        counter.className = 'absolute right-3 top-1/2 -translate-y-1/2 text-[11px] pointer-events-none font-mono '
            + (len === 12 ? 'text-emerald-500' : len > 0 ? 'text-amber-400' : 'text-slate-300');
    }

    function handleAccountNoKeydown(e) {
        const allowed = ['Backspace','Delete','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Tab','Home','End'];
        if (allowed.includes(e.key)) return;
        if (e.ctrlKey || e.metaKey) return;
        if (!/^[0-9]$/.test(e.key)) {
            e.preventDefault();
            showFieldWarn('account-no', 'กรุณากรอกตัวเลขเท่านั้น ไม่อนุญาตให้ใช้ตัวอักษรหรืออักขระพิเศษ');
        }
    }

    function handleAccountNoBlur() {
        const el  = document.getElementById('account-no');
        const len = el.value.length;
        if (len > 0 && len < 12) {
            showFieldWarn('account-no', 'เลขที่บัญชีต้องมี 12 หลักเท่านั้น (ปัจจุบัน ' + len + ' หลัก)');
            el.classList.add('error');
        } else if (len === 12) {
            hideFieldWarn('account-no');
            el.classList.remove('error');
        }
    }

    // ---- Customer Name validation ----
    function hasInvalidCustomerNameChars(value) {
        return !/^[A-Za-z0-9ก-ฮะ-์.\\-\\s]*$/.test(value || '');
    }

    function handleCustomerNameInput() {
        const el  = document.getElementById('customer-name');
        const val = el.value;
        if (hasInvalidCustomerNameChars(val)) {
            showFieldWarn('customer-name', 'ใช้ได้เฉพาะตัวอักษร ตัวเลข เว้นวรรค จุด (.) และขีดกลาง (-)');
        } else {
            hideFieldWarn('customer-name');
        }
    }

    function handleCustomerNameBlur() {
        const el  = document.getElementById('customer-name');
        const val = el.value;
        if (!val) return;
        const trimmed = val.trim();
        if (trimmed !== val) {
            el.value = trimmed;
            showFieldWarn('customer-name', 'ไม่อนุญาตให้มีช่องว่างหน้าสุดหรือหลังสุด');
            return;
        }
        if (/\\s{2,}/.test(val)) {
            showFieldWarn('customer-name', 'ไม่อนุญาตให้มีช่องว่างติดกันหลายช่อง');
            return;
        }
        hideFieldWarn('customer-name');
        el.classList.remove('error');
    }

    function setLoading(isLoading) {
        const btn = document.getElementById('submit-btn');
        if (btn) {
            if (isLoading) {
                btn.disabled = true;
            } else {
                setSubmitEnabled(previewDone && hasChanged() && isPreviewFormReady(false));
            }
        }
        document.getElementById('btn-default')?.classList.toggle('hidden', isLoading);
        document.getElementById('btn-loading')?.classList.toggle('hidden', !isLoading);
    }

    function setConfirmSubmitLoading(isLoading) {
        const btn = document.getElementById('confirm-submit-btn');
        if (!btn) return;
        btn.disabled = isLoading;
        btn.innerHTML = isLoading
            ? '<svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg> กำลังบันทึก...'
            : '<span class="material-symbols-outlined text-base">save</span> ยืนยันบันทึก';
    }


    // ============================================================
    // Validation & Formatting Helpers
    // ============================================================

    function stripPercentSuffix(val) {
        return String(val || '').replace(/%/g, '').trim();
    }

    function parseNumber(val) {
        return parseFloat(stripPercentSuffix(val).replace(/,/g, '')) || 0;
    }

    function formatNumber(val) {
        const n = parseFloat(val.replace(/,/g, ''));
        if (isNaN(n)) return val;
        return n.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function showFieldWarn(id, msg) {
        const el = document.getElementById('warn-' + id);
        if (!el) return;
        if (msg) {
            const span = el.querySelector('span:last-child');
            if (span) span.textContent = msg;
        }
        el.classList.remove('hidden');
    }

    function hideFieldWarn(id) {
        const el = document.getElementById('warn-' + id);
        if (el) el.classList.add('hidden');
    }

    function isValidDecimal(val) {
        return /^[\\d,]*\\.?\\d*$/.test(stripPercentSuffix(val).replace(/,/g, ''));
    }

    function isValidInteger(val) {
        return /^\\d+$/.test(val.trim());
    }

    function normalizeCaseNo(value) {
        return String(value || '')
            .trim()
            .replace(/\\s*\\/\\s*/g, '/')
            .replace(/\\s+/g, ' ');
    }

    function isValidCaseNo(value) {
        return /^[A-Za-zก-ฮ]{1,8}(?:\\s+[A-Za-z]?\\d{1,8}|\\d{1,8})\\/25\\d{2}$/.test(value);
    }

    function normalizeCaseNo(value) {
        const raw = String(value || '').replace(/\\s*\\/\\s*/g, '/').replace(/\\s+/g, ' ').trim();
        const match = raw.match(/^([A-Za-zก-ฮ]{1,8})\\s*([A-Za-z]?\\d{1,8})\\/(25\\d{2})$/);
        if (!match) return raw;
        return \`\${match[1]}\${match[2]}/\${match[3]}\`;
    }

    function isValidCaseNo(value) {
        if (!value) return false;
        return /^([A-Za-zก-ฮ]{1,8})\\s*([A-Za-z]?\\d{1,8})\\/(25\\d{2})$/.test(String(value || '').replace(/\\s*\\/\\s*/g, '/').replace(/\\s+/g, ' ').trim());
    }

    function handleRedCaseNoInput() {
        const el = document.getElementById('red-case-no');
        if (!el) return;
        const value = normalizeCaseNo(el.value);
        if (!value || !isValidCaseNo(value)) {
            showFieldWarn('red-case-no', 'รูปแบบ: ตัวย่อประเภทคดีติดเลขที่/ปี พ.ศ. เช่น ผบ1234/2567');
        } else {
            el.value = value;
            hideFieldWarn('red-case-no');
        }
    }

    const ZERO_REQUIRED_FIELD_IDS = new Set([
        'interest-rate',
        'default-interest-rate',
        'court-fee',
        'lawyer-fee',
        'installment-2',
        'installment-3'
    ]);

    const ZERO_REQUIRED_MONEY_FIELD_IDS = new Set([
        'court-fee',
        'lawyer-fee',
        'installment-2',
        'installment-3'
    ]);

    function normalizeRequiredZeroFields() {
        ZERO_REQUIRED_MONEY_FIELD_IDS.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            if (String(el.value || '').trim() === '') {
                el.value = '0.00';
            }
        });

        ['interest-rate', 'default-interest-rate'].forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            if (String(el.value || '').trim() === '') {
                el.value = '0%';
            }
        });
    }

    function showBusinessError(title, message) {
        if (typeof showAlert === 'function') {
            showAlert('warning', title, message);
        } else {
            showError(message);
        }
    }

    function validateBusinessRules(showErrorMessage = false) {
        normalizeRequiredZeroFields();

        const totalDebtEl = document.getElementById('total-debt');
        const filingCapitalEl = document.getElementById('filing-capital');
        const interestEl = document.getElementById('interest-rate');
        const defaultInterestEl = document.getElementById('default-interest-rate');
        const firstDueDisplay = document.getElementById('dp-display-first-due-date');

        ['total-debt', 'interest-rate', 'default-interest-rate', 'court-fee', 'lawyer-fee', 'installment-2', 'installment-3'].forEach(id => {
            document.getElementById(id)?.classList.remove('error');
            hideFieldWarn(id);
        });
        firstDueDisplay?.classList.remove('error');

        const numericRuleFields = [
            ['total-debt', 'กรุณากรอกตัวเลขเท่านั้น'],
            ['interest-rate', 'กรุณากรอกตัวเลขเท่านั้น'],
            ['default-interest-rate', 'กรุณากรอกตัวเลขเท่านั้น'],
            ['court-fee', 'กรุณากรอกตัวเลขเท่านั้น'],
            ['lawyer-fee', 'กรุณากรอกตัวเลขเท่านั้น'],
            ['installment-2', 'กรุณากรอกตัวเลขเท่านั้น'],
            ['installment-3', 'กรุณากรอกตัวเลขเท่านั้น'],
        ];

        for (const [id, msg] of numericRuleFields) {
            const field = document.getElementById(id);
            const raw = stripPercentSuffix(field?.value || '').replace(/,/g, '').trim();
            if (raw && !/^\\d*\\.?\\d*$/.test(raw)) {
                field?.classList.add('error');
                showFieldWarn(id, msg);
                if (showErrorMessage) showBusinessError('ข้อมูลไม่ถูกต้อง', msg);
                return false;
            }
        }

        const totalDebt = parseNumber(totalDebtEl?.value || '0');
        const filingCapital = parseNumber(filingCapitalEl?.value || '0');
        if (filingCapital > 0 && totalDebt > filingCapital) {
            totalDebtEl?.classList.add('error');
            showFieldWarn('total-debt', 'ยอดหนี้รวมต้องไม่เกินทุนทรัพย์ที่ฟ้อง');
            if (showErrorMessage) {
                showBusinessError('ยอดหนี้รวมไม่ถูกต้อง', 'ยอดหนี้รวมต้องไม่เกินทุนทรัพย์ที่ฟ้อง โดยไม่ต้องรวมดอกเบี้ย');
            }
            return false;
        }

        const interest = parseNumber(interestEl?.value || '0');
        const defaultInterest = parseNumber(defaultInterestEl?.value || '0');
        if (interest > 24) {
            interestEl?.classList.add('error');
            showFieldWarn('interest-rate', 'อัตราดอกเบี้ย/ปีต้องไม่เกิน 24%');
            if (showErrorMessage) showBusinessError('อัตราดอกเบี้ยไม่ถูกต้อง', 'อัตราดอกเบี้ย/ปีต้องไม่เกิน 24%');
            return false;
        }
        if (defaultInterest > 24) {
            defaultInterestEl?.classList.add('error');
            showFieldWarn('default-interest-rate', 'ดอกเบี้ยเมื่อผิดนัดต้องไม่เกิน 24%');
            if (showErrorMessage) showBusinessError('ดอกเบี้ยผิดนัดไม่ถูกต้อง', 'ดอกเบี้ยเมื่อผิดนัดชำระ (%) ต้องไม่เกิน 24%');
            return false;
        }

        const judgmentDate = dpGetValue('judgment-date');
        const firstDue = dpGetValue('first-due-date');
        if (judgmentDate && firstDue) {
            const invalidDate = firstDue < judgmentDate;
            if (invalidDate) {
                firstDueDisplay?.classList.add('error');
                const msg = 'วันครบกำหนดงวดแรกสามารถเป็นวันเดียวกับวันที่พิพากษาได้ แต่ห้ามน้อยกว่าวันที่พิพากษา';
                if (showErrorMessage) showBusinessError('วันที่ครบกำหนดไม่ถูกต้อง', msg);
                return false;
            }
        }

        return true;
    }

    // ---- Date constraint ----
    function updateDateConstraints() {
        const filingVal   = dpGetValue('filing-date');
        const judgmentVal = dpGetValue('judgment-date');
        if (filingVal) dpSetMin('judgment-date', filingVal);

        if (judgmentVal) {
            dpSetMin('first-due-date', judgmentVal);
        }
    }

    function handleMoneyInput(id) {
        const el = document.getElementById(id);
        if (!el) return;

        const before = el.value;
        const cursor = el.selectionStart;
        const rawNoComma = before.replace(/,/g, '');
        const hasInvalidChars = /[^\\d.]/.test(rawNoComma);

        let cleaned = rawNoComma.replace(/[^\\d.]/g, '');

        const firstDotIndex = cleaned.indexOf('.');
        if (firstDotIndex !== -1) {
            cleaned =
                cleaned.slice(0, firstDotIndex + 1) +
                cleaned.slice(firstDotIndex + 1).replace(/\\./g, '');
        }

        if (hasInvalidChars) {
            showFieldWarn(id, 'กรุณากรอกตัวเลขเท่านั้น');
        } else {
            hideFieldWarn(id);
        }

        if (cleaned === '' || cleaned === '.') {
            el.value = cleaned;
            return;
        }

        if (!/^\\d*\\.?\\d*$/.test(cleaned)) {
            showFieldWarn(id, 'กรุณากรอกตัวเลขเท่านั้น');
            el.value = cleaned;
            return;
        }

        if (before !== cleaned) {
            const diff = before.length - cleaned.length;
            el.value = cleaned;

            if (typeof cursor === 'number') {
                const nextPos = Math.max(0, cursor - diff);
                requestAnimationFrame(() => {
                    el.setSelectionRange(nextPos, nextPos);
                });
            }
        }
    }

    function handleMoneyBlur(id) {
        const el  = document.getElementById(id);
        const raw = el.value.replace(/,/g, '').trim();

        if (!raw || isNaN(parseFloat(raw))) {
            if (ZERO_REQUIRED_MONEY_FIELD_IDS.has(id)) {
                el.value = '0.00';
                hideFieldWarn(id);
                return;
            }
            el.value = '';
            return;
        }

        const rounded = Math.round(parseFloat(raw) * 100) / 100;
        el.value = rounded.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        hideFieldWarn(id);
    }

    // ---- Interest rate handler ----
    function formatRateDisplayValue(value) {
        const raw = stripPercentSuffix(value);
        if (raw === '' || raw === '.') return '';
        const n = Number(raw);
        if (Number.isNaN(n)) return raw;
        const rounded = Math.round(Math.min(24, Math.max(0, n)) * 100) / 100;
        const text = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2).replace(/0+$/, '').replace(/\\.$/, '');
        return \`\${text}%\`;
    }

    function stripRateDisplaySuffix(id) {
        const el = document.getElementById(id);
        if (!el) return;
        el.value = stripPercentSuffix(el.value);
    }

    function handleRateInput(id, maxMessage) {
        const el = document.getElementById(id);
        if (!el) return;

        const before = stripPercentSuffix(el.value);
        const hasInvalidChars = /[^\\d.]/.test(before);

        let cleaned = before.replace(/[^\\d.]/g, '');
        const firstDotIndex = cleaned.indexOf('.');
        if (firstDotIndex !== -1) {
            cleaned = cleaned.slice(0, firstDotIndex + 1) + cleaned.slice(firstDotIndex + 1).replace(/\\./g, '');
        }

        el.value = cleaned;

        if (hasInvalidChars) {
            showFieldWarn(id, 'กรุณากรอกตัวเลขเท่านั้น');
            return;
        }

        // ระหว่างพิมพ์ให้รับค่าแบบ 12. / 12.3 / 12.34 ได้ ไม่ยิง error เร็วเกินไป
        if (cleaned === '' || cleaned === '.') {
            hideFieldWarn(id);
            return;
        }

        const n = Number(cleaned);
        if (!Number.isNaN(n) && n > 24) {
            showFieldWarn(id, maxMessage);
            return;
        }

        hideFieldWarn(id);
    }

    function handleRateBlur(id, maxMessage) {
        const el = document.getElementById(id);
        if (!el) return;

        const raw = stripPercentSuffix(el.value);
        if (raw === '' || raw === '.') {
            el.value = '0%';
            hideFieldWarn(id);
            return;
        }

        const n = Number(raw);
        if (Number.isNaN(n)) {
            el.value = '0%';
            showFieldWarn(id, 'กรุณากรอกตัวเลขเท่านั้น');
            return;
        }

        el.value = formatRateDisplayValue(raw);

        if (n > 24) showFieldWarn(id, maxMessage);
        else hideFieldWarn(id);
    }

    function handleInterestInput() {
        handleRateInput('interest-rate', 'อัตราดอกเบี้ย/ปีต้องไม่เกิน 24%');
    }

    function handleInterestBlur() {
        handleRateBlur('interest-rate', 'อัตราดอกเบี้ย/ปีต้องไม่เกิน 24%');
    }

    // ---- Default interest rate handler ----
    function handleDefaultInterestInput() {
        handleRateInput('default-interest-rate', 'ดอกเบี้ยเมื่อผิดนัดต้องไม่เกิน 24%');
    }

    function handleDefaultInterestBlur() {
        handleRateBlur('default-interest-rate', 'ดอกเบี้ยเมื่อผิดนัดต้องไม่เกิน 24%');
    }

    // ---- Installment count handler ----
    function handleInstallmentCountInput() {
        const el  = document.getElementById('installment-count');

        // ถ้าเป็นพิพากษาฝ่ายเดียว ช่องนี้ต้องเป็น 1 งวดเสมอ
        if (getActiveJudgmentType() === 'พิพากษาฝ่ายเดียว') {
            el.value = '1';
            hideFieldWarn('installment-count');
            calculateLastDueDate();
            return;
        }

        const raw = el.value.trim();
        if (raw === '') { hideFieldWarn('installment-count'); return; }
        if (!/^\\d+$/.test(raw)) {
            showFieldWarn('installment-count', 'กรุณากรอกตัวเลขจำนวนเต็มเท่านั้น');
            el.value = raw.replace(/\\D/g, '');
            return;
        }
        hideFieldWarn('installment-count');
    }

    // ---- Friendly input focus UX ----
// ทำให้ placeholder หายตอน focus
// ถ้าค่าเดิมเป็น 0 / 0.00 ให้ล้างช่องทันที
// ถ้ามีค่าจริงอยู่แล้ว ให้ select ทั้งช่อง เพื่อพิมพ์ทับได้เลย
function isZeroLikeInputValue(value) {
    const raw = String(value || '')
        .replace(/,/g, '')
        .replace(/%/g, '')
        .trim();

    if (raw === '') return false;

    const num = Number(raw);
    return !Number.isNaN(num) && num === 0;
}

function setupFriendlyInputFocus() {
    const zeroClearFieldIds = new Set([
        'total-debt',
        'principal',
        'court-fee',
        'lawyer-fee',
        'installment-1',
        'installment-2',
        'installment-3',
        'installment-4',
        'interest-rate',
        'default-interest-rate',
        'installment-count'
    ]);

    const skipFieldIds = new Set([
        'account-no',
        'customer-name',
        'diff-debt'
    ]);

    document.querySelectorAll('input.form-input-styled').forEach(el => {
        if (!el.id) return;
        if (skipFieldIds.has(el.id)) return;
        if (el.readOnly || el.disabled) return;
        if (el.dataset.friendlyFocusBound === '1') return;

        el.dataset.friendlyFocusBound = '1';
        el.dataset.originalPlaceholder = el.getAttribute('placeholder') || '';

        el.addEventListener('focus', () => {
            // ซ่อน placeholder ทันทีตอน user คลิกเข้า field
            el.setAttribute('placeholder', '');

            if (zeroClearFieldIds.has(el.id) && isZeroLikeInputValue(el.value)) {
                el.value = '';
                return;
            }

            // ถ้ามีค่าจริงอยู่แล้ว ให้ select ทั้งช่อง
            // เวลา user พิมพ์ จะทับค่าเดิม ไม่ไปต่อท้าย
            if (el.value && typeof el.select === 'function') {
                requestAnimationFrame(() => el.select());
            }
        });

        el.addEventListener('blur', () => {
            // คืน placeholder หลังออกจาก field
            el.setAttribute('placeholder', el.dataset.originalPlaceholder || '');
        });
    });
}

    // ---- calculateDiff ----
    function calculateDiff() {
        const courtFee  = parseNumber(document.getElementById('court-fee').value);
        const lawyerFee = parseNumber(document.getElementById('lawyer-fee').value);
        const totalDebt = parseNumber(document.getElementById('total-debt').value);
        const principal = parseNumber(document.getElementById('principal').value);
        const total     = (courtFee + lawyerFee + totalDebt) - principal;
        const field     = document.getElementById('diff-debt');
        field.value     = total.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        field.style.color = total > 0 ? '#2D3282' : total < 0 ? '#ef4444' : '';
    }

    function calculateLastDueDate() {
        const firstDue = dpGetValue('first-due-date');
        const count    = parseInt((document.getElementById('installment-count').value || '').replace(/[^0-9]/g,'')) || 0;
        if (!firstDue || count < 1) { dpClear('last-due-date'); return; }
        const date = new Date(firstDue + 'T00:00:00');
        date.setMonth(date.getMonth() + count - 1);
        const str  = dpDateStr(date);
        dpSetValue('last-due-date', str);
        const disp = document.getElementById('dp-text-last-due-date');
        disp.textContent = dpFormatDisplay(str);
        disp.classList.remove('text-slate-400');
        disp.classList.add('text-slate-800');
    }

    function validate() {
        normalizeRequiredZeroFields();

        const required = [
            { id: 'account-no',       label: 'หมายเลขบัญชี' },
            { id: 'customer-name',    label: 'ชื่อ-นามสกุล' },
            { id: 'filing-date',      label: 'วันที่ยื่นฟ้อง' },
            { id: 'red-case-no',      label: 'คดีหมายเลขแดงที่' },
            { id: 'judgment-date',    label: 'วันที่พิพากษา' },
            { id: 'total-debt',       label: 'ยอดหนี้รวม' },
            { id: 'principal',        label: 'เงินต้น' },
            { id: 'interest-rate',    label: 'อัตราดอกเบี้ย/ปี' },
            { id: 'default-interest-rate', label: 'ดอกเบี้ยเมื่อผิดนัดชำระ (%)' },
            { id: 'court-fee',        label: 'ค่าธรรมเนียมศาล' },
            { id: 'lawyer-fee',       label: 'ค่าทนายความ' },
            { id: 'installment-count', label: 'จำนวนงวดผ่อน' },
            { id: 'first-due-date',   label: 'วันครบกำหนดงวดแรก' },
            { id: 'installment-1',    label: 'ค่างวด งวดที่ 1' },
        ];

        document.querySelectorAll('.form-input-styled').forEach(el => el.classList.remove('error'));

        const missing = required.filter(f => {
            const val = document.getElementById(f.id).value.trim();
            if (!val) { document.getElementById(f.id).classList.add('error'); return true; }
            return false;
        });

        if (missing.length > 0) {
            showError('กรุณากรอกข้อมูลที่จำเป็นให้ครบ: ' + missing.map(f => f.label).join(', '));
            return false;
        }

        const accountVal = document.getElementById('account-no').value;
        if (accountVal.length !== 12) {
            showError('เลขที่บัญชีต้องมี 12 หลักเท่านั้น');
            document.getElementById('account-no').classList.add('error');
            return false;
        }

        const nameVal = document.getElementById('customer-name').value;
        if (hasInvalidCustomerNameChars(nameVal)) {
            showError('ชื่อ-นามสกุล/ชื่อบริษัทใช้ได้เฉพาะตัวอักษร ตัวเลข เว้นวรรค จุด (.) และขีดกลาง (-)');
            document.getElementById('customer-name').classList.add('error');
            return false;
        }

        const redCaseVal = normalizeCaseNo(document.getElementById('red-case-no').value);
        if (!isValidCaseNo(redCaseVal)) {
            showError('คดีหมายเลขแดงที่ต้องอยู่ในรูปแบบ: ตัวย่อประเภทคดีติดเลขที่/ปี พ.ศ. เช่น ผบ1234/2567');
            document.getElementById('red-case-no').classList.add('error');
            return false;
        }

        if (document.getElementById('judgment-note').value.trim().length > 100) {
            showError('หมายเหตุ / เงื่อนไขพิเศษเพิ่มเติมต้องไม่เกิน 100 ตัวอักษร');
            document.getElementById('judgment-note').classList.add('error');
            return false;
        }

        // ถ้า case_status = ยื่นฟ้อง ต้องเลือก judgment_type ก่อนบันทึก
        if (currentCus && currentCus.case_status === 'ยื่นฟ้อง') {
            const jt = document.getElementById('judgment-type')?.value || '';
            const jtTrigger = document.getElementById('jt-trigger');
            const jtWarn = document.getElementById('warn-judgment-type');
            if (!jt) {
                showError('กรุณาเลือกประเภทคำพิพากษา (พิพากษาตามยอม / พิพากษาฝ่ายเดียว) ก่อนบันทึก');
                jtTrigger?.classList.add('border-red-400', 'ring-4', 'ring-red-500/10');
                if (jtWarn) jtWarn.classList.remove('hidden');
                return false;
            }
            jtTrigger?.classList.remove('border-red-400', 'ring-red-500/10');
            if (jtWarn) jtWarn.classList.add('hidden');
        }

        if (!validateBusinessRules(true)) {
            return false;
        }

        return true;
    }

    function fmtReview(val) {
        const n = parseNumber(String(val));
        if (!val || val === '0.00' || val === '') return '-';
        return '฿' + n.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function fmtDateReview(id) {
        const val = dpGetValue(id);
        if (!val) return '-';
        const [y,m,d] = val.split('-');
        return \`\${d}/\${m}/\${y}\`;
    }

    function showSuccessToast(title, msg) {
        // ถ้ามี toast modal ให้ใช้ ถ้าไม่มีใช้ alert
        const modal = document.getElementById('toast-modal');
        if (modal) {
            document.getElementById('toast-icon-wrap').className = 'w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-emerald-50';
            document.getElementById('toast-icon').className      = 'material-symbols-outlined text-3xl text-emerald-500';
            document.getElementById('toast-icon').style.fontVariationSettings = '"FILL" 1';
            document.getElementById('toast-icon').textContent    = 'check_circle';
            document.getElementById('toast-title').textContent   = title;
            document.getElementById('toast-message').textContent = msg;
            modal.classList.remove('hidden');
        } else {
            alert(title + ': ' + msg);
        }
    }

    function handleSubmit() {
        try {
            hideError();

            if (currentCus && !canEditJudgmentData(currentCus.case_status)) {
                showAlert(
                    'warning',
                    'ไม่สามารถแก้ไขข้อมูลได้',
                    editPermissionMessage(currentCus.case_status)
                );
                setSubmitEnabled(false);
                return;
            }

            // ต้องกดพรีวิวสำเร็จก่อน จึงจะเปิด modal ยืนยันบันทึกได้
            if (!previewDone) {
                showAlert(
                    'warning',
                    'กรุณากดพรีวิวก่อนบันทึก',
                    'ทุกครั้งที่มีการเพิ่มหรือแก้ไขข้อมูล ต้องกดพรีวิวตารางผ่อนชำระก่อน จึงจะบันทึกได้'
                );
                setSubmitEnabled(false);
                return;
            }

            // ตรวจว่าข้อมูล required สำหรับ preview ยังครบอยู่หรือไม่
            if (typeof isPreviewFormReady === 'function' && !isPreviewFormReady(true)) {
                previewDone = false;
                setSubmitEnabled(false);
                showAlert(
                    'warning',
                    'ยังบันทึกไม่ได้',
                    'กรุณาตรวจสอบข้อมูลที่จำเป็นให้ครบ แล้วกดพรีวิวใหม่ก่อนบันทึก'
                );
                return;
            }

            if (!validate()) {
                showAlert(
                    'warning',
                    'ตรวจสอบข้อมูลไม่ผ่าน',
                    'กรุณาตรวจสอบช่องที่ถูกแจ้งเตือนหรือข้อความด้านบนก่อนบันทึก'
                );
                return;
            }

            const setReviewText = (id, value) => {
                const el = document.getElementById(id);
                if (el) el.textContent = value;
            };

            setReviewText('rv-account-no', document.getElementById('account-no').value);
            setReviewText('rv-customer-name', document.getElementById('customer-name').value);
            setReviewText('rv-filing-date', fmtDateReview('filing-date'));
            setReviewText('rv-judgment-date', fmtDateReview('judgment-date'));
            setReviewText('rv-red-case-no', normalizeCaseNo(document.getElementById('red-case-no').value));
            setReviewText('rv-judgment-note', document.getElementById('judgment-note').value.trim() || '-');

            // แสดง judgment-type ถ้า case_status = ยื่นฟ้อง
            const _jt = document.getElementById('judgment-type')?.value || '';
            const _jtRow = document.getElementById('rv-judgment-type-row');
            if (_jtRow) {
                if (currentCus && currentCus.case_status === 'ยื่นฟ้อง' && _jt) {
                    _jtRow.classList.remove('hidden');
                    setReviewText('rv-judgment-type', _jt);
                } else {
                    _jtRow.classList.add('hidden');
                }
            }

            setReviewText('rv-total-debt', fmtReview(document.getElementById('total-debt').value));
            setReviewText('rv-principal', fmtReview(document.getElementById('principal').value));
            setReviewText('rv-interest-rate', formatRateDisplayValue(document.getElementById('interest-rate').value || '0'));
            setReviewText('rv-court-fee', fmtReview(document.getElementById('court-fee').value));
            setReviewText('rv-lawyer-fee', fmtReview(document.getElementById('lawyer-fee').value));
            setReviewText('rv-diff-debt', fmtReview(document.getElementById('diff-debt').value));
            setReviewText('rv-first-due-date', fmtDateReview('first-due-date'));
            setReviewText('rv-last-due-date', fmtDateReview('last-due-date'));
            setReviewText('rv-installment-count', (document.getElementById('installment-count').value || '-') + ' งวด');
            setReviewText('rv-default-interest', formatRateDisplayValue(document.getElementById('default-interest-rate').value || '0'));
            setReviewText('rv-inst-1', fmtReview(document.getElementById('installment-1').value));
            setReviewText('rv-inst-2', fmtReview(document.getElementById('installment-2').value));
            setReviewText('rv-inst-3', fmtReview(document.getElementById('installment-3').value));
            setReviewText('rv-inst-4', fmtReview(document.getElementById('installment-4').value));

            openConfirmModal();
        } catch (err) {
            console.error('[CustomerDetail] handleSubmit failed', err);
            showAlert(
                'error',
                'ไม่สามารถเปิดหน้าต่างยืนยันได้',
                'เกิดข้อผิดพลาดขณะตรวจสอบข้อมูลก่อนบันทึก กรุณาลองใหม่อีกครั้ง'
            );
            showError('ไม่สามารถเปิดหน้าต่างยืนยันได้ กรุณาลองใหม่อีกครั้ง');
        }
    }

    function openConfirmModal() {
        const modal = document.getElementById('confirm-modal');
        if (!modal) {
            console.error('[CustomerDetail] confirm modal element not found');
            showAlert('error', 'ไม่พบหน้าต่างยืนยัน', 'ไม่สามารถเปิดหน้าต่างยืนยันบันทึกได้ กรุณารีเฟรชหน้าแล้วลองใหม่');
            return;
        }
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        document.body.classList.add('overflow-hidden');
    }

    function closeConfirmModal() {
        const modal = document.getElementById('confirm-modal');
        if (!modal) return;
        modal.classList.add('hidden');
        modal.style.display = 'none';
        document.body.classList.remove('overflow-hidden');
    }

    async function doSubmit() {
        if (currentCus && !canEditJudgmentData(currentCus.case_status)) {
            showAlert(
                'warning',
                'ไม่สามารถแก้ไขข้อมูลได้',
                editPermissionMessage(currentCus.case_status)
            );
            setSubmitEnabled(false);
            return;
        }

        if (!previewDone) {
            showAlert(
                'warning',
                'กรุณากดพรีวิวก่อนบันทึก',
                'ทุกครั้งที่มีการเพิ่มหรือแก้ไขข้อมูล ต้องกดพรีวิวตารางผ่อนชำระก่อน จึงจะบันทึกได้'
            );
            setSubmitEnabled(false);
            return;
        }

        normalizeRequiredZeroFields();

        if (!isPreviewFormReady(true)) {
            previewDone = false;
            setSubmitEnabled(false);
            return;
        }

        setConfirmSubmitLoading(true);
        setLoading(true);
        const payload = {
            filing_date: dpGetValue('filing-date'),
            filing_capital: parseNumber(document.getElementById('filing-capital').value),
            red_case_no: document.getElementById('red-case-no').disabled && originalData?.red_case_no
                ? originalData.red_case_no
                : normalizeCaseNo(document.getElementById('red-case-no').value),
            judgment_date: dpGetValue('judgment-date'),
            judgment_note: document.getElementById('judgment-note').value.trim(),
            total_debt: parseNumber(document.getElementById('total-debt').value),
            principal:              parseNumber(document.getElementById('principal').value),
            judgment_difference:    parseNumber(document.getElementById('diff-debt').value),
            interest_rate:          parseNumber(document.getElementById('interest-rate').value),
            court_fee:              parseNumber(document.getElementById('court-fee').value),
            lawyer_fee:             parseNumber(document.getElementById('lawyer-fee').value),
            installment_count:      parseInt(document.getElementById('installment-count').value),
            default_interest_rate:  parseNumber(document.getElementById('default-interest-rate').value),
            first_due_date:         dpGetValue('first-due-date'),
            last_due_date:          dpGetValue('last-due-date') || null,
            installment_1:          parseNumber(document.getElementById('installment-1').value),
            installment_2:          parseNumber(document.getElementById('installment-2').value),
            installment_3:          parseNumber(document.getElementById('installment-3').value),
            installment_4:          parseNumber(document.getElementById('installment-4').value),
        };

        // Guard ฝั่ง FE: พิพากษาฝ่ายเดียวต้องส่งเป็น 1 งวดเสมอ
        const activeJudgmentTypeForPayload = getActiveJudgmentType();
        if (activeJudgmentTypeForPayload === 'พิพากษาฝ่ายเดียว') {
            payload.installment_count = 1;
            payload.installment_2 = 0;
            payload.installment_3 = 0;
            payload.installment_4 = 0;
            payload.last_due_date = payload.first_due_date || payload.last_due_date;
        }

        // ถ้า case_status = ยื่นฟ้อง และเลือก judgment_type ให้เรียก PATCH /judgment
        const judgmentType   = document.getElementById('judgment-type')?.value || ''
        const isFilingStatus = currentCus && currentCus.case_status === 'ยื่นฟ้อง'

        try {
            let res, data
            if (isFilingStatus && judgmentType) {
                payload.judgment_type = judgmentType
                res  = await fetch(\`/api/customers/\${accountNo}/judgment\`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json', 'Authorization': \`Bearer \${getCookie('token')}\` },
                    body: JSON.stringify(payload)
                })
                data = await res.json().catch(() => ({}))
                if (res.ok) {
                    closeConfirmModal()
                    previewDone = false
                    setSubmitEnabled(false)
                    showSuccessToast('บันทึกสำเร็จ', \`บันทึกคำพิพากษาเรียบร้อย → \${judgmentType}\`)
                    await loadCustomerData()
                    loadEditHistory()
                } else {
                    const message = data.error || data.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'
                    showAlert('error', 'บันทึกไม่สำเร็จ', message)
                    showError(message)
                }
            } else {
                res  = await fetch(\`/api/customers/\${accountNo}\`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Authorization': \`Bearer \${getCookie('token')}\` },
                    body: JSON.stringify(payload)
                })
                data = await res.json().catch(() => ({}))
                if (res.ok) {
                    closeConfirmModal()
                    previewDone = false
                    setSubmitEnabled(false)
                    showSuccessToast('บันทึกสำเร็จ', \`อัพเดทข้อมูลเรียบร้อยแล้ว\${data.changed_fields ? \` (\${data.changed_fields} รายการ)\` : ''}\`)
                    await loadCustomerData()
                    loadEditHistory()
                } else {
                    const message = data.error || data.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'
                    showAlert('error', 'บันทึกไม่สำเร็จ', message)
                    showError(message)
                }
            }
        } catch (err) {
            console.error('[CustomerDetail] submit failed', err);
            showAlert('error', 'บันทึกไม่สำเร็จ', 'ไม่สามารถเชื่อมต่อ Server ได้ กรุณาลองใหม่อีกครั้ง');
            showError('ไม่สามารถเชื่อมต่อ Server ได้ กรุณาลองใหม่อีกครั้ง');
        } finally {
            setLoading(false);
            setConfirmSubmitLoading(false);
        }
    }

    function handleCancel() {
        window.location.href = getSafeReturnTo('/customer-list');
    }

    async function handleLogout() {
        const token = document.cookie.split('; ').find(r => r.startsWith('token='))?.split('=')[1] || '';
        await fetch('/api/auth/logout', { method: 'POST', headers: { 'Authorization': \`Bearer \${token}\` } });
        document.cookie = 'token=; path=/; max-age=0';
        sessionStorage.clear();
        window.location.href = '/login';
    }


    // ---- Alert Modal ----
    function showAlert(type, title, message) {
        const iconWrap = document.getElementById('alert-icon-wrap');
        const icon     = document.getElementById('alert-icon');
        const configs  = {
            warning: { bg: 'bg-amber-50', color: 'text-amber-500', icon: 'warning' },
            error:   { bg: 'bg-red-50',   color: 'text-red-500',   icon: 'error' },
            info:    { bg: 'bg-blue-50',  color: 'text-blue-500',  icon: 'info' },
        };
        const cfg = configs[type] || configs.info;
        iconWrap.className = \`w-16 h-16 rounded-full flex items-center justify-center mb-4 \${cfg.bg}\`;
        icon.className     = \`material-symbols-outlined text-3xl \${cfg.color}\`;
        icon.style.fontVariationSettings = '"FILL" 1';
        icon.textContent   = cfg.icon;
        document.getElementById('alert-title').textContent   = title;
        document.getElementById('alert-message').textContent = message;
        document.getElementById('alert-modal').classList.remove('hidden');
    }

    function closeAlert() {
        document.getElementById('alert-modal').classList.add('hidden');
    }

    // ---- Schedule Preview ----
    let scheduleData    = { daily: [], monthly: [] };
    let currentView     = 'monthly';
    let previewDone = false;

    function setSubmitEnabled(enabled) {
        const btn = document.getElementById('submit-btn');
        if (!btn) return;

        const allowedByStatus = !currentCus || canEditJudgmentData(currentCus.case_status);
        const finalEnabled = enabled && allowedByStatus;

        btn.disabled = !finalEnabled;

        if (finalEnabled) {
            btn.classList.remove('opacity-50', 'cursor-not-allowed');
            btn.classList.add('hover:bg-primary-dark');
            btn.title = '';
        } else {
            btn.classList.add('opacity-50', 'cursor-not-allowed');
            btn.classList.remove('hover:bg-primary-dark');

            if (!allowedByStatus) {
                btn.title = currentCus ? editPermissionMessage(currentCus.case_status) : 'ไม่มีสิทธิ์แก้ไขข้อมูล';
            } else {
                btn.title = 'กรุณากรอกข้อมูลให้ครบและกดพรีวิวก่อนบันทึก';
            }
        }
    }

    function parseNum(val) {
        if (val === null || val === undefined || val === '') return 0;
        return parseFloat(stripPercentSuffix(val).replace(/,/g, '')) || 0;
    }

    function getPreviewRequiredFields() {
        const fields = [
            { id: 'filing-date',       label: 'วันที่ยื่นฟ้อง' },
            { id: 'red-case-no',       label: 'คดีหมายเลขแดงที่' },
            { id: 'judgment-date',     label: 'วันที่พิพากษา' },
            { id: 'total-debt',        label: 'ยอดหนี้รวม' },
            { id: 'principal',         label: 'เงินต้น' },
            { id: 'interest-rate',     label: 'อัตราดอกเบี้ย/ปี' },
            { id: 'default-interest-rate', label: 'ดอกเบี้ยเมื่อผิดนัดชำระ (%)' },
            { id: 'court-fee',         label: 'ค่าธรรมเนียมศาล' },
            { id: 'lawyer-fee',        label: 'ค่าทนายความ' },
            { id: 'installment-count', label: 'จำนวนงวดผ่อน' },
            { id: 'first-due-date',    label: 'วันครบกำหนดงวดแรก' },
            { id: 'installment-1',     label: 'ค่างวด งวดที่ 1' },
        ];

        if (currentCus && currentCus.case_status === 'ยื่นฟ้อง') {
            fields.unshift({ id: 'judgment-type', label: 'ประเภทคำพิพากษา' });
        }

        return fields;
    }

    function isBlankOrZeroPreviewValue(id, value) {
        const raw = stripPercentSuffix(value).replace(/,/g, '').trim();

        if (raw === '') return true;

        if (id === 'filing-date' || id === 'red-case-no' || id === 'judgment-date' || id === 'first-due-date' || id === 'judgment-type') {
            return false;
        }

        const num = Number(raw);
        if (ZERO_REQUIRED_FIELD_IDS.has(id)) {
            return Number.isNaN(num);
        }
        return Number.isNaN(num) || num <= 0;
    }

    function validateInterestPairForPreview(showErrorMessage = false) {
        // ชื่อ function เดิมยังคงไว้เพื่อไม่กระทบ flow เดิม
        // Requirement ใหม่: ทั้งสองช่องต้องมีค่า ถ้าไม่มีให้ใส่ 0 และห้ามเกิน 24%
        normalizeRequiredZeroFields();
        return validateBusinessRules(showErrorMessage);
    }

    function canAutoPreviewExistingData() {
        normalizeRequiredZeroFields();
        const requiredFields = getPreviewRequiredFields();

        const hasMissingRequired = requiredFields.some(f => {
            const el = document.getElementById(f.id);
            if (!el) return false;

            const value = String(el.value || '').trim();
            return isBlankOrZeroPreviewValue(f.id, value);
        });

        if (hasMissingRequired) return false;

        return validateBusinessRules(false);
    }

    function isPreviewFormReady(showErrorMessage = false) {
        normalizeRequiredZeroFields();
        document.querySelectorAll('.form-input-styled, .dp-input').forEach(el => {
            el.classList.remove('error');
        });

        const jtTrigger = document.getElementById('jt-trigger');
        if (jtTrigger) {
            jtTrigger.classList.remove('border-red-400', 'bg-red-50', 'ring-4', 'ring-red-400/10');
        }

        const missing = getPreviewRequiredFields().filter(f => {
            const el = document.getElementById(f.id);
            if (!el) return false;

            const value = String(el.value || '').trim();
            const invalid = isBlankOrZeroPreviewValue(f.id, value);

            if (invalid) {
                el.classList.add('error');

                const dpDisplay = document.getElementById('dp-display-' + f.id);
                if (dpDisplay) dpDisplay.classList.add('error');

                // judgment-type เป็น hidden input ต้อง highlight ปุ่ม dropdown แทน
                if (f.id === 'judgment-type') {
                    const trigger = document.getElementById('jt-trigger');
                    if (trigger) {
                        trigger.classList.add('border-red-400', 'bg-red-50', 'ring-4', 'ring-red-400/10');
                    }
                }
            }

            return invalid;
        });

        if (missing.length > 0) {
            if (showErrorMessage) {
                showAlert(
                    'warning',
                    'กรุณากรอกข้อมูลให้ครบ',
                    'กรุณากรอกข้อมูลที่จำเป็นก่อนกดพรีวิว ได้แก่ ' + missing.map(f => f.label).join(', ')
                );
            }
            return false;
        }

        const redCaseEl = document.getElementById('red-case-no');
        if (redCaseEl) {
            const redCaseValue = normalizeCaseNo(redCaseEl.value);
            if (!isValidCaseNo(redCaseValue)) {
                redCaseEl.classList.add('error');
                showFieldWarn('red-case-no', 'รูปแบบ: ตัวย่อประเภทคดีติดเลขที่/ปี พ.ศ. เช่น ผบ1234/2567');
                if (showErrorMessage) {
                    showAlert('warning', 'กรุณากรอกข้อมูลให้ถูกต้อง', 'คดีหมายเลขแดงที่ต้องอยู่ในรูปแบบที่กำหนด');
                }
                return false;
            }
        }

        const judgmentNoteEl = document.getElementById('judgment-note');
        if (judgmentNoteEl && judgmentNoteEl.value.trim().length > 100) {
            judgmentNoteEl.classList.add('error');
            if (showErrorMessage) {
                showAlert('warning', 'กรุณากรอกข้อมูลให้ถูกต้อง', 'หมายเหตุ / เงื่อนไขพิเศษเพิ่มเติมต้องไม่เกิน 100 ตัวอักษร');
            }
            return false;
        }

        if (!validateBusinessRules(showErrorMessage)) {
            return false;
        }

        return true;
    }

    function hasChanged() {
        if (!originalData) return false;
        const cur = {
            filing_date:           document.getElementById('filing-date').value          || '',
            filing_capital:        parseNum(document.getElementById('filing-capital')?.value || '0'),
            red_case_no:           document.getElementById('red-case-no').disabled && originalData?.red_case_no
                ? originalData.red_case_no
                : normalizeCaseNo(document.getElementById('red-case-no').value),
            judgment_date:         document.getElementById('judgment-date').value         || '',
            judgment_note:         document.getElementById('judgment-note').value.trim(),
            first_due_date:        document.getElementById('first-due-date').value        || '',
            total_debt:            parseNum(document.getElementById('total-debt').value),
            principal:             parseNum(document.getElementById('principal').value),
            interest_rate:         parseNum(document.getElementById('interest-rate').value),
            court_fee:             parseNum(document.getElementById('court-fee').value),
            lawyer_fee:            parseNum(document.getElementById('lawyer-fee').value),
            installment_count:     parseNum(document.getElementById('installment-count').value),
            default_interest_rate: parseNum(document.getElementById('default-interest-rate').value),
            installment_1:         parseNum(document.getElementById('installment-1').value),
            installment_2:         parseNum(document.getElementById('installment-2').value),
            installment_3:         parseNum(document.getElementById('installment-3').value),
            installment_4:         parseNum(document.getElementById('installment-4').value),
        };
        return Object.keys(originalData).some(k => {
            if (typeof originalData[k] === 'number') return Math.abs((cur[k]||0) - originalData[k]) > 0.001;
            return cur[k] !== originalData[k];
        });
    }

    function onInputChanged() {
        previewDone = false;

        if (currentCus && !canEditJudgmentData(currentCus.case_status)) {
            setSubmitEnabled(false);
            const wrap = document.getElementById('preview-stale-warn');
            if (wrap) wrap.classList.add('hidden');
            return;
        }

        const wrap = document.getElementById('preview-stale-warn');
        if (wrap) {
            if (hasChanged()) wrap.classList.remove('hidden');
            else wrap.classList.add('hidden');
        }

        // ทุกครั้งที่มีการแก้ไข ต้องบังคับให้กดพรีวิวใหม่ก่อน
        setSubmitEnabled(false);
    }

    function fmtAccNo(n) { if (!n || n.length !== 12) return n || '-'; return \`\${n.slice(0,4)}-\${n.slice(4,8)}-\${n.slice(8,12)}\`; }
    function fmt(n) {
        return Number(n).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function fmtDate(d) {
        if (!d) return '-';
        const [y, m, day] = d.split('-');
        return \`\${day}/\${m}/\${y}\`;
    }

    const SCHEDULE_PAGE_SIZE = 20;
    let   schedulePage = 1;

    function switchView(view) {
        currentView  = view;
        schedulePage = 1;
        document.getElementById('view-monthly-btn').className = view === 'monthly'
            ? 'px-3 py-1 rounded text-[12px] font-bold transition-all bg-white text-primary shadow-sm'
            : 'px-3 py-1 rounded text-[12px] font-bold transition-all text-slate-500 hover:text-slate-700';
        document.getElementById('view-daily-btn').className = view === 'daily'
            ? 'px-3 py-1 rounded text-[12px] font-bold transition-all bg-white text-primary shadow-sm'
            : 'px-3 py-1 rounded text-[12px] font-bold transition-all text-slate-500 hover:text-slate-700';
        renderSchedule();
    }

    function changeSchedulePage(page) {
        schedulePage = page;
        renderSchedule();
        document.getElementById('schedule-table-wrap').scrollTop = 0;
    }

    function renderSchedulePagination(total, page) {
        const totalPages = Math.ceil(total / SCHEDULE_PAGE_SIZE);
        const container  = document.getElementById('schedule-pagination');
        if (!container) return;
        if (totalPages <= 1) { container.innerHTML = ''; return; }

        let html = \`<button onclick="changeSchedulePage(\${page-1})" \${page===1?'disabled':''} class="p-1 rounded border border-slate-100 hover:bg-white transition-all disabled:opacity-30 text-slate-400"><span class="material-symbols-outlined text-sm">chevron_left</span></button><div class="flex gap-1">\`;
        for (let i = 1; i <= totalPages; i++) {
            if (i===1 || i===totalPages || (i>=page-1 && i<=page+1)) {
                html += \`<button onclick="changeSchedulePage(\${i})" class="w-6 h-6 rounded text-[10px] transition-all \${i===page?'bg-primary text-white':'hover:bg-white text-slate-400'}">\${i}</button>\`;
            } else if (i===2 || i===totalPages-1) {
                html += \`<span class="w-6 h-6 flex items-center justify-center text-[10px] text-slate-200">…</span>\`;
            }
        }
        html += \`</div><button onclick="changeSchedulePage(\${page+1})" \${page===totalPages?'disabled':''} class="p-1 rounded border border-slate-100 hover:bg-white transition-all disabled:opacity-30 text-slate-400"><span class="material-symbols-outlined text-sm">chevron_right</span></button>\`;
        container.innerHTML = html;
    }

    function renderSchedule() {
        const allRows = currentView === 'monthly' ? scheduleData.monthly : scheduleData.daily;
        const isDaily = currentView === 'daily';

        let rows;
        if (isDaily) {
            const start = (schedulePage - 1) * SCHEDULE_PAGE_SIZE;
            rows = allRows.slice(start, start + SCHEDULE_PAGE_SIZE);
        } else {
            rows = allRows;
        }

        const tbody = document.getElementById('schedule-tbody');
        tbody.innerHTML = rows.map(r => {
            const isPayment    = r.is_payment_date;
            const isEarlyClose = r.is_early_close;
            const rowClass     = isEarlyClose
                ? 'bg-emerald-50 font-semibold border-l-4 border-emerald-400'
                : isPayment
                    ? 'bg-yellow-50 font-semibold'
                    : 'hover:bg-blue-50/20 transition-colors';
            return \`<tr class="\${rowClass}">
                <td class="py-2 px-4 text-slate-700">\${fmtDate(r.date)}</td>
                <td class="py-2 px-4 text-slate-400 text-center font-bold">\${String(r.term).padStart(2,'0')}</td>
                <td class="py-2 px-4 text-right text-slate-600">\${fmt(r.principal_bf)}</td>
                <td class="py-2 px-4 text-right text-primary font-bold">\${r.payment > 0 ? fmt(r.payment) : '-'}</td>
                <td class="py-2 px-4 text-right text-emerald-600">\${r.interest_paid > 0 ? fmt(r.interest_paid) : '-'}</td>
                <td class="py-2 px-4 text-right text-indigo-600">\${r.principal_paid > 0 ? fmt(r.principal_paid) : '-'}</td>
                <td class="py-2 px-4 text-right text-slate-400">\${fmt(r.other_paid)}</td>
                <td class="py-2 px-4 text-right text-slate-800 font-bold">\${fmt(r.principal_bal)}</td>
                <td class="py-2 px-4 text-right text-slate-400">\${Number(r.daily_interest).toFixed(2)}</td>
                <td class="py-2 px-4 text-right text-slate-500">\${fmt(r.acc_interest)}</td>
            </tr>\`;
        }).join('');

        const infoText = document.getElementById('schedule-info-text');
        const infoEl   = document.getElementById('schedule-info');
        if (infoText) {
            if (isDaily) {
                const start = (schedulePage - 1) * SCHEDULE_PAGE_SIZE;
                infoText.textContent = \`แสดง \${start+1}–\${Math.min(start+SCHEDULE_PAGE_SIZE, allRows.length)} จาก \${allRows.length} รายการ (รายวัน)\`;
                renderSchedulePagination(allRows.length, schedulePage);
            } else {
                infoText.textContent = \`แสดง \${allRows.length} รายการ (รายเดือน)\`;
                const pg = document.getElementById('schedule-pagination');
                if (pg) pg.innerHTML = '';
            }
        } else if (infoEl) {
            infoEl.textContent = \`แสดง \${rows.length} รายการ (\${currentView === 'monthly' ? 'รายเดือน' : 'รายวัน'})\`;
        }
    }

    async function loadPreview() {
        const previewBtn = document.getElementById('preview-btn');
        const isManualPreview = previewBtn?.dataset.manual === 'true';

        normalizeRequiredZeroFields();

        if (!isPreviewFormReady(isManualPreview)) {
            document.getElementById('schedule-loading').classList.add('hidden');
            document.getElementById('schedule-placeholder').classList.remove('hidden');

            previewDone = false;
            setSubmitEnabled(false);

            return;
        }

        const filingDate = dpGetValue('filing-date');
        const principal  = document.getElementById('principal').value;
        const intRate    = document.getElementById('interest-rate').value;
        const previewJudgmentType = getActiveJudgmentType();
        const isDefaultJudgmentPreview = previewJudgmentType === 'พิพากษาฝ่ายเดียว';
        const instCount  = isDefaultJudgmentPreview ? '1' : document.getElementById('installment-count').value;
        const firstDue   = dpGetValue('first-due-date');
        const inst1      = document.getElementById('installment-1').value;

        document.getElementById('schedule-placeholder').classList.add('hidden');
        document.getElementById('schedule-table-wrap').classList.add('hidden');
        document.getElementById('schedule-info').classList.add('hidden');
        document.getElementById('schedule-loading').classList.remove('hidden');

        const courtFee  = parseFloat(document.getElementById('court-fee').value) || 0;
        const lawyerFee = parseFloat(document.getElementById('lawyer-fee').value) || 0;

        try {
            const res  = await fetch('/api/schedule/preview', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    filing_date:       filingDate,
                    principal:         parseNumber(principal),
                    interest_rate:     parseNumber(intRate),
                    installment_count: parseInt(instCount),
                    diff_debt:         parseNumber(document.getElementById('diff-debt').value),
                    first_due_date:    firstDue,
                    installment_1:     parseNumber(inst1),
                    installment_2:     isDefaultJudgmentPreview ? 0 : parseNumber(document.getElementById('installment-2').value),
                    installment_3:     isDefaultJudgmentPreview ? 0 : parseNumber(document.getElementById('installment-3').value),
                    installment_4:     isDefaultJudgmentPreview ? 0 : parseNumber(document.getElementById('installment-4').value),
                })
            });

            const data = await res.json();
            document.getElementById('schedule-loading').classList.add('hidden');

            if (res.ok) {
                scheduleData = data;
                document.getElementById('schedule-table-wrap').classList.remove('hidden');
                document.getElementById('schedule-info').classList.remove('hidden');

                const warn = document.getElementById('preview-stale-warn');
                if (warn) warn.classList.add('hidden');

                renderSchedule();

                previewDone = !!isManualPreview;

                // เปิดปุ่มบันทึกได้เฉพาะ manual preview สำเร็จ + มีการแก้ไขจริง + ข้อมูลครบ
                setSubmitEnabled(isManualPreview && hasChanged() && isPreviewFormReady(false));

                document.getElementById('preview-btn').dataset.manual = 'false';
            } else {
                previewDone = false;
                setSubmitEnabled(false);

                document.getElementById('schedule-placeholder').classList.remove('hidden');
                showAlert('error', 'เกิดข้อผิดพลาด', data.error || 'ไม่สามารถคำนวณได้ กรุณาตรวจสอบข้อมูล');
            }
        } catch (err) {
            previewDone = false;
            setSubmitEnabled(false);

            document.getElementById('schedule-loading').classList.add('hidden');
            document.getElementById('schedule-placeholder').classList.remove('hidden');
            showAlert('error', 'เชื่อมต่อไม่ได้', 'ไม่สามารถเชื่อมต่อ Server ได้ กรุณาลองใหม่อีกครั้ง');
        }
    }

    // ผูก event กับทุก input field
    const previewFields = ['filing-date','red-case-no','judgment-date','judgment-note','total-debt','principal','interest-rate','default-interest-rate','court-fee','lawyer-fee','installment-count',
                           'first-due-date','installment-1','installment-2',
                           'installment-3','installment-4'];
    previewFields.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('input',  onInputChanged);
        el.addEventListener('change', onInputChanged);
    });



    // ---- Account No events ----
    const accountEl = document.getElementById('account-no');
    accountEl.addEventListener('keydown', handleAccountNoKeydown);
    accountEl.addEventListener('input',   handleAccountNoInput);
    accountEl.addEventListener('blur',    handleAccountNoBlur);

    // ---- Customer Name events ----
    document.getElementById('customer-name').addEventListener('input', handleCustomerNameInput);
    document.getElementById('customer-name').addEventListener('blur',  handleCustomerNameBlur);

    document.getElementById('red-case-no').addEventListener('input', () => { handleRedCaseNoInput(); onInputChanged(); });
    document.getElementById('red-case-no').addEventListener('blur', () => {
        const el = document.getElementById('red-case-no');
        el.value = normalizeCaseNo(el.value);
        handleRedCaseNoInput();
        onInputChanged();
    });
    document.getElementById('judgment-note').addEventListener('input', function() {
        document.getElementById('judgment-note-counter').textContent = String(this.value.length);
        onInputChanged();
    });

    // ---- Money fields ----
    ['total-debt', 'principal', 'court-fee', 'lawyer-fee'].forEach(id => {
        const el = document.getElementById(id);
        el.addEventListener('input',  () => {
            handleMoneyInput(id);
            calculateDiff();
            onInputChanged();
        });
        el.addEventListener('blur',   () => {
            handleMoneyBlur(id);
            calculateDiff();

            // Validate ยอดหนี้รวมทันทีหลังออกจากช่อง
            // เพื่อดักทั้งตัวอักษร และยอดที่เกินทุนทรัพย์ที่ฟ้อง โดยไม่ต้องรอกด Preview
            if (id === 'total-debt') {
                validateBusinessRules(false);
            }

            onInputChanged();
        });
    });

    // ---- Installment fields ----
    [1, 2, 3, 4].forEach(i => {
        const id = 'installment-' + i;
        const el = document.getElementById(id);
        el.addEventListener('input', () => { handleMoneyInput(id); onInputChanged(); });
        el.addEventListener('blur',  () => { handleMoneyBlur(id); onInputChanged(); });
    });

    // ---- Interest rate ----
    document.getElementById('interest-rate').addEventListener('focus', () => { stripRateDisplaySuffix('interest-rate'); });
    document.getElementById('interest-rate').addEventListener('input', () => { handleInterestInput(); calculateDiff(); onInputChanged(); });
    document.getElementById('interest-rate').addEventListener('blur',  () => { handleInterestBlur(); calculateDiff(); onInputChanged(); });

    // ---- Default interest rate ----
    document.getElementById('default-interest-rate').addEventListener('focus', () => { stripRateDisplaySuffix('default-interest-rate'); });
    document.getElementById('default-interest-rate').addEventListener('input', () => { handleDefaultInterestInput(); onInputChanged(); });
    document.getElementById('default-interest-rate').addEventListener('blur',  () => { handleDefaultInterestBlur(); onInputChanged(); });

    // ---- Installment count ----
    document.getElementById('installment-count').addEventListener('input', () => { handleInstallmentCountInput(); calculateLastDueDate(); onInputChanged(); });

    // ---- Date constraints ----
document.getElementById('filing-date').addEventListener('change', () => { updateDateConstraints(); onInputChanged(); });
document.getElementById('judgment-date').addEventListener('change', () => { updateDateConstraints(); validateBusinessRules(false); onInputChanged(); });
document.getElementById('first-due-date').addEventListener('change', () => { calculateLastDueDate(); validateBusinessRules(false); onInputChanged(); });

    // ---- Friendly input focus UX ----
    // ต้องเรียกหลังจากผูก blur/input handler เดิมแล้ว
    // เพื่อให้ logic format เดิมยังทำงานปกติ
    setupFriendlyInputFocus();


    // ============================================================
    // Custom Date Picker Engine
    // ============================================================
    const DP_FIELDS   = ['filing-date', 'judgment-date', 'first-due-date', 'last-due-date', 'enf-judgment-date'];
    const DP_STATE    = {};
    const TH_MONTHS   = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน',
                         'กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];

    DP_FIELDS.forEach(id => {
        const now = new Date();
        DP_STATE[id] = { year: now.getFullYear(), month: now.getMonth(), selected: null, minDate: null, maxDate: null, showMY: false };
    });
    DP_STATE['enf-judgment-date'].maxDate = dpDateStr(new Date());

    function dpGetValue(id) {
        return document.getElementById(id).value;
    }

    function dpSetValue(id, dateStr) {
        document.getElementById(id).value = dateStr;
    }

    function dpFormatDisplay(dateStr) {
        if (!dateStr) return null;
        const [y, m, d] = dateStr.split('-').map(Number);
        return \`\${String(d).padStart(2,'0')}/\${String(m).padStart(2,'0')}/\${y}\`;
    }

    function dpOpen(id) {
        const state = DP_STATE[id];
        const val   = dpGetValue(id);
        if (val) {
            const [y,m] = val.split('-').map(Number);
            state.year  = y;
            state.month = m - 1;
        }
        DP_FIELDS.forEach(f => { if (f !== id) dpClose(f); });
        dpRender(id);

        const popup   = document.getElementById('dp-popup-' + id);
        const display = document.getElementById('dp-display-' + id);
        popup.classList.add('open');
        display.classList.add('open');

        // คำนวณ position แบบ fixed โดยไม่ให้ปฏิทินยืดตามความกว้างของ field
        const rect    = display.getBoundingClientRect();
        const popupW  = Math.min(320, window.innerWidth - 32);
        const popupH  = 350;
        const spaceBelow = window.innerHeight - rect.bottom;
        if (spaceBelow < popupH && rect.top > popupH) {
            popup.style.top  = (rect.top - popupH - 6) + 'px';
        } else {
            popup.style.top  = (rect.bottom + 6) + 'px';
        }
        popup.style.width = popupW + 'px';
        popup.style.left  = Math.min(Math.max(rect.left, 16), window.innerWidth - popupW - 16) + 'px';
    }

    function dpClose(id) {
        document.getElementById('dp-popup-' + id)?.classList.remove('open');
        document.getElementById('dp-display-' + id)?.classList.remove('open');
        DP_STATE[id].showMY = false;
    }

    function dpToggleMyPicker(id) {
        const state = DP_STATE[id];
        state.showMY = !state.showMY;
        dpRender(id);
    }

    function dpNavMonth(id, delta) {
        const s = DP_STATE[id];
        s.month += delta;
        if (s.month > 11) { s.month = 0; s.year++; }
        if (s.month < 0)  { s.month = 11; s.year--; }
        dpRender(id);
    }

    function dpNavYear(id, delta) {
        DP_STATE[id].year += delta;
        dpRender(id);
    }

    function dpRender(id) {
        const s       = DP_STATE[id];
        const titleEl = document.getElementById('dp-title-' + id);
        titleEl.textContent = TH_MONTHS[s.month] + ' ' + (s.year + 543);

        if (s.showMY) {
            document.getElementById('dp-cal-' + id).classList.add('hidden');
            document.getElementById('dp-my-' + id).classList.remove('hidden');
            document.getElementById('dp-year-label-' + id).textContent = 'พ.ศ. ' + (s.year + 543);
            dpRenderMonths(id);
        } else {
            document.getElementById('dp-cal-' + id).classList.remove('hidden');
            document.getElementById('dp-my-' + id).classList.add('hidden');
            dpRenderDays(id);
        }
    }

    function dpRenderMonths(id) {
        const s   = DP_STATE[id];
        const el  = document.getElementById('dp-months-' + id);
        el.innerHTML = TH_MONTHS.map((m, i) => {
            const cls = i === s.month ? 'dp-my-item active' : 'dp-my-item';
            return \`<div class="\${cls}" onclick="dpSelectMonth('\${id}',\${i})">\${window.LQDThaiDate.shortMonth(i)}</div>\`;
        }).join('');
    }

    function dpSelectMonth(id, month) {
        DP_STATE[id].month  = month;
        DP_STATE[id].showMY = false;
        dpRender(id);
    }

    function dpRenderDays(id) {
        const s        = DP_STATE[id];
        const el       = document.getElementById('dp-days-' + id);
        const today    = new Date();
        today.setHours(0,0,0,0);
        const minDate  = s.minDate ? new Date(s.minDate + 'T00:00:00') : null;
        const maxDate  = s.maxDate ? new Date(s.maxDate + 'T00:00:00') : null;
        const first    = new Date(s.year, s.month, 1);
        const last     = new Date(s.year, s.month + 1, 0);
        const startDay = first.getDay();
        const selStr   = dpGetValue(id);

        let html = '';

        for (let i = 0; i < startDay; i++) {
            const d   = new Date(s.year, s.month, -startDay + i + 1);
            const str = dpDateStr(d);
            html += \`<div class="dp-day dp-day-other">\${d.getDate()}</div>\`;
        }

        for (let d = 1; d <= last.getDate(); d++) {
            const date    = new Date(s.year, s.month, d);
            const str     = dpDateStr(date);
            const isToday = date.getTime() === today.getTime();
            const isSel   = str === selStr;
            const isDisabled = (minDate && date < minDate) || (maxDate && date > maxDate);
            let cls = 'dp-day';
            if (isDisabled) cls += ' dp-day-disabled';
            else if (isSel) cls += ' dp-day-selected';
            else if (isToday) cls += ' dp-day-today';
            html += \`<div class="\${cls}" onclick="dpSelectDay('\${id}','\${str}')">\${d}</div>\`;
        }

        const totalCells = startDay + last.getDate();
        const trailingCells = Math.max(0, 42 - totalCells);
        for (let i = 1; i <= trailingCells; i++) {
            html += \`<div class="dp-day dp-day-other">\${i}</div>\`;
        }

        el.innerHTML = html;
    }

    function dpDateStr(date) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2,'0');
        const d = String(date.getDate()).padStart(2,'0');
        return \`\${y}-\${m}-\${d}\`;
    }

    function dpSelectDay(id, dateStr) {
        const state = DP_STATE[id];
        if ((state.minDate && dateStr < state.minDate) || (state.maxDate && dateStr > state.maxDate)) return;

        dpSetValue(id, dateStr);
        const disp = document.getElementById('dp-text-' + id);
        disp.textContent = dpFormatDisplay(dateStr);
        disp.classList.remove('text-slate-400');
        disp.classList.add('text-slate-800');
        dpClose(id);
        dpAfterSelect(id);
    }

    function dpClear(id) {
        dpSetValue(id, '');
        const disp = document.getElementById('dp-text-' + id);
        const placeholders = {
            'filing-date':       'เลือกวันที่ยื่นฟ้อง',
            'judgment-date':     'เลือกวันที่พิพากษา',
            'first-due-date':    'เลือกวันครบกำหนดงวดแรก',
            'last-due-date':     'คำนวณอัตโนมัติ',
            'enf-judgment-date': 'เลือกวันที่',
        };
        disp.textContent = placeholders[id] || 'เลือกวันที่';
        disp.classList.add('text-slate-400');
        disp.classList.remove('text-slate-800');
        dpClose(id);
        dpAfterSelect(id);
    }

    function dpSelectToday(id) {
        const today = new Date();
        const str   = dpDateStr(today);
        const state = DP_STATE[id];
        if (state.minDate && str < state.minDate) return;
        if (state.maxDate && str > state.maxDate) return;
        dpSelectDay(id, str);
    }

    function dpSetMin(id, minDateStr) {
        DP_STATE[id].minDate = minDateStr;
        const cur = dpGetValue(id);
        if (cur && cur < minDateStr) { dpClear(id); }
    }

    function dpSetMax(id, maxDateStr) {
        DP_STATE[id].maxDate = maxDateStr;
        const cur = dpGetValue(id);
        if (cur && cur > maxDateStr) { dpClear(id); }
    }

    function dpAfterSelect(id) {
        if (id === 'filing-date') {
            const val = dpGetValue('filing-date');
            if (val) dpSetMin('judgment-date', val);
            updateDateConstraints();
            onInputChanged();
        } else if (id === 'judgment-date') {
            updateDateConstraints();
            validateBusinessRules(false);
            onInputChanged();
        } else if (id === 'first-due-date') {
            calculateLastDueDate();
            validateBusinessRules(false);
            onInputChanged();
        }
    }

    document.addEventListener('click', function(e) {
        DP_FIELDS.forEach(id => {
            const wrap = document.getElementById('dp-wrap-' + id);
            if (wrap && !wrap.contains(e.target)) dpClose(id);
        });
    });

    async function loadEditHistory() {
        const body = document.getElementById('edit-history-body');
        if (!body) return;
        try {
            const res  = await fetch(\`/api/customers/\${accountNo}/edits\`);
            const data = await res.json();
            if (!data.edits || data.edits.length === 0) {
                body.innerHTML = '<p class="text-slate-400 text-sm text-center py-4">ไม่มีประวัติการแก้ไข</p>';
                return;
            }
            body.innerHTML = data.edits.map(e => {
                const changes = Object.values(e.changes).map(c =>
                    \`<span class="inline-flex items-center gap-1 text-[11px] bg-slate-50 border border-slate-100 rounded px-2 py-0.5">
                        <span class="font-bold text-slate-600">\${c.label}</span>
                        <span class="text-slate-400">\${c.from ?? '-'} → \${c.to ?? '-'}</span>
                    </span>\`
                ).join(' ');
                const dtLocal = (() => {
                    try {
                        const d = new Date(e.edited_at.replace(' ', 'T') + 'Z');
                        const day  = String(d.getDate()).padStart(2,'0');
                        const mon  = String(d.getMonth()+1).padStart(2,'0');
                        const year = d.getFullYear() + 543;
                        const hh   = String(d.getHours()).padStart(2,'0');
                        const mm   = String(d.getMinutes()).padStart(2,'0');
                        return \`\${day}/\${mon}/\${year} \${hh}:\${mm}\`;
                    } catch(e) { return ''; }
                })();
                return \`<div class="py-3 border-b border-slate-50 last:border-0">
                    <div class="flex items-center gap-2 mb-1.5">
                        <span class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">\${(e.edited_by_name||'?').charAt(0)}</span>
                        <span class="text-xs font-bold text-slate-700">\${e.edited_by_name || 'ไม่ทราบ'}</span>
                        <span class="text-[11px] text-slate-400">\${dtLocal}</span>
                    </div>
                    <div class="flex flex-wrap gap-1.5 ml-8">\${changes}</div>
                </div>\`;
            }).join('');
        } catch(e) {
            body.innerHTML = '<p class="text-slate-400 text-sm text-center py-4">ไม่สามารถโหลดประวัติได้</p>';
        }
    }

    // ============================================================
    // Case Status Logic
    // ============================================================

    let currentCus  = null
    let currentSnap = null

    const CASE_BADGE_STYLES = {
        'ยื่นฟ้อง':          'bg-blue-50 text-blue-700 border-blue-200',
        'พิพากษาตามยอม':    'bg-green-50 text-green-700 border-green-200',
        'พิพากษาฝ่ายเดียว': 'bg-orange-50 text-orange-700 border-orange-200',
        'บังคับคดี':         'bg-red-50 text-red-700 border-red-200',
        'ปิดบัญชี':          'bg-gray-100 text-gray-500 border-gray-200',
    }

    const FLOW_A = ['ยื่นฟ้อง', 'พิพากษาตามยอม', 'บังคับคดี', 'ปิดบัญชี']
    const FLOW_B = ['ยื่นฟ้อง', 'พิพากษาฝ่ายเดียว', 'บังคับคดี', 'ปิดบัญชี']

    function renderProgressBar(caseStatus, statusLogs) {
        const container = document.getElementById('progress-steps')
        if (!container) return

        // ใช้ status log เป็นแหล่งอ้างอิงหลักว่าเคยผ่านสถานะไหนจริง
        // สำคัญมากสำหรับเคสที่ "ปิดบัญชี" โดยไม่เคย "บังคับคดี"
        const visitedStatuses = new Set()
        const logs = Array.isArray(statusLogs) ? statusLogs : []

        logs.forEach(log => {
            if (log.from_status) visitedStatuses.add(log.from_status)
            if (log.to_status)   visitedStatuses.add(log.to_status)
        })
        if (caseStatus) visitedStatuses.add(caseStatus)

        // เลือก flow จากประวัติจริงก่อน ไม่ใช้ caseStatus อย่างเดียว
        // เพราะถ้า caseStatus = "ปิดบัญชี" จะดูไม่ออกว่าเคยเป็น
        // "พิพากษาตามยอม" หรือ "พิพากษาฝ่ายเดียว" ถ้าไม่ดู log
        let flow = FLOW_A
        if (visitedStatuses.has('พิพากษาฝ่ายเดียว') || caseStatus === 'พิพากษาฝ่ายเดียว') {
            flow = FLOW_B
        } else if (visitedStatuses.has('พิพากษาตามยอม') || caseStatus === 'พิพากษาตามยอม') {
            flow = FLOW_A
        }

        // ถ้าเป็นข้อมูลเก่าที่ไม่มี log เลย และสถานะปัจจุบันเป็น ปิดบัญชี
        // จะไม่เดาเองว่าเคยผ่าน บังคับคดี เพื่อป้องกันการติ๊กถูกผิด
        const hasRealLogs = logs.length > 0
        if (!hasRealLogs && caseStatus === 'ปิดบัญชี') {
            visitedStatuses.clear()
            visitedStatuses.add('ปิดบัญชี')
        }

        let dotsRow   = ''
        let labelsRow = ''

        flow.forEach((step, i) => {
            const isActive = step === caseStatus
            const isDone   = !isActive && visitedStatuses.has(step)

            let displayLabel = step
            if (caseStatus === 'ยื่นฟ้อง' && i === 1) displayLabel = 'พิพากษา...'

            let dot = ''
            if (isDone) {
                dot = \`<div class="pb-dot-done">
                    <span class="material-symbols-outlined" style="font-size:13px;color:#2563eb;font-variation-settings:'FILL' 1">check</span>
                </div>\`
            } else if (isActive) {
                dot = \`<div class="pb-dot-active"><div class="pb-dot-active-inner"></div></div>\`
            } else {
                dot = \`<div class="pb-dot-pending"></div>\`
            }
            dotsRow += dot

            if (i < flow.length - 1) {
                const nextStep = flow[i + 1]

                // เส้น connector ให้แสดงเป็นเส้นทางความคืบหน้าไปจนถึงสถานะปัจจุบัน
                // แต่ตัววงกลมยังอ้างอิงจาก visitedStatuses ตาม log จริงเท่านั้น
                // ตัวอย่าง:
                // ยื่นฟ้อง -> พิพากษาฝ่ายเดียว -> ปิดบัญชี
                // เส้นจะลากผ่าน "บังคับคดี" เป็นสีขาว แต่ dot บังคับคดีจะยังว่าง
                const currentIndex = flow.indexOf(caseStatus)
                const lineFilled = currentIndex > -1 && i < currentIndex

                dotsRow += \`<div class="pb-line">
                    <div class="pb-line-fill \${lineFilled ? 'pb-line-fill-done' : 'pb-line-fill-none'}"></div>
                </div>\`
            }

            const labelClass = isActive ? 'pb-label-active' : isDone ? 'pb-label-done' : 'pb-label-pending'
            labelsRow += \`<div class="pb-label-col" style="width:24px"><span class="\${labelClass}">\${displayLabel}</span></div>\`
            if (i < flow.length - 1) {
                labelsRow += \`<div class="pb-label-spacer"></div>\`
            }
        })

        container.innerHTML = \`
            <div class="pb-track" style="min-width:300px">
                <div class="pb-dots-row">\${dotsRow}</div>
                <div class="pb-labels-row">\${labelsRow}</div>
            </div>\`
    }

    async function loadStatusLogs() {
        const body = document.getElementById('status-logs-body')
        if (!body) return []
        try {
            const res  = await fetch(\`/api/customers/\${accountNo}/status-logs\`, { headers: { 'Authorization': \`Bearer \${getCookie('token')}\` } })
            const data = await res.json()
            const logs = data.logs || []
            if (!logs.length) { body.innerHTML = '<p class="text-slate-300 text-[11px] text-center py-1">ไม่มีประวัติ</p>'; return logs }
            body.innerHTML = logs.map(log => \`
                <div class="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0">
                    <div class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary flex-shrink-0">\${log.changed_by ? (log.changed_by_name || '?').charAt(0) : 'S'}</div>
                    <div class="flex-1">
                        <span class="text-[11px] font-semibold text-slate-700">\${log.from_status || '(ใหม่)'}</span>
                        <span class="text-[11px] text-slate-400 mx-1">→</span>
                        <span class="text-[11px] font-bold text-primary">\${log.to_status}</span>
                        <span class="text-[10px] text-slate-300 ml-2">\${log.note || ''}</span>
                    </div>
                    <div class="text-[10px] text-slate-300 text-right">\${fmtTs(log.changed_at)}</div>
                </div>\`).join('')
            return logs
        } catch(e) { body.innerHTML = '<p class="text-slate-300 text-[11px] text-center py-1">โหลดไม่ได้</p>'; return [] }
    }

    function updateSectionVisibility(caseStatus, snap) {
        const outstanding = snap ? snap.outstanding : 0
        const ncb         = snap ? snap.ncb_months  : '31'

        ;['section-enforcement-form','section-enforcement-info'].forEach(id => {
            const el = document.getElementById(id)
            if (el) el.style.display = 'none'
        })

        const footer = document.querySelector('footer')
        const canEdit = canEditJudgmentData(caseStatus)

        // ซ่อน judgment-type-row ก่อนทุกครั้ง
        const jtr = document.getElementById('judgment-type-row')
        if (jtr) jtr.classList.add('hidden')
        jtReset()

        // lock/unlock ช่องกรอกตามสิทธิ์
        setJudgmentFormLocked(!canEdit)

        // footer = ปุ่ม Cancel / บันทึกการแก้ไข
        if (footer) {
            footer.style.display = canEdit ? '' : 'none'
        }

        if (caseStatus === 'ยื่นฟ้อง') {
            // แสดง dropdown เลือกประเภทคำพิพากษาเฉพาะตอนยังเป็นยื่นฟ้อง
            if (jtr) jtr.classList.remove('hidden')

        } else if (['พิพากษาตามยอม','พิพากษาฝ่ายเดียว'].includes(caseStatus)) {
            if (canRecordEnforcementRole() && currentCus?.can_record_enforcement === true) {
                const redCaseInput = document.getElementById('enf-red-case-no')
                if (redCaseInput) redCaseInput.value = currentCus?.red_case_no || '-'
                const el = document.getElementById('section-enforcement-form')
                if (el) el.style.display = ''
            }

        } else if (caseStatus === 'บังคับคดี') {
            const el = document.getElementById('section-enforcement-info')
            if (el) el.style.display = ''

        } else if (caseStatus === 'ปิดบัญชี') {
            if (currentCus && currentCus.enforcement_order_no) {
                const el = document.getElementById('section-enforcement-info')
                if (el) el.style.display = ''
            }

            // ปิดบัญชีแล้วไม่ให้แก้ แม้เป็น admin
            setJudgmentFormLocked(true)
            if (footer) footer.style.display = 'none'
        }
    }

    function fillEnforcementInfo(cus) {
        const fmt = v => { if (!v) return '-'; const p = v.split('-'); return p.length === 3 ? \`\${p[2]}/\${p[1]}/\${p[0]}\` : v }
        const el = id => document.getElementById(id)
        if (el('enf-info-red-case-no'))   el('enf-info-red-case-no').textContent   = cus.red_case_no || cus.enforcement_order_no || '-'
        if (el('enf-info-judgment-date')) el('enf-info-judgment-date').textContent = fmt(cus.enforcement_judgment_date)
        if (el('enf-info-recorded'))      el('enf-info-recorded').textContent      = cus.enforcement_recorded_at ? fmtTs(cus.enforcement_recorded_at) : '-'
        renderRetroactiveEnforcement(cus)
    }

    function renderRetroactiveJudgment(cus) {
        const alert = cus?.retroactive_judgment_alert
        const badge = document.getElementById('retro-judgment-status-badge')
        const message = document.getElementById('retro-judgment-message')
        const meta = document.getElementById('retro-judgment-meta')
        const btn = document.getElementById('retro-judgment-confirm-btn')
        if (!badge || !message || !meta || !btn) return

        badge.className = 'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border'
        btn.disabled = true
        btn.className = 'w-full sm:w-[245px] px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-500 text-xs font-bold transition-all'

        if (!alert) {
            badge.classList.add('bg-emerald-50', 'text-emerald-700', 'border-emerald-100')
            badge.textContent = 'ไม่มีรายการย้อนหลัง'
            message.textContent = 'ไม่มีรายการคำพิพากษาข้ามเดือนที่ต้องยืนยัน'
            meta.textContent = '-'
            btn.textContent = 'ไม่มีรายการที่ต้องยืนยัน'
            return
        }

        const affected = alert.affected_month_label || alert.affected_report_month || '-'
        if (alert.marked) {
            badge.classList.add('bg-emerald-50', 'text-emerald-700', 'border-emerald-100')
            badge.textContent = 'แก้แล้ว'
            message.textContent = \`ยืนยันแล้วว่าแก้รายงานเดือน \${affected} เรียบร้อย\`
            meta.textContent = \`สถานะเดิม: \${alert.from_status || '-'} | สถานะที่ควรเป็น: \${alert.to_status || alert.case_status || '-'}\`
            btn.textContent = 'แก้รายงานแล้ว'
            return
        }

        badge.classList.add('bg-amber-50', 'text-amber-700', 'border-amber-100')
        badge.textContent = 'รอยืนยัน'
        message.textContent = alert.reason || \`กรุณาตรวจสอบ/แก้รายงานเดือน \${affected}\`
        meta.textContent = \`วันที่พิพากษา: \${fmtDate(alert.effective_date || alert.judgment_date)} | สถานะเดิม: \${alert.from_status || '-'} | สถานะที่ควรเป็น: \${alert.to_status || alert.case_status || '-'}\`

        if (isAdminRole()) {
            btn.disabled = false
            btn.className = 'w-full sm:w-[245px] px-4 py-2.5 rounded-xl border border-amber-200 bg-white text-amber-700 text-xs font-bold transition-all hover:bg-amber-50'
            btn.textContent = \`ยืนยันว่าแก้รายงาน \${affected} แล้ว\`
        } else {
            btn.textContent = 'เฉพาะ Admin เท่านั้นที่ยืนยันได้'
        }
    }

    async function confirmRetroJudgmentFix() {
        const alert = currentCus?.retroactive_judgment_alert
        if (!alert || alert.marked) return
        if (!isAdminRole()) {
            showAlert('warning', 'ไม่มีสิทธิ์ยืนยัน', 'เฉพาะ Admin เท่านั้นที่ยืนยันว่าแก้รายงานย้อนหลังแล้วได้')
            return
        }

        const btn = document.getElementById('retro-judgment-confirm-btn')
        if (btn) {
            btn.disabled = true
            btn.textContent = 'กำลังบันทึก...'
        }
        try {
            const res = await fetch(\`/api/customers/\${accountNo}/retroactive-report-fix\`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': \`Bearer \${getCookie('token')}\` },
                body: JSON.stringify({
                    reason_code: alert.reason_code,
                    affected_report_month: alert.affected_report_month,
                    note: 'แก้รายงานย้อนหลังแล้ว'
                })
            })
            const data = await res.json()
            if (!res.ok) {
                showAlert('error', 'ไม่สามารถยืนยันได้', data.error || 'เกิดข้อผิดพลาด')
                return
            }
            showSuccessToast('บันทึกสำเร็จ', data.message || 'ยืนยันว่าแก้รายงานย้อนหลังแล้ว')
            await loadCustomerData()
            loadEditHistory()
        } catch(e) {
            showAlert('error', 'เชื่อมต่อไม่ได้', 'ไม่สามารถเชื่อมต่อ Server ได้')
        } finally {
            if (btn) {
                btn.disabled = false
            }
        }
    }

    function setRetroToggleState(isOn, disabled, label, title = '') {
        const btn = document.getElementById('retro-enforcement-toggle')
        const labelEl = document.getElementById('retro-enforcement-toggle-label')
        const knob = document.getElementById('retro-enforcement-toggle-knob')
        const knobDot = knob?.querySelector('span')
        if (!btn || !labelEl || !knob || !knobDot) return

        btn.disabled = !!disabled
        btn.title = title
        btn.setAttribute('aria-checked', isOn ? 'true' : 'false')
        labelEl.textContent = label
        btn.classList.toggle('border-emerald-200', isOn)
        btn.classList.toggle('text-emerald-700', isOn)
        btn.classList.toggle('border-slate-200', !isOn)
        btn.classList.toggle('text-slate-500', !isOn)
        knob.classList.toggle('bg-emerald-500', isOn)
        knob.classList.toggle('bg-slate-200', !isOn)
        knobDot.style.transform = isOn
            ? 'translate(1.375rem, -50%)'
            : 'translate(0.125rem, -50%)'
    }

    function renderRetroactiveEnforcement(cus) {
        const alert = cus?.retroactive_enforcement_alert
        const badge = document.getElementById('retro-enforcement-status-badge')
        const message = document.getElementById('retro-enforcement-message')
        const meta = document.getElementById('retro-enforcement-meta')
        if (!badge || !message || !meta) return

        badge.className = 'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border'

        if (!alert) {
            badge.classList.add('bg-emerald-50', 'text-emerald-700', 'border-emerald-100')
            badge.textContent = 'ไม่มีรายการย้อนหลัง'
            message.textContent = 'ไม่มีรายการที่ต้องยืนยันว่าแก้รายงานย้อนหลังจาก 31 เป็น 30'
            meta.textContent = 'รายการนี้ใช้เฉพาะเคสบังคับคดีที่มาจากพิพากษาตามยอม และวันที่ของหมายอยู่ก่อนเดือนที่บันทึก/ตรวจรายงาน'
            setRetroToggleState(false, true, 'ไม่มีรายการที่ต้องยืนยัน')
            return
        }

        const affected = alert.affected_month_label || alert.affected_report_month || '-'
        const source = alert.source_month_label || alert.source_report_month || '-'

        if (alert.marked) {
            badge.classList.add('bg-emerald-50', 'text-emerald-700', 'border-emerald-100')
            badge.textContent = 'แก้แล้ว'
            message.textContent = \`ยืนยันแล้วว่าแก้รายงานเดือน \${affected} เรียบร้อย\`
            meta.textContent = \`ยืนยันโดย \${alert.marked_by_name || '-'} วันที่ \${fmtTs(alert.marked_at)}\`
            setRetroToggleState(true, true, \`แก้รายงาน \${affected} แล้ว\`)
            return
        }

        badge.classList.add('bg-amber-50', 'text-amber-700', 'border-amber-100')
        badge.textContent = 'รอยืนยัน'
        message.textContent = alert.reason || \`กรุณาตรวจสอบ/แก้รายงานเดือน \${affected}\`
        meta.textContent = \`วันที่ของหมาย: \${fmtDate(alert.effective_date || alert.enforcement_date)} | เดือนรายงานที่พบ: \${source}\`

        if (isAdminRole()) {
            setRetroToggleState(false, false, \`แก้รายงาน \${affected} แล้ว\`)
        } else {
            setRetroToggleState(false, true, \`แก้รายงาน \${affected} แล้ว\`, 'เฉพาะ Admin เท่านั้นที่ยืนยันได้')
        }
    }

    function openRetroEnforcementConfirm() {
        const alert = currentCus?.retroactive_enforcement_alert
        if (!alert || alert.marked) return
        if (!isAdminRole()) {
            showAlert('warning', 'ไม่มีสิทธิ์ยืนยัน', 'เฉพาะ Admin เท่านั้นที่ยืนยันว่าแก้รายงานย้อนหลังแล้วได้')
            return
        }

        const affected = alert.affected_month_label || alert.affected_report_month || '-'
        document.getElementById('retro-modal-account').textContent = currentCus?.account_no || accountNo || '-'
        document.getElementById('retro-modal-month').textContent = affected
        document.getElementById('retro-modal-message').textContent = alert.reason || \`กรุณายืนยันว่าแก้รายงานเดือน \${affected} แล้ว\`
        document.getElementById('retro-enforcement-confirm-modal')?.classList.remove('hidden')
    }

    function closeRetroEnforcementConfirm() {
        document.getElementById('retro-enforcement-confirm-modal')?.classList.add('hidden')
    }

    async function confirmRetroEnforcementFix() {
        const btn = document.getElementById('retro-modal-confirm-btn')
        if (btn) {
            btn.disabled = true
            btn.textContent = 'กำลังบันทึก...'
        }
        try {
            const res = await fetch(\`/api/customers/\${accountNo}/retroactive-enforcement-fix\`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': \`Bearer \${getCookie('token')}\` },
                body: JSON.stringify({ note: 'แก้รายงานย้อนหลังแล้ว' })
            })
            const data = await res.json()
            if (!res.ok) {
                showAlert('error', 'ไม่สามารถยืนยันได้', data.error || 'เกิดข้อผิดพลาด')
                return
            }
            closeRetroEnforcementConfirm()
            showSuccessToast('บันทึกสำเร็จ', data.message || 'ยืนยันว่าแก้รายงานย้อนหลังแล้ว')
            await loadCustomerData()
            loadEditHistory()
        } catch(e) {
            showAlert('error', 'เชื่อมต่อไม่ได้', 'ไม่สามารถเชื่อมต่อ Server ได้')
        } finally {
            if (btn) {
                btn.disabled = false
                btn.textContent = 'ยืนยันว่าแก้รายงานแล้ว'
            }
        }
    }

    async function submitEnforcement() {
        if (!canRecordEnforcementRole()) {
            showAlert(
                'warning',
                'ไม่สามารถบันทึกหมายบังคับคดีได้',
                'ฟังก์ชันนี้อนุญาตเฉพาะ Admin และ User เท่านั้น'
            );
            return;
        }

        const judgmentDate = dpGetValue('enf-judgment-date')
        if (!judgmentDate) {
            showAlert('warning', 'กรุณากรอกข้อมูลให้ครบ', 'ต้องเลือกวันที่ของหมายบังคับคดี'); return
        }
        if (judgmentDate > dpDateStr(new Date())) {
            showAlert('warning', 'วันที่ไม่ถูกต้อง', 'วันที่ของหมายบังคับคดีต้องไม่เป็นวันที่ในอนาคต'); return
        }
        try {
            const res = await fetch(\`/api/customers/\${accountNo}/enforcement\`, {
                method: 'PATCH', headers: { 'Content-Type': 'application/json', 'Authorization': \`Bearer \${getCookie('token')}\` },
                body: JSON.stringify({ enforcement_judgment_date: judgmentDate })
            })
            const data = await res.json()
            if (res.ok) { showSuccessToast('บันทึกสำเร็จ', 'บันทึกหมายบังคับคดีเรียบร้อย สถานะเปลี่ยนเป็น บังคับคดี'); await loadCustomerData(); loadEditHistory() }
            else { showAlert('error', 'เกิดข้อผิดพลาด', data.error || 'ไม่สามารถบันทึกได้') }
        } catch(e) { showAlert('error', 'เชื่อมต่อไม่ได้', 'ไม่สามารถเชื่อมต่อ Server ได้') }
    }

    function fmtTs(ts) {
        if (!ts) return '-'
        try {
            const d = new Date(ts.replace(' ','T') + (ts.includes('+') ? '' : 'Z'))
            return \`\${String(d.getDate()).padStart(2,'0')}/\${String(d.getMonth()+1).padStart(2,'0')}/\${d.getFullYear()+543} \${String(d.getHours()).padStart(2,'0')}:\${String(d.getMinutes()).padStart(2,'0')}\`
        } catch { return ts }
    }

    // ============================================================
    // Custom Dropdown — ประเภทคำพิพากษา
    // ============================================================
    function jtToggle() {
        const panel   = document.getElementById('jt-panel');
        const chevron = document.getElementById('jt-chevron');
        const isOpen  = !panel.classList.contains('hidden');
        if (isOpen) {
            panel.classList.add('hidden');
            chevron.style.transform = 'rotate(0deg)';
        } else {
            panel.classList.remove('hidden');
            chevron.style.transform = 'rotate(180deg)';
        }
    }

    function jtSelect(value) {
        // เก็บค่าใน hidden input (ใช้กับ logic เดิมที่อ่าน #judgment-type)
        document.getElementById('judgment-type').value = value;

        // อัปเดต display text
        const display = document.getElementById('jt-display');
        display.textContent = value;
        display.classList.remove('text-slate-400');
        display.classList.add('text-slate-800', 'font-semibold');

        // แสดง checkmark เฉพาะตัวที่เลือก
        ['พิพากษาตามยอม', 'พิพากษาฝ่ายเดียว'].forEach(v => {
            const el = document.getElementById('jt-check-' + v);
            if (el) el.classList.toggle('hidden', v !== value);
        });

        // ไฮไลต์ trigger button
        const jtTrigger = document.getElementById('jt-trigger');
        jtTrigger.classList.remove('border-red-400', 'ring-red-500/10');
        jtTrigger.classList.add('border-indigo-500', 'ring-4', 'ring-indigo-500/10');
        document.getElementById('warn-judgment-type')?.classList.add('hidden');

        // ปิด panel
        document.getElementById('jt-panel').classList.add('hidden');
        document.getElementById('jt-chevron').style.transform = 'rotate(0deg)';

        // ใช้ rule เฉพาะประเภทคำพิพากษาทันทีหลังเลือก
        applyJudgmentTypeInputRules(true);
    }

    // ปิด dropdown เมื่อคลิกนอก
    document.addEventListener('click', function(e) {
        const wrap = document.getElementById('jt-dropdown-wrap');
        if (wrap && !wrap.contains(e.target)) {
            document.getElementById('jt-panel')?.classList.add('hidden');
            document.getElementById('jt-chevron').style.transform = 'rotate(0deg)';
        }
    });

    // Reset dropdown เมื่อ updateSectionVisibility ซ่อน/แสดง
    function jtReset() {
        document.getElementById('judgment-type').value  = '';
        const display = document.getElementById('jt-display');
        display.textContent = 'เลือกประเภทเพื่อเปลี่ยนสถานะ';
        display.className   = 'text-slate-400';
        document.getElementById('jt-trigger').classList.remove('border-indigo-500', 'border-red-400', 'ring-4', 'ring-indigo-500/10', 'ring-red-500/10');
        document.getElementById('warn-judgment-type')?.classList.add('hidden');
        ['พิพากษาตามยอม', 'พิพากษาฝ่ายเดียว'].forEach(v => {
            document.getElementById('jt-check-' + v)?.classList.add('hidden');
        });
        document.getElementById('jt-panel')?.classList.add('hidden');
        document.getElementById('jt-chevron').style.transform = 'rotate(0deg)';
        applyJudgmentTypeInputRules(false);
    }

    setupUI();
    loadCustomerData();
    loadEditHistory();

    // ซ่อน stale warn เริ่มต้น
    const staleWarn = document.getElementById('preview-stale-warn');
    if (staleWarn) staleWarn.style.display = 'none';

    const installmentCountInput = document.getElementById('installment-count');

    if (installmentCountInput) {
        installmentCountInput.addEventListener('focus', function () {
            if (this.value === '0') {
                this.value = '';
            }

            this.placeholder = '';
        });

        installmentCountInput.addEventListener('blur', function () {
            this.placeholder = '0';
        });
    }
`,Zm="bg-surface text-on-surface min-h-screen font-body selection:bg-indigo-100 selection:text-primary";function Gm(i,d){Function("event",i).call(d.currentTarget,d)}function qm(){const i=window;if(i.LQDThaiDate)return;const d=["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"],u=["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];i.LQDThaiDate={monthsFull:d,monthsShort:u,shortMonth:v=>u[Number(v)]||"",fullMonth:v=>d[Number(v)]||""}}function Xm(){qm();const i=globalThis.eval;i(Km)}function ef(){k.useEffect(()=>{document.body.className=Zm,Xm()},[])}function tf({runLegacyAction:i}){return n.jsxs(n.Fragment,{children:[n.jsxs("main",{className:"md:ml-56 pt-20 min-h-screen pb-24",children:[n.jsx("div",{className:"px-6 md:px-8",children:n.jsx("div",{className:"max-w-[1600px] mx-auto",children:n.jsxs("header",{className:"flex flex-col xl:flex-row xl:items-center justify-between gap-4 py-4 border-b border-indigo-100/50",children:[n.jsxs("div",{className:"flex items-center gap-4 min-w-0",children:[n.jsx("a",{id:"customer-detail-back-link",href:"/customer-list",className:"w-14 h-14 rounded-2xl bg-white shadow-lg shadow-slate-200/50 flex items-center justify-center text-primary border border-white hover:bg-indigo-50 transition-all flex-shrink-0",children:n.jsx("span",{className:"material-symbols-outlined text-3xl",children:"arrow_back"})}),n.jsxs("div",{className:"min-w-0",children:[n.jsxs("div",{className:"flex items-center gap-3 flex-wrap",children:[n.jsx("h1",{className:"font-headline text-3xl font-extrabold text-primary tracking-tight",children:"รายละเอียดลูกหนี้"}),n.jsx("span",{className:"inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-50 text-primary border border-indigo-100",children:"Customer Detail"})]}),n.jsx("p",{id:"detail-subtitle",className:"text-slate-500 font-medium text-sm mt-1 truncate",children:"กำลังโหลดข้อมูล..."})]})]}),n.jsx("div",{className:"w-full xl:w-auto flex items-center xl:justify-end",children:n.jsxs("div",{className:"flex flex-col gap-2 w-full xl:w-auto",children:[n.jsx("p",{className:"text-[10px] text-slate-400 uppercase tracking-widest font-bold leading-none text-right",children:"Status Progress"}),n.jsx("div",{id:"progress-steps",className:"min-w-[300px] min-h-[52px]"})]})})]})})}),n.jsxs("div",{id:"error-banner",className:"hidden mx-6 mt-4 max-w-[1600px] bg-red-50 border border-red-200 rounded-xl px-5 py-3 flex items-center gap-3",children:[n.jsx("span",{className:"material-symbols-outlined text-red-500 flex-shrink-0",style:{fontVariationSettings:'"FILL" 1'},children:"error"}),n.jsx("p",{id:"error-text",className:"text-sm text-red-700 font-medium flex-1"}),n.jsx("button",{onClick:d=>i("hideError()",d),className:"text-red-400 hover:text-red-600",children:n.jsx("span",{className:"material-symbols-outlined text-lg",children:"close"})})]}),n.jsx("div",{className:"px-6 md:px-8 py-6",children:n.jsxs("div",{className:"max-w-[1600px] mx-auto grid grid-cols-12 gap-4 items-stretch",children:[n.jsx("div",{className:"col-span-12",children:n.jsxs("div",{className:"dashboard-card",children:[n.jsx("div",{className:"detail-card-heading px-5 md:px-6 py-4 border-b border-sky-100 bg-gradient-to-r from-sky-50 via-white to-cyan-50 rounded-t-2xl overflow-hidden",children:n.jsxs("div",{className:"flex items-center justify-between gap-3 flex-wrap",children:[n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsx("div",{className:"w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-100 to-cyan-100 flex items-center justify-center text-sky-600 shadow-sm flex-shrink-0",children:n.jsx("span",{className:"material-symbols-outlined text-[20px]",style:{fontVariationSettings:'"FILL" 1'},children:"account_balance_wallet"})}),n.jsxs("div",{children:[n.jsx("div",{className:"flex items-center gap-2 flex-wrap",children:n.jsx("h2",{className:"text-[18px] font-extrabold text-slate-800 tracking-tight",children:"รายละเอียดบัญชี"})}),n.jsx("p",{className:"text-[12px] text-slate-500 mt-0.5",children:"แสดงข้อมูลบัญชีลูกหนี้และข้อมูลพื้นฐาน"})]})]}),n.jsx("div",{className:"detail-status-pill",children:n.jsx("span",{children:"Existing Case"})})]})}),n.jsxs("div",{className:"dashboard-card-content",children:[n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[n.jsxs("div",{children:[n.jsxs("label",{className:"form-label-styled",children:["หมายเลขบัญชี ",n.jsx("span",{className:"text-red-500",children:"*"})]}),n.jsxs("div",{className:"relative",children:[n.jsx("span",{className:"material-symbols-outlined readonly-display-icon",children:"badge"}),n.jsx("input",{id:"account-no",className:"form-input-styled readonly-display-input readonly-display-with-icon pr-4",type:"text",readOnly:!0,tabIndex:-1})]}),n.jsxs("p",{id:"warn-account-no",className:"hidden text-[10px] text-red-500 mt-1 flex items-center gap-1",children:[n.jsx("span",{className:"material-symbols-outlined text-sm",style:{fontVariationSettings:'"FILL" 1'},children:"warning"}),n.jsx("span",{id:"warn-account-no-msg",children:"กรุณากรอกตัวเลขเท่านั้น"})]})]}),n.jsxs("div",{children:[n.jsxs("label",{className:"form-label-styled",children:["ชื่อ-นามสกุล ",n.jsx("span",{className:"text-red-500",children:"*"})]}),n.jsxs("div",{className:"relative",children:[n.jsx("span",{className:"material-symbols-outlined readonly-display-icon",children:"person"}),n.jsx("input",{id:"customer-name",className:"form-input-styled readonly-display-input readonly-display-with-icon pr-4",type:"text",readOnly:!0,tabIndex:-1})]}),n.jsxs("p",{id:"warn-customer-name",className:"hidden text-[10px] text-red-500 mt-1 flex items-center gap-1",children:[n.jsx("span",{className:"material-symbols-outlined text-sm",style:{fontVariationSettings:'"FILL" 1'},children:"warning"}),n.jsx("span",{id:"warn-customer-name-msg",children:"ไม่อนุญาตให้ใช้อักขระพิเศษ"})]})]}),n.jsxs("div",{children:[n.jsx("label",{className:"form-label-styled",children:"ทุนทรัพย์ที่ฟ้อง"}),n.jsxs("div",{className:"relative",children:[n.jsx("input",{id:"filing-capital",className:"form-input-styled readonly-display-input readonly-display-with-icon text-right pr-4",type:"text",readOnly:!0,tabIndex:-1}),n.jsx("span",{className:"absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-extrabold text-indigo-300 pointer-events-none",children:"฿"})]})]}),n.jsxs("div",{children:[n.jsx("label",{className:"form-label-styled",children:"วันที่ผิดนัดชำระก่อนฟ้อง"}),n.jsxs("div",{className:"relative",children:[n.jsx("span",{className:"material-symbols-outlined readonly-display-icon",children:"event"}),n.jsx("input",{id:"default-date-display",className:"form-input-styled readonly-display-input readonly-display-with-icon pr-4",type:"text",readOnly:!0,tabIndex:-1})]})]}),n.jsxs("div",{children:[n.jsx("label",{className:"form-label-styled",children:"DPD ณ วันที่ก่อนส่งฟ้องศาล 1 วัน"}),n.jsxs("div",{className:"relative",children:[n.jsx("span",{className:"material-symbols-outlined readonly-display-icon",children:"timer"}),n.jsx("input",{id:"pre-filing-dpd-days-display",className:"form-input-styled readonly-display-input readonly-display-with-icon pr-4",type:"text",readOnly:!0,tabIndex:-1})]})]}),n.jsxs("div",{children:[n.jsx("label",{className:"form-label-styled",children:"หมายเหตุ / เงื่อนไขพิเศษ"}),n.jsxs("div",{id:"filing-note-display",className:"readonly-display-text theme-tooltip","data-tooltip":"-",tabIndex:0,children:[n.jsx("span",{className:"material-symbols-outlined readonly-display-icon",children:"notes"}),n.jsx("span",{id:"filing-note-display-text",className:"block truncate",children:"-"}),n.jsxs("div",{className:"note-tooltip-popover",role:"tooltip","aria-label":"หมายเหตุและเงื่อนไขพิเศษ",children:[n.jsxs("div",{className:"note-tooltip-head",children:[n.jsx("span",{className:"note-tooltip-icon",children:n.jsx("span",{className:"material-symbols-outlined text-[16px]",style:{fontVariationSettings:'"FILL" 1'},children:"sticky_note_2"})}),n.jsx("span",{className:"note-tooltip-title",children:"หมายเหตุ / เงื่อนไขพิเศษ"})]}),n.jsx("div",{id:"filing-note-tooltip-text",className:"note-tooltip-body",children:"-"})]})]})]})]}),n.jsxs("div",{className:"flex items-center gap-4 mt-3 pt-3 border-t border-slate-50",children:[n.jsxs("div",{className:"flex items-center gap-1.5 text-[11px] text-slate-400",children:[n.jsx("span",{className:"material-symbols-outlined text-sm text-slate-300",style:{fontVariationSettings:'"FILL" 1'},children:"add_circle"}),n.jsx("span",{children:"สร้างเมื่อ"}),n.jsx("span",{id:"ts-created-at",className:"font-semibold text-slate-500",children:"-"})]}),n.jsx("div",{className:"w-px h-3 bg-slate-200"}),n.jsxs("div",{className:"flex items-center gap-1.5 text-[11px] text-slate-400",children:[n.jsx("span",{className:"material-symbols-outlined text-sm text-slate-300",style:{fontVariationSettings:'"FILL" 1'},children:"edit"}),n.jsx("span",{children:"แก้ไขล่าสุด"}),n.jsx("span",{id:"ts-updated-at",className:"font-semibold text-slate-500",children:"-"})]})]})]})]})}),n.jsx("div",{className:"col-span-12",id:"section-enforcement-form",style:{display:"none"},children:n.jsxs("div",{className:"dashboard-card",children:[n.jsx("div",{className:"dashboard-card-header detail-card-heading",style:{background:"linear-gradient(135deg,#FFF5F5,#fff)"},children:n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsx("div",{className:"w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center text-red-600",children:n.jsx("span",{className:"material-symbols-outlined text-lg",children:"assignment"})}),n.jsxs("div",{children:[n.jsx("h3",{className:"font-bold text-sm text-slate-800",children:"บันทึกหมายบังคับคดี"}),n.jsx("p",{className:"text-[11px] text-red-400",children:"เมื่อบันทึกแล้ว สถานะจะเปลี่ยนเป็น บังคับคดี"})]})]})}),n.jsxs("div",{className:"dashboard-card-content",children:[n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4 items-start",children:[n.jsxs("div",{children:[n.jsxs("label",{className:"form-label-styled",children:["คดีหมายเลขแดงที่ ",n.jsx("span",{className:"text-red-500",children:"*"})]}),n.jsxs("div",{className:"dp-input-row relative",children:[n.jsx("input",{id:"enf-red-case-no",className:"dp-input dp-autocalc font-semibold",type:"text",defaultValue:"-",disabled:!0}),n.jsx("span",{className:"material-symbols-outlined dp-icon",children:"confirmation_number"})]})]}),n.jsxs("div",{children:[n.jsxs("label",{className:"form-label-styled",children:["วันที่ของหมายบังคับคดี"," ",n.jsx("span",{className:"text-red-500",children:"*"})]}),n.jsxs("div",{className:"dp-wrap",id:"dp-wrap-enf-judgment-date",children:[n.jsxs("div",{className:"dp-input-row relative",children:[n.jsx("input",{type:"hidden",id:"enf-judgment-date"}),n.jsx("div",{className:"dp-input",id:"dp-display-enf-judgment-date",tabIndex:0,onClick:d=>i("dpOpen('enf-judgment-date')",d),children:n.jsx("span",{id:"dp-text-enf-judgment-date",className:"text-slate-400",children:"เลือกวันที่"})}),n.jsx("span",{className:"material-symbols-outlined dp-icon",children:"calendar_today"})]}),n.jsxs("div",{className:"dp-popup",id:"dp-popup-enf-judgment-date",children:[n.jsxs("div",{className:"dp-header",children:[n.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavMonth('enf-judgment-date',-1)",d),type:"button",children:n.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_left"})}),n.jsx("span",{className:"dp-month-year",id:"dp-title-enf-judgment-date",onClick:d=>i("dpToggleMyPicker('enf-judgment-date')",d)}),n.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavMonth('enf-judgment-date',1)",d),type:"button",children:n.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_right"})})]}),n.jsxs("div",{id:"dp-my-enf-judgment-date",className:"hidden",children:[n.jsxs("div",{className:"dp-year-header",children:[n.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavYear('enf-judgment-date',-1)",d),type:"button",children:n.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_left"})}),n.jsx("span",{id:"dp-year-label-enf-judgment-date",className:"font-bold text-sm text-slate-700"}),n.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavYear('enf-judgment-date',1)",d),type:"button",children:n.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_right"})})]}),n.jsx("div",{className:"dp-my-grid",id:"dp-months-enf-judgment-date"})]}),n.jsxs("div",{id:"dp-cal-enf-judgment-date",children:[n.jsxs("div",{className:"dp-weekdays",children:[n.jsx("div",{className:"dp-weekday",children:"อา"}),n.jsx("div",{className:"dp-weekday",children:"จ"}),n.jsx("div",{className:"dp-weekday",children:"อ"}),n.jsx("div",{className:"dp-weekday",children:"พ"}),n.jsx("div",{className:"dp-weekday",children:"พฤ"}),n.jsx("div",{className:"dp-weekday",children:"ศ"}),n.jsx("div",{className:"dp-weekday",children:"ส"})]}),n.jsx("div",{className:"dp-days",id:"dp-days-enf-judgment-date"})]}),n.jsxs("div",{className:"dp-footer",children:[n.jsx("button",{className:"dp-btn-clear",onClick:d=>i("dpClear('enf-judgment-date')",d),type:"button",children:"ล้างค่า"}),n.jsx("button",{className:"dp-btn-today",onClick:d=>i("dpSelectToday('enf-judgment-date')",d),type:"button",children:"วันนี้"})]})]})]})]})]}),n.jsx("div",{className:"mt-2 flex justify-end",children:n.jsxs("button",{onClick:d=>i("submitEnforcement()",d),className:"inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-red-600 text-white rounded-xl text-xs font-bold shadow-sm hover:bg-red-700 transition-all whitespace-nowrap",children:[n.jsx("span",{className:"material-symbols-outlined text-sm",children:"assignment_turned_in"}),"บันทึกหมายบังคับคดี"]})})]})]})}),n.jsx("div",{className:"col-span-12",id:"section-enforcement-info",style:{display:"none"},children:n.jsxs("div",{className:"dashboard-card overflow-hidden",children:[n.jsx("div",{className:"detail-card-heading px-5 md:px-6 py-4 border-b border-red-100 bg-gradient-to-r from-red-50 via-white to-rose-50 rounded-t-2xl overflow-hidden",children:n.jsx("div",{className:"flex items-center justify-between gap-3 flex-wrap",children:n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsx("div",{className:"w-10 h-10 rounded-2xl bg-gradient-to-br from-red-100 to-rose-100 flex items-center justify-center text-red-600 shadow-sm flex-shrink-0",children:n.jsx("span",{className:"material-symbols-outlined text-[20px]",style:{fontVariationSettings:'"FILL" 1'},children:"assignment_turned_in"})}),n.jsxs("div",{children:[n.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[n.jsx("h2",{className:"text-[18px] font-extrabold text-slate-800 tracking-tight",children:"ข้อมูลหมายบังคับคดี"}),n.jsx("span",{className:"inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-600 border border-red-100",children:"บังคับคดี"})]}),n.jsx("p",{className:"text-[12px] text-slate-500 mt-0.5",children:"แสดงรายละเอียดหมายบังคับคดีที่บันทึกแล้ว และใช้ติดตามขั้นตอนหลังคำพิพากษา"})]})]})})}),n.jsxs("div",{className:"dashboard-card-content form-section-compact",children:[n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-3 field-grid-enhanced",children:[n.jsxs("div",{children:[n.jsxs("div",{className:"flex items-center gap-2 mb-1",children:[n.jsx("span",{className:"material-symbols-outlined text-red-400 text-base",style:{fontVariationSettings:'"FILL" 1'},children:"confirmation_number"}),n.jsx("p",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-wider",children:"คดีหมายเลขแดงที่"})]}),n.jsx("p",{id:"enf-info-red-case-no",className:"text-sm font-bold text-slate-800",children:"-"})]}),n.jsxs("div",{children:[n.jsxs("div",{className:"flex items-center gap-2 mb-1",children:[n.jsx("span",{className:"material-symbols-outlined text-red-400 text-base",style:{fontVariationSettings:'"FILL" 1'},children:"gavel"}),n.jsx("p",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-wider",children:"วันที่ของหมายบังคับคดี"})]}),n.jsx("p",{id:"enf-info-judgment-date",className:"text-sm font-bold text-slate-800",children:"-"})]}),n.jsxs("div",{children:[n.jsxs("div",{className:"flex items-center gap-2 mb-1",children:[n.jsx("span",{className:"material-symbols-outlined text-red-400 text-base",style:{fontVariationSettings:'"FILL" 1'},children:"person_check"}),n.jsx("p",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-wider",children:"วันที่บันทึกหมายบังคับคดี"})]}),n.jsx("p",{id:"enf-info-recorded",className:"text-sm font-semibold text-slate-600",children:"-"})]})]}),n.jsx("div",{id:"retro-enforcement-panel",className:"mt-4 border border-amber-100 bg-amber-50/60 rounded-2xl px-4 py-3",children:n.jsxs("div",{className:"flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3",children:[n.jsxs("div",{className:"flex items-start gap-3 min-w-0",children:[n.jsx("div",{className:"w-9 h-9 rounded-xl bg-white text-amber-600 border border-amber-100 flex items-center justify-center flex-shrink-0",children:n.jsx("span",{className:"material-symbols-outlined text-[20px]",style:{fontVariationSettings:'"FILL" 1'},children:"manage_history"})}),n.jsxs("div",{className:"min-w-0",children:[n.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[n.jsx("p",{className:"text-sm font-extrabold text-slate-800",children:"การแก้รายงานย้อนหลัง"}),n.jsx("span",{id:"retro-enforcement-status-badge",className:"inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200",children:"-"})]}),n.jsx("p",{id:"retro-enforcement-message",className:"text-[12px] text-slate-500 mt-1",children:"กำลังตรวจสอบสถานะรายงานย้อนหลัง..."}),n.jsx("p",{id:"retro-enforcement-meta",className:"text-[11px] text-slate-400 mt-1",children:"-"})]})]}),n.jsxs("button",{id:"retro-enforcement-toggle",type:"button",role:"switch","aria-checked":"false",onClick:d=>i("openRetroEnforcementConfirm()",d),className:"retro-toggle-btn w-full sm:w-[245px] border-slate-200 text-slate-500",children:[n.jsx("span",{id:"retro-enforcement-toggle-label",className:"truncate leading-none",children:"แก้รายงานแล้ว"}),n.jsx("span",{id:"retro-enforcement-toggle-knob",className:"retro-toggle-track bg-slate-200",children:n.jsx("span",{className:"retro-toggle-dot"})})]})]})})]})]})}),n.jsx("div",{className:"col-span-12 lg:col-span-6 flex flex-col",style:{overflow:"visible"},children:n.jsxs("div",{className:"dashboard-card case-entry-card judgment-card flex-1",style:{overflow:"visible"},children:[n.jsx("div",{className:"detail-card-heading case-section-heading px-5 md:px-6 py-4 border-b border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-violet-50 rounded-t-2xl overflow-hidden",children:n.jsx("div",{className:"flex items-center justify-between gap-3 flex-wrap",children:n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsx("div",{className:"w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center text-indigo-600 shadow-sm flex-shrink-0",children:n.jsx("span",{className:"material-symbols-outlined text-[20px]",style:{fontVariationSettings:"'FILL' 1"},children:"gavel"})}),n.jsxs("div",{children:[n.jsx("div",{className:"flex items-center gap-2 flex-wrap",children:n.jsx("h2",{className:"text-[18px] font-extrabold text-slate-800 tracking-tight",children:"รายละเอียดคำพิพากษา"})}),n.jsx("p",{className:"text-[12px] text-slate-500 mt-0.5",children:"กรอกข้อมูลคำพิพากษา และรายละเอียดเพื่อใช้คำนวณตารางผ่อนชำระ"})]})]})})}),n.jsxs("div",{className:"dashboard-card-content form-section-compact",children:[n.jsxs("div",{id:"judgment-type-row",className:"hidden mb-3 p-3 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl shadow-sm",children:[n.jsxs("label",{className:"form-label-styled text-indigo-600",children:["ประเภทคำพิพากษา ",n.jsx("span",{className:"text-red-500",children:"*"})]}),n.jsxs("div",{className:"relative",id:"jt-dropdown-wrap",children:[n.jsx("input",{type:"hidden",id:"judgment-type",defaultValue:""}),n.jsxs("button",{type:"button",id:"jt-trigger",onClick:d=>i("jtToggle()",d),className:"w-full flex items-center justify-between bg-white border border-indigo-200 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all hover:border-indigo-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-sm",children:[n.jsx("span",{id:"jt-display",className:"text-slate-400",children:"เลือกประเภทเพื่อเปลี่ยนสถานะ"}),n.jsx("span",{className:"material-symbols-outlined text-indigo-300 text-lg transition-transform duration-200",id:"jt-chevron",children:"expand_more"})]}),n.jsxs("div",{id:"jt-panel",className:"hidden absolute left-0 right-0 mt-1.5 bg-white border border-indigo-100 rounded-xl shadow-lg shadow-indigo-100/50 z-50 overflow-hidden",children:[n.jsxs("button",{type:"button",onClick:d=>i("jtSelect('พิพากษาตามยอม')",d),className:"w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-indigo-50 transition-all group border-b border-slate-50",children:[n.jsx("div",{className:"w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-all",children:n.jsx("span",{className:"material-symbols-outlined text-green-600 text-base",style:{fontVariationSettings:'"FILL" 1'},children:"handshake"})}),n.jsxs("div",{className:"flex-1",children:[n.jsx("p",{className:"text-sm font-semibold text-slate-800",children:"พิพากษาตามยอม"}),n.jsx("p",{className:"text-[11px] text-slate-400",children:"ลูกหนี้ยินยอมตามคำพิพากษา"})]}),n.jsx("span",{id:"jt-check-พิพากษาตามยอม",className:"hidden material-symbols-outlined text-indigo-600 text-lg",style:{fontVariationSettings:'"FILL" 1'},children:"check_circle"})]}),n.jsxs("button",{type:"button",onClick:d=>i("jtSelect('พิพากษาฝ่ายเดียว')",d),className:"w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-indigo-50 transition-all group",children:[n.jsx("div",{className:"w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-200 transition-all",children:n.jsx("span",{className:"material-symbols-outlined text-orange-600 text-base",style:{fontVariationSettings:'"FILL" 1'},children:"gavel"})}),n.jsxs("div",{className:"flex-1",children:[n.jsx("p",{className:"text-sm font-semibold text-slate-800",children:"พิพากษาฝ่ายเดียว"}),n.jsx("p",{className:"text-[11px] text-slate-400",children:"ศาลตัดสินโดยลูกหนี้ไม่มาศาล"})]}),n.jsx("span",{id:"jt-check-พิพากษาฝ่ายเดียว",className:"hidden material-symbols-outlined text-indigo-600 text-lg",style:{fontVariationSettings:'"FILL" 1'},children:"check_circle"})]})]})]}),n.jsx("p",{className:"text-[11px] text-indigo-400 mt-1.5",children:"เมื่อบันทึก จะเปลี่ยนสถานะจาก ยื่นฟ้อง → ประเภทที่เลือก"}),n.jsx("p",{id:"warn-judgment-type",className:"hidden mt-2 text-[11px] leading-relaxed text-red-500 font-medium",children:"กรุณาเลือกประเภทคำพิพากษาก่อนบันทึก"})]}),n.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 field-grid-enhanced",children:[n.jsxs("div",{children:[n.jsxs("label",{className:"form-label-styled",children:["วันที่ยื่นฟ้อง ",n.jsx("span",{className:"text-red-500",children:"*"})]}),n.jsxs("div",{className:"dp-wrap",id:"dp-wrap-filing-date",children:[n.jsxs("div",{className:"dp-input-row relative",children:[n.jsx("input",{type:"hidden",id:"filing-date"}),n.jsx("div",{className:"dp-input",id:"dp-display-filing-date",tabIndex:0,onClick:d=>i("dpOpen('filing-date')",d),onKeyDown:d=>i("if(event.key==='Enter'||event.key===' ')dpOpen('filing-date')",d),children:n.jsx("span",{id:"dp-text-filing-date",className:"text-slate-400",children:"เลือกวันที่ยื่นฟ้อง"})}),n.jsx("span",{className:"material-symbols-outlined dp-icon",children:"calendar_today"})]}),n.jsxs("div",{className:"dp-popup",id:"dp-popup-filing-date",children:[n.jsxs("div",{className:"dp-header",children:[n.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavMonth('filing-date',-1)",d),type:"button",children:n.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_left"})}),n.jsx("span",{className:"dp-month-year",id:"dp-title-filing-date",onClick:d=>i("dpToggleMyPicker('filing-date')",d)}),n.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavMonth('filing-date',1)",d),type:"button",children:n.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_right"})})]}),n.jsxs("div",{id:"dp-my-filing-date",className:"hidden",children:[n.jsxs("div",{className:"dp-year-header",children:[n.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavYear('filing-date',-1)",d),type:"button",children:n.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_left"})}),n.jsx("span",{id:"dp-year-label-filing-date",className:"font-bold text-sm text-slate-700"}),n.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavYear('filing-date',1)",d),type:"button",children:n.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_right"})})]}),n.jsx("div",{className:"dp-my-grid",id:"dp-months-filing-date"})]}),n.jsxs("div",{id:"dp-cal-filing-date",children:[n.jsxs("div",{className:"dp-weekdays",children:[n.jsx("div",{className:"dp-weekday",children:"อา"}),n.jsx("div",{className:"dp-weekday",children:"จ"}),n.jsx("div",{className:"dp-weekday",children:"อ"}),n.jsx("div",{className:"dp-weekday",children:"พ"}),n.jsx("div",{className:"dp-weekday",children:"พฤ"}),n.jsx("div",{className:"dp-weekday",children:"ศ"}),n.jsx("div",{className:"dp-weekday",children:"ส"})]}),n.jsx("div",{className:"dp-days",id:"dp-days-filing-date"})]}),n.jsxs("div",{className:"dp-footer",children:[n.jsx("button",{className:"dp-btn-clear",onClick:d=>i("dpClear('filing-date')",d),type:"button",children:"ล้างค่า"}),n.jsx("button",{className:"dp-btn-today",onClick:d=>i("dpSelectToday('filing-date')",d),type:"button",children:"วันนี้"})]})]})]})]}),n.jsxs("div",{children:[n.jsxs("label",{className:"form-label-styled",children:["วันที่พิพากษา ",n.jsx("span",{className:"text-red-500",children:"*"})]}),n.jsxs("div",{className:"dp-wrap",id:"dp-wrap-judgment-date",children:[n.jsxs("div",{className:"dp-input-row relative",children:[n.jsx("input",{type:"hidden",id:"judgment-date"}),n.jsx("div",{className:"dp-input",id:"dp-display-judgment-date",tabIndex:0,onClick:d=>i("dpOpen('judgment-date')",d),onKeyDown:d=>i("if(event.key==='Enter'||event.key===' ')dpOpen('judgment-date')",d),children:n.jsx("span",{id:"dp-text-judgment-date",className:"text-slate-400",children:"เลือกวันที่พิพากษา"})}),n.jsx("span",{className:"material-symbols-outlined dp-icon",children:"calendar_today"})]}),n.jsxs("div",{className:"dp-popup",id:"dp-popup-judgment-date",children:[n.jsxs("div",{className:"dp-header",children:[n.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavMonth('judgment-date',-1)",d),type:"button",children:n.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_left"})}),n.jsx("span",{className:"dp-month-year",id:"dp-title-judgment-date",onClick:d=>i("dpToggleMyPicker('judgment-date')",d)}),n.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavMonth('judgment-date',1)",d),type:"button",children:n.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_right"})})]}),n.jsxs("div",{id:"dp-my-judgment-date",className:"hidden",children:[n.jsxs("div",{className:"dp-year-header",children:[n.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavYear('judgment-date',-1)",d),type:"button",children:n.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_left"})}),n.jsx("span",{id:"dp-year-label-judgment-date",className:"font-bold text-sm text-slate-700"}),n.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavYear('judgment-date',1)",d),type:"button",children:n.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_right"})})]}),n.jsx("div",{className:"dp-my-grid",id:"dp-months-judgment-date"})]}),n.jsxs("div",{id:"dp-cal-judgment-date",children:[n.jsxs("div",{className:"dp-weekdays",children:[n.jsx("div",{className:"dp-weekday",children:"อา"}),n.jsx("div",{className:"dp-weekday",children:"จ"}),n.jsx("div",{className:"dp-weekday",children:"อ"}),n.jsx("div",{className:"dp-weekday",children:"พ"}),n.jsx("div",{className:"dp-weekday",children:"พฤ"}),n.jsx("div",{className:"dp-weekday",children:"ศ"}),n.jsx("div",{className:"dp-weekday",children:"ส"})]}),n.jsx("div",{className:"dp-days",id:"dp-days-judgment-date"})]}),n.jsxs("div",{className:"dp-footer",children:[n.jsx("button",{className:"dp-btn-clear",onClick:d=>i("dpClear('judgment-date')",d),type:"button",children:"ล้างค่า"}),n.jsx("button",{className:"dp-btn-today",onClick:d=>i("dpSelectToday('judgment-date')",d),type:"button",children:"วันนี้"})]})]})]})]}),n.jsxs("div",{children:[n.jsxs("label",{className:"form-label-styled",children:["คดีหมายเลขแดงที่ ",n.jsx("span",{className:"text-red-500",children:"*"})]}),n.jsx("input",{id:"red-case-no",className:"form-input-styled font-medium",type:"text",placeholder:"กรอกคดีหมายเลขแดงที่",autoComplete:"off"}),n.jsxs("p",{id:"warn-red-case-no",className:"hidden text-[10px] text-red-500 mt-1 flex items-center gap-1",children:[n.jsx("span",{className:"material-symbols-outlined text-sm",style:{fontVariationSettings:'"FILL" 1'},children:"warning"}),n.jsx("span",{children:"รูปแบบ: ตัวย่อประเภทคดีติดเลขที่/ปี พ.ศ. เช่น ผบ1234/2567"})]})]}),n.jsxs("div",{children:[n.jsxs("label",{className:"form-label-styled text-blue-600",children:["ยอดหนี้ตามคำพิพากษา"," ",n.jsx("span",{className:"text-red-500",children:"*"})]}),n.jsxs("div",{className:"relative",children:[n.jsx("input",{id:"total-debt",className:"form-input-styled font-medium text-right pr-4 pl-10",placeholder:"0.00",type:"text",inputMode:"decimal",autoComplete:"off"}),n.jsx("span",{className:"absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400",children:"฿"})]}),n.jsxs("p",{id:"warn-total-debt",className:"hidden text-[10px] text-red-500 mt-1 flex items-center gap-1",children:[n.jsx("span",{className:"material-symbols-outlined text-sm",style:{fontVariationSettings:'"FILL" 1'},children:"warning"}),n.jsx("span",{children:"กรุณากรอกตัวเลขเท่านั้น"})]})]}),n.jsxs("div",{children:[n.jsxs("label",{className:"form-label-styled",children:["เงินต้นตามคำพิพากษา"," ",n.jsx("span",{className:"text-red-500",children:"*"})]}),n.jsxs("div",{className:"relative",children:[n.jsx("input",{id:"principal",className:"form-input-styled font-medium text-right pr-4 pl-10",placeholder:"0.00",type:"text",inputMode:"decimal",autoComplete:"off"}),n.jsx("span",{className:"absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400",children:"฿"})]}),n.jsxs("p",{id:"warn-principal",className:"hidden text-[10px] text-red-500 mt-1 flex items-center gap-1",children:[n.jsx("span",{className:"material-symbols-outlined text-sm",style:{fontVariationSettings:'"FILL" 1'},children:"warning"}),n.jsx("span",{children:"กรุณากรอกตัวเลขเท่านั้น"})]})]}),n.jsxs("div",{children:[n.jsxs("label",{className:"form-label-styled",children:["อัตราดอกเบี้ย/ปี ",n.jsx("span",{className:"text-red-500",children:"*"})]}),n.jsx("input",{id:"interest-rate",className:"form-input-styled font-medium text-right",placeholder:"0",type:"text",inputMode:"decimal",autoComplete:"off"}),n.jsxs("p",{id:"warn-interest-rate",className:"hidden text-[10px] text-red-500 mt-1 flex items-center gap-1",children:[n.jsx("span",{className:"material-symbols-outlined text-sm",style:{fontVariationSettings:'"FILL" 1'},children:"warning"}),n.jsx("span",{children:"กรุณากรอกตัวเลขเท่านั้น"})]})]}),n.jsxs("div",{children:[n.jsx("label",{className:"form-label-styled",children:"ค่าธรรมเนียมศาล"}),n.jsxs("div",{className:"relative",children:[n.jsx("input",{id:"court-fee",className:"form-input-styled font-medium text-right pr-4 pl-10",placeholder:"0.00",type:"text",inputMode:"decimal",autoComplete:"off"}),n.jsx("span",{className:"absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400",children:"฿"})]}),n.jsxs("p",{id:"warn-court-fee",className:"hidden text-[10px] text-red-500 mt-1 flex items-center gap-1",children:[n.jsx("span",{className:"material-symbols-outlined text-sm",style:{fontVariationSettings:'"FILL" 1'},children:"warning"}),n.jsx("span",{children:"กรุณากรอกตัวเลขเท่านั้น"})]})]}),n.jsxs("div",{children:[n.jsx("label",{className:"form-label-styled",children:"ค่าทนายความ"}),n.jsxs("div",{className:"relative",children:[n.jsx("input",{id:"lawyer-fee",className:"form-input-styled font-medium text-right pr-4 pl-10",placeholder:"0.00",type:"text",inputMode:"decimal",autoComplete:"off"}),n.jsx("span",{className:"absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400",children:"฿"})]}),n.jsxs("p",{id:"warn-lawyer-fee",className:"hidden text-[10px] text-red-500 mt-1 flex items-center gap-1",children:[n.jsx("span",{className:"material-symbols-outlined text-sm",style:{fontVariationSettings:'"FILL" 1'},children:"warning"}),n.jsx("span",{children:"กรุณากรอกตัวเลขเท่านั้น"})]})]}),n.jsxs("div",{children:[n.jsxs("label",{className:"form-label-styled",children:["จำนวนงวดผ่อน ",n.jsx("span",{className:"text-red-500",children:"*"})]}),n.jsx("input",{id:"installment-count",className:"form-input-styled font-medium",placeholder:"0",type:"text",inputMode:"numeric",autoComplete:"off"}),n.jsxs("p",{id:"warn-installment-count",className:"hidden text-[10px] text-red-500 mt-1 flex items-center gap-1",children:[n.jsx("span",{className:"material-symbols-outlined text-sm",style:{fontVariationSettings:'"FILL" 1'},children:"warning"}),n.jsx("span",{children:"กรุณากรอกตัวเลขจำนวนเต็มเท่านั้น"})]})]}),n.jsxs("div",{children:[n.jsxs("label",{className:"form-label-styled flex items-center gap-2",children:["ยอดหนี้ส่วนต่าง",n.jsx("span",{className:"auto-badge-soft",children:"AUTO"})]}),n.jsxs("div",{className:"relative",children:[n.jsx("input",{id:"diff-debt",className:"form-input-styled autocalc-input font-medium text-right pr-4 pl-10",placeholder:"0.00",type:"text",readOnly:!0,tabIndex:-1,onFocus:d=>i("this.blur()",d)}),n.jsx("span",{className:"absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400",children:"฿"})]})]}),n.jsxs("div",{className:"sm:col-span-2",children:[n.jsx("label",{className:"form-label-styled",children:"หมายเหตุ / เงื่อนไขพิเศษเพิ่มเติม"}),n.jsx("textarea",{id:"judgment-note",className:"form-input-styled min-h-[92px] resize-none",maxLength:100,placeholder:"กรอกหมายเหตุเพิ่มเติม (ถ้ามี)"}),n.jsxs("p",{className:"text-[10px] text-slate-400 mt-1",children:[n.jsx("span",{id:"judgment-note-counter",children:"0"}),"/100 ตัวอักษร"," "]})]}),n.jsx("div",{id:"retro-judgment-panel",className:"sm:col-span-2 border border-amber-100 bg-amber-50/60 rounded-2xl px-4 py-3",children:n.jsxs("div",{className:"flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3",children:[n.jsxs("div",{className:"flex items-start gap-3 min-w-0",children:[n.jsx("div",{className:"w-9 h-9 rounded-xl bg-white text-amber-600 border border-amber-100 flex items-center justify-center flex-shrink-0",children:n.jsx("span",{className:"material-symbols-outlined text-[20px]",style:{fontVariationSettings:'"FILL" 1'},children:"gavel"})}),n.jsxs("div",{className:"min-w-0",children:[n.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[n.jsx("p",{className:"text-sm font-extrabold text-slate-800",children:"คำพิพากษาข้ามเดือน"}),n.jsx("span",{id:"retro-judgment-status-badge",className:"inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200",children:"-"})]}),n.jsx("p",{id:"retro-judgment-message",className:"text-[12px] text-slate-500 mt-1",children:"กำลังตรวจสอบสถานะรายงานย้อนหลัง..."}),n.jsx("p",{id:"retro-judgment-meta",className:"text-[11px] text-slate-400 mt-1",children:"-"})]})]}),n.jsx("button",{id:"retro-judgment-confirm-btn",type:"button",onClick:d=>i("confirmRetroJudgmentFix()",d),className:"w-full sm:w-[245px] px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-500 text-xs font-bold transition-all",children:"ยืนยันว่าแก้รายงานย้อนหลังแล้ว"})]})})]})]})]})}),n.jsx("div",{className:"col-span-12 lg:col-span-6 flex flex-col",style:{overflow:"visible"},children:n.jsxs("div",{className:"dashboard-card case-entry-card payment-card flex-1",style:{overflow:"visible"},children:[n.jsx("div",{className:"detail-card-heading case-section-heading px-5 md:px-6 py-4 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-teal-50 rounded-t-2xl overflow-hidden",children:n.jsx("div",{className:"flex items-center justify-between gap-3 flex-wrap",children:n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsx("div",{className:"w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-emerald-600 shadow-sm flex-shrink-0",children:n.jsx("span",{className:"material-symbols-outlined text-[20px]",style:{fontVariationSettings:"'FILL' 1"},children:"payments"})}),n.jsxs("div",{children:[n.jsx("div",{className:"flex items-center gap-2 flex-wrap",children:n.jsx("h2",{className:"text-[18px] font-extrabold text-slate-800 tracking-tight",children:"รายละเอียดการชำระเงินตามคำพิพากษา"})}),n.jsx("p",{className:"text-[12px] text-slate-500 mt-0.5",children:"กำหนดงวดชำระ ค่างวด และดอกเบี้ยเพื่อใช้คำนวณตารางผ่อนชำระ"})]})]})})}),n.jsx("div",{className:"dashboard-card-content form-section-compact",children:n.jsxs("div",{className:"space-y-3",children:[n.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 field-grid-enhanced",children:[n.jsxs("div",{children:[n.jsxs("label",{className:"form-label-styled",children:["วันครบกำหนดงวดแรก"," ",n.jsx("span",{className:"text-red-500",children:"*"})]}),n.jsxs("div",{className:"dp-wrap",id:"dp-wrap-first-due-date",children:[n.jsxs("div",{className:"dp-input-row relative",children:[n.jsx("input",{type:"hidden",id:"first-due-date"}),n.jsx("div",{className:"dp-input",id:"dp-display-first-due-date",tabIndex:0,onClick:d=>i("dpOpen('first-due-date')",d),onKeyDown:d=>i("if(event.key==='Enter'||event.key===' ')dpOpen('first-due-date')",d),children:n.jsx("span",{id:"dp-text-first-due-date",className:"text-slate-400",children:"เลือกวันครบกำหนดงวดแรก"})}),n.jsx("span",{className:"material-symbols-outlined dp-icon",children:"calendar_today"})]}),n.jsxs("div",{className:"dp-popup",id:"dp-popup-first-due-date",children:[n.jsxs("div",{className:"dp-header",children:[n.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavMonth('first-due-date',-1)",d),type:"button",children:n.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_left"})}),n.jsx("span",{className:"dp-month-year",id:"dp-title-first-due-date",onClick:d=>i("dpToggleMyPicker('first-due-date')",d)}),n.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavMonth('first-due-date',1)",d),type:"button",children:n.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_right"})})]}),n.jsxs("div",{id:"dp-my-first-due-date",className:"hidden",children:[n.jsxs("div",{className:"dp-year-header",children:[n.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavYear('first-due-date',-1)",d),type:"button",children:n.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_left"})}),n.jsx("span",{id:"dp-year-label-first-due-date",className:"font-bold text-sm text-slate-700"}),n.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavYear('first-due-date',1)",d),type:"button",children:n.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_right"})})]}),n.jsx("div",{className:"dp-my-grid",id:"dp-months-first-due-date"})]}),n.jsxs("div",{id:"dp-cal-first-due-date",children:[n.jsxs("div",{className:"dp-weekdays",children:[n.jsx("div",{className:"dp-weekday",children:"อา"}),n.jsx("div",{className:"dp-weekday",children:"จ"}),n.jsx("div",{className:"dp-weekday",children:"อ"}),n.jsx("div",{className:"dp-weekday",children:"พ"}),n.jsx("div",{className:"dp-weekday",children:"พฤ"}),n.jsx("div",{className:"dp-weekday",children:"ศ"}),n.jsx("div",{className:"dp-weekday",children:"ส"})]}),n.jsx("div",{className:"dp-days",id:"dp-days-first-due-date"})]}),n.jsxs("div",{className:"dp-footer",children:[n.jsx("button",{className:"dp-btn-clear",onClick:d=>i("dpClear('first-due-date')",d),type:"button",children:"ล้างค่า"}),n.jsx("button",{className:"dp-btn-today",onClick:d=>i("dpSelectToday('first-due-date')",d),type:"button",children:"วันนี้"})]})]})]})]}),n.jsxs("div",{children:[n.jsxs("label",{className:"form-label-styled flex items-center gap-2",children:["วันครบกำหนดงวดสุดท้าย",n.jsx("span",{className:"auto-badge-soft",children:"AUTO"})]}),n.jsxs("div",{className:"dp-wrap",id:"dp-wrap-last-due-date",children:[n.jsxs("div",{className:"dp-input-row relative",children:[n.jsx("input",{type:"hidden",id:"last-due-date"}),n.jsx("div",{className:"dp-input dp-readonly dp-autocalc",id:"dp-display-last-due-date",tabIndex:-1,children:n.jsx("span",{id:"dp-text-last-due-date",children:"คำนวณอัตโนมัติ"})}),n.jsx("span",{className:"material-symbols-outlined dp-icon",children:"calendar_today"})]}),n.jsxs("div",{className:"dp-popup",id:"dp-popup-last-due-date",children:[n.jsxs("div",{className:"dp-header",children:[n.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavMonth('last-due-date',-1)",d),type:"button",children:n.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_left"})}),n.jsx("span",{className:"dp-month-year",id:"dp-title-last-due-date",onClick:d=>i("dpToggleMyPicker('last-due-date')",d)}),n.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavMonth('last-due-date',1)",d),type:"button",children:n.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_right"})})]}),n.jsxs("div",{id:"dp-my-last-due-date",className:"hidden",children:[n.jsxs("div",{className:"dp-year-header",children:[n.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavYear('last-due-date',-1)",d),type:"button",children:n.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_left"})}),n.jsx("span",{id:"dp-year-label-last-due-date",className:"font-bold text-sm text-slate-700"}),n.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavYear('last-due-date',1)",d),type:"button",children:n.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_right"})})]}),n.jsx("div",{className:"dp-my-grid",id:"dp-months-last-due-date"})]}),n.jsxs("div",{id:"dp-cal-last-due-date",children:[n.jsxs("div",{className:"dp-weekdays",children:[n.jsx("div",{className:"dp-weekday",children:"อา"}),n.jsx("div",{className:"dp-weekday",children:"จ"}),n.jsx("div",{className:"dp-weekday",children:"อ"}),n.jsx("div",{className:"dp-weekday",children:"พ"}),n.jsx("div",{className:"dp-weekday",children:"พฤ"}),n.jsx("div",{className:"dp-weekday",children:"ศ"}),n.jsx("div",{className:"dp-weekday",children:"ส"})]}),n.jsx("div",{className:"dp-days",id:"dp-days-last-due-date"})]}),n.jsxs("div",{className:"dp-footer",children:[n.jsx("button",{className:"dp-btn-clear",onClick:d=>i("dpClear('last-due-date')",d),type:"button",children:"ล้างค่า"}),n.jsx("button",{className:"dp-btn-today",onClick:d=>i("dpSelectToday('last-due-date')",d),type:"button",children:"วันนี้"})]})]})]})]})]}),n.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 field-grid-enhanced",children:[n.jsxs("div",{children:[n.jsxs("label",{className:"form-label-styled",children:["ค่างวด งวดที่ 1"," ",n.jsx("span",{className:"text-red-500",children:"*"})]}),n.jsxs("div",{className:"relative",children:[n.jsx("input",{id:"installment-1",className:"form-input-styled font-medium text-right pr-4 pl-10",placeholder:"0.00",type:"text",inputMode:"decimal",autoComplete:"off"}),n.jsx("span",{className:"absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400",children:"฿"})]}),n.jsxs("p",{id:"warn-installment-1",className:"hidden text-[10px] text-red-500 mt-1 flex items-center gap-1",children:[n.jsx("span",{className:"material-symbols-outlined text-sm",style:{fontVariationSettings:'"FILL" 1'},children:"warning"}),n.jsx("span",{children:"กรุณากรอกตัวเลขเท่านั้น"})]})]}),n.jsxs("div",{children:[n.jsx("label",{className:"form-label-styled",children:"ค่างวด งวดที่ 2"}),n.jsxs("div",{className:"relative",children:[n.jsx("input",{id:"installment-2",className:"form-input-styled font-medium text-right pr-4 pl-10",placeholder:"0.00",type:"text",inputMode:"decimal",autoComplete:"off"}),n.jsx("span",{className:"absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400",children:"฿"})]}),n.jsxs("p",{id:"warn-installment-2",className:"hidden text-[10px] text-red-500 mt-1 flex items-center gap-1",children:[n.jsx("span",{className:"material-symbols-outlined text-sm",style:{fontVariationSettings:'"FILL" 1'},children:"warning"}),n.jsx("span",{children:"กรุณากรอกตัวเลขเท่านั้น"})]})]}),n.jsxs("div",{children:[n.jsx("label",{className:"form-label-styled",children:"ค่างวด งวดที่ 3"}),n.jsxs("div",{className:"relative",children:[n.jsx("input",{id:"installment-3",className:"form-input-styled font-medium text-right pr-4 pl-10",placeholder:"0.00",type:"text",inputMode:"decimal",autoComplete:"off"}),n.jsx("span",{className:"absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400",children:"฿"})]}),n.jsxs("p",{id:"warn-installment-3",className:"hidden text-[10px] text-red-500 mt-1 flex items-center gap-1",children:[n.jsx("span",{className:"material-symbols-outlined text-sm",style:{fontVariationSettings:'"FILL" 1'},children:"warning"}),n.jsx("span",{children:"กรุณากรอกตัวเลขเท่านั้น"})]})]}),n.jsxs("div",{children:[n.jsx("label",{className:"form-label-styled",children:"ค่างวด งวดที่ 4"}),n.jsxs("div",{className:"relative",children:[n.jsx("input",{id:"installment-4",className:"form-input-styled font-medium text-right pr-4 pl-10",placeholder:"0.00",type:"text",inputMode:"decimal",autoComplete:"off"}),n.jsx("span",{className:"absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400",children:"฿"})]}),n.jsxs("p",{id:"warn-installment-4",className:"hidden text-[10px] text-red-500 mt-1 flex items-center gap-1",children:[n.jsx("span",{className:"material-symbols-outlined text-sm",style:{fontVariationSettings:'"FILL" 1'},children:"warning"}),n.jsx("span",{children:"กรุณากรอกตัวเลขเท่านั้น"})]})]})]}),n.jsxs("div",{children:[n.jsx("label",{className:"form-label-styled",children:"ดอกเบี้ยเมื่อผิดนัดชำระ (%)"}),n.jsx("input",{id:"default-interest-rate",className:"form-input-styled font-medium text-right",placeholder:"0",type:"text",inputMode:"decimal",autoComplete:"off"}),n.jsxs("p",{id:"warn-default-interest-rate",className:"hidden text-[10px] text-red-500 mt-1 flex items-center gap-1",children:[n.jsx("span",{className:"material-symbols-outlined text-sm",style:{fontVariationSettings:'"FILL" 1'},children:"warning"}),n.jsx("span",{children:"กรุณากรอกตัวเลขเท่านั้น"})]})]}),n.jsx("div",{className:"helper-panel",children:n.jsxs("div",{className:"flex items-start gap-2",children:[n.jsx("span",{className:"material-symbols-outlined text-blue-400 text-base mt-0.5",children:"info"}),n.jsx("p",{children:"ระบบจะใช้ข้อมูลทั้งหมดที่กรอก เพื่อคำนวณตารางผ่อนชำระในส่วนพรีวิว หากมีการแก้ไขข้อมูล ต้องกดพรีวิวใหม่ก่อนบันทึก"})]})})]})})]})}),n.jsx("div",{className:"col-span-12",id:"edit-history-section",children:n.jsxs("div",{className:"dashboard-card",children:[n.jsx("div",{className:"detail-card-heading px-5 md:px-6 py-4 border-b border-amber-100 bg-gradient-to-r from-amber-50 via-white to-orange-50 rounded-t-2xl overflow-hidden",children:n.jsx("div",{className:"flex items-center justify-between gap-3 flex-wrap",children:n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsx("div",{className:"w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-amber-600 shadow-sm flex-shrink-0",children:n.jsx("span",{className:"material-symbols-outlined text-[20px]",style:{fontVariationSettings:'"FILL" 1'},children:"history"})}),n.jsxs("div",{children:[n.jsx("div",{className:"flex items-center gap-2 flex-wrap",children:n.jsx("h2",{className:"text-[18px] font-extrabold text-slate-800 tracking-tight",children:"ประวัติการแก้ไข"})}),n.jsx("p",{className:"text-[12px] text-slate-500 mt-0.5",children:"บันทึกการเปลี่ยนแปลงข้อมูลล่าสุดเพื่อใช้ตรวจสอบย้อนหลัง"})]})]})})}),n.jsx("div",{id:"edit-history-body",className:"px-6 py-4 text-sm text-slate-400 text-center",children:"กำลังโหลด..."})]})}),n.jsx("div",{className:"col-span-12",children:n.jsxs("div",{className:"dashboard-card",children:[n.jsx("div",{className:"detail-card-heading px-5 md:px-6 py-4 border-b border-blue-100 bg-gradient-to-r from-blue-50 via-white to-indigo-50 rounded-t-2xl overflow-hidden",children:n.jsxs("div",{className:"flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4",children:[n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsx("div",{className:"w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 shadow-sm flex-shrink-0",children:n.jsx("span",{className:"material-symbols-outlined text-[20px]",style:{fontVariationSettings:'"FILL" 1'},children:"calendar_today"})}),n.jsxs("div",{children:[n.jsx("div",{className:"flex items-center gap-2 flex-wrap",children:n.jsx("h2",{className:"text-[18px] font-extrabold text-slate-800 tracking-tight",children:"ตัวอย่างตารางผ่อนชำระ"})}),n.jsx("p",{className:"text-[12px] text-slate-500 mt-0.5",children:"ใช้ตรวจสอบตารางผ่อนชำระ"})]})]}),n.jsxs("div",{className:"flex flex-wrap items-center gap-3",children:[n.jsxs("div",{className:"flex items-center bg-white/80 p-1 rounded-xl border border-blue-100 shadow-sm",children:[n.jsx("button",{id:"view-monthly-btn",onClick:d=>i("switchView('monthly')",d),className:"px-3 py-1 rounded-lg text-[12px] font-bold transition-all bg-white text-primary shadow-sm",children:"แสดงรายเดือน"}),n.jsx("button",{id:"view-daily-btn",onClick:d=>i("switchView('daily')",d),className:"px-3 py-1 rounded-lg text-[12px] font-bold transition-all text-slate-500 hover:text-slate-700",children:"แสดงทุกวันที่"})]}),n.jsxs("div",{id:"preview-stale-warn",className:"hidden flex items-center gap-1 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-600 font-bold",children:[n.jsx("span",{className:"material-symbols-outlined text-sm",children:"refresh"}),"กรุณากดพรีวิวใหม่"]})]})]})}),n.jsxs("div",{className:"overflow-hidden flex flex-col",children:[n.jsx("div",{id:"schedule-placeholder",className:"p-8 text-center text-slate-400 text-sm",children:'กรอกข้อมูลให้ครบแล้วกด "พรีวิว" เพื่อดูตารางผ่อนชำระ'}),n.jsxs("div",{id:"schedule-loading",className:"hidden p-8 text-center text-slate-400 text-sm",children:[n.jsxs("svg",{className:"animate-spin w-6 h-6 mx-auto mb-2 text-primary",fill:"none",viewBox:"0 0 24 24",children:[n.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor","stroke-width":"4"}),n.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8v8z"})]}),"กำลังคำนวณ..."]}),n.jsx("div",{id:"schedule-table-wrap",className:"hidden overflow-x-auto",style:{maxHeight:"480px",overflowY:"auto"},children:n.jsxs("table",{className:"w-full text-left border-collapse min-w-[1100px]",children:[n.jsx("thead",{className:"sticky top-0 z-10",children:n.jsxs("tr",{className:"bg-slate-50 border-b border-slate-100",children:[n.jsx("th",{className:"py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest",children:"วันที่"}),n.jsx("th",{className:"py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center",children:"งวดที่"}),n.jsx("th",{className:"py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right",children:"เงินต้นยกมา"}),n.jsx("th",{className:"py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right",children:"จ่ายค่างวด"}),n.jsx("th",{className:"py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right",children:"ตัดดอกเบี้ย"}),n.jsx("th",{className:"py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right",children:"ตัดเงินต้น"}),n.jsx("th",{className:"py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right",children:"ชำระอื่น"}),n.jsx("th",{className:"py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right",children:"เงินต้นคงเหลือ"}),n.jsx("th",{className:"py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right",children:"ดอกเบี้ยรายวัน"}),n.jsx("th",{className:"py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right",children:"ดอกเบี้ยสะสม"})]})}),n.jsx("tbody",{id:"schedule-tbody",className:"divide-y divide-slate-50 text-[12px]"})]})}),n.jsxs("div",{id:"schedule-info",className:"hidden px-6 py-3 border-t border-slate-50 bg-slate-50/30 flex items-center justify-between gap-4",children:[n.jsx("span",{id:"schedule-info-text",className:"text-[11px] text-slate-500"}),n.jsx("div",{id:"schedule-pagination",className:"flex items-center gap-1"})]})]})]})})]})}),n.jsx("div",{id:"status-logs-body",className:"hidden"})]}),n.jsxs("div",{id:"toast-modal",className:"hidden fixed inset-0 z-[300] flex items-center justify-center p-4",children:[n.jsx("div",{className:"absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]",onClick:d=>i("document.getElementById('toast-modal').classList.add('hidden')",d)}),n.jsxs("div",{className:"relative bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden",children:[n.jsxs("div",{className:"p-6 flex flex-col items-center text-center",children:[n.jsx("div",{id:"toast-icon-wrap",className:"w-14 h-14 rounded-full flex items-center justify-center mb-4",children:n.jsx("span",{id:"toast-icon",className:"material-symbols-outlined text-3xl"})}),n.jsx("h3",{id:"toast-title",className:"text-base font-bold text-slate-800 mb-1"}),n.jsx("p",{id:"toast-message",className:"text-sm text-slate-500 leading-relaxed"})]}),n.jsx("div",{className:"px-6 pb-5",children:n.jsx("button",{onClick:d=>i("document.getElementById('toast-modal').classList.add('hidden')",d),className:"w-full py-2.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all text-sm",children:"ตกลง"})})]})]}),n.jsxs("div",{id:"confirm-modal",className:"hidden fixed inset-0 z-[300] flex items-center justify-center px-6 py-8",children:[n.jsx("div",{className:"absolute inset-0 confirm-review-backdrop"}),n.jsxs("div",{className:"confirm-review-panel relative w-full max-w-5xl max-h-[88vh] rounded-[24px] overflow-hidden flex flex-col",children:[n.jsxs("div",{className:"px-6 py-5 border-b border-slate-200/80 flex items-center justify-between gap-4 bg-white/72",children:[n.jsxs("div",{className:"flex items-center gap-4",children:[n.jsx("div",{className:"confirm-review-icon",children:n.jsx("span",{className:"material-symbols-outlined text-[24px]",style:{fontVariationSettings:'"FILL" 1'},children:"fact_check"})}),n.jsxs("div",{children:[n.jsx("h3",{className:"text-xl font-extrabold text-slate-900 tracking-tight",children:"ตรวจสอบข้อมูลก่อนบันทึก"}),n.jsx("p",{className:"mt-0.5 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400",children:"Review & Confirm Changes"})]})]}),n.jsx("button",{onClick:d=>i("closeConfirmModal()",d),className:"w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all",children:n.jsx("span",{className:"material-symbols-outlined text-[20px]",children:"close"})})]}),n.jsxs("div",{className:"overflow-y-auto flex-1 px-6 py-5 space-y-4",children:[n.jsxs("section",{className:"confirm-review-section",children:[n.jsxs("div",{className:"confirm-review-section-head",children:[n.jsx("div",{className:"confirm-review-section-icon",children:n.jsx("span",{className:"material-symbols-outlined",style:{fontVariationSettings:'"FILL" 1'},children:"account_balance_wallet"})}),n.jsx("h4",{className:"text-lg font-extrabold text-slate-700",children:"รายละเอียดบัญชี"})]}),n.jsxs("div",{className:"confirm-review-grid",children:[n.jsxs("div",{className:"confirm-review-item",children:[n.jsx("p",{className:"confirm-review-label",children:"หมายเลขบัญชี"}),n.jsx("p",{id:"rv-account-no",className:"confirm-review-value",children:"-"})]}),n.jsxs("div",{className:"confirm-review-item",children:[n.jsx("p",{className:"confirm-review-label",children:"ชื่อ-นามสกุล"}),n.jsx("p",{id:"rv-customer-name",className:"confirm-review-value",children:"-"})]})]})]}),n.jsxs("section",{className:"confirm-review-section",children:[n.jsxs("div",{className:"confirm-review-section-head indigo",children:[n.jsx("div",{className:"confirm-review-section-icon",children:n.jsx("span",{className:"material-symbols-outlined",style:{fontVariationSettings:'"FILL" 1'},children:"gavel"})}),n.jsx("h4",{className:"text-lg font-extrabold text-slate-700",children:"รายละเอียดคำพิพากษา"})]}),n.jsxs("div",{className:"confirm-review-grid",children:[n.jsxs("div",{className:"confirm-review-item",children:[n.jsx("p",{className:"confirm-review-label",children:"วันที่ยื่นฟ้อง"}),n.jsx("p",{id:"rv-filing-date",className:"confirm-review-value",children:"-"})]}),n.jsxs("div",{className:"confirm-review-item",children:[n.jsx("p",{className:"confirm-review-label",children:"วันที่พิพากษา"}),n.jsx("p",{id:"rv-judgment-date",className:"confirm-review-value",children:"-"})]}),n.jsxs("div",{className:"confirm-review-item",children:[n.jsx("p",{className:"confirm-review-label",children:"คดีหมายเลขแดงที่"}),n.jsx("p",{id:"rv-red-case-no",className:"confirm-review-value",children:"-"})]}),n.jsxs("div",{className:"confirm-review-item",children:[n.jsx("p",{className:"confirm-review-label",children:"หมายเหตุ"}),n.jsx("p",{id:"rv-judgment-note",className:"confirm-review-value break-words",children:"-"})]})]}),n.jsxs("div",{id:"rv-judgment-type-row",className:"confirm-review-highlight hidden",children:[n.jsx("p",{className:"confirm-review-label text-indigo-500",children:"ประเภทคำพิพากษา"}),n.jsx("p",{id:"rv-judgment-type",className:"confirm-review-value primary",children:"-"})]}),n.jsxs("div",{className:"confirm-review-grid cols-3",children:[n.jsxs("div",{className:"confirm-review-item",children:[n.jsx("p",{className:"confirm-review-label",children:"ยอดหนี้รวม"}),n.jsx("p",{id:"rv-total-debt",className:"confirm-review-value primary",children:"-"})]}),n.jsxs("div",{className:"confirm-review-item",children:[n.jsx("p",{className:"confirm-review-label",children:"เงินต้น"}),n.jsx("p",{id:"rv-principal",className:"confirm-review-value",children:"-"})]}),n.jsxs("div",{className:"confirm-review-item",children:[n.jsx("p",{className:"confirm-review-label",children:"อัตราดอกเบี้ย/ปี"}),n.jsx("p",{id:"rv-interest-rate",className:"confirm-review-value",children:"-"})]}),n.jsxs("div",{className:"confirm-review-item",children:[n.jsx("p",{className:"confirm-review-label",children:"ค่าธรรมเนียมศาล"}),n.jsx("p",{id:"rv-court-fee",className:"confirm-review-value",children:"-"})]}),n.jsxs("div",{className:"confirm-review-item",children:[n.jsx("p",{className:"confirm-review-label",children:"ค่าทนายความ"}),n.jsx("p",{id:"rv-lawyer-fee",className:"confirm-review-value",children:"-"})]}),n.jsxs("div",{className:"confirm-review-item",children:[n.jsx("p",{className:"confirm-review-label",children:"ยอดหนี้ส่วนต่าง"}),n.jsx("p",{id:"rv-diff-debt",className:"confirm-review-value primary",children:"-"})]})]})]}),n.jsxs("section",{className:"confirm-review-section",children:[n.jsxs("div",{className:"confirm-review-section-head green",children:[n.jsx("div",{className:"confirm-review-section-icon green",children:n.jsx("span",{className:"material-symbols-outlined",style:{fontVariationSettings:'"FILL" 1'},children:"payments"})}),n.jsx("h4",{className:"text-lg font-extrabold text-slate-700",children:"รายละเอียดการชำระเงิน"})]}),n.jsxs("div",{className:"confirm-review-grid",children:[n.jsxs("div",{className:"confirm-review-item",children:[n.jsx("p",{className:"confirm-review-label",children:"วันครบกำหนดงวดแรก"}),n.jsx("p",{id:"rv-first-due-date",className:"confirm-review-value",children:"-"})]}),n.jsxs("div",{className:"confirm-review-item",children:[n.jsx("p",{className:"confirm-review-label",children:"วันครบกำหนดงวดสุดท้าย"}),n.jsx("p",{id:"rv-last-due-date",className:"confirm-review-value",children:"-"})]}),n.jsxs("div",{className:"confirm-review-item",children:[n.jsx("p",{className:"confirm-review-label",children:"จำนวนงวดผ่อน"}),n.jsx("p",{id:"rv-installment-count",className:"confirm-review-value",children:"-"})]}),n.jsxs("div",{className:"confirm-review-item",children:[n.jsx("p",{className:"confirm-review-label",children:"ดอกเบี้ยเมื่อผิดนัด"}),n.jsx("p",{id:"rv-default-interest",className:"confirm-review-value danger",children:"-"})]})]}),n.jsxs("div",{className:"confirm-review-grid cols-4",children:[n.jsxs("div",{className:"confirm-review-item",children:[n.jsx("p",{className:"confirm-review-label",children:"ค่างวดที่ 1"}),n.jsx("p",{id:"rv-inst-1",className:"confirm-review-value",children:"-"})]}),n.jsxs("div",{className:"confirm-review-item",children:[n.jsx("p",{className:"confirm-review-label",children:"ค่างวดที่ 2"}),n.jsx("p",{id:"rv-inst-2",className:"confirm-review-value text-slate-400",children:"-"})]}),n.jsxs("div",{className:"confirm-review-item",children:[n.jsx("p",{className:"confirm-review-label",children:"ค่างวดที่ 3"}),n.jsx("p",{id:"rv-inst-3",className:"confirm-review-value text-slate-400",children:"-"})]}),n.jsxs("div",{className:"confirm-review-item",children:[n.jsx("p",{className:"confirm-review-label",children:"ค่างวดที่ 4"}),n.jsx("p",{id:"rv-inst-4",className:"confirm-review-value text-slate-400",children:"-"})]})]})]})]}),n.jsxs("div",{className:"confirm-review-footer px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3",children:[n.jsx("p",{className:"text-xs font-semibold text-slate-400",children:"กรุณาตรวจสอบข้อมูลให้ถูกต้องก่อนกดยืนยัน"}),n.jsxs("div",{className:"flex items-center justify-end gap-2",children:[n.jsx("button",{onClick:d=>i("closeConfirmModal()",d),className:"confirm-review-secondary-btn min-w-[96px] h-10 px-5 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold transition-all text-sm",children:"แก้ไข"}),n.jsxs("button",{id:"confirm-submit-btn",onClick:d=>i("doSubmit()",d),className:"confirm-review-primary-btn min-w-[160px] h-10 px-5 rounded-xl text-white font-bold transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed",children:[n.jsx("span",{className:"material-symbols-outlined text-base",style:{fontVariationSettings:'"FILL" 1'},children:"save"}),"ยืนยันบันทึก"]})]})]})]})]}),n.jsxs("div",{id:"alert-modal",className:"hidden fixed inset-0 z-[200] flex items-center justify-center p-4",children:[n.jsx("div",{className:"absolute inset-0 bg-slate-900/50 backdrop-blur-[3px]",onClick:d=>i("closeAlert()",d)}),n.jsxs("div",{className:"relative bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden",children:[n.jsxs("div",{className:"p-7 flex flex-col items-center text-center",children:[n.jsx("div",{id:"alert-icon-wrap",className:"w-16 h-16 rounded-full flex items-center justify-center mb-4",children:n.jsx("span",{id:"alert-icon",className:"material-symbols-outlined text-3xl"})}),n.jsx("h3",{id:"alert-title",className:"text-lg font-bold text-slate-800 mb-2"}),n.jsx("p",{id:"alert-message",className:"text-sm text-slate-500 leading-relaxed mb-6"}),n.jsx("button",{onClick:d=>i("closeAlert()",d),className:"w-full py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all text-sm",children:"รับทราบ"})]}),n.jsx("button",{onClick:d=>i("closeAlert()",d),className:"absolute top-3 right-3 text-slate-400 hover:text-slate-600 p-1",children:n.jsx("span",{className:"material-symbols-outlined text-lg",children:"close"})})]})]}),n.jsx("footer",{className:"detail-footer",children:n.jsxs("div",{className:"max-w-[1600px] mx-auto flex justify-between items-center",children:[n.jsx("div",{}),n.jsxs("div",{className:"flex flex-wrap justify-end gap-4",children:[n.jsx("button",{onClick:d=>i("handleCancel()",d),className:"btn-secondary-modern",children:"Cancel"}),n.jsxs("button",{id:"preview-btn",onClick:d=>i("document.getElementById('preview-btn').dataset.manual='true'; loadPreview()",d),className:"btn-primary-modern",children:[n.jsx("span",{className:"material-symbols-outlined text-base",children:"visibility"}),"พรีวิว"]}),n.jsxs("button",{id:"submit-btn",onClick:d=>i("handleSubmit()",d),disabled:!0,className:"btn-primary-modern px-6 disabled:opacity-40 disabled:cursor-not-allowed",children:[n.jsxs("span",{id:"btn-default",className:"flex items-center gap-2",children:[n.jsx("span",{className:"material-symbols-outlined text-base",children:"save"}),"บันทึกการแก้ไข"]}),n.jsxs("span",{id:"btn-loading",className:"hidden flex items-center gap-2",children:[n.jsxs("svg",{className:"animate-spin w-4 h-4",fill:"none",viewBox:"0 0 24 24",children:[n.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor","stroke-width":"4"}),n.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8v8z"})]}),"กำลังบันทึก..."]})]})]})]})}),n.jsxs("div",{id:"retro-enforcement-confirm-modal",className:"hidden fixed inset-0 z-[320] flex items-center justify-center p-4",children:[n.jsx("div",{className:"absolute inset-0 bg-slate-900/45 backdrop-blur-[2px]",onClick:d=>i("closeRetroEnforcementConfirm()",d)}),n.jsxs("div",{className:"relative w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-amber-100 overflow-hidden",children:[n.jsx("div",{className:"px-6 py-5 border-b border-amber-100 bg-amber-50",children:n.jsxs("div",{className:"flex items-start gap-3",children:[n.jsx("div",{className:"w-11 h-11 rounded-2xl bg-white text-amber-600 border border-amber-100 flex items-center justify-center flex-shrink-0",children:n.jsx("span",{className:"material-symbols-outlined",style:{fontVariationSettings:'"FILL" 1'},children:"warning"})}),n.jsxs("div",{children:[n.jsx("h3",{className:"text-lg font-extrabold text-slate-800",children:"ยืนยันว่าแก้รายงานย้อนหลังแล้ว?"}),n.jsx("p",{className:"text-xs text-slate-500 mt-1",children:"หลังจากยืนยันแล้ว จะไม่สามารถยกเลิกสถานะนี้ได้"})]})]})}),n.jsxs("div",{className:"px-6 py-5 space-y-3 text-sm",children:[n.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:[n.jsxs("div",{className:"rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3",children:[n.jsx("p",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-wider",children:"เลขที่บัญชี"}),n.jsx("p",{id:"retro-modal-account",className:"text-sm font-bold text-slate-800 mt-1",children:"-"})]}),n.jsxs("div",{className:"rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3",children:[n.jsx("p",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-wider",children:"เดือนที่ต้องตรวจสอบ"}),n.jsx("p",{id:"retro-modal-month",className:"text-sm font-bold text-amber-700 mt-1",children:"-"})]})]}),n.jsx("p",{id:"retro-modal-message",className:"text-slate-600 leading-6",children:"-"}),n.jsx("div",{className:"rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-xs font-semibold text-red-600",children:"โปรดกดปุ่มยืนยันเฉพาะเมื่อได้ตรวจสอบหรือแก้รายงานเดือนเก่าเรียบร้อยแล้วเท่านั้น"})]}),n.jsxs("div",{className:"px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3",children:[n.jsx("button",{type:"button",onClick:d=>i("closeRetroEnforcementConfirm()",d),className:"px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition-all",children:"ยกเลิก"}),n.jsx("button",{type:"button",id:"retro-modal-confirm-btn",onClick:d=>i("confirmRetroEnforcementFix()",d),className:"px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition-all",children:"ยืนยันว่าแก้รายงานแล้ว"})]})]})]})]})}function nf(){return ef(),n.jsx(Jm,{activePage:"customer-list",children:n.jsx("div",{className:"customer-detail-page min-h-screen bg-surface text-on-surface font-body",children:n.jsx(tf,{runLegacyAction:Gm})})})}var yc=gc();const lf=["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"],sf=["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."],rf=["อา","จ","อ","พ","พฤ","ศ","ส"];function oi(){const i=new Date;return new Date(i.getFullYear(),i.getMonth(),i.getDate())}function ic(i){return`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}-${String(i.getDate()).padStart(2,"0")}`}function di(i){if(!i)return null;const[d,u,v]=String(i).slice(0,10).split("-").map(Number);return d&&u&&v?new Date(d,u-1,v):null}function af(i){if(!i)return"";const[d,u,v]=String(i).slice(0,10).split("-");return d&&u&&v?`${v}/${u}/${d}`:""}function of(i,d){const u=new Date(i,d,1),v=new Date(i,d+1,0),y=[];for(let E=0;E<u.getDay();E+=1)y.push({date:new Date(i,d,E-u.getDay()+1),currentMonth:!1});for(let E=1;E<=v.getDate();E+=1)y.push({date:new Date(i,d,E),currentMonth:!0});for(;y.length<42;)y.push({date:new Date(i,d+1,y.length-u.getDay()-v.getDate()+1),currentMonth:!1});return y}function df({id:i,value:d,onChange:u,placeholder:v="เลือกวันที่",maxDate:y,ariaInvalid:E,ariaDescribedBy:C,className:P="filter-date-display relative",openClassName:S="open",children:D}){const B=di(d)||oi(),[z,G]=k.useState(!1),[V,W]=k.useState(B.getFullYear()),[Q,Y]=k.useState(B.getMonth()),[ve,_e]=k.useState(!1),[pe,ie]=k.useState({}),he=k.useRef(null),de=k.useRef(null),xe=oi(),U=di(y),q=k.useCallback(()=>{const H=he.current;if(!H)return;const ne=H.getBoundingClientRect(),se=Math.min(320,Math.max(288,ne.width)),I=window.innerHeight-ne.bottom-8,O=ne.top-8;let T=ne.left;T+se>window.innerWidth-8&&(T=window.innerWidth-se-8),T<8&&(T=8);const p={left:T,width:se,maxHeight:Math.max(180,I>=340?I:O>=340?O:window.innerHeight-16)};I>=340?p.top=ne.bottom+6:O>=340?p.bottom=window.innerHeight-ne.top+6:p.top=8,ie(p)},[]),ge=()=>{const H=di(d)||oi();W(H.getFullYear()),Y(H.getMonth()),_e(!1),G(!0),window.requestAnimationFrame(q)};k.useEffect(()=>{if(!z)return;const H=ne=>{var I,O;const se=ne.target;(I=de.current)!=null&&I.contains(se)||(O=he.current)!=null&&O.contains(se)||G(!1)};return document.addEventListener("mousedown",H),window.addEventListener("resize",q),window.addEventListener("scroll",q,!0),()=>{document.removeEventListener("mousedown",H),window.removeEventListener("resize",q),window.removeEventListener("scroll",q,!0)}},[z,q]);const Ne=H=>{y&&H&&H>y||(u(H),G(!1))},je=H=>{const ne=Q+H;ne>11?(Y(0),W(se=>se+1)):ne<0?(Y(11),W(se=>se-1)):Y(ne)},be=d?af(d):v,ke=z&&n.jsxs("div",{ref:de,style:pe,className:"dp-popup",children:[n.jsxs("div",{className:"dp-header",children:[n.jsx("button",{type:"button",onClick:()=>je(-1),className:"dp-nav-btn","aria-label":"เดือนก่อนหน้า",children:n.jsx("span",{className:"material-symbols-outlined text-[18px]",children:"chevron_left"})}),n.jsxs("button",{type:"button",onClick:()=>_e(H=>!H),className:"dp-month-year",children:[lf[Q]," ",V+543]}),n.jsx("button",{type:"button",onClick:()=>je(1),className:"dp-nav-btn","aria-label":"เดือนถัดไป",children:n.jsx("span",{className:"material-symbols-outlined text-[18px]",children:"chevron_right"})})]}),ve?n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"dp-year-header",children:[n.jsx("button",{type:"button",onClick:()=>W(H=>H-1),className:"dp-nav-btn","aria-label":"ปีก่อนหน้า",children:n.jsx("span",{className:"material-symbols-outlined text-[18px]",children:"chevron_left"})}),n.jsxs("span",{className:"text-sm font-bold text-slate-700",children:["พ.ศ. ",V+543]}),n.jsx("button",{type:"button",onClick:()=>W(H=>H+1),className:"dp-nav-btn","aria-label":"ปีถัดไป",children:n.jsx("span",{className:"material-symbols-outlined text-[18px]",children:"chevron_right"})})]}),n.jsx("div",{className:"dp-my-grid",children:sf.map((H,ne)=>n.jsx("button",{type:"button",onClick:()=>{Y(ne),_e(!1)},className:`dp-my-item ${ne===Q?"active":""}`,children:H},H))})]}):n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"dp-weekdays",children:rf.map(H=>n.jsx("span",{className:"dp-weekday",children:H},H))}),n.jsx("div",{className:"dp-days",children:of(V,Q).map(H=>{const ne=ic(H.date),se=H.currentMonth&&ne===d,I=H.currentMonth&&H.date.getTime()===xe.getTime(),O=!!(H.currentMonth&&y&&ne>y),T=`dp-day ${H.currentMonth?"":"dp-day-other"} ${se?"dp-day-selected":""} ${I&&!se?"dp-day-today":""} ${O?"opacity-30 cursor-not-allowed hover:bg-transparent":""}`;return H.currentMonth?n.jsx("button",{type:"button",onClick:()=>Ne(ne),className:T,disabled:O,children:H.date.getDate()},ne):n.jsx("span",{className:T,children:H.date.getDate()},ne)})})]}),n.jsxs("div",{className:"dp-footer",children:[n.jsx("button",{type:"button",onClick:()=>Ne(""),className:"dp-btn-clear",children:"ล้างค่า"}),n.jsx("button",{type:"button",onClick:()=>Ne(ic(U&&U<xe?U:xe)),className:"dp-btn-today",children:U&&U<xe?"วันที่สูงสุด":"วันนี้"})]})]});return n.jsxs(n.Fragment,{children:[n.jsx("button",{id:i,ref:he,type:"button",onClick:ge,className:`${P} ${z?S:""}`,"aria-invalid":E?"true":void 0,"aria-describedby":C,children:D?D(be,!d):be}),ke?yc.createPortal(ke,document.body):null]})}const vc=["ยื่นฟ้อง","พิพากษาตามยอม","พิพากษาฝ่ายเดียว","บังคับคดี","ปิดบัญชี"],cf=["ค้างชำระ","ชำระปกติ","ยังไม่ถึงกำหนด","ไม่มีแผนชำระ","ชำระครบแล้ว"],uf={ยื่นฟ้อง:"gavel",พิพากษาตามยอม:"handshake",พิพากษาฝ่ายเดียว:"balance",บังคับคดี:"assignment",ปิดบัญชี:"lock"},mf={ค้างชำระ:"warning",ชำระปกติ:"paid",ยังไม่ถึงกำหนด:"event_available",ไม่มีแผนชำระ:"event_busy",ชำระครบแล้ว:"verified"},ci=[{value:"due",shortLabel:"งวดแรก",label:"วันครบกำหนดงวดแรก",description:"ใช้วันที่งวดแรกของแผนชำระ",icon:"event_available"},{value:"nextDue",shortLabel:"ถัดไป",label:"วันครบกำหนดถัดไป",description:"ใช้วันที่ต้องติดตามงวดถัดไป",icon:"event_repeat"},{value:"filingDate",shortLabel:"ยื่นฟ้อง",label:"วันที่ยื่นฟ้อง",description:"ใช้วันที่ส่งฟ้องศาล",icon:"gavel"},{value:"judgmentDate",shortLabel:"พิพากษา",label:"วันที่พิพากษา",description:"ใช้วันที่มีคำพิพากษา",icon:"balance"},{value:"enforcementJudgmentDate",shortLabel:"หมายบังคับ",label:"วันที่ของหมายบังคับคดี",description:"ใช้วันที่หมายบังคับคดีมีผล",icon:"contract"},{value:"lastPaymentDate",shortLabel:"ชำระล่าสุด",label:"วันที่ชำระล่าสุด",description:"ใช้วันที่รับชำระล่าสุด",icon:"payments"}],ff=["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"],pf=["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."],hf=["อา","จ","อ","พ","พฤ","ศ","ส"];function xr(){return{caseStatuses:[],paymentStatuses:[],dateField:"due",dateFrom:"",dateTo:"",outstandingMin:"",outstandingMax:""}}function ui(){return{account_no:"",black_case_no:"",filing_date:"",default_date:"",filing_capital:"",name:"",pre_filing_dpd_days:"",filing_note:""}}function Zl(i){var d;return((d=document.cookie.split("; ").find(u=>u.startsWith(`${i}=`)))==null?void 0:d.split("=")[1])||""}async function gr(i){const d=await i.json().catch(()=>({}));if(!i.ok)throw new Error(d.error||d.message||"เกิดข้อผิดพลาด");return d}function xf(i){return i.account_no||i.account||""}function fn(i){return i.case_status||""}function jc(i){if(fn(i)==="ปิดบัญชี")return"ชำระครบแล้ว";if(fn(i)==="ยื่นฟ้อง")return"ไม่มีแผนชำระ";const d=i.display_payment_status||i.computed_payment_status||i.payment_status||i.status||"-";return d==="จ่ายปกติ"?"ชำระปกติ":d}function yi(i){const d=String(i||"");return d.length===12?`${d.slice(0,4)}-${d.slice(4,8)}-${d.slice(8,12)}`:d||"-"}function Nt(i){if(!i)return"-";const[d,u,v]=String(i).slice(0,10).split("-");return d&&u&&v?`${v}/${u}/${d}`:"-"}function jr(){const i=new Date;return new Date(i.getFullYear(),i.getMonth(),i.getDate())}function fi(i){return`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}-${String(i.getDate()).padStart(2,"0")}`}function oc(i){if(!i)return null;const[d,u,v]=String(i).slice(0,10).split("-").map(Number);return d&&u&&v?new Date(d,u-1,v):null}function pi(i){const d=String(i||"").replace(/\s*\/\s*/g,"/").replace(/\s+/g," ").trim(),u=d.match(/^([ก-๙]{1,10})\s*([A-Za-z]?\d+)\/(25\d{2})$/);return u?`${u[1]}${u[2]}/${u[3]}`:d}function gf(i){return/^([ก-๙]{1,10})\s*([A-Za-z]?\d+)\/(25\d{2})$/.test(String(i||"").replace(/\s*\/\s*/g,"/").replace(/\s+/g," ").trim())}function wc(i){return String(i||"").replace(/,/g,"").trim()}function Nc(i){const d=wc(i);if(!d)return"";if(!/^\d+(\.\d{0,2})?$/.test(d))return i;const[u,v]=d.split("."),y=u.replace(/^0+(?=\d)/,"").replace(/\B(?=(\d{3})+(?!\d))/g,",")||"0";return v!==void 0?`${y}.${v}`:y}function hi(){return fi(jr())}const vi=["account_no","black_case_no","filing_date","default_date","filing_capital","name","pre_filing_dpd_days","filing_note"];function yf(i){return i?Nt(String(i).slice(0,10)):"-"}function wt(i,d=!1){const u=Number(String(i||0).replace(/,/g,""));return u?d&&Math.abs(u)>=1e6?`฿${(u/1e6).toFixed(2)}M`:`฿${u.toLocaleString("th-TH",{minimumFractionDigits:2,maximumFractionDigits:2})}`:"฿0.00"}function dc(i){const d=Number(i||0);return d?`${d.toLocaleString("th-TH",{maximumFractionDigits:4})}%`:"-"}function vf(i=""){const d=["โ","ไ","ใ","เ","แ"],u=String(i).trim().split(/\s+/).filter(Boolean),v=y=>y?d.includes(y.charAt(0))&&y.length>1?y.charAt(1):y.charAt(0):"";return u.length>=2?`${v(u[0])}${v(u[u.length-1])}`:v(u[0])||"-"}function jf(i){return fn(i)==="ยื่นฟ้อง"||!i.judgment_date?"ยอดตามยื่นฟ้อง":"ยอดตามคำพิพากษา"}function wf(i){return fn(i)==="ยื่นฟ้อง"||!i.judgment_date?Number(i.filing_capital||0):Number(i.total_debt||0)}function bc(i){if(fn(i)==="ปิดบัญชี")return 0;if(fn(i)==="ยื่นฟ้อง"||!i.judgment_date)return Number(i.filing_capital||0);const d=i.latest_snapshot||{};return Number(d.remaining_debt_raw??i.remaining_debt??d.outstanding_raw??d.outstanding??i.total_debt??0)}function Nf(i){return Number(i.installment_1||i.installment_2||i.installment_3||i.installment_4||0)}function bf(i){return i.last_payment_date||i.latest_payment_date||""}function cc(i){return i.last_payment_amount??i.latest_payment_amount??0}function uc(i){var d;return Number(((d=i.latest_snapshot)==null?void 0:d.dpd_days)||0)}function Sf(i){const d=xi(i,!0);return vi.map(u=>d[u]).find(Boolean)||""}function xi(i,d){const u=i.account_no.trim(),v=pi(i.black_case_no),y=wc(i.filing_capital),E=i.name.trim(),C=i.pre_filing_dpd_days.trim(),P=hi(),S={};return u?/^\d+$/.test(u)?u.length!==12&&(S.account_no="หมายเลขบัญชีต้องมี 12 หลัก"):S.account_no="กรุณากรอกเฉพาะตัวเลข 0-9 เท่านั้น":d&&(S.account_no="กรุณากรอกหมายเลขบัญชี"),v?gf(v)||(S.black_case_no="กรุณากรอกหมายเลขคดีดำให้ถูกต้อง เช่น ผบE1234/2568"):d&&(S.black_case_no="กรุณากรอกคดีหมายเลขดำ"),i.filing_date?i.filing_date&&i.filing_date>P&&(S.filing_date="วันที่ยื่นฟ้องต้องไม่เป็นวันที่ในอนาคต"):d&&(S.filing_date="กรุณาเลือกวันที่ยื่นฟ้อง"),i.default_date?i.filing_date?i.default_date&&i.filing_date&&i.default_date>i.filing_date?S.default_date="วันที่ผิดนัดชำระก่อนฟ้องต้องไม่เกินวันที่ยื่นฟ้อง":i.default_date&&i.default_date>P&&(S.default_date="วันที่ผิดนัดชำระก่อนฟ้องต้องไม่เป็นวันที่ในอนาคต"):S.default_date="กรุณาเลือกวันที่ยื่นฟ้องก่อน":d&&(S.default_date="กรุณาเลือกวันที่ผิดนัดชำระก่อนฟ้อง"),y?/^[0-9.]+$/.test(y)&&/^\d+(\.\d+)?$/.test(y)?/^\d+(\.\d{1,2})?$/.test(y)?Number(y)<=0&&(S.filing_capital="ทุนทรัพย์ที่ฟ้องต้องมากกว่า 0"):S.filing_capital="กรุณากรอกทศนิยมไม่เกิน 2 ตำแหน่ง":S.filing_capital="กรุณากรอกจำนวนเงินเป็นตัวเลขเท่านั้น":d&&(S.filing_capital="กรุณากรอกทุนทรัพย์ที่ฟ้อง"),E?/^[A-Za-zก-๙ .-]+$/.test(E)||(S.name="ชื่อ-นามสกุลใช้ได้เฉพาะภาษาไทย ภาษาอังกฤษ เว้นวรรค จุด และขีดกลาง"):d&&(S.name="กรุณากรอกชื่อ-นามสกุล"),C?/^\d+$/.test(C)?Number(C)<0&&(S.pre_filing_dpd_days="DPD ต้องไม่น้อยกว่า 0"):S.pre_filing_dpd_days="กรุณากรอก DPD เป็นตัวเลขเท่านั้น":d&&(S.pre_filing_dpd_days="กรุณากรอก DPD"),i.filing_note.length>100&&(S.filing_note="หมายเหตุ / เงื่อนไขพิเศษเพิ่มเติมต้องไม่เกิน 100 ตัวอักษร"),S}function _f(i){return vi.some(d=>!!i[d])}function kf(i){return vi.find(d=>!!i[d])||""}function ft(i){return`add-${i.replace(/_/g,"-")}`}function Ef(i){window.requestAnimationFrame(()=>{const d=document.getElementById(ft(i));d instanceof HTMLElement&&(d.focus(),d.scrollIntoView({block:"center",behavior:"smooth"}))})}function Cf(i){const d={};return i&&(i.includes("เลขที่บัญชี")||i.includes("หมายเลขบัญชี")?d.account_no=i:i.includes("คดีหมายเลขดำ")?d.black_case_no=i:i.includes("วันที่ยื่นฟ้อง")?d.filing_date=i:i.includes("วันที่ผิดนัด")?d.default_date=i:i.includes("ทุนทรัพย์")?d.filing_capital=i:i.includes("ชื่อ")?d.name=i:i.includes("DPD")?d.pre_filing_dpd_days=i:i.includes("หมายเหตุ")&&(d.filing_note=i)),d}function yr({text:i,tone:d}){const u={red:"bg-red-50 text-red-800 border-red-200",amber:"bg-amber-50 text-amber-800 border-amber-200",emerald:"bg-emerald-50 text-emerald-800 border-emerald-200",blue:"bg-blue-50 text-blue-800 border-blue-200",slate:"bg-slate-100 text-slate-700 border-slate-200",indigo:"bg-indigo-50 text-indigo-800 border-indigo-200"};return n.jsx("span",{className:`status-badge ${u[d]}`,children:i||"-"})}function If(i){return i==="ยื่นฟ้อง"?"blue":i==="พิพากษาตามยอม"?"emerald":i==="พิพากษาฝ่ายเดียว"?"amber":i==="บังคับคดี"?"red":"slate"}function Df(i){return i==="ค้างชำระ"?"red":i==="ชำระปกติ"||i==="จ่ายปกติ"?"emerald":i==="ยังไม่ถึงกำหนด"||i==="ยังไม่เริ่มชำระ"?"blue":i==="ชำระครบแล้ว"?"indigo":"slate"}function mc(i){return{caseStatuses:(i.get("case_statuses")||"").split(",").filter(Boolean),paymentStatuses:(i.get("payment_statuses")||"").split(",").filter(Boolean),dateField:i.get("date_field")||"due",dateFrom:i.get("date_from")||"",dateTo:i.get("date_to")||"",outstandingMin:i.get("outstanding_min")||"",outstandingMax:i.get("outstanding_max")||""}}function Lf(i){const d=Number(i||25);return[10,25,50].includes(d)?d:25}function Tf(){const i=k.useMemo(()=>new URLSearchParams(window.location.search),[]),d=k.useRef(Math.max(1,Number(i.get("page")||1))),u=k.useRef(!0),[v]=k.useState(sessionStorage.getItem("role")||""),[y]=k.useState(sessionStorage.getItem("display_name")||""),[E,C]=k.useState([]),[P,S]=k.useState({}),[D,B]=k.useState(i.get("q")||""),[z,G]=k.useState(i.get("case_status")||""),[V,W]=k.useState(()=>mc(i)),[Q,Y]=k.useState(()=>mc(i)),[ve,_e]=k.useState(d.current),[pe,ie]=k.useState(()=>Lf(i.get("per_page"))),[he,de]=k.useState(!1),[xe,U]=k.useState(0),[q,ge]=k.useState(i.get("sort_by")||""),[Ne,je]=k.useState(i.get("sort_dir")==="asc"?"asc":"desc"),[be,ke]=k.useState(""),[H,ne]=k.useState(!0),[se,I]=k.useState(""),[O,T]=k.useState(!1),[p,j]=k.useState(""),[ee,X]=k.useState(!1),[ce,re]=k.useState(!1),[te,ue]=k.useState(ui),[we,Pe]=k.useState(""),[Ln,Ot]=k.useState({}),[pn,hn]=k.useState(!1),[Xl,al]=k.useState(!1),[il,ol]=k.useState(!1),[xn,At]=k.useState(!1),[Vt,Tn]=k.useState(!1),[es,dl]=k.useState(!1),[cl,ts]=k.useState(()=>new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().slice(0,10)),[Bn,Rn]=k.useState(()=>new Date().toISOString().slice(0,10)),Ut=k.useRef(0),bt=k.useRef(null),Ht=V.caseStatuses.length+V.paymentStatuses.length+(V.dateFrom||V.dateTo?1:0)+(V.outstandingMin||V.outstandingMax?1:0),wr=Math.max(1,Math.ceil(xe/pe)),ns=xe===0?0:(ve-1)*pe+1,ls=Math.min(ve*pe,xe);k.useEffect(()=>{we&&Pe(""),Ot(xi(te,pn))},[te,pn]);const It=k.useCallback(async(L=1)=>{if(!v){window.location.href="/login";return}const le=Ut.current+1;Ut.current=le,_e(L),ne(!0),I("");try{const oe=new URLSearchParams({page:String(L),per_page:String(pe)}),ze=D.trim();if(ze){const gn=ze.replace(/[-\s]/g,"");/^\d+$/.test(gn)?oe.append("account_no",gn):oe.append("name",ze)}z&&oe.append("case_status",z),V.caseStatuses.length&&oe.append("case_statuses",V.caseStatuses.join(",")),V.paymentStatuses.length&&oe.append("payment_statuses",V.paymentStatuses.join(",")),(V.dateFrom||V.dateTo)&&(oe.append("date_field",V.dateField||"due"),V.dateFrom&&oe.append("date_from",V.dateFrom),V.dateTo&&oe.append("date_to",V.dateTo)),V.outstandingMin&&oe.append("outstanding_min",V.outstandingMin),V.outstandingMax&&oe.append("outstanding_max",V.outstandingMax),q&&(oe.append("sort_by",q),oe.append("sort_dir",Ne)),ml(oe);const Qt=await fetch(`/api/customers?${oe}`,{headers:{Authorization:`Bearer ${Zl("token")}`}});if(Qt.status===401){window.location.href="/login";return}const Lt=await gr(Qt);if(le!==Ut.current)return;C(Lt.data||[]),S(Lt.summary||{}),U(Number(Lt.total||0)),_e(Number(Lt.page||L))}catch(oe){if(le!==Ut.current)return;I(oe instanceof Error?oe.message:"ไม่สามารถโหลดข้อมูลได้")}finally{le===Ut.current&&ne(!1)}},[z,V,pe,v,D,Ne,q]);k.useEffect(()=>{const L=u.current?d.current:1;u.current=!1,It(L)},[z,V,pe,q,Ne]),k.useEffect(()=>{if(!he)return;const L=()=>de(!1),le=oe=>{oe.key==="Escape"&&de(!1)};return window.addEventListener("click",L),window.addEventListener("keydown",le),()=>{window.removeEventListener("click",L),window.removeEventListener("keydown",le)}},[he]),k.useEffect(()=>{const L=sessionStorage.getItem("password_warning_days");L&&!sessionStorage.getItem("password_warning_seen")&&(sessionStorage.setItem("password_warning_seen","1"),window.setTimeout(()=>alert(`รหัสผ่านของคุณจะหมดอายุในอีก ${L} วัน กรุณาเปลี่ยนรหัสผ่านก่อนถึงกำหนด`),300))},[]);const Fn=k.useMemo(()=>{const L=P.case_counts||{};return[{key:"all",label:"ยอดรวมทั้งหมด",sub:"Total Base",count:L.ทั้งหมด??P.active_count??xe,status:"",icon:"groups",color:"indigo"},{key:"filing",label:"ขั้นตอนยื่นฟ้อง",sub:"Filing",count:L.ยื่นฟ้อง||0,status:"ยื่นฟ้อง",icon:"gavel",color:"violet"},{key:"consent",label:"พิจารณาตามยอม",sub:"Consent",count:L.พิพากษาตามยอม||0,status:"พิพากษาตามยอม",icon:"handshake",color:"emerald"},{key:"default",label:"พิจารณาฝ่ายเดียว",sub:"Default",count:L.พิพากษาฝ่ายเดียว||0,status:"พิพากษาฝ่ายเดียว",icon:"balance",color:"amber"},{key:"enforcement",label:"เข้าสู่บังคับคดี",sub:"Enforcement",count:L.บังคับคดี||0,status:"บังคับคดี",icon:"assignment",color:"red"},{key:"closed",label:"ปิดบัญชี",sub:"Closed",count:L.ปิดบัญชี||0,status:"ปิดบัญชี",icon:"lock",color:"slate"}]},[P,xe]);async function ul(){await fetch("/api/auth/logout",{method:"POST",headers:{Authorization:`Bearer ${Zl("token")}`}}).catch(()=>{}),sessionStorage.clear(),window.location.href="/login"}function ml(L){const le=new URLSearchParams(L),oe=D.trim();le.delete("account_no"),le.delete("name"),oe?le.set("q",oe):le.delete("q"),Number(le.get("page")||1)===1&&le.delete("page"),Number(le.get("per_page")||25)===25&&le.delete("per_page");const ze=le.toString();window.history.replaceState(null,"",ze?`/customer-list?${ze}`:"/customer-list")}function fl(){return`${window.location.pathname}${window.location.search}`||"/customer-list"}function pl(L){q===L?je(Ne==="asc"?"desc":"asc"):(ge(L),je("desc"))}function Dt(L){z!==L&&G(L)}function Wt(){B(""),G(""),W(xr()),Y(xr()),ge(""),je("desc")}async function ss(L){var oe;const le=L.replace(/\D/g,"");le&&(await((oe=navigator.clipboard)==null?void 0:oe.writeText(le).catch(()=>{})),ol(!0),window.setTimeout(()=>ol(!1),1600))}async function rs(){if(!xn){At(!0),bt.current=window.setTimeout(()=>Tn(!0),220);try{await gr(await fetch("/api/customers/cache/refresh-all",{method:"POST",headers:{Authorization:`Bearer ${Zl("token")}`}})),await It(ve)}catch(L){alert(L instanceof Error?L.message:"รีเฟรชไม่สำเร็จ")}finally{bt.current&&(window.clearTimeout(bt.current),bt.current=null),Tn(!1),At(!1)}}}function as(){window.location.href=`/api/customers/checker-export?date_from=${encodeURIComponent(cl)}&date_to=${encodeURIComponent(Bn)}`}function is(){ue(ui()),Pe(""),Ot({}),hn(!1),re(!1),X(!0)}function os(L){L.preventDefault(),hn(!0);const le=xi(te,!0);if(Ot(le),_f(le)){const ze=kf(le);Pe("กรุณาตรวจสอบข้อมูลที่กรอกไม่ถูกต้อง"),ze&&Ef(ze);return}const oe=Sf(te);Pe(oe),oe||(ue(ze=>({...ze,black_case_no:pi(ze.black_case_no),filing_capital:Nc(ze.filing_capital)})),X(!1),re(!0))}async function hl(){al(!0);try{await gr(await fetch("/api/customers",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${Zl("token")}`},body:JSON.stringify({account_no:te.account_no.trim(),black_case_no:pi(te.black_case_no),name:te.name.trim(),filing_date:te.filing_date,filing_capital:te.filing_capital.replace(/,/g,"").trim(),default_date:te.default_date,pre_filing_dpd_days:Number(te.pre_filing_dpd_days),filing_note:te.filing_note.trim()})})),re(!1),ue(ui()),Ot({}),hn(!1),await It(ve)}catch(L){const le=L instanceof Error?L.message:"บันทึกข้อมูลไม่สำเร็จ";re(!1),X(!0),Pe(le),Ot(Cf(le))}finally{al(!1)}}async function ds(){if(p)try{await gr(await fetch(`/api/customers/${p}`,{method:"DELETE",headers:{Authorization:`Bearer ${Zl("token")}`}})),j(""),await It(ve)}catch(L){alert(L instanceof Error?L.message:"ลบข้อมูลไม่สำเร็จ")}}return n.jsxs("div",{className:"customer-list-page min-h-screen selection:bg-indigo-100 selection:text-primary bg-surface text-on-surface font-body",children:[n.jsx(Bf,{role:v,displayName:y}),n.jsx(Rf,{role:v,activePage:"customer-list",onLogout:ul}),n.jsxs("main",{className:"customer-list-main md:ml-56 pt-20 min-h-screen pb-12",children:[n.jsx("div",{className:"px-6 md:px-8",children:n.jsx("div",{className:"max-w-[1600px] mx-auto",children:n.jsxs("header",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-indigo-100/50",children:[n.jsxs("div",{className:"flex items-center gap-4 min-w-0",children:[n.jsx("div",{className:"w-14 h-14 rounded-2xl bg-white shadow-lg shadow-slate-200/50 flex items-center justify-center text-primary border border-white flex-shrink-0",children:n.jsx("span",{className:"material-symbols-outlined text-3xl",style:{fontVariationSettings:'"FILL" 1'},children:"groups"})}),n.jsxs("div",{className:"min-w-0",children:[n.jsx("h1",{className:"font-headline text-3xl font-extrabold text-primary tracking-tight",children:"Customer Lists"}),n.jsx("p",{className:"text-slate-500 text-sm mt-1",children:"จัดการ ค้นหา และติดตามลูกหนี้ด้วยสถานะคำพิพากษาทั้งหมดในระบบ"})]})]}),n.jsxs("div",{className:"flex flex-wrap items-center gap-3 self-start sm:self-center",children:[n.jsxs("div",{className:"rounded-[28px] border border-slate-200 bg-white px-6 py-3 shadow-md shadow-slate-200/50",children:[n.jsx("p",{className:"text-[11px] text-slate-400 uppercase tracking-widest font-extrabold leading-none mb-1.5",children:"มูลค่ารวม"}),n.jsx("span",{className:"text-lg font-headline text-primary font-extrabold leading-none",children:wt(P.total_value||0)})]}),n.jsxs("div",{className:"rounded-[28px] border border-primary bg-primary px-6 py-3 shadow-md shadow-indigo-200/60",children:[n.jsx("p",{className:"text-[11px] text-blue-100 uppercase tracking-widest font-extrabold leading-none mb-1.5",children:"Active Cases"}),n.jsx("span",{className:"text-lg font-headline text-white font-extrabold leading-none",children:Number(P.active_count||0).toLocaleString("th-TH")})]})]})]})})}),n.jsxs("div",{className:"px-6 md:px-8 mt-6",children:[n.jsx("div",{className:"max-w-[1600px] mx-auto mb-5",children:n.jsx("div",{className:"kpi-panel",children:n.jsx("div",{className:"kpi-grid",children:Fn.map(L=>{var ze;const le=Number(((ze=Fn[0])==null?void 0:ze.count)||0),oe=L.key==="all"?100:le>0?Math.round(Number(L.count||0)/le*100):0;return n.jsxs("div",{className:"kpi-item",children:[n.jsxs("div",{className:"flex items-center justify-between mb-2",children:[n.jsx("div",{className:`kpi-icon text-${L.color}-500 border-${L.color}-100 shadow-${L.color}-100/70`,children:n.jsx("span",{className:"material-symbols-outlined text-[22px]",style:L.key==="all"?{fontVariationSettings:'"FILL" 1'}:void 0,children:L.icon})}),n.jsx("div",{className:"flex flex-col items-end",children:n.jsxs("span",{className:`kpi-percent text-${L.color}-500`,children:[oe,"%"]})})]}),n.jsx("p",{className:"kpi-label",children:L.label}),n.jsxs("div",{className:"flex items-baseline gap-3",children:[n.jsx("h3",{className:"kpi-value",children:Number(L.count||0).toLocaleString("th-TH")}),n.jsx("span",{className:"kpi-unit",children:"Cases"})]}),n.jsxs("div",{className:`mt-2 flex items-center gap-2 text-${L.color}-500`,children:[n.jsx("span",{className:"kpi-sub",children:L.sub}),n.jsx("div",{className:"kpi-footer-line"})]})]},L.key)})})})}),n.jsxs("div",{className:"max-w-[1600px] mx-auto page-card",children:[n.jsx("div",{className:"px-5 md:px-6 py-4 border-b border-blue-100 bg-gradient-to-r from-blue-50 via-white to-indigo-50",children:n.jsxs("div",{className:"flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4",children:[n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsx("div",{className:"w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 flex items-center justify-center shadow-sm",children:n.jsx("span",{className:"material-symbols-outlined text-[20px]",style:{fontVariationSettings:'"FILL" 1'},children:"table_view"})}),n.jsxs("div",{children:[n.jsx("h2",{className:"text-[18px] font-extrabold text-slate-800 tracking-tight",children:"รายการลูกหนี้"}),n.jsx("p",{className:"text-[12px] text-slate-500 mt-0.5",children:"ค้นหา กรอง และเข้าสู่หน้ารายละเอียดลูกหนี้จากตารางนี้"})]})]}),n.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[v==="admin"&&n.jsxs("button",{onClick:()=>dl(!0),className:"btn-secondary-modern",title:"ดาวน์โหลดข้อมูลดิบสำหรับตรวจสอบ",children:[n.jsx("span",{className:"material-symbols-outlined text-base",children:"download"}),"Raw Data Export"]}),n.jsxs("button",{onClick:()=>{Y({...V,caseStatuses:[...V.caseStatuses],paymentStatuses:[...V.paymentStatuses]}),T(!0)},className:"btn-secondary-modern",children:[n.jsx("span",{className:"material-symbols-outlined text-base",children:"tune"}),"ตัวกรองขั้นสูง",Ht>0&&n.jsx("span",{className:"min-w-5 h-5 inline-flex items-center justify-center rounded-full bg-primary text-white text-[10px] px-1.5",children:Ht})]}),n.jsxs("button",{onClick:is,className:"btn-primary-modern",children:[n.jsx("span",{className:"material-symbols-outlined text-base",children:"person_add"}),"เพิ่มข้อมูลลูกหนี้"]})]})]})}),n.jsxs("div",{className:"px-5 md:px-6 py-4 border-b border-blue-100 bg-white",children:[n.jsxs("div",{className:"flex flex-col xl:flex-row gap-4",children:[n.jsx("div",{className:"flex-1",children:n.jsxs("div",{className:"relative",children:[n.jsx("span",{className:"absolute inset-y-0 left-0 w-11 grid place-items-center text-indigo-300 pointer-events-none",children:n.jsx("span",{className:"material-symbols-outlined text-[22px]",children:"manage_search"})}),n.jsx("input",{value:D,onChange:L=>B(L.target.value),onKeyDown:L=>{L.key==="Enter"&&It(1)},className:"input-modern",placeholder:"ค้นหาเลขที่บัญชี / ชื่อ - นามสกุล",type:"text",autoComplete:"off"})]})}),n.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[n.jsxs("button",{onClick:()=>It(1),className:"btn-primary-modern",children:[n.jsx("span",{className:"material-symbols-outlined text-base",children:"search"}),"ค้นหา"]}),n.jsxs("button",{onClick:Wt,className:"btn-secondary-modern",children:[n.jsx("span",{className:"material-symbols-outlined text-base",children:"restart_alt"}),"ล้างค่า"]}),(v==="admin"||v==="user")&&n.jsxs("button",{onClick:rs,disabled:xn,className:"btn-secondary-modern",title:"รีเฟรชแคชและโหลดข้อมูลใหม่",children:[n.jsx("span",{className:"material-symbols-outlined text-base",children:"refresh"}),xn?"กำลังรีเฟรช":"รีเฟรช"]}),n.jsxs("div",{className:"per-page-wrap",onClick:L=>L.stopPropagation(),children:[n.jsxs("button",{type:"button",className:`per-page-trigger ${he?"open":""}`,onClick:()=>de(L=>!L),"aria-haspopup":"listbox","aria-expanded":he,children:[n.jsxs("span",{children:[pe," รายการ"]}),n.jsx("span",{className:"material-symbols-outlined text-[18px] text-slate-400 transition-transform",children:he?"expand_less":"expand_more"})]}),he&&n.jsx("div",{className:"per-page-menu",role:"listbox","aria-label":"จำนวนรายการต่อหน้า",children:[10,25,50].map(L=>{const le=pe===L;return n.jsxs("button",{type:"button",role:"option","aria-selected":le,className:`per-page-option ${le?"active":""}`,onClick:()=>{ie(L),de(!1)},children:[n.jsxs("span",{children:[L," รายการ"]}),le&&n.jsx("span",{className:"material-symbols-outlined text-[16px]",children:"check"})]},L)})})]})]})]}),n.jsx("div",{className:"mt-4 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3",children:n.jsxs("div",{className:"flex items-center gap-1.5 flex-wrap",children:[n.jsx("button",{onClick:()=>Dt(""),className:`case-tab ${z===""?"active-tab":"inactive-tab"}`,children:"ทั้งหมด"}),vc.map(L=>n.jsx("button",{onClick:()=>Dt(L),className:`case-tab ${z===L?"active-tab":"inactive-tab"}`,children:L},L))]})})]}),n.jsx(Ff,{rows:E,role:v,loading:H,error:se,expandedAccount:be,onToggleExpand:L=>ke(be===L?"":L),onCopy:ss,onSort:pl,onDelete:j,returnTo:fl()}),n.jsxs("div",{className:"px-6 py-4 bg-gradient-to-r from-blue-50/60 via-white to-indigo-50/60 border-t border-blue-100 flex flex-col md:flex-row items-center justify-between gap-4",children:[n.jsxs("div",{className:"flex items-center gap-2 text-[11px] text-slate-400",children:[n.jsx("span",{className:"material-symbols-outlined text-sm text-blue-300",children:"database"}),n.jsx("span",{children:"รายการข้อมูลลูกค้า"})]}),n.jsx(Mf,{page:ve,totalPages:wr,onPage:It}),n.jsx("div",{className:"text-[10px] text-indigo-300 uppercase tracking-widest font-bold",children:xe?`แสดง ${ns}-${ls} จาก ${xe} รายการ`:"แสดง 0 รายการ"})]})]})]})]}),il&&n.jsxs("div",{className:"copy-toast show",children:[n.jsx("span",{className:"material-symbols-outlined text-[16px] text-emerald-500",children:"check_circle"}),"คัดลอกเลขที่บัญชีแล้ว"]}),Vt&&n.jsx(Vf,{}),O&&n.jsx($f,{draft:Q,setDraft:Y,onApply:()=>{W(Q),T(!1)},onReset:()=>{W(xr()),Y(xr()),T(!1)},onClose:()=>T(!1)}),es&&n.jsx(Uf,{dateFrom:cl,dateTo:Bn,setDateFrom:ts,setDateTo:Rn,onSubmit:as,onClose:()=>dl(!1)}),ee&&n.jsx(Hf,{form:te,setForm:ue,fieldErrors:Ln,error:we,onSubmit:os,onClose:()=>X(!1)}),ce&&n.jsx(Wf,{form:te,saving:Xl,onBack:()=>{re(!1),X(!0)},onSubmit:hl}),p&&n.jsx(Qf,{account:p,onClose:()=>j(""),onConfirm:ds})]})}function Bf({role:i,displayName:d}){const u={user:"User",admin:"Admin",superadmin:"Super Admin"};return n.jsxs("nav",{className:"fixed top-0 w-full z-50 bg-white border-b border-blue-100 flex justify-between items-center px-6 md:px-8 h-16 shadow-sm",children:[n.jsx("div",{className:"flex items-center gap-8 min-w-0",children:n.jsxs("span",{className:"text-xl tracking-tight text-primary font-headline flex items-center font-bold min-w-0",children:[n.jsx("div",{className:"w-10 h-10 bg-primary rounded-[10px] flex items-center justify-center shadow-lg shadow-indigo-200 mr-3 shrink-0",children:n.jsx("span",{className:"material-symbols-outlined text-white text-2xl font-normal",style:{fontVariationSettings:'"FILL" 1'},children:"shield"})}),n.jsx("span",{className:"truncate",children:"LQD Tracking Management System"})]})}),n.jsx("div",{className:"flex items-center gap-4",children:n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsxs("div",{className:"text-right hidden sm:block",children:[n.jsx("p",{className:"text-[10px] text-indigo-400 uppercase tracking-widest leading-none mb-1 font-bold",children:"System Role"}),n.jsx("p",{className:"text-xs text-indigo-900 font-semibold",children:u[i]||"-"})]}),n.jsx("div",{className:"w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold border border-blue-100 shrink-0",children:n.jsx("span",{children:(d||i||"-").charAt(0).toUpperCase()})})]})})]})}function Rf({role:i,activePage:d,onLogout:u}){const v=(C,P=!1)=>`${P?"hidden ":""}group flex items-center gap-3 px-3.5 py-3 rounded-[10px] transition-all mb-1 ${d===C?"bg-primary text-white shadow-md shadow-indigo-100":"bg-transparent text-slate-600 hover:bg-blue-50 hover:text-primary font-medium"}`,y=C=>`material-symbols-outlined font-normal transition-colors ${d!==C?"text-slate-400 group-hover:text-primary":""}`,E=i==="superadmin";return n.jsxs("aside",{className:"fixed left-0 top-0 h-full w-56 z-40 bg-white border-r border-blue-100 flex-col p-3 gap-2 pt-20 hidden md:flex",children:[n.jsxs("div",{className:"px-3.5 py-4 mb-4 bg-blue-50/50 rounded-[12px] border border-blue-50",children:[n.jsx("h2",{className:"font-headline text-primary text-base font-bold",children:"LQD Debt Overview"}),n.jsxs("p",{className:"text-[10px] text-indigo-400 uppercase tracking-widest font-bold",children:[i||"-"," Terminal"]})]}),n.jsxs("nav",{className:"flex-1 space-y-1",children:[i==="superadmin"&&n.jsxs("a",{href:"/users",className:v("users"),children:[n.jsx("span",{className:y("users"),children:"manage_accounts"}),n.jsx("span",{className:"text-sm",children:"User Management"})]}),i==="superadmin"&&n.jsxs("a",{href:"/password-policy",className:v("password-policy"),children:[n.jsx("span",{className:y("password-policy"),children:"admin_panel_settings"}),n.jsx("span",{className:"text-sm",children:"Password Policy"})]}),n.jsxs("a",{href:"/customer-list",className:v("customer-list",E),children:[n.jsx("span",{className:y("customer-list"),style:d==="customer-list"?{fontVariationSettings:'"FILL" 1'}:void 0,children:"groups"}),n.jsx("span",{className:"text-sm font-semibold",children:"Customer List"})]}),n.jsxs("a",{href:"/payment-record",className:v("payment-record",E),children:[n.jsx("span",{className:y("payment-record"),children:"history"}),n.jsx("span",{className:"text-sm",children:"Payment Record"})]}),i==="admin"&&n.jsxs("a",{href:"/data-import",className:v("data-import"),children:[n.jsx("span",{className:y("data-import"),children:"upload_file"}),n.jsx("span",{className:"text-sm",children:"Data Import Center"})]}),i==="admin"&&n.jsxs("a",{href:"/report",className:v("report"),children:[n.jsx("span",{className:y("report"),children:"assessment"}),n.jsx("span",{className:"text-sm",children:"Report Center"})]})]}),n.jsx("div",{className:"mt-auto pt-4 border-t border-blue-50",children:n.jsxs("button",{onClick:u,className:"w-full flex items-center gap-3 px-3.5 py-3 text-accent-coral text-sm hover:bg-red-50 rounded-[10px] transition-all font-bold cursor-pointer",children:[n.jsx("span",{className:"material-symbols-outlined font-normal",children:"logout"}),n.jsx("span",{children:"Log out"})]})})]})}function fc({children:i,tooltip:d,className:u="",measureSelector:v=""}){const y=k.useRef(null),[E,C]=k.useState(!1),P=k.useCallback(()=>{const D=y.current;return D?v&&D.querySelector(v)||D:null},[v]),S=k.useCallback(()=>{const D=P();if(!D)return;const B=D.scrollWidth>D.clientWidth+1,z=D.scrollHeight>D.clientHeight+1;C(B||z)},[P]);return k.useEffect(()=>{S();const D=y.current,B=P();if(!D&&!B||typeof ResizeObserver>"u")return window.addEventListener("resize",S),()=>window.removeEventListener("resize",S);const z=new ResizeObserver(S);return D&&z.observe(D),B&&B!==D&&z.observe(B),window.addEventListener("resize",S),()=>{z.disconnect(),window.removeEventListener("resize",S)}},[S,P,i,d]),n.jsxs("span",{className:`cell-tooltip-wrap ${u}`,children:[n.jsx("span",{ref:y,className:"tooltip-ellipsis",children:i}),E&&d&&n.jsx("span",{className:"cell-tooltip",role:"tooltip",children:d})]})}function Ff(i){const{rows:d,role:u,loading:v,error:y,expandedAccount:E,returnTo:C,onToggleExpand:P,onCopy:S,onSort:D,onDelete:B}=i,z=W=>{window.location.href=`/payment-record?account=${encodeURIComponent(W)}&from=customer-list&return_to=${encodeURIComponent(C)}`},G=W=>{window.location.href=`/customer-detail?account=${encodeURIComponent(W)}&from=customer-list&return_to=${encodeURIComponent(C)}`},V=W=>{window.location.href=`/customer-detail?account=${encodeURIComponent(W)}&open=enforcement&from=customer-list&return_to=${encodeURIComponent(C)}`};return n.jsx("div",{className:"table-shell",children:n.jsxs("table",{className:"mock-table text-left border-separate",children:[n.jsxs("colgroup",{children:[n.jsx("col",{style:{width:"13.5%"}}),n.jsx("col",{style:{width:"16%"}}),n.jsx("col",{style:{width:"10%"}}),n.jsx("col",{style:{width:"13%"}}),n.jsx("col",{style:{width:"11%"}}),n.jsx("col",{style:{width:"11.5%"}}),n.jsx("col",{style:{width:"9.5%"}}),n.jsx("col",{style:{width:"15.5%"}})]}),n.jsx("thead",{children:n.jsxs("tr",{children:[n.jsx("th",{className:"px-5 py-4 text-center",children:n.jsxs("button",{type:"button",onClick:()=>D("account_no"),className:"inline-flex items-center justify-center gap-1 hover:text-primary transition-colors",children:[n.jsx("span",{children:"เลขที่บัญชี"}),n.jsx("span",{className:"material-symbols-outlined text-[15px] text-slate-300",children:"unfold_more"})]})}),n.jsx("th",{className:"px-4 py-4 text-center",children:"ชื่อ-นามสกุล"}),n.jsx("th",{className:"px-3 py-4 text-center",children:n.jsxs("button",{type:"button",onClick:()=>D("filing_date"),className:"inline-flex items-center justify-center gap-1 hover:text-primary transition-colors",children:[n.jsx("span",{children:"วันที่ยื่นฟ้อง"}),n.jsx("span",{className:"material-symbols-outlined text-[15px] text-slate-300",children:"unfold_more"})]})}),n.jsx("th",{className:"px-3 py-4 text-center",children:"ยอดหนี้คงเหลือ"}),n.jsx("th",{className:"px-3 py-4 text-center",children:"สถานะคดี"}),n.jsx("th",{className:"px-3 py-4 text-center",children:"สถานะการชำระเงิน"}),n.jsx("th",{className:"px-3 py-4 text-center",children:"บันทึกหมาย"}),n.jsx("th",{className:"px-4 py-4 text-center",children:"การดำเนินการ"})]})}),n.jsxs("tbody",{className:v&&d.length>0?"is-loading":"",children:[v&&!d.length&&n.jsx("tr",{children:n.jsx("td",{colSpan:8,className:"px-6 py-8 text-center text-indigo-300 text-sm",children:"กำลังโหลดข้อมูล..."})}),y&&n.jsx("tr",{children:n.jsx("td",{colSpan:8,className:"px-6 py-12 text-center text-red-500 text-sm font-semibold",children:y})}),!v&&!y&&!d.length&&n.jsx("tr",{children:n.jsx("td",{colSpan:8,className:"px-6 py-14 text-center",children:n.jsxs("div",{className:"flex flex-col items-center justify-center gap-3",children:[n.jsx("div",{className:"w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-400",children:n.jsx("span",{className:"material-symbols-outlined text-[28px]",children:"manage_search"})}),n.jsxs("div",{children:[n.jsx("p",{className:"text-sm font-bold text-slate-500",children:"ไม่พบข้อมูล"}),n.jsx("p",{className:"text-xs text-slate-400 mt-0.5",children:"ลองเปลี่ยนคำค้นหา หรือเลือกสถานะอื่นอีกครั้ง"})]})]})})}),!y&&d.map(W=>{const Q=xf(W),Y=E===Q,ve=fn(W),_e=jc(W),pe=bc(W),ie=jf(W),he=wt(wf(W),!0),de=`${ie} ${he}`;return n.jsxs(n.Fragment,{children:[n.jsxs("tr",{className:"main-row",children:[n.jsx("td",{className:"px-3.5 py-3 text-center",children:n.jsxs("div",{className:"account-cell-wrap",children:[n.jsx("span",{className:"account-pill",children:yi(Q)}),n.jsx("button",{type:"button",title:"คัดลอกเลขที่บัญชี",onClick:()=>S(Q),className:"copy-account-btn",children:n.jsx("span",{className:"material-symbols-outlined text-[12px]",children:"content_copy"})})]})}),n.jsx("td",{className:"px-4 py-3",children:n.jsxs("div",{className:"flex items-center gap-3 min-w-0",children:[n.jsx("div",{className:"w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 flex items-center justify-center text-primary text-[11px] font-extrabold shadow-sm flex-shrink-0",children:vf(W.name)}),n.jsx("div",{className:"min-w-0 w-full",children:n.jsx(fc,{tooltip:W.name||"",className:"customer-name-tooltip",children:W.name||"-"})})]})}),n.jsx("td",{className:"px-3 py-3 text-center",children:n.jsx("span",{className:"text-sm font-semibold text-slate-500",children:Nt(W.filing_date)})}),n.jsx("td",{className:"px-3 py-3 text-right",children:n.jsxs("div",{className:"amount-cell",children:[n.jsx("p",{className:"amount-main text-[13px] font-extrabold text-slate-800",children:wt(pe,!0)}),n.jsx("div",{className:"amount-sub",children:n.jsxs(fc,{tooltip:de,className:"amount-sub-tooltip",measureSelector:".amount-sub-label",children:[n.jsx("span",{className:"amount-sub-label",children:ie}),n.jsx("span",{className:"amount-sub-value",children:he})]})})]})}),n.jsx("td",{className:"px-3 py-3 text-center",children:n.jsx(yr,{text:ve,tone:If(ve)})}),n.jsx("td",{className:"px-3 py-3 text-center",children:n.jsx(yr,{text:_e,tone:Df(_e)})}),n.jsx("td",{className:"px-3 py-3 text-center",children:W.can_record_enforcement?n.jsx("button",{type:"button",onClick:()=>V(Q),title:"ไปหน้ารายละเอียดเพื่อบันทึกหมายบังคับคดี",children:n.jsx(yr,{text:"พร้อมบันทึกหมาย",tone:"amber"})}):W.has_enforcement_order||W.enforcement_order_no||W.enforcement_recorded_at?n.jsx(yr,{text:"บันทึกแล้ว",tone:"red"}):n.jsx("span",{className:"text-[11px] font-semibold text-slate-300",children:"-"})}),n.jsx("td",{className:"px-4 py-3 text-center",children:n.jsxs("div",{className:"flex justify-center gap-1",children:[n.jsx("button",{title:"ขยายข้อมูล",onClick:()=>P(Q),className:"action-icon-btn",children:n.jsx("span",{className:"material-symbols-outlined text-lg",children:Y?"expand_less":"expand_more"})}),n.jsx("button",{title:"บันทึกการชำระเงิน",onClick:()=>z(Q),className:"action-icon-btn",children:n.jsx("span",{className:"material-symbols-outlined text-lg",children:"payments"})}),n.jsx("button",{title:"ดูรายละเอียด",onClick:()=>G(Q),className:"action-icon-btn",children:n.jsx("span",{className:"material-symbols-outlined text-lg",children:"search"})}),u==="admin"&&n.jsx("button",{title:"ลบข้อมูล",onClick:()=>B(Q),className:"action-icon-btn hover:text-accent-coral hover:bg-red-50 hover:border-red-200",children:n.jsx("span",{className:"material-symbols-outlined text-lg",children:"delete"})})]})})]},Q),Y&&n.jsx(Pf,{row:W},`${Q}-quick`)]})})]})]})})}function Pf({row:i}){const d=bc(i);return n.jsx("tr",{className:"expanded-row",children:n.jsx("td",{colSpan:8,className:"px-6 py-4",children:n.jsx("div",{className:"quick-view",children:n.jsxs("div",{className:"grid grid-cols-1 xl:grid-cols-2 divide-y xl:divide-y-0 xl:divide-x divide-blue-100",children:[n.jsx(vr,{icon:"balance",title:"ข้อมูลคำพิพากษา",items:[["วันที่มีคำพิพากษา",Nt(i.judgment_date)],["ยอดหนี้ตามคำพิพากษา",wt(i.total_debt)],["เงินต้นตามคำพิพากษา",wt(i.principal)],["อัตราดอกเบี้ย",dc(i.interest_rate)],["ค่าธรรมเนียมศาล",wt(i.court_fee)],["ค่าทนายความ",wt(i.lawyer_fee)]]}),n.jsx(vr,{icon:"event_repeat",title:"แผนการชำระเงิน",items:[["วันครบกำหนดงวดแรก",Nt(i.first_due_date)],["วันครบกำหนดงวดสุดท้าย",Nt(i.last_due_date)],["จำนวนงวด",i.installment_count?`${i.installment_count} งวด`:"-"],["ยอดชำระงวดปัจจุบัน",wt(Nf(i))],["อัตราดอกเบี้ยเมื่อผิดนัดชำระ",dc(i.default_interest_rate)],["วันครบกำหนดถัดไป","-"]]}),n.jsx(vr,{icon:"assignment",title:"ข้อมูลการบังคับคดี",items:[["คดีหมายเลขแดงที่",i.red_case_no||"-"],["วันที่ของหมายบังคับคดี",Nt(i.enforcement_judgment_date)],["วันที่บันทึกข้อมูล",yf(i.enforcement_recorded_at)],["สถานะการบันทึก",i.enforcement_order_no||i.enforcement_recorded_at?"บันทึกแล้ว":i.can_record_enforcement?"พร้อมบันทึกหมาย":"-"]]}),n.jsx(vr,{icon:"payments",title:"ข้อมูลการชำระเงิน",items:[["วันที่ชำระล่าสุด",Nt(bf(i))],["จำนวนเงินที่ชำระล่าสุด",cc(i)?wt(cc(i)):"-"],["ยอดหนี้คงเหลือ",wt(d)],["จำนวนวันที่ค้างชำระ",uc(i)>0?`${uc(i)} วัน`:"-"],["สถานะการชำระเงิน",jc(i)],["สถานะคดี",fn(i)]]})]})})})})}function vr({icon:i,title:d,items:u}){return n.jsxs("div",{className:"quick-section",children:[n.jsxs("div",{className:"quick-section-header",children:[n.jsx("span",{className:"material-symbols-outlined text-[17px] text-indigo-500",children:i}),n.jsx("p",{className:"quick-section-title",children:d})]}),n.jsx("div",{className:"quick-grid",children:u.map(([v,y])=>n.jsxs("div",{className:"quick-kv",children:[n.jsx("p",{className:"quick-kv-label",children:v}),n.jsx("p",{className:"quick-kv-value",children:y||"-"})]},v))})]})}function Mf({page:i,totalPages:d,onPage:u}){const v=Array.from({length:d},(y,E)=>E+1).filter(y=>y===1||y===d||y>=i-1&&y<=i+1);return n.jsxs("div",{className:"flex items-center gap-1",children:[n.jsx("button",{onClick:()=>u(i-1),disabled:i===1,className:"p-1.5 rounded-lg hover:bg-white border border-transparent hover:border-blue-100 transition-all disabled:opacity-30",children:n.jsx("span",{className:"material-symbols-outlined text-indigo-300 text-base",children:"chevron_left"})}),n.jsx("div",{className:"flex gap-1 px-2",children:v.map((y,E)=>n.jsxs("span",{className:"contents",children:[E>0&&y-v[E-1]>1&&n.jsx("span",{className:"w-7 h-7 flex items-center justify-center text-[10px] text-indigo-200",children:"..."}),n.jsx("button",{onClick:()=>u(y),className:`w-7 h-7 rounded-lg text-[10px] transition-all ${y===i?"bg-primary text-white shadow-sm":"hover:bg-white text-indigo-400"}`,children:y})]},y))}),n.jsx("button",{onClick:()=>u(i+1),disabled:i===d,className:"p-1.5 rounded-lg hover:bg-white border border-transparent hover:border-blue-100 transition-all disabled:opacity-30",children:n.jsx("span",{className:"material-symbols-outlined text-indigo-300 text-base",children:"chevron_right"})})]})}function $f({draft:i,setDraft:d,onApply:u,onReset:v,onClose:y}){const[E,C]=k.useState(!1),P=k.useRef(!1);k.useEffect(()=>{const B=window.requestAnimationFrame(()=>C(!0));return()=>window.cancelAnimationFrame(B)},[]);const S=(B,z)=>{const G=i[B];d({...i,[B]:G.includes(z)?G.filter(V=>V!==z):[...G,z]})},D=B=>{P.current||(P.current=!0,C(!1),window.setTimeout(B,220))};return n.jsxs(n.Fragment,{children:[n.jsx("div",{onClick:()=>D(y),className:`drawer-backdrop ${E?"open":""}`}),n.jsx("aside",{className:`drawer-panel ${E?"open":""}`,children:n.jsxs("div",{className:"h-full flex flex-col",children:[n.jsx("div",{className:"px-6 py-5 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-white",children:n.jsxs("div",{className:"flex items-start justify-between gap-4",children:[n.jsxs("div",{children:[n.jsx("p",{className:"text-[11px] text-indigo-400 uppercase tracking-widest font-bold",children:"ตัวกรองขั้นสูง"}),n.jsx("h3",{className:"text-xl font-extrabold text-slate-800 mt-1",children:"ตัวกรองสำหรับงานติดตาม"})]}),n.jsx("button",{onClick:()=>D(y),className:"w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all",children:n.jsx("span",{className:"material-symbols-outlined text-[20px]",children:"close"})})]})}),n.jsxs("div",{className:"flex-1 overflow-y-auto p-6 space-y-5",children:[n.jsxs("section",{className:"filter-section",children:[n.jsx("p",{className:"filter-title",children:"สถานะคดี"}),n.jsx("div",{className:"filter-check-grid",children:vc.map(B=>n.jsxs("label",{className:`filter-check-row ${i.caseStatuses.includes(B)?"active":""}`,children:[n.jsxs("span",{className:"filter-check-content",children:[n.jsx("span",{className:"filter-check-icon",children:n.jsx("span",{className:"material-symbols-outlined text-[19px]",children:uf[B]||"label"})}),n.jsx("span",{className:"filter-check-text",children:n.jsx("span",{className:"filter-check-label",children:B})})]}),n.jsx("input",{checked:i.caseStatuses.includes(B),onChange:()=>S("caseStatuses",B),type:"checkbox",className:"filter-check-input"})]},B))})]}),n.jsxs("section",{className:"filter-section",children:[n.jsx("p",{className:"filter-title",children:"สถานะการชำระเงิน"}),n.jsx("div",{className:"filter-check-grid",children:cf.map(B=>n.jsxs("label",{className:`filter-check-row ${i.paymentStatuses.includes(B)?"active":""}`,children:[n.jsxs("span",{className:"filter-check-content",children:[n.jsx("span",{className:"filter-check-icon",children:n.jsx("span",{className:"material-symbols-outlined text-[19px]",children:mf[B]||"payments"})}),n.jsx("span",{className:"filter-check-text",children:n.jsx("span",{className:"filter-check-label",children:B})})]}),n.jsx("input",{checked:i.paymentStatuses.includes(B),onChange:()=>S("paymentStatuses",B),type:"checkbox",className:"filter-check-input"})]},B))})]}),n.jsx("section",{className:"filter-section",children:n.jsx(zf,{draft:i,setDraft:d})}),n.jsxs("section",{className:"filter-section",children:[n.jsx("p",{className:"filter-title",children:"ช่วงยอดหนี้คงเหลือ"}),n.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[n.jsx("input",{value:i.outstandingMin,onChange:B=>d({...i,outstandingMin:B.target.value}),className:"filter-input",type:"number",min:"0",step:"10000",placeholder:"ต่ำสุด"}),n.jsx("input",{value:i.outstandingMax,onChange:B=>d({...i,outstandingMax:B.target.value}),className:"filter-input",type:"number",min:"0",step:"10000",placeholder:"สูงสุด"})]})]})]}),n.jsxs("div",{className:"p-6 border-t border-blue-100 bg-slate-50/70 flex gap-2",children:[n.jsx("button",{onClick:()=>D(v),className:"btn-secondary-modern flex-1",children:"ล้างตัวกรอง"}),n.jsx("button",{onClick:()=>D(u),className:"btn-primary-modern flex-1",children:"ใช้ตัวกรอง"})]})]})})]})}function zf({draft:i,setDraft:d}){const u=ci.find(v=>v.value===i.dateField)||ci[0];return n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"mb-4 space-y-3",children:[n.jsxs("div",{className:"flex items-start justify-between gap-3",children:[n.jsxs("div",{children:[n.jsx("p",{className:"filter-title mb-1",children:"ช่วงวันที่"}),n.jsx("p",{className:"text-[11px] font-semibold leading-relaxed text-slate-400",children:"เลือกขอบเขตวันที่ที่จะใช้ค้นหา"})]}),n.jsx("span",{className:"inline-flex min-h-8 items-center rounded-xl border border-indigo-100 bg-indigo-50 px-3 text-[11px] font-extrabold text-primary",children:u.shortLabel})]}),n.jsx("div",{className:"filter-date-scope-grid",role:"radiogroup","aria-label":"เลือกประเภทวันที่",children:ci.map(v=>{const y=v.value===u.value;return n.jsxs("button",{type:"button",onClick:()=>d({...i,dateField:v.value}),className:`filter-date-scope-option ${y?"active":""}`,role:"radio","aria-checked":y,children:[n.jsx("span",{className:"filter-date-scope-icon",children:n.jsx("span",{className:"material-symbols-outlined text-[17px]",children:v.icon})}),n.jsxs("span",{className:"min-w-0 flex-1",children:[n.jsx("span",{className:"filter-date-scope-label",children:v.label}),n.jsx("span",{className:"filter-date-scope-desc",children:v.description})]}),n.jsx("span",{className:`filter-date-scope-check ${y?"active":""}`,children:n.jsx("span",{className:"material-symbols-outlined text-[15px]",children:"check"})})]},v.value)})})]}),n.jsx(Of,{dateFrom:i.dateFrom,dateTo:i.dateTo,onChange:(v,y)=>d({...i,[v]:y})})]})}function Of({dateFrom:i,dateTo:d,onChange:u}){const v=oc(i||d)||jr(),[y,E]=k.useState(""),[C,P]=k.useState(v.getFullYear()),[S,D]=k.useState(v.getMonth()),[B,z]=k.useState(!1),[G,V]=k.useState({}),W=k.useRef(null),Q=k.useRef(null),Y=k.useRef(null),ve=y==="dateTo"?d:i,_e=jr(),pe=k.useCallback(U=>{const q=U==="dateTo"?Y.current:Q.current;if(!q)return;const ge=q.getBoundingClientRect(),Ne=288,je=window.innerHeight-ge.bottom-8,be=ge.top-8;let ke=ge.left;ke+Ne>window.innerWidth-8&&(ke=window.innerWidth-Ne-8),ke<8&&(ke=8);const H={left:ke,width:Ne,maxHeight:Math.max(180,je>=340?je:be>=340?be:window.innerHeight-16)};je>=340?H.top=ge.bottom+6:be>=340?H.bottom=window.innerHeight-ge.top+6:H.top=8,V(H)},[]),ie=U=>{const q=oc(U==="dateTo"?d:i)||jr();P(q.getFullYear()),D(q.getMonth()),z(!1),E(U),window.requestAnimationFrame(()=>pe(U))};k.useEffect(()=>{if(!y)return;const U=ge=>{var je,be,ke;const Ne=ge.target;(je=W.current)!=null&&je.contains(Ne)||(be=Q.current)!=null&&be.contains(Ne)||(ke=Y.current)!=null&&ke.contains(Ne)||E("")},q=()=>pe(y);return document.addEventListener("mousedown",U),window.addEventListener("resize",q),window.addEventListener("scroll",q,!0),()=>{document.removeEventListener("mousedown",U),window.removeEventListener("resize",q),window.removeEventListener("scroll",q,!0)}},[y,pe]);const he=U=>{y&&(u(y,U),E(""))},de=U=>{const q=S+U;q>11?(D(0),P(ge=>ge+1)):q<0?(D(11),P(ge=>ge-1)):D(q)},xe=y&&n.jsxs("div",{ref:W,style:G,className:"dp-popup",children:[n.jsxs("div",{className:"dp-header",children:[n.jsx("button",{type:"button",onClick:()=>de(-1),className:"dp-nav-btn","aria-label":"เดือนก่อนหน้า",children:n.jsx("span",{className:"material-symbols-outlined text-[18px]",children:"chevron_left"})}),n.jsxs("button",{type:"button",onClick:()=>z(U=>!U),className:"dp-month-year",children:[ff[S]," ",C+543]}),n.jsx("button",{type:"button",onClick:()=>de(1),className:"dp-nav-btn","aria-label":"เดือนถัดไป",children:n.jsx("span",{className:"material-symbols-outlined text-[18px]",children:"chevron_right"})})]}),B?n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"dp-year-header",children:[n.jsx("button",{type:"button",onClick:()=>P(U=>U-1),className:"dp-nav-btn","aria-label":"ปีก่อนหน้า",children:n.jsx("span",{className:"material-symbols-outlined text-[18px]",children:"chevron_left"})}),n.jsxs("span",{className:"text-sm font-bold text-slate-700",children:["พ.ศ. ",C+543]}),n.jsx("button",{type:"button",onClick:()=>P(U=>U+1),className:"dp-nav-btn","aria-label":"ปีถัดไป",children:n.jsx("span",{className:"material-symbols-outlined text-[18px]",children:"chevron_right"})})]}),n.jsx("div",{className:"dp-my-grid",children:pf.map((U,q)=>n.jsx("button",{type:"button",onClick:()=>{D(q),z(!1)},className:`dp-my-item ${q===S?"active":""}`,children:U},U))})]}):n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"dp-weekdays",children:hf.map(U=>n.jsx("span",{className:"dp-weekday",children:U},U))}),n.jsx("div",{className:"dp-days",children:Af(C,S).map(U=>{const q=fi(U.date),ge=U.currentMonth&&q===ve,Ne=U.currentMonth&&U.date.getTime()===_e.getTime(),je=`dp-day ${U.currentMonth?"":"dp-day-other"} ${ge?"dp-day-selected":""} ${Ne&&!ge?"dp-day-today":""}`;return U.currentMonth?n.jsx("button",{type:"button",onClick:()=>he(q),className:je,children:U.date.getDate()},q):n.jsx("span",{className:je,children:U.date.getDate()},q)})})]}),n.jsxs("div",{className:"dp-footer",children:[n.jsx("button",{type:"button",onClick:()=>{y&&u(y,""),E("")},className:"dp-btn-clear",children:"ล้างค่า"}),n.jsx("button",{type:"button",onClick:()=>he(fi(_e)),className:"dp-btn-today",children:"วันนี้"})]})]});return n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[n.jsxs("button",{ref:Q,type:"button",onClick:()=>ie("dateFrom"),className:`filter-date-display relative ${y==="dateFrom"?"open":""}`,children:[n.jsx("span",{className:i?"text-slate-700":"text-slate-400",children:i?Nt(i):"เริ่มต้น"}),n.jsx("span",{className:"material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[17px] text-slate-400 pointer-events-none",children:"calendar_today"})]}),n.jsxs("button",{ref:Y,type:"button",onClick:()=>ie("dateTo"),className:`filter-date-display relative ${y==="dateTo"?"open":""}`,children:[n.jsx("span",{className:d?"text-slate-700":"text-slate-400",children:d?Nt(d):"สิ้นสุด"}),n.jsx("span",{className:"material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[17px] text-slate-400 pointer-events-none",children:"calendar_today"})]})]}),xe?yc.createPortal(xe,document.body):null]})}function Af(i,d){const u=new Date(i,d,1),v=new Date(i,d+1,0),y=[];for(let E=0;E<u.getDay();E+=1)y.push({date:new Date(i,d,E-u.getDay()+1),currentMonth:!1});for(let E=1;E<=v.getDate();E+=1)y.push({date:new Date(i,d,E),currentMonth:!0});for(;y.length<42;)y.push({date:new Date(i,d+1,y.length-u.getDay()-v.getDate()+1),currentMonth:!1});return y}function Vf(){return n.jsx(ql,{children:n.jsxs("div",{className:"p-7 text-center",children:[n.jsx("div",{className:"mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-primary",children:n.jsxs("svg",{className:"h-8 w-8 animate-spin",fill:"none",viewBox:"0 0 24 24",children:[n.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),n.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8v8z"})]})}),n.jsx("h3",{className:"text-lg font-extrabold text-slate-800",children:"กำลังรีเฟรชข้อมูล"}),n.jsx("p",{className:"mt-2 text-sm leading-relaxed text-slate-500",children:"ระบบกำลังคำนวณแคชรายการลูกค้าใหม่ กรุณารอสักครู่"})]})})}function Uf(i){return n.jsx(ql,{onClose:i.onClose,children:d=>n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"px-6 py-5 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-white",children:n.jsxs("div",{className:"flex items-start justify-between gap-4",children:[n.jsxs("div",{children:[n.jsx("p",{className:"text-[11px] text-indigo-400 uppercase tracking-widest font-bold",children:"Raw Data Export"}),n.jsx("h3",{className:"text-xl font-extrabold text-slate-800 mt-1",children:"ดาวน์โหลดข้อมูลดิบ"}),n.jsx("p",{className:"mt-1 text-xs text-slate-500 leading-relaxed",children:"เลือกช่วงวันที่ที่ Maker ทำรายการในระบบ"})]}),n.jsx("button",{onClick:d,className:"modal-close",children:n.jsx("span",{className:"material-symbols-outlined text-[20px]",children:"close"})})]})}),n.jsxs("div",{className:"p-6 space-y-4",children:[n.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[n.jsxs("label",{className:"add-label",children:["วันที่เริ่มต้น",n.jsx("input",{value:i.dateFrom,onChange:u=>i.setDateFrom(u.target.value),type:"date",className:"filter-input mt-2"})]}),n.jsxs("label",{className:"add-label",children:["วันที่สิ้นสุด",n.jsx("input",{value:i.dateTo,onChange:u=>i.setDateTo(u.target.value),type:"date",className:"filter-input mt-2"})]})]}),n.jsxs("div",{className:"flex justify-end gap-2",children:[n.jsx("button",{onClick:d,className:"btn-secondary-modern",children:"ยกเลิก"}),n.jsxs("button",{onClick:i.onSubmit,className:"btn-primary-modern",children:[n.jsx("span",{className:"material-symbols-outlined text-base",children:"download"}),"ดาวน์โหลด"]})]})]})]})})}function Hf({form:i,setForm:d,fieldErrors:u,error:v,onSubmit:y,onClose:E}){const C=(S,D)=>d({...i,[S]:D}),P=S=>C("filing_capital",Nc(S));return n.jsx(ql,{onClose:E,large:!0,children:S=>n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"modal-header",children:n.jsxs("div",{className:"flex items-start justify-between gap-4",children:[n.jsxs("div",{className:"flex items-start gap-3 min-w-0",children:[n.jsx("div",{className:"modal-icon",children:n.jsx("span",{className:"material-symbols-outlined text-[21px]",style:{fontVariationSettings:'"FILL" 1'},children:"person_add"})}),n.jsxs("div",{className:"min-w-0",children:[n.jsx("h3",{className:"text-[18px] font-extrabold text-slate-800 tracking-tight",children:"เพิ่มข้อมูลลูกหนี้ใหม่"}),n.jsx("p",{className:"text-[12px] text-slate-500 mt-0.5 leading-relaxed",children:"กรอกข้อมูลตั้งต้นสำหรับเปิดรายการคดีในระบบ"})]})]}),n.jsx("button",{onClick:S,className:"modal-close",children:n.jsx("span",{className:"material-symbols-outlined text-[20px]",children:"close"})})]})}),v&&n.jsxs("div",{className:"add-error-banner",children:[n.jsx("span",{className:"material-symbols-outlined text-red-500 flex-shrink-0 text-[18px]",style:{fontVariationSettings:'"FILL" 1'},children:"error"}),n.jsxs("div",{className:"flex-1",children:[n.jsx("p",{className:"text-[12px] font-bold text-red-700 mb-0.5",children:"กรุณาตรวจสอบข้อมูลอีกครั้ง"}),n.jsx("p",{className:"text-sm text-red-700 leading-relaxed",children:v})]})]}),n.jsxs("form",{onSubmit:y,className:"modal-body",children:[n.jsxs("div",{className:"flex items-center justify-between gap-3 mb-4",children:[n.jsx("p",{className:"modal-section-title",children:"ข้อมูลลูกหนี้"}),n.jsxs("div",{className:"inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-bold text-primary",children:[n.jsx("span",{className:"material-symbols-outlined text-[15px]",children:"edit_note"}),"ข้อมูลจำเป็น"]})]}),n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-12 gap-4",children:[n.jsx(Gl,{id:ft("account_no"),label:"หมายเลขบัญชี *",value:i.account_no,onChange:D=>C("account_no",D.slice(0,12)),icon:"badge",placeholder:"กรอกหมายเลขบัญชี 12 หลัก",helper:"กรอกเลขบัญชีจำนวน 12 หลัก",error:u.account_no,maxLength:12,inputMode:"numeric",inputClassName:"pr-16",rightSlot:n.jsxs("span",{className:`absolute right-3 top-1/2 -translate-y-1/2 text-[11px] pointer-events-none font-mono ${u.account_no?"text-red-400":"text-slate-300"}`,children:[i.account_no.length,"/12"]})}),n.jsx(Gl,{id:ft("black_case_no"),label:"คดีหมายเลขดำที่ *",value:i.black_case_no,onChange:D=>C("black_case_no",D),icon:"article",placeholder:"กรอกคดีหมายเลขดำที่",helper:"เช่น ผบE1234/2568 หรือ ผบ1234/2568",error:u.black_case_no}),n.jsx(pc,{id:ft("filing_date"),label:"วันที่ยื่นฟ้อง *",value:i.filing_date,onChange:D=>C("filing_date",D),icon:"calendar_today",placeholder:"เลือกวันที่ยื่นฟ้อง",helper:"เลือกได้ถึงวันที่ปัจจุบัน",error:u.filing_date,maxDate:hi()}),n.jsx(pc,{id:ft("default_date"),label:"วันที่ผิดนัดชำระก่อนฟ้อง *",value:i.default_date,onChange:D=>C("default_date",D),icon:"calendar_today",placeholder:"เลือกวันที่ผิดนัดชำระก่อนฟ้อง",helper:"ต้องไม่เกินวันที่ยื่นฟ้อง",error:u.default_date,maxDate:i.filing_date||hi()}),n.jsx(Gl,{id:ft("filing_capital"),label:"ทุนทรัพย์ที่ฟ้อง *",value:i.filing_capital,onChange:P,icon:"payments",placeholder:"กรอกทุนทรัพย์ที่ฟ้อง",helper:"ระบบจะแสดง comma อัตโนมัติ และส่งค่าแบบไม่มี comma",error:u.filing_capital,inputMode:"decimal"}),n.jsx(Gl,{id:ft("name"),label:"ชื่อ-นามสกุล *",value:i.name,onChange:D=>C("name",D),icon:"person",placeholder:"ชื่อ-นามสกุล หรือชื่อบริษัท",helper:"ใช้ได้เฉพาะภาษาไทย ภาษาอังกฤษ เว้นวรรค จุด (.) และขีดกลาง (-)",error:u.name}),n.jsx(Gl,{id:ft("pre_filing_dpd_days"),label:"DPD ณ วันที่ก่อนส่งฟ้องศาล 1 วัน *",value:i.pre_filing_dpd_days,onChange:D=>C("pre_filing_dpd_days",D),icon:"pin",placeholder:"กรอกจำนวนวัน",helper:"กรอกจำนวนเต็มตั้งแต่ 0 ขึ้นไป",error:u.pre_filing_dpd_days,inputMode:"numeric"}),n.jsxs("div",{className:"add-field md:col-span-6",children:[n.jsx("label",{className:"add-label",htmlFor:ft("filing_note"),children:"หมายเหตุ / เงื่อนไขพิเศษเพิ่มเติม"}),n.jsx("textarea",{id:ft("filing_note"),value:i.filing_note,onChange:D=>C("filing_note",D.target.value.slice(0,100)),className:`add-input add-note-input h-[58px] min-h-[58px] resize-none ${u.filing_note?"border-red-300 bg-red-50/40 text-red-700 focus:border-red-400 focus:ring-red-100":""}`,placeholder:"กรอกหมายเหตุเพิ่มเติม (ถ้ามี)",maxLength:100,"aria-invalid":u.filing_note?"true":void 0,"aria-describedby":`${ft("filing_note")}-error`}),n.jsx("p",{id:`${ft("filing_note")}-error`,className:`add-helper !mt-1 !min-h-0 ${u.filing_note?"!text-red-500":""}`,children:u.filing_note||`${i.filing_note.length}/100 ตัวอักษร`})]})]}),n.jsxs("div",{className:"modal-footer -mx-5 md:-mx-6 -mb-5 mt-5",children:[n.jsx("p",{className:"text-[11px] text-slate-400 leading-relaxed",children:"ฟิลด์ที่มีเครื่องหมาย * จำเป็นต้องกรอก"}),n.jsxs("div",{className:"flex items-center justify-end gap-2",children:[n.jsx("button",{type:"button",onClick:S,className:"btn-secondary-modern",children:"ยกเลิก"}),n.jsxs("button",{type:"submit",className:"btn-primary-modern",children:[n.jsx("span",{className:"material-symbols-outlined text-base",children:"fact_check"}),"ตรวจสอบข้อมูล"]})]})]})]})]})})}function Gl({id:i,label:d,value:u,onChange:v,icon:y,helper:E,error:C,type:P="text",placeholder:S,inputMode:D,maxLength:B,inputClassName:z="",fieldClassName:G,rightSlot:V}){return n.jsxs("div",{className:`add-field ${G||"md:col-span-6"}`,children:[n.jsx("label",{className:"add-label",htmlFor:i,children:d}),n.jsxs("div",{className:"relative",children:[n.jsx("span",{className:`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[18px] pointer-events-none ${C?"text-red-400":"text-indigo-300"}`,children:y}),n.jsx("input",{id:i,value:u,onChange:W=>v(W.target.value),className:`add-input ${C?"border-red-300 bg-red-50/40 text-red-700 focus:border-red-400 focus:ring-red-100":""} ${z}`,type:P,placeholder:S,inputMode:D,maxLength:B,autoComplete:"off","aria-invalid":C?"true":void 0,"aria-describedby":`${i}-error`}),V]}),(C||E)&&n.jsx("p",{id:`${i}-error`,className:`add-helper ${C?"!text-red-500":""}`,children:C||E})]})}function pc({id:i,label:d,value:u,onChange:v,icon:y,helper:E,error:C,placeholder:P,maxDate:S,fieldClassName:D}){return n.jsxs("div",{className:`add-field ${D||"md:col-span-6"}`,children:[n.jsx("label",{className:"add-label",htmlFor:i,children:d}),n.jsxs("div",{className:"relative",children:[n.jsx("span",{className:`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[18px] pointer-events-none ${C?"text-red-400":"text-indigo-300"}`,children:y}),n.jsx(df,{id:i,value:u,onChange:v,placeholder:P,maxDate:S,ariaInvalid:!!C,ariaDescribedBy:`${i}-error`,className:`add-input text-left ${C?"border-red-300 bg-red-50/40 text-red-700 focus:border-red-400 focus:ring-red-100":""}`,openClassName:C?"border-red-400 bg-white ring-4 ring-red-100":"border-primary bg-white ring-4 ring-primary/10",children:(B,z)=>n.jsx("span",{className:C?"text-red-700":z?"text-slate-400":"text-slate-700",children:B})}),n.jsx("span",{className:`material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[18px] pointer-events-none ${C?"text-red-400":"text-slate-700"}`,children:"calendar_today"})]}),(C||E)&&n.jsx("p",{id:`${i}-error`,className:`add-helper ${C?"!text-red-500":""}`,children:C||E})]})}function Wf({form:i,saving:d,onBack:u,onSubmit:v}){return n.jsx(ql,{onClose:u,large:!0,children:y=>n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"modal-header",children:n.jsxs("div",{className:"flex items-start justify-between gap-4",children:[n.jsxs("div",{className:"flex items-start gap-3 min-w-0",children:[n.jsx("div",{className:"modal-icon",children:n.jsx("span",{className:"material-symbols-outlined text-[21px]",style:{fontVariationSettings:'"FILL" 1'},children:"fact_check"})}),n.jsxs("div",{className:"min-w-0",children:[n.jsx("h3",{className:"text-[18px] font-extrabold text-slate-800 tracking-tight",children:"ตรวจสอบข้อมูลก่อนบันทึก"}),n.jsx("p",{className:"text-[12px] text-slate-500 mt-0.5 leading-relaxed",children:"ยืนยันรายละเอียดลูกหนี้ก่อนเพิ่มเข้าสู่ระบบ"})]})]}),n.jsx("button",{onClick:y,className:"modal-close",children:n.jsx("span",{className:"material-symbols-outlined text-[20px]",children:"close"})})]})}),n.jsx("div",{className:"modal-body",children:n.jsxs("div",{className:"review-panel",children:[n.jsxs("div",{className:"review-account",children:[n.jsxs("div",{className:"min-w-0",children:[n.jsx("p",{className:"review-label",children:"หมายเลขบัญชี"}),n.jsx("p",{className:"mt-1 text-xl font-extrabold text-primary tracking-wide break-all",children:yi(i.account_no)})]}),n.jsxs("div",{className:"inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700 self-start sm:self-center",children:[n.jsx("span",{className:"material-symbols-outlined text-[15px]",children:"verified"}),"พร้อมบันทึก"]})]}),n.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-blue-100",children:[["ชื่อ-นามสกุล",i.name],["คดีหมายเลขดำที่",i.black_case_no],["วันที่ยื่นฟ้อง",Nt(i.filing_date)],["วันที่ผิดนัดชำระก่อนฟ้อง",Nt(i.default_date)],["ทุนทรัพย์ที่ฟ้อง",wt(i.filing_capital)],["DPD ณ วันที่ก่อนส่งฟ้องศาล 1 วัน",i.pre_filing_dpd_days],["หมายเหตุ / เงื่อนไขพิเศษเพิ่มเติม",i.filing_note||"-"]].map(([E,C])=>n.jsxs("div",{className:"review-item",children:[n.jsx("p",{className:"review-label",children:E}),n.jsx("p",{className:"review-value break-words",children:C})]},E))})]})}),n.jsxs("div",{className:"modal-footer",children:[n.jsx("p",{className:"text-[11px] text-slate-400 leading-relaxed",children:"กรุณาตรวจสอบข้อมูลให้ถูกต้องก่อนกดยืนยันบันทึก"}),n.jsxs("div",{className:"flex items-center justify-end gap-2",children:[n.jsx("button",{onClick:y,className:"btn-secondary-modern",children:"แก้ไขข้อมูล"}),n.jsxs("button",{disabled:d,onClick:v,className:"btn-primary-modern",children:[n.jsx("span",{className:"material-symbols-outlined text-base",children:"save"}),d?"กำลังบันทึก...":"ยืนยันบันทึก"]})]})]})]})})}function Qf({account:i,onClose:d,onConfirm:u}){return n.jsx(ql,{onClose:d,children:v=>n.jsxs("div",{className:"p-8 flex flex-col items-center text-center",children:[n.jsx("div",{className:"w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6",children:n.jsx("span",{className:"material-symbols-outlined text-red-500 text-4xl",style:{fontVariationSettings:'"FILL" 1'},children:"delete_forever"})}),n.jsx("h3",{className:"text-2xl font-bold text-on-surface mb-3",children:"ยืนยันการลบข้อมูล"}),n.jsx("h4",{className:"text-slate-400 text-xs font-bold uppercase tracking-widest mb-4",children:"Confirm Deletion"}),n.jsx("p",{className:"text-slate-500 text-sm leading-relaxed mb-2",children:"คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลลูกหนี้รายนี้?"}),n.jsx("p",{className:"text-primary font-bold text-sm mb-2",children:yi(i)}),n.jsx("p",{className:"text-slate-400 text-xs mb-8",children:"การดำเนินการนี้ไม่สามารถย้อนกลับได้"}),n.jsxs("div",{className:"flex gap-3 w-full",children:[n.jsx("button",{onClick:v,className:"flex-1 py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl transition-all text-sm",children:"ยกเลิก"}),n.jsx("button",{onClick:u,className:"flex-1 py-3 px-6 bg-accent-coral hover:bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-200 transition-all text-sm",children:"ยืนยันการลบ"})]})]})})}function ql({children:i,onClose:d,large:u=!1}){const[v,y]=k.useState(!1),E=k.useRef(!1);k.useEffect(()=>{const P=window.requestAnimationFrame(()=>y(!0));return()=>window.cancelAnimationFrame(P)},[]);const C=()=>{!d||E.current||(E.current=!0,y(!1),window.setTimeout(d,220))};return n.jsxs("div",{className:"fixed inset-0 z-[130] flex items-center justify-center p-4",children:[n.jsx("div",{className:`modal-backdrop absolute inset-0 bg-slate-900/45 backdrop-blur-[3px] ${v?"open":""}`,onClick:C}),n.jsx("div",{className:`modal-content relative ${v?"open":""} ${u?"modal-shell":"w-full max-w-md rounded-[24px] border border-blue-100 bg-white shadow-2xl shadow-slate-900/20 overflow-hidden"}`,children:typeof i=="function"?i(C):i})]})}const mi=document.getElementById("root"),hc=mi==null?void 0:mi.dataset.page,xc=Sm.createRoot(document.getElementById("root"));hc==="customer-detail"?xc.render(n.jsx(nf,{})):xc.render(n.jsx(k.StrictMode,{children:hc==="customer-list"?n.jsx(Tf,{}):n.jsx(Vm,{})}));
