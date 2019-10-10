const WaitingVideoView = Backbone.View.extend({
  template: _.template($('#waiting-video-view').html()),

  render() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});
