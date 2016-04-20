angular.module('counterpoint').controller('KanbanBoardCtrl', function ($scope, dragulaService, $mdDialog) {


	$scope.helpers({
		lists: () => Swimlanes.find({}, { sort: ['order'] })
	});

	$scope.getTask = function (id) {
		return Tasks.findOne({ _id: id });
	};

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
	};

	$scope.$on('swimlanes.drop-model', function (e, el, target, source) {
		var source_list = null;
		var target_list = null;
		for (var i in $scope.lists) {
			var list = $scope.lists[i];
			if (list._id == source.context.attributes['data-list-id'].value)
			{ source_list = list; }
			else if (list._id == target.context.attributes['data-list-id'].value)
			{ target_list = list; }

			if (source_list && target_list) {
				break;
			}
		}

		if (source_list) {
			Swimlanes.update({ _id: source_list._id }, { $set: { tasks: source_list.tasks } });
			// console.debug(source_list)
		}

		if (target_list) {
			Swimlanes.update({ _id: target_list._id }, { $set: { tasks: target_list.tasks } });
			// console.debug(target_list)
		}
		if (source_list && target_list) {
			var subject = source_list.name + " --> " + target_list.name;
			var username = Meteor.user().profile.name;
			var text = username + " moved task"; 
			Messages.insert({ subject: subject, username: username, text: text, createdAt: Date.now(), read: false });
		}

	});

	function insertTask(name, list_id) {
		Tasks.insert({
			name: name
		}, function (error, task_id) {
			Swimlanes.update({ _id: list_id }, { $push: { tasks: task_id } });
		});
	}
	
	$scope.addNewList = function (ev) {
		var confirm = $mdDialog.prompt()
			.title('Create A New List')
			.textContent('Enter the name of the list.')
			.placeholder('List name')
			.ariaLabel('List name')
			.targetEvent(ev)
			.ok('Add')
			.cancel('Cancel');
		$mdDialog.show(confirm).then(function (result) {
			var order = Swimlanes.find({}).count();
			Swimlanes.insert({name: result, order: order + 1});
			var username = Meteor.user().profile.name;
			var text = "by " + username;
			Messages.insert({subject: "New list added", username: text , createdAt: Date.now(), read: false })
		}, function () {
		});
	};

});
