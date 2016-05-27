/*
	 Copyright IBM Corp. 2016
*/
angular.module('counterpoint').directive('userProfile', function () {
	return {
		restrict: 'E',
		scope: {
	     user: '='
		},
		templateUrl: 'client/templates/partials/profile.html',
		controller: 'UserProfileCtrl'
	};
});
