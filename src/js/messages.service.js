(function () {
  angular.module('expressChat')
    .factory('messagesService', MessagesService);

  function MessagesService($http) {
    var url = 'api/messages';
    var service = {};

    service.getMessages = function() {
      return $http.get(url);
    };

    service.addMessages = function(newMessages) {
      var data = {new_messages: newMessages};
      return $http.post(url, data);
    };

    return service;
  }

  MessagesService.$inject = ['$http'];
})();
