(function() {
	angular
		.module('expressChat')
		.factory('chatRoomsService', chatRoomsService);

		chatRoomsService.$inject = ['$http', 'resDataFilter'];

		function chatRoomsService($http, resDataFilter) {
			var baseUrl = '/api';

			return {
				getRooms: getRooms,
				getRoom:  getRoom,
				createRoom: createRoom
			}

			function getRooms() {
				return $http.get(baseUrl + '/chat-rooms').then(resDataFilter);
			}

			function getRoom(id) {
				return $http.get(baseUrl + '/chat-room/' + id).then(resDataFilter);
			}

			function createRoom(roomData) {
				return $http.post(baseUrl + '/chat-room', roomData).then(resDataFilter);
			}
		}
})();