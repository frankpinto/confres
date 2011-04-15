// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

var oTable;
var giRedraw = false;

$(document).ready(function() {
    /* Add a click handler to the rows - this could be used as a callback */
    $("#datatable tbody").click(function(event) {
            $(oTable.fnSettings().aoData).each(function (){
                    $(this.nTr).removeClass('row_selected');
            });
            $(event.target.parentNode).addClass('row_selected');
            var anSelected = fnGetSelected( oTable );
            string = ''
            data = oTable.fnGetData(anSelected[0]);
            row = oTable.fnDeleteRow( anSelected[0] );

            rTable.fnAddData(data);
    });
    
    /* Init the table */
    oTable = $('#datatable').dataTable();
    rTable = $('#restable').dataTable();
});

/* Get the rows which are currently selected */
function fnGetSelected( oTableLocal )
{
        var aReturn = new Array();
        var aTrs = oTableLocal.fnGetNodes();
        
        for ( var i=0 ; i<aTrs.length ; i++ )
        {
                if ( $(aTrs[i]).hasClass('row_selected') )
                {
                        aReturn.push( aTrs[i] );
                }
        }
        return aReturn;
}
