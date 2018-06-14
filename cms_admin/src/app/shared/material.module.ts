import { MatButtonModule, MatDialogModule, MatToolbarModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatProgressSpinnerModule, MatCardModule, MatSidenavModule, MatIconModule, MatMenuModule } from '@angular/material';

import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [MatButtonModule, MatDialogModule, MatToolbarModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatProgressSpinnerModule, MatCardModule, MatSidenavModule, MatIconModule, MatMenuModule],

  exports: [MatButtonModule, MatDialogModule, MatToolbarModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatProgressSpinnerModule, MatCardModule, MatSidenavModule, MatIconModule, MatMenuModule],
})

export class MaterialModule {
}