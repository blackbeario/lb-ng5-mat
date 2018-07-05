import {
    Component,
    Directive,
    ViewEncapsulation,
    Input,
    Output,
    Inject,
    forwardRef,
    EventEmitter,
    DoCheck,
    IterableDiffers,
    ViewChild,
    ContentChild,
    ContentChildren,
    QueryList,
    EmbeddedViewRef,
    TemplateRef,
    ViewContainerRef,
    ElementRef,
    AfterContentInit,
    OnInit,
    OnDestroy,
    ChangeDetectorRef
} from "@angular/core";

import {SmdPaginatorComponent} from "../smd-paginator/paginator.component";
import {Subscription} from "rxjs/Subscription";
import {MatDialogRef, MatCheckboxModule, MatDialog, MatDialogConfig} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

let columnIds = 0;

export class SmdDataRowModel {
    originalOrder?: number;

    constructor(
        public model: any,
        public checked?: boolean, public level?: number) {

        if (!this.level) {
            this.level = 0;
        }
    }
}

/**
 * Row Actions Dialog?
 */
@Component({
    selector: "smd-change-value-dialog",
    template: `
        <h1 *ngIf="title" mat-dialog-title>{{title}}</h1>
        <mat-dialog-content>
            <mat-input-container>
                <input type="text" matInput [placeholder]="placeholder" [(ngModel)]="value">
            </mat-input-container>
        </mat-dialog-content>
        <mat-dialog-actions>
            <button type="button" mat-button (click)="_cancel()">Cancel</button>
            <button type="button" mat-button (click)="_save()">Save</button>
        </mat-dialog-actions>
    `,
    styles: [`
        * {
            font-family: Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif;
        }

        mat-dialog-actions {
            float: right;
        }

        mat-dialog-content {
            min-width: 150px;
            padding: 5px 30px;
        }
    `]
})

export class SmdDatatableDialogChangeValue {

    public title: string;
    public placeholder: string;
    public value: string;

    constructor(public dialogRef: MatDialogRef<SmdDatatableDialogChangeValue>) {
    }

    _save() {
        this.dialogRef.close(this.value ? this.value : '');
    }

    _cancel() {
        this.dialogRef.close();
    }
}

/**
 * Datatable Cells
 */
@Directive({
    selector: '[smd-data-cell]'
})
export class SmdDataTableCellComponent implements OnInit, OnDestroy {
    @Input() column: SmdDataTableColumnComponent;
    @Input() data: any;
    @Input() row: SmdDataRowModel;
    @Input() templ: TemplateRef<SmdDataTableCellComponent>;

    childView: EmbeddedViewRef<SmdDataTableCellComponent>;

    constructor(
        private _viewContainer: ViewContainerRef,
        private _elementRef: ElementRef,
        private checkbox: MatCheckboxModule) {
    }

    ngOnInit(): void {
        if (this._viewContainer && this.templ) {
            this.childView = this._viewContainer.createEmbeddedView(this.templ, this);
        }
    }

    ngOnDestroy(): void {
        this.childView.destroy();
    }
}

/**
 * Datatable Rows
 */
@Component({
    selector: "[smd-datatable-row]",
    template:
        `<td *ngIf="renderCheckbox" class="smd-datatable-body-checkbox">
            <div class="smd-checkbox">
                <mat-checkbox [(ngModel)]="row.checked" (change)="_parent._onRowCheckChange(row)" aria-label="checkbox" ngDefaultControl>
                </mat-checkbox>
            </div>
        </td>
        <td *ngFor="let column of columns"
            [class.smd-numeric-column]="column.numeric"
            [class.smd-editable]="column.editable"
            (click)="_onClick(column, row.model)">
            <span class="smd-column-title">
                {{column.title}}
            </span>
            <span class="smd-cell-data">
                <ng-template smd-data-cell [column]="column" [row]="row" [data]="row.model" [templ]="column.template"></ng-template>
                <span class="smd-editable-field-placeholder" *ngIf="column.editable && !row.model[column.field]">{{column.editablePlaceholder}}</span>
            </span>
        </td>`
})

export class SmdDataTableRowComponent {
    @Input() row: SmdDataRowModel;
    @Input() renderCheckbox: boolean;
    @Input() columns: SmdDataTableColumnComponent[];

    constructor(
        @Inject(forwardRef(() => SmdDataTable))
        private _parent: SmdDataTable,
        public dialog: MatDialog,
        private viewContainerRef: ViewContainerRef) {
    }

    _onClick(column: SmdDataTableColumnComponent, model: any) {
        if (column.editable) {
            let dialogRef: MatDialogRef<SmdDatatableDialogChangeValue>;
            let dialogConfig = new MatDialogConfig();
            dialogConfig.viewContainerRef = this.viewContainerRef;

            dialogRef = this.dialog.open(SmdDatatableDialogChangeValue, dialogConfig);

            dialogRef.componentInstance.title = column.editablePlaceholder;
            dialogRef.componentInstance.placeholder = column.title;
            dialogRef.componentInstance.value = model[column.field];

            dialogRef.afterClosed().subscribe((result) => {
                if (typeof result == 'string') {
                    let oldValue = model[column.field];
                    if (oldValue != result) {
                        model[column.field] = result;
                        column.onFieldChange.emit({
                            model: model,
                            field: column.field,
                            oldValue: oldValue,
                            newValue: result
                        });
                    }
                }
            });
        }
    }

}


/**
 * Datatable Columns
 */
@Component({
    selector: "smd-datatable-column",
    template: `
        <ng-content select="template"></ng-content>
        <ng-template #internalTemplate *ngIf="!_template" let-model="data">
            {{getFieldValue(model)}}
        </ng-template>
    `
})
export class SmdDataTableColumnComponent implements OnInit {
    sortDir?: 'asc' | 'desc' = null;
    id: string = '' + ++columnIds;

    @Input() title: string;
    @Input() titleTooltip: string;
    @Input() field: string;
    @Input() numeric: boolean = false;
    @Input() sortable: boolean = false;
    @Input() sortFn: (a: any, b: any, sortDir: string) => number;
    @Input() filterFn: (a: any, text: string) => boolean;
    @Input() editable: boolean = false;
    @Input() editablePlaceholder: string;

    @ContentChild(TemplateRef) _customTemplate: TemplateRef<Object>;
    @ViewChild('internalTemplate') _internalTemplate: TemplateRef<Object>;

    @Output() onFieldChange: EventEmitter<any> = new EventEmitter<any>();

    get template() {
        return this._customTemplate ? this._customTemplate : this._internalTemplate;
    }

    get hasCustomTemplate(): boolean {
        return !!this._customTemplate;
    }

    constructor(private _viewContainer: ViewContainerRef, private elementRef: ElementRef) {
    }

    ngOnInit(): void {
        if (!this.title) {
            throw new Error('Title is mandatory on smd-datatable-column');
        }
        if (!this.field) {
            throw new Error('Field is mandatory on smd-datatable-column');
        }
    }

    getFieldValue(model: any) {
        return model[this.field];
    }
}


/**
 * Datatable Action button
 */
@Component({
    selector: "smd-datatable-action-button",
    template: `
        <button mat-button
                color="primary"
                *ngIf="_checkButtonIsVisible()"
                (click)="_onButtonClick($event)">
               <mat-icon *ngIf="icon">{{icon}}</mat-icon>
            <span>{{label}}</span>
        </button>
    `
})
export class SmdDatatableActionButton {
    @Input() label: string;
    @Input() icon?: string;
    @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

    constructor(@Inject(forwardRef(() => SmdDataTable)) private _parent: SmdDataTable) {
    }

    _onButtonClick(event: Event) {
        this.onClick.emit();
    }

    _checkButtonIsVisible() {
        return this._parent.selectedRows().length == 0;
    }
}


/**
 * Datatable Contextual button
 */
@Component({
    selector: "smd-datatable-contextual-button",
    template: `
        <button mat-icon-button
                *ngIf="_checkButtonIsVisible()"
                (click)="_onButtonClick($event)">
            <mat-icon>{{icon}}</mat-icon>
        </button>
    `
})

export class SmdContextualDatatableButton {
    @Input() icon: string;
    @Input() minimumSelected: number = -1;
    @Input() maxSelected: number = -1;
    @Output() onClick: EventEmitter<any[]> = new EventEmitter<any[]>();

    constructor(@Inject(forwardRef(() => SmdDataTable)) private _parent: SmdDataTable) {
    }

    _onButtonClick(event: Event) {
        this.onClick.emit(this._parent.selectedModels());
    }

    _checkButtonIsVisible() {
        let shouldShow = true;
        if (this.minimumSelected != null && this.minimumSelected > 0 && this._parent.selectedRows().length < this.minimumSelected) {
            shouldShow = false;
        }
        if (shouldShow && this.maxSelected > 0 && this._parent.selectedRows().length > this.maxSelected) {
            shouldShow = false;
        }
        return shouldShow;
    }
}


/**
 * Datatable Header
 */
@Component({
    selector: "smd-datatable-header",
    template: `
        <div>
            <span *ngIf="title && !_hasRowsSelected()">{{title}}</span>
            <ng-content select="smd-datatable-action-button"></ng-content>
            <span *ngIf="_hasRowsSelected()">
                {{_selectedRowsLength()}} {{_selectedRowsLength() == 1 ? 'item selected' : 'items selected'}}
            </span>
        </div>
        <span>
            <div>
                <mat-input-container *ngIf="enableFilter && _selectedRowsLength() == 0">
                  <input mdInput [placeholder]="filterLabel" [(ngModel)]="filterValue" (keyup)="_onFilter($event)">
                </mat-input-container>
                <ng-content select="smd-datatable-contextual-button"></ng-content>
            </div>
        </span>
    `,
    host: {
        '[class.is-selected]': '_hasRowsSelected()'
    }
})

export class SmdDatatableHeader implements AfterContentInit, OnDestroy {

    private filterTimeout: any;
    public filterValue: string;

    @Input() title: string = null;
    @Input() enableFilter: boolean = false;
    @Input() filterLabel: string = "Filter";
    @Input() filterDelay: number = 500;

    @ContentChildren(SmdDatatableActionButton) actionButtons: QueryList<SmdDatatableActionButton>;
    @ContentChildren(SmdContextualDatatableButton) contextualButtons: QueryList<SmdContextualDatatableButton>;

    constructor(@Inject(forwardRef(() => SmdDataTable)) private _parent: SmdDataTable) {
    }

    public shouldRenderCheckbox() {
        return this.contextualButtons && this.contextualButtons.toArray().filter((button: SmdContextualDatatableButton) => button.minimumSelected > 0).length > 0;
    }

    private _hasRowsSelected(): boolean {
        return this._parent.selectedRows().length > 0;
    }

    private _selectedRowsLength(): number {
        return this._parent.selectedRows().length;
    }

    private _onFilter(event: any): void {
        if (this.filterTimeout) {
            clearTimeout(this.filterTimeout);
        }

        this.filterTimeout = setTimeout(() => {
            this._parent._onFilter(event);
            this.filterTimeout = null;
        }, this.filterDelay);
    }

    ngAfterContentInit(): void {
        if (this.title && this.actionButtons.length > 0) {
            throw new Error('You must either define a title or action buttons to the datatable-header, not both');
        }
    }

    ngOnDestroy(): void {
        if (this.filterTimeout) {
            clearTimeout(this.filterTimeout);
        }
    }
}


/**
 * Main Datatable Component
 */
@Component({
    selector: "smd-datatable",
    templateUrl: "./datatable.component.html",
    styleUrls: ["./datatable.component.scss"],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.smd-responsive]': 'responsive'
    }
})
export class SmdDataTable implements DoCheck, AfterContentInit, OnDestroy {

    private rows: SmdDataRowModel[] = [];
    private visibleRows: SmdDataRowModel[] = [];
    private differ: any;
    private _columnsSubscription: Subscription;

    get rowCount(): number {
        return this.counts;
    }

    @ViewChild(SmdPaginatorComponent) paginatorComponent: SmdPaginatorComponent;
    @ContentChild(SmdDatatableHeader) header: SmdDatatableHeader;
    @ContentChildren(SmdDataTableColumnComponent) columns: QueryList<SmdDataTableColumnComponent>;

    @Input() models: any[] = [];
    @Input() checked: boolean = false;
    @Input() paginated: boolean = true;
    @Input() paginatorRanges: number[] = [5, 10, 25, 50, 100];
    @Input() responsive: boolean = false;
    @Input() counts: number = 0;

    @Output() onRowSelected: EventEmitter<{model: any, checked: boolean}> = new EventEmitter<{model: any, checked: boolean}>();
    @Output() onAllRowsSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() pageChange: EventEmitter<any> = new EventEmitter<any>();

    private findLevel: number = 0;

    constructor(
        differs: IterableDiffers,
        private _viewContainer: ViewContainerRef,
        public changeDetector: ChangeDetectorRef) {
        this.differ = differs.find([]).create(null);
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      }

    ngAfterContentInit() {
        this._updateRows();
        this._columnsSubscription = this.columns.changes.subscribe(() => {
            this._updateRows();
            this.changeDetector.markForCheck();
        });
    }

    ngDoCheck(): void {
        let changes = this.differ.diff(this.models);
        if (changes) {
            if (this.columns) {
                this._updateRows();
            }
        }
    }

    ngOnDestroy(): void {
        this._columnsSubscription.unsubscribe();
    }

    _updateRows() {
        if (this.models) {
            this.rows.length = 0;

            this.findLevel = 0;

            this._loopModels(this.models);

            this.rows = this.rows.filter((row: SmdDataRowModel) => this._matches(row, this.columns.toArray(), this.header.filterValue));
            this.rows.forEach((row, index) => row.originalOrder = index);
            this._updateVisibleRows();
        }
    }

    _loopModels(models: any[], level = 0) {

        for (let i = 0; i < models.length; i++) {
            let data = new SmdDataRowModel(models[i], this.checked, this.findLevel);
            this.rows.push(data);
            if (models[i].children && models[i].children.length) {
                this.findLevel = this.findLevel + 1;
                this._loopModels(models[i].children, this.findLevel);
            }
            if (i == models.length - 1) {
                this.findLevel = (level - 1);
            }
        }

        /*this.models.forEach((model: any, index: number) => {
         this.rows[index] = new SmdDataRowModel(model, this.checked);

         });*/
    }


    _matches(row: SmdDataRowModel, columns: SmdDataTableColumnComponent[], text: string): boolean {
        if (typeof (text) == "undefined" || text == null || text.trim() == '') {
            return true;
        }

        let subtexts: string[] = text.trim().split(" ");
        for (let subtext of subtexts) {
            for (let column of columns) {
                let filterFn = this._filterValue;
                let value = column.getFieldValue(row.model);
                if (column.hasCustomTemplate) {
                    value = row.model;
                    filterFn = column.filterFn ? column.filterFn : (value: any, text: string) => false;
                }
                if (filterFn(value, subtext)) {
                    return true;
                }
            }
        }
        return false;
    }

    private _filterValue(value: any, text: string): boolean {
        return value && value.toString().toUpperCase().indexOf(text.toString().toUpperCase()) > -1;
    }

    selectedRows(): SmdDataRowModel[] {
        return this.rows.filter(row => row.checked);
    }

    selectedModels(): any[] {
        return this.selectedRows().map(row => row.model);
    }

    _onMasterCheckChange() {
        this.rows
            .forEach(
                (row: SmdDataRowModel) => {
                    if (row.checked != this.checked) {
                        row.checked = this.checked;
                    }
                }
            );
        this.onAllRowsSelected.emit(this.checked);
    }

    _onRowCheckChange(row: SmdDataRowModel) {
        let isMasterChecked = this.checked;
        if (row.checked) {
            if (this.rows.filter((row) => row.checked).length == this.rows.length) {
                this.checked = true;
            }
        } else {
            if (this.checked) {
                this.checked = false;
            }
        }
        this.onRowSelected.emit({
            model: row.model,
            checked: row.checked
        });

        if (this.checked != isMasterChecked) {
            this.onAllRowsSelected.emit(this.checked);
        }
    }

    _onFilter(event: any): void {
        this.paginatorComponent.reset();
        this._updateRows();
    }

    _sortColumn(column: SmdDataTableColumnComponent) {
        if (column.sortable) {
            this.columns.filter((col) => col.id != column.id).forEach((col) => col.sortDir = null);

            if (!column.sortDir) {
                column.sortDir = 'asc';
            } else {
                column.sortDir = column.sortDir == 'asc' ? 'desc' : null;
            }

            if (column.sortDir != null) {
                this.rows.sort((itemA: SmdDataRowModel, itemB: SmdDataRowModel) => {
                    let sortFn = column.sortFn ? column.sortFn : this._sortRows;
                    let a = itemA.model;
                    let b = itemB.model;
                    if (!column.sortFn) {
                        a = column.getFieldValue(itemA.model);
                        b = column.getFieldValue(itemB.model);
                    }
                    return sortFn(a, b, column.sortDir);
                });
            } else {
                this.rows.sort((itemA: SmdDataRowModel, itemB: SmdDataRowModel) => {
                    return this._sortRows(itemA.originalOrder, itemB.originalOrder);
                });
            }
            this._updateVisibleRows();
        }
    }

    _sortRows(a: any, b: any, sortDir: string = 'asc') {
        let dir = (sortDir == 'asc' ? 1 : -1);
        if (a > b) {
            return 1 * dir;
        }
        if (a < b) {
            return -1 * dir;
        }
        return 0;
    }

    _onPageChange(event: any) {
        this.pageChange.emit(event);
        this._updateVisibleRows()
    }

    _columnTemplates() {
        return this.columns.toArray().map((c) => c.template);
    }

    public refresh() {
        this._updateRows();
    }

    private _updateVisibleRows() {
        if (this.paginated) {
            this.visibleRows = this.rows.filter((value: SmdDataRowModel, index: number) => this.paginatorComponent.currentPage.isInsidePage(index));
        } else {
            this.visibleRows = this.rows;
        }
    }

    private _shouldRenderCheckbox() {
        return this.rows.length > 0 && this.header.shouldRenderCheckbox();
    }
}