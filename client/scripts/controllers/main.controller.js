angular.module('counterpoint').controller('MainCtrl', ['$scope', '$mdSidenav', '$state', '$rootScope',
  function ($scope, $mdSidenav, $state, $rootScope) {
    var menuItems = [
      {
        name: 'Dashboard',
        icon: 'dashboard',
        sref: '.board'
      },
      {
        name: 'Profile',
        icon: 'person',
        sref: '.profile'
      }
    ];

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

    $scope.helpers({
      tasks: () => Tasks.find({}),
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
