/*
 * @summary     DataTables extend on datatable 1.9.4
 * @description Paginate extend
 * @version     0.0.1
 * @file        jquery.dataTables.ext.js
 * @author      qtca
 * @contact     
 *
 * @copyright Copyright all rights reserved.
 */
/*
 * Variable: commonStandard
 * Purpose:  commonStandard pagination
 * Scope:    jQuery.fn.dataTableExt.oPagination
 */

 (function($) {
$.fn.dataTableExt.oPagination.commonStandard = {
/*
 * Function: oPagination.full_numbers.fnInit
 * Purpose:  Initialise dom elements required for pagination with a list of the pages
 * Returns:  -
 * Inputs:   object:oSettings - dataTables settings object
 *           node:nPaging - the DIV which contains this pagination control
 *           function:fnCallbackDraw - draw function which must be called on update
 */
    "fnInit": function ( oSettings, nPaging, fnCallbackDraw )
    {
        var oLang = oSettings.oLanguage.oPaginate;
        var oClasses = oSettings.oClasses;
        var fnClickHandler = function ( e ) {
            if ( oSettings.oApi._fnPageChange( oSettings, e.data.action ) )
            {
                fnCallbackDraw( oSettings );
            }
        };

        $(nPaging).append(
                '<a  tabindex="'+oSettings.iTabIndex+'" class="'+oClasses.sPageButton+" "+oClasses.sPageFirst+'">'+oLang.sFirst+'</a>'+
                        '<a  tabindex="'+oSettings.iTabIndex+'" class="'+oClasses.sPageButton+" "+oClasses.sPagePrevious+'">'+oLang.sPrevious+'</a>'+
                        '<span></span>'+
                        '<a tabindex="'+oSettings.iTabIndex+'" class="'+oClasses.sPageButton+" "+oClasses.sPageNext+'">'+oLang.sNext+'</a>'+
                        '<a tabindex="'+oSettings.iTabIndex+'" class="'+oClasses.sPageButton+" "+oClasses.sPageLast+'">'+oLang.sLast+'</a>'+
                        "<input type='text' name='pageNumber' class='gotoPage_Txt' value=''/><a href='#' class='btn btn-Secondary goToPage_Btn'>Go</a>"
        );
        var els = $('a', nPaging);
        var nFirst = els[0],
                nPrev = els[1],
                nNext = els[2],
                nLast = els[3],
                goTo  = els[4];

        oSettings.oApi._fnBindAction( nFirst, {action: "first"},    fnClickHandler );
        oSettings.oApi._fnBindAction( nPrev,  {action: "previous"}, fnClickHandler );
        oSettings.oApi._fnBindAction( nNext,  {action: "next"},     fnClickHandler );
        oSettings.oApi._fnBindAction( nLast,  {action: "last"},     fnClickHandler );

        $(nPaging).find("a.goToPage_Btn").click(function(){
            var pageNumber =  $(nPaging).find("input.gotoPage_Txt").val();

            if (pageNumber === "" || pageNumber.match(/[^0-9]/) )
            {
                /* Nothing entered or non-numeric character */
                return false;
            }
            if(pageNumber == 0){
                oSettings._iDisplayStart = 0;
                fnCallbackDraw( oSettings );
                return false;
            }
            var iNewStart = oSettings._iDisplayLength * (pageNumber - 1);
            if ( iNewStart >= oSettings.fnRecordsDisplay() )
            {
                /* Display overrun */
                oSettings._iDisplayStart = (Math.ceil((oSettings.fnRecordsDisplay()-1) /
                        oSettings._iDisplayLength)-1) * oSettings._iDisplayLength;
                fnCallbackDraw( oSettings );
                return false;
            }
            oSettings._iDisplayStart = iNewStart;
            fnCallbackDraw( oSettings );
            return false;
        });
        /* ID the first elements only */
        if ( !oSettings.aanFeatures.p )
        {
            nPaging.id = oSettings.sTableId+'_paginate';
            nFirst.id =oSettings.sTableId+'_first';
            nPrev.id =oSettings.sTableId+'_previous';
            nNext.id =oSettings.sTableId+'_next';
            nLast.id =oSettings.sTableId+'_last';
            goTo.id = oSettings.sTableId+'_goTO';
        }
    },
    /*
     * Function: oPagination.full_numbers.fnUpdate
     * Purpose:  Update the list of page buttons shows
     * Returns:  -
     * Inputs:   object:oSettings - dataTables settings object
     *           function:fnCallbackDraw - draw function to call on page change
     */
    "fnUpdate": function ( oSettings, fnCallbackDraw )
    {
        if ( !oSettings.aanFeatures.p )
        {
            return;
        }
        var iPageCount =$.fn.dataTableExt.oPagination.iFullNumbersShowPages;
        var iPageCountHalf = Math.floor(iPageCount / 2);
        var iPages = Math.ceil((oSettings.fnRecordsDisplay()) / oSettings._iDisplayLength);
        var iCurrentPage = Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1;
        var sList = "";
        var iStartButton, iEndButton, i, iLen;
        var oClasses = oSettings.oClasses;
        var anButtons, anStatic, nPaginateList, nNode;
        var an = oSettings.aanFeatures.p;

        /*update input*/
        $(".t_footer").find("input.gotoPage_Txt").val(iCurrentPage);
        if($('#'+oSettings.sTableId+'_info').length ==0  || $('#'+oSettings.sTableId+'_last').length == 0){
            return;
        }
        var infostr = $('#'+oSettings.sTableId+'_info').html().replace( '_TOTALPAGE_', iPages );
        $('#'+oSettings.sTableId+'_info').html(infostr);
        $('#'+oSettings.sTableId+'_last').after($('#'+oSettings.sTableId+'_info'));
        var fnBind = function (j) {
            oSettings.oApi._fnBindAction( this, {"page": j+iStartButton-1}, function(e) {
                /* Use the information in the element to jump to the required page */
                oSettings.oApi._fnPageChange( oSettings, e.data.page );
                fnCallbackDraw( oSettings );
                e.preventDefault();
            } );
        };

        /* Pages calculation */
        if ( oSettings._iDisplayLength === -1 )
        {
            iStartButton = 1;
            iEndButton = 1;
            iCurrentPage = 1;
        }
        else if (iPages < iPageCount)
        {
            iStartButton = 1;
            iEndButton = iPages;
        }
        else if (iCurrentPage <= iPageCountHalf)
        {
            iStartButton = 1;
            iEndButton = iPageCount;
        }
        else if (iCurrentPage >= (iPages - iPageCountHalf))
        {
            iStartButton = iPages - iPageCount + 1;
            iEndButton = iPages;
        }
        else
        {
            iStartButton = iCurrentPage - Math.ceil(iPageCount / 2) + 1;
            iEndButton = iStartButton + iPageCount - 1;
        }


        /* Build the dynamic list */
        for ( i=iStartButton ; i<=iEndButton ; i++ )
        {
            sList += (iCurrentPage !== i) ?
                    '<a tabindex="'+oSettings.iTabIndex+'" class="'+oClasses.sPageButton+'">'+oSettings.fnFormatNumber(i)+'</a>' :
                    '<a tabindex="'+oSettings.iTabIndex+'" class="'+oClasses.sPageButtonActive+'">'+oSettings.fnFormatNumber(i)+'</a>';
        }

        /* Loop over each instance of the pager */
        for ( i=0, iLen=an.length ; i<iLen ; i++ )
        {
            nNode = an[i];
            if ( !nNode.hasChildNodes() )
            {
                continue;
            }

            /* Build up the dynamic list first - html and listeners */
            $('span:eq(0)', nNode)
                    .html( sList )
                    .children('a').each( fnBind );

            /* Update the permanent button's classes */
            anButtons = nNode.getElementsByTagName('a');
            anStatic = [
                anButtons[0], anButtons[1],
                anButtons[anButtons.length-3], anButtons[anButtons.length-2]
            ];

            $(anStatic).removeClass( oClasses.sPageButton+" "+oClasses.sPageButtonActive+" "+oClasses.sPageButtonStaticDisabled );
            $([anStatic[0], anStatic[1]]).addClass(
                    (iCurrentPage==1) ?
                            oClasses.sPageButtonStaticDisabled :
                            oClasses.sPageButton
            );
            $([anStatic[2], anStatic[3]]).addClass(
                    (iPages===0 || iCurrentPage===iPages || oSettings._iDisplayLength===-1) ?
                            oClasses.sPageButtonStaticDisabled :
                            oClasses.sPageButton
            );
        }
    }
};

     $.ui.dialog.prototype.options.containsColvis = false;
            //override _createOverlay dialog when contents ColVis
    $.ui.dialog.prototype._createOverlay = function() {
        if ( !this.options.modal ) {
            return;
        }

        var that = this,
            widgetFullName = this.widgetFullName;
        if ( !$.ui.dialog.overlayInstances && !this.options.containsColvis) {
            // Prevent use of anchors and inputs.
            // We use a delay in case the overlay is created from an
            // event that we're going to be cancelling. (#2804)
            this._delay(function() {
                // Handle .dialog().dialog("close") (#4065)
                if ( $.ui.dialog.overlayInstances ) {
                    this.document.bind( "focusin.dialog", function( event ) {
                        if ( !that._allowInteraction( event ) ) {
                            event.preventDefault();
                           // console.log(this.class);
                            $(".ui-dialog:visible:last .ui-dialog-content")
                                .data( widgetFullName )._focusTabbable();
                        }
                    });
                }
            });
        }

        this.overlay = $("<div>")
            .addClass("ui-widget-overlay ui-front")
            .appendTo( this._appendTo() );
        this._on( this.overlay, {
            mousedown: "_keepFocus"
        });
        $.ui.dialog.overlayInstances++;
    };

    $.fn.dataTableExt.oApi.fnGetColumnData = function ( oSettings, iColumn, bUnique, bFiltered, bIgnoreEmpty ) {
        // check that we have a column id
        if ( typeof iColumn == "undefined" ) return new Array();

        // by default we only want unique data
        if ( typeof bUnique == "undefined" ) 
        		bUnique = true;

        // by default we do want to only look at filtered data
        if ( typeof bFiltered == "undefined" ) bFiltered = true;

        // by default we do not want to include empty values
        if ( typeof bIgnoreEmpty == "undefined" ) bIgnoreEmpty = true;

        // list of rows which we're going to loop through
        var aiRows;

        // use only filtered rows
        if (bFiltered == true) aiRows = oSettings.aiDisplay;
        // use all rows
        else aiRows = oSettings.aiDisplayMaster; // all row numbers

        // set up data array 
        var asResultData = new Array();

        for (var i=0,c=aiRows.length; i<c; i++) {
        iRow = aiRows[i];
        var aData = this.fnGetData(iRow);
        var sValue = aData[iColumn];
        while (typeof sValue == 'object'){
        		if($.isEmptyObject(sValue) ||  sValue.length <= 0){
        			sValue ='object is null';
        			break;
        		}
        		if( (typeof sValue[0]) == 'undefined'  ||  sValue[0].length <= 0 )	
        			 sValue[0] = 'object is null';
        		sValue = sValue[0] ;
        		if(typeof sValue == 'string')
        				break;
        	} 
        // ignore empty values?
        if (bIgnoreEmpty == true && (sValue==null || sValue.length == 0))  {continue;}

        // ignore unique values?
        else if (bUnique == true && jQuery.inArray(sValue, asResultData) > -1){
        	 		continue;
        	}
        		

        // else push the value onto the result data array
        else {
        		if(sValue !='object is null')
        			asResultData.push(sValue);}
        }

        return asResultData;
    };

    function fnCreateSelect( aData ){
        var r='<div class="filterRow"><select name="filterSelect" class="filterSelect"><option value="">All</option><div>', i, iLen=aData.length;
        for ( i=0 ; i<iLen ; i++ ){
            r += '<option value="'+aData[i]+'">'+aData[i]+'</option>';
        }
        return r+'</select>';
    } 

    function fnCreateInputSelect( aData ){
        var r='<div class="filterRow"><select class="filterInputSelect"><option value="">All</option><div>', i, iLen=aData.length;
        for ( i=0 ; i<iLen ; i++ ){
            r += '<option value="'+aData[i]+'">'+aData[i]+'</option>';
        }
        return r+'</select>';
    } 

    function fnCreateMultiSelect( aData ){
        var r='<div class="filterRow"><select name="filterMultiSelect" class="filterMultiSelect"  multiple="multiple"><div>', i, iLen=aData.length;
        for ( i=0 ; i<iLen ; i++ ){
            r += '<option value="'+aData[i]+'">'+aData[i]+'</option>';
        }
        return r+'</select>';
    } 

    function fnCreateInputMultiSelect( aData ){
        var r='<div class="filterRow"><select id="filterInputMultiSelect" class="filterInputMultiSelect"  multiple="multiple">', i, iLen=aData.length;
        for ( i=0 ; i<iLen ; i++ ){
            r += '<option value="'+aData[i]+'">'+aData[i]+'</option>';
        }
        return r+'</select>';
    } 

    replaceRegexStr = function(string){  
      string = string.replace(/\\/g,"\\\\");
      string = string.replace(/\^/g,"\\^");
      string = string.replace(/\$/g,"\\$");
      string = string.replace(/\*/g,"\\*");
      string = string.replace(/\+/g,"\\+");
      string = string.replace(/\?/g,"\\?");
      string = string.replace(/\./g,"\\.");
      string = string.replace(/\|/g,"\\|");
      string = string.replace(/\&/g,"\\&");
      // string = string.replace(/\&/g,"\\{");
      // string = string.replace(/\&/g,"\\}");
      return   string;  
    }; 
    
    /*
     * get really filter th index
     */
    function getHeaderColumnIndex (oTable,currentTh) {
    	var settings = oTable.fnSettings();
    	var aoColumns = settings.aoColumns;
    	var sortWrapper = currentTh.find('div.DataTables_sort_wrapper');
    	var thText = null;
    	var index = null;
    	if (sortWrapper.length>0) {
    		thText = sortWrapper.html().substr(0,sortWrapper.html().indexOf('<'));
    	}else{
    		thText = currentTh.html().indexOf('<')>0?currentTh.html().substr(0,currentTh.html().indexOf('<')):currentTh.html();
    	}
    	
    	for (var j=0;j<aoColumns.length;j++) {
    		if(thText === aoColumns[j].sTitle){
    			index = j;
    			break;
    		}
    	}
    	return index;
    }
    /*
     * th : jquery object for TH element
     * thIndex: the index of TH element
     */
    function attachFilterToTh(oTable,$th,thIndex) {
    	$th.addClass('filterColumn');//add a flag to indicate $th element is a filter TH element
        $th.unbind( "click.DT" ).unbind( "keypress.DT" ).unbind( "selectstart.DT" );
        oTable.fnSortListener( $th.find("div.DataTables_sort_wrapper").eq(0), getHeaderColumnIndex(oTable,$th));
        var fiData = oTable.fnGetColumnData(thIndex);

        if($th.hasClass("filterSelectColumn")){
            $th.append(fnCreateSelect(fiData));
              $('select.filterSelect',$th).change( function () {
                  var filterString = $th.val();
                  if($th.val()=="" || $th.val()==null){
                     filterString = "";
                  }
                  else{
                    // replace regex string in the search word
                    filterString = "^"+replaceRegexStr($th.val())+"$";
                  }
                  // do exact filter, set regex filter=true, smart filter=false
                  oTable.fnFilter( filterString, getHeaderColumnIndex(oTable,$th.parent().parent()), true, false,true,true);
              } );
        }
        else if($th.hasClass("filterInputSelectColumn")){
            $th.append(fnCreateInputSelect(fiData));
            $('select.filterInputSelect',$th).change( function () {
                  var filterString = $th.val();
                  if($th.val()=="" || $th.val()==null){
                     filterString = "";
                  }
                  else{
                    filterString = "^"+replaceRegexStr($th.val())+"$";
                  }
                  oTable.fnFilter( filterString, getHeaderColumnIndex(oTable,$th.parent().parent()), true, false,true,true);
            } );
        }
        else if($th.hasClass("filterMultiColumn")){
            $th.append(fnCreateMultiSelect(fiData));
              $('select.filterMultiSelect',$th).change( function () {
                  var filterList = $th.val();
                  var filterString = "";
                  if($th.val()=="" || $th.val()==null){
                     filterString = "";
                  }
                  else{
                    // replace regex string in the search word
                    filterString = "^"+ replaceRegexStr(filterList[0]) +"$";
                    for(var j=1; j<filterList.length; j++){
                        filterString = filterString + "|" + "^"+ replaceRegexStr(filterList[j]) +"$";
                    }
                    // filterString = "^"+ filterString +"$";
                  }
                  // do exact filter, set regex filter=true, smart filter=false
                  oTable.fnFilter( filterString, getHeaderColumnIndex(oTable,$th.parent().parent()), true, false,true,true);
              } );
        }
        else if($th.hasClass("filterInputMultiColumn")){
            $th.append(fnCreateInputMultiSelect(fiData));
              $('select.filterInputMultiSelect',$th).change( function () {
                  var filterList = $th.val();
                  var filterString = "";
                  if($th.val()=="" || $th.val()==null){
                     filterString = "";
                  }
                  else{
                    filterString = "^"+ replaceRegexStr(filterList[0]) +"$";
                    for(var j=1; j<filterList.length; j++){
                        filterString = filterString + "|" + "^"+ replaceRegexStr(filterList[j]) +"$";
                    }
                  }
                  oTable.fnFilter( filterString, getHeaderColumnIndex(oTable,$th.parent().parent()), true, false,true,true);
              } );
        }
        else if($th.hasClass("filterInputColumn")){
            $th.append("<div class='filterRow'><input type='text' value='' placeholder='Enter to filter'/></div>");
        }
        else if($th.hasClass("filterDateColumn")){
            $th.append("<div class='filterRow'><input type='text' value='' placeholder='Choose filter date' class='dateFilter'/></div>");
        }
        else{
            $th.append("<div class='filterRow'><input type='text' value='' style='visibility:hidden;'/></div>");
        }
    }
    
    function enableFilterEventAction (oTable) {
    	 $(".filterRow input").keyup( function (e) {
             /* Filter on the column (the index) of this element, set smart filter=true */
           	var thIndex = getHeaderColumnIndex(oTable,$(this).parent().parent());
           	oTable.fnFilter( this.value,thIndex, false, true,true,true );
           });

           $(".filterSelect").selecter(); 
           $(".filterInputSelect").selecter({ inputFilter:true}); 
           $(".filterMultiSelect").selecter();
           $(".filterInputMultiSelect").selecter({ inputFilter:true});
           $(".filterRow .selecter").addClass("smallerSelc");
           // $(".filterMultiColumn .selecter").addClass("smallerSelc");
    }
        /* Add a select for each TH element in the table */
    createFilterRow =function(oTable){
        //$("table .TableHeaderRow th").each( function ( i ) {
    	$(oTable.fnSettings().nTHead).find('th').each( function ( i ) {
    		attachFilterToTh(oTable,$(this),i);
        } );
        enableFilterEventAction(oTable);
    };
    /* Add a select for single TH element in the table */
    createSingleFilterThead = function (oTable,$th,thIndex) {
    	attachFilterToTh(oTable,$th,thIndex);
    	enableFilterEventAction(oTable);
    };
})(jQuery);