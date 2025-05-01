import { Component, computed, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
import { asyncScheduler, Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  standalone: true
})
export class ToastComponent implements OnInit {
  @Input() message: string | null = null;
  type = input<'success' | 'error'>('success');
  life = input(5000);
  isError = computed(() => this.type() === 'error');

  @Output() closed = new EventEmitter<void>();

  private sub$: Subscription | null = null;

  constructor() { }

  ngOnInit(): void {
    if (!this.isError()) {
      this.sub$ = asyncScheduler.schedule(this.close.bind(this), this.life());
    }
  }

  close(): void {
    this.closeSub$();
    this.message = null;
    this.closed.emit();
  }

  private closeSub$(): void {
    if (this.sub$ && !this.sub$.closed) {
      this.sub$.unsubscribe();
    }

    this.sub$ = null;
  }

  ngOnDestroy(): void {
    this.closeSub$();
  }
}
