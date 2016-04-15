var app = angular.module('counterpoint', [
	'angular-meteor',
	'ui.router',
  'ngMaterial',
	'kanban'
	]);

app.config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  $stateProvider
    .state('main', {
      url: '/home',
      templateUrl: 'client/templates/main.html',
      controller: 'MainCtrl'
    })
		.state('swimlanes', {
      url: '/kanban',
      templateUrl: 'client/templates/swimlanes.html',
      controller: 'SwimlanesCtrl'
    });

  $urlRouterProvider.otherwise("/home");
});

app.controller('MainCtrl', function($scope) {

});
