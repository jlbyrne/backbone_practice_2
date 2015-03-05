define([
  'jquery',
  'underscore',
  'backbone',
  'models/User',
  'collections/Users',
  'views/UsersView',
  'views/UserFormView',
  'text!templates/layout.html'
], function($, _, Backbone, User, Users, UsersView, UserForm, tpl){

  var HomeView = Backbone.View.extend({
    template: tpl,
    events: {
      'click button.userForm': 'addForm'
    },
    render: function() {
      this.$el.html(tpl);
      this.start();
      return this;
    },
    // I want a separate start function so that the basic
    // layout template renders before the user data is fetched.
    start: function(){
      this.users = new Users();
      this.usersView = new UsersView({collection: this.users});
      this.$el.append(this.usersView.render().el);
      this.users.fetch();
    },
    addForm: function() {
      // see comment on line 67 of userForm.js
      if ( this.form == null || this.form.$el.html().length === 0 ){
        var newUser = new User({});
        this.form = new UserForm({model: newUser, collection: this.users, el: $('.formContainer')});
        this.form.render();
      } else {
        this.form.toggle();
      }
    }

  });

  return HomeView;
  
});