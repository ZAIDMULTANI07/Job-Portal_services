import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
  return {
    secret: process.env.SECRET_KEY,
    signOptions: { expiresIn: '365d' },
  };
});
