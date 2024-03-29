!(function(t, r) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = r())
    : 'function' == typeof define && define.amd
      ? define('Cloud', [], r)
      : 'object' == typeof exports ? (exports.Cloud = r()) : (t.Cloud = r())
})(this, function() {
  return (function(t) {
    function r(e) {
      if (n[e]) return n[e].exports
      var i = (n[e] = { exports: {}, id: e, loaded: !1 })
      return t[e].call(i.exports, i, i.exports, r), (i.loaded = !0), i.exports
    }
    var n = {}
    return (r.m = t), (r.c = n), (r.p = ''), r(0)
  })([
    function(t, r, n) {
      'use strict'
      var e = n(5)
      t.exports = e
    },
    function(t, r, n) {
      var e = n(4)
      t.exports = e
    },
    function(t, r, n) {
      var e = n(3)
      t.exports = e
    },
    function(t, r) {
      'use strict'
      function n(t, r, e) {
        e = e || 0
        for (var i in r)
          if (r.hasOwnProperty(i)) {
            var u = r[i]
            null !== u && a.isObject(u)
              ? (a.isObject(t[i]) || (t[i] = {}), e < o ? n(t[i], r[i], e + 1) : (t[i] = r[i]))
              : a.isArray(u) ? ((t[i] = []), (t[i] = t[i].concat(u))) : void 0 !== u && (t[i] = r[i])
          }
      }
      var e = Object.prototype,
        i = e.toString,
        o = 5,
        a = {
          substitute: function(t, r) {
            return t && r
              ? t.replace(/\\?\{([^{}]+)\}/g, function(t, n) {
                  return '\\' === t.charAt(0) ? t.slice(1) : void 0 === r[n] ? '' : r[n]
                })
              : t
          },
          ucfirst: function(t) {
            return (t += ''), t.charAt(0).toUpperCase() + t.substring(1)
          },
          isString: function(t) {
            return 'string' == typeof t
          },
          isNumber: function(t) {
            return 'number' == typeof t
          },
          isNumeric: function(t) {
            return !isNaN(parseFloat(t)) && isFinite(t)
          },
          isBoolean: function(t) {
            return 'boolean' == typeof t
          },
          isFunction: function(t) {
            return 'function' == typeof t
          },
          isArray:
            'isArray' in Array
              ? Array.isArray
              : function(t) {
                  return '[object Array]' === i.call(t)
                },
          isDate: function(t) {
            return '[object Date]' === i.call(t)
          },
          isNull: function(t) {
            return void 0 === t || null === t
          },
          notNull: function(t) {
            return !a.isNull(t)
          },
          isBlank: function(t) {
            if (a.isArray(t)) return 0 === t.length
            if (a.isObject(t)) {
              var r = 0
              return (
                a.each(t, function(t, n) {
                  r++
                }),
                0 === r
              )
            }
            return !1
          },
          isObject:
            '[object Object]' === i.call(null)
              ? function(t) {
                  return null !== t && void 0 !== t && '[object Object]' === i.call(t) && void 0 === t.ownerDocument
                }
              : function(t) {
                  return '[object Object]' === i.call(t)
                },
          extend: function(t, r, n, e) {
            a.isFunction(r) || ((n = r), (r = t), (t = function() {}))
            var i = Object.create
                ? function(t, r) {
                    return Object.create(t, { constructor: { value: r } })
                  }
                : function(t, r) {
                    function n() {}
                    n.prototype = t
                    var e = new n()
                    return (e.constructor = r), e
                  },
              o = i(r.prototype, t)
            return (
              (t.prototype = a.mix(o, t.prototype)), (t.superclass = i(r.prototype, r)), a.mix(o, n), a.mix(t, e), t
            )
          },
          augment: function(t) {
            for (var r = a.toArray(arguments), n = 1; n < r.length; n++) {
              var e = r[n]
              a.isFunction(e) && (e = e.prototype), a.mix(t.prototype, e)
            }
          },
          toArray: function(t) {
            return t && t.length ? Array.prototype.slice.call(t) : []
          },
          mix: function() {
            var t = a.toArray(arguments),
              r = t[0]
            if (r === !0) {
              r = t[1]
              for (var e = 2; e < t.length; e++) {
                var i = t[e]
                n(r, i)
              }
            } else
              for (var e = 1; e < t.length; e++) {
                var i = t[e]
                for (var o in i) i.hasOwnProperty(o) && 'constructor' !== o && (r[o] = i[o])
              }
            return r
          },
          each: function(t, r) {
            if (t)
              if (a.isObject(t)) {
                for (var n in t)
                  if (t.hasOwnProperty(n)) {
                    var e = r(t[n], n)
                    if (e === !1) break
                  }
              } else if (t.length)
                for (var i = 0; i < t.length; i++) {
                  var e = r(t[i], i)
                  if (e === !1) break
                }
          },
          requestAnimationFrame: function(t) {
            var r =
              window.requestAnimationFrame ||
              window.webkitRequestAnimationFrame ||
              function(t) {
                return setTimeout(t, 16)
              }
            return r(t)
          },
          cancelAnimationFrame: function(t) {
            var r =
              window.cancelAnimationFrame ||
              window.webkitCancelAnimationFrame ||
              function(t) {
                return clearTimeout(t)
              }
            return r(t)
          },
        }
      t.exports = a
    },
    function(t, r, n) {
      'use strict'
      function e(t, r) {
        var n = r.toString(),
          e = n.indexOf('.')
        if (e === -1) return Math.round(t)
        var i = n.substr(e + 1).length
        return parseFloat(t.toFixed(i))
      }
      var i = Object.prototype,
        o = (i.toString, n(2))
      o.mix(o, {
        mixin: function(t, r) {
          if (t && r) {
            ;(t._mixins = r), (t.ATTRS = t.ATTRS || {})
            var n = {}
            o.each(r, function(r) {
              o.augment(t, r)
              var e = r.ATTRS
              e && o.mix(n, e)
            }),
              (t.ATTRS = o.mix(n, t.ATTRS))
          }
        },
        map: function(t, r) {
          var n = []
          return (
            o.each(t, function(t, e) {
              n.push(r(t, e))
            }),
            n
          )
        },
        filter: function(t, r) {
          var n = []
          return (
            o.each(t, function(t, e) {
              r(t, e) && n.push(t)
            }),
            n
          )
        },
        guid: (function() {
          var t = {}
          return function(r) {
            return (r = r || 'g'), t[r] ? (t[r] += 1) : (t[r] = 1), r + t[r]
          }
        })(),
        inArray: function(t, r) {
          return o.indexOf(t, r) !== -1
        },
        indexOf: function(t, r) {
          var n = Array.prototype.indexOf
          if (n) return n.call(t, r)
          for (var e = -1, i = 0; i < t.length; i++)
            if (t[i] === r) {
              e = i
              break
            }
          return e
        },
        remove: function(t, r) {
          var n = o.indexOf(t, r)
          n !== -1 && t.splice(n, 1)
        },
        empty: function(t) {
          if (!(t instanceof Array)) for (var r = t.length - 1; r >= 0; r--) delete t[r]
          t.length = 0
        },
        equalsArray: function(t, r) {
          if (t === r) return !0
          if (!t || !r) return !1
          if (t.length !== r.length) return !1
          for (var n = !0, e = 0; e < t.length; e++)
            if (t[e] !== r[e]) {
              n = !1
              break
            }
          return n
        },
        wrapBehavior: function(t, r) {
          return (t['_wrap_' + r] = function(n) {
            t[r](n)
          })
        },
        getWrapBehavior: function(t, r) {
          return t['_wrap_' + r]
        },
        fixedBase: function(t, r) {
          return e(t, r)
        },
        length: function(t) {
          if (o.isArray(t)) return t.length
          if (o.isObject(t)) {
            var r = 0
            return (
              o.each(t, function() {
                r++
              }),
              r
            )
          }
          return 0
        },
        clone: function(t) {
          if ('object' != typeof t || null === t) return t
          if (o.isArray(t))
            for (var r = [], n = 0, e = t.length; n < e; n++)
              'object' == typeof t[n] && null != t[n] ? (r[n] = o.clone(t[n])) : (r[n] = t[n])
          else {
            var r = {}
            for (var n in t) 'object' == typeof t[n] && null != t[n] ? (r[n] = o.clone(t[n])) : (r[n] = t[n])
          }
          return r
        },
      }),
        (t.exports = o)
    },
    function(t, r, n) {
      'use strict'
      var e = n(1)
      n(6)
      var i = null,
        o = 1 / 0,
        a = function(t) {
          e.mix(this, t)
        }
      e.augment(a, {
        width: 500,
        height: 500,
        words: [],
        font: 'serif',
        fontStyle: 'normal',
        fontWeight: 'normal',
        padding: 2,
        spiral: 'archimedean',
        board: null,
        min: 12,
        max: 38,
        canvas: function() {
          return document.createElement('canvas')
        },
        text: function(t) {
          return t.text
        },
        size: function(t) {
          var r
          return (r = t.size || 0 === t.size ? t.size : this.min + Math.random() * (this.max - this.min))
        },
        rotate: function(t) {
          var r
          return (r = t.rotate || 0 === t.rotate ? t.rotate : 30 * (~~(6 * Math.random()) - 3))
        },
        fillStyle: function() {
          return '#ccc'
        },
        image: function(t, r) {
          var n = new Image(),
            i = this
          ;(n.crossOrigin = ''), (n.src = t)
          var o = i.width,
            a = i.height,
            u = o >> 5,
            c = e.zeroArray((o >> 5) * a)
          ;(n.onload = function() {
            var t = document.createElement('canvas')
            ;(t.id = 'canvas-img'), (t.width = o), (t.height = a)
            var e = t.getContext('2d')
            e.drawImage(n, 0, 0, n.width, n.height, 0, 0, o, a)
            for (var f = e.getImageData(0, 0, t.width, t.height).data, s = 0; s < a; s++)
              for (var l = 0; l < o; l++) {
                var h = u * s + (l >> 5),
                  x = (s * o + l) << 2,
                  y = f[x] >= 250 && f[x + 1] >= 250 && f[x + 2] >= 250,
                  d = y ? 1 << (31 - l % 32) : 0
                c[h] |= d
              }
            ;(i.board = c), (i.hasImage = !0), r(i)
          }),
            (n.onerror = function(t) {
              return console.log(t), !1
            })
        },
        exec: function(t) {
          function r() {
            for (var r = Date.now(); Date.now() - r < o && ++h < l && i; ) {
              var d = y[h]
              ;(d.x = (a * (Math.random() + 0.5)) >> 1),
                (d.y = (u * (Math.random() + 0.5)) >> 1),
                e.cloudSprite(c, d, y, h),
                d.hasText &&
                  e.place(f, d, s, n) &&
                  (x.push(d),
                  s
                    ? n.hasImage || e.cloudBounds(s, d)
                    : (s = [{ x: d.x + d.x0, y: d.y + d.y0 }, { x: d.x + d.x1, y: d.y + d.y1 }]),
                  (d.x /= a),
                  (d.y /= u))
            }
            h >= l && (n.stop(), e.dataHandle(x), t(x))
          }
          var n = this,
            a = n.width,
            u = n.height,
            c = e.getContext(n.canvas()),
            f = n.board ? n.board : e.zeroArray((a >> 5) * u),
            s = n.board ? [{ x: 0, y: 0 }, { x: a, y: u }] : null,
            l = n.words.length,
            h = -1,
            x = [],
            y = n.words
              .map(function(t) {
                return (
                  (t.text = n.text.call(n, t)),
                  (t.font = n.font),
                  (t.style = n.fontStyle),
                  (t.weight = n.fontWeight),
                  (t.rotate = n.rotate.call(n, t)),
                  (t.size = ~~n.size.call(n, t)),
                  (t.padding = n.padding),
                  (t.fillStyle = n.fillStyle.call(n, t)),
                  t
                )
              })
              .sort(function(t, r) {
                return r.size - t.size
              })
          return i && clearInterval(i), (i = setInterval(r, 0)), r(), n
        },
        stop: function() {
          return i && (clearInterval(i), (i = null)), self
        },
      }),
        (t.exports = a)
    },
    function(t, r, n) {
      'use strict'
      function e(t) {
        t.width = t.height = 1
        var r = Math.sqrt(t.getContext('2d').getImageData(0, 0, 1, 1).data.length >> 2)
        ;(t.width = (d << 5) / r), (t.height = v / r)
        var n = t.getContext('2d')
        return (n.fillStyle = n.strokeStyle = 'red'), (n.textAlign = 'center'), { context: n, ratio: r }
      }
      function i(t) {
        for (var r = [], n = -1; ++n < t; ) r[n] = 0
        return r
      }
      function o(t, r, n, e) {
        if (!r.sprite) {
          var i = t.context,
            o = t.ratio
          i.clearRect(0, 0, (d << 5) / o, v / o)
          var a,
            u,
            c = 0,
            f = 0,
            s = 0,
            l = n.length
          for (--e; ++e < l; ) {
            if (
              ((r = n[e]),
              i.save(),
              (i.font = r.style + ' ' + r.weight + ' ' + ~~((r.size + 1) / o) + 'px ' + r.font),
              (a = i.measureText(r.text + 'm').width * o),
              (u = r.size << 1),
              r.rotate)
            ) {
              var h = Math.sin(r.rotate * y),
                x = Math.cos(r.rotate * y),
                p = a * x,
                g = a * h,
                m = u * x,
                b = u * h
              ;(a = ((Math.max(Math.abs(p + b), Math.abs(p - b)) + 31) >> 5) << 5),
                (u = ~~Math.max(Math.abs(g + m), Math.abs(g - m)))
            } else a = ((a + 31) >> 5) << 5
            if ((u > s && (s = u), c + a >= d << 5 && ((c = 0), (f += s), (s = 0)), f + u >= v)) break
            i.translate((c + (a >> 1)) / o, (f + (u >> 1)) / o),
              r.rotate && i.rotate(r.rotate * y),
              i.fillText(r.text, 0, 0),
              r.padding && ((i.lineWidth = 2 * r.padding), i.strokeText(r.text, 0, 0)),
              i.restore(),
              (r.width = a),
              (r.height = u),
              (r.xoff = c),
              (r.yoff = f),
              (r.x1 = a >> 1),
              (r.y1 = u >> 1),
              (r.x0 = -r.x1),
              (r.y0 = -r.y1),
              (r.hasText = !0),
              (c += a)
          }
          for (var w = i.getImageData(0, 0, (d << 5) / o, v / o).data, A = []; --e >= 0; )
            if (((r = n[e]), r.hasText)) {
              a = r.width
              var j = a >> 5
              u = r.y1 - r.y0
              var M
              for (M = 0; M < u * j; M++) A[M] = 0
              if (((c = r.xoff), null === c)) return
              f = r.yoff
              for (var O = 0, S = -1, T = 0; T < u; T++) {
                for (M = 0; M < a; M++) {
                  var k = j * T + (M >> 5),
                    z = w[((f + T) * (d << 5) + (c + M)) << 2] ? 1 << (31 - M % 32) : 0
                  ;(A[k] |= z), (O |= z)
                }
                O ? (S = T) : (r.y0++, u--, T--, f++)
              }
              ;(r.y1 = r.y0 + S), (r.sprite = A.slice(0, (r.y1 - r.y0) * j))
            }
        }
      }
      function a(t) {
        var r = t[0] / t[1]
        return function(t) {
          return [r * (t *= 0.1) * Math.cos(t), t * Math.sin(t)]
        }
      }
      function u(t) {
        var r = 4,
          n = r * t[0] / t[1],
          e = 0,
          i = 0
        return function(t) {
          var o = t < 0 ? -1 : 1
          switch ((Math.sqrt(1 + 4 * o * t) - o) & 3) {
            case 0:
              e += n
              break
            case 1:
              i += r
              break
            case 2:
              e -= n
              break
            default:
              i -= r
          }
          return [e, i]
        }
      }
      function c(t, r, n) {
        n >>= 5
        for (
          var e,
            i = t.sprite,
            o = t.width >> 5,
            a = t.x - (o << 4),
            u = 127 & a,
            c = 32 - u,
            f = t.y1 - t.y0,
            s = (t.y + t.y0) * n + (a >> 5),
            l = 0;
          l < f;
          l++
        ) {
          e = 0
          for (var h = 0; h <= o; h++) {
            var x = ((e << c) | (h < o ? (e = i[l * o + h]) >>> u : 0)) & r[s + h]
            if (x) return !0
          }
          s += n
        }
        return !1
      }
      function f(t, r) {
        var n = t.x + t.x1 > r[0].x && t.x + t.x0 < r[1].x && t.y + t.y1 > r[0].y && t.y + t.y0 < r[1].y
        return n
      }
      function s(t, r) {
        var n = t[0],
          e = t[1]
        r.x + r.x0 < n.x && (n.x = r.x + r.x0),
          r.y + r.y0 < n.y && (n.y = r.y + r.y0),
          r.x + r.x1 > e.x && (e.x = r.x + r.x1),
          r.y + r.y1 > e.y && (e.y = r.y + r.y1)
      }
      function l(t, r, n, e) {
        var i,
          o,
          a,
          u = e.width,
          s = e.height,
          l = r.x,
          h = r.y,
          x = Math.sqrt(u * u + s * s),
          y = p[e.spiral]([u, s], e.image),
          d = Math.random() < 0.5 ? 1 : -1,
          v = -d
        for (i = y((v += d)); i && ((o = ~~i[0]), (a = ~~i[1]), !(Math.min(Math.abs(o), Math.abs(a)) >= x)); )
          if (((r.x = l + o), (r.y = h + a), r.x + r.x0 < 0 || r.y + r.y0 < 0 || r.x + r.x1 > u || r.y + r.y1 > s))
            i = y((v += d))
          else {
            if ((!n || !c(r, t, u)) && (!n || f(r, n))) {
              for (
                var g,
                  m = r.sprite,
                  b = r.width >> 5,
                  w = u >> 5,
                  A = r.x - (b << 4),
                  j = 127 & A,
                  M = 32 - j,
                  O = r.y1 - r.y0,
                  S = (r.y + r.y0) * w + (A >> 5),
                  T = 0;
                T < O;
                T++
              ) {
                g = 0
                for (var k = 0; k <= b; k++) t[S + k] |= (g << M) | (k < b ? (g = m[T * b + k]) >>> j : 0)
                S += w
              }
              return delete r.sprite, !0
            }
            i = y((v += d))
          }
        return !1
      }
      function h(t) {
        if (t.length > 0) {
          var r = t.find(function(t) {
              0 === t.x
            }),
            n = t.find(function(t) {
              1 === t.x
            }),
            e = t.find(function(t) {
              0 === t.x
            }),
            i = t.find(function(t) {
              1 === t.x
            })
          ;(r && e) || t.push({ text: '', x: 0, y: 0 }), (n && i) || t.push({ text: '', x: 1, y: 1 })
        }
      }
      var x = n(1),
        y = Math.PI / 180,
        d = 64,
        v = 2048,
        p = { archimedean: a, rectangular: u }
      x.mix(x, { getContext: e, zeroArray: i, cloudBounds: s, place: l, cloudSprite: o, dataHandle: h }),
        (t.exports = x)
    },
  ])
})
