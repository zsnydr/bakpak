var query = {
	city: "",
	weather: 'http://api.openweathermap.org/data/2.5/weather?q=',
	restaurants: 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants%7bakery+in+',
	museum: 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=museum%7art_gallery+in+',
	promos: 'http://api.sqoot.com/v2/deals?api_key=',
	events: 'http://api.eventful.com/rest/events/search?app_key='

}

module.exports = query;
