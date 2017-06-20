(function() {
	angular
		.module('expressChat')
		.factory('authHttpInterceptor', authHttpInterceptor);

		function authHttpInterceptor($rootScope) {
			return {
				request: function(config) {
					config.headers.Authorization = $rootScope.userTaken;
					return config;
				}
			};
		}

		authHttpInterceptor.$inject = ['$rootScope'];
})();