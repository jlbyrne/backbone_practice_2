define([
	'underscore',
	'backbone',
	'models/User'
], function(_, Backbone, User){
	var Users = Backbone.Collection.extend({
		model: User,
		url: 'https://practice-api.herokuapp.com/user'
	});
	return Users;
});