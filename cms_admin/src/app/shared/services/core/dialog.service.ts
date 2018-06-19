import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material";
import {ConfirmDialogComponent} from "../../dialogs/confirm-dialog/confirm-dialog.component";
// import {MediaDialogComponent} from "../../dialogs/media-dialog/media-dialog.component";

@Injectable()
export class DialogService {

    constructor(public dialog: MatDialog) {

    }

    confirm(title: string = "Are you sure?", message: string = "", actionTitle: string = "Confirm", cancelTitle: string = "Cancel", config:MatDialogConfig = {width: "300px"}):MatDialogRef<ConfirmDialogComponent> {

        let ref:MatDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent, config);
        ref.componentInstance.title = title;
        ref.componentInstance.message = message;
        ref.componentInstance.actionButton = actionTitle;
        ref.componentInstance.cancelButton = cancelTitle;

        return ref;
    }

    // openMediaPicker(title = "Select media", actionTitle = "Done", cancelTitle: string = "Cancel", uploadConfig?: {selectLimit:number, acceptedFiles?: string}, dialogConfig:MatDialogConfig = {width: "600px"}):MatDialogRef<MediaDialogComponent> {
    //     let ref:MatDialogRef<MediaDialogComponent> = this.dialog.open(MediaDialogComponent, dialogConfig);


    //     ref.componentInstance.title = title;
    //     ref.componentInstance.actionButton = actionTitle;
    //     ref.componentInstance.cancelButton = cancelTitle;

    //     ref.componentInstance.acceptedFiles = uploadConfig.acceptedFiles;
    //     ref.componentInstance.selectLimit = uploadConfig.selectLimit;

    //     return ref;
    // }

}
