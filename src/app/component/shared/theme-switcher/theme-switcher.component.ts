import { Component } from '@angular/core';
import { ThemeService } from 'src/app/Services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.css']
})
export class ThemeSwitcherComponent {

  constructor(private themeService: ThemeService) { }

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  public isDarkTheme(): boolean {
    return this.themeService.getCurrentTheme() === 'arya-green';
  }
}
