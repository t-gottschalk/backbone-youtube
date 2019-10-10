const VideoModel = Backbone.Model.extend({
  defaults: () => {
  	return {
	  	id: '',
	    title: '',
	    description: '',
	    thumbnail: '',
	    embed: ''
  	}
  }
});
