//on the server
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
});
