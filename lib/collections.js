Tasks = new Mongo.Collection('tasks');
Swimlanes = new Mongo.Collection('swimlanes');
Messages = new Mongo.Collection('messages');
Comments = new Mongo.Collection('comments');
Labels = new Mongo.Collection('labels');

Tasks.allow({
  insert(userId, task) {
    return userId;
  },
  update(userId, task, fields, modifier) {
    return userId;
  },
  remove(userId, task) {
    return userId;
  }
});

Tasks.before.insert(function (userId, doc) {
  doc.createdAt = Date.now();
  doc.updatedAt = Date.now();
});
Tasks.before.update(function (userId, doc) {
  doc.updatedAt = Date.now();
});

Tasks.after.remove(function (userId, doc) {
  Swimlanes.update({tasks: { $in: [doc._id] } }, {$pull: {tasks: doc._id}}, {multi: true});
  Comments.delete({task: doc._id})
});

Swimlanes.allow({
  insert(userId, swimlane) {
    return userId;
  },
  update(userId, swimlane, fields, modifier) {
    return userId;
  },
  remove(userId, swimlane) {
    return userId;
  }
});

Messages.allow({
  insert(userId, message) {
    return userId;
  },
  update(userId, message, fields, modifier) {
    return userId;
  },
  remove(userId, message) {
    return userId;
  }
});

Comments.allow({
  insert(userId, message) {
    return userId;
  },
  update(userId, message, fields, modifier) {
    return userId;
  },
  remove(userId, message) {
    return userId;
  }
});

Comments.before.insert(function (userId, doc) {
  doc.createdAt = Date.now();
  doc.updatedAt = Date.now();
});

Comments.after.remove(function (userId, doc) {
  Tasks.update({_id: doc.task}, {$pull: {comments: doc._id}}, {multi: true});
});

Comments.after.insert(function (userId, doc) {
  Tasks.update({_id: doc.task}, {$push: {comments: doc._id}}, {multi: true});
});

Labels.allow({
  insert(userId, message) {
    return userId;
  },
  update(userId, message, fields, modifier) {
    return userId;
  },
  remove(userId, message) {
    return userId;
  }
});
