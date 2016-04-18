angular.module('counterpoint').controller('HomeCtrl', function ($scope) {
	var lists = [
		{
			id: 1,
			name: 'Todo'
		},
		{
			id: 2,
			name: 'Doing'
		},
		{
			id: 3,
			name: 'Done'
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
			listId: 1
		},{
			id: 8,
			name: 'Create .css fonts for things like vmware, AIX/HMC/IBM, openstack',
			listId: 1
		},{
			id: 9,
			name: 'Create deployment wizard for adding software performers',
			listId: 1
		}
	]
	
	$scope.helpers({
		lists: () => [].concat(lists),
		tasks: () => [].concat(tasks)
	})

});
