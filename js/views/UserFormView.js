define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/userForm.html'

], function($, _, Backbone, tpl){

  var UserFormView = Backbone.View.extend({
    template: tpl,
    className: 'userForm',
    initialize: function(){
      this.listenTo(this.model, 'invalid', this.showErrors);
    },
    render: function(){
      this.$el.html(_.template(this.template, this.model.attributes));
      $(this.el).slideDown('fast');
      return this;
    },
    events: {
      'click button#userCreator': 'save'
    },
    save: function(e){
      e.preventDefault();

      var newName = this.$('input[name=name]').val();
      var newColor = this.$('input[name=color]').val();
      var newNumber = this.$('input[name=number]').val();

      var that = this;
      this.model.save({name: newName, color: newColor, number: newNumber}, {
        success: function(model, response, options) {
          that.hideErrors();
          that.collection.add(model);
          $(that.el).slideUp("slow", function(){
            that.selfDestruct();
          });
        }, error: function(model, xhr, options) {
          var errors = xhr.responseJSON;
          var newErrors = [];
          if (errors.number) {
            newErrors.push({name: 'number', message: errors.number.join(", ")});
          }
          if (errors.name) {
            newErrors.push({name: 'name', message: errors.name.join(", ")});
          }
          if (errors.color) {
            newErrors.push({name: 'color', message: errors.color.join(", ")});
          }
          that.showErrors(model, newErrors);
        }
      });
    },
    hideErrors: function(){
      this.$('input').removeClass('error');
      this.$('.help').text('');
    },
    showErrors: function(model, error, options){
      console.log(error);
      error.forEach(function(myError) {
        this.$("." + myError.name + ".help").text(myError.message);
        this.$("." + myError.name + "Input").addClass('error');
      }, this);
    },
    toggle: function(){
      if ( $(this.el).is(':visible') ) {
        $(this.el).slideUp('slow');
      } else {
        $(this.el).slideDown('slow');
      }
    },
    // I know this is a little convoluted, but I really didn't want to
    // keep the form data around once it's been successfully submitted.
    // Using the usual 'remove' function removes the top-level el, as well,
    // which I also didn't want.  This deletes the view for all intents and 
    // purposes, and then the appview is free to create new form instances
    // and they won't interfere with each other.
    selfDestruct: function(){
      this.undelegateEvents();
      this.$el.removeData().unbind();
      this.$el.html("");
    }
  });
  
  return UserFormView;
});