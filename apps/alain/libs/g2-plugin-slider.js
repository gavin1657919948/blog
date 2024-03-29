var Slider = (function(t) {
  function e(n) {
    if (i[n]) return i[n].exports
    var a = (i[n] = { exports: {}, id: n, loaded: !1 })
    return t[n].call(a.exports, a, a.exports, e), (a.loaded = !0), a.exports
  }
  var i = {}
  return (e.m = t), (e.c = i), (e.p = ''), e(0)
})([
  function(t, e, i) {
    'use strict'
    var n = i(3),
      a = i(1)
    if (a && a.Plugin) {
      var s = a.Plugin
      s.slider = n
    } else console.err('Please load the G2 script first!')
    t.exports = n
  },
  function(t, e) {
    t.exports = window.G2
  },
  function(t, e, i) {
    'use strict'
    var n = i(1),
      a = n.Util,
      s = n.Canvas,
      r = s.Group,
      h = function o(t) {
        o.superclass.constructor.call(this, t)
      }
    ;(h.CFG = {
      range: null,
      middleAttr: null,
      backgroundElement: null,
      minHandleElement: null,
      maxHandleElement: null,
      middleHandleElement: null,
      currentTarget: null,
      layout: 'vertical',
      width: null,
      height: null,
      pageX: null,
      pageY: null,
      animate: !1,
      operable: !0,
    }),
      a.extend(h, r),
      a.augment(h, {
        _beforeRenderUI: function() {
          var t = this.get('layout'),
            e = this.get('backgroundElement'),
            i = this.get('minHandleElement'),
            n = this.get('maxHandleElement'),
            s = this.addShape('rect', { attrs: this.get('middleAttr') }),
            r = 'vertical' === t ? 'ns-resize' : 'ew-resize'
          this.add([e, i, n]),
            this.set('middleHandleElement', s),
            e.set('zIndex', 0),
            s.set('zIndex', 1),
            i.set('zIndex', 2),
            n.set('zIndex', 2),
            this.get('operable') &&
              (s.set('cursor', 'move'),
              a.each(i.get('children'), function(t) {
                t.set('cursor', r)
              }),
              a.each(n.get('children'), function(t) {
                t.set('cursor', r)
              })),
            this.sort()
        },
        _renderUI: function() {
          var t = this.get('layout')
          'horizontal' === t ? this._renderHorizontal() : this._renderVertical()
        },
        _transform: function(t) {
          var e = this.get('range'),
            i = e[0] / 100,
            n = e[1] / 100,
            a = this.get('width'),
            s = this.get('height'),
            r = this.get('minHandleElement'),
            h = this.get('maxHandleElement'),
            o = this.get('middleHandleElement')
          r.initTransform(),
            h.initTransform(),
            'horizontal' === t
              ? (o.attr({ x: a * i, y: 0, width: (n - i) * a, height: s }),
                r.translate(i * a, 0),
                h.translate(n * a, 0))
              : (o.attr({ x: 0, y: s * (1 - n), width: a, height: (n - i) * s }),
                r.translate(a / 2, (1 - i) * s),
                h.translate(a / 2, (1 - n) * s))
        },
        _renderHorizontal: function() {
          this._transform('horizontal')
        },
        _renderVertical: function() {
          this._transform('vertical')
        },
        _bindUI: function() {
          this.get('operable') &&
            (this.on('mousedown', a.wrapBehavior(this, '_onMouseDown')),
            this.on('mousemove', a.wrapBehavior(this, '_onMouseMove')),
            this.on('mouseleave', a.wrapBehavior(this, '_onMouseLeave')))
        },
        _isElement: function(t, e) {
          var i = this.get(e)
          if (t === i) return !0
          if (i.isGroup) {
            var n = i.get('children')
            return n.indexOf(t) > -1
          }
          return !1
        },
        _getRange: function(t, e) {
          var i = t + e
          return (i = i > 100 ? 100 : i), (i = i < 0 ? 0 : i)
        },
        _updateStatus: function(t, e) {
          var i,
            n = 'x' === t ? this.get('width') : this.get('height'),
            s = a.ucfirst(t),
            r = this.get('range'),
            h = this.get('page' + s),
            o = this.get('currentTarget'),
            g = this.get('rangeStash'),
            l = this.get('layout'),
            d = 'vertical' === l ? -1 : 1,
            c = e['page' + s],
            u = c - h,
            m = u / n * 100 * d
          r[1] <= r[0]
            ? (this._isElement(o, 'minHandleElement') || this._isElement(o, 'maxHandleElement')) &&
              ((r[0] = this._getRange(m, r[0])), (r[1] = this._getRange(m, r[0])))
            : (this._isElement(o, 'minHandleElement') && (r[0] = this._getRange(m, r[0])),
              this._isElement(o, 'maxHandleElement') && (r[1] = this._getRange(m, r[1]))),
            this._isElement(o, 'middleHandleElement') &&
              ((i = g[1] - g[0]),
              (r[0] = this._getRange(m, r[0])),
              (r[1] = r[0] + i),
              r[1] > 100 && ((r[1] = 100), (r[0] = r[1] - i))),
            this.fire('rangeChange', { range: r }),
            this.set('page' + s, c),
            this._renderUI(),
            this.get('canvas').draw()
        },
        _onMouseLeave: function() {
          var t = this.get('canvas').get('containerDOM')
          t.style.cursor = 'default'
        },
        _onMouseMove: function(t) {
          var e = t.currentTarget.get('cursor', !0),
            i = this.get('canvas').get('containerDOM')
          i && (e ? (i.style.cursor = e) : (i.style.cursor = 'default'))
        },
        _onMouseDown: function(t) {
          var e = t.currentTarget,
            i = t.event,
            n = this.get('range')
          i.stopPropagation(),
            i.preventDefault(),
            this.set('pageX', i.pageX),
            this.set('pageY', i.pageY),
            this.set('currentTarget', e),
            this.set('rangeStash', [n[0], n[1]]),
            this._bindCanvasEvents()
        },
        _bindCanvasEvents: function() {
          ;(this.onMouseMoveListener = a.addEventListener(
            document,
            'mousemove',
            a.wrapBehavior(this, '_onCanvasMouseMove')
          )),
            (this.onMouseUpListener = a.addEventListener(document, 'mouseup', a.wrapBehavior(this, '_onCanvasMouseUp')))
        },
        _onCanvasMouseMove: function(t) {
          var e = this.get('layout')
          'horizontal' === e ? this._updateStatus('x', t) : this._updateStatus('y', t)
        },
        _onCanvasMouseUp: function() {
          this._removeDocumentEvents()
        },
        _removeDocumentEvents: function() {
          this.onMouseMoveListener.remove(), this.onMouseUpListener.remove()
        },
      }),
      (t.exports = h)
  },
  function(t, e, i) {
    'use strict'
    var n = i(1),
      a = n.Util,
      s = n.Base,
      r = n.Frame,
      h = n.Canvas,
      o = i(2),
      g = 5,
      l = function d(t) {
        d.superclass.constructor.call(this, t), this._init()
      }
    ;(l.ATTRS = {
      charts: null,
      height: null,
      width: null,
      start: null,
      end: null,
      domId: null,
      xDim: null,
      yDim: null,
      middleAttr: { fill: '#D5DAE3', fillOpacity: 0.2 },
      backgroundAttr: { stroke: '#E2E2E2', fill: '#F3F3F3', opacity: 0.2, lineWidth: 1 },
      range: [0, 100],
      layout: 'horizontal',
      textAttr: { fill: '#333' },
      handleIcon: 'https://t.alipayobjects.com/images/rmsweb/T1YohhXd4bXXXXXXXX.png',
    }),
      a.extend(l, s),
      a.augment(l, {
        _init: function() {
          this.set('container', document.getElementById(this.get('domId'))), this.set('firstRender', 'true')
          var t = this.get('charts'),
            e = a.isArray(t) ? t[0] : t,
            i = e.get('parent') ? e.get('parent').get('forceFit') : e.get('forceFit')
          i && window.addEventListener('resize', a.wrapBehavior(this, '_initForceFitEvent'))
        },
        _initForceFitEvent: function() {
          var t = setTimeout(a.wrapBehavior(this, 'forceFit'), 200)
          clearTimeout(this.get('resizeTimer')), this.set('resizeTimer', t)
        },
        forceFit: function() {
          var t = this.get('charts'),
            e = a.isArray(t) ? t[0] : t,
            i = e.get('parent') ? e.get('parent').get('width') : e.get('width'),
            n = this.get('height')
          if (i !== this.get('width')) {
            var s = this.get('canvas'),
              r = e.get('options').filters,
              h = this.get('xDim')
            this.set('start', r[h][0]),
              this.set('end', r[h][1]),
              this.set('width', i),
              s.changeSize(i, n),
              this.set('changeSize', !0),
              this.repaint()
          }
        },
        _initCanvas: function() {
          var t = this.get('width'),
            e = this.get('height'),
            i = new h({ width: t, height: e, containerDOM: this.get('container'), capture: !1 })
          i.set('fontFamily', n.Global.fontFamily)
          var a = i.get('el')
          ;(a.style.position = 'absolute'),
            (a.style.top = 0),
            (a.style.left = 0),
            (a.style.zIndex = 3),
            this.set('canvas', i)
        },
        _initBackground: function(t) {
          var e = t.get('data')
          e instanceof r || (e = new r(e))
          var i,
            s = t.get('options'),
            h = this.get('xDim'),
            o = this.get('yDim')
          if (this.get('changeSize')) i = this.get('xScale')
          else {
            var g = t.get('scaleAssist')
            ;(g.defs = a.mix({}, !0, g.defs, s.scales)), (i = g.createScale(h, e))
          }
          if (o) {
            var l = new n.Chart({
              id: this.get('domId'),
              width: this.get('plotWidth'),
              height: this.get('height'),
              plotCfg: { margin: 0 },
            })
            l.source(e),
              l.col(h, { range: [0, 1], nice: !1 }),
              l.axis(!1),
              l.tooltip(!1),
              l.legend(!1),
              l
                .area()
                .position(h + '*' + o)
                .color('#CED1D4'),
              l
                .line()
                .position(h + '*' + o)
                .color('#CED1D4'),
              l.render()
            var d = l.get('canvas'),
              c = d.get('el').parentNode
            ;(c.style.marginLeft = this.get('marginLeft') + 'px'), this.set('bgChart', l)
          }
          this.set('xScale', i)
        },
        _initRange: function() {
          var t = this.get('start'),
            e = this.get('end'),
            i = this.get('xScale'),
            n = t ? i.scale(t) : 0.3,
            a = e ? i.scale(e) : 0.7,
            s = [100 * n, 100 * a]
          return this.set('range', s), s
        },
        _getHandleValue: function(t) {
          var e,
            i = this.get('range'),
            n = i[0] / 100,
            a = i[1] / 100,
            s = this.get('xScale')
          return (e =
            'min' === t
              ? this.get('start') ? this.get('start') : s.invert(n)
              : this.get('end') ? this.get('end') : s.invert(a))
        },
        _initHorizontalHandle: function(t) {
          var e = this.get('canvas'),
            i = e.addGroup(),
            n = this.get('height'),
            s = this.get('xScale'),
            r = s.getText(this._getHandleValue(t))
          i.addShape('Image', { attrs: { x: -n / 2, y: 0, width: n, height: n, img: this.get('handleIcon') } })
          var h = i.addShape('Text', {
            attrs: a.mix(
              {
                x: 'min' === t ? -(n / 2 + g) : n / 2 + g,
                y: n / 2,
                textAlign: 'min' === t ? 'end' : 'start',
                textBaseline: 'middle',
                text: r,
              },
              this.get('textAttr')
            ),
          })
          return this.set(t + 'TextElement', h), i
        },
        _initSliderBackground: function() {
          var t = this.get('canvas'),
            e = t.addGroup()
          return (
            e.initTransform(),
            e.translate(0, 0),
            e.addShape('Rect', {
              attrs: a.mix(
                { x: 0, y: 0, width: this.get('plotWidth'), height: this.get('height') },
                this.get('backgroundAttr')
              ),
            }),
            e
          )
        },
        _initSlider: function() {
          var t = this.get('canvas'),
            e = this._initRange(),
            i = this._initHorizontalHandle('min'),
            n = this._initHorizontalHandle('max'),
            a = this._initSliderBackground(),
            s = t.addGroup(o, {
              minHandleElement: i,
              maxHandleElement: n,
              backgroundElement: a,
              middleAttr: this.get('middleAttr'),
              range: e,
              layout: this.get('layout'),
              width: this.get('plotWidth'),
              height: this.get('height'),
            })
          s.translate(this.get('marginLeft'), 0), this.set('rangeElement', s)
        },
        _bindEvent: function() {
          var t = this,
            e = t.get('rangeElement'),
            i = t.get('xDim'),
            n = t.get('xScale')
          e.on('rangeChange', function(e) {
            var a = e.range,
              s = a[0] / 100,
              r = a[1] / 100,
              h = n.invert(s),
              o = n.invert(r),
              g = n.getText(h),
              l = n.getText(o)
            t._updateElement(g, l), t._updateLinkCharts(i, [h, o])
          })
        },
        _updateElement: function(t, e) {
          var i = this.get('minTextElement'),
            n = this.get('maxTextElement')
          if (
            (i.attr(a.mix({}, i.__attrs, { text: t })), n.attr(a.mix({}, n.__attrs, { text: e })), this.get('bgChart'))
          ) {
            var s = this.get('bgChart'),
              r = s.get('canvas').get('el'),
              h = r.toDataURL('image/png'),
              o = this.get('container')
            ;(o.style.width = this.get('width') + 'px'),
              (o.style.height = this.get('height') + 'px'),
              (o.style.backgroundImage = 'url(' + h + ')'),
              (o.style.backgroundRepeat = 'no-repeat'),
              (o.style.backgroundPositionX = this.get('marginLeft') + 'px'),
              (o.style.backgroundSize = 'contain'),
              s.destroy(),
              this.set('bgChart', null)
          }
          this.set('firstRender', !1)
        },
        _updateLinkCharts: function(t, e) {
          var i = this,
            n = a.isArray(i.get('charts')) ? i.get('charts') : [i.get('charts')]
          if (n[0].get('parent')) {
            a.each(n, function(i) {
              i.filter(t, e)
            })
            var s = n[0].get('parent')
            i.get('firstRender') ? s.render() : s.repaint()
          } else
            a.each(n, function(n) {
              n.filter(t, e), i.get('firstRender') ? n.render() : n.repaint()
            })
        },
        render: function() {
          var t,
            e,
            i = this.get('charts'),
            n = a.isArray(i) ? i[0] : i
          n.get('parent')
            ? ((t = n.get('parent').get('plotRange')), (e = n.get('parent').get('width')))
            : ((t = n.get('plotRange')), (e = n.get('width'))),
            this.set('plotWidth', t.tr.x - t.tl.x),
            this.set('marginLeft', t.tl.x),
            this.set('width', e),
            this.get('canvas') || this._initCanvas(),
            this._initBackground(n),
            this._initSlider(),
            this._bindEvent()
          var s = this.get('xDim'),
            r = this._getHandleValue('min'),
            h = this._getHandleValue('max')
          this.get('changeSize') || this._updateLinkCharts(s, [r, h]), this.get('canvas').draw()
        },
        destroy: function() {
          var t = this.get('rangeElement')
          t.off('rangeChange'), this.get('bgChart') && this.get('bgChart').destroy(), this.get('canvas').destroy()
          for (var e = this.get('container'); e.hasChildNodes(); ) e.removeChild(e.firstChild)
          l.superclass.destroy.call(this),
            window.removeEventListener('resize', a.getWrapBehavior(this, '_initForceFitEvent'))
        },
        clear: function() {
          var t = this.get('container')
          ;(t.style.backgroundImage = ''),
            this.get('canvas').clear(),
            this.get('bgChart') && this.get('bgChart').destroy(),
            this.set('bgChart', null)
        },
        repaint: function() {
          this.set('firstRender', !1), this.clear(), this.render()
        },
      }),
      (t.exports = l)
  },
])
