import { Injectable, signal } from '@angular/core';
import { asyncScheduler } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private readonly errorMessage = signal<string | null>(null);
  private readonly isLoading = signal(false);

  error = this.errorMessage.asReadonly();
  loading = this.isLoading.asReadonly();

  toggleLoader(showLoader = false): void {
    asyncScheduler.schedule(() => this.isLoading.set(showLoader));
  }

  showLoader(): void {
    this.toggleLoader(true);
  }

  showError(message: string): void {
    this.errorMessage.set(message);
  }

  clearError(): void {
    this.errorMessage.set(null);
  }
}
