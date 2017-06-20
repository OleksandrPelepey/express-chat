(function() {
	angular
		.module('expressChat')
		.factory('chatRoomsService', ['$http', function($http) {
			return {
				getRooms: getRooms
			}
			
			function getRooms() {
				return $http.get('/api/chat-rooms').then(function(res) {
					return res.data;
				});
			}
		}])
})();