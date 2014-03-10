define(['angular'],function (angular) {
	'use strict';

	var uiCustom = angular.module('ui.custom',['ngRoute']);

	/**
	 * ui services
	 */

	/**
	 * for exchange the data between different scope
	 */
	uiCustom.factory('TabsService',function(){
		return {
			"isReady":false,
			"tabSelect":null,
			"panes":[]
		};
	});



	/**
	 * ui directives
	 */
	uiCustom.directive('sidebar',['$parse',function($parse){
		return {
			restrict:'E',
			templateUrl:'js/apps/views/sideBar.html',
			link:function(scope,element,attrs){
			}
		};
	}]);

	uiCustom.directive('datatable',function(){
		return {
			restrict:'EA',
			replace:true,
			templateUrl:'js/apps/views/component/dataTable.html',
			scope:{
				tableModel:'=tableModel'
			},
			link:function(scope,element,attrs){
				scope.$watch('tableModel.sAjaxSource', function(newValue, oldValue) {
					if(newValue){
						if(!scope[scope.tableModel.sn]){
							scope[scope.tableModel.sn] = element.find('#'+scope.tableModel.sn).dataTable(scope.tableModel);
						}else{
							var style = scope[scope.tableModel.sn].attr('style'); //store the style
							scope[scope.tableModel.sn].fnDestroy();
							scope[scope.tableModel.sn].dataTable(scope.tableModel);
							scope[scope.tableModel.sn].attr('style',style); // restore the style
						}
					}
				});
			}
		};
	});

	uiCustom.directive('uploadbar',['$parse',function($parse){
		return {
			restrict:'E',
			templateUrl:'js/apps/views/uploadBar.html',
			link:function(scope,element,attrs){
			}
		};
	}]);


	uiCustom.directive('panelPage',['$parse',function($parse){
		return {
			restrict:'E',
			replace:true,
			transclude:true,
			scope:{title:'@pageTitle'},
			template:'<div class="panel panel-default">'+
				'<div class="panel-heading"><h2>{{title}}</h2></div>'+
				'<div class="panel-body" ng-transclude></div></div>',
			link:function(scope,element,attrs){
				
			}
		};
	}]);

	uiCustom.directive('navbar',['$parse',function($parse){
		return {
			restrict:'E',
			replace:true,
			transclude:true,
			templateUrl:'js/apps/views/component/navBar.html',
			link:function(scope,element,attrs){
				
			}
		};
	}]);

	uiCustom.directive('tabs',['TabsService',function(TabsService){
		return {
			restrict:'E',
			replace:true,
			transclude:true,
			scope:{
				test:'&'
			},
			templateUrl:'js/apps/views/component/tabs.html',
			controller:function ($scope) {
				var panes = TabsService.panes = $scope.panes = [];
				 
				TabsService.tabSelect = $scope.select = function(pane) {
		          angular.forEach(panes, function(pane) {
		            pane.selected = false;
		          });
		          pane.selected = true;
		        };

		        this.addPane = function(pane) {
		          if (panes.length == 0) {
		            $scope.select(pane);
		          }
		          panes.push(pane);
		        };
			}
		};
	}]);

	uiCustom.directive('pane',function(){
		return {
			restrict:'E',
			replace:true,
			transclude:true,
			require:'^tabs',
			scope:{
				title:'@',
				isHide:'=hide'
			},
			templateUrl:'js/apps/views/component/pane.html',
			link:function(scope,element,attrs,tabsCtrl){
				tabsCtrl.addPane(scope);
			}
		};
	});


	uiCustom.directive('modalDialog',function(){
		return {
			restrict:'E',
			replace:true,
			transclude:true,
			scope:{
				modalId:'@',
				style:'@'
			},
			template:'<div><div class="modal fade" id="{{modalId}}"><div class="modal-dialog"><div class="modal-content" ng-transclude></div></div></div></div>',
			controller:function ($scope) {
			},
			link:function(scope,element,attrs){
				element.find('div.modal-content').attr('style',scope.style);
			}
		};
	});

	uiCustom.directive('modalHeader',function(){
		return {
			restrict:'E',
			replace:true,
			transclude:true,
			require:'^modalDialog',
			scope:{
				simpleTitle:'@'
			},
			template:'<div class="modal-header">'+
				'<button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-show="simpleTitle">&times;</button>'+
				'<h4 class="modal-title" ng-show="simpleTitle" style="color:#ffffff">{{simpleTitle}}</h4></div>',
			link:function(scope,element,attrs){
			}
		};
	});

	uiCustom.directive('modalBody',function(){
		return {
			restrict:'E',
			replace:true,
			transclude:true,
			template:'<div class="modal-body" ng-transclude></div>',
			link:function(scope,element,attrs){

			}
		};
	});

	uiCustom.directive('modalFooter',function(){
		return {
			restrict:'E',
			replace:true,
			transclude:true,
			template:'<div class="modal-footer" ng-transclude></div>',
			link:function(scope,element,attrs){
			}
		};
	});

	/**
	 * jQueryUI : datepicker wraped by angular
	 * @author xiao-dong.zhao@hp.com
	 */
	uiCustom.directive('datePicker',function(){
		return {
			restrict:'A',
			require:'?ngModel',
			link:function(scope,element,attrs,ngModel){
				if(!ngModel) return;
				
				var optionsObj = {};
				
				optionsObj.dateFormat = 'yy-mm-dd';
				
				var updateModel = function (dateText) {
					scope.$apply(function(){
						ngModel.$setViewValue(dateText);
					});
				};
				
				optionsObj.onSelect = function (dateText,picker) {
					updateModel(dateText);
				};
				
				element.datepicker(optionsObj);
			}
		};
	});

	/**
	 * jQueryUI : complete the select by single value automaticly
	 * @author xiao-dong.zhao@hp.com
	 * Usage:
	 * Set the current scope object to sourceScope attribute , set the JQueryUI autocomplete opitons to the options attribute, 
	 * If you want to delay the autocomplete works ,you could set auto attribute to false.
	 * This directive will export an object named {id + 'S'},It include two parts:current select options and an reDraw function that could reDraw current select
	 * by new source from options you reset
	 * For example:
	 * <input sac-select source="countryList" sourceScope="xxxScope" ng-model="country" id="countrySelect"/>
	 * You will get the select options and reDraw function from currentScope.countrySelectS
	 * You could reset the options and reDraw the selector
	 * PS:You could set currentScope in the parent controller just like this "scope.xxScope = scope"
	 */
	uiCustom.directive('sacSelect',function(){
		return {
			restrict:'A',
			require:'?ngModel',
			scope:{
				sourceScope:'=',
				options:'='	,
				auto:'@'
			},
			link:function(scope,element,attrs,ngModel){
				if(!ngModel) return;
				
				var updateModel = function (selectedText) {
					scope.$apply(function(){
						ngModel.$setViewValue(selectedText);
					});
				};
				
				var optionsObj = {};
				
				if(scope.options!=null||typeof(scope.options) == "object"){
					optionsObj.select = function (event,selectObj) {
						if(scope.options.selectCallback!=null && typeof scope.options.selectCallback === "function"){
							scope.options.selectCallback(event,selectObj);
						}
						updateModel(selectObj.item.value);
					};
					optionsObj = $.extend(optionsObj,scope.options);
					if(scope.auto!=null&&scope.auto==="true"){
						element.autocomplete(optionsObj); 
						$('ul.ui-menu').addClass('ui-menu-fix');
					}
				}
				
				if((scope.sourceScope!=null && typeof(scope.sourceScope) == "object") && attrs.id!=null){
					scope.sourceScope[attrs.id+'S'] = {
							"reDraw":function (options) {
								element.autocomplete($.extend(optionsObj,options));
								$('ul.ui-menu').addClass('ui-menu-fix');
							}
					};
				}
			}
		};
	});

	/**
	 * jQueryUI : complete the select by multiple values automaticly
	 * @author xiao-dong.zhao@hp.com
	 * Usage:
	 * Set the current scope object to sourceScope attribute , set the JQueryUI autocomplete opitons to the options attribute, 
	 * If you want to delay the autocomplete works ,you could set auto attribute to false.
	 * This directive will export an object named {id + 'M'},It include two parts:current select options and an reDraw function that could reDraw current select
	 * by new source from options you reset
	 * For example:
	 * <input sac-select source="countryList" sourceScope="currentScope" ng-model="country" id="countrySelect"/>
	 * You will get the select options and reDraw function from currentScope.countrySelectM
	 * You could reset the options and reDraw the selector
	 * PS:You could set currentScope in the parent controller just like this "scope.xxScope = scope"
	 */
	uiCustom.directive('macSelect',function(){
		return {
			restrict:'A',
			require:'?ngModel',
			scope:{
				sourceScope:'=',
				options:'='	,
				auto:'@'
			},
			link:function(scope,element,attrs,ngModel){
				if(!ngModel) return;
				
				var split = function ( val ) { return val.split( /,\s*/ );  };
				var extractLast = function ( term ) { return split( term ).pop(); };

				var updateModel = function (selectedText) {
					scope.$apply(function(){
						ngModel.$setViewValue(selectedText);
					});
				};
				
				var optionsObj = {
				        minLength: 0,
				        source: function( request, response ) {
				          // delegate back to autocomplete, but extract the last term
				          response( $.ui.autocomplete.filter(
				            [], extractLast( request.term ) ) );
				        },
				        focus: function() {
				          // prevent value inserted on focus
				          return false;
				        },
				        select: function( event, ui ) {
				          var terms = split( this.value );
				          // remove the current input
				          terms.pop();
				          // add the selected item
				          terms.push( ui.item.value );
				          // add placeholder to get the comma-and-space at the end
				          terms.push( "" );
				          this.value = terms.join( ", " );
				          updateModel(this.value);
				          return false;
				        }
				      };
				
				var drawSelect = function (options) {
					// don't navigate away from the field on tab when selecting an item
					element.bind( "focus", function( event ) {
				        if ( event.keyCode === $.ui.keyCode.TAB &&
				            $( this ).data( "ui-autocomplete" ).menu.active ) {
				          event.preventDefault();
				        }
				      }).autocomplete(options);
				};
				
				if(scope.options!=null||typeof(scope.options) == "object"){
					scope.options.selectCallback(event,selectObj);
					optionsObj = $.extend(scope.options);
					if(scope.auto!=null&&scope.auto==="true"){
						drawSelect(optionsObj);  
					}
				}
				
				if((scope.sourceScope!=null && typeof(scope.sourceScope) == "object") && attrs.id!=null){
					scope.sourceScope[attrs.id+'M'] = {
							"updateModel":updateModel,
							"extractLast":extractLast,
							"reDraw":function (options) {
								drawSelect($.extend(optionsObj,options));
							}
					};
				}
			}
		};
	});
	
	uiCustom.directive('redstar',function () {
		return {
			restrict:'E',
			replace:true,
			template:'<span style="color:#FC0000">*</span>'
		};
	});
	
	uiCustom.directive('validation',['CommonServices',function (CommonServices) {
		return {
			restrict:'A',
			replace:false,
			link:function(scope,element,attrs){
				if (typeof attrs.vrule === 'undefined') {
					alert('Please set a validation rules as an attribute and name it "vRule" first!');
					return;
				}
				var validationRules = scope[attrs.vrule];
				var isPassValidation = true;
				var validationElements = null;
				if (CommonServices.isEmpty(validationRules)) {
					alert('Could not find validation rules "'+attrs.vrule+'" in the scope which id is '+scope.$id+'.');
					return;
				}
				/*else if(CommonServices.isEmpty(vRule.name)){
					alert('The validation ruls in current scope does not have a rule name.');
					return;
				}*/
				var tooltipOptions = {
						"placement":"bottom",
						"trigger":"click"
				},
				requireTitle = {
					"input":"Please fill out this field!",
					"select" : "Please select an item in the list!",
					"checkbox" : "Please select an item in the check box!",
					"radio" : "Please select an item in the radio!",
					"textarea":"Please fill out this area!"
				},
				typeReg = {
						'email':/w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/g
				};
				
				var validateRequiredElements = function (type,elements) {
					elements.tooltip('destroy');
					var title = requireTitle[type],$e;
					tooltipOptions.title = title;
					for (var i = 0; i < elements.length ; i++) {
						$e = $(elements[i]);
						if(CommonServices.isEmpty($e.val())){
							processInvalidatedElement($e);
							return;
						}
					}
				};
				var processInvalidatedElement = function ($e,title) {
					if(!CommonServices.isEmpty($e.val())){tooltipOptions.title = title;};
					isPassValidation = false;
					validationElements.push($e);
					$e.tooltip(tooltipOptions).tooltip('show').click(function () {$e.tooltip('hide').tooltip('destroy');});
				};
				//validate by rule : maxLength,minLength,type,Regular Expression
				var validateElementsByRule = function (rule,elements) {
					//$(elements).tooltip('destroy');
					var r = {},$e,
						value = null;
					r.vMax =  CommonServices.isEmpty(rule.maxLength) && !isNaN(rule.maxLength)?true:false;
					r.vMin =  CommonServices.isEmpty(rule.minLength) && !isNaN(rule.minLength)?true:false;
					r.vType = CommonServices.isEmpty(rule.type) && (rule.type === 'number'||rule.type === 'email')?true:false;
					r.reg =   CommonServices.isEmpty(rule.regexp) === false?true:false;
					
					for (var i = 0; i < elements.length ; i++) {
						$e = $(elements[i]);
						value = $e.val();
						if (r.vMax){
							if(CommonServices.isEmpty(value) || value.length > rule.maxLength){
								processInvalidatedElement($e,"The length of value must not greater then "+rule.maxLength);
								break;
							}
						}else if (r.vMin){
							if(CommonServices.isEmpty(value) || value.length < rule.maxLength){
								processInvalidatedElement($e,"The length of value must not less then "+rule.minLength);
								break;
							}
						}else if (r.vType) {
							if(rule.type === 'number' && !CommonServices.isEmpty(value) && isNaN(value)){
								processInvalidatedElement($e,"The value must be a number type");
								break;
							}
							var pattern = typeReg[rule.type];
							if (!CommonServices.isEmpty(value)&&pattern.test(value)==false){
								processInvalidatedElement($e,"The type of value must be "+rule.type);
								break;
							}
						}else if (r.regexp) {
							var reg = null;
							if(!CommonServices.isEmpty(value)){
								for (var i = 0; i < regexp.length; i++) {
									reg = regexp[i];
									if(typeof reg.regexp !== 'object'){
										alert('The regular expression:{'+reg.regexp+'} must be a RegExp object.');
										return;
									}
									if(reg.regexp.test(value) === false){
										tooltipOptions.title = "The value must be match be a"+reg.minLength+' type';
										processInvalidatedElement($e,"The value must be match be a"+reg.minLength+' type');
										break;
									}
								}
							}
						}
					}
					return;
				};
				
				validationRules.cleanTips = function () {
					$(validationElements).tooltip('hide').tooltip('destroy');
				};
				validationRules.validate = function () {
					var vRule = null;
					isPassValidation = true;
					validationElements = [];
					for(var i = 0 ; i < validationRules.length ; i++){
						vRule = validationRules[i];
						//validate elements by type: input , select , checkbox , radio , textarea
						if (vRule.require === true) {
							validateRequiredElements('input',element.find('input[name="'+vRule.name+'"]'));
							validateRequiredElements('select',element.find('select[name="'+vRule.name+'"]'));
							//validateRequiredElements('checkbox',element.find('checkbox[name="'+vRule.name+'"]'));
							//validateRequiredElements('radio',element.find('redio[name"'+vRule.name+'"]'));
							validateRequiredElements('textarea',element.find('textarea[name="'+vRule.name+'"]'));
						}
						var elements = element.find('[name="'+vRule.name+'"]:not(select):not(input[type=checkbox]):not( input[type=radio])');
						validateElementsByRule(validationRules,elements);
					};
					return isPassValidation;
				};
			}
		};
	}]);
	
	return uiCustom;
});