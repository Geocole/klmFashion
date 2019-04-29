/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 532);
/******/ })
/************************************************************************/
/******/ ({

/***/ 532:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(533);
__webpack_require__(534);
__webpack_require__(535);
__webpack_require__(536);
__webpack_require__(537);
__webpack_require__(538);
module.exports = __webpack_require__(539);


/***/ }),

/***/ 533:
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * version: 1.12.1
 * https://github.com/wenzhixin/bootstrap-table/
 */

(function ($) {
    'use strict';

    // TOOLS DEFINITION
    // ======================

    var bootstrapVersion = 3;
    try {
        bootstrapVersion = parseInt($.fn.dropdown.Constructor.VERSION, 10);
    } catch (e) {}
    var bs = {
        3: {
            buttonsClass: 'default',
            iconsPrefix: 'fas',
            icons: {
                paginationSwitchDown: 'fa-chevron-down',
                paginationSwitchUp: 'fa-chevron-up',
                refresh: 'fa-sync',
                toggleOff: 'glyphicon-list-alt fa-list-alt',
                toggleOn: 'glyphicon-list-alt fa-list-alt',
                columns: 'glyphicon-th fa-th',
                detailOpen: 'glyphicon-plus fa-plus',
                detailClose: 'glyphicon-minus fa-minus',
                fullscreen: 'fa-arrows_alt'
            },
            pullClass: 'pull',
            toobarDropdowHtml: ['<ul class="dropdown-menu" role="menu">', '</ul>'],
            toobarDropdowItemHtml: '<li role="menuitem"><label>%s</label></li>',
            pageDropdownHtml: ['<ul class="dropdown-menu" role="menu">', '</ul>'],
            pageDropdownItemHtml: '<li role="menuitem" class="%s"><a href="#">%s</a></li>'
        },
        4: {
            buttonsClass: 'secondary',
            iconsPrefix: 'fas',
            icons: {
                paginationSwitchDown: 'fa-chevron-down',
                paginationSwitchUp: 'fa-chevron-up',
                refresh: 'fa-sync-alt',
                toggleOff: 'fa-toggle-off',
                toggleOn: 'fa-toggle-on',
                columns: 'fa-th-list',
                detailOpen: 'fa-plus',
                detailClose: 'fa-minus',
                fullscreen: 'fa-arrows-alt'
            },
            pullClass: 'float',
            toobarDropdowHtml: ['<div class="dropdown-menu dropdown-menu-right">', '</div>'],
            toobarDropdowItemHtml: '<label class="dropdown-item">%s</label>',
            pageDropdownHtml: ['<div class="dropdown-menu">', '</div>'],
            pageDropdownItemHtml: '<a class="dropdown-item %s" href="#">%s</a>'
        }
    }[bootstrapVersion];

    var cachedWidth = null;

    // it only does '%s', and return '' when arguments are undefined
    var sprintf = function sprintf(str) {
        var args = arguments,
            flag = true,
            i = 1;

        str = str.replace(/%s/g, function () {
            var arg = args[i++];

            if (typeof arg === 'undefined') {
                flag = false;
                return '';
            }
            return arg;
        });
        return flag ? str : '';
    };

    var getPropertyFromOther = function getPropertyFromOther(list, from, to, value) {
        var result = '';
        $.each(list, function (i, item) {
            if (item[from] === value) {
                result = item[to];
                return false;
            }
            return true;
        });
        return result;
    };

    // http://jsfiddle.net/wenyi/47nz7ez9/3/
    var setFieldIndex = function setFieldIndex(columns) {
        var i,
            j,
            k,
            totalCol = 0,
            flag = [];

        for (i = 0; i < columns[0].length; i++) {
            totalCol += columns[0][i].colspan || 1;
        }

        for (i = 0; i < columns.length; i++) {
            flag[i] = [];
            for (j = 0; j < totalCol; j++) {
                flag[i][j] = false;
            }
        }

        for (i = 0; i < columns.length; i++) {
            for (j = 0; j < columns[i].length; j++) {
                var r = columns[i][j],
                    rowspan = r.rowspan || 1,
                    colspan = r.colspan || 1,
                    index = $.inArray(false, flag[i]);

                if (colspan === 1) {
                    r.fieldIndex = index;
                    // when field is undefined, use index instead
                    if (typeof r.field === 'undefined') {
                        r.field = index;
                    }
                }

                for (k = 0; k < rowspan; k++) {
                    flag[i + k][index] = true;
                }
                for (k = 0; k < colspan; k++) {
                    flag[i][index + k] = true;
                }
            }
        }
    };

    var getScrollBarWidth = function getScrollBarWidth() {
        if (cachedWidth === null) {
            var inner = $('<p/>').addClass('fixed-table-scroll-inner'),
                outer = $('<div/>').addClass('fixed-table-scroll-outer'),
                w1,
                w2;

            outer.append(inner);
            $('body').append(outer);

            w1 = inner[0].offsetWidth;
            outer.css('overflow', 'scroll');
            w2 = inner[0].offsetWidth;

            if (w1 === w2) {
                w2 = outer[0].clientWidth;
            }

            outer.remove();
            cachedWidth = w1 - w2;
        }
        return cachedWidth;
    };

    var calculateObjectValue = function calculateObjectValue(self, name, args, defaultValue) {
        var func = name;

        if (typeof name === 'string') {
            // support obj.func1.func2
            var names = name.split('.');

            if (names.length > 1) {
                func = window;
                $.each(names, function (i, f) {
                    func = func[f];
                });
            } else {
                func = window[name];
            }
        }
        if ((typeof func === 'undefined' ? 'undefined' : _typeof(func)) === 'object') {
            return func;
        }
        if (typeof func === 'function') {
            return func.apply(self, args || []);
        }
        if (!func && typeof name === 'string' && sprintf.apply(this, [name].concat(args))) {
            return sprintf.apply(this, [name].concat(args));
        }
        return defaultValue;
    };

    var compareObjects = function compareObjects(objectA, objectB, compareLength) {
        // Create arrays of property names
        var getOwnPropertyNames = Object.getOwnPropertyNames || function (obj) {
            var arr = [];
            for (var k in obj) {
                if (obj.hasOwnProperty(k)) {
                    arr.push(k);
                }
            }
            return arr;
        };
        var objectAProperties = getOwnPropertyNames(objectA),
            objectBProperties = getOwnPropertyNames(objectB),
            propName = '';

        if (compareLength) {
            // If number of properties is different, objects are not equivalent
            if (objectAProperties.length !== objectBProperties.length) {
                return false;
            }
        }

        for (var i = 0; i < objectAProperties.length; i++) {
            propName = objectAProperties[i];

            // If the property is not in the object B properties, continue with the next property
            if ($.inArray(propName, objectBProperties) > -1) {
                // If values of same property are not equal, objects are not equivalent
                if (objectA[propName] !== objectB[propName]) {
                    return false;
                }
            }
        }

        // If we made it this far, objects are considered equivalent
        return true;
    };

    var escapeHTML = function escapeHTML(text) {
        if (typeof text === 'string') {
            return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;').replace(/`/g, '&#x60;');
        }
        return text;
    };

    var getRealDataAttr = function getRealDataAttr(dataAttr) {
        for (var attr in dataAttr) {
            var auxAttr = attr.split(/(?=[A-Z])/).join('-').toLowerCase();
            if (auxAttr !== attr) {
                dataAttr[auxAttr] = dataAttr[attr];
                delete dataAttr[attr];
            }
        }

        return dataAttr;
    };

    var getItemField = function getItemField(item, field, escape) {
        var value = item;

        if (typeof field !== 'string' || item.hasOwnProperty(field)) {
            return escape ? escapeHTML(item[field]) : item[field];
        }
        var props = field.split('.');
        for (var p in props) {
            if (props.hasOwnProperty(p)) {
                value = value && value[props[p]];
            }
        }
        return escape ? escapeHTML(value) : value;
    };

    var isIEBrowser = function isIEBrowser() {
        return !!(navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./));
    };

    var objectKeys = function objectKeys() {
        // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
        if (!Object.keys) {
            Object.keys = function () {
                var hasOwnProperty = Object.prototype.hasOwnProperty,
                    hasDontEnumBug = !{ toString: null }.propertyIsEnumerable('toString'),
                    dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
                    dontEnumsLength = dontEnums.length;

                return function (obj) {
                    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' && (typeof obj !== 'function' || obj === null)) {
                        throw new TypeError('Object.keys called on non-object');
                    }

                    var result = [],
                        prop,
                        i;

                    for (prop in obj) {
                        if (hasOwnProperty.call(obj, prop)) {
                            result.push(prop);
                        }
                    }

                    if (hasDontEnumBug) {
                        for (i = 0; i < dontEnumsLength; i++) {
                            if (hasOwnProperty.call(obj, dontEnums[i])) {
                                result.push(dontEnums[i]);
                            }
                        }
                    }
                    return result;
                };
            }();
        }
    };

    // BOOTSTRAP TABLE CLASS DEFINITION
    // ======================

    var BootstrapTable = function BootstrapTable(el, options) {
        this.options = options;
        this.$el = $(el);
        this.$el_ = this.$el.clone();
        this.timeoutId_ = 0;
        this.timeoutFooter_ = 0;

        this.init();
    };

    BootstrapTable.DEFAULTS = {
        classes: 'table table-hover',
        sortClass: undefined,
        locale: undefined,
        height: undefined,
        undefinedText: '-',
        sortName: undefined,
        sortOrder: 'asc',
        sortStable: false,
        rememberOrder: false,
        striped: false,
        columns: [[]],
        data: [],
        totalField: 'total',
        dataField: 'rows',
        method: 'get',
        url: undefined,
        ajax: undefined,
        cache: true,
        contentType: 'application/json',
        dataType: 'json',
        ajaxOptions: {},
        queryParams: function queryParams(params) {
            return params;
        },
        queryParamsType: 'limit', // undefined
        responseHandler: function responseHandler(res) {
            return res;
        },
        pagination: false,
        onlyInfoPagination: false,
        paginationLoop: true,
        sidePagination: 'client', // client or server
        totalRows: 0, // server side need to set
        pageNumber: 1,
        pageSize: 10,
        pageList: [10, 25, 50, 100],
        paginationHAlign: 'right', //right, left
        paginationVAlign: 'bottom', //bottom, top, both
        paginationDetailHAlign: 'left', //right, left
        paginationPreText: '&lsaquo;',
        paginationNextText: '&rsaquo;',
        search: false,
        searchOnEnterKey: false,
        strictSearch: false,
        searchAlign: 'right',
        selectItemName: 'btSelectItem',
        showHeader: true,
        showFooter: false,
        showColumns: false,
        showPaginationSwitch: false,
        showRefresh: false,
        showToggle: false,
        showFullscreen: false,
        smartDisplay: true,
        escape: false,
        minimumCountColumns: 1,
        idField: undefined,
        uniqueId: undefined,
        cardView: false,
        detailView: false,
        detailFormatter: function detailFormatter(index, row) {
            return '';
        },
        detailFilter: function detailFilter(index, row) {
            return true;
        },
        trimOnSearch: true,
        clickToSelect: false,
        singleSelect: false,
        toolbar: undefined,
        toolbarAlign: 'left',
        buttonsToolbar: undefined,
        buttonsAlign: 'right',
        checkboxHeader: true,
        sortable: true,
        silentSort: true,
        maintainSelected: false,
        searchTimeOut: 500,
        searchText: '',
        iconSize: undefined,
        buttonsClass: bs.buttonsClass,
        iconsPrefix: bs.iconsPrefix, // glyphicon or fa (font awesome)
        icons: bs.icons,

        customSearch: $.noop,

        customSort: $.noop,

        ignoreClickToSelectOn: function ignoreClickToSelectOn(element) {
            return $.inArray(element.tagName, ['A', 'BUTTON']);
        },

        rowStyle: function rowStyle(row, index) {
            return {};
        },

        rowAttributes: function rowAttributes(row, index) {
            return {};
        },

        footerStyle: function footerStyle(row, index) {
            return {};
        },

        onAll: function onAll(name, args) {
            return false;
        },
        onClickCell: function onClickCell(field, value, row, $element) {
            return false;
        },
        onDblClickCell: function onDblClickCell(field, value, row, $element) {
            return false;
        },
        onClickRow: function onClickRow(item, $element) {
            return false;
        },
        onDblClickRow: function onDblClickRow(item, $element) {
            return false;
        },
        onSort: function onSort(name, order) {
            return false;
        },
        onCheck: function onCheck(row) {
            return false;
        },
        onUncheck: function onUncheck(row) {
            return false;
        },
        onCheckAll: function onCheckAll(rows) {
            return false;
        },
        onUncheckAll: function onUncheckAll(rows) {
            return false;
        },
        onCheckSome: function onCheckSome(rows) {
            return false;
        },
        onUncheckSome: function onUncheckSome(rows) {
            return false;
        },
        onLoadSuccess: function onLoadSuccess(data) {
            return false;
        },
        onLoadError: function onLoadError(status) {
            return false;
        },
        onColumnSwitch: function onColumnSwitch(field, checked) {
            return false;
        },
        onPageChange: function onPageChange(number, size) {
            return false;
        },
        onSearch: function onSearch(text) {
            return false;
        },
        onToggle: function onToggle(cardView) {
            return false;
        },
        onPreBody: function onPreBody(data) {
            return false;
        },
        onPostBody: function onPostBody() {
            return false;
        },
        onPostHeader: function onPostHeader() {
            return false;
        },
        onExpandRow: function onExpandRow(index, row, $detail) {
            return false;
        },
        onCollapseRow: function onCollapseRow(index, row) {
            return false;
        },
        onRefreshOptions: function onRefreshOptions(options) {
            return false;
        },
        onRefresh: function onRefresh(params) {
            return false;
        },
        onResetView: function onResetView() {
            return false;
        },
        onScrollBody: function onScrollBody() {
            return false;
        }
    };

    BootstrapTable.LOCALES = {};

    BootstrapTable.LOCALES['en-US'] = BootstrapTable.LOCALES.en = {
        formatLoadingMessage: function formatLoadingMessage() {
            return 'Loading, please wait...';
        },
        formatRecordsPerPage: function formatRecordsPerPage(pageNumber) {
            return sprintf('%s rows per page', pageNumber);
        },
        formatShowingRows: function formatShowingRows(pageFrom, pageTo, totalRows) {
            return sprintf('Showing %s to %s of %s rows', pageFrom, pageTo, totalRows);
        },
        formatDetailPagination: function formatDetailPagination(totalRows) {
            return sprintf('Showing %s rows', totalRows);
        },
        formatSearch: function formatSearch() {
            return 'Search';
        },
        formatNoMatches: function formatNoMatches() {
            return 'No matching records found';
        },
        formatPaginationSwitch: function formatPaginationSwitch() {
            return 'Hide/Show pagination';
        },
        formatRefresh: function formatRefresh() {
            return 'Refresh';
        },
        formatToggle: function formatToggle() {
            return 'Toggle';
        },
        formatFullscreen: function formatFullscreen() {
            return 'Fullscreen';
        },
        formatColumns: function formatColumns() {
            return 'Columns';
        },
        formatAllRows: function formatAllRows() {
            return 'All';
        }
    };

    $.extend(BootstrapTable.DEFAULTS, BootstrapTable.LOCALES['en-US']);

    BootstrapTable.COLUMN_DEFAULTS = {
        radio: false,
        checkbox: false,
        checkboxEnabled: true,
        field: undefined,
        title: undefined,
        titleTooltip: undefined,
        'class': undefined,
        align: undefined, // left, right, center
        halign: undefined, // left, right, center
        falign: undefined, // left, right, center
        valign: undefined, // top, middle, bottom
        width: undefined,
        sortable: false,
        order: 'asc', // asc, desc
        visible: true,
        switchable: true,
        clickToSelect: true,
        formatter: undefined,
        footerFormatter: undefined,
        events: undefined,
        sorter: undefined,
        sortName: undefined,
        cellStyle: undefined,
        searchable: true,
        searchFormatter: true,
        cardVisible: true,
        escape: false,
        showSelectTitle: false
    };

    BootstrapTable.EVENTS = {
        'all.bs.table': 'onAll',
        'click-cell.bs.table': 'onClickCell',
        'dbl-click-cell.bs.table': 'onDblClickCell',
        'click-row.bs.table': 'onClickRow',
        'dbl-click-row.bs.table': 'onDblClickRow',
        'sort.bs.table': 'onSort',
        'check.bs.table': 'onCheck',
        'uncheck.bs.table': 'onUncheck',
        'check-all.bs.table': 'onCheckAll',
        'uncheck-all.bs.table': 'onUncheckAll',
        'check-some.bs.table': 'onCheckSome',
        'uncheck-some.bs.table': 'onUncheckSome',
        'load-success.bs.table': 'onLoadSuccess',
        'load-error.bs.table': 'onLoadError',
        'column-switch.bs.table': 'onColumnSwitch',
        'page-change.bs.table': 'onPageChange',
        'search.bs.table': 'onSearch',
        'toggle.bs.table': 'onToggle',
        'pre-body.bs.table': 'onPreBody',
        'post-body.bs.table': 'onPostBody',
        'post-header.bs.table': 'onPostHeader',
        'expand-row.bs.table': 'onExpandRow',
        'collapse-row.bs.table': 'onCollapseRow',
        'refresh-options.bs.table': 'onRefreshOptions',
        'reset-view.bs.table': 'onResetView',
        'refresh.bs.table': 'onRefresh',
        'scroll-body.bs.table': 'onScrollBody'
    };

    BootstrapTable.prototype.init = function () {
        this.initLocale();
        this.initContainer();
        this.initTable();
        this.initHeader();
        this.initData();
        this.initHiddenRows();
        this.initFooter();
        this.initToolbar();
        this.initPagination();
        this.initBody();
        this.initSearchText();
        this.initServer();
    };

    BootstrapTable.prototype.initLocale = function () {
        if (this.options.locale) {
            var parts = this.options.locale.split(/-|_/);
            parts[0].toLowerCase();
            if (parts[1]) {
                parts[1].toUpperCase();
            }
            if ($.fn.bootstrapTable.locales[this.options.locale]) {
                // locale as requested
                $.extend(this.options, $.fn.bootstrapTable.locales[this.options.locale]);
            } else if ($.fn.bootstrapTable.locales[parts.join('-')]) {
                // locale with sep set to - (in case original was specified with _)
                $.extend(this.options, $.fn.bootstrapTable.locales[parts.join('-')]);
            } else if ($.fn.bootstrapTable.locales[parts[0]]) {
                // short locale language code (i.e. 'en')
                $.extend(this.options, $.fn.bootstrapTable.locales[parts[0]]);
            }
        }
    };

    BootstrapTable.prototype.initContainer = function () {
        this.$container = $(['<div class="bootstrap-table">', '<div class="fixed-table-toolbar"></div>', this.options.paginationVAlign === 'top' || this.options.paginationVAlign === 'both' ? '<div class="fixed-table-pagination" style="clear: both;"></div>' : '', '<div class="fixed-table-container">', '<div class="fixed-table-header"><table></table></div>', '<div class="fixed-table-body">', '<div class="fixed-table-loading">', this.options.formatLoadingMessage(), '</div>', '</div>', '<div class="fixed-table-footer"><table><tr></tr></table></div>', '</div>', this.options.paginationVAlign === 'bottom' || this.options.paginationVAlign === 'both' ? '<div class="fixed-table-pagination"></div>' : '', '</div>'].join(''));

        this.$container.insertAfter(this.$el);
        this.$tableContainer = this.$container.find('.fixed-table-container');
        this.$tableHeader = this.$container.find('.fixed-table-header');
        this.$tableBody = this.$container.find('.fixed-table-body');
        this.$tableLoading = this.$container.find('.fixed-table-loading');
        this.$tableFooter = this.$container.find('.fixed-table-footer');
        // checking if custom table-toolbar exists or not
        if (this.options.buttonsToolbar) {
            this.$toolbar = $('body').find(this.options.buttonsToolbar);
        } else {
            this.$toolbar = this.$container.find('.fixed-table-toolbar');
        }
        this.$pagination = this.$container.find('.fixed-table-pagination');

        this.$tableBody.append(this.$el);
        this.$container.after('<div class="clearfix"></div>');

        this.$el.addClass(this.options.classes);
        if (this.options.striped) {
            this.$el.addClass('table-striped');
        }
        if ($.inArray('table-no-bordered', this.options.classes.split(' ')) !== -1) {
            this.$tableContainer.addClass('table-no-bordered');
        }
    };

    BootstrapTable.prototype.initTable = function () {
        var that = this,
            columns = [],
            data = [];

        this.$header = this.$el.find('>thead');
        if (!this.$header.length) {
            this.$header = $('<thead></thead>').appendTo(this.$el);
        }
        this.$header.find('tr').each(function () {
            var column = [];

            $(this).find('th').each(function () {
                // Fix #2014 - getFieldIndex and elsewhere assume this is string, causes issues if not
                if (typeof $(this).data('field') !== 'undefined') {
                    $(this).data('field', $(this).data('field') + '');
                }
                column.push($.extend({}, {
                    title: $(this).html(),
                    'class': $(this).attr('class'),
                    titleTooltip: $(this).attr('title'),
                    rowspan: $(this).attr('rowspan') ? +$(this).attr('rowspan') : undefined,
                    colspan: $(this).attr('colspan') ? +$(this).attr('colspan') : undefined
                }, $(this).data()));
            });
            columns.push(column);
        });
        if (!$.isArray(this.options.columns[0])) {
            this.options.columns = [this.options.columns];
        }
        this.options.columns = $.extend(true, [], columns, this.options.columns);
        this.columns = [];
        this.fieldsColumnsIndex = [];

        setFieldIndex(this.options.columns);
        $.each(this.options.columns, function (i, columns) {
            $.each(columns, function (j, column) {
                column = $.extend({}, BootstrapTable.COLUMN_DEFAULTS, column);

                if (typeof column.fieldIndex !== 'undefined') {
                    that.columns[column.fieldIndex] = column;
                    that.fieldsColumnsIndex[column.field] = column.fieldIndex;
                }

                that.options.columns[i][j] = column;
            });
        });

        // if options.data is setting, do not process tbody data
        if (this.options.data.length) {
            return;
        }

        var m = [];
        this.$el.find('>tbody>tr').each(function (y) {
            var row = {};

            // save tr's id, class and data-* attributes
            row._id = $(this).attr('id');
            row._class = $(this).attr('class');
            row._data = getRealDataAttr($(this).data());

            $(this).find('>td').each(function (x) {
                var $this = $(this),
                    cspan = +$this.attr('colspan') || 1,
                    rspan = +$this.attr('rowspan') || 1,
                    tx,
                    ty;

                // skip already occupied cells in current row
                for (; m[y] && m[y][x]; x++) {}

                for (tx = x; tx < x + cspan; tx++) {
                    //mark matrix elements occupied by current cell with true
                    for (ty = y; ty < y + rspan; ty++) {
                        if (!m[ty]) {
                            //fill missing rows
                            m[ty] = [];
                        }
                        m[ty][tx] = true;
                    }
                }

                var field = that.columns[x].field;

                row[field] = $(this).html();
                // save td's id, class and data-* attributes
                row['_' + field + '_id'] = $(this).attr('id');
                row['_' + field + '_class'] = $(this).attr('class');
                row['_' + field + '_rowspan'] = $(this).attr('rowspan');
                row['_' + field + '_colspan'] = $(this).attr('colspan');
                row['_' + field + '_title'] = $(this).attr('title');
                row['_' + field + '_data'] = getRealDataAttr($(this).data());
            });
            data.push(row);
        });
        this.options.data = data;
        if (data.length) this.fromHtml = true;
    };

    BootstrapTable.prototype.initHeader = function () {
        var that = this,
            visibleColumns = {},
            html = [];

        this.header = {
            fields: [],
            styles: [],
            classes: [],
            formatters: [],
            events: [],
            sorters: [],
            sortNames: [],
            cellStyles: [],
            searchables: []
        };

        $.each(this.options.columns, function (i, columns) {
            html.push('<tr>');

            if (i === 0 && !that.options.cardView && that.options.detailView) {
                html.push(sprintf('<th class="detail" rowspan="%s"><div class="fht-cell"></div></th>', that.options.columns.length));
            }

            $.each(columns, function (j, column) {
                var text = '',
                    halign = '',
                    // header align style
                align = '',
                    // body align style
                style = '',
                    class_ = sprintf(' class="%s"', column['class']),
                    order = that.options.sortOrder || column.order,
                    unitWidth = 'px',
                    width = column.width;

                if (column.width !== undefined && !that.options.cardView) {
                    if (typeof column.width === 'string') {
                        if (column.width.indexOf('%') !== -1) {
                            unitWidth = '%';
                        }
                    }
                }
                if (column.width && typeof column.width === 'string') {
                    width = column.width.replace('%', '').replace('px', '');
                }

                halign = sprintf('text-align: %s; ', column.halign ? column.halign : column.align);
                align = sprintf('text-align: %s; ', column.align);
                style = sprintf('vertical-align: %s; ', column.valign);
                style += sprintf('width: %s; ', (column.checkbox || column.radio) && !width ? !column.showSelectTitle ? '36px' : undefined : width ? width + unitWidth : undefined);

                if (typeof column.fieldIndex !== 'undefined') {
                    that.header.fields[column.fieldIndex] = column.field;
                    that.header.styles[column.fieldIndex] = align + style;
                    that.header.classes[column.fieldIndex] = class_;
                    that.header.formatters[column.fieldIndex] = column.formatter;
                    that.header.events[column.fieldIndex] = column.events;
                    that.header.sorters[column.fieldIndex] = column.sorter;
                    that.header.sortNames[column.fieldIndex] = column.sortName;
                    that.header.cellStyles[column.fieldIndex] = column.cellStyle;
                    that.header.searchables[column.fieldIndex] = column.searchable;

                    if (!column.visible) {
                        return;
                    }

                    if (that.options.cardView && !column.cardVisible) {
                        return;
                    }

                    visibleColumns[column.field] = column;
                }

                html.push('<th' + sprintf(' title="%s"', column.titleTooltip), column.checkbox || column.radio ? sprintf(' class="bs-checkbox %s"', column['class'] || '') : class_, sprintf(' style="%s"', halign + style), sprintf(' rowspan="%s"', column.rowspan), sprintf(' colspan="%s"', column.colspan), sprintf(' data-field="%s"', column.field), j === 0 && column.fieldIndex ? ' data-not-first-th' : '', '>');

                html.push(sprintf('<div class="th-inner %s">', that.options.sortable && column.sortable ? 'sortable both' : ''));

                text = that.options.escape ? escapeHTML(column.title) : column.title;

                var title = text;
                if (column.checkbox) {
                    text = '';
                    if (!that.options.singleSelect && that.options.checkboxHeader) {
                        text = '<input name="btSelectAll" type="checkbox" />';
                    }
                    that.header.stateField = column.field;
                }
                if (column.radio) {
                    text = '';
                    that.header.stateField = column.field;
                    that.options.singleSelect = true;
                }
                if (!text && column.showSelectTitle) {
                    text += title;
                }

                html.push(text);
                html.push('</div>');
                html.push('<div class="fht-cell"></div>');
                html.push('</div>');
                html.push('</th>');
            });
            html.push('</tr>');
        });

        this.$header.html(html.join(''));
        this.$header.find('th[data-field]').each(function (i) {
            $(this).data(visibleColumns[$(this).data('field')]);
        });
        this.$container.off('click', '.th-inner').on('click', '.th-inner', function (event) {
            var $this = $(this);

            if (that.options.detailView && !$this.parent().hasClass('bs-checkbox')) {
                if ($this.closest('.bootstrap-table')[0] !== that.$container[0]) {
                    return false;
                }
            }

            if (that.options.sortable && $this.parent().data().sortable) {
                that.onSort(event);
            }
        });

        this.$header.children().children().off('keypress').on('keypress', function (event) {
            if (that.options.sortable && $(this).data().sortable) {
                var code = event.keyCode || event.which;
                if (code == 13) {
                    //Enter keycode
                    that.onSort(event);
                }
            }
        });

        $(window).off('resize.bootstrap-table');
        if (!this.options.showHeader || this.options.cardView) {
            this.$header.hide();
            this.$tableHeader.hide();
            this.$tableLoading.css('top', 0);
        } else {
            this.$header.show();
            this.$tableHeader.show();
            this.$tableLoading.css('top', this.$header.outerHeight() + 1);
            // Assign the correct sortable arrow
            this.getCaret();
            $(window).on('resize.bootstrap-table', $.proxy(this.resetWidth, this));
        }

        this.$selectAll = this.$header.find('[name="btSelectAll"]');
        this.$selectAll.off('click').on('click', function () {
            var checked = $(this).prop('checked');
            that[checked ? 'checkAll' : 'uncheckAll']();
            that.updateSelected();
        });
    };

    BootstrapTable.prototype.initFooter = function () {
        if (!this.options.showFooter || this.options.cardView) {
            this.$tableFooter.hide();
        } else {
            this.$tableFooter.show();
        }
    };

    /**
     * @param data
     * @param type: append / prepend
     */
    BootstrapTable.prototype.initData = function (data, type) {
        if (type === 'append') {
            this.options.data = this.options.data.concat(data);
        } else if (type === 'prepend') {
            this.options.data = [].concat(data).concat(this.options.data);
        } else {
            this.options.data = data || this.options.data;
        }

        this.data = this.options.data;

        if (this.options.sidePagination === 'server') {
            return;
        }
        this.initSort();
    };

    BootstrapTable.prototype.initSort = function () {
        var that = this,
            name = this.options.sortName,
            order = this.options.sortOrder === 'desc' ? -1 : 1,
            index = $.inArray(this.options.sortName, this.header.fields),
            timeoutId = 0;

        if (this.options.customSort !== $.noop) {
            this.options.customSort.apply(this, [this.options.sortName, this.options.sortOrder]);
            return;
        }

        if (index !== -1) {
            if (this.options.sortStable) {
                $.each(this.data, function (i, row) {
                    row._position = i;
                });
            }

            this.data.sort(function (a, b) {
                if (that.header.sortNames[index]) {
                    name = that.header.sortNames[index];
                }
                var aa = getItemField(a, name, that.options.escape),
                    bb = getItemField(b, name, that.options.escape),
                    value = calculateObjectValue(that.header, that.header.sorters[index], [aa, bb, a, b]);

                if (value !== undefined) {
                    if (that.options.sortStable && value === 0) {
                        return a._position - b._position;
                    }
                    return order * value;
                }

                // Fix #161: undefined or null string sort bug.
                if (aa === undefined || aa === null) {
                    aa = '';
                }
                if (bb === undefined || bb === null) {
                    bb = '';
                }

                if (that.options.sortStable && aa === bb) {
                    aa = a._position;
                    bb = b._position;
                    return a._position - b._position;
                }

                // IF both values are numeric, do a numeric comparison
                if ($.isNumeric(aa) && $.isNumeric(bb)) {
                    // Convert numerical values form string to float.
                    aa = parseFloat(aa);
                    bb = parseFloat(bb);
                    if (aa < bb) {
                        return order * -1;
                    }
                    return order;
                }

                if (aa === bb) {
                    return 0;
                }

                // If value is not a string, convert to string
                if (typeof aa !== 'string') {
                    aa = aa.toString();
                }

                if (aa.localeCompare(bb) === -1) {
                    return order * -1;
                }

                return order;
            });

            if (this.options.sortClass !== undefined) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(function () {
                    that.$el.removeClass(that.options.sortClass);
                    var index = that.$header.find(sprintf('[data-field="%s"]', that.options.sortName).index() + 1);
                    that.$el.find(sprintf('tr td:nth-child(%s)', index)).addClass(that.options.sortClass);
                }, 250);
            }
        }
    };

    BootstrapTable.prototype.onSort = function (event) {
        var $this = event.type === "keypress" ? $(event.currentTarget) : $(event.currentTarget).parent(),
            $this_ = this.$header.find('th').eq($this.index());

        this.$header.add(this.$header_).find('span.order').remove();

        if (this.options.sortName === $this.data('field')) {
            this.options.sortOrder = this.options.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            this.options.sortName = $this.data('field');
            if (this.options.rememberOrder) {
                this.options.sortOrder = $this.data('order') === 'asc' ? 'desc' : 'asc';
            } else {
                this.options.sortOrder = this.columns[this.fieldsColumnsIndex[$this.data('field')]].order;
            }
        }
        this.trigger('sort', this.options.sortName, this.options.sortOrder);

        $this.add($this_).data('order', this.options.sortOrder);

        // Assign the correct sortable arrow
        this.getCaret();

        if (this.options.sidePagination === 'server') {
            this.initServer(this.options.silentSort);
            return;
        }

        this.initSort();
        this.initBody();
    };

    BootstrapTable.prototype.initToolbar = function () {
        var that = this,
            html = [],
            timeoutId = 0,
            $keepOpen,
            $search,
            switchableCount = 0;

        if (this.$toolbar.find('.bs-bars').children().length) {
            $('body').append($(this.options.toolbar));
        }
        this.$toolbar.html('');

        if (typeof this.options.toolbar === 'string' || _typeof(this.options.toolbar) === 'object') {
            $(sprintf('<div class="bs-bars %s-%s"></div>', bs.pullClass, this.options.toolbarAlign)).appendTo(this.$toolbar).append($(this.options.toolbar));
        }

        // showColumns, showToggle, showRefresh
        html = [sprintf('<div class="columns columns-%s btn-group %s-%s">', this.options.buttonsAlign, bs.pullClass, this.options.buttonsAlign)];

        if (typeof this.options.icons === 'string') {
            this.options.icons = calculateObjectValue(null, this.options.icons);
        }

        if (this.options.showPaginationSwitch) {
            html.push(sprintf('<button class="btn' + sprintf(' btn-%s', this.options.buttonsClass) + sprintf(' btn-%s', this.options.iconSize) + '" type="button" name="paginationSwitch" aria-label="pagination Switch" title="%s">', this.options.formatPaginationSwitch()), sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.paginationSwitchDown), '</button>');
        }

        if (this.options.showFullscreen) {
            this.$toolbar.find('button[name="fullscreen"]').off('click').on('click', $.proxy(this.toggleFullscreen, this));
        }

        if (this.options.showRefresh) {
            html.push(sprintf('<button class="btn' + sprintf(' btn-%s', this.options.buttonsClass) + sprintf(' btn-%s', this.options.iconSize) + '" type="button" name="refresh" aria-label="refresh" title="%s">', this.options.formatRefresh()), sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.refresh), '</button>');
        }

        if (this.options.showToggle) {
            html.push(sprintf('<button class="btn' + sprintf(' btn-%s', this.options.buttonsClass) + sprintf(' btn-%s', this.options.iconSize) + '" type="button" name="toggle" aria-label="toggle" title="%s">', this.options.formatToggle()), sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.toggle), '</button>');
        }

        if (this.options.showFullscreen) {
            html.push(sprintf('<button class="btn' + sprintf(' btn-%s', this.options.buttonsClass) + sprintf(' btn-%s', this.options.iconSize) + '" type="button" name="fullscreen" aria-label="fullscreen" title="%s">', this.options.formatFullscreen()), sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.fullscreen), '</button>');
        }

        if (this.options.showColumns) {
            html.push(sprintf('<div class="keep-open btn-group" title="%s">', this.options.formatColumns()), '<button type="button" aria-label="columns" class="btn' + sprintf(' btn-%s', this.options.buttonsClass) + sprintf(' btn-%s', this.options.iconSize) + ' dropdown-toggle" data-toggle="dropdown">', sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.columns), ' <span class="caret"></span>', '</button>', bs.toobarDropdowHtml[0]);

            $.each(this.columns, function (i, column) {
                if (column.radio || column.checkbox) {
                    return;
                }

                if (that.options.cardView && !column.cardVisible) {
                    return;
                }

                var checked = column.visible ? ' checked="checked"' : '';

                if (column.switchable) {
                    html.push(sprintf(bs.toobarDropdowItemHtml, sprintf('<input type="checkbox" data-field="%s" value="%s"%s> %s', column.field, i, checked, column.title)));
                    switchableCount++;
                }
            });
            html.push(bs.toobarDropdowHtml[1], '</div>');
        }

        html.push('</div>');

        // Fix #188: this.showToolbar is for extensions
        if (this.showToolbar || html.length > 2) {
            this.$toolbar.append(html.join(''));
        }

        if (this.options.showPaginationSwitch) {
            this.$toolbar.find('button[name="paginationSwitch"]').off('click').on('click', $.proxy(this.togglePagination, this));
        }

        if (this.options.showRefresh) {
            this.$toolbar.find('button[name="refresh"]').off('click').on('click', $.proxy(this.refresh, this));
        }

        if (this.options.showToggle) {
            this.$toolbar.find('button[name="toggle"]').off('click').on('click', function () {
                that.toggleView();
            });
        }

        if (this.options.showColumns) {
            $keepOpen = this.$toolbar.find('.keep-open');

            if (switchableCount <= this.options.minimumCountColumns) {
                $keepOpen.find('input').prop('disabled', true);
            }

            $keepOpen.find('li').off('click').on('click', function (event) {
                event.stopImmediatePropagation();
            });
            $keepOpen.find('input').off('click').on('click', function () {
                var $this = $(this);

                that.toggleColumn($(this).val(), $this.prop('checked'), false);
                that.trigger('column-switch', $(this).data('field'), $this.prop('checked'));
            });
        }

        if (this.options.search) {
            html = [];
            html.push(sprintf('<div class="%s-%s search">', bs.pullClass, this.options.searchAlign), sprintf('<input class="form-control' + sprintf(' input-%s', this.options.iconSize) + '" type="text" placeholder="%s">', this.options.formatSearch()), '</div>');

            this.$toolbar.append(html.join(''));
            $search = this.$toolbar.find('.search input');
            $search.off('keyup drop blur').on('keyup drop blur', function (event) {
                if (that.options.searchOnEnterKey && event.keyCode !== 13) {
                    return;
                }

                if ($.inArray(event.keyCode, [37, 38, 39, 40]) > -1) {
                    return;
                }

                clearTimeout(timeoutId); // doesn't matter if it's 0
                timeoutId = setTimeout(function () {
                    that.onSearch(event);
                }, that.options.searchTimeOut);
            });

            if (isIEBrowser()) {
                $search.off('mouseup').on('mouseup', function (event) {
                    clearTimeout(timeoutId); // doesn't matter if it's 0
                    timeoutId = setTimeout(function () {
                        that.onSearch(event);
                    }, that.options.searchTimeOut);
                });
            }
        }
    };

    BootstrapTable.prototype.onSearch = function (event) {
        var text = $.trim($(event.currentTarget).val());

        // trim search input
        if (this.options.trimOnSearch && $(event.currentTarget).val() !== text) {
            $(event.currentTarget).val(text);
        }

        if (text === this.searchText) {
            return;
        }
        this.searchText = text;
        this.options.searchText = text;

        this.options.pageNumber = 1;
        this.initSearch();
        if (event.firedByInitSearchText) {
            if (this.options.sidePagination === 'client') {
                this.updatePagination();
            }
        } else {
            this.updatePagination();
        }
        this.trigger('search', text);
    };

    BootstrapTable.prototype.initSearch = function () {
        var that = this;

        if (this.options.sidePagination !== 'server') {
            if (this.options.customSearch !== $.noop) {
                window[this.options.customSearch].apply(this, [this.searchText]);
                return;
            }

            var s = this.searchText && (this.options.escape ? escapeHTML(this.searchText) : this.searchText).toLowerCase();
            var f = $.isEmptyObject(this.filterColumns) ? null : this.filterColumns;

            // Check filter
            this.data = f ? $.grep(this.options.data, function (item, i) {
                for (var key in f) {
                    if ($.isArray(f[key]) && $.inArray(item[key], f[key]) === -1 || !$.isArray(f[key]) && item[key] !== f[key]) {
                        return false;
                    }
                }
                return true;
            }) : this.options.data;

            this.data = s ? $.grep(this.data, function (item, i) {
                for (var j = 0; j < that.header.fields.length; j++) {

                    if (!that.header.searchables[j]) {
                        continue;
                    }

                    var key = $.isNumeric(that.header.fields[j]) ? parseInt(that.header.fields[j], 10) : that.header.fields[j];
                    var column = that.columns[that.fieldsColumnsIndex[key]];
                    var value;

                    if (typeof key === 'string') {
                        value = item;
                        var props = key.split('.');
                        for (var prop_index = 0; prop_index < props.length; prop_index++) {
                            if (value[props[prop_index]] != null) {
                                value = value[props[prop_index]];
                            }
                        }

                        // Fix #142: respect searchForamtter boolean
                        if (column && column.searchFormatter) {
                            value = calculateObjectValue(column, that.header.formatters[j], [value, item, i], value);
                        }
                    } else {
                        value = item[key];
                    }

                    if (typeof value === 'string' || typeof value === 'number') {
                        if (that.options.strictSearch) {
                            if ((value + '').toLowerCase() === s) {
                                return true;
                            }
                        } else {
                            if ((value + '').toLowerCase().indexOf(s) !== -1) {
                                return true;
                            }
                        }
                    }
                }
                return false;
            }) : this.data;
        }
    };

    BootstrapTable.prototype.initPagination = function () {
        if (!this.options.pagination) {
            this.$pagination.hide();
            return;
        } else {
            this.$pagination.show();
        }

        var that = this,
            html = [],
            $allSelected = false,
            i,
            from,
            to,
            $pageList,
            $pre,
            $next,
            $number,
            data = this.getData(),
            pageList = this.options.pageList;

        if (this.options.sidePagination !== 'server') {
            this.options.totalRows = data.length;
        }

        this.totalPages = 0;
        if (this.options.totalRows) {
            if (this.options.pageSize === this.options.formatAllRows()) {
                this.options.pageSize = this.options.totalRows;
                $allSelected = true;
            } else if (this.options.pageSize === this.options.totalRows) {
                // Fix #667 Table with pagination,
                // multiple pages and a search that matches to one page throws exception
                var pageLst = typeof this.options.pageList === 'string' ? this.options.pageList.replace('[', '').replace(']', '').replace(/ /g, '').toLowerCase().split(',') : this.options.pageList;
                if ($.inArray(this.options.formatAllRows().toLowerCase(), pageLst) > -1) {
                    $allSelected = true;
                }
            }

            this.totalPages = ~~((this.options.totalRows - 1) / this.options.pageSize) + 1;

            this.options.totalPages = this.totalPages;
        }
        if (this.totalPages > 0 && this.options.pageNumber > this.totalPages) {
            this.options.pageNumber = this.totalPages;
        }

        this.pageFrom = (this.options.pageNumber - 1) * this.options.pageSize + 1;
        this.pageTo = this.options.pageNumber * this.options.pageSize;
        if (this.pageTo > this.options.totalRows) {
            this.pageTo = this.options.totalRows;
        }

        html.push(sprintf('<div class="%s-%s pagination-detail">', bs.pullClass, this.options.paginationDetailHAlign), '<span class="pagination-info">', this.options.onlyInfoPagination ? this.options.formatDetailPagination(this.options.totalRows) : this.options.formatShowingRows(this.pageFrom, this.pageTo, this.options.totalRows), '</span>');

        if (!this.options.onlyInfoPagination) {
            html.push('<span class="page-list">');

            var pageNumber = [sprintf('<span class="btn-group %s">', this.options.paginationVAlign === 'top' || this.options.paginationVAlign === 'both' ? 'dropdown' : 'dropup'), '<button type="button" class="btn' + sprintf(' btn-%s', this.options.buttonsClass) + sprintf(' btn-%s', this.options.iconSize) + ' dropdown-toggle" data-toggle="dropdown">', '<span class="page-size">', $allSelected ? this.options.formatAllRows() : this.options.pageSize, '</span>', ' <span class="caret"></span>', '</button>', bs.pageDropdownHtml[0]];

            if (typeof this.options.pageList === 'string') {
                var list = this.options.pageList.replace('[', '').replace(']', '').replace(/ /g, '').split(',');

                pageList = [];
                $.each(list, function (i, value) {
                    pageList.push(value.toUpperCase() === that.options.formatAllRows().toUpperCase() || value.toUpperCase() === "UNLIMITED" ? that.options.formatAllRows() : +value);
                });
            }

            $.each(pageList, function (i, page) {
                if (!that.options.smartDisplay || i === 0 || pageList[i - 1] < that.options.totalRows) {
                    var active;
                    if ($allSelected) {
                        active = page === that.options.formatAllRows() ? 'active' : '';
                    } else {
                        active = page === that.options.pageSize ? 'active' : '';
                    }
                    pageNumber.push(sprintf(bs.pageDropdownItemHtml, active, page));
                }
            });
            pageNumber.push(bs.pageDropdownHtml[1] + '</span>');

            html.push(this.options.formatRecordsPerPage(pageNumber.join('')));
            html.push('</span>');

            html.push('</div>', sprintf('<div class="%s-%s pagination">', bs.pullClass, this.options.paginationHAlign), '<ul class="pagination' + sprintf(' pagination-%s', this.options.iconSize) + '">', sprintf('<li class="page-item page-pre"><a class="page-link" href="#">%s</a></li>', this.options.paginationPreText));

            if (this.totalPages < 5) {
                from = 1;
                to = this.totalPages;
            } else {
                from = this.options.pageNumber - 2;
                to = from + 4;
                if (from < 1) {
                    from = 1;
                    to = 5;
                }
                if (to > this.totalPages) {
                    to = this.totalPages;
                    from = to - 4;
                }
            }

            if (this.totalPages >= 6) {
                if (this.options.pageNumber >= 3) {
                    html.push(sprintf('<li class="page-item page-first%s">', 1 === this.options.pageNumber ? ' active' : ''), '<a class="page-link" href="#">', 1, '</a>', '</li>');

                    from++;
                }

                if (this.options.pageNumber >= 4) {
                    if (this.options.pageNumber == 4 || this.totalPages == 6 || this.totalPages == 7) {
                        from--;
                    } else {
                        html.push('<li class="page-item page-first-separator disabled">', '<a class="page-link" href="#">...</a>', '</li>');
                    }

                    to--;
                }
            }

            if (this.totalPages >= 7) {
                if (this.options.pageNumber >= this.totalPages - 2) {
                    from--;
                }
            }

            if (this.totalPages == 6) {
                if (this.options.pageNumber >= this.totalPages - 2) {
                    to++;
                }
            } else if (this.totalPages >= 7) {
                if (this.totalPages == 7 || this.options.pageNumber >= this.totalPages - 3) {
                    to++;
                }
            }

            for (i = from; i <= to; i++) {
                html.push(sprintf('<li class="page-item%s">', i === this.options.pageNumber ? ' active' : ''), '<a class="page-link" href="#">', i, '</a>', '</li>');
            }

            if (this.totalPages >= 8) {
                if (this.options.pageNumber <= this.totalPages - 4) {
                    html.push('<li class="page-item page-last-separator disabled">', '<a class="page-link" href="#">...</a>', '</li>');
                }
            }

            if (this.totalPages >= 6) {
                if (this.options.pageNumber <= this.totalPages - 3) {
                    html.push(sprintf('<li class="page-item page-last%s">', this.totalPages === this.options.pageNumber ? ' active' : ''), '<a class="page-link" href="#">', this.totalPages, '</a>', '</li>');
                }
            }

            html.push(sprintf('<li class="page-item page-next"><a class="page-link" href="#">%s</a></li>', this.options.paginationNextText), '</ul>', '</div>');
        }
        this.$pagination.html(html.join(''));

        if (!this.options.onlyInfoPagination) {
            $pageList = this.$pagination.find('.page-list a');
            $pre = this.$pagination.find('.page-pre');
            $next = this.$pagination.find('.page-next');
            $number = this.$pagination.find('.page-item').not('.page-next, .page-pre');

            if (this.options.smartDisplay) {
                if (this.totalPages <= 1) {
                    this.$pagination.find('div.pagination').hide();
                }
                if (pageList.length < 2 || this.options.totalRows <= pageList[0]) {
                    this.$pagination.find('span.page-list').hide();
                }

                // when data is empty, hide the pagination
                this.$pagination[this.getData().length ? 'show' : 'hide']();
            }

            if (!this.options.paginationLoop) {
                if (this.options.pageNumber === 1) {
                    $pre.addClass('disabled');
                }
                if (this.options.pageNumber === this.totalPages) {
                    $next.addClass('disabled');
                }
            }

            if ($allSelected) {
                this.options.pageSize = this.options.formatAllRows();
            }
            // removed the events for last and first, onPageNumber executeds the same logic
            $pageList.off('click').on('click', $.proxy(this.onPageListChange, this));
            $pre.off('click').on('click', $.proxy(this.onPagePre, this));
            $next.off('click').on('click', $.proxy(this.onPageNext, this));
            $number.off('click').on('click', $.proxy(this.onPageNumber, this));
        }
    };

    BootstrapTable.prototype.updatePagination = function (event) {
        // Fix #171: IE disabled button can be clicked bug.
        if (event && $(event.currentTarget).hasClass('disabled')) {
            return;
        }

        if (!this.options.maintainSelected) {
            this.resetRows();
        }

        this.initPagination();
        if (this.options.sidePagination === 'server') {
            this.initServer();
        } else {
            this.initBody();
        }

        this.trigger('page-change', this.options.pageNumber, this.options.pageSize);
    };

    BootstrapTable.prototype.onPageListChange = function (event) {
        event.preventDefault();
        var $this = $(event.currentTarget);

        $this.parent().addClass('active').siblings().removeClass('active');
        this.options.pageSize = $this.text().toUpperCase() === this.options.formatAllRows().toUpperCase() ? this.options.formatAllRows() : +$this.text();
        this.$toolbar.find('.page-size').text(this.options.pageSize);

        this.updatePagination(event);
        return false;
    };

    BootstrapTable.prototype.onPagePre = function (event) {
        event.preventDefault();
        if (this.options.pageNumber - 1 === 0) {
            this.options.pageNumber = this.options.totalPages;
        } else {
            this.options.pageNumber--;
        }
        this.updatePagination(event);
        return false;
    };

    BootstrapTable.prototype.onPageNext = function (event) {
        event.preventDefault();
        if (this.options.pageNumber + 1 > this.options.totalPages) {
            this.options.pageNumber = 1;
        } else {
            this.options.pageNumber++;
        }
        this.updatePagination(event);
        return false;
    };

    BootstrapTable.prototype.onPageNumber = function (event) {
        event.preventDefault();
        if (this.options.pageNumber === +$(event.currentTarget).text()) {
            return;
        }
        this.options.pageNumber = +$(event.currentTarget).text();
        this.updatePagination(event);
        return false;
    };

    BootstrapTable.prototype.initRow = function (item, i, data, parentDom) {
        var that = this,
            key,
            html = [],
            style = {},
            csses = [],
            data_ = '',
            attributes = {},
            htmlAttributes = [];

        if ($.inArray(item, this.hiddenRows) > -1) {
            return;
        }

        style = calculateObjectValue(this.options, this.options.rowStyle, [item, i], style);

        if (style && style.css) {
            for (key in style.css) {
                csses.push(key + ': ' + style.css[key]);
            }
        }

        attributes = calculateObjectValue(this.options, this.options.rowAttributes, [item, i], attributes);

        if (attributes) {
            for (key in attributes) {
                htmlAttributes.push(sprintf('%s="%s"', key, escapeHTML(attributes[key])));
            }
        }

        if (item._data && !$.isEmptyObject(item._data)) {
            $.each(item._data, function (k, v) {
                // ignore data-index
                if (k === 'index') {
                    return;
                }
                data_ += sprintf(' data-%s="%s"', k, v);
            });
        }

        html.push('<tr', sprintf(' %s', htmlAttributes.join(' ')), sprintf(' id="%s"', $.isArray(item) ? undefined : item._id), sprintf(' class="%s"', style.classes || ($.isArray(item) ? undefined : item._class)), sprintf(' data-index="%s"', i), sprintf(' data-uniqueid="%s"', item[this.options.uniqueId]), sprintf('%s', data_), '>');

        if (this.options.cardView) {
            html.push(sprintf('<td colspan="%s"><div class="card-views">', this.header.fields.length));
        }

        if (!this.options.cardView && this.options.detailView) {
            html.push('<td>');

            if (calculateObjectValue(null, this.options.detailFilter, [i, item])) {
                html.push('<a class="detail-icon" href="#">', sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.detailOpen), '</a>');
            }

            html.push('</td>');
        }

        $.each(this.header.fields, function (j, field) {
            var text = '',
                value_ = getItemField(item, field, that.options.escape),
                value = '',
                type = '',
                cellStyle = {},
                id_ = '',
                class_ = that.header.classes[j],
                data_ = '',
                rowspan_ = '',
                colspan_ = '',
                title_ = '',
                column = that.columns[j];

            if (that.fromHtml && typeof value_ === 'undefined') {
                if (!column.checkbox && !column.radio) {
                    return;
                }
            }

            if (!column.visible) {
                return;
            }

            if (that.options.cardView && !column.cardVisible) {
                return;
            }

            if (column.escape) {
                value_ = escapeHTML(value_);
            }

            style = sprintf('style="%s"', csses.concat(that.header.styles[j]).join('; '));

            // handle td's id and class
            if (item['_' + field + '_id']) {
                id_ = sprintf(' id="%s"', item['_' + field + '_id']);
            }
            if (item['_' + field + '_class']) {
                class_ = sprintf(' class="%s"', item['_' + field + '_class']);
            }
            if (item['_' + field + '_rowspan']) {
                rowspan_ = sprintf(' rowspan="%s"', item['_' + field + '_rowspan']);
            }
            if (item['_' + field + '_colspan']) {
                colspan_ = sprintf(' colspan="%s"', item['_' + field + '_colspan']);
            }
            if (item['_' + field + '_title']) {
                title_ = sprintf(' title="%s"', item['_' + field + '_title']);
            }
            cellStyle = calculateObjectValue(that.header, that.header.cellStyles[j], [value_, item, i, field], cellStyle);
            if (cellStyle.classes) {
                class_ = sprintf(' class="%s"', cellStyle.classes);
            }
            if (cellStyle.css) {
                var csses_ = [];
                for (var key in cellStyle.css) {
                    csses_.push(key + ': ' + cellStyle.css[key]);
                }
                style = sprintf('style="%s"', csses_.concat(that.header.styles[j]).join('; '));
            }

            value = calculateObjectValue(column, that.header.formatters[j], [value_, item, i, field], value_);

            if (item['_' + field + '_data'] && !$.isEmptyObject(item['_' + field + '_data'])) {
                $.each(item['_' + field + '_data'], function (k, v) {
                    // ignore data-index
                    if (k === 'index') {
                        return;
                    }
                    data_ += sprintf(' data-%s="%s"', k, v);
                });
            }

            if (column.checkbox || column.radio) {
                type = column.checkbox ? 'checkbox' : type;
                type = column.radio ? 'radio' : type;

                text = [sprintf(that.options.cardView ? '<div class="card-view %s">' : '<td class="bs-checkbox %s">', column['class'] || ''), '<input' + sprintf(' data-index="%s"', i) + sprintf(' name="%s"', that.options.selectItemName) + sprintf(' type="%s"', type) + sprintf(' value="%s"', item[that.options.idField]) + sprintf(' checked="%s"', value === true || value_ || value && value.checked ? 'checked' : undefined) + sprintf(' disabled="%s"', !column.checkboxEnabled || value && value.disabled ? 'disabled' : undefined) + ' />', that.header.formatters[j] && typeof value === 'string' ? value : '', that.options.cardView ? '</div>' : '</td>'].join('');

                item[that.header.stateField] = value === true || !!value_ || value && value.checked;
            } else {
                value = typeof value === 'undefined' || value === null ? that.options.undefinedText : value;

                text = that.options.cardView ? ['<div class="card-view">', that.options.showHeader ? sprintf('<span class="title" %s>%s</span>', style, getPropertyFromOther(that.columns, 'field', 'title', field)) : '', sprintf('<span class="value">%s</span>', value), '</div>'].join('') : [sprintf('<td%s %s %s %s %s %s %s>', id_, class_, style, data_, rowspan_, colspan_, title_), value, '</td>'].join('');

                // Hide empty data on Card view when smartDisplay is set to true.
                if (that.options.cardView && that.options.smartDisplay && value === '') {
                    // Should set a placeholder for event binding correct fieldIndex
                    text = '<div class="card-view"></div>';
                }
            }

            html.push(text);
        });

        if (this.options.cardView) {
            html.push('</div></td>');
        }
        html.push('</tr>');

        return html.join(' ');
    };

    BootstrapTable.prototype.initBody = function (fixedScroll) {
        var that = this,
            html = [],
            data = this.getData();

        this.trigger('pre-body', data);

        this.$body = this.$el.find('>tbody');
        if (!this.$body.length) {
            this.$body = $('<tbody></tbody>').appendTo(this.$el);
        }

        //Fix #389 Bootstrap-table-flatJSON is not working

        if (!this.options.pagination || this.options.sidePagination === 'server') {
            this.pageFrom = 1;
            this.pageTo = data.length;
        }

        var trFragments = $(document.createDocumentFragment());
        var hasTr;

        for (var i = this.pageFrom - 1; i < this.pageTo; i++) {
            var item = data[i];
            var tr = this.initRow(item, i, data, trFragments);
            hasTr = hasTr || !!tr;
            if (tr && tr !== true) {
                trFragments.append(tr);
            }
        }

        // show no records
        if (!hasTr) {
            trFragments.append('<tr class="no-records-found">' + sprintf('<td colspan="%s">%s</td>', this.$header.find('th').length, this.options.formatNoMatches()) + '</tr>');
        }

        this.$body.html(trFragments);

        if (!fixedScroll) {
            this.scrollTo(0);
        }

        // click to select by column
        this.$body.find('> tr[data-index] > td').off('click dblclick').on('click dblclick', function (e) {
            var $td = $(this),
                $tr = $td.parent(),
                item = that.data[$tr.data('index')],
                index = $td[0].cellIndex,
                fields = that.getVisibleFields(),
                field = fields[that.options.detailView && !that.options.cardView ? index - 1 : index],
                column = that.columns[that.fieldsColumnsIndex[field]],
                value = getItemField(item, field, that.options.escape);

            if ($td.find('.detail-icon').length) {
                return;
            }

            that.trigger(e.type === 'click' ? 'click-cell' : 'dbl-click-cell', field, value, item, $td);
            that.trigger(e.type === 'click' ? 'click-row' : 'dbl-click-row', item, $tr, field);

            // if click to select - then trigger the checkbox/radio click
            if (e.type === 'click' && that.options.clickToSelect && column.clickToSelect && that.options.ignoreClickToSelectOn(e.target)) {
                var $selectItem = $tr.find(sprintf('[name="%s"]', that.options.selectItemName));
                if ($selectItem.length) {
                    $selectItem[0].click(); // #144: .trigger('click') bug
                }
            }
        });

        this.$body.find('> tr[data-index] > td > .detail-icon').off('click').on('click', function (e) {
            e.preventDefault();

            var $this = $(this),
                $tr = $this.parent().parent(),
                index = $tr.data('index'),
                row = data[index]; // Fix #980 Detail view, when searching, returns wrong row

            // remove and update
            if ($tr.next().is('tr.detail-view')) {
                $this.find('i').attr('class', sprintf('%s %s', that.options.iconsPrefix, that.options.icons.detailOpen));
                that.trigger('collapse-row', index, row, $tr.next());
                $tr.next().remove();
            } else {
                $this.find('i').attr('class', sprintf('%s %s', that.options.iconsPrefix, that.options.icons.detailClose));
                $tr.after(sprintf('<tr class="detail-view"><td colspan="%s"></td></tr>', $tr.find('td').length));
                var $element = $tr.next().find('td');
                var content = calculateObjectValue(that.options, that.options.detailFormatter, [index, row, $element], '');
                if ($element.length === 1) {
                    $element.append(content);
                }
                that.trigger('expand-row', index, row, $element);
            }
            that.resetView();
            return false;
        });

        this.$selectItem = this.$body.find(sprintf('[name="%s"]', this.options.selectItemName));
        this.$selectItem.off('click').on('click', function (event) {
            event.stopImmediatePropagation();

            var $this = $(this),
                checked = $this.prop('checked'),
                row = that.data[$this.data('index')];

            if ($(this).is(':radio') || that.options.singleSelect) {
                $.each(that.options.data, function (i, row) {
                    row[that.header.stateField] = false;
                });
            }

            row[that.header.stateField] = checked;

            if (that.options.singleSelect) {
                that.$selectItem.not(this).each(function () {
                    that.data[$(this).data('index')][that.header.stateField] = false;
                });
                that.$selectItem.filter(':checked').not(this).prop('checked', false);
            }

            that.updateSelected();
            that.trigger(checked ? 'check' : 'uncheck', row, $this);
        });

        $.each(this.header.events, function (i, events) {
            if (!events) {
                return;
            }
            // fix bug, if events is defined with namespace
            if (typeof events === 'string') {
                events = calculateObjectValue(null, events);
            }

            var field = that.header.fields[i],
                fieldIndex = $.inArray(field, that.getVisibleFields());

            if (fieldIndex === -1) {
                return;
            }

            if (that.options.detailView && !that.options.cardView) {
                fieldIndex += 1;
            }

            for (var key in events) {
                that.$body.find('>tr:not(.no-records-found)').each(function () {
                    var $tr = $(this),
                        $td = $tr.find(that.options.cardView ? '.card-view' : 'td').eq(fieldIndex),
                        index = key.indexOf(' '),
                        name = key.substring(0, index),
                        el = key.substring(index + 1),
                        func = events[key];

                    $td.find(el).off(name).on(name, function (e) {
                        var index = $tr.data('index'),
                            row = that.data[index],
                            value = row[field];

                        func.apply(this, [e, value, row, index]);
                    });
                });
            }
        });

        this.updateSelected();
        this.resetView();

        this.trigger('post-body', data);
    };

    BootstrapTable.prototype.initServer = function (silent, query, url) {
        var that = this,
            data = {},
            index = $.inArray(this.options.sortName, this.header.fields),
            params = {
            searchText: this.searchText,
            sortName: this.options.sortName,
            sortOrder: this.options.sortOrder
        },
            request;

        if (this.header.sortNames[index]) {
            params.sortName = this.header.sortNames[index];
        }

        if (this.options.pagination && this.options.sidePagination === 'server') {
            params.pageSize = this.options.pageSize === this.options.formatAllRows() ? this.options.totalRows : this.options.pageSize;
            params.pageNumber = this.options.pageNumber;
        }

        if (!(url || this.options.url) && !this.options.ajax) {
            return;
        }

        if (this.options.queryParamsType === 'limit') {
            params = {
                search: params.searchText,
                sort: params.sortName,
                order: params.sortOrder
            };

            if (this.options.pagination && this.options.sidePagination === 'server') {
                params.offset = this.options.pageSize === this.options.formatAllRows() ? 0 : this.options.pageSize * (this.options.pageNumber - 1);
                params.limit = this.options.pageSize === this.options.formatAllRows() ? this.options.totalRows : this.options.pageSize;
                if (params.limit === 0) {
                    delete params.limit;
                }
            }
        }

        if (!$.isEmptyObject(this.filterColumnsPartial)) {
            params.filter = JSON.stringify(this.filterColumnsPartial, null);
        }

        data = calculateObjectValue(this.options, this.options.queryParams, [params], data);

        $.extend(data, query || {});

        // false to stop request
        if (data === false) {
            return;
        }

        if (!silent) {
            this.$tableLoading.show();
        }
        request = $.extend({}, calculateObjectValue(null, this.options.ajaxOptions), {
            type: this.options.method,
            url: url || this.options.url,
            data: this.options.contentType === 'application/json' && this.options.method === 'post' ? JSON.stringify(data) : data,
            cache: this.options.cache,
            contentType: this.options.contentType,
            dataType: this.options.dataType,
            success: function success(res) {
                res = calculateObjectValue(that.options, that.options.responseHandler, [res], res);

                that.load(res);
                that.trigger('load-success', res);
                if (!silent) that.$tableLoading.hide();
            },
            error: function error(res) {
                var data = [];
                if (that.options.sidePagination === 'server') {
                    data = {};
                    data[that.options.totalField] = 0;
                    data[that.options.dataField] = [];
                }
                that.load(data);
                that.trigger('load-error', res.status, res);
                if (!silent) that.$tableLoading.hide();
            }
        });

        if (this.options.ajax) {
            calculateObjectValue(this, this.options.ajax, [request], null);
        } else {
            if (this._xhr && this._xhr.readyState !== 4) {
                this._xhr.abort();
            }
            this._xhr = $.ajax(request);
        }
    };

    BootstrapTable.prototype.initSearchText = function () {
        if (this.options.search) {
            this.searchText = '';
            if (this.options.searchText !== '') {
                var $search = this.$toolbar.find('.search input');
                $search.val(this.options.searchText);
                this.onSearch({ currentTarget: $search, firedByInitSearchText: true });
            }
        }
    };

    BootstrapTable.prototype.getCaret = function () {
        var that = this;

        $.each(this.$header.find('th'), function (i, th) {
            $(th).find('.sortable').removeClass('desc asc').addClass($(th).data('field') === that.options.sortName ? that.options.sortOrder : 'both');
        });
    };

    BootstrapTable.prototype.updateSelected = function () {
        var checkAll = this.$selectItem.filter(':enabled').length && this.$selectItem.filter(':enabled').length === this.$selectItem.filter(':enabled').filter(':checked').length;

        this.$selectAll.add(this.$selectAll_).prop('checked', checkAll);

        this.$selectItem.each(function () {
            $(this).closest('tr')[$(this).prop('checked') ? 'addClass' : 'removeClass']('selected');
        });
    };

    BootstrapTable.prototype.updateRows = function () {
        var that = this;

        this.$selectItem.each(function () {
            that.data[$(this).data('index')][that.header.stateField] = $(this).prop('checked');
        });
    };

    BootstrapTable.prototype.resetRows = function () {
        var that = this;

        $.each(this.data, function (i, row) {
            that.$selectAll.prop('checked', false);
            that.$selectItem.prop('checked', false);
            if (that.header.stateField) {
                row[that.header.stateField] = false;
            }
        });
        this.initHiddenRows();
    };

    BootstrapTable.prototype.trigger = function (name) {
        var args = Array.prototype.slice.call(arguments, 1);

        name += '.bs.table';
        this.options[BootstrapTable.EVENTS[name]].apply(this.options, args);
        this.$el.trigger($.Event(name), args);

        this.options.onAll(name, args);
        this.$el.trigger($.Event('all.bs.table'), [name, args]);
    };

    BootstrapTable.prototype.resetHeader = function () {
        // fix #61: the hidden table reset header bug.
        // fix bug: get $el.css('width') error sometime (height = 500)
        clearTimeout(this.timeoutId_);
        this.timeoutId_ = setTimeout($.proxy(this.fitHeader, this), this.$el.is(':hidden') ? 100 : 0);
    };

    BootstrapTable.prototype.fitHeader = function () {
        var that = this,
            fixedBody,
            scrollWidth,
            focused,
            focusedTemp;

        if (that.$el.is(':hidden')) {
            that.timeoutId_ = setTimeout($.proxy(that.fitHeader, that), 100);
            return;
        }
        fixedBody = this.$tableBody.get(0);

        scrollWidth = fixedBody.scrollWidth > fixedBody.clientWidth && fixedBody.scrollHeight > fixedBody.clientHeight + this.$header.outerHeight() ? getScrollBarWidth() : 0;

        this.$el.css('margin-top', -this.$header.outerHeight());

        focused = $(':focus');
        if (focused.length > 0) {
            var $th = focused.parents('th');
            if ($th.length > 0) {
                var dataField = $th.attr('data-field');
                if (dataField !== undefined) {
                    var $headerTh = this.$header.find("[data-field='" + dataField + "']");
                    if ($headerTh.length > 0) {
                        $headerTh.find(":input").addClass("focus-temp");
                    }
                }
            }
        }

        this.$header_ = this.$header.clone(true, true);
        this.$selectAll_ = this.$header_.find('[name="btSelectAll"]');
        this.$tableHeader.css({
            'margin-right': scrollWidth
        }).find('table').css('width', this.$el.outerWidth()).html('').attr('class', this.$el.attr('class')).append(this.$header_);

        focusedTemp = $('.focus-temp:visible:eq(0)');
        if (focusedTemp.length > 0) {
            focusedTemp.focus();
            this.$header.find('.focus-temp').removeClass('focus-temp');
        }

        // fix bug: $.data() is not working as expected after $.append()
        this.$header.find('th[data-field]').each(function (i) {
            that.$header_.find(sprintf('th[data-field="%s"]', $(this).data('field'))).data($(this).data());
        });

        var visibleFields = this.getVisibleFields(),
            $ths = this.$header_.find('th');

        this.$body.find('>tr:first-child:not(.no-records-found) > *').each(function (i) {
            var $this = $(this),
                index = i;

            if (that.options.detailView && !that.options.cardView) {
                if (i === 0) {
                    that.$header_.find('th.detail').find('.fht-cell').width($this.innerWidth());
                }
                index = i - 1;
            }

            if (index === -1) {
                return;
            }

            var $th = that.$header_.find(sprintf('th[data-field="%s"]', visibleFields[index]));
            if ($th.length > 1) {
                $th = $($ths[$this[0].cellIndex]);
            }

            var zoomWidth = $th.width() - $th.find('.fht-cell').width();
            $th.find('.fht-cell').width($this.innerWidth() - zoomWidth);
        });

        this.horizontalScroll();
        this.trigger('post-header');
    };

    BootstrapTable.prototype.resetFooter = function () {
        var that = this,
            data = that.getData(),
            html = [];

        if (!this.options.showFooter || this.options.cardView) {
            //do nothing
            return;
        }

        if (!this.options.cardView && this.options.detailView) {
            html.push('<td><div class="th-inner">&nbsp;</div><div class="fht-cell"></div></td>');
        }

        $.each(this.columns, function (i, column) {
            var key,
                falign = '',
                // footer align style
            valign = '',
                csses = [],
                style = {},
                class_ = sprintf(' class="%s"', column['class']);

            if (!column.visible) {
                return;
            }

            if (that.options.cardView && !column.cardVisible) {
                return;
            }

            falign = sprintf('text-align: %s; ', column.falign ? column.falign : column.align);
            valign = sprintf('vertical-align: %s; ', column.valign);

            style = calculateObjectValue(null, that.options.footerStyle);

            if (style && style.css) {
                for (key in style.css) {
                    csses.push(key + ': ' + style.css[key]);
                }
            }

            html.push('<td', class_, sprintf(' style="%s"', falign + valign + csses.concat().join('; ')), '>');
            html.push('<div class="th-inner">');

            html.push(calculateObjectValue(column, column.footerFormatter, [data], '&nbsp;') || '&nbsp;');

            html.push('</div>');
            html.push('<div class="fht-cell"></div>');
            html.push('</div>');
            html.push('</td>');
        });

        this.$tableFooter.find('tr').html(html.join(''));
        this.$tableFooter.show();
        clearTimeout(this.timeoutFooter_);
        this.timeoutFooter_ = setTimeout($.proxy(this.fitFooter, this), this.$el.is(':hidden') ? 100 : 0);
    };

    BootstrapTable.prototype.fitFooter = function () {
        var that = this,
            $footerTd,
            elWidth,
            scrollWidth;

        clearTimeout(this.timeoutFooter_);
        if (this.$el.is(':hidden')) {
            this.timeoutFooter_ = setTimeout($.proxy(this.fitFooter, this), 100);
            return;
        }

        elWidth = this.$el.css('width');
        scrollWidth = elWidth > this.$tableBody.width() ? getScrollBarWidth() : 0;

        this.$tableFooter.css({
            'margin-right': scrollWidth
        }).find('table').css('width', elWidth).attr('class', this.$el.attr('class'));

        $footerTd = this.$tableFooter.find('td');

        this.$body.find('>tr:first-child:not(.no-records-found) > *').each(function (i) {
            var $this = $(this);

            $footerTd.eq(i).find('.fht-cell').width($this.innerWidth());
        });

        this.horizontalScroll();
    };

    BootstrapTable.prototype.horizontalScroll = function () {
        var that = this;
        // horizontal scroll event
        // TODO: it's probably better improving the layout than binding to scroll event

        that.trigger('scroll-body');
        this.$tableBody.off('scroll').on('scroll', function () {
            if (that.options.showHeader && that.options.height) {
                that.$tableHeader.scrollLeft($(this).scrollLeft());
            }

            if (that.options.showFooter && !that.options.cardView) {
                that.$tableFooter.scrollLeft($(this).scrollLeft());
            }
        });
    };

    BootstrapTable.prototype.toggleColumn = function (index, checked, needUpdate) {
        if (index === -1) {
            return;
        }
        this.columns[index].visible = checked;
        this.initHeader();
        this.initSearch();
        this.initPagination();
        this.initBody();

        if (this.options.showColumns) {
            var $items = this.$toolbar.find('.keep-open input').prop('disabled', false);

            if (needUpdate) {
                $items.filter(sprintf('[value="%s"]', index)).prop('checked', checked);
            }

            if ($items.filter(':checked').length <= this.options.minimumCountColumns) {
                $items.filter(':checked').prop('disabled', true);
            }
        }
    };

    BootstrapTable.prototype.getVisibleFields = function () {
        var that = this,
            visibleFields = [];

        $.each(this.header.fields, function (j, field) {
            var column = that.columns[that.fieldsColumnsIndex[field]];

            if (!column.visible) {
                return;
            }
            visibleFields.push(field);
        });
        return visibleFields;
    };

    // PUBLIC FUNCTION DEFINITION
    // =======================

    BootstrapTable.prototype.resetView = function (params) {
        var padding = 0;

        if (params && params.height) {
            this.options.height = params.height;
        }

        this.$selectAll.prop('checked', this.$selectItem.length > 0 && this.$selectItem.length === this.$selectItem.filter(':checked').length);

        if (this.options.height) {
            var toolbarHeight = this.$toolbar.outerHeight(true),
                paginationHeight = this.$pagination.outerHeight(true),
                height = this.options.height - toolbarHeight - paginationHeight;

            this.$tableContainer.css('height', height + 'px');
        }

        if (this.options.cardView) {
            // remove the element css
            this.$el.css('margin-top', '0');
            this.$tableContainer.css('padding-bottom', '0');
            this.$tableFooter.hide();
            return;
        }

        if (this.options.showHeader && this.options.height) {
            this.$tableHeader.show();
            this.resetHeader();
            padding += this.$header.outerHeight();
        } else {
            this.$tableHeader.hide();
            this.trigger('post-header');
        }

        if (this.options.showFooter) {
            this.resetFooter();
            if (this.options.height) {
                padding += this.$tableFooter.outerHeight() + 1;
            }
        }

        // Assign the correct sortable arrow
        this.getCaret();
        this.$tableContainer.css('padding-bottom', padding + 'px');
        this.trigger('reset-view');
    };

    BootstrapTable.prototype.getData = function (useCurrentPage) {
        var data = this.options.data;
        if (this.searchText || this.options.sortName || !$.isEmptyObject(this.filterColumns) || !$.isEmptyObject(this.filterColumnsPartial)) {
            data = this.data;
        }

        if (useCurrentPage) {
            return data.slice(this.pageFrom - 1, this.pageTo);
        }

        return data;
    };

    BootstrapTable.prototype.load = function (data) {
        var fixedScroll = false;

        // #431: support pagination
        if (this.options.pagination && this.options.sidePagination === 'server') {
            this.options.totalRows = data[this.options.totalField];
            fixedScroll = data.fixedScroll;
            data = data[this.options.dataField];
        } else if (!$.isArray(data)) {
            // support fixedScroll
            fixedScroll = data.fixedScroll;
            data = data.data;
        }

        this.initData(data);
        this.initSearch();
        this.initPagination();
        this.initBody(fixedScroll);
    };

    BootstrapTable.prototype.append = function (data) {
        this.initData(data, 'append');
        this.initSearch();
        this.initPagination();
        this.initSort();
        this.initBody(true);
    };

    BootstrapTable.prototype.prepend = function (data) {
        this.initData(data, 'prepend');
        this.initSearch();
        this.initPagination();
        this.initSort();
        this.initBody(true);
    };

    BootstrapTable.prototype.remove = function (params) {
        var len = this.options.data.length,
            i,
            row;

        if (!params.hasOwnProperty('field') || !params.hasOwnProperty('values')) {
            return;
        }

        for (i = len - 1; i >= 0; i--) {
            row = this.options.data[i];

            if (!row.hasOwnProperty(params.field)) {
                continue;
            }
            if ($.inArray(row[params.field], params.values) !== -1) {
                this.options.data.splice(i, 1);
                if (this.options.sidePagination === 'server') {
                    this.options.totalRows -= 1;
                }
            }
        }

        if (len === this.options.data.length) {
            return;
        }

        this.initSearch();
        this.initPagination();
        this.initSort();
        this.initBody(true);
    };

    BootstrapTable.prototype.removeAll = function () {
        if (this.options.data.length > 0) {
            this.options.data.splice(0, this.options.data.length);
            this.initSearch();
            this.initPagination();
            this.initBody(true);
        }
    };

    BootstrapTable.prototype.getRowByUniqueId = function (id) {
        var uniqueId = this.options.uniqueId,
            len = this.options.data.length,
            dataRow = null,
            i,
            row,
            rowUniqueId;

        for (i = len - 1; i >= 0; i--) {
            row = this.options.data[i];

            if (row.hasOwnProperty(uniqueId)) {
                // uniqueId is a column
                rowUniqueId = row[uniqueId];
            } else if (row._data.hasOwnProperty(uniqueId)) {
                // uniqueId is a row data property
                rowUniqueId = row._data[uniqueId];
            } else {
                continue;
            }

            if (typeof rowUniqueId === 'string') {
                id = id.toString();
            } else if (typeof rowUniqueId === 'number') {
                if (Number(rowUniqueId) === rowUniqueId && rowUniqueId % 1 === 0) {
                    id = parseInt(id);
                } else if (rowUniqueId === Number(rowUniqueId) && rowUniqueId !== 0) {
                    id = parseFloat(id);
                }
            }

            if (rowUniqueId === id) {
                dataRow = row;
                break;
            }
        }

        return dataRow;
    };

    BootstrapTable.prototype.removeByUniqueId = function (id) {
        var len = this.options.data.length,
            row = this.getRowByUniqueId(id);

        if (row) {
            this.options.data.splice(this.options.data.indexOf(row), 1);
        }

        if (len === this.options.data.length) {
            return;
        }

        this.initSearch();
        this.initPagination();
        this.initBody(true);
    };

    BootstrapTable.prototype.updateByUniqueId = function (params) {
        var that = this;
        var allParams = $.isArray(params) ? params : [params];

        $.each(allParams, function (i, params) {
            var rowId;

            if (!params.hasOwnProperty('id') || !params.hasOwnProperty('row')) {
                return;
            }

            rowId = $.inArray(that.getRowByUniqueId(params.id), that.options.data);

            if (rowId === -1) {
                return;
            }
            $.extend(that.options.data[rowId], params.row);
        });

        this.initSearch();
        this.initPagination();
        this.initSort();
        this.initBody(true);
    };

    BootstrapTable.prototype.refreshColumnTitle = function (params) {
        if (!params.hasOwnProperty('field') || !params.hasOwnProperty('title')) {
            return;
        }

        this.columns[this.fieldsColumnsIndex[params.field]].title = this.options.escape ? escapeHTML(params.title) : params.title;

        if (this.columns[this.fieldsColumnsIndex[params.field]].visible) {
            var header = this.options.height !== undefined ? this.$tableHeader : this.$header;
            header.find('th[data-field]').each(function (i) {
                if ($(this).data('field') === params.field) {
                    $($(this).find(".th-inner")[0]).text(params.title);
                    return false;
                }
            });
        }
    };

    BootstrapTable.prototype.insertRow = function (params) {
        if (!params.hasOwnProperty('index') || !params.hasOwnProperty('row')) {
            return;
        }
        this.options.data.splice(params.index, 0, params.row);
        this.initSearch();
        this.initPagination();
        this.initSort();
        this.initBody(true);
    };

    BootstrapTable.prototype.updateRow = function (params) {
        var that = this;
        var allParams = $.isArray(params) ? params : [params];

        $.each(allParams, function (i, params) {
            if (!params.hasOwnProperty('index') || !params.hasOwnProperty('row')) {
                return;
            }
            $.extend(that.options.data[params.index], params.row);
        });

        this.initSearch();
        this.initPagination();
        this.initSort();
        this.initBody(true);
    };

    BootstrapTable.prototype.initHiddenRows = function () {
        this.hiddenRows = [];
    };

    BootstrapTable.prototype.showRow = function (params) {
        this.toggleRow(params, true);
    };

    BootstrapTable.prototype.hideRow = function (params) {
        this.toggleRow(params, false);
    };

    BootstrapTable.prototype.toggleRow = function (params, visible) {
        var row, index;

        if (params.hasOwnProperty('index')) {
            row = this.getData()[params.index];
        } else if (params.hasOwnProperty('uniqueId')) {
            row = this.getRowByUniqueId(params.uniqueId);
        }

        if (!row) {
            return;
        }

        index = $.inArray(row, this.hiddenRows);

        if (!visible && index === -1) {
            this.hiddenRows.push(row);
        } else if (visible && index > -1) {
            this.hiddenRows.splice(index, 1);
        }
        this.initBody(true);
    };

    BootstrapTable.prototype.getHiddenRows = function (show) {
        var that = this,
            data = this.getData(),
            rows = [];

        $.each(data, function (i, row) {
            if ($.inArray(row, that.hiddenRows) > -1) {
                rows.push(row);
            }
        });
        this.hiddenRows = rows;
        return rows;
    };

    BootstrapTable.prototype.mergeCells = function (options) {
        var row = options.index,
            col = $.inArray(options.field, this.getVisibleFields()),
            rowspan = options.rowspan || 1,
            colspan = options.colspan || 1,
            i,
            j,
            $tr = this.$body.find('>tr'),
            $td;

        if (this.options.detailView && !this.options.cardView) {
            col += 1;
        }

        $td = $tr.eq(row).find('>td').eq(col);

        if (row < 0 || col < 0 || row >= this.data.length) {
            return;
        }

        for (i = row; i < row + rowspan; i++) {
            for (j = col; j < col + colspan; j++) {
                $tr.eq(i).find('>td').eq(j).hide();
            }
        }

        $td.attr('rowspan', rowspan).attr('colspan', colspan).show();
    };

    BootstrapTable.prototype.updateCell = function (params) {
        if (!params.hasOwnProperty('index') || !params.hasOwnProperty('field') || !params.hasOwnProperty('value')) {
            return;
        }
        this.data[params.index][params.field] = params.value;

        if (params.reinit === false) {
            return;
        }
        this.initSort();
        this.initBody(true);
    };

    BootstrapTable.prototype.updateCellById = function (params) {
        var that = this;
        if (!params.hasOwnProperty('id') || !params.hasOwnProperty('field') || !params.hasOwnProperty('value')) {
            return;
        }
        var allParams = $.isArray(params) ? params : [params];

        $.each(allParams, function (i, params) {
            var rowId;

            rowId = $.inArray(that.getRowByUniqueId(params.id), that.options.data);

            if (rowId === -1) {
                return;
            }
            that.data[rowId][params.field] = params.value;
        });

        if (params.reinit === false) {
            return;
        }
        this.initSort();
        this.initBody(true);
    };

    BootstrapTable.prototype.getOptions = function () {
        //Deep copy
        return $.extend(true, {}, this.options);
    };

    BootstrapTable.prototype.getSelections = function () {
        var that = this;

        return $.grep(this.options.data, function (row) {
            // fix #2424: from html with checkbox
            return row[that.header.stateField] === true;
        });
    };

    BootstrapTable.prototype.getAllSelections = function () {
        var that = this;

        return $.grep(this.options.data, function (row) {
            return row[that.header.stateField];
        });
    };

    BootstrapTable.prototype.checkAll = function () {
        this.checkAll_(true);
    };

    BootstrapTable.prototype.uncheckAll = function () {
        this.checkAll_(false);
    };

    BootstrapTable.prototype.checkInvert = function () {
        var that = this;
        var rows = that.$selectItem.filter(':enabled');
        var checked = rows.filter(':checked');
        rows.each(function () {
            $(this).prop('checked', !$(this).prop('checked'));
        });
        that.updateRows();
        that.updateSelected();
        that.trigger('uncheck-some', checked);
        checked = that.getSelections();
        that.trigger('check-some', checked);
    };

    BootstrapTable.prototype.checkAll_ = function (checked) {
        var rows;
        if (!checked) {
            rows = this.getSelections();
        }
        this.$selectAll.add(this.$selectAll_).prop('checked', checked);
        this.$selectItem.filter(':enabled').prop('checked', checked);
        this.updateRows();
        if (checked) {
            rows = this.getSelections();
        }
        this.trigger(checked ? 'check-all' : 'uncheck-all', rows);
    };

    BootstrapTable.prototype.check = function (index) {
        this.check_(true, index);
    };

    BootstrapTable.prototype.uncheck = function (index) {
        this.check_(false, index);
    };

    BootstrapTable.prototype.check_ = function (checked, index) {
        var $el = this.$selectItem.filter(sprintf('[data-index="%s"]', index)).prop('checked', checked);
        this.data[index][this.header.stateField] = checked;
        this.updateSelected();
        this.trigger(checked ? 'check' : 'uncheck', this.data[index], $el);
    };

    BootstrapTable.prototype.checkBy = function (obj) {
        this.checkBy_(true, obj);
    };

    BootstrapTable.prototype.uncheckBy = function (obj) {
        this.checkBy_(false, obj);
    };

    BootstrapTable.prototype.checkBy_ = function (checked, obj) {
        if (!obj.hasOwnProperty('field') || !obj.hasOwnProperty('values')) {
            return;
        }

        var that = this,
            rows = [];
        $.each(this.options.data, function (index, row) {
            if (!row.hasOwnProperty(obj.field)) {
                return false;
            }
            if ($.inArray(row[obj.field], obj.values) !== -1) {
                var $el = that.$selectItem.filter(':enabled').filter(sprintf('[data-index="%s"]', index)).prop('checked', checked);
                row[that.header.stateField] = checked;
                rows.push(row);
                that.trigger(checked ? 'check' : 'uncheck', row, $el);
            }
        });
        this.updateSelected();
        this.trigger(checked ? 'check-some' : 'uncheck-some', rows);
    };

    BootstrapTable.prototype.destroy = function () {
        this.$el.insertBefore(this.$container);
        $(this.options.toolbar).insertBefore(this.$el);
        this.$container.next().remove();
        this.$container.remove();
        this.$el.html(this.$el_.html()).css('margin-top', '0').attr('class', this.$el_.attr('class') || ''); // reset the class
    };

    BootstrapTable.prototype.showLoading = function () {
        this.$tableLoading.show();
    };

    BootstrapTable.prototype.hideLoading = function () {
        this.$tableLoading.hide();
    };

    BootstrapTable.prototype.togglePagination = function () {
        this.options.pagination = !this.options.pagination;
        var button = this.$toolbar.find('button[name="paginationSwitch"] i');
        if (this.options.pagination) {
            button.attr("class", this.options.iconsPrefix + " " + this.options.icons.paginationSwitchDown);
        } else {
            button.attr("class", this.options.iconsPrefix + " " + this.options.icons.paginationSwitchUp);
        }
        this.updatePagination();
    };

    BootstrapTable.prototype.toggleFullscreen = function () {
        this.$el.closest('.bootstrap-table').toggleClass('fullscreen');
    };

    BootstrapTable.prototype.refresh = function (params) {
        if (params && params.url) {
            this.options.url = params.url;
        }
        if (params && params.pageNumber) {
            this.options.pageNumber = params.pageNumber;
        }
        if (params && params.pageSize) {
            this.options.pageSize = params.pageSize;
        }
        this.initServer(params && params.silent, params && params.query, params && params.url);
        this.trigger('refresh', params);
    };

    BootstrapTable.prototype.resetWidth = function () {
        if (this.options.showHeader && this.options.height) {
            this.fitHeader();
        }
        if (this.options.showFooter && !this.options.cardView) {
            this.fitFooter();
        }
    };

    BootstrapTable.prototype.showColumn = function (field) {
        this.toggleColumn(this.fieldsColumnsIndex[field], true, true);
    };

    BootstrapTable.prototype.hideColumn = function (field) {
        this.toggleColumn(this.fieldsColumnsIndex[field], false, true);
    };

    BootstrapTable.prototype.getHiddenColumns = function () {
        return $.grep(this.columns, function (column) {
            return !column.visible;
        });
    };

    BootstrapTable.prototype.getVisibleColumns = function () {
        return $.grep(this.columns, function (column) {
            return column.visible;
        });
    };

    BootstrapTable.prototype.toggleAllColumns = function (visible) {
        var that = this;
        $.each(this.columns, function (i, column) {
            that.columns[i].visible = visible;
        });

        this.initHeader();
        this.initSearch();
        this.initPagination();
        this.initBody();
        if (this.options.showColumns) {
            var $items = this.$toolbar.find('.keep-open input').prop('disabled', false);

            if ($items.filter(':checked').length <= this.options.minimumCountColumns) {
                $items.filter(':checked').prop('disabled', true);
            }
        }
    };

    BootstrapTable.prototype.showAllColumns = function () {
        this.toggleAllColumns(true);
    };

    BootstrapTable.prototype.hideAllColumns = function () {
        this.toggleAllColumns(false);
    };

    BootstrapTable.prototype.filterBy = function (columns) {
        this.filterColumns = $.isEmptyObject(columns) ? {} : columns;
        this.options.pageNumber = 1;
        this.initSearch();
        this.updatePagination();
    };

    BootstrapTable.prototype.scrollTo = function (value) {
        if (typeof value === 'string') {
            value = value === 'bottom' ? this.$tableBody[0].scrollHeight : 0;
        }
        if (typeof value === 'number') {
            this.$tableBody.scrollTop(value);
        }
        if (typeof value === 'undefined') {
            return this.$tableBody.scrollTop();
        }
    };

    BootstrapTable.prototype.getScrollPosition = function () {
        return this.scrollTo();
    };

    BootstrapTable.prototype.selectPage = function (page) {
        if (page > 0 && page <= this.options.totalPages) {
            this.options.pageNumber = page;
            this.updatePagination();
        }
    };

    BootstrapTable.prototype.prevPage = function () {
        if (this.options.pageNumber > 1) {
            this.options.pageNumber--;
            this.updatePagination();
        }
    };

    BootstrapTable.prototype.nextPage = function () {
        if (this.options.pageNumber < this.options.totalPages) {
            this.options.pageNumber++;
            this.updatePagination();
        }
    };

    BootstrapTable.prototype.toggleView = function () {
        this.options.cardView = !this.options.cardView;
        this.initHeader();
        // Fixed remove toolbar when click cardView button.
        //that.initToolbar();
        var $icon = this.$toolbar.find('button[name="toggle"] i');
        if (this.options.cardView) {
            $icon.removeClass(this.options.icons.toggleOff);
            $icon.addClass(this.options.icons.toggleOn);
        } else {
            $icon.removeClass(this.options.icons.toggleOn);
            $icon.addClass(this.options.icons.toggleOff);
        }
        this.initBody();
        this.trigger('toggle', this.options.cardView);
    };

    BootstrapTable.prototype.refreshOptions = function (options) {
        //If the objects are equivalent then avoid the call of destroy / init methods
        if (compareObjects(this.options, options, true)) {
            return;
        }
        this.options = $.extend(this.options, options);
        this.trigger('refresh-options', this.options);
        this.destroy();
        this.init();
    };

    BootstrapTable.prototype.resetSearch = function (text) {
        var $search = this.$toolbar.find('.search input');
        $search.val(text || '');
        this.onSearch({ currentTarget: $search });
    };

    BootstrapTable.prototype.expandRow_ = function (expand, index) {
        var $tr = this.$body.find(sprintf('> tr[data-index="%s"]', index));
        if ($tr.next().is('tr.detail-view') === (expand ? false : true)) {
            $tr.find('> td > .detail-icon').click();
        }
    };

    BootstrapTable.prototype.expandRow = function (index) {
        this.expandRow_(true, index);
    };

    BootstrapTable.prototype.collapseRow = function (index) {
        this.expandRow_(false, index);
    };

    BootstrapTable.prototype.expandAllRows = function (isSubTable) {
        if (isSubTable) {
            var $tr = this.$body.find(sprintf('> tr[data-index="%s"]', 0)),
                that = this,
                detailIcon = null,
                executeInterval = false,
                idInterval = -1;

            if (!$tr.next().is('tr.detail-view')) {
                $tr.find('> td > .detail-icon').click();
                executeInterval = true;
            } else if (!$tr.next().next().is('tr.detail-view')) {
                $tr.next().find(".detail-icon").click();
                executeInterval = true;
            }

            if (executeInterval) {
                try {
                    idInterval = setInterval(function () {
                        detailIcon = that.$body.find("tr.detail-view").last().find(".detail-icon");
                        if (detailIcon.length > 0) {
                            detailIcon.click();
                        } else {
                            clearInterval(idInterval);
                        }
                    }, 1);
                } catch (ex) {
                    clearInterval(idInterval);
                }
            }
        } else {
            var trs = this.$body.children();
            for (var i = 0; i < trs.length; i++) {
                this.expandRow_(true, $(trs[i]).data("index"));
            }
        }
    };

    BootstrapTable.prototype.collapseAllRows = function (isSubTable) {
        if (isSubTable) {
            this.expandRow_(false, 0);
        } else {
            var trs = this.$body.children();
            for (var i = 0; i < trs.length; i++) {
                this.expandRow_(false, $(trs[i]).data("index"));
            }
        }
    };

    BootstrapTable.prototype.updateFormatText = function (name, text) {
        if (this.options[sprintf('format%s', name)]) {
            if (typeof text === 'string') {
                this.options[sprintf('format%s', name)] = function () {
                    return text;
                };
            } else if (typeof text === 'function') {
                this.options[sprintf('format%s', name)] = text;
            }
        }
        this.initToolbar();
        this.initPagination();
        this.initBody();
    };

    // BOOTSTRAP TABLE PLUGIN DEFINITION
    // =======================

    var allowedMethods = ['getOptions', 'getSelections', 'getAllSelections', 'getData', 'load', 'append', 'prepend', 'remove', 'removeAll', 'insertRow', 'updateRow', 'updateCell', 'updateByUniqueId', 'removeByUniqueId', 'getRowByUniqueId', 'showRow', 'hideRow', 'getHiddenRows', 'mergeCells', 'refreshColumnTitle', 'checkAll', 'uncheckAll', 'checkInvert', 'check', 'uncheck', 'checkBy', 'uncheckBy', 'refresh', 'resetView', 'resetWidth', 'destroy', 'showLoading', 'hideLoading', 'showColumn', 'hideColumn', 'getHiddenColumns', 'getVisibleColumns', 'showAllColumns', 'hideAllColumns', 'filterBy', 'scrollTo', 'getScrollPosition', 'selectPage', 'prevPage', 'nextPage', 'togglePagination', 'toggleView', 'refreshOptions', 'resetSearch', 'expandRow', 'collapseRow', 'expandAllRows', 'collapseAllRows', 'updateFormatText', 'updateCellById'];

    $.fn.bootstrapTable = function (option) {
        var value,
            args = Array.prototype.slice.call(arguments, 1);

        this.each(function () {
            var $this = $(this),
                data = $this.data('bootstrap.table'),
                options = $.extend({}, BootstrapTable.DEFAULTS, $this.data(), (typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object' && option);

            if (typeof option === 'string') {
                if ($.inArray(option, allowedMethods) < 0) {
                    throw new Error("Unknown method: " + option);
                }

                if (!data) {
                    return;
                }

                value = data[option].apply(data, args);

                if (option === 'destroy') {
                    $this.removeData('bootstrap.table');
                }
            }

            if (!data) {
                $this.data('bootstrap.table', data = new BootstrapTable(this, options));
            }
        });

        return typeof value === 'undefined' ? this : value;
    };

    $.fn.bootstrapTable.Constructor = BootstrapTable;
    $.fn.bootstrapTable.defaults = BootstrapTable.DEFAULTS;
    $.fn.bootstrapTable.columnDefaults = BootstrapTable.COLUMN_DEFAULTS;
    $.fn.bootstrapTable.locales = BootstrapTable.LOCALES;
    $.fn.bootstrapTable.methods = allowedMethods;
    $.fn.bootstrapTable.utils = {
        bootstrapVersion: bootstrapVersion,
        sprintf: sprintf,
        compareObjects: compareObjects,
        calculateObjectValue: calculateObjectValue,
        getItemField: getItemField,
        objectKeys: objectKeys,
        isIEBrowser: isIEBrowser
    };

    // BOOTSTRAP TABLE INIT
    // =======================

    $(function () {
        $('[data-toggle="table"]').bootstrapTable();
    });
})(jQuery);

/***/ }),

/***/ 534:
/***/ (function(module, exports) {

/*
* bootstrap-table - v1.12.1 - 2018-03-12
* https://github.com/wenzhixin/bootstrap-table
* Copyright (c) 2018 zhixin wen
* Licensed MIT License
*/
!function (a) {
  "use strict";
  var b = a.fn.bootstrapTable.utils.sprintf,
      c = a.fn.bootstrapTable.utils.objectKeys,
      d = function d(a) {
    return a.get(a.length - 1).options;
  },
      e = function e(a, c) {
    for (var e = d(a), f = 0; f < e.length; f++) {
      "" !== e[f].value && (c.hasOwnProperty(e[f].value) ? a.find(b("option[value='%s']", e[f].value)).show() : a.find(b("option[value='%s']", e[f].value)).hide());
    }
  },
      f = function f(b, c, d) {
    c = a.trim(c), b = a(b.get(b.length - 1)), h(b, c) || b.append(a("<option></option>").attr("value", c).text(a("<div />").html(d).text()));
  },
      g = function g(b) {
    b = a(b.get(b.length - 1));var c = b.find("option:gt(0)");c.sort(function (b, c) {
      return b = a(b).text().toLowerCase(), c = a(c).text().toLowerCase(), a.isNumeric(b) && a.isNumeric(c) && (b = parseFloat(b), c = parseFloat(c)), b > c ? 1 : c > b ? -1 : 0;
    }), b.find("option:gt(0)").remove(), b.append(c);
  },
      h = function h(a, b) {
    for (var c = d(a), e = 0; e < c.length; e++) {
      if (c[e].value === b.toString()) return !0;
    }return !1;
  },
      i = function i(a) {
    a.$tableHeader.css("height", "77px");
  },
      j = function j(a) {
    var b = a.$header;return a.options.height && (b = a.$tableHeader), b;
  },
      k = function k(a) {
    var b = "select, input";return a.options.height && (b = "table select, table input"), b;
  },
      l = function l(b) {
    if (a.fn.bootstrapTable.utils.isIEBrowser()) {
      if (a(b).is("input[type=text]")) {
        var c = 0;if ("selectionStart" in b) c = b.selectionStart;else if ("selection" in document) {
          b.focus();var d = document.selection.createRange(),
              e = document.selection.createRange().text.length;d.moveStart("character", -b.value.length), c = d.text.length - e;
        }return c;
      }return -1;
    }return -1;
  },
      m = function m(b) {
    a(b).val(b.value);
  },
      n = function n(b) {
    var c = j(b),
        d = k(b);b.options.valuesFilterControl = [], c.find(d).each(function () {
      b.options.valuesFilterControl.push({ field: a(this).closest("[data-field]").data("field"), value: a(this).val(), position: l(a(this).get(0)) });
    });
  },
      o = function o(b) {
    var c = null,
        d = [],
        e = j(b),
        f = k(b);b.options.valuesFilterControl.length > 0 && e.find(f).each(function () {
      c = a(this).closest("[data-field]").data("field"), d = a.grep(b.options.valuesFilterControl, function (a) {
        return a.field === c;
      }), d.length > 0 && (a(this).val(d[0].value), m(a(this).get(0), d[0].position));
    });
  },
      p = function p() {
    var b = [],
        c = document.cookie.match(/(?:bs.table.)(\w*)/g);return c ? (a.each(c, function (c, d) {
      /./.test(d) && (d = d.split(".").pop()), -1 === a.inArray(d, b) && b.push(d);
    }), b) : void 0;
  },
      q = function q(b) {
    var c = b.data,
        d = (b.pageTo < b.options.data.length ? b.options.data.length : b.pageTo, function (a) {
      return a.filterControl && "select" === a.filterControl.toLowerCase() && a.searchable;
    }),
        h = function h(a) {
      return void 0 === a.filterData || "column" === a.filterData.toLowerCase();
    },
        i = function i(a) {
      return a && a.length > 0;
    },
        j = b.options.pagination ? "server" === b.options.sidePagination ? b.pageTo : b.options.totalRows : b.pageTo;a.each(b.header.fields, function (k, l) {
      var m = b.columns[b.fieldsColumnsIndex[l]],
          n = a(".bootstrap-table-filter-control-" + r(m.field));if (d(m) && h(m) && i(n)) {
        0 === n.get(n.length - 1).options.length && f(n, "", "");for (var o = {}, p = 0; j > p; p++) {
          var q = c[p][l],
              s = a.fn.bootstrapTable.utils.calculateObjectValue(b.header, b.header.formatters[k], [q, c[p], p], q);o[s] = q;
        }for (var t in o) {
          f(n, o[t], t);
        }g(n), b.options.hideUnusedSelectOptions && e(n, o);
      }
    });
  },
      r = function r(a) {
    return String(a).replace(/(:|\.|\[|\]|,)/g, "\\$1");
  },
      s = function s(c, d) {
    var e,
        h,
        i = !1;a.each(c.columns, function (b, j) {
      if (e = "hidden", h = [], j.visible) {
        if (j.filterControl) {
          h.push('<div class="filter-control">');var k = j.filterControl.toLowerCase();j.searchable && c.options.filterTemplate[k] && (i = !0, e = "visible", h.push(c.options.filterTemplate[k](c, j.field, e, j.filterControlPlaceholder ? j.filterControlPlaceholder : "", "filter-control-" + b)));
        } else h.push('<div class="no-filter-control"></div>');if (a.each(d.children().children(), function (b, c) {
          return c = a(c), c.data("field") === j.field ? (c.find(".fht-cell").append(h.join("")), !1) : void 0;
        }), void 0 !== j.filterData && "column" !== j.filterData.toLowerCase()) {
          var l,
              m,
              n = v(u, j.filterData.substring(0, j.filterData.indexOf(":")));if (null === n) throw new SyntaxError('Error. You should use any of these allowed filter data methods: var, json, url. Use like this: var: {key: "value"}');l = j.filterData.substring(j.filterData.indexOf(":") + 1, j.filterData.length), m = a(".bootstrap-table-filter-control-" + r(j.field)), f(m, "", ""), n(l, m);var o, p;switch (n) {case "url":
              a.ajax({ url: l, dataType: "json", success: function success(a) {
                  for (var b in a) {
                    f(m, b, a[b]);
                  }g(m);
                } });break;case "var":
              o = window[l];for (p in o) {
                f(m, p, o[p]);
              }g(m);break;case "jso":
              o = JSON.parse(l);for (p in o) {
                f(m, p, o[p]);
              }g(m);}
        }
      }
    }), i ? (d.off("keyup", "input").on("keyup", "input", function (b) {
      c.options.searchOnEnterKey && 13 !== b.keyCode || a.inArray(b.keyCode, [37, 38, 39, 40]) > -1 || (clearTimeout(b.currentTarget.timeoutId || 0), b.currentTarget.timeoutId = setTimeout(function () {
        c.onColumnSearch(b);
      }, c.options.searchTimeOut));
    }), d.off("change", "select").on("change", "select", function (b) {
      c.options.searchOnEnterKey && 13 !== b.keyCode || a.inArray(b.keyCode, [37, 38, 39, 40]) > -1 || (clearTimeout(b.currentTarget.timeoutId || 0), b.currentTarget.timeoutId = setTimeout(function () {
        c.onColumnSearch(b);
      }, c.options.searchTimeOut));
    }), d.off("mouseup", "input").on("mouseup", "input", function (b) {
      var d = a(this),
          e = d.val();"" !== e && setTimeout(function () {
        var a = d.val();"" === a && (clearTimeout(b.currentTarget.timeoutId || 0), b.currentTarget.timeoutId = setTimeout(function () {
          c.onColumnSearch(b);
        }, c.options.searchTimeOut));
      }, 1);
    }), d.find(".date-filter-control").length > 0 && a.each(c.columns, function (c, e) {
      void 0 !== e.filterControl && "datepicker" === e.filterControl.toLowerCase() && d.find(".date-filter-control.bootstrap-table-filter-control-" + e.field).datepicker(e.filterDatepickerOptions).on("changeDate", function (c) {
        a(b("#%s", c.currentTarget.id)).val(c.currentTarget.value), a(c.currentTarget).keyup();
      });
    })) : d.find(".filterControl").hide();
  },
      t = function t(a) {
    switch (a = void 0 === a ? "left" : a.toLowerCase()) {case "left":
        return "ltr";case "right":
        return "rtl";case "auto":
        return "auto";default:
        return "ltr";}
  },
      u = { "var": function _var(a, b) {
      var c = window[a];for (var d in c) {
        f(b, d, c[d]);
      }g(b);
    }, url: function url(b, c) {
      a.ajax({ url: b, dataType: "json", success: function success(a) {
          for (var b in a) {
            f(c, b, a[b]);
          }g(c);
        } });
    }, json: function json(a, b) {
      var c = JSON.parse(a);for (var d in c) {
        f(b, d, c[d]);
      }g(b);
    } },
      v = function v(a, b) {
    for (var c = Object.keys(a), d = 0; d < c.length; d++) {
      if (c[d] === b) return a[b];
    }return null;
  };a.extend(a.fn.bootstrapTable.defaults, { filterControl: !1, onColumnSearch: function onColumnSearch() {
      return !1;
    }, filterShowClear: !1, alignmentSelectControlOptions: void 0, filterTemplate: { input: function input(a, c, d, e) {
        return b('<input type="text" class="form-control bootstrap-table-filter-control-%s" style="width: 100%; visibility: %s" placeholder="%s">', c, d, e);
      }, select: function select(a, c, d) {
        return b('<select class="form-control bootstrap-table-filter-control-%s" style="width: 100%; visibility: %s" dir="%s"></select>', c, d, t(a.options.alignmentSelectControlOptions));
      }, datepicker: function datepicker(a, c, d) {
        return b('<input type="text" class="form-control date-filter-control bootstrap-table-filter-control-%s" style="width: 100%; visibility: %s">', c, d);
      } }, disableControlWhenSearch: !1, searchOnEnterKey: !1, valuesFilterControl: [] }), a.extend(a.fn.bootstrapTable.columnDefaults, { filterControl: void 0, filterData: void 0, filterDatepickerOptions: void 0, filterStrictSearch: !1, filterStartsWithSearch: !1, filterControlPlaceholder: "" }), a.extend(a.fn.bootstrapTable.Constructor.EVENTS, { "column-search.bs.table": "onColumnSearch" }), a.extend(a.fn.bootstrapTable.defaults.icons, { clear: "fa-trash icon-clear" }), a.extend(a.fn.bootstrapTable.locales, { formatClearFilters: function formatClearFilters() {
      return "Clear Filters";
    } }), a.extend(a.fn.bootstrapTable.defaults, a.fn.bootstrapTable.locales), a.fn.bootstrapTable.methods.push("triggerSearch");var w = a.fn.bootstrapTable.Constructor,
      x = w.prototype.init,
      y = w.prototype.initToolbar,
      z = w.prototype.initHeader,
      A = w.prototype.initBody,
      B = w.prototype.initSearch;w.prototype.init = function () {
    if (this.options.filterControl) {
      var a = this;Object.keys || c(), this.options.valuesFilterControl = [], this.$el.on("reset-view.bs.table", function () {
        a.options.height && (a.$tableHeader.find("select").length > 0 || a.$tableHeader.find("input").length > 0 || s(a, a.$tableHeader));
      }).on("post-header.bs.table", function () {
        o(a);
      }).on("post-body.bs.table", function () {
        a.options.height && i(a);
      }).on("column-switch.bs.table", function () {
        o(a);
      }).on("load-success.bs.table", function () {
        a.EnableControls(!0);
      }).on("load-error.bs.table", function () {
        a.EnableControls(!0);
      });
    }x.apply(this, Array.prototype.slice.apply(arguments));
  }, w.prototype.initToolbar = function () {
    if (this.showToolbar = this.showToolbar || this.options.filterControl && this.options.filterShowClear, y.apply(this, Array.prototype.slice.apply(arguments)), this.options.filterControl && this.options.filterShowClear) {
      var c = this.$toolbar.find(">.btn-group"),
          d = c.find(".filter-show-clear");d.length || (d = a([b('<button class="btn btn-%s filter-show-clear" ', this.options.buttonsClass), b('type="button" title="%s">', this.options.formatClearFilters()), b('<i class="%s %s"></i> ', this.options.iconsPrefix, this.options.icons.clear), "</button>"].join("")).appendTo(c), d.off("click").on("click", a.proxy(this.clearFilterControl, this)));
    }
  }, w.prototype.initHeader = function () {
    z.apply(this, Array.prototype.slice.apply(arguments)), this.options.filterControl && s(this, this.$header);
  }, w.prototype.initBody = function () {
    A.apply(this, Array.prototype.slice.apply(arguments)), q(this);
  }, w.prototype.initSearch = function () {
    if (B.apply(this, Array.prototype.slice.apply(arguments)), "server" !== this.options.sidePagination) {
      var b = this,
          c = a.isEmptyObject(b.filterColumnsPartial) ? null : b.filterColumnsPartial;b.data = c ? a.grep(b.data, function (d, e) {
        for (var f in c) {
          var g = b.columns[b.fieldsColumnsIndex[f]],
              h = c[f].toLowerCase(),
              i = d[f];if (g && g.searchFormatter && (i = a.fn.bootstrapTable.utils.calculateObjectValue(b.header, b.header.formatters[a.inArray(f, b.header.fields)], [i, d, e], i)), -1 !== a.inArray(f, b.header.fields) && ("string" == typeof i || "number" == typeof i)) if (g.filterStrictSearch) {
            if (i.toString().toLowerCase() === h.toString().toLowerCase()) return !0;
          } else if (g.filterStartsWithSearch) {
            if (0 === (i + "").toLowerCase().indexOf(h)) return !0;
          } else if (-1 !== (i + "").toLowerCase().indexOf(h)) return !0;
        }return !1;
      }) : b.data;
    }
  }, w.prototype.initColumnSearch = function (a) {
    if (n(this), a) {
      this.filterColumnsPartial = a, this.updatePagination();for (var b in a) {
        this.trigger("column-search", b, a[b]);
      }
    }
  }, w.prototype.onColumnSearch = function (b) {
    if (!(a.inArray(b.keyCode, [37, 38, 39, 40]) > -1)) {
      n(this);var c = a.trim(a(b.currentTarget).val()),
          d = a(b.currentTarget).closest("[data-field]").data("field");a.isEmptyObject(this.filterColumnsPartial) && (this.filterColumnsPartial = {}), c ? this.filterColumnsPartial[d] = c : delete this.filterColumnsPartial[d], this.searchText += "randomText", this.options.pageNumber = 1, this.EnableControls(!1), this.onSearch(b), this.trigger("column-search", d, c);
    }
  }, w.prototype.clearFilterControl = function () {
    if (this.options.filterControl && this.options.filterShowClear) {
      var c = this,
          d = p(),
          e = j(c),
          f = e.closest("table"),
          g = e.find(k(c)),
          h = c.$toolbar.find(".search input"),
          i = 0;if (a.each(c.options.valuesFilterControl, function (a, b) {
        b.value = "";
      }), o(c), !(g.length > 0)) return;if (this.filterColumnsPartial = {}, a(g[0]).trigger("INPUT" === g[0].tagName ? "keyup" : "change"), h.length > 0 && c.resetSearch(), c.options.sortName !== f.data("sortName") || c.options.sortOrder !== f.data("sortOrder")) {
        var l = e.find(b('[data-field="%s"]', a(g[0]).closest("table").data("sortName")));l.length > 0 && (c.onSort(f.data("sortName"), f.data("sortName")), a(l).find(".sortable").trigger("click"));
      }clearTimeout(i), i = setTimeout(function () {
        d && d.length > 0 && a.each(d, function (a, b) {
          void 0 !== c.deleteCookie && c.deleteCookie(b);
        });
      }, c.options.searchTimeOut);
    }
  }, w.prototype.triggerSearch = function () {
    var b = j(this),
        c = k(this);b.find(c).each(function () {
      var b = a(this);b.is("select") ? b.change() : b.keyup();
    });
  }, w.prototype.EnableControls = function (a) {
    if (this.options.disableControlWhenSearch && "server" === this.options.sidePagination) {
      var b = j(this),
          c = k(this);a ? b.find(c).removeProp("disabled") : b.find(c).prop("disabled", "disabled");
    }
  };
}(jQuery);

/***/ }),

/***/ 535:
/***/ (function(module, exports) {

/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * extensions: https://github.com/lukaskral/bootstrap-table-filter
 */

!function ($) {

    'use strict';

    $.extend($.fn.bootstrapTable.defaults, {
        showFilter: false
    });

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _init = BootstrapTable.prototype.init,
        _initSearch = BootstrapTable.prototype.initSearch;

    BootstrapTable.prototype.init = function () {
        _init.apply(this, Array.prototype.slice.apply(arguments));

        var that = this;
        this.$el.on('load-success.bs.table', function () {
            if (that.options.showFilter) {
                $(that.options.toolbar).bootstrapTableFilter({
                    connectTo: that.$el,
                    filters: [{
                        field: 'status',
                        label: 'Status',
                        type: 'select',
                        values: [{ id: 'all', label: 'Tout' }, { id: '0', label: 'Non Traiter' }, { id: '1', label: 'Accepter' }, { id: '2', label: 'Refuser' }]
                    }], onSubmit: function onSubmit() {
                        var data = $('#filter-bar').bootstrapTableFilter('getData');
                        console.log(data);
                    }
                });
            }
        });
    };

    BootstrapTable.prototype.initSearch = function () {
        _initSearch.apply(this, Array.prototype.slice.apply(arguments));

        if (this.options.sidePagination !== 'server') {
            if (typeof this.searchCallback === 'function') {
                this.data = $.grep(this.options.data, this.searchCallback);
            }
        }
    };

    BootstrapTable.prototype.getData = function () {
        return this.searchText || this.searchCallback ? this.data : this.options.data;
    };

    BootstrapTable.prototype.getColumns = function () {
        return this.options.columns;
    };

    BootstrapTable.prototype.registerSearchCallback = function (callback) {
        this.searchCallback = callback;
    };

    BootstrapTable.prototype.updateSearch = function () {
        this.options.pageNumber = 1;
        this.initSearch();
        this.updatePagination();
    };

    BootstrapTable.prototype.getServerUrl = function () {
        return this.options.sidePagination === 'server' ? this.options.url : false;
    };

    $.fn.bootstrapTable.methods.push('getColumns', 'registerSearchCallback', 'updateSearch', 'getServerUrl');
}(jQuery);

/***/ }),

/***/ 536:
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function ($) {

    'use strict';

    // TOOLS DEFINITION
    // ======================

    var rowLabel = function rowLabel(el) {
        return (typeof el === 'undefined' ? 'undefined' : _typeof(el)) === 'object' ? el.label : el;
    };
    var rowId = function rowId(el) {
        return (typeof el === 'undefined' ? 'undefined' : _typeof(el)) === 'object' ? el.id : el;
    };
    var getOptionData = function getOptionData($option) {
        var val = false;
        var name;
        var data = {},
            cnt = 0;
        var $chck = $option.find('.filter-enabled');
        $(':input', $option).each(function () {
            var $this = $(this);
            if ($this.is($chck)) {
                return;
            }
            name = $this.attr('data-name');
            if (name) {
                data[name] = $this.val();
            }
            val = $this.val();
            cnt++;
        });
        return $.isEmptyObject(data) ? val : data;
    };

    // FILTER CLASS DEFINITION
    // ======================

    var BootstrapTableFilter = function BootstrapTableFilter(el, options) {
        this.options = options;
        this.$el = $(el);
        this.$el_ = this.$el.clone();
        this.timeoutId_ = 0;
        this.filters = {};

        this.init();
    };

    BootstrapTableFilter.DEFAULTS = {
        filters: [],
        connectTo: false,

        onAll: function onAll(name, args) {
            return false;
        },
        onFilterChanged: function onFilterChanged(data) {
            return false;
        },
        onResetView: function onResetView() {
            return false;
        },
        onAddFilter: function onAddFilter(filter) {
            return false;
        },
        onRemoveFilter: function onRemoveFilter(field) {
            return false;
        },
        onEnableFilter: function onEnableFilter(field) {
            return false;
        },
        onDisableFilter: function onDisableFilter(field) {
            return false;
        },
        onSelectFilterOption: function onSelectFilterOption(field, option, data) {
            return false;
        },
        onUnselectFilterOption: function onUnselectFilterOption(field, option) {
            return false;
        },
        onDataChanged: function onDataChanged(data) {
            return false;
        },
        onSubmit: function onSubmit(data) {
            return false;
        }
    };

    BootstrapTableFilter.EVENTS = {
        'all.bs.table.filter': 'onAll',
        'reset.bs.table.filter': 'onResetView',
        'add-filter.bs.table.filter': 'onAddFilter',
        'remove-filter.bs.table.filter': 'onRemoveFilter',
        'enable-filter.bs.table.filter': 'onEnableFilter',
        'disable-filter.bs.table.filter': 'onDisableFilter',
        'select-filter-option.bs.table.filter': 'onSelectFilterOption',
        'unselect-filter-option.bs.table.filter': 'onUnselectFilterOption',
        'data-changed.bs.table.filter': 'onDataChanged',
        'submit.bs.table.filter': 'onSubmit'
    };

    BootstrapTableFilter.FILTER_SOURCES = {
        range: {
            search: false,
            rows: [{ id: 'lte', label: 'Less than <input class="form-control" type="text">' }, { id: 'gte', label: 'More than <input class="form-control" type="text">' }, { id: 'eq', label: 'Equals <input class="form-control" type="text">' }],
            check: function check(filterData, value) {
                if (typeof filterData.lte !== 'undefined' && parseInt(value) > parseInt(filterData.lte)) {
                    return false;
                }
                if (typeof filterData.gte !== 'undefined' && parseInt(value) < parseInt(filterData.gte)) {
                    return false;
                }
                if (typeof filterData.eq !== 'undefined' && parseInt(value) != parseInt(filterData.eq)) {
                    return false;
                }
                return true;
            }
        },
        ajaxSelect: {
            search: true,
            rows: [],
            rowsCallback: function rowsCallback(filter, searchPhrase) {
                var that = this;
                $.ajax(filter.source, { dataType: 'json', data: { q: searchPhrase } }).done(function (data) {
                    that.clearFilterOptions(filter.field);
                    that.fillFilterOptions(filter.field, data);
                });
            }
        },
        select: {
            search: true,
            rows: [],
            rowsCallback: function rowsCallback(filter, searchPhrase) {
                console.log(searchPhrase);
                var vals = filter.values;
                var label;
                if (searchPhrase.length) {
                    vals = vals.filter(function (el) {
                        return rowLabel(el).indexOf(searchPhrase) > -1;
                    });
                }
                this.clearFilterOptions(filter.field);
                this.fillFilterOptions(filter.field, vals.slice(0, 20));
            }
        }
    };

    BootstrapTableFilter.EXTERNALS = [];

    BootstrapTableFilter.prototype.init = function () {
        this.initContainer();
        this.initMainButton();
        this.initFilters();
        this.initRefreshButton();
        this.initFilterSelector();
        this.initExternals();
    };

    BootstrapTableFilter.prototype.initContainer = function () {
        var that = this;
        this.$toolbar = $(['<div class="btn-toolbar">', '<div class="btn-group btn-group-filter-main">', '<button type="button" class="btn btn-default dropdown-toggle btn-filter" data-toggle="dropdown">', '<span class="glyphicon glyphicon-filter"></span>', '</button>', '<ul class="dropdown-menu" role="menu">', '</ul>', '</div>', '<div class="btn-group btn-group-filters">', '</div>', '<div class="btn-group btn-group-filter-refresh">', '<button type="button" class="btn btn-default btn-primary btn-refresh" data-toggle="dropdown">', '<span class="glyphicon glyphicon-repeat"></span>', '</button>', '</div>', '</div>'].join(''));
        this.$toolbar.appendTo(this.$el);
        this.$filters = this.$toolbar.find('.btn-group-filters');

        this.$toolbar.delegate('.btn-group-filters li', 'click', function (e) {
            e.stopImmediatePropagation();
        });

        this.$toolbar.delegate('.btn-group-filters li .filter-enabled', 'click', function (e) {
            var $chck = $(this);
            var field = $chck.closest('[data-filter-field]').attr('data-filter-field');
            var $option = $chck.closest('[data-val]');
            var option = $option.attr('data-val');
            if ($chck.prop('checked')) {
                var data = getOptionData($option);
                that.selectFilterOption(field, option, data);
            } else {
                that.unselectFilterOption(field, option);
            }
            e.stopImmediatePropagation();
        });
        this.$toolbar.delegate('.btn-group-filters li :input:not(.filter-enabled)', 'click change', function (e) {
            var $inp = $(this);
            var field = $inp.closest('[data-filter-field]').attr('data-filter-field');
            var $option = $inp.closest('[data-val]');
            var option = $option.attr('data-val');
            var $chck = $option.find('.filter-enabled');
            if ($inp.val()) {
                var data = getOptionData($option);
                that.selectFilterOption(field, option, data);
                $chck.prop('checked', true);
            } else {
                that.unselectFilterOption(field, option);
                $chck.prop('checked', false);
            }
            e.stopImmediatePropagation();
        });
        this.$toolbar.delegate('.search-values', 'keyup', function (e) {
            var $this = $(this);
            var phrase = $this.val();
            var field = $this.closest('[data-filter-field]').attr('data-filter-field');
            var filter = that.getFilter(field);
            var fType = that.getFilterType(filter);
            if (fType.rowsCallback) {
                fType.rowsCallback.call(that, filter, phrase);
            }
        });
    };

    BootstrapTableFilter.prototype.initMainButton = function () {
        this.$button = this.$toolbar.find('.btn-filter');
        this.$buttonList = this.$button.parent().find('.dropdown-menu');
        this.$button.dropdown();
    };

    BootstrapTableFilter.prototype.initRefreshButton = function () {
        var that = this;
        this.$refreshButton = this.$toolbar.find('.btn-refresh');
        this.$refreshButton.click(function (e) {
            that.trigger('submit', that.getData());
        });
    };

    BootstrapTableFilter.prototype.initFilters = function () {
        var that = this;
        this.$buttonList.append('<li class="remove-filters"><a href="javascript:void(0)"><span class="glyphicon glyphicon-remove"></span> Remove all filters</a></li>');
        this.$buttonList.append('<li class="divider"></li>');
        $.each(this.options.filters, function (i, filter) {
            that.addFilter(filter);
        });
        this.$toolbar.delegate('.remove-filters *', 'click', function () {
            $.each(that.filters, function (i, filter) {
                that.disableFilter(filter.field);
            });
        });
    };

    BootstrapTableFilter.prototype.initFilterSelector = function () {
        var that = this;
        var applyFilter = function applyFilter($chck) {
            var filterField = $chck.closest('[data-filter-field]').attr('data-filter-field');
            if ($chck.prop('checked')) {
                that.enableFilter(filterField);
            } else {
                that.disableFilter(filterField);
            }
        };
        this.$buttonList.delegate('li :input[type=checkbox]', 'click', function (e) {
            applyFilter($(this));
            e.stopImmediatePropagation();
        });
        this.$buttonList.delegate('li, li a', 'click', function (e) {
            var $chck = $(':input[type=checkbox]', this);
            if ($chck.length) {
                $chck.prop('checked', !$chck.is(':checked'));
                applyFilter($chck);
                e.stopImmediatePropagation();
            }
            var $inp = $(':input[type=text]', this);
            if ($inp.length) {
                $inp.focus();
            }
        });
    };

    BootstrapTableFilter.prototype.initExternals = function () {
        var that = this;
        $.each(BootstrapTableFilter.EXTERNALS, function (i, ext) {
            ext.call(that);
        });
    };

    BootstrapTableFilter.prototype.getFilter = function (field) {
        if (typeof this.filters[field] === 'undefined') {
            throw 'Invalid filter ' + field;
        }
        return this.filters[field];
    };
    BootstrapTableFilter.prototype.getFilterType = function (field, type) {
        if (field) {
            var filter = (typeof field === 'undefined' ? 'undefined' : _typeof(field)) === 'object' ? field : this.getFilter(field);
            type = filter.type;
        }
        if (typeof BootstrapTableFilter.FILTER_SOURCES[type] === 'undefined') {
            throw 'Invalid filter type ' + type;
        }
        var ret = BootstrapTableFilter.FILTER_SOURCES[type];
        if (typeof ret.extend !== 'undefined') {
            ret = $.extend({}, ret, this.getFilterType(null, ret.extend));
        }
        return ret;
    };
    BootstrapTableFilter.prototype.checkFilterTypeValue = function (filterType, filterData, value) {
        if (typeof filterType.check === 'function') {
            return filterType.check(filterData, value);
        } else {
            if (typeof filterData._values !== 'undefined') {
                return $.inArray(value, filterData._values) >= 0;
            }
        }
    };

    BootstrapTableFilter.prototype.clearFilterOptions = function (field) {
        var filter = this.getFilter(field);
        filter.$dropdownList.find('li:not(.static)').remove();
    };

    BootstrapTableFilter.prototype.fillFilterOptions = function (field, data, cls) {
        var that = this;
        var filter = this.getFilter(field);
        cls = cls || '';
        var option, checked;
        $.each(data, function (i, row) {
            option = rowId(row);
            checked = that.isSelected(field, option);
            filter.$dropdownList.append($('<li data-val="' + option + '" class="' + cls + '"><a href="javascript:void(0)"><input type="checkbox" class="filter-enabled"' + (checked ? ' checked' : '') + '> ' + rowLabel(row) + '</a></li>'));
        });
    };

    BootstrapTableFilter.prototype.trigger = function (name) {
        var args = Array.prototype.slice.call(arguments, 1);

        name += '.bs.table.filter';
        if (typeof BootstrapTableFilter.EVENTS[name] === 'undefined') {
            throw 'Unknown event ' + name;
        }
        this.options[BootstrapTableFilter.EVENTS[name]].apply(this.options, args);
        this.$el.trigger($.Event(name), args);

        this.options.onAll(name, args);
        this.$el.trigger($.Event('all.bs.table.filter'), [name, args]);
    };

    // PUBLIC FUNCTION DEFINITION
    // =======================

    BootstrapTableFilter.prototype.resetView = function () {
        this.$el.html();
        this.init();
        this.trigger('reset');
    };

    BootstrapTableFilter.prototype.addFilter = function (filter) {
        this.filters[filter.field] = filter;
        this.$buttonList.append('<li data-filter-field="' + filter.field + '"><a href="javascript:void(0)"><input type="checkbox"> ' + filter.label + '</a></li>');

        this.trigger('add-filter', filter);
        if (typeof filter.enabled !== 'undefined' && filter.enabled) {
            this.enableFilter(filter.field);
        }
    };

    BootstrapTableFilter.prototype.removeFilter = function (field) {
        this.disableFilter(field);
        this.$buttonList.find('[data-filter-field=' + field + ']').remove();
        this.trigger('remove-filter', field);
    };

    BootstrapTableFilter.prototype.enableFilter = function (field) {
        var filter = this.getFilter(field);
        var $filterDropdown = $(['<div class="btn-group" data-filter-field="' + field + '">', '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">', filter.label, ' <span class="caret"></span>', '</button>', '<ul class="dropdown-menu" role="menu">', '</ul>', '</div>'].join(''));
        $filterDropdown.appendTo(this.$filters);
        filter.$dropdown = $filterDropdown;
        filter.$dropdownList = $filterDropdown.find('.dropdown-menu');
        filter.enabled = true;

        this.$buttonList.find('[data-filter-field=' + field + '] input[type=checkbox]').prop('checked', true);

        var fType = this.getFilterType(filter);
        if (fType.search) {
            filter.$dropdownList.append($('<li class="static"><span><input type="text" class="form-control search-values" placeholder="Search"></span></li>'));
            filter.$dropdownList.append($('<li class="static divider"></li>'));
        }
        if (fType.rows) {
            this.fillFilterOptions(field, fType.rows, 'static');
        }
        if (fType.rowsCallback) {
            fType.rowsCallback.call(this, filter, '');
        }
        this.trigger('enable-filter', filter);
    };

    BootstrapTableFilter.prototype.disableFilter = function (field) {
        var filter = this.getFilter(field);
        this.$buttonList.find('[data-filter-field=' + field + '] input[type=checkbox]').prop('checked', false);
        filter.enabled = false;
        if (filter.$dropdown) {
            filter.$dropdown.remove();
            delete filter.$dropdown;
            this.trigger('disable-filter', filter);
        }
    };

    BootstrapTableFilter.prototype.selectFilterOption = function (field, option, data) {
        var filter = this.getFilter(field);
        if (typeof filter.selectedOptions === 'undefined') filter.selectedOptions = {};
        if (data) {
            filter.selectedOptions[option] = data;
        } else {
            if (typeof filter.selectedOptions._values === 'undefined') {
                filter.selectedOptions._values = [];
            }
            filter.selectedOptions._values.push(option);
        }
        this.trigger('select-filter-option', field, option, data);
    };

    BootstrapTableFilter.prototype.unselectFilterOption = function (field, option) {
        var filter = this.getFilter(field);
        if (typeof filter.selectedOptions !== 'undefined' && typeof filter.selectedOptions[option] !== 'undefined') {
            delete filter.selectedOptions[option];
        }
        if (typeof filter.selectedOptions !== 'undefined' && typeof filter.selectedOptions._values !== 'undefined') {
            filter.selectedOptions._values = filter.selectedOptions._values.filter(function (item) {
                return item != option;
            });
            if (filter.selectedOptions._values.length == 0) {
                delete filter.selectedOptions._values;
            }
            if ($.isEmptyObject(filter.selectedOptions)) {
                delete filter.selectedOptions;
            }
        }
        this.trigger('unselect-filter-option', field, option);
    };

    BootstrapTableFilter.prototype.isSelected = function (field, option, value) {
        var filter = this.getFilter(field);
        if (typeof filter.selectedOptions !== 'undefined') {
            if (typeof filter.selectedOptions[option] !== 'undefined') {
                if (value ? filter.selectedOptions[option] == value : filter.selectedOptions[option]) {
                    return true;
                }
            }
            if (typeof filter.selectedOptions._values !== 'undefined') {
                if (filter.selectedOptions._values.indexOf(option.toString()) > -1) {
                    return true;
                }
            }
        }
        return false;
    };

    BootstrapTableFilter.prototype.getData = function () {
        var that = this;
        var ret = {};
        $.each(that.filters, function (field, filter) {
            if (filter.enabled) {
                if (typeof filter.selectedOptions !== 'undefined') {
                    ret[field] = filter.selectedOptions;
                }
            }
        });
        return ret;
    };

    // BOOTSTRAP FILTER TABLE PLUGIN DEFINITION
    // =======================

    $.fn.bootstrapTableFilter = function (option, _relatedTarget) {
        BootstrapTableFilter.externals = this.externals;

        var allowedMethods = ['addFilter', 'removeFilter', 'enableFilter', 'disableFilter', 'selectFilterOption', 'unselectFilterOption', 'getData', 'isSelected', 'resetView'],
            value;

        this.each(function () {
            var $this = $(this),
                data = $this.data('bootstrap.tableFilter'),
                options = $.extend({}, BootstrapTableFilter.DEFAULTS, $this.data(), (typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object' && option);

            if (typeof option === 'string') {
                if ($.inArray(option, allowedMethods) < 0) {
                    throw "Unknown method: " + option;
                }

                if (!data) {
                    return;
                }

                value = data[option](_relatedTarget);

                if (option === 'destroy') {
                    $this.removeData('bootstrap.tableFilter');
                }
            }

            if (!data) {
                $this.data('bootstrap.tableFilter', data = new BootstrapTableFilter(this, options));
            }
        });

        return typeof value === 'undefined' ? this : value;
    };

    $.fn.bootstrapTableFilter.Constructor = BootstrapTableFilter;
    $.fn.bootstrapTableFilter.defaults = BootstrapTableFilter.DEFAULTS;
    $.fn.bootstrapTableFilter.columnDefaults = BootstrapTableFilter.COLUMN_DEFAULTS;
    $.fn.bootstrapTableFilter.externals = BootstrapTableFilter.EXTERNALS;

    // BOOTSTRAP TABLE FILTER INIT
    // =======================

}(jQuery);

/***/ }),

/***/ 537:
/***/ (function(module, exports) {

!function ($) {

    'use strict';

    var filterData = {};
    var bootstrapTableFilter;
    var serverUrl;

    var getTypeByValues = function getTypeByValues(vals, useAjax) {
        var typeFloat = true,
            typeInt = true;
        $.each(vals, function (i, val) {
            if (typeInt && parseInt(val) != val) {
                typeInt = false;
            }
            if (typeFloat && parseFloat(val) != val) {
                typeFloat = false;
            }
        });
        if (typeInt || typeFloat) {
            return { type: 'range' };
        }
        if (useAjax) {
            return { type: 'selectAjax', source: 'XXXXX' };
        }
        return { type: 'select' };
    };
    var getCols = function getCols(cols, data, useAjax) {
        var ret = {};
        $.each(cols, function (i, col) {
            ret[col.field] = {
                field: col.field,
                label: col.title,
                values: []
            };
        });
        $.each(data, function (i, row) {
            $.each(ret, function (field, filter) {
                if (ret[field].values.indexOf(row[field]) < 0) {
                    ret[field].values.push(row[field]);
                }
            });
        });
        $.each(ret, function (field, def) {
            ret[field] = $.extend(ret[field], getTypeByValues(def.values));
        });
        return ret;
    };
    var rowFilter = function rowFilter(item, i) {
        var filterType;
        var ret = true;
        $.each(item, function (field, value) {
            filterType = false;
            try {
                filterType = bootstrapTableFilter.getFilterType(field);
                if (filterType && typeof filterData[field] !== 'undefined') {
                    ret = ret && bootstrapTableFilter.checkFilterTypeValue(filterType, filterData[field], value);
                }
            } catch (e) {}
        });
        return ret;
    };

    $.fn.bootstrapTableFilter.externals.push(function () {
        if (this.options.connectTo) {
            bootstrapTableFilter = this;
            var $bootstrapTable = $(this.options.connectTo);
            var data = $bootstrapTable.bootstrapTable('getData');
            var cols = $bootstrapTable.bootstrapTable('getColumns');
            var dataSourceServer = false;
            var filters = getCols(cols, data, dataSourceServer);

            $.each(filters, function (field, filter) {
                bootstrapTableFilter.addFilter(filter);
            });
            serverUrl = $bootstrapTable.bootstrapTable('getServerUrl');
            if (serverUrl) {
                this.$el.on('submit.bs.table.filter', function () {
                    filterData = bootstrapTableFilter.getData();
                    var delimiter = serverUrl.indexOf('?') < 0 ? '?' : '&';
                    var url = serverUrl + delimiter + 'filter=' + encodeURIComponent(JSON.stringify(filterData));
                    $bootstrapTable.bootstrapTable('updateSearch');
                });
            } else {
                $bootstrapTable.bootstrapTable('registerSearchCallback', rowFilter);
                this.$el.on('submit.bs.table.filter', function () {
                    filterData = bootstrapTableFilter.getData();
                    $bootstrapTable.bootstrapTable('updateSearch');
                });
            }
        }
    });
}(jQuery);

/***/ }),

/***/ 538:
/***/ (function(module, exports) {

/*
* bootstrap-table - v1.12.1 - 2018-03-12
* https://github.com/wenzhixin/bootstrap-table
* Copyright (c) 2018 zhixin wen
* Licensed MIT License
*/
!function (a) {
  "use strict";
  var b = a.fn.bootstrapTable.utils.sprintf,
      c = { json: "JSON", xml: "XML", png: "PNG", csv: "CSV", txt: "TXT", sql: "SQL", doc: "MS-Word", excel: "MS-Excel", xlsx: "MS-Excel (OpenXML)", powerpoint: "MS-Powerpoint", pdf: "PDF" };a.extend(a.fn.bootstrapTable.defaults, { showExport: !1, exportDataType: "basic", exportTypes: ["json", "xml", "csv", "txt", "sql", "excel"], exportOptions: {} }), a.extend(a.fn.bootstrapTable.defaults.icons, { "export": "glyphicon-export icon-share" }), a.extend(a.fn.bootstrapTable.locales, { formatExport: function formatExport() {
      return "Export data";
    } }), a.extend(a.fn.bootstrapTable.defaults, a.fn.bootstrapTable.locales);var d = a.fn.bootstrapTable.Constructor,
      e = d.prototype.initToolbar;d.prototype.initToolbar = function () {
    if (this.showToolbar = this.showToolbar || this.options.showExport, e.apply(this, Array.prototype.slice.apply(arguments)), this.options.showExport) {
      var d = this,
          f = this.$toolbar.find(">.btn-group"),
          g = f.find("div.export");if (!g.length) {
        g = a(['<div class="export btn-group">', '<button class="btn' + b(" btn-%s", this.options.buttonsClass) + b(" btn-%s", this.options.iconSize) + ' dropdown-toggle" aria-label="export type" title="' + this.options.formatExport() + '" data-toggle="dropdown" type="button">', b('<i class="%s %s"></i> ', this.options.iconsPrefix, this.options.icons["export"]), '<span class="caret"></span>', "</button>", '<ul class="dropdown-menu" role="menu">', "</ul>", "</div>"].join("")).appendTo(f);var h = g.find(".dropdown-menu"),
            i = this.options.exportTypes;if ("string" == typeof this.options.exportTypes) {
          var j = this.options.exportTypes.slice(1, -1).replace(/ /g, "").split(",");i = [], a.each(j, function (a, b) {
            i.push(b.slice(1, -1));
          });
        }a.each(i, function (a, b) {
          c.hasOwnProperty(b) && h.append(['<li role="menuitem" data-type="' + b + '">', '<a href="javascript:void(0)">', c[b], "</a>", "</li>"].join(""));
        }), h.find("li").click(function () {
          var b = a(this).data("type"),
              c = function c() {
            if (d.options.exportFooter) {
              var c = d.getData(),
                  e = d.$tableFooter.find("tr").first(),
                  f = {},
                  g = [];a.each(e.children(), function (b, c) {
                var e = a(c).children(".th-inner").first().html();f[d.columns[b].field] = "&nbsp;" == e ? null : e, g.push(e);
              }), d.append(f);var h = d.$body.children().last();a.each(h.children(), function (b, c) {
                a(c).html(g[b]);
              });
            }d.$el.tableExport(a.extend({}, d.options.exportOptions, { type: b, escape: !1 })), d.options.exportFooter && d.load(c);
          },
              e = d.header.stateField;if ("all" === d.options.exportDataType && d.options.pagination) d.$el.one("server" === d.options.sidePagination ? "post-body.bs.table" : "page-change.bs.table", function () {
            e && d.hideColumn(e), c(), d.togglePagination();
          }), d.togglePagination();else if ("selected" === d.options.exportDataType) {
            var f = d.getData(),
                g = d.getSelections();if (!g.length) return;if ("server" === d.options.sidePagination) {
              var h = { total: d.options.totalRows };h[d.options.dataField] = f, f = h;var i = { total: g.length };i[d.options.dataField] = g, g = i;
            }d.load(g), e && d.hideColumn(e), c(), d.load(f);
          } else e && d.hideColumn(e), c();e && d.showColumn(e);
        });
      }
    }
  };
}(jQuery);

/***/ }),

/***/ 539:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by LGeoffroy on 29/09/2018.
 */
/**
 * @preserve tableExport.jquery.plugin
 *
 * Version 1.10.2
 *
 * Copyright (c) 2015-2018 hhurz, https://github.com/hhurz
 *
 * Original Work Copyright (c) 2014 Giri Raj
 *
 * Licensed under the MIT License
 **/



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function ($) {
    $.fn.tableExport = function (options) {
        var defaults = {
            csvEnclosure: '"',
            csvSeparator: ',',
            csvUseBOM: true,
            displayTableName: false,
            escape: false,
            exportHiddenCells: false, // true = speed up export of large tables with hidden cells (hidden cells will be exported !)
            fileName: 'tableExport',
            htmlContent: false,
            ignoreColumn: [],
            ignoreRow: [],
            jsonScope: 'all', // head, data, all
            jspdf: { // jsPDF / jsPDF-AutoTable related options
                orientation: 'p',
                unit: 'pt',
                format: 'a4', // One of jsPDF page formats or 'bestfit' for autmatic paper format selection
                margins: { left: 20, right: 10, top: 10, bottom: 10 },
                onDocCreated: null,
                autotable: {
                    styles: {
                        cellPadding: 2,
                        rowHeight: 12,
                        fontSize: 8,
                        fillColor: 255, // Color value or 'inherit' to use css background-color from html table
                        textColor: 50, // Color value or 'inherit' to use css color from html table
                        fontStyle: 'normal', // normal, bold, italic, bolditalic or 'inherit' to use css font-weight and fonst-style from html table
                        overflow: 'ellipsize', // visible, hidden, ellipsize or linebreak
                        halign: 'inherit', // left, center, right or 'inherit' to use css horizontal cell alignment from html table
                        valign: 'middle' // top, middle, bottom
                    },
                    headerStyles: {
                        fillColor: [52, 73, 94],
                        textColor: 255,
                        fontStyle: 'bold',
                        halign: 'inherit', // left, center, right or 'inherit' to use css horizontal header cell alignment from html table
                        valign: 'middle' // top, middle, bottom
                    },
                    alternateRowStyles: {
                        fillColor: 245
                    },
                    tableExport: {
                        doc: null, // jsPDF doc object. If set, an already created doc will be used to export to
                        onAfterAutotable: null,
                        onBeforeAutotable: null,
                        onAutotableText: null,
                        onTable: null,
                        outputImages: true
                    }
                }
            },
            mso: { // MS Excel and MS Word related options
                fileFormat: 'xlshtml', // xlshtml = Excel 2000 html format
                // xmlss = XML Spreadsheet 2003 file format (XMLSS)
                // xlsx = Excel 2007 Office Open XML format
                onMsoNumberFormat: null, // Excel 2000 html format only. See readme.md for more information about msonumberformat
                pageFormat: 'a4', // Page format used for page orientation
                pageOrientation: 'portrait', // portrait, landscape (xlshtml format only)
                rtl: false, // true = Set worksheet option 'DisplayRightToLeft'
                styles: [], // E.g. ['border-bottom', 'border-top', 'border-left', 'border-right']
                worksheetName: ''
            },
            numbers: {
                html: {
                    decimalMark: '.',
                    thousandsSeparator: ','
                },
                output: { // Use 'output: false' to keep number format in exported output
                    decimalMark: '.',
                    thousandsSeparator: ','
                }
            },
            onCellData: null,
            onCellHtmlData: null,
            onIgnoreRow: null, // onIgnoreRow($tr, rowIndex): function should return true to not export a row
            outputMode: 'file', // 'file', 'string', 'base64' or 'window' (experimental)
            pdfmake: {
                enabled: false, // true: use pdfmake instead of jspdf and jspdf-autotable (experimental)
                docDefinition: {
                    pageOrientation: 'portrait', // 'portrait' or 'landscape'
                    defaultStyle: {
                        font: 'Roboto' // Default is 'Roboto', for arabic font set this option to 'Mirza' and include mirza_fonts.js
                    }
                },
                fonts: {}
            },
            preserve: {
                leadingWS: false, // preserve leading white spaces
                trailingWS: false // preserve trailing white spaces
            },
            preventInjection: true,
            tbodySelector: 'tr',
            tfootSelector: 'tr', // Set empty ('') to prevent export of tfoot rows
            theadSelector: 'tr',
            tableName: 'Table',
            type: 'csv' // 'csv', 'tsv', 'txt', 'sql', 'json', 'xml', 'excel', 'doc', 'png' or 'pdf'
        };

        var pageFormats = { // Size in pt of various paper formats. Adopted from jsPDF.
            'a0': [2383.94, 3370.39], 'a1': [1683.78, 2383.94], 'a2': [1190.55, 1683.78],
            'a3': [841.89, 1190.55], 'a4': [595.28, 841.89], 'a5': [419.53, 595.28],
            'a6': [297.64, 419.53], 'a7': [209.76, 297.64], 'a8': [147.40, 209.76],
            'a9': [104.88, 147.40], 'a10': [73.70, 104.88],
            'b0': [2834.65, 4008.19], 'b1': [2004.09, 2834.65], 'b2': [1417.32, 2004.09],
            'b3': [1000.63, 1417.32], 'b4': [708.66, 1000.63], 'b5': [498.90, 708.66],
            'b6': [354.33, 498.90], 'b7': [249.45, 354.33], 'b8': [175.75, 249.45],
            'b9': [124.72, 175.75], 'b10': [87.87, 124.72],
            'c0': [2599.37, 3676.54],
            'c1': [1836.85, 2599.37], 'c2': [1298.27, 1836.85], 'c3': [918.43, 1298.27],
            'c4': [649.13, 918.43], 'c5': [459.21, 649.13], 'c6': [323.15, 459.21],
            'c7': [229.61, 323.15], 'c8': [161.57, 229.61], 'c9': [113.39, 161.57],
            'c10': [79.37, 113.39],
            'dl': [311.81, 623.62],
            'letter': [612, 792], 'government-letter': [576, 756], 'legal': [612, 1008],
            'junior-legal': [576, 360], 'ledger': [1224, 792], 'tabloid': [792, 1224],
            'credit-card': [153, 243]
        };
        var FONT_ROW_RATIO = 1.15;
        var el = this;
        var DownloadEvt = null;
        var $hrows = [];
        var $rows = [];
        var rowIndex = 0;
        var trData = '';
        var colNames = [];
        var ranges = [];
        var blob;
        var $hiddenTableElements = [];
        var checkCellVisibilty = false;

        $.extend(true, defaults, options);

        // Adopt deprecated options
        if (defaults.type === 'xlsx') {
            defaults.mso.fileFormat = defaults.type;
            defaults.type = 'excel';
        }
        if (typeof defaults.excelFileFormat !== 'undefined' && defaults.mso.fileFormat === 'undefined') defaults.mso.fileFormat = defaults.excelFileFormat;
        if (typeof defaults.excelPageFormat !== 'undefined' && defaults.mso.pageFormat === 'undefined') defaults.mso.pageFormat = defaults.excelPageFormat;
        if (typeof defaults.excelPageOrientation !== 'undefined' && defaults.mso.pageOrientation === 'undefined') defaults.mso.pageOrientation = defaults.excelPageOrientation;
        if (typeof defaults.excelRTL !== 'undefined' && defaults.mso.rtl === 'undefined') defaults.mso.rtl = defaults.excelRTL;
        if (typeof defaults.excelstyles !== 'undefined' && defaults.mso.styles === 'undefined') defaults.mso.styles = defaults.excelstyles;
        if (typeof defaults.onMsoNumberFormat !== 'undefined' && defaults.mso.onMsoNumberFormat === 'undefined') defaults.mso.onMsoNumberFormat = defaults.onMsoNumberFormat;
        if (typeof defaults.worksheetName !== 'undefined' && defaults.mso.worksheetName === 'undefined') defaults.mso.worksheetName = defaults.worksheetName;

        // Check values of some options
        defaults.mso.pageOrientation = defaults.mso.pageOrientation.substr(0, 1) === 'l' ? 'landscape' : 'portrait';

        colNames = GetColumnNames(el);

        if (defaults.type === 'csv' || defaults.type === 'tsv' || defaults.type === 'txt') {

            var csvData = "";
            var rowlength = 0;
            ranges = [];
            rowIndex = 0;

            var csvString = function csvString(cell, rowIndex, colIndex) {
                var result = '';

                if (cell !== null) {
                    var dataString = parseString(cell, rowIndex, colIndex);

                    var csvValue = dataString === null || dataString === '' ? '' : dataString.toString();

                    if (defaults.type === 'tsv') {
                        if (dataString instanceof Date) dataString.toLocaleString();

                        // According to http://www.iana.org/assignments/media-types/text/tab-separated-values
                        // are fields that contain tabs not allowable in tsv encoding
                        result = replaceAll(csvValue, '\t', ' ');
                    } else {
                        // Takes a string and encapsulates it (by default in double-quotes) if it
                        // contains the csv field separator, spaces, or linebreaks.
                        if (dataString instanceof Date) result = defaults.csvEnclosure + dataString.toLocaleString() + defaults.csvEnclosure;else {
                            result = preventInjection(csvValue);
                            result = replaceAll(result, defaults.csvEnclosure, defaults.csvEnclosure + defaults.csvEnclosure);

                            if (result.indexOf(defaults.csvSeparator) >= 0 || /[\r\n ]/g.test(result)) result = defaults.csvEnclosure + result + defaults.csvEnclosure;
                        }
                    }
                }

                return result;
            };

            var CollectCsvData = function CollectCsvData($rows, rowselector, length) {

                $rows.each(function () {
                    trData = "";
                    ForEachVisibleCell(this, rowselector, rowIndex, length + $rows.length, function (cell, row, col) {
                        trData += csvString(cell, row, col) + (defaults.type === 'tsv' ? '\t' : defaults.csvSeparator);
                    });
                    trData = $.trim(trData).substring(0, trData.length - 1);
                    if (trData.length > 0) {

                        if (csvData.length > 0) csvData += "\n";

                        csvData += trData;
                    }
                    rowIndex++;
                });

                return $rows.length;
            };

            rowlength += CollectCsvData($(el).find('thead').first().find(defaults.theadSelector), 'th,td', rowlength);
            findTableElements($(el), 'tbody').each(function () {
                rowlength += CollectCsvData(findTableElements($(this), defaults.tbodySelector), 'td,th', rowlength);
            });
            if (defaults.tfootSelector.length) CollectCsvData($(el).find('tfoot').first().find(defaults.tfootSelector), 'td,th', rowlength);

            csvData += "\n";

            //output
            if (defaults.outputMode === 'string') return csvData;

            if (defaults.outputMode === 'base64') return base64encode(csvData);

            if (defaults.outputMode === 'window') {
                downloadFile(false, 'data:text/' + (defaults.type === 'csv' ? 'csv' : 'plain') + ';charset=utf-8,', csvData);
                return;
            }

            try {
                blob = new Blob([csvData], { type: "text/" + (defaults.type === 'csv' ? 'csv' : 'plain') + ";charset=utf-8" });
                saveAs(blob, defaults.fileName + '.' + defaults.type, defaults.type !== 'csv' || defaults.csvUseBOM === false);
            } catch (e) {
                downloadFile(defaults.fileName + '.' + defaults.type, 'data:text/' + (defaults.type === 'csv' ? 'csv' : 'plain') + ';charset=utf-8,' + (defaults.type === 'csv' && defaults.csvUseBOM ? '\uFEFF' : ''), csvData);
            }
        } else if (defaults.type === 'sql') {

            // Header
            rowIndex = 0;
            ranges = [];
            var tdData = "INSERT INTO `" + defaults.tableName + "` (";
            $hrows = collectHeadRows($(el));
            $($hrows).each(function () {
                ForEachVisibleCell(this, 'th,td', rowIndex, $hrows.length, function (cell, row, col) {
                    tdData += "'" + parseString(cell, row, col) + "',";
                });
                rowIndex++;
                tdData = $.trim(tdData).substring(0, tdData.length - 1);
            });
            tdData += ") VALUES ";

            // Data
            $rows = collectRows($(el));
            $($rows).each(function () {
                trData = "";
                ForEachVisibleCell(this, 'td,th', rowIndex, $hrows.length + $rows.length, function (cell, row, col) {
                    trData += "'" + parseString(cell, row, col) + "',";
                });
                if (trData.length > 3) {
                    tdData += "(" + trData;
                    tdData = $.trim(tdData).substring(0, tdData.length - 1);
                    tdData += "),";
                }
                rowIndex++;
            });

            tdData = $.trim(tdData).substring(0, tdData.length - 1);
            tdData += ";";

            // Output
            if (defaults.outputMode === 'string') return tdData;

            if (defaults.outputMode === 'base64') return base64encode(tdData);

            try {
                blob = new Blob([tdData], { type: "text/plain;charset=utf-8" });
                saveAs(blob, defaults.fileName + '.sql');
            } catch (e) {
                downloadFile(defaults.fileName + '.sql', 'data:application/sql;charset=utf-8,', tdData);
            }
        } else if (defaults.type === 'json') {
            var jsonHeaderArray = [];
            ranges = [];
            $hrows = collectHeadRows($(el));
            $($hrows).each(function () {
                var jsonArrayTd = [];

                ForEachVisibleCell(this, 'th,td', rowIndex, $hrows.length, function (cell, row, col) {
                    jsonArrayTd.push(parseString(cell, row, col));
                });
                jsonHeaderArray.push(jsonArrayTd);
            });

            // Data
            var jsonArray = [];

            $rows = collectRows($(el));
            $($rows).each(function () {
                var jsonObjectTd = {};
                var colIndex = 0;

                ForEachVisibleCell(this, 'td,th', rowIndex, $hrows.length + $rows.length, function (cell, row, col) {
                    if (jsonHeaderArray.length) {
                        jsonObjectTd[jsonHeaderArray[jsonHeaderArray.length - 1][colIndex]] = parseString(cell, row, col);
                    } else {
                        jsonObjectTd[colIndex] = parseString(cell, row, col);
                    }
                    colIndex++;
                });
                if ($.isEmptyObject(jsonObjectTd) === false) jsonArray.push(jsonObjectTd);

                rowIndex++;
            });

            var sdata = "";

            if (defaults.jsonScope === 'head') sdata = JSON.stringify(jsonHeaderArray);else if (defaults.jsonScope === 'data') sdata = JSON.stringify(jsonArray);else // all
                sdata = JSON.stringify({ header: jsonHeaderArray, data: jsonArray });

            if (defaults.outputMode === 'string') return sdata;

            if (defaults.outputMode === 'base64') return base64encode(sdata);

            try {
                blob = new Blob([sdata], { type: "application/json;charset=utf-8" });
                saveAs(blob, defaults.fileName + '.json');
            } catch (e) {
                downloadFile(defaults.fileName + '.json', 'data:application/json;charset=utf-8;base64,', sdata);
            }
        } else if (defaults.type === 'xml') {
            rowIndex = 0;
            ranges = [];
            var xml = '<?xml version="1.0" encoding="utf-8"?>';
            xml += '<tabledata><fields>';

            // Header
            $hrows = collectHeadRows($(el));
            $($hrows).each(function () {

                ForEachVisibleCell(this, 'th,td', rowIndex, $hrows.length, function (cell, row, col) {
                    xml += "<field>" + parseString(cell, row, col) + "</field>";
                });
                rowIndex++;
            });
            xml += '</fields><data>';

            // Data
            var rowCount = 1;

            $rows = collectRows($(el));
            $($rows).each(function () {
                var colCount = 1;
                trData = "";
                ForEachVisibleCell(this, 'td,th', rowIndex, $hrows.length + $rows.length, function (cell, row, col) {
                    trData += "<column-" + colCount + ">" + parseString(cell, row, col) + "</column-" + colCount + ">";
                    colCount++;
                });
                if (trData.length > 0 && trData !== "<column-1></column-1>") {
                    xml += '<row id="' + rowCount + '">' + trData + '</row>';
                    rowCount++;
                }

                rowIndex++;
            });
            xml += '</data></tabledata>';

            // Output
            if (defaults.outputMode === 'string') return xml;

            if (defaults.outputMode === 'base64') return base64encode(xml);

            try {
                blob = new Blob([xml], { type: "application/xml;charset=utf-8" });
                saveAs(blob, defaults.fileName + '.xml');
            } catch (e) {
                downloadFile(defaults.fileName + '.xml', 'data:application/xml;charset=utf-8;base64,', xml);
            }
        } else if (defaults.type === 'excel' && defaults.mso.fileFormat === 'xmlss') {
            var docDatas = [];
            var docNames = [];

            $(el).filter(function () {
                return isVisible($(this));
            }).each(function () {
                var $table = $(this);

                var ssName = '';
                if (typeof defaults.mso.worksheetName === 'string' && defaults.mso.worksheetName.length) ssName = defaults.mso.worksheetName + ' ' + (docNames.length + 1);else if (typeof defaults.mso.worksheetName[docNames.length] !== 'undefined') ssName = defaults.mso.worksheetName[docNames.length];
                if (!ssName.length) ssName = $table.find('caption').text() || '';
                if (!ssName.length) ssName = 'Table ' + (docNames.length + 1);
                ssName = $.trim(ssName.replace(/[\\\/[\]*:?'"]/g, '').substring(0, 31));

                docNames.push($('<div />').text(ssName).html());

                if (defaults.exportHiddenCells === false) {
                    $hiddenTableElements = $table.find("tr, th, td").filter(":hidden");
                    checkCellVisibilty = $hiddenTableElements.length > 0;
                }

                rowIndex = 0;
                colNames = GetColumnNames(this);
                docData = '<Table>\r';

                function CollectXmlssData($rows, rowselector, length) {
                    var spans = [];

                    $($rows).each(function () {
                        var ssIndex = 0;
                        var nCols = 0;
                        trData = "";

                        ForEachVisibleCell(this, 'td,th', rowIndex, length + $rows.length, function (cell, row, col) {
                            if (cell !== null) {
                                var style = "";
                                var data = parseString(cell, row, col);
                                var type = "String";

                                if (jQuery.isNumeric(data) !== false) {
                                    type = "Number";
                                } else {
                                    var number = parsePercent(data);
                                    if (number !== false) {
                                        data = number;
                                        type = "Number";
                                        style += ' ss:StyleID="pct1"';
                                    }
                                }

                                if (type !== "Number") data = data.replace(/\n/g, '<br>');

                                var colspan = getColspan(cell);
                                var rowspan = getRowspan(cell);

                                // Skip spans
                                $.each(spans, function () {
                                    var range = this;
                                    if (rowIndex >= range.s.r && rowIndex <= range.e.r && nCols >= range.s.c && nCols <= range.e.c) {
                                        for (var i = 0; i <= range.e.c - range.s.c; ++i) {
                                            nCols++;
                                            ssIndex++;
                                        }
                                    }
                                });

                                // Handle Row Span
                                if (rowspan || colspan) {
                                    rowspan = rowspan || 1;
                                    colspan = colspan || 1;
                                    spans.push({
                                        s: { r: rowIndex, c: nCols },
                                        e: { r: rowIndex + rowspan - 1, c: nCols + colspan - 1 }
                                    });
                                }

                                // Handle Colspan
                                if (colspan > 1) {
                                    style += ' ss:MergeAcross="' + (colspan - 1) + '"';
                                    nCols += colspan - 1;
                                }

                                if (rowspan > 1) {
                                    style += ' ss:MergeDown="' + (rowspan - 1) + '" ss:StyleID="rsp1"';
                                }

                                if (ssIndex > 0) {
                                    style += ' ss:Index="' + (nCols + 1) + '"';
                                    ssIndex = 0;
                                }

                                trData += '<Cell' + style + '><Data ss:Type="' + type + '">' + $('<div />').text(data).html() + '</Data></Cell>\r';
                                nCols++;
                            }
                        });
                        if (trData.length > 0) docData += '<Row ss:AutoFitHeight="0">\r' + trData + '</Row>\r';
                        rowIndex++;
                    });

                    return $rows.length;
                }

                var rowLength = CollectXmlssData(collectHeadRows($table), 'th,td', rowLength);
                CollectXmlssData(collectRows($table), 'td,th', rowLength);

                docData += '</Table>\r';
                docDatas.push(docData);
            });

            var count = {};
            var firstOccurences = {};
            var item, itemCount;
            for (var n = 0, c = docNames.length; n < c; n++) {
                item = docNames[n];
                itemCount = count[item];
                itemCount = count[item] = itemCount == null ? 1 : itemCount + 1;

                if (itemCount === 2) docNames[firstOccurences[item]] = docNames[firstOccurences[item]].substring(0, 29) + "-1";
                if (count[item] > 1) docNames[n] = docNames[n].substring(0, 29) + "-" + count[item];else firstOccurences[item] = n;
            }

            var CreationDate = new Date().toISOString();
            var xmlssDocFile = '<?xml version="1.0" encoding="UTF-8"?>\r' + '<?mso-application progid="Excel.Sheet"?>\r' + '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"\r' + ' xmlns:o="urn:schemas-microsoft-com:office:office"\r' + ' xmlns:x="urn:schemas-microsoft-com:office:excel"\r' + ' xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"\r' + ' xmlns:html="http://www.w3.org/TR/REC-html40">\r' + '<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">\r' + '  <Created>' + CreationDate + '</Created>\r' + '</DocumentProperties>\r' + '<OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office">\r' + '  <AllowPNG/>\r' + '</OfficeDocumentSettings>\r' + '<ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">\r' + '  <WindowHeight>9000</WindowHeight>\r' + '  <WindowWidth>13860</WindowWidth>\r' + '  <WindowTopX>0</WindowTopX>\r' + '  <WindowTopY>0</WindowTopY>\r' + '  <ProtectStructure>False</ProtectStructure>\r' + '  <ProtectWindows>False</ProtectWindows>\r' + '</ExcelWorkbook>\r' + '<Styles>\r' + '  <Style ss:ID="Default" ss:Name="Normal">\r' + '    <Alignment ss:Vertical="Bottom"/>\r' + '    <Borders/>\r' + '    <Font/>\r' + '    <Interior/>\r' + '    <NumberFormat/>\r' + '    <Protection/>\r' + '  </Style>\r' + '  <Style ss:ID="rsp1">\r' + '    <Alignment ss:Vertical="Center"/>\r' + '  </Style>\r' + '  <Style ss:ID="pct1">\r' + '    <NumberFormat ss:Format="Percent"/>\r' + '  </Style>\r' + '</Styles>\r';

            for (var j = 0; j < docDatas.length; j++) {
                xmlssDocFile += '<Worksheet ss:Name="' + docNames[j] + '" ss:RightToLeft="' + (defaults.mso.rtl ? '1' : '0') + '">\r' + docDatas[j];
                if (defaults.mso.rtl) {
                    xmlssDocFile += '<WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">\r' + '<DisplayRightToLeft/>\r' + '</WorksheetOptions>\r';
                } else xmlssDocFile += '<WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel"/>\r';
                xmlssDocFile += '</Worksheet>\r';
            }

            xmlssDocFile += '</Workbook>\r';

            if (defaults.outputMode === 'string') return xmlssDocFile;

            if (defaults.outputMode === 'base64') return base64encode(xmlssDocFile);

            try {
                blob = new Blob([xmlssDocFile], { type: "application/xml;charset=utf-8" });
                saveAs(blob, defaults.fileName + '.xml');
            } catch (e) {
                downloadFile(defaults.fileName + '.xml', 'data:application/xml;charset=utf-8;base64,', xmlssDocFile);
            }
        } else if (defaults.type === 'excel' && defaults.mso.fileFormat === 'xlsx') {

            var data = [];
            var spans = [];
            rowIndex = 0;

            $rows = collectHeadRows($(el));
            $rows.push.apply($rows, collectRows($(el)));

            $($rows).each(function () {
                var cols = [];
                ForEachVisibleCell(this, 'th,td', rowIndex, $rows.length, function (cell, row, col) {
                    if (typeof cell !== 'undefined' && cell !== null) {

                        var cellValue = parseString(cell, row, col);

                        var colspan = getColspan(cell);
                        var rowspan = getRowspan(cell);

                        // Skip span ranges
                        $.each(spans, function () {
                            var range = this;
                            if (rowIndex >= range.s.r && rowIndex <= range.e.r && cols.length >= range.s.c && cols.length <= range.e.c) {
                                for (var i = 0; i <= range.e.c - range.s.c; ++i) {
                                    cols.push(null);
                                }
                            }
                        });

                        // Handle Row Span
                        if (rowspan || colspan) {
                            rowspan = rowspan || 1;
                            colspan = colspan || 1;
                            spans.push({
                                s: { r: rowIndex, c: cols.length },
                                e: { r: rowIndex + rowspan - 1, c: cols.length + colspan - 1 }
                            });
                        }

                        // Handle Value
                        if (typeof defaults.onCellData !== 'function') {

                            // Type conversion
                            if (cellValue !== "" && cellValue === +cellValue) cellValue = +cellValue;
                        }
                        cols.push(cellValue !== "" ? cellValue : null);

                        // Handle Colspan
                        if (colspan) for (var k = 0; k < colspan - 1; ++k) {
                            cols.push(null);
                        }
                    }
                });
                data.push(cols);
                rowIndex++;
            });

            //noinspection JSPotentiallyInvalidConstructorUsage
            var wb = new jx_Workbook(),
                ws = jx_createSheet(data);

            // add span ranges to worksheet
            ws['!merges'] = spans;

            // add worksheet to workbook
            //wb.SheetNames.push(defaults.mso.worksheetName);
            //wb.Sheets[defaults.mso.worksheetName] = ws;
            XLSX.utils.book_append_sheet(wb, ws, defaults.mso.worksheetName);

            var wbout = XLSX.write(wb, { type: 'binary', bookType: defaults.mso.fileFormat, bookSST: false });

            try {
                blob = new Blob([jx_s2ab(wbout)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
                saveAs(blob, defaults.fileName + '.' + defaults.mso.fileFormat);
            } catch (e) {
                downloadFile(defaults.fileName + '.' + defaults.mso.fileFormat, 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8,', jx_s2ab(wbout));
            }
        } else if (defaults.type === 'excel' || defaults.type === 'xls' || defaults.type === 'word' || defaults.type === 'doc') {

            var MSDocType = defaults.type === 'excel' || defaults.type === 'xls' ? 'excel' : 'word';
            var MSDocExt = MSDocType === 'excel' ? 'xls' : 'doc';
            var MSDocSchema = 'xmlns:x="urn:schemas-microsoft-com:office:' + MSDocType + '"';
            var docData = '';
            var docName = '';

            $(el).filter(function () {
                return isVisible($(this));
            }).each(function () {
                var $table = $(this);

                if (docName === '') {
                    docName = defaults.mso.worksheetName || $table.find('caption').text() || 'Table';
                    docName = $.trim(docName.replace(/[\\\/[\]*:?'"]/g, '').substring(0, 31));
                }

                if (defaults.exportHiddenCells === false) {
                    $hiddenTableElements = $table.find("tr, th, td").filter(":hidden");
                    checkCellVisibilty = $hiddenTableElements.length > 0;
                }

                rowIndex = 0;
                ranges = [];
                colNames = GetColumnNames(this);

                // Header
                docData += '<table><thead>';
                $hrows = collectHeadRows($table);
                $($hrows).each(function () {
                    trData = "";
                    ForEachVisibleCell(this, 'th,td', rowIndex, $hrows.length, function (cell, row, col) {
                        if (cell !== null) {
                            var thstyle = '';
                            trData += '<th';
                            for (var styles in defaults.mso.styles) {
                                if (defaults.mso.styles.hasOwnProperty(styles)) {
                                    var thcss = $(cell).css(defaults.mso.styles[styles]);
                                    if (thcss !== '' && thcss !== '0px none rgb(0, 0, 0)' && thcss !== 'rgba(0, 0, 0, 0)') {
                                        thstyle += thstyle === '' ? 'style="' : ';';
                                        thstyle += defaults.mso.styles[styles] + ':' + thcss;
                                    }
                                }
                            }
                            if (thstyle !== '') trData += ' ' + thstyle + '"';

                            var tdcolspan = getColspan(cell);
                            if (tdcolspan > 0) trData += ' colspan="' + tdcolspan + '"';

                            var tdrowspan = getRowspan(cell);
                            if (tdrowspan > 0) trData += ' rowspan="' + tdrowspan + '"';

                            trData += '>' + parseString(cell, row, col) + '</th>';
                        }
                    });
                    if (trData.length > 0) docData += '<tr>' + trData + '</tr>';
                    rowIndex++;
                });
                docData += '</thead><tbody>';

                // Data
                $rows = collectRows($table);
                $($rows).each(function () {
                    var $row = $(this);
                    trData = "";
                    ForEachVisibleCell(this, 'td,th', rowIndex, $hrows.length + $rows.length, function (cell, row, col) {
                        if (cell !== null) {
                            var tdvalue = parseString(cell, row, col);
                            var tdstyle = '';
                            var tdcss = $(cell).data("tableexport-msonumberformat");

                            if (typeof tdcss === 'undefined' && typeof defaults.mso.onMsoNumberFormat === 'function') tdcss = defaults.mso.onMsoNumberFormat(cell, row, col);

                            if (typeof tdcss !== 'undefined' && tdcss !== '') tdstyle = 'style="mso-number-format:\'' + tdcss + '\'';

                            for (var cssStyle in defaults.mso.styles) {
                                if (defaults.mso.styles.hasOwnProperty(cssStyle)) {
                                    tdcss = $(cell).css(defaults.mso.styles[cssStyle]);
                                    if (tdcss === '') tdcss = $row.css(defaults.mso.styles[cssStyle]);

                                    if (tdcss !== '' && tdcss !== '0px none rgb(0, 0, 0)' && tdcss !== 'rgba(0, 0, 0, 0)') {
                                        tdstyle += tdstyle === '' ? 'style="' : ';';
                                        tdstyle += defaults.mso.styles[cssStyle] + ':' + tdcss;
                                    }
                                }
                            }
                            trData += '<td';
                            if (tdstyle !== '') trData += ' ' + tdstyle + '"';

                            var tdcolspan = getColspan(cell);
                            if (tdcolspan > 0) trData += ' colspan="' + tdcolspan + '"';

                            var tdrowspan = getRowspan(cell);
                            if (tdrowspan > 0) trData += ' rowspan="' + tdrowspan + '"';

                            if (typeof tdvalue === 'string' && tdvalue !== '') {
                                tdvalue = preventInjection(tdvalue);
                                tdvalue = tdvalue.replace(/\n/g, '<br>');
                            }

                            trData += '>' + tdvalue + '</td>';
                        }
                    });
                    if (trData.length > 0) docData += '<tr>' + trData + '</tr>';
                    rowIndex++;
                });

                if (defaults.displayTableName) docData += '<tr><td></td></tr><tr><td></td></tr><tr><td>' + parseString($('<p>' + defaults.tableName + '</p>')) + '</td></tr>';

                docData += '</tbody></table>';
            });

            //noinspection XmlUnusedNamespaceDeclaration
            var docFile = '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' + MSDocSchema + ' xmlns="http://www.w3.org/TR/REC-html40">';
            docFile += '<meta http-equiv="content-type" content="application/vnd.ms-' + MSDocType + '; charset=UTF-8">';
            docFile += "<head>";
            if (MSDocType === 'excel') {
                docFile += "<!--[if gte mso 9]>";
                docFile += "<xml>";
                docFile += "<x:ExcelWorkbook>";
                docFile += "<x:ExcelWorksheets>";
                docFile += "<x:ExcelWorksheet>";
                docFile += "<x:Name>";
                docFile += docName;
                docFile += "</x:Name>";
                docFile += "<x:WorksheetOptions>";
                docFile += "<x:DisplayGridlines/>";
                if (defaults.mso.rtl) docFile += "<x:DisplayRightToLeft/>";
                docFile += "</x:WorksheetOptions>";
                docFile += "</x:ExcelWorksheet>";
                docFile += "</x:ExcelWorksheets>";
                docFile += "</x:ExcelWorkbook>";
                docFile += "</xml>";
                docFile += "<![endif]-->";
            }
            docFile += "<style>";

            docFile += "@page { size:" + defaults.mso.pageOrientation + "; mso-page-orientation:" + defaults.mso.pageOrientation + "; }";
            docFile += "@page Section1 {size:" + pageFormats[defaults.mso.pageFormat][0] + "pt " + pageFormats[defaults.mso.pageFormat][1] + "pt";
            docFile += "; margin:1.0in 1.25in 1.0in 1.25in;mso-header-margin:.5in;mso-footer-margin:.5in;mso-paper-source:0;}";
            docFile += "div.Section1 {page:Section1;}";
            docFile += "@page Section2 {size:" + pageFormats[defaults.mso.pageFormat][1] + "pt " + pageFormats[defaults.mso.pageFormat][0] + "pt";
            docFile += ";mso-page-orientation:" + defaults.mso.pageOrientation + ";margin:1.25in 1.0in 1.25in 1.0in;mso-header-margin:.5in;mso-footer-margin:.5in;mso-paper-source:0;}";
            docFile += "div.Section2 {page:Section2;}";

            docFile += "br {mso-data-placement:same-cell;}";
            docFile += "</style>";
            docFile += "</head>";
            docFile += "<body>";
            docFile += "<div class=\"Section" + (defaults.mso.pageOrientation === 'landscape' ? "2" : "1") + "\">";
            docFile += docData;
            docFile += "</div>";
            docFile += "</body>";
            docFile += "</html>";

            if (defaults.outputMode === 'string') return docFile;

            if (defaults.outputMode === 'base64') return base64encode(docFile);

            try {
                blob = new Blob([docFile], { type: 'application/vnd.ms-' + defaults.type });
                saveAs(blob, defaults.fileName + '.' + MSDocExt);
            } catch (e) {
                downloadFile(defaults.fileName + '.' + MSDocExt, 'data:application/vnd.ms-' + MSDocType + ';base64,', docFile);
            }
        } else if (defaults.type === 'png') {
            //html2canvas($(el)[0], {
            //  onrendered: function (canvas) {
            html2canvas($(el)[0]).then(function (canvas) {

                var image = canvas.toDataURL();
                var byteString = atob(image.substring(22)); // remove data stuff
                var buffer = new ArrayBuffer(byteString.length);
                var intArray = new Uint8Array(buffer);

                for (var i = 0; i < byteString.length; i++) {
                    intArray[i] = byteString.charCodeAt(i);
                }if (defaults.outputMode === 'string') return byteString;

                if (defaults.outputMode === 'base64') return base64encode(image);

                if (defaults.outputMode === 'window') {
                    window.open(image);
                    return;
                }

                try {
                    blob = new Blob([buffer], { type: "image/png" });
                    saveAs(blob, defaults.fileName + '.png');
                } catch (e) {
                    downloadFile(defaults.fileName + '.png', 'data:image/png,', blob);
                }
                //}
            });
        } else if (defaults.type === 'pdf') {

            if (defaults.pdfmake.enabled === true) {
                // pdf output using pdfmake
                // https://github.com/bpampuch/pdfmake

                var widths = [];
                var body = [];
                rowIndex = 0;
                ranges = [];

                /**
                 * @return {number}
                 */
                var CollectPdfmakeData = function CollectPdfmakeData($rows, colselector, length) {
                    var rlength = 0;

                    $($rows).each(function () {
                        var r = [];

                        ForEachVisibleCell(this, colselector, rowIndex, length, function (cell, row, col) {
                            if (typeof cell !== 'undefined' && cell !== null) {

                                var colspan = getColspan(cell);
                                var rowspan = getRowspan(cell);

                                var cellValue = parseString(cell, row, col) || " ";

                                if (colspan > 1 || rowspan > 1) {
                                    colspan = colspan || 1;
                                    rowspan = rowspan || 1;
                                    r.push({ colSpan: colspan, rowSpan: rowspan, text: cellValue });
                                } else r.push(cellValue);
                            } else r.push(" ");
                        });

                        if (r.length) body.push(r);

                        if (rlength < r.length) rlength = r.length;

                        rowIndex++;
                    });

                    return rlength;
                };

                $hrows = collectHeadRows($(this));

                var colcount = CollectPdfmakeData($hrows, 'th,td', $hrows.length);

                for (var i = widths.length; i < colcount; i++) {
                    widths.push("*");
                } // Data
                $rows = collectRows($(this));

                CollectPdfmakeData($rows, 'th,td', $hrows.length + $rows.length);

                var docDefinition = {
                    content: [{
                        table: {
                            headerRows: $hrows.length,
                            widths: widths,
                            body: body
                        }
                    }]
                };

                $.extend(true, docDefinition, defaults.pdfmake.docDefinition);

                pdfMake.fonts = {
                    Roboto: {
                        normal: 'Roboto-Regular.ttf',
                        bold: 'Roboto-Medium.ttf',
                        italics: 'Roboto-Italic.ttf',
                        bolditalics: 'Roboto-MediumItalic.ttf'
                    }
                };

                $.extend(true, pdfMake.fonts, defaults.pdfmake.fonts);

                pdfMake.createPdf(docDefinition).getBuffer(function (buffer) {

                    try {
                        var blob = new Blob([buffer], { type: "application/pdf" });
                        saveAs(blob, defaults.fileName + '.pdf');
                    } catch (e) {
                        downloadFile(defaults.fileName + '.pdf', 'application/pdf', buffer);
                    }
                });
            } else if (defaults.jspdf.autotable === false) {
                // pdf output using jsPDF's core html support

                var addHtmlOptions = {
                    dim: {
                        w: getPropertyUnitValue($(el).first().get(0), 'width', 'mm'),
                        h: getPropertyUnitValue($(el).first().get(0), 'height', 'mm')
                    },
                    pagesplit: false
                };

                var doc = new jsPDF(defaults.jspdf.orientation, defaults.jspdf.unit, defaults.jspdf.format);
                doc.addHTML($(el).first(), defaults.jspdf.margins.left, defaults.jspdf.margins.top, addHtmlOptions, function () {
                    jsPdfOutput(doc, false);
                });
                //delete doc;
            } else {
                // pdf output using jsPDF AutoTable plugin
                // https://github.com/simonbengtsson/jsPDF-AutoTable

                var teOptions = defaults.jspdf.autotable.tableExport;

                // When setting jspdf.format to 'bestfit' tableExport tries to choose
                // the minimum required paper format and orientation in which the table
                // (or tables in multitable mode) completely fits without column adjustment
                if (typeof defaults.jspdf.format === 'string' && defaults.jspdf.format.toLowerCase() === 'bestfit') {
                    var rk = '',
                        ro = '';
                    var mw = 0;

                    $(el).each(function () {
                        if (isVisible($(this))) {
                            var w = getPropertyUnitValue($(this).get(0), 'width', 'pt');

                            if (w > mw) {
                                if (w > pageFormats.a0[0]) {
                                    rk = 'a0';
                                    ro = 'l';
                                }
                                for (var key in pageFormats) {
                                    if (pageFormats.hasOwnProperty(key)) {
                                        if (pageFormats[key][1] > w) {
                                            rk = key;
                                            ro = 'l';
                                            if (pageFormats[key][0] > w) ro = 'p';
                                        }
                                    }
                                }
                                mw = w;
                            }
                        }
                    });
                    defaults.jspdf.format = rk === '' ? 'a4' : rk;
                    defaults.jspdf.orientation = ro === '' ? 'w' : ro;
                }

                // The jsPDF doc object is stored in defaults.jspdf.autotable.tableExport,
                // thus it can be accessed from any callback function
                if (teOptions.doc == null) {
                    teOptions.doc = new jsPDF(defaults.jspdf.orientation, defaults.jspdf.unit, defaults.jspdf.format);
                    teOptions.wScaleFactor = 1;
                    teOptions.hScaleFactor = 1;

                    if (typeof defaults.jspdf.onDocCreated === 'function') defaults.jspdf.onDocCreated(teOptions.doc);
                }

                if (teOptions.outputImages === true) teOptions.images = {};

                if (typeof teOptions.images !== 'undefined') {
                    $(el).filter(function () {
                        return isVisible($(this));
                    }).each(function () {
                        var rowCount = 0;
                        ranges = [];

                        if (defaults.exportHiddenCells === false) {
                            $hiddenTableElements = $(this).find("tr, th, td").filter(":hidden");
                            checkCellVisibilty = $hiddenTableElements.length > 0;
                        }

                        $hrows = collectHeadRows($(this));
                        $rows = collectRows($(this));

                        $($rows).each(function () {
                            ForEachVisibleCell(this, 'td,th', $hrows.length + rowCount, $hrows.length + $rows.length, function (cell) {
                                collectImages(cell, $(cell).children(), teOptions);
                            });
                            rowCount++;
                        });
                    });

                    $hrows = [];
                    $rows = [];
                }

                loadImages(teOptions, function () {
                    $(el).filter(function () {
                        return isVisible($(this));
                    }).each(function () {
                        var colKey;
                        rowIndex = 0;
                        ranges = [];

                        if (defaults.exportHiddenCells === false) {
                            $hiddenTableElements = $(this).find("tr, th, td").filter(":hidden");
                            checkCellVisibilty = $hiddenTableElements.length > 0;
                        }

                        colNames = GetColumnNames(this);

                        teOptions.columns = [];
                        teOptions.rows = [];
                        teOptions.teCells = {};

                        // onTable: optional callback function for every matching table that can be used
                        // to modify the tableExport options or to skip the output of a particular table
                        // if the table selector targets multiple tables
                        if (typeof teOptions.onTable === 'function') if (teOptions.onTable($(this), defaults) === false) return true; // continue to next iteration step (table)

                        // each table works with an own copy of AutoTable options
                        defaults.jspdf.autotable.tableExport = null; // avoid deep recursion error
                        var atOptions = $.extend(true, {}, defaults.jspdf.autotable);
                        defaults.jspdf.autotable.tableExport = teOptions;

                        atOptions.margin = {};
                        $.extend(true, atOptions.margin, defaults.jspdf.margins);
                        atOptions.tableExport = teOptions;

                        // Fix jsPDF Autotable's row height calculation
                        if (typeof atOptions.beforePageContent !== 'function') {
                            atOptions.beforePageContent = function (data) {
                                if (data.pageCount === 1) {
                                    var all = data.table.rows.concat(data.table.headerRow);
                                    $.each(all, function () {
                                        var row = this;
                                        if (row.height > 0) {
                                            row.height += (2 - FONT_ROW_RATIO) / 2 * row.styles.fontSize;
                                            data.table.height += (2 - FONT_ROW_RATIO) / 2 * row.styles.fontSize;
                                        }
                                    });
                                }
                            };
                        }

                        if (typeof atOptions.createdHeaderCell !== 'function') {
                            // apply some original css styles to pdf header cells
                            atOptions.createdHeaderCell = function (cell, data) {

                                // jsPDF AutoTable plugin v2.0.14 fix: each cell needs its own styles object
                                cell.styles = $.extend({}, data.row.styles);

                                if (typeof teOptions.columns[data.column.dataKey] !== 'undefined') {
                                    var col = teOptions.columns[data.column.dataKey];

                                    if (typeof col.rect !== 'undefined') {
                                        var rh;

                                        cell.contentWidth = col.rect.width;

                                        if (typeof teOptions.heightRatio === 'undefined' || teOptions.heightRatio === 0) {
                                            if (data.row.raw[data.column.dataKey].rowspan) rh = data.row.raw[data.column.dataKey].rect.height / data.row.raw[data.column.dataKey].rowspan;else rh = data.row.raw[data.column.dataKey].rect.height;

                                            teOptions.heightRatio = cell.styles.rowHeight / rh;
                                        }

                                        rh = data.row.raw[data.column.dataKey].rect.height * teOptions.heightRatio;
                                        if (rh > cell.styles.rowHeight) cell.styles.rowHeight = rh;
                                    }

                                    cell.styles.halign = atOptions.headerStyles.halign === 'inherit' ? 'center' : atOptions.headerStyles.halign;
                                    cell.styles.valign = atOptions.headerStyles.valign;

                                    if (typeof col.style !== 'undefined' && col.style.hidden !== true) {
                                        if (atOptions.headerStyles.halign === 'inherit') cell.styles.halign = col.style.align;
                                        if (atOptions.styles.fillColor === 'inherit') cell.styles.fillColor = col.style.bcolor;
                                        if (atOptions.styles.textColor === 'inherit') cell.styles.textColor = col.style.color;
                                        if (atOptions.styles.fontStyle === 'inherit') cell.styles.fontStyle = col.style.fstyle;
                                    }
                                }
                            };
                        }

                        if (typeof atOptions.createdCell !== 'function') {
                            // apply some original css styles to pdf table cells
                            atOptions.createdCell = function (cell, data) {
                                var tecell = teOptions.teCells[data.row.index + ":" + data.column.dataKey];

                                cell.styles.halign = atOptions.styles.halign === 'inherit' ? 'center' : atOptions.styles.halign;
                                cell.styles.valign = atOptions.styles.valign;

                                if (typeof tecell !== 'undefined' && typeof tecell.style !== 'undefined' && tecell.style.hidden !== true) {
                                    if (atOptions.styles.halign === 'inherit') cell.styles.halign = tecell.style.align;
                                    if (atOptions.styles.fillColor === 'inherit') cell.styles.fillColor = tecell.style.bcolor;
                                    if (atOptions.styles.textColor === 'inherit') cell.styles.textColor = tecell.style.color;
                                    if (atOptions.styles.fontStyle === 'inherit') cell.styles.fontStyle = tecell.style.fstyle;
                                }
                            };
                        }

                        if (typeof atOptions.drawHeaderCell !== 'function') {
                            atOptions.drawHeaderCell = function (cell, data) {
                                var colopt = teOptions.columns[data.column.dataKey];

                                if ((colopt.style.hasOwnProperty("hidden") !== true || colopt.style.hidden !== true) && colopt.rowIndex >= 0) return prepareAutoTableText(cell, data, colopt);else return false; // cell is hidden
                            };
                        }

                        if (typeof atOptions.drawCell !== 'function') {
                            atOptions.drawCell = function (cell, data) {
                                var tecell = teOptions.teCells[data.row.index + ":" + data.column.dataKey];
                                var draw2canvas = typeof tecell !== 'undefined' && tecell.isCanvas;

                                if (draw2canvas !== true) {
                                    if (prepareAutoTableText(cell, data, tecell)) {

                                        teOptions.doc.rect(cell.x, cell.y, cell.width, cell.height, cell.styles.fillStyle);

                                        if (typeof tecell !== 'undefined' && typeof tecell.elements !== 'undefined' && tecell.elements.length) {

                                            var hScale = cell.height / tecell.rect.height;
                                            if (hScale > teOptions.hScaleFactor) teOptions.hScaleFactor = hScale;
                                            teOptions.wScaleFactor = cell.width / tecell.rect.width;

                                            var ySave = cell.textPos.y;
                                            drawAutotableElements(cell, tecell.elements, teOptions);
                                            cell.textPos.y = ySave;

                                            drawAutotableText(cell, tecell.elements, teOptions);
                                        } else drawAutotableText(cell, {}, teOptions);
                                    }
                                } else {
                                    var container = tecell.elements[0];
                                    var imgId = $(container).attr("data-tableexport-canvas");
                                    var r = container.getBoundingClientRect();

                                    cell.width = r.width * teOptions.wScaleFactor;
                                    cell.height = r.height * teOptions.hScaleFactor;
                                    data.row.height = cell.height;

                                    jsPdfDrawImage(cell, container, imgId, teOptions);
                                }
                                return false;
                            };
                        }

                        // collect header and data rows
                        teOptions.headerrows = [];
                        $hrows = collectHeadRows($(this));
                        $($hrows).each(function () {
                            colKey = 0;
                            teOptions.headerrows[rowIndex] = [];

                            ForEachVisibleCell(this, 'th,td', rowIndex, $hrows.length, function (cell, row, col) {
                                var obj = getCellStyles(cell);
                                obj.title = parseString(cell, row, col);
                                obj.key = colKey++;
                                obj.rowIndex = rowIndex;
                                teOptions.headerrows[rowIndex].push(obj);
                            });
                            rowIndex++;
                        });

                        if (rowIndex > 0) {
                            // iterate through last row
                            var lastrow = rowIndex - 1;
                            while (lastrow >= 0) {
                                $.each(teOptions.headerrows[lastrow], function () {
                                    var obj = this;

                                    if (lastrow > 0 && this.rect === null) obj = teOptions.headerrows[lastrow - 1][this.key];

                                    if (obj !== null && obj.rowIndex >= 0 && (obj.style.hasOwnProperty("hidden") !== true || obj.style.hidden !== true)) teOptions.columns.push(obj);
                                });

                                lastrow = teOptions.columns.length > 0 ? -1 : lastrow - 1;
                            }
                        }

                        var rowCount = 0;
                        $rows = [];
                        $rows = collectRows($(this));
                        $($rows).each(function () {
                            var rowData = [];
                            colKey = 0;

                            ForEachVisibleCell(this, 'td,th', rowIndex, $hrows.length + $rows.length, function (cell, row, col) {
                                var obj;

                                if (typeof teOptions.columns[colKey] === 'undefined') {
                                    // jsPDF-Autotable needs columns. Thus define hidden ones for tables without thead
                                    obj = {
                                        title: '',
                                        key: colKey,
                                        style: {
                                            hidden: true
                                        }
                                    };
                                    teOptions.columns.push(obj);
                                }
                                if (typeof cell !== 'undefined' && cell !== null) {
                                    obj = getCellStyles(cell);
                                    obj.isCanvas = cell.hasAttribute("data-tableexport-canvas");
                                    obj.elements = obj.isCanvas ? $(cell) : $(cell).children();
                                    teOptions.teCells[rowCount + ":" + colKey++] = obj;
                                } else {
                                    obj = $.extend(true, {}, teOptions.teCells[rowCount + ":" + (colKey - 1)]);
                                    obj.colspan = -1;
                                    teOptions.teCells[rowCount + ":" + colKey++] = obj;
                                }

                                rowData.push(parseString(cell, row, col));
                            });
                            if (rowData.length) {
                                teOptions.rows.push(rowData);
                                rowCount++;
                            }
                            rowIndex++;
                        });

                        // onBeforeAutotable: optional callback function before calling
                        // jsPDF AutoTable that can be used to modify the AutoTable options
                        if (typeof teOptions.onBeforeAutotable === 'function') teOptions.onBeforeAutotable($(this), teOptions.columns, teOptions.rows, atOptions);

                        teOptions.doc.autoTable(teOptions.columns, teOptions.rows, atOptions);

                        // onAfterAutotable: optional callback function after returning
                        // from jsPDF AutoTable that can be used to modify the AutoTable options
                        if (typeof teOptions.onAfterAutotable === 'function') teOptions.onAfterAutotable($(this), atOptions);

                        // set the start position for the next table (in case there is one)
                        defaults.jspdf.autotable.startY = teOptions.doc.autoTableEndPosY() + atOptions.margin.top;
                    });

                    jsPdfOutput(teOptions.doc, typeof teOptions.images !== 'undefined' && jQuery.isEmptyObject(teOptions.images) === false);

                    if (typeof teOptions.headerrows !== 'undefined') teOptions.headerrows.length = 0;
                    if (typeof teOptions.columns !== 'undefined') teOptions.columns.length = 0;
                    if (typeof teOptions.rows !== 'undefined') teOptions.rows.length = 0;
                    delete teOptions.doc;
                    teOptions.doc = null;
                });
            }
        }

        function collectHeadRows($table) {
            var result = [];
            findTableElements($table, 'thead').each(function () {
                result.push.apply(result, findTableElements($(this), defaults.theadSelector).toArray());
            });
            return result;
        }

        function collectRows($table) {
            var result = [];
            findTableElements($table, 'tbody').each(function () {
                result.push.apply(result, findTableElements($(this), defaults.tbodySelector).toArray());
            });
            if (defaults.tfootSelector.length) {
                findTableElements($table, 'tfoot').each(function () {
                    result.push.apply(result, findTableElements($(this), defaults.tfootSelector).toArray());
                });
            }
            return result;
        }

        function findTableElements($parent, selector) {
            var parentSelector = $parent[0].tagName;
            var parentLevel = $parent.parents(parentSelector).length;
            return $parent.find(selector).filter(function () {
                return parentLevel === $(this).closest(parentSelector).parents(parentSelector).length;
            });
        }

        function GetColumnNames(table) {
            var result = [];
            $(table).find('thead').first().find('th').each(function (index, el) {
                if ($(el).attr("data-field") !== undefined) result[index] = $(el).attr("data-field");else result[index] = index.toString();
            });
            return result;
        }

        function isVisible($element) {
            var isCell = typeof $element[0].cellIndex !== 'undefined';
            var isRow = typeof $element[0].rowIndex !== 'undefined';
            var isElementVisible = isCell || isRow ? isTableElementVisible($element) : $element.is(':visible');
            var tableexportDisplay = $element.data("tableexport-display");

            if (isCell && tableexportDisplay !== 'none' && tableexportDisplay !== 'always') {
                $element = $($element[0].parentNode);
                isRow = typeof $element[0].rowIndex !== 'undefined';
                tableexportDisplay = $element.data("tableexport-display");
            }
            if (isRow && tableexportDisplay !== 'none' && tableexportDisplay !== 'always') {
                tableexportDisplay = $element.closest('table').data("tableexport-display");
            }

            return tableexportDisplay !== 'none' && (isElementVisible === true || tableexportDisplay === 'always');
        }

        function isTableElementVisible($element) {
            var hiddenEls = [];

            if (checkCellVisibilty) {
                hiddenEls = $hiddenTableElements.filter(function () {
                    var found = false;

                    if (this.nodeType === $element[0].nodeType) {
                        if (typeof this.rowIndex !== 'undefined' && this.rowIndex === $element[0].rowIndex) found = true;else if (typeof this.cellIndex !== 'undefined' && this.cellIndex === $element[0].cellIndex && typeof this.parentNode.rowIndex !== 'undefined' && typeof $element[0].parentNode.rowIndex !== 'undefined' && this.parentNode.rowIndex === $element[0].parentNode.rowIndex) found = true;
                    }
                    return found;
                });
            }
            return checkCellVisibilty === false || hiddenEls.length === 0;
        }

        function isColumnIgnored($cell, rowLength, colIndex) {
            var result = false;

            if (isVisible($cell)) {
                if (defaults.ignoreColumn.length > 0) {
                    if ($.inArray(colIndex, defaults.ignoreColumn) !== -1 || $.inArray(colIndex - rowLength, defaults.ignoreColumn) !== -1 || colNames.length > colIndex && typeof colNames[colIndex] !== 'undefined' && $.inArray(colNames[colIndex], defaults.ignoreColumn) !== -1) result = true;
                }
            } else result = true;

            return result;
        }

        function ForEachVisibleCell(tableRow, selector, rowIndex, rowCount, cellcallback) {
            if (typeof cellcallback === 'function') {
                var ignoreRow = false;

                if (typeof defaults.onIgnoreRow === 'function') ignoreRow = defaults.onIgnoreRow($(tableRow), rowIndex);

                if (ignoreRow === false && $.inArray(rowIndex, defaults.ignoreRow) === -1 && $.inArray(rowIndex - rowCount, defaults.ignoreRow) === -1 && isVisible($(tableRow))) {

                    var $cells = findTableElements($(tableRow), selector);
                    var cellCount = 0;

                    $cells.each(function (colIndex) {
                        var $cell = $(this);
                        var c;
                        var colspan = getColspan(this);
                        var rowspan = getRowspan(this);

                        // Skip ranges
                        $.each(ranges, function () {
                            var range = this;
                            if (rowIndex >= range.s.r && rowIndex <= range.e.r && cellCount >= range.s.c && cellCount <= range.e.c) {
                                for (c = 0; c <= range.e.c - range.s.c; ++c) {
                                    cellcallback(null, rowIndex, cellCount++);
                                }
                            }
                        });

                        if (isColumnIgnored($cell, $cells.length, colIndex) === false) {
                            // Handle Row Span
                            if (rowspan || colspan) {
                                rowspan = rowspan || 1;
                                colspan = colspan || 1;
                                ranges.push({
                                    s: { r: rowIndex, c: cellCount },
                                    e: { r: rowIndex + rowspan - 1, c: cellCount + colspan - 1 }
                                });
                            }

                            // Handle Value
                            cellcallback(this, rowIndex, cellCount++);
                        }

                        // Handle Colspan
                        if (colspan) for (c = 0; c < colspan - 1; ++c) {
                            cellcallback(null, rowIndex, cellCount++);
                        }
                    });

                    // Skip ranges
                    $.each(ranges, function () {
                        var range = this;
                        if (rowIndex >= range.s.r && rowIndex <= range.e.r && cellCount >= range.s.c && cellCount <= range.e.c) {
                            for (c = 0; c <= range.e.c - range.s.c; ++c) {
                                cellcallback(null, rowIndex, cellCount++);
                            }
                        }
                    });
                }
            }
        }

        function jsPdfDrawImage(cell, container, imgId, teOptions) {
            if (typeof teOptions.images !== 'undefined') {
                var image = teOptions.images[imgId];

                if (typeof image !== 'undefined') {
                    var r = container.getBoundingClientRect();
                    var arCell = cell.width / cell.height;
                    var arImg = r.width / r.height;
                    var imgWidth = cell.width;
                    var imgHeight = cell.height;
                    var px2pt = 0.264583 * 72 / 25.4;
                    var uy = 0;

                    if (arImg <= arCell) {
                        imgHeight = Math.min(cell.height, r.height);
                        imgWidth = r.width * imgHeight / r.height;
                    } else if (arImg > arCell) {
                        imgWidth = Math.min(cell.width, r.width);
                        imgHeight = r.height * imgWidth / r.width;
                    }

                    imgWidth *= px2pt;
                    imgHeight *= px2pt;

                    if (imgHeight < cell.height) uy = (cell.height - imgHeight) / 2;

                    try {
                        teOptions.doc.addImage(image.src, cell.textPos.x, cell.y + uy, imgWidth, imgHeight);
                    } catch (e) {
                        // TODO: IE -> convert png to jpeg
                    }
                    cell.textPos.x += imgWidth;
                }
            }
        }

        function jsPdfOutput(doc, hasimages) {
            if (defaults.outputMode === 'string') return doc.output();

            if (defaults.outputMode === 'base64') return base64encode(doc.output());

            if (defaults.outputMode === 'window') {
                window.URL = window.URL || window.webkitURL;
                window.open(window.URL.createObjectURL(doc.output("blob")));
                return;
            }

            try {
                var blob = doc.output('blob');
                saveAs(blob, defaults.fileName + '.pdf');
            } catch (e) {
                downloadFile(defaults.fileName + '.pdf', 'data:application/pdf' + (hasimages ? '' : ';base64') + ',', hasimages ? doc.output('blob') : doc.output());
            }
        }

        function prepareAutoTableText(cell, data, cellopt) {
            var cs = 0;
            if (typeof cellopt !== 'undefined') cs = cellopt.colspan;

            if (cs >= 0) {
                // colspan handling
                var cellWidth = cell.width;
                var textPosX = cell.textPos.x;
                var i = data.table.columns.indexOf(data.column);

                for (var c = 1; c < cs; c++) {
                    var column = data.table.columns[i + c];
                    cellWidth += column.width;
                }

                if (cs > 1) {
                    if (cell.styles.halign === 'right') textPosX = cell.textPos.x + cellWidth - cell.width;else if (cell.styles.halign === 'center') textPosX = cell.textPos.x + (cellWidth - cell.width) / 2;
                }

                cell.width = cellWidth;
                cell.textPos.x = textPosX;

                if (typeof cellopt !== 'undefined' && cellopt.rowspan > 1) cell.height = cell.height * cellopt.rowspan;

                // fix jsPDF's calculation of text position
                if (cell.styles.valign === 'middle' || cell.styles.valign === 'bottom') {
                    var splittedText = typeof cell.text === 'string' ? cell.text.split(/\r\n|\r|\n/g) : cell.text;
                    var lineCount = splittedText.length || 1;
                    if (lineCount > 2) cell.textPos.y -= (2 - FONT_ROW_RATIO) / 2 * data.row.styles.fontSize * (lineCount - 2) / 3;
                }
                return true;
            } else return false; // cell is hidden (colspan = -1), don't draw it
        }

        function collectImages(cell, elements, teOptions) {
            if (typeof cell !== 'undefined' && cell !== null) {

                if (cell.hasAttribute("data-tableexport-canvas")) {
                    var imgId = new Date().getTime();
                    $(cell).attr("data-tableexport-canvas", imgId);

                    teOptions.images[imgId] = {
                        url: '[data-tableexport-canvas="' + imgId + '"]',
                        src: null
                    };
                } else if (elements !== 'undefined' && elements != null) {
                    elements.each(function () {
                        if ($(this).is("img")) {
                            var imgId = strHashCode(this.src);
                            teOptions.images[imgId] = {
                                url: this.src,
                                src: this.src
                            };
                        }
                        collectImages(cell, $(this).children(), teOptions);
                    });
                }
            }
        }

        function loadImages(teOptions, callback) {
            var imageCount = 0;
            var pendingCount = 0;

            function done() {
                callback(imageCount);
            }

            function loadImage(image) {
                if (image.url) {
                    if (!image.src) {
                        var $imgContainer = $(image.url);
                        if ($imgContainer.length) {
                            imageCount = ++pendingCount;

                            html2canvas($imgContainer[0]).then(function (canvas) {
                                image.src = canvas.toDataURL("image/png");
                                if (! --pendingCount) done();
                            });
                        }
                    } else {
                        var img = new Image();
                        imageCount = ++pendingCount;
                        img.crossOrigin = 'Anonymous';
                        img.onerror = img.onload = function () {
                            if (img.complete) {

                                if (img.src.indexOf('data:image/') === 0) {
                                    img.width = image.width || img.width || 0;
                                    img.height = image.height || img.height || 0;
                                }

                                if (img.width + img.height) {
                                    var canvas = document.createElement("canvas");
                                    var ctx = canvas.getContext("2d");

                                    canvas.width = img.width;
                                    canvas.height = img.height;
                                    ctx.drawImage(img, 0, 0);

                                    image.src = canvas.toDataURL("image/png");
                                }
                            }
                            if (! --pendingCount) done();
                        };
                        img.src = image.url;
                    }
                }
            }

            if (typeof teOptions.images !== 'undefined') {
                for (var i in teOptions.images) {
                    if (teOptions.images.hasOwnProperty(i)) loadImage(teOptions.images[i]);
                }
            }

            return pendingCount || done();
        }

        function drawAutotableElements(cell, elements, teOptions) {
            elements.each(function () {
                if ($(this).is("div")) {
                    var bcolor = rgb2array(getStyle(this, 'background-color'), [255, 255, 255]);
                    var lcolor = rgb2array(getStyle(this, 'border-top-color'), [0, 0, 0]);
                    var lwidth = getPropertyUnitValue(this, 'border-top-width', defaults.jspdf.unit);

                    var r = this.getBoundingClientRect();
                    var ux = this.offsetLeft * teOptions.wScaleFactor;
                    var uy = this.offsetTop * teOptions.hScaleFactor;
                    var uw = r.width * teOptions.wScaleFactor;
                    var uh = r.height * teOptions.hScaleFactor;

                    teOptions.doc.setDrawColor.apply(undefined, lcolor);
                    teOptions.doc.setFillColor.apply(undefined, bcolor);
                    teOptions.doc.setLineWidth(lwidth);
                    teOptions.doc.rect(cell.x + ux, cell.y + uy, uw, uh, lwidth ? "FD" : "F");
                } else if ($(this).is("img")) {
                    var imgId = strHashCode(this.src);
                    jsPdfDrawImage(cell, this, imgId, teOptions);
                }

                drawAutotableElements(cell, $(this).children(), teOptions);
            });
        }

        function drawAutotableText(cell, texttags, teOptions) {
            if (typeof teOptions.onAutotableText === 'function') {
                teOptions.onAutotableText(teOptions.doc, cell, texttags);
            } else {
                var x = cell.textPos.x;
                var y = cell.textPos.y;
                var style = { halign: cell.styles.halign, valign: cell.styles.valign };

                if (texttags.length) {
                    var tag = texttags[0];
                    while (tag.previousSibling) {
                        tag = tag.previousSibling;
                    }var b = false,
                        i = false;

                    while (tag) {
                        var txt = tag.innerText || tag.textContent || "";
                        var leadingspace = txt.length && txt[0] === " " ? " " : "";
                        var trailingspace = txt.length > 1 && txt[txt.length - 1] === " " ? " " : "";

                        if (defaults.preserve.leadingWS !== true) txt = leadingspace + trimLeft(txt);
                        if (defaults.preserve.trailingWS !== true) txt = trimRight(txt) + trailingspace;

                        if ($(tag).is("br")) {
                            x = cell.textPos.x;
                            y += teOptions.doc.internal.getFontSize();
                        }

                        if ($(tag).is("b")) b = true;else if ($(tag).is("i")) i = true;

                        if (b || i) teOptions.doc.setFontType(b && i ? "bolditalic" : b ? "bold" : "italic");

                        var w = teOptions.doc.getStringUnitWidth(txt) * teOptions.doc.internal.getFontSize();

                        if (w) {
                            if (cell.styles.overflow === 'linebreak' && x > cell.textPos.x && x + w > cell.textPos.x + cell.width) {
                                var chars = ".,!%*;:=-";
                                if (chars.indexOf(txt.charAt(0)) >= 0) {
                                    var s = txt.charAt(0);
                                    w = teOptions.doc.getStringUnitWidth(s) * teOptions.doc.internal.getFontSize();
                                    if (x + w <= cell.textPos.x + cell.width) {
                                        teOptions.doc.autoTableText(s, x, y, style);
                                        txt = txt.substring(1, txt.length);
                                    }
                                    w = teOptions.doc.getStringUnitWidth(txt) * teOptions.doc.internal.getFontSize();
                                }
                                x = cell.textPos.x;
                                y += teOptions.doc.internal.getFontSize();
                            }

                            if (cell.styles.overflow !== 'visible') {
                                while (txt.length && x + w > cell.textPos.x + cell.width) {
                                    txt = txt.substring(0, txt.length - 1);
                                    w = teOptions.doc.getStringUnitWidth(txt) * teOptions.doc.internal.getFontSize();
                                }
                            }

                            teOptions.doc.autoTableText(txt, x, y, style);
                            x += w;
                        }

                        if (b || i) {
                            if ($(tag).is("b")) b = false;else if ($(tag).is("i")) i = false;

                            teOptions.doc.setFontType(!b && !i ? "normal" : b ? "bold" : "italic");
                        }

                        tag = tag.nextSibling;
                    }
                    cell.textPos.x = x;
                    cell.textPos.y = y;
                } else {
                    teOptions.doc.autoTableText(cell.text, cell.textPos.x, cell.textPos.y, style);
                }
            }
        }

        function escapeRegExp(string) {
            return string == null ? "" : string.toString().replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        }

        function replaceAll(string, find, replace) {
            return string == null ? "" : string.toString().replace(new RegExp(escapeRegExp(find), 'g'), replace);
        }

        function trimLeft(string) {
            return string == null ? "" : string.toString().replace(/^\s+/, "");
        }

        function trimRight(string) {
            return string == null ? "" : string.toString().replace(/\s+$/, "");
        }

        function parseNumber(value) {
            value = value || "0";
            value = replaceAll(value, defaults.numbers.html.thousandsSeparator, '');
            value = replaceAll(value, defaults.numbers.html.decimalMark, '.');

            return typeof value === "number" || jQuery.isNumeric(value) !== false ? value : false;
        }

        function parsePercent(value) {
            if (value.indexOf("%") > -1) {
                value = parseNumber(value.replace(/%/g, ""));
                if (value !== false) value = value / 100;
            } else value = false;
            return value;
        }

        function parseString(cell, rowIndex, colIndex) {
            var result = '';

            if (cell !== null) {
                var $cell = $(cell);
                var htmlData;

                if ($cell[0].hasAttribute("data-tableexport-canvas")) {
                    htmlData = '';
                } else if ($cell[0].hasAttribute("data-tableexport-value")) {
                    htmlData = $cell.data("tableexport-value");
                    htmlData = htmlData ? htmlData + '' : '';
                } else {
                    htmlData = $cell.html();

                    if (typeof defaults.onCellHtmlData === 'function') htmlData = defaults.onCellHtmlData($cell, rowIndex, colIndex, htmlData);else if (htmlData !== '') {
                        var html = $.parseHTML(htmlData);
                        var inputidx = 0;
                        var selectidx = 0;

                        htmlData = '';
                        $.each(html, function () {
                            if ($(this).is("input")) htmlData += $cell.find('input').eq(inputidx++).val();else if ($(this).is("select")) htmlData += $cell.find('select option:selected').eq(selectidx++).text();else if ($(this).is("br")) htmlData += "<br>";else {
                                if (typeof $(this).html() === 'undefined') htmlData += $(this).text();else if (jQuery().bootstrapTable === undefined || $(this).hasClass('filterControl') !== true && $(cell).parents('.detail-view').length === 0) htmlData += $(this).html();
                            }
                        });
                    }
                }

                if (defaults.htmlContent === true) {
                    result = $.trim(htmlData);
                } else if (htmlData && htmlData !== '') {
                    var cellFormat = $(cell).data("tableexport-cellformat");

                    if (cellFormat !== '') {
                        var text = htmlData.replace(/\n/g, '\u2028').replace(/(<\s*br([^>]*)>)/gi, '\u2060');
                        var obj = $('<div/>').html(text).contents();
                        var number = false;
                        text = '';

                        $.each(obj.text().split('\u2028'), function (i, v) {
                            if (i > 0) text += " ";

                            if (defaults.preserve.leadingWS !== true) v = trimLeft(v);
                            text += defaults.preserve.trailingWS !== true ? trimRight(v) : v;
                        });

                        $.each(text.split('\u2060'), function (i, v) {
                            if (i > 0) result += "\n";

                            if (defaults.preserve.leadingWS !== true) v = trimLeft(v);
                            if (defaults.preserve.trailingWS !== true) v = trimRight(v);
                            result += v.replace(/\u00AD/g, ""); // remove soft hyphens
                        });

                        result = result.replace(/\u00A0/g, " "); // replace nbsp's with spaces

                        if (defaults.type === 'json' || defaults.type === 'excel' && defaults.mso.fileFormat === 'xmlss' || defaults.numbers.output === false) {
                            number = parseNumber(result);

                            if (number !== false) result = Number(number);
                        } else if (defaults.numbers.html.decimalMark !== defaults.numbers.output.decimalMark || defaults.numbers.html.thousandsSeparator !== defaults.numbers.output.thousandsSeparator) {
                            number = parseNumber(result);

                            if (number !== false) {
                                var frac = ("" + number.substr(number < 0 ? 1 : 0)).split('.');
                                if (frac.length === 1) frac[1] = "";
                                var mod = frac[0].length > 3 ? frac[0].length % 3 : 0;

                                result = (number < 0 ? "-" : "") + (defaults.numbers.output.thousandsSeparator ? (mod ? frac[0].substr(0, mod) + defaults.numbers.output.thousandsSeparator : "") + frac[0].substr(mod).replace(/(\d{3})(?=\d)/g, "$1" + defaults.numbers.output.thousandsSeparator) : frac[0]) + (frac[1].length ? defaults.numbers.output.decimalMark + frac[1] : "");
                            }
                        }
                    } else result = htmlData;
                }

                if (defaults.escape === true) {
                    //noinspection JSDeprecatedSymbols
                    result = escape(result);
                }

                if (typeof defaults.onCellData === 'function') {
                    result = defaults.onCellData($cell, rowIndex, colIndex, result);
                }
            }

            return result;
        }

        function preventInjection(string) {
            if (string.length > 0 && defaults.preventInjection === true) {
                var chars = "=+-@";
                if (chars.indexOf(string.charAt(0)) >= 0) return "'" + string;
            }
            return string;
        }

        //noinspection JSUnusedLocalSymbols
        function hyphenate(a, b, c) {
            return b + "-" + c.toLowerCase();
        }

        function rgb2array(rgb_string, default_result) {
            var re = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
            var bits = re.exec(rgb_string);
            var result = default_result;
            if (bits) result = [parseInt(bits[1]), parseInt(bits[2]), parseInt(bits[3])];
            return result;
        }

        function getCellStyles(cell) {
            var a = getStyle(cell, 'text-align');
            var fw = getStyle(cell, 'font-weight');
            var fs = getStyle(cell, 'font-style');
            var f = '';
            if (a === 'start') a = getStyle(cell, 'direction') === 'rtl' ? 'right' : 'left';
            if (fw >= 700) f = 'bold';
            if (fs === 'italic') f += fs;
            if (f === '') f = 'normal';

            var result = {
                style: {
                    align: a,
                    bcolor: rgb2array(getStyle(cell, 'background-color'), [255, 255, 255]),
                    color: rgb2array(getStyle(cell, 'color'), [0, 0, 0]),
                    fstyle: f
                },
                colspan: getColspan(cell),
                rowspan: getRowspan(cell)
            };

            if (cell !== null) {
                var r = cell.getBoundingClientRect();
                result.rect = {
                    width: r.width,
                    height: r.height
                };
            }

            return result;
        }

        function getColspan(cell) {
            var result = $(cell).data("tableexport-colspan");
            if (typeof result === 'undefined' && $(cell).is("[colspan]")) result = $(cell).attr('colspan');

            return parseInt(result) || 0;
        }

        function getRowspan(cell) {
            var result = $(cell).data("tableexport-rowspan");
            if (typeof result === 'undefined' && $(cell).is("[rowspan]")) result = $(cell).attr('rowspan');

            return parseInt(result) || 0;
        }

        // get computed style property
        function getStyle(target, prop) {
            try {
                if (window.getComputedStyle) {
                    // gecko and webkit
                    prop = prop.replace(/([a-z])([A-Z])/, hyphenate); // requires hyphenated, not camel
                    return window.getComputedStyle(target, null).getPropertyValue(prop);
                }
                if (target.currentStyle) {
                    // ie
                    return target.currentStyle[prop];
                }
                return target.style[prop];
            } catch (e) {}
            return "";
        }

        function getUnitValue(parent, value, unit) {
            var baseline = 100; // any number serves

            var temp = document.createElement("div"); // create temporary element
            temp.style.overflow = "hidden"; // in case baseline is set too low
            temp.style.visibility = "hidden"; // no need to show it

            parent.appendChild(temp); // insert it into the parent for em, ex and %

            temp.style.width = baseline + unit;
            var factor = baseline / temp.offsetWidth;

            parent.removeChild(temp); // clean up

            return value * factor;
        }

        function getPropertyUnitValue(target, prop, unit) {
            var value = getStyle(target, prop); // get the computed style value

            var numeric = value.match(/\d+/); // get the numeric component
            if (numeric !== null) {
                numeric = numeric[0]; // get the string

                return getUnitValue(target.parentElement, numeric, unit);
            }
            return 0;
        }

        function jx_Workbook() {
            if (!(this instanceof jx_Workbook)) {
                //noinspection JSPotentiallyInvalidConstructorUsage
                return new jx_Workbook();
            }
            this.SheetNames = [];
            this.Sheets = {};
        }

        function jx_s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i !== s.length; ++i) {
                view[i] = s.charCodeAt(i) & 0xFF;
            }return buf;
        }

        function jx_datenum(v, date1904) {
            if (date1904) v += 1462;
            var epoch = Date.parse(v);
            return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
        }

        function jx_createSheet(data) {
            var ws = {};
            var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
            for (var R = 0; R !== data.length; ++R) {
                for (var C = 0; C !== data[R].length; ++C) {
                    if (range.s.r > R) range.s.r = R;
                    if (range.s.c > C) range.s.c = C;
                    if (range.e.r < R) range.e.r = R;
                    if (range.e.c < C) range.e.c = C;
                    var cell = { v: data[R][C] };
                    if (cell.v === null) continue;
                    var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

                    if (typeof cell.v === 'number') cell.t = 'n';else if (typeof cell.v === 'boolean') cell.t = 'b';else if (cell.v instanceof Date) {
                        cell.t = 'n';
                        cell.z = XLSX.SSF._table[14];
                        cell.v = jx_datenum(cell.v);
                    } else cell.t = 's';
                    ws[cell_ref] = cell;
                }
            }

            if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
            return ws;
        }

        function strHashCode(str) {
            var hash = 0,
                i,
                chr,
                len;
            if (str.length === 0) return hash;
            for (i = 0, len = str.length; i < len; i++) {
                chr = str.charCodeAt(i);
                hash = (hash << 5) - hash + chr;
                hash |= 0; // Convert to 32bit integer
            }
            return hash;
        }

        function downloadFile(filename, header, data) {
            var ua = window.navigator.userAgent;
            if (filename !== false && window.navigator.msSaveOrOpenBlob) {
                //noinspection JSUnresolvedFunction
                window.navigator.msSaveOrOpenBlob(new Blob([data]), filename);
            } else if (filename !== false && (ua.indexOf("MSIE ") > 0 || !!ua.match(/Trident.*rv\:11\./))) {
                // Internet Explorer (<= 9) workaround by Darryl (https://github.com/dawiong/tableExport.jquery.plugin)
                // based on sampopes answer on http://stackoverflow.com/questions/22317951
                // ! Not working for json and pdf format !
                var frame = document.createElement("iframe");

                if (frame) {
                    document.body.appendChild(frame);
                    frame.setAttribute("style", "display:none");
                    frame.contentDocument.open("txt/plain", "replace");
                    frame.contentDocument.write(data);
                    frame.contentDocument.close();
                    frame.contentDocument.focus();

                    var extension = filename.substr(filename.lastIndexOf('.') + 1);
                    switch (extension) {
                        case 'doc':case 'json':case 'png':case 'pdf':case 'xls':case 'xlsx':
                            filename += ".txt";
                            break;
                    }
                    frame.contentDocument.execCommand("SaveAs", true, filename);
                    document.body.removeChild(frame);
                }
            } else {
                var DownloadLink = document.createElement('a');

                if (DownloadLink) {
                    var blobUrl = null;

                    DownloadLink.style.display = 'none';
                    if (filename !== false) DownloadLink.download = filename;else DownloadLink.target = '_blank';

                    if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
                        window.URL = window.URL || window.webkitURL;
                        var binaryData = [];
                        binaryData.push(data);
                        blobUrl = window.URL.createObjectURL(new Blob(binaryData, { type: header }));
                        DownloadLink.href = blobUrl;
                    } else if (header.toLowerCase().indexOf("base64,") >= 0) DownloadLink.href = header + base64encode(data);else DownloadLink.href = header + encodeURIComponent(data);

                    document.body.appendChild(DownloadLink);

                    if (document.createEvent) {
                        if (DownloadEvt === null) DownloadEvt = document.createEvent('MouseEvents');

                        DownloadEvt.initEvent('click', true, false);
                        DownloadLink.dispatchEvent(DownloadEvt);
                    } else if (document.createEventObject) DownloadLink.fireEvent('onclick');else if (typeof DownloadLink.onclick === 'function') DownloadLink.onclick();

                    setTimeout(function () {
                        if (blobUrl) window.URL.revokeObjectURL(blobUrl);
                        document.body.removeChild(DownloadLink);
                    }, 100);
                }
            }
        }

        function utf8Encode(text) {
            if (typeof text === 'string') {
                text = text.replace(/\x0d\x0a/g, "\x0a");
                var utftext = "";
                for (var n = 0; n < text.length; n++) {
                    var c = text.charCodeAt(n);
                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    } else if (c > 127 && c < 2048) {
                        utftext += String.fromCharCode(c >> 6 | 192);
                        utftext += String.fromCharCode(c & 63 | 128);
                    } else {
                        utftext += String.fromCharCode(c >> 12 | 224);
                        utftext += String.fromCharCode(c >> 6 & 63 | 128);
                        utftext += String.fromCharCode(c & 63 | 128);
                    }
                }
                return utftext;
            }
            return text;
        }

        function base64encode(input) {
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            var output = "";
            var i = 0;
            input = utf8Encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = (chr1 & 3) << 4 | chr2 >> 4;
                enc3 = (chr2 & 15) << 2 | chr3 >> 6;
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
            }
            return output;
        }

        return this;
    };
})(jQuery);

/***/ })

/******/ });