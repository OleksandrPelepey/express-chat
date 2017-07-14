(function() {
	angular
		.module('expressChat')
    .config(appConfig);

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
      // Local Storage configuration
      localStorageServiceProvider.setPrefix('ec');
			
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

      $httpProvider.interceptors.push('authHttpInterceptor');

    }

})();