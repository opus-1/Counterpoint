angular.module('counterpoint').controller('TaskCtrl',['$scope',
  function($scope) {

    $scope.me = Meteor.user();

    console.log("TaskCtrl started");
    console.log($scope.task);

    $scope.getComment = function(id) {
  		var comment = Comments.findOne({ _id: id });
      comment.user_object = $scope.getUser(comment.user);

      return comment;
  	};

    $scope.new_comment = {};

    $scope.addComment = function() {
      $scope.new_comment.user = Meteor.userId();
      $scope.new_comment._id = Comments.insert($scope.new_comment);
      Tasks.update({_id: $scope.task._id}, { $push: { comments: $scope.new_comment._id } } )

      // TODO: Why doesn't the Task object update automatically?
      $scope.task = Tasks.findOne({_id: $scope.task._id})

      $scope.new_comment = {};
    }

    $scope.getUserName = function(user) {
      if(Array.isArray(user.profile.name))
      { return user.profile.name[user.profile.name.length-1]; }
      else { return user.profile.name; }
    }

    $scope.getUser = function(user_id_or_email) {
      var user = Meteor.users.findOne({_id: user_id_or_email});
      if(user) { return user; }

      user = Meteor.users.findOne({ emails: {$elemMatch: { address: user_id_or_email } } });
      if(user) { return user; }
    }

    // $scope.helpers({
    //   messages: () => Messages.find({read: false},{sort: {createdAt: -1}, limit: 15})
    // });
  }]);
