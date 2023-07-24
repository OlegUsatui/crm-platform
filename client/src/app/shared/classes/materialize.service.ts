declare var M: any;

export class MaterializeService {
  static toast(message: string) {
    M.toast({html: message})
  }
}
