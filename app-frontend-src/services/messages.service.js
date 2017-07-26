(function() {
	'use strict';

	angular
		.module('expressChat')
		.factory('messagesService', Service);

	Service.$inject = ['$http', 'resDataFilter'];
	function Service($http, resDataFilter) {
		var service = {
			getAll: getAll,
			sendMessage: sendMessage
		};

		var baseUrl = '/api'
		
		return service;

		/**
		 * Get all messages of the room
		 * @param {number} chatRoomId
		 * @return {Promise} request Promise 
		 */
		function getAll(chatRoomId) {
			return $http.get(baseUrl + '/messages/' + chatRoomId).then(resDataFilter);
		}
		
		/**
		 * Send new message
		 * @param {number} chatRoomId
		 * @param {Object} message 
		 * @return {Promise} request Promise 
		 */
		function sendMessage(chatRoomId, message) {
			return $http.post(baseUrl + '/message/'  + chatRoomId, message).then(resDataFilter);
		}
	}
})();