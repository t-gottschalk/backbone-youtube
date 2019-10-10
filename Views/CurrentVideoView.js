const CurrentVideoView = Backbone.View.extend({
  template: _.template($('#current-video-view').html()),

  render() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});
