! function (e) {
	"function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function (c) {
	function e() { }

	function u(e, t) {
		m.ev.on(n + e + b, t)
	}

	function d(e, t, n, i) {
		var a = document.createElement("div");
		return a.className = "mfp-" + e, n && (a.innerHTML = n), i ? t && t.appendChild(a) : (a = c(a), t && a.appendTo(t)), a
	}

	function p(e, t) {
		m.ev.triggerHandler(n + e, t), m.st.callbacks && (e = e.charAt(0).toLowerCase() + e.slice(1), m.st.callbacks[e] && m.st.callbacks[e].apply(m, c.isArray(t) ? t : [t]))
	}

	function f(e) {
		return e === t && m.currTemplate.closeBtn || (m.currTemplate.closeBtn = c(m.st.closeMarkup.replace("%title%", m.st.tClose)), t = e), m.currTemplate.closeBtn
	}

	function r() {
		c.magnificPopup.instance || ((m = new e).init(), c.magnificPopup.instance = m)
	}
	var m, i, g, a, h, t, l = "Close",
		v = "BeforeClose",
		y = "MarkupParse",
		k = "Open",
		o = "Change",
		n = "mfp",
		b = "." + n,
		w = "mfp-ready",
		s = "mfp-removing",
		x = "mfp-prevent-close",
		C = !!window.jQuery,
		T = c(window);
	e.prototype = {
		constructor: e,
		init: function () {
			var e = navigator.appVersion;
			m.isLowIE = m.isIE8 = document.all && !document.addEventListener, m.isAndroid = /android/gi.test(e), m.isIOS = /iphone|ipad|ipod/gi.test(e), m.supportsTransition = function () {
				var e = document.createElement("p").style,
					t = ["ms", "O", "Moz", "Webkit"];
				if (void 0 !== e.transition) return !0;
				for (; t.length;)
					if (t.pop() + "Transition" in e) return !0;
				return !1
			}(), m.probablyMobile = m.isAndroid || m.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), g = c(document), m.popupsCache = {}
		},
		open: function (e) {
			if (!1 === e.isObj) {
				m.items = e.items.toArray(), m.index = 0;
				for (var t, n = e.items, i = 0; i < n.length; i++)
					if ((t = n[i]).parsed && (t = t.el[0]), t === e.el[0]) {
						m.index = i;
						break
					}
			} else m.items = c.isArray(e.items) ? e.items : [e.items], m.index = e.index || 0; if (!m.isOpen) {
				m.types = [], h = "", e.mainEl && e.mainEl.length ? m.ev = e.mainEl.eq(0) : m.ev = g, e.key ? (m.popupsCache[e.key] || (m.popupsCache[e.key] = {}), m.currTemplate = m.popupsCache[e.key]) : m.currTemplate = {}, m.st = c.extend(!0, {}, c.magnificPopup.defaults, e), m.fixedContentPos = "auto" === m.st.fixedContentPos ? !m.probablyMobile : m.st.fixedContentPos, m.st.modal && (m.st.closeOnContentClick = !1, m.st.closeOnBgClick = !1, m.st.showCloseBtn = !1, m.st.enableEscapeKey = !1), m.bgOverlay || (m.bgOverlay = d("bg").on("click" + b, function () {
					m.close()
				}), m.wrap = d("wrap").attr("tabindex", -1).on("click" + b, function (e) {
					m._checkIfClose(e.target) && m.close()
				}), m.container = d("container", m.wrap)), m.contentContainer = d("content"), m.st.preloader && (m.preloader = d("preloader", m.container, m.st.tLoading));
				var a = c.magnificPopup.modules;
				for (i = 0; i < a.length; i++) {
					var r = (r = a[i]).charAt(0).toUpperCase() + r.slice(1);
					m["init" + r].call(m)
				}
				p("BeforeOpen"), m.st.showCloseBtn && (m.st.closeBtnInside ? (u(y, function (e, t, n, i) {
					n.close_replaceWith = f(i.type)
				}), h += " mfp-close-btn-in") : m.wrap.append(f())), m.st.alignTop && (h += " mfp-align-top"), m.fixedContentPos ? m.wrap.css({
					overflow: m.st.overflowY,
					overflowX: "hidden",
					overflowY: m.st.overflowY
				}) : m.wrap.css({
					top: T.scrollTop(),
					position: "absolute"
				}), !1 !== m.st.fixedBgPos && ("auto" !== m.st.fixedBgPos || m.fixedContentPos) || m.bgOverlay.css({
					height: g.height(),
					position: "absolute"
				}), m.st.enableEscapeKey && g.on("keyup" + b, function (e) {
					27 === e.keyCode && m.close()
				}), T.on("resize" + b, function () {
					m.updateSize()
				}), m.st.closeOnContentClick || (h += " mfp-auto-cursor"), h && m.wrap.addClass(h);
				var o = m.wH = T.height(),
					s = {};
				m.fixedContentPos && m._hasScrollBar(o) && ((l = m._getScrollbarSize()) && (s.marginRight = l)), m.fixedContentPos && (m.isIE7 ? c("body, html").css("overflow", "hidden") : s.overflow = "hidden");
				var l = m.st.mainClass;
				return m.isIE7 && (l += " mfp-ie7"), l && m._addClassToMFP(l), m.updateItemHTML(), p("BuildControls"), c("html").css(s), m.bgOverlay.add(m.wrap).prependTo(m.st.prependTo || c(document.body)), m._lastFocusedEl = document.activeElement, setTimeout(function () {
					m.content ? (m._addClassToMFP(w), m._setFocus()) : m.bgOverlay.addClass(w), g.on("focusin" + b, m._onFocusIn)
				}, 16), m.isOpen = !0, m.updateSize(o), p(k), e
			}
			m.updateItemHTML()
		},
		close: function () {
			m.isOpen && (p(v), m.isOpen = !1, m.st.removalDelay && !m.isLowIE && m.supportsTransition ? (m._addClassToMFP(s), setTimeout(function () {
				m._close()
			}, m.st.removalDelay)) : m._close())
		},
		_close: function () {
			p(l);
			var e = s + " " + w + " ";
			m.bgOverlay.detach(), m.wrap.detach(), m.container.empty(), m.st.mainClass && (e += m.st.mainClass + " "), m._removeClassFromMFP(e), m.fixedContentPos && (e = {
				marginRight: ""
			}, m.isIE7 ? c("body, html").css("overflow", "") : e.overflow = "", c("html").css(e)), g.off("keyup.mfp focusin" + b), m.ev.off(b), m.wrap.attr("class", "mfp-wrap").removeAttr("style"), m.bgOverlay.attr("class", "mfp-bg"), m.container.attr("class", "mfp-container"), !m.st.showCloseBtn || m.st.closeBtnInside && !0 !== m.currTemplate[m.currItem.type] || m.currTemplate.closeBtn && m.currTemplate.closeBtn.detach(), m.st.autoFocusLast && m._lastFocusedEl && c(m._lastFocusedEl).focus(), m.currItem = null, m.content = null, m.currTemplate = null, m.prevHeight = 0, p("AfterClose")
		},
		updateSize: function (e) {
			var t;
			m.isIOS ? (t = document.documentElement.clientWidth / window.innerWidth, t = window.innerHeight * t, m.wrap.css("height", t), m.wH = t) : m.wH = e || T.height(), m.fixedContentPos || m.wrap.css("height", m.wH), p("Resize")
		},
		updateItemHTML: function () {
			var e = m.items[m.index];
			m.contentContainer.detach(), m.content && m.content.detach(), e.parsed || (e = m.parseEl(m.index));
			var t = e.type;
			p("BeforeChange", [m.currItem ? m.currItem.type : "", t]), m.currItem = e, m.currTemplate[t] || (n = !!m.st[t] && m.st[t].markup, p("FirstMarkupParse", n), m.currTemplate[t] = !n || c(n)), a && a !== e.type && m.container.removeClass("mfp-" + a + "-holder");
			var n = m["get" + t.charAt(0).toUpperCase() + t.slice(1)](e, m.currTemplate[t]);
			m.appendContent(n, t), e.preloaded = !0, p(o, e), a = e.type, m.container.prepend(m.contentContainer), p("AfterChange")
		},
		appendContent: function (e, t) {
			(m.content = e) ? m.st.showCloseBtn && m.st.closeBtnInside && !0 === m.currTemplate[t] ? m.content.find(".mfp-close").length || m.content.append(f()) : m.content = e : m.content = "", p("BeforeAppend"), m.container.addClass("mfp-" + t + "-holder"), m.contentContainer.append(m.content)
		},
		parseEl: function (e) {
			var t, n = m.items[e];
			if ((n = n.tagName ? {
				el: c(n)
			} : (t = n.type, {
				data: n,
				src: n.src
			})).el) {
				for (var i = m.types, a = 0; a < i.length; a++)
					if (n.el.hasClass("mfp-" + i[a])) {
						t = i[a];
						break
					}
				n.src = n.el.attr("data-mfp-src"), n.src || (n.src = n.el.attr("href"))
			}
			return n.type = t || m.st.type || "inline", n.index = e, n.parsed = !0, m.items[e] = n, p("ElementParse", n), m.items[e]
		},
		addGroup: function (t, n) {
			function e(e) {
				e.mfpEl = this, m._openClick(e, t, n)
			}
			var i = "click.magnificPopup";
			(n = n || {}).mainEl = t, n.items ? (n.isObj = !0, t.off(i).on(i, e)) : (n.isObj = !1, n.delegate ? t.off(i).on(i, n.delegate, e) : (n.items = t).off(i).on(i, e))
		},
		_openClick: function (e, t, n) {
			if ((void 0 !== n.midClick ? n : c.magnificPopup.defaults).midClick || !(2 === e.which || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey)) {
				var i = (void 0 !== n.disableOn ? n : c.magnificPopup.defaults).disableOn;
				if (i)
					if (c.isFunction(i)) {
						if (!i.call(m)) return !0
					} else if (T.width() < i) return !0;
				e.type && (e.preventDefault(), m.isOpen && e.stopPropagation()), n.el = c(e.mfpEl), n.delegate && (n.items = t.find(n.delegate)), m.open(n)
			}
		},
		updateStatus: function (e, t) {
			var n;
			m.preloader && (i !== e && m.container.removeClass("mfp-s-" + i), t || "loading" !== e || (t = m.st.tLoading), p("UpdateStatus", n = {
				status: e,
				text: t
			}), e = n.status, t = n.text, m.preloader.html(t), m.preloader.find("a").on("click", function (e) {
				e.stopImmediatePropagation()
			}), m.container.addClass("mfp-s-" + e), i = e)
		},
		_checkIfClose: function (e) {
			if (!c(e).hasClass(x)) {
				var t = m.st.closeOnContentClick,
					n = m.st.closeOnBgClick;
				if (t && n) return !0;
				if (!m.content || c(e).hasClass("mfp-close") || m.preloader && e === m.preloader[0]) return !0;
				if (e === m.content[0] || c.contains(m.content[0], e)) {
					if (t) return !0
				} else if (n && c.contains(document, e)) return !0;
				return !1
			}
		},
		_addClassToMFP: function (e) {
			m.bgOverlay.addClass(e), m.wrap.addClass(e)
		},
		_removeClassFromMFP: function (e) {
			this.bgOverlay.removeClass(e), m.wrap.removeClass(e)
		},
		_hasScrollBar: function (e) {
			return (m.isIE7 ? g.height() : document.body.scrollHeight) > (e || T.height())
		},
		_setFocus: function () {
			(m.st.focus ? m.content.find(m.st.focus).eq(0) : m.wrap).focus()
		},
		_onFocusIn: function (e) {
			return e.target === m.wrap[0] || c.contains(m.wrap[0], e.target) ? void 0 : (m._setFocus(), !1)
		},
		_parseMarkup: function (a, e, t) {
			var r;
			t.data && (e = c.extend(t.data, e)), p(y, [a, e, t]), c.each(e, function (e, t) {
				return void 0 === t || !1 === t || void (1 < (r = e.split("_")).length ? 0 < (n = a.find(b + "-" + r[0])).length && ("replaceWith" === (i = r[1]) ? n[0] !== t[0] && n.replaceWith(t) : "img" === i ? n.is("img") ? n.attr("src", t) : n.replaceWith(c("<img>").attr("src", t).attr("class", n.attr("class"))) : n.attr(r[1], t)) : a.find(b + "-" + e).html(t));
				var n, i
			})
		},
		_getScrollbarSize: function () {
			var e;
			return void 0 === m.scrollbarSize && ((e = document.createElement("div")).style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e), m.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e)), m.scrollbarSize
		}
	}, c.magnificPopup = {
		instance: null,
		proto: e.prototype,
		modules: [],
		open: function (e, t) {
			return r(), (e = e ? c.extend(!0, {}, e) : {}).isObj = !0, e.index = t || 0, this.instance.open(e)
		},
		close: function () {
			return c.magnificPopup.instance && c.magnificPopup.instance.close()
		},
		registerModule: function (e, t) {
			t.options && (c.magnificPopup.defaults[e] = t.options), c.extend(this.proto, t.proto), this.modules.push(e)
		},
		defaults: {
			disableOn: 0,
			key: null,
			midClick: !1,
			mainClass: "",
			preloader: !0,
			focus: "",
			closeOnContentClick: !1,
			closeOnBgClick: !0,
			closeBtnInside: !0,
			showCloseBtn: !0,
			enableEscapeKey: !0,
			modal: !1,
			alignTop: !1,
			removalDelay: 0,
			prependTo: null,
			fixedContentPos: "auto",
			fixedBgPos: "auto",
			overflowY: "auto",
			closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
			tClose: "Close (Esc)",
			tLoading: "Loading...",
			autoFocusLast: !0
		}
	}, c.fn.magnificPopup = function (e) {
		r();
		var t, n, i, a = c(this);
		return "string" == typeof e ? "open" === e ? (t = C ? a.data("magnificPopup") : a[0].magnificPopup, n = parseInt(arguments[1], 10) || 0, i = t.items ? t.items[n] : (i = a, t.delegate && (i = i.find(t.delegate)), i.eq(n)), m._openClick({
			mfpEl: i
		}, a, t)) : m.isOpen && m[e].apply(m, Array.prototype.slice.call(arguments, 1)) : (e = c.extend(!0, {}, e), C ? a.data("magnificPopup", e) : a[0].magnificPopup = e, m.addGroup(a, e)), a
	};

	function M() {
		I && (O.after(I.addClass(S)).detach(), I = null)
	}
	var S, O, I, j = "inline";
	c.magnificPopup.registerModule(j, {
		options: {
			hiddenClass: "hide",
			markup: "",
			tNotFound: "Content not found"
		},
		proto: {
			initInline: function () {
				m.types.push(j), u(l + "." + j, function () {
					M()
				})
			},
			getInline: function (e, t) {
				if (M(), e.src) {
					var n, i = m.st.inline,
						a = c(e.src);
					return a.length ? ((n = a[0].parentNode) && n.tagName && (O || (S = i.hiddenClass, O = d(S), S = "mfp-" + S), I = a.after(O).detach().removeClass(S)), m.updateStatus("ready")) : (m.updateStatus("error", i.tNotFound), a = c("<div>")), e.inlineElement = a
				}
				return m.updateStatus("ready"), m._parseMarkup(t, {}, e), t
			}
		}
	});

	function z() {
		P && c(document.body).removeClass(P)
	}

	function E() {
		z(), m.req && m.req.abort()
	}
	var P, A = "ajax";
	c.magnificPopup.registerModule(A, {
		options: {
			settings: null,
			cursor: "mfp-ajax-cur",
			tError: '<a href="%url%">The content</a> could not be loaded.'
		},
		proto: {
			initAjax: function () {
				m.types.push(A), P = m.st.ajax.cursor, u(l + "." + A, E), u("BeforeChange." + A, E)
			},
			getAjax: function (i) {
				P && c(document.body).addClass(P), m.updateStatus("loading");
				var e = c.extend({
					url: i.src,
					success: function (e, t, n) {
						n = {
							data: e,
							xhr: n
						};
						p("ParseAjax", n), m.appendContent(c(n.data), A), i.finished = !0, z(), m._setFocus(), setTimeout(function () {
							m.wrap.addClass(w)
						}, 16), m.updateStatus("ready"), p("AjaxContentAdded")
					},
					error: function () {
						z(), i.finished = i.loadError = !0, m.updateStatus("error", m.st.ajax.tError.replace("%url%", i.src))
					}
				}, m.st.ajax.settings);
				return m.req = c.ajax(e), ""
			}
		}
	});
	var _;
	c.magnificPopup.registerModule("image", {
		options: {
			markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
			cursor: "mfp-zoom-out-cur",
			titleSrc: "title",
			verticalFit: !0,
			tError: '<a href="%url%">The image</a> could not be loaded.'
		},
		proto: {
			initImage: function () {
				var e = m.st.image,
					t = ".image";
				m.types.push("image"), u(k + t, function () {
					"image" === m.currItem.type && e.cursor && c(document.body).addClass(e.cursor)
				}), u(l + t, function () {
					e.cursor && c(document.body).removeClass(e.cursor), T.off("resize" + b)
				}), u("Resize" + t, m.resizeImage), m.isLowIE && u("AfterChange", m.resizeImage)
			},
			resizeImage: function () {
				var e, t = m.currItem;
				t && t.img && m.st.image.verticalFit && (e = 0, m.isLowIE && (e = parseInt(t.img.css("padding-top"), 10) + parseInt(t.img.css("padding-bottom"), 10)), t.img.css("max-height", m.wH - e))
			},
			_onImageHasSize: function (e) {
				e.img && (e.hasSize = !0, _ && clearInterval(_), e.isCheckingImgSize = !1, p("ImageHasSize", e), e.imgHidden && (m.content && m.content.removeClass("mfp-loading"), e.imgHidden = !1))
			},
			findImageSize: function (t) {
				var n = 0,
					i = t.img[0],
					a = function (e) {
						_ && clearInterval(_), _ = setInterval(function () {
							return 0 < i.naturalWidth ? void m._onImageHasSize(t) : (200 < n && clearInterval(_), void (3 === ++n ? a(10) : 40 === n ? a(50) : 100 === n && a(500)))
						}, e)
					};
				a(1)
			},
			getImage: function (e, t) {
				var n, i = 0,
					a = function () {
						e && (e.img[0].complete ? (e.img.off(".mfploader"), e === m.currItem && (m._onImageHasSize(e), m.updateStatus("ready")), e.hasSize = !0, e.loaded = !0, p("ImageLoadComplete")) : ++i < 200 ? setTimeout(a, 100) : r())
					},
					r = function () {
						e && (e.img.off(".mfploader"), e === m.currItem && (m._onImageHasSize(e), m.updateStatus("error", o.tError.replace("%url%", e.src))), e.hasSize = !0, e.loaded = !0, e.loadError = !0)
					},
					o = m.st.image,
					s = t.find(".mfp-img");
				return s.length && ((n = document.createElement("img")).className = "mfp-img", e.el && e.el.find("img").length && (n.alt = e.el.find("img").attr("alt")), e.img = c(n).on("load.mfploader", a).on("error.mfploader", r), n.src = e.src, s.is("img") && (e.img = e.img.clone()), 0 < (n = e.img[0]).naturalWidth ? e.hasSize = !0 : n.width || (e.hasSize = !1)), m._parseMarkup(t, {
					title: function (e) {
						if (e.data && void 0 !== e.data.title) return e.data.title;
						var t = m.st.image.titleSrc;
						if (t) {
							if (c.isFunction(t)) return t.call(m, e);
							if (e.el) return e.el.attr(t) || ""
						}
						return ""
					}(e),
					img_replaceWith: e.img
				}, e), m.resizeImage(), e.hasSize ? (_ && clearInterval(_), e.loadError ? (t.addClass("mfp-loading"), m.updateStatus("error", o.tError.replace("%url%", e.src))) : (t.removeClass("mfp-loading"), m.updateStatus("ready"))) : (m.updateStatus("loading"), e.loading = !0, e.hasSize || (e.imgHidden = !0, t.addClass("mfp-loading"), m.findImageSize(e))), t
			}
		}
	});
	var F;
	c.magnificPopup.registerModule("zoom", {
		options: {
			enabled: !1,
			easing: "ease-in-out",
			duration: 300,
			opener: function (e) {
				return e.is("img") ? e : e.find("img")
			}
		},
		proto: {
			initZoom: function () {
				var e, t, n, i, a, r, o = m.st.zoom,
					s = ".zoom";
				o.enabled && m.supportsTransition && (i = o.duration, a = function (e) {
					var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
						n = "all " + o.duration / 1e3 + "s " + o.easing,
						i = {
							position: "fixed",
							zIndex: 9999,
							left: 0,
							top: 0,
							"-webkit-backface-visibility": "hidden"
						},
						e = "transition";
					return i["-webkit-" + e] = i["-moz-" + e] = i["-o-" + e] = i[e] = n, t.css(i), t
				}, r = function () {
					m.content.css("visibility", "visible")
				}, u("BuildControls" + s, function () {
					m._allowZoom() && (clearTimeout(t), m.content.css("visibility", "hidden"), (e = m._getItemToZoom()) ? ((n = a(e)).css(m._getOffset()), m.wrap.append(n), t = setTimeout(function () {
						n.css(m._getOffset(!0)), t = setTimeout(function () {
							r(), setTimeout(function () {
								n.remove(), e = n = null, p("ZoomAnimationEnded")
							}, 16)
						}, i)
					}, 16)) : r())
				}), u(v + s, function () {
					if (m._allowZoom()) {
						if (clearTimeout(t), m.st.removalDelay = i, !e) {
							if (!(e = m._getItemToZoom())) return;
							n = a(e)
						}
						n.css(m._getOffset(!0)), m.wrap.append(n), m.content.css("visibility", "hidden"), setTimeout(function () {
							n.css(m._getOffset())
						}, 16)
					}
				}), u(l + s, function () {
					m._allowZoom() && (r(), n && n.remove(), e = null)
				}))
			},
			_allowZoom: function () {
				return "image" === m.currItem.type
			},
			_getItemToZoom: function () {
				return !!m.currItem.hasSize && m.currItem.img
			},
			_getOffset: function (e) {
				var t = e ? m.currItem.img : m.st.zoom.opener(m.currItem.el || m.currItem),
					n = t.offset(),
					i = parseInt(t.css("padding-top"), 10),
					e = parseInt(t.css("padding-bottom"), 10);
				n.top -= c(window).scrollTop() - i;
				i = {
					width: t.width(),
					height: (C ? t.innerHeight() : t[0].offsetHeight) - e - i
				};
				return void 0 === F && (F = void 0 !== document.createElement("p").style.MozTransform), F ? i["-moz-transform"] = i.transform = "translate(" + n.left + "px," + n.top + "px)" : (i.left = n.left, i.top = n.top), i
			}
		}
	});

	function L(e) {
		var t;
		!m.currTemplate[q] || (t = m.currTemplate[q].find("iframe")).length && (e || (t[0].src = "//about:blank"), m.isIE8 && t.css("display", e ? "block" : "none"))
	}
	var q = "iframe";
	c.magnificPopup.registerModule(q, {
		options: {
			markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
			srcAction: "iframe_src",
			patterns: {
				youtube: {
					index: "youtube.com",
					id: "v=",
					src: "http://www.youtube.com/embed/%id%?autoplay=1"
				},
				vimeo: {
					index: "vimeo.com/",
					id: "/",
					src: "//player.vimeo.com/video/%id%?autoplay=1"
				},
				gmaps: {
					index: "//maps.google.",
					src: "%id%&output=embed"
				}
			}
		},
		proto: {
			initIframe: function () {
				m.types.push(q), u("BeforeChange", function (e, t, n) {
					t !== n && (t === q ? L() : n === q && L(!0))
				}), u(l + "." + q, function () {
					L()
				})
			},
			getIframe: function (e, t) {
				var n = e.src,
					i = m.st.iframe;
				c.each(i.patterns, function () {
					return -1 < n.indexOf(this.index) ? (this.id && (n = "string" == typeof this.id ? n.substr(n.lastIndexOf(this.id) + this.id.length, n.length) : this.id.call(this, n)), n = this.src.replace("%id%", n), !1) : void 0
				});
				var a = {};
				return i.srcAction && (a[i.srcAction] = n), m._parseMarkup(t, a, e), m.updateStatus("ready"), t
			}
		}
	});

	function D(e) {
		var t = m.items.length;
		return t - 1 < e ? e - t : e < 0 ? t + e : e
	}

	function $(e, t, n) {
		return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, n)
	}
	c.magnificPopup.registerModule("gallery", {
		options: {
			enabled: !1,
			arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
			preload: [0, 2],
			navigateByImgClick: !0,
			arrows: !0,
			tPrev: "Previous (Left arrow key)",
			tNext: "Next (Right arrow key)",
			tCounter: "%curr% of %total%"
		},
		proto: {
			initGallery: function () {
				var r = m.st.gallery,
					e = ".mfp-gallery";
				return m.direction = !0, !(!r || !r.enabled) && (h += " mfp-gallery", u(k + e, function () {
					r.navigateByImgClick && m.wrap.on("click" + e, ".mfp-img", function () {
						return 1 < m.items.length ? (m.next(), !1) : void 0
					}), g.on("keydown" + e, function (e) {
						37 === e.keyCode ? m.prev() : 39 === e.keyCode && m.next()
					})
				}), u("UpdateStatus" + e, function (e, t) {
					t.text && (t.text = $(t.text, m.currItem.index, m.items.length))
				}), u(y + e, function (e, t, n, i) {
					var a = m.items.length;
					n.counter = 1 < a ? $(r.tCounter, i.index, a) : ""
				}), u("BuildControls" + e, function () {
					var e, t;
					1 < m.items.length && r.arrows && !m.arrowLeft && (t = r.arrowMarkup, e = m.arrowLeft = c(t.replace(/%title%/gi, r.tPrev).replace(/%dir%/gi, "left")).addClass(x), t = m.arrowRight = c(t.replace(/%title%/gi, r.tNext).replace(/%dir%/gi, "right")).addClass(x), e.click(function () {
						m.prev()
					}), t.click(function () {
						m.next()
					}), m.container.append(e.add(t)))
				}), u(o + e, function () {
					m._preloadTimeout && clearTimeout(m._preloadTimeout), m._preloadTimeout = setTimeout(function () {
						m.preloadNearbyImages(), m._preloadTimeout = null
					}, 16)
				}), void u(l + e, function () {
					g.off(e), m.wrap.off("click" + e), m.arrowRight = m.arrowLeft = null
				}))
			},
			next: function () {
				m.direction = !0, m.index = D(m.index + 1), m.updateItemHTML()
			},
			prev: function () {
				m.direction = !1, m.index = D(m.index - 1), m.updateItemHTML()
			},
			goTo: function (e) {
				m.direction = e >= m.index, m.index = e, m.updateItemHTML()
			},
			preloadNearbyImages: function () {
				for (var e = m.st.gallery.preload, t = Math.min(e[0], m.items.length), n = Math.min(e[1], m.items.length), i = 1; i <= (m.direction ? n : t); i++) m._preloadItem(m.index + i);
				for (i = 1; i <= (m.direction ? t : n); i++) m._preloadItem(m.index - i)
			},
			_preloadItem: function (e) {
				var t;
				e = D(e), m.items[e].preloaded || ((t = m.items[e]).parsed || (t = m.parseEl(e)), p("LazyLoad", t), "image" === t.type && (t.img = c('<img class="mfp-img" />').on("load.mfploader", function () {
					t.hasSize = !0
				}).on("error.mfploader", function () {
					t.hasSize = !0, t.loadError = !0, p("LazyLoadError", t)
				}).attr("src", t.src)), t.preloaded = !0)
			}
		}
	});
	var N = "retina";
	c.magnificPopup.registerModule(N, {
		options: {
			replaceSrc: function (e) {
				return e.src.replace(/\.\w+$/, function (e) {
					return "@2x" + e
				})
			},
			ratio: 1
		},
		proto: {
			initRetina: function () {
				var n, i;
				1 < window.devicePixelRatio && (n = m.st.retina, i = n.ratio, 1 < (i = isNaN(i) ? i() : i) && (u("ImageHasSize." + N, function (e, t) {
					t.img.css({
						"max-width": t.img[0].naturalWidth / i,
						width: "100%"
					})
				}), u("ElementParse." + N, function (e, t) {
					t.src = n.replaceSrc(t, i)
				})))
			}
		}
	}), r()
}),
	function () {
		var l, c, r, t, v, e, u, y, i, a, n, s, k, b, o, d, p, f, m, g, h, w, x, C, T, M, S, O, I, j, z, E, P, A, _, F, L, q, D, $, N, H, B, R, J = [].slice,
			W = {}.hasOwnProperty,
			Q = function (e, t) {
				for (var n in t) W.call(t, n) && (e[n] = t[n]);

				function i() {
					this.constructor = e
				}
				return i.prototype = t.prototype, e.prototype = new i, e.__super__ = t.prototype, e
			},
			Y = [].indexOf || function (e) {
				for (var t = 0, n = this.length; t < n; t++)
					if (t in this && this[t] === e) return t;
				return -1
			};

		function Z() { }
		for (d = {
			catchupTime: 100,
			initialRate: .03,
			minTime: 250,
			ghostTime: 100,
			maxProgressPerFrame: 20,
			easeFactor: 1.25,
			startOnPageLoad: !0,
			restartOnPushState: !0,
			restartOnRequestAfter: 500,
			target: "body",
			elements: {
				checkInterval: 100,
				selectors: ["body"]
			},
			eventLag: {
				minSamples: 10,
				sampleCount: 3,
				lagThreshold: 3
			},
			ajax: {
				trackMethods: ["GET"],
				trackWebSockets: !0,
				ignoreURLs: []
			}
		}, C = function () {
			var e;
			return null != (e = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance.now() : void 0) ? e : +new Date
		}, M = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, o = window.cancelAnimationFrame || window.mozCancelAnimationFrame, null == M && (M = function (e) {
			return setTimeout(e, 50)
		}, o = function (e) {
			return clearTimeout(e)
		}), O = function (t) {
			var n = C(),
				i = function () {
					var e = C() - n;
					return 33 <= e ? (n = C(), t(e, function () {
						return M(i)
					})) : setTimeout(i, 33 - e)
				};
			return i()
		}, S = function () {
			var e = arguments[0],
				t = arguments[1],
				n = 3 <= arguments.length ? J.call(arguments, 2) : [];
			return "function" == typeof e[t] ? e[t].apply(e, n) : e[t]
		}, p = function () {
			for (var e, t, n, i = arguments[0], a = 2 <= arguments.length ? J.call(arguments, 1) : [], r = 0, o = a.length; r < o; r++)
				if (t = a[r])
					for (e in t) W.call(t, e) && (n = t[e], null != i[e] && "object" == typeof i[e] && null != n && "object" == typeof n ? p(i[e], n) : i[e] = n);
			return i
		}, s = function (e) {
			for (var t, n, i = t = 0, a = 0, r = e.length; a < r; a++) n = e[a], i += Math.abs(n), t++;
			return i / t
		}, m = function (e, t) {
			var n, i;
			if (null == e && (e = "options"), null == t && (t = !0), i = document.querySelector("[data-pace-" + e + "]")) {
				if (n = i.getAttribute("data-pace-" + e), !t) return n;
				try {
					return JSON.parse(n)
				} catch (e) {
					return "undefined" != typeof console && null !== console ? console.error("Error parsing inline pace options", e) : void 0
				}
			}
		}, Z.prototype.on = function (e, t, n, i) {
			var a;
			return null == i && (i = !1), null == this.bindings && (this.bindings = {}), null == (a = this.bindings)[e] && (a[e] = []), this.bindings[e].push({
				handler: t,
				ctx: n,
				once: i
			})
		}, Z.prototype.once = function (e, t, n) {
			return this.on(e, t, n, !0)
		}, Z.prototype.off = function (e, t) {
			var n, i, a;
			if (null != (null != (i = this.bindings) ? i[e] : void 0)) {
				if (null == t) return delete this.bindings[e];
				for (n = 0, a = []; n < this.bindings[e].length;) this.bindings[e][n].handler === t ? a.push(this.bindings[e].splice(n, 1)) : a.push(n++);
				return a
			}
		}, Z.prototype.trigger = function () {
			var e, t, n, i, a, r, o = arguments[0],
				s = 2 <= arguments.length ? J.call(arguments, 1) : [];
			if (null != (i = this.bindings) && i[o]) {
				for (n = 0, r = []; n < this.bindings[o].length;) t = (a = this.bindings[o][n]).handler, e = a.ctx, a = a.once, t.apply(null != e ? e : this, s), a ? r.push(this.bindings[o].splice(n, 1)) : r.push(n++);
				return r
			}
		}, R = Z, v = window.Pace || {}, window.Pace = v, p(v, R.prototype), T = v.options = p({}, d, window.paceOptions, m()), q = 0, $ = (H = ["ajax", "document", "eventLag", "elements"]).length; q < $; q++)!0 === T[E = H[q]] && (T[E] = d[E]);

		function X() {
			return X.__super__.constructor.apply(this, arguments)
		}

		function K() {
			this.progress = 0
		}

		function U() {
			this.bindings = {}
		}

		function G() {
			var t, r = this;
			G.__super__.constructor.apply(this, arguments), t = function (i) {
				var a = i.open;
				return i.open = function (e, t, n) {
					return z(e) && r.trigger("request", {
						type: e,
						url: t,
						request: i
					}), a.apply(i, arguments)
				}
			}, window.XMLHttpRequest = function (e) {
				e = new L(e);
				return t(e), e
			};
			try {
				f(window.XMLHttpRequest, L)
			} catch (e) { }
			if (null != F) {
				window.XDomainRequest = function () {
					var e = new F;
					return t(e), e
				};
				try {
					f(window.XDomainRequest, F)
				} catch (e) { }
			}
			if (null != _ && T.ajax.trackWebSockets) {
				window.WebSocket = function (e, t) {
					var n = null != t ? new _(e, t) : new _(e);
					return z("socket") && r.trigger("request", {
						type: "socket",
						url: e,
						protocols: t,
						request: n
					}), n
				};
				try {
					f(window.WebSocket, _)
				} catch (e) { }
			}
		}

		function V() {
			var e = this;
			this.elements = [], g().on("request", function () {
				return e.watch.apply(e, arguments)
			})
		}

		function ee(e) {
			this.selector = e, this.progress = 0, this.check()
		}

		function te() {
			var e, t, n = this;
			this.progress = null != (t = this.states[document.readyState]) ? t : 100, e = document.onreadystatechange, document.onreadystatechange = function () {
				return null != n.states[document.readyState] && (n.progress = n.states[document.readyState]), "function" == typeof e ? e.apply(null, arguments) : void 0
			}
		}

		function ne(e) {
			this.source = e, this.last = this.sinceLastUpdate = 0, this.rate = T.initialRate, this.catchup = 0, this.progress = this.lastProgress = 0, null != this.source && (this.progress = S(this.source, "progress"))
		}
		R = Error, Q(X, R), t = X, K.prototype.getElement = function () {
			var e;
			if (null == this.el) {
				if (!(e = document.querySelector(T.target))) throw new t;
				this.el = document.createElement("div"), this.el.className = "pace pace-active", document.body.className = document.body.className.replace(/pace-done/g, ""), document.body.className += " pace-running", this.el.innerHTML = '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>', null != e.firstChild ? e.insertBefore(this.el, e.firstChild) : e.appendChild(this.el)
			}
			return this.el
		}, K.prototype.finish = function () {
			var e = this.getElement();
			return e.className = e.className.replace("pace-active", ""), e.className += " pace-inactive", document.body.className = document.body.className.replace("pace-running", ""), document.body.className += " pace-done"
		}, K.prototype.update = function (e) {
			return this.progress = e, this.render()
		}, K.prototype.destroy = function () {
			try {
				this.getElement().parentNode.removeChild(this.getElement())
			} catch (e) {
				t = e
			}
			return this.el = void 0
		}, K.prototype.render = function () {
			var e, t, n, i, a, r, o;
			if (null == document.querySelector(T.target)) return !1;
			for (e = this.getElement(), i = "translate3d(" + this.progress + "%, 0, 0)", a = 0, r = (o = ["webkitTransform", "msTransform", "transform"]).length; a < r; a++) t = o[a], e.children[0].style[t] = i;
			return (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) && (e.children[0].setAttribute("data-progress-text", (0 | this.progress) + "%"), 100 <= this.progress ? n = "99" : (n = this.progress < 10 ? "0" : "", n += 0 | this.progress), e.children[0].setAttribute("data-progress", "" + n)), this.lastRenderedProgress = this.progress
		}, K.prototype.done = function () {
			return 100 <= this.progress
		}, c = K, U.prototype.trigger = function (e, t) {
			var n, i, a, r, o;
			if (null != this.bindings[e]) {
				for (o = [], i = 0, a = (r = this.bindings[e]).length; i < a; i++) n = r[i], o.push(n.call(this, t));
				return o
			}
		}, U.prototype.on = function (e, t) {
			var n;
			return null == (n = this.bindings)[e] && (n[e] = []), this.bindings[e].push(t)
		}, m = U, L = window.XMLHttpRequest, F = window.XDomainRequest, _ = window.WebSocket, f = function (e, t) {
			var n, i = [];
			for (n in t.prototype) try {
				null == e[n] && "function" != typeof t[n] ? "function" == typeof Object.defineProperty ? i.push(Object.defineProperty(e, n, {
					get: function () {
						return t.prototype[n]
					},
					configurable: !0,
					enumerable: !0
				})) : i.push(e[n] = t.prototype[n]) : i.push(void 0)
			} catch (e) {
				0
			}
			return i
		}, w = [], v.ignore = function () {
			var e = arguments[0],
				t = 2 <= arguments.length ? J.call(arguments, 1) : [];
			return w.unshift("ignore"), t = e.apply(null, t), w.shift(), t
		}, v.track = function () {
			var e = arguments[0],
				t = 2 <= arguments.length ? J.call(arguments, 1) : [];
			return w.unshift("track"), t = e.apply(null, t), w.shift(), t
		}, z = function (e) {
			if (null == e && (e = "GET"), "track" === w[0]) return "force";
			if (!w.length && T.ajax) {
				if ("socket" === e && T.ajax.trackWebSockets) return !0;
				if (e = e.toUpperCase(), 0 <= Y.call(T.ajax.trackMethods, e)) return !0
			}
			return !1
		}, Q(G, m), e = G, D = null, j = function (e) {
			for (var t, n = T.ajax.ignoreURLs, i = 0, a = n.length; i < a; i++)
				if ("string" == typeof (t = n[i])) {
					if (-1 !== e.indexOf(t)) return !0
				} else if (t.test(e)) return !0;
			return !1
		}, (g = function () {
			return null == D && (D = new e), D
		})().on("request", function (e) {
			var r, o = e.type,
				s = e.request,
				t = e.url;
			if (!j(t)) return v.running || !1 === T.restartOnRequestAfter && "force" !== z(o) ? void 0 : (r = arguments, "boolean" == typeof (t = T.restartOnRequestAfter || 0) && (t = 0), setTimeout(function () {
				var e, t, n, i, a = "socket" === o ? s.readyState < 2 : 0 < (a = s.readyState) && a < 4;
				if (a) {
					for (v.restart(), i = [], e = 0, t = (n = v.sources).length; e < t; e++) {
						if ((E = n[e]) instanceof l) {
							E.watch.apply(E, r);
							break
						}
						i.push(void 0)
					}
					return i
				}
			}, t))
		}), V.prototype.watch = function (e) {
			var t = e.type,
				n = e.request,
				e = e.url;
			if (!j(e)) return n = new ("socket" === t ? i : a)(n), this.elements.push(n)
		}, l = V, a = function (t) {
			var e, n, i, a, r, o = this;
			if (this.progress = 0, null != window.ProgressEvent)
				for (t.addEventListener("progress", function (e) {
					return e.lengthComputable ? o.progress = 100 * e.loaded / e.total : o.progress = o.progress + (100 - o.progress) / 2
				}, !1), n = 0, i = (r = ["load", "abort", "timeout", "error"]).length; n < i; n++) e = r[n], t.addEventListener(e, function () {
					return o.progress = 100
				}, !1);
			else a = t.onreadystatechange, t.onreadystatechange = function () {
				var e;
				return 0 === (e = t.readyState) || 4 === e ? o.progress = 100 : 3 === t.readyState && (o.progress = 50), "function" == typeof a ? a.apply(null, arguments) : void 0
			}
		}, i = function (e) {
			for (var t, n, i = this, a = this.progress = 0, r = (n = ["error", "open"]).length; a < r; a++) t = n[a], e.addEventListener(t, function () {
				return i.progress = 100
			}, !1)
		}, R = function (e) {
			var t, n, i, a;
			for (null == e && (e = {}), this.elements = [], null == e.selectors && (e.selectors = []), n = 0, i = (a = e.selectors).length; n < i; n++) t = a[n], this.elements.push(new r(t))
		}, ee.prototype.check = function () {
			var e = this;
			return document.querySelector(this.selector) ? this.done() : setTimeout(function () {
				return e.check()
			}, T.elements.checkInterval)
		}, ee.prototype.done = function () {
			return this.progress = 100
		}, r = ee, te.prototype.states = {
			loading: 0,
			interactive: 50,
			complete: 100
		}, Q = te, m = function () {
			var t, n, i, a, r, o = this;
			this.progress = 0, r = [], a = 0, i = C(), n = setInterval(function () {
				var e = C() - i - 50;
				return i = C(), r.push(e), r.length > T.eventLag.sampleCount && r.shift(), t = s(r), ++a >= T.eventLag.minSamples && t < T.eventLag.lagThreshold ? (o.progress = 100, clearInterval(n)) : o.progress = 3 / (t + 3) * 100
			}, 50)
		}, ne.prototype.tick = function (e, t) {
			return null == t && (t = S(this.source, "progress")), 100 <= t && (this.done = !0), t === this.last ? this.sinceLastUpdate += e : (this.sinceLastUpdate && (this.rate = (t - this.last) / this.sinceLastUpdate), this.catchup = (t - this.progress) / T.catchupTime, this.sinceLastUpdate = 0, this.last = t), t > this.progress && (this.progress += this.catchup * e), t = 1 - Math.pow(this.progress / 100, T.easeFactor), this.progress += t * this.rate * e, this.progress = Math.min(this.lastProgress + T.maxProgressPerFrame, this.progress), this.progress = Math.max(0, this.progress), this.progress = Math.min(100, this.progress), this.lastProgress = this.progress, this.progress
		}, y = ne, b = n = A = k = I = P = null, v.running = !1, h = function () {
			if (T.restartOnPushState) return v.restart()
		}, null != window.history.pushState && (N = window.history.pushState, window.history.pushState = function () {
			return h(), N.apply(window.history, arguments)
		}), null != window.history.replaceState && (B = window.history.replaceState, window.history.replaceState = function () {
			return h(), B.apply(window.history, arguments)
		}), u = {
			ajax: l,
			elements: R,
			document: Q,
			eventLag: m
		}, (x = function () {
			var e, t, n, i, a, r, o, s;
			for (v.sources = P = [], t = 0, i = (r = ["ajax", "elements", "document", "eventLag"]).length; t < i; t++)!1 !== T[e = r[t]] && P.push(new u[e](T[e]));
			for (n = 0, a = (s = null != (o = T.extraSources) ? o : []).length; n < a; n++) E = s[n], P.push(new E(T));
			return v.bar = k = new c, I = [], A = new y
		})(), v.stop = function () {
			return v.trigger("stop"), v.running = !1, k.destroy(), b = !0, null != n && ("function" == typeof o && o(n), n = null), x()
		}, v.restart = function () {
			return v.trigger("restart"), v.stop(), v.start()
		}, v.go = function () {
			var h;
			return v.running = !0, k.render(), h = C(), b = !1, n = O(function (e, t) {
				k.progress;
				for (var n, i, a, r, o, s, l, c, u, d, p = s = 0, f = !0, m = l = 0, g = P.length; l < g; m = ++l)
					for (E = P[m], o = null != I[m] ? I[m] : I[m] = [], a = c = 0, u = (i = null != (d = E.elements) ? d : [E]).length; c < u; a = ++c) r = i[a], f &= (r = null != o[a] ? o[a] : o[a] = new y(r)).done, r.done || (p++, s += r.tick(e));
				return n = s / p, k.update(A.tick(e, n)), k.done() || f || b ? (k.update(100), v.trigger("done"), setTimeout(function () {
					return k.finish(), v.running = !1, v.trigger("hide")
				}, Math.max(T.ghostTime, Math.max(T.minTime - (C() - h), 0)))) : t()
			})
		}, v.start = function (e) {
			p(T, e), v.running = !0;
			try {
				k.render()
			} catch (e) {
				t = e
			}
			return document.querySelector(".pace") ? (v.trigger("start"), v.go()) : setTimeout(v.start, 50)
		}, "function" == typeof define && define.amd ? define(["pace"], function () {
			return v
		}) : "object" == typeof exports ? module.exports = v : T.startOnPageLoad && v.start()
	}.call(this),
	function (T) {
		function n() {
			return !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
		}

		function t() {
			P && E[P.id].fx && !E[P.id].fxmobile && (T(window).width() < 480 ? P.element.removeClass("picker-fxs") : P.element.addClass("picker-fxs"))
		}

		function s() {
			var e = F(x()),
				t = F(w());
			if (E[P.id].lock) {
				if ("from" == E[P.id].lock) return e < t ? (H(), P.element.addClass("picker-lkd"), !0) : (P.element.removeClass("picker-lkd"), !1);
				if ("to" == E[P.id].lock) return t < e ? (H(), P.element.addClass("picker-lkd"), !0) : (P.element.removeClass("picker-lkd"), !1)
			}
			return E[P.id].disabledays && (-1 != E[P.id].disabledays.indexOf(e) ? (H(), P.element.addClass("picker-lkd"), !0) : (P.element.removeClass("picker-lkd"), !1))
		}

		function M(e) {
			return e % 1 == 0
		}

		function S(e) {
			return /(^\d{1,4}[\.|\\/|-]\d{1,2}[\.|\\/|-]\d{1,4})(\s*(?:0?[1-9]:[0-5]|1(?=[012])\d:[0-5])\d\s*[ap]m)?$/.test(e)
		}

		function O(e) {
			return parseInt(E[P.id].key[e].current)
		}

		function l(e) {
			return parseInt(E[P.id].key[e].today)
		}

		function a(e, t) {
			for (var n = [], i = E[P.id].key[e], a = i.min; a <= i.max; a++) a % t == 0 && n.push(a);
			return n
		}

		function I() {
			return z[E[P.id].lang].gregorian ? [1, 2, 3, 4, 5, 6, 0] : [0, 1, 2, 3, 4, 5, 6]
		}

		function j(e) {
			return _('ul.pick[data-k="' + e + '"]')
		}

		function r(e, t) {
			ul = j(e);
			var n = [];
			return ul.find("li").each(function () {
				n.push(T(this).attr("value"))
			}), "last" == t ? n[n.length - 1] : n[0]
		}

		function e() {
			E[P.id].large && (P.element.toggleClass("picker-lg"), q())
		}

		function c() {
			_("ul.pick.pick-l").toggleClass("visible")
		}

		function u() {
			var e, t;
			P.element.hasClass("picker-modal") || (e = (t = P.input).offset().left + t.outerWidth() / 2, t = t.offset().top + t.outerHeight(), P.element.css({
				left: e,
				top: t
			}))
		}

		function d() {
			s() || (P.element.removeClass("picker-focus"), P.element.hasClass("picker-modal") && T(".picker-modal-overlay").addClass("tohide"), P = null), A = !1
		}

		function p(e, t) {
			var n = E[P.id].key[e];
			t > n.max && ("d" == e && N("m", "right"), "m" == e && N("y", "right"), t = n.min), t < n.min && ("d" == e && N("m", "left"), "m" == e && N("y", "left"), t = n.max), E[P.id].key[e].current = t, $(e, t)
		}

		function f(e) {
			return e < 10 ? "0" + e : e
		}
		var m, g = "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",
			h = "webkitAnimationEnd mozAnimationEnd oAnimationEnd oanimationend animationend",
			z = {
				en: {
					name: "English",
					gregorian: !1,
					months: {
						short: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
						full: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
					},
					weekdays: {
						short: ["S", "M", "T", "W", "T", "F", "S"],
						full: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
					}
				},
				ka: {
					name: "Georgian",
					gregorian: !1,
					months: {
						short: ["იან", "თებ", "მარტ", "აპრ", "მაი", "ივნ", "ივლ", "აგვ", "სექტ", "ოქტ", "ნოემბ", "დეკ"],
						full: ["იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"]
					},
					weekdays: {
						short: ["კვ", "ორ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"],
						full: ["კვირა", "ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი"]
					}
				},
				it: {
					name: "Italiano",
					gregorian: !0,
					months: {
						short: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
						full: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"]
					},
					weekdays: {
						short: ["D", "L", "M", "M", "G", "V", "S"],
						full: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"]
					}
				},
				fr: {
					name: "Français",
					gregorian: !0,
					months: {
						short: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jui", "Jui", "Aoû", "Sep", "Oct", "Nov", "Déc"],
						full: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
					},
					weekdays: {
						short: ["D", "L", "M", "M", "J", "V", "S"],
						full: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
					}
				},
				zh: {
					name: "中文",
					gregorian: !0,
					months: {
						short: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
						full: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
					},
					weekdays: {
						short: ["天", "一", "二", "三", "四", "五", "六"],
						full: ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
					}
				},
				ar: {
					name: "العَرَبِيَّة",
					gregorian: !1,
					months: {
						short: ["جانفي", "فيفري", "مارس", "أفريل", "ماي", "جوان", "جويلية", "أوت", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
						full: ["جانفي", "فيفري", "مارس", "أفريل", "ماي", "جوان", "جويلية", "أوت", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
					},
					weekdays: {
						short: ["S", "M", "T", "W", "T", "F", "S"],
						full: ["الأحد", "الإثنين", "الثلثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]
					}
				},
				fa: {
					name: "فارسی",
					gregorian: !1,
					months: {
						short: ["ژانویه", "فووریه", "مارچ", "آپریل", "می", "جون", "جولای", "آگوست", "سپتامبر", "اکتبر", "نوامبر", "دسامبر"],
						full: ["ژانویه", "فووریه", "مارچ", "آپریل", "می", "جون", "جولای", "آگوست", "سپتامبر", "اکتبر", "نوامبر", "دسامبر"]
					},
					weekdays: {
						short: ["S", "M", "T", "W", "T", "F", "S"],
						full: ["یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه", "شنبه"]
					}
				},
				hu: {
					name: "Hungarian",
					gregorian: !0,
					months: {
						short: ["jan", "feb", "már", "ápr", "máj", "jún", "júl", "aug", "sze", "okt", "nov", "dec"],
						full: ["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"]
					},
					weekdays: {
						short: ["v", "h", "k", "s", "c", "p", "s"],
						full: ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"]
					}
				},
				gr: {
					name: "Ελληνικά",
					gregorian: !0,
					months: {
						short: ["Ιαν", "Φεβ", "Μάρ", "Απρ", "Μάι", "Ιούν", "Ιούλ", "Αύγ", "Σεπ", "Οκτ", "Νοέ", "Δεκ"],
						full: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"]
					},
					weekdays: {
						short: ["Κ", "Δ", "Τ", "Τ", "Π", "Π", "Σ"],
						full: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"]
					}
				},
				es: {
					name: "Español",
					gregorian: !0,
					months: {
						short: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
						full: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
					},
					weekdays: {
						short: ["D", "L", "M", "X", "J", "V", "S"],
						full: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
					}
				},
				da: {
					name: "Dansk",
					gregorian: !0,
					months: {
						short: ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"],
						full: ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december"]
					},
					weekdays: {
						short: ["s", "m", "t", "o", "t", "f", "l"],
						full: ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"]
					}
				},
				de: {
					name: "Deutsch",
					gregorian: !0,
					months: {
						short: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
						full: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
					},
					weekdays: {
						short: ["S", "M", "D", "M", "D", "F", "S"],
						full: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
					}
				},
				nl: {
					name: "Nederlands",
					gregorian: !0,
					months: {
						short: ["jan", "feb", "maa", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"],
						full: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"]
					},
					weekdays: {
						short: ["z", "m", "d", "w", "d", "v", "z"],
						full: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"]
					}
				},
				pl: {
					name: "język polski",
					gregorian: !0,
					months: {
						short: ["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru"],
						full: ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"]
					},
					weekdays: {
						short: ["n", "p", "w", "ś", "c", "p", "s"],
						full: ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"]
					}
				},
				pt: {
					name: "Português",
					gregorian: !0,
					months: {
						short: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
						full: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
					},
					weekdays: {
						short: ["D", "S", "T", "Q", "Q", "S", "S"],
						full: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
					}
				},
				si: {
					name: "Slovenščina",
					gregorian: !0,
					months: {
						short: ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov", "dec"],
						full: ["januar", "februar", "marec", "april", "maj", "junij", "julij", "avgust", "september", "oktober", "november", "december"]
					},
					weekdays: {
						short: ["n", "p", "t", "s", "č", "p", "s"],
						full: ["nedelja", "ponedeljek", "torek", "sreda", "četrtek", "petek", "sobota"]
					}
				},
				uk: {
					name: "українська мова",
					gregorian: !0,
					months: {
						short: ["січень", "лютий", "березень", "квітень", "травень", "червень", "липень", "серпень", "вересень", "жовтень", "листопад", "грудень"],
						full: ["січень", "лютий", "березень", "квітень", "травень", "червень", "липень", "серпень", "вересень", "жовтень", "листопад", "грудень"]
					},
					weekdays: {
						short: ["н", "п", "в", "с", "ч", "п", "с"],
						full: ["неділя", "понеділок", "вівторок", "середа", "четвер", "п'ятниця", "субота"]
					}
				},
				ru: {
					name: "русский язык",
					gregorian: !0,
					months: {
						short: ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"],
						full: ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"]
					},
					weekdays: {
						short: ["в", "п", "в", "с", "ч", "п", "с"],
						full: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"]
					}
				},
				tr: {
					name: "Türkçe",
					gregorian: !0,
					months: {
						short: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
						full: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
					},
					weekdays: {
						short: ["P", "P", "S", "Ç", "P", "C", "C"],
						full: ["Pazar", "Pazartesi", "Sali", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"]
					}
				},
				ko: {
					name: "조선말",
					gregorian: !0,
					months: {
						short: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
						full: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
					},
					weekdays: {
						short: ["일", "월", "화", "수", "목", "금", "토"],
						full: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
					}
				},
				fi: {
					name: "suomen kieli",
					gregorian: !0,
					months: {
						short: ["Tam", "Hel", "Maa", "Huh", "Tou", "Kes", "Hei", "Elo", "Syy", "Lok", "Mar", "Jou"],
						full: ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"]
					},
					weekdays: {
						short: ["S", "M", "T", "K", "T", "P", "L"],
						full: ["Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai"]
					}
				},
				vi: {
					name: "Tiếng việt",
					gregorian: !1,
					months: {
						short: ["Th.01", "Th.02", "Th.03", "Th.04", "Th.05", "Th.06", "Th.07", "Th.08", "Th.09", "Th.10", "Th.11", "Th.12"],
						full: ["Tháng 01", "Tháng 02", "Tháng 03", "Tháng 04", "Tháng 05", "Tháng 06", "Tháng 07", "Tháng 08", "Tháng 09", "Tháng 10", "Tháng 11", "Tháng 12"]
					},
					weekdays: {
						short: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
						full: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"]
					}
				}
			},
			E = {},
			P = null,
			A = !1,
			v = null,
			y = null,
			k = null,
			b = !1,
			w = function () {
				return l("m") + "/" + l("d") + "/" + l("y")
			},
			x = function () {
				return O("m") + "/" + O("d") + "/" + O("y")
			},
			C = function (e, t) {
				var n = E[P.id].key[e];
				return t > n.max ? C(e, t - n.max + (n.min - 1)) : t < n.min ? C(e, t + 1 + (n.max - n.min)) : t
			},
			_ = function (e) {
				if (P) return P.element.find(e)
			},
			F = function (e) {
				return Date.parse(e) / 1e3
			},
			L = function () {
				var t = I();
				_(".pick-lg .pick-lg-h li").each(function (e) {
					T(this).html(z[E[P.id].lang].weekdays.short[t[e]])
				}), _("ul.pick.pick-m li").each(function () {
					T(this).html(z[E[P.id].lang].months.short[T(this).attr("value") - 1])
				})
			},
			q = function () {
				var e = 0,
					t = _(".pick-lg-b");
				t.find("li").empty().removeClass("pick-n pick-b pick-a pick-v pick-lk pick-sl pick-h").attr("data-value", "");
				new Date(x());

				function n(e) {
					var t = e.getMonth();
					return [31, (e = e.getFullYear()) % 4 == 0 && (e % 100 != 0 || e % 400 == 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t]
				}
				var i = new Date(x()),
					a = new Date(x());
				a.setMonth(a.getMonth() - 1), i.setDate(1);
				var r = i.getDay() - 1;
				r < 0 && (r = 6), z[E[P.id].lang].gregorian && --r < 0 && (r = 6);
				for (var o = n(a) - r; o <= n(a); o++) t.find("li").eq(e).html(o).addClass("pick-b pick-n pick-h"), e++;
				for (o = 1; o <= n(i); o++) t.find("li").eq(e).html(o).addClass("pick-n pick-v").attr("data-value", o), e++;
				if (t.find("li.pick-n").length < 42)
					for (var s = 42 - t.find("li.pick-n").length, o = 1; o <= s; o++) t.find("li").eq(e).html(o).addClass("pick-a pick-n pick-h"), e++;
				E[P.id].lock && ("from" === E[P.id].lock ? O("y") <= l("y") && (O("m") == l("m") ? _('.pick-lg .pick-lg-b li.pick-v[data-value="' + l("d") + '"]').prevAll("li").addClass("pick-lk") : (O("m") < l("m") || O("m") > l("m") && O("y") < l("y")) && _(".pick-lg .pick-lg-b li").addClass("pick-lk")) : O("y") >= l("y") && (O("m") == l("m") ? _('.pick-lg .pick-lg-b li.pick-v[data-value="' + l("d") + '"]').nextAll("li").addClass("pick-lk") : (O("m") > l("m") || O("m") < l("m") && O("y") > l("y")) && _(".pick-lg .pick-lg-b li").addClass("pick-lk"))), E[P.id].disabledays && T.each(E[P.id].disabledays, function (e, t) {
					t && S(t) && ((t = new Date(1e3 * t)).getMonth() + 1 == O("m") && t.getFullYear() == O("y") && _('.pick-lg .pick-lg-b li.pick-v[data-value="' + t.getDate() + '"]').addClass("pick-lk"))
				}), _(".pick-lg-b li.pick-v[data-value=" + O("d") + "]").addClass("pick-sl")
			},
			D = function () {
				var t, n, e;
				P.element.hasClass("picker-lg") && q(), t = O("m"), n = O("y"), e = n % 4 == 0 && (n % 100 != 0 || n % 400 == 0), E[P.id].key.d.max = [31, e ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t - 1], O("d") > E[P.id].key.d.max && (E[P.id].key.d.current = E[P.id].key.d.max, $("d", O("d"))), _(".pick-d li").removeClass("pick-wke").each(function () {
					var e = new Date(t + "/" + T(this).attr("value") + "/" + n).getDay();
					T(this).find("span").html(z[E[P.id].lang].weekdays.full[e]), 0 != e && 6 != e || T(this).addClass("pick-wke")
				}), P.element.hasClass("picker-lg") && (_(".pick-lg-b li").removeClass("pick-wke"), _(".pick-lg-b li.pick-v").each(function () {
					var e = new Date(t + "/" + T(this).attr("data-value") + "/" + n).getDay();
					0 != e && 6 != e || T(this).addClass("pick-wke")
				})), B()
			},
			$ = function (e, t) {
				var n, i = j(e);
				i.find("li").removeClass("pick-sl pick-bfr pick-afr"), t == r(e, "last") && ((n = i.find('li[value="' + r(e, "first") + '"]')).clone().insertAfter(i.find("li[value=" + t + "]")), n.remove()), t == r(e, "first") && ((n = i.find('li[value="' + r(e, "last") + '"]')).clone().insertBefore(i.find("li[value=" + t + "]")), n.remove()), i.find("li[value=" + t + "]").addClass("pick-sl"), i.find("li.pick-sl").nextAll("li").addClass("pick-afr"), i.find("li.pick-sl").prevAll("li").addClass("pick-bfr")
			},
			N = function (e, t) {
				var n = O(e);
				"right" == t ? n++ : n--, p(e, n)
			},
			H = function () {
				P.element.addClass("picker-rmbl")
			},
			B = function () {
				var e, t, n, i, a, r;
				!s() && A && (i = O("d"), e = O("m"), t = O("y"), n = new Date(e + "/" + i + "/" + t).getDay(), i = E[P.id].format.replace(/\b(d)\b/g, f(i)).replace(/\b(m)\b/g, f(e)).replace(/\b(S)\b/g, (r = i) + ((a = ["th", "st", "nd", "rd"])[((r = r % 100) - 20) % 10] || a[r] || a[0])).replace(/\b(Y)\b/g, t).replace(/\b(U)\b/g, F(x())).replace(/\b(D)\b/g, z[E[P.id].lang].weekdays.short[n]).replace(/\b(l)\b/g, z[E[P.id].lang].weekdays.full[n]).replace(/\b(F)\b/g, z[E[P.id].lang].months.full[e - 1]).replace(/\b(M)\b/g, z[E[P.id].lang].months.short[e - 1]).replace(/\b(n)\b/g, e).replace(/\b(j)\b/g, i), P.input.val(i).change(), A = !1)
			};
		m = n() ? {
			i: "touchstart",
			m: "touchmove",
			e: "touchend"
		} : {
			i: "mousedown",
			m: "mousemove",
			e: "mouseup"
		};
		var R = "div.datedropper.picker-focus";
		T(document).on("click", function (e) {
			P && (P.input.is(e.target) || P.element.is(e.target) || 0 !== P.element.has(e.target).length || (d(), v = null))
		}).on(h, R + ".picker-rmbl", function () {
			P.element.hasClass("picker-rmbl") && T(this).removeClass("picker-rmbl")
		}).on(g, ".picker-modal-overlay", function () {
			T(this).remove()
		}).on(m.i, R + " .pick-lg li.pick-v", function () {
			_(".pick-lg-b li").removeClass("pick-sl"), T(this).addClass("pick-sl"), E[P.id].key.d.current = T(this).attr("data-value"), $("d", T(this).attr("data-value")), A = !0
		}).on("click", R + " .pick-btn-sz", function () {
			e()
		}).on("click", R + " .pick-btn-lng", function () {
			c()
		}).on(m.i, R + " .pick-arw.pick-arw-s2", function (e) {
			e.preventDefault(), v = null;
			T(this).closest("ul").data("k");
			var t = E[P.id].jump,
				e = T(this).hasClass("pick-arw-r") ? O("y") + t : O("y") - t,
				t = a("y", t);
			e > t[t.length - 1] && (e = t[0]), e < t[0] && (e = t[t.length - 1]), E[P.id].key.y.current = e, $("y", O("y")), A = !0
		}).on(m.i, R + " .pick-arw.pick-arw-s1", function (e) {
			e.preventDefault(), v = null;
			e = T(this).closest("ul").data("k");
			T(this).hasClass("pick-arw-r") ? N(e, "right") : N(e, "left"), A = !0
		}).on(m.i, R + " ul.pick.pick-y li", function () {
			b = !0
		}).on(m.e, R + " ul.pick.pick-y li", function () {
			var e;
			!b || E[P.id].jump >= E[P.id].key.y.max - E[P.id].key.y.min || (T(this).closest("ul").toggleClass("pick-jump"), e = function (e, t) {
				for (var n = t[0], i = Math.abs(e - n), a = 0; a < t.length; a++) {
					var r = Math.abs(e - t[a]);
					r < i && (i = r, n = t[a])
				}
				return n
			}(O("y"), a("y", E[P.id].jump)), E[P.id].key.y.current = e, $("y", O("y")), b = !1)
		}).on(m.i, R + " ul.pick.pick-d li", function () {
			b = !0
		}).on(m.e, R + " ul.pick.pick-d li", function () {
			b && (e(), b = !1)
		}).on(m.i, R + " ul.pick.pick-l li", function () {
			b = !0
		}).on(m.e, R + " ul.pick.pick-l li", function () {
			var e;
			b && (c(), e = T(this).val(), E[P.id].lang = Object.keys(z)[e], L(), D(), b = !1)
		}).on(m.i, R + " ul.pick", function (e) {
			var t;
			(v = T(this)) && (t = v.data("k"), y = (n() ? e.originalEvent.touches[0] : e).pageY, k = O(t))
		}).on(m.m, function (e) {
			var t;
			b = !1, v && (e.preventDefault(), t = v.data("k"), o = (n() ? e.originalEvent.touches[0] : e).pageY, o = y - o, o = Math.round(.026 * o), i = k + o, (e = C(t, i)) != E[P.id].key[t].current && p(t, e), A = !0)
		}).on(m.e, function (e) {
			v && (k = y = v = null), P && D()
		}).on(m.i, R + " .pick-submit", function () {
			d()
		}), T(window).resize(function () {
			P && (u(), t())
		}), T.fn.dateDropper = function (e) {
			return T(this).each(function () {
				if (T(this).is("input") && !T(this).hasClass("picker-input")) {
					var e = T(this),
						t = "datedropper-" + Object.keys(E).length;
					e.attr("data-id", t).addClass("picker-input").prop({
						type: "text",
						readonly: !0
					});
					var n, a, r = e.data("default-date") && S(e.data("default-date")) ? e.data("default-date") : null,
						o = e.data("disabled-days") ? e.data("disabled-days").split(",") : null,
						s = e.data("format") || "m/d/Y",
						l = !1 !== e.data("fx") || e.data("fx"),
						c = !1 === e.data("fx") ? "" : "picker-fxs",
						u = !1 !== e.data("fx-mobile") || e.data("fx-mobile"),
						d = !1 !== e.data("init-set"),
						p = e.data("lang") && e.data("lang") in z ? e.data("lang") : "en",
						f = !0 === e.data("large-mode"),
						m = !0 === e.data("large-default") && !0 == f ? "picker-lg" : "",
						g = ("from" == e.data("lock") || "to" == e.data("lock")) && e.data("lock"),
						h = e.data("jump") && M(e.data("jump")) ? e.data("jump") : 10,
						v = e.data("max-year") && M(e.data("max-year")) ? e.data("max-year") : (new Date).getFullYear(),
						y = e.data("min-year") && M(e.data("min-year")) ? e.data("min-year") : 1970,
						k = !0 === e.data("modal") ? "picker-modal" : "",
						b = e.data("theme") || "primary",
						w = !0 === e.data("translate-mode");
					for (a in o && T.each(o, function (e, t) {
						t && S(t) && (o[e] = F(t))
					}), E[t] = {
						disabledays: o,
						format: s,
						fx: l,
						fxmobile: u,
						lang: p,
						large: f,
						lock: g,
						jump: h,
						key: {
							m: {
								min: 1,
								max: 12,
								current: 1,
								today: (new Date).getMonth() + 1
							},
							d: {
								min: 1,
								max: 31,
								current: 1,
								today: (new Date).getDate()
							},
							y: {
								min: y,
								max: v,
								current: y,
								today: (new Date).getFullYear()
							},
							l: {
								min: 0,
								max: Object.keys(z).length - 1,
								current: 0,
								today: 0
							}
						},
						translate: w
					}, r && (n = r.match(/\d+/g), T.each(n, function (e, t) {
						n[e] = parseInt(t)
					}), E[t].key.m.today = n[0] && n[0] <= 12 ? n[0] : E[t].key.m.today, E[t].key.d.today = n[1] && n[1] <= 31 ? n[1] : E[t].key.d.today, E[t].key.y.today = n[2] || E[t].key.y.today, E[t].key.y.today > E[t].key.y.max && (E[t].key.y.max = E[t].key.y.today), E[t].key.y.today < E[t].key.y.min && (E[t].key.y.min = E[t].key.y.today)), T("<div>", {
						class: "datedropper " + k + " " + b + " " + c + " " + m,
						id: t,
						html: T("<div>", {
							class: "picker"
						})
					}).appendTo("body"), P = {
						id: t,
						input: e,
						element: T("#" + t)
					}, E[t].key) T("<ul>", {
						class: "pick pick-" + a,
						"data-k": a
					}).appendTo(_(".picker")),
						function (e) {
							var t = j(e),
								n = E[P.id].key[e];
							for (E[P.id].key[e].current = n.today < n.min && n.min || n.today, i = n.min; i <= n.max; i++) {
								var a = i;
								"m" == e && (a = z[E[P.id].lang].months.short[i - 1]), "l" == e && (a = z[Object.keys(z)[i]].name), a += "d" == e ? "<span></span>" : "", T("<li>", {
									value: i,
									html: a
								}).appendTo(t)
							}
							T("<div>", {
								class: "pick-arw pick-arw-s1 pick-arw-l",
								html: T("<i>", {
									class: "pick-i-l"
								})
							}).appendTo(t), T("<div>", {
								class: "pick-arw pick-arw-s1 pick-arw-r",
								html: T("<i>", {
									class: "pick-i-r"
								})
							}).appendTo(t), "y" == e && (T("<div>", {
								class: "pick-arw pick-arw-s2 pick-arw-l",
								html: T("<i>", {
									class: "pick-i-l"
								})
							}).appendTo(t), T("<div>", {
								class: "pick-arw pick-arw-s2 pick-arw-r",
								html: T("<i>", {
									class: "pick-i-r"
								})
							}).appendTo(t)), $(e, O(e))
						}(a);
					if (E[t].large) {
						T("<div>", {
							class: "pick-lg"
						}).insertBefore(_(".pick-d")), T('<ul class="pick-lg-h"></ul><ul class="pick-lg-b"></ul>').appendTo(_(".pick-lg"));
						for (var x = I(), C = 0; C < 7; C++) T("<li>", {
							html: z[E[P.id].lang].weekdays.short[x[C]]
						}).appendTo(_(".pick-lg .pick-lg-h"));
						for (C = 0; C < 42; C++) T("<li>").appendTo(_(".pick-lg .pick-lg-b"))
					}
					T("<div>", {
						class: "pick-btns"
					}).appendTo(_(".picker")), T("<div>", {
						class: "pick-submit"
					}).appendTo(_(".pick-btns")), E[P.id].translate && T("<div>", {
						class: "pick-btn pick-btn-lng"
					}).appendTo(_(".pick-btns")), E[P.id].large && T("<div>", {
						class: "pick-btn pick-btn-sz"
					}).appendTo(_(".pick-btns")), "Y" != s && "m" != s || (_(".pick-d,.pick-btn-sz").hide(), P.element.addClass("picker-tiny"), "Y" == s && _(".pick-m,.pick-btn-lng").hide(), "m" == s && _(".pick-y").hide()), d && (A = !0, B()), P = null
				}
			}).focus(function (e) {
				e.preventDefault(), T(this).blur(), P && d(), P = {
					id: T(this).data("id"),
					input: T(this),
					element: T("#" + T(this).data("id"))
				}, t(), u(), D(), P.element.addClass("picker-focus"), P.element.hasClass("picker-modal") && T("body").append('<div class="picker-modal-overlay"></div>')
			})
		}
	}(jQuery),
	function (e, t) {
		"object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.AOS = t() : e.AOS = t()
	}(this, function () {
		return a = {}, n.m = i = [
			function (e, t, n) {
				"use strict";

				function i(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}

				function a() {
					if (0 < arguments.length && void 0 !== arguments[0] && arguments[0] && (h = !0), h) return g = (0, f.default)(g, v), (0, p.default)(g, v.once), g
				}

				function r() {
					g = (0, m.default)(), a()
				}
				var o = Object.assign || function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var n, i = arguments[t];
						for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n])
					}
					return e
				},
					s = (i(n(1)), n(6)),
					l = i(s),
					c = i(n(7)),
					u = i(n(8)),
					d = i(n(9)),
					p = i(n(10)),
					f = i(n(11)),
					m = i(n(14)),
					g = [],
					h = !1,
					v = {
						offset: 120,
						delay: 0,
						easing: "ease",
						duration: 400,
						disable: !1,
						once: !1,
						startEvent: "DOMContentLoaded",
						throttleDelay: 99,
						debounceDelay: 50,
						disableMutationObserver: !1
					};
				e.exports = {
					init: function (e) {
						v = o(v, e), g = (0, m.default)();
						var t = document.all && !window.atob;
						return !0 === (e = v.disable) || "mobile" === e && d.default.mobile() || "phone" === e && d.default.phone() || "tablet" === e && d.default.tablet() || "function" == typeof e && !0 === e() || t ? void g.forEach(function (e, t) {
							e.node.removeAttribute("data-aos"), e.node.removeAttribute("data-aos-easing"), e.node.removeAttribute("data-aos-duration"), e.node.removeAttribute("data-aos-delay")
						}) : (document.querySelector("body").setAttribute("data-aos-easing", v.easing), document.querySelector("body").setAttribute("data-aos-duration", v.duration), document.querySelector("body").setAttribute("data-aos-delay", v.delay), "DOMContentLoaded" === v.startEvent && -1 < ["complete", "interactive"].indexOf(document.readyState) ? a(!0) : ("load" === v.startEvent ? window : document).addEventListener(v.startEvent, function () {
							a(!0)
						}), window.addEventListener("resize", (0, c.default)(a, v.debounceDelay, !0)), window.addEventListener("orientationchange", (0, c.default)(a, v.debounceDelay, !0)), window.addEventListener("scroll", (0, l.default)(function () {
							(0, p.default)(g, v.once)
						}, v.throttleDelay)), v.disableMutationObserver || (0, u.default)("[data-aos]", r), g)
					},
					refresh: a,
					refreshHard: r
				}
			},
			function (e, t) { }, , , , ,
			function (m, e) {
				(function (e) {
					"use strict";

					function r(i, n, e) {
						function a(e) {
							var t = l,
								n = c;
							return l = c = void 0, m = e, d = i.apply(n, t)
						}

						function r(e) {
							var t = e - f;
							return void 0 === f || n <= t || t < 0 || h && u <= e - m
						}

						function o() {
							var e, t = C();
							return r(t) ? s(t) : void (p = setTimeout(o, (t = n - ((e = t) - f), h ? x(t, u - (e - m)) : t)))
						}

						function s(e) {
							return p = void 0, v && l ? a(e) : (l = c = void 0, d)
						}

						function t() {
							var e = C(),
								t = r(e);
							if (l = arguments, c = this, f = e, t) {
								if (void 0 === p) return m = t = f, p = setTimeout(o, n), g ? a(t) : d;
								if (h) return p = setTimeout(o, n), a(f)
							}
							return void 0 === p && (p = setTimeout(o, n)), d
						}
						var l, c, u, d, p, f, m = 0,
							g = !1,
							h = !1,
							v = !0;
						if ("function" != typeof i) throw new TypeError(b);
						return n = k(n) || 0, y(e) && (g = !!e.leading, h = "maxWait" in e, u = h ? w(k(e.maxWait) || 0, n) : u, v = "trailing" in e ? !!e.trailing : v), t.cancel = function () {
							void 0 !== p && clearTimeout(p), l = f = c = p = void (m = 0)
						}, t.flush = function () {
							return void 0 === p ? d : s(C())
						}, t
					}

					function y(e) {
						var t = void 0 === e ? "undefined" : i(e);
						return e && ("object" == t || "function" == t)
					}

					function n(e) {
						return "symbol" == (void 0 === e ? "undefined" : i(e)) || !!(t = e) && "object" == (void 0 === t ? "undefined" : i(t)) && f.call(e) == o;
						var t
					}

					function k(e) {
						if ("number" == typeof e) return e;
						if (n(e)) return a;
						if (y(e) && (e = y(t = "function" == typeof e.valueOf ? e.valueOf() : e) ? t + "" : t), "string" != typeof e) return 0 === e ? e : +e;
						e = e.replace(s, "");
						var t = c.test(e);
						return t || u.test(e) ? d(e.slice(2), t ? 2 : 8) : l.test(e) ? a : +e
					}
					var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
						return typeof e
					} : function (e) {
						return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
					},
						b = "Expected a function",
						a = NaN,
						o = "[object Symbol]",
						s = /^\s+|\s+$/g,
						l = /^[-+]0x[0-9a-f]+$/i,
						c = /^0b[01]+$/i,
						u = /^0o[0-7]+$/i,
						d = parseInt,
						t = "object" == (void 0 === e ? "undefined" : i(e)) && e && e.Object === Object && e,
						e = "object" == ("undefined" == typeof self ? "undefined" : i(self)) && self && self.Object === Object && self,
						p = t || e || Function("return this")(),
						f = Object.prototype.toString,
						w = Math.max,
						x = Math.min,
						C = function () {
							return p.Date.now()
						};
					m.exports = function (e, t, n) {
						var i = !0,
							a = !0;
						if ("function" != typeof e) throw new TypeError(b);
						return y(n) && (i = "leading" in n ? !!n.leading : i, a = "trailing" in n ? !!n.trailing : a), r(e, t, {
							leading: i,
							maxWait: t,
							trailing: a
						})
					}
				}).call(e, function () {
					return this
				}())
			},
			function (f, e) {
				(function (e) {
					"use strict";

					function y(e) {
						var t = void 0 === e ? "undefined" : i(e);
						return e && ("object" == t || "function" == t)
					}

					function n(e) {
						return "symbol" == (void 0 === e ? "undefined" : i(e)) || !!(t = e) && "object" == (void 0 === t ? "undefined" : i(t)) && p.call(e) == r;
						var t
					}

					function k(e) {
						if ("number" == typeof e) return e;
						if (n(e)) return a;
						if (y(e) && (e = y(t = "function" == typeof e.valueOf ? e.valueOf() : e) ? t + "" : t), "string" != typeof e) return 0 === e ? e : +e;
						e = e.replace(o, "");
						var t = l.test(e);
						return t || c.test(e) ? u(e.slice(2), t ? 2 : 8) : s.test(e) ? a : +e
					}

					function b() {
						return d.Date.now()
					}
					var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
						return typeof e
					} : function (e) {
						return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
					},
						a = NaN,
						r = "[object Symbol]",
						o = /^\s+|\s+$/g,
						s = /^[-+]0x[0-9a-f]+$/i,
						l = /^0b[01]+$/i,
						c = /^0o[0-7]+$/i,
						u = parseInt,
						t = "object" == (void 0 === e ? "undefined" : i(e)) && e && e.Object === Object && e,
						e = "object" == ("undefined" == typeof self ? "undefined" : i(self)) && self && self.Object === Object && self,
						d = t || e || Function("return this")(),
						p = Object.prototype.toString,
						w = Math.max,
						x = Math.min;
					f.exports = function (i, n, e) {
						function a(e) {
							var t = l,
								n = c;
							return l = c = void 0, m = e, d = i.apply(n, t)
						}

						function r(e) {
							var t = e - f;
							return void 0 === f || n <= t || t < 0 || h && u <= e - m
						}

						function o() {
							var e, t = b();
							return r(t) ? s(t) : void (p = setTimeout(o, (t = n - ((e = t) - f), h ? x(t, u - (e - m)) : t)))
						}

						function s(e) {
							return p = void 0, v && l ? a(e) : (l = c = void 0, d)
						}

						function t() {
							var e = b(),
								t = r(e);
							if (l = arguments, c = this, f = e, t) {
								if (void 0 === p) return m = t = f, p = setTimeout(o, n), g ? a(t) : d;
								if (h) return p = setTimeout(o, n), a(f)
							}
							return void 0 === p && (p = setTimeout(o, n)), d
						}
						var l, c, u, d, p, f, m = 0,
							g = !1,
							h = !1,
							v = !0;
						if ("function" != typeof i) throw new TypeError("Expected a function");
						return n = k(n) || 0, y(e) && (g = !!e.leading, h = "maxWait" in e, u = h ? w(k(e.maxWait) || 0, n) : u, v = "trailing" in e ? !!e.trailing : v), t.cancel = function () {
							void 0 !== p && clearTimeout(p), l = f = c = p = void (m = 0)
						}, t.flush = function () {
							return void 0 === p ? d : s(b())
						}, t
					}
				}).call(e, function () {
					return this
				}())
			},
			function (e, t) {
				"use strict";

				function a(e) {
					e && e.forEach(function (e) {
						var t = Array.prototype.slice.call(e.addedNodes),
							e = Array.prototype.slice.call(e.removedNodes);
						t.concat(e).filter(function (e) {
							return e.hasAttribute && e.hasAttribute("data-aos")
						}).length && r()
					})
				}
				Object.defineProperty(t, "__esModule", {
					value: !0
				});
				var r = function () { };
				t.default = function (e, t) {
					var n = window.document,
						i = new (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver)(a);
					r = t, i.observe(n.documentElement, {
						childList: !0,
						subtree: !0,
						removedNodes: !0
					})
				}
			},
			function (e, t) {
				"use strict";

				function n() {
					return navigator.userAgent || navigator.vendor || window.opera || ""
				}
				Object.defineProperty(t, "__esModule", {
					value: !0
				});
				var i = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
					a = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
					r = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
					o = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
					s = (function (e, t, n) {
						return t && c(e.prototype, t), n && c(e, n), e
					}(l, [{
						key: "phone",
						value: function () {
							var e = n();
							return !(!i.test(e) && !a.test(e.substr(0, 4)))
						}
					}, {
						key: "mobile",
						value: function () {
							var e = n();
							return !(!r.test(e) && !o.test(e.substr(0, 4)))
						}
					}, {
						key: "tablet",
						value: function () {
							return this.mobile() && !this.phone()
						}
					}]), l);

				function l() {
					! function (e) {
						if (!(e instanceof l)) throw new TypeError("Cannot call a class as a function")
					}(this)
				}

				function c(e, t) {
					for (var n = 0; n < t.length; n++) {
						var i = t[n];
						i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
					}
				}
				t.default = new s
			},
			function (e, t) {
				"use strict";
				Object.defineProperty(t, "__esModule", {
					value: !0
				});
				t.default = function (e, r) {
					var o = window.pageYOffset,
						s = window.innerHeight;
					e.forEach(function (e, t) {
						var n, i, a;
						i = s + o, a = r, e = (n = e).node.getAttribute("data-aos-once"), i > n.position ? n.node.classList.add("aos-animate") : void 0 === e || "false" !== e && (a || "true" === e) || n.node.classList.remove("aos-animate")
					})
				}
			},
			function (e, t, n) {
				"use strict";
				Object.defineProperty(t, "__esModule", {
					value: !0
				});
				var i, a = n(12),
					r = (i = a) && i.__esModule ? i : {
						default: i
					};
				t.default = function (e, n) {
					return e.forEach(function (e, t) {
						e.node.classList.add("aos-init"), e.position = (0, r.default)(e.node, n.offset)
					}), e
				}
			},
			function (e, t, n) {
				"use strict";
				Object.defineProperty(t, "__esModule", {
					value: !0
				});
				var i, a = n(13),
					o = (i = a) && i.__esModule ? i : {
						default: i
					};
				t.default = function (e, t) {
					var n = 0,
						i = 0,
						a = window.innerHeight,
						r = {
							offset: e.getAttribute("data-aos-offset"),
							anchor: e.getAttribute("data-aos-anchor"),
							anchorPlacement: e.getAttribute("data-aos-anchor-placement")
						};
					switch (r.offset && !isNaN(r.offset) && (i = parseInt(r.offset)), r.anchor && document.querySelectorAll(r.anchor) && (e = document.querySelectorAll(r.anchor)[0]), n = (0, o.default)(e).top, r.anchorPlacement) {
						case "top-bottom":
							break;
						case "center-bottom":
							n += e.offsetHeight / 2;
							break;
						case "bottom-bottom":
							n += e.offsetHeight;
							break;
						case "top-center":
							n += a / 2;
							break;
						case "bottom-center":
							n += a / 2 + e.offsetHeight;
							break;
						case "center-center":
							n += a / 2 + e.offsetHeight / 2;
							break;
						case "top-top":
							n += a;
							break;
						case "bottom-top":
							n += e.offsetHeight + a;
							break;
						case "center-top":
							n += e.offsetHeight / 2 + a
					}
					return r.anchorPlacement || r.offset || isNaN(t) || (i = t), n + i
				}
			},
			function (e, t) {
				"use strict";
				Object.defineProperty(t, "__esModule", {
					value: !0
				});
				t.default = function (e) {
					for (var t = 0, n = 0; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);) t += e.offsetLeft - ("BODY" != e.tagName ? e.scrollLeft : 0), n += e.offsetTop - ("BODY" != e.tagName ? e.scrollTop : 0), e = e.offsetParent;
					return {
						top: n,
						left: t
					}
				}
			},
			function (e, t) {
				"use strict";
				Object.defineProperty(t, "__esModule", {
					value: !0
				});
				t.default = function (e) {
					return e = e || document.querySelectorAll("[data-aos]"), Array.prototype.map.call(e, function (e) {
						return {
							node: e
						}
					})
				}
			}
		], n.c = a, n.p = "dist/", n(0);

		function n(e) {
			if (a[e]) return a[e].exports;
			var t = a[e] = {
				exports: {},
				id: e,
				loaded: !1
			};
			return i[e].call(t.exports, t, t.exports, n), t.loaded = !0, t.exports
		}
		var i, a
	}), $(function () {
		ParallaxScroll.init()
	});
var ParallaxScroll = {
	showLogs: !1,
	round: 1e3,
	init: function () {
		if (this._log("init"), this._inited) return this._log("Already Inited"), void (this._inited = !0);
		this._requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e, t) {
			window.setTimeout(e, 1e3 / 60)
		}, this._onScroll(!0)
	},
	_inited: !1,
	_properties: ["x", "y", "z", "rotateX", "rotateY", "rotateZ", "scaleX", "scaleY", "scaleZ", "scale"],
	_requestAnimationFrame: null,
	_log: function (e) {
		this.showLogs && console.log("Parallax Scroll / " + e)
	},
	_onScroll: function (x) {
		var C = $(document).scrollTop(),
			T = $(window).height();
		this._log("onScroll " + C), $("[data-parallax]").each($.proxy(function (e, t) {
			var o = $(t),
				s = [],
				l = !1,
				n = o.data("style");
			null == n && (n = o.attr("style") || "", o.data("style", n));
			for (var i = [o.data("parallax")], a = 2; o.data("parallax" + a); a++) i.push(o.data("parallax-" + a));
			var r, c, u = i.length;
			for (a = 0; a < u; a++) {
				var d = i[a],
					p = d["from-scroll"];
				null == p && (p = Math.max(0, $(t).offset().top - T)), p |= 0;
				var f = d.distance,
					m = d["to-scroll"];
				null == f && null == m && (f = T), f = Math.max(0 | f, 1);
				var g, h, v, y = d.easing,
					k = d["easing-return"];
				null != y && $.easing && $.easing[y] || (y = null), null != k && $.easing && $.easing[k] || (k = y), y && (null == (g = d.duration) && (g = f), g = Math.max(0 | g, 1), null == (h = d["duration-return"]) && (h = g), f = 1, null == (v = o.data("current-time")) && (v = 0)), null == m && (m = p + f), m |= 0;
				var b = d.smoothness;
				null == b && (b = 30), b |= 0, !x && 0 != b || (b = 1), b |= 0;
				var w = C,
					w = Math.max(w, p);
				w = Math.min(w, m), y && (null == o.data("sens") && o.data("sens", "back"), p < w && ("back" == o.data("sens") ? (v = 1, o.data("sens", "go")) : v++), w < m && ("go" == o.data("sens") ? (v = 1, o.data("sens", "back")) : v++), x && (v = g), o.data("current-time", v)), this._properties.map($.proxy(function (e) {
					var t, n, i, a = 0,
						r = d[e];
					null != r && ("scale" == e || "scaleX" == e || "scaleY" == e || "scaleZ" == e ? a = 1 : r |= 0, null == (t = o.data("_" + e)) && (t = a), i = t + ((n = (w - p) / (m - p) * (r - a) + a) - t) / b, y && 0 < v && v <= g && (a = a, "back" == o.data("sens") && (r = -(a = r), y = k, g = h), i = $.easing[y](null, v, a, r, g)), (i = Math.ceil(i * this.round) / this.round) == t && n == r && (i = r), s[e] || (s[e] = 0), s[e] += i, t != s[e] && (o.data("_" + e, s[e]), l = !0))
				}, this))
			}
			l && (null != s.z && (null == (r = d.perspective) && (r = 800), (c = o.parent()).data("style") || c.data("style", c.attr("style") || ""), c.attr("style", "perspective:" + r + "px; -webkit-perspective:" + r + "px; " + c.data("style"))), null == s.scaleX && (s.scaleX = 1), null == s.scaleY && (s.scaleY = 1), null == s.scaleZ && (s.scaleZ = 1), null != s.scale && (s.scaleX *= s.scale, s.scaleY *= s.scale, s.scaleZ *= s.scale), c = "translate3d(" + (s.x || 0) + "px, " + (s.y || 0) + "px, " + (s.z || 0) + "px)" + " " + ("rotateX(" + (s.rotateX || 0) + "deg) rotateY(" + (s.rotateY || 0) + "deg) rotateZ(" + (s.rotateZ || 0) + "deg)") + " " + ("scaleX(" + s.scaleX + ") scaleY(" + s.scaleY + ") scaleZ(" + s.scaleZ + ")") + ";", this._log(c), o.attr("style", "transform:" + c + " -webkit-transform:" + c + " " + n))
		}, this)), window.requestAnimationFrame ? window.requestAnimationFrame($.proxy(this._onScroll, this, !1)) : this._requestAnimationFrame($.proxy(this._onScroll, this, !1))
	}
};
jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
	def: "easeOutQuad",
	swing: function (e, t, n, i, a) {
		return jQuery.easing[jQuery.easing.def](e, t, n, i, a)
	},
	easeInQuad: function (e, t, n, i, a) {
		return i * (t /= a) * t + n
	},
	easeOutQuad: function (e, t, n, i, a) {
		return -i * (t /= a) * (t - 2) + n
	},
	easeInOutQuad: function (e, t, n, i, a) {
		return (t /= a / 2) < 1 ? i / 2 * t * t + n : -i / 2 * (--t * (t - 2) - 1) + n
	},
	easeInCubic: function (e, t, n, i, a) {
		return i * (t /= a) * t * t + n
	},
	easeOutCubic: function (e, t, n, i, a) {
		return i * ((t = t / a - 1) * t * t + 1) + n
	},
	easeInOutCubic: function (e, t, n, i, a) {
		return (t /= a / 2) < 1 ? i / 2 * t * t * t + n : i / 2 * ((t -= 2) * t * t + 2) + n
	},
	easeInQuart: function (e, t, n, i, a) {
		return i * (t /= a) * t * t * t + n
	},
	easeOutQuart: function (e, t, n, i, a) {
		return -i * ((t = t / a - 1) * t * t * t - 1) + n
	},
	easeInOutQuart: function (e, t, n, i, a) {
		return (t /= a / 2) < 1 ? i / 2 * t * t * t * t + n : -i / 2 * ((t -= 2) * t * t * t - 2) + n
	},
	easeInQuint: function (e, t, n, i, a) {
		return i * (t /= a) * t * t * t * t + n
	},
	easeOutQuint: function (e, t, n, i, a) {
		return i * ((t = t / a - 1) * t * t * t * t + 1) + n
	},
	easeInOutQuint: function (e, t, n, i, a) {
		return (t /= a / 2) < 1 ? i / 2 * t * t * t * t * t + n : i / 2 * ((t -= 2) * t * t * t * t + 2) + n
	},
	easeInSine: function (e, t, n, i, a) {
		return -i * Math.cos(t / a * (Math.PI / 2)) + i + n
	},
	easeOutSine: function (e, t, n, i, a) {
		return i * Math.sin(t / a * (Math.PI / 2)) + n
	},
	easeInOutSine: function (e, t, n, i, a) {
		return -i / 2 * (Math.cos(Math.PI * t / a) - 1) + n
	},
	easeInExpo: function (e, t, n, i, a) {
		return 0 == t ? n : i * Math.pow(2, 10 * (t / a - 1)) + n
	},
	easeOutExpo: function (e, t, n, i, a) {
		return t == a ? n + i : i * (1 - Math.pow(2, -10 * t / a)) + n
	},
	easeInOutExpo: function (e, t, n, i, a) {
		return 0 == t ? n : t == a ? n + i : (t /= a / 2) < 1 ? i / 2 * Math.pow(2, 10 * (t - 1)) + n : i / 2 * (2 - Math.pow(2, -10 * --t)) + n
	},
	easeInCirc: function (e, t, n, i, a) {
		return -i * (Math.sqrt(1 - (t /= a) * t) - 1) + n
	},
	easeOutCirc: function (e, t, n, i, a) {
		return i * Math.sqrt(1 - (t = t / a - 1) * t) + n
	},
	easeInOutCirc: function (e, t, n, i, a) {
		return (t /= a / 2) < 1 ? -i / 2 * (Math.sqrt(1 - t * t) - 1) + n : i / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n
	},
	easeInElastic: function (e, t, n, i, a) {
		var r = 1.70158,
			o = 0,
			s = i;
		return 0 == t ? n : 1 == (t /= a) ? n + i : (o = o || .3 * a, r = s < Math.abs(i) ? (s = i, o / 4) : o / (2 * Math.PI) * Math.asin(i / s), -(s * Math.pow(2, 10 * --t) * Math.sin((t * a - r) * (2 * Math.PI) / o)) + n)
	},
	easeOutElastic: function (e, t, n, i, a) {
		var r = 1.70158,
			o = 0,
			s = i;
		return 0 == t ? n : 1 == (t /= a) ? n + i : (o = o || .3 * a, r = s < Math.abs(i) ? (s = i, o / 4) : o / (2 * Math.PI) * Math.asin(i / s), s * Math.pow(2, -10 * t) * Math.sin((t * a - r) * (2 * Math.PI) / o) + i + n)
	},
	easeInOutElastic: function (e, t, n, i, a) {
		var r = 1.70158,
			o = 0,
			s = i;
		return 0 == t ? n : 2 == (t /= a / 2) ? n + i : (o = o || a * (.3 * 1.5), r = s < Math.abs(i) ? (s = i, o / 4) : o / (2 * Math.PI) * Math.asin(i / s), t < 1 ? s * Math.pow(2, 10 * --t) * Math.sin((t * a - r) * (2 * Math.PI) / o) * -.5 + n : s * Math.pow(2, -10 * --t) * Math.sin((t * a - r) * (2 * Math.PI) / o) * .5 + i + n)
	},
	easeInBack: function (e, t, n, i, a, r) {
		return null == r && (r = 1.70158), i * (t /= a) * t * ((r + 1) * t - r) + n
	},
	easeOutBack: function (e, t, n, i, a, r) {
		return null == r && (r = 1.70158), i * ((t = t / a - 1) * t * ((r + 1) * t + r) + 1) + n
	},
	easeInOutBack: function (e, t, n, i, a, r) {
		return null == r && (r = 1.70158), (t /= a / 2) < 1 ? i / 2 * (t * t * ((1 + (r *= 1.525)) * t - r)) + n : i / 2 * ((t -= 2) * t * ((1 + (r *= 1.525)) * t + r) + 2) + n
	},
	easeInBounce: function (e, t, n, i, a) {
		return i - jQuery.easing.easeOutBounce(e, a - t, 0, i, a) + n
	},
	easeOutBounce: function (e, t, n, i, a) {
		return (t /= a) < 1 / 2.75 ? i * (7.5625 * t * t) + n : t < 2 / 2.75 ? i * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n : t < 2.5 / 2.75 ? i * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n : i * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n
	},
	easeInOutBounce: function (e, t, n, i, a) {
		return t < a / 2 ? .5 * jQuery.easing.easeInBounce(e, 2 * t, 0, i, a) + n : .5 * jQuery.easing.easeOutBounce(e, 2 * t - a, 0, i, a) + .5 * i + n
	}
}), $(document).ready(function () {
	var e = $("section.hero").find(".inner-hero");
	$(window).scroll(function () {
		5 < $(this).scrollTop() ? e.addClass("scrolled") : e.removeClass("scrolled")
	});
	var t = $("header.header"),
		n = t.find(".bars"),
		i = t.find("ul.links");
	n.click(function (e) {
		e.stopPropagation(), $(this).toggleClass("toggle"), i.toggleClass("mobile-navbar")
	}), i.click(function (e) {
		e.stopPropagation()
	}), $(document).click(function () {
		n.removeClass("toggle"), i.removeClass("mobile-navbar")
	}), $(document).keydown(function (e) {
		27 == e.keyCode && (n.removeClass("toggle"), i.removeClass("mobile-navbar"))
	}), $(".toggle-fullscreen").on("click", function () {
		var e = $(this).find("#expand"),
			t = $(this).find("#shrink");
		$(this).toggleClass("fullscreen"), $(this).hasClass("fullscreen") ? ($(this).attr("title", "Close Fullscreen"), a.requestFullscreen ? a.requestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.webkitRequestFullscreen ? a.webkitRequestFullscreen() : a.msRequestFullscreen && a.msRequestFullscreen(), t.show(), e.hide()) : ($(this).attr("title", "Show Fullscreen"), document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen && document.msExitFullscreen(), t.hide(), e.show())
	});
	var a = document.documentElement;
	new Darkmode({
		bottom: "64px",
		right: "unset",
		left: "32px",
		time: "0.8s",
		mixColor: "#fff",
		backgroundColor: "#fff",
		buttonColorDark: "#242424",
		buttonColorLight: "#fff",
		saveInCookies: !0,
		label: "🌓",
		autoMatchOsTheme: !0
	}).showWidget();
	var r = $(".image-slider"),
		o = $(".text-slider");
	r.on("init", function (e) {
		TweenMax.to($(".image-slider .slick-track"), .9, {
			marginLeft: 0
		}), TweenMax.to($(".image-slider .slick-active"), .9, {
			x: 0,
			zIndex: 2
		})
	}), r.on("beforeChange", function (e, t, n, i) {
		TweenMax.to($(".image-slider .slick-track"), .9, {
			marginLeft: 0
		}), TweenMax.to($(".image-slider .slick-active"), .9, {
			x: 0
		}), $(".image-slider .slick-list").addClass("do-transition")
	}), r.on("afterChange", function (e, t, n) {
		TweenMax.to($(".image-slider .slick-track"), .9, {
			marginLeft: 0
		}), $(".image-slider .slick-slide").css("z-index", "1"), TweenMax.to($(".image-slider .slick-active"), .9, {
			x: 0,
			zIndex: 2
		}), $(".image-slider .slick-list").removeClass("do-transition")
	}), r.slick({
		slidesToScroll: 1,
		slidesToShow: 1,
		speed: 900,
		dots: !0,
		waitForAnimate: !0,
		pauseOnHover: !0,
		useTransform: !0,
		asNavFor: o,
		cssEase: "cubic-bezier(0.84, 0, 0.08, 0.99)"
	}), o.slick({
		slidesToScroll: 1,
		slidesToShow: 1,
		speed: 900,
		pauseOnHover: !0,
		asNavFor: r,
		arrows: !1,
		dots: !1,
		cssEase: "cubic-bezier(0.84, 0, 0.08, 0.99)"
	}), $(".slick-prev").on("mouseenter", function () {
		TweenMax.to($(".image-slider .slick-track"), 1.5, {
			marginLeft: "180px",
			ease: Elastic.easeOut
		}), TweenMax.to($(".image-slider .slick-current"), 1.5, {
			x: -100,
			ease: Elastic.easeOut
		})
	}), $(".slick-prev").on("mouseleave", function () {
		TweenMax.to($(".image-slider .slick-track"), .4, {
			marginLeft: 0,
			ease: Sine.easeInOut
		}), TweenMax.to($(".image-slider .slick-current"), .4, {
			x: 0,
			ease: Sine.easeInOut
		})
	}), $(".slick-next").on("mouseenter", function () {
		TweenMax.to($(".image-slider .slick-track"), 1.5, {
			marginLeft: "-180px",
			ease: Elastic.easeOut
		}), TweenMax.to($(".image-slider .slick-current"), 1.5, {
			x: 100,
			ease: Elastic.easeOut
		})
	}), $(".slick-next").on("mouseleave", function () {
		TweenMax.to($(".image-slider .slick-track"), .4, {
			marginLeft: 0,
			ease: Quad.easeInOut
		}), TweenMax.to($(".image-slider .slick-current"), .4, {
			x: 0,
			ease: Quad.easeInOut
		})
	});
	t = new TimelineMax, o = $(".login-corner"), r = $("section.banner");
	t.from(r, 2, {
		autoAlpha: 0,
		ease: Quad.easeInOut
	}).from(o, .2, {
		autoAlpha: 0,
		y: 200,
		ease: Power1.easeInOut
	}), AOS.init(), $(".sponsors-slider").slick({
		autoplay: !0,
		arrows: !1,
		dots: !1,
		slidesToShow: 6,
		slidesToScroll: 1,
		pauseOnHover: !0,
		cssEase: "cubic-bezier(0.84, 0, 0.08, 0.99)",
		responsive: [{}, {
			breakpoint: 1024,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3
			}
		}, {
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2
			}
		}, {
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}]
	});
	var s = $(".position-of-player"),
		l = $(".position-submenu");
	s.on("click", function () {
		$(this).find("i").toggleClass("rotate-angle"), l.slideToggle()
	}), l.find("li").each(function () {
		$(this).on("click", function () {
			s.find(".text-placeholder").text($(this).text()), l.slideUp(), s.find("i").removeClass("rotate-angle")
		})
	}), $("#datepicker").dateDropper(), $("#leaderboard-table").DataTable({
		responsive: !0,
		scrollCollapse: !0,
		scrollY: 400,
		scrollX: !0
	})
});
