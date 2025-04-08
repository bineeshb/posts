import { Injectable } from '@angular/core';
import { asyncScheduler, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private readonly errorMessage = new BehaviorSubject<string | null>(null);
  private readonly isLoading = new BehaviorSubject(false);

  error$ = this.errorMessage.asObservable();
  loading$ = this.isLoading.asObservable();

  toggleLoader(showLoader = false): void {
    asyncScheduler.schedule(() => this.isLoading.next(showLoader));
  }

  showLoader(): void {
    this.toggleLoader(true);
  }

  showError(message: string): void {
    this.errorMessage.next(message);
  }

  clearError(): void {
    this.errorMessage.next(null);
  }
}
