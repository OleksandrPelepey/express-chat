(function() {
  var appDependencies = [
    'LocalStorageModule', 
    'http-auth-interceptor', 
    'ngAnimate', 
    'ngTouch', 
    'ui.bootstrap', 
    'ui.router'
  ];

  angular
    .module('expressChat', appDependencies)
    .config(appConfig)
    .run(appRun);

    appConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider', '$httpProvider'];

    function appConfig($stateProvider, $urlRouterProvider, localStorageServiceProvider, $httpProvider) {
      // States configuration
      var states = [
        {
          name: 'initState',
          url: '/',
          component: 'chatRooms'
        },
        {
          name: 'auth',
          url: '/auth',
          component: 'auth'
        },
        {
          name: 'chat',
          url: '/chat/{chatId}',
          component: 'chatRoom'
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

    appRun.$inject = ['$transitions', '$state', 'expressChat.authService'];

    function appRun($transitions, $state, authService) {
      if (!authService.isLoged()) {
        $state.go('auth');
      }

      $transitions.onStart({to: '**'}, function(trans){
        if (trans.to().name !== 'auth' && !authService.isLoged()) {
          $state.go('auth');
        }
      });
    }
})();