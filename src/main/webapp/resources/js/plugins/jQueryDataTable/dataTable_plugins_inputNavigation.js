$.fn.dataTableExt.oPagination.input = {
	/*
	 * Function: oPagination.input.fnInit
	 * Purpose:  Initalise dom elements required for pagination with input textbox
	 * Returns:  -
	 * Inputs:   object:oSettings - dataTables settings object
	 *           node:nPaging - the DIV which contains this pagination control
	 *           function:fnCallbackDraw - draw function which must be called on update
	 */
	"fnInit": function ( oSettings, nPaging, fnCallbackDraw )
	{
		var nFirst = document.createElement( 'span' );
		var nPrevious = document.createElement( 'span' );
		var nNext = document.createElement( 'span' );
		var nLast = document.createElement( 'span' );
		var nInput = document.createElement( 'input' );
		var nPage = document.createElement( 'span' );
		var nOf = document.createElement( 'span' );
		
		nFirst.innerHTML = oSettings.oLanguage.oPaginate.sFirst;
		nPrevious.innerHTML = oSettings.oLanguage.oPaginate.sPrevious;
		nNext.innerHTML = oSettings.oLanguage.oPaginate.sNext;
		nLast.innerHTML = oSettings.oLanguage.oPaginate.sLast;
		
		nFirst.className = "paginate_button first";
		nPrevious.className = "paginate_button previous";
		nNext.className="paginate_button next";
		nLast.className = "paginate_button last";
		nOf.className = "paginate_of";
		nInput.className = "paginate_input";
		nPage.className = "paginate_page";
		
		if ( oSettings.sTableId !== '' )
		{
			nPaging.setAttribute( 'id', oSettings.sTableId+'_paginate' );
			nPrevious.setAttribute( 'id', oSettings.sTableId+'_previous' );
			nPrevious.setAttribute( 'id', oSettings.sTableId+'_previous' );
			nNext.setAttribute( 'id', oSettings.sTableId+'_next' );
			nLast.setAttribute( 'id', oSettings.sTableId+'_last' );
		}
		
		nInput.type = "text";
		nPage.innerHTML = "Page ";
		
		nPaging.appendChild( nFirst );
		nPaging.appendChild( nPrevious );
		nPaging.appendChild( nPage );
		nPaging.appendChild( nInput );
		nPaging.appendChild( nOf );
		nPaging.appendChild( nNext );
		nPaging.appendChild( nLast );
		
		$(nFirst).click( function () {
			oSettings.oApi._fnPageChange( oSettings, "first" );
			fnCallbackDraw( oSettings );
		} );
		
		$(nPrevious).click( function() {
			oSettings.oApi._fnPageChange( oSettings, "previous" );
			fnCallbackDraw( oSettings );
		} );
		
		$(nNext).click( function() {
			oSettings.oApi._fnPageChange( oSettings, "next" );
			fnCallbackDraw( oSettings );
		} );
		
		$(nLast).click( function() {
			oSettings.oApi._fnPageChange( oSettings, "last" );
			fnCallbackDraw( oSettings );
		} );
		
		var timer = 0; // use for set timeout of inputing page number
		
		$(nInput).keyup( function (e) {
			
			var that = this;
			
			clearTimeout(timer); // clear previous timer
			
			timer = setTimeout(function(){keyupEvent(e, that, oSettings, fnCallbackDraw);}, 1000); // set a new timer
			
		} );
		
		
		
		/* Take the brutal approach to cancelling text selection */
		$('span', nPaging).bind( 'mousedown', function () { return false; } );
		$('span', nPaging).bind( 'selectstart', function () { return false; } );
	},
	
	/*
	 * Function: oPagination.input.fnUpdate
	 * Purpose:  Update the input element
	 * Returns:  -
	 * Inputs:   object:oSettings - dataTables settings object
	 *           function:fnCallbackDraw - draw function which must be called on update
	 */
	"fnUpdate": function ( oSettings, fnCallbackDraw )
	{
		if ( !oSettings.aanFeatures.p )
		{
			return;
		}
		var iPages;
		if (oSettings._iDisplayLength <= 0) {
			iPages = 1;
		} else {
			iPages = Math.ceil((oSettings.fnRecordsDisplay()) / oSettings._iDisplayLength);
		}
		var iCurrentPage = Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1;
		
		/* Loop over each instance of the pager */
		var an = oSettings.aanFeatures.p;
		for ( var i=0, iLen=an.length ; i<iLen ; i++ )
		{
			var spans = an[i].getElementsByTagName('span');
			var inputs = an[i].getElementsByTagName('input');
			spans[3].innerHTML = " of "+iPages;
			inputs[0].value = iCurrentPage;
			
			if ( iCurrentPage == 1 )
			{
				 $('#'+oSettings.sTableId+'_previous').hide(); 
				/*spans[2].disable = true;*/
			}
			else
			{
				$('#'+oSettings.sTableId+'_previous').show();
			}
			
			if ( iPages === 0 || iCurrentPage == iPages || oSettings._iDisplayLength == -1 )
			{
				$('#'+oSettings.sTableId+'_next').hide();
			}
			else
			{
				$('#'+oSettings.sTableId+'_next').show();
			}
		}
	}
};

function keyupEvent(event, that, oSettings, fnCallbackDraw){
	if ( event.which == 38 || event.which == 39 )
	{
		that.value++;
	}
	else if ( (event.which == 37 || event.which == 40) && that.value > 1 )
	{
		that.value--;
	}
	
	if ( that.value == "" || /[^0-9]{1,}/.test(that.value) )
	{
		/* Nothing entered or non-numeric character */
		return;
	}
	
	var iNewStart = oSettings._iDisplayLength * (that.value - 1);
	if ( iNewStart >= oSettings.fnRecordsDisplay() || that.value == '0')
	{
		/* Display overrun */
		oSettings._iDisplayStart = (Math.ceil((oSettings.fnRecordsDisplay()-1) / 
			oSettings._iDisplayLength)-1) * oSettings._iDisplayLength;
		fnCallbackDraw( oSettings );
		return;
	}
	
	oSettings._iDisplayStart = iNewStart;
	fnCallbackDraw( oSettings );
};