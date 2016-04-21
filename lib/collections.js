Tasks = new Mongo.Collection('tasks');
Swimlanes = new Mongo.Collection('swimlanes');
Messages = new Mongo.Collection('messages');
Comments = new Mongo.Collection('comments');

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

if (Meteor.isServer) {
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
}

Tasks.helpers({
  getOwner() {
    return Meteor.users.findOne({ $or: [
      { _id: this.owner },
      { username: this.owner },
      { emails: { $elemMatch: { address: this.owner } } } ] }
    )
  },

  getComments() {
    return Comments.find({task: this._id})
  },

  getAuthor() {
    return Meteor.users.findOne({ $or: [
      { _id: this.author },
      { username: this.author },
      { emails: { $elemMatch: { address: this.author } } } ] }
    )
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

Meteor.users.helpers({
  getName() {
    if (Array.isArray(this.profile.name))
    { return this.profile.name[this.profile.name.length - 1]; }
    else { return this.profile.name; }
  },

  canEdit(otherUser) {
    if(this.profile.admin)
    { return true; }
    else if(this._id == otherUser._id)
    { return true; }
    return false;
  },

  getTasks() {
    return Tasks.find( { owner: { $in: this.getPotentialIds() } })
  },

  getPotentialIds() {
    var x = [this._id, this.username];
    for(var i in this.emails)
    { x.push(this.emails[i].address); }
    return x;
  }
})

Comments.helpers({
  getUser() {
    return Meteor.users.findOne({ $or: [
      { _id: this.user },
      { username: this.user },
      { emails: { $elemMatch: { address: this.user } } } ] }
    )
  }
});

if (Meteor.isServer) {
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
}
