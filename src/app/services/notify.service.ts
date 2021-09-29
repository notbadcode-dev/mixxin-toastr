import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService, GlobalConfig, ActiveToast } from 'ngx-toastr';
import { ConfigToast } from '../models/config-notify.model';

const TOAST_CLASS_BASE = 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  options: GlobalConfig;

  constructor(
    private toastr: ToastrService
    ) {
      this.options = this.toastr.toastrConfig;
    }

  info(configToast: ConfigToast): void {
    const { message, title, override } = this.getToastConfig('info', configToast);
    this.toastr.info(message, title, override);
  }

  success(configToast: ConfigToast): void {
    const { message, title, override } = this.getToastConfig('success', configToast);
    this.toastr.success(message, title, override);
  }

  warning(configToast: ConfigToast): void {
    const { message, title, override } = this.getToastConfig('warning', configToast);
    this.toastr.warning(message, title, override);
  }

  error(configToast: ConfigToast): void {
    const { message, title, override } = this.getToastConfig('error', configToast);
    this.toastr.error(message, title, override);
  }

  clearAll(): void {
    this.toastr.clear()
  }

  clearLast(): void {
    const lastNotifyId: number = this.toastr.toasts[this.toastr.toasts.length - 1].toastId;
    this.toastr.clear(lastNotifyId);
  }

  getToastConfig(eventName: string, configToast: ConfigToast): { message?: string | undefined, title?: string | undefined, override?: Partial<IndividualConfig> | undefined } {
    const opt: GlobalConfig = JSON.parse(JSON.stringify(this.options));

    opt.progressBar = configToast.progressBar ?? opt.progressBar;
    opt.progressAnimation = configToast.progressAnimation ??  opt.progressAnimation;
    opt.timeOut = 0;
    opt.disableTimeOut = true;
    opt.positionClass = configToast.positionClass ??  opt.positionClass;
    opt.toastClass = `${TOAST_CLASS_BASE} notify-${eventName}`;
    opt.enableHtml = configToast.enableHtml ?? opt.enableHtml;
    opt.tapToDismiss = configToast.tapToDismiss ?? opt.tapToDismiss;
    opt.closeButton = configToast.closeButton ?? opt.closeButton;
    opt.easeTime = configToast.easeTime ?? opt.easeTime;

    this.toastr.toastrConfig.preventDuplicates = configToast.preventDuplicates ?? opt.preventDuplicates;
    this.toastr.toastrConfig.countDuplicates = configToast.countDuplicates ?? opt.countDuplicates;
    this.toastr.toastrConfig.resetTimeoutOnDuplicate = configToast.resetTimeoutOnDuplicate ?? opt.resetTimeoutOnDuplicate;
    this.toastr.toastrConfig.includeTitleDuplicates = configToast.includeTitleDuplicates ?? opt.includeTitleDuplicates;
    this.toastr.toastrConfig.newestOnTop = configToast.newestOnTop ?? opt.newestOnTop;
    this.toastr.toastrConfig.maxOpened = configToast.maxOpened ?? opt.maxOpened;
    this.toastr.toastrConfig.autoDismiss = configToast.autoDismiss ?? opt.autoDismiss;

    return {
      title: configToast?.title?.length === 0 || configToast.title === null ? 'Mixxin Toastr' : configToast.title,
      message: configToast?.message?.length === 0 || configToast.message === null ?  `it's a beautiful toastr` : configToast.message,
      override: opt
    }
  }

}