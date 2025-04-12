import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly THEME_KEY = 'theme';
  private readonly LIGHT_THEME = 'saga-green';
  private readonly DARK_THEME = 'arya-green';

  constructor() {
    const savedTheme = localStorage.getItem(this.THEME_KEY) || this.LIGHT_THEME;
    this.setTheme(savedTheme);
  }

  public toggleTheme(): void {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === this.LIGHT_THEME ? this.DARK_THEME : this.LIGHT_THEME;
    this.setTheme(newTheme);
  }

  private setTheme(theme: string): void {
    const linkElement = document.getElementById('app-theme') as HTMLLinkElement;

    if (linkElement) {
      linkElement.href = `assets/themes/${theme}/theme.css`;

      localStorage.setItem(this.THEME_KEY, theme);
    }
  }

  public getCurrentTheme(): string {
    return localStorage.getItem(this.THEME_KEY) || this.LIGHT_THEME;
  }

}