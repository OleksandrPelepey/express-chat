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

		ChatRoomController.$inject = ['$scope'];
		
		function ChatRoomController($scope) {
			var vm = this;
		}
})();