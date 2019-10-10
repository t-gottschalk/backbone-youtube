const AppView = Backbone.View.extend({
  el: $('body'),

  events: {
    'click #search-button': 'updateQuery',
    'keypress .search-input': 'onKeyPress',
    'click .card-queue': 'updateCurrentVideo'
  },

  initialize: function () {
    this.$searchInput = this.$('.search-input');
    this.$currentVideo = this.$('.current-video');
    this.$videoQueue = this.$('.video-queue');

    this.model.setUrl(this.model.get('defaultSearch'));
    this.listenTo(this.model.get('videos'), 'reset', function(){
      this.updateInitialCurrentVideo();
      this.render();
    });
    this.listenTo(this.model, 'change:currentVideo', this.render);
    this.listenTo(this.model, 'change:defaultSearch', this.updateSearch);
  },

  onKeyPress: function(e) {
    if (e.which === 13) {
      if ($('.search-input').val().length === 0) {
        alert('Please enter search criteria');
      } else {
        var search = $('.search-input').val();
        this.model.get('videos').searchVideos(search);
      }
    }
  },

  updateInitialCurrentVideo: function(){
    this.model.setCurrentVideo('0');
  },

  updateCurrentVideo: function(e){
    //check for current video assignment
    this.model.setCurrentVideo($(e.currentTarget).data().id);
  },

  updateQuery: function(){
    var newQueryString = this.$searchInput.val();
    if (newQueryString !== '' && newQueryString !== this.model.get('defaultSearch')){
      this.model.updateDefaultSearch(newQueryString);
    } else {
      alert('404 Error!');
    }
  },

  updateSearch: function(){
    this.model.searchYoutube();
  },

  renderCurrentVideo: function () {
    this.$('.current-video').empty();
    var currentVideoView = new CurrentVideoView({
      model: this.model.get('currentVideo')
    });
    this.$('.current-video').append(currentVideoView.render().el);
  },

  renderVideoCard: function(video){
    var waitingVideoView = new WaitingVideoView({
      model: video
    });
    this.$('.video-queue').append(waitingVideoView.render().el);
  },

  renderVideoQueue: function () {
    this.$('.video-queue').empty();
    this.model.get('videos').each(function (m) {
	    if (!m.get('currentVideo')) {
	      this.renderVideoCard(m);
	    }
  	}, this);
  },

  render() {
    this.renderCurrentVideo();
    this.renderVideoQueue();
  }
});
