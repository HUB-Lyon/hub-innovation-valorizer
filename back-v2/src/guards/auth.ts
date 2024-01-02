import { ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy, AuthGuard } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schema/user.schema';

@Injectable()
export class AzureADStrategy extends PassportStrategy(
  BearerStrategy,
  'azure-ad',
) {
  constructor(private config: ConfigService) {
    super({
      identityMetadata: `https://login.microsoftonline.com/${config.get(
        'AZURE_TENANTID',
      )}/v2.0/.well-known/openid-configuration`,
      clientID: config.get('AZURE_CLIENTID'),
    });
  }

  async validate(data: any) {
    return data;
  }
}

@Injectable()
export class AzureADGuard extends AuthGuard('azure-ad') {
  constructor(
    private readonly reflector: Reflector,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic: boolean = this.reflector.get<boolean>(
      'public',
      context.getHandler(),
    );
    // return true; //TODO Delete this
    if (isPublic) return true;

    await super.canActivate(context); // Throw 401 if token not valid

    const req = context.switchToHttp().getRequest();

    let user = await this.userModel.findOne({
      email: req.user['preferred_username'],
    });
    if (!user) {
      user = await this.userModel.create({
        email: req.user['preferred_username'],
      });
    }
    req.user = user;
    return true;
  }
}
