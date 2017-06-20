(function() {
	angular
		.module('expressChat')
		.factory('chatRoomsService', chatRoomsService);

		chatRoomsService.$inject = ['$http'];

		function chatRoomsService($http) {
			return {
				getRooms: getRooms
			}

			function getRooms() {
				return $http.get('/api/chat-rooms').then(function(res) {
					return res.data;
				});
			}
		}
})();