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

		ChatRoomController.$inject = ['$state', '$rootScope', '$scope', 'messagesService' ];
		
		function ChatRoomController($state, $rootScope, $scope, messagesService) {
			var vm = this;
			vm.editedMessage = {};
			vm.sendMessage = sendMessage;
			vm.currentUser = $rootScope.currentUser;
			console.log(vm.currentUser);

			vm.$onInit = function() {
				if (angular.equals(vm.chatRoom, {}) ) {
					return $state.go('initState');
				}
				runChatSocket();
			}

			function sendMessage() {
				messagesService.sendMessage(vm.chatRoom._id, vm.editedMessage).then(function(message) {
					vm.messages.push(message);
					vm.socket.send(message);
					vm.editedMessage = {};
				});
			}

			function runChatSocket() {
				vm.socket = io('/chat?room=' + vm.chatRoom._id);

				vm.socket.on('message', function(message) {
       		$scope.$apply(function() {
						vm.messages.push(message);
					});
				});
			}
		}
})();
