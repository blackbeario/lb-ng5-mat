import {NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {
    SmdDataTable,
    SmdDatatableHeader,
    SmdDatatableActionButton,
    SmdContextualDatatableButton,
    SmdDataTableColumnComponent,
    SmdDataTableRowComponent,
    SmdDataTableCellComponent,
    SmdDatatableDialogChangeValue,
    SmdPaginatorComponent,
    SmdFabSpeedDialTrigger,
    SmdFabSpeedDialActions,
    SmdFabSpeedDialComponent
} from "./components";

import {AdminElementDirective} from "./directives/admin-element.directive";
import {EditorComponent} from "./components/editor/editor.component";
import {TreeOptionComponent} from "./components/tree-option/tree-option.component";

let IMPORTS = [
    CommonModule,
    FormsModule,
    HttpModule,
];

let COMPONENTS = [
    SmdDataTable,
    SmdDatatableHeader,
    SmdDatatableActionButton,
    SmdContextualDatatableButton,
    SmdDataTableColumnComponent,
    SmdDataTableRowComponent,
    SmdDataTableCellComponent,
    SmdDatatableDialogChangeValue,
    SmdPaginatorComponent,
    SmdFabSpeedDialTrigger,
    SmdFabSpeedDialActions,
    SmdFabSpeedDialComponent,
    AdminElementDirective,
    EditorComponent,
    TreeOptionComponent,
];


@NgModule({
    imports: IMPORTS,
    exports: COMPONENTS,
    declarations: COMPONENTS,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [SmdDatatableDialogChangeValue, TreeOptionComponent]
})
export class SharedModule {

    static forRoot(): any[] {
        return [
            CommonModule,
            HttpModule,
            FormsModule,
            SharedModule
        ]
    }

}
