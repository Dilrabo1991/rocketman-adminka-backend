import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PerPagePipe implements PipeTransform {
  transform(page: string, _: ArgumentMetadata) {
    const value = Number(page);

    if (isNaN(value) || value < 1) {
      return 10;
    }

    if (value > 50) {
      return 50;
    }

    return value;
  }
}
