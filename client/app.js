var app = angular.module('counterpoint', [
	'angular-meteor',
	'ui.router',
  'ngMaterial'
	]);
	
	app.config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'client/templates/main.html',
      controller: 'MainCtrl'
    });

  $urlRouterProvider.otherwise("/");


});
