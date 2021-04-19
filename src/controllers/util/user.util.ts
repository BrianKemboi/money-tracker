// User Utility

import {UserRepository} from '../../repositories';

export const userSummary = async (
  userRepository: UserRepository,
  userId: string,
) => {
  const user = await userRepository.findById(userId);
  // Users' Wallets
  const wallets = user.wallets;
  const walletCount = wallets.length;

  let totalBalance = 0;
  wallets.forEach(wallet => {
    totalBalance = totalBalance + wallet.balance;
  });

  return {
    ...user,
    walletCount,
    totalBalance,
  };
};
