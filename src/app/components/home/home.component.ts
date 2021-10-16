import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TIMEOUT_LIMIT } from 'src/app/constants/timeout.constant';
import { MainButtonType } from 'src/app/enums/button.enum';
import { ProgressAnimationType, ToastType } from 'src/app/enums/config-notify.enum';
import { PositionClass } from 'src/app/enums/zone.enum';
import { ConfigToast } from 'src/app/models/config-notify.model';
import { DomService } from 'src/app/services/dom.service';

import { NotifyService } from 'src/app/services/notify.service';

import { MainButton } from '../../models/button.model';

declare const $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('minusTimeOutButton', { static: false }) minusTimeOutButton: ElementRef<HTMLInputElement> = {} as ElementRef;

  mainButtons: MainButton[] = []
  notifyConfigForm: FormGroup = new FormGroup({});
  configToast: ConfigToast = {};

  linkdInLink: string = 'https://website.notbadcode.xyz/';
  repositoryLink: string = 'https://github.com/notbadcode-dev/mixxin-toastr';
  websiteLink: string = 'https://website.notbadcode.xyz/';

  currentTheme: string = 'info';
  selectedToastType: ToastType = ToastType.info;
  toastTypes = ToastType;

  constructor(
    private _notifyService: NotifyService,
    public _domService: DomService,
    private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.resetConfig();
    this.autoDetectDarkMode();

    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
  }

  resetConfig(): void {
    this.configToast = {
      title: '',
      message: '',
      progressBar: false,
      progressAnimation: ProgressAnimationType.decreasing,
      timeOut: TIMEOUT_LIMIT.DEFAULT_TIMEOUT,
      extendedTimeOut: 0,
      disableTimeOut: false,
      positionClass: PositionClass.topRight,
      enableHtml: false,
      tapToDismiss: false,
      closeButton: true,
      preventDuplicates: true,
      countDuplicates: false,
      resetTimeoutOnDuplicate: false,
      includeTitleDuplicates: false,
      newestOnTop: true,
      maxOpened: 0,
      autoDismiss: true,
      easeTime: 300,

    };
  }

  updateMainConfig(event: ConfigToast) {
    this.configToast.title = event.title;
    this.configToast.message = event.message;
    this.configToast.enableHtml = event.enableHtml;
    this.configToast.tapToDismiss = event.tapToDismiss;
    this.configToast.closeButton = event.closeButton;
    this.configToast.preventDuplicates = event.preventDuplicates;
    this.configToast.countDuplicates = event.countDuplicates;
    this.configToast.resetTimeoutOnDuplicate = event.resetTimeoutOnDuplicate;
    this.configToast.includeTitleDuplicates = event.includeTitleDuplicates;
    this.configToast.newestOnTop = event.newestOnTop;
    this.configToast.autoDismiss = event.autoDismiss;
  }

  updateProgressBar(event: ConfigToast): void {
    this.configToast.progressBar = event.progressBar;
    this.configToast.progressAnimation = event.progressAnimation;
  }

  updateTimeOut(event: ConfigToast): void {
    this.configToast.timeOut = event.timeOut;
    this.configToast.extendedTimeOut = event.extendedTimeOut;
    this.configToast.disableTimeOut = event.disableTimeOut;
  }

  updatePositionClass(event: any) {
    this.configToast.positionClass = event;
  }

  updateToastOpener(event: ConfigToast) {
    this.configToast.maxOpened = event.maxOpened;
    this.configToast.easeTime = event.easeTime;
  }

  changeToastSelected(event: any): void {
    const eventValue: any = parseInt(event.target.value, 10);
    this.selectedToastType = eventValue;
  }

  openNotify(): void {
    switch (this.selectedToastType) {
      case ToastType.info:
        this._notifyService.info(this.configToast);
        break;   
      case ToastType.success:
        this._notifyService.success(this.configToast);
        break;
      case ToastType.warning:
        this._notifyService.warning(this.configToast);
        break;
      case ToastType.danger:
        this._notifyService.error(this.configToast);
        break;
      default:
        break;
    }
  }

  clearLastNotify(): void {
    this._notifyService.clearLast();
  }

  clearAllNotify(): void {
    this._notifyService.clearAll();
  }

  downloadConfiguration(): void {
    const config: any = {
      IndividualConfig: this._notifyService.transformConfigToast(this.currentTheme, this.configToast),
      GlobalConfig: this._notifyService.transformGlobalConfigToast(this.configToast),
      Resources: {
        ProjectUrl: 'https://github.com/notbadcode-dev/mixxin-toastr',
        NotifyCustomStyleUrl: 'https://github.com/notbadcode-dev/mixxin-toastr/blob/master/src/assets/styles/notify.scss'
      },
      Author: {
        Name: 'notBadCode · Carlos Balaguer',
        Website: 'https://website.notbadcode.xyz/#/me',
        LinkedIn: 'https://www.linkedin.com/in/carlosbgr/'

      }
    }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config));
    const link = document.createElement('a');

    if (link && link !== null) {
      link.setAttribute('target', '_blank');
      link?.setAttribute("href",  dataStr );
      link.setAttribute('download', `toast-config.json`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }

  changeTheme(themeClass: string): void {
    if (this.currentTheme !== themeClass) {
      this._domService.addClassToElementByClassName('theme', `theme-${themeClass}`);
      this._domService.removeClassToElementByClassName('theme', `theme-${this.currentTheme}`);

      this._domService.addClassToElementByClassName('selected', themeClass);
      this._domService.removeClassToElementByClassName('selected', this.currentTheme);

      this._domService.addClassToElementByClassName(`selector-${themeClass}`, 'active');
      this._domService.removeClassToElementByClassName(`selector-${this.currentTheme}`, 'active');

      this.currentTheme = themeClass;
    }
    return;
  }

  autoDetectDarkMode() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this._domService.addClassToElementByClassName('selected', 'dark');
      this._domService.addClassToElementByClassName('selector-dark', 'active');
      this.currentTheme = 'dark';
    } else {
      const themes: string[] = ['info', 'success', 'warning', 'danger'];

      this._domService.addClassToElementByClassName('selected', themes[Math.floor(Math.random() * themes.length)]);
      this._domService.addClassToElementByClassName(`selector-${themes[Math.floor(Math.random() * themes.length)]}`, 'active');
      this.currentTheme = 'info';
    }
  }
}
