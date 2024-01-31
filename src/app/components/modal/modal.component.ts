import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
    @Input() modalId = '';
    @Output() closeModal = new EventEmitter<{ id: string; show: boolean }>();

    emitCloseModal() {
        this.closeModal.emit({ id: this.modalId, show: false });
    }

    constructor(private elementRef: ElementRef) {}

    close(): void {
        this.elementRef.nativeElement.remove();
    }
}
