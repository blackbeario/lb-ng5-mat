import {Injectable} from '@angular/core';
import {URLSearchParams} from '@angular/http';


@Injectable()
export class JSONSearchParams {
  private _usp: URLSearchParams;
  public setJSON(obj: any) {
    this._usp = new URLSearchParams(this._JSON2URL(obj, false));
  }

  public getURLSearchParams(): URLSearchParams {
    return this._usp;
  }

  private _JSON2URL(obj: any, parent: any) {
    var parts: any = [];
    for (var key in obj)
      parts.push(this._parseParam(key, obj[key], parent));
    return parts.join('&');
  }

  private _parseParam(key: string, value: any, parent: string) {
    if (typeof value !== 'object' &&  !Array.isArray(value)) {
      return parent ? parent + '[' + key + ']=' + value
        : key + '=' + value;
    } else if (typeof value === 'object' || Array.isArray(value)) {
        return parent ? this._JSON2URL(value, parent + '[' + key + ']')
          : this._JSON2URL(value, key);
    } else {
        throw new Error('Unexpected Type');
    }
  }
}
