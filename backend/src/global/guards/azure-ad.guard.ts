import { ExecutionContext, Injectable } from '@nestjs/common';
import { PassportStrategy, AuthGuard } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';

const clientID = 'ec27360f-3bd6-44d8-b80e-7150e6492462';
const tenantID = '901cb4ca-b862-4029-9306-e5cd0f6d9f86';

@Injectable()
export class AzureADStrategy extends PassportStrategy(
  BearerStrategy,
  'azure-ad',
) {
  constructor() {
    super({
      identityMetadata: `https://login.microsoftonline.com/${tenantID}/v2.0/.well-known/openid-configuration`,
      clientID,
    });
  }

  async validate(data: any) {
    return data;
  }
}

@Injectable()
export class AzureADGuard extends AuthGuard('azure-ad') {}
