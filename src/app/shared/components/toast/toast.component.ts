import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { asyncScheduler, Subscription } from 'rxjs';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
    standalone: true,
    imports: [NgIf]
})
export class ToastComponent implements OnInit {
  @Input() message: string | null = null;
  @Input() type: 'success' | 'error' = 'success';
  @Input() life = 5000;

  @Output() closed = new EventEmitter<void>();

  private sub$: Subscription | null = null;

  constructor() { }

  ngOnInit(): void {
    if (this.type !== 'error') {
      this.sub$ = asyncScheduler.schedule(this.close.bind(this), this.life);
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
