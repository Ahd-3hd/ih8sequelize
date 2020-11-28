import auth from '../controllers/authController';
import validateAuth from '../middlewares/auth';

// eslint-disable-next-line import/prefer-default-export
export const routes = (app) => {
  app.get('/', (req, res) => {
    res.send('sup!!');
  });
  app.post('/api/auth/sign_up', validateAuth, auth.signUp);
  app.post('/api/auth/sign_in', auth.signIn);
};
