(function() {
	angular
		.module('expressChat')
		.factory('authHttpInterceptor', authHttpInterceptor);

		authHttpInterceptor.$inject = ['$rootScope'];
		
		function authHttpInterceptor($rootScope) {
			return {
				request: function(config) {
					config.headers.Authorization = 'JWT ' + $rootScope.userTaken;
					return config;
				}
			};
		}
})();