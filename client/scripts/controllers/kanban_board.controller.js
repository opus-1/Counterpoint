/* global Meteor */
/* global Messages */
/* global Tasks */
/* global Swimlanes */
angular.module('counterpoint').controller('KanbanBoardCtrl',
	function ($scope, dragulaService, $mdDialog, $rootScope) {
	$scope.helpers({
		lists: () => Swimlanes.find({}, { sort: ['order'] })
	});

	$scope.$emit('close-left-menu');

	$scope.getTask = function (id) {
		return Tasks.findOne({ _id: id });
	};

	$scope.dragging = false;
	$scope.scroll = false;
	document.body.addEventListener('mousemove', function($event) {
		$scope.mouseY = $event.screenY;

		if(!$scope.dragging) {
			$scope.scroll = false;
		}
		if($scope.dragging && !$scope.scroll) {
			$scope.scroll = true;
			scroll();
			// var startLocation = $(".page-content")[0].scrollTop;
			// var mousePosition = $event.screenY;
			// var windowHeight = window.innerHeight;
			// var elementHeight = $(".page-content")[0].scrollHeight;
			// var endLocation = startLocation;
			// if(mousePosition > (windowHeight / 3 * 2))
			// {
			// 	endLocation += startLocation;
			// 	if(endLocation > elementHeight)
			// 	{ endLocation = elementHeight; }
			// }
			//
			// if(mousePosition < (windowHeight / 3))
			// {
			// 	endLocation -= 10;
			// 	if(endLocation < 0)
			// 	{ endLocation = 0; }
			// }
			//
			// console.debug("Start/End: " + startLocation + "/" + endLocation)
      // // var increments = distance/(duration/16);
			//
			// $scope.scroll = true;
			// $(".page-content")[0].scrollTop = endLocation;
			// // var coords ={ y: $event.screenY, x: $event.screenX };
		}
	});

	var scroll = function() {
		var startLocation = $(".page-content")[0].scrollTop;
		var mousePosition = $scope.mouseY;
		var windowHeight = window.innerHeight;
		var elementHeight = $(".page-content")[0].scrollHeight;
		var endLocation = startLocation;
		if(mousePosition > (windowHeight / 3 * 2))
		{
			var amount = getSpeed(windowHeight, mousePosition);
			endLocation += amount;
			if(endLocation > elementHeight)
			{ endLocation = elementHeight; }
		}

		if(mousePosition < (windowHeight / 3))
		{
			var amount = getSpeed(windowHeight, mousePosition);
			endLocation -= amount;
			if(endLocation < 0)
			{ endLocation = 0; }
		}

		$(".page-content")[0].scrollTop = endLocation;

		if($scope.scroll == true)
		{
			setTimeout(function() { scroll(); }, 30)
		}
	}

	var getSpeed = function(heightY, mouseY) {
		var amount = 10;
		var fromMiddle = Math.abs((heightY / 2) - mouseY);
		if(fromMiddle / 10 > amount) { amount = fromMiddle / 10; }
		return amount;
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
	};

	$scope.$on('swimlanes.drag', function() {
		$scope.dragging = true;
	})

	$scope.$on('swimlanes.dragend', function() {
		$scope.dragging = false;
	})

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
