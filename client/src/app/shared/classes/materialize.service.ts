import { ElementRef } from '@angular/core';

declare let M: any;

export interface MaterialInstance {
  open: () => void;
  close: () => void;
  destroy: () => void;
}

export class MaterializeService {
  static toast(message: string) {
    M.toast({ html: message })
  }

  static initFloatingButton(ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement)
  }

  static updateTextInput() {
    M.updateTextFields();
  }

  static initModal(ref: ElementRef): MaterialInstance {
    return M.Modal.init(ref.nativeElement)
  }

  static initTooltip(ref: ElementRef): MaterialInstance {
    return M.Tooltip.init(ref.nativeElement)
  }
}
