var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, TwitterService){
	$scope.getUser = function(username){
		console.log("username entered ", username);
		TwitterService.getUser(username)
		    .then(function(data){
		        
		        if(data.error){
		        	var errorData = JSON.parse(data.error.data);
		        	$scope.twitterErrors = errorData.errors[0].message;
		        } else if (data.result){
		        	$scope.twitterErrors = undefined;
		        	$scope.results = JSON.parse(data.result.userData);
		        }
		    })
		    .catch(function(error){
		        console.error('there was an error retrieving data: ', error);
		    })
	}
  
});

app.factory('TwitterService', function($http, $q){
  
  var getUser = function(username){
    var d = $q.defer();
    $http.post('/twitter/user', {username : username})
      .success(function(data){
        return d.resolve(data);
      })
      .error(function(error){
        return d.reject(error);
      });
    return d.promise;
  };

  return {
    getUser : getUser
  }
});