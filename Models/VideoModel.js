const VideoModel = Backbone.Model.extend({
  defaults: () => {
  	return {
	  	id: 0,
	    title: '',
	    description: '',
	    thumbnail: '',
	    embed: ''
  	}
  }
});
