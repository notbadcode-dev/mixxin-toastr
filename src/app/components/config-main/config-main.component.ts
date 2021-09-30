import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { ConfigToast } from 'src/app/models/config-notify.model';

@Component({
  selector: 'config-main',
  templateUrl: './config-main.component.html',
  styleUrls: ['./config-main.component.scss']
})
export class ConfigMainComponent implements OnInit {

  @Output() updateMainConfig = new EventEmitter<ConfigToast>();

  mainConfigForm: FormGroup = new FormGroup({});
  globalConfigForm: FormGroup = new FormGroup({});

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.initMainConfigForm();
    this.initGlobalConfigForm();

    this.controlChangesOnMainConfigForm();
    this.controlChangesOnGlobalConfigForm();

  }

  initMainConfigForm(): void {
    this.mainConfigForm = this._fb.group({
      title: new FormControl(''),
      message: new FormControl(''),
      enableHtml: new FormControl(false),
      tapToDismiss: new FormControl(false),
      closeButton: new FormControl(true),
    });
  }

  controlChangesOnMainConfigForm(): void {
    this.mainConfigForm.get('title')?.valueChanges.subscribe(value => {
      if (value === '') {
        this.mainConfigForm.patchValue({ title: null });
      }
      this.updateMainConfigEmitter();
    });

    this.mainConfigForm.get('message')?.valueChanges.subscribe(value => {
      if (value === '') {
        this.mainConfigForm.patchValue({ message: null });
      }
      this.updateMainConfigEmitter();
    });

    this.mainConfigForm.get('enableHtml')?.valueChanges.subscribe(value => {
      if (typeof value === 'boolean') {
        this.updateMainConfigEmitter();
      }
    });

    this.mainConfigForm.get('tapToDismiss')?.valueChanges.subscribe(value => {
      if (typeof value === 'boolean') {
        this.updateMainConfigEmitter();
      }
    });

    this.mainConfigForm.get('closeButton')?.valueChanges.subscribe(value => {
      if (typeof value === 'boolean') {
        this.updateMainConfigEmitter();
      }
    });
  }

  initGlobalConfigForm(): void {
    this.globalConfigForm = this._fb.group({
      preventDuplicates: new FormControl(true),
      countDuplicates: new FormControl(false),
      resetTimeoutOnDuplicate: new FormControl(false),
      includeTitleDuplicates: new FormControl(false),
      newestOnTop: new FormControl(true),
      autoDismiss: new FormControl(true),
    });
  }

  controlChangesOnGlobalConfigForm(): void {
    this.globalConfigForm.get('preventDuplicates')?.valueChanges.subscribe(value => {
      if (typeof value === 'boolean') {
        if (value) {
          this.globalConfigForm.controls.countDuplicates.disable();
          this.globalConfigForm.controls.resetTimeoutOnDuplicate.disable();
          this.globalConfigForm.controls.includeTitleDuplicates.disable();

          this.globalConfigForm.patchValue({
            countDuplicates: false,
            resetTimeoutOnDuplicate: false,
            includeTitleDuplicates: false,
          })
          
        } else {
          this.globalConfigForm.controls.countDuplicates.enable();
          this.globalConfigForm.controls.resetTimeoutOnDuplicate.enable();
          this.globalConfigForm.controls.includeTitleDuplicates.enable();
        }

        this.updateMainConfigEmitter();
      }
    });

    this.globalConfigForm.get('countDuplicates')?.valueChanges.subscribe(value => {
      if (typeof value === 'boolean') {
        this.updateMainConfigEmitter();
      }
    });

    this.globalConfigForm.get('resetTimeoutOnDuplicate')?.valueChanges.subscribe(value => {
      if (typeof value === 'boolean') {
        this.updateMainConfigEmitter();
      }
    });

    this.globalConfigForm.get('includeTitleDuplicates')?.valueChanges.subscribe(value => {
      if (typeof value === 'boolean') {
        this.updateMainConfigEmitter();
      }
    });

    this.globalConfigForm.get('newestOnTop')?.valueChanges.subscribe(value => {
      if (typeof value === 'boolean') {
        this.updateMainConfigEmitter();
      }
    });

    this.globalConfigForm.get('autoDismiss')?.valueChanges.subscribe(value => {
      if (typeof value === 'boolean') {
        this.updateMainConfigEmitter();
      }
    });

  }

  updateMainConfigEmitter(): void {
    setTimeout(() => {
      this.updateMainConfig.emit({
        title: this.mainConfigForm.value?.title,
        message: this.mainConfigForm.value?.message,
        enableHtml: this.mainConfigForm.value?.enableHtml,
        tapToDismiss: this.mainConfigForm.value?.tapToDismiss,
        closeButton: this.mainConfigForm.value?.closeButton,
        preventDuplicates: this.globalConfigForm.value?.preventDuplicates,
        countDuplicates: this.globalConfigForm.value?.countDuplicates,
        resetTimeoutOnDuplicate: this.globalConfigForm.value?.resetTimeoutOnDuplicate,
        includeTitleDuplicates: this.globalConfigForm.value?.includeTitleDuplicates,
        newestOnTop: this.globalConfigForm.value?.newestOnTop,
        autoDismiss: this.globalConfigForm.value?.autoDismiss
      });
    }, 200);
  }

}
