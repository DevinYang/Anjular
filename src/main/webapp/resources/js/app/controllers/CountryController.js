(function(angular,$){
	var app = angular.module("countryController",['services','ngRoute']);
	
	app.factory("Resource", [ '$resource',function($resource) {
		return $resource('country/countries.do');
	}]);
	
	app.controller("CountryCtrl",['$scope','$q','$route','Country','Resource',function($scope,$q,$route,Country,Resource){
		
		$scope.ctry = {};
		
		//init data
		Country.query(function(countries){
			 $scope.countries = countries;
		});
		/*Resource.query(function(countries){
			$scope.countries = countries;
		});*/
		
		$scope.createCountry = function(country){
			console.info(country);
			Country.save({"countryCode" : null},angular.copy(country),function(response){
				$scope.countries[$scope.countries.length] = response.content;
				$scope.ctry = {};
				return true;
			},function(response){
				console.info("fail");
				return false;
			});
		};
		
		$scope.create = function(country){
			var deferred = $q.defer();
			 
		    setTimeout(function() {
		      $scope.$apply(function() {
		        deferred.notify('About to greet ' + country + '.');
		        Country.save({"countryCode" : null},angular.copy(country),function(response){
		        	deferred.resolve(response);
				},function(response){
					deferred.reject('Unable to create country' + $route.current.params.countryCode);
				});
		      });
		    }, 1000);
		    return deferred.promise;
		};
	}]);
	
	
})(window.angular,window.jQuery);