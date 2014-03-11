(function(angular,$){
	var app = angular.module("dataTableApp",['angularApp.services']);
	
	app.controller("DataTableCtrl",['$scope','Country','CommonService',function($scope,Country,CommonService){
		
		//refernce https://datatables.net
		$scope.oTable = $('#datatable').dataTable({
		    "bPaginate": true,
		    "bLengthChange": true,
		    "bFilter": true,
		    "bSort": true,
		    "bInfo": true,
		    "bAutoWidth": false,
		    "aoColumns": [
		                  { "mData": "countryCode" },
		                  { "mData": "countryName" },
		                  { "mData": "recordStatus" }
		                ],
            "fnRowCallback": function (nRow, aData){
 			   $('td:eq(2)', nRow).html(CommonService.formatRecordStatusTd($('td:eq(2)', nRow).html()));
 			 }		                
		});
		
		
		//init data
		Country.query(function(countries){
			 $scope.countries = countries;
			 $scope.oTable.fnClearTable();
			 $scope.oTable.fnAddData(countries);
		});
		
	}]);
	
	
})(window.angular,window.jQuery);