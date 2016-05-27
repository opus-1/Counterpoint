/*
   Copyright IBM Corp. 2016
*/
var closeTaskRE = /(implements|implemented|finish|finishes|complete[sd]?|close[sd]?|resolve[sd]?|fix|fixe[sd])\s*(issue|task|work\s*item|item|story|defect|support\*case|case|todo)?\s*#?\s*(\d+)/i;
var referencesTaskRE = /(issue|task|work\s*item|item|story|defect|support\*case|case|todo|#)\s*(\d+)/i;
Meteor.startup(function () {
	LDAP_DEFAULTS.url = "ldap://bluepages.ibm.com";
	LDAP_DEFAULTS.createNewUser = true;
	LDAP_DEFAULTS.base = "ou=bluepages,o=ibm.com";
	LDAP_DEFAULTS.searchResultsProfileMap = [
		{
			resultKey: 'cn',
			profileProperty: 'name'
		}, {
			resultKey: 'serialNumber',
			profileProperty: 'serial'
		}
	];

	Accounts.config({
		forbidClientAccountCreation: true
	});

	HTTP.methods({
		'/gitlab': function (data) {

			var updates = 0;
			var messages = [];
			if (data.object_kind == "push") {
				for (var i in data.commits) {
					var commit = data.commits[i];
					var message = commit.message;
					var author = commit.author.email;

					var closes = message.match(closeTaskRE);
					var references = message.match(referencesTaskRE);
					if (references) {
						var type = references[1];
						var item = parseInt(references[2]);
						var task = Tasks.findOne({ number: item })
						if (!task) { messages.push("Skipped " + commit.id + " because couldn't find number " + item); continue; }
						var update = {
							user: author,
							task: task._id,
							type: "git-commit",
							message: 'referenced by git commit',
							data: {
								hash: commit.id,
								url: commit.url,
								message: commit.message
							}
						}

						if (closes) {
							update.message = "referenced and closed by git commit";
							if (task.state != "done")
							{ Tasks.update({ _id: task._id }, { $set: { state: 'done' } }); }
						}

						Updates.insert(update);
						updates += 1;
					}
					else {
						messages.push("Skipped " + commit.id + " because it didn't reference an item number.");
					}
				}
			}

			return { updates: updates, messages: messages }
			// handle other interactions here if we want.
		}
	});
});
