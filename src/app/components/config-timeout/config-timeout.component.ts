import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TIMEOUT_LIMIT } from 'src/app/constants/timeout.constant';
import { TimeOutOptions } from 'src/app/enums/config-notify.enum';
import { ConfigToast } from 'src/app/models/config-notify.model';

import { DomService } from 'src/app/services/dom.service';

@Component({
  selector: 'config-timeout',
  templateUrl: './config-timeout.component.html',
  styleUrls: ['./config-timeout.component.scss'],
})
export class ConfigTimeoutComponent implements OnInit {
  timeOut: number = TIMEOUT_LIMIT.DEFAULT_TIMEOUT;
  minTimeOut: number = TIMEOUT_LIMIT.MIN_TIMEOUT;
  maxTimeOut: number = TIMEOUT_LIMIT.MAX_TIMEOUT;

  extendedTimeOut: number = TIMEOUT_LIMIT.DEFAULT_EXTENDED_TIMEOUT;
  minExtendedTimeOut: number = TIMEOUT_LIMIT.MIN_EXTENDED_TIMEOUT;
  maxExtendedTimeOut: number = TIMEOUT_LIMIT.MAX_EXTENDED_TIMEOUT;

  disableTimeOut: TimeOutOptions | boolean = TimeOutOptions.onlyTimeout;

  timeOutOptions = TimeOutOptions;

  constructor(public _domService: DomService) {}

  @Output() updateTimeOut = new EventEmitter<ConfigToast>();

  ngOnInit(): void {}

  changeTimeOut(event: any): void {
    this.timeOut = (parseInt(event.target.value, 10) < 0) ? this.timeOut = TIMEOUT_LIMIT.DEFAULT_TIMEOUT : this.timeOut;
    this.updateTimeOutEmitter();
  }

  minusTimeOut(): void {
    this.timeOut = this.timeOut - TIMEOUT_LIMIT.SUM_TIMEOUT < 0 ? 0 : this.timeOut - TIMEOUT_LIMIT.SUM_TIMEOUT;
    this.updateTimeOutEmitter();
  }

  plusTimeOut(): void {
    this.timeOut = this.timeOut + TIMEOUT_LIMIT.SUM_TIMEOUT > TIMEOUT_LIMIT.MAX_TIMEOUT ?  TIMEOUT_LIMIT.MAX_TIMEOUT : this.timeOut + TIMEOUT_LIMIT.SUM_TIMEOUT;
    this.updateTimeOutEmitter();
  }

  changeExtendedTimeOut(event: any): void {
    this.extendedTimeOut = (parseInt(event.target.value, 10) < 0) ? this.extendedTimeOut = TIMEOUT_LIMIT.DEFAULT_EXTENDED_TIMEOUT : this.extendedTimeOut;
    this.updateTimeOutEmitter();
  }

  minusExtendedTimeOut(): void {
    this.extendedTimeOut = this.extendedTimeOut - TIMEOUT_LIMIT.SUM_EXTENDED_TIMEOUT < 0 ? 0 : this.extendedTimeOut - TIMEOUT_LIMIT.SUM_EXTENDED_TIMEOUT;
    this.updateTimeOutEmitter();
  }

  plusExtendedTimeOut(): void {
    this.extendedTimeOut = this.extendedTimeOut + TIMEOUT_LIMIT.SUM_EXTENDED_TIMEOUT > TIMEOUT_LIMIT.MAX_EXTENDED_TIMEOUT ? TIMEOUT_LIMIT.MAX_EXTENDED_TIMEOUT : this.extendedTimeOut + TIMEOUT_LIMIT.SUM_EXTENDED_TIMEOUT;
    this.updateTimeOutEmitter();
  }

  setTimeOutOptions(event: any): void {
    this.disableTimeOut = event.target.value;
    this.updateTimeOutEmitter();
  }

  updateTimeOutEmitter(): void {
    this.updateTimeOut.emit({timeOut: this.timeOut, extendedTimeOut: this.extendedTimeOut, disableTimeOut: this.disableTimeOut });
  }
}
