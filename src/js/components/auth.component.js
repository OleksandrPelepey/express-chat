(function() {
	angular
		.module('expressChat')
		.component('auth', {
			templateUrl: 'partials/auth.component.html',
			controller: AuthController,
			controllerAs: 'vm'
		});

	AuthController.$inject = ['$state', 'expressChat.authService'];

	function AuthController($state, authService) {
		var vm = this;
		vm.addAlert = addAlert;
		vm.alerts = [];
		vm.auth = auth;
		vm.credentials = {};
		vm.removeAlert = removeAlert;
		vm.whetherRegNewUser = false;


		function auth() {
			if (vm.whetherRegNewUser) {
				authService.signup(vm.credentials).then(onSignIn);
			} else {
				authService.signin(vm.credentials).then(onSignIn);
			}
		} 

		function addAlert(msg) {
			vm.alerts.push({
				type: 'danger',
				msg: msg
			});
		}

		function removeAlert(index) {
			vm.alerts.splice(index, 1);
		}

		function onSignIn(res) {
			if (!res.success) { 
				vm.addAlert(res.message) 
			} else {
				$state.go('initState');
			}
			return res;
		}
	}
})();