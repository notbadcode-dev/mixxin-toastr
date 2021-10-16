import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { DomService } from './services/dom.service';

import 'hammerjs'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mixxin-toastr';

  constructor(
    private _domService: DomService,
    private swUpdate: SwUpdate) {}

  ngOnInit(): void {
    this.autoDetectDarkMode();
  }

  autoDetectDarkMode() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this._domService.addClassToElementByClassName('theme', 'theme-dark');
    } else {
      this._domService.addClassToElementByClassName('theme', 'theme-info');
    }
  }

  newVersionInformed(): void {
    if (this.swUpdate.isEnabled) {

      this.swUpdate.available.subscribe(() => {

          if(confirm("New version available. Load New Version?")) {

              window.location.reload();
          }
      });
    }  
  }
}
