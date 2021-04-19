// Transaction Utility

import Dinero from 'dinero.js';
import {Transaction} from '../../models';
import {TransactionRepository, WalletRepository} from '../../repositories';

export const transactionType = {
  deposit: 'deposit',
  withdrawal: 'withdrawal',
};
export const updateWallet = async (
  walletRepository: WalletRepository,
  transactionRepository: TransactionRepository,
  transaction: Omit<Transaction, 'id'>,
): Promise<Transaction> => {
  const walletId = transaction.walletId;
  const wallet = await walletRepository.findById(walletId);

  switch (transaction.type) {
    case transactionType.deposit:
      // Add to the balance
      const dineroSum = Dinero({
        amount: wallet.balance,
        currency: wallet.currency,
      }).add(Dinero({amount: transaction.amount, currency: wallet.currency}));

      wallet.balance = dineroSum.getAmount();
      wallet.balanceFormated = dineroSum.toFormat();
      transaction.balance = wallet.balance;
      break;
    case transactionType.withdrawal:
      // Subrtact from the balance
      const dineroDiff = Dinero({
        amount: wallet.balance,
        currency: wallet.currency,
      }).subtract(
        Dinero({
          amount: transaction.amount,
          currency: wallet.currency,
        }),
      );
      wallet.balance = dineroDiff.getAmount();
      wallet.balanceFormated = dineroDiff.toFormat();
      transaction.balance = wallet.balance;
      break;
  }
  await walletRepository.updateById(walletId, wallet);
  return await transactionRepository.create(transaction);
};
