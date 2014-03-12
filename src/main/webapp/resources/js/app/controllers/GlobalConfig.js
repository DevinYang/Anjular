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
		
		//intercept the response
		$httpProvider.responseInterceptors.push(['$q','MessageService',function($q,MessageService) {
			return function (promise) {
			    return promise.then(function (response) {
			    	return response;
			    }, function (response) {
			       if (response.status >= 400 && response.status < 500) {
			    	   MessageService.setLevel('warning');
			    	   MessageService.setMessage('Server:{'+response.config.url+'} was unable to find... Sorry!! HTTP Status code is:'+response.status);
			       }
			       $.unblockUI();
			      return $q.reject(response);
			    });
			  };
		}]);
	});
	
	app.controller("MessageCtrl",['$scope','$interval','MessageService',function($scope,$interval,MessageService){
		$scope.show = false;
		$scope.level = MessageService.getLevel();
		$scope.message = MessageService.getMessage();
		
	    var hide = function(){
	    	$scope.$apply(function () {
	    		$scope.show =false;
	    	});
		};
		
		$scope.hide = function(){
			$scope.show =false;
		};
		
		function updateMessage(newValue,oldValue,$scope){
			console.log("old value : " + oldValue);
			console.log("new value : " + newValue);
			if(oldValue !== newValue){
				$scope.level = MessageService.getLevel();
				$scope.message = MessageService.getMessage();
				if(!$scope.show){
					$scope.show = true;
				}
				//elapse 5 seconds,hide the message
				setTimeout(hide, 5000);
			}
		}
		
		$scope.getMessage = function(){
			return MessageService.getMessage();
		};
		
		//watch the message value,if changed,update
		$scope.$watch($scope.getMessage,updateMessage,true);
		
	}]);
	
	
})(window.angular,window.jQuery);