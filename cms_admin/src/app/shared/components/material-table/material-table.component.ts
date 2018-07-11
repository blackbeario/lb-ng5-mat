import { Component, AfterContentInit, OnInit, Output, Inject, forwardRef, EventEmitter, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { UserService } from '../../services/custom/user.service';
import { User } from '../../models/user.model';
import { AppService } from "../../services/app.service";

/**
 * Action button
 *
 * We use content projection to build a reusable material table component.
 */
@Component({
  selector: "action-button",
  template: `
    <button #addItem name="addItem" mat-raised-button color="primary" aria-label="Add Item" (click)="_onButtonClick($event)" class="addItem">Add
    </button>
  `
})
export class ActionButton {
  @Output() click: EventEmitter<void> = new EventEmitter<void>();
  constructor(
  @Inject(forwardRef(() => MaterialTableComponent))
    private _parent: MaterialTableComponent) {
  }
  _onButtonClick(event: Event) {
      this.click.emit();
  }
}

/**
 * Delete Button
 *
 * We use content projection to build a reusable material table component.
 */
@Component({
  selector: "delete-button",
  template: `
    <button #deleteItem name="deleteItem" *ngIf="!_parent.selection.isEmpty()" mat-raised-button color="warn" aria-label="Delete Item" (click)="_onButtonClick($event)" class="deleteItem">Delete
    </button>
  `
})
export class DeleteButton {
  @Output() click: EventEmitter<void> = new EventEmitter<void>();
  constructor(
  @Inject(forwardRef(() => MaterialTableComponent))
    private _parent: MaterialTableComponent) {
  }
  _onButtonClick(event: Event) {
      this.click.emit();
  }
}

/**
 * Edit Button
 *
 * We use content projection to build a reusable material table component.
 */
@Component({
  selector: "edit-button",
  template: `
    <button #editItem name="editItem" *ngIf="!_parent.selection.isEmpty() && _parent.numSelected() === 1" mat-raised-button color="accent" aria-label="Edit Item" (click)="_onButtonClick($event)" class="editItem">Edit
    </button>
  `
})
export class EditButton {
  @Output() click: EventEmitter<void> = new EventEmitter<void>();
  constructor(
  @Inject(forwardRef(() => MaterialTableComponent))
    private _parent: MaterialTableComponent) {
  }
  _onButtonClick(event: Event) {
      this.click.emit();
  }
}

/**
 * Table Filter
 *
 * We use content projection to build a reusable material table component.
 */
@Component({
  selector: "table-filter",
  template: `
    <mat-form-field floatPlaceholder="never">
      <input name="filterInput" [(ngModel)]="filterValue" matInput (keyup)="_parent.applyFilter($event.target.value)" placeholder="Filter" aria-label="Filter">
      <button #clearFilter *ngIf="filterValue" mat-icon-button aria-label="clear filter" title="clear filter" (click)="_parent.clearFilter()" class="clear-filter">
        <mat-icon>close</mat-icon>
      </button>
    </mat-form-field>
  `,
  styles: [`.clear-filter {position:absolute; right: -10px; top: -5px;}`]
})
export class TableFilter {
  filterValue:string;
  constructor(@Inject(forwardRef(() => MaterialTableComponent))
  private _parent: MaterialTableComponent) {
  }
}

/**
 * Table Header
 *
 * Using content projection to build a reusable material table component.
 */
@Component({
  selector: "mat-table-header",
  template: `
    <ng-content select="table-filter"></ng-content>
    <span class="action-buttons">
      <ng-content select="action-button"></ng-content>
      <ng-content select="edit-button"></ng-content>
      <ng-content select="delete-button"></ng-content>
    <span>
  `
})
export class TableHeader {
  constructor(@Inject(forwardRef(() => MaterialTableComponent)) private _parent: MaterialTableComponent) {
  }
}

/**
 * MaterialTableComponent
 */
@Component({
  selector: 'material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.scss']
})

export class MaterialTableComponent implements AfterContentInit {
  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  // Initialize a new table.
  dataSource = new MatTableDataSource();
  // Define the columns
  displayedColumns = ['select', 'username', 'email', 'roles', 'created', 'updated'];
  // Row Selection
  selection = new SelectionModel<User>(true, []);
  row: any[];
  selected: any[];
  selectedRowIndex: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(TableFilter) input: TableFilter;
  @ViewChild(ActionButton) addItem: ActionButton;
  @ViewChild(EditButton) editItem: EditButton;
  @ViewChild(DeleteButton) deleteItem: DeleteButton;

  ngAfterContentInit() {
    // Initialize the pager.
    this.dataSource.paginator = this.paginator;
    // Initialize the sorting.
    this.dataSource.sort = this.sort;
    // Subscribes to the user observable.
    this.loadData();
  }

  highlight(row){
    this.selectedRowIndex = row.id;
  }

  loadData() {
    this.userService.find().subscribe((users: User[]) => {
      // Adds the data to our empty table.
      this.dataSource.data = users;
    });
  }

  applyFilter(filterValue: string) {
    // Remove whitespace.
    filterValue = filterValue.trim();
    // MatTableDataSource defaults to lowercase matches.
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  clearFilter() {
    this.input.filterValue = '';
    this.dataSource.filter = null;
  }

  numSelected() {
    let numSelected = this.selection.selected.length;
    return numSelected;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection.
  */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() :
    this.dataSource.data.forEach(row => this.selection.select(<any>row));
  }
}