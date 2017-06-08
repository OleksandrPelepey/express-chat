(function() {
  angular.module('expressChat')
    .component('chatApp', {
      templateUrl: 'partials/chat-app.component.html',
      controller: ChatAppController,
      controllerAs: 'chatAppCtrl'
    });

  function ChatAppController(messagesService) {
    var vm = this;

    vm.title = 'Express Chat';

    vm.$onInit = function() {
      messagesService.getMessages().then(function(res) {
        vm.messages = res.data;
      });
    }

    vm.addNewMessage = function(newMessage) {
      var newMessages = [];
      newMessages.push(newMessage);

      messagesService.addMessages(newMessages).then(function(res) {
        var newMessages = res.data;

        vm.messages = vm.messages.concat(newMessages);
      });
    };
  }

  ChatAppController.$inject = ['messagesService'];
})();
