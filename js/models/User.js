define([
	'underscore',
	'backbone'
], function(_, Backbone){

	var User = Backbone.Model.extend({
		defaults: {
			name: "",
			color: "",
			number: ""
		},
		urlRoot: "https://practice-api.herokuapp.com/user",
		validate: function(attrs) {
			// If I were going to be fancy I'd have each of these validations broken down into
			// individual functions for each attribute, which would then run during an onblur event 
			// for each of the form fields.  (Giving the user instant feedback about whether their entry was appropriate)
			var errors = [];
			if (!attrs.name) {
				errors.push({name: 'name', message: "please provide a name"});
			}
			if (!attrs.color) {
				errors.push({name: 'color', message: "please provide your favorite color"});
			}
			if (!attrs.number || !/^\d{2}$/.test(attrs.number) ) {
				errors.push({name: 'number', message: "please provide your lucky (positive, 2-digit) number"});
			}
			return errors.length > 0 ? errors : false;
		}
	});

	return User;
});