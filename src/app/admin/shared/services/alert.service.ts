import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

export type AlertType = 'success' | 'danger' | 'warning';

export interface Alert {
  type: AlertType;
  text: string;
}


@Injectable()
export class AlertService {
  public alert$ = new Subject<Alert>();

  success(text: string): void {
    this.alert$.next({type: 'success', text});
  }

  warning(text: string): void {
    this.alert$.next({type: 'warning', text});
  }

  danger(text: string): void {
    this.alert$.next({type: 'danger', text});
  }
}
