(function(){
	var app = angular.module("angularApp.countryController",['angularApp.services']);
	
	app.factory("Resource", [ '$resource',function($resource) {
		return $resource('country/countries.do');
	}]);
	
	app.controller("CountryCtrl",['$scope','Country','Resource',function($scope,Country,Resource){
		
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
			},function(response){
				console.info("fail");
			});
		};
	}]);
	
})();