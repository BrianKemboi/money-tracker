import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Wallet} from './wallet.model';

@model()
export class Transaction extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'number',
    required: true,
  })
  balance: number;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @belongsTo(() => Wallet)
  walletId: string;

  constructor(data?: Partial<Transaction>) {
    super(data);
  }
}

export interface TransactionRelations {
  // describe navigational properties here
}

export type TransactionWithRelations = Transaction & TransactionRelations;
