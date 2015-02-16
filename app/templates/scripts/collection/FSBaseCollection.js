define(['require', 'fs/utils/FSGlobals', 'fs/utils/FSUtils', 'backbone.paginator'], function (require, FSGlobals, FSUtils) {
  'use strict';

  var FSBaseCollection = Backbone.PageableCollection.extend(
    /** @lends FSBaseCollection.prototype */
    {
      /**
       * FSBaseCollection's initialize function
       * @augments Backbone.PageableCollection
       * @constructs
       */

      initialize: function () {

      },
      bindErrorEvents: function () {
        this.bind("error", FSUtils.defaultErrorHandler);
      },
      /**
       * state required for the PageableCollection
       */
      state: {
        firstPage: 0,
        pageSize: FSGlobals.settings.PAGE_SIZE
      },

      mode: 'server',

      queryParams: {
        pageSize: 'pageSize',
        sortKey: 'sortBy',
        order: 'sortType',
        totalRecords: 'totalCount',
        startIndex: function () {
          return this.state.currentPage * this.state.pageSize;
        }
      },

      /**
       * override the parseState of PageableCollection for our use
       */
      parse: function (resp, options) {
        var newState = this.parseState(resp, _.clone(this.queryParams), _.clone(this.state), options);
        try {
          if (newState) {
            this.state = this._checkState(_.extend({}, this.state, newState));
          }
        } catch (error) {
          if (error.name === 'RangeError') {
            this.state.currentPage = 0;
            this.state.startIndex = 0;
            this.fetch({
              reset: true
            });
          }
        }
        return this.parseRecords(resp, options);
      },

      /**
       * override the parse of PageableCollection for our use
       */
      parseState: function (resp, queryParams, state, options) {
        if (!this.modelAttrName) {
          throw new Error("this.modelAttrName not defined for " + this);
        }
        var serverState = _.omit(resp, this.modelAttrName);
        var newState = _.clone(state);

        _.each(_.pairs(_.omit(queryParams, "directions")), function (kvp) {
          var k = kvp[0],
            v = kvp[1];
          var serverVal = serverState[v];
          if (!_.isUndefined(serverVal) && !_.isNull(serverVal)) {
            if ((k == 'pageSize') || (k == 'totalRecords')) {
              newState[k] = parseInt(serverState[v], 10);
            } else {
              newState[k] = serverState[v];
            }
          }
        });

        if (serverState.sortType) {
          newState.order = _.invert(queryParams.directions)[serverState.sortType.toLowerCase()] * 1;
        }

        var startIndex = parseInt(serverState.startIndex, 10);
        var totalCount = parseInt(serverState.totalCount, 10);
        var pageSize = parseInt(serverState.pageSize, 10);

        newState.pageSize = pageSize ? pageSize : state.pageSize;
        newState.currentPage = startIndex === 0 ? 0 : Math.ceil(startIndex / newState.pageSize);
        //newState.totalPages = totalCount === 0 ? 0 : Math.ceil(totalCount / serverState.pageSize);

        return newState;
      },

      /**
       * override the parseRecords of PageableCollection for our use
       */
      parseRecords: function (resp, options) {
        try {
          if (!this.modelAttrName) {
            throw new Error("this.modelAttrName not defined for " + this);
          }
          return resp[this.modelAttrName];
        } catch (e) {
          console.log(e);
        }
      },

      ////////////////////////////////////////////////////////////
      // Overriding backbone-pageable page handlers methods   //
      ////////////////////////////////////////////////////////////
      getFirstPage: function (options) {
        return this.getPage("first", _.extend({
          reset: true
        }, options));
      },

      getPreviousPage: function (options) {
        return this.getPage("prev", _.extend({
          reset: true
        }, options));
      },

      getNextPage: function (options) {
        return this.getPage("next", _.extend({
          reset: true
        }, options));
      },

      getLastPage: function (options) {
          return this.getPage("last", _.extend({
            reset: true
          }, options));
        }
        /////////////////////////////
        // End overriding methods //
        /////////////////////////////



    }, {
      // Static functions
      getTableCols: function (cols, collection) {
        var retCols = _.map(cols, function (v, k, l) {
          var defaults = collection.constructor.tableCols[k];
          if (!defaults) {
            //console.log("Error!! " + k + " not found in collection: " , collection);
            defaults = {};
          }
          return _.extend({
            'name': k
          }, defaults, v);
        });

        return retCols;
      },

      nonCrudOperation: function (url, requestMethod, options) {
        return Backbone.sync.call(this, null, this, _.extend({
          url: url,
          type: requestMethod
        }, options));
      }

    });

  return FSBaseCollection;
});