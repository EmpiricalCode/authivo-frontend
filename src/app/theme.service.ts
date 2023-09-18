
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

  get activeTheme(): string | undefined {
    return this.activeThemeSubject.getValue();
  }

  set(themeName: string): void {

    if (this.activeTheme === themeName || !this.themes.includes(themeName)) {
      return;
    }

    this.activeThemeSubject.next(themeName);

    for (var theme of this.themes) {
      document.documentElement.classList.remove(theme.toLowerCase() + "-theme");
    }

    document.documentElement.classList.add(themeName.toLowerCase() + "-theme");
  }
}