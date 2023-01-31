!function(){"use strict";const t="transitionend",e=t=>{const e=(t=>{let e=t.getAttribute("data-bs-target");if(!e||"#"===e){let i=t.getAttribute("href");if(!i||!i.includes("#")&&!i.startsWith("."))return null;i.includes("#")&&!i.startsWith("#")&&(i=`#${i.split("#")[1]}`),e=i&&"#"!==i?i.trim():null}return e})(t);return e?document.querySelector(e):null},i=e=>{e.dispatchEvent(new Event(t))},s=t=>!(!t||"object"!=typeof t)&&(void 0!==t.jquery&&(t=t[0]),void 0!==t.nodeType),n=t=>s(t)?t.jquery?t[0]:t:"string"==typeof t&&t.length>0?document.querySelector(t):null,o=t=>{if(!s(t)||0===t.getClientRects().length)return!1;const e="visible"===getComputedStyle(t).getPropertyValue("visibility"),i=t.closest("details:not([open])");if(!i)return e;if(i!==t){const e=t.closest("summary");if(e&&e.parentNode!==i)return!1;if(null===e)return!1}return e},r=t=>!t||t.nodeType!==Node.ELEMENT_NODE||!!t.classList.contains("disabled")||(void 0!==t.disabled?t.disabled:t.hasAttribute("disabled")&&"false"!==t.getAttribute("disabled")),a=t=>{t.offsetHeight},l=()=>window.jQuery&&!document.body.hasAttribute("data-bs-no-jquery")?window.jQuery:null,c=[],d=()=>"rtl"===document.documentElement.dir,u=t=>{var e;e=()=>{const e=l();if(e){const i=t.NAME,s=e.fn[i];e.fn[i]=t.jQueryInterface,e.fn[i].Constructor=t,e.fn[i].noConflict=()=>(e.fn[i]=s,t.jQueryInterface)}},"loading"===document.readyState?(c.length||document.addEventListener("DOMContentLoaded",(()=>{for(const t of c)t()})),c.push(e)):e()},h=t=>{"function"==typeof t&&t()},m=(e,s,n=!0)=>{if(!n)return void h(e);const o=(t=>{if(!t)return 0;let{transitionDuration:e,transitionDelay:i}=window.getComputedStyle(t);const s=Number.parseFloat(e),n=Number.parseFloat(i);return s||n?(e=e.split(",")[0],i=i.split(",")[0],1e3*(Number.parseFloat(e)+Number.parseFloat(i))):0})(s)+5;let r=!1;const a=({target:i})=>{i===s&&(r=!0,s.removeEventListener(t,a),h(e))};s.addEventListener(t,a),setTimeout((()=>{r||i(s)}),o)},_=/[^.]*(?=\..*)\.|.*/,f=/\..*/,g=/::\d+$/,p={};let b=1;const v={mouseenter:"mouseover",mouseleave:"mouseout"},y=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function E(t,e){return e&&`${e}::${b++}`||t.uidEvent||b++}function A(t){const e=E(t);return t.uidEvent=e,p[e]=p[e]||{},p[e]}function w(t,e,i=null){return Object.values(t).find((t=>t.callable===e&&t.delegationSelector===i))}function k(t,e,i){const s="string"==typeof e,n=s?i:e||i;let o=O(t);return y.has(o)||(o=t),[s,n,o]}function T(t,e,i,s,n){if("string"!=typeof e||!t)return;let[o,r,a]=k(e,i,s);if(e in v){const t=t=>function(e){if(!e.relatedTarget||e.relatedTarget!==e.delegateTarget&&!e.delegateTarget.contains(e.relatedTarget))return t.call(this,e)};r=t(r)}const l=A(t),c=l[a]||(l[a]={}),d=w(c,r,o?i:null);if(d)return void(d.oneOff=d.oneOff&&n);const u=E(r,e.replace(_,"")),h=o?function(t,e,i){return function s(n){const o=t.querySelectorAll(e);for(let{target:r}=n;r&&r!==this;r=r.parentNode)for(const a of o)if(a===r)return L(n,{delegateTarget:r}),s.oneOff&&I.off(t,n.type,e,i),i.apply(r,[n])}}(t,i,r):function(t,e){return function i(s){return L(s,{delegateTarget:t}),i.oneOff&&I.off(t,s.type,e),e.apply(t,[s])}}(t,r);h.delegationSelector=o?i:null,h.callable=r,h.oneOff=n,h.uidEvent=u,c[u]=h,t.addEventListener(a,h,o)}function C(t,e,i,s,n){const o=w(e[i],s,n);o&&(t.removeEventListener(i,o,Boolean(n)),delete e[i][o.uidEvent])}function D(t,e,i,s){const n=e[i]||{};for(const o of Object.keys(n))if(o.includes(s)){const s=n[o];C(t,e,i,s.callable,s.delegationSelector)}}function O(t){return t=t.replace(f,""),v[t]||t}const I={on(t,e,i,s){T(t,e,i,s,!1)},one(t,e,i,s){T(t,e,i,s,!0)},off(t,e,i,s){if("string"!=typeof e||!t)return;const[n,o,r]=k(e,i,s),a=r!==e,l=A(t),c=l[r]||{},d=e.startsWith(".");if(void 0===o){if(d)for(const i of Object.keys(l))D(t,l,i,e.slice(1));for(const i of Object.keys(c)){const s=i.replace(g,"");if(!a||e.includes(s)){const e=c[i];C(t,l,r,e.callable,e.delegationSelector)}}}else{if(!Object.keys(c).length)return;C(t,l,r,o,n?i:null)}},trigger(t,e,i){if("string"!=typeof e||!t)return null;const s=l();let n=null,o=!0,r=!0,a=!1;e!==O(e)&&s&&(n=s.Event(e,i),s(t).trigger(n),o=!n.isPropagationStopped(),r=!n.isImmediatePropagationStopped(),a=n.isDefaultPrevented());let c=new Event(e,{bubbles:o,cancelable:!0});return c=L(c,i),a&&c.preventDefault(),r&&t.dispatchEvent(c),c.defaultPrevented&&n&&n.preventDefault(),c}};function L(t,e){for(const[i,s]of Object.entries(e||{}))try{t[i]=s}catch{Object.defineProperty(t,i,{configurable:!0,get:()=>s})}return t}var N=I;function S(t){if("true"===t)return!0;if("false"===t)return!1;if(t===Number(t).toString())return Number(t);if(""===t||"null"===t)return null;if("string"!=typeof t)return t;try{return JSON.parse(decodeURIComponent(t))}catch{return t}}function x(t){return t.replace(/[A-Z]/g,(t=>`-${t.toLowerCase()}`))}var j={setDataAttribute(t,e,i){t.setAttribute(`data-bs-${x(e)}`,i)},removeDataAttribute(t,e){t.removeAttribute(`data-bs-${x(e)}`)},getDataAttributes(t){if(!t)return{};const e={},i=Object.keys(t.dataset).filter((t=>t.startsWith("bs")&&!t.startsWith("bsConfig")));for(const s of i){let i=s.replace(/^bs/,"");i=i.charAt(0).toLowerCase()+i.slice(1,i.length),e[i]=S(t.dataset[s])}return e},getDataAttribute:(t,e)=>S(t.getAttribute(`data-bs-${x(e)}`))},M={find:(t,e=document.documentElement)=>[].concat(...Element.prototype.querySelectorAll.call(e,t)),findOne:(t,e=document.documentElement)=>Element.prototype.querySelector.call(e,t),children:(t,e)=>[].concat(...t.children).filter((t=>t.matches(e))),parents(t,e){const i=[];let s=t.parentNode.closest(e);for(;s;)i.push(s),s=s.parentNode.closest(e);return i},prev(t,e){let i=t.previousElementSibling;for(;i;){if(i.matches(e))return[i];i=i.previousElementSibling}return[]},next(t,e){let i=t.nextElementSibling;for(;i;){if(i.matches(e))return[i];i=i.nextElementSibling}return[]},focusableChildren(t){const e=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map((t=>`${t}:not([tabindex^="-"])`)).join(",");return this.find(e,t).filter((t=>!r(t)&&o(t)))}},P=class{static get Default(){return{}}static get DefaultType(){return{}}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}_getConfig(t){return t=this._mergeConfigObj(t),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}_configAfterMerge(t){return t}_mergeConfigObj(t,e){const i=s(e)?j.getDataAttribute(e,"config"):{};return{...this.constructor.Default,..."object"==typeof i?i:{},...s(e)?j.getDataAttributes(e):{},..."object"==typeof t?t:{}}}_typeCheckConfig(t,e=this.constructor.DefaultType){for(const n of Object.keys(e)){const o=e[n],r=t[n],a=s(r)?"element":null==(i=r)?`${i}`:Object.prototype.toString.call(i).match(/\s([a-z]+)/i)[1].toLowerCase();if(!new RegExp(o).test(a))throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${a}" but expected type "${o}".`)}var i}};const $={endCallback:null,leftCallback:null,rightCallback:null},W={endCallback:"(function|null)",leftCallback:"(function|null)",rightCallback:"(function|null)"};class B extends P{constructor(t,e){super(),this._element=t,t&&B.isSupported()&&(this._config=this._getConfig(e),this._deltaX=0,this._supportPointerEvents=Boolean(window.PointerEvent),this._initEvents())}static get Default(){return $}static get DefaultType(){return W}static get NAME(){return"swipe"}dispose(){N.off(this._element,".bs.swipe")}_start(t){this._supportPointerEvents?this._eventIsPointerPenTouch(t)&&(this._deltaX=t.clientX):this._deltaX=t.touches[0].clientX}_end(t){this._eventIsPointerPenTouch(t)&&(this._deltaX=t.clientX-this._deltaX),this._handleSwipe(),h(this._config.endCallback)}_move(t){this._deltaX=t.touches&&t.touches.length>1?0:t.touches[0].clientX-this._deltaX}_handleSwipe(){const t=Math.abs(this._deltaX);if(t<=40)return;const e=t/this._deltaX;this._deltaX=0,e&&h(e>0?this._config.rightCallback:this._config.leftCallback)}_initEvents(){this._supportPointerEvents?(N.on(this._element,"pointerdown.bs.swipe",(t=>this._start(t))),N.on(this._element,"pointerup.bs.swipe",(t=>this._end(t))),this._element.classList.add("pointer-event")):(N.on(this._element,"touchstart.bs.swipe",(t=>this._start(t))),N.on(this._element,"touchmove.bs.swipe",(t=>this._move(t))),N.on(this._element,"touchend.bs.swipe",(t=>this._end(t))))}_eventIsPointerPenTouch(t){return this._supportPointerEvents&&("pen"===t.pointerType||"touch"===t.pointerType)}static isSupported(){return"ontouchstart"in document.documentElement||navigator.maxTouchPoints>0}}var q=B;const V=new Map;var X={set(t,e,i){V.has(t)||V.set(t,new Map);const s=V.get(t);s.has(e)||0===s.size?s.set(e,i):console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(s.keys())[0]}.`)},get:(t,e)=>V.has(t)&&V.get(t).get(e)||null,remove(t,e){if(!V.has(t))return;const i=V.get(t);i.delete(e),0===i.size&&V.delete(t)}},Y=class extends P{constructor(t,e){super(),(t=n(t))&&(this._element=t,this._config=this._getConfig(e),X.set(this._element,this.constructor.DATA_KEY,this))}dispose(){X.remove(this._element,this.constructor.DATA_KEY),N.off(this._element,this.constructor.EVENT_KEY);for(const t of Object.getOwnPropertyNames(this))this[t]=null}_queueCallback(t,e,i=!0){m(t,e,i)}_getConfig(t){return t=this._mergeConfigObj(t,this._element),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}static getInstance(t){return X.get(n(t),this.DATA_KEY)}static getOrCreateInstance(t,e={}){return this.getInstance(t)||new this(t,"object"==typeof e?e:null)}static get VERSION(){return"5.2.3"}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}static eventName(t){return`${t}${this.EVENT_KEY}`}};const K="next",F="prev",R="left",z="right",H="slid.bs.carousel",Q="carousel",U="active",J={ArrowLeft:z,ArrowRight:R},Z={interval:5e3,keyboard:!0,pause:"hover",ride:!1,touch:!0,wrap:!0},G={interval:"(number|boolean)",keyboard:"boolean",pause:"(string|boolean)",ride:"(boolean|string)",touch:"boolean",wrap:"boolean"};class tt extends Y{constructor(t,e){super(t,e),this._interval=null,this._activeElement=null,this._isSliding=!1,this.touchTimeout=null,this._swipeHelper=null,this._indicatorsElement=M.findOne(".carousel-indicators",this._element),this._addEventListeners(),this._config.ride===Q&&this.cycle()}static get Default(){return Z}static get DefaultType(){return G}static get NAME(){return"carousel"}next(){this._slide(K)}nextWhenVisible(){!document.hidden&&o(this._element)&&this.next()}prev(){this._slide(F)}pause(){this._isSliding&&i(this._element),this._clearInterval()}cycle(){this._clearInterval(),this._updateInterval(),this._interval=setInterval((()=>this.nextWhenVisible()),this._config.interval)}_maybeEnableCycle(){this._config.ride&&(this._isSliding?N.one(this._element,H,(()=>this.cycle())):this.cycle())}to(t){const e=this._getItems();if(t>e.length-1||t<0)return;if(this._isSliding)return void N.one(this._element,H,(()=>this.to(t)));const i=this._getItemIndex(this._getActive());if(i===t)return;const s=t>i?K:F;this._slide(s,e[t])}dispose(){this._swipeHelper&&this._swipeHelper.dispose(),super.dispose()}_configAfterMerge(t){return t.defaultInterval=t.interval,t}_addEventListeners(){this._config.keyboard&&N.on(this._element,"keydown.bs.carousel",(t=>this._keydown(t))),"hover"===this._config.pause&&(N.on(this._element,"mouseenter.bs.carousel",(()=>this.pause())),N.on(this._element,"mouseleave.bs.carousel",(()=>this._maybeEnableCycle()))),this._config.touch&&q.isSupported()&&this._addTouchEventListeners()}_addTouchEventListeners(){for(const t of M.find(".carousel-item img",this._element))N.on(t,"dragstart.bs.carousel",(t=>t.preventDefault()));const t={leftCallback:()=>this._slide(this._directionToOrder(R)),rightCallback:()=>this._slide(this._directionToOrder(z)),endCallback:()=>{"hover"===this._config.pause&&(this.pause(),this.touchTimeout&&clearTimeout(this.touchTimeout),this.touchTimeout=setTimeout((()=>this._maybeEnableCycle()),500+this._config.interval))}};this._swipeHelper=new q(this._element,t)}_keydown(t){if(/input|textarea/i.test(t.target.tagName))return;const e=J[t.key];e&&(t.preventDefault(),this._slide(this._directionToOrder(e)))}_getItemIndex(t){return this._getItems().indexOf(t)}_setActiveIndicatorElement(t){if(!this._indicatorsElement)return;const e=M.findOne(".active",this._indicatorsElement);e.classList.remove(U),e.removeAttribute("aria-current");const i=M.findOne(`[data-bs-slide-to="${t}"]`,this._indicatorsElement);i&&(i.classList.add(U),i.setAttribute("aria-current","true"))}_updateInterval(){const t=this._activeElement||this._getActive();if(!t)return;const e=Number.parseInt(t.getAttribute("data-bs-interval"),10);this._config.interval=e||this._config.defaultInterval}_slide(t,e=null){if(this._isSliding)return;const i=this._getActive(),s=t===K,n=e||((t,e,i,s)=>{const n=t.length;let o=t.indexOf(e);return-1===o?!i&&s?t[n-1]:t[0]:(o+=i?1:-1,s&&(o=(o+n)%n),t[Math.max(0,Math.min(o,n-1))])})(this._getItems(),i,s,this._config.wrap);if(n===i)return;const o=this._getItemIndex(n),r=e=>N.trigger(this._element,e,{relatedTarget:n,direction:this._orderToDirection(t),from:this._getItemIndex(i),to:o});if(r("slide.bs.carousel").defaultPrevented)return;if(!i||!n)return;const l=Boolean(this._interval);this.pause(),this._isSliding=!0,this._setActiveIndicatorElement(o),this._activeElement=n;const c=s?"carousel-item-start":"carousel-item-end",d=s?"carousel-item-next":"carousel-item-prev";n.classList.add(d),a(n),i.classList.add(c),n.classList.add(c),this._queueCallback((()=>{n.classList.remove(c,d),n.classList.add(U),i.classList.remove(U,d,c),this._isSliding=!1,r(H)}),i,this._isAnimated()),l&&this.cycle()}_isAnimated(){return this._element.classList.contains("slide")}_getActive(){return M.findOne(".active.carousel-item",this._element)}_getItems(){return M.find(".carousel-item",this._element)}_clearInterval(){this._interval&&(clearInterval(this._interval),this._interval=null)}_directionToOrder(t){return d()?t===R?F:K:t===R?K:F}_orderToDirection(t){return d()?t===F?R:z:t===F?z:R}static jQueryInterface(t){return this.each((function(){const e=tt.getOrCreateInstance(this,t);if("number"!=typeof t){if("string"==typeof t){if(void 0===e[t]||t.startsWith("_")||"constructor"===t)throw new TypeError(`No method named "${t}"`);e[t]()}}else e.to(t)}))}}N.on(document,"click.bs.carousel.data-api","[data-bs-slide], [data-bs-slide-to]",(function(t){const i=e(this);if(!i||!i.classList.contains(Q))return;t.preventDefault();const s=tt.getOrCreateInstance(i),n=this.getAttribute("data-bs-slide-to");return n?(s.to(n),void s._maybeEnableCycle()):"next"===j.getDataAttribute(this,"slide")?(s.next(),void s._maybeEnableCycle()):(s.prev(),void s._maybeEnableCycle())})),N.on(window,"load.bs.carousel.data-api",(()=>{const t=M.find('[data-bs-ride="carousel"]');for(const e of t)tt.getOrCreateInstance(e)})),u(tt);const et=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",it=".sticky-top",st="padding-right",nt="margin-right";const ot="show",rt="mousedown.bs.backdrop",at={className:"modal-backdrop",clickCallback:null,isAnimated:!1,isVisible:!0,rootElement:"body"},lt={className:"string",clickCallback:"(function|null)",isAnimated:"boolean",isVisible:"boolean",rootElement:"(element|string)"};var ct=class extends P{constructor(t){super(),this._config=this._getConfig(t),this._isAppended=!1,this._element=null}static get Default(){return at}static get DefaultType(){return lt}static get NAME(){return"backdrop"}show(t){if(!this._config.isVisible)return void h(t);this._append();const e=this._getElement();this._config.isAnimated&&a(e),e.classList.add(ot),this._emulateAnimation((()=>{h(t)}))}hide(t){this._config.isVisible?(this._getElement().classList.remove(ot),this._emulateAnimation((()=>{this.dispose(),h(t)}))):h(t)}dispose(){this._isAppended&&(N.off(this._element,rt),this._element.remove(),this._isAppended=!1)}_getElement(){if(!this._element){const t=document.createElement("div");t.className=this._config.className,this._config.isAnimated&&t.classList.add("fade"),this._element=t}return this._element}_configAfterMerge(t){return t.rootElement=n(t.rootElement),t}_append(){if(this._isAppended)return;const t=this._getElement();this._config.rootElement.append(t),N.on(t,rt,(()=>{h(this._config.clickCallback)})),this._isAppended=!0}_emulateAnimation(t){m(t,this._getElement(),this._config.isAnimated)}};const dt=".bs.focustrap",ut="backward",ht={autofocus:!0,trapElement:null},mt={autofocus:"boolean",trapElement:"element"};var _t=class extends P{constructor(t){super(),this._config=this._getConfig(t),this._isActive=!1,this._lastTabNavDirection=null}static get Default(){return ht}static get DefaultType(){return mt}static get NAME(){return"focustrap"}activate(){this._isActive||(this._config.autofocus&&this._config.trapElement.focus(),N.off(document,dt),N.on(document,"focusin.bs.focustrap",(t=>this._handleFocusin(t))),N.on(document,"keydown.tab.bs.focustrap",(t=>this._handleKeydown(t))),this._isActive=!0)}deactivate(){this._isActive&&(this._isActive=!1,N.off(document,dt))}_handleFocusin(t){const{trapElement:e}=this._config;if(t.target===document||t.target===e||e.contains(t.target))return;const i=M.focusableChildren(e);0===i.length?e.focus():this._lastTabNavDirection===ut?i[i.length-1].focus():i[0].focus()}_handleKeydown(t){"Tab"===t.key&&(this._lastTabNavDirection=t.shiftKey?ut:"forward")}};const ft="hidden.bs.modal",gt="show.bs.modal",pt="modal-open",bt="show",vt="modal-static",yt={backdrop:!0,focus:!0,keyboard:!0},Et={backdrop:"(boolean|string)",focus:"boolean",keyboard:"boolean"};class At extends Y{constructor(t,e){super(t,e),this._dialog=M.findOne(".modal-dialog",this._element),this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._isShown=!1,this._isTransitioning=!1,this._scrollBar=new class{constructor(){this._element=document.body}getWidth(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}hide(){const t=this.getWidth();this._disableOverFlow(),this._setElementAttributes(this._element,st,(e=>e+t)),this._setElementAttributes(et,st,(e=>e+t)),this._setElementAttributes(it,nt,(e=>e-t))}reset(){this._resetElementAttributes(this._element,"overflow"),this._resetElementAttributes(this._element,st),this._resetElementAttributes(et,st),this._resetElementAttributes(it,nt)}isOverflowing(){return this.getWidth()>0}_disableOverFlow(){this._saveInitialAttribute(this._element,"overflow"),this._element.style.overflow="hidden"}_setElementAttributes(t,e,i){const s=this.getWidth();this._applyManipulationCallback(t,(t=>{if(t!==this._element&&window.innerWidth>t.clientWidth+s)return;this._saveInitialAttribute(t,e);const n=window.getComputedStyle(t).getPropertyValue(e);t.style.setProperty(e,`${i(Number.parseFloat(n))}px`)}))}_saveInitialAttribute(t,e){const i=t.style.getPropertyValue(e);i&&j.setDataAttribute(t,e,i)}_resetElementAttributes(t,e){this._applyManipulationCallback(t,(t=>{const i=j.getDataAttribute(t,e);null!==i?(j.removeDataAttribute(t,e),t.style.setProperty(e,i)):t.style.removeProperty(e)}))}_applyManipulationCallback(t,e){if(s(t))e(t);else for(const i of M.find(t,this._element))e(i)}},this._addEventListeners()}static get Default(){return yt}static get DefaultType(){return Et}static get NAME(){return"modal"}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){this._isShown||this._isTransitioning||N.trigger(this._element,gt,{relatedTarget:t}).defaultPrevented||(this._isShown=!0,this._isTransitioning=!0,this._scrollBar.hide(),document.body.classList.add(pt),this._adjustDialog(),this._backdrop.show((()=>this._showElement(t))))}hide(){this._isShown&&!this._isTransitioning&&(N.trigger(this._element,"hide.bs.modal").defaultPrevented||(this._isShown=!1,this._isTransitioning=!0,this._focustrap.deactivate(),this._element.classList.remove(bt),this._queueCallback((()=>this._hideModal()),this._element,this._isAnimated())))}dispose(){for(const t of[window,this._dialog])N.off(t,".bs.modal");this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}handleUpdate(){this._adjustDialog()}_initializeBackDrop(){return new ct({isVisible:Boolean(this._config.backdrop),isAnimated:this._isAnimated()})}_initializeFocusTrap(){return new _t({trapElement:this._element})}_showElement(t){document.body.contains(this._element)||document.body.append(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.scrollTop=0;const e=M.findOne(".modal-body",this._dialog);e&&(e.scrollTop=0),a(this._element),this._element.classList.add(bt),this._queueCallback((()=>{this._config.focus&&this._focustrap.activate(),this._isTransitioning=!1,N.trigger(this._element,"shown.bs.modal",{relatedTarget:t})}),this._dialog,this._isAnimated())}_addEventListeners(){N.on(this._element,"keydown.dismiss.bs.modal",(t=>{if("Escape"===t.key)return this._config.keyboard?(t.preventDefault(),void this.hide()):void this._triggerBackdropTransition()})),N.on(window,"resize.bs.modal",(()=>{this._isShown&&!this._isTransitioning&&this._adjustDialog()})),N.on(this._element,"mousedown.dismiss.bs.modal",(t=>{N.one(this._element,"click.dismiss.bs.modal",(e=>{this._element===t.target&&this._element===e.target&&("static"!==this._config.backdrop?this._config.backdrop&&this.hide():this._triggerBackdropTransition())}))}))}_hideModal(){this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._backdrop.hide((()=>{document.body.classList.remove(pt),this._resetAdjustments(),this._scrollBar.reset(),N.trigger(this._element,ft)}))}_isAnimated(){return this._element.classList.contains("fade")}_triggerBackdropTransition(){if(N.trigger(this._element,"hidePrevented.bs.modal").defaultPrevented)return;const t=this._element.scrollHeight>document.documentElement.clientHeight,e=this._element.style.overflowY;"hidden"===e||this._element.classList.contains(vt)||(t||(this._element.style.overflowY="hidden"),this._element.classList.add(vt),this._queueCallback((()=>{this._element.classList.remove(vt),this._queueCallback((()=>{this._element.style.overflowY=e}),this._dialog)}),this._dialog),this._element.focus())}_adjustDialog(){const t=this._element.scrollHeight>document.documentElement.clientHeight,e=this._scrollBar.getWidth(),i=e>0;if(i&&!t){const t=d()?"paddingLeft":"paddingRight";this._element.style[t]=`${e}px`}if(!i&&t){const t=d()?"paddingRight":"paddingLeft";this._element.style[t]=`${e}px`}}_resetAdjustments(){this._element.style.paddingLeft="",this._element.style.paddingRight=""}static jQueryInterface(t,e){return this.each((function(){const i=At.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===i[t])throw new TypeError(`No method named "${t}"`);i[t](e)}}))}}N.on(document,"click.bs.modal.data-api",'[data-bs-toggle="modal"]',(function(t){const i=e(this);["A","AREA"].includes(this.tagName)&&t.preventDefault(),N.one(i,gt,(t=>{t.defaultPrevented||N.one(i,ft,(()=>{o(this)&&this.focus()}))}));const s=M.findOne(".modal.show");s&&At.getInstance(s).hide(),At.getOrCreateInstance(i).toggle(this)})),((t,i="hide")=>{const s=`click.dismiss${t.EVENT_KEY}`,n=t.NAME;N.on(document,s,`[data-bs-dismiss="${n}"]`,(function(s){if(["A","AREA"].includes(this.tagName)&&s.preventDefault(),r(this))return;const o=e(this)||this.closest(`.${n}`);t.getOrCreateInstance(o)[i]()}))})(At),u(At);const wt=document.getElementById("lightbox");wt&&wt.addEventListener("show.bs.modal",(t=>{const e=t.relatedTarget.getAttribute("data-bs-src");wt.querySelector("img").src=e}));const kt=document.getElementById("modal-video");kt.addEventListener("shown.bs.modal",(t=>{kt.querySelector("iframe").src+="&autoplay=1"})),document.documentElement.style.setProperty("--scrollbar-width",window.innerWidth-document.documentElement.clientWidth+"px")}();