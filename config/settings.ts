import { registerAs } from '@nestjs/config';

export default registerAs('settings', () => ({
  users: {
    roles: {
      Candidate: 1,
      Recruiter: 2,
    },
  },
  allUsers: {
    roles: {
      Admin: 0,
      Candidate: 1,
      Recruiter: 2,
    },
  },
}));
