/**************************************************************************
-- Purpose: @file This is the common View file for displaying Table/Grid to be used overall in the application.
**************************************************************************/

define([
  'require',
  'utils/LangSupport',
  'backgrid-filter',
  'backgrid-paginator'
], function (require, Localize) {
  'use strict';


  var TablelayoutTmpl = '<div class="clearfix">'+
                          '<div class="form-group pull-right no-margin">'+
                            '<label class="select">'+
                              '<select data-id="pageSize" class="form-control">'+
                                '<option selected>10</option>'+
                                '<option>25</option>'+
                                '<option>50</option>'+
                                '<option>100</option>'+
                              '</select>'+
                            '</label>'+
                          '</div>'+
                        '</div>'+
                        '<div class="position-relative thick-border">'+
                          '<div data-id="r_tableList" class="table-responsive tableBorder"> </div>'+
                          '<div data-id="r_tableSpinner"></div>'+
                        '</div>'+
                        '<div class="row">'+
                          '<div data-id="r_footerRecords" class="col-sm-6 margin-top-10"></div>'+
                          '<div data-id="r_pagination" class="col-sm-6 text-right"></div>'+
                        '</div>';

  var TableLayout = Backbone.Marionette.Layout.extend(
    /** @lends TableLayout */
    {
      _viewName: 'TableLayout',

      template: TablelayoutTmpl,

      /** Layout sub regions */
      regions: {
        'rTableList': 'div[data-id="r_tableList"]',
        'rTableSpinner': 'div[data-id="r_tableSpinner"]',
        'rPagination': 'div[data-id="r_pagination"]',
        'rFooterRecords': 'div[data-id="r_footerRecords"]'
      },

      // /** ui selector cache */
      ui: {
        selectPageSize: 'select[data-id="pageSize"]'
      },

      gridOpts: {
        className: 'table table-bordered table-hover table-condensed backgrid',
        emptyText: 'No Records found!'
      },

      /**
       * Backgrid.Filter default options
       */
      filterOpts: {
        placeholder: Localize.tt('plcHldr.searchByResourcePath'),
        wait: 150
      },

      /**
       * Paginator default options
       */
      paginatorOpts: {
        // If you anticipate a large number of pages, you can adjust
        // the number of page handles to show. The sliding window
        // will automatically show the next set of page handles when
        // you click next at the end of a window.
        windowSize: 5, // Default is 10

        // Used to multiple windowSize to yield a number of pages to slide,
        // in the case the number is 5
        slideScale: 0.5, // Default is 0.5

        // Whether sorting should go back to the first page
        goBackFirstOnSort: false // Default is true
      },

      /**
           page handlers for pagination
        */
      controlOpts: {
        rewind: {
          label: Localize.tt("btn.first"),
          title: "First"
        },
        back: {
          label: Localize.tt("btn.previous"),
          title: "Previous"
        },
        forward: {
          label: Localize.tt("btn.next"),
          title: "Next"
        },
        fastForward: {
          label: Localize.tt("btn.last"),
          title: "Last"
        }
      },

      includePagination: true,

      includeFilter: false,

      includeHeaderSearch: false,

      includePageSize: false,

      includeFooterRecords: true,

      /** ui events hash */
      events: function () {
        var events = {};
        events['change ' + this.ui.selectPageSize] = 'onPageSizeChange';
        return events;
      },

      /**
       * intialize a new HDTableLayout Layout
       * @constructs
       */
      initialize: function (options) {
        _.extend(this, _.pick(options, 'collection', 'columns', 'includePagination',
          'includeHeaderSearch', 'includeFilter', 'includePageSize',
          'includeFooterRecords'));

        _.extend(this.gridOpts, options.gridOpts, {
          collection: this.collection,
          columns: this.columns
        });
        _.extend(this.filterOpts, options.filterOpts);
        _.extend(this.paginatorOpts, options.paginatorOpts);
        _.extend(this.controlOpts, options.controlOpts);

        this.bindEvents();
      },

      /** all events binding here */
      bindEvents: function () {
        this.listenTo(this.collection, 'request', function () {
          this.$('div[data-id="r_tableSpinner"]').addClass('loading');
        }, this);
        this.listenTo(this.collection, 'sync error', function () {
          this.$('div[data-id="r_tableSpinner"]').removeClass('loading');
        }, this);

        this.listenTo(this.collection, 'reset', function (collection, response) {
          if (this.includePagination) {
            this.renderPagination();
          }
          if (this.includeFooterRecords) {
            this.renderFooterRecords(this.collection.state);
          }
        }, this);

        /*This "sort" trigger event is fired when clicked on
        'sortable' header cell (backgrid).
        Collection.trigger event was fired because backgrid has
        removeCellDirection function (backgrid.js - line no: 2088)
        which is invoked when "sort" event is triggered
        on collection (backgrid.js - line no: 2081).
        removeCellDirection function - removes "ascending" and "descending"
        which in turn removes chevrons from every 'sortable' header-cells*/
        this.listenTo(this.collection, "backgrid:sort", function () {
          this.collection.trigger("sort");
        });

        this.listenTo(this.collection, 'remove', function (model, collection, response) {
          if (model.isNew() || !this.includePagination) {
            return;
          }
          if (this.collection.state && this.collection.state.totalRecords > 0) {
            this.collection.state.totalRecords -= 1;
          }
          if (this.collection.length === 0 && this.collection.state && this.collection.state.totalRecords > 0) {

            if (this.collection.state.totalRecords > this.collection.state.currentPage * this.collection.state.pageSize) {
              this.collection.fetch({
                reset: true
              });
            } else {
              if (this.collection.state.currentPage > 0) {
                this.collection.state.currentPage -= 1;
                this.collection.fetch({
                  reset: true
                });
              }
            }

          } else if (this.collection.length === 0 && this.collection.state && this.collection.state.totalRecords === 0) {
            this.collection.state.currentPage = 0;
            this.collection.fetch({
              reset: true
            });
          }
        }, this);
      },

      /** on render callback */
      onRender: function () {
        this.renderTable();
        if (this.includePagination) {
          this.renderPagination();
        }
        if (this.includeFilter) {
          this.renderFilter();
        }
        if (!this.includePageSize) {
          this.ui.selectPageSize.remove();
        }
        if (this.includeFooterRecords) {
          this.renderFooterRecords(this.collection.state);
        }
        this.$('[data-id="pageSize"]').val(this.collection.state.pageSize);
      },

      /**
       * show table
       */
      renderTable: function () {
        this.rTableList.show(new Backgrid.Grid(this.gridOpts));
      },

      /**
       * show pagination buttons(first, last, next, prev and numbers)
       */
      renderPagination: function () {
        var options = _.extend({
          collection: this.collection,
          controls: this.controlOpts
        }, this.paginatorOpts);

        // TODO - Debug this part
        if (this.rPagination) {
          this.rPagination.show(new Backgrid.Extension.Paginator(options));
        } else if (this.regions.rPagination) {
          this.$('div[data-id="r_pagination"]').show(new Backgrid.Extension.Paginator(options));
        }
      },

      /**
       * show/hide pagination buttons of the grid
       */
      showHidePager: function () {

        if (!this.includePagination) {
          return;
        }

        if (this.collection.state && this.collection.state.totalRecords > this.collection.state.pageSize) {
          this.$('div[data-id="r_pagination"]').show();
        } else {
          this.$('div[data-id="r_pagination"]').hide();
        }
      },

      /**
       * show/hide filter of the grid
       */
      renderFilter: function () {
        var that = this;
        this.rFilter.show(new Backgrid.Extension.ServerSideFilter({
          collection: this.collection,
          name: ['name'],
          placeholder: Localize.tt('plcHldr.searchByResourcePath'),
          wait: 150
        }));

        setTimeout(function () {
          that.$('table').colResizable({
            liveDrag: true
          });
        }, 0);
      },

      /**
       * show/hide footer details of the list/collection shown in the grid
       */
      renderFooterRecords: function (collectionState) {
        var collState = collectionState;
        var totalRecords = collState.totalRecords || 0;
        var pageStartIndex = totalRecords ? (collState.currentPage * collState.pageSize) : 0;
        var pageEndIndex = pageStartIndex + this.collection.length;

        this.$('[data-id="r_footerRecords"]').html('Showing ' + (totalRecords ? pageStartIndex + 1 : 0) + ' to ' + pageEndIndex + ' of ' + totalRecords + ' entries');
        return this;
      },

      /** on close */
      onClose: function () {},

      /**
       * get the Backgrid object
       * @return {null}
       */
      getGridObj: function () {
        if (this.rTableList.currentView) {
          return this.rTableList.currentView;
        }
        return null;
      },

      /**
       * handle change event on page size select box
       * @param  {[type]} e event
       */
      onPageSizeChange: function (e) {
        var pagesize = $(e.currentTarget).val();
        this.collection.state.pageSize = parseInt(pagesize, 10);

        this.collection.state.currentPage = this.collection.state.firstPage;

        this.collection.fetch({
          sort: false,
          reset: true,
          cache: false
        });
      }
    });

  return TableLayout;
});