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
	var URL = '../Angular-PHP-Imgur-Upload/API/index.php';
	return {
		image : function(file, cb){

				var data = new FormData();
				var method = "uploadImage";
				data.append("method", method);
				data.append("file",file);

				

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

