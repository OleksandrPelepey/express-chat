(function() {
  'use strict';

  angular
    .module('expressChat')
    .component('newRoomComponent', {
      templateUrl: 'partials/new-room-form.component.html',
      controller: NewRoomFormController,
      controllerAs: 'vm',
      bindings: {
        close: '&'
      }
    });

  NewRoomFormController.$inject = ['$state', '$scope', 'chatRoomsService'];
  function NewRoomFormController($state, $scope, chatRoomsService) {
    var vm = this;
    vm.newRoom = {};
    vm.newRoom.public = true;
    vm.formSubmit = formSubmit;
    
    vm.$onInit = function() {
      console.log($scope);
    };

    function formSubmit() {
      chatRoomsService.createRoom(vm.newRoom).then(function() {
        vm.close();
        $state.go('initState', {}, {reload: true});
      });
    }
  }
})();
