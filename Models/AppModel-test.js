const AppModel = Backbone.Model.extend({
  defaults: () => {
    return {
      videos: new VideosCollection(),
      defaultSearch: 'U2 - Beautiful Day (Live from Boston)',
      currentVideo: null
      // defaultSearch: 'Adele performing Someone Like You | BRIT Awards 2011'
    }
  },

  //switch video, triggered by app view and sets playing video attribute
  switchVideo: function(newVid) {
    //finds the model that has an id that matches variable newVid passed in from function call in App View
    var newVideo = this.get('videos').findWhere({
      id: newVid
    });
    this.set('currentVideo', newVideo);
  }

  // initialize() {
  //   this.get('videos').searchVideos('defaultSearch'); // Initialize app with videos

  // },

  // initialize: () => {
  //   // this.setUrl(this.get('defaultSearch'));
  // },

  // setCurrentVideo: function (videoId) {
  //   var currentVideo;
  //   var allVideos = this.get('videos');
  //   if(videoId === '0'){
  //     currentVideo = allVideos.at(videoId);
  //   } else {
  //     this.get('currentVideo').set('currentVideo', false);
  //     currentVideo = allVideos.findWhere({
  //       id: videoId
  //     });
  //   }

  //   currentVideo.set('currentVideo', true);
  //   this.set('currentVideo', currentVideo);
  // },

  // setCurrentVideo: function (videoId) {
  //   var currentVideo;
  //   var allVideos = this.get('videos');
  //   if(videoId === '0'){
  //     currentVideo = allVideos.at(videoId);
  //   } else {
  //     this.get('currentVideo').set('currentVideo', false);
  //     currentVideo = allVideos.findWhere({
  //       id: videoId
  //     });
  //   }

  //   currentVideo.set('currentVideo', true);
  //   this.set('currentVideo', currentVideo);
  // },

  // updateDefaultSearch: function (search) {
  //   this.set('defaultSearch', search);
  // },

  // searchYoutube: function(){
  //   this.setUrl();
  //   this.get('videos').fetch({
  //     reset: true
  //   });
  // },

  // setUrl(){
  //   this.get('videos').searchVideos(this.get('defaultSearch'));
  // }

});
