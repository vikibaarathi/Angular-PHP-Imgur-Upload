app.controller('homeCtrl', function ($scope, $rootScope,$state, Upload) {
	
	//HIDE THE UPLOAD BUTTON
	$scope.showDiv = false;
	
	//INITIALIZE THUMBNAIL PLACEHOLDER
	$scope.form = {};
	$scope.form.thumbImg = "../Angular-PHP-Imgur-Upload/assets/placeHolder.png";
	
	//LOAD THUMBNAIL
	$scope.loadImage = function(element){
		
		var thumb = element.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            $scope.$apply(function() {
	           $scope.showLoading = true;
	            
            	
            });
        };
        reader.readAsDataURL(thumb);

       //BEGIN THE UPLOAD PROCESS THUMBNAIL
       //FACTORY DECLARED IN app.js
        Upload.image(thumb, function(response){
        	if (response) {       		
        		$scope.finalUrl = response;
        		$scope.form.thumbImg  = response;
           		$scope.$apply(function() { 
	            	$scope.showLoading = false;
	            	$scope.showDone = true;
	            });
        		
        	}
        });

	}
	

});