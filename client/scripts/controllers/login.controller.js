/*
	 Copyright IBM Corp. 2016
*/
angular.module('counterpoint').controller('LoginCtrl', ['$scope', '$mdToast', '$state',function ($scope, $mdToast, $state) {

  $scope.login = function () {
    if($scope.username == "admin")
    {
      Meteor.loginWithPassword($scope.username, $scope.password, function(err) {
        if (err) {
          console.log(err);
          $mdToast.show(
            $mdToast.simple()
              .textContent(err.reason)
              .position("top right")
              .hideDelay(3000)
            );
        }
        else {
          console.log("Login successfully");
          $scope.username = '';
          $scope.password = '';
          $mdToast.show(
            $mdToast.simple()
              .textContent("Login successfully")
              .position("top right")
              .hideDelay(3000)
            );
         $state.go('main.dashboard');
        }
      })
    }

    Meteor.loginWithLDAP($scope.username, $scope.password, {
      // search by email (all other options are configured server side)
      searchBeforeBind: {
        emailAddress: $scope.username
      },
      searchDN: "ou=people,o=ibm.com",
    }, function (err) {
      if (err) {
        console.log(err);
        $mdToast.show(
          $mdToast.simple()
            .textContent(err.reason)
            .position("top right")
            .hideDelay(3000)
          );
      }
      else {
        console.log("Login successfully");
        $scope.username = '';
        $scope.password = '';
        $mdToast.show(
          $mdToast.simple()
            .textContent("Login successfully")
            .position("top right")
            .hideDelay(3000)
          );
       $state.go('main.dashboard');
      }
    });
  };

  $scope.register = function () {

  };
}]);
