(function() {
	angular
		.module('expressChat')
		.component('chatRooms', {
			templateUrl: 'partials/chat-rooms.component.html',
			controller: ChatRoomsController,
			controllerAs: 'vm'
		});

	ChatRoomsController.$inject = ['chatRoomsService'];

	function ChatRoomsController(chatRoomsService) {
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