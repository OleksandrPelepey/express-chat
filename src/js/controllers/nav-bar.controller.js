(function() {
	angular
		.module('expressChat')
		.controller('NavBarController', NavBarController);

	function NavBarController($state, authService) {
		var vm = this;
		vm.logout = logout;

		function logout() {
			authService.logout();
			$state.go('auth');
		}
	}

	NavBarController.$inject = ['$state', 'expressChat.authService'];
})();