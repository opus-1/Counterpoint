
angular.module('counterpoint').controller('LoginCtrl', ['$scope', function ($scope) {

  $scope.login = function () {
    
    Meteor.loginWithLDAP($scope.username, $scope.password, {
      // search by email (all other options are configured server side)
      searchBeforeBind: {
        mail: $scope.username
      }
    }, function (err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log("login successfully");
      }
    });
    
  };

  $scope.register = function () {

  };
}]);
