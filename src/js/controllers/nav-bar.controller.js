(function() {
	angular
		.module('expressChat')
		.controller('NavBarController', NavBarController);

	NavBarController.$inject = ['$state', '$uibModal', 'expressChat.authService'];

	function NavBarController($state, $uibModal, authService) {
		var vm = this;
		vm.logout = logout;
		vm.openNewRoomPopup = openNewRoomPopup;

		function logout() {
			authService.logout();
			$state.go('auth');
		}

		function openNewRoomPopup() {
			var modalInstance = $uibModal.open({
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				component: 'newRoomComponent',
				size: 'lg'
			});
		}
	}
})();