//on the server
Meteor.startup(function () {
	LDAP_DEFAULTS.url = "ldap://bluepages.ibm.com";
	LDAP_DEFAULTS.createNewUser = false;
	
	Accounts.config({
		forbidClientAccountCreation: true
	});
});