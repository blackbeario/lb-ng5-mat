import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { UserService } from '../../services/custom/user.service';
import { User } from '../../models/user.model';
import { AppService } from "../../services/app.service";

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
    private userService: UserService,
    private app: AppService) {}

  // Initialize a new table.
  dataSource = new MatTableDataSource();
  // Define the columns
  displayedColumns = ['select', 'username', 'email', 'roles', 'created', 'updated'];
  // Row Selection
  selection = new SelectionModel<User>(true, []);
  row: any;
  // private _columnSubscribe: Subscription;  // for checkbox logic added later
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    // Initialize the pager.
    this.dataSource.paginator = this.paginator;
    // Subscribes to the user observable.
    this.userService.find().subscribe((users: User[]) => {
      // Adds the data to our empty table.
      this.dataSource.data = users;
    });
  }

  // openSnackBar() {
  //   this.snackBar.openFromComponent(SnackBarComponent, {
  //     data: `{{selection.selected.length}}
  //     {{selection.selected.length == 1 ? 'user' : 'users'}}
  //     selected (out of {{dataSource.data.length}})`,
  //     duration: 1500,
  //   });
  // }

  filterValue:string = '';
  applyFilter(filterValue: string) {
    // Remove whitespace.
    filterValue = filterValue.trim();
    // MatTableDataSource defaults to lowercase matches.
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  clearFilter(filterValue: string) {
    this.filterValue = '';
    this.dataSource.filter = null;
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

/**
 * MatSnackBar as SnackBarComponent
 */
// @Component({
//   selector: 'snack-bar',
//   template: 'passed in {{ data }}',
// })
// export class SnackBarComponent {
//   constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
// }