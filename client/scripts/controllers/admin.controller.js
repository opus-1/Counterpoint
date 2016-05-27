/*
	 Copyright IBM Corp. 2016
*/
angular.module('counterpoint').controller('AdminCtrl', function ($scope, dragulaService, $mdDialog, $rootScope) {
	$scope.me = Meteor.user();

	// only run if we are logged in?  Hm.
	$scope.helpers({
		users: () => Meteor.users.find({})
	});
});
