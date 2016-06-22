;(function () {


    var Paginator = function(items, perPageItems) {
        var self = {};
        self._items = items;
        self.perPageItems = perPageItems;
        self.currentPage = 1;

        self._pages = Math.floor((self._items.length - 1) / self.perPageItems + 1);

        self._hasPrev = self.currentPage > 1;

        self._hasNext = self.currentPage < self._pages ;

        self.pages = function () {
            return self._pages;
        };

        self.hasPrev = function () {
            return self._hasPrev;
        };

        self.hasNext = function () {
            return self._hasNext;
        };

        self.prevPage = function () {
            return Math.max(1, self.currentPage - 1);
        };

        self.nextPage = function () {
            return Math.min(self._pages, self.currentPage + 1);
        };

        self.items = function () {
            var start = (self.currentPage - 1) * self.perPageItems;
            var end = self.currentPage * self.perPageItems;
            return self._items.slice(start, end);
        };

        self.setItems = function (items) {
            self._items = items;
            self._pages = Math.floor((self._items.length - 1) / self.perPageItems + 1);
            self._hasPrev = self.currentPage > 1;
            self._hasNext = self.currentPage < self._pages;
        };

        self.setCurrentPage = function (currentPage) {

            if(currentPage > 0 && currentPage < self._pages + 1) {
                self.currentPage = currentPage;
                self._hasPrev = self.currentPage > 1;
                self._hasNext = self.currentPage < self._pages;
            }
        };
        
        return self;

    };

    var iterPage = function (page) {
        var l = [];
        for(var i=1; i<= page; i++){
            l.push(i);
        }
        return l;
    };
    
    var VuePaginator = {};

    VuePaginator.install = function (Vue) {

        Vue.directive('paginator', {

            twoWay: true,
            params: ['limit', 'perp'],

            bind: function () {
                Vue.config.silent = true;

                var vm = this.vm;
                this.listName = this.expression;
                var perPage = parseInt(this.params.perp) || 7;
                // var limit = this.params.limit;
                this.originalList = vm[this.listName];
                this.paginator = Paginator(this.originalList, perPage);


                vm.$set('paginator', this.paginator);
                vm.$set('originalList', this.originalList);


                var that = this;

                vm.$watch('paginator.currentPage', function () {
                    that.set(that.paginator.items());
                });

                vm['to'] = function (page) {
                   this.paginator.setCurrentPage(page);
                };

                vm['next'] = function () {
                    var page = this.paginator.nextPage();
                    this.paginator.setCurrentPage(page);
                };

                vm['prev'] = function () {
                    var page = this.paginator.prevPage();
                    this.paginator.setCurrentPage(page);
                };

                this.vm.$set('pages', iterPage(this.paginator.pages));
                this.vm.$set('hasPrev', this.paginator.hasPrev);
                this.vm.$set('hasNext', this.paginator.hasNext);
            },

            update: function (newValue, oldValue) {
                var paginator = this.vm['paginator'];
                paginator.setItems(newValue);
                this.set(paginator.items());
            }

        });

    };


  if (typeof exports == "object") {
      module.exports = VuePaginator
  } else if (typeof define == "function" && define.amd) {
    define([], function(){ return VuePaginator})
  } else if (window.Vue) {
    window.VuePaginator= VuePaginator;
    window.Vue.use(VuePaginator)
  }

})();