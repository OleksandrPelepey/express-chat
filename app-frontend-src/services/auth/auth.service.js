(function() {
	angular
		.module('expressChat')
		.factory('expressChat.authService', authService);

		authService.$inject = ['$rootScope', '$http', '$q', 'localStorageService'];

		function authService($rootScope, $http, $q, localStorageService) {
			var unbidnCurrentUser = localStorageService.bind($rootScope, 'currentUser');
			var unbidnUserTaken = localStorageService.bind($rootScope, 'userTaken');

			return {
				signup: signup,
				signin: signin,
				logout: logout,
				isLoged: isLoged
			}

			function signup(credentials) {
				return $http.post('/signup', credentials).then(function(res) {
					return saveUser(res.data);
				});
			}

			function signin(credentials) {
				return $http.post('/signin', credentials).then(function(res) {
					return saveUser(res.data);
				});
			}

			function logout() {
				$rootScope.currentUser = '';
				$rootScope.userTaken = '';
			}

			function isLoged() {
				return !!$rootScope.currentUser;
			}

			function saveUser(res) {
				if (res.success) {
					$rootScope.currentUser = res.user;
					$rootScope.userTaken = res.taken;
				}
				return res;
			}
		}
})();