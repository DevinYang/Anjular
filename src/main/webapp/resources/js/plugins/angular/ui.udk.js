define(['angular','jquery'],function (angular,$) {
	'use strict';

	var udkComponet = angular.module('ui.udk',['ngRoute']);

	/**
	 * ui services
	 */
	udkComponet.factory('UdkDataModel',function () {
		$.fn.dataTableExt.oJUIClasses.sSortJUI ="css_right icon-sort";
		$.fn.dataTableExt.oJUIClasses.sSortJUIAsc ="css_right icon-sort-up";
		$.fn.dataTableExt.oJUIClasses.sSortJUIDesc ="css_right icon-sort-down"; 
		var dataModel = null;
		dataModel = {
			"aaSorting": null,
			"aaData": [],
			"sPaginationType" : "commonStandard", // define pagination show style is commonStandard. if sDom has p, this required.
			"bPaginate" :true,
			"bJQueryUI": true,
			"bRetrieve": true, 
			"bDestroy": true, 
			"bFilteCol":true,
			"sDom": '<"t_header"RrClf><"t_body"t><"t_footer"pi>', 
			// define the dataTable structure
			// C means view by, l means view results by length, f means filter input box, t is table content, p is pagination, i is information. if your table don't need all of this, just don't add that letter, but if you use it, must the same as the sequence displayed here. Important!
			"bSortClasses": false,
			"aoColumnDefs": null,
			"fnDrawCallback": function () {
				$('.dataTables_empty').css('height','300px');
			},
			"oLanguage": {
				"sLengthMenu": "<div class='sLengthText'>View Results of</div> _MENU_ ",//if sDom has l, this is required
				"sInfo": "<span class='number_highlight'>_TOTAL_</span> items, <span class='number_highlight'>_TOTALPAGE_</span> pages",//if sDom has p, this is required
				"sSearch": "Filter:",//if sDom has f, this is required
				"sInfoFiltered": "",//if sDom has f, this is required
				"sInfoEmpty":"<span class='number_highlight'>0</span> items, <span class='number_highlight'>0</span> pages",
				//if the search result is empty, show "0 items, 0 pages" required
				"oPaginate": { // define pagination button style, if sDom has p, this required.
					"sFirst": "<i class='icon-double-angle-left'></i>",
					"sLast": "<i class='icon-double-angle-right'></i>",
					"sNext": "<i class='icon-angle-right'></i>",
					"sPrevious": "<i class='icon-angle-left'></i>"
				}
			},
			"oColVis": { // define view by function styleif sDom has C, this is required
				"buttonText": 'View By <i class="icon-chevron-down"></i>',
				"aiExclude": [ 0 ],//define the column don>t need to display in view by
				"bShowAll": true,
				"sShowAll": "Show All",
				"sAlign":"left"
			} 
		};
		return {
			"createModel": function (model) {
				if(model==null||model==undefined){
					return angular.copy(dataModel);
				}else{
					return $.extend(angular.copy(dataModel), model);
				}
			}
		};
	});

	/**
	 * ui directives
	 */
	udkComponet.directive('udkDataTable',function(){
		return {
			restrict:'A',
			scope:{
				dataModel:'=tableModel'
			},
			link:function(scope,element,attrs){
				scope.dataModel.oTable = element.dataTable(scope.dataModel);
				var elementRoot = element.closest('section');
				$('#'+attrs.id+'_length select').selecter();
				//element.find('.btn').corner("tr bl 5px");
				if(scope.dataModel.bFilteCol==true){
					createFilterRow(scope.dataModel.oTable);
				}
				if(scope.dataModel.tBodyClass){
					element.closest('div').addClass(scope.dataModel.tBodyClass);
				}
				if(scope.dataModel.extTableTool){
					var elements = scope.dataModel.extTableTool.split('|');
					for(var i = 0; i < elements.length;i++){
						elementRoot.find('div.t_header').append('<div class="extTool">'+elements[i]+'</div>');
					}
				}
				if(scope.dataModel.extFilterTool){
					var elements = scope.dataModel.extFilterTool.split('|');
					for(var i = 0; i < elements.length;i++){
						elementRoot.find('#'+scope.dataModel.id+'_filter').append('<label><div class="sLengthText sFilterDiv">'+elements[i]+'</div></label>');
					}
				}
				if(scope.dataModel.sScrollX||scope.dataModel.sScrollY){//fix the bugs by setting scroll to table
					elementRoot.find('.dataTables_scrollBody table thead').remove();
				}
				
				elementRoot.find('.selecter-selected').attr("style","width:40px");
				elementRoot.find('a.goToPage_Btn').attr('style',"width: 60px;height: 25px;").html('Go Page');
			}
		};
	});
	
	
	udkComponet.directive('udkSelect',function(){
		return {
			restrict:'A',
			require:'^select',
			link:function(scope,element,attrs){
				element.attr('style',attrs.style);
				//element.selecter();TODO
			}
		};
	});

	return udkComponet;
});