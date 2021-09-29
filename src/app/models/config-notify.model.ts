import { ProgressAnimationType, TimeOutOptions } from "../enums/config-notify.enum";

export interface ConfigToast {
    title?: string,
    message?: string,
    progressBar?: boolean,
    progressAnimation?: ProgressAnimationType.decreasing | ProgressAnimationType.increasing,
    timeOut?: number,
    extendedTimeOut?: number,
    disableTimeOut?: TimeOutOptions | boolean,
    positionClass?: string,
    toastClass?: string,
    enableHtml?: boolean,
    tapToDismiss?: boolean,
    closeButton?: boolean,
    preventDuplicates?: boolean,
    countDuplicates?: boolean,
    resetTimeoutOnDuplicate?: boolean,
    includeTitleDuplicates?: boolean,
    newestOnTop?: boolean,
    maxOpened?: number,
    autoDismiss?: boolean,
    easeTime?: number,
}