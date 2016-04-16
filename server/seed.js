if (Meteor.isServer) {
  Meteor.startup(function () {
    if(Tasks.find().count() === 0){
      var tasks = [
        {
          'name': 'Fix runtime exception',
          'swimlane': 'Backlog' // TODO: Use IDs?  Or what?
        }, {
          'name': 'Configure Puma',
          'swimlane': 'Backlog' // TODO: Use IDs?  Or what?
        }, {
          'name': 'Fix Websocket connection issue',
          'swimlane': 'Backlog' // TODO: Use IDs?  Or what?
        }
      ];
      for(var i = 0; i < tasks.length; i++){
        Tasks.insert(tasks[i]);
      }
    }

    if(Swimlanes.find().count() === 0){
      var swimlanes = [
        {
          'name': 'Backlog'
        }, {
          'name': 'Development'
        }, {
          'name': 'Test'
        }, {
          'name': 'Complete'
        }
      ];
      for(var i = 0; i < swimlanes.length; i++){
        Swimlanes.insert(swimlanes[i]);
      }
    }


  });
}
