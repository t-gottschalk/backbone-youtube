const AppView = Backbone.View.extend({
  el: $('body'),

  events: {
    'click #search-button': 'searchVideo',
    'keypress .search-input': 'searchVideo',
    'click .card-queue': 'triggerVideoSwitch'
  },

  initialize: function() {
    //kick off initial search so page loads with video, API called using this function in collection
    this.model.get('videos').searchVideos();
    //listen for additions to the collection and render page
    this.listenTo(this.model.get('videos'), 'reset', this.renderVideo);
    //listen for change in currently playing attribute on App Model to trigger render
    this.listenTo(this.model, 'change', this.switchVideoViews);

  },

  // initialize: function () {
  //   this.$searchInput = this.$('.search-input');
  //   this.$currentVideo = this.$('.current-video');
  //   this.$videoQueue = this.$('.video-queue');

  //   this.model.setUrl(this.model.get('defaultSearch'));
  //   // this.listenTo(this.model.get('videos'), 'reset', function(){
  //   //   this.updateInitialCurrentVideo();
  //   //   this.render();
  //   // });
  //   this.listenTo(this.model, 'change:currentVideo', this.render);
  //   this.listenTo(this.model, 'change:defaultSearch', this.updateSearch);
  // },

  // updateInitialCurrentVideo: function(){
  //   this.model.setCurrentVideo('0');
  // },

  // updateCurrentVideo: function(e){
  //   //check for current video assignment
  //   this.model.setCurrentVideo($(e.currentTarget).data().id);
  // },

  // updateQuery: function(){
  //   var newQueryString = this.$searchInput.val();
  //   if (newQueryString !== '' && newQueryString !== this.model.get('defaultSearch')){
  //     this.model.updateDefaultSearch(newQueryString);
  //   } else {
  //     alert('404 Error!');
  //   }
  // },

  searchVideo: function(e) {
    //if event trigger is enter key
    if (e.which === 13) {
      //nested conditional to check for empty input
      if ($('.search-input').val().length === 0) {
        alert('Please enter search criteria');
      } else {
        var search = $('.search-input').val();
        this.model.get('videos').searchVideos(search);
      }
    }

  },

  // updateSearch: function(){
  //   this.model.searchYoutube();
  // },

  triggerVideoSwitch: function(e) {
    //sets variable passed in to switch video function as the data-id captured from the clicked DOM element
    var newVideoId = $(e.currentTarget).data().id;
    this.model.switchVideo(newVideoId);
  },

  //function to update playing video view with playing video from model, set after user click
  switchVideoViews: function() {
    //empty current DOM node
    this.$('.current-video').empty();
    //create new view, passing in info from playing video attribute on the model
    currentVideoView = new CurrentVideoView({
      model: this.model.get('currentVideo')
    })
    this.$('.current-video').append(currentVideoView.render().el)
  },

  renderVideo: function() {
    //clear current DOM nodes
    this.$('.current-video').empty();
    this.$('.video-queue').empty();

    //loop through collection
    for (var i = 0; i < this.model.get('videos').length; i++) {
      //set currently playing video view to display first model
      if (i === 0) {
        var currentVideoView = new CurrentVideoView({
          model: this.model.get('videos').models[0]
        })
        this.$('.current-video').append(currentVideoView.render().el)
        //loop through remaining 4 models and populate to page with waiting video views
      } else {
        var waitingVideoView = new WaitingVideoView({
          model: this.model.get('videos').models[i]
        })
        this.$('.video-queue').append(waitingVideoView.render().el)
      }
    }
  },

  // renderCurrentVideo: function () {
  //   this.$('.current-video').empty();
  //   var currentVideoView = new CurrentVideoView({
  //     model: this.model.get('currentVideo')
  //   });
  //   this.$('.current-video').append(currentVideoView.render().el);
  // },

  // renderVideoCard: function(video){
  //   var waitingVideoView = new WaitingVideoView({
  //     model: video
  //   });
  //   this.$('.video-queue').append(waitingVideoView.render().el);
  // },


  // renderVideoQueue: function () {
  //   this.$('.video-queue').empty();
  //   this.model.get('videos').each(function (m) {
	 //    if (!m.get('currentVideo')) {
	 //      this.renderVideoCard(m);
	 //    }
  // 	}, this);
  // },

  // render() {
  //   this.renderCurrentVideo();
  //   this.renderVideoQueue();
  // }
  
});
