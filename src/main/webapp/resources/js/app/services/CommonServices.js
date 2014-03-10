(function() {
	var app = angular.module("angularApp.services", ['ngResource']);

	app.factory("CommonActions", function() {
		return {
			'update' : {
				'method' : 'PUT',
				'isArray' : false,
				'headers' : {
	                'Content-Type' : 'application/json'
	            }
			},
			'inactivate' : {
				'method' : 'PUT',
				'params' : {
					':status' : 'inactivation'
				},
				'isArray' : false,
				'headers' : {
	                'Content-Type' : 'application/json'
	            }
			},
			'reactivate' : {
				'method' : 'PUT',
				'params' : {
					':status' : 'reactivation'
				},
				'isArray' : false,
				'headers' : {
	                'Content-Type' : 'application/json'
	            }
			}
		};
	});

	app.factory("Country", [ '$resource','CommonActions', function($resource,CommonActions) {
		return $resource('country/countries/:countryCode/:status.do',{'countryCode' : '@countryCode'},CommonActions);
	}]);

})();