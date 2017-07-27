(function() {
  var appDependencies = [
    'LocalStorageModule', 
    'http-auth-interceptor', 
    'ngAnimate', 
    'ngTouch', 
    'ui.bootstrap', 
    'ui.router',
    'permission', 
    'permission.ui',
    'luegg.directives'
  ];

  angular
    .module('expressChat', appDependencies)
    .run(appRun);

    appRun.$inject = ['$transitions', '$state', 'PermPermissionStore', 'expressChat.authService'];

    function appRun($transitions, $state, PermPermissionStore, authService) {
      PermPermissionStore
        .definePermission('isAuthorized', function() {
          return authService.isLoged();
        });
    }
})();