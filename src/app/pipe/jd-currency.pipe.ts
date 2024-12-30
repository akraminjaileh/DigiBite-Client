import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'jdCurrency'
})
export class JdCurrencyPipe implements PipeTransform {
  constructor(private translate: TranslateService) { }
  transform(value: number | null | undefined): string {
    if (value) {
      if (this.translate.currentLang == 'en')
        return `${value.toFixed(2)}JD`;
      else return `${value.toFixed(2)}دأ`;
    }
    return '';
  }

}
