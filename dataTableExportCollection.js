/**
 * Created by Kraft on 31.10.2017.
 */

let oldExportAction = function (self, e, dt, button, config) {

    let _dtButtons = $.fn.dataTable.ext.buttons;
    let btnName    = '';

    // Common option that will use the HTML5 or Flash export buttons

    if (button[0].className.indexOf('buttons-copy') >= 0) {
        btnName = _dtButtons.copy(dt, config);
    } else if (button[0].className.indexOf('buttons-csv') >= 0){
        btnName = _dtButtons.csv(dt, config);
    } else if (button[0].className.indexOf('buttons-excel') >= 0) {
        btnName = _dtButtons.excel(dt, config);
    } else if (button[0].className.indexOf('buttons-pdf') >= 0){
        btnName = _dtButtons.pdf(dt, config);
    }else if (button[0].className.indexOf('buttons-print') >= 0) {
        btnName = 'print';
    }

    if(btnName !== ''){
        _dtButtons[btnName].action.call(self, e, dt, button, config);
    }
};

let newExportAction = function (e, dt, button, config) {
    let self = this;
    let info = dt.page.info();

    if(info.serverSide === false){
        oldExportAction(self, e, dt, button, config);
        return;
    }

    let oldStart = dt.settings()[0]._iDisplayStart;

    dt.one('preXhr', function (e, s, data) {
        // Just this once, load all data from the server...
        data.start = 0;
        data.length = 2147483647;

        dt.one('preDraw', function (e, settings) {
            // Call the original action function
            oldExportAction(self, e, dt, button, config);

            dt.one('preXhr', function (e, s, data) {
                // DataTables thinks the first item displayed is index 0, but we're not drawing that.
                // Set the property to what it was before exporting.
                settings._iDisplayStart = oldStart;
                data.start = oldStart;
            });

            // Reload the grid with the original page. Otherwise, API functions like table.cell(this) don't work properly.
            setTimeout(dt.ajax.reload, 0);

            // Prevent rendering of the full data to the DOM
            return false;
        });
    });

    // Require the server with the new one-time export settings
    dt.ajax.reload();
};

let buttonCommon = {
    action: newExportAction,
    exportOptions: {
        //columns: ':not(:last-child)'
        //columns: ':not(.action_btns_container)'
        //columns: [ 0, ':visible' ]
        columns: [ 0, ':visible:not(.action_btns_container)' ]
    }
};

jQuery.fn.dataTable.ext.buttons.export_collection = {

    extend: 'collection',
    text: '<i class="far fa-save" aria-hidden="true"></i>',
    titleAttr: function ( dt ) {
        return dt.i18n( 'buttons.Export', 'Export');
    },
    buttons: [
        $.extend( true, {}, buttonCommon, {
            extend: 'copy',
            className: 'dtExport exportCopy',
        }),
        $.extend( true, {}, buttonCommon, {
            extend: 'csv',
            className: 'dtExport exportCsv',
        }),
        $.extend( true, {}, buttonCommon, {
            extend: 'excel',
            className: 'dtExport exportExcel',
        }),
        $.extend( true, {}, buttonCommon, {
            extend: 'pdf',
            className: 'dtExport exportPdf',
        }),
        $.extend( true, {}, buttonCommon, {
            extend: 'print',
            className: 'dtExport exportPrint',
        }),
    ],
};
