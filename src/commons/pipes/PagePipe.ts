import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PagePipe implements PipeTransform {
  transform(page: string, _: ArgumentMetadata) {
    const value = Number(page);

    if (isNaN(value) || value <= 1) {
      return 0;
    }

    return value - 1;
  }
}
