import { SetMetadata, CustomDecorator } from '@nestjs/common';

export const Public: () => CustomDecorator = () => SetMetadata('public', true);
