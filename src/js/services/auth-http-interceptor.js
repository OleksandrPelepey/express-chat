(function() {
	angular
		.module('expressChat')
		.factory('authHttpInterceptor', authHttpInterceptor);

		authHttpInterceptor.$inject = ['$rootScope'];
		
		function authHttpInterceptor($rootScope) {
			return {
				request: function(config) {
					config.headers.Authorization = $rootScope.userTaken;
					return config;
				}
			};
		}
})();