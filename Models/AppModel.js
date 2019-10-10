const AppModel = Backbone.Model.extend({
  defaults: () => {
    return {
      videos: new VideosCollection(),
      defaultSearch: 'U2 - Beautiful Day (Live from Boston)',
      currentVideo: ''
      // defaultSearch: 'Adele performing Someone Like You | BRIT Awards 2011'
    }
  },

  setCurrentVideo: function(videoId) {
    var currentVideo;
    var allVideos = this.get('videos');
    if(videoId === '0'){
      currentVideo = allVideos.at(videoId);
    } else {
      this.get('currentVideo').set('currentVideo', false);
      currentVideo = allVideos.findWhere({
        id: videoId
      });
    }

    currentVideo.set('currentVideo', true);
    this.set('currentVideo', currentVideo);
  },

  updateDefaultSearch: function(search) {
    this.set('defaultSearch', search);
  },

  searchYoutube: function(){
    this.setUrl();
    this.get('videos').fetch({
      reset: true
    });
  },

  setUrl(){
    this.get('videos').searchVideos(this.get('defaultSearch'));
  }

});
