/* global Meteor */
/* global Messages */
/* global Tasks */
/* global Swimlanes */
angular.module('counterpoint').controller('KanbanBoardCtrl', function ($scope, dragulaService, $mdDialog, $rootScope) {
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
		}

		if (target_list) {
			Swimlanes.update({ _id: target_list._id }, { $set: { tasks: target_list.tasks } });
		}
		if (source_list && target_list) {
			var subject = source_list.name + " --> " + target_list.name;
			var username = Meteor.user().getName();
			var text = username + " moved a task"
			console.debug(el);
			// console.debug(subject);
			// var task = el.context.attributes['taskid'];
			// console.debug(task);
			// var text = username + " moved \"" + task.name + "\"";
			// console.debug(text);
			Messages.insert({ subject: subject, username: username, text: text, createdAt: Date.now(), read: false });
		}

	});

	function insertTask(name, list_id) {
		Tasks.insert({
			name: name
		}, function (error, task_id) {
			Swimlanes.update({ _id: list_id }, { $push: { tasks: task_id } });
		});
	};

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
			Swimlanes.insert({ name: result, order: order + 1 });
			var username = Meteor.user().getName();
			var text = "by " + username;
			Messages.insert({ subject: "New list added", username: text, createdAt: Date.now(), read: false })
		}, function () {
		});
	};


});
