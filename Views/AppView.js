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

  // onKeyPress Event Handler
  onKeyPress: function(event) {
    if (event.which === 13) {
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

  updateCurrentVideo: function(event){
    this.model.setCurrentVideo($(event.currentTarget).data().id);
  },

  // onClick Event Handler
  updateQuery: function(){
    var newQueryString = this.$searchInput.val();
    if (newQueryString !== '' && newQueryString !== this.model.get('defaultSearch')){
      this.model.updateDefaultSearch(newQueryString);
    } else {
      alert('Please enter search criteria');
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

  // Loop through videos and render side view
  renderVideoQueue: function () {
    this.$('.video-queue').empty();
    this.model.get('videos').each(function (video) {
	    if (!video.get('currentVideo')) {
	      this.renderVideoCard(video);
	    }
  	}, this);
  },

  render() {
    this.renderCurrentVideo();
    this.renderVideoQueue();
  }
});
