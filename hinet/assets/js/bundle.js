! function e(t, i, a) {
    function n(o, r) {
        if (!i[o]) {
            if (!t[o]) {
                var c = "function" == typeof require && require;
                if (!r && c) return c(o, !0);
                if (s) return s(o, !0);
                var l = new Error("Cannot find module '" + o + "'");
                throw l.code = "MODULE_NOT_FOUND", l
            }
            var d = i[o] = {
                exports: {}
            };
            t[o][0].call(d.exports, function(e) {
                var i = t[o][1][e];
                return n(i ? i : e)
            }, d, d.exports, e, t, i, a)
        }
        return i[o].exports
    }
    for (var s = "function" == typeof require && require, o = 0; o < a.length; o++) n(a[o]);
    return n
}({
    1: [function(e, t, i) {
        "use strict";
        $(function() {
            function e() {
                var e = $(this).data("plan");
                e && h.val(e), v.addClass("active"), setTimeout(function() {
                    v.addClass("visible")
                }, 200)
            }

            function t() {
                v.removeClass("visible"), setTimeout(function() {
                    v.removeClass("active"), $(".wpcf7-not-valid-tip, .wpcf7-response-output").hide()
                }, 200)
            }
            var i = $("body"),
                a = $(".header"),
                n = $(".menu"),
                s = $(".menu__hamburger"),
                o = $(".menu__container");
            s.click(function() {
                $(this).toggleClass("active"), o.toggleClass("active"), o.hasClass("hidden") ? o.toggleClass("hidden") : setTimeout(function() {
                    o.toggleClass("hidden")
                }, 500)
            });
            var r = $(".dynamic"),
                c = function() {
                    r.each(function() {
                        var e = "animated " + $(this).data("animation");
                        $(this).visible(!0) && $(this).addClass(e)
                    })
                };
            $(window).on("scroll resize", function() {
                c()
            }), c(), i.hasClass("page-home") && $(window).on("scroll", function() {
                var e = $(window).scrollTop(),
                    t = window.innerHeight || $(window).height();
                e >= t - 85 ? (a.addClass("visible"), n.addClass("sticky")) : (a.removeClass("visible"), n.removeClass("sticky"))
            }), $(".js-slider").slick({
                adaptiveHeight: true,
                arrows : true,
                dots: true,
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        arrows: false,
                        dots: true
                    }
                }]
            }), $(".js-news-slider").slick({
                adaptiveHeight: !0,
                arrows: !1,
                dots: !0
            });
            for (var l = document.querySelectorAll(".advantage"), d = 0; d < l.length; d++) l[d].addEventListener("touchstart", function() {
                var e = document.querySelector(".advantage--active");
                e && e.classList.remove("advantage--active"), this.classList.add("advantage--active")
            }, !1);
            var u = $(".f-order__close"),
                v = $(".f-order"),
                f = $(".js-order"),
                h = $("#orderPlanName");
            u.on("click", t), f.on("click", e)
        })
    }, {}]
}, {}, [1]);
//# sourceMappingURL=bundle.js.map
