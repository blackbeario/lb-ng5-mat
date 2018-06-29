import { MatButtonModule, MatDialogModule, MatToolbarModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatListModule, MatProgressSpinnerModule, MatCardModule, MatSidenavModule, MatTreeModule, MatIconModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';

import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [MatButtonModule, MatDialogModule, MatToolbarModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatListModule, MatProgressSpinnerModule, MatCardModule, MatSidenavModule, MatTreeModule, MatIconModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule],

  exports: [MatButtonModule, MatDialogModule, MatToolbarModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatListModule, MatProgressSpinnerModule, MatCardModule, MatSidenavModule, MatTreeModule, MatIconModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule],
})

export class MaterialModule {
}