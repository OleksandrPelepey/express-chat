(function() {
	'use strict';

	angular
		.module('expressChat')
		.directive('tagManager', TagManagerDirective);

	TagManagerDirective.$inject = [];

	function TagManagerDirective() {
		var directive = {
				require: '?ngModel',
				bindToController: true,
				templateUrl: 'partials/tag-manager.directive.html',
				controller: ControllerController,
				controllerAs: 'vm',
				link: link,
				restrict: 'AE'
		};
		return directive;
		
		function link(scope, element, attrs, ngModel) {
      if (!ngModel) return; // do nothing if no ng-model

			var userSearchInput = angular.element(element.children()[0]);
			
			userSearchInput.on('change', function() {
				console.log( userSearchInput.val() );
			});

			scope.tags = ngModel.$modelValue || [];
			
			ngModel.$setViewValue(scope.tags);
		}
	}
	/* @ngInject */
	function ControllerController () {
		
	}
})();