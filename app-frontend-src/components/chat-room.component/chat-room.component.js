(function() {
	angular
		.module('expressChat')
		.component('chatRoom', {
			templateUrl: 'partials/chat-room.component.html',
			controller: ChatRoomController,
			controllerAs: 'vm',
			bindings: {
				chatRoom: '<',
				messages: '<'
			}
		});

		ChatRoomController.$inject = ['$state', '$rootScope', 'messagesService' ];
		
		function ChatRoomController($state, $rootScope, messagesService) {
			var vm = this;
			vm.editedMessage = {};
			vm.sendMessage = sendMessage;
			vm.currentUser = $rootScope.currentUser;
				console.log(vm.currentUser);


			vm.$onInit = function() {
				if (angular.equals(vm.chatRoom, {}) ) {
					return $state.go('initState');
				}
			}

			function sendMessage() {
				messagesService.sendMessage(vm.chatRoom._id, vm.editedMessage).then(function(message) {
					vm.messages.push(message);
					vm.editedMessage = {};
				});
			}
		}
})();
