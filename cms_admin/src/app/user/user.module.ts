import {NgModule} from '@angular/core';
import {UsersComponent} from './users/users.component';
import {UserFormComponent} from './user-form/user-form.component';
import { UserRoutingModule } from "./user.routing";
import { RegisterComponent } from './register/register.component';
import { PasswordComponent } from './password/password.component';
import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from '../shared/material.module';
import { MaterialTableComponent } from '../shared/components/material-table/material-table.component';
import {MatSnackBar} from '@angular/material';

@NgModule({
	imports: [
		MaterialModule,
		SharedModule.forRoot(),
		UserRoutingModule
	],
	providers: [
		{ provide: MatSnackBar, useValue: {} },
	],
	declarations: [UsersComponent, UserFormComponent, RegisterComponent, MaterialTableComponent, PasswordComponent],
	entryComponents: [UserFormComponent]
})
export class UserModule {
}
