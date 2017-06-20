(function() {
	angular
		.module('expressChat')
		.component('chatRooms', {
			templateUrl: 'partials/chat-rooms.component.html',
			controller: ChatRoomController,
			controllerAs: 'vm'
		});

	function ChatRoomController(chatRoomsService) {
		var vm = this;
		vm.rooms = [];

		active();

		function active() {
			chatRoomsService.getRooms().then(function(rooms) {
				vm.rooms = rooms;
			});
		}
	}

	ChatRoomController.$inject = ['chatRoomsService'];
})();