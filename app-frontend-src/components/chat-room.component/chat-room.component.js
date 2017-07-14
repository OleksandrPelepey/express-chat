(function() {
	angular
		.module('expressChat')
		.component('chatRoom', {
			templateUrl: 'partials/chat-room.component.html',
			controller: ChatRoomController,
			controllerAs: 'vm',
			bindings: {
				chatRoom: '<'
			}
		});

		ChatRoomController.$inject = ['$state'];
		
		function ChatRoomController($state) {
			var vm = this;


			vm.$onInit = function() {
				if (angular.equals(vm.chatRoom, {}) ) {
					$state.go('initState');
				}
			}
		}
})();
