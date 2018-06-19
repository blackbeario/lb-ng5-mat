import { MatButtonModule, MatDialogModule, MatToolbarModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatListModule, MatProgressSpinnerModule, MatCardModule, MatSidenavModule, MatTreeModule, MatIconModule, MatMenuModule } from '@angular/material';

import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [MatButtonModule, MatDialogModule, MatToolbarModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatListModule, MatProgressSpinnerModule, MatCardModule, MatSidenavModule, MatTreeModule, MatIconModule, MatMenuModule],

  exports: [MatButtonModule, MatDialogModule, MatToolbarModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatListModule, MatProgressSpinnerModule, MatCardModule, MatSidenavModule, MatTreeModule, MatIconModule, MatMenuModule],
})

export class MaterialModule {
}