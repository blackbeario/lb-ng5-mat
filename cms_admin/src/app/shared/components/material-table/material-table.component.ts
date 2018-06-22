import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { Subscription } from "rxjs/Subscription";
import { Observable } from 'rxjs/Rx';
import { UserService } from '../../services/custom/user.service';
import { User } from '../../models/user.model';
import { NodeService } from '../../services/custom/node.service';
import { Node } from '../../models/node.model';

@Component({
  selector: 'material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.css']
})

export class MaterialTableComponent implements OnInit {

  sortedData;

  constructor(
    private userService: UserService,
    private NodeService: NodeService,
    // private _parent: MaterialTableComponent,
  ) {
    this.sortedData = this.displayedColumns.slice();
  }

  row: any;
  // Get the data from an Observable from a service.
  dataSource = new UserDataSource(this.userService);
    // Define the columns
  displayedColumns = ['select', 'username', 'email', 'roles', 'created', 'updated'];
  // Row Selection
  selection = new SelectionModel<Element>(true, []);
  // private _columnSubscribe: Subscription;  // for checkbox logic added later
  // Initiate a pager
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // Initiate a sort feature
  // @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  // Filter the data
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    // this.dataSource.filter = filterValue;
  }

  sortData(sort: Sort) {
    const data = this.displayedColumns.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a: any, b: any) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'username': return compare(a.username, b.username, isAsc);
        case 'email': return compare(+a.email, +b.email, isAsc);
        case 'roles': return compare(+a.roles, +b.roles, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

  // private _hasRowsSelected(): boolean {
  //   return this._parent.selectedRows().length > 0;
  // }

  // private _selectedRowsLength(): number {
  //     return this._parent.selectedRows().length;
  // }

  /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected() ?
  //   this.selection.clear() :
  //   this.dataSource.data.forEach(row => this.selection.select(row));
  // }


/** This is where we get our data from the database,
 *  via the Loopback API.
 */
export class UserDataSource extends DataSource<any> {
  constructor(private userService: UserService) {
    super();
  }
  connect(): Observable<User[]> {
    return this.userService.find();
  }
  disconnect() {}
}

export class NodeDataSource extends DataSource<any> {
  constructor(private nodeService: NodeService) {
    super();
  }
  connect(): Observable<User[]> {
    return this.nodeService.find();
  }
  disconnect() {}
}