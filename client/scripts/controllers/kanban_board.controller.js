angular.module('counterpoint').controller('KanbanBoardCtrl', function ($scope, dragulaService, $mdDialog) {


	$scope.helpers({
		lists: () => Swimlanes.find({})
	});

	$scope.getTask = function (id) {
		return Tasks.findOne({ _id: id });
	}

	$scope.newTaskDialog = function (ev, list_id) {
		var confirm = $mdDialog.prompt()
			.title('Add New Task')
			.textContent('Enter the name of the task.')
			.placeholder('Task name')
			.ariaLabel('Task name')
			.targetEvent(ev)
			.ok('Add')
			.cancel('Cancel');
		$mdDialog.show(confirm).then(function (result) {
			insertTask(result, list_id);
		}, function () {
		});
	}

	$scope.$on('swimlanes.drop-model', function (e, el) {
		// it got moved!
    });

	function insertTask(name, list_id) {
		Tasks.insert({
			name: name
		}, function (error, task_id) {
			Swimlanes.update({ _id: list_id }, { $push: { tasks: task_id } });
		});
	}

});
