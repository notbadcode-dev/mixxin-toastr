import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { ConfigToast } from 'src/app/models/config-notify.model';
import { DomService } from 'src/app/services/dom.service';

@Component({
  selector: 'config-toast',
  templateUrl: './config-toast.component.html',
  styleUrls: ['./config-toast.component.scss']
})
export class ConfigToastComponent implements OnInit {

  @Output() updateToastOpener = new EventEmitter<ConfigToast>();

  constructor(public _domService: DomService) { }

  maximum: number = 0;
  autoDismiss: boolean = true;

  easeTime: number = 0;

  ngOnInit(): void {
  }

  changeMaximum(event: any): void {
    this.maximum = (parseInt(event.target.value, 10) < 0) ? 0 : parseInt(event.target.value, 10);
    this.updateToastEmitter();
  }

  minusMaximum(): void {
    this.maximum = this.maximum <= 0 ? 0 : this.maximum - 1;
    this.updateToastEmitter();
  }

  plusMaximum(): void {
    this.maximum = this.maximum + 1;
    this.updateToastEmitter();
  }

  changeEaseTime(event: any): void {
    this.easeTime = (parseInt(event.target.value, 10) < 0) ? 0 : parseInt(event.target.value, 10);
    this.updateToastEmitter();
  }

  minusEaseTime(): void {
    this.easeTime = this.easeTime <= 0 ? 0 : this.easeTime - 1;
    this.updateToastEmitter();
  }

  plusEaseTime(): void {
    this.easeTime = this.easeTime + 1;
    this.updateToastEmitter();
  }

  updateToastEmitter(): void {
    this.updateToastOpener.emit({
      maxOpened: this.maximum,
      autoDismiss: this.autoDismiss,
      easeTime: this.easeTime
    });
  }

}
