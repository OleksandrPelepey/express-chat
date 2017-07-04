(function() {
	angular
		.module('expressChat')
		.component('chatRoom', {
			templateUrl: 'partials/chat-room.component.html',
			controller: ChatRoomController,
			controllerAs: 'vm'
		});

		ChatRoomController.$inject = [];
		
		function ChatRoomController() {}
})();