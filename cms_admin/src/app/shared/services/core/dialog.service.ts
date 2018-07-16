import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material";
import {ConfirmDialogComponent} from "../../dialogs/confirm-dialog/confirm-dialog.component";

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
}
