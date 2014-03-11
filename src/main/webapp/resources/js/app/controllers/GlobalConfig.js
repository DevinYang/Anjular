(function(angular,$){
	var app = angular.module("globalConfig",['services','ngRoute']);
	
	// register the interceptor as a service, intercepts ALL angular http request and response
	app.config(function($httpProvider) {
		$httpProvider.interceptors.push(function($q) {
			return {
				'request' : function(config) {
					if (config.url != null && config.url.indexOf('.do') > 0) {
						$.blockUI({
							css : {
								border : 'none',
								padding : '15px',
								backgroundColor : '#000',
								'-webkit-border-radius' : '10px',
								'-moz-border-radius' : '10px',
								opacity : .5,
								color : '#fff'
							},
							message : '<h4>Please wait...</h4>'
						});
					}
					return config;
				},
				'response' : function(response) {
					if (response.config.url.indexOf('.do') > 0) {
						$.unblockUI();
					}
					return response;
				}
			};
		});
	});
	
	app.controller("MessageCtrl",['$scope','$q','$route','Country','Resource',function($scope,$q,$route,Country,Resource){
		
	}]);
	
	
})(window.angular,window.jQuery);