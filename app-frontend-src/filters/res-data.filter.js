(function() {
	'use strict';

	angular
		.module('expressChat')
		.filter('resData', resDataFilter);

	// Return response body
	function resDataFilter() {
		return resDataFilter;

		function resDataFilter(res) {
			return res.data;
		}
	}
})();