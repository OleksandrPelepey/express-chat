(function() {
  var appDependencies = [
    'LocalStorageModule', 
    'http-auth-interceptor', 
    'ngAnimate', 
    'ngTouch', 
    'ui.bootstrap', 
    'ui.router',
    'permission', 
    'permission.ui'
  ];

  angular
    .module('expressChat', appDependencies)
    .config(appConfig)
    .run(appRun);

    appConfig.$inject = [
      '$stateProvider', 
      '$urlRouterProvider', 
      'localStorageServiceProvider', 
      '$httpProvider'
    ];

    function appConfig(
      $stateProvider, 
      $urlRouterProvider, 
      localStorageServiceProvider, 
      $httpProvider
    ) {
      // States configuration
      var states = [
        {
          name: 'initState',
          url: '/',
          component: 'chatRooms',
          data: {
            permissions: {
              only: 'isAuthorized',
              redirectTo: {
                state: 'auth'
              }
            }
          }
        },
        {
          name: 'auth',
          url: '/auth',
          component: 'auth'
        },
        {
          name: 'chat',
          url: '/chat/{chatId}',
          component: 'chatRoom',
          resolve: {
            chatRoomsService: 'chatRoomsService',
            $stateParams: '$stateParams',
            chatRoom: function(chatRoomsService, $stateParams) {
              return chatRoomsService.getRoom($stateParams.chatId);
            }
          },
          data: {
            permissions: {
              only: 'isAuthorized',
              redirectTo: {
                state: 'auth'
              }
            }
          }
        }
      ];

      states.forEach(function(state) {
        $stateProvider.state(state);
      });

      $urlRouterProvider.otherwise('/');

      // Local Storage configuration
      localStorageServiceProvider.setPrefix('ec');

      $httpProvider.interceptors.push('authHttpInterceptor');

    }

    appRun.$inject = ['$transitions', '$state', 'PermPermissionStore', 'expressChat.authService'];

    function appRun($transitions, $state, PermPermissionStore, authService) {
      PermPermissionStore
        .definePermission('isAuthorized', function() {
          return authService.isLoged();
        });
    }
})();