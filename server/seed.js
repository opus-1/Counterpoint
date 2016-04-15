if (Meteor.isServer) {
  Meteor.startup(function () {
    if(Tasks.find().count() === 0){
      var tasks = [
        {
          'name': 'Fix runtime exception'
        }, {
          'name': 'Configure Puma'
        }, {
          'name': 'Fix Websocket connection issue'
        }
      ];
      for(var i = 0; i < tasks.length; i++){
        Tasks.insert(tasks[i]);
      }
    }


  });
}