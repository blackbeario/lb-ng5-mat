import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared/services/custom/user.service";
import {UserFormComponent} from "../user-form/user-form.component";
import {AppService} from "../../shared/services/app.service";
import {RoleService} from "../../shared/services/custom/role.service";
import {LoopBackFilter} from "../../shared/models/base.model";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import { RealtimeService } from '../../shared/services/core/realtime.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [RealtimeService]
})
export class UsersComponent implements OnInit {

  models: any[] = [];
  modelCounts: number = 0;
  roles: any[] = [];

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
    public dialog: MatDialog) {
  }

  ngOnInit() {
    // For realtime data
    this.onUserCreate();

    this.app.setTitle("Users");
    this.userService.count().subscribe(res => {
      this.modelCounts = res.count;
    });
    this.userService.find(this.filter).subscribe(users => {
      this.models = users;
    });

    // get roles
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
        // this.models.push(item);
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


    // changeAvatar(model: any) {
    //     let dialogRef = this.dialogService.openMediaPicker("Select profile photo", "Set as profile", "Cancel", {
    //         selectLimit: 1,
    //         acceptedFiles: "image/jpeg,image/gif,image/png"
    //     });

    //     dialogRef.afterClosed().subscribe((data: any) => {
    //         if (data && data[0]) {
    //             // return array object of media
    //             let avatar = data[0];
    //             let obj = {
    //                 "mediaId": avatar.id
    //             };
    //             if (model.avatar) {
    //                 // delete first
    //                 this.userService.removeAvatar(model.id).subscribe(() => {
    //                     this.doChangeAvatar(model, obj, avatar);
    //                 }, () => {
    //                     this.doChangeAvatar(model, obj, avatar);
    //                 });
    //             } else {
    //                 this.doChangeAvatar(model, obj, avatar);
    //             }
    //         }
    //     });
    // }

    // doChangeAvatar(model: any, obj: any, avatar: any) {
    //     this.userService.updateAvatar(model.id, obj).subscribe(res => {
    //         model.avatar = {media: avatar};
    //     }, err => {
    //         this.errorMessage = err.message;
    //     });
    // }


}
