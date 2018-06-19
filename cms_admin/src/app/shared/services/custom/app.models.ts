import {Injectable} from '@angular/core';
import {User} from "../../models/user.model";
import {Role} from "../../models/role.model";
import {Node} from "../../models/node.model";

export interface Models {
	[name: string]: any
}

@Injectable()
export class AppModels {

	private models: Models = {
		User: User,
		Role: Role,
		Node: Node
	};

	public get(modelName: string): any {
		return this.models[modelName];
	}

	public getAll(): Models {
		return this.models;
	}

	public getModelNames(): string[] {
		return Object.keys(this.models);
	}
}