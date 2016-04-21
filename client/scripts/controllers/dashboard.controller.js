angular.module('counterpoint').controller('DashboardCtrl', function ($scope, dragulaService, $mdDialog, $rootScope) {
	$scope.me = Meteor.user();

	// only run if we are logged in?  Hm.
	if($scope.me) {
		$scope.helpers({
			my_tasks: () => Meteor.user().getTasks()
		});
	}
});
