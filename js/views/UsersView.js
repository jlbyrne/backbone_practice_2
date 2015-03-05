define([
	'jquery',
	'underscore',
	'backbone',
	'views/UserView'
], function($, _, Backbone, UserView){

	var UsersView = Backbone.View.extend({
		className: 'userList',
		initialize: function(){
			this.listenTo(this.collection, 'add', this.addOne);
			this.listenTo(this.collection, 'reset', this.addAll);
		},
		render: function(){
			this.addAll();
			return this;
		},
		addOne: function(user){
			var userView = new UserView({model: user});
			this.$el.append(userView.render().el);
		},
		addAll: function(){
			if (this.collection.length > 0){
				this.$el.empty();
				console.log(this.collection);
				this.collection.forEach(this.addOne, this);
			}
		}
	});

	return UsersView;
});