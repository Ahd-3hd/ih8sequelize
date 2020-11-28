import models from '../models';
import { comparePassword, hashPassword, jwtToken } from '../utils';

const { User } = models;

const auth = {
  async signUp(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const hash = hashPassword(password);
      const user = await User.create({ name, email, password: hash });
      const token = jwtToken.createToken(user);
      return res.status(201).send({
        token,
        user: {
          id: user.id, name, email,
        },
      });
    } catch (error) {
      return next(new Error(error));
    }
  },
  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (user && comparePassword(password, user.password)) {
        const { name, id } = user;
        const token = jwtToken.createToken(user);
        return res.status(200).send({ token, user: { id, name, email } });
      }
      return res.status(400).send({ error: 'invalid credentials' });
    } catch (error) {
      return next(new Error(error));
    }
  },
};

export default auth;
