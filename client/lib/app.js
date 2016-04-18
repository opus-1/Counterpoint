import '/node_modules/angular-dragula/dist/dragula.css';
import '/node_modules/dragula/dist/dragula.css';

var angularDragula = require('angular-dragula');

var app = angular.module('counterpoint', [
  'angular-meteor',
  'ngMaterial',
  'ui.router',
  angularDragula(angular)
]);

app.config(function ($urlRouterProvider, $stateProvider, $locationProvider, $mdThemingProvider, $mdIconProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $stateProvider
  .state('main', {
    url: '',
    templateUrl: 'client/templates/main.html',
    controller: 'MainCtrl',
    abstract: true
  })
  .state('main.board', {
    url: '/kanban/board',
    templateUrl: 'client/templates/kanban_board.html',
    controller: 'KanbanBoardCtrl'
  });

  $urlRouterProvider.otherwise("/kanban/board");

  $mdIconProvider.icon('user', 'images/user.svg', 64);

  $mdThemingProvider.theme('dark').dark();

  $mdThemingProvider.theme('default')
   .primaryPalette('pink', {
     'default': '400',
     'hue-1': '100',
     'hue-2': '600',
     'hue-3': 'A100'
   })
   .accentPalette('purple', {
     'default': '200'
   });

  $mdThemingProvider.theme('default').primaryPalette('pink').accentPalette('orange');
  $mdThemingProvider.setDefaultTheme('default');
  $mdThemingProvider.alwaysWatchTheme(true);
});
