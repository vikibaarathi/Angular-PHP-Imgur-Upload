var app = angular.module('uploadapp', ['ui.router']);

// Router
app.config(function($stateProvider, $urlRouterProvider, $httpProvider){ 

	// Route
	$stateProvider
	.state('home', {
		url: '/home',
		templateUrl: 'page/home.html',
		controller: 'homeCtrl'
	});
	

	$urlRouterProvider.otherwise('/home');

	$httpProvider.defaults.transformRequest.unshift(function (data, headersGetter) {
        var key, result = [];
        if (typeof data === "string")
          return data;
        for (key in data) {
          if (data.hasOwnProperty(key))
            result.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
        }
        return result.join("&");
    });

});





// Factory

app.factory('Upload', ['$http', function ($http) {
	var URL = 'http://odaapp.co/api/v1/';
	return {
		image : function(id, idPath, colPath, table, file, cb){

				var data = new FormData();
				var method = "uploadGeneralImage";
				
			

				data.append("method", method);
				data.append("id", id);
				data.append("idPath", idPath);
				data.append("colPath", colPath);
				data.append("file",file);
				data.append("table",table);
				

				var xhr = new XMLHttpRequest();
				xhr.withCredentials = true;

				xhr.addEventListener("readystatechange", function () {
				  if (this.readyState === this.DONE) {
				    cb(this.responseText);
				  }
				});

				xhr.open("POST", URL);
				xhr.send(data);
			}
	};
}]);

