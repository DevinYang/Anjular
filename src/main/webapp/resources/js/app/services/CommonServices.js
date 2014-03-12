(function() {
	var app = angular.module("services", ['ngResource']);

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
	
	app.factory("CommonService",function(){
		var services = {};
		
		services.formatRecordStatusTd = function (statusString) {
			if(statusString === 'false') {
				return 'Active'; 
			}else if(statusString === 'true'){
				return 'Inactive'; 
			}else{
				return statusString;
			}
		};
		
		return services;
	});
	
	app.factory("MessageService",function(){
		var levels = ['success','info','warning','danger'];
		return {
			message : "OK",
			level : levels[0],
			setMessage : function(msg){
				this.message = msg;
			},
			getMessage : function(){
				return this.message;
			},
			setLevel : function(level){
				this.level = level;
			},
			getLevel : function(){
				return this.level;
			},
			hide : function(){
				return true;
			}
		};
	});

	app.factory("Country", [ '$resource','CommonActions', function($resource,CommonActions) {
		return $resource('country/countries/:countryCode/:status.do',{'countryCode' : '@countryCode'},CommonActions);
	}]);

})();