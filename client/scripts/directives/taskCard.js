angular.module('counterpoint').directive('taskCard', function () {
	return {
		restrict: 'E',
		scope: {
			task_id: '=taskid'
		},
		templateUrl: 'client/templates/partials/taskCard.html',
		controller: 'TaskCtrl'
	};
});
