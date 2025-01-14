import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { timer } from 'rxjs';
import { BehaviorService } from 'src/app/Services/behavior.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  items: any[] = [];

  lang: string = 'Ar';
  SidebarVisible: boolean = false;
  isLogged: boolean = 'token' in localStorage;
  customerName: string | null = null;

  constructor(
    private translate: TranslateService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private behavior: BehaviorService
  ) {
    this.items = [
      { label: 'Account setting', icon: 'pi pi-cog', routerLink: ['/account'] },
      { label: 'Orders', icon: 'pi pi-shopping-bag', routerLink: ['/account/orders'] },
      { label: 'Addresses', icon: 'pi pi-map-marker', routerLink: ['/account/addresses'] },
      { separator: true },
      { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() }
    ];
  }


  ngOnInit(): void {

    this.behavior.getSidebarVisible().subscribe(x => this.SidebarVisible = x);

    this.customerName = localStorage.getItem('customerName');

    let local = localStorage.getItem('lang')
    if (local) {

      this.lang = local === 'ar' ? 'En' : 'Ar'
    }
    else this.lang = 'Ar'


    let expires = localStorage.getItem('expires');
    if (expires) {
      let currentDate = new Date();
      currentDate.setMinutes(currentDate.getMinutes() + 2);

      if (currentDate >= new Date(expires)) {
        localStorage.removeItem('expires')
        localStorage.removeItem('token')
        localStorage.removeItem('customerName')
      }
      else {
        timer(new Date(expires).valueOf() - currentDate.valueOf())
          .subscribe(() => this.logout());
      }
    }

  }

  logout() {
    localStorage.removeItem('expires');
    localStorage.removeItem('token');
    localStorage.removeItem('customerName');
    location.reload();
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

  openCart() {
    this.behavior.setSidebarVisible(true);
  }

}
