// Transaction Utility

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
      wallet.balance = wallet.balance + transaction.amount;
      transaction.balance = wallet.balance;
      break;
    case transactionType.withdrawal:
      // Subrtact from the balance
      wallet.balance = wallet.balance - transaction.amount;
      transaction.balance = wallet.balance;
      break;
  }
  await walletRepository.updateById(walletId, wallet);
  return await transactionRepository.create(transaction);
};
