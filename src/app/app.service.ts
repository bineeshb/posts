import { Injectable } from '@angular/core';
import { asyncScheduler, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private readonly isLoading = new BehaviorSubject(false);
  loading$ = this.isLoading.asObservable();

  toggleLoader(showLoader = false): void {
    asyncScheduler.schedule(() => this.isLoading.next(showLoader));
  }

  showLoader(): void {
    this.toggleLoader(true);
  }
}
