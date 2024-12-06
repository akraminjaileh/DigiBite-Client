import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DigiBite-Client';
  lang: string | null = localStorage.getItem('lang');

  constructor(
    private translate: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    if (this.lang) {
      this.translate.use(this.lang);
      this.document.dir = this.lang === 'ar' ? 'rtl' : 'ltr';
      this.document.documentElement.lang = this.lang;
    }
  }


}
