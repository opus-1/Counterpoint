/*
	 Copyright IBM Corp. 2016
*/
angular.module('counterpoint').directive('taskCard', function () {
	return {
		restrict: 'E',
		scope: {
			task_id: '=taskid',
			small: '='
		},
		templateUrl: 'client/templates/partials/taskCard.html',
		controller: 'TaskCtrl'
	};
});
