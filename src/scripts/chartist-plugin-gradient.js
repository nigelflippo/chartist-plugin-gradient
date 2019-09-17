/**
 * Chartist.js plugin to display gradient above and below threshold.
 *
 */
/* global Chartist */
(function (window, document, Chartist) {
	'use strict';

	function getDefaultOptions (maskIds) {
		return {
			classNames: {
				aboveBase: 'ct-base-above',
				belowBase: 'ct-base-below'
			},
			maskNames: {
				aboveBase: 'ct-base-mask-above-' + maskIds.maskAboveId,
				belowBase: 'ct-base-mask-below-' + maskIds.maskBelowId
			}
		};
	}

	function generateGradient (options) {
		var y1 = options.isAbove ? '0%' : '100%';
		var y2 = options.isAbove ? '100%' : '0%';
		var id = options.isAbove ? 'above' : 'below';
		var gradient = new Chartist.Svg('linearGradient')
			.attr({
				'id': 'ct-gradient-' + id,
				'x1': '0%',
				'x2': '0%',
				'y1': y1,
				'y2': y2
			});
		var start = new Chartist.Svg('stop')
			.attr({
				'offset': '0%',
				'stop-color': '#fff',
				'stop-opacity': '1.0'
			});
		var stop = new Chartist.Svg('stop')
			.attr({
				'offset': '100%',
				'stop-color': '#fff',
				'stop-opacity': '0.01'
			});
		gradient.append(start);
		gradient.append(stop);
		var svgDefs = new Chartist.Svg('defs');
		svgDefs.append(gradient);
		return svgDefs;
	}

	function createMasks (data, options) {
		var defs = data.svg.querySelector('defs') || data.svg.elem('defs');
		var projectedBounds = data.chartRect.height() - data.axisY.projectValue(options.threshold) + data.chartRect.y2;
		var width = data.svg.width() || data.options.width;
		var height = data.svg.height() || data.options.height;

		var gradientAbove = generateGradient({ isAbove: true });
		var gradientBelow = generateGradient({ isAbove: false });
		data.svg.append(gradientAbove);
		data.svg.append(gradientBelow);

		defs
			.elem('mask', {
				x: 0,
				y: 0,
				width: width,
				height: height,
				id: options.maskNames.aboveBase
			})
			.elem('rect', {
				x: 0,
				y: 0,
				width: width,
				height: projectedBounds,
				style: 'fill: url(#ct-gradient-above)'
			});
		defs
			.elem('mask', {
				x: 0,
				y: 0,
				width: width,
				height: height,
				id: options.maskNames.belowBase
			})
			.elem('rect', {
				x: 0,
				y: projectedBounds,
				width: width,
				height: height - projectedBounds,
				style: 'fill: url(#ct-gradient-below)'
			});

		return defs;
	}

	Chartist.plugins = Chartist.plugins || {};
	Chartist.plugins.ctAreaGradient = function (options) {

		function uuid() {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			});
		}

		var maskIds = {
			maskAboveId: uuid(),
			maskBelowId: uuid()
		};
		options = Chartist.extend({}, getDefaultOptions(maskIds), options);

		return function ctAreaGradient (chart) {
			if (chart instanceof Chartist.Line) {
				chart.on('draw', function (data) {
					if (data.type === 'area') {
						data.element
							.parent()
							.elem(data.element._node.cloneNode(true))
							.attr({
								mask: 'url(#' + options.maskNames.aboveBase + ')'
							})
							.addClass(options.classNames.aboveBase);
						data.element
							.attr({
								mask: 'url(#' + options.maskNames.belowBase + ')'
							})
							.addClass(options.classNames.belowBase);
					}
				});

				chart.on('created', function (data) {
					createMasks(data, options);
				});
			}
		};
	};
}(window, document, Chartist));
