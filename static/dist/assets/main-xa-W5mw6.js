var ei={exports:{}},Kl={},ti={exports:{}},te={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ud;function rm(){if(Ud)return te;Ud=1;var i=Symbol.for("react.element"),d=Symbol.for("react.portal"),m=Symbol.for("react.fragment"),N=Symbol.for("react.strict_mode"),v=Symbol.for("react.profiler"),C=Symbol.for("react.provider"),I=Symbol.for("react.context"),$=Symbol.for("react.forward_ref"),z=Symbol.for("react.suspense"),M=Symbol.for("react.memo"),B=Symbol.for("react.lazy"),O=Symbol.iterator;function Z(p){return p===null||typeof p!="object"?null:(p=O&&p[O]||p["@@iterator"],typeof p=="function"?p:null)}var H={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},K=Object.assign,Q={};function J(p,y,q){this.props=p,this.context=y,this.refs=Q,this.updater=q||H}J.prototype.isReactComponent={},J.prototype.setState=function(p,y){if(typeof p!="object"&&typeof p!="function"&&p!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,p,y,"setState")},J.prototype.forceUpdate=function(p){this.updater.enqueueForceUpdate(this,p,"forceUpdate")};function ge(){}ge.prototype=J.prototype;function De(p,y,q){this.props=p,this.context=y,this.refs=Q,this.updater=q||H}var ue=De.prototype=new ge;ue.constructor=De,K(ue,J.prototype),ue.isPureReactComponent=!0;var le=Array.isArray,fe=Object.prototype.hasOwnProperty,oe={current:null},ye={key:!0,ref:!0,__self:!0,__source:!0};function W(p,y,q){var G,se={},X=null,ee=null;if(y!=null)for(G in y.ref!==void 0&&(ee=y.ref),y.key!==void 0&&(X=""+y.key),y)fe.call(y,G)&&!ye.hasOwnProperty(G)&&(se[G]=y[G]);var ae=arguments.length-2;if(ae===1)se.children=q;else if(1<ae){for(var he=Array(ae),Ae=0;Ae<ae;Ae++)he[Ae]=arguments[Ae+2];se.children=he}if(p&&p.defaultProps)for(G in ae=p.defaultProps,ae)se[G]===void 0&&(se[G]=ae[G]);return{$$typeof:i,type:p,key:X,ref:ee,props:se,_owner:oe.current}}function ne(p,y){return{$$typeof:i,type:p.type,key:y,ref:p.ref,props:p.props,_owner:p._owner}}function pe(p){return typeof p=="object"&&p!==null&&p.$$typeof===i}function _e(p){var y={"=":"=0",":":"=2"};return"$"+p.replace(/[=:]/g,function(q){return y[q]})}var we=/\/+/g;function Se(p,y){return typeof p=="object"&&p!==null&&p.key!=null?_e(""+p.key):y.toString(36)}function Ce(p,y,q,G,se){var X=typeof p;(X==="undefined"||X==="boolean")&&(p=null);var ee=!1;if(p===null)ee=!0;else switch(X){case"string":case"number":ee=!0;break;case"object":switch(p.$$typeof){case i:case d:ee=!0}}if(ee)return ee=p,se=se(ee),p=G===""?"."+Se(ee,0):G,le(se)?(q="",p!=null&&(q=p.replace(we,"$&/")+"/"),Ce(se,y,q,"",function(Ae){return Ae})):se!=null&&(pe(se)&&(se=ne(se,q+(!se.key||ee&&ee.key===se.key?"":(""+se.key).replace(we,"$&/")+"/")+p)),y.push(se)),1;if(ee=0,G=G===""?".":G+":",le(p))for(var ae=0;ae<p.length;ae++){X=p[ae];var he=G+Se(X,ae);ee+=Ce(X,y,q,he,se)}else if(he=Z(p),typeof he=="function")for(p=he.call(p),ae=0;!(X=p.next()).done;)X=X.value,he=G+Se(X,ae++),ee+=Ce(X,y,q,he,se);else if(X==="object")throw y=String(p),Error("Objects are not valid as a React child (found: "+(y==="[object Object]"?"object with keys {"+Object.keys(p).join(", ")+"}":y)+"). If you meant to render a collection of children, use an array instead.");return ee}function $e(p,y,q){if(p==null)return p;var G=[],se=0;return Ce(p,G,"","",function(X){return y.call(q,X,se++)}),G}function Oe(p){if(p._status===-1){var y=p._result;y=y(),y.then(function(q){(p._status===0||p._status===-1)&&(p._status=1,p._result=q)},function(q){(p._status===0||p._status===-1)&&(p._status=2,p._result=q)}),p._status===-1&&(p._status=0,p._result=y)}if(p._status===1)return p._result.default;throw p._result}var Ne={current:null},_={transition:null},U={ReactCurrentDispatcher:Ne,ReactCurrentBatchConfig:_,ReactCurrentOwner:oe};function D(){throw Error("act(...) is not supported in production builds of React.")}return te.Children={map:$e,forEach:function(p,y,q){$e(p,function(){y.apply(this,arguments)},q)},count:function(p){var y=0;return $e(p,function(){y++}),y},toArray:function(p){return $e(p,function(y){return y})||[]},only:function(p){if(!pe(p))throw Error("React.Children.only expected to receive a single React element child.");return p}},te.Component=J,te.Fragment=m,te.Profiler=v,te.PureComponent=De,te.StrictMode=N,te.Suspense=z,te.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=U,te.act=D,te.cloneElement=function(p,y,q){if(p==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+p+".");var G=K({},p.props),se=p.key,X=p.ref,ee=p._owner;if(y!=null){if(y.ref!==void 0&&(X=y.ref,ee=oe.current),y.key!==void 0&&(se=""+y.key),p.type&&p.type.defaultProps)var ae=p.type.defaultProps;for(he in y)fe.call(y,he)&&!ye.hasOwnProperty(he)&&(G[he]=y[he]===void 0&&ae!==void 0?ae[he]:y[he])}var he=arguments.length-2;if(he===1)G.children=q;else if(1<he){ae=Array(he);for(var Ae=0;Ae<he;Ae++)ae[Ae]=arguments[Ae+2];G.children=ae}return{$$typeof:i,type:p.type,key:se,ref:X,props:G,_owner:ee}},te.createContext=function(p){return p={$$typeof:I,_currentValue:p,_currentValue2:p,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},p.Provider={$$typeof:C,_context:p},p.Consumer=p},te.createElement=W,te.createFactory=function(p){var y=W.bind(null,p);return y.type=p,y},te.createRef=function(){return{current:null}},te.forwardRef=function(p){return{$$typeof:$,render:p}},te.isValidElement=pe,te.lazy=function(p){return{$$typeof:B,_payload:{_status:-1,_result:p},_init:Oe}},te.memo=function(p,y){return{$$typeof:M,type:p,compare:y===void 0?null:y}},te.startTransition=function(p){var y=_.transition;_.transition={};try{p()}finally{_.transition=y}},te.unstable_act=D,te.useCallback=function(p,y){return Ne.current.useCallback(p,y)},te.useContext=function(p){return Ne.current.useContext(p)},te.useDebugValue=function(){},te.useDeferredValue=function(p){return Ne.current.useDeferredValue(p)},te.useEffect=function(p,y){return Ne.current.useEffect(p,y)},te.useId=function(){return Ne.current.useId()},te.useImperativeHandle=function(p,y,q){return Ne.current.useImperativeHandle(p,y,q)},te.useInsertionEffect=function(p,y){return Ne.current.useInsertionEffect(p,y)},te.useLayoutEffect=function(p,y){return Ne.current.useLayoutEffect(p,y)},te.useMemo=function(p,y){return Ne.current.useMemo(p,y)},te.useReducer=function(p,y,q){return Ne.current.useReducer(p,y,q)},te.useRef=function(p){return Ne.current.useRef(p)},te.useState=function(p){return Ne.current.useState(p)},te.useSyncExternalStore=function(p,y,q){return Ne.current.useSyncExternalStore(p,y,q)},te.useTransition=function(){return Ne.current.useTransition()},te.version="18.3.1",te}var Hd;function di(){return Hd||(Hd=1,ti.exports=rm()),ti.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wd;function am(){if(Wd)return Kl;Wd=1;var i=di(),d=Symbol.for("react.element"),m=Symbol.for("react.fragment"),N=Object.prototype.hasOwnProperty,v=i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,C={key:!0,ref:!0,__self:!0,__source:!0};function I($,z,M){var B,O={},Z=null,H=null;M!==void 0&&(Z=""+M),z.key!==void 0&&(Z=""+z.key),z.ref!==void 0&&(H=z.ref);for(B in z)N.call(z,B)&&!C.hasOwnProperty(B)&&(O[B]=z[B]);if($&&$.defaultProps)for(B in z=$.defaultProps,z)O[B]===void 0&&(O[B]=z[B]);return{$$typeof:d,type:$,key:Z,ref:H,props:O,_owner:v.current}}return Kl.Fragment=m,Kl.jsx=I,Kl.jsxs=I,Kl}var Qd;function im(){return Qd||(Qd=1,ei.exports=am()),ei.exports}var l=im(),E=di(),fr={},ni={exports:{}},tt={},li={exports:{}},si={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Yd;function om(){return Yd||(Yd=1,(function(i){function d(_,U){var D=_.length;_.push(U);e:for(;0<D;){var p=D-1>>>1,y=_[p];if(0<v(y,U))_[p]=U,_[D]=y,D=p;else break e}}function m(_){return _.length===0?null:_[0]}function N(_){if(_.length===0)return null;var U=_[0],D=_.pop();if(D!==U){_[0]=D;e:for(var p=0,y=_.length,q=y>>>1;p<q;){var G=2*(p+1)-1,se=_[G],X=G+1,ee=_[X];if(0>v(se,D))X<y&&0>v(ee,se)?(_[p]=ee,_[X]=D,p=X):(_[p]=se,_[G]=D,p=G);else if(X<y&&0>v(ee,D))_[p]=ee,_[X]=D,p=X;else break e}}return U}function v(_,U){var D=_.sortIndex-U.sortIndex;return D!==0?D:_.id-U.id}if(typeof performance=="object"&&typeof performance.now=="function"){var C=performance;i.unstable_now=function(){return C.now()}}else{var I=Date,$=I.now();i.unstable_now=function(){return I.now()-$}}var z=[],M=[],B=1,O=null,Z=3,H=!1,K=!1,Q=!1,J=typeof setTimeout=="function"?setTimeout:null,ge=typeof clearTimeout=="function"?clearTimeout:null,De=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function ue(_){for(var U=m(M);U!==null;){if(U.callback===null)N(M);else if(U.startTime<=_)N(M),U.sortIndex=U.expirationTime,d(z,U);else break;U=m(M)}}function le(_){if(Q=!1,ue(_),!K)if(m(z)!==null)K=!0,Oe(fe);else{var U=m(M);U!==null&&Ne(le,U.startTime-_)}}function fe(_,U){K=!1,Q&&(Q=!1,ge(W),W=-1),H=!0;var D=Z;try{for(ue(U),O=m(z);O!==null&&(!(O.expirationTime>U)||_&&!_e());){var p=O.callback;if(typeof p=="function"){O.callback=null,Z=O.priorityLevel;var y=p(O.expirationTime<=U);U=i.unstable_now(),typeof y=="function"?O.callback=y:O===m(z)&&N(z),ue(U)}else N(z);O=m(z)}if(O!==null)var q=!0;else{var G=m(M);G!==null&&Ne(le,G.startTime-U),q=!1}return q}finally{O=null,Z=D,H=!1}}var oe=!1,ye=null,W=-1,ne=5,pe=-1;function _e(){return!(i.unstable_now()-pe<ne)}function we(){if(ye!==null){var _=i.unstable_now();pe=_;var U=!0;try{U=ye(!0,_)}finally{U?Se():(oe=!1,ye=null)}}else oe=!1}var Se;if(typeof De=="function")Se=function(){De(we)};else if(typeof MessageChannel<"u"){var Ce=new MessageChannel,$e=Ce.port2;Ce.port1.onmessage=we,Se=function(){$e.postMessage(null)}}else Se=function(){J(we,0)};function Oe(_){ye=_,oe||(oe=!0,Se())}function Ne(_,U){W=J(function(){_(i.unstable_now())},U)}i.unstable_IdlePriority=5,i.unstable_ImmediatePriority=1,i.unstable_LowPriority=4,i.unstable_NormalPriority=3,i.unstable_Profiling=null,i.unstable_UserBlockingPriority=2,i.unstable_cancelCallback=function(_){_.callback=null},i.unstable_continueExecution=function(){K||H||(K=!0,Oe(fe))},i.unstable_forceFrameRate=function(_){0>_||125<_?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):ne=0<_?Math.floor(1e3/_):5},i.unstable_getCurrentPriorityLevel=function(){return Z},i.unstable_getFirstCallbackNode=function(){return m(z)},i.unstable_next=function(_){switch(Z){case 1:case 2:case 3:var U=3;break;default:U=Z}var D=Z;Z=U;try{return _()}finally{Z=D}},i.unstable_pauseExecution=function(){},i.unstable_requestPaint=function(){},i.unstable_runWithPriority=function(_,U){switch(_){case 1:case 2:case 3:case 4:case 5:break;default:_=3}var D=Z;Z=_;try{return U()}finally{Z=D}},i.unstable_scheduleCallback=function(_,U,D){var p=i.unstable_now();switch(typeof D=="object"&&D!==null?(D=D.delay,D=typeof D=="number"&&0<D?p+D:p):D=p,_){case 1:var y=-1;break;case 2:y=250;break;case 5:y=1073741823;break;case 4:y=1e4;break;default:y=5e3}return y=D+y,_={id:B++,callback:U,priorityLevel:_,startTime:D,expirationTime:y,sortIndex:-1},D>p?(_.sortIndex=D,d(M,_),m(z)===null&&_===m(M)&&(Q?(ge(W),W=-1):Q=!0,Ne(le,D-p))):(_.sortIndex=y,d(z,_),K||H||(K=!0,Oe(fe))),_},i.unstable_shouldYield=_e,i.unstable_wrapCallback=function(_){var U=Z;return function(){var D=Z;Z=U;try{return _.apply(this,arguments)}finally{Z=D}}}})(si)),si}var Jd;function dm(){return Jd||(Jd=1,li.exports=om()),li.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Kd;function cm(){if(Kd)return tt;Kd=1;var i=di(),d=dm();function m(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var N=new Set,v={};function C(e,t){I(e,t),I(e+"Capture",t)}function I(e,t){for(v[e]=t,e=0;e<t.length;e++)N.add(t[e])}var $=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),z=Object.prototype.hasOwnProperty,M=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,B={},O={};function Z(e){return z.call(O,e)?!0:z.call(B,e)?!1:M.test(e)?O[e]=!0:(B[e]=!0,!1)}function H(e,t,n,s){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return s?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function K(e,t,n,s){if(t===null||typeof t>"u"||H(e,t,n,s))return!0;if(s)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Q(e,t,n,s,r,a,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=s,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=a,this.removeEmptyString=o}var J={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){J[e]=new Q(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];J[t]=new Q(t,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){J[e]=new Q(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){J[e]=new Q(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){J[e]=new Q(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){J[e]=new Q(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){J[e]=new Q(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){J[e]=new Q(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){J[e]=new Q(e,5,!1,e.toLowerCase(),null,!1,!1)});var ge=/[\-:]([a-z])/g;function De(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(ge,De);J[t]=new Q(t,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(ge,De);J[t]=new Q(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(ge,De);J[t]=new Q(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){J[e]=new Q(e,1,!1,e.toLowerCase(),null,!1,!1)}),J.xlinkHref=new Q("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){J[e]=new Q(e,1,!1,e.toLowerCase(),null,!0,!0)});function ue(e,t,n,s){var r=J.hasOwnProperty(t)?J[t]:null;(r!==null?r.type!==0:s||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(K(t,n,r,s)&&(n=null),s||r===null?Z(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):r.mustUseProperty?e[r.propertyName]=n===null?r.type===3?!1:"":n:(t=r.attributeName,s=r.attributeNamespace,n===null?e.removeAttribute(t):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,s?e.setAttributeNS(s,t,n):e.setAttribute(t,n))))}var le=i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,fe=Symbol.for("react.element"),oe=Symbol.for("react.portal"),ye=Symbol.for("react.fragment"),W=Symbol.for("react.strict_mode"),ne=Symbol.for("react.profiler"),pe=Symbol.for("react.provider"),_e=Symbol.for("react.context"),we=Symbol.for("react.forward_ref"),Se=Symbol.for("react.suspense"),Ce=Symbol.for("react.suspense_list"),$e=Symbol.for("react.memo"),Oe=Symbol.for("react.lazy"),Ne=Symbol.for("react.offscreen"),_=Symbol.iterator;function U(e){return e===null||typeof e!="object"?null:(e=_&&e[_]||e["@@iterator"],typeof e=="function"?e:null)}var D=Object.assign,p;function y(e){if(p===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);p=t&&t[1]||""}return`
`+p+e}var q=!1;function G(e,t){if(!e||q)return"";q=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(g){var s=g}Reflect.construct(e,[],t)}else{try{t.call()}catch(g){s=g}e.call(t.prototype)}else{try{throw Error()}catch(g){s=g}e()}}catch(g){if(g&&s&&typeof g.stack=="string"){for(var r=g.stack.split(`
`),a=s.stack.split(`
`),o=r.length-1,c=a.length-1;1<=o&&0<=c&&r[o]!==a[c];)c--;for(;1<=o&&0<=c;o--,c--)if(r[o]!==a[c]){if(o!==1||c!==1)do if(o--,c--,0>c||r[o]!==a[c]){var u=`
`+r[o].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=o&&0<=c);break}}}finally{q=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?y(e):""}function se(e){switch(e.tag){case 5:return y(e.type);case 16:return y("Lazy");case 13:return y("Suspense");case 19:return y("SuspenseList");case 0:case 2:case 15:return e=G(e.type,!1),e;case 11:return e=G(e.type.render,!1),e;case 1:return e=G(e.type,!0),e;default:return""}}function X(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case ye:return"Fragment";case oe:return"Portal";case ne:return"Profiler";case W:return"StrictMode";case Se:return"Suspense";case Ce:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case _e:return(e.displayName||"Context")+".Consumer";case pe:return(e._context.displayName||"Context")+".Provider";case we:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case $e:return t=e.displayName||null,t!==null?t:X(e.type)||"Memo";case Oe:t=e._payload,e=e._init;try{return X(e(t))}catch{}}return null}function ee(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return X(t);case 8:return t===W?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function ae(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function he(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Ae(e){var t=he(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),s=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,a=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return r.call(this)},set:function(o){s=""+o,a.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return s},setValue:function(o){s=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function _n(e){e._valueTracker||(e._valueTracker=Ae(e))}function sl(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),s="";return e&&(s=he(e)?e.checked?"true":"false":e.value),e=s,e!==n?(t.setValue(e),!0):!1}function Cn(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function In(e,t){var n=t.checked;return D({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Dn(e,t){var n=t.defaultValue==null?"":t.defaultValue,s=t.checked!=null?t.checked:t.defaultChecked;n=ae(t.value!=null?t.value:n),e._wrapperState={initialChecked:s,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function rl(e,t){t=t.checked,t!=null&&ue(e,"checked",t,!1)}function al(e,t){rl(e,t);var n=ae(t.value),s=t.type;if(n!=null)s==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(s==="submit"||s==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?ol(e,t.type,n):t.hasOwnProperty("defaultValue")&&ol(e,t.type,ae(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function il(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var s=t.type;if(!(s!=="submit"&&s!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function ol(e,t,n){(t!=="number"||Cn(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Mt=Array.isArray;function Ct(e,t,n,s){if(e=e.options,t){t={};for(var r=0;r<n.length;r++)t["$"+n[r]]=!0;for(n=0;n<e.length;n++)r=t.hasOwnProperty("$"+e[n].value),e[n].selected!==r&&(e[n].selected=r),r&&s&&(e[n].defaultSelected=!0)}else{for(n=""+ae(n),t=null,r=0;r<e.length;r++){if(e[r].value===n){e[r].selected=!0,s&&(e[r].defaultSelected=!0);return}t!==null||e[r].disabled||(t=e[r])}t!==null&&(t.selected=!0)}}function dl(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(m(91));return D({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function cl(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(m(92));if(Mt(n)){if(1<n.length)throw Error(m(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:ae(n)}}function ql(e,t){var n=ae(t.value),s=ae(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),s!=null&&(e.defaultValue=""+s)}function zt(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function un(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ln(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?un(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Bn,Xl=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,s,r){MSApp.execUnsafeLocalFunction(function(){return e(t,n,s,r)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Bn=Bn||document.createElement("div"),Bn.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Bn.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function mn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var nt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},es=["Webkit","ms","Moz","O"];Object.keys(nt).forEach(function(e){es.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),nt[t]=nt[e]})});function ts(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||nt.hasOwnProperty(e)&&nt[e]?(""+t).trim():t+"px"}function ns(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var s=n.indexOf("--")===0,r=ts(n,t[n],s);n==="float"&&(n="cssFloat"),s?e.setProperty(n,r):e[n]=r}}var yr=D({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ul(e,t){if(t){if(yr[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(m(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(m(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(m(61))}if(t.style!=null&&typeof t.style!="object")throw Error(m(62))}}function Tn(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ml=null;function fl(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var pl=null,$t=null,Ot=null;function ls(e){if(e=Rl(e)){if(typeof pl!="function")throw Error(m(280));var t=e.stateNode;t&&(t=Cs(t),pl(e.stateNode,e.type,t))}}function ss(e){$t?Ot?Ot.push(e):Ot=[e]:$t=e}function rs(){if($t){var e=$t,t=Ot;if(Ot=$t=null,ls(e),t)for(e=0;e<t.length;e++)ls(t[e])}}function k(e,t){return e(t)}function re(){}var ce=!1;function it(e,t,n){if(ce)return e(t,n);ce=!0;try{return k(e,t,n)}finally{ce=!1,($t!==null||Ot!==null)&&(re(),rs())}}function At(e,t){var n=e.stateNode;if(n===null)return null;var s=Cs(n);if(s===null)return null;n=s[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(e=e.type,s=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!s;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(m(231,t,typeof n));return n}var Vt=!1;if($)try{var Ut={};Object.defineProperty(Ut,"passive",{get:function(){Vt=!0}}),window.addEventListener("test",Ut,Ut),window.removeEventListener("test",Ut,Ut)}catch{Vt=!1}function uc(e,t,n,s,r,a,o,c,u){var g=Array.prototype.slice.call(arguments,3);try{t.apply(n,g)}catch(w){this.onError(w)}}var hl=!1,as=null,is=!1,vr=null,mc={onError:function(e){hl=!0,as=e}};function fc(e,t,n,s,r,a,o,c,u){hl=!1,as=null,uc.apply(mc,arguments)}function pc(e,t,n,s,r,a,o,c,u){if(fc.apply(this,arguments),hl){if(hl){var g=as;hl=!1,as=null}else throw Error(m(198));is||(is=!0,vr=g)}}function fn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function ui(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function mi(e){if(fn(e)!==e)throw Error(m(188))}function hc(e){var t=e.alternate;if(!t){if(t=fn(e),t===null)throw Error(m(188));return t!==e?null:e}for(var n=e,s=t;;){var r=n.return;if(r===null)break;var a=r.alternate;if(a===null){if(s=r.return,s!==null){n=s;continue}break}if(r.child===a.child){for(a=r.child;a;){if(a===n)return mi(r),e;if(a===s)return mi(r),t;a=a.sibling}throw Error(m(188))}if(n.return!==s.return)n=r,s=a;else{for(var o=!1,c=r.child;c;){if(c===n){o=!0,n=r,s=a;break}if(c===s){o=!0,s=r,n=a;break}c=c.sibling}if(!o){for(c=a.child;c;){if(c===n){o=!0,n=a,s=r;break}if(c===s){o=!0,s=a,n=r;break}c=c.sibling}if(!o)throw Error(m(189))}}if(n.alternate!==s)throw Error(m(190))}if(n.tag!==3)throw Error(m(188));return n.stateNode.current===n?e:t}function fi(e){return e=hc(e),e!==null?pi(e):null}function pi(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=pi(e);if(t!==null)return t;e=e.sibling}return null}var hi=d.unstable_scheduleCallback,xi=d.unstable_cancelCallback,xc=d.unstable_shouldYield,gc=d.unstable_requestPaint,Le=d.unstable_now,yc=d.unstable_getCurrentPriorityLevel,jr=d.unstable_ImmediatePriority,gi=d.unstable_UserBlockingPriority,os=d.unstable_NormalPriority,vc=d.unstable_LowPriority,yi=d.unstable_IdlePriority,ds=null,bt=null;function jc(e){if(bt&&typeof bt.onCommitFiberRoot=="function")try{bt.onCommitFiberRoot(ds,e,void 0,(e.current.flags&128)===128)}catch{}}var pt=Math.clz32?Math.clz32:bc,wc=Math.log,Nc=Math.LN2;function bc(e){return e>>>=0,e===0?32:31-(wc(e)/Nc|0)|0}var cs=64,us=4194304;function xl(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function ms(e,t){var n=e.pendingLanes;if(n===0)return 0;var s=0,r=e.suspendedLanes,a=e.pingedLanes,o=n&268435455;if(o!==0){var c=o&~r;c!==0?s=xl(c):(a&=o,a!==0&&(s=xl(a)))}else o=n&~r,o!==0?s=xl(o):a!==0&&(s=xl(a));if(s===0)return 0;if(t!==0&&t!==s&&(t&r)===0&&(r=s&-s,a=t&-t,r>=a||r===16&&(a&4194240)!==0))return t;if((s&4)!==0&&(s|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=s;0<t;)n=31-pt(t),r=1<<n,s|=e[n],t&=~r;return s}function Sc(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function kc(e,t){for(var n=e.suspendedLanes,s=e.pingedLanes,r=e.expirationTimes,a=e.pendingLanes;0<a;){var o=31-pt(a),c=1<<o,u=r[o];u===-1?((c&n)===0||(c&s)!==0)&&(r[o]=Sc(c,t)):u<=t&&(e.expiredLanes|=c),a&=~c}}function wr(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function vi(){var e=cs;return cs<<=1,(cs&4194240)===0&&(cs=64),e}function Nr(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function gl(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-pt(t),e[t]=n}function Ec(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var s=e.eventTimes;for(e=e.expirationTimes;0<n;){var r=31-pt(n),a=1<<r;t[r]=0,s[r]=-1,e[r]=-1,n&=~a}}function br(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var s=31-pt(n),r=1<<s;r&t|e[s]&t&&(e[s]|=t),n&=~r}}var me=0;function ji(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var wi,Sr,Ni,bi,Si,kr=!1,fs=[],Ht=null,Wt=null,Qt=null,yl=new Map,vl=new Map,Yt=[],_c="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ki(e,t){switch(e){case"focusin":case"focusout":Ht=null;break;case"dragenter":case"dragleave":Wt=null;break;case"mouseover":case"mouseout":Qt=null;break;case"pointerover":case"pointerout":yl.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":vl.delete(t.pointerId)}}function jl(e,t,n,s,r,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:s,nativeEvent:a,targetContainers:[r]},t!==null&&(t=Rl(t),t!==null&&Sr(t)),e):(e.eventSystemFlags|=s,t=e.targetContainers,r!==null&&t.indexOf(r)===-1&&t.push(r),e)}function Cc(e,t,n,s,r){switch(t){case"focusin":return Ht=jl(Ht,e,t,n,s,r),!0;case"dragenter":return Wt=jl(Wt,e,t,n,s,r),!0;case"mouseover":return Qt=jl(Qt,e,t,n,s,r),!0;case"pointerover":var a=r.pointerId;return yl.set(a,jl(yl.get(a)||null,e,t,n,s,r)),!0;case"gotpointercapture":return a=r.pointerId,vl.set(a,jl(vl.get(a)||null,e,t,n,s,r)),!0}return!1}function Ei(e){var t=pn(e.target);if(t!==null){var n=fn(t);if(n!==null){if(t=n.tag,t===13){if(t=ui(n),t!==null){e.blockedOn=t,Si(e.priority,function(){Ni(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function ps(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=_r(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var s=new n.constructor(n.type,n);ml=s,n.target.dispatchEvent(s),ml=null}else return t=Rl(n),t!==null&&Sr(t),e.blockedOn=n,!1;t.shift()}return!0}function _i(e,t,n){ps(e)&&n.delete(t)}function Ic(){kr=!1,Ht!==null&&ps(Ht)&&(Ht=null),Wt!==null&&ps(Wt)&&(Wt=null),Qt!==null&&ps(Qt)&&(Qt=null),yl.forEach(_i),vl.forEach(_i)}function wl(e,t){e.blockedOn===t&&(e.blockedOn=null,kr||(kr=!0,d.unstable_scheduleCallback(d.unstable_NormalPriority,Ic)))}function Nl(e){function t(r){return wl(r,e)}if(0<fs.length){wl(fs[0],e);for(var n=1;n<fs.length;n++){var s=fs[n];s.blockedOn===e&&(s.blockedOn=null)}}for(Ht!==null&&wl(Ht,e),Wt!==null&&wl(Wt,e),Qt!==null&&wl(Qt,e),yl.forEach(t),vl.forEach(t),n=0;n<Yt.length;n++)s=Yt[n],s.blockedOn===e&&(s.blockedOn=null);for(;0<Yt.length&&(n=Yt[0],n.blockedOn===null);)Ei(n),n.blockedOn===null&&Yt.shift()}var Rn=le.ReactCurrentBatchConfig,hs=!0;function Dc(e,t,n,s){var r=me,a=Rn.transition;Rn.transition=null;try{me=1,Er(e,t,n,s)}finally{me=r,Rn.transition=a}}function Lc(e,t,n,s){var r=me,a=Rn.transition;Rn.transition=null;try{me=4,Er(e,t,n,s)}finally{me=r,Rn.transition=a}}function Er(e,t,n,s){if(hs){var r=_r(e,t,n,s);if(r===null)Hr(e,t,s,xs,n),ki(e,s);else if(Cc(r,e,t,n,s))s.stopPropagation();else if(ki(e,s),t&4&&-1<_c.indexOf(e)){for(;r!==null;){var a=Rl(r);if(a!==null&&wi(a),a=_r(e,t,n,s),a===null&&Hr(e,t,s,xs,n),a===r)break;r=a}r!==null&&s.stopPropagation()}else Hr(e,t,s,null,n)}}var xs=null;function _r(e,t,n,s){if(xs=null,e=fl(s),e=pn(e),e!==null)if(t=fn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=ui(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return xs=e,null}function Ci(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(yc()){case jr:return 1;case gi:return 4;case os:case vc:return 16;case yi:return 536870912;default:return 16}default:return 16}}var Jt=null,Cr=null,gs=null;function Ii(){if(gs)return gs;var e,t=Cr,n=t.length,s,r="value"in Jt?Jt.value:Jt.textContent,a=r.length;for(e=0;e<n&&t[e]===r[e];e++);var o=n-e;for(s=1;s<=o&&t[n-s]===r[a-s];s++);return gs=r.slice(e,1<s?1-s:void 0)}function ys(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function vs(){return!0}function Di(){return!1}function lt(e){function t(n,s,r,a,o){this._reactName=n,this._targetInst=r,this.type=s,this.nativeEvent=a,this.target=o,this.currentTarget=null;for(var c in e)e.hasOwnProperty(c)&&(n=e[c],this[c]=n?n(a):a[c]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?vs:Di,this.isPropagationStopped=Di,this}return D(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=vs)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=vs)},persist:function(){},isPersistent:vs}),t}var Fn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ir=lt(Fn),bl=D({},Fn,{view:0,detail:0}),Bc=lt(bl),Dr,Lr,Sl,js=D({},bl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Tr,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Sl&&(Sl&&e.type==="mousemove"?(Dr=e.screenX-Sl.screenX,Lr=e.screenY-Sl.screenY):Lr=Dr=0,Sl=e),Dr)},movementY:function(e){return"movementY"in e?e.movementY:Lr}}),Li=lt(js),Tc=D({},js,{dataTransfer:0}),Rc=lt(Tc),Fc=D({},bl,{relatedTarget:0}),Br=lt(Fc),Pc=D({},Fn,{animationName:0,elapsedTime:0,pseudoElement:0}),Mc=lt(Pc),zc=D({},Fn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),$c=lt(zc),Oc=D({},Fn,{data:0}),Bi=lt(Oc),Ac={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Vc={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Uc={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Hc(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Uc[e])?!!t[e]:!1}function Tr(){return Hc}var Wc=D({},bl,{key:function(e){if(e.key){var t=Ac[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ys(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Vc[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Tr,charCode:function(e){return e.type==="keypress"?ys(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ys(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Qc=lt(Wc),Yc=D({},js,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ti=lt(Yc),Jc=D({},bl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Tr}),Kc=lt(Jc),Gc=D({},Fn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Zc=lt(Gc),qc=D({},js,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Xc=lt(qc),eu=[9,13,27,32],Rr=$&&"CompositionEvent"in window,kl=null;$&&"documentMode"in document&&(kl=document.documentMode);var tu=$&&"TextEvent"in window&&!kl,Ri=$&&(!Rr||kl&&8<kl&&11>=kl),Fi=" ",Pi=!1;function Mi(e,t){switch(e){case"keyup":return eu.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function zi(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Pn=!1;function nu(e,t){switch(e){case"compositionend":return zi(t);case"keypress":return t.which!==32?null:(Pi=!0,Fi);case"textInput":return e=t.data,e===Fi&&Pi?null:e;default:return null}}function lu(e,t){if(Pn)return e==="compositionend"||!Rr&&Mi(e,t)?(e=Ii(),gs=Cr=Jt=null,Pn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Ri&&t.locale!=="ko"?null:t.data;default:return null}}var su={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function $i(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!su[e.type]:t==="textarea"}function Oi(e,t,n,s){ss(s),t=ks(t,"onChange"),0<t.length&&(n=new Ir("onChange","change",null,n,s),e.push({event:n,listeners:t}))}var El=null,_l=null;function ru(e){so(e,0)}function ws(e){var t=An(e);if(sl(t))return e}function au(e,t){if(e==="change")return t}var Ai=!1;if($){var Fr;if($){var Pr="oninput"in document;if(!Pr){var Vi=document.createElement("div");Vi.setAttribute("oninput","return;"),Pr=typeof Vi.oninput=="function"}Fr=Pr}else Fr=!1;Ai=Fr&&(!document.documentMode||9<document.documentMode)}function Ui(){El&&(El.detachEvent("onpropertychange",Hi),_l=El=null)}function Hi(e){if(e.propertyName==="value"&&ws(_l)){var t=[];Oi(t,_l,e,fl(e)),it(ru,t)}}function iu(e,t,n){e==="focusin"?(Ui(),El=t,_l=n,El.attachEvent("onpropertychange",Hi)):e==="focusout"&&Ui()}function ou(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ws(_l)}function du(e,t){if(e==="click")return ws(t)}function cu(e,t){if(e==="input"||e==="change")return ws(t)}function uu(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var ht=typeof Object.is=="function"?Object.is:uu;function Cl(e,t){if(ht(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),s=Object.keys(t);if(n.length!==s.length)return!1;for(s=0;s<n.length;s++){var r=n[s];if(!z.call(t,r)||!ht(e[r],t[r]))return!1}return!0}function Wi(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Qi(e,t){var n=Wi(e);e=0;for(var s;n;){if(n.nodeType===3){if(s=e+n.textContent.length,e<=t&&s>=t)return{node:n,offset:t-e};e=s}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Wi(n)}}function Yi(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Yi(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Ji(){for(var e=window,t=Cn();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Cn(e.document)}return t}function Mr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function mu(e){var t=Ji(),n=e.focusedElem,s=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Yi(n.ownerDocument.documentElement,n)){if(s!==null&&Mr(n)){if(t=s.start,e=s.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var r=n.textContent.length,a=Math.min(s.start,r);s=s.end===void 0?a:Math.min(s.end,r),!e.extend&&a>s&&(r=s,s=a,a=r),r=Qi(n,a);var o=Qi(n,s);r&&o&&(e.rangeCount!==1||e.anchorNode!==r.node||e.anchorOffset!==r.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(r.node,r.offset),e.removeAllRanges(),a>s?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var fu=$&&"documentMode"in document&&11>=document.documentMode,Mn=null,zr=null,Il=null,$r=!1;function Ki(e,t,n){var s=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;$r||Mn==null||Mn!==Cn(s)||(s=Mn,"selectionStart"in s&&Mr(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),Il&&Cl(Il,s)||(Il=s,s=ks(zr,"onSelect"),0<s.length&&(t=new Ir("onSelect","select",null,t,n),e.push({event:t,listeners:s}),t.target=Mn)))}function Ns(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var zn={animationend:Ns("Animation","AnimationEnd"),animationiteration:Ns("Animation","AnimationIteration"),animationstart:Ns("Animation","AnimationStart"),transitionend:Ns("Transition","TransitionEnd")},Or={},Gi={};$&&(Gi=document.createElement("div").style,"AnimationEvent"in window||(delete zn.animationend.animation,delete zn.animationiteration.animation,delete zn.animationstart.animation),"TransitionEvent"in window||delete zn.transitionend.transition);function bs(e){if(Or[e])return Or[e];if(!zn[e])return e;var t=zn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Gi)return Or[e]=t[n];return e}var Zi=bs("animationend"),qi=bs("animationiteration"),Xi=bs("animationstart"),eo=bs("transitionend"),to=new Map,no="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Kt(e,t){to.set(e,t),C(t,[e])}for(var Ar=0;Ar<no.length;Ar++){var Vr=no[Ar],pu=Vr.toLowerCase(),hu=Vr[0].toUpperCase()+Vr.slice(1);Kt(pu,"on"+hu)}Kt(Zi,"onAnimationEnd"),Kt(qi,"onAnimationIteration"),Kt(Xi,"onAnimationStart"),Kt("dblclick","onDoubleClick"),Kt("focusin","onFocus"),Kt("focusout","onBlur"),Kt(eo,"onTransitionEnd"),I("onMouseEnter",["mouseout","mouseover"]),I("onMouseLeave",["mouseout","mouseover"]),I("onPointerEnter",["pointerout","pointerover"]),I("onPointerLeave",["pointerout","pointerover"]),C("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),C("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),C("onBeforeInput",["compositionend","keypress","textInput","paste"]),C("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),C("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),C("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Dl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),xu=new Set("cancel close invalid load scroll toggle".split(" ").concat(Dl));function lo(e,t,n){var s=e.type||"unknown-event";e.currentTarget=n,pc(s,t,void 0,e),e.currentTarget=null}function so(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var s=e[n],r=s.event;s=s.listeners;e:{var a=void 0;if(t)for(var o=s.length-1;0<=o;o--){var c=s[o],u=c.instance,g=c.currentTarget;if(c=c.listener,u!==a&&r.isPropagationStopped())break e;lo(r,c,g),a=u}else for(o=0;o<s.length;o++){if(c=s[o],u=c.instance,g=c.currentTarget,c=c.listener,u!==a&&r.isPropagationStopped())break e;lo(r,c,g),a=u}}}if(is)throw e=vr,is=!1,vr=null,e}function ve(e,t){var n=t[Gr];n===void 0&&(n=t[Gr]=new Set);var s=e+"__bubble";n.has(s)||(ro(t,e,2,!1),n.add(s))}function Ur(e,t,n){var s=0;t&&(s|=4),ro(n,e,s,t)}var Ss="_reactListening"+Math.random().toString(36).slice(2);function Ll(e){if(!e[Ss]){e[Ss]=!0,N.forEach(function(n){n!=="selectionchange"&&(xu.has(n)||Ur(n,!1,e),Ur(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ss]||(t[Ss]=!0,Ur("selectionchange",!1,t))}}function ro(e,t,n,s){switch(Ci(t)){case 1:var r=Dc;break;case 4:r=Lc;break;default:r=Er}n=r.bind(null,t,n,e),r=void 0,!Vt||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(r=!0),s?r!==void 0?e.addEventListener(t,n,{capture:!0,passive:r}):e.addEventListener(t,n,!0):r!==void 0?e.addEventListener(t,n,{passive:r}):e.addEventListener(t,n,!1)}function Hr(e,t,n,s,r){var a=s;if((t&1)===0&&(t&2)===0&&s!==null)e:for(;;){if(s===null)return;var o=s.tag;if(o===3||o===4){var c=s.stateNode.containerInfo;if(c===r||c.nodeType===8&&c.parentNode===r)break;if(o===4)for(o=s.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===r||u.nodeType===8&&u.parentNode===r))return;o=o.return}for(;c!==null;){if(o=pn(c),o===null)return;if(u=o.tag,u===5||u===6){s=a=o;continue e}c=c.parentNode}}s=s.return}it(function(){var g=a,w=fl(n),b=[];e:{var j=to.get(e);if(j!==void 0){var L=Ir,R=e;switch(e){case"keypress":if(ys(n)===0)break e;case"keydown":case"keyup":L=Qc;break;case"focusin":R="focus",L=Br;break;case"focusout":R="blur",L=Br;break;case"beforeblur":case"afterblur":L=Br;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":L=Li;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":L=Rc;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":L=Kc;break;case Zi:case qi:case Xi:L=Mc;break;case eo:L=Zc;break;case"scroll":L=Bc;break;case"wheel":L=Xc;break;case"copy":case"cut":case"paste":L=$c;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":L=Ti}var F=(t&4)!==0,Be=!F&&e==="scroll",h=F?j!==null?j+"Capture":null:j;F=[];for(var f=g,x;f!==null;){x=f;var S=x.stateNode;if(x.tag===5&&S!==null&&(x=S,h!==null&&(S=At(f,h),S!=null&&F.push(Bl(f,S,x)))),Be)break;f=f.return}0<F.length&&(j=new L(j,R,null,n,w),b.push({event:j,listeners:F}))}}if((t&7)===0){e:{if(j=e==="mouseover"||e==="pointerover",L=e==="mouseout"||e==="pointerout",j&&n!==ml&&(R=n.relatedTarget||n.fromElement)&&(pn(R)||R[It]))break e;if((L||j)&&(j=w.window===w?w:(j=w.ownerDocument)?j.defaultView||j.parentWindow:window,L?(R=n.relatedTarget||n.toElement,L=g,R=R?pn(R):null,R!==null&&(Be=fn(R),R!==Be||R.tag!==5&&R.tag!==6)&&(R=null)):(L=null,R=g),L!==R)){if(F=Li,S="onMouseLeave",h="onMouseEnter",f="mouse",(e==="pointerout"||e==="pointerover")&&(F=Ti,S="onPointerLeave",h="onPointerEnter",f="pointer"),Be=L==null?j:An(L),x=R==null?j:An(R),j=new F(S,f+"leave",L,n,w),j.target=Be,j.relatedTarget=x,S=null,pn(w)===g&&(F=new F(h,f+"enter",R,n,w),F.target=x,F.relatedTarget=Be,S=F),Be=S,L&&R)t:{for(F=L,h=R,f=0,x=F;x;x=$n(x))f++;for(x=0,S=h;S;S=$n(S))x++;for(;0<f-x;)F=$n(F),f--;for(;0<x-f;)h=$n(h),x--;for(;f--;){if(F===h||h!==null&&F===h.alternate)break t;F=$n(F),h=$n(h)}F=null}else F=null;L!==null&&ao(b,j,L,F,!1),R!==null&&Be!==null&&ao(b,Be,R,F,!0)}}e:{if(j=g?An(g):window,L=j.nodeName&&j.nodeName.toLowerCase(),L==="select"||L==="input"&&j.type==="file")var P=au;else if($i(j))if(Ai)P=cu;else{P=ou;var A=iu}else(L=j.nodeName)&&L.toLowerCase()==="input"&&(j.type==="checkbox"||j.type==="radio")&&(P=du);if(P&&(P=P(e,g))){Oi(b,P,n,w);break e}A&&A(e,j,g),e==="focusout"&&(A=j._wrapperState)&&A.controlled&&j.type==="number"&&ol(j,"number",j.value)}switch(A=g?An(g):window,e){case"focusin":($i(A)||A.contentEditable==="true")&&(Mn=A,zr=g,Il=null);break;case"focusout":Il=zr=Mn=null;break;case"mousedown":$r=!0;break;case"contextmenu":case"mouseup":case"dragend":$r=!1,Ki(b,n,w);break;case"selectionchange":if(fu)break;case"keydown":case"keyup":Ki(b,n,w)}var V;if(Rr)e:{switch(e){case"compositionstart":var Y="onCompositionStart";break e;case"compositionend":Y="onCompositionEnd";break e;case"compositionupdate":Y="onCompositionUpdate";break e}Y=void 0}else Pn?Mi(e,n)&&(Y="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(Y="onCompositionStart");Y&&(Ri&&n.locale!=="ko"&&(Pn||Y!=="onCompositionStart"?Y==="onCompositionEnd"&&Pn&&(V=Ii()):(Jt=w,Cr="value"in Jt?Jt.value:Jt.textContent,Pn=!0)),A=ks(g,Y),0<A.length&&(Y=new Bi(Y,e,null,n,w),b.push({event:Y,listeners:A}),V?Y.data=V:(V=zi(n),V!==null&&(Y.data=V)))),(V=tu?nu(e,n):lu(e,n))&&(g=ks(g,"onBeforeInput"),0<g.length&&(w=new Bi("onBeforeInput","beforeinput",null,n,w),b.push({event:w,listeners:g}),w.data=V))}so(b,t)})}function Bl(e,t,n){return{instance:e,listener:t,currentTarget:n}}function ks(e,t){for(var n=t+"Capture",s=[];e!==null;){var r=e,a=r.stateNode;r.tag===5&&a!==null&&(r=a,a=At(e,n),a!=null&&s.unshift(Bl(e,a,r)),a=At(e,t),a!=null&&s.push(Bl(e,a,r))),e=e.return}return s}function $n(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function ao(e,t,n,s,r){for(var a=t._reactName,o=[];n!==null&&n!==s;){var c=n,u=c.alternate,g=c.stateNode;if(u!==null&&u===s)break;c.tag===5&&g!==null&&(c=g,r?(u=At(n,a),u!=null&&o.unshift(Bl(n,u,c))):r||(u=At(n,a),u!=null&&o.push(Bl(n,u,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var gu=/\r\n?/g,yu=/\u0000|\uFFFD/g;function io(e){return(typeof e=="string"?e:""+e).replace(gu,`
`).replace(yu,"")}function Es(e,t,n){if(t=io(t),io(e)!==t&&n)throw Error(m(425))}function _s(){}var Wr=null,Qr=null;function Yr(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Jr=typeof setTimeout=="function"?setTimeout:void 0,vu=typeof clearTimeout=="function"?clearTimeout:void 0,oo=typeof Promise=="function"?Promise:void 0,ju=typeof queueMicrotask=="function"?queueMicrotask:typeof oo<"u"?function(e){return oo.resolve(null).then(e).catch(wu)}:Jr;function wu(e){setTimeout(function(){throw e})}function Kr(e,t){var n=t,s=0;do{var r=n.nextSibling;if(e.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(s===0){e.removeChild(r),Nl(t);return}s--}else n!=="$"&&n!=="$?"&&n!=="$!"||s++;n=r}while(n);Nl(t)}function Gt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function co(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var On=Math.random().toString(36).slice(2),St="__reactFiber$"+On,Tl="__reactProps$"+On,It="__reactContainer$"+On,Gr="__reactEvents$"+On,Nu="__reactListeners$"+On,bu="__reactHandles$"+On;function pn(e){var t=e[St];if(t)return t;for(var n=e.parentNode;n;){if(t=n[It]||n[St]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=co(e);e!==null;){if(n=e[St])return n;e=co(e)}return t}e=n,n=e.parentNode}return null}function Rl(e){return e=e[St]||e[It],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function An(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(m(33))}function Cs(e){return e[Tl]||null}var Zr=[],Vn=-1;function Zt(e){return{current:e}}function je(e){0>Vn||(e.current=Zr[Vn],Zr[Vn]=null,Vn--)}function xe(e,t){Vn++,Zr[Vn]=e.current,e.current=t}var qt={},He=Zt(qt),Ge=Zt(!1),hn=qt;function Un(e,t){var n=e.type.contextTypes;if(!n)return qt;var s=e.stateNode;if(s&&s.__reactInternalMemoizedUnmaskedChildContext===t)return s.__reactInternalMemoizedMaskedChildContext;var r={},a;for(a in n)r[a]=t[a];return s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=r),r}function Ze(e){return e=e.childContextTypes,e!=null}function Is(){je(Ge),je(He)}function uo(e,t,n){if(He.current!==qt)throw Error(m(168));xe(He,t),xe(Ge,n)}function mo(e,t,n){var s=e.stateNode;if(t=t.childContextTypes,typeof s.getChildContext!="function")return n;s=s.getChildContext();for(var r in s)if(!(r in t))throw Error(m(108,ee(e)||"Unknown",r));return D({},n,s)}function Ds(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||qt,hn=He.current,xe(He,e),xe(Ge,Ge.current),!0}function fo(e,t,n){var s=e.stateNode;if(!s)throw Error(m(169));n?(e=mo(e,t,hn),s.__reactInternalMemoizedMergedChildContext=e,je(Ge),je(He),xe(He,e)):je(Ge),xe(Ge,n)}var Dt=null,Ls=!1,qr=!1;function po(e){Dt===null?Dt=[e]:Dt.push(e)}function Su(e){Ls=!0,po(e)}function Xt(){if(!qr&&Dt!==null){qr=!0;var e=0,t=me;try{var n=Dt;for(me=1;e<n.length;e++){var s=n[e];do s=s(!0);while(s!==null)}Dt=null,Ls=!1}catch(r){throw Dt!==null&&(Dt=Dt.slice(e+1)),hi(jr,Xt),r}finally{me=t,qr=!1}}return null}var Hn=[],Wn=0,Bs=null,Ts=0,ot=[],dt=0,xn=null,Lt=1,Bt="";function gn(e,t){Hn[Wn++]=Ts,Hn[Wn++]=Bs,Bs=e,Ts=t}function ho(e,t,n){ot[dt++]=Lt,ot[dt++]=Bt,ot[dt++]=xn,xn=e;var s=Lt;e=Bt;var r=32-pt(s)-1;s&=~(1<<r),n+=1;var a=32-pt(t)+r;if(30<a){var o=r-r%5;a=(s&(1<<o)-1).toString(32),s>>=o,r-=o,Lt=1<<32-pt(t)+r|n<<r|s,Bt=a+e}else Lt=1<<a|n<<r|s,Bt=e}function Xr(e){e.return!==null&&(gn(e,1),ho(e,1,0))}function ea(e){for(;e===Bs;)Bs=Hn[--Wn],Hn[Wn]=null,Ts=Hn[--Wn],Hn[Wn]=null;for(;e===xn;)xn=ot[--dt],ot[dt]=null,Bt=ot[--dt],ot[dt]=null,Lt=ot[--dt],ot[dt]=null}var st=null,rt=null,be=!1,xt=null;function xo(e,t){var n=ft(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function go(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,st=e,rt=Gt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,st=e,rt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=xn!==null?{id:Lt,overflow:Bt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=ft(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,st=e,rt=null,!0):!1;default:return!1}}function ta(e){return(e.mode&1)!==0&&(e.flags&128)===0}function na(e){if(be){var t=rt;if(t){var n=t;if(!go(e,t)){if(ta(e))throw Error(m(418));t=Gt(n.nextSibling);var s=st;t&&go(e,t)?xo(s,n):(e.flags=e.flags&-4097|2,be=!1,st=e)}}else{if(ta(e))throw Error(m(418));e.flags=e.flags&-4097|2,be=!1,st=e}}}function yo(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;st=e}function Rs(e){if(e!==st)return!1;if(!be)return yo(e),be=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Yr(e.type,e.memoizedProps)),t&&(t=rt)){if(ta(e))throw vo(),Error(m(418));for(;t;)xo(e,t),t=Gt(t.nextSibling)}if(yo(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(m(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){rt=Gt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}rt=null}}else rt=st?Gt(e.stateNode.nextSibling):null;return!0}function vo(){for(var e=rt;e;)e=Gt(e.nextSibling)}function Qn(){rt=st=null,be=!1}function la(e){xt===null?xt=[e]:xt.push(e)}var ku=le.ReactCurrentBatchConfig;function Fl(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(m(309));var s=n.stateNode}if(!s)throw Error(m(147,e));var r=s,a=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===a?t.ref:(t=function(o){var c=r.refs;o===null?delete c[a]:c[a]=o},t._stringRef=a,t)}if(typeof e!="string")throw Error(m(284));if(!n._owner)throw Error(m(290,e))}return e}function Fs(e,t){throw e=Object.prototype.toString.call(t),Error(m(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function jo(e){var t=e._init;return t(e._payload)}function wo(e){function t(h,f){if(e){var x=h.deletions;x===null?(h.deletions=[f],h.flags|=16):x.push(f)}}function n(h,f){if(!e)return null;for(;f!==null;)t(h,f),f=f.sibling;return null}function s(h,f){for(h=new Map;f!==null;)f.key!==null?h.set(f.key,f):h.set(f.index,f),f=f.sibling;return h}function r(h,f){return h=on(h,f),h.index=0,h.sibling=null,h}function a(h,f,x){return h.index=x,e?(x=h.alternate,x!==null?(x=x.index,x<f?(h.flags|=2,f):x):(h.flags|=2,f)):(h.flags|=1048576,f)}function o(h){return e&&h.alternate===null&&(h.flags|=2),h}function c(h,f,x,S){return f===null||f.tag!==6?(f=Ja(x,h.mode,S),f.return=h,f):(f=r(f,x),f.return=h,f)}function u(h,f,x,S){var P=x.type;return P===ye?w(h,f,x.props.children,S,x.key):f!==null&&(f.elementType===P||typeof P=="object"&&P!==null&&P.$$typeof===Oe&&jo(P)===f.type)?(S=r(f,x.props),S.ref=Fl(h,f,x),S.return=h,S):(S=rr(x.type,x.key,x.props,null,h.mode,S),S.ref=Fl(h,f,x),S.return=h,S)}function g(h,f,x,S){return f===null||f.tag!==4||f.stateNode.containerInfo!==x.containerInfo||f.stateNode.implementation!==x.implementation?(f=Ka(x,h.mode,S),f.return=h,f):(f=r(f,x.children||[]),f.return=h,f)}function w(h,f,x,S,P){return f===null||f.tag!==7?(f=kn(x,h.mode,S,P),f.return=h,f):(f=r(f,x),f.return=h,f)}function b(h,f,x){if(typeof f=="string"&&f!==""||typeof f=="number")return f=Ja(""+f,h.mode,x),f.return=h,f;if(typeof f=="object"&&f!==null){switch(f.$$typeof){case fe:return x=rr(f.type,f.key,f.props,null,h.mode,x),x.ref=Fl(h,null,f),x.return=h,x;case oe:return f=Ka(f,h.mode,x),f.return=h,f;case Oe:var S=f._init;return b(h,S(f._payload),x)}if(Mt(f)||U(f))return f=kn(f,h.mode,x,null),f.return=h,f;Fs(h,f)}return null}function j(h,f,x,S){var P=f!==null?f.key:null;if(typeof x=="string"&&x!==""||typeof x=="number")return P!==null?null:c(h,f,""+x,S);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case fe:return x.key===P?u(h,f,x,S):null;case oe:return x.key===P?g(h,f,x,S):null;case Oe:return P=x._init,j(h,f,P(x._payload),S)}if(Mt(x)||U(x))return P!==null?null:w(h,f,x,S,null);Fs(h,x)}return null}function L(h,f,x,S,P){if(typeof S=="string"&&S!==""||typeof S=="number")return h=h.get(x)||null,c(f,h,""+S,P);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case fe:return h=h.get(S.key===null?x:S.key)||null,u(f,h,S,P);case oe:return h=h.get(S.key===null?x:S.key)||null,g(f,h,S,P);case Oe:var A=S._init;return L(h,f,x,A(S._payload),P)}if(Mt(S)||U(S))return h=h.get(x)||null,w(f,h,S,P,null);Fs(f,S)}return null}function R(h,f,x,S){for(var P=null,A=null,V=f,Y=f=0,ze=null;V!==null&&Y<x.length;Y++){V.index>Y?(ze=V,V=null):ze=V.sibling;var de=j(h,V,x[Y],S);if(de===null){V===null&&(V=ze);break}e&&V&&de.alternate===null&&t(h,V),f=a(de,f,Y),A===null?P=de:A.sibling=de,A=de,V=ze}if(Y===x.length)return n(h,V),be&&gn(h,Y),P;if(V===null){for(;Y<x.length;Y++)V=b(h,x[Y],S),V!==null&&(f=a(V,f,Y),A===null?P=V:A.sibling=V,A=V);return be&&gn(h,Y),P}for(V=s(h,V);Y<x.length;Y++)ze=L(V,h,Y,x[Y],S),ze!==null&&(e&&ze.alternate!==null&&V.delete(ze.key===null?Y:ze.key),f=a(ze,f,Y),A===null?P=ze:A.sibling=ze,A=ze);return e&&V.forEach(function(dn){return t(h,dn)}),be&&gn(h,Y),P}function F(h,f,x,S){var P=U(x);if(typeof P!="function")throw Error(m(150));if(x=P.call(x),x==null)throw Error(m(151));for(var A=P=null,V=f,Y=f=0,ze=null,de=x.next();V!==null&&!de.done;Y++,de=x.next()){V.index>Y?(ze=V,V=null):ze=V.sibling;var dn=j(h,V,de.value,S);if(dn===null){V===null&&(V=ze);break}e&&V&&dn.alternate===null&&t(h,V),f=a(dn,f,Y),A===null?P=dn:A.sibling=dn,A=dn,V=ze}if(de.done)return n(h,V),be&&gn(h,Y),P;if(V===null){for(;!de.done;Y++,de=x.next())de=b(h,de.value,S),de!==null&&(f=a(de,f,Y),A===null?P=de:A.sibling=de,A=de);return be&&gn(h,Y),P}for(V=s(h,V);!de.done;Y++,de=x.next())de=L(V,h,Y,de.value,S),de!==null&&(e&&de.alternate!==null&&V.delete(de.key===null?Y:de.key),f=a(de,f,Y),A===null?P=de:A.sibling=de,A=de);return e&&V.forEach(function(sm){return t(h,sm)}),be&&gn(h,Y),P}function Be(h,f,x,S){if(typeof x=="object"&&x!==null&&x.type===ye&&x.key===null&&(x=x.props.children),typeof x=="object"&&x!==null){switch(x.$$typeof){case fe:e:{for(var P=x.key,A=f;A!==null;){if(A.key===P){if(P=x.type,P===ye){if(A.tag===7){n(h,A.sibling),f=r(A,x.props.children),f.return=h,h=f;break e}}else if(A.elementType===P||typeof P=="object"&&P!==null&&P.$$typeof===Oe&&jo(P)===A.type){n(h,A.sibling),f=r(A,x.props),f.ref=Fl(h,A,x),f.return=h,h=f;break e}n(h,A);break}else t(h,A);A=A.sibling}x.type===ye?(f=kn(x.props.children,h.mode,S,x.key),f.return=h,h=f):(S=rr(x.type,x.key,x.props,null,h.mode,S),S.ref=Fl(h,f,x),S.return=h,h=S)}return o(h);case oe:e:{for(A=x.key;f!==null;){if(f.key===A)if(f.tag===4&&f.stateNode.containerInfo===x.containerInfo&&f.stateNode.implementation===x.implementation){n(h,f.sibling),f=r(f,x.children||[]),f.return=h,h=f;break e}else{n(h,f);break}else t(h,f);f=f.sibling}f=Ka(x,h.mode,S),f.return=h,h=f}return o(h);case Oe:return A=x._init,Be(h,f,A(x._payload),S)}if(Mt(x))return R(h,f,x,S);if(U(x))return F(h,f,x,S);Fs(h,x)}return typeof x=="string"&&x!==""||typeof x=="number"?(x=""+x,f!==null&&f.tag===6?(n(h,f.sibling),f=r(f,x),f.return=h,h=f):(n(h,f),f=Ja(x,h.mode,S),f.return=h,h=f),o(h)):n(h,f)}return Be}var Yn=wo(!0),No=wo(!1),Ps=Zt(null),Ms=null,Jn=null,sa=null;function ra(){sa=Jn=Ms=null}function aa(e){var t=Ps.current;je(Ps),e._currentValue=t}function ia(e,t,n){for(;e!==null;){var s=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,s!==null&&(s.childLanes|=t)):s!==null&&(s.childLanes&t)!==t&&(s.childLanes|=t),e===n)break;e=e.return}}function Kn(e,t){Ms=e,sa=Jn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(qe=!0),e.firstContext=null)}function ct(e){var t=e._currentValue;if(sa!==e)if(e={context:e,memoizedValue:t,next:null},Jn===null){if(Ms===null)throw Error(m(308));Jn=e,Ms.dependencies={lanes:0,firstContext:e}}else Jn=Jn.next=e;return t}var yn=null;function oa(e){yn===null?yn=[e]:yn.push(e)}function bo(e,t,n,s){var r=t.interleaved;return r===null?(n.next=n,oa(t)):(n.next=r.next,r.next=n),t.interleaved=n,Tt(e,s)}function Tt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var en=!1;function da(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function So(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Rt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function tn(e,t,n){var s=e.updateQueue;if(s===null)return null;if(s=s.shared,(ie&2)!==0){var r=s.pending;return r===null?t.next=t:(t.next=r.next,r.next=t),s.pending=t,Tt(e,n)}return r=s.interleaved,r===null?(t.next=t,oa(s)):(t.next=r.next,r.next=t),s.interleaved=t,Tt(e,n)}function zs(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var s=t.lanes;s&=e.pendingLanes,n|=s,t.lanes=n,br(e,n)}}function ko(e,t){var n=e.updateQueue,s=e.alternate;if(s!==null&&(s=s.updateQueue,n===s)){var r=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};a===null?r=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?r=a=t:a=a.next=t}else r=a=t;n={baseState:s.baseState,firstBaseUpdate:r,lastBaseUpdate:a,shared:s.shared,effects:s.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function $s(e,t,n,s){var r=e.updateQueue;en=!1;var a=r.firstBaseUpdate,o=r.lastBaseUpdate,c=r.shared.pending;if(c!==null){r.shared.pending=null;var u=c,g=u.next;u.next=null,o===null?a=g:o.next=g,o=u;var w=e.alternate;w!==null&&(w=w.updateQueue,c=w.lastBaseUpdate,c!==o&&(c===null?w.firstBaseUpdate=g:c.next=g,w.lastBaseUpdate=u))}if(a!==null){var b=r.baseState;o=0,w=g=u=null,c=a;do{var j=c.lane,L=c.eventTime;if((s&j)===j){w!==null&&(w=w.next={eventTime:L,lane:0,tag:c.tag,payload:c.payload,callback:c.callback,next:null});e:{var R=e,F=c;switch(j=t,L=n,F.tag){case 1:if(R=F.payload,typeof R=="function"){b=R.call(L,b,j);break e}b=R;break e;case 3:R.flags=R.flags&-65537|128;case 0:if(R=F.payload,j=typeof R=="function"?R.call(L,b,j):R,j==null)break e;b=D({},b,j);break e;case 2:en=!0}}c.callback!==null&&c.lane!==0&&(e.flags|=64,j=r.effects,j===null?r.effects=[c]:j.push(c))}else L={eventTime:L,lane:j,tag:c.tag,payload:c.payload,callback:c.callback,next:null},w===null?(g=w=L,u=b):w=w.next=L,o|=j;if(c=c.next,c===null){if(c=r.shared.pending,c===null)break;j=c,c=j.next,j.next=null,r.lastBaseUpdate=j,r.shared.pending=null}}while(!0);if(w===null&&(u=b),r.baseState=u,r.firstBaseUpdate=g,r.lastBaseUpdate=w,t=r.shared.interleaved,t!==null){r=t;do o|=r.lane,r=r.next;while(r!==t)}else a===null&&(r.shared.lanes=0);wn|=o,e.lanes=o,e.memoizedState=b}}function Eo(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var s=e[t],r=s.callback;if(r!==null){if(s.callback=null,s=n,typeof r!="function")throw Error(m(191,r));r.call(s)}}}var Pl={},kt=Zt(Pl),Ml=Zt(Pl),zl=Zt(Pl);function vn(e){if(e===Pl)throw Error(m(174));return e}function ca(e,t){switch(xe(zl,t),xe(Ml,e),xe(kt,Pl),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Ln(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Ln(t,e)}je(kt),xe(kt,t)}function Gn(){je(kt),je(Ml),je(zl)}function _o(e){vn(zl.current);var t=vn(kt.current),n=Ln(t,e.type);t!==n&&(xe(Ml,e),xe(kt,n))}function ua(e){Ml.current===e&&(je(kt),je(Ml))}var ke=Zt(0);function Os(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ma=[];function fa(){for(var e=0;e<ma.length;e++)ma[e]._workInProgressVersionPrimary=null;ma.length=0}var As=le.ReactCurrentDispatcher,pa=le.ReactCurrentBatchConfig,jn=0,Ee=null,Re=null,Pe=null,Vs=!1,$l=!1,Ol=0,Eu=0;function We(){throw Error(m(321))}function ha(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!ht(e[n],t[n]))return!1;return!0}function xa(e,t,n,s,r,a){if(jn=a,Ee=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,As.current=e===null||e.memoizedState===null?Du:Lu,e=n(s,r),$l){a=0;do{if($l=!1,Ol=0,25<=a)throw Error(m(301));a+=1,Pe=Re=null,t.updateQueue=null,As.current=Bu,e=n(s,r)}while($l)}if(As.current=Ws,t=Re!==null&&Re.next!==null,jn=0,Pe=Re=Ee=null,Vs=!1,t)throw Error(m(300));return e}function ga(){var e=Ol!==0;return Ol=0,e}function Et(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Pe===null?Ee.memoizedState=Pe=e:Pe=Pe.next=e,Pe}function ut(){if(Re===null){var e=Ee.alternate;e=e!==null?e.memoizedState:null}else e=Re.next;var t=Pe===null?Ee.memoizedState:Pe.next;if(t!==null)Pe=t,Re=e;else{if(e===null)throw Error(m(310));Re=e,e={memoizedState:Re.memoizedState,baseState:Re.baseState,baseQueue:Re.baseQueue,queue:Re.queue,next:null},Pe===null?Ee.memoizedState=Pe=e:Pe=Pe.next=e}return Pe}function Al(e,t){return typeof t=="function"?t(e):t}function ya(e){var t=ut(),n=t.queue;if(n===null)throw Error(m(311));n.lastRenderedReducer=e;var s=Re,r=s.baseQueue,a=n.pending;if(a!==null){if(r!==null){var o=r.next;r.next=a.next,a.next=o}s.baseQueue=r=a,n.pending=null}if(r!==null){a=r.next,s=s.baseState;var c=o=null,u=null,g=a;do{var w=g.lane;if((jn&w)===w)u!==null&&(u=u.next={lane:0,action:g.action,hasEagerState:g.hasEagerState,eagerState:g.eagerState,next:null}),s=g.hasEagerState?g.eagerState:e(s,g.action);else{var b={lane:w,action:g.action,hasEagerState:g.hasEagerState,eagerState:g.eagerState,next:null};u===null?(c=u=b,o=s):u=u.next=b,Ee.lanes|=w,wn|=w}g=g.next}while(g!==null&&g!==a);u===null?o=s:u.next=c,ht(s,t.memoizedState)||(qe=!0),t.memoizedState=s,t.baseState=o,t.baseQueue=u,n.lastRenderedState=s}if(e=n.interleaved,e!==null){r=e;do a=r.lane,Ee.lanes|=a,wn|=a,r=r.next;while(r!==e)}else r===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function va(e){var t=ut(),n=t.queue;if(n===null)throw Error(m(311));n.lastRenderedReducer=e;var s=n.dispatch,r=n.pending,a=t.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do a=e(a,o.action),o=o.next;while(o!==r);ht(a,t.memoizedState)||(qe=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,s]}function Co(){}function Io(e,t){var n=Ee,s=ut(),r=t(),a=!ht(s.memoizedState,r);if(a&&(s.memoizedState=r,qe=!0),s=s.queue,ja(Bo.bind(null,n,s,e),[e]),s.getSnapshot!==t||a||Pe!==null&&Pe.memoizedState.tag&1){if(n.flags|=2048,Vl(9,Lo.bind(null,n,s,r,t),void 0,null),Me===null)throw Error(m(349));(jn&30)!==0||Do(n,t,r)}return r}function Do(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Ee.updateQueue,t===null?(t={lastEffect:null,stores:null},Ee.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Lo(e,t,n,s){t.value=n,t.getSnapshot=s,To(t)&&Ro(e)}function Bo(e,t,n){return n(function(){To(t)&&Ro(e)})}function To(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!ht(e,n)}catch{return!0}}function Ro(e){var t=Tt(e,1);t!==null&&jt(t,e,1,-1)}function Fo(e){var t=Et();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Al,lastRenderedState:e},t.queue=e,e=e.dispatch=Iu.bind(null,Ee,e),[t.memoizedState,e]}function Vl(e,t,n,s){return e={tag:e,create:t,destroy:n,deps:s,next:null},t=Ee.updateQueue,t===null?(t={lastEffect:null,stores:null},Ee.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(s=n.next,n.next=e,e.next=s,t.lastEffect=e)),e}function Po(){return ut().memoizedState}function Us(e,t,n,s){var r=Et();Ee.flags|=e,r.memoizedState=Vl(1|t,n,void 0,s===void 0?null:s)}function Hs(e,t,n,s){var r=ut();s=s===void 0?null:s;var a=void 0;if(Re!==null){var o=Re.memoizedState;if(a=o.destroy,s!==null&&ha(s,o.deps)){r.memoizedState=Vl(t,n,a,s);return}}Ee.flags|=e,r.memoizedState=Vl(1|t,n,a,s)}function Mo(e,t){return Us(8390656,8,e,t)}function ja(e,t){return Hs(2048,8,e,t)}function zo(e,t){return Hs(4,2,e,t)}function $o(e,t){return Hs(4,4,e,t)}function Oo(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Ao(e,t,n){return n=n!=null?n.concat([e]):null,Hs(4,4,Oo.bind(null,t,e),n)}function wa(){}function Vo(e,t){var n=ut();t=t===void 0?null:t;var s=n.memoizedState;return s!==null&&t!==null&&ha(t,s[1])?s[0]:(n.memoizedState=[e,t],e)}function Uo(e,t){var n=ut();t=t===void 0?null:t;var s=n.memoizedState;return s!==null&&t!==null&&ha(t,s[1])?s[0]:(e=e(),n.memoizedState=[e,t],e)}function Ho(e,t,n){return(jn&21)===0?(e.baseState&&(e.baseState=!1,qe=!0),e.memoizedState=n):(ht(n,t)||(n=vi(),Ee.lanes|=n,wn|=n,e.baseState=!0),t)}function _u(e,t){var n=me;me=n!==0&&4>n?n:4,e(!0);var s=pa.transition;pa.transition={};try{e(!1),t()}finally{me=n,pa.transition=s}}function Wo(){return ut().memoizedState}function Cu(e,t,n){var s=rn(e);if(n={lane:s,action:n,hasEagerState:!1,eagerState:null,next:null},Qo(e))Yo(t,n);else if(n=bo(e,t,n,s),n!==null){var r=Ke();jt(n,e,s,r),Jo(n,t,s)}}function Iu(e,t,n){var s=rn(e),r={lane:s,action:n,hasEagerState:!1,eagerState:null,next:null};if(Qo(e))Yo(t,r);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,c=a(o,n);if(r.hasEagerState=!0,r.eagerState=c,ht(c,o)){var u=t.interleaved;u===null?(r.next=r,oa(t)):(r.next=u.next,u.next=r),t.interleaved=r;return}}catch{}finally{}n=bo(e,t,r,s),n!==null&&(r=Ke(),jt(n,e,s,r),Jo(n,t,s))}}function Qo(e){var t=e.alternate;return e===Ee||t!==null&&t===Ee}function Yo(e,t){$l=Vs=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Jo(e,t,n){if((n&4194240)!==0){var s=t.lanes;s&=e.pendingLanes,n|=s,t.lanes=n,br(e,n)}}var Ws={readContext:ct,useCallback:We,useContext:We,useEffect:We,useImperativeHandle:We,useInsertionEffect:We,useLayoutEffect:We,useMemo:We,useReducer:We,useRef:We,useState:We,useDebugValue:We,useDeferredValue:We,useTransition:We,useMutableSource:We,useSyncExternalStore:We,useId:We,unstable_isNewReconciler:!1},Du={readContext:ct,useCallback:function(e,t){return Et().memoizedState=[e,t===void 0?null:t],e},useContext:ct,useEffect:Mo,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Us(4194308,4,Oo.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Us(4194308,4,e,t)},useInsertionEffect:function(e,t){return Us(4,2,e,t)},useMemo:function(e,t){var n=Et();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var s=Et();return t=n!==void 0?n(t):t,s.memoizedState=s.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},s.queue=e,e=e.dispatch=Cu.bind(null,Ee,e),[s.memoizedState,e]},useRef:function(e){var t=Et();return e={current:e},t.memoizedState=e},useState:Fo,useDebugValue:wa,useDeferredValue:function(e){return Et().memoizedState=e},useTransition:function(){var e=Fo(!1),t=e[0];return e=_u.bind(null,e[1]),Et().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var s=Ee,r=Et();if(be){if(n===void 0)throw Error(m(407));n=n()}else{if(n=t(),Me===null)throw Error(m(349));(jn&30)!==0||Do(s,t,n)}r.memoizedState=n;var a={value:n,getSnapshot:t};return r.queue=a,Mo(Bo.bind(null,s,a,e),[e]),s.flags|=2048,Vl(9,Lo.bind(null,s,a,n,t),void 0,null),n},useId:function(){var e=Et(),t=Me.identifierPrefix;if(be){var n=Bt,s=Lt;n=(s&~(1<<32-pt(s)-1)).toString(32)+n,t=":"+t+"R"+n,n=Ol++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Eu++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Lu={readContext:ct,useCallback:Vo,useContext:ct,useEffect:ja,useImperativeHandle:Ao,useInsertionEffect:zo,useLayoutEffect:$o,useMemo:Uo,useReducer:ya,useRef:Po,useState:function(){return ya(Al)},useDebugValue:wa,useDeferredValue:function(e){var t=ut();return Ho(t,Re.memoizedState,e)},useTransition:function(){var e=ya(Al)[0],t=ut().memoizedState;return[e,t]},useMutableSource:Co,useSyncExternalStore:Io,useId:Wo,unstable_isNewReconciler:!1},Bu={readContext:ct,useCallback:Vo,useContext:ct,useEffect:ja,useImperativeHandle:Ao,useInsertionEffect:zo,useLayoutEffect:$o,useMemo:Uo,useReducer:va,useRef:Po,useState:function(){return va(Al)},useDebugValue:wa,useDeferredValue:function(e){var t=ut();return Re===null?t.memoizedState=e:Ho(t,Re.memoizedState,e)},useTransition:function(){var e=va(Al)[0],t=ut().memoizedState;return[e,t]},useMutableSource:Co,useSyncExternalStore:Io,useId:Wo,unstable_isNewReconciler:!1};function gt(e,t){if(e&&e.defaultProps){t=D({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Na(e,t,n,s){t=e.memoizedState,n=n(s,t),n=n==null?t:D({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Qs={isMounted:function(e){return(e=e._reactInternals)?fn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var s=Ke(),r=rn(e),a=Rt(s,r);a.payload=t,n!=null&&(a.callback=n),t=tn(e,a,r),t!==null&&(jt(t,e,r,s),zs(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var s=Ke(),r=rn(e),a=Rt(s,r);a.tag=1,a.payload=t,n!=null&&(a.callback=n),t=tn(e,a,r),t!==null&&(jt(t,e,r,s),zs(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ke(),s=rn(e),r=Rt(n,s);r.tag=2,t!=null&&(r.callback=t),t=tn(e,r,s),t!==null&&(jt(t,e,s,n),zs(t,e,s))}};function Ko(e,t,n,s,r,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(s,a,o):t.prototype&&t.prototype.isPureReactComponent?!Cl(n,s)||!Cl(r,a):!0}function Go(e,t,n){var s=!1,r=qt,a=t.contextType;return typeof a=="object"&&a!==null?a=ct(a):(r=Ze(t)?hn:He.current,s=t.contextTypes,a=(s=s!=null)?Un(e,r):qt),t=new t(n,a),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Qs,e.stateNode=t,t._reactInternals=e,s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=r,e.__reactInternalMemoizedMaskedChildContext=a),t}function Zo(e,t,n,s){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,s),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,s),t.state!==e&&Qs.enqueueReplaceState(t,t.state,null)}function ba(e,t,n,s){var r=e.stateNode;r.props=n,r.state=e.memoizedState,r.refs={},da(e);var a=t.contextType;typeof a=="object"&&a!==null?r.context=ct(a):(a=Ze(t)?hn:He.current,r.context=Un(e,a)),r.state=e.memoizedState,a=t.getDerivedStateFromProps,typeof a=="function"&&(Na(e,t,a,n),r.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(t=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),t!==r.state&&Qs.enqueueReplaceState(r,r.state,null),$s(e,n,r,s),r.state=e.memoizedState),typeof r.componentDidMount=="function"&&(e.flags|=4194308)}function Zn(e,t){try{var n="",s=t;do n+=se(s),s=s.return;while(s);var r=n}catch(a){r=`
Error generating stack: `+a.message+`
`+a.stack}return{value:e,source:t,stack:r,digest:null}}function Sa(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function ka(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Tu=typeof WeakMap=="function"?WeakMap:Map;function qo(e,t,n){n=Rt(-1,n),n.tag=3,n.payload={element:null};var s=t.value;return n.callback=function(){Xs||(Xs=!0,Oa=s),ka(e,t)},n}function Xo(e,t,n){n=Rt(-1,n),n.tag=3;var s=e.type.getDerivedStateFromError;if(typeof s=="function"){var r=t.value;n.payload=function(){return s(r)},n.callback=function(){ka(e,t)}}var a=e.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(n.callback=function(){ka(e,t),typeof s!="function"&&(ln===null?ln=new Set([this]):ln.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function ed(e,t,n){var s=e.pingCache;if(s===null){s=e.pingCache=new Tu;var r=new Set;s.set(t,r)}else r=s.get(t),r===void 0&&(r=new Set,s.set(t,r));r.has(n)||(r.add(n),e=Yu.bind(null,e,t,n),t.then(e,e))}function td(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function nd(e,t,n,s,r){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Rt(-1,1),t.tag=2,tn(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=r,e)}var Ru=le.ReactCurrentOwner,qe=!1;function Je(e,t,n,s){t.child=e===null?No(t,null,n,s):Yn(t,e.child,n,s)}function ld(e,t,n,s,r){n=n.render;var a=t.ref;return Kn(t,r),s=xa(e,t,n,s,a,r),n=ga(),e!==null&&!qe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r,Ft(e,t,r)):(be&&n&&Xr(t),t.flags|=1,Je(e,t,s,r),t.child)}function sd(e,t,n,s,r){if(e===null){var a=n.type;return typeof a=="function"&&!Ya(a)&&a.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=a,rd(e,t,a,s,r)):(e=rr(n.type,null,s,t,t.mode,r),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,(e.lanes&r)===0){var o=a.memoizedProps;if(n=n.compare,n=n!==null?n:Cl,n(o,s)&&e.ref===t.ref)return Ft(e,t,r)}return t.flags|=1,e=on(a,s),e.ref=t.ref,e.return=t,t.child=e}function rd(e,t,n,s,r){if(e!==null){var a=e.memoizedProps;if(Cl(a,s)&&e.ref===t.ref)if(qe=!1,t.pendingProps=s=a,(e.lanes&r)!==0)(e.flags&131072)!==0&&(qe=!0);else return t.lanes=e.lanes,Ft(e,t,r)}return Ea(e,t,n,s,r)}function ad(e,t,n){var s=t.pendingProps,r=s.children,a=e!==null?e.memoizedState:null;if(s.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},xe(Xn,at),at|=n;else{if((n&1073741824)===0)return e=a!==null?a.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,xe(Xn,at),at|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},s=a!==null?a.baseLanes:n,xe(Xn,at),at|=s}else a!==null?(s=a.baseLanes|n,t.memoizedState=null):s=n,xe(Xn,at),at|=s;return Je(e,t,r,n),t.child}function id(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Ea(e,t,n,s,r){var a=Ze(n)?hn:He.current;return a=Un(t,a),Kn(t,r),n=xa(e,t,n,s,a,r),s=ga(),e!==null&&!qe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r,Ft(e,t,r)):(be&&s&&Xr(t),t.flags|=1,Je(e,t,n,r),t.child)}function od(e,t,n,s,r){if(Ze(n)){var a=!0;Ds(t)}else a=!1;if(Kn(t,r),t.stateNode===null)Js(e,t),Go(t,n,s),ba(t,n,s,r),s=!0;else if(e===null){var o=t.stateNode,c=t.memoizedProps;o.props=c;var u=o.context,g=n.contextType;typeof g=="object"&&g!==null?g=ct(g):(g=Ze(n)?hn:He.current,g=Un(t,g));var w=n.getDerivedStateFromProps,b=typeof w=="function"||typeof o.getSnapshotBeforeUpdate=="function";b||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(c!==s||u!==g)&&Zo(t,o,s,g),en=!1;var j=t.memoizedState;o.state=j,$s(t,s,o,r),u=t.memoizedState,c!==s||j!==u||Ge.current||en?(typeof w=="function"&&(Na(t,n,w,s),u=t.memoizedState),(c=en||Ko(t,n,c,s,j,u,g))?(b||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=s,t.memoizedState=u),o.props=s,o.state=u,o.context=g,s=c):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),s=!1)}else{o=t.stateNode,So(e,t),c=t.memoizedProps,g=t.type===t.elementType?c:gt(t.type,c),o.props=g,b=t.pendingProps,j=o.context,u=n.contextType,typeof u=="object"&&u!==null?u=ct(u):(u=Ze(n)?hn:He.current,u=Un(t,u));var L=n.getDerivedStateFromProps;(w=typeof L=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(c!==b||j!==u)&&Zo(t,o,s,u),en=!1,j=t.memoizedState,o.state=j,$s(t,s,o,r);var R=t.memoizedState;c!==b||j!==R||Ge.current||en?(typeof L=="function"&&(Na(t,n,L,s),R=t.memoizedState),(g=en||Ko(t,n,g,s,j,R,u)||!1)?(w||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(s,R,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(s,R,u)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||c===e.memoizedProps&&j===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&j===e.memoizedState||(t.flags|=1024),t.memoizedProps=s,t.memoizedState=R),o.props=s,o.state=R,o.context=u,s=g):(typeof o.componentDidUpdate!="function"||c===e.memoizedProps&&j===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&j===e.memoizedState||(t.flags|=1024),s=!1)}return _a(e,t,n,s,a,r)}function _a(e,t,n,s,r,a){id(e,t);var o=(t.flags&128)!==0;if(!s&&!o)return r&&fo(t,n,!1),Ft(e,t,a);s=t.stateNode,Ru.current=t;var c=o&&typeof n.getDerivedStateFromError!="function"?null:s.render();return t.flags|=1,e!==null&&o?(t.child=Yn(t,e.child,null,a),t.child=Yn(t,null,c,a)):Je(e,t,c,a),t.memoizedState=s.state,r&&fo(t,n,!0),t.child}function dd(e){var t=e.stateNode;t.pendingContext?uo(e,t.pendingContext,t.pendingContext!==t.context):t.context&&uo(e,t.context,!1),ca(e,t.containerInfo)}function cd(e,t,n,s,r){return Qn(),la(r),t.flags|=256,Je(e,t,n,s),t.child}var Ca={dehydrated:null,treeContext:null,retryLane:0};function Ia(e){return{baseLanes:e,cachePool:null,transitions:null}}function ud(e,t,n){var s=t.pendingProps,r=ke.current,a=!1,o=(t.flags&128)!==0,c;if((c=o)||(c=e!==null&&e.memoizedState===null?!1:(r&2)!==0),c?(a=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(r|=1),xe(ke,r&1),e===null)return na(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(o=s.children,e=s.fallback,a?(s=t.mode,a=t.child,o={mode:"hidden",children:o},(s&1)===0&&a!==null?(a.childLanes=0,a.pendingProps=o):a=ar(o,s,0,null),e=kn(e,s,n,null),a.return=t,e.return=t,a.sibling=e,t.child=a,t.child.memoizedState=Ia(n),t.memoizedState=Ca,e):Da(t,o));if(r=e.memoizedState,r!==null&&(c=r.dehydrated,c!==null))return Fu(e,t,o,s,c,r,n);if(a){a=s.fallback,o=t.mode,r=e.child,c=r.sibling;var u={mode:"hidden",children:s.children};return(o&1)===0&&t.child!==r?(s=t.child,s.childLanes=0,s.pendingProps=u,t.deletions=null):(s=on(r,u),s.subtreeFlags=r.subtreeFlags&14680064),c!==null?a=on(c,a):(a=kn(a,o,n,null),a.flags|=2),a.return=t,s.return=t,s.sibling=a,t.child=s,s=a,a=t.child,o=e.child.memoizedState,o=o===null?Ia(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},a.memoizedState=o,a.childLanes=e.childLanes&~n,t.memoizedState=Ca,s}return a=e.child,e=a.sibling,s=on(a,{mode:"visible",children:s.children}),(t.mode&1)===0&&(s.lanes=n),s.return=t,s.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=s,t.memoizedState=null,s}function Da(e,t){return t=ar({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Ys(e,t,n,s){return s!==null&&la(s),Yn(t,e.child,null,n),e=Da(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Fu(e,t,n,s,r,a,o){if(n)return t.flags&256?(t.flags&=-257,s=Sa(Error(m(422))),Ys(e,t,o,s)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(a=s.fallback,r=t.mode,s=ar({mode:"visible",children:s.children},r,0,null),a=kn(a,r,o,null),a.flags|=2,s.return=t,a.return=t,s.sibling=a,t.child=s,(t.mode&1)!==0&&Yn(t,e.child,null,o),t.child.memoizedState=Ia(o),t.memoizedState=Ca,a);if((t.mode&1)===0)return Ys(e,t,o,null);if(r.data==="$!"){if(s=r.nextSibling&&r.nextSibling.dataset,s)var c=s.dgst;return s=c,a=Error(m(419)),s=Sa(a,s,void 0),Ys(e,t,o,s)}if(c=(o&e.childLanes)!==0,qe||c){if(s=Me,s!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=(r&(s.suspendedLanes|o))!==0?0:r,r!==0&&r!==a.retryLane&&(a.retryLane=r,Tt(e,r),jt(s,e,r,-1))}return Qa(),s=Sa(Error(m(421))),Ys(e,t,o,s)}return r.data==="$?"?(t.flags|=128,t.child=e.child,t=Ju.bind(null,e),r._reactRetry=t,null):(e=a.treeContext,rt=Gt(r.nextSibling),st=t,be=!0,xt=null,e!==null&&(ot[dt++]=Lt,ot[dt++]=Bt,ot[dt++]=xn,Lt=e.id,Bt=e.overflow,xn=t),t=Da(t,s.children),t.flags|=4096,t)}function md(e,t,n){e.lanes|=t;var s=e.alternate;s!==null&&(s.lanes|=t),ia(e.return,t,n)}function La(e,t,n,s,r){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:s,tail:n,tailMode:r}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=s,a.tail=n,a.tailMode=r)}function fd(e,t,n){var s=t.pendingProps,r=s.revealOrder,a=s.tail;if(Je(e,t,s.children,n),s=ke.current,(s&2)!==0)s=s&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&md(e,n,t);else if(e.tag===19)md(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}s&=1}if(xe(ke,s),(t.mode&1)===0)t.memoizedState=null;else switch(r){case"forwards":for(n=t.child,r=null;n!==null;)e=n.alternate,e!==null&&Os(e)===null&&(r=n),n=n.sibling;n=r,n===null?(r=t.child,t.child=null):(r=n.sibling,n.sibling=null),La(t,!1,r,n,a);break;case"backwards":for(n=null,r=t.child,t.child=null;r!==null;){if(e=r.alternate,e!==null&&Os(e)===null){t.child=r;break}e=r.sibling,r.sibling=n,n=r,r=e}La(t,!0,n,null,a);break;case"together":La(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Js(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Ft(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),wn|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(m(153));if(t.child!==null){for(e=t.child,n=on(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=on(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Pu(e,t,n){switch(t.tag){case 3:dd(t),Qn();break;case 5:_o(t);break;case 1:Ze(t.type)&&Ds(t);break;case 4:ca(t,t.stateNode.containerInfo);break;case 10:var s=t.type._context,r=t.memoizedProps.value;xe(Ps,s._currentValue),s._currentValue=r;break;case 13:if(s=t.memoizedState,s!==null)return s.dehydrated!==null?(xe(ke,ke.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?ud(e,t,n):(xe(ke,ke.current&1),e=Ft(e,t,n),e!==null?e.sibling:null);xe(ke,ke.current&1);break;case 19:if(s=(n&t.childLanes)!==0,(e.flags&128)!==0){if(s)return fd(e,t,n);t.flags|=128}if(r=t.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),xe(ke,ke.current),s)break;return null;case 22:case 23:return t.lanes=0,ad(e,t,n)}return Ft(e,t,n)}var pd,Ba,hd,xd;pd=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},Ba=function(){},hd=function(e,t,n,s){var r=e.memoizedProps;if(r!==s){e=t.stateNode,vn(kt.current);var a=null;switch(n){case"input":r=In(e,r),s=In(e,s),a=[];break;case"select":r=D({},r,{value:void 0}),s=D({},s,{value:void 0}),a=[];break;case"textarea":r=dl(e,r),s=dl(e,s),a=[];break;default:typeof r.onClick!="function"&&typeof s.onClick=="function"&&(e.onclick=_s)}ul(n,s);var o;n=null;for(g in r)if(!s.hasOwnProperty(g)&&r.hasOwnProperty(g)&&r[g]!=null)if(g==="style"){var c=r[g];for(o in c)c.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else g!=="dangerouslySetInnerHTML"&&g!=="children"&&g!=="suppressContentEditableWarning"&&g!=="suppressHydrationWarning"&&g!=="autoFocus"&&(v.hasOwnProperty(g)?a||(a=[]):(a=a||[]).push(g,null));for(g in s){var u=s[g];if(c=r!=null?r[g]:void 0,s.hasOwnProperty(g)&&u!==c&&(u!=null||c!=null))if(g==="style")if(c){for(o in c)!c.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in u)u.hasOwnProperty(o)&&c[o]!==u[o]&&(n||(n={}),n[o]=u[o])}else n||(a||(a=[]),a.push(g,n)),n=u;else g==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,c=c?c.__html:void 0,u!=null&&c!==u&&(a=a||[]).push(g,u)):g==="children"?typeof u!="string"&&typeof u!="number"||(a=a||[]).push(g,""+u):g!=="suppressContentEditableWarning"&&g!=="suppressHydrationWarning"&&(v.hasOwnProperty(g)?(u!=null&&g==="onScroll"&&ve("scroll",e),a||c===u||(a=[])):(a=a||[]).push(g,u))}n&&(a=a||[]).push("style",n);var g=a;(t.updateQueue=g)&&(t.flags|=4)}},xd=function(e,t,n,s){n!==s&&(t.flags|=4)};function Ul(e,t){if(!be)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var s=null;n!==null;)n.alternate!==null&&(s=n),n=n.sibling;s===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:s.sibling=null}}function Qe(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,s=0;if(t)for(var r=e.child;r!==null;)n|=r.lanes|r.childLanes,s|=r.subtreeFlags&14680064,s|=r.flags&14680064,r.return=e,r=r.sibling;else for(r=e.child;r!==null;)n|=r.lanes|r.childLanes,s|=r.subtreeFlags,s|=r.flags,r.return=e,r=r.sibling;return e.subtreeFlags|=s,e.childLanes=n,t}function Mu(e,t,n){var s=t.pendingProps;switch(ea(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Qe(t),null;case 1:return Ze(t.type)&&Is(),Qe(t),null;case 3:return s=t.stateNode,Gn(),je(Ge),je(He),fa(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(Rs(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,xt!==null&&(Ua(xt),xt=null))),Ba(e,t),Qe(t),null;case 5:ua(t);var r=vn(zl.current);if(n=t.type,e!==null&&t.stateNode!=null)hd(e,t,n,s,r),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!s){if(t.stateNode===null)throw Error(m(166));return Qe(t),null}if(e=vn(kt.current),Rs(t)){s=t.stateNode,n=t.type;var a=t.memoizedProps;switch(s[St]=t,s[Tl]=a,e=(t.mode&1)!==0,n){case"dialog":ve("cancel",s),ve("close",s);break;case"iframe":case"object":case"embed":ve("load",s);break;case"video":case"audio":for(r=0;r<Dl.length;r++)ve(Dl[r],s);break;case"source":ve("error",s);break;case"img":case"image":case"link":ve("error",s),ve("load",s);break;case"details":ve("toggle",s);break;case"input":Dn(s,a),ve("invalid",s);break;case"select":s._wrapperState={wasMultiple:!!a.multiple},ve("invalid",s);break;case"textarea":cl(s,a),ve("invalid",s)}ul(n,a),r=null;for(var o in a)if(a.hasOwnProperty(o)){var c=a[o];o==="children"?typeof c=="string"?s.textContent!==c&&(a.suppressHydrationWarning!==!0&&Es(s.textContent,c,e),r=["children",c]):typeof c=="number"&&s.textContent!==""+c&&(a.suppressHydrationWarning!==!0&&Es(s.textContent,c,e),r=["children",""+c]):v.hasOwnProperty(o)&&c!=null&&o==="onScroll"&&ve("scroll",s)}switch(n){case"input":_n(s),il(s,a,!0);break;case"textarea":_n(s),zt(s);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(s.onclick=_s)}s=r,t.updateQueue=s,s!==null&&(t.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=un(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof s.is=="string"?e=o.createElement(n,{is:s.is}):(e=o.createElement(n),n==="select"&&(o=e,s.multiple?o.multiple=!0:s.size&&(o.size=s.size))):e=o.createElementNS(e,n),e[St]=t,e[Tl]=s,pd(e,t,!1,!1),t.stateNode=e;e:{switch(o=Tn(n,s),n){case"dialog":ve("cancel",e),ve("close",e),r=s;break;case"iframe":case"object":case"embed":ve("load",e),r=s;break;case"video":case"audio":for(r=0;r<Dl.length;r++)ve(Dl[r],e);r=s;break;case"source":ve("error",e),r=s;break;case"img":case"image":case"link":ve("error",e),ve("load",e),r=s;break;case"details":ve("toggle",e),r=s;break;case"input":Dn(e,s),r=In(e,s),ve("invalid",e);break;case"option":r=s;break;case"select":e._wrapperState={wasMultiple:!!s.multiple},r=D({},s,{value:void 0}),ve("invalid",e);break;case"textarea":cl(e,s),r=dl(e,s),ve("invalid",e);break;default:r=s}ul(n,r),c=r;for(a in c)if(c.hasOwnProperty(a)){var u=c[a];a==="style"?ns(e,u):a==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&Xl(e,u)):a==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&mn(e,u):typeof u=="number"&&mn(e,""+u):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(v.hasOwnProperty(a)?u!=null&&a==="onScroll"&&ve("scroll",e):u!=null&&ue(e,a,u,o))}switch(n){case"input":_n(e),il(e,s,!1);break;case"textarea":_n(e),zt(e);break;case"option":s.value!=null&&e.setAttribute("value",""+ae(s.value));break;case"select":e.multiple=!!s.multiple,a=s.value,a!=null?Ct(e,!!s.multiple,a,!1):s.defaultValue!=null&&Ct(e,!!s.multiple,s.defaultValue,!0);break;default:typeof r.onClick=="function"&&(e.onclick=_s)}switch(n){case"button":case"input":case"select":case"textarea":s=!!s.autoFocus;break e;case"img":s=!0;break e;default:s=!1}}s&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Qe(t),null;case 6:if(e&&t.stateNode!=null)xd(e,t,e.memoizedProps,s);else{if(typeof s!="string"&&t.stateNode===null)throw Error(m(166));if(n=vn(zl.current),vn(kt.current),Rs(t)){if(s=t.stateNode,n=t.memoizedProps,s[St]=t,(a=s.nodeValue!==n)&&(e=st,e!==null))switch(e.tag){case 3:Es(s.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Es(s.nodeValue,n,(e.mode&1)!==0)}a&&(t.flags|=4)}else s=(n.nodeType===9?n:n.ownerDocument).createTextNode(s),s[St]=t,t.stateNode=s}return Qe(t),null;case 13:if(je(ke),s=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(be&&rt!==null&&(t.mode&1)!==0&&(t.flags&128)===0)vo(),Qn(),t.flags|=98560,a=!1;else if(a=Rs(t),s!==null&&s.dehydrated!==null){if(e===null){if(!a)throw Error(m(318));if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(m(317));a[St]=t}else Qn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Qe(t),a=!1}else xt!==null&&(Ua(xt),xt=null),a=!0;if(!a)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(s=s!==null,s!==(e!==null&&e.memoizedState!==null)&&s&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(ke.current&1)!==0?Fe===0&&(Fe=3):Qa())),t.updateQueue!==null&&(t.flags|=4),Qe(t),null);case 4:return Gn(),Ba(e,t),e===null&&Ll(t.stateNode.containerInfo),Qe(t),null;case 10:return aa(t.type._context),Qe(t),null;case 17:return Ze(t.type)&&Is(),Qe(t),null;case 19:if(je(ke),a=t.memoizedState,a===null)return Qe(t),null;if(s=(t.flags&128)!==0,o=a.rendering,o===null)if(s)Ul(a,!1);else{if(Fe!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(o=Os(e),o!==null){for(t.flags|=128,Ul(a,!1),s=o.updateQueue,s!==null&&(t.updateQueue=s,t.flags|=4),t.subtreeFlags=0,s=n,n=t.child;n!==null;)a=n,e=s,a.flags&=14680066,o=a.alternate,o===null?(a.childLanes=0,a.lanes=e,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=o.childLanes,a.lanes=o.lanes,a.child=o.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=o.memoizedProps,a.memoizedState=o.memoizedState,a.updateQueue=o.updateQueue,a.type=o.type,e=o.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return xe(ke,ke.current&1|2),t.child}e=e.sibling}a.tail!==null&&Le()>el&&(t.flags|=128,s=!0,Ul(a,!1),t.lanes=4194304)}else{if(!s)if(e=Os(o),e!==null){if(t.flags|=128,s=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Ul(a,!0),a.tail===null&&a.tailMode==="hidden"&&!o.alternate&&!be)return Qe(t),null}else 2*Le()-a.renderingStartTime>el&&n!==1073741824&&(t.flags|=128,s=!0,Ul(a,!1),t.lanes=4194304);a.isBackwards?(o.sibling=t.child,t.child=o):(n=a.last,n!==null?n.sibling=o:t.child=o,a.last=o)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=Le(),t.sibling=null,n=ke.current,xe(ke,s?n&1|2:n&1),t):(Qe(t),null);case 22:case 23:return Wa(),s=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==s&&(t.flags|=8192),s&&(t.mode&1)!==0?(at&1073741824)!==0&&(Qe(t),t.subtreeFlags&6&&(t.flags|=8192)):Qe(t),null;case 24:return null;case 25:return null}throw Error(m(156,t.tag))}function zu(e,t){switch(ea(t),t.tag){case 1:return Ze(t.type)&&Is(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Gn(),je(Ge),je(He),fa(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return ua(t),null;case 13:if(je(ke),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(m(340));Qn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return je(ke),null;case 4:return Gn(),null;case 10:return aa(t.type._context),null;case 22:case 23:return Wa(),null;case 24:return null;default:return null}}var Ks=!1,Ye=!1,$u=typeof WeakSet=="function"?WeakSet:Set,T=null;function qn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(s){Ie(e,t,s)}else n.current=null}function Ta(e,t,n){try{n()}catch(s){Ie(e,t,s)}}var gd=!1;function Ou(e,t){if(Wr=hs,e=Ji(),Mr(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var s=n.getSelection&&n.getSelection();if(s&&s.rangeCount!==0){n=s.anchorNode;var r=s.anchorOffset,a=s.focusNode;s=s.focusOffset;try{n.nodeType,a.nodeType}catch{n=null;break e}var o=0,c=-1,u=-1,g=0,w=0,b=e,j=null;t:for(;;){for(var L;b!==n||r!==0&&b.nodeType!==3||(c=o+r),b!==a||s!==0&&b.nodeType!==3||(u=o+s),b.nodeType===3&&(o+=b.nodeValue.length),(L=b.firstChild)!==null;)j=b,b=L;for(;;){if(b===e)break t;if(j===n&&++g===r&&(c=o),j===a&&++w===s&&(u=o),(L=b.nextSibling)!==null)break;b=j,j=b.parentNode}b=L}n=c===-1||u===-1?null:{start:c,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(Qr={focusedElem:e,selectionRange:n},hs=!1,T=t;T!==null;)if(t=T,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,T=e;else for(;T!==null;){t=T;try{var R=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(R!==null){var F=R.memoizedProps,Be=R.memoizedState,h=t.stateNode,f=h.getSnapshotBeforeUpdate(t.elementType===t.type?F:gt(t.type,F),Be);h.__reactInternalSnapshotBeforeUpdate=f}break;case 3:var x=t.stateNode.containerInfo;x.nodeType===1?x.textContent="":x.nodeType===9&&x.documentElement&&x.removeChild(x.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(m(163))}}catch(S){Ie(t,t.return,S)}if(e=t.sibling,e!==null){e.return=t.return,T=e;break}T=t.return}return R=gd,gd=!1,R}function Hl(e,t,n){var s=t.updateQueue;if(s=s!==null?s.lastEffect:null,s!==null){var r=s=s.next;do{if((r.tag&e)===e){var a=r.destroy;r.destroy=void 0,a!==void 0&&Ta(t,n,a)}r=r.next}while(r!==s)}}function Gs(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var s=n.create;n.destroy=s()}n=n.next}while(n!==t)}}function Ra(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function yd(e){var t=e.alternate;t!==null&&(e.alternate=null,yd(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[St],delete t[Tl],delete t[Gr],delete t[Nu],delete t[bu])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function vd(e){return e.tag===5||e.tag===3||e.tag===4}function jd(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||vd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Fa(e,t,n){var s=e.tag;if(s===5||s===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=_s));else if(s!==4&&(e=e.child,e!==null))for(Fa(e,t,n),e=e.sibling;e!==null;)Fa(e,t,n),e=e.sibling}function Pa(e,t,n){var s=e.tag;if(s===5||s===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(s!==4&&(e=e.child,e!==null))for(Pa(e,t,n),e=e.sibling;e!==null;)Pa(e,t,n),e=e.sibling}var Ve=null,yt=!1;function nn(e,t,n){for(n=n.child;n!==null;)wd(e,t,n),n=n.sibling}function wd(e,t,n){if(bt&&typeof bt.onCommitFiberUnmount=="function")try{bt.onCommitFiberUnmount(ds,n)}catch{}switch(n.tag){case 5:Ye||qn(n,t);case 6:var s=Ve,r=yt;Ve=null,nn(e,t,n),Ve=s,yt=r,Ve!==null&&(yt?(e=Ve,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Ve.removeChild(n.stateNode));break;case 18:Ve!==null&&(yt?(e=Ve,n=n.stateNode,e.nodeType===8?Kr(e.parentNode,n):e.nodeType===1&&Kr(e,n),Nl(e)):Kr(Ve,n.stateNode));break;case 4:s=Ve,r=yt,Ve=n.stateNode.containerInfo,yt=!0,nn(e,t,n),Ve=s,yt=r;break;case 0:case 11:case 14:case 15:if(!Ye&&(s=n.updateQueue,s!==null&&(s=s.lastEffect,s!==null))){r=s=s.next;do{var a=r,o=a.destroy;a=a.tag,o!==void 0&&((a&2)!==0||(a&4)!==0)&&Ta(n,t,o),r=r.next}while(r!==s)}nn(e,t,n);break;case 1:if(!Ye&&(qn(n,t),s=n.stateNode,typeof s.componentWillUnmount=="function"))try{s.props=n.memoizedProps,s.state=n.memoizedState,s.componentWillUnmount()}catch(c){Ie(n,t,c)}nn(e,t,n);break;case 21:nn(e,t,n);break;case 22:n.mode&1?(Ye=(s=Ye)||n.memoizedState!==null,nn(e,t,n),Ye=s):nn(e,t,n);break;default:nn(e,t,n)}}function Nd(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new $u),t.forEach(function(s){var r=Ku.bind(null,e,s);n.has(s)||(n.add(s),s.then(r,r))})}}function vt(e,t){var n=t.deletions;if(n!==null)for(var s=0;s<n.length;s++){var r=n[s];try{var a=e,o=t,c=o;e:for(;c!==null;){switch(c.tag){case 5:Ve=c.stateNode,yt=!1;break e;case 3:Ve=c.stateNode.containerInfo,yt=!0;break e;case 4:Ve=c.stateNode.containerInfo,yt=!0;break e}c=c.return}if(Ve===null)throw Error(m(160));wd(a,o,r),Ve=null,yt=!1;var u=r.alternate;u!==null&&(u.return=null),r.return=null}catch(g){Ie(r,t,g)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)bd(t,e),t=t.sibling}function bd(e,t){var n=e.alternate,s=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(vt(t,e),_t(e),s&4){try{Hl(3,e,e.return),Gs(3,e)}catch(F){Ie(e,e.return,F)}try{Hl(5,e,e.return)}catch(F){Ie(e,e.return,F)}}break;case 1:vt(t,e),_t(e),s&512&&n!==null&&qn(n,n.return);break;case 5:if(vt(t,e),_t(e),s&512&&n!==null&&qn(n,n.return),e.flags&32){var r=e.stateNode;try{mn(r,"")}catch(F){Ie(e,e.return,F)}}if(s&4&&(r=e.stateNode,r!=null)){var a=e.memoizedProps,o=n!==null?n.memoizedProps:a,c=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{c==="input"&&a.type==="radio"&&a.name!=null&&rl(r,a),Tn(c,o);var g=Tn(c,a);for(o=0;o<u.length;o+=2){var w=u[o],b=u[o+1];w==="style"?ns(r,b):w==="dangerouslySetInnerHTML"?Xl(r,b):w==="children"?mn(r,b):ue(r,w,b,g)}switch(c){case"input":al(r,a);break;case"textarea":ql(r,a);break;case"select":var j=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!a.multiple;var L=a.value;L!=null?Ct(r,!!a.multiple,L,!1):j!==!!a.multiple&&(a.defaultValue!=null?Ct(r,!!a.multiple,a.defaultValue,!0):Ct(r,!!a.multiple,a.multiple?[]:"",!1))}r[Tl]=a}catch(F){Ie(e,e.return,F)}}break;case 6:if(vt(t,e),_t(e),s&4){if(e.stateNode===null)throw Error(m(162));r=e.stateNode,a=e.memoizedProps;try{r.nodeValue=a}catch(F){Ie(e,e.return,F)}}break;case 3:if(vt(t,e),_t(e),s&4&&n!==null&&n.memoizedState.isDehydrated)try{Nl(t.containerInfo)}catch(F){Ie(e,e.return,F)}break;case 4:vt(t,e),_t(e);break;case 13:vt(t,e),_t(e),r=e.child,r.flags&8192&&(a=r.memoizedState!==null,r.stateNode.isHidden=a,!a||r.alternate!==null&&r.alternate.memoizedState!==null||($a=Le())),s&4&&Nd(e);break;case 22:if(w=n!==null&&n.memoizedState!==null,e.mode&1?(Ye=(g=Ye)||w,vt(t,e),Ye=g):vt(t,e),_t(e),s&8192){if(g=e.memoizedState!==null,(e.stateNode.isHidden=g)&&!w&&(e.mode&1)!==0)for(T=e,w=e.child;w!==null;){for(b=T=w;T!==null;){switch(j=T,L=j.child,j.tag){case 0:case 11:case 14:case 15:Hl(4,j,j.return);break;case 1:qn(j,j.return);var R=j.stateNode;if(typeof R.componentWillUnmount=="function"){s=j,n=j.return;try{t=s,R.props=t.memoizedProps,R.state=t.memoizedState,R.componentWillUnmount()}catch(F){Ie(s,n,F)}}break;case 5:qn(j,j.return);break;case 22:if(j.memoizedState!==null){Ed(b);continue}}L!==null?(L.return=j,T=L):Ed(b)}w=w.sibling}e:for(w=null,b=e;;){if(b.tag===5){if(w===null){w=b;try{r=b.stateNode,g?(a=r.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(c=b.stateNode,u=b.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,c.style.display=ts("display",o))}catch(F){Ie(e,e.return,F)}}}else if(b.tag===6){if(w===null)try{b.stateNode.nodeValue=g?"":b.memoizedProps}catch(F){Ie(e,e.return,F)}}else if((b.tag!==22&&b.tag!==23||b.memoizedState===null||b===e)&&b.child!==null){b.child.return=b,b=b.child;continue}if(b===e)break e;for(;b.sibling===null;){if(b.return===null||b.return===e)break e;w===b&&(w=null),b=b.return}w===b&&(w=null),b.sibling.return=b.return,b=b.sibling}}break;case 19:vt(t,e),_t(e),s&4&&Nd(e);break;case 21:break;default:vt(t,e),_t(e)}}function _t(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(vd(n)){var s=n;break e}n=n.return}throw Error(m(160))}switch(s.tag){case 5:var r=s.stateNode;s.flags&32&&(mn(r,""),s.flags&=-33);var a=jd(e);Pa(e,a,r);break;case 3:case 4:var o=s.stateNode.containerInfo,c=jd(e);Fa(e,c,o);break;default:throw Error(m(161))}}catch(u){Ie(e,e.return,u)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Au(e,t,n){T=e,Sd(e)}function Sd(e,t,n){for(var s=(e.mode&1)!==0;T!==null;){var r=T,a=r.child;if(r.tag===22&&s){var o=r.memoizedState!==null||Ks;if(!o){var c=r.alternate,u=c!==null&&c.memoizedState!==null||Ye;c=Ks;var g=Ye;if(Ks=o,(Ye=u)&&!g)for(T=r;T!==null;)o=T,u=o.child,o.tag===22&&o.memoizedState!==null?_d(r):u!==null?(u.return=o,T=u):_d(r);for(;a!==null;)T=a,Sd(a),a=a.sibling;T=r,Ks=c,Ye=g}kd(e)}else(r.subtreeFlags&8772)!==0&&a!==null?(a.return=r,T=a):kd(e)}}function kd(e){for(;T!==null;){var t=T;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:Ye||Gs(5,t);break;case 1:var s=t.stateNode;if(t.flags&4&&!Ye)if(n===null)s.componentDidMount();else{var r=t.elementType===t.type?n.memoizedProps:gt(t.type,n.memoizedProps);s.componentDidUpdate(r,n.memoizedState,s.__reactInternalSnapshotBeforeUpdate)}var a=t.updateQueue;a!==null&&Eo(t,a,s);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Eo(t,o,n)}break;case 5:var c=t.stateNode;if(n===null&&t.flags&4){n=c;var u=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var g=t.alternate;if(g!==null){var w=g.memoizedState;if(w!==null){var b=w.dehydrated;b!==null&&Nl(b)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(m(163))}Ye||t.flags&512&&Ra(t)}catch(j){Ie(t,t.return,j)}}if(t===e){T=null;break}if(n=t.sibling,n!==null){n.return=t.return,T=n;break}T=t.return}}function Ed(e){for(;T!==null;){var t=T;if(t===e){T=null;break}var n=t.sibling;if(n!==null){n.return=t.return,T=n;break}T=t.return}}function _d(e){for(;T!==null;){var t=T;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Gs(4,t)}catch(u){Ie(t,n,u)}break;case 1:var s=t.stateNode;if(typeof s.componentDidMount=="function"){var r=t.return;try{s.componentDidMount()}catch(u){Ie(t,r,u)}}var a=t.return;try{Ra(t)}catch(u){Ie(t,a,u)}break;case 5:var o=t.return;try{Ra(t)}catch(u){Ie(t,o,u)}}}catch(u){Ie(t,t.return,u)}if(t===e){T=null;break}var c=t.sibling;if(c!==null){c.return=t.return,T=c;break}T=t.return}}var Vu=Math.ceil,Zs=le.ReactCurrentDispatcher,Ma=le.ReactCurrentOwner,mt=le.ReactCurrentBatchConfig,ie=0,Me=null,Te=null,Ue=0,at=0,Xn=Zt(0),Fe=0,Wl=null,wn=0,qs=0,za=0,Ql=null,Xe=null,$a=0,el=1/0,Pt=null,Xs=!1,Oa=null,ln=null,er=!1,sn=null,tr=0,Yl=0,Aa=null,nr=-1,lr=0;function Ke(){return(ie&6)!==0?Le():nr!==-1?nr:nr=Le()}function rn(e){return(e.mode&1)===0?1:(ie&2)!==0&&Ue!==0?Ue&-Ue:ku.transition!==null?(lr===0&&(lr=vi()),lr):(e=me,e!==0||(e=window.event,e=e===void 0?16:Ci(e.type)),e)}function jt(e,t,n,s){if(50<Yl)throw Yl=0,Aa=null,Error(m(185));gl(e,n,s),((ie&2)===0||e!==Me)&&(e===Me&&((ie&2)===0&&(qs|=n),Fe===4&&an(e,Ue)),et(e,s),n===1&&ie===0&&(t.mode&1)===0&&(el=Le()+500,Ls&&Xt()))}function et(e,t){var n=e.callbackNode;kc(e,t);var s=ms(e,e===Me?Ue:0);if(s===0)n!==null&&xi(n),e.callbackNode=null,e.callbackPriority=0;else if(t=s&-s,e.callbackPriority!==t){if(n!=null&&xi(n),t===1)e.tag===0?Su(Id.bind(null,e)):po(Id.bind(null,e)),ju(function(){(ie&6)===0&&Xt()}),n=null;else{switch(ji(s)){case 1:n=jr;break;case 4:n=gi;break;case 16:n=os;break;case 536870912:n=yi;break;default:n=os}n=Md(n,Cd.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Cd(e,t){if(nr=-1,lr=0,(ie&6)!==0)throw Error(m(327));var n=e.callbackNode;if(tl()&&e.callbackNode!==n)return null;var s=ms(e,e===Me?Ue:0);if(s===0)return null;if((s&30)!==0||(s&e.expiredLanes)!==0||t)t=sr(e,s);else{t=s;var r=ie;ie|=2;var a=Ld();(Me!==e||Ue!==t)&&(Pt=null,el=Le()+500,bn(e,t));do try{Wu();break}catch(c){Dd(e,c)}while(!0);ra(),Zs.current=a,ie=r,Te!==null?t=0:(Me=null,Ue=0,t=Fe)}if(t!==0){if(t===2&&(r=wr(e),r!==0&&(s=r,t=Va(e,r))),t===1)throw n=Wl,bn(e,0),an(e,s),et(e,Le()),n;if(t===6)an(e,s);else{if(r=e.current.alternate,(s&30)===0&&!Uu(r)&&(t=sr(e,s),t===2&&(a=wr(e),a!==0&&(s=a,t=Va(e,a))),t===1))throw n=Wl,bn(e,0),an(e,s),et(e,Le()),n;switch(e.finishedWork=r,e.finishedLanes=s,t){case 0:case 1:throw Error(m(345));case 2:Sn(e,Xe,Pt);break;case 3:if(an(e,s),(s&130023424)===s&&(t=$a+500-Le(),10<t)){if(ms(e,0)!==0)break;if(r=e.suspendedLanes,(r&s)!==s){Ke(),e.pingedLanes|=e.suspendedLanes&r;break}e.timeoutHandle=Jr(Sn.bind(null,e,Xe,Pt),t);break}Sn(e,Xe,Pt);break;case 4:if(an(e,s),(s&4194240)===s)break;for(t=e.eventTimes,r=-1;0<s;){var o=31-pt(s);a=1<<o,o=t[o],o>r&&(r=o),s&=~a}if(s=r,s=Le()-s,s=(120>s?120:480>s?480:1080>s?1080:1920>s?1920:3e3>s?3e3:4320>s?4320:1960*Vu(s/1960))-s,10<s){e.timeoutHandle=Jr(Sn.bind(null,e,Xe,Pt),s);break}Sn(e,Xe,Pt);break;case 5:Sn(e,Xe,Pt);break;default:throw Error(m(329))}}}return et(e,Le()),e.callbackNode===n?Cd.bind(null,e):null}function Va(e,t){var n=Ql;return e.current.memoizedState.isDehydrated&&(bn(e,t).flags|=256),e=sr(e,t),e!==2&&(t=Xe,Xe=n,t!==null&&Ua(t)),e}function Ua(e){Xe===null?Xe=e:Xe.push.apply(Xe,e)}function Uu(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var s=0;s<n.length;s++){var r=n[s],a=r.getSnapshot;r=r.value;try{if(!ht(a(),r))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function an(e,t){for(t&=~za,t&=~qs,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-pt(t),s=1<<n;e[n]=-1,t&=~s}}function Id(e){if((ie&6)!==0)throw Error(m(327));tl();var t=ms(e,0);if((t&1)===0)return et(e,Le()),null;var n=sr(e,t);if(e.tag!==0&&n===2){var s=wr(e);s!==0&&(t=s,n=Va(e,s))}if(n===1)throw n=Wl,bn(e,0),an(e,t),et(e,Le()),n;if(n===6)throw Error(m(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Sn(e,Xe,Pt),et(e,Le()),null}function Ha(e,t){var n=ie;ie|=1;try{return e(t)}finally{ie=n,ie===0&&(el=Le()+500,Ls&&Xt())}}function Nn(e){sn!==null&&sn.tag===0&&(ie&6)===0&&tl();var t=ie;ie|=1;var n=mt.transition,s=me;try{if(mt.transition=null,me=1,e)return e()}finally{me=s,mt.transition=n,ie=t,(ie&6)===0&&Xt()}}function Wa(){at=Xn.current,je(Xn)}function bn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,vu(n)),Te!==null)for(n=Te.return;n!==null;){var s=n;switch(ea(s),s.tag){case 1:s=s.type.childContextTypes,s!=null&&Is();break;case 3:Gn(),je(Ge),je(He),fa();break;case 5:ua(s);break;case 4:Gn();break;case 13:je(ke);break;case 19:je(ke);break;case 10:aa(s.type._context);break;case 22:case 23:Wa()}n=n.return}if(Me=e,Te=e=on(e.current,null),Ue=at=t,Fe=0,Wl=null,za=qs=wn=0,Xe=Ql=null,yn!==null){for(t=0;t<yn.length;t++)if(n=yn[t],s=n.interleaved,s!==null){n.interleaved=null;var r=s.next,a=n.pending;if(a!==null){var o=a.next;a.next=r,s.next=o}n.pending=s}yn=null}return e}function Dd(e,t){do{var n=Te;try{if(ra(),As.current=Ws,Vs){for(var s=Ee.memoizedState;s!==null;){var r=s.queue;r!==null&&(r.pending=null),s=s.next}Vs=!1}if(jn=0,Pe=Re=Ee=null,$l=!1,Ol=0,Ma.current=null,n===null||n.return===null){Fe=1,Wl=t,Te=null;break}e:{var a=e,o=n.return,c=n,u=t;if(t=Ue,c.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var g=u,w=c,b=w.tag;if((w.mode&1)===0&&(b===0||b===11||b===15)){var j=w.alternate;j?(w.updateQueue=j.updateQueue,w.memoizedState=j.memoizedState,w.lanes=j.lanes):(w.updateQueue=null,w.memoizedState=null)}var L=td(o);if(L!==null){L.flags&=-257,nd(L,o,c,a,t),L.mode&1&&ed(a,g,t),t=L,u=g;var R=t.updateQueue;if(R===null){var F=new Set;F.add(u),t.updateQueue=F}else R.add(u);break e}else{if((t&1)===0){ed(a,g,t),Qa();break e}u=Error(m(426))}}else if(be&&c.mode&1){var Be=td(o);if(Be!==null){(Be.flags&65536)===0&&(Be.flags|=256),nd(Be,o,c,a,t),la(Zn(u,c));break e}}a=u=Zn(u,c),Fe!==4&&(Fe=2),Ql===null?Ql=[a]:Ql.push(a),a=o;do{switch(a.tag){case 3:a.flags|=65536,t&=-t,a.lanes|=t;var h=qo(a,u,t);ko(a,h);break e;case 1:c=u;var f=a.type,x=a.stateNode;if((a.flags&128)===0&&(typeof f.getDerivedStateFromError=="function"||x!==null&&typeof x.componentDidCatch=="function"&&(ln===null||!ln.has(x)))){a.flags|=65536,t&=-t,a.lanes|=t;var S=Xo(a,c,t);ko(a,S);break e}}a=a.return}while(a!==null)}Td(n)}catch(P){t=P,Te===n&&n!==null&&(Te=n=n.return);continue}break}while(!0)}function Ld(){var e=Zs.current;return Zs.current=Ws,e===null?Ws:e}function Qa(){(Fe===0||Fe===3||Fe===2)&&(Fe=4),Me===null||(wn&268435455)===0&&(qs&268435455)===0||an(Me,Ue)}function sr(e,t){var n=ie;ie|=2;var s=Ld();(Me!==e||Ue!==t)&&(Pt=null,bn(e,t));do try{Hu();break}catch(r){Dd(e,r)}while(!0);if(ra(),ie=n,Zs.current=s,Te!==null)throw Error(m(261));return Me=null,Ue=0,Fe}function Hu(){for(;Te!==null;)Bd(Te)}function Wu(){for(;Te!==null&&!xc();)Bd(Te)}function Bd(e){var t=Pd(e.alternate,e,at);e.memoizedProps=e.pendingProps,t===null?Td(e):Te=t,Ma.current=null}function Td(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=Mu(n,t,at),n!==null){Te=n;return}}else{if(n=zu(n,t),n!==null){n.flags&=32767,Te=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Fe=6,Te=null;return}}if(t=t.sibling,t!==null){Te=t;return}Te=t=e}while(t!==null);Fe===0&&(Fe=5)}function Sn(e,t,n){var s=me,r=mt.transition;try{mt.transition=null,me=1,Qu(e,t,n,s)}finally{mt.transition=r,me=s}return null}function Qu(e,t,n,s){do tl();while(sn!==null);if((ie&6)!==0)throw Error(m(327));n=e.finishedWork;var r=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(m(177));e.callbackNode=null,e.callbackPriority=0;var a=n.lanes|n.childLanes;if(Ec(e,a),e===Me&&(Te=Me=null,Ue=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||er||(er=!0,Md(os,function(){return tl(),null})),a=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||a){a=mt.transition,mt.transition=null;var o=me;me=1;var c=ie;ie|=4,Ma.current=null,Ou(e,n),bd(n,e),mu(Qr),hs=!!Wr,Qr=Wr=null,e.current=n,Au(n),gc(),ie=c,me=o,mt.transition=a}else e.current=n;if(er&&(er=!1,sn=e,tr=r),a=e.pendingLanes,a===0&&(ln=null),jc(n.stateNode),et(e,Le()),t!==null)for(s=e.onRecoverableError,n=0;n<t.length;n++)r=t[n],s(r.value,{componentStack:r.stack,digest:r.digest});if(Xs)throw Xs=!1,e=Oa,Oa=null,e;return(tr&1)!==0&&e.tag!==0&&tl(),a=e.pendingLanes,(a&1)!==0?e===Aa?Yl++:(Yl=0,Aa=e):Yl=0,Xt(),null}function tl(){if(sn!==null){var e=ji(tr),t=mt.transition,n=me;try{if(mt.transition=null,me=16>e?16:e,sn===null)var s=!1;else{if(e=sn,sn=null,tr=0,(ie&6)!==0)throw Error(m(331));var r=ie;for(ie|=4,T=e.current;T!==null;){var a=T,o=a.child;if((T.flags&16)!==0){var c=a.deletions;if(c!==null){for(var u=0;u<c.length;u++){var g=c[u];for(T=g;T!==null;){var w=T;switch(w.tag){case 0:case 11:case 15:Hl(8,w,a)}var b=w.child;if(b!==null)b.return=w,T=b;else for(;T!==null;){w=T;var j=w.sibling,L=w.return;if(yd(w),w===g){T=null;break}if(j!==null){j.return=L,T=j;break}T=L}}}var R=a.alternate;if(R!==null){var F=R.child;if(F!==null){R.child=null;do{var Be=F.sibling;F.sibling=null,F=Be}while(F!==null)}}T=a}}if((a.subtreeFlags&2064)!==0&&o!==null)o.return=a,T=o;else e:for(;T!==null;){if(a=T,(a.flags&2048)!==0)switch(a.tag){case 0:case 11:case 15:Hl(9,a,a.return)}var h=a.sibling;if(h!==null){h.return=a.return,T=h;break e}T=a.return}}var f=e.current;for(T=f;T!==null;){o=T;var x=o.child;if((o.subtreeFlags&2064)!==0&&x!==null)x.return=o,T=x;else e:for(o=f;T!==null;){if(c=T,(c.flags&2048)!==0)try{switch(c.tag){case 0:case 11:case 15:Gs(9,c)}}catch(P){Ie(c,c.return,P)}if(c===o){T=null;break e}var S=c.sibling;if(S!==null){S.return=c.return,T=S;break e}T=c.return}}if(ie=r,Xt(),bt&&typeof bt.onPostCommitFiberRoot=="function")try{bt.onPostCommitFiberRoot(ds,e)}catch{}s=!0}return s}finally{me=n,mt.transition=t}}return!1}function Rd(e,t,n){t=Zn(n,t),t=qo(e,t,1),e=tn(e,t,1),t=Ke(),e!==null&&(gl(e,1,t),et(e,t))}function Ie(e,t,n){if(e.tag===3)Rd(e,e,n);else for(;t!==null;){if(t.tag===3){Rd(t,e,n);break}else if(t.tag===1){var s=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&(ln===null||!ln.has(s))){e=Zn(n,e),e=Xo(t,e,1),t=tn(t,e,1),e=Ke(),t!==null&&(gl(t,1,e),et(t,e));break}}t=t.return}}function Yu(e,t,n){var s=e.pingCache;s!==null&&s.delete(t),t=Ke(),e.pingedLanes|=e.suspendedLanes&n,Me===e&&(Ue&n)===n&&(Fe===4||Fe===3&&(Ue&130023424)===Ue&&500>Le()-$a?bn(e,0):za|=n),et(e,t)}function Fd(e,t){t===0&&((e.mode&1)===0?t=1:(t=us,us<<=1,(us&130023424)===0&&(us=4194304)));var n=Ke();e=Tt(e,t),e!==null&&(gl(e,t,n),et(e,n))}function Ju(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Fd(e,n)}function Ku(e,t){var n=0;switch(e.tag){case 13:var s=e.stateNode,r=e.memoizedState;r!==null&&(n=r.retryLane);break;case 19:s=e.stateNode;break;default:throw Error(m(314))}s!==null&&s.delete(t),Fd(e,n)}var Pd;Pd=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Ge.current)qe=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return qe=!1,Pu(e,t,n);qe=(e.flags&131072)!==0}else qe=!1,be&&(t.flags&1048576)!==0&&ho(t,Ts,t.index);switch(t.lanes=0,t.tag){case 2:var s=t.type;Js(e,t),e=t.pendingProps;var r=Un(t,He.current);Kn(t,n),r=xa(null,t,s,e,r,n);var a=ga();return t.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Ze(s)?(a=!0,Ds(t)):a=!1,t.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,da(t),r.updater=Qs,t.stateNode=r,r._reactInternals=t,ba(t,s,e,n),t=_a(null,t,s,!0,a,n)):(t.tag=0,be&&a&&Xr(t),Je(null,t,r,n),t=t.child),t;case 16:s=t.elementType;e:{switch(Js(e,t),e=t.pendingProps,r=s._init,s=r(s._payload),t.type=s,r=t.tag=Zu(s),e=gt(s,e),r){case 0:t=Ea(null,t,s,e,n);break e;case 1:t=od(null,t,s,e,n);break e;case 11:t=ld(null,t,s,e,n);break e;case 14:t=sd(null,t,s,gt(s.type,e),n);break e}throw Error(m(306,s,""))}return t;case 0:return s=t.type,r=t.pendingProps,r=t.elementType===s?r:gt(s,r),Ea(e,t,s,r,n);case 1:return s=t.type,r=t.pendingProps,r=t.elementType===s?r:gt(s,r),od(e,t,s,r,n);case 3:e:{if(dd(t),e===null)throw Error(m(387));s=t.pendingProps,a=t.memoizedState,r=a.element,So(e,t),$s(t,s,null,n);var o=t.memoizedState;if(s=o.element,a.isDehydrated)if(a={element:s,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){r=Zn(Error(m(423)),t),t=cd(e,t,s,n,r);break e}else if(s!==r){r=Zn(Error(m(424)),t),t=cd(e,t,s,n,r);break e}else for(rt=Gt(t.stateNode.containerInfo.firstChild),st=t,be=!0,xt=null,n=No(t,null,s,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Qn(),s===r){t=Ft(e,t,n);break e}Je(e,t,s,n)}t=t.child}return t;case 5:return _o(t),e===null&&na(t),s=t.type,r=t.pendingProps,a=e!==null?e.memoizedProps:null,o=r.children,Yr(s,r)?o=null:a!==null&&Yr(s,a)&&(t.flags|=32),id(e,t),Je(e,t,o,n),t.child;case 6:return e===null&&na(t),null;case 13:return ud(e,t,n);case 4:return ca(t,t.stateNode.containerInfo),s=t.pendingProps,e===null?t.child=Yn(t,null,s,n):Je(e,t,s,n),t.child;case 11:return s=t.type,r=t.pendingProps,r=t.elementType===s?r:gt(s,r),ld(e,t,s,r,n);case 7:return Je(e,t,t.pendingProps,n),t.child;case 8:return Je(e,t,t.pendingProps.children,n),t.child;case 12:return Je(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(s=t.type._context,r=t.pendingProps,a=t.memoizedProps,o=r.value,xe(Ps,s._currentValue),s._currentValue=o,a!==null)if(ht(a.value,o)){if(a.children===r.children&&!Ge.current){t=Ft(e,t,n);break e}}else for(a=t.child,a!==null&&(a.return=t);a!==null;){var c=a.dependencies;if(c!==null){o=a.child;for(var u=c.firstContext;u!==null;){if(u.context===s){if(a.tag===1){u=Rt(-1,n&-n),u.tag=2;var g=a.updateQueue;if(g!==null){g=g.shared;var w=g.pending;w===null?u.next=u:(u.next=w.next,w.next=u),g.pending=u}}a.lanes|=n,u=a.alternate,u!==null&&(u.lanes|=n),ia(a.return,n,t),c.lanes|=n;break}u=u.next}}else if(a.tag===10)o=a.type===t.type?null:a.child;else if(a.tag===18){if(o=a.return,o===null)throw Error(m(341));o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),ia(o,n,t),o=a.sibling}else o=a.child;if(o!==null)o.return=a;else for(o=a;o!==null;){if(o===t){o=null;break}if(a=o.sibling,a!==null){a.return=o.return,o=a;break}o=o.return}a=o}Je(e,t,r.children,n),t=t.child}return t;case 9:return r=t.type,s=t.pendingProps.children,Kn(t,n),r=ct(r),s=s(r),t.flags|=1,Je(e,t,s,n),t.child;case 14:return s=t.type,r=gt(s,t.pendingProps),r=gt(s.type,r),sd(e,t,s,r,n);case 15:return rd(e,t,t.type,t.pendingProps,n);case 17:return s=t.type,r=t.pendingProps,r=t.elementType===s?r:gt(s,r),Js(e,t),t.tag=1,Ze(s)?(e=!0,Ds(t)):e=!1,Kn(t,n),Go(t,s,r),ba(t,s,r,n),_a(null,t,s,!0,e,n);case 19:return fd(e,t,n);case 22:return ad(e,t,n)}throw Error(m(156,t.tag))};function Md(e,t){return hi(e,t)}function Gu(e,t,n,s){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ft(e,t,n,s){return new Gu(e,t,n,s)}function Ya(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Zu(e){if(typeof e=="function")return Ya(e)?1:0;if(e!=null){if(e=e.$$typeof,e===we)return 11;if(e===$e)return 14}return 2}function on(e,t){var n=e.alternate;return n===null?(n=ft(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function rr(e,t,n,s,r,a){var o=2;if(s=e,typeof e=="function")Ya(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case ye:return kn(n.children,r,a,t);case W:o=8,r|=8;break;case ne:return e=ft(12,n,t,r|2),e.elementType=ne,e.lanes=a,e;case Se:return e=ft(13,n,t,r),e.elementType=Se,e.lanes=a,e;case Ce:return e=ft(19,n,t,r),e.elementType=Ce,e.lanes=a,e;case Ne:return ar(n,r,a,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case pe:o=10;break e;case _e:o=9;break e;case we:o=11;break e;case $e:o=14;break e;case Oe:o=16,s=null;break e}throw Error(m(130,e==null?e:typeof e,""))}return t=ft(o,n,t,r),t.elementType=e,t.type=s,t.lanes=a,t}function kn(e,t,n,s){return e=ft(7,e,s,t),e.lanes=n,e}function ar(e,t,n,s){return e=ft(22,e,s,t),e.elementType=Ne,e.lanes=n,e.stateNode={isHidden:!1},e}function Ja(e,t,n){return e=ft(6,e,null,t),e.lanes=n,e}function Ka(e,t,n){return t=ft(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function qu(e,t,n,s,r){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Nr(0),this.expirationTimes=Nr(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Nr(0),this.identifierPrefix=s,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Ga(e,t,n,s,r,a,o,c,u){return e=new qu(e,t,n,c,u),t===1?(t=1,a===!0&&(t|=8)):t=0,a=ft(3,null,null,t),e.current=a,a.stateNode=e,a.memoizedState={element:s,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},da(a),e}function Xu(e,t,n){var s=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:oe,key:s==null?null:""+s,children:e,containerInfo:t,implementation:n}}function zd(e){if(!e)return qt;e=e._reactInternals;e:{if(fn(e)!==e||e.tag!==1)throw Error(m(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Ze(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(m(171))}if(e.tag===1){var n=e.type;if(Ze(n))return mo(e,n,t)}return t}function $d(e,t,n,s,r,a,o,c,u){return e=Ga(n,s,!0,e,r,a,o,c,u),e.context=zd(null),n=e.current,s=Ke(),r=rn(n),a=Rt(s,r),a.callback=t??null,tn(n,a,r),e.current.lanes=r,gl(e,r,s),et(e,s),e}function ir(e,t,n,s){var r=t.current,a=Ke(),o=rn(r);return n=zd(n),t.context===null?t.context=n:t.pendingContext=n,t=Rt(a,o),t.payload={element:e},s=s===void 0?null:s,s!==null&&(t.callback=s),e=tn(r,t,o),e!==null&&(jt(e,r,o,a),zs(e,r,o)),o}function or(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Od(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Za(e,t){Od(e,t),(e=e.alternate)&&Od(e,t)}function em(){return null}var Ad=typeof reportError=="function"?reportError:function(e){console.error(e)};function qa(e){this._internalRoot=e}dr.prototype.render=qa.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(m(409));ir(e,t,null,null)},dr.prototype.unmount=qa.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Nn(function(){ir(null,e,null,null)}),t[It]=null}};function dr(e){this._internalRoot=e}dr.prototype.unstable_scheduleHydration=function(e){if(e){var t=bi();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Yt.length&&t!==0&&t<Yt[n].priority;n++);Yt.splice(n,0,e),n===0&&Ei(e)}};function Xa(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function cr(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Vd(){}function tm(e,t,n,s,r){if(r){if(typeof s=="function"){var a=s;s=function(){var g=or(o);a.call(g)}}var o=$d(t,s,e,0,null,!1,!1,"",Vd);return e._reactRootContainer=o,e[It]=o.current,Ll(e.nodeType===8?e.parentNode:e),Nn(),o}for(;r=e.lastChild;)e.removeChild(r);if(typeof s=="function"){var c=s;s=function(){var g=or(u);c.call(g)}}var u=Ga(e,0,!1,null,null,!1,!1,"",Vd);return e._reactRootContainer=u,e[It]=u.current,Ll(e.nodeType===8?e.parentNode:e),Nn(function(){ir(t,u,n,s)}),u}function ur(e,t,n,s,r){var a=n._reactRootContainer;if(a){var o=a;if(typeof r=="function"){var c=r;r=function(){var u=or(o);c.call(u)}}ir(t,o,e,r)}else o=tm(n,t,e,r,s);return or(o)}wi=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=xl(t.pendingLanes);n!==0&&(br(t,n|1),et(t,Le()),(ie&6)===0&&(el=Le()+500,Xt()))}break;case 13:Nn(function(){var s=Tt(e,1);if(s!==null){var r=Ke();jt(s,e,1,r)}}),Za(e,1)}},Sr=function(e){if(e.tag===13){var t=Tt(e,134217728);if(t!==null){var n=Ke();jt(t,e,134217728,n)}Za(e,134217728)}},Ni=function(e){if(e.tag===13){var t=rn(e),n=Tt(e,t);if(n!==null){var s=Ke();jt(n,e,t,s)}Za(e,t)}},bi=function(){return me},Si=function(e,t){var n=me;try{return me=e,t()}finally{me=n}},pl=function(e,t,n){switch(t){case"input":if(al(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var s=n[t];if(s!==e&&s.form===e.form){var r=Cs(s);if(!r)throw Error(m(90));sl(s),al(s,r)}}}break;case"textarea":ql(e,n);break;case"select":t=n.value,t!=null&&Ct(e,!!n.multiple,t,!1)}},k=Ha,re=Nn;var nm={usingClientEntryPoint:!1,Events:[Rl,An,Cs,ss,rs,Ha]},Jl={findFiberByHostInstance:pn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},lm={bundleType:Jl.bundleType,version:Jl.version,rendererPackageName:Jl.rendererPackageName,rendererConfig:Jl.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:le.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=fi(e),e===null?null:e.stateNode},findFiberByHostInstance:Jl.findFiberByHostInstance||em,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var mr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!mr.isDisabled&&mr.supportsFiber)try{ds=mr.inject(lm),bt=mr}catch{}}return tt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=nm,tt.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Xa(t))throw Error(m(200));return Xu(e,t,null,n)},tt.createRoot=function(e,t){if(!Xa(e))throw Error(m(299));var n=!1,s="",r=Ad;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(s=t.identifierPrefix),t.onRecoverableError!==void 0&&(r=t.onRecoverableError)),t=Ga(e,1,!1,null,null,n,!1,s,r),e[It]=t.current,Ll(e.nodeType===8?e.parentNode:e),new qa(t)},tt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(m(188)):(e=Object.keys(e).join(","),Error(m(268,e)));return e=fi(t),e=e===null?null:e.stateNode,e},tt.flushSync=function(e){return Nn(e)},tt.hydrate=function(e,t,n){if(!cr(t))throw Error(m(200));return ur(null,e,t,!0,n)},tt.hydrateRoot=function(e,t,n){if(!Xa(e))throw Error(m(405));var s=n!=null&&n.hydratedSources||null,r=!1,a="",o=Ad;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=$d(t,null,e,1,n??null,r,!1,a,o),e[It]=t.current,Ll(e),s)for(e=0;e<s.length;e++)n=s[e],r=n._getVersion,r=r(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,r]:t.mutableSourceEagerHydrationData.push(n,r);return new dr(t)},tt.render=function(e,t,n){if(!cr(t))throw Error(m(200));return ur(null,e,t,!1,n)},tt.unmountComponentAtNode=function(e){if(!cr(e))throw Error(m(40));return e._reactRootContainer?(Nn(function(){ur(null,null,e,!1,function(){e._reactRootContainer=null,e[It]=null})}),!0):!1},tt.unstable_batchedUpdates=Ha,tt.unstable_renderSubtreeIntoContainer=function(e,t,n,s){if(!cr(n))throw Error(m(200));if(e==null||e._reactInternals===void 0)throw Error(m(38));return ur(e,t,n,!1,s)},tt.version="18.3.1-next-f1338f8080-20240426",tt}var Gd;function ic(){if(Gd)return ni.exports;Gd=1;function i(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i)}catch(d){console.error(d)}}return i(),ni.exports=cm(),ni.exports}var Zd;function um(){if(Zd)return fr;Zd=1;var i=ic();return fr.createRoot=i.createRoot,fr.hydrateRoot=i.hydrateRoot,fr}var mm=um();function fm({size:i=20}){return l.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",width:i,height:i,children:l.jsx("path",{d:"M12 2 4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-2 13-2-2 1.41-1.41L10 12.17l4.59-4.58L16 9l-6 6z"})})}function pm(){return l.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",width:20,height:20,children:l.jsx("path",{d:"M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"})})}function hm(){return l.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",width:20,height:20,children:l.jsx("path",{d:"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"})})}function xm(){return l.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",width:20,height:20,children:l.jsx("path",{d:"M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"})})}function gm(){return l.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",width:20,height:20,children:l.jsx("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"})})}function ym(){return l.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",width:18,height:18,children:l.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"})})}function vm(){return l.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",width:16,height:16,children:l.jsx("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"})})}function jm(){return l.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",width:11,height:11,children:l.jsx("path",{d:"M7 14l5-5 5 5H7z"})})}function wm(){return l.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",width:11,height:11,children:l.jsx("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"})})}function Nm(){return l.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",width:11,height:11,children:l.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 5H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"})})}function bm(){return l.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2.2,width:17,height:17,children:l.jsx("path",{d:"M5 12h14M13 6l6 6-6 6",strokeLinecap:"round",strokeLinejoin:"round"})})}function Sm({data:i,color:d,glow:m}){const C=Math.min(...i),I=Math.max(...i),$=i.map((H,K)=>{const Q=K/(i.length-1)*190,J=50-(H-C)/(I-C||1)*42-4;return`${Q},${J}`}),z=`M${$.join(" L")}`,M=`M0,50 L${$.join(" L")} L190,50 Z`,B=`g${d.replace("#","")}`,O=190,Z=50-(i[i.length-1]-C)/(I-C||1)*42-4;return l.jsxs("svg",{width:190,height:50,viewBox:"0 0 190 50",style:{display:"block",overflow:"visible"},children:[l.jsx("defs",{children:l.jsxs("linearGradient",{id:B,x1:"0",y1:"0",x2:"0",y2:"1",children:[l.jsx("stop",{offset:"0%",stopColor:d,stopOpacity:".32"}),l.jsx("stop",{offset:"100%",stopColor:d,stopOpacity:"0"})]})}),l.jsx("path",{d:M,fill:`url(#${B})`}),l.jsx("path",{d:z,fill:"none",stroke:d,strokeWidth:"1.8",style:{filter:`drop-shadow(0 0 5px ${m})`}}),l.jsx("circle",{cx:O,cy:Z,r:"3.5",fill:d,style:{filter:`drop-shadow(0 0 6px ${m})`}})]})}const km=[42,58,51,73,65,88,76,92,84,97,89,108],Em=[{init:"SK",name:"Somchai K.",action:"Payment received",amount:"฿32,000",status:"paid",color:"#3b82f6"},{init:"NW",name:"Narin W.",action:"Case filed",amount:"฿9,500",status:"filed",color:"#8b5cf6"},{init:"MT",name:"Malee T.",action:"Judgment issued",amount:"฿4,200",status:"judged",color:"#14b8a6"}],_m={paid:{color:"#16a34a",icon:l.jsx(wm,{}),label:"Paid"},filed:{color:"#2563eb",icon:l.jsx(jm,{}),label:"Filed"},judged:{color:"#7c3aed",icon:l.jsx(Nm,{}),label:"Judged"}};function Cm(){return l.jsx("aside",{className:"rp","aria-hidden":"true",children:l.jsxs("div",{className:"rp-inner",children:[l.jsxs("div",{className:"rp-top",children:[l.jsxs("div",{className:"rp-tag",children:[l.jsx("span",{className:"rp-tag-dot"}),"Secured workspace"]}),l.jsx("h2",{className:"rp-headline",children:"LQD Management System"}),l.jsx("p",{className:"rp-sub",children:"ศูนย์กลางสำหรับจัดการข้อมูลลูกหนี้ บันทึกการชำระเงิน และติดตามพอร์ตงานคดี"})]}),l.jsxs("div",{className:"rp-card hero-card",children:[l.jsxs("div",{children:[l.jsx("p",{className:"hero-eyebrow",children:"PORTFOLIO SNAPSHOT"}),l.jsx("p",{className:"hero-num",children:"฿284,920"}),l.jsx("p",{className:"hero-caption",children:"Outstanding balance under active monitoring"})]}),l.jsx("div",{className:"hero-chart",children:l.jsx(Sm,{data:km,color:"#2563eb",glow:"rgba(37,99,235,.6)"})})]}),l.jsx("div",{className:"pills",children:[{label:"Active cases",val:"2,418",color:"#2563eb"},{label:"Filing",val:"684",color:"#4f46e5"},{label:"Judged",val:"86",color:"#0f766e"}].map((i,d)=>l.jsxs("div",{className:"rp-card pill",children:[l.jsx("p",{className:"pill-label",children:i.label}),l.jsx("p",{className:"pill-val",style:{color:i.color},children:i.val})]},i.label))}),l.jsxs("div",{className:"rp-card feed",children:[l.jsxs("div",{className:"feed-head",children:[l.jsx("p",{className:"feed-title",children:"Today's queue"}),l.jsxs("span",{className:"feed-live",children:[l.jsx("span",{className:"live-dot"}),"Updated"]})]}),l.jsx("div",{className:"feed-rows",children:Em.map((i,d)=>{const m=_m[i.status];return l.jsxs("div",{className:"feed-row",style:{animationDelay:`${.45+d*.09}s`},children:[l.jsx("div",{className:"avatar",style:{background:i.color},children:i.init}),l.jsxs("div",{className:"feed-info",children:[l.jsx("p",{className:"feed-name",children:i.name}),l.jsx("p",{className:"feed-action",children:i.action})]}),l.jsxs("div",{className:"feed-right",children:[l.jsx("p",{className:"feed-amount",children:i.amount}),l.jsxs("span",{className:"feed-badge",style:{color:m.color,borderColor:`${m.color}40`,background:`${m.color}12`},children:[m.icon,m.label]})]})]},d)})})]})]})})}function Im(){const[i,d]=E.useState(""),[m,N]=E.useState(""),[v,C]=E.useState(!1),[I,$]=E.useState(""),[z,M]=E.useState(!1),[B,O]=E.useState(!1),[Z,H]=E.useState(!1),[K,Q]=E.useState(!1),J=()=>$(""),ge=le=>{$(le),O(!0),setTimeout(()=>O(!1),420)},De=async le=>{if(le.preventDefault(),J(),!i.trim()||!m){ge("Please enter your username and password.");return}M(!0);try{const fe=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:i.trim(),password:m})}),oe=await fe.json();fe.ok?(sessionStorage.setItem("role",oe.user.role),sessionStorage.setItem("display_name",oe.user.display_name),oe.password_warning_days?(sessionStorage.setItem("password_warning_days",oe.password_warning_days),sessionStorage.removeItem("password_warning_seen")):(sessionStorage.removeItem("password_warning_days"),sessionStorage.removeItem("password_warning_seen")),window.location.href=oe.redirect_to||"/inventory"):ge(oe.error||"Incorrect username or password.")}catch{ge("Unable to connect to the server. Please try again.")}finally{M(!1)}},ue=!!I;return l.jsxs("main",{className:"lp",children:[l.jsx("div",{className:"lp-blob lp-blob1"}),l.jsx("div",{className:"lp-blob lp-blob2"}),l.jsxs("div",{className:"lp-logo",children:[l.jsx("div",{className:"lp-logo-icon",children:l.jsx(fm,{size:21})}),l.jsxs("div",{className:"lp-logo-text",children:[l.jsx("span",{className:"lp-logo-name",children:"LQD Tracking"}),l.jsx("span",{className:"lp-logo-sub",children:"Debt Management System"})]})]}),l.jsx("div",{className:"lp-center",children:l.jsxs("div",{style:{maxWidth:340,width:"100%"},children:[l.jsxs("h1",{className:"lp-h1",children:["Welcome back",l.jsx("span",{children:"."})]}),l.jsxs("p",{className:"lp-tagline",children:["เข้าสู่ระบบเพื่อบริหารจัดการพอร์ตหนี้",l.jsx("br",{}),"และติดตามสถานะคดี"]}),I&&l.jsxs("div",{className:`lp-err${B?" shake":""}`,children:[l.jsx("span",{className:"lp-err-ico",children:l.jsx(ym,{})}),l.jsx("p",{className:"lp-err-msg",children:I}),l.jsx("button",{type:"button",onClick:J,className:"lp-err-x",children:l.jsx(vm,{})})]}),l.jsxs("form",{onSubmit:De,className:B?"shake":"",children:[l.jsxs("div",{className:"lp-field",children:[l.jsx("label",{className:"lp-label",htmlFor:"username",children:"Username"}),l.jsxs("div",{className:`lp-input-wrap${ue?" errored":Z?" focused":""}`,children:[l.jsx("span",{className:"lp-ico",children:l.jsx(pm,{})}),l.jsx("input",{id:"username",className:"lp-inp",type:"text",autoComplete:"username",autoFocus:!0,placeholder:"Enter your username",value:i,onChange:le=>{d(le.target.value),J()},onFocus:()=>H(!0),onBlur:()=>H(!1)})]})]}),l.jsxs("div",{className:"lp-field",children:[l.jsx("label",{className:"lp-label",htmlFor:"password",children:"Password"}),l.jsxs("div",{className:`lp-input-wrap${ue?" errored":K?" focused":""}`,children:[l.jsx("span",{className:"lp-ico",children:l.jsx(hm,{})}),l.jsx("input",{id:"password",className:"lp-inp",type:v?"text":"password",autoComplete:"current-password",placeholder:"Enter your password",value:m,onChange:le=>{N(le.target.value),J()},onFocus:()=>Q(!0),onBlur:()=>Q(!1)}),l.jsx("button",{type:"button",className:"lp-eye",onClick:()=>C(le=>!le),children:v?l.jsx(gm,{}):l.jsx(xm,{})})]})]}),l.jsx("button",{type:"submit",disabled:z,className:"lp-btn",children:z?l.jsxs(l.Fragment,{children:[l.jsx("span",{className:"lp-spin"}),"Signing in..."]}):l.jsxs(l.Fragment,{children:["Sign in",l.jsx(bm,{})]})}),l.jsx("p",{className:"lp-forgot",children:"หากลืมรหัสผ่าน กรุณาติดต่อผู้ดูแลระบบ"})]})]})}),l.jsx("div",{className:"lp-foot",children:l.jsxs("div",{className:"lp-foot-stat",children:[l.jsx("span",{className:"lp-foot-dot"}),"All systems operational"]})})]})}function Dm(){return l.jsxs("div",{className:"shell",children:[l.jsx(Im,{}),l.jsx(Cm,{})]})}function Lm({roleLabel:i,avatar:d}){return l.jsxs("nav",{className:"fixed top-0 w-full z-50 bg-white border-b border-blue-100 flex justify-between items-center px-6 md:px-8 h-16 shadow-sm",children:[l.jsx("div",{className:"flex items-center gap-8 min-w-0",children:l.jsxs("span",{className:"text-xl tracking-tight text-primary font-headline flex items-center font-bold min-w-0",children:[l.jsx("div",{className:"w-10 h-10 bg-primary rounded-[10px] flex items-center justify-center shadow-lg shadow-indigo-200 mr-3 shrink-0",children:l.jsx("span",{className:"material-symbols-outlined text-white text-2xl font-normal",style:{fontVariationSettings:'"FILL" 1'},children:"shield"})}),l.jsx("span",{className:"truncate",children:"LQD Tracking Management System"})]})}),l.jsx("div",{className:"flex items-center gap-4",children:l.jsxs("div",{className:"flex items-center gap-3",children:[l.jsxs("div",{className:"text-right hidden sm:block",children:[l.jsx("p",{className:"text-[10px] text-indigo-400 uppercase tracking-widest leading-none mb-1 font-bold",children:"System Role"}),l.jsx("p",{id:"nav-role",className:"text-xs text-indigo-900 font-semibold",children:i})]}),l.jsx("div",{className:"w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold border border-blue-100 shrink-0",children:l.jsx("span",{id:"nav-avatar",children:d})})]})})]})}function Bm({days:i,open:d,onClose:m}){return l.jsx("div",{id:"password-warning-modal",className:`${d?"flex":"hidden"} fixed inset-0 z-[90] items-center justify-center bg-slate-900/35 px-5 py-8`,children:l.jsxs("div",{className:"w-full max-w-[460px] overflow-hidden rounded-[16px] border border-blue-100 bg-white shadow-2xl",children:[l.jsxs("div",{className:"flex items-center justify-between border-b border-blue-50 px-5 py-4",children:[l.jsxs("div",{className:"flex items-center gap-3",children:[l.jsx("div",{className:"grid h-10 w-10 place-items-center rounded-[12px] bg-blue-50 text-primary",children:l.jsx("span",{className:"material-symbols-outlined",style:{fontVariationSettings:'"FILL" 1'},children:"lock_clock"})}),l.jsx("h3",{className:"text-base font-bold text-slate-900",children:"Password Expiring"})]}),l.jsx("button",{type:"button",onClick:m,className:"text-slate-400 transition hover:text-slate-700","aria-label":"Close password warning",children:l.jsx("span",{className:"material-symbols-outlined",children:"close"})})]}),l.jsxs("div",{className:"space-y-5 p-5",children:[l.jsxs("p",{id:"password-warning-message",className:"text-sm font-medium leading-7 text-slate-600",children:["รหัสผ่านของคุณจะหมดอายุในอีก ",i||"-"," วัน กรุณาเปลี่ยนรหัสผ่านก่อนถึงกำหนด"]}),l.jsxs("div",{className:"grid grid-cols-1 gap-3 sm:grid-cols-2",children:[l.jsx("button",{type:"button",onClick:m,className:"h-11 rounded-[12px] border border-blue-100 bg-white text-sm font-bold text-slate-600 transition hover:bg-blue-50",children:"Later"}),l.jsx("button",{type:"button",onClick:()=>{window.location.href="/change-password"},className:"h-11 rounded-[12px] bg-primary text-sm font-bold text-white shadow-lg shadow-indigo-100 transition hover:bg-primary-muted",children:"Change Password"})]})]})]})})}function nl(i,d,m=!1){return[m?"hidden":"","group flex items-center gap-3 px-3.5 py-3 rounded-[10px] transition-all mb-1",i===d?"bg-primary text-white shadow-md shadow-indigo-100":"bg-transparent text-slate-600 hover:bg-blue-50 hover:text-primary font-medium"].filter(Boolean).join(" ")}function ll(i,d){return["material-symbols-outlined font-normal transition-colors",i!==d?"text-slate-400 group-hover:text-primary":""].filter(Boolean).join(" ")}function Tm({activePage:i,role:d,roleLabel:m,onLogout:N}){const v=d==="superadmin",C=d==="superadmin",I=d==="admin"||d==="superadmin";return l.jsxs("aside",{className:"fixed left-0 top-0 h-full w-56 z-40 bg-white border-r border-blue-100 flex flex-col p-3 gap-2 pt-20 hidden md:flex",children:[l.jsxs("div",{className:"px-3.5 py-4 mb-4 bg-blue-50/50 rounded-[12px] border border-blue-50",children:[l.jsx("h2",{className:"font-headline text-primary text-base font-bold",children:"LQD Debt Overview"}),l.jsxs("p",{id:"sidebar-role-label",className:"text-[10px] text-indigo-400 uppercase tracking-widest font-bold",children:[m," Terminal"]})]}),l.jsxs("nav",{className:"flex-1 space-y-1",children:[v&&l.jsxs("a",{id:"menu-users",href:"/users",className:nl(i,"users"),children:[l.jsx("span",{className:ll(i,"users"),style:i==="users"?{fontVariationSettings:'"FILL" 1'}:void 0,children:"manage_accounts"}),l.jsx("span",{className:`text-sm ${i==="users"?"font-semibold":""}`,children:"User Management"})]}),v&&l.jsxs("a",{id:"menu-password-policy",href:"/password-policy",className:nl(i,"password-policy"),children:[l.jsx("span",{className:ll(i,"password-policy"),style:i==="password-policy"?{fontVariationSettings:'"FILL" 1'}:void 0,children:"admin_panel_settings"}),l.jsx("span",{className:`text-sm ${i==="password-policy"?"font-semibold":""}`,children:"Password Policy"})]}),l.jsxs("a",{href:"/customer-list",className:nl(i,"customer-list",C),children:[l.jsx("span",{className:ll(i,"customer-list"),style:i==="customer-list"?{fontVariationSettings:'"FILL" 1'}:void 0,children:"groups"}),l.jsx("span",{className:`text-sm ${i==="customer-list"?"font-semibold":""}`,children:"Customer List"})]}),l.jsxs("a",{href:"/payment-record",className:nl(i,"payment-record",C),children:[l.jsx("span",{className:ll(i,"payment-record"),style:i==="payment-record"?{fontVariationSettings:'"FILL" 1'}:void 0,children:"history"}),l.jsx("span",{className:`text-sm ${i==="payment-record"?"font-semibold":""}`,children:"Payment Record"})]}),I&&l.jsxs("a",{id:"menu-import",href:"/data-import",className:nl(i,"data-import",C),children:[l.jsx("span",{className:ll(i,"data-import"),style:i==="data-import"?{fontVariationSettings:'"FILL" 1'}:void 0,children:"upload_file"}),l.jsx("span",{className:`text-sm ${i==="data-import"?"font-semibold":""}`,children:"Data Import Center"})]}),I&&l.jsxs("a",{id:"menu-report",href:"/report",className:nl(i,"report",C),children:[l.jsx("span",{className:ll(i,"report"),style:i==="report"?{fontVariationSettings:'"FILL" 1'}:void 0,children:"assessment"}),l.jsx("span",{className:`text-sm ${i==="report"?"font-semibold":""}`,children:"Report Center"})]})]}),l.jsx("div",{className:"mt-auto pt-4 border-t border-blue-50",children:l.jsxs("button",{type:"button",onClick:N,className:"w-full flex items-center gap-3 px-3.5 py-3 text-accent-coral text-sm hover:bg-red-50 rounded-[10px] transition-all font-bold cursor-pointer",children:[l.jsx("span",{className:"material-symbols-outlined font-normal",children:"logout"}),l.jsx("span",{children:"Log out"})]})})]})}const Rm={user:"User",admin:"Admin",superadmin:"Super Admin"};function Fm(i){var d;return((d=document.cookie.split("; ").find(m=>m.startsWith(`${i}=`)))==null?void 0:d.split("=")[1])||""}function Pm({activePage:i,children:d}){const[m]=E.useState(()=>sessionStorage.getItem("role")||""),[N]=E.useState(()=>sessionStorage.getItem("display_name")||""),[v,C]=E.useState(!1),[I]=E.useState(()=>sessionStorage.getItem("password_warning_days")),$=Rm[m]||m||"-",z=N.charAt(0)||"-";E.useEffect(()=>{if(I&&!sessionStorage.getItem("password_warning_seen")){sessionStorage.setItem("password_warning_seen","1");const B=window.setTimeout(()=>C(!0),300);return()=>window.clearTimeout(B)}},[I]);async function M(){const B=Fm("token");await fetch("/api/auth/logout",{method:"POST",headers:{Authorization:`Bearer ${B}`}}),document.cookie="token=; path=/; max-age=0",sessionStorage.clear(),window.location.href="/login"}return l.jsxs(l.Fragment,{children:[l.jsx(Lm,{roleLabel:$,avatar:z}),l.jsx(Tm,{activePage:i,role:m,roleLabel:$,onLogout:M}),d,l.jsx(Bm,{days:I,open:v,onClose:()=>C(!1)})]})}function Mm({runLegacyAction:i}){return l.jsxs(l.Fragment,{children:[l.jsxs("main",{className:"md:ml-56 pt-20 min-h-screen pb-24",children:[l.jsx("div",{className:"px-6 md:px-8",children:l.jsx("div",{className:"max-w-[1600px] mx-auto",children:l.jsxs("header",{className:"flex flex-col xl:flex-row xl:items-center justify-between gap-4 py-4 border-b border-indigo-100/50",children:[l.jsxs("div",{className:"flex items-center gap-4 min-w-0",children:[l.jsx("a",{id:"customer-detail-back-link",href:"/customer-list",className:"w-14 h-14 rounded-2xl bg-white shadow-lg shadow-slate-200/50 flex items-center justify-center text-primary border border-white hover:bg-indigo-50 transition-all flex-shrink-0",children:l.jsx("span",{className:"material-symbols-outlined text-3xl",children:"arrow_back"})}),l.jsxs("div",{className:"min-w-0",children:[l.jsxs("div",{className:"flex items-center gap-3 flex-wrap",children:[l.jsx("h1",{className:"font-headline text-3xl font-extrabold text-primary tracking-tight",children:"รายละเอียดลูกหนี้"}),l.jsx("span",{className:"inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-50 text-primary border border-indigo-100",children:"Customer Detail"})]}),l.jsx("p",{id:"detail-subtitle",className:"text-slate-500 font-medium text-sm mt-1 truncate",children:"กำลังโหลดข้อมูล..."})]})]}),l.jsx("div",{className:"w-full xl:w-auto flex items-center xl:justify-end",children:l.jsxs("div",{className:"flex flex-col gap-2 w-full xl:w-auto",children:[l.jsx("p",{className:"text-[10px] text-slate-400 uppercase tracking-widest font-bold leading-none text-right",children:"Status Progress"}),l.jsx("div",{id:"progress-steps",className:"min-w-[300px] min-h-[52px]"})]})})]})})}),l.jsxs("div",{id:"error-banner",className:"hidden mx-6 mt-4 max-w-[1600px] bg-red-50 border border-red-200 rounded-xl px-5 py-3 flex items-center gap-3",children:[l.jsx("span",{className:"material-symbols-outlined text-red-500 flex-shrink-0",style:{fontVariationSettings:'"FILL" 1'},children:"error"}),l.jsx("p",{id:"error-text",className:"text-sm text-red-700 font-medium flex-1"}),l.jsx("button",{onClick:d=>i("hideError()",d),className:"text-red-400 hover:text-red-600",children:l.jsx("span",{className:"material-symbols-outlined text-lg",children:"close"})})]}),l.jsx("div",{className:"px-6 md:px-8 py-6",children:l.jsxs("div",{className:"max-w-[1600px] mx-auto grid grid-cols-12 gap-4 items-stretch",children:[l.jsx("div",{className:"col-span-12",children:l.jsxs("div",{className:"dashboard-card",children:[l.jsx("div",{className:"detail-card-heading px-5 md:px-6 py-4 border-b border-sky-100 bg-gradient-to-r from-sky-50 via-white to-cyan-50 rounded-t-2xl overflow-hidden",children:l.jsxs("div",{className:"flex items-center justify-between gap-3 flex-wrap",children:[l.jsxs("div",{className:"flex items-center gap-3",children:[l.jsx("div",{className:"w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-100 to-cyan-100 flex items-center justify-center text-sky-600 shadow-sm flex-shrink-0",children:l.jsx("span",{className:"material-symbols-outlined text-[20px]",style:{fontVariationSettings:'"FILL" 1'},children:"account_balance_wallet"})}),l.jsxs("div",{children:[l.jsx("div",{className:"flex items-center gap-2 flex-wrap",children:l.jsx("h2",{className:"text-[18px] font-extrabold text-slate-800 tracking-tight",children:"รายละเอียดบัญชี"})}),l.jsx("p",{className:"text-[12px] text-slate-500 mt-0.5",children:"แสดงข้อมูลบัญชีลูกหนี้และข้อมูลพื้นฐาน"})]})]}),l.jsx("div",{className:"detail-status-pill",children:l.jsx("span",{children:"Existing Case"})})]})}),l.jsxs("div",{className:"dashboard-card-content",children:[l.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[l.jsxs("div",{children:[l.jsxs("label",{className:"form-label-styled",children:["หมายเลขบัญชี                       ",l.jsx("span",{className:"text-red-500",children:"*"})]}),l.jsxs("div",{className:"relative",children:[l.jsx("span",{className:"material-symbols-outlined readonly-display-icon",children:"badge"}),l.jsx("input",{id:"account-no",className:"form-input-styled readonly-display-input readonly-display-with-icon pr-4",type:"text",readOnly:!0,tabIndex:-1})]}),l.jsxs("p",{id:"warn-account-no",className:"hidden text-[10px] text-red-500 mt-1 flex items-center gap-1",children:[l.jsx("span",{className:"material-symbols-outlined text-sm",style:{fontVariationSettings:'"FILL" 1'},children:"warning"}),l.jsx("span",{id:"warn-account-no-msg",children:"กรุณากรอกตัวเลขเท่านั้น"})]})]}),l.jsxs("div",{children:[l.jsxs("label",{className:"form-label-styled",children:["ชื่อ-นามสกุล                       ",l.jsx("span",{className:"text-red-500",children:"*"})]}),l.jsxs("div",{className:"relative",children:[l.jsx("span",{className:"material-symbols-outlined readonly-display-icon",children:"person"}),l.jsx("input",{id:"customer-name",className:"form-input-styled readonly-display-input readonly-display-with-icon pr-4",type:"text",readOnly:!0,tabIndex:-1})]}),l.jsxs("p",{id:"warn-customer-name",className:"hidden text-[10px] text-red-500 mt-1 flex items-center gap-1",children:[l.jsx("span",{className:"material-symbols-outlined text-sm",style:{fontVariationSettings:'"FILL" 1'},children:"warning"}),l.jsx("span",{id:"warn-customer-name-msg",children:"ไม่อนุญาตให้ใช้อักขระพิเศษ"})]})]}),l.jsxs("div",{children:[l.jsx("label",{className:"form-label-styled",children:"ทุนทรัพย์ที่ฟ้อง"}),l.jsxs("div",{className:"relative",children:[l.jsx("input",{id:"filing-capital",className:"form-input-styled readonly-display-input readonly-display-with-icon text-right pr-4",type:"text",readOnly:!0,tabIndex:-1}),l.jsx("span",{className:"absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-extrabold text-indigo-300 pointer-events-none",children:"฿"})]})]}),l.jsxs("div",{children:[l.jsx("label",{className:"form-label-styled",children:"วันที่ผิดนัดชำระก่อนฟ้อง"}),l.jsxs("div",{className:"relative",children:[l.jsx("span",{className:"material-symbols-outlined readonly-display-icon",children:"event"}),l.jsx("input",{id:"default-date-display",className:"form-input-styled readonly-display-input readonly-display-with-icon pr-4",type:"text",readOnly:!0,tabIndex:-1})]})]}),l.jsxs("div",{children:[l.jsx("label",{className:"form-label-styled",children:"DPD ณ วันที่ก่อนส่งฟ้องศาล 1 วัน"}),l.jsxs("div",{className:"relative",children:[l.jsx("span",{className:"material-symbols-outlined readonly-display-icon",children:"timer"}),l.jsx("input",{id:"pre-filing-dpd-days-display",className:"form-input-styled readonly-display-input readonly-display-with-icon pr-4",type:"text",readOnly:!0,tabIndex:-1})]})]}),l.jsxs("div",{children:[l.jsx("label",{className:"form-label-styled",children:"หมายเหตุ / เงื่อนไขพิเศษ"}),l.jsxs("div",{id:"filing-note-display",className:"readonly-display-text theme-tooltip","data-tooltip":"-",tabIndex:0,children:[l.jsx("span",{className:"material-symbols-outlined readonly-display-icon",children:"notes"}),l.jsx("span",{id:"filing-note-display-text",className:"block truncate",children:"-"}),l.jsxs("div",{className:"note-tooltip-popover",role:"tooltip","aria-label":"หมายเหตุและเงื่อนไขพิเศษ",children:[l.jsxs("div",{className:"note-tooltip-head",children:[l.jsx("span",{className:"note-tooltip-icon",children:l.jsx("span",{className:"material-symbols-outlined text-[16px]",style:{fontVariationSettings:'"FILL" 1'},children:"sticky_note_2"})}),l.jsx("span",{className:"note-tooltip-title",children:"หมายเหตุ / เงื่อนไขพิเศษ"})]}),l.jsx("div",{id:"filing-note-tooltip-text",className:"note-tooltip-body",children:"-"})]})]})]})]}),l.jsxs("div",{className:"flex items-center gap-4 mt-3 pt-3 border-t border-slate-50",children:[l.jsxs("div",{className:"flex items-center gap-1.5 text-[11px] text-slate-400",children:[l.jsx("span",{className:"material-symbols-outlined text-sm text-slate-300",style:{fontVariationSettings:'"FILL" 1'},children:"add_circle"}),l.jsx("span",{children:"สร้างเมื่อ"}),l.jsx("span",{id:"ts-created-at",className:"font-semibold text-slate-500",children:"-"})]}),l.jsx("div",{className:"w-px h-3 bg-slate-200"}),l.jsxs("div",{className:"flex items-center gap-1.5 text-[11px] text-slate-400",children:[l.jsx("span",{className:"material-symbols-outlined text-sm text-slate-300",style:{fontVariationSettings:'"FILL" 1'},children:"edit"}),l.jsx("span",{children:"แก้ไขล่าสุด"}),l.jsx("span",{id:"ts-updated-at",className:"font-semibold text-slate-500",children:"-"})]})]})]})]})}),l.jsx("div",{className:"col-span-12",id:"section-enforcement-form",style:{display:"none"},children:l.jsxs("div",{className:"dashboard-card",children:[l.jsx("div",{className:"dashboard-card-header detail-card-heading",style:{background:"linear-gradient(135deg,#FFF5F5,#fff)"},children:l.jsxs("div",{className:"flex items-center gap-3",children:[l.jsx("div",{className:"w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center text-red-600",children:l.jsx("span",{className:"material-symbols-outlined text-lg",children:"assignment"})}),l.jsxs("div",{children:[l.jsx("h3",{className:"font-bold text-sm text-slate-800",children:"บันทึกหมายบังคับคดี"}),l.jsx("p",{className:"text-[11px] text-red-400",children:"เมื่อบันทึกแล้ว สถานะจะเปลี่ยนเป็น บังคับคดี"})]})]})}),l.jsxs("div",{className:"dashboard-card-content",children:[l.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4 items-start",children:[l.jsxs("div",{children:[l.jsxs("label",{className:"form-label-styled",children:["คดีหมายเลขแดงที่                       ",l.jsx("span",{className:"text-red-500",children:"*"})]}),l.jsxs("div",{className:"dp-input-row relative",children:[l.jsx("input",{id:"enf-red-case-no",className:"dp-input dp-autocalc font-semibold",type:"text",defaultValue:"-",disabled:!0}),l.jsx("span",{className:"material-symbols-outlined dp-icon",children:"confirmation_number"})]})]}),l.jsxs("div",{children:[l.jsxs("label",{className:"form-label-styled",children:["วันที่ของหมายบังคับคดี                       ",l.jsx("span",{className:"text-red-500",children:"*"})]}),l.jsxs("div",{className:"dp-wrap",id:"dp-wrap-enf-judgment-date",children:[l.jsxs("div",{className:"dp-input-row relative",children:[l.jsx("input",{type:"hidden",id:"enf-judgment-date"}),l.jsx("div",{className:"dp-input",id:"dp-display-enf-judgment-date",tabIndex:0,onClick:d=>i("dpOpen('enf-judgment-date')",d),children:l.jsx("span",{id:"dp-text-enf-judgment-date",className:"text-slate-400",children:"เลือกวันที่"})}),l.jsx("span",{className:"material-symbols-outlined dp-icon",children:"calendar_today"})]}),l.jsxs("div",{className:"dp-popup",id:"dp-popup-enf-judgment-date",children:[l.jsxs("div",{className:"dp-header",children:[l.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavMonth('enf-judgment-date',-1)",d),type:"button",children:l.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_left"})}),l.jsx("span",{className:"dp-month-year",id:"dp-title-enf-judgment-date",onClick:d=>i("dpToggleMyPicker('enf-judgment-date')",d)}),l.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavMonth('enf-judgment-date',1)",d),type:"button",children:l.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_right"})})]}),l.jsxs("div",{id:"dp-my-enf-judgment-date",className:"hidden",children:[l.jsxs("div",{className:"dp-year-header",children:[l.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavYear('enf-judgment-date',-1)",d),type:"button",children:l.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_left"})}),l.jsx("span",{id:"dp-year-label-enf-judgment-date",className:"font-bold text-sm text-slate-700"}),l.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavYear('enf-judgment-date',1)",d),type:"button",children:l.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_right"})})]}),l.jsx("div",{className:"dp-my-grid",id:"dp-months-enf-judgment-date"})]}),l.jsxs("div",{id:"dp-cal-enf-judgment-date",children:[l.jsxs("div",{className:"dp-weekdays",children:[l.jsx("div",{className:"dp-weekday",children:"อา"}),l.jsx("div",{className:"dp-weekday",children:"จ"}),l.jsx("div",{className:"dp-weekday",children:"อ"}),l.jsx("div",{className:"dp-weekday",children:"พ"}),l.jsx("div",{className:"dp-weekday",children:"พฤ"}),l.jsx("div",{className:"dp-weekday",children:"ศ"}),l.jsx("div",{className:"dp-weekday",children:"ส"})]}),l.jsx("div",{className:"dp-days",id:"dp-days-enf-judgment-date"})]}),l.jsxs("div",{className:"dp-footer",children:[l.jsx("button",{className:"dp-btn-clear",onClick:d=>i("dpClear('enf-judgment-date')",d),type:"button",children:"ล้างค่า"}),l.jsx("button",{className:"dp-btn-today",onClick:d=>i("dpSelectToday('enf-judgment-date')",d),type:"button",children:"วันนี้"})]})]})]})]})]}),l.jsx("div",{className:"mt-2 flex justify-end",children:l.jsxs("button",{onClick:d=>i("submitEnforcement()",d),className:"inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-red-600 text-white rounded-xl text-xs font-bold shadow-sm hover:bg-red-700 transition-all whitespace-nowrap",children:[l.jsx("span",{className:"material-symbols-outlined text-sm",children:"assignment_turned_in"}),"บันทึกหมายบังคับคดี"]})})]})]})}),l.jsx("div",{className:"col-span-12",id:"section-enforcement-info",style:{display:"none"},children:l.jsxs("div",{className:"dashboard-card overflow-hidden",children:[l.jsx("div",{className:"detail-card-heading px-5 md:px-6 py-4 border-b border-red-100 bg-gradient-to-r from-red-50 via-white to-rose-50 rounded-t-2xl overflow-hidden",children:l.jsx("div",{className:"flex items-center justify-between gap-3 flex-wrap",children:l.jsxs("div",{className:"flex items-center gap-3",children:[l.jsx("div",{className:"w-10 h-10 rounded-2xl bg-gradient-to-br from-red-100 to-rose-100 flex items-center justify-center text-red-600 shadow-sm flex-shrink-0",children:l.jsx("span",{className:"material-symbols-outlined text-[20px]",style:{fontVariationSettings:'"FILL" 1'},children:"assignment_turned_in"})}),l.jsxs("div",{children:[l.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[l.jsx("h2",{className:"text-[18px] font-extrabold text-slate-800 tracking-tight",children:"ข้อมูลหมายบังคับคดี"}),l.jsx("span",{className:"inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-600 border border-red-100",children:"บังคับคดี"})]}),l.jsx("p",{className:"text-[12px] text-slate-500 mt-0.5",children:"แสดงรายละเอียดหมายบังคับคดีที่บันทึกแล้ว และใช้ติดตามขั้นตอนหลังคำพิพากษา"})]})]})})}),l.jsxs("div",{className:"dashboard-card-content form-section-compact",children:[l.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-3 field-grid-enhanced",children:[l.jsxs("div",{children:[l.jsxs("div",{className:"flex items-center gap-2 mb-1",children:[l.jsx("span",{className:"material-symbols-outlined text-red-400 text-base",style:{fontVariationSettings:'"FILL" 1'},children:"confirmation_number"}),l.jsx("p",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-wider",children:"คดีหมายเลขแดงที่"})]}),l.jsx("p",{id:"enf-info-red-case-no",className:"text-sm font-bold text-slate-800",children:"-"})]}),l.jsxs("div",{children:[l.jsxs("div",{className:"flex items-center gap-2 mb-1",children:[l.jsx("span",{className:"material-symbols-outlined text-red-400 text-base",style:{fontVariationSettings:'"FILL" 1'},children:"gavel"}),l.jsx("p",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-wider",children:"วันที่ของหมายบังคับคดี"})]}),l.jsx("p",{id:"enf-info-judgment-date",className:"text-sm font-bold text-slate-800",children:"-"})]}),l.jsxs("div",{children:[l.jsxs("div",{className:"flex items-center gap-2 mb-1",children:[l.jsx("span",{className:"material-symbols-outlined text-red-400 text-base",style:{fontVariationSettings:'"FILL" 1'},children:"person_check"}),l.jsx("p",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-wider",children:"วันที่บันทึกหมายบังคับคดี"})]}),l.jsx("p",{id:"enf-info-recorded",className:"text-sm font-semibold text-slate-600",children:"-"})]})]}),l.jsx("div",{id:"retro-enforcement-panel",className:"mt-4 border border-amber-100 bg-amber-50/60 rounded-2xl px-4 py-3",children:l.jsxs("div",{className:"flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3",children:[l.jsxs("div",{className:"flex items-start gap-3 min-w-0",children:[l.jsx("div",{className:"w-9 h-9 rounded-xl bg-white text-amber-600 border border-amber-100 flex items-center justify-center flex-shrink-0",children:l.jsx("span",{className:"material-symbols-outlined text-[20px]",style:{fontVariationSettings:'"FILL" 1'},children:"manage_history"})}),l.jsxs("div",{className:"min-w-0",children:[l.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[l.jsx("p",{className:"text-sm font-extrabold text-slate-800",children:"การแก้รายงานย้อนหลัง"}),l.jsx("span",{id:"retro-enforcement-status-badge",className:"inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200",children:"-"})]}),l.jsx("p",{id:"retro-enforcement-message",className:"text-[12px] text-slate-500 mt-1",children:"กำลังตรวจสอบสถานะรายงานย้อนหลัง..."}),l.jsx("p",{id:"retro-enforcement-meta",className:"text-[11px] text-slate-400 mt-1",children:"-"})]})]}),l.jsxs("button",{id:"retro-enforcement-toggle",type:"button",role:"switch","aria-checked":"false",onClick:d=>i("openRetroEnforcementConfirm()",d),className:"retro-toggle-btn w-full sm:w-[245px] border-slate-200 text-slate-500",children:[l.jsx("span",{id:"retro-enforcement-toggle-label",className:"truncate leading-none",children:"แก้รายงานแล้ว"}),l.jsx("span",{id:"retro-enforcement-toggle-knob",className:"retro-toggle-track bg-slate-200",children:l.jsx("span",{className:"retro-toggle-dot"})})]})]})})]})]})}),l.jsx("div",{className:"col-span-12 lg:col-span-6 flex flex-col",style:{overflow:"visible"},children:l.jsxs("div",{className:"dashboard-card case-entry-card judgment-card flex-1",style:{overflow:"visible"},children:[l.jsx("div",{className:"detail-card-heading case-section-heading px-5 md:px-6 py-4 border-b border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-violet-50 rounded-t-2xl overflow-hidden",children:l.jsx("div",{className:"flex items-center justify-between gap-3 flex-wrap",children:l.jsxs("div",{className:"flex items-center gap-3",children:[l.jsx("div",{className:"w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center text-indigo-600 shadow-sm flex-shrink-0",children:l.jsx("span",{className:"material-symbols-outlined text-[20px]",style:{fontVariationSettings:"'FILL' 1"},children:"gavel"})}),l.jsxs("div",{children:[l.jsx("div",{className:"flex items-center gap-2 flex-wrap",children:l.jsx("h2",{className:"text-[18px] font-extrabold text-slate-800 tracking-tight",children:"รายละเอียดคำพิพากษา"})}),l.jsx("p",{className:"text-[12px] text-slate-500 mt-0.5",children:"กรอกข้อมูลคำพิพากษา และรายละเอียดเพื่อใช้คำนวณตารางผ่อนชำระ"})]})]})})}),l.jsxs("div",{className:"dashboard-card-content form-section-compact",children:[l.jsxs("div",{id:"judgment-type-row",className:"hidden mb-3 p-3 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl shadow-sm",children:[l.jsxs("label",{className:"form-label-styled text-indigo-600",children:["ประเภทคำพิพากษา                     ",l.jsx("span",{className:"text-red-500",children:"*"})]}),l.jsxs("div",{className:"relative",id:"jt-dropdown-wrap",children:[l.jsx("input",{type:"hidden",id:"judgment-type",defaultValue:""}),l.jsxs("button",{type:"button",id:"jt-trigger",onClick:d=>i("jtToggle()",d),className:"w-full flex items-center justify-between bg-white border border-indigo-200 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all hover:border-indigo-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-sm",children:[l.jsx("span",{id:"jt-display",className:"text-slate-400",children:"-- เลือกประเภทเพื่อเปลี่ยนสถานะ --"}),l.jsx("span",{className:"material-symbols-outlined text-indigo-300 text-lg transition-transform duration-200",id:"jt-chevron",children:"expand_more"})]}),l.jsxs("div",{id:"jt-panel",className:"hidden absolute left-0 right-0 mt-1.5 bg-white border border-indigo-100 rounded-xl shadow-lg shadow-indigo-100/50 z-50 overflow-hidden",children:[l.jsxs("button",{type:"button",onClick:d=>i("jtSelect('พิพากษาตามยอม')",d),className:"w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-indigo-50 transition-all group border-b border-slate-50",children:[l.jsx("div",{className:"w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-all",children:l.jsx("span",{className:"material-symbols-outlined text-green-600 text-base",style:{fontVariationSettings:'"FILL" 1'},children:"handshake"})}),l.jsxs("div",{className:"flex-1",children:[l.jsx("p",{className:"text-sm font-semibold text-slate-800",children:"พิพากษาตามยอม"}),l.jsx("p",{className:"text-[11px] text-slate-400",children:"ลูกหนี้ยินยอมตามคำพิพากษา"})]}),l.jsx("span",{id:"jt-check-พิพากษาตามยอม",className:"hidden material-symbols-outlined text-indigo-600 text-lg",style:{fontVariationSettings:'"FILL" 1'},children:"check_circle"})]}),l.jsxs("button",{type:"button",onClick:d=>i("jtSelect('พิพากษาฝ่ายเดียว')",d),className:"w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-indigo-50 transition-all group",children:[l.jsx("div",{className:"w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-200 transition-all",children:l.jsx("span",{className:"material-symbols-outlined text-orange-600 text-base",style:{fontVariationSettings:'"FILL" 1'},children:"gavel"})}),l.jsxs("div",{className:"flex-1",children:[l.jsx("p",{className:"text-sm font-semibold text-slate-800",children:"พิพากษาฝ่ายเดียว"}),l.jsx("p",{className:"text-[11px] text-slate-400",children:"ศาลตัดสินโดยลูกหนี้ไม่มาศาล"})]}),l.jsx("span",{id:"jt-check-พิพากษาฝ่ายเดียว",className:"hidden material-symbols-outlined text-indigo-600 text-lg",style:{fontVariationSettings:'"FILL" 1'},children:"check_circle"})]})]})]}),l.jsx("p",{className:"text-[11px] text-indigo-400 mt-1.5",children:"เมื่อบันทึก จะเปลี่ยนสถานะจาก ยื่นฟ้อง → ประเภทที่เลือก"})]}),l.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 field-grid-enhanced",children:[l.jsxs("div",{children:[l.jsxs("label",{className:"form-label-styled",children:["วันที่ยื่นฟ้อง                       ",l.jsx("span",{className:"text-red-500",children:"*"})]}),l.jsxs("div",{className:"dp-wrap",id:"dp-wrap-filing-date",children:[l.jsxs("div",{className:"dp-input-row relative",children:[l.jsx("input",{type:"hidden",id:"filing-date"}),l.jsx("div",{className:"dp-input",id:"dp-display-filing-date",tabIndex:0,onClick:d=>i("dpOpen('filing-date')",d),onKeyDown:d=>i("if(event.key==='Enter'||event.key===' ')dpOpen('filing-date')",d),children:l.jsx("span",{id:"dp-text-filing-date",className:"text-slate-400",children:"เลือกวันที่ยื่นฟ้อง"})}),l.jsx("span",{className:"material-symbols-outlined dp-icon",children:"calendar_today"})]}),l.jsxs("div",{className:"dp-popup",id:"dp-popup-filing-date",children:[l.jsxs("div",{className:"dp-header",children:[l.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavMonth('filing-date',-1)",d),type:"button",children:l.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_left"})}),l.jsx("span",{className:"dp-month-year",id:"dp-title-filing-date",onClick:d=>i("dpToggleMyPicker('filing-date')",d)}),l.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavMonth('filing-date',1)",d),type:"button",children:l.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_right"})})]}),l.jsxs("div",{id:"dp-my-filing-date",className:"hidden",children:[l.jsxs("div",{className:"dp-year-header",children:[l.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavYear('filing-date',-1)",d),type:"button",children:l.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_left"})}),l.jsx("span",{id:"dp-year-label-filing-date",className:"font-bold text-sm text-slate-700"}),l.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavYear('filing-date',1)",d),type:"button",children:l.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_right"})})]}),l.jsx("div",{className:"dp-my-grid",id:"dp-months-filing-date"})]}),l.jsxs("div",{id:"dp-cal-filing-date",children:[l.jsxs("div",{className:"dp-weekdays",children:[l.jsx("div",{className:"dp-weekday",children:"อา"}),l.jsx("div",{className:"dp-weekday",children:"จ"}),l.jsx("div",{className:"dp-weekday",children:"อ"}),l.jsx("div",{className:"dp-weekday",children:"พ"}),l.jsx("div",{className:"dp-weekday",children:"พฤ"}),l.jsx("div",{className:"dp-weekday",children:"ศ"}),l.jsx("div",{className:"dp-weekday",children:"ส"})]}),l.jsx("div",{className:"dp-days",id:"dp-days-filing-date"})]}),l.jsxs("div",{className:"dp-footer",children:[l.jsx("button",{className:"dp-btn-clear",onClick:d=>i("dpClear('filing-date')",d),type:"button",children:"ล้างค่า"}),l.jsx("button",{className:"dp-btn-today",onClick:d=>i("dpSelectToday('filing-date')",d),type:"button",children:"วันนี้"})]})]})]})]}),l.jsxs("div",{children:[l.jsxs("label",{className:"form-label-styled",children:["วันที่พิพากษา                       ",l.jsx("span",{className:"text-red-500",children:"*"})]}),l.jsxs("div",{className:"dp-wrap",id:"dp-wrap-judgment-date",children:[l.jsxs("div",{className:"dp-input-row relative",children:[l.jsx("input",{type:"hidden",id:"judgment-date"}),l.jsx("div",{className:"dp-input",id:"dp-display-judgment-date",tabIndex:0,onClick:d=>i("dpOpen('judgment-date')",d),onKeyDown:d=>i("if(event.key==='Enter'||event.key===' ')dpOpen('judgment-date')",d),children:l.jsx("span",{id:"dp-text-judgment-date",className:"text-slate-400",children:"เลือกวันที่พิพากษา"})}),l.jsx("span",{className:"material-symbols-outlined dp-icon",children:"calendar_today"})]}),l.jsxs("div",{className:"dp-popup",id:"dp-popup-judgment-date",children:[l.jsxs("div",{className:"dp-header",children:[l.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavMonth('judgment-date',-1)",d),type:"button",children:l.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_left"})}),l.jsx("span",{className:"dp-month-year",id:"dp-title-judgment-date",onClick:d=>i("dpToggleMyPicker('judgment-date')",d)}),l.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavMonth('judgment-date',1)",d),type:"button",children:l.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_right"})})]}),l.jsxs("div",{id:"dp-my-judgment-date",className:"hidden",children:[l.jsxs("div",{className:"dp-year-header",children:[l.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavYear('judgment-date',-1)",d),type:"button",children:l.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_left"})}),l.jsx("span",{id:"dp-year-label-judgment-date",className:"font-bold text-sm text-slate-700"}),l.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavYear('judgment-date',1)",d),type:"button",children:l.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_right"})})]}),l.jsx("div",{className:"dp-my-grid",id:"dp-months-judgment-date"})]}),l.jsxs("div",{id:"dp-cal-judgment-date",children:[l.jsxs("div",{className:"dp-weekdays",children:[l.jsx("div",{className:"dp-weekday",children:"อา"}),l.jsx("div",{className:"dp-weekday",children:"จ"}),l.jsx("div",{className:"dp-weekday",children:"อ"}),l.jsx("div",{className:"dp-weekday",children:"พ"}),l.jsx("div",{className:"dp-weekday",children:"พฤ"}),l.jsx("div",{className:"dp-weekday",children:"ศ"}),l.jsx("div",{className:"dp-weekday",children:"ส"})]}),l.jsx("div",{className:"dp-days",id:"dp-days-judgment-date"})]}),l.jsxs("div",{className:"dp-footer",children:[l.jsx("button",{className:"dp-btn-clear",onClick:d=>i("dpClear('judgment-date')",d),type:"button",children:"ล้างค่า"}),l.jsx("button",{className:"dp-btn-today",onClick:d=>i("dpSelectToday('judgment-date')",d),type:"button",children:"วันนี้"})]})]})]})]}),l.jsxs("div",{children:[l.jsxs("label",{className:"form-label-styled",children:["คดีหมายเลขแดงที่                       ",l.jsx("span",{className:"text-red-500",children:"*"})]}),l.jsx("input",{id:"red-case-no",className:"form-input-styled font-medium",type:"text",placeholder:"เช่น ผบ1234/2567 หรือ พE325/2568",autoComplete:"off"}),l.jsxs("p",{id:"warn-red-case-no",className:"hidden text-[10px] text-red-500 mt-1 flex items-center gap-1",children:[l.jsx("span",{className:"material-symbols-outlined text-sm",style:{fontVariationSettings:'"FILL" 1'},children:"warning"}),l.jsx("span",{children:"รูปแบบคดีหมายเลขแดงไม่ถูกต้อง"})]})]}),l.jsxs("div",{children:[l.jsxs("label",{className:"form-label-styled text-blue-600",children:["ยอดหนี้ตามคำพิพากษา                       ",l.jsx("span",{className:"text-red-500",children:"*"})]}),l.jsxs("div",{className:"relative",children:[l.jsx("input",{id:"total-debt",className:"form-input-styled font-medium text-right pr-4 pl-10",placeholder:"0.00",type:"text",inputMode:"decimal",autoComplete:"off"}),l.jsx("span",{className:"absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400",children:"฿"})]}),l.jsxs("p",{id:"warn-total-debt",className:"hidden text-[10px] text-red-500 mt-1 flex items-center gap-1",children:[l.jsx("span",{className:"material-symbols-outlined text-sm",style:{fontVariationSettings:'"FILL" 1'},children:"warning"}),l.jsx("span",{children:"กรุณากรอกตัวเลขเท่านั้น"})]})]}),l.jsxs("div",{children:[l.jsxs("label",{className:"form-label-styled",children:["เงินต้นตามคำพิพากษา                       ",l.jsx("span",{className:"text-red-500",children:"*"})]}),l.jsxs("div",{className:"relative",children:[l.jsx("input",{id:"principal",className:"form-input-styled font-medium text-right pr-4 pl-10",placeholder:"0.00",type:"text",inputMode:"decimal",autoComplete:"off"}),l.jsx("span",{className:"absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400",children:"฿"})]}),l.jsxs("p",{id:"warn-principal",className:"hidden text-[10px] text-red-500 mt-1 flex items-center gap-1",children:[l.jsx("span",{className:"material-symbols-outlined text-sm",style:{fontVariationSettings:'"FILL" 1'},children:"warning"}),l.jsx("span",{children:"กรุณากรอกตัวเลขเท่านั้น"})]})]}),l.jsxs("div",{children:[l.jsxs("label",{className:"form-label-styled",children:["อัตราดอกเบี้ย/ปี                       ",l.jsx("span",{className:"text-red-500",children:"*"})]}),l.jsx("input",{id:"interest-rate",className:"form-input-styled font-medium text-right",placeholder:"0",type:"text",inputMode:"decimal",autoComplete:"off"}),l.jsxs("p",{id:"warn-interest-rate",className:"hidden text-[10px] text-red-500 mt-1 flex items-center gap-1",children:[l.jsx("span",{className:"material-symbols-outlined text-sm",style:{fontVariationSettings:'"FILL" 1'},children:"warning"}),l.jsx("span",{children:"กรุณากรอกตัวเลขเท่านั้น"})]})]}),l.jsxs("div",{children:[l.jsx("label",{className:"form-label-styled",children:"ค่าธรรมเนียมศาล"}),l.jsxs("div",{className:"relative",children:[l.jsx("input",{id:"court-fee",className:"form-input-styled font-medium text-right pr-4 pl-10",placeholder:"0.00",type:"text",inputMode:"decimal",autoComplete:"off"}),l.jsx("span",{className:"absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400",children:"฿"})]}),l.jsxs("p",{id:"warn-court-fee",className:"hidden text-[10px] text-red-500 mt-1 flex items-center gap-1",children:[l.jsx("span",{className:"material-symbols-outlined text-sm",style:{fontVariationSettings:'"FILL" 1'},children:"warning"}),l.jsx("span",{children:"กรุณากรอกตัวเลขเท่านั้น"})]})]}),l.jsxs("div",{children:[l.jsx("label",{className:"form-label-styled",children:"ค่าทนายความ"}),l.jsxs("div",{className:"relative",children:[l.jsx("input",{id:"lawyer-fee",className:"form-input-styled font-medium text-right pr-4 pl-10",placeholder:"0.00",type:"text",inputMode:"decimal",autoComplete:"off"}),l.jsx("span",{className:"absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400",children:"฿"})]}),l.jsxs("p",{id:"warn-lawyer-fee",className:"hidden text-[10px] text-red-500 mt-1 flex items-center gap-1",children:[l.jsx("span",{className:"material-symbols-outlined text-sm",style:{fontVariationSettings:'"FILL" 1'},children:"warning"}),l.jsx("span",{children:"กรุณากรอกตัวเลขเท่านั้น"})]})]}),l.jsxs("div",{children:[l.jsxs("label",{className:"form-label-styled",children:["จำนวนงวดผ่อน                       ",l.jsx("span",{className:"text-red-500",children:"*"})]}),l.jsx("input",{id:"installment-count",className:"form-input-styled font-medium",placeholder:"0",type:"text",inputMode:"numeric",autoComplete:"off"}),l.jsxs("p",{id:"warn-installment-count",className:"hidden text-[10px] text-red-500 mt-1 flex items-center gap-1",children:[l.jsx("span",{className:"material-symbols-outlined text-sm",style:{fontVariationSettings:'"FILL" 1'},children:"warning"}),l.jsx("span",{children:"กรุณากรอกตัวเลขจำนวนเต็มเท่านั้น"})]})]}),l.jsxs("div",{children:[l.jsxs("label",{className:"form-label-styled flex items-center gap-2",children:["ยอดหนี้ส่วนต่าง",l.jsx("span",{className:"auto-badge-soft",children:"AUTO"})]}),l.jsxs("div",{className:"relative",children:[l.jsx("input",{id:"diff-debt",className:"form-input-styled autocalc-input font-medium text-right pr-4 pl-10",placeholder:"0.00",type:"text",readOnly:!0,tabIndex:-1,onFocus:d=>i("this.blur()",d)}),l.jsx("span",{className:"absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400",children:"฿"})]})]}),l.jsxs("div",{className:"sm:col-span-2",children:[l.jsx("label",{className:"form-label-styled",children:"หมายเหตุ / เงื่อนไขพิเศษเพิ่มเติม"}),l.jsx("textarea",{id:"judgment-note",className:"form-input-styled min-h-[92px] resize-none",maxLength:100,placeholder:"กรอกหมายเหตุเพิ่มเติม (ถ้ามี)"}),l.jsxs("p",{className:"text-[10px] text-slate-400 mt-1",children:[l.jsx("span",{id:"judgment-note-counter",children:"0"}),"/100 ตัวอักษร                    "]})]}),l.jsx("div",{id:"retro-judgment-panel",className:"sm:col-span-2 border border-amber-100 bg-amber-50/60 rounded-2xl px-4 py-3",children:l.jsxs("div",{className:"flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3",children:[l.jsxs("div",{className:"flex items-start gap-3 min-w-0",children:[l.jsx("div",{className:"w-9 h-9 rounded-xl bg-white text-amber-600 border border-amber-100 flex items-center justify-center flex-shrink-0",children:l.jsx("span",{className:"material-symbols-outlined text-[20px]",style:{fontVariationSettings:'"FILL" 1'},children:"gavel"})}),l.jsxs("div",{className:"min-w-0",children:[l.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[l.jsx("p",{className:"text-sm font-extrabold text-slate-800",children:"คำพิพากษาข้ามเดือน"}),l.jsx("span",{id:"retro-judgment-status-badge",className:"inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200",children:"-"})]}),l.jsx("p",{id:"retro-judgment-message",className:"text-[12px] text-slate-500 mt-1",children:"กำลังตรวจสอบสถานะรายงานย้อนหลัง..."}),l.jsx("p",{id:"retro-judgment-meta",className:"text-[11px] text-slate-400 mt-1",children:"-"})]})]}),l.jsx("button",{id:"retro-judgment-confirm-btn",type:"button",onClick:d=>i("confirmRetroJudgmentFix()",d),className:"w-full sm:w-[245px] px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-500 text-xs font-bold transition-all",children:"ยืนยันว่าแก้รายงานย้อนหลังแล้ว"})]})})]})]})]})}),l.jsx("div",{className:"col-span-12 lg:col-span-6 flex flex-col",style:{overflow:"visible"},children:l.jsxs("div",{className:"dashboard-card case-entry-card payment-card flex-1",style:{overflow:"visible"},children:[l.jsx("div",{className:"detail-card-heading case-section-heading px-5 md:px-6 py-4 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-teal-50 rounded-t-2xl overflow-hidden",children:l.jsx("div",{className:"flex items-center justify-between gap-3 flex-wrap",children:l.jsxs("div",{className:"flex items-center gap-3",children:[l.jsx("div",{className:"w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-emerald-600 shadow-sm flex-shrink-0",children:l.jsx("span",{className:"material-symbols-outlined text-[20px]",style:{fontVariationSettings:"'FILL' 1"},children:"payments"})}),l.jsxs("div",{children:[l.jsx("div",{className:"flex items-center gap-2 flex-wrap",children:l.jsx("h2",{className:"text-[18px] font-extrabold text-slate-800 tracking-tight",children:"รายละเอียดการชำระเงินตามคำพิพากษา"})}),l.jsx("p",{className:"text-[12px] text-slate-500 mt-0.5",children:"กำหนดงวดชำระ ค่างวด และดอกเบี้ยเพื่อใช้คำนวณตารางผ่อนชำระ"})]})]})})}),l.jsx("div",{className:"dashboard-card-content form-section-compact",children:l.jsxs("div",{className:"space-y-3",children:[l.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 field-grid-enhanced",children:[l.jsxs("div",{children:[l.jsxs("label",{className:"form-label-styled",children:["วันครบกำหนดงวดแรก                         ",l.jsx("span",{className:"text-red-500",children:"*"})]}),l.jsxs("div",{className:"dp-wrap",id:"dp-wrap-first-due-date",children:[l.jsxs("div",{className:"dp-input-row relative",children:[l.jsx("input",{type:"hidden",id:"first-due-date"}),l.jsx("div",{className:"dp-input",id:"dp-display-first-due-date",tabIndex:0,onClick:d=>i("dpOpen('first-due-date')",d),onKeyDown:d=>i("if(event.key==='Enter'||event.key===' ')dpOpen('first-due-date')",d),children:l.jsx("span",{id:"dp-text-first-due-date",className:"text-slate-400",children:"เลือกวันครบกำหนดงวดแรก"})}),l.jsx("span",{className:"material-symbols-outlined dp-icon",children:"calendar_today"})]}),l.jsxs("div",{className:"dp-popup",id:"dp-popup-first-due-date",children:[l.jsxs("div",{className:"dp-header",children:[l.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavMonth('first-due-date',-1)",d),type:"button",children:l.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_left"})}),l.jsx("span",{className:"dp-month-year",id:"dp-title-first-due-date",onClick:d=>i("dpToggleMyPicker('first-due-date')",d)}),l.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavMonth('first-due-date',1)",d),type:"button",children:l.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_right"})})]}),l.jsxs("div",{id:"dp-my-first-due-date",className:"hidden",children:[l.jsxs("div",{className:"dp-year-header",children:[l.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavYear('first-due-date',-1)",d),type:"button",children:l.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_left"})}),l.jsx("span",{id:"dp-year-label-first-due-date",className:"font-bold text-sm text-slate-700"}),l.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavYear('first-due-date',1)",d),type:"button",children:l.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_right"})})]}),l.jsx("div",{className:"dp-my-grid",id:"dp-months-first-due-date"})]}),l.jsxs("div",{id:"dp-cal-first-due-date",children:[l.jsxs("div",{className:"dp-weekdays",children:[l.jsx("div",{className:"dp-weekday",children:"อา"}),l.jsx("div",{className:"dp-weekday",children:"จ"}),l.jsx("div",{className:"dp-weekday",children:"อ"}),l.jsx("div",{className:"dp-weekday",children:"พ"}),l.jsx("div",{className:"dp-weekday",children:"พฤ"}),l.jsx("div",{className:"dp-weekday",children:"ศ"}),l.jsx("div",{className:"dp-weekday",children:"ส"})]}),l.jsx("div",{className:"dp-days",id:"dp-days-first-due-date"})]}),l.jsxs("div",{className:"dp-footer",children:[l.jsx("button",{className:"dp-btn-clear",onClick:d=>i("dpClear('first-due-date')",d),type:"button",children:"ล้างค่า"}),l.jsx("button",{className:"dp-btn-today",onClick:d=>i("dpSelectToday('first-due-date')",d),type:"button",children:"วันนี้"})]})]})]})]}),l.jsxs("div",{children:[l.jsxs("label",{className:"form-label-styled flex items-center gap-2",children:["วันครบกำหนดงวดสุดท้าย",l.jsx("span",{className:"auto-badge-soft",children:"AUTO"})]}),l.jsxs("div",{className:"dp-wrap",id:"dp-wrap-last-due-date",children:[l.jsxs("div",{className:"dp-input-row relative",children:[l.jsx("input",{type:"hidden",id:"last-due-date"}),l.jsx("div",{className:"dp-input dp-readonly dp-autocalc",id:"dp-display-last-due-date",tabIndex:-1,children:l.jsx("span",{id:"dp-text-last-due-date",children:"คำนวณอัตโนมัติ"})}),l.jsx("span",{className:"material-symbols-outlined dp-icon",children:"calendar_today"})]}),l.jsxs("div",{className:"dp-popup",id:"dp-popup-last-due-date",children:[l.jsxs("div",{className:"dp-header",children:[l.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavMonth('last-due-date',-1)",d),type:"button",children:l.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_left"})}),l.jsx("span",{className:"dp-month-year",id:"dp-title-last-due-date",onClick:d=>i("dpToggleMyPicker('last-due-date')",d)}),l.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavMonth('last-due-date',1)",d),type:"button",children:l.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_right"})})]}),l.jsxs("div",{id:"dp-my-last-due-date",className:"hidden",children:[l.jsxs("div",{className:"dp-year-header",children:[l.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavYear('last-due-date',-1)",d),type:"button",children:l.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_left"})}),l.jsx("span",{id:"dp-year-label-last-due-date",className:"font-bold text-sm text-slate-700"}),l.jsx("button",{className:"dp-nav-btn",onClick:d=>i("dpNavYear('last-due-date',1)",d),type:"button",children:l.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"18px"},children:"chevron_right"})})]}),l.jsx("div",{className:"dp-my-grid",id:"dp-months-last-due-date"})]}),l.jsxs("div",{id:"dp-cal-last-due-date",children:[l.jsxs("div",{className:"dp-weekdays",children:[l.jsx("div",{className:"dp-weekday",children:"อา"}),l.jsx("div",{className:"dp-weekday",children:"จ"}),l.jsx("div",{className:"dp-weekday",children:"อ"}),l.jsx("div",{className:"dp-weekday",children:"พ"}),l.jsx("div",{className:"dp-weekday",children:"พฤ"}),l.jsx("div",{className:"dp-weekday",children:"ศ"}),l.jsx("div",{className:"dp-weekday",children:"ส"})]}),l.jsx("div",{className:"dp-days",id:"dp-days-last-due-date"})]}),l.jsxs("div",{className:"dp-footer",children:[l.jsx("button",{className:"dp-btn-clear",onClick:d=>i("dpClear('last-due-date')",d),type:"button",children:"ล้างค่า"}),l.jsx("button",{className:"dp-btn-today",onClick:d=>i("dpSelectToday('last-due-date')",d),type:"button",children:"วันนี้"})]})]})]})]})]}),l.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 field-grid-enhanced",children:[l.jsxs("div",{children:[l.jsxs("label",{className:"form-label-styled",children:["ค่างวด งวดที่ 1                         ",l.jsx("span",{className:"text-red-500",children:"*"})]}),l.jsxs("div",{className:"relative",children:[l.jsx("input",{id:"installment-1",className:"form-input-styled font-medium text-right pr-4 pl-10",placeholder:"0.00",type:"text",inputMode:"decimal",autoComplete:"off"}),l.jsx("span",{className:"absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400",children:"฿"})]}),l.jsxs("p",{id:"warn-installment-1",className:"hidden text-[10px] text-red-500 mt-1 flex items-center gap-1",children:[l.jsx("span",{className:"material-symbols-outlined text-sm",style:{fontVariationSettings:'"FILL" 1'},children:"warning"}),l.jsx("span",{children:"กรุณากรอกตัวเลขเท่านั้น"})]})]}),l.jsxs("div",{children:[l.jsx("label",{className:"form-label-styled",children:"ค่างวด งวดที่ 2"}),l.jsxs("div",{className:"relative",children:[l.jsx("input",{id:"installment-2",className:"form-input-styled font-medium text-right pr-4 pl-10",placeholder:"0.00",type:"text",inputMode:"decimal",autoComplete:"off"}),l.jsx("span",{className:"absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400",children:"฿"})]}),l.jsxs("p",{id:"warn-installment-2",className:"hidden text-[10px] text-red-500 mt-1 flex items-center gap-1",children:[l.jsx("span",{className:"material-symbols-outlined text-sm",style:{fontVariationSettings:'"FILL" 1'},children:"warning"}),l.jsx("span",{children:"กรุณากรอกตัวเลขเท่านั้น"})]})]}),l.jsxs("div",{children:[l.jsx("label",{className:"form-label-styled",children:"ค่างวด งวดที่ 3"}),l.jsxs("div",{className:"relative",children:[l.jsx("input",{id:"installment-3",className:"form-input-styled font-medium text-right pr-4 pl-10",placeholder:"0.00",type:"text",inputMode:"decimal",autoComplete:"off"}),l.jsx("span",{className:"absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400",children:"฿"})]}),l.jsxs("p",{id:"warn-installment-3",className:"hidden text-[10px] text-red-500 mt-1 flex items-center gap-1",children:[l.jsx("span",{className:"material-symbols-outlined text-sm",style:{fontVariationSettings:'"FILL" 1'},children:"warning"}),l.jsx("span",{children:"กรุณากรอกตัวเลขเท่านั้น"})]})]}),l.jsxs("div",{children:[l.jsx("label",{className:"form-label-styled",children:"ค่างวด งวดที่ 4"}),l.jsxs("div",{className:"relative",children:[l.jsx("input",{id:"installment-4",className:"form-input-styled font-medium text-right pr-4 pl-10",placeholder:"0.00",type:"text",inputMode:"decimal",autoComplete:"off"}),l.jsx("span",{className:"absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400",children:"฿"})]}),l.jsxs("p",{id:"warn-installment-4",className:"hidden text-[10px] text-red-500 mt-1 flex items-center gap-1",children:[l.jsx("span",{className:"material-symbols-outlined text-sm",style:{fontVariationSettings:'"FILL" 1'},children:"warning"}),l.jsx("span",{children:"กรุณากรอกตัวเลขเท่านั้น"})]})]})]}),l.jsxs("div",{children:[l.jsx("label",{className:"form-label-styled",children:"ดอกเบี้ยเมื่อผิดนัดชำระ (%)"}),l.jsx("input",{id:"default-interest-rate",className:"form-input-styled font-medium text-right",placeholder:"0",type:"text",inputMode:"decimal",autoComplete:"off"}),l.jsxs("p",{id:"warn-default-interest-rate",className:"hidden text-[10px] text-red-500 mt-1 flex items-center gap-1",children:[l.jsx("span",{className:"material-symbols-outlined text-sm",style:{fontVariationSettings:'"FILL" 1'},children:"warning"}),l.jsx("span",{children:"กรุณากรอกตัวเลขเท่านั้น"})]})]}),l.jsx("div",{className:"helper-panel",children:l.jsxs("div",{className:"flex items-start gap-2",children:[l.jsx("span",{className:"material-symbols-outlined text-blue-400 text-base mt-0.5",children:"info"}),l.jsx("p",{children:"ระบบจะใช้ข้อมูลทั้งหมดที่กรอก เพื่อคำนวณตารางผ่อนชำระในส่วนพรีวิว หากมีการแก้ไขข้อมูล ต้องกดพรีวิวใหม่ก่อนบันทึก"})]})})]})})]})}),l.jsx("div",{className:"col-span-12",id:"edit-history-section",children:l.jsxs("div",{className:"dashboard-card",children:[l.jsx("div",{className:"detail-card-heading px-5 md:px-6 py-4 border-b border-amber-100 bg-gradient-to-r from-amber-50 via-white to-orange-50 rounded-t-2xl overflow-hidden",children:l.jsx("div",{className:"flex items-center justify-between gap-3 flex-wrap",children:l.jsxs("div",{className:"flex items-center gap-3",children:[l.jsx("div",{className:"w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-amber-600 shadow-sm flex-shrink-0",children:l.jsx("span",{className:"material-symbols-outlined text-[20px]",style:{fontVariationSettings:'"FILL" 1'},children:"history"})}),l.jsxs("div",{children:[l.jsx("div",{className:"flex items-center gap-2 flex-wrap",children:l.jsx("h2",{className:"text-[18px] font-extrabold text-slate-800 tracking-tight",children:"ประวัติการแก้ไข"})}),l.jsx("p",{className:"text-[12px] text-slate-500 mt-0.5",children:"บันทึกการเปลี่ยนแปลงข้อมูลล่าสุดเพื่อใช้ตรวจสอบย้อนหลัง"})]})]})})}),l.jsx("div",{id:"edit-history-body",className:"px-6 py-4 text-sm text-slate-400 text-center",children:"กำลังโหลด..."})]})}),l.jsx("div",{className:"col-span-12",children:l.jsxs("div",{className:"dashboard-card",children:[l.jsx("div",{className:"detail-card-heading px-5 md:px-6 py-4 border-b border-blue-100 bg-gradient-to-r from-blue-50 via-white to-indigo-50 rounded-t-2xl overflow-hidden",children:l.jsxs("div",{className:"flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4",children:[l.jsxs("div",{className:"flex items-center gap-3",children:[l.jsx("div",{className:"w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 shadow-sm flex-shrink-0",children:l.jsx("span",{className:"material-symbols-outlined text-[20px]",style:{fontVariationSettings:'"FILL" 1'},children:"calendar_today"})}),l.jsxs("div",{children:[l.jsx("div",{className:"flex items-center gap-2 flex-wrap",children:l.jsx("h2",{className:"text-[18px] font-extrabold text-slate-800 tracking-tight",children:"ตัวอย่างตารางผ่อนชำระ"})}),l.jsx("p",{className:"text-[12px] text-slate-500 mt-0.5",children:"ใช้ตรวจสอบตารางผ่อนชำระ"})]})]}),l.jsxs("div",{className:"flex flex-wrap items-center gap-3",children:[l.jsxs("div",{className:"flex items-center bg-white/80 p-1 rounded-xl border border-blue-100 shadow-sm",children:[l.jsx("button",{id:"view-monthly-btn",onClick:d=>i("switchView('monthly')",d),className:"px-3 py-1 rounded-lg text-[12px] font-bold transition-all bg-white text-primary shadow-sm",children:"แสดงรายเดือน"}),l.jsx("button",{id:"view-daily-btn",onClick:d=>i("switchView('daily')",d),className:"px-3 py-1 rounded-lg text-[12px] font-bold transition-all text-slate-500 hover:text-slate-700",children:"แสดงทุกวันที่"})]}),l.jsxs("div",{id:"preview-stale-warn",className:"hidden flex items-center gap-1 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-600 font-bold",children:[l.jsx("span",{className:"material-symbols-outlined text-sm",children:"refresh"}),"กรุณากดพรีวิวใหม่"]})]})]})}),l.jsxs("div",{className:"overflow-hidden flex flex-col",children:[l.jsx("div",{id:"schedule-placeholder",className:"p-8 text-center text-slate-400 text-sm",children:'กรอกข้อมูลให้ครบแล้วกด "พรีวิว" เพื่อดูตารางผ่อนชำระ'}),l.jsxs("div",{id:"schedule-loading",className:"hidden p-8 text-center text-slate-400 text-sm",children:[l.jsxs("svg",{className:"animate-spin w-6 h-6 mx-auto mb-2 text-primary",fill:"none",viewBox:"0 0 24 24",children:[l.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor","stroke-width":"4"}),l.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8v8z"})]}),"กำลังคำนวณ..."]}),l.jsx("div",{id:"schedule-table-wrap",className:"hidden overflow-x-auto",style:{maxHeight:"480px",overflowY:"auto"},children:l.jsxs("table",{className:"w-full text-left border-collapse min-w-[1100px]",children:[l.jsx("thead",{className:"sticky top-0 z-10",children:l.jsxs("tr",{className:"bg-slate-50 border-b border-slate-100",children:[l.jsx("th",{className:"py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest",children:"วันที่"}),l.jsx("th",{className:"py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center",children:"งวดที่"}),l.jsx("th",{className:"py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right",children:"เงินต้นยกมา"}),l.jsx("th",{className:"py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right",children:"จ่ายค่างวด"}),l.jsx("th",{className:"py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right",children:"ตัดดอกเบี้ย"}),l.jsx("th",{className:"py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right",children:"ตัดเงินต้น"}),l.jsx("th",{className:"py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right",children:"ชำระอื่น"}),l.jsx("th",{className:"py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right",children:"เงินต้นคงเหลือ"}),l.jsx("th",{className:"py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right",children:"ดอกเบี้ยรายวัน"}),l.jsx("th",{className:"py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right",children:"ดอกเบี้ยสะสม"})]})}),l.jsx("tbody",{id:"schedule-tbody",className:"divide-y divide-slate-50 text-[12px]"})]})}),l.jsxs("div",{id:"schedule-info",className:"hidden px-6 py-3 border-t border-slate-50 bg-slate-50/30 flex items-center justify-between gap-4",children:[l.jsx("span",{id:"schedule-info-text",className:"text-[11px] text-slate-500"}),l.jsx("div",{id:"schedule-pagination",className:"flex items-center gap-1"})]})]})]})})]})}),l.jsx("div",{id:"status-logs-body",className:"hidden"})]}),l.jsxs("div",{id:"toast-modal",className:"hidden fixed inset-0 z-[300] flex items-center justify-center p-4",children:[l.jsx("div",{className:"absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]",onClick:d=>i("document.getElementById('toast-modal').classList.add('hidden')",d)}),l.jsxs("div",{className:"relative bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden",children:[l.jsxs("div",{className:"p-6 flex flex-col items-center text-center",children:[l.jsx("div",{id:"toast-icon-wrap",className:"w-14 h-14 rounded-full flex items-center justify-center mb-4",children:l.jsx("span",{id:"toast-icon",className:"material-symbols-outlined text-3xl"})}),l.jsx("h3",{id:"toast-title",className:"text-base font-bold text-slate-800 mb-1"}),l.jsx("p",{id:"toast-message",className:"text-sm text-slate-500 leading-relaxed"})]}),l.jsx("div",{className:"px-6 pb-5",children:l.jsx("button",{onClick:d=>i("document.getElementById('toast-modal').classList.add('hidden')",d),className:"w-full py-2.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all text-sm",children:"ตกลง"})})]})]}),l.jsxs("div",{id:"confirm-modal",className:"hidden fixed inset-0 z-[300] flex items-center justify-center px-6 py-8",children:[l.jsx("div",{className:"absolute inset-0 confirm-review-backdrop"}),l.jsxs("div",{className:"confirm-review-panel relative w-full max-w-5xl max-h-[88vh] rounded-[24px] overflow-hidden flex flex-col",children:[l.jsxs("div",{className:"px-6 py-5 border-b border-slate-200/80 flex items-center justify-between gap-4 bg-white/72",children:[l.jsxs("div",{className:"flex items-center gap-4",children:[l.jsx("div",{className:"confirm-review-icon",children:l.jsx("span",{className:"material-symbols-outlined text-[24px]",style:{fontVariationSettings:'"FILL" 1'},children:"fact_check"})}),l.jsxs("div",{children:[l.jsx("h3",{className:"text-xl font-extrabold text-slate-900 tracking-tight",children:"ตรวจสอบข้อมูลก่อนบันทึก"}),l.jsx("p",{className:"mt-0.5 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400",children:"Review & Confirm Changes"})]})]}),l.jsx("button",{onClick:d=>i("closeConfirmModal()",d),className:"w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all",children:l.jsx("span",{className:"material-symbols-outlined text-[20px]",children:"close"})})]}),l.jsxs("div",{className:"overflow-y-auto flex-1 px-6 py-5 space-y-4",children:[l.jsxs("section",{className:"confirm-review-section",children:[l.jsxs("div",{className:"confirm-review-section-head",children:[l.jsx("div",{className:"confirm-review-section-icon",children:l.jsx("span",{className:"material-symbols-outlined",style:{fontVariationSettings:'"FILL" 1'},children:"account_balance_wallet"})}),l.jsx("h4",{className:"text-lg font-extrabold text-slate-700",children:"รายละเอียดบัญชี"})]}),l.jsxs("div",{className:"confirm-review-grid",children:[l.jsxs("div",{className:"confirm-review-item",children:[l.jsx("p",{className:"confirm-review-label",children:"หมายเลขบัญชี"}),l.jsx("p",{id:"rv-account-no",className:"confirm-review-value",children:"-"})]}),l.jsxs("div",{className:"confirm-review-item",children:[l.jsx("p",{className:"confirm-review-label",children:"ชื่อ-นามสกุล"}),l.jsx("p",{id:"rv-customer-name",className:"confirm-review-value",children:"-"})]})]})]}),l.jsxs("section",{className:"confirm-review-section",children:[l.jsxs("div",{className:"confirm-review-section-head indigo",children:[l.jsx("div",{className:"confirm-review-section-icon",children:l.jsx("span",{className:"material-symbols-outlined",style:{fontVariationSettings:'"FILL" 1'},children:"gavel"})}),l.jsx("h4",{className:"text-lg font-extrabold text-slate-700",children:"รายละเอียดคำพิพากษา"})]}),l.jsxs("div",{className:"confirm-review-grid",children:[l.jsxs("div",{className:"confirm-review-item",children:[l.jsx("p",{className:"confirm-review-label",children:"วันที่ยื่นฟ้อง"}),l.jsx("p",{id:"rv-filing-date",className:"confirm-review-value",children:"-"})]}),l.jsxs("div",{className:"confirm-review-item",children:[l.jsx("p",{className:"confirm-review-label",children:"วันที่พิพากษา"}),l.jsx("p",{id:"rv-judgment-date",className:"confirm-review-value",children:"-"})]}),l.jsxs("div",{className:"confirm-review-item",children:[l.jsx("p",{className:"confirm-review-label",children:"คดีหมายเลขแดงที่"}),l.jsx("p",{id:"rv-red-case-no",className:"confirm-review-value",children:"-"})]}),l.jsxs("div",{className:"confirm-review-item",children:[l.jsx("p",{className:"confirm-review-label",children:"หมายเหตุ"}),l.jsx("p",{id:"rv-judgment-note",className:"confirm-review-value break-words",children:"-"})]})]}),l.jsxs("div",{id:"rv-judgment-type-row",className:"confirm-review-highlight hidden",children:[l.jsx("p",{className:"confirm-review-label text-indigo-500",children:"ประเภทคำพิพากษา"}),l.jsx("p",{id:"rv-judgment-type",className:"confirm-review-value primary",children:"-"})]}),l.jsxs("div",{className:"confirm-review-grid cols-3",children:[l.jsxs("div",{className:"confirm-review-item",children:[l.jsx("p",{className:"confirm-review-label",children:"ยอดหนี้รวม"}),l.jsx("p",{id:"rv-total-debt",className:"confirm-review-value primary",children:"-"})]}),l.jsxs("div",{className:"confirm-review-item",children:[l.jsx("p",{className:"confirm-review-label",children:"เงินต้น"}),l.jsx("p",{id:"rv-principal",className:"confirm-review-value",children:"-"})]}),l.jsxs("div",{className:"confirm-review-item",children:[l.jsx("p",{className:"confirm-review-label",children:"อัตราดอกเบี้ย/ปี"}),l.jsx("p",{id:"rv-interest-rate",className:"confirm-review-value",children:"-"})]}),l.jsxs("div",{className:"confirm-review-item",children:[l.jsx("p",{className:"confirm-review-label",children:"ค่าธรรมเนียมศาล"}),l.jsx("p",{id:"rv-court-fee",className:"confirm-review-value",children:"-"})]}),l.jsxs("div",{className:"confirm-review-item",children:[l.jsx("p",{className:"confirm-review-label",children:"ค่าทนายความ"}),l.jsx("p",{id:"rv-lawyer-fee",className:"confirm-review-value",children:"-"})]}),l.jsxs("div",{className:"confirm-review-item",children:[l.jsx("p",{className:"confirm-review-label",children:"ยอดหนี้ส่วนต่าง"}),l.jsx("p",{id:"rv-diff-debt",className:"confirm-review-value primary",children:"-"})]})]})]}),l.jsxs("section",{className:"confirm-review-section",children:[l.jsxs("div",{className:"confirm-review-section-head green",children:[l.jsx("div",{className:"confirm-review-section-icon green",children:l.jsx("span",{className:"material-symbols-outlined",style:{fontVariationSettings:'"FILL" 1'},children:"payments"})}),l.jsx("h4",{className:"text-lg font-extrabold text-slate-700",children:"รายละเอียดการชำระเงิน"})]}),l.jsxs("div",{className:"confirm-review-grid",children:[l.jsxs("div",{className:"confirm-review-item",children:[l.jsx("p",{className:"confirm-review-label",children:"วันครบกำหนดงวดแรก"}),l.jsx("p",{id:"rv-first-due-date",className:"confirm-review-value",children:"-"})]}),l.jsxs("div",{className:"confirm-review-item",children:[l.jsx("p",{className:"confirm-review-label",children:"วันครบกำหนดงวดสุดท้าย"}),l.jsx("p",{id:"rv-last-due-date",className:"confirm-review-value",children:"-"})]}),l.jsxs("div",{className:"confirm-review-item",children:[l.jsx("p",{className:"confirm-review-label",children:"จำนวนงวดผ่อน"}),l.jsx("p",{id:"rv-installment-count",className:"confirm-review-value",children:"-"})]}),l.jsxs("div",{className:"confirm-review-item",children:[l.jsx("p",{className:"confirm-review-label",children:"ดอกเบี้ยเมื่อผิดนัด"}),l.jsx("p",{id:"rv-default-interest",className:"confirm-review-value danger",children:"-"})]})]}),l.jsxs("div",{className:"confirm-review-grid cols-4",children:[l.jsxs("div",{className:"confirm-review-item",children:[l.jsx("p",{className:"confirm-review-label",children:"ค่างวดที่ 1"}),l.jsx("p",{id:"rv-inst-1",className:"confirm-review-value",children:"-"})]}),l.jsxs("div",{className:"confirm-review-item",children:[l.jsx("p",{className:"confirm-review-label",children:"ค่างวดที่ 2"}),l.jsx("p",{id:"rv-inst-2",className:"confirm-review-value text-slate-400",children:"-"})]}),l.jsxs("div",{className:"confirm-review-item",children:[l.jsx("p",{className:"confirm-review-label",children:"ค่างวดที่ 3"}),l.jsx("p",{id:"rv-inst-3",className:"confirm-review-value text-slate-400",children:"-"})]}),l.jsxs("div",{className:"confirm-review-item",children:[l.jsx("p",{className:"confirm-review-label",children:"ค่างวดที่ 4"}),l.jsx("p",{id:"rv-inst-4",className:"confirm-review-value text-slate-400",children:"-"})]})]})]})]}),l.jsxs("div",{className:"confirm-review-footer px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3",children:[l.jsx("p",{className:"text-xs font-semibold text-slate-400",children:"กรุณาตรวจสอบข้อมูลให้ถูกต้องก่อนกดยืนยัน"}),l.jsxs("div",{className:"flex items-center justify-end gap-2",children:[l.jsx("button",{onClick:d=>i("closeConfirmModal()",d),className:"confirm-review-secondary-btn min-w-[96px] h-10 px-5 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold transition-all text-sm",children:"แก้ไข"}),l.jsxs("button",{id:"confirm-submit-btn",onClick:d=>i("doSubmit()",d),className:"confirm-review-primary-btn min-w-[160px] h-10 px-5 rounded-xl text-white font-bold transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed",children:[l.jsx("span",{className:"material-symbols-outlined text-base",style:{fontVariationSettings:'"FILL" 1'},children:"save"}),"ยืนยันบันทึก"]})]})]})]})]}),l.jsxs("div",{id:"alert-modal",className:"hidden fixed inset-0 z-[200] flex items-center justify-center p-4",children:[l.jsx("div",{className:"absolute inset-0 bg-slate-900/50 backdrop-blur-[3px]",onClick:d=>i("closeAlert()",d)}),l.jsxs("div",{className:"relative bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden",children:[l.jsxs("div",{className:"p-7 flex flex-col items-center text-center",children:[l.jsx("div",{id:"alert-icon-wrap",className:"w-16 h-16 rounded-full flex items-center justify-center mb-4",children:l.jsx("span",{id:"alert-icon",className:"material-symbols-outlined text-3xl"})}),l.jsx("h3",{id:"alert-title",className:"text-lg font-bold text-slate-800 mb-2"}),l.jsx("p",{id:"alert-message",className:"text-sm text-slate-500 leading-relaxed mb-6"}),l.jsx("button",{onClick:d=>i("closeAlert()",d),className:"w-full py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all text-sm",children:"รับทราบ"})]}),l.jsx("button",{onClick:d=>i("closeAlert()",d),className:"absolute top-3 right-3 text-slate-400 hover:text-slate-600 p-1",children:l.jsx("span",{className:"material-symbols-outlined text-lg",children:"close"})})]})]}),l.jsx("footer",{className:"detail-footer",children:l.jsxs("div",{className:"max-w-[1600px] mx-auto flex justify-between items-center",children:[l.jsx("div",{}),l.jsxs("div",{className:"flex flex-wrap justify-end gap-4",children:[l.jsx("button",{onClick:d=>i("handleCancel()",d),className:"btn-secondary-modern",children:"Cancel"}),l.jsxs("button",{id:"preview-btn",onClick:d=>i("document.getElementById('preview-btn').dataset.manual='true'; loadPreview()",d),className:"btn-primary-modern",children:[l.jsx("span",{className:"material-symbols-outlined text-base",children:"visibility"}),"พรีวิว"]}),l.jsxs("button",{id:"submit-btn",onClick:d=>i("handleSubmit()",d),disabled:!0,className:"btn-primary-modern px-6 disabled:opacity-40 disabled:cursor-not-allowed",children:[l.jsxs("span",{id:"btn-default",className:"flex items-center gap-2",children:[l.jsx("span",{className:"material-symbols-outlined text-base",children:"save"}),"บันทึกการแก้ไข"]}),l.jsxs("span",{id:"btn-loading",className:"hidden flex items-center gap-2",children:[l.jsxs("svg",{className:"animate-spin w-4 h-4",fill:"none",viewBox:"0 0 24 24",children:[l.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor","stroke-width":"4"}),l.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8v8z"})]}),"กำลังบันทึก..."]})]})]})]})}),l.jsxs("div",{id:"retro-enforcement-confirm-modal",className:"hidden fixed inset-0 z-[320] flex items-center justify-center p-4",children:[l.jsx("div",{className:"absolute inset-0 bg-slate-900/45 backdrop-blur-[2px]",onClick:d=>i("closeRetroEnforcementConfirm()",d)}),l.jsxs("div",{className:"relative w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-amber-100 overflow-hidden",children:[l.jsx("div",{className:"px-6 py-5 border-b border-amber-100 bg-amber-50",children:l.jsxs("div",{className:"flex items-start gap-3",children:[l.jsx("div",{className:"w-11 h-11 rounded-2xl bg-white text-amber-600 border border-amber-100 flex items-center justify-center flex-shrink-0",children:l.jsx("span",{className:"material-symbols-outlined",style:{fontVariationSettings:'"FILL" 1'},children:"warning"})}),l.jsxs("div",{children:[l.jsx("h3",{className:"text-lg font-extrabold text-slate-800",children:"ยืนยันว่าแก้รายงานย้อนหลังแล้ว?"}),l.jsx("p",{className:"text-xs text-slate-500 mt-1",children:"หลังจากยืนยันแล้ว จะไม่สามารถยกเลิกสถานะนี้ได้"})]})]})}),l.jsxs("div",{className:"px-6 py-5 space-y-3 text-sm",children:[l.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:[l.jsxs("div",{className:"rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3",children:[l.jsx("p",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-wider",children:"เลขที่บัญชี"}),l.jsx("p",{id:"retro-modal-account",className:"text-sm font-bold text-slate-800 mt-1",children:"-"})]}),l.jsxs("div",{className:"rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3",children:[l.jsx("p",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-wider",children:"เดือนที่ต้องตรวจสอบ"}),l.jsx("p",{id:"retro-modal-month",className:"text-sm font-bold text-amber-700 mt-1",children:"-"})]})]}),l.jsx("p",{id:"retro-modal-message",className:"text-slate-600 leading-6",children:"-"}),l.jsx("div",{className:"rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-xs font-semibold text-red-600",children:"โปรดกดปุ่มยืนยันเฉพาะเมื่อได้ตรวจสอบหรือแก้รายงานเดือนเก่าเรียบร้อยแล้วเท่านั้น"})]}),l.jsxs("div",{className:"px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3",children:[l.jsx("button",{type:"button",onClick:d=>i("closeRetroEnforcementConfirm()",d),className:"px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition-all",children:"ยกเลิก"}),l.jsx("button",{type:"button",id:"retro-modal-confirm-btn",onClick:d=>i("confirmRetroEnforcementFix()",d),className:"px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition-all",children:"ยืนยันว่าแก้รายงานแล้ว"})]})]})]})]})}function zm(i,d){Function("event",i).call(d.currentTarget,d)}const $m=`const role        = sessionStorage.getItem('role') || '';
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
        btn.disabled = isLoading;
        document.getElementById('btn-default').classList.toggle('hidden', isLoading);
        document.getElementById('btn-loading').classList.toggle('hidden', !isLoading);
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
            showFieldWarn('red-case-no', 'รูปแบบ: ตัวย่อประเภทคดีติดเลขที่/ปี พ.ศ. เช่น ผบ1234/2567, ผบE814/2569 หรือ พE325/2568');
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
            showError('คดีหมายเลขแดงที่ต้องอยู่ในรูปแบบ: ตัวย่อประเภทคดีติดเลขที่/ปี พ.ศ. เช่น ผบ1234/2567, ผบE814/2569 หรือ พE325/2568');
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
            const jt = document.getElementById('judgment-type')?.value || ''
            if (!jt) {
                showError('กรุณาเลือกประเภทคำพิพากษา (พิพากษาตามยอม / พิพากษาฝ่ายเดียว) ก่อนบันทึก')
                document.getElementById('judgment-type')?.classList.add('error')
                return false
            }
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
            return;
        }

        if (!validate()) return;

        document.getElementById('rv-account-no').textContent       = document.getElementById('account-no').value;
        document.getElementById('rv-customer-name').textContent    = document.getElementById('customer-name').value;
        document.getElementById('rv-filing-date').textContent      = fmtDateReview('filing-date');
        document.getElementById('rv-judgment-date').textContent    = fmtDateReview('judgment-date');
        document.getElementById('rv-red-case-no').textContent      = normalizeCaseNo(document.getElementById('red-case-no').value);
        document.getElementById('rv-judgment-note').textContent    = document.getElementById('judgment-note').value.trim() || '-';
        // แสดง judgment-type ถ้า case_status = ยื่นฟ้อง
        const _jt = document.getElementById('judgment-type')?.value || ''
        const _jtRow = document.getElementById('rv-judgment-type-row')
        if (_jtRow) {
            if (currentCus && currentCus.case_status === 'ยื่นฟ้อง' && _jt) {
                _jtRow.classList.remove('hidden')
                document.getElementById('rv-judgment-type').textContent = _jt
            } else {
                _jtRow.classList.add('hidden')
            }
        }
        document.getElementById('rv-total-debt').textContent       = fmtReview(document.getElementById('total-debt').value);
        document.getElementById('rv-principal').textContent        = fmtReview(document.getElementById('principal').value);
        document.getElementById('rv-interest-rate').textContent    = formatRateDisplayValue(document.getElementById('interest-rate').value || '0');
        document.getElementById('rv-court-fee').textContent        = fmtReview(document.getElementById('court-fee').value);
        document.getElementById('rv-lawyer-fee').textContent       = fmtReview(document.getElementById('lawyer-fee').value);
        document.getElementById('rv-diff-debt').textContent        = fmtReview(document.getElementById('diff-debt').value);
        document.getElementById('rv-first-due-date').textContent   = fmtDateReview('first-due-date');
        document.getElementById('rv-last-due-date').textContent    = fmtDateReview('last-due-date');
        document.getElementById('rv-installment-count').textContent = (document.getElementById('installment-count').value || '-') + ' งวด';
        document.getElementById('rv-default-interest').textContent = formatRateDisplayValue(document.getElementById('default-interest-rate').value || '0');
        document.getElementById('rv-inst-1').textContent           = fmtReview(document.getElementById('installment-1').value);
        document.getElementById('rv-inst-2').textContent           = fmtReview(document.getElementById('installment-2').value);
        document.getElementById('rv-inst-3').textContent           = fmtReview(document.getElementById('installment-3').value);
        document.getElementById('rv-inst-4').textContent           = fmtReview(document.getElementById('installment-4').value);

        document.getElementById('confirm-modal').classList.remove('hidden');
    }

    function closeConfirmModal() {
        document.getElementById('confirm-modal').classList.add('hidden');
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

        document.getElementById('confirm-submit-btn').disabled = true;
        document.getElementById('confirm-submit-btn').innerHTML = '<svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg> กำลังบันทึก...';

        setLoading(true);

        closeConfirmModal();
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
                data = await res.json()
                if (res.ok) {
                    showSuccessToast('บันทึกสำเร็จ', \`บันทึกคำพิพากษาเรียบร้อย → \${judgmentType}\`)
                    await loadCustomerData()
                    loadEditHistory()
                } else {
                    showError(data.error || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
                }
            } else {
                res  = await fetch(\`/api/customers/\${accountNo}\`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Authorization': \`Bearer \${getCookie('token')}\` },
                    body: JSON.stringify(payload)
                })
                data = await res.json()
                if (res.ok) {
                    showSuccessToast('บันทึกสำเร็จ', \`อัพเดทข้อมูลเรียบร้อยแล้ว\${data.changed_fields ? \` (\${data.changed_fields} รายการ)\` : ''}\`)
                    await loadCustomerData()
                    loadEditHistory()
                } else {
                    showError(data.error || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
                }
            }
        } catch (err) {
            showError('ไม่สามารถเชื่อมต่อ Server ได้ กรุณาลองใหม่อีกครั้ง');
        } finally {
            setLoading(false);
            const btn = document.getElementById('confirm-submit-btn');
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<span class="material-symbols-outlined text-base">save</span> ยืนยันบันทึก';
            }
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
                showFieldWarn('red-case-no', 'รูปแบบ: ตัวย่อประเภทคดีติดเลขที่/ปี พ.ศ. เช่น ผบ1234/2567, ผบE814/2569 หรือ พE325/2568');
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

                previewDone = true;

                // เปิดปุ่มบันทึกได้เฉพาะเมื่อพรีวิวสำเร็จ + มีการแก้ไขจริง + ข้อมูลครบ
                setSubmitEnabled(hasChanged() && isPreviewFormReady(false));

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
        document.getElementById('jt-trigger').classList.add('border-indigo-500', 'ring-4', 'ring-indigo-500/10');

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
        display.textContent = '-- เลือกประเภทเพื่อเปลี่ยนสถานะ --';
        display.className   = 'text-slate-400';
        document.getElementById('jt-trigger').classList.remove('border-indigo-500', 'ring-4', 'ring-indigo-500/10');
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
`,Om="bg-surface text-on-surface min-h-screen font-body selection:bg-indigo-100 selection:text-primary";function Am(){const i=window;if(i.LQDThaiDate)return;const d=["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"],m=["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];i.LQDThaiDate={monthsFull:d,monthsShort:m,shortMonth:N=>m[Number(N)]||"",fullMonth:N=>d[Number(N)]||""}}function Vm(){Am();const i=globalThis.eval;i($m)}function Um(){E.useEffect(()=>{document.body.className=Om,Vm()},[])}function Hm(){return Um(),l.jsx(Pm,{activePage:"customer-list",children:l.jsx("div",{className:"customer-detail-page min-h-screen bg-surface text-on-surface font-body",children:l.jsx(Mm,{runLegacyAction:zm})})})}var Wm=ic();const oc=["ยื่นฟ้อง","พิพากษาตามยอม","พิพากษาฝ่ายเดียว","บังคับคดี","ปิดบัญชี"],Qm=["ค้างชำระ","ชำระปกติ","ยังไม่ถึงกำหนด","ไม่มีแผนชำระ","ชำระครบแล้ว"],Ym={ยื่นฟ้อง:"gavel",พิพากษาตามยอม:"handshake",พิพากษาฝ่ายเดียว:"balance",บังคับคดี:"assignment",ปิดบัญชี:"lock"},Jm={ค้างชำระ:"warning",ชำระปกติ:"paid",ยังไม่ถึงกำหนด:"event_available",ไม่มีแผนชำระ:"event_busy",ชำระครบแล้ว:"verified"},ri=[{value:"due",shortLabel:"งวดแรก",label:"วันครบกำหนดงวดแรก",description:"ใช้วันที่งวดแรกของแผนชำระ",icon:"event_available"},{value:"nextDue",shortLabel:"ถัดไป",label:"วันครบกำหนดถัดไป",description:"ใช้วันที่ต้องติดตามงวดถัดไป",icon:"event_repeat"},{value:"filingDate",shortLabel:"ยื่นฟ้อง",label:"วันที่ยื่นฟ้อง",description:"ใช้วันที่ส่งฟ้องศาล",icon:"gavel"},{value:"judgmentDate",shortLabel:"พิพากษา",label:"วันที่พิพากษา",description:"ใช้วันที่มีคำพิพากษา",icon:"balance"},{value:"enforcementJudgmentDate",shortLabel:"หมายบังคับ",label:"วันที่ของหมายบังคับคดี",description:"ใช้วันที่หมายบังคับคดีมีผล",icon:"contract"},{value:"lastPaymentDate",shortLabel:"ชำระล่าสุด",label:"วันที่ชำระล่าสุด",description:"ใช้วันที่รับชำระล่าสุด",icon:"payments"}],Km=["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"],Gm=["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."],Zm=["อา","จ","อ","พ","พฤ","ศ","ส"];function pr(){return{caseStatuses:[],paymentStatuses:[],dateField:"due",dateFrom:"",dateTo:"",outstandingMin:"",outstandingMax:""}}function ai(){return{account_no:"",black_case_no:"",filing_date:"",default_date:"",filing_capital:"",name:"",pre_filing_dpd_days:"",filing_note:""}}function Gl(i){var d;return((d=document.cookie.split("; ").find(m=>m.startsWith(`${i}=`)))==null?void 0:d.split("=")[1])||""}async function hr(i){const d=await i.json().catch(()=>({}));if(!i.ok)throw new Error(d.error||d.message||"เกิดข้อผิดพลาด");return d}function qm(i){return i.account_no||i.account||""}function cn(i){return i.case_status||""}function dc(i){if(cn(i)==="ปิดบัญชี")return"ชำระครบแล้ว";if(cn(i)==="ยื่นฟ้อง")return"ไม่มีแผนชำระ";const d=i.display_payment_status||i.computed_payment_status||i.payment_status||i.status||"-";return d==="จ่ายปกติ"?"ชำระปกติ":d}function ci(i){const d=String(i||"");return d.length===12?`${d.slice(0,4)}-${d.slice(4,8)}-${d.slice(8,12)}`:d||"-"}function Nt(i){if(!i)return"-";const[d,m,N]=String(i).slice(0,10).split("-");return d&&m&&N?`${N}/${m}/${d}`:"-"}function ii(){const i=new Date;return new Date(i.getFullYear(),i.getMonth(),i.getDate())}function qd(i){return`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}-${String(i.getDate()).padStart(2,"0")}`}function Xd(i){if(!i)return null;const[d,m,N]=String(i).slice(0,10).split("-").map(Number);return d&&m&&N?new Date(d,m-1,N):null}function Xm(i){return i?Nt(String(i).slice(0,10)):"-"}function wt(i,d=!1){const m=Number(i||0);return m?d&&Math.abs(m)>=1e6?`฿${(m/1e6).toFixed(2)}M`:`฿${m.toLocaleString("th-TH",{minimumFractionDigits:2,maximumFractionDigits:2})}`:"฿0.00"}function ec(i){const d=Number(i||0);return d?`${d.toLocaleString("th-TH",{maximumFractionDigits:4})}%`:"-"}function ef(i=""){const d=["โ","ไ","ใ","เ","แ"],m=String(i).trim().split(/\s+/).filter(Boolean),N=v=>v?d.includes(v.charAt(0))&&v.length>1?v.charAt(1):v.charAt(0):"";return m.length>=2?`${N(m[0])}${N(m[m.length-1])}`:N(m[0])||"-"}function tf(i){return cn(i)==="ยื่นฟ้อง"||!i.judgment_date?"ยอดตามยื่นฟ้อง":"ยอดตามคำพิพากษา"}function nf(i){return cn(i)==="ยื่นฟ้อง"||!i.judgment_date?Number(i.filing_capital||0):Number(i.total_debt||0)}function cc(i){if(cn(i)==="ปิดบัญชี")return 0;if(cn(i)==="ยื่นฟ้อง"||!i.judgment_date)return Number(i.filing_capital||0);const d=i.latest_snapshot||{};return Number(d.remaining_debt_raw??i.remaining_debt??d.outstanding_raw??d.outstanding??i.total_debt??0)}function lf(i){return Number(i.installment_1||i.installment_2||i.installment_3||i.installment_4||0)}function sf(i){return i.last_payment_date||i.latest_payment_date||""}function tc(i){return i.last_payment_amount??i.latest_payment_amount??0}function nc(i){var d;return Number(((d=i.latest_snapshot)==null?void 0:d.dpd_days)||0)}function rf(i){const d=i.account_no.trim(),m=i.name.trim(),N=i.filing_capital.replace(/,/g,"").trim(),v=i.pre_filing_dpd_days.trim(),C=new Date().toISOString().slice(0,10);return/^\d{12}$/.test(d)?i.black_case_no.trim()?i.filing_date?i.default_date?i.filing_date>C?"วันที่ยื่นฟ้องต้องไม่เป็นวันที่ในอนาคต":i.default_date>C?"วันที่ผิดนัดชำระก่อนฟ้องต้องไม่เป็นวันที่ในอนาคต":i.default_date>i.filing_date?"วันที่ผิดนัดชำระก่อนฟ้องต้องไม่มากกว่าวันที่ยื่นฟ้อง":!/^\d+(\.\d{1,2})?$/.test(N)||Number(N)<=0?"ทุนทรัพย์ที่ฟ้องต้องเป็นตัวเลขมากกว่า 0 และมีทศนิยมได้สูงสุด 2 ตำแหน่ง":m?/^[\u0E00-\u0E7Fa-zA-Z0-9\s.\-()]+$/.test(m)?!/^\d+$/.test(v)||Number(v)<=0?"DPD ณ วันที่ก่อนส่งฟ้องศาล 1 วันต้องเป็นจำนวนเต็มมากกว่า 0":i.filing_note.length>100?"หมายเหตุ / เงื่อนไขพิเศษเพิ่มเติมต้องไม่เกิน 100 ตัวอักษร":"":"ชื่อ-นามสกุล/ชื่อบริษัทมีอักขระที่ไม่อนุญาต":"กรุณากรอกชื่อ-นามสกุล":"กรุณาเลือกวันที่ผิดนัดชำระก่อนฟ้อง":"กรุณาเลือกวันที่ยื่นฟ้อง":"กรุณากรอกคดีหมายเลขดำที่":"เลขที่บัญชีต้องเป็นตัวเลข 12 หลัก"}function xr({text:i,tone:d}){const m={red:"bg-red-50 text-red-800 border-red-200",amber:"bg-amber-50 text-amber-800 border-amber-200",emerald:"bg-emerald-50 text-emerald-800 border-emerald-200",blue:"bg-blue-50 text-blue-800 border-blue-200",slate:"bg-slate-100 text-slate-700 border-slate-200",indigo:"bg-indigo-50 text-indigo-800 border-indigo-200"};return l.jsx("span",{className:`status-badge ${m[d]}`,children:i||"-"})}function af(i){return i==="ยื่นฟ้อง"?"blue":i==="พิพากษาตามยอม"?"emerald":i==="พิพากษาฝ่ายเดียว"?"amber":i==="บังคับคดี"?"red":"slate"}function of(i){return i==="ค้างชำระ"?"red":i==="ชำระปกติ"||i==="จ่ายปกติ"?"emerald":i==="ยังไม่ถึงกำหนด"||i==="ยังไม่เริ่มชำระ"?"blue":i==="ชำระครบแล้ว"?"indigo":"slate"}function lc(i){return{caseStatuses:(i.get("case_statuses")||"").split(",").filter(Boolean),paymentStatuses:(i.get("payment_statuses")||"").split(",").filter(Boolean),dateField:i.get("date_field")||"due",dateFrom:i.get("date_from")||"",dateTo:i.get("date_to")||"",outstandingMin:i.get("outstanding_min")||"",outstandingMax:i.get("outstanding_max")||""}}function df(i){const d=Number(i||25);return[10,25,50].includes(d)?d:25}function cf(){const i=E.useMemo(()=>new URLSearchParams(window.location.search),[]),d=E.useRef(Math.max(1,Number(i.get("page")||1))),m=E.useRef(!0),[N]=E.useState(sessionStorage.getItem("role")||""),[v]=E.useState(sessionStorage.getItem("display_name")||""),[C,I]=E.useState([]),[$,z]=E.useState({}),[M,B]=E.useState(i.get("q")||""),[O,Z]=E.useState(i.get("case_status")||""),[H,K]=E.useState(()=>lc(i)),[Q,J]=E.useState(()=>lc(i)),[ge,De]=E.useState(d.current),[ue,le]=E.useState(()=>df(i.get("per_page"))),[fe,oe]=E.useState(!1),[ye,W]=E.useState(0),[ne,pe]=E.useState(i.get("sort_by")||""),[_e,we]=E.useState(i.get("sort_dir")==="asc"?"asc":"desc"),[Se,Ce]=E.useState(""),[$e,Oe]=E.useState(!0),[Ne,_]=E.useState(""),[U,D]=E.useState(!1),[p,y]=E.useState(""),[q,G]=E.useState(!1),[se,X]=E.useState(!1),[ee,ae]=E.useState(ai),[he,Ae]=E.useState(""),[_n,sl]=E.useState(!1),[Cn,In]=E.useState(!1),[Dn,rl]=E.useState(!1),[al,il]=E.useState(!1),[ol,Mt]=E.useState(!1),[Ct,dl]=E.useState(()=>new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().slice(0,10)),[cl,ql]=E.useState(()=>new Date().toISOString().slice(0,10)),zt=E.useRef(0),un=E.useRef(null),Ln=H.caseStatuses.length+H.paymentStatuses.length+(H.dateFrom||H.dateTo?1:0)+(H.outstandingMin||H.outstandingMax?1:0),Bn=Math.max(1,Math.ceil(ye/ue)),Xl=ye===0?0:(ge-1)*ue+1,mn=Math.min(ge*ue,ye),nt=E.useCallback(async(k=1)=>{if(!N){window.location.href="/login";return}const re=zt.current+1;zt.current=re,De(k),Oe(!0),_("");try{const ce=new URLSearchParams({page:String(k),per_page:String(ue)}),it=M.trim();if(it){const Ut=it.replace(/[-\s]/g,"");/^\d+$/.test(Ut)?ce.append("account_no",Ut):ce.append("name",it)}O&&ce.append("case_status",O),H.caseStatuses.length&&ce.append("case_statuses",H.caseStatuses.join(",")),H.paymentStatuses.length&&ce.append("payment_statuses",H.paymentStatuses.join(",")),(H.dateFrom||H.dateTo)&&(ce.append("date_field",H.dateField||"due"),H.dateFrom&&ce.append("date_from",H.dateFrom),H.dateTo&&ce.append("date_to",H.dateTo)),H.outstandingMin&&ce.append("outstanding_min",H.outstandingMin),H.outstandingMax&&ce.append("outstanding_max",H.outstandingMax),ne&&(ce.append("sort_by",ne),ce.append("sort_dir",_e)),ns(ce);const At=await fetch(`/api/customers?${ce}`,{headers:{Authorization:`Bearer ${Gl("token")}`}});if(At.status===401){window.location.href="/login";return}const Vt=await hr(At);if(re!==zt.current)return;I(Vt.data||[]),z(Vt.summary||{}),W(Number(Vt.total||0)),De(Number(Vt.page||k))}catch(ce){if(re!==zt.current)return;_(ce instanceof Error?ce.message:"ไม่สามารถโหลดข้อมูลได้")}finally{re===zt.current&&Oe(!1)}},[O,H,ue,N,M,_e,ne]);E.useEffect(()=>{const k=m.current?d.current:1;m.current=!1,nt(k)},[O,H,ue,ne,_e]),E.useEffect(()=>{if(!fe)return;const k=()=>oe(!1),re=ce=>{ce.key==="Escape"&&oe(!1)};return window.addEventListener("click",k),window.addEventListener("keydown",re),()=>{window.removeEventListener("click",k),window.removeEventListener("keydown",re)}},[fe]),E.useEffect(()=>{const k=sessionStorage.getItem("password_warning_days");k&&!sessionStorage.getItem("password_warning_seen")&&(sessionStorage.setItem("password_warning_seen","1"),window.setTimeout(()=>alert(`รหัสผ่านของคุณจะหมดอายุในอีก ${k} วัน กรุณาเปลี่ยนรหัสผ่านก่อนถึงกำหนด`),300))},[]);const es=E.useMemo(()=>{const k=$.case_counts||{};return[{key:"all",label:"ยอดรวมทั้งหมด",sub:"Total Base",count:k.ทั้งหมด??$.active_count??ye,status:"",icon:"groups",color:"indigo"},{key:"filing",label:"ขั้นตอนยื่นฟ้อง",sub:"Filing",count:k.ยื่นฟ้อง||0,status:"ยื่นฟ้อง",icon:"gavel",color:"violet"},{key:"consent",label:"พิจารณาตามยอม",sub:"Consent",count:k.พิพากษาตามยอม||0,status:"พิพากษาตามยอม",icon:"handshake",color:"emerald"},{key:"default",label:"พิจารณาฝ่ายเดียว",sub:"Default",count:k.พิพากษาฝ่ายเดียว||0,status:"พิพากษาฝ่ายเดียว",icon:"balance",color:"amber"},{key:"enforcement",label:"เข้าสู่บังคับคดี",sub:"Enforcement",count:k.บังคับคดี||0,status:"บังคับคดี",icon:"assignment",color:"red"},{key:"closed",label:"ปิดบัญชี",sub:"Closed",count:k.ปิดบัญชี||0,status:"ปิดบัญชี",icon:"lock",color:"slate"}]},[$,ye]);async function ts(){await fetch("/api/auth/logout",{method:"POST",headers:{Authorization:`Bearer ${Gl("token")}`}}).catch(()=>{}),sessionStorage.clear(),window.location.href="/login"}function ns(k){const re=new URLSearchParams(k),ce=M.trim();re.delete("account_no"),re.delete("name"),ce?re.set("q",ce):re.delete("q"),Number(re.get("page")||1)===1&&re.delete("page"),Number(re.get("per_page")||25)===25&&re.delete("per_page");const it=re.toString();window.history.replaceState(null,"",it?`/customer-list?${it}`:"/customer-list")}function yr(){return`${window.location.pathname}${window.location.search}`||"/customer-list"}function ul(k){ne===k?we(_e==="asc"?"desc":"asc"):(pe(k),we("desc"))}function Tn(k){O!==k&&Z(k)}function ml(){B(""),Z(""),K(pr()),J(pr()),pe(""),we("desc")}async function fl(k){var ce;const re=k.replace(/\D/g,"");re&&(await((ce=navigator.clipboard)==null?void 0:ce.writeText(re).catch(()=>{})),In(!0),window.setTimeout(()=>In(!1),1600))}async function pl(){if(!Dn){rl(!0),un.current=window.setTimeout(()=>il(!0),220);try{await hr(await fetch("/api/customers/cache/refresh-all",{method:"POST",headers:{Authorization:`Bearer ${Gl("token")}`}})),await nt(ge)}catch(k){alert(k instanceof Error?k.message:"รีเฟรชไม่สำเร็จ")}finally{un.current&&(window.clearTimeout(un.current),un.current=null),il(!1),rl(!1)}}}function $t(){window.location.href=`/api/customers/checker-export?date_from=${encodeURIComponent(Ct)}&date_to=${encodeURIComponent(cl)}`}function Ot(){ae(ai()),Ae(""),X(!1),G(!0)}function ls(k){k.preventDefault();const re=rf(ee);Ae(re),re||(G(!1),X(!0))}async function ss(){sl(!0);try{await hr(await fetch("/api/customers",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${Gl("token")}`},body:JSON.stringify({account_no:ee.account_no.trim(),black_case_no:ee.black_case_no.trim(),name:ee.name.trim(),filing_date:ee.filing_date,filing_capital:ee.filing_capital.replace(/,/g,"").trim(),default_date:ee.default_date,pre_filing_dpd_days:Number(ee.pre_filing_dpd_days),filing_note:ee.filing_note.trim()})})),X(!1),ae(ai()),await nt(ge)}catch(k){X(!1),G(!0),Ae(k instanceof Error?k.message:"บันทึกข้อมูลไม่สำเร็จ")}finally{sl(!1)}}async function rs(){if(p)try{await hr(await fetch(`/api/customers/${p}`,{method:"DELETE",headers:{Authorization:`Bearer ${Gl("token")}`}})),y(""),await nt(ge)}catch(k){alert(k instanceof Error?k.message:"ลบข้อมูลไม่สำเร็จ")}}return l.jsxs("div",{className:"customer-list-page min-h-screen selection:bg-indigo-100 selection:text-primary bg-surface text-on-surface font-body",children:[l.jsx(uf,{role:N,displayName:v}),l.jsx(mf,{role:N,activePage:"customer-list",onLogout:ts}),l.jsxs("main",{className:"customer-list-main md:ml-56 pt-20 min-h-screen pb-12",children:[l.jsx("div",{className:"px-6 md:px-8",children:l.jsx("div",{className:"max-w-[1600px] mx-auto",children:l.jsxs("header",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-indigo-100/50",children:[l.jsxs("div",{className:"flex items-center gap-4 min-w-0",children:[l.jsx("div",{className:"w-14 h-14 rounded-2xl bg-white shadow-lg shadow-slate-200/50 flex items-center justify-center text-primary border border-white flex-shrink-0",children:l.jsx("span",{className:"material-symbols-outlined text-3xl",style:{fontVariationSettings:'"FILL" 1'},children:"groups"})}),l.jsxs("div",{className:"min-w-0",children:[l.jsx("h1",{className:"font-headline text-3xl font-extrabold text-primary tracking-tight",children:"Customer Lists"}),l.jsx("p",{className:"text-slate-500 text-sm mt-1",children:"จัดการ ค้นหา และติดตามลูกหนี้ด้วยสถานะคำพิพากษาทั้งหมดในระบบ"})]})]}),l.jsxs("div",{className:"flex flex-wrap items-center gap-3 self-start sm:self-center",children:[l.jsxs("div",{className:"rounded-[28px] border border-slate-200 bg-white px-6 py-3 shadow-md shadow-slate-200/50",children:[l.jsx("p",{className:"text-[11px] text-slate-400 uppercase tracking-widest font-extrabold leading-none mb-1.5",children:"มูลค่ารวม"}),l.jsx("span",{className:"text-lg font-headline text-primary font-extrabold leading-none",children:wt($.total_value||0)})]}),l.jsxs("div",{className:"rounded-[28px] border border-primary bg-primary px-6 py-3 shadow-md shadow-indigo-200/60",children:[l.jsx("p",{className:"text-[11px] text-blue-100 uppercase tracking-widest font-extrabold leading-none mb-1.5",children:"Active Cases"}),l.jsx("span",{className:"text-lg font-headline text-white font-extrabold leading-none",children:Number($.active_count||0).toLocaleString("th-TH")})]})]})]})})}),l.jsxs("div",{className:"px-6 md:px-8 mt-6",children:[l.jsx("div",{className:"max-w-[1600px] mx-auto mb-5",children:l.jsx("div",{className:"kpi-panel",children:l.jsx("div",{className:"kpi-grid",children:es.map(k=>{var it;const re=Number(((it=es[0])==null?void 0:it.count)||0),ce=k.key==="all"?100:re>0?Math.round(Number(k.count||0)/re*100):0;return l.jsxs("div",{className:"kpi-item",children:[l.jsxs("div",{className:"flex items-center justify-between mb-2",children:[l.jsx("div",{className:`kpi-icon text-${k.color}-500 border-${k.color}-100 shadow-${k.color}-100/70`,children:l.jsx("span",{className:"material-symbols-outlined text-[22px]",style:k.key==="all"?{fontVariationSettings:'"FILL" 1'}:void 0,children:k.icon})}),l.jsx("div",{className:"flex flex-col items-end",children:l.jsxs("span",{className:`kpi-percent text-${k.color}-500`,children:[ce,"%"]})})]}),l.jsx("p",{className:"kpi-label",children:k.label}),l.jsxs("div",{className:"flex items-baseline gap-3",children:[l.jsx("h3",{className:"kpi-value",children:Number(k.count||0).toLocaleString("th-TH")}),l.jsx("span",{className:"kpi-unit",children:"Cases"})]}),l.jsxs("div",{className:`mt-2 flex items-center gap-2 text-${k.color}-500`,children:[l.jsx("span",{className:"kpi-sub",children:k.sub}),l.jsx("div",{className:"kpi-footer-line"})]})]},k.key)})})})}),l.jsxs("div",{className:"max-w-[1600px] mx-auto page-card",children:[l.jsx("div",{className:"px-5 md:px-6 py-4 border-b border-blue-100 bg-gradient-to-r from-blue-50 via-white to-indigo-50",children:l.jsxs("div",{className:"flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4",children:[l.jsxs("div",{className:"flex items-center gap-3",children:[l.jsx("div",{className:"w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 flex items-center justify-center shadow-sm",children:l.jsx("span",{className:"material-symbols-outlined text-[20px]",style:{fontVariationSettings:'"FILL" 1'},children:"table_view"})}),l.jsxs("div",{children:[l.jsx("h2",{className:"text-[18px] font-extrabold text-slate-800 tracking-tight",children:"รายการลูกหนี้"}),l.jsx("p",{className:"text-[12px] text-slate-500 mt-0.5",children:"ค้นหา กรอง และเข้าสู่หน้ารายละเอียดลูกหนี้จากตารางนี้"})]})]}),l.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[N==="admin"&&l.jsxs("button",{onClick:()=>Mt(!0),className:"btn-secondary-modern",title:"ดาวน์โหลดข้อมูลดิบสำหรับตรวจสอบ",children:[l.jsx("span",{className:"material-symbols-outlined text-base",children:"download"}),"Raw Data Export"]}),l.jsxs("button",{onClick:()=>{J({...H,caseStatuses:[...H.caseStatuses],paymentStatuses:[...H.paymentStatuses]}),D(!0)},className:"btn-secondary-modern",children:[l.jsx("span",{className:"material-symbols-outlined text-base",children:"tune"}),"ตัวกรองขั้นสูง",Ln>0&&l.jsx("span",{className:"min-w-5 h-5 inline-flex items-center justify-center rounded-full bg-primary text-white text-[10px] px-1.5",children:Ln})]}),l.jsxs("button",{onClick:Ot,className:"btn-primary-modern",children:[l.jsx("span",{className:"material-symbols-outlined text-base",children:"person_add"}),"เพิ่มข้อมูลลูกหนี้"]})]})]})}),l.jsxs("div",{className:"px-5 md:px-6 py-4 border-b border-blue-100 bg-white",children:[l.jsxs("div",{className:"flex flex-col xl:flex-row gap-4",children:[l.jsx("div",{className:"flex-1",children:l.jsxs("div",{className:"relative",children:[l.jsx("span",{className:"absolute inset-y-0 left-0 w-11 grid place-items-center text-indigo-300 pointer-events-none",children:l.jsx("span",{className:"material-symbols-outlined text-[22px]",children:"manage_search"})}),l.jsx("input",{value:M,onChange:k=>B(k.target.value),onKeyDown:k=>{k.key==="Enter"&&nt(1)},className:"input-modern",placeholder:"ค้นหาเลขที่บัญชี / ชื่อ - นามสกุล",type:"text",autoComplete:"off"})]})}),l.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[l.jsxs("button",{onClick:()=>nt(1),className:"btn-primary-modern",children:[l.jsx("span",{className:"material-symbols-outlined text-base",children:"search"}),"ค้นหา"]}),l.jsxs("button",{onClick:ml,className:"btn-secondary-modern",children:[l.jsx("span",{className:"material-symbols-outlined text-base",children:"restart_alt"}),"ล้างค่า"]}),(N==="admin"||N==="user")&&l.jsxs("button",{onClick:pl,disabled:Dn,className:"btn-secondary-modern",title:"รีเฟรชแคชและโหลดข้อมูลใหม่",children:[l.jsx("span",{className:"material-symbols-outlined text-base",children:"refresh"}),Dn?"กำลังรีเฟรช":"รีเฟรช"]}),l.jsxs("div",{className:"per-page-wrap",onClick:k=>k.stopPropagation(),children:[l.jsxs("button",{type:"button",className:`per-page-trigger ${fe?"open":""}`,onClick:()=>oe(k=>!k),"aria-haspopup":"listbox","aria-expanded":fe,children:[l.jsxs("span",{children:[ue," รายการ"]}),l.jsx("span",{className:"material-symbols-outlined text-[18px] text-slate-400 transition-transform",children:fe?"expand_less":"expand_more"})]}),fe&&l.jsx("div",{className:"per-page-menu",role:"listbox","aria-label":"จำนวนรายการต่อหน้า",children:[10,25,50].map(k=>{const re=ue===k;return l.jsxs("button",{type:"button",role:"option","aria-selected":re,className:`per-page-option ${re?"active":""}`,onClick:()=>{le(k),oe(!1)},children:[l.jsxs("span",{children:[k," รายการ"]}),re&&l.jsx("span",{className:"material-symbols-outlined text-[16px]",children:"check"})]},k)})})]})]})]}),l.jsx("div",{className:"mt-4 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3",children:l.jsxs("div",{className:"flex items-center gap-1.5 flex-wrap",children:[l.jsx("button",{onClick:()=>Tn(""),className:`case-tab ${O===""?"active-tab":"inactive-tab"}`,children:"ทั้งหมด"}),oc.map(k=>l.jsx("button",{onClick:()=>Tn(k),className:`case-tab ${O===k?"active-tab":"inactive-tab"}`,children:k},k))]})})]}),l.jsx(ff,{rows:C,role:N,loading:$e,error:Ne,expandedAccount:Se,onToggleExpand:k=>Ce(Se===k?"":k),onCopy:fl,onSort:ul,onDelete:y,returnTo:yr()}),l.jsxs("div",{className:"px-6 py-4 bg-gradient-to-r from-blue-50/60 via-white to-indigo-50/60 border-t border-blue-100 flex flex-col md:flex-row items-center justify-between gap-4",children:[l.jsxs("div",{className:"flex items-center gap-2 text-[11px] text-slate-400",children:[l.jsx("span",{className:"material-symbols-outlined text-sm text-blue-300",children:"database"}),l.jsx("span",{children:"รายการข้อมูลลูกค้า"})]}),l.jsx(hf,{page:ge,totalPages:Bn,onPage:nt}),l.jsx("div",{className:"text-[10px] text-indigo-300 uppercase tracking-widest font-bold",children:ye?`แสดง ${Xl}-${mn} จาก ${ye} รายการ`:"แสดง 0 รายการ"})]})]})]})]}),Cn&&l.jsxs("div",{className:"copy-toast show",children:[l.jsx("span",{className:"material-symbols-outlined text-[16px] text-emerald-500",children:"check_circle"}),"คัดลอกเลขที่บัญชีแล้ว"]}),al&&l.jsx(jf,{}),U&&l.jsx(xf,{draft:Q,setDraft:J,onApply:()=>{K(Q),D(!1)},onReset:()=>{K(pr()),J(pr()),D(!1)},onClose:()=>D(!1)}),ol&&l.jsx(wf,{dateFrom:Ct,dateTo:cl,setDateFrom:dl,setDateTo:ql,onSubmit:$t,onClose:()=>Mt(!1)}),q&&l.jsx(Nf,{form:ee,setForm:ae,error:he,onSubmit:ls,onClose:()=>G(!1)}),se&&l.jsx(bf,{form:ee,saving:_n,onBack:()=>{X(!1),G(!0)},onSubmit:ss}),p&&l.jsx(Sf,{account:p,onClose:()=>y(""),onConfirm:rs})]})}function uf({role:i,displayName:d}){const m={user:"User",admin:"Admin",superadmin:"Super Admin"};return l.jsxs("nav",{className:"fixed top-0 w-full z-50 bg-white border-b border-blue-100 flex justify-between items-center px-6 md:px-8 h-16 shadow-sm",children:[l.jsx("div",{className:"flex items-center gap-8 min-w-0",children:l.jsxs("span",{className:"text-xl tracking-tight text-primary font-headline flex items-center font-bold min-w-0",children:[l.jsx("div",{className:"w-10 h-10 bg-primary rounded-[10px] flex items-center justify-center shadow-lg shadow-indigo-200 mr-3 shrink-0",children:l.jsx("span",{className:"material-symbols-outlined text-white text-2xl font-normal",style:{fontVariationSettings:'"FILL" 1'},children:"shield"})}),l.jsx("span",{className:"truncate",children:"LQD Tracking Management System"})]})}),l.jsx("div",{className:"flex items-center gap-4",children:l.jsxs("div",{className:"flex items-center gap-3",children:[l.jsxs("div",{className:"text-right hidden sm:block",children:[l.jsx("p",{className:"text-[10px] text-indigo-400 uppercase tracking-widest leading-none mb-1 font-bold",children:"System Role"}),l.jsx("p",{className:"text-xs text-indigo-900 font-semibold",children:m[i]||"-"})]}),l.jsx("div",{className:"w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold border border-blue-100 shrink-0",children:l.jsx("span",{children:(d||i||"-").charAt(0).toUpperCase()})})]})})]})}function mf({role:i,activePage:d,onLogout:m}){const N=(I,$=!1)=>`${$?"hidden ":""}group flex items-center gap-3 px-3.5 py-3 rounded-[10px] transition-all mb-1 ${d===I?"bg-primary text-white shadow-md shadow-indigo-100":"bg-transparent text-slate-600 hover:bg-blue-50 hover:text-primary font-medium"}`,v=I=>`material-symbols-outlined font-normal transition-colors ${d!==I?"text-slate-400 group-hover:text-primary":""}`,C=i==="superadmin";return l.jsxs("aside",{className:"fixed left-0 top-0 h-full w-56 z-40 bg-white border-r border-blue-100 flex-col p-3 gap-2 pt-20 hidden md:flex",children:[l.jsxs("div",{className:"px-3.5 py-4 mb-4 bg-blue-50/50 rounded-[12px] border border-blue-50",children:[l.jsx("h2",{className:"font-headline text-primary text-base font-bold",children:"LQD Debt Overview"}),l.jsxs("p",{className:"text-[10px] text-indigo-400 uppercase tracking-widest font-bold",children:[i||"-"," Terminal"]})]}),l.jsxs("nav",{className:"flex-1 space-y-1",children:[i==="superadmin"&&l.jsxs("a",{href:"/users",className:N("users"),children:[l.jsx("span",{className:v("users"),children:"manage_accounts"}),l.jsx("span",{className:"text-sm",children:"User Management"})]}),i==="superadmin"&&l.jsxs("a",{href:"/password-policy",className:N("password-policy"),children:[l.jsx("span",{className:v("password-policy"),children:"admin_panel_settings"}),l.jsx("span",{className:"text-sm",children:"Password Policy"})]}),l.jsxs("a",{href:"/customer-list",className:N("customer-list",C),children:[l.jsx("span",{className:v("customer-list"),style:d==="customer-list"?{fontVariationSettings:'"FILL" 1'}:void 0,children:"groups"}),l.jsx("span",{className:"text-sm font-semibold",children:"Customer List"})]}),l.jsxs("a",{href:"/payment-record",className:N("payment-record",C),children:[l.jsx("span",{className:v("payment-record"),children:"history"}),l.jsx("span",{className:"text-sm",children:"Payment Record"})]}),i==="admin"&&l.jsxs("a",{href:"/data-import",className:N("data-import"),children:[l.jsx("span",{className:v("data-import"),children:"upload_file"}),l.jsx("span",{className:"text-sm",children:"Data Import Center"})]}),i==="admin"&&l.jsxs("a",{href:"/report",className:N("report"),children:[l.jsx("span",{className:v("report"),children:"assessment"}),l.jsx("span",{className:"text-sm",children:"Report Center"})]})]}),l.jsx("div",{className:"mt-auto pt-4 border-t border-blue-50",children:l.jsxs("button",{onClick:m,className:"w-full flex items-center gap-3 px-3.5 py-3 text-accent-coral text-sm hover:bg-red-50 rounded-[10px] transition-all font-bold cursor-pointer",children:[l.jsx("span",{className:"material-symbols-outlined font-normal",children:"logout"}),l.jsx("span",{children:"Log out"})]})})]})}function sc({children:i,tooltip:d,className:m="",measureSelector:N=""}){const v=E.useRef(null),[C,I]=E.useState(!1),$=E.useCallback(()=>{const M=v.current;return M?N&&M.querySelector(N)||M:null},[N]),z=E.useCallback(()=>{const M=$();if(!M)return;const B=M.scrollWidth>M.clientWidth+1,O=M.scrollHeight>M.clientHeight+1;I(B||O)},[$]);return E.useEffect(()=>{z();const M=v.current,B=$();if(!M&&!B||typeof ResizeObserver>"u")return window.addEventListener("resize",z),()=>window.removeEventListener("resize",z);const O=new ResizeObserver(z);return M&&O.observe(M),B&&B!==M&&O.observe(B),window.addEventListener("resize",z),()=>{O.disconnect(),window.removeEventListener("resize",z)}},[z,$,i,d]),l.jsxs("span",{className:`cell-tooltip-wrap ${m}`,children:[l.jsx("span",{ref:v,className:"tooltip-ellipsis",children:i}),C&&d&&l.jsx("span",{className:"cell-tooltip",role:"tooltip",children:d})]})}function ff(i){const{rows:d,role:m,loading:N,error:v,expandedAccount:C,returnTo:I,onToggleExpand:$,onCopy:z,onSort:M,onDelete:B}=i,O=K=>{window.location.href=`/payment-record?account=${encodeURIComponent(K)}&from=customer-list&return_to=${encodeURIComponent(I)}`},Z=K=>{window.location.href=`/customer-detail?account=${encodeURIComponent(K)}&from=customer-list&return_to=${encodeURIComponent(I)}`},H=K=>{window.location.href=`/customer-detail?account=${encodeURIComponent(K)}&open=enforcement&from=customer-list&return_to=${encodeURIComponent(I)}`};return l.jsx("div",{className:"table-shell",children:l.jsxs("table",{className:"mock-table text-left border-separate",children:[l.jsxs("colgroup",{children:[l.jsx("col",{style:{width:"13.5%"}}),l.jsx("col",{style:{width:"16%"}}),l.jsx("col",{style:{width:"10%"}}),l.jsx("col",{style:{width:"13%"}}),l.jsx("col",{style:{width:"11%"}}),l.jsx("col",{style:{width:"11.5%"}}),l.jsx("col",{style:{width:"9.5%"}}),l.jsx("col",{style:{width:"15.5%"}})]}),l.jsx("thead",{children:l.jsxs("tr",{children:[l.jsx("th",{className:"px-5 py-4 text-center",children:l.jsxs("button",{type:"button",onClick:()=>M("account_no"),className:"inline-flex items-center justify-center gap-1 hover:text-primary transition-colors",children:[l.jsx("span",{children:"เลขที่บัญชี"}),l.jsx("span",{className:"material-symbols-outlined text-[15px] text-slate-300",children:"unfold_more"})]})}),l.jsx("th",{className:"px-4 py-4 text-center",children:"ชื่อ-นามสกุล"}),l.jsx("th",{className:"px-3 py-4 text-center",children:l.jsxs("button",{type:"button",onClick:()=>M("filing_date"),className:"inline-flex items-center justify-center gap-1 hover:text-primary transition-colors",children:[l.jsx("span",{children:"วันที่ยื่นฟ้อง"}),l.jsx("span",{className:"material-symbols-outlined text-[15px] text-slate-300",children:"unfold_more"})]})}),l.jsx("th",{className:"px-3 py-4 text-center",children:"ยอดหนี้คงเหลือ"}),l.jsx("th",{className:"px-3 py-4 text-center",children:"สถานะคดี"}),l.jsx("th",{className:"px-3 py-4 text-center",children:"สถานะการชำระเงิน"}),l.jsx("th",{className:"px-3 py-4 text-center",children:"บันทึกหมาย"}),l.jsx("th",{className:"px-4 py-4 text-center",children:"การดำเนินการ"})]})}),l.jsxs("tbody",{className:N&&d.length>0?"is-loading":"",children:[N&&!d.length&&l.jsx("tr",{children:l.jsx("td",{colSpan:8,className:"px-6 py-8 text-center text-indigo-300 text-sm",children:"กำลังโหลดข้อมูล..."})}),v&&l.jsx("tr",{children:l.jsx("td",{colSpan:8,className:"px-6 py-12 text-center text-red-500 text-sm font-semibold",children:v})}),!N&&!v&&!d.length&&l.jsx("tr",{children:l.jsx("td",{colSpan:8,className:"px-6 py-14 text-center",children:l.jsxs("div",{className:"flex flex-col items-center justify-center gap-3",children:[l.jsx("div",{className:"w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-400",children:l.jsx("span",{className:"material-symbols-outlined text-[28px]",children:"manage_search"})}),l.jsxs("div",{children:[l.jsx("p",{className:"text-sm font-bold text-slate-500",children:"ไม่พบข้อมูล"}),l.jsx("p",{className:"text-xs text-slate-400 mt-0.5",children:"ลองเปลี่ยนคำค้นหา หรือเลือกสถานะอื่นอีกครั้ง"})]})]})})}),!v&&d.map(K=>{const Q=qm(K),J=C===Q,ge=cn(K),De=dc(K),ue=cc(K),le=tf(K),fe=wt(nf(K),!0),oe=`${le} ${fe}`;return l.jsxs(l.Fragment,{children:[l.jsxs("tr",{className:"main-row",children:[l.jsx("td",{className:"px-3.5 py-3 text-center",children:l.jsxs("div",{className:"account-cell-wrap",children:[l.jsx("span",{className:"account-pill",children:ci(Q)}),l.jsx("button",{type:"button",title:"คัดลอกเลขที่บัญชี",onClick:()=>z(Q),className:"copy-account-btn",children:l.jsx("span",{className:"material-symbols-outlined text-[12px]",children:"content_copy"})})]})}),l.jsx("td",{className:"px-4 py-3",children:l.jsxs("div",{className:"flex items-center gap-3 min-w-0",children:[l.jsx("div",{className:"w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 flex items-center justify-center text-primary text-[11px] font-extrabold shadow-sm flex-shrink-0",children:ef(K.name)}),l.jsx("div",{className:"min-w-0 w-full",children:l.jsx(sc,{tooltip:K.name||"",className:"customer-name-tooltip",children:K.name||"-"})})]})}),l.jsx("td",{className:"px-3 py-3 text-center",children:l.jsx("span",{className:"text-sm font-semibold text-slate-500",children:Nt(K.filing_date)})}),l.jsx("td",{className:"px-3 py-3 text-right",children:l.jsxs("div",{className:"amount-cell",children:[l.jsx("p",{className:"amount-main text-[13px] font-extrabold text-slate-800",children:wt(ue,!0)}),l.jsx("div",{className:"amount-sub",children:l.jsxs(sc,{tooltip:oe,className:"amount-sub-tooltip",measureSelector:".amount-sub-label",children:[l.jsx("span",{className:"amount-sub-label",children:le}),l.jsx("span",{className:"amount-sub-value",children:fe})]})})]})}),l.jsx("td",{className:"px-3 py-3 text-center",children:l.jsx(xr,{text:ge,tone:af(ge)})}),l.jsx("td",{className:"px-3 py-3 text-center",children:l.jsx(xr,{text:De,tone:of(De)})}),l.jsx("td",{className:"px-3 py-3 text-center",children:K.can_record_enforcement?l.jsx("button",{type:"button",onClick:()=>H(Q),title:"ไปหน้ารายละเอียดเพื่อบันทึกหมายบังคับคดี",children:l.jsx(xr,{text:"พร้อมบันทึกหมาย",tone:"amber"})}):K.has_enforcement_order||K.enforcement_order_no||K.enforcement_recorded_at?l.jsx(xr,{text:"บันทึกแล้ว",tone:"red"}):l.jsx("span",{className:"text-[11px] font-semibold text-slate-300",children:"-"})}),l.jsx("td",{className:"px-4 py-3 text-center",children:l.jsxs("div",{className:"flex justify-center gap-1",children:[l.jsx("button",{title:"ขยายข้อมูล",onClick:()=>$(Q),className:"action-icon-btn",children:l.jsx("span",{className:"material-symbols-outlined text-lg",children:J?"expand_less":"expand_more"})}),l.jsx("button",{title:"บันทึกการชำระเงิน",onClick:()=>O(Q),className:"action-icon-btn",children:l.jsx("span",{className:"material-symbols-outlined text-lg",children:"payments"})}),l.jsx("button",{title:"ดูรายละเอียด",onClick:()=>Z(Q),className:"action-icon-btn",children:l.jsx("span",{className:"material-symbols-outlined text-lg",children:"search"})}),m==="admin"&&l.jsx("button",{title:"ลบข้อมูล",onClick:()=>B(Q),className:"action-icon-btn hover:text-accent-coral hover:bg-red-50 hover:border-red-200",children:l.jsx("span",{className:"material-symbols-outlined text-lg",children:"delete"})})]})})]},Q),J&&l.jsx(pf,{row:K},`${Q}-quick`)]})})]})]})})}function pf({row:i}){const d=cc(i);return l.jsx("tr",{className:"expanded-row",children:l.jsx("td",{colSpan:8,className:"px-6 py-4",children:l.jsx("div",{className:"quick-view",children:l.jsxs("div",{className:"grid grid-cols-1 xl:grid-cols-2 divide-y xl:divide-y-0 xl:divide-x divide-blue-100",children:[l.jsx(gr,{icon:"balance",title:"ข้อมูลคำพิพากษา",items:[["วันที่มีคำพิพากษา",Nt(i.judgment_date)],["ยอดหนี้ตามคำพิพากษา",wt(i.total_debt)],["เงินต้นตามคำพิพากษา",wt(i.principal)],["อัตราดอกเบี้ย",ec(i.interest_rate)],["ค่าธรรมเนียมศาล",wt(i.court_fee)],["ค่าทนายความ",wt(i.lawyer_fee)]]}),l.jsx(gr,{icon:"event_repeat",title:"แผนการชำระเงิน",items:[["วันครบกำหนดงวดแรก",Nt(i.first_due_date)],["วันครบกำหนดงวดสุดท้าย",Nt(i.last_due_date)],["จำนวนงวด",i.installment_count?`${i.installment_count} งวด`:"-"],["ยอดชำระงวดปัจจุบัน",wt(lf(i))],["อัตราดอกเบี้ยเมื่อผิดนัดชำระ",ec(i.default_interest_rate)],["วันครบกำหนดถัดไป","-"]]}),l.jsx(gr,{icon:"assignment",title:"ข้อมูลการบังคับคดี",items:[["คดีหมายเลขแดงที่",i.red_case_no||"-"],["วันที่ของหมายบังคับคดี",Nt(i.enforcement_judgment_date)],["วันที่บันทึกข้อมูล",Xm(i.enforcement_recorded_at)],["สถานะการบันทึก",i.enforcement_order_no||i.enforcement_recorded_at?"บันทึกแล้ว":i.can_record_enforcement?"พร้อมบันทึกหมาย":"-"]]}),l.jsx(gr,{icon:"payments",title:"ข้อมูลการชำระเงิน",items:[["วันที่ชำระล่าสุด",Nt(sf(i))],["จำนวนเงินที่ชำระล่าสุด",tc(i)?wt(tc(i)):"-"],["ยอดหนี้คงเหลือ",wt(d)],["จำนวนวันที่ค้างชำระ",nc(i)>0?`${nc(i)} วัน`:"-"],["สถานะการชำระเงิน",dc(i)],["สถานะคดี",cn(i)]]})]})})})})}function gr({icon:i,title:d,items:m}){return l.jsxs("div",{className:"quick-section",children:[l.jsxs("div",{className:"quick-section-header",children:[l.jsx("span",{className:"material-symbols-outlined text-[17px] text-indigo-500",children:i}),l.jsx("p",{className:"quick-section-title",children:d})]}),l.jsx("div",{className:"quick-grid",children:m.map(([N,v])=>l.jsxs("div",{className:"quick-kv",children:[l.jsx("p",{className:"quick-kv-label",children:N}),l.jsx("p",{className:"quick-kv-value",children:v||"-"})]},N))})]})}function hf({page:i,totalPages:d,onPage:m}){const N=Array.from({length:d},(v,C)=>C+1).filter(v=>v===1||v===d||v>=i-1&&v<=i+1);return l.jsxs("div",{className:"flex items-center gap-1",children:[l.jsx("button",{onClick:()=>m(i-1),disabled:i===1,className:"p-1.5 rounded-lg hover:bg-white border border-transparent hover:border-blue-100 transition-all disabled:opacity-30",children:l.jsx("span",{className:"material-symbols-outlined text-indigo-300 text-base",children:"chevron_left"})}),l.jsx("div",{className:"flex gap-1 px-2",children:N.map((v,C)=>l.jsxs("span",{className:"contents",children:[C>0&&v-N[C-1]>1&&l.jsx("span",{className:"w-7 h-7 flex items-center justify-center text-[10px] text-indigo-200",children:"..."}),l.jsx("button",{onClick:()=>m(v),className:`w-7 h-7 rounded-lg text-[10px] transition-all ${v===i?"bg-primary text-white shadow-sm":"hover:bg-white text-indigo-400"}`,children:v})]},v))}),l.jsx("button",{onClick:()=>m(i+1),disabled:i===d,className:"p-1.5 rounded-lg hover:bg-white border border-transparent hover:border-blue-100 transition-all disabled:opacity-30",children:l.jsx("span",{className:"material-symbols-outlined text-indigo-300 text-base",children:"chevron_right"})})]})}function xf({draft:i,setDraft:d,onApply:m,onReset:N,onClose:v}){const[C,I]=E.useState(!1),$=E.useRef(!1);E.useEffect(()=>{const B=window.requestAnimationFrame(()=>I(!0));return()=>window.cancelAnimationFrame(B)},[]);const z=(B,O)=>{const Z=i[B];d({...i,[B]:Z.includes(O)?Z.filter(H=>H!==O):[...Z,O]})},M=B=>{$.current||($.current=!0,I(!1),window.setTimeout(B,220))};return l.jsxs(l.Fragment,{children:[l.jsx("div",{onClick:()=>M(v),className:`drawer-backdrop ${C?"open":""}`}),l.jsx("aside",{className:`drawer-panel ${C?"open":""}`,children:l.jsxs("div",{className:"h-full flex flex-col",children:[l.jsx("div",{className:"px-6 py-5 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-white",children:l.jsxs("div",{className:"flex items-start justify-between gap-4",children:[l.jsxs("div",{children:[l.jsx("p",{className:"text-[11px] text-indigo-400 uppercase tracking-widest font-bold",children:"ตัวกรองขั้นสูง"}),l.jsx("h3",{className:"text-xl font-extrabold text-slate-800 mt-1",children:"ตัวกรองสำหรับงานติดตาม"})]}),l.jsx("button",{onClick:()=>M(v),className:"w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all",children:l.jsx("span",{className:"material-symbols-outlined text-[20px]",children:"close"})})]})}),l.jsxs("div",{className:"flex-1 overflow-y-auto p-6 space-y-5",children:[l.jsxs("section",{className:"filter-section",children:[l.jsx("p",{className:"filter-title",children:"สถานะคดี"}),l.jsx("div",{className:"filter-check-grid",children:oc.map(B=>l.jsxs("label",{className:`filter-check-row ${i.caseStatuses.includes(B)?"active":""}`,children:[l.jsxs("span",{className:"filter-check-content",children:[l.jsx("span",{className:"filter-check-icon",children:l.jsx("span",{className:"material-symbols-outlined text-[19px]",children:Ym[B]||"label"})}),l.jsx("span",{className:"filter-check-text",children:l.jsx("span",{className:"filter-check-label",children:B})})]}),l.jsx("input",{checked:i.caseStatuses.includes(B),onChange:()=>z("caseStatuses",B),type:"checkbox",className:"filter-check-input"})]},B))})]}),l.jsxs("section",{className:"filter-section",children:[l.jsx("p",{className:"filter-title",children:"สถานะการชำระเงิน"}),l.jsx("div",{className:"filter-check-grid",children:Qm.map(B=>l.jsxs("label",{className:`filter-check-row ${i.paymentStatuses.includes(B)?"active":""}`,children:[l.jsxs("span",{className:"filter-check-content",children:[l.jsx("span",{className:"filter-check-icon",children:l.jsx("span",{className:"material-symbols-outlined text-[19px]",children:Jm[B]||"payments"})}),l.jsx("span",{className:"filter-check-text",children:l.jsx("span",{className:"filter-check-label",children:B})})]}),l.jsx("input",{checked:i.paymentStatuses.includes(B),onChange:()=>z("paymentStatuses",B),type:"checkbox",className:"filter-check-input"})]},B))})]}),l.jsx("section",{className:"filter-section",children:l.jsx(gf,{draft:i,setDraft:d})}),l.jsxs("section",{className:"filter-section",children:[l.jsx("p",{className:"filter-title",children:"ช่วงยอดหนี้คงเหลือ"}),l.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[l.jsx("input",{value:i.outstandingMin,onChange:B=>d({...i,outstandingMin:B.target.value}),className:"filter-input",type:"number",min:"0",step:"10000",placeholder:"ต่ำสุด"}),l.jsx("input",{value:i.outstandingMax,onChange:B=>d({...i,outstandingMax:B.target.value}),className:"filter-input",type:"number",min:"0",step:"10000",placeholder:"สูงสุด"})]})]})]}),l.jsxs("div",{className:"p-6 border-t border-blue-100 bg-slate-50/70 flex gap-2",children:[l.jsx("button",{onClick:()=>M(N),className:"btn-secondary-modern flex-1",children:"ล้างตัวกรอง"}),l.jsx("button",{onClick:()=>M(m),className:"btn-primary-modern flex-1",children:"ใช้ตัวกรอง"})]})]})})]})}function gf({draft:i,setDraft:d}){const m=ri.find(N=>N.value===i.dateField)||ri[0];return l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"mb-4 space-y-3",children:[l.jsxs("div",{className:"flex items-start justify-between gap-3",children:[l.jsxs("div",{children:[l.jsx("p",{className:"filter-title mb-1",children:"ช่วงวันที่"}),l.jsx("p",{className:"text-[11px] font-semibold leading-relaxed text-slate-400",children:"เลือกขอบเขตวันที่ที่จะใช้ค้นหา"})]}),l.jsx("span",{className:"inline-flex min-h-8 items-center rounded-xl border border-indigo-100 bg-indigo-50 px-3 text-[11px] font-extrabold text-primary",children:m.shortLabel})]}),l.jsx("div",{className:"filter-date-scope-grid",role:"radiogroup","aria-label":"เลือกประเภทวันที่",children:ri.map(N=>{const v=N.value===m.value;return l.jsxs("button",{type:"button",onClick:()=>d({...i,dateField:N.value}),className:`filter-date-scope-option ${v?"active":""}`,role:"radio","aria-checked":v,children:[l.jsx("span",{className:"filter-date-scope-icon",children:l.jsx("span",{className:"material-symbols-outlined text-[17px]",children:N.icon})}),l.jsxs("span",{className:"min-w-0 flex-1",children:[l.jsx("span",{className:"filter-date-scope-label",children:N.label}),l.jsx("span",{className:"filter-date-scope-desc",children:N.description})]}),l.jsx("span",{className:`filter-date-scope-check ${v?"active":""}`,children:l.jsx("span",{className:"material-symbols-outlined text-[15px]",children:"check"})})]},N.value)})})]}),l.jsx(yf,{dateFrom:i.dateFrom,dateTo:i.dateTo,onChange:(N,v)=>d({...i,[N]:v})})]})}function yf({dateFrom:i,dateTo:d,onChange:m}){const N=Xd(i||d)||ii(),[v,C]=E.useState(""),[I,$]=E.useState(N.getFullYear()),[z,M]=E.useState(N.getMonth()),[B,O]=E.useState(!1),[Z,H]=E.useState({}),K=E.useRef(null),Q=E.useRef(null),J=E.useRef(null),ge=v==="dateTo"?d:i,De=ii(),ue=E.useCallback(W=>{const ne=W==="dateTo"?J.current:Q.current;if(!ne)return;const pe=ne.getBoundingClientRect(),_e=288,we=window.innerHeight-pe.bottom-8,Se=pe.top-8;let Ce=pe.left;Ce+_e>window.innerWidth-8&&(Ce=window.innerWidth-_e-8),Ce<8&&(Ce=8);const $e={left:Ce,width:_e,maxHeight:Math.max(180,we>=340?we:Se>=340?Se:window.innerHeight-16)};we>=340?$e.top=pe.bottom+6:Se>=340?$e.bottom=window.innerHeight-pe.top+6:$e.top=8,H($e)},[]),le=W=>{const ne=Xd(W==="dateTo"?d:i)||ii();$(ne.getFullYear()),M(ne.getMonth()),O(!1),C(W),window.requestAnimationFrame(()=>ue(W))};E.useEffect(()=>{if(!v)return;const W=pe=>{var we,Se,Ce;const _e=pe.target;(we=K.current)!=null&&we.contains(_e)||(Se=Q.current)!=null&&Se.contains(_e)||(Ce=J.current)!=null&&Ce.contains(_e)||C("")},ne=()=>ue(v);return document.addEventListener("mousedown",W),window.addEventListener("resize",ne),window.addEventListener("scroll",ne,!0),()=>{document.removeEventListener("mousedown",W),window.removeEventListener("resize",ne),window.removeEventListener("scroll",ne,!0)}},[v,ue]);const fe=W=>{v&&(m(v,W),C(""))},oe=W=>{const ne=z+W;ne>11?(M(0),$(pe=>pe+1)):ne<0?(M(11),$(pe=>pe-1)):M(ne)},ye=v&&l.jsxs("div",{ref:K,style:Z,className:"dp-popup",children:[l.jsxs("div",{className:"dp-header",children:[l.jsx("button",{type:"button",onClick:()=>oe(-1),className:"dp-nav-btn","aria-label":"เดือนก่อนหน้า",children:l.jsx("span",{className:"material-symbols-outlined text-[18px]",children:"chevron_left"})}),l.jsxs("button",{type:"button",onClick:()=>O(W=>!W),className:"dp-month-year",children:[Km[z]," ",I+543]}),l.jsx("button",{type:"button",onClick:()=>oe(1),className:"dp-nav-btn","aria-label":"เดือนถัดไป",children:l.jsx("span",{className:"material-symbols-outlined text-[18px]",children:"chevron_right"})})]}),B?l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"dp-year-header",children:[l.jsx("button",{type:"button",onClick:()=>$(W=>W-1),className:"dp-nav-btn","aria-label":"ปีก่อนหน้า",children:l.jsx("span",{className:"material-symbols-outlined text-[18px]",children:"chevron_left"})}),l.jsxs("span",{className:"text-sm font-bold text-slate-700",children:["พ.ศ. ",I+543]}),l.jsx("button",{type:"button",onClick:()=>$(W=>W+1),className:"dp-nav-btn","aria-label":"ปีถัดไป",children:l.jsx("span",{className:"material-symbols-outlined text-[18px]",children:"chevron_right"})})]}),l.jsx("div",{className:"dp-my-grid",children:Gm.map((W,ne)=>l.jsx("button",{type:"button",onClick:()=>{M(ne),O(!1)},className:`dp-my-item ${ne===z?"active":""}`,children:W},W))})]}):l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"dp-weekdays",children:Zm.map(W=>l.jsx("span",{className:"dp-weekday",children:W},W))}),l.jsx("div",{className:"dp-days",children:vf(I,z).map(W=>{const ne=qd(W.date),pe=W.currentMonth&&ne===ge,_e=W.currentMonth&&W.date.getTime()===De.getTime(),we=`dp-day ${W.currentMonth?"":"dp-day-other"} ${pe?"dp-day-selected":""} ${_e&&!pe?"dp-day-today":""}`;return W.currentMonth?l.jsx("button",{type:"button",onClick:()=>fe(ne),className:we,children:W.date.getDate()},ne):l.jsx("span",{className:we,children:W.date.getDate()},ne)})})]}),l.jsxs("div",{className:"dp-footer",children:[l.jsx("button",{type:"button",onClick:()=>{v&&m(v,""),C("")},className:"dp-btn-clear",children:"ล้างค่า"}),l.jsx("button",{type:"button",onClick:()=>fe(qd(De)),className:"dp-btn-today",children:"วันนี้"})]})]});return l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[l.jsxs("button",{ref:Q,type:"button",onClick:()=>le("dateFrom"),className:`filter-date-display relative ${v==="dateFrom"?"open":""}`,children:[l.jsx("span",{className:i?"text-slate-700":"text-slate-400",children:i?Nt(i):"เริ่มต้น"}),l.jsx("span",{className:"material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[17px] text-slate-400 pointer-events-none",children:"calendar_today"})]}),l.jsxs("button",{ref:J,type:"button",onClick:()=>le("dateTo"),className:`filter-date-display relative ${v==="dateTo"?"open":""}`,children:[l.jsx("span",{className:d?"text-slate-700":"text-slate-400",children:d?Nt(d):"สิ้นสุด"}),l.jsx("span",{className:"material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[17px] text-slate-400 pointer-events-none",children:"calendar_today"})]})]}),ye?Wm.createPortal(ye,document.body):null]})}function vf(i,d){const m=new Date(i,d,1),N=new Date(i,d+1,0),v=[];for(let C=0;C<m.getDay();C+=1)v.push({date:new Date(i,d,C-m.getDay()+1),currentMonth:!1});for(let C=1;C<=N.getDate();C+=1)v.push({date:new Date(i,d,C),currentMonth:!0});for(;v.length<42;)v.push({date:new Date(i,d+1,v.length-m.getDay()-N.getDate()+1),currentMonth:!1});return v}function jf(){return l.jsx(Zl,{children:l.jsxs("div",{className:"p-7 text-center",children:[l.jsx("div",{className:"mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-primary",children:l.jsxs("svg",{className:"h-8 w-8 animate-spin",fill:"none",viewBox:"0 0 24 24",children:[l.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),l.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8v8z"})]})}),l.jsx("h3",{className:"text-lg font-extrabold text-slate-800",children:"กำลังรีเฟรชข้อมูล"}),l.jsx("p",{className:"mt-2 text-sm leading-relaxed text-slate-500",children:"ระบบกำลังคำนวณแคชรายการลูกค้าใหม่ กรุณารอสักครู่"})]})})}function wf(i){return l.jsx(Zl,{onClose:i.onClose,children:d=>l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"px-6 py-5 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-white",children:l.jsxs("div",{className:"flex items-start justify-between gap-4",children:[l.jsxs("div",{children:[l.jsx("p",{className:"text-[11px] text-indigo-400 uppercase tracking-widest font-bold",children:"Raw Data Export"}),l.jsx("h3",{className:"text-xl font-extrabold text-slate-800 mt-1",children:"ดาวน์โหลดข้อมูลดิบ"}),l.jsx("p",{className:"mt-1 text-xs text-slate-500 leading-relaxed",children:"เลือกช่วงวันที่ที่ Maker ทำรายการในระบบ"})]}),l.jsx("button",{onClick:d,className:"modal-close",children:l.jsx("span",{className:"material-symbols-outlined text-[20px]",children:"close"})})]})}),l.jsxs("div",{className:"p-6 space-y-4",children:[l.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[l.jsxs("label",{className:"add-label",children:["วันที่เริ่มต้น",l.jsx("input",{value:i.dateFrom,onChange:m=>i.setDateFrom(m.target.value),type:"date",className:"filter-input mt-2"})]}),l.jsxs("label",{className:"add-label",children:["วันที่สิ้นสุด",l.jsx("input",{value:i.dateTo,onChange:m=>i.setDateTo(m.target.value),type:"date",className:"filter-input mt-2"})]})]}),l.jsxs("div",{className:"flex justify-end gap-2",children:[l.jsx("button",{onClick:d,className:"btn-secondary-modern",children:"ยกเลิก"}),l.jsxs("button",{onClick:i.onSubmit,className:"btn-primary-modern",children:[l.jsx("span",{className:"material-symbols-outlined text-base",children:"download"}),"ดาวน์โหลด"]})]})]})]})})}function Nf({form:i,setForm:d,error:m,onSubmit:N,onClose:v}){return l.jsx(Zl,{onClose:v,large:!0,children:C=>l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"modal-header",children:l.jsxs("div",{className:"flex items-start justify-between gap-4",children:[l.jsxs("div",{className:"flex items-start gap-3 min-w-0",children:[l.jsx("div",{className:"modal-icon",children:l.jsx("span",{className:"material-symbols-outlined text-[21px]",style:{fontVariationSettings:'"FILL" 1'},children:"person_add"})}),l.jsxs("div",{className:"min-w-0",children:[l.jsx("h3",{className:"text-[18px] font-extrabold text-slate-800 tracking-tight",children:"เพิ่มข้อมูลลูกหนี้ใหม่"}),l.jsx("p",{className:"text-[12px] text-slate-500 mt-0.5 leading-relaxed",children:"กรอกข้อมูลตั้งต้นสำหรับเปิดรายการคดีในระบบ"})]})]}),l.jsx("button",{onClick:C,className:"modal-close",children:l.jsx("span",{className:"material-symbols-outlined text-[20px]",children:"close"})})]})}),m&&l.jsxs("div",{className:"add-error-banner",children:[l.jsx("span",{className:"material-symbols-outlined text-red-500 flex-shrink-0 text-[18px]",style:{fontVariationSettings:'"FILL" 1'},children:"error"}),l.jsxs("div",{className:"flex-1",children:[l.jsx("p",{className:"text-[12px] font-bold text-red-700 mb-0.5",children:"กรุณาตรวจสอบข้อมูลอีกครั้ง"}),l.jsx("p",{className:"text-sm text-red-700 leading-relaxed",children:m})]})]}),l.jsxs("form",{onSubmit:N,className:"modal-body",children:[l.jsxs("div",{className:"flex items-center justify-between gap-3 mb-4",children:[l.jsx("p",{className:"modal-section-title",children:"ข้อมูลลูกหนี้"}),l.jsxs("div",{className:"inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-bold text-primary",children:[l.jsx("span",{className:"material-symbols-outlined text-[15px]",children:"edit_note"}),"ข้อมูลจำเป็น"]})]}),l.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-12 gap-4",children:[l.jsx(En,{label:"หมายเลขบัญชี *",value:i.account_no,onChange:I=>d({...i,account_no:I.replace(/\D/g,"").slice(0,12)}),icon:"badge",placeholder:"กรอกหมายเลขบัญชี 12 หลัก",helper:"กรอกเลขบัญชีจำนวน 12 หลัก",maxLength:12,inputMode:"numeric",inputClassName:"pr-16",rightSlot:l.jsxs("span",{className:"absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-300 pointer-events-none font-mono",children:[i.account_no.length,"/12"]})}),l.jsx(En,{label:"คดีหมายเลขดำที่ *",value:i.black_case_no,onChange:I=>d({...i,black_case_no:I}),icon:"article",placeholder:"กรอกคดีหมายเลขดำที่",helper:"รูปแบบ: ตัวย่อประเภทคดีติดเลขที่/ปี พ.ศ. เช่น ผบ1234/2567"}),l.jsx(En,{label:"วันที่ยื่นฟ้อง *",value:i.filing_date,onChange:I=>d({...i,filing_date:I}),type:"date",icon:"calendar_today",placeholder:"เลือกวันที่ยื่นฟ้อง",helper:"เลือกวันที่ตามเอกสารยื่นฟ้อง"}),l.jsx(En,{label:"วันที่ผิดนัดชำระก่อนฟ้อง *",value:i.default_date,onChange:I=>d({...i,default_date:I}),type:"date",icon:"calendar_today",placeholder:"เลือกวันที่ผิดนัดชำระก่อนฟ้อง",helper:"เลือกวันที่ผิดนัดชำระก่อนฟ้อง"}),l.jsx(En,{label:"ทุนทรัพย์ที่ฟ้อง *",value:i.filing_capital,onChange:I=>d({...i,filing_capital:I}),icon:"payments",placeholder:"กรอกทุนทรัพย์ที่ฟ้อง",helper:"กรอกจำนวนเงินได้สูงสุด 2 ตำแหน่งทศนิยม",inputMode:"decimal"}),l.jsx(En,{label:"ชื่อ-นามสกุล *",value:i.name,onChange:I=>d({...i,name:I}),icon:"person",placeholder:"ชื่อ-นามสกุล หรือชื่อบริษัท",helper:"ใช้ได้เฉพาะตัวอักษร ตัวเลข เว้นวรรค จุด (.) และขีดกลาง (-)"}),l.jsx(En,{label:"DPD ณ วันที่ก่อนส่งฟ้องศาล 1 วัน *",value:i.pre_filing_dpd_days,onChange:I=>d({...i,pre_filing_dpd_days:I.replace(/\D/g,"")}),icon:"pin",placeholder:"กรอกจำนวนวัน",helper:"กรอกจำนวนเต็มมากกว่า 0 เท่านั้น",inputMode:"numeric"}),l.jsxs("div",{className:"add-field md:col-span-6",children:[l.jsx("label",{className:"add-label",children:"หมายเหตุ / เงื่อนไขพิเศษเพิ่มเติม"}),l.jsx("textarea",{value:i.filing_note,onChange:I=>d({...i,filing_note:I.target.value.slice(0,100)}),className:"add-input add-note-input h-[58px] min-h-[58px] resize-none",placeholder:"กรอกหมายเหตุเพิ่มเติม (ถ้ามี)",maxLength:100}),l.jsxs("p",{className:"add-helper !mt-1 !min-h-0",children:[i.filing_note.length,"/100 ตัวอักษร"]})]})]}),l.jsxs("div",{className:"modal-footer -mx-5 md:-mx-6 -mb-5 mt-5",children:[l.jsx("p",{className:"text-[11px] text-slate-400 leading-relaxed",children:"ฟิลด์ที่มีเครื่องหมาย * จำเป็นต้องกรอก"}),l.jsxs("div",{className:"flex items-center justify-end gap-2",children:[l.jsx("button",{type:"button",onClick:C,className:"btn-secondary-modern",children:"ยกเลิก"}),l.jsxs("button",{type:"submit",className:"btn-primary-modern",children:[l.jsx("span",{className:"material-symbols-outlined text-base",children:"fact_check"}),"ตรวจสอบข้อมูล"]})]})]})]})]})})}function En({label:i,value:d,onChange:m,icon:N,helper:v,type:C="text",placeholder:I,inputMode:$,maxLength:z,inputClassName:M="",fieldClassName:B,rightSlot:O}){return l.jsxs("div",{className:`add-field ${B||"md:col-span-6"}`,children:[l.jsx("label",{className:"add-label",children:i}),l.jsxs("div",{className:"relative",children:[l.jsx("span",{className:"material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300 text-[18px] pointer-events-none",children:N}),l.jsx("input",{value:d,onChange:Z=>m(Z.target.value),className:`add-input ${M}`,type:C,placeholder:I,inputMode:$,maxLength:z,autoComplete:"off"}),O]}),v&&l.jsx("p",{className:"add-helper",children:v})]})}function bf({form:i,saving:d,onBack:m,onSubmit:N}){return l.jsx(Zl,{onClose:m,large:!0,children:v=>l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"modal-header",children:l.jsxs("div",{className:"flex items-start justify-between gap-4",children:[l.jsxs("div",{className:"flex items-start gap-3 min-w-0",children:[l.jsx("div",{className:"modal-icon",children:l.jsx("span",{className:"material-symbols-outlined text-[21px]",style:{fontVariationSettings:'"FILL" 1'},children:"fact_check"})}),l.jsxs("div",{className:"min-w-0",children:[l.jsx("h3",{className:"text-[18px] font-extrabold text-slate-800 tracking-tight",children:"ตรวจสอบข้อมูลก่อนบันทึก"}),l.jsx("p",{className:"text-[12px] text-slate-500 mt-0.5 leading-relaxed",children:"ยืนยันรายละเอียดลูกหนี้ก่อนเพิ่มเข้าสู่ระบบ"})]})]}),l.jsx("button",{onClick:v,className:"modal-close",children:l.jsx("span",{className:"material-symbols-outlined text-[20px]",children:"close"})})]})}),l.jsx("div",{className:"modal-body",children:l.jsxs("div",{className:"review-panel",children:[l.jsxs("div",{className:"review-account",children:[l.jsxs("div",{className:"min-w-0",children:[l.jsx("p",{className:"review-label",children:"หมายเลขบัญชี"}),l.jsx("p",{className:"mt-1 text-xl font-extrabold text-primary tracking-wide break-all",children:ci(i.account_no)})]}),l.jsxs("div",{className:"inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700 self-start sm:self-center",children:[l.jsx("span",{className:"material-symbols-outlined text-[15px]",children:"verified"}),"พร้อมบันทึก"]})]}),l.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-blue-100",children:[["ชื่อ-นามสกุล",i.name],["คดีหมายเลขดำที่",i.black_case_no],["วันที่ยื่นฟ้อง",Nt(i.filing_date)],["วันที่ผิดนัดชำระก่อนฟ้อง",Nt(i.default_date)],["ทุนทรัพย์ที่ฟ้อง",wt(i.filing_capital)],["DPD ณ วันที่ก่อนส่งฟ้องศาล 1 วัน",i.pre_filing_dpd_days],["หมายเหตุ / เงื่อนไขพิเศษเพิ่มเติม",i.filing_note||"-"]].map(([C,I])=>l.jsxs("div",{className:"review-item",children:[l.jsx("p",{className:"review-label",children:C}),l.jsx("p",{className:"review-value break-words",children:I})]},C))})]})}),l.jsxs("div",{className:"modal-footer",children:[l.jsx("p",{className:"text-[11px] text-slate-400 leading-relaxed",children:"กรุณาตรวจสอบข้อมูลให้ถูกต้องก่อนกดยืนยันบันทึก"}),l.jsxs("div",{className:"flex items-center justify-end gap-2",children:[l.jsx("button",{onClick:v,className:"btn-secondary-modern",children:"แก้ไขข้อมูล"}),l.jsxs("button",{disabled:d,onClick:N,className:"btn-primary-modern",children:[l.jsx("span",{className:"material-symbols-outlined text-base",children:"save"}),d?"กำลังบันทึก...":"ยืนยันบันทึก"]})]})]})]})})}function Sf({account:i,onClose:d,onConfirm:m}){return l.jsx(Zl,{onClose:d,children:N=>l.jsxs("div",{className:"p-8 flex flex-col items-center text-center",children:[l.jsx("div",{className:"w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6",children:l.jsx("span",{className:"material-symbols-outlined text-red-500 text-4xl",style:{fontVariationSettings:'"FILL" 1'},children:"delete_forever"})}),l.jsx("h3",{className:"text-2xl font-bold text-on-surface mb-3",children:"ยืนยันการลบข้อมูล"}),l.jsx("h4",{className:"text-slate-400 text-xs font-bold uppercase tracking-widest mb-4",children:"Confirm Deletion"}),l.jsx("p",{className:"text-slate-500 text-sm leading-relaxed mb-2",children:"คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลลูกหนี้รายนี้?"}),l.jsx("p",{className:"text-primary font-bold text-sm mb-2",children:ci(i)}),l.jsx("p",{className:"text-slate-400 text-xs mb-8",children:"การดำเนินการนี้ไม่สามารถย้อนกลับได้"}),l.jsxs("div",{className:"flex gap-3 w-full",children:[l.jsx("button",{onClick:N,className:"flex-1 py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl transition-all text-sm",children:"ยกเลิก"}),l.jsx("button",{onClick:m,className:"flex-1 py-3 px-6 bg-accent-coral hover:bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-200 transition-all text-sm",children:"ยืนยันการลบ"})]})]})})}function Zl({children:i,onClose:d,large:m=!1}){const[N,v]=E.useState(!1),C=E.useRef(!1);E.useEffect(()=>{const $=window.requestAnimationFrame(()=>v(!0));return()=>window.cancelAnimationFrame($)},[]);const I=()=>{!d||C.current||(C.current=!0,v(!1),window.setTimeout(d,220))};return l.jsxs("div",{className:"fixed inset-0 z-[130] flex items-center justify-center p-4",children:[l.jsx("div",{className:`modal-backdrop absolute inset-0 bg-slate-900/45 backdrop-blur-[3px] ${N?"open":""}`,onClick:I}),l.jsx("div",{className:`modal-content relative ${N?"open":""} ${m?"modal-shell":"w-full max-w-md rounded-[24px] border border-blue-100 bg-white shadow-2xl shadow-slate-900/20 overflow-hidden"}`,children:typeof i=="function"?i(I):i})]})}const oi=document.getElementById("root"),rc=oi==null?void 0:oi.dataset.page,ac=mm.createRoot(document.getElementById("root"));rc==="customer-detail"?ac.render(l.jsx(Hm,{})):ac.render(l.jsx(E.StrictMode,{children:rc==="customer-list"?l.jsx(cf,{}):l.jsx(Dm,{})}));
