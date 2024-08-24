import { User } from '@prisma/client';
import AppError from '../../utils/appError';
import Email from '../../utils/email';

export async function sendConfirmMessage({
  user,
  langage,
}: {
  user: User;
  langage: 'fr' | 'en';
}) {
  try {
    const mail = await new Email(
      user,
      process.env.DISCORD_INVITATION_LINK
    ).sendConfirmMessage(langage);
  } catch (error) {
    throw new AppError(500, 'Could not send confirmation message');
  }
}
