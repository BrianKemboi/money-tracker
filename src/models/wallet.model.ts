import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {Transaction} from './transaction.model';
import {User} from './user.model';

@model()
export class Wallet extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: false,
  })
  id: string;

  @property({
    type: 'number',
    required: true,
  })
  balance: number;

  @property({
    type: 'string',
    required: false,
  })
  balanceFormated: string;

  @property({
    type: 'string',
    required: false,
  })
  currency: Dinero.Currency;

  @hasMany(() => Transaction)
  transactions: Transaction[];

  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<Wallet>) {
    super(data);
  }
}

export interface WalletRelations {
  // describe navigational properties here
}

export type WalletWithRelations = Wallet & WalletRelations;
