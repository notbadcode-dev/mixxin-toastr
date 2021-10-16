import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { SwUpdate } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { AppModule } from './app.module';
import { DomService } from './services/dom.service';

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
