(function() {
	angular
		.module('expressChat')
		.component('chatRooms', {
			templateUrl: 'partials/chat-rooms.component.html',
			controller: ChatRoomController,
			controllerAs: 'vm'
		});

	ChatRoomController.$inject = ['chatRoomsService'];

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
})();