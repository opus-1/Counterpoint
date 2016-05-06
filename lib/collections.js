Tasks = new Mongo.Collection('tasks');
Swimlanes = new Mongo.Collection('swimlanes');
Messages = new Mongo.Collection('messages');
Updates = new Mongo.Collection('updates');

Meteor.users.allow({
  update(userId, user, fields, modifier) {
    if(Meteor.users.findOne({_id: userId}).profile.admin)
    { return true; }
    else if(userId == user._id)
    {
      // TODO: Make it so they can't change the "admin" field!
      // This is a huge security hole ;) :)
      // actually.  If you aren't an admin, then let's just set profile.admin
      // to what it currently is?

      if(Object.keys(modifier['$set'].profile).indexOf('admin') != -1)
      {
        var newval = modifier['$set'].profile.admin;
        if(user.profile.admin != newval)
        { return false; }
      }

      return true;
    }
  }
})

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
    var first = Tasks.findOne({},{sort:{number:-1}});
    var max_number = 0;
    if(first != null || first != undefined){
       max_number = first.number;     
    }
    doc.number = max_number + 1;
  });

  Tasks.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    modifier.$set.updatedAt = Date.now();
  });

  Tasks.after.remove(function (userId, doc) {
    Swimlanes.update({tasks: { $in: [doc._id] } }, {$pull: {tasks: doc._id}}, {multi: true});
    Updates.delete({task: doc._id})
  });

  Tasks.after.update(function(userId, doc, fieldNames, modifier, options) {
    // if we have no user, then it's probably the server doing it from a webhook
    // or something...
    var orig = this.previous;
    var owner = userId;
    var owner_user = Meteor.users.findOne({_id: userId});
    if(owner_user)
    { owner = Meteor.users.findOne({_id: userId}).getValidId(); }
    var changed = false;

    if(doc.owner != orig.owner)
    {
      // publish an owner change update.
      var update = {
        user: owner,
        task: doc._id,
        type: "owner-change",
        data: {
          previous: orig.owner,
          new: doc.owner,
        }
      }
      Updates.insert(update);
    }
    if(doc.list != orig.list)
    {
      var update = {
        user: owner,
        task: doc._id,
        type: "list-change",
        data: {
          previous: orig.list,
          new: doc.list,
        }
      }
      Updates.insert(update);
    }

    if(doc.state != orig.state) {
      var update = {
        user: owner,
        task: doc._id,
        type: "state-change",
        data: {
          previous: orig.state,
          new: doc.state,
        }
      }
      Updates.insert(update);
    }
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
    return Updates.find({task: this._id, type: "comment"})
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

if (Meteor.isServer) {
  Swimlanes.after.update(function(userId, doc, fieldNames, modifier, options) {
    for(var i in doc.tasks)
    {
      var id = doc.tasks[i];
      var t = Tasks.findOne({_id: id});
      if(t && t.list != doc._id)
      { Tasks.update({ _id: id }, { $set: { list: doc._id } }); }
    }
  });
}

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

Updates.allow({
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
    return Tasks.find( { owner: { $in: this.getPotentialIds() } }, { sort: ['createdAt'] })
  },

  getValidId() {
    if(this.emails && this.emails.length > 0)
    { return this.emails[0].address; }
    return this._id;
  },

  getPotentialIds() {
    var x = [this._id, this.username];
    for(var i in this.emails)
    { if(this.emails[i].address) { x.push(this.emails[i].address); } }
    return x;
  }
})

Updates.helpers({
  getUser() {
    return Meteor.users.findOne({ $or: [
      { _id: this.user },
      { username: this.user },
      { emails: { $elemMatch: { address: this.user } } } ] }
    )
  }
});

if (Meteor.isServer) {
  Updates.before.insert(function (userId, doc) {
    doc.createdAt = Date.now();
    doc.updatedAt = Date.now();
  });

  Updates.after.remove(function (userId, doc) {
    Tasks.update({_id: doc.task}, {$pull: {updates: doc._id}}, {multi: true});
  });

  Updates.after.insert(function (userId, doc) {
    Tasks.update({_id: doc.task}, {$push: {updates: doc._id}}, {multi: true});
  });
}
