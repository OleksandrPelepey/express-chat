(function() {
	angular
		.module('expressChat')
		.controller('NavBarController', NavBarController);

	NavBarController.$inject = ['$state', 'expressChat.authService'];

	function NavBarController($state, authService) {
		var vm = this;
		vm.logout = logout;

		function logout() {
			authService.logout();
			$state.go('auth');
		}
	}
})();