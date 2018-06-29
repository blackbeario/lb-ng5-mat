import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { MatTableDataSource, MatPaginator, MatSort, Sort, MatDialog } from '@angular/material';
import { Subscription } from "rxjs/Subscription";
import { UserService } from '../../shared/services/custom/user.service';
import { User } from '../../shared/models/user.model';
import {Observable} from 'rxjs/Observable';
import {AppService} from "../../shared/services/app.service";
import { RealtimeService } from '../../shared/services/core/realtime.service';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.css']
})

export class MaterialTableComponent implements OnInit {

  constructor(
    private userService: UserService,
    private app: AppService,
    private realtime: RealtimeService) {}

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
    this.app.setTitle("Test Users");
    // Initialize the pager.
    this.dataSource.paginator = this.paginator;
    // Subscribes to the user observable.
    this.userService.find().subscribe((users: User[]) => {
      // Adds the data to our empty table.
      this.dataSource.data = users;
    });
  }

  addUser() {
    this.userService.patchOrCreate();
  }

  applyFilter(filterValue: string) {
    // Remove whitespace.
    filterValue = filterValue.trim();
    // MatTableDataSource defaults to lowercase matches.
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
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
  masterToggle() {
    this.isAllSelected() ?
    this.selection.clear() :
    this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
