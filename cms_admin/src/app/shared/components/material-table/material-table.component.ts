import { Component, OnInit, OnChanges, OnDestroy, ElementRef, Input,
  Output, Inject, forwardRef, EventEmitter, AfterContentInit, ViewChild,
  ContentChild, ContentChildren, QueryList } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { UserService } from '../../services/custom/user.service';
import { User } from '../../models/user.model';
import { UserFormComponent } from "../../../user/user-form/user-form.component";
import { AppService } from "../../services/app.service";
import { UsersComponent } from '../../../user/users/users.component';

/**
 * Action button
 *
 * We use content projection to build a reusable material table component.
 */
@Component({
  selector: "action-button",
  template: `
    <button mat-raised-button color="primary" aria-label="Add Item"
      (click)="_parent.addItem($event)" class="addItem">Add
    </button>
  `
})
export class ActionButton {
  // @Output() click: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    @Inject(forwardRef(() => UsersComponent))
    private _parent: UsersComponent) {
  }

  // _onButtonClick(event: Event) {
  //     this.click.emit();
  // }
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
      <input name="filterValue" [(ngModel)]="filterValue" matInput (keyup)="_parent.applyFilter($event.target.value)" placeholder="Filter" aria-label="Filter">
      <button #clearFilter *ngIf="filterValue" mat-icon-button aria-label="clear filter" title="clear filter" (click)="_parent.clearFilter()" class="clear-filter">
        <mat-icon>close</mat-icon>
      </button>
    </mat-form-field>
  `,
  styles: [`.clear-filter {position:absolute; right: -10px; top: -5px;}`]
})
export class TableFilter {
  constructor(@Inject(forwardRef(() => MaterialTableComponent))
  private _parent: MaterialTableComponent) {
  }
}


/**
 * Table Header
 *
 * We use content projection to build a reusable material table component.
 */
@Component({
  selector: "mat-table-header",
  template: `
    <ng-content select="table-filter"></ng-content>
    <ng-content select="action-button"></ng-content>
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

export class MaterialTableComponent implements OnInit {
  constructor(
    @Inject(forwardRef(() => UsersComponent))
    private _parent: UsersComponent,
    private userService: UserService,
    private app: AppService,
    public dialog: MatDialog) {}

  // Initialize a new table.
  dataSource = new MatTableDataSource();
  // Define the columns
  displayedColumns = ['select', 'username', 'email', 'roles', 'created', 'updated'];
  // Row Selection
  selection = new SelectionModel<User>(true, []);
  row: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('filterValue') input: ElementRef;

  ngOnInit() {
    // Initialize the pager.
    this.dataSource.paginator = this.paginator;
    // Subscribes to the user observable.
    this.userService.find().subscribe((users: User[]) => {
      // Adds the data to our empty table.
      this.dataSource.data = users;
    });
  }

  filterValue:string = '';
  applyFilter(filterValue: string) {
    // Remove whitespace.
    filterValue = filterValue.trim();
    // MatTableDataSource defaults to lowercase matches.
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  public clearFilter(filterValue: string) {
    this.filterValue = ''; // Ugh, this isn't working now.
    this.dataSource.filter = null;  // But this works.
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection.
   *
   * This works in the application, but Typescript is complaining that
   * TS2345: Argument of type '{}' is not assignable to parameter of type 'User'. Property 'username' is missing in type '{}'.
   *
   * https://material.angular.io/components/table/overview#selection
  */
  // masterToggle() {
  //   this.isAllSelected() ? this.selection.clear() :
  //   this.dataSource.data.forEach(row => this.selection.select(row));
  // }
}