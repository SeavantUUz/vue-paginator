;(function () {


    var Paginator = function(items, perPageItems) {
        var self = {};
        self._items = items;
        self.perPageItems = perPageItems;
        self.currentPage = 1;

        self.pages = Math.floor((self._items.length - 1) / self.perPageItems + 1);

        self.hasPrev = self.currentPage > 1;

        self.hasNext = self.currentPage < self.pages ;

        self.prevPage = function () {
            return Math.max(1, self.currentPage - 1);
        };

        self.nextPage = function () {
            return Math.min(self.pages, self.currentPage + 1);
        };

        self.items = function () {
            var start = (self.currentPage - 1) * self.perPageItems;
            var end = self.currentPage * self.perPageItems;
            return self._items.slice(start, end);
        };

        self.setItems = function (items) {
            self._items = items;
            self.pages = Math.floor((self._items.length - 1) / self.perPageItems + 1);
            self.hasPrev = self.currentPage > 1;
            self.hasNext = self.currentPage < self.pages;
        };

        self.setCurrentPage = function (currentPage) {

            if(currentPage > 0 && currentPage < self.pages + 1) {
                self.currentPage = currentPage;
                self.hasPrev = self.currentPage > 1;
                self.hasNext = self.currentPage < self.pages;
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
                    console.log(this.paginator.hasNext);
                };

                vm['prev'] = function () {
                    var page = this.paginator.prevPage();
                    this.paginator.setCurrentPage(page);
                };


            },

            update: function (newValue, oldValue) {
                var paginator = this.vm['paginator'];
                paginator.setItems(newValue);
                this.vm.$set('pages', iterPage(paginator.pages));
                this.vm.$set('hasPrev', paginator.hasPerv);
                this.vm.$set('hasNext', paginator.hasNext);
                

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