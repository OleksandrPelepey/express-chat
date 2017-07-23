(function() {
	'use strict';

	angular
		.module('expressChat')
		.factory('usersService', UsersService);

	UsersService.$inject = ['$http', '$q', 'resDataFilter'];
	function UsersService($http, $q, resDataFilter) {
		var apiBase = '/api';

		var service = {
			searchUsers: searchUsers
		};
		
		return service;

		function searchUsers(queryString) {
			if (queryString) {
				var queryUrl = apiBase + '/users/s/' + queryString;
				return $http.get(queryUrl).then(resDataFilter);
			} else {
				return $q(function(resolve, reject) {
					resolve({});
				});
			}
		}
	}
})();