import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared/services/custom/user.service";
import {UserFormComponent} from "../user-form/user-form.component";
import {AppService} from "../../shared/services/app.service";
import {RoleService} from "../../shared/services/custom/role.service";
import {LoopBackFilter} from "../../shared/models/base.model";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    models: any[] = [];
    modelCounts: number = 0;
    roles: any[] = [];

    currentPage: number = 1;

    filter: LoopBackFilter = {
        include: [
            {
                relation: 'roles',
                scope: {order: 'id DESC'}
            }
        ],
        limit: 25,
    };

    errorMessage: string;

    constructor(
        private app: AppService,
        private roleService: RoleService,
        private userService: UserService) {
    }


    ngOnInit() {
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

    // addItem(event?: any) {
    //     let config: MatDialogConfig = {width: '500px'};
    //     let dialogRef = this.dialog.open(UserFormComponent, config);
    //     dialogRef.afterClosed().subscribe((item: any) => {
    //         if (item) {
    //             this.models.push(item);
    //         }
    //     });
    // }

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
