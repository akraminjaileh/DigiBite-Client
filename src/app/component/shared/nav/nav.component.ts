import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  lang: string = 'Ar';

  constructor(
    private translate: TranslateService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router) { }


  ngOnInit(): void {
    let local = localStorage.getItem('lang')
    if (local) {

      this.lang = local === 'ar' ? 'En' : 'Ar'
    }
    else this.lang = 'Ar'
  }


  changLang() {
    const currentLang = this.translate.currentLang || localStorage.getItem('lang') || 'en';

    if (currentLang === 'en')
      this.translate.use('ar').subscribe(() => {
        localStorage.setItem('lang', 'ar');
        this.document.dir = 'rtl';
        this.document.documentElement.lang = 'ar';
        this.lang = 'En';
        this.refreshComponent();
      });

    if (currentLang === 'ar')
      this.translate.use('en').subscribe(() => {
        localStorage.setItem('lang', 'en');
        this.document.dir = 'ltr';
        this.document.documentElement.lang = 'en';
        this.lang = 'Ar';
        this.refreshComponent();
      });

  }

  refreshComponent() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/Fake-Url-For-Reload',
      {
        skipLocationChange: true

      }).then(() => {
        this.router.navigate([currentUrl]);
      });
  }

}
