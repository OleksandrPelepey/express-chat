(function() {
	angular
		.module('expressChat')
		.component('expressChatApp', {
			templateUrl: 'partials/express-chat-app.component.html',
			controller: ExpressChatAppController,
			controllerAs: 'expressChatAppCtrl'
		});

	ExpressChatAppController.$inject = ['$rootScope'];

	function ExpressChatAppController($rootScope) {
	}
})();