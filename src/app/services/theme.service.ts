
import { Injectable } from '@angular/core';
import { BehaviorSubject, elementAt } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private activeThemeSubject = new BehaviorSubject<string | undefined>(
    undefined
  );

  private themes: string[] = ["Light", "Dark"];

  activeTheme$ = this.activeThemeSubject.asObservable();

  // Returns the active theme
  get activeTheme(): string | undefined {
    return this.activeThemeSubject.getValue();
  }

  // Sets the active theme
  set(themeName: string): void {

    if (this.activeTheme === themeName) {
      return;
    }

    // If invalid theme, default to light theme
    if (!this.themes.includes(themeName)) {
      this.set("Light");
      return;
    }

    // Setting active theme
    localStorage.setItem("theme", themeName);
    this.activeThemeSubject.next(themeName);

    // Added theme CSS class
    for (var theme of this.themes) {
      document.documentElement.classList.remove(theme.toLowerCase() + "-theme");
    }

    document.documentElement.classList.add(themeName.toLowerCase() + "-theme");
  }
}