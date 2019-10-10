const VideosCollection = Backbone.Collection.extend({
  model: VideoModel,

  // Initialized with Variable access
  initialize: () => {
  	// key = '&key=AIzaSyALT3IQvbkQs5TifbVM8LfyjCKQIgpA9Ns'; // Libby
  	key = '&key=AIzaSyB3YECTEhQkCY9CyYu43DQGgjP9RL2UIHQ'; // Tony
  	baseUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=';
  },

  // Initial API Call
  searchVideos: function(search) {
    this.url = baseUrl + search + key;
    this.fetch({
      reset: true,
      error: function(err) {
        throw err;
      }
    });
  },

  parse: function(resp) {
    return resp.items.map(item => {
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.default.url,
        embed: 'https://www.youtube.com/embed/' + item.id.videoId + '?autoplay=1&mute=1'
      }
    });
  }
});
