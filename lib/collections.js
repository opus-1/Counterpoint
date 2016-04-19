Tasks = new Mongo.Collection('tasks');
Swimlanes = new Mongo.Collection('swimlanes');
Messages = new Mongo.Collection('messages');

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