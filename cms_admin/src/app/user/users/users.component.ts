import { Component, OnInit, ViewChild, ContentChild } from '@angular/core';
import { UserService } from "../../shared/services/custom/user.service";
import { UserFormComponent } from "../user-form/user-form.component";
import { AppService } from "../../shared/services/app.service";
import { RoleService } from "../../shared/services/custom/role.service";
import { LoopBackFilter } from "../../shared/models/base.model";
import { DialogService } from "../../shared/services/core/dialog.service";
import { RealtimeService } from '../../shared/services/core/realtime.service';
import { MaterialTableComponent } from '../../shared/components/material-table';
import { MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-users',
  template: `<material-table></material-table>`,
  styleUrls: ['./users.component.scss'],
  providers: [RealtimeService]
})
export class UsersComponent implements OnInit {

  @ViewChild(MaterialTableComponent) matTable: MaterialTableComponent;

  models: any[] = [];
  modelCounts: number = 0;
  roles: any[] = [];
  items: any[];

  currentPage: number = 1;

  filter: LoopBackFilter = {
  include: [{
    relation: 'roles',
      scope: {order: 'id DESC'}
    }],
  limit: 25,
  };

  errorMessage: string;

  constructor(
    private realtime: RealtimeService,
    private app: AppService,
    private roleService: RoleService,
    private userService: UserService,
    public dialog: MatDialog,
    public dialogService: DialogService) {
  }

  ngOnInit() {
    // For realtime data
    this.onUserCreate();

    // Subscribes to the Add button event in the ActionButton child component.
    this.matTable.addItem.click.subscribe((event) => {
      this.addItem(event);
    });

    // Subscribes to the Edit button event in the EditButton child component.
    this.matTable.editItem.click.subscribe((event) => {
    this.editItem();
    });

    // Subscribes to the Delete button event in the DeleteButton child component.
    if (this.matTable.deleteItem) {
      this.matTable.deleteItem.click.subscribe((event) => {
        this.deleteItems();
      });
    }

    this.app.setTitle("Users");
    this.userService.count().subscribe(res => {
      this.modelCounts = res.count;
    });
    // Get users data
    this.userService.find(this.filter).subscribe(users => {
      this.models = users;
    });
    // Get roles data
    this.roleService.find().subscribe(roles => {
      this.roles = roles;
    });
  }

  onUserCreate(): void {
    let options = {
      model: "user",
      method: "POST"
    };
    this.realtime.observable(options).subscribe(res => {
      console.log("Socket Data Found: ", res);
      this.models.push(res);
      this.modelCounts++;
    }, err => {
      console.log(err);
    });
  }

  addItem(event?: any) {
    let dialogRef = this.dialog.open(UserFormComponent, {
      width: '500px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((item: any) => {
      if (item) {
        // Commented out since we're using Realtime.js to refresh the model
        this.models.push(item);
        this.matTable.loadData();
      }
    });
  }

  editItem() {
    let item = this.matTable.selection.selected;
    let config: MatDialogConfig = {disableClose: true};
    let dialogRef = this.dialog.open(UserFormComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.componentInstance.selectedModel = JSON.parse(JSON.stringify(item));

    console.log(dialogRef.componentInstance.selectedModel)

    dialogRef.afterClosed().subscribe((response: any) => {
      if (response) {
        let indexValue = this.findIndexById(this.models, response);
        console.log(indexValue)
        if (indexValue !== null) {
          this.models[indexValue] = response;
        }
      }
    });
  }

  deleteItems() {
    let items = this.matTable.selection.selected;
    let dialogRef = this.dialogService.confirm("Are you sure?", "Are you sure want to delete " + items.length + " selected items This action can not be undone.");

    dialogRef.afterClosed().subscribe(confirm => {
      let data = this.matTable.dataSource.data;
      if (confirm) {
        if (items && items.length) {
          for (let i = 0; i < items.length; i++) {
            this.userService.deleteById(items[i].id).subscribe(() => {
              let indexValue = this.findIndexById(this.models, items[i]);
              if (indexValue !== null) {
                this.models.splice(indexValue, 1);
                this.matTable.dataSource = new MatTableDataSource(data);
              }
            });
            this.matTable.selection = new SelectionModel<User>(true, []);
          }
        }
      }
    });
  }

  findIndexById(items: any[], item: any): number {
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === item.id) {
        return i;
      }
    }
    return null;
  }

  onPageChange(event) {
    if (event.page > this.currentPage) {
      this.currentPage = event.page;
      this.filter.limit = event.size;
      this.filter.skip = event.size * (event.page - 1);
      this.userService.find(this.filter).subscribe(res => {
          this.models = this.models.concat(res);
      });
    } else {
        if (this.modelCounts > event.size) {
          this.currentPage = 1;
          this.filter.limit = event.size;
          this.filter.skip = 0;

          this.userService.find(this.filter).subscribe(data => {
              this.models = data;
          });
        }
      }
  }

}
