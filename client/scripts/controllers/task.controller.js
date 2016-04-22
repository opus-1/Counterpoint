angular.module('counterpoint').controller('TaskCtrl', ['$scope', '$mdDialog', '$reactive',
  function ($scope, $mdDialog, $reactive) {

    // Not 100% sure this is needed.  But it works...
    $reactive(this).attach($scope);
    this.taskid = $scope.task_id;

    $scope.me = Meteor.user();
    $scope.helpers({
  		task: () => Tasks.findOne({_id: this.getReactively('taskid')}),
      comments: () => Comments.find({task: this.getReactively('taskid')})
  	});

    if(!$scope.task.labels)
    { $scope.task.labels = []; }

    // Not 100% sure this is needed.  But it works...
    $scope.$watch('task_id', function() {
      this.taskid = $scope.task_id;
    })

    $scope.editing = false;

    var setState = function(state) {
      Tasks.update({_id: $scope.task_id}, { $set: { state: state } })
    }

    $scope.getLabelClass = function(chip) {
      if(chip == "defect")
      { return "fa fa-bug"; }
      else if(chip == "feature")
      { return "fa fa-plus"; }
      else if(/\d+\.\d+|release.*/.test(chip))
      { return "fa fa-map-signs"; }
    }

    $scope.startWorking = function() {
      setState("working");
    };

    $scope.stopWorking = function() {
      setState("idle");
    };

    $scope.reopen = function() {
      setState("idle");
    };

    $scope.completeWork = function() {
      setState("done");
    };

    var converter = new Showdown.converter();
    $scope.markdownToHTML = function(stuff) {
      if(!stuff || stuff == '')
      { return ''; }
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

    $scope.saveLabels = function() {
      Tasks.update({_id: $scope.task_id}, { $set: { labels: $scope.task.labels } })
    }

    $scope.cancelEdit = function() {
      $scope.task = Tasks.findOne({_id: $scope.task_id});
      $scope.editing = false;
    }

    $scope.new_comment = {};
    $scope.addComment = function () {
      $scope.new_comment.user = $scope.me.emails[0].address;
      $scope.new_comment.task = $scope.task._id;
      Comments.insert($scope.new_comment);
      $scope.new_comment = {};
    };

    $scope.possible_owners = [];
    $scope.loadUsers = function() {
      $scope.possible_owners = Meteor.users.find({}).fetch();
    }

    $scope.changeOwner = function() {
      Tasks.update({_id: $scope.task_id}, { $set: { owner: $scope.task.owner } })
      $scope.editOwner = false;
    }

    $scope.toggleEditOwner = function() {
      $scope.editOwner = true;
    }

    $scope.getDate = function(date) {
      return moment(date).calendar();
    }

    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };

    $scope.answer = function (answer) {
      $mdDialog.hide(answer);
    };

    // this opens the editing modal.
    $scope.editTask = function() {
  		 var parentEl = angular.element(document.body);
  		 $mdDialog.show({
  			parent: parentEl,
  			preserveScope: true,
  			templateUrl: 'client/templates/partials/taskEdit.html',
  			scope: $scope,
  			controller: 'TaskCtrl',
  			clickOutsideToClose: true
  		}).then(function (answer) {
  			console.log(answer);
  		}, function () {
  			console.log("Dialog closed");
  		});;
  	};
  }]);
