// Wallet Utility

import {Wallet} from '../../models';
import {UserRepository, WalletRepository} from '../../repositories';

// Create wallet with users prefered currency
export const createWallet = async (
  walletRepository: WalletRepository,
  userRepository: UserRepository,
  wallet: Omit<Wallet, 'id'>,
): Promise<Wallet> => {
  // Get users prefered currency
  const userId = wallet.userId;
  // Users preferedCurrency
  const currency = (await userRepository.findById(userId)).preferedCurrency;
  wallet.currency = currency;

  return walletRepository.create(wallet);
};
