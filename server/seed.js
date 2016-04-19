if (Meteor.isServer) {
  Meteor.startup(function() {

    if (Swimlanes.find().count() === 0) {
      var swimlanes = [
        {
          name: 'Backlog',
          order: 1,
          tasks: []
        }, {
          name: 'Development',
          order: 2,
          tasks: []
        }, {
          name: 'Test',
          order: 3,
          tasks: []
        }, {
          name: 'Complete',
          order: 4,
          tasks: []
        }
      ];
      for (var i = 0; i < swimlanes.length; i++) {
        Swimlanes.insert(swimlanes[i]);
      }
    }

    if (Tasks.find().count() === 0) {
      var tasks = [
        {
          name: 'Improve test automation coverage'
        }, {
          name: 'Enhancement of storage configuration (LVM)'
        }, {
          name: 'Show real time resource utilization of hypervisors'
        }, {
          name: 'Develop Change management performer'
        }, {
          name: 'Performance and Stress testing Allegro'
        }, {
          name: 'Integration with on-boarding to CC and SSD'
        }, {
          name: 'Add a support debug download option'
        }, {
          name: 'Create .css fonts for things like vmware, AIX/HMC/IBM, openstack'
        }, {
          name: 'Create deployment wizard for adding software performers'
        }
      ];
      for (var i = 0; i < tasks.length; i++) {
        Tasks.insert(tasks[i]);
        var task = Tasks.findOne({ name: tasks[i].name });
        Swimlanes.update({ name: 'Backlog' }, { $push: { tasks: task._id } });

      }
    }

  });
}
