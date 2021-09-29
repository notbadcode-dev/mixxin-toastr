import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ProgressAnimationType } from 'src/app/enums/config-notify.enum';

@Component({
  selector: 'config-progressbar',
  templateUrl: './config-progressbar.component.html',
  styleUrls: ['./config-progressbar.component.scss'],
})
export class ConfigProgressbarComponent implements OnInit {
  @Output() updateProgressBar = new EventEmitter<any>();

  progressBar: boolean | undefined = false;
  progressAnimation:
    | ProgressAnimationType.decreasing
    | ProgressAnimationType.increasing = ProgressAnimationType.decreasing;

  progressAnimationTypes = ProgressAnimationType;

  constructor() {}

  ngOnInit(): void {}

  setProgressBarConfig(event: any): void {
    if (event.target.value) {
      const progressBarType: ProgressAnimationType = event.target.value;
      this.progressBar = true;
      this.progressAnimation = progressBarType;
    } else {
      this.progressBar = undefined;
    }

    this.updateProgressBarEmitter();
  }

  updateProgressBarEmitter(): void {
    this.updateProgressBar.emit({
      progressBar: this.progressBar,
      progressAnimation: this.progressAnimation,
    });
  }
}
