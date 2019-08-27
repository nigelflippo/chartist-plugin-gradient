/**
 * umd
 * ===
 *
 * Wraps the library into an universal module definition (AMD + CommonJS + Global).
 *
 * Link: https://github.com/bebraw/grunt-umd
 */

'use strict';

module.exports = function (grunt) {
  return {
    dist: {
      src: '<%= pkg.config.src %>/scripts/chartist-plugin-gradient.js',
      dest: '<%= pkg.config.dist %>/chartist-plugin-gradient.js',
      objectToExport: 'Chartist.plugins.ctAreaGradient',
      indent: '  ',
      deps: {
        default: ['Chartist', 'uuid'],
        amd: ['chartist', 'uuid'],
        cjs: ['chartist', 'uuid'],
        global: ['Chartist']
      }
    }
  };
};
