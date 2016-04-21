angular.module('counterpoint').controller('TaskCtrl', ['$scope', '$mdDialog',
  function ($scope, $mdDialog) {

    $scope.me = Meteor.user();
    console.debug($scope.me);
    $scope.helpers({
  		task: () => Tasks.findOne({_id: $scope.task_id}),
      comments: () => Comments.find({task: $scope.task_id}),
      labels: () => Labels.find({tasks: { $in: [$scope.task_id]}})
  	});

    $scope.editing = false;

    var converter = new Showdown.converter();
    $scope.markdownToHTML = function(stuff) {
      return converter.makeHtml(stuff);
    }

    $scope.edit = function() {
      if($scope.editing)
      {
        console.debug("trying to save...");
        console.debug($scope.task);
        Tasks.update({_id: $scope.task_id}, { $set: { description: $scope.task.description, name: $scope.task.name } })
        $scope.editing = false;
      }
      else
      {
        $scope.editing = true;
      }
    };

    $scope.cancelEdit = function() {
      $scope.task = Tasks.findOne({_id: $scope.task_id});
      $scope.editing = false;
    }

    $scope.getComments = function() {
      if(!$scope.task || ! $scope.task._id)
      { return []; }
      return Comments.find({task: $scope.task._id}).fetch();
    };

    $scope.new_comment = {};
    $scope.addComment = function () {
      $scope.new_comment.user = $scope.me.emails[0].address;
      $scope.new_comment.task = $scope.task._id;
      $scope.new_comment._id = Comments.insert($scope.new_comment);
      $scope.new_comment = {};
    };

    $scope.getDate = function(date) {
      return moment(date).calendar();
    }

    $scope.getUserNameFromObject = function(user) {
      if (Array.isArray(user.profile.name))
      { return user.profile.name[user.profile.name.length - 1]; }
      else { return user.profile.name; }
    }

    $scope.getAssignedUser = function() {
      var user = $scope.getUser($scope.task.owner);
      if(!user) {
        return { profile: { name: $scope.task.owner } }
      }
      else {
        return user;
      }
    };

    $scope.getCreatorUser = function() {
      var user = $scope.getUser($scope.task.author);
      if(!user) {
        return { profile: { name: $scope.task.owner } }
      }
      else {
        return user;
      }
    };

    $scope.getUserNameFromComment = function(comment) {
      var user = $scope.getUser(comment.user);
      if(!user || !user.profile)
      { return comment.user; }

      else {
        return $scope.getUserNameFromObject(user);
      }
    };

    $scope.getUser = function (user_id_or_email) {
      var user = Meteor.users.findOne({ _id: user_id_or_email });
      if (user) { return user; }

      var user = Meteor.users.findOne({ username: user_id_or_email });
      if (user) { return user; }

      user = Meteor.users.findOne({ emails: { $elemMatch: { address: user_id_or_email } } });
      if (user) { return user; }
    };

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
