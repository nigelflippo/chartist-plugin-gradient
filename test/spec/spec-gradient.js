describe('ctPointLabels', function () {
	'use strict';

	it('should be defined in chartist', function () {
		expect(window.Chartist.plugins.ctAreaGradient).toBeDefined();
	});

	it('appends ct-base-above and ct-base-below classes', function () {
    new window.Chartist.Line('#chart', {
      series: [
        [1, 2, 10, -1, -2, -3, -6, 2, 5, 20, -4]
      ]
    }, {
      showArea: true,
      plugins: [
        window.Chartist.plugins.ctAreaGradient({
          threshold: 0
        })
      ]
    });
		expect(document.querySelector('#chart svg .ct-base-below')).toBeDefined();
		expect(document.querySelector('#chart svg .ct-base-above')).toBeDefined();
  });
});
