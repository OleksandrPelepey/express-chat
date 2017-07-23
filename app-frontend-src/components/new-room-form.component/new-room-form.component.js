(function() {
  'use strict';

  angular
    .module('expressChat')
    .component('newRoom', {
      templateUrl: 'partials/new-room-form.component.html',
      controller: NewRoomFormController,
      controllerAs: 'vm',
      bindings: {
        close: '&'
      }
    });

  NewRoomFormController.$inject = ['$state', '$scope', 'chatRoomsService', 'usersService'];
  function NewRoomFormController($state, $scope, chatRoomsService, usersService) {
    var vm               = this;

    vm.newRoom           = {};
    vm.newRoom.public    = true;
    vm.newRoom.users     = [];

    vm.deleteUserFromNewRoom = deleteUserFromNewRoom;
    vm.formSubmit            = formSubmit;
    vm.getUsers              = getUsers;
    vm.pushUserToInvited     = pushUserToInvited;
    
    vm.$onInit = function() {
    };

    function formSubmit() {
      var newRoomData = angular.copy(vm.newRoom);
      newRoomData.users = newRoomData.users.map(function(user) {
        return user._id;
      });

      chatRoomsService.createRoom(vm.newRoom).then(function() {
        vm.close();
        $state.go('initState', {}, {reload: true});
      });
    }

    function getUsers(searchString) {
      return usersService.searchUsers(searchString).then(function(users) {
        if (users.length == 0) {
          return users;
        }
        
        return users.filter(function(user) {
          return !isUserAlreadySelected(user);
        });
      });
    }

    function isUserAlreadySelected(user) {
      for (var i = 0; i < vm.newRoom.users.length; i++) {
        if (vm.newRoom.users[i]._id == user._id) {
          return true;
        }
      }
      return false;
    }

    function pushUserToInvited($item, $model, $label, $event) {
      if (angular.isObject($model)) {
        vm.newRoom.users.push(angular.copy($model));
        clearUsersTypeahead();
      }
    }

    function clearUsersTypeahead() {
      $scope.newRoomForm.userSelect.$setViewValue('');
      $scope.newRoomForm.userSelect.$render();
    }

    function deleteUserFromNewRoom(index) {
      vm.newRoom.users.splice(index, 1);
    }
  }
})();
