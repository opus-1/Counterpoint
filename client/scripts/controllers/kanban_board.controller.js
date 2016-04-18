angular.module('counterpoint').controller('KanbanBoardCtrl', function ($scope) {
	var lists = [
		{
			id: 1,
			name: 'Backlog',
			tasks: []
		},
		{
			id: 2,
			name: 'Development',
			tasks: []
		},
		{
			id: 3,
			name: 'Test',
			tasks: []
		},
		{
			id: 4,
			name: 'Complete',
			tasks: []
		}
	];

	var tasks = [
		{
			id: 1,
			name: 'Improve test automation coverage',
			listId: 1
		},
		{
			id:2,
			name: 'Enhancement of storage configuration (LVM)',
			listId: 3
		},{
			id: 3,
			name: 'Show real time resource utilization of hypervisors',
			listId: 1
		},{
			id: 4,
			name: 'Develop Change management performer',
			listId: 2
		},{
			id: 5,
			name: 'Performance and Stress testing Allegro',
			listId: 2
		},{
			id: 6,
			name: 'Integration with on-boarding to CC and SSD',
			listId: 3
		},{
			id: 7,
			name: 'Add a support debug download option',
			listId: 4
		},{
			id: 8,
			name: 'Create .css fonts for things like vmware, AIX/HMC/IBM, openstack',
			listId: 4
		},{
			id: 9,
			name: 'Create deployment wizard for adding software performers',
			listId: 1
		}
	];

	// populate the "list" tasks ... for drag/drop, we need ordered arrays for each list ...
	for(var i in tasks)
	{
		for(var j in lists)
		{
			if(lists[j].id == tasks[i].listId)
			{
				lists[j].tasks.push(tasks[i]);
				break;
			}
		}
	}

	$scope.helpers({
		lists: () => [].concat(lists),
		tasks: () => [].concat(tasks)
	})

});
