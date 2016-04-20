
angular.module('counterpoint').controller('LoginCtrl', ['$scope', function ($scope) {

  $scope.login = function() {
    // mmmm
    Meteor.loginWithLDAP($scope.username, $scope.password, {
      // search by email (all other options are configured server side)
      searchBeforeBind: {
        emailAddress: $scope.username
      },
      searchDN: "ou=people,o=ibm.com",
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
