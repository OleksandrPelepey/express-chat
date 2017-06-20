(function() {
	angular
		.module('expressChat')
		.component('expressChatApp', {
			templateUrl: 'partials/express-chat-app.component.html',
			controller: ExpressChatAppController,
			controllerAs: 'expressChatAppCtrl'
		});

	function ExpressChatAppController($rootScope) {
	}

	ExpressChatAppController.$inject = ['$rootScope'];
})();