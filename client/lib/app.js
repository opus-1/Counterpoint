/*
	 Copyright IBM Corp. 2016
*/
import 'angular-dragula/dist/dragula.css';
import ngMaterial from 'angular-material';
import ngSanitize from 'angular-sanitize';
import Accounts from 'meteor/accounts-base';

var angularDragula = require('angular-dragula');

var app = angular.module('counterpoint', [
  'angular-meteor',
  ngMaterial,
  'ui.router',
  ngSanitize,
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
    abstract: true,
    resolve: {
      "currentUser": function($q){
        if(Meteor.userId() == null){
          return $q.reject('AUTH_REQUIRED');
        }else{
          return $q.resolve();
        }
      }
    }
  })
  .state('main.dashboard', {
    url: '/dashboard',
    templateUrl: 'client/templates/dashboard.html',
    controller: 'DashboardCtrl'
  })
  .state('main.admin', {
    url: '/admin',
    templateUrl: 'client/templates/admin.html',
    controller: 'AdminCtrl'
  })
  .state('main.board', {
    url: '/board',
    templateUrl: 'client/templates/kanban_board.html',
    controller: 'KanbanBoardCtrl'
  })
  .state('login',{
    url: '/login',
    templateUrl: 'client/templates/login.html',
    controller: 'LoginCtrl'
  });

  $urlRouterProvider.otherwise("/dashboard");

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

app.run(function($rootScope, $state){
     $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams, error){
      if (error === 'AUTH_REQUIRED') {
        $state.go('login');
      }

    });
});

// Sometimes we get transient duplicates.  This removes them.
app.filter('uniqueUpdateIds', function() {
  return function(updates, condition) {
    var filtered = [];
    var existing = [];
    angular.forEach(updates, function(update) {
      if(existing.indexOf(update._id) == -1)
      { filtered.push(update); existing.push(update._id); }
    });

    return filtered;
  }
});

app.filter('tasksIdsFilter', function() {
   return function(task_ids, condition) {
    var filtered = [];

    if(condition === undefined || condition === ''){
      return task_ids;
    }

    var re = new RegExp(condition, "i")
    angular.forEach(task_ids, function(task_id) {
      var t = Tasks.findOne({_id: task_id});
      var users = [t.getOwner(), t.getAuthor()];
      var p = [t.name].concat(t.labels)
      for(var i in users)
      { if(users[i]) { p = p.concat([users[i].getName(), users[i].getPotentialIds()]); }}
      // console.debug(p);
      if(re.test(p)){
        filtered.push(task_id);
      }
    });

    return filtered;
  };
});

app.directive('ngOnEnter', function () {
  return function (scope, element, attrs) {
    element.bind("keydown", function (event) {
      if (event.which === 13) {
        var return_val = false;
        scope.$apply(function () {
          return_val = scope.$eval(attrs.ngOnEnter, {'event': event});
        });

        if (return_val) {
          event.preventDefault();
        }
      }
    });
  };
});
