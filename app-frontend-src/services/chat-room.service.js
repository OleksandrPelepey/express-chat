(function() {
	angular
		.module('expressChat')
		.factory('chatRoomsService', chatRoomsService);

		chatRoomsService.$inject = ['$http'];

		function chatRoomsService($http) {
			var baseUrl = '/api';

			return {
				getRooms: getRooms,
				getRoom:  getRoom,
				createRoom: createRoom
			}

			function getRooms() {
				return $http.get(baseUrl + '/chat-rooms').then(returnResData);
			}

			function getRoom(id) {
				return $http.get(baseUrl + '/chat-room/' + id).then(returnResData);
			}

			function createRoom(roomData) {
				return $http.post(baseUrl + '/chat-room', roomData).then(returnResData);
			}

			function returnResData(res) {
				return res.data;
			}
		}
})();