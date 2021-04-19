import {Entity, hasMany, model, property} from '@loopback/repository';
import {Wallet} from './wallet.model';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: false,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  preferedCurrency: string; // ISO 4217 currency code

  @hasMany(() => Wallet)
  wallets: Wallet[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
