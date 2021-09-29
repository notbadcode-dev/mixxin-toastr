import { MainButtonType } from "../enums/button.enum";

export interface MainButton {
    type: MainButtonType,
    label: string,
    title: string,
    tooltip: string,
    class: string,
    icon?: string,
    iconClass?: string,
}