/**
 * Created by Kraft on 31.10.2017.
 */
var buttonCommon = {
    exportOptions: {
        //columns: ':not(:last-child)'
        columns: [ 0, ':visible' ]
    }
};

jQuery.fn.dataTable.ext.buttons.export_collection = {

    extend: 'collection',
    text: '<i class="fa fa-floppy-o" aria-hidden="true"></i>',
    titleAttr: function ( dt ) {
        return dt.i18n( 'buttons.Export', 'Export');
    },
    buttons: [
        $.extend( true, {}, buttonCommon, {
            extend: 'copy',
            className: 'dtExport exportCopy',
            text: 'Copy',
        }),
        $.extend( true, {}, buttonCommon, {
            extend: 'csv',
            className: 'dtExport exportCsv',
            text: 'CSV',
        }),
        $.extend( true, {}, buttonCommon, {
            extend: 'excel',
            className: 'dtExport exportExcel',
            text: 'Excel',
        }),
        $.extend( true, {}, buttonCommon, {
            extend: 'pdf',
            className: 'dtExport exportPdf',
            text: 'PDF',
        }),
        $.extend( true, {}, buttonCommon, {
            extend: 'print',
            className: 'dtExport exportPrint',
            text: 'Print',
        }),
    ],
};