import { ElementRef } from '@angular/core';

declare var M: any;

export class MaterializeService {
  static toast(message: string) {
    M.toast({html: message})
  }

  static initFloatingButton(ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement)
  }

  static updateTextInput() {
    M.updateTextFields();
  }
}
