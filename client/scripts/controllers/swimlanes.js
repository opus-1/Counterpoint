angular.module('kanban', []).controller('SwimlanesCtrl', function($scope) {
  $scope.helpers({
    swimlanes: () => Swimlanes.find({}),
    tasks: () => Tasks.find({})
  });

  // not sure why this doesn't work.
  for(var i in $scope.tasks)
  {
    var task = $scope.tasks[i];
    console.debug(task);
    for(var j in $scope.swimlanes)
    {
      console.debug("Testing " + task.swimlane + " against " + $scope.swimlanes[j].name)
      if(task.swimlane == $scope.swimlanes[j].name)
      {
        if(!swimlane.tasks)
        { $scope.swimlanes[j].tasks = []; }

        $scope.swimlanes[j].tasks.push(task);
        console.debug("FOUND IT");
        break;
      }
    }
  }
});
