angular.module('counterpoint').controller('MainCtrl', ['$scope', '$mdSidenav',
  function ($scope, $mdSidenav) {
    var menuItems = [
      {
        name: 'Dashboard',
        icon: 'dashboard',
        sref: '.home'
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

  }]);