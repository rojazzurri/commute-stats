import { setCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import appStrava from "../../../core/strava";
import { AuthRepository } from "../../../modules/auth/AuthRepository";
import { UserRepository } from "../../../modules/user/UserRepository";

const authStravaHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(404).end();
    return;
  }
  if (!req.body.code) {
    res.status(401).end();
    return;
  }

  const userRepository = new UserRepository();

  const stravaToken = await appStrava.oauth.getToken(req.body.code);
  if (!stravaToken.athlete.id) {
    res.status(401).end();
    return;
  }

  const user = userRepository.readUser(String(stravaToken.athlete.id));
  console.log(user);
  if (user === undefined) {
    userRepository.createUser({
      id: stravaToken.athlete.id,
      firstName: stravaToken.athlete.firstname,
      lastName: stravaToken.athlete.lastname,
    });
  }

  const token = jwt.sign(
    {
      id: stravaToken.athlete.id,
    },
    process.env.JWT_KEY!,
    {
      expiresIn: Number(process.env.JWT_EXPIRES_IN),
    },
  );

  const authRepository = new AuthRepository();
  authRepository.createAuth({
    userId: stravaToken.athlete.id,
    accessToken: stravaToken.access_token,
    refreshToken: stravaToken.refresh_token,
    expiresAt: stravaToken.expires_at,
    expiresIn: stravaToken.expires_in,
  });

  setCookie("accessToken", token, { req, res, maxAge: stravaToken.expires_in });
  res.status(200).json({ accessToken: token });
};

export default authStravaHandler;
