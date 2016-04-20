angular.module('counterpoint').controller('MainCtrl', ['$scope', '$mdSidenav', '$state',
  function ($scope, $mdSidenav, $state) {
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

    $scope.toggleRightSidebar = function toggleRightSidebar() {
      $mdSidenav('right').toggle();
    };

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
    }

  }]);