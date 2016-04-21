angular.module('counterpoint').controller('UserProfileCtrl', ['$scope', '$mdDialog',
  function ($scope, $mdDialog) {
    $scope.me = Meteor.user();
    if(!$scope.user)
    { $scope.user = $scope.me; }

    $scope.canEdit = function() {
      return $scope.me.canEdit($scope.user);
    }

    $scope.save = function(form) {

      // TODO: only allow this if you are the user or you are an admin!
      if($scope.canEdit())
      { Meteor.users.update({_id: $scope.user._id}, { $set: { profile: $scope.user.profile }}) }
      form.$setPristine(true);
    };

    $scope.cancelEdit = function(form) {
      $scope.user = Meteor.users.findOne({_id: $scope.user._id});
      form.$setPristine(true);
    };

    // We may be called as a modal for Admin editing of users.
    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };

    $scope.answer = function (answer) {
      $mdDialog.hide(answer);
    };
  }]);
