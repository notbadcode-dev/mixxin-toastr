import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { DomService } from './services/dom.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mixxin-toastr';

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private _domService: DomService,
    private swUpdate: SwUpdate
    ) {}

  ngOnInit(): void {
    this.autoDetectDarkMode();
    this.newVersionInformed();
  }

  autoDetectDarkMode() {
    if (isPlatformBrowser(this.platformId)) {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this._domService.addClassToElementByClassName('theme', 'theme-dark');
      } else {
        this._domService.addClassToElementByClassName('theme', 'theme-info');
      }
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
