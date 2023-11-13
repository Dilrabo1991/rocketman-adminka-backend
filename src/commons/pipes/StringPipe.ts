import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class StringPipe implements PipeTransform {
  transform(page: string, _: ArgumentMetadata) {
    if (!page || typeof page != 'string') {
      return '';
    }

    return page;
  }
}
