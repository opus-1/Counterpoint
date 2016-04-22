angular.module('counterpoint').controller('MainCtrl', ['$scope', '$mdSidenav', '$state', '$rootScope',
  function ($scope, $mdSidenav, $state, $rootScope) {
    if(Meteor.user() == 'undefined' || Meteor.user() == null){
      $state.go("login");
    }

    var menuItems = [
      {
        name: 'Dashboard',
        icon: 'dashboard',
        sref: '.dashboard'
      },
      {
        name: 'Kanban',
        icon: 'view_list',
        sref: '.board'
      }
    ];

    if(Meteor.user().profile.admin)
    {
      menuItems.push({
        name: 'Admin',
        icon: 'settings',
        sref: '.admin'
      })
    }

    $scope.getUserName = function(user) {
      if(!user || !user.profile) { return ''; }
      if(Array.isArray(user.profile.name))
      { return user.profile.name[user.profile.name.length-1]; }
      else { return user.profile.name; }
    }

    $scope.toggleRightSidebar = function toggleRightSidebar() {
      $mdSidenav('right').toggle();
    };

    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    }

    $scope.override_side_nav = false;
    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams) {
        if(/main.board/.test(toState.name))
        {
          $scope.override_side_nav = true;
          $mdSidenav('left').close();
        }
        else
        { $scope.override_side_nav = false; }
    });

    $scope.helpers({
      // tasks: () => Tasks.find({}),
      menuItems: () => menuItems
    });

    $scope.logout = function () {
      $mdSidenav('right').close();
      Meteor.logout(function (err) {
        console.log(err);
        if (!err) {
          $state.go('login');

        }
      });
    };

    $rootScope.search = $scope.search;

  }]);
