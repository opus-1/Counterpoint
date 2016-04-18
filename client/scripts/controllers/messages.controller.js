angular.module('counterpoint').controller('MessagesCtrl',['$scope',
  function($scope) {

    var messages = [
      {
        subject: 'Secondary controls performer',
        userName: 'Djessy Menard',
        date: '2016',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      {
        subject: 'Improve test automation',
        userName: 'Paul G. Ellsworth',
        date: '1918',
        text: 'Checking the automation coverage gem. Identifying which files need to be exercised more thoroughly.'
      }];

    $scope.helpers({
      messages: () => [].concat(messages)
    });
  }]);
