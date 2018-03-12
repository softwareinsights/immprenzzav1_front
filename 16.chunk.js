webpackJsonp([16,47],{

/***/ 1257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ng2_bootstrap_modal__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_translation_module__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__theme_nga_module__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ng_bootstrap_ng_bootstrap__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angular2_datatable__ = __webpack_require__(1279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angular2_datatable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_angular2_datatable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ordens_routing__ = __webpack_require__(1410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ordens_component__ = __webpack_require__(1336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_ordens_table_ordens_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_ordens_table_ordens_table_component__ = __webpack_require__(1335);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrdensModule", function() { return OrdensModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var OrdensModule = (function () {
    function OrdensModule() {
    }
    return OrdensModule;
}());
OrdensModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__app_translation_module__["a" /* AppTranslationModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_5__theme_nga_module__["a" /* NgaModule */],
            __WEBPACK_IMPORTED_MODULE_6__ng_bootstrap_ng_bootstrap__["b" /* NgbRatingModule */],
            __WEBPACK_IMPORTED_MODULE_8__ordens_routing__["a" /* routing */],
            __WEBPACK_IMPORTED_MODULE_7_angular2_datatable__["DataTableModule"],
            __WEBPACK_IMPORTED_MODULE_6__ng_bootstrap_ng_bootstrap__["c" /* NgbModalModule */],
            __WEBPACK_IMPORTED_MODULE_0_ng2_bootstrap_modal__["BootstrapModalModule"].forRoot({ container: document.body })
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_9__ordens_component__["a" /* OrdensComponent */],
            __WEBPACK_IMPORTED_MODULE_11__components_ordens_table_ordens_table_component__["a" /* OrdensTableComponent */],
        ],
        entryComponents: [],
        providers: [
            __WEBPACK_IMPORTED_MODULE_10__components_ordens_table_ordens_service__["a" /* OrdensService */]
        ]
    })
], OrdensModule);

//# sourceMappingURL=ordens.module.js.map

/***/ }),

/***/ 1275:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var _ = __webpack_require__(13);
var Rx_1 = __webpack_require__(535);
var DataTable = (function () {
    function DataTable(differs) {
        this.differs = differs;
        this.inputData = [];
        this.sortBy = "";
        this.sortOrder = "asc";
        this.sortByChange = new core_1.EventEmitter();
        this.sortOrderChange = new core_1.EventEmitter();
        this.rowsOnPage = 1000;
        this.activePage = 1;
        this.mustRecalculateData = false;
        this.onSortChange = new Rx_1.ReplaySubject(1);
        this.onPageChange = new core_1.EventEmitter();
        this.diff = differs.find([]).create(null);
    }
    DataTable.prototype.getSort = function () {
        return { sortBy: this.sortBy, sortOrder: this.sortOrder };
    };
    DataTable.prototype.setSort = function (sortBy, sortOrder) {
        if (this.sortBy !== sortBy || this.sortOrder !== sortOrder) {
            this.sortBy = sortBy;
            this.sortOrder = _.includes(["asc", "desc"], sortOrder) ? sortOrder : "asc";
            this.mustRecalculateData = true;
            this.onSortChange.next({ sortBy: sortBy, sortOrder: sortOrder });
            this.sortByChange.emit(this.sortBy);
            this.sortOrderChange.emit(this.sortOrder);
        }
    };
    DataTable.prototype.getPage = function () {
        return { activePage: this.activePage, rowsOnPage: this.rowsOnPage, dataLength: this.inputData.length };
    };
    DataTable.prototype.setPage = function (activePage, rowsOnPage) {
        if (this.rowsOnPage !== rowsOnPage || this.activePage !== activePage) {
            this.activePage = this.activePage !== activePage ? activePage : this.calculateNewActivePage(this.rowsOnPage, rowsOnPage);
            this.rowsOnPage = rowsOnPage;
            this.mustRecalculateData = true;
            this.onPageChange.emit({
                activePage: this.activePage,
                rowsOnPage: this.rowsOnPage,
                dataLength: this.inputData ? this.inputData.length : 0
            });
        }
    };
    DataTable.prototype.calculateNewActivePage = function (previousRowsOnPage, currentRowsOnPage) {
        var firstRowOnPage = (this.activePage - 1) * previousRowsOnPage + 1;
        var newActivePage = Math.ceil(firstRowOnPage / currentRowsOnPage);
        return newActivePage;
    };
    DataTable.prototype.recalculatePage = function () {
        var lastPage = Math.ceil(this.inputData.length / this.rowsOnPage);
        this.activePage = lastPage < this.activePage ? lastPage : this.activePage;
        this.activePage = this.activePage || 1;
        this.onPageChange.emit({
            activePage: this.activePage,
            rowsOnPage: this.rowsOnPage,
            dataLength: this.inputData.length
        });
    };
    DataTable.prototype.ngOnChanges = function (changes) {
        if (changes["rowsOnPage"]) {
            this.rowsOnPage = changes["rowsOnPage"].previousValue;
            this.setPage(this.activePage, changes["rowsOnPage"].currentValue);
            this.mustRecalculateData = true;
        }
        if (changes["sortBy"] || changes["sortOrder"]) {
            if (!_.includes(["asc", "desc"], this.sortOrder)) {
                console.warn("angular2-datatable: value for input mfSortOrder must be one of ['asc', 'desc'], but is:", this.sortOrder);
                this.sortOrder = "asc";
            }
            if (this.sortBy) {
                this.onSortChange.next({ sortBy: this.sortBy, sortOrder: this.sortOrder });
            }
            this.mustRecalculateData = true;
        }
        if (changes["inputData"]) {
            this.inputData = changes["inputData"].currentValue || [];
            this.recalculatePage();
            this.mustRecalculateData = true;
        }
    };
    DataTable.prototype.ngDoCheck = function () {
        var changes = this.diff.diff(this.inputData);
        if (changes) {
            this.recalculatePage();
            this.mustRecalculateData = true;
        }
        if (this.mustRecalculateData) {
            this.fillData();
            this.mustRecalculateData = false;
        }
    };
    DataTable.prototype.fillData = function () {
        this.activePage = this.activePage;
        this.rowsOnPage = this.rowsOnPage;
        var offset = (this.activePage - 1) * this.rowsOnPage;
        var data = this.inputData;
        var sortBy = this.sortBy;
        if (typeof sortBy === 'string' || sortBy instanceof String) {
            data = _.orderBy(data, this.caseInsensitiveIteratee(sortBy), [this.sortOrder]);
        }
        else {
            data = _.orderBy(data, sortBy, [this.sortOrder]);
        }
        data = _.slice(data, offset, offset + this.rowsOnPage);
        this.data = data;
    };
    DataTable.prototype.caseInsensitiveIteratee = function (sortBy) {
        return function (row) {
            var value = row;
            for (var _i = 0, _a = sortBy.split('.'); _i < _a.length; _i++) {
                var sortByProperty = _a[_i];
                if (value) {
                    value = value[sortByProperty];
                }
            }
            if (value && typeof value === 'string' || value instanceof String) {
                return value.toLowerCase();
            }
            return value;
        };
    };
    return DataTable;
}());
__decorate([
    core_1.Input("mfData"),
    __metadata("design:type", Array)
], DataTable.prototype, "inputData", void 0);
__decorate([
    core_1.Input("mfSortBy"),
    __metadata("design:type", Object)
], DataTable.prototype, "sortBy", void 0);
__decorate([
    core_1.Input("mfSortOrder"),
    __metadata("design:type", Object)
], DataTable.prototype, "sortOrder", void 0);
__decorate([
    core_1.Output("mfSortByChange"),
    __metadata("design:type", Object)
], DataTable.prototype, "sortByChange", void 0);
__decorate([
    core_1.Output("mfSortOrderChange"),
    __metadata("design:type", Object)
], DataTable.prototype, "sortOrderChange", void 0);
__decorate([
    core_1.Input("mfRowsOnPage"),
    __metadata("design:type", Object)
], DataTable.prototype, "rowsOnPage", void 0);
__decorate([
    core_1.Input("mfActivePage"),
    __metadata("design:type", Object)
], DataTable.prototype, "activePage", void 0);
DataTable = __decorate([
    core_1.Directive({
        selector: 'table[mfData]',
        exportAs: 'mfDataTable'
    }),
    __metadata("design:paramtypes", [core_1.IterableDiffers])
], DataTable);
exports.DataTable = DataTable;
//# sourceMappingURL=DataTable.js.map

/***/ }),

/***/ 1276:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var DataTable_1 = __webpack_require__(1275);
var _ = __webpack_require__(13);
var BootstrapPaginator = (function () {
    function BootstrapPaginator() {
        this.rowsOnPageSet = [];
        this.minRowsOnPage = 0;
    }
    BootstrapPaginator.prototype.ngOnChanges = function (changes) {
        if (changes.rowsOnPageSet) {
            this.minRowsOnPage = _.min(this.rowsOnPageSet);
        }
    };
    return BootstrapPaginator;
}());
__decorate([
    core_1.Input("rowsOnPageSet"),
    __metadata("design:type", Object)
], BootstrapPaginator.prototype, "rowsOnPageSet", void 0);
__decorate([
    core_1.Input("mfTable"),
    __metadata("design:type", DataTable_1.DataTable)
], BootstrapPaginator.prototype, "mfTable", void 0);
BootstrapPaginator = __decorate([
    core_1.Component({
        selector: "mfBootstrapPaginator",
        template: "\n    <mfPaginator #p [mfTable]=\"mfTable\">\n        <ul class=\"pagination\" *ngIf=\"p.dataLength > p.rowsOnPage\">\n            <li class=\"page-item\" [class.disabled]=\"p.activePage <= 1\" (click)=\"p.setPage(1)\">\n                <a class=\"page-link\" style=\"cursor: pointer\">&laquo;</a>\n            </li>\n            <li class=\"page-item\" *ngIf=\"p.activePage > 4 && p.activePage + 1 > p.lastPage\" (click)=\"p.setPage(p.activePage - 4)\">\n                <a class=\"page-link\" style=\"cursor: pointer\">{{p.activePage-4}}</a>\n            </li>\n            <li class=\"page-item\" *ngIf=\"p.activePage > 3 && p.activePage + 2 > p.lastPage\" (click)=\"p.setPage(p.activePage - 3)\">\n                <a class=\"page-link\" style=\"cursor: pointer\">{{p.activePage-3}}</a>\n            </li>\n            <li class=\"page-item\" *ngIf=\"p.activePage > 2\" (click)=\"p.setPage(p.activePage - 2)\">\n                <a class=\"page-link\" style=\"cursor: pointer\">{{p.activePage-2}}</a>\n            </li>\n            <li class=\"page-item\" *ngIf=\"p.activePage > 1\" (click)=\"p.setPage(p.activePage - 1)\">\n                <a class=\"page-link\" style=\"cursor: pointer\">{{p.activePage-1}}</a>\n            </li>\n            <li class=\"page-item active\">\n                <a class=\"page-link\" style=\"cursor: pointer\">{{p.activePage}}</a>\n            </li>\n            <li class=\"page-item\" *ngIf=\"p.activePage + 1 <= p.lastPage\" (click)=\"p.setPage(p.activePage + 1)\">\n                <a class=\"page-link\" style=\"cursor: pointer\">{{p.activePage+1}}</a>\n            </li>\n            <li class=\"page-item\" *ngIf=\"p.activePage + 2 <= p.lastPage\" (click)=\"p.setPage(p.activePage + 2)\">\n                <a class=\"page-link\" style=\"cursor: pointer\">{{p.activePage+2}}</a>\n            </li>\n            <li class=\"page-item\" *ngIf=\"p.activePage + 3 <= p.lastPage && p.activePage < 3\" (click)=\"p.setPage(p.activePage + 3)\">\n                <a class=\"page-link\" style=\"cursor: pointer\">{{p.activePage+3}}</a>\n            </li>\n            <li class=\"page-item\" *ngIf=\"p.activePage + 4 <= p.lastPage && p.activePage < 2\" (click)=\"p.setPage(p.activePage + 4)\">\n                <a class=\"page-link\" style=\"cursor: pointer\">{{p.activePage+4}}</a>\n            </li>\n            <li class=\"page-item\" [class.disabled]=\"p.activePage >= p.lastPage\" (click)=\"p.setPage(p.lastPage)\">\n                <a class=\"page-link\" style=\"cursor: pointer\">&raquo;</a>\n            </li>\n        </ul>\n        <ul class=\"pagination pull-right float-sm-right\" *ngIf=\"p.dataLength > minRowsOnPage\">\n            <li class=\"page-item\" *ngFor=\"let rows of rowsOnPageSet\" [class.active]=\"p.rowsOnPage===rows\" (click)=\"p.setRowsOnPage(rows)\">\n                <a class=\"page-link\" style=\"cursor: pointer\">{{rows}}</a>\n            </li>\n        </ul>\n    </mfPaginator>\n    "
    })
], BootstrapPaginator);
exports.BootstrapPaginator = BootstrapPaginator;
//# sourceMappingURL=BootstrapPaginator.js.map

/***/ }),

/***/ 1277:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var DataTable_1 = __webpack_require__(1275);
var DefaultSorter = (function () {
    function DefaultSorter(mfTable) {
        this.mfTable = mfTable;
        this.isSortedByMeAsc = false;
        this.isSortedByMeDesc = false;
    }
    DefaultSorter.prototype.ngOnInit = function () {
        var _this = this;
        this.mfTable.onSortChange.subscribe(function (event) {
            _this.isSortedByMeAsc = (event.sortBy == _this.sortBy && event.sortOrder == "asc");
            _this.isSortedByMeDesc = (event.sortBy == _this.sortBy && event.sortOrder == "desc");
        });
    };
    DefaultSorter.prototype.sort = function () {
        if (this.isSortedByMeAsc) {
            this.mfTable.setSort(this.sortBy, "desc");
        }
        else {
            this.mfTable.setSort(this.sortBy, "asc");
        }
    };
    return DefaultSorter;
}());
__decorate([
    core_1.Input("by"),
    __metadata("design:type", String)
], DefaultSorter.prototype, "sortBy", void 0);
DefaultSorter = __decorate([
    core_1.Component({
        selector: "mfDefaultSorter",
        template: "\n        <a style=\"cursor: pointer\" (click)=\"sort()\" class=\"text-nowrap\">\n            <ng-content></ng-content>\n            <span *ngIf=\"isSortedByMeAsc\" class=\"glyphicon glyphicon-triangle-top\" aria-hidden=\"true\"></span>\n            <span *ngIf=\"isSortedByMeDesc\" class=\"glyphicon glyphicon-triangle-bottom\" aria-hidden=\"true\"></span>\n        </a>"
    }),
    __metadata("design:paramtypes", [DataTable_1.DataTable])
], DefaultSorter);
exports.DefaultSorter = DefaultSorter;
//# sourceMappingURL=DefaultSorter.js.map

/***/ }),

/***/ 1278:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = __webpack_require__(0);
var DataTable_1 = __webpack_require__(1275);
var Paginator = (function () {
    function Paginator(injectMfTable) {
        var _this = this;
        this.injectMfTable = injectMfTable;
        this.dataLength = 0;
        this.onPageChangeSubscriber = function (event) {
            _this.activePage = event.activePage;
            _this.rowsOnPage = event.rowsOnPage;
            _this.dataLength = event.dataLength;
            _this.lastPage = Math.ceil(_this.dataLength / _this.rowsOnPage);
        };
    }
    Paginator.prototype.ngOnChanges = function (changes) {
        this.mfTable = this.inputMfTable || this.injectMfTable;
        this.onPageChangeSubscriber(this.mfTable.getPage());
        this.mfTable.onPageChange.subscribe(this.onPageChangeSubscriber);
    };
    Paginator.prototype.setPage = function (pageNumber) {
        this.mfTable.setPage(pageNumber, this.rowsOnPage);
    };
    Paginator.prototype.setRowsOnPage = function (rowsOnPage) {
        this.mfTable.setPage(this.activePage, rowsOnPage);
    };
    return Paginator;
}());
__decorate([
    core_1.Input("mfTable"),
    __metadata("design:type", DataTable_1.DataTable)
], Paginator.prototype, "inputMfTable", void 0);
Paginator = __decorate([
    core_1.Component({
        selector: "mfPaginator",
        template: "<ng-content></ng-content>"
    }),
    __param(0, core_1.Optional()),
    __metadata("design:paramtypes", [DataTable_1.DataTable])
], Paginator);
exports.Paginator = Paginator;
//# sourceMappingURL=Paginator.js.map

/***/ }),

/***/ 1279:
/***/ (function(module, exports, __webpack_require__) {

var dataTable_directive = __webpack_require__(1275);
var defaultSorter_directive = __webpack_require__(1277);
var paginator_component = __webpack_require__(1278);
var bootstrapPaginator_component = __webpack_require__(1276);
var dataTable_module = __webpack_require__(1280);

exports.DataTable = dataTable_directive.DataTable;
exports.DataEvent = dataTable_directive.DataEvent;
exports.PageEvent = dataTable_directive.PageEvent;
exports.SortEvent = dataTable_directive.SortEvent;
exports.DefaultSorter = defaultSorter_directive.DefaultSorter;
exports.Paginator = paginator_component.Paginator;
exports.BootstrapPaginator = bootstrapPaginator_component.BootstrapPaginator;
exports.DataTableModule = dataTable_module.DataTableModule;


/***/ }),

/***/ 1280:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(20);
var DataTable_1 = __webpack_require__(1275);
var DefaultSorter_1 = __webpack_require__(1277);
var Paginator_1 = __webpack_require__(1278);
var BootstrapPaginator_1 = __webpack_require__(1276);
var DataTableModule = (function () {
    function DataTableModule() {
    }
    return DataTableModule;
}());
DataTableModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule
        ],
        declarations: [
            DataTable_1.DataTable,
            DefaultSorter_1.DefaultSorter,
            Paginator_1.Paginator,
            BootstrapPaginator_1.BootstrapPaginator
        ],
        exports: [
            DataTable_1.DataTable,
            DefaultSorter_1.DefaultSorter,
            Paginator_1.Paginator,
            BootstrapPaginator_1.BootstrapPaginator
        ]
    })
], DataTableModule);
exports.DataTableModule = DataTableModule;
//# sourceMappingURL=DataTableModule.js.map

/***/ }),

/***/ 1335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_toastr__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ordens_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ordens_add_modal_ordens_add_modal_component__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ordens_edit_modal_ordens_edit_modal_component__ = __webpack_require__(570);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__abonos_components_abonos_table_abonos_add_modal_abonos_add_modal_component__ = __webpack_require__(544);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ordenestados_components_ordenestados_table_ordenestados_add_modal_ordenestados_add_modal_component__ = __webpack_require__(540);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ordenproductos_components_ordenproductos_table_ordenproductos_add_modal_ordenproductos_add_modal_component__ = __webpack_require__(180);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdensTableComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










// import ExportToCSV from "@molteni/export-csv";
var OrdensTableComponent = (function () {
    function OrdensTableComponent(service, toastrService, dialogService, route, router) {
        this.service = service;
        this.toastrService = toastrService;
        this.dialogService = dialogService;
        this.route = route;
        this.router = router;
        this.filterQuery = '';
        this.rowsOnPage = 10;
        this.sortBy = 'idorden';
        this.sortOrder = 'asc';
    }
    OrdensTableComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (params['idcliente'] !== undefined) {
                var idcliente = +params['idcliente'];
                _this.findByIdCliente(idcliente);
                _this.backpage = true;
            }
            if (!_this.backpage) {
                _this.getAll();
            }
        });
    };
    OrdensTableComponent.prototype.descargarCSV = function () {
        // const exporter = new ExportToCSV();
        // exporter.exportColumnsToCSV(this.data, 'ordenes.csv');
    };
    OrdensTableComponent.prototype.entregarOrden = function (ordens) {
        var _this = this;
        this.service.entregarOrden(ordens)
            .subscribe(function (data) {
            if (data.success) {
                _this.toastrService.success(data.message);
                _this.route.params.subscribe(function (params) {
                    if (params['idcliente'] !== undefined) {
                        var idcliente = +params['idcliente'];
                        _this.findByIdCliente(idcliente);
                        _this.backpage = true;
                    }
                    if (!_this.backpage) {
                        _this.getAll();
                    }
                });
            }
            else {
                _this.toastrService.error(data.message);
            }
        }, function (error) { return console.log(error); }, function () { return console.log('Get all Items complete'); });
    };
    OrdensTableComponent.prototype.finalizarOrden = function (ordens) {
        var _this = this;
        this.service.finalizarOrden(ordens)
            .subscribe(function (data) {
            if (data.success) {
                _this.toastrService.success(data.message);
                _this.route.params.subscribe(function (params) {
                    if (params['idcliente'] !== undefined) {
                        var idcliente = +params['idcliente'];
                        _this.findByIdCliente(idcliente);
                        _this.backpage = true;
                    }
                    if (!_this.backpage) {
                        _this.getAll();
                    }
                });
            }
            else {
                _this.toastrService.error(data.message);
            }
        }, function (error) { return console.log(error); }, function () { return console.log('Get all Items complete'); });
    };
    OrdensTableComponent.prototype.sendFactura = function (ordens) {
        var innerHTML = "\n        <html>\n        <head>\n        <title>\n          Factura\n        </title>\n        </head>\n        <body>\n          <h2>Informaci\u00F3n de Factura</h2>\n          <table>\n            <tr>\n              <td>\n              <label for=\"inputorden_idordenAC\" style=\"font-weight: bold;\">N\u00F3 de Orden</label>\n              </td>\n              <td>\n              " + ordens.idorden + "\n              </td>\n            </tr>\n            <tr>\n              <td>\n              <label for=\"inputorden_idordenAC\" style=\"font-weight: bold;\">Cliente</label>\n              </td>\n              <td>\n              " + ordens.cliente_cliente_idcliente + "\n              </td>\n            </tr>\n            <tr>\n              <td>\n              <label for=\"inputadeudoAnteriorAC\" style=\"font-weight: bold;\">Subtotal</label>\n              </td>\n              <td>\n              " + ordens.subtotal + "\n              </td>\n            </div>\n            <tr>\n              <td>\n              <label for=\"inputmontoPagadoAC\" style=\"font-weight: bold;\">Total</label>\n              </td>\n              <td>\n              " + ordens.total + "\n              </td>\n            </tr>\n            <tr>\n              <td>\n              <label for=\"inputadeudoActualAC\" style=\"font-weight: bold;\">Monto Cubierto</label>\n              </td>\n              <td>\n              " + ordens.cubierto + "\n              </td>\n            </tr>\n            <tr>\n              <td>\n              <label for=\"inputadeudoActualAC\" style=\"font-weight: bold;\">Monto Abonado</label>\n              </td>\n              <td>\n              " + ordens.abonado + "\n              </td>\n            </tr>\n            <tr>\n              <td>\n              <label for=\"inputadeudoActualAC\" style=\"font-weight: bold;\">Monto Adeudado</label>\n              </td>\n              <td>\n              " + ordens.adeudo + "\n              </td>\n            </tr>\n            <tr>\n              <td>\n              <label for=\"inputfechaAC\" style=\"font-weight: bold;\">Fecha</label>\n              </td>\n              <td>\n                " + ordens.fecha + "\n              </td>\n            </tr>\n            <tr>\n              <td>\n              <label for=\"inputhoraAC\" style=\"font-weight: bold;\">Hora</label>\n              </td>\n              <td>\n              " + ordens.hora + "\n              </td>\n            </tr>\n          </table>\n        </body>\n        </html> \n      ";
        var ventimp = window.open(' ', 'popimpr');
        ventimp.document.write(innerHTML);
        ventimp.document.close();
        ventimp.print();
        ventimp.close();
    };
    OrdensTableComponent.prototype.printOrden = function (ordens) {
        var innerHTML = "\n        <html>\n        <head>\n        <title>\n          Informaci\u00F3n de Orden Immprenzza\n        </title>\n        </head>\n        <body>\n          <h1>Informaci\u00F3n Orden</h1>\n          <table>\n            <tr>\n              <td>\n              <label for=\"inputorden_idordenAC\" style=\"font-weight: bold;\">N\u00F3 de Orden</label>\n              </td>\n              <td>\n              " + ordens.idorden + "\n              </td>\n            </tr>\n            <tr>\n              <td>\n              <label for=\"inputorden_idordenAC\" style=\"font-weight: bold;\">Cliente</label>\n              </td>\n              <td>\n              " + ordens.cliente_cliente_idcliente + "\n              </td>\n            </tr>\n            <tr>\n              <td>\n              <label for=\"inputadeudoAnteriorAC\" style=\"font-weight: bold;\">Subtotal</label>\n              </td>\n              <td>\n              " + ordens.subtotal + "\n              </td>\n            </div>\n            <tr>\n              <td>\n              <label for=\"inputmontoPagadoAC\" style=\"font-weight: bold;\">Total</label>\n              </td>\n              <td>\n              " + ordens.total + "\n              </td>\n            </tr>\n            <tr>\n              <td>\n              <label for=\"inputadeudoActualAC\" style=\"font-weight: bold;\">Monto Cubierto</label>\n              </td>\n              <td>\n              " + ordens.cubierto + "\n              </td>\n            </tr>\n            <tr>\n              <td>\n              <label for=\"inputadeudoActualAC\" style=\"font-weight: bold;\">Monto Abonado</label>\n              </td>\n              <td>\n              " + ordens.abonado + "\n              </td>\n            </tr>\n            <tr>\n              <td>\n              <label for=\"inputadeudoActualAC\" style=\"font-weight: bold;\">Monto Adeudado</label>\n              </td>\n              <td>\n              " + ordens.adeudo + "\n              </td>\n            </tr>\n            <tr>\n              <td>\n              <label for=\"inputadeudoActualAC\" style=\"font-weight: bold;\">Factura</label>\n              </td>\n              <td>\n              " + ((ordens.factura) ? 'Si' : 'No') + "\n              </td>\n            </tr>\n\n\n            <tr>\n              <td>\n              <label for=\"inputfechaAC\" style=\"font-weight: bold;\">Fecha</label>\n              </td>\n              <td>\n                " + ordens.fecha + "\n              </td>\n            </tr>\n            <tr>\n              <td>\n              <label for=\"inputhoraAC\" style=\"font-weight: bold;\">Hora</label>\n              </td>\n              <td>\n              " + ordens.hora + "\n              </td>\n            </tr>\n          </table>\n        </body>\n        </html> \n      ";
        var ventimp = window.open(' ', 'popimpr');
        ventimp.document.write(innerHTML);
        ventimp.document.close();
        ventimp.print();
        ventimp.close();
    };
    OrdensTableComponent.prototype.printReporte = function (ordens) {
        var innerHTML = "\n        <html>\n        <head>\n        <title>\n          Reporte de \u00D3rdenes\n        </title>\n        </head>\n        <body>\n          <h1 style=\"text-align: center;\">Reporte de \u00D3rdenes</h1>\n          <table>\n            <tr>\n              <th>\n                N\u00F3 de Orden\n              </th>\n              <th>\n                Cliente\n              </th>\n              <th>\n                Subtotal\n              </th>\n              <th>\n                Total\n              </th>\n              <th>\n                Monto Cubierto\n              </th>\n              <th>\n                Monto Abonado\n              </th>\n              <th>\n                Monto Adeudado\n              </th>\n              <th>\n                Factura\n              </th>\n              <th>\n                Fecha\n              </th>\n              <th>\n                Hora\n              </th>\n            </tr>";
        for (var element in ordens) {
            innerHTML += "\n            <tr>\n              <td>\n                " + ordens[element].idorden + "\n              </td>\n              <td>\n                " + ordens[element].cliente_cliente_idcliente + "\n              </td>\n              <td style=\"text-align: right;\">\n                " + ordens[element].subtotal + "\n              </td>\n              <td style=\"text-align: right;\">\n                " + ordens[element].total + "\n              </td>\n              <td style=\"text-align: right;\">\n                " + ordens[element].cubierto + "\n              </td>\n              <td style=\"text-align: right;\">\n                " + ordens[element].abonado + "\n              </td>\n              <td style=\"text-align: right;\">\n                " + ordens[element].adeudo + "\n              </td>\n              <td>\n                " + ((ordens[element].factura) ? 'Si' : 'No') + "\n              </td>\n              <td>\n                " + ordens[element].fecha + "\n              </td>\n              <td>\n                " + ordens[element].hora + "\n              </td>\n            </tr>";
        }
        innerHTML +=
            "</table>\n        </body>\n        </html> \n      ";
        var ventimp = window.open(' ', 'popimpr');
        ventimp.document.write(innerHTML);
        ventimp.document.close();
        ventimp.print();
        ventimp.close();
    };
    OrdensTableComponent.prototype.findByIdCliente = function (id) {
        var _this = this;
        this.service
            .findByIdCliente(id)
            .subscribe(function (data) {
            if (data.success) {
                _this.data = data.result;
            }
            else {
                _this.toastrService.error(data.message);
            }
        }, function (error) { return console.log(error); }, function () { return console.log('Get all Items complete'); });
    };
    OrdensTableComponent.prototype.backPage = function () {
        window.history.back();
    };
    OrdensTableComponent.prototype.insertAbono = function (ordens) {
        var _this = this;
        // Abono
        var abono = {
            'orden_idorden': ordens.idorden,
            'adeudoAnterior': ordens.adeudo
        };
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_7__abonos_components_abonos_table_abonos_add_modal_abonos_add_modal_component__["a" /* AbonosAddModalComponent */], abono)
            .subscribe(function (data) {
            if (data) {
                _this.abonoShowToast(data, ordens.idorden);
            }
        });
    };
    OrdensTableComponent.prototype.abonoShowToast = function (data, idorden) {
        var _this = this;
        if (data.success) {
            this.toastrService.success(data.message);
            // ACTUALIZAR MONTOS CON Orden  
            this.service
                .updateMontos(idorden)
                .subscribe(function (_data) {
                if (data.success) {
                    _this.showToast(_data);
                    _this.getAll();
                }
                else {
                    _this.toastrService.error(_data.message);
                }
            }, function (error) { return console.log(error); }, function () { return console.log('Get all Items complete'); });
        }
        else {
            this.toastrService.error(data.message);
        }
    };
    OrdensTableComponent.prototype.viewAbono = function (ordens) {
        this.router.navigate(["/pages/abonos/orden/" + ordens.idorden]);
    };
    OrdensTableComponent.prototype.insertOrdenestado = function (ordens) {
        var _this = this;
        var ordenestado = {
            orden_idorden: ordens.idorden
        };
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_8__ordenestados_components_ordenestados_table_ordenestados_add_modal_ordenestados_add_modal_component__["a" /* OrdenestadosAddModalComponent */], ordenestado)
            .subscribe(function (data) {
            if (data) {
                _this.ordenestadoShowToast(data);
            }
        });
    };
    OrdensTableComponent.prototype.ordenestadoShowToast = function (result) {
        if (result.success) {
            this.toastrService.success(result.message);
            this.getAll();
        }
        else {
            this.toastrService.error(result.message);
        }
    };
    OrdensTableComponent.prototype.viewOrdenestado = function (ordens) {
        this.router.navigate(["/pages/ordenestados/orden/" + ordens.idorden]);
    };
    OrdensTableComponent.prototype.insertOrdenproducto = function (ordens) {
        var _this = this;
        var ordenproducto = {
            orden_idorden: ordens.idorden
        };
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_9__ordenproductos_components_ordenproductos_table_ordenproductos_add_modal_ordenproductos_add_modal_component__["a" /* OrdenproductosAddModalComponent */], ordenproducto)
            .subscribe(function (data) {
            if (data) {
                _this.ordenproductoShowToast(data, ordens.idorden);
            }
        });
    };
    OrdensTableComponent.prototype.ordenproductoShowToast = function (data, idorden) {
        var _this = this;
        if (data.success) {
            this.toastrService.success(data.message);
            // ACTUALIZAR MONTOS CON Orden  
            this.service
                .updateMontos(idorden)
                .subscribe(function (_data) {
                if (data.success) {
                    _this.showToast(_data);
                    _this.getAll();
                }
                else {
                    _this.toastrService.error(_data.message);
                }
            }, function (error) { return console.log(error); }, function () { return console.log('Get all Items complete'); });
        }
        else {
            this.toastrService.error(data.message);
        }
    };
    OrdensTableComponent.prototype.viewOrdenproducto = function (ordens) {
        this.router.navigate(["/pages/ordenproductos/orden/" + ordens.idorden]);
    };
    OrdensTableComponent.prototype.addModalShow = function () {
        var _this = this;
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_5__ordens_add_modal_ordens_add_modal_component__["a" /* OrdensAddModalComponent */])
            .subscribe(function (data) {
            if (data) {
                _this.showToast(data);
            }
        });
    };
    OrdensTableComponent.prototype.editModalShow = function (ordens) {
        var _this = this;
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_6__ordens_edit_modal_ordens_edit_modal_component__["a" /* OrdensEditModalComponent */], ordens)
            .subscribe(function (data) {
            if (data) {
                _this.showToast(data);
            }
        }, function (error) { return console.log(error); }, function () { return console.log('Modified complete'); });
    };
    OrdensTableComponent.prototype.onDeleteConfirm = function (event, item) {
        var _this = this;
        if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
            this.service.remove(item.idorden)
                .subscribe(function (data) { return _this.showToast(data); }, function (error) { return console.log(error); }, function () { return console.log('Delete completed'); });
        }
        else {
            console.log('item cancelado');
        }
    };
    OrdensTableComponent.prototype.showToast = function (result) {
        if (result.success) {
            this.toastrService.success(result.message);
            this.getAll();
        }
        else {
            this.toastrService.error(result.message);
        }
    };
    OrdensTableComponent.prototype.getAll = function () {
        var _this = this;
        this.service
            .all()
            .subscribe(function (data) {
            if (data.success) {
                _this.data = data.result;
            }
            else {
                _this.toastrService.error(data.message);
            }
        }, function (error) { return console.log(error); }, function () { return console.log('Get all Items complete'); });
    };
    return OrdensTableComponent;
}());
OrdensTableComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Component"])({
        selector: 'ordens-table',
        template: __webpack_require__(1533),
        styles: [__webpack_require__(1463)],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__ordens_service__["a" /* OrdensService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ordens_service__["a" /* OrdensService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ngx_toastr__["b" /* ToastrService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ngx_toastr__["b" /* ToastrService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* ActivatedRoute */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* Router */]) === "function" && _e || Object])
], OrdensTableComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=ordens-table.component.js.map

/***/ }),

/***/ 1336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdensComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var OrdensComponent = (function () {
    function OrdensComponent() {
    }
    OrdensComponent.prototype.ngOnInit = function () {
    };
    return OrdensComponent;
}());
OrdensComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ordens',
        template: __webpack_require__(1534)
    }),
    __metadata("design:paramtypes", [])
], OrdensComponent);

//# sourceMappingURL=ordens.component.js.map

/***/ }),

/***/ 1410:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ordens_component__ = __webpack_require__(1336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_ordens_table_ordens_table_component__ = __webpack_require__(1335);
/* unused harmony export routes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });



// noinspection TypeScriptValidateTypes
var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_1__ordens_component__["a" /* OrdensComponent */],
        children: [
            { path: 'ordens-table', component: __WEBPACK_IMPORTED_MODULE_2__components_ordens_table_ordens_table_component__["a" /* OrdensTableComponent */] }
        ]
    }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* RouterModule */].forChild(routes);
//# sourceMappingURL=ordens.routing.js.map

/***/ }),

/***/ 1463:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, ":host /deep/ .widgets .data-table-container {\n  width: 100%; }\n  :host /deep/ .widgets .data-table-container .panel-heading {\n    margin-top: 25px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1533:
/***/ (function(module, exports) {

module.exports = "<div class='widgets'>\r\n    <div class='row'>\r\n        <ba-card title='Listado' baCardClass='with-scroll' class='data-table-container'>\r\n            <div class='panel panel-default'>\r\n                <div class=\"panel-heading\" *ngIf=\"backpage\"><h2>Información de Orden</h2></div>\r\n                <table class='table table-striped' [mfData]='data | fechaDataFilter : filterQuery1 | fechaEntregaEstimadaDataFilter : filterQuery2 | fechaEntregaRealDataFilter : filterQuery3 | fechaInicioEstimadaDataFilter : filterQuery4 | cliente_cliente_idclienteDataFilter : filterQuery5 | estado_estado_idestadoDataFilter : filterQuery6' #mf='mfDataTable' [mfRowsOnPage]='rowsOnPage' [(mfSortBy)]='sortBy' [(mfSortOrder)]='sortOrder'>\r\n                    <thead>\r\n                        <tr>\r\n                            <th colspan='3' class='text-left'>\r\n                                Filtrar por Estado:\r\n                                <input class='form-control' [(ngModel)]='filterQuery6' />\r\n                            </th>\r\n                            <th colspan='3' class='text-left'>\r\n                                Filtrar por Cliente:\r\n                                <input class='form-control' [(ngModel)]='filterQuery5' />\r\n                            </th>\r\n                            <th colspan='3' class='text-left'>\r\n                                Filtrar por Fecha:\r\n                                <input class='form-control' [(ngModel)]='filterQuery1' type=\"date\"/>\r\n                            </th>\r\n                            <th colspan='3' class='text-left'>\r\n                                Filtrar por Fecha Estimada de Entrega:\r\n                                <input class='form-control' [(ngModel)]='filterQuery2' type=\"date\" />\r\n                            </th>\r\n                            <th colspan='3' class='text-left'>\r\n                                Filtrar por Fecha Real de Entrega:\r\n                                <input class='form-control' [(ngModel)]='filterQuery3'  type=\"date\"/>\r\n                            </th>\r\n                            <th colspan='3' class='text-left'>\r\n                                Filtrar por Fecha de Inicio Estimada:\r\n                                <input class='form-control' [(ngModel)]='filterQuery4'  type=\"date\"/>\r\n                            </th>\r\n                        </tr>\r\n                        <tr>\r\n                            <th style='width: 20%'></th>\r\n                            <th style='width: 5%'>\r\n                                <mfDefaultSorter by='idorden'>Número de Orden</mfDefaultSorter>\r\n                            </th>\r\n                            <th style='width: 5%'>\r\n                                <mfDefaultSorter by='cliente_cliente_idcliente'>Cliente</mfDefaultSorter>\r\n                            </th>\r\n                            <th style='width: 5%'>\r\n                                <mfDefaultSorter by='estado_estado_idestado'>Estado</mfDefaultSorter>\r\n                            </th>\r\n                            <th style='width: 5%'>\r\n                                <mfDefaultSorter by='fecha'>Fecha</mfDefaultSorter>\r\n                            </th>\r\n                            <th style='width: 5%'>\r\n                                <mfDefaultSorter by='hora'>Hora</mfDefaultSorter>\r\n                            </th>\r\n                            <th style='width: 5%'>\r\n                                <mfDefaultSorter by='fechaEntregaEstimada'>Fecha Estimada de Entrega</mfDefaultSorter>\r\n                            </th>\r\n                            <th style='width: 5%'>\r\n                                <mfDefaultSorter by='horaEntregaEstimada'>Hora Estimada de Entrega</mfDefaultSorter>\r\n                            </th>\r\n                            <th style='width: 5%'>\r\n                                <mfDefaultSorter by='fechaEntregaReal'>Fecha Real de Entrega</mfDefaultSorter>\r\n                            </th>\r\n                            <th style='width: 5%'>\r\n                                <mfDefaultSorter by='horaEntregaReal'>Hora Real de Entrega</mfDefaultSorter>\r\n                            </th>\r\n                            <th style='width: 5%'>\r\n                                <mfDefaultSorter by='fechaInicioEstimada'>Fecha Estimada de Inicio</mfDefaultSorter>\r\n                            </th>\r\n                            <th style='width: 5%'>\r\n                                <mfDefaultSorter by='horaInicioEstimada'>Hora Estimada de Inicio</mfDefaultSorter>\r\n                            </th>\r\n                            <th style='width: 5%'>\r\n                                <mfDefaultSorter by='subtotal'>Subtotal</mfDefaultSorter>\r\n                            </th>\r\n                            <th style='width: 5%'>\r\n                                <mfDefaultSorter by='total'>Total</mfDefaultSorter>\r\n                            </th>\r\n                            <th style='width: 5%'>\r\n                                <mfDefaultSorter by='cubierto'>Monto Cubierto</mfDefaultSorter>\r\n                            </th>\r\n                            <th style='width: 5%'>\r\n                                <mfDefaultSorter by='abonado'>Monto Abonado</mfDefaultSorter>\r\n                            </th>\r\n                            <th style='width: 5%'>\r\n                                <mfDefaultSorter by='adeudo'>Monto Adeudado</mfDefaultSorter>\r\n                            </th>\r\n                            <th style='width: 5%'>\r\n                                <mfDefaultSorter by='factura'>Factura</mfDefaultSorter>\r\n                            </th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <tr *ngFor='let item of mf.data;  let i = index'>\r\n                            <td>\r\n                                <button title='Finalizar Orden' (click)='finalizarOrden(item)' class='btn btn-sm btn-success'><i class='fa fa-check-square'></i> Finalizar Orden</button>\r\n                                <button title='Entregar Orden' (click)='entregarOrden(item)' class='btn btn-sm btn-info'><i class='fa fa-check'></i> Entregar Orden</button>\r\n                                <button title='Imprimir Orden' (click)='printOrden(item)' class='btn btn-sm btn-primary'><i class='fa fa-print'></i> Imprimir Orden</button>\r\n                                <!--<button title='Ver Factura' (click)='sendFactura(item)' class='btn btn-sm btn-default'><i class='fa fa-dollar'></i> Ver Factura</button>-->\r\n                                <button title='Agregar Abono' (click)='insertAbono(item)' class='btn btn-sm btn-success'><i class='fa fa-plus'></i> Agregar Abono</button>\r\n                                <button title='Ver Abono' (click)='viewAbono(item)' class='btn btn-sm btn-warning'><i class='fa fa-eye'></i> Ver Abono(s)</button>\r\n                                <button title='Agregar Estado' (click)='insertOrdenestado(item)' class='btn btn-sm btn-success'><i class='fa fa-plus'></i> Agregar Estado</button>\r\n                                <button title='Ver Estado' (click)='viewOrdenestado(item)' class='btn btn-sm btn-warning'><i class='fa fa-eye'></i> Ver Estado(s)</button>\r\n                                <button title='Agregar Producto' (click)='insertOrdenproducto(item)' class='btn btn-sm btn-success'><i class='fa fa-plus'></i> Agregar Producto</button>\r\n                                <button title='Ver Producto' (click)='viewOrdenproducto(item)' class='btn btn-sm btn-warning'><i class='fa fa-eye'></i> Ver Producto(s)</button>\r\n                                <button title='Editar Registro' (click)='editModalShow(item)' class='btn btn-sm btn-info'><i class='fa fa-edit'></i></button>\r\n                                <button title='Eliminar Registro' (click)='onDeleteConfirm($event, item)' class='btn btn-sm btn-danger'><i class='fa fa-trash'></i></button>\r\n                            </td>\r\n                            <td>{{ item.idorden }}</td>\r\n                            <td>{{ item.cliente_cliente_idcliente }}</td>\r\n                            <td>{{ item.estado_estado_idestado }}</td>\r\n                            <td>{{ item.fecha | date:'dd/MM/y' }}</td>\r\n                            <td>{{ item.hora }}</td>\r\n                            <td>{{ item.fechaEntregaEstimada | date:'dd/MM/y' }}</td>\r\n                            <td>{{ item.horaEntregaEstimada  }}</td>\r\n                            <td>{{ item.fechaEntregaReal | date:'dd/MM/y' }}</td>\r\n                            <td>{{ item.horaEntregaReal }}</td>\r\n                            <td>{{ item.fechaInicioEstimada | date:'dd/MM/y' }}</td>\r\n                            <td>{{ item.horaInicioEstimada  }}</td>\r\n                            <td>{{ item.subtotal | currency: 'MXN' }}</td>\r\n                            <td>{{ item.total | currency: 'MXN' }}</td>\r\n                            <td>{{ item.cubierto | currency: 'MXN' }}</td>\r\n                            <td>{{ item.abonado | currency: 'MXN' }}</td>\r\n                            <td>{{ item.adeudo | currency: 'MXN' }}</td>\r\n                            <td>{{ item.factura ? 'Si' : 'No' }}</td>\r\n                        </tr>\r\n                    </tbody>\r\n                    <tfoot>\r\n                        <tr>\r\n                            <td colspan='5'>\r\n                                <mfBootstrapPaginator [rowsOnPageSet]='[5,10,15,25,50,100]'></mfBootstrapPaginator>\r\n                            </td>\r\n                        </tr>\r\n                    </tfoot>\r\n                </table>\r\n            </div>\r\n        </ba-card>\r\n    </div>\r\n    <div class='row'>\r\n        <div class='col-sm-2' *ngIf=\"!backpage\">\r\n            <button (click)='addModalShow()' class='btn btn-success'><i class='fa fa-plus'></i> Agregar</button>\r\n        </div>\r\n        <div class='col-sm-2'>\r\n            <!--<button (click)='descargarCSV()' class='btn btn-info'><i class='fa fa-print'></i> Descargar como CSV</button> -->\r\n            <button title='Imprimir Reporte' (click)='printReporte(data)' class='btn btn-sm btn-info'><i class='fa fa-print'></i> Imprimir Reporte</button>\r\n        </div>\r\n        <div class='col-sm-2' *ngIf=\"backpage\">\r\n            <button (click)='backPage()' class='btn btn-primary'><i class='fa fa-arrow-left'></i> Regresar</button>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ 1534:
/***/ (function(module, exports) {

module.exports = "  <ordens-table></ordens-table>\r\n"

/***/ })

});
//# sourceMappingURL=16.chunk.js.map