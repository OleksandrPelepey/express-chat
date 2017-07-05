(function() {
	angular
		.module('expressChat')
		.factory('chatRoomsService', chatRoomsService);

		chatRoomsService.$inject = ['$http'];

		function chatRoomsService($http) {
			var baseUrl = '/api';

			return {
				getRooms: getRooms,
				getRoom:  getRoom
			}

			function getRooms() {
				return $http.get(baseUrl + '/chat-rooms').then(function(res) {
					return res.data;
				});
			}

			function getRoom(id) {
				return $http.get(baseUrl + '/chat-room/' + id).then(function(res) {
					return res.data;
				});
			}
		}
})();