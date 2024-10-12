import { userService } from './user.service';

describe('getUserInformationsByToken', () => {
  const access_token_invalid = null;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not return informations if no token is provided', async () => {
    const spy = jest.spyOn(userService, 'getUserInformations');
    const result = await userService.getUserInformationsByToken(
      access_token_invalid
    );
    expect(spy).toHaveBeenCalledTimes(0);
    expect(result).toBe(null);
  });
});
