import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy, AuthGuard } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';

@Injectable()
export class AzureADStrategy extends PassportStrategy(
  BearerStrategy,
  'azure-ad',
) {
  constructor(private config: ConfigService) {
    super({
      identityMetadata: `https://login.microsoftonline.com/${config.get('AZURE_TENANTID')}/v2.0/.well-known/openid-configuration`,
      clientID: config.get('AZURE_CLIENTID'),
    });
  }

  async validate(data: any) {
    return data;
  }
}

@Injectable()
export class AzureADGuard extends AuthGuard('azure-ad') {}
