/*
	 Copyright IBM Corp. 2016
*/
angular.module('counterpoint').directive('taskState', function () {
	return {
		restrict: 'E',
		scope: {
	     task: '='
		},
		templateUrl: 'client/templates/partials/taskState.html'
  };
});
