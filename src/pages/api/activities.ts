import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import stravaV3, { DetailedActivityResponse } from "strava-v3";
import { AuthRepository } from "../../modules/auth/AuthRepository";

const activitiesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(404).end();
    return;
  }

  /**
   * Verifying Auth
   */
  const accessToken = getCookie("accessToken", { req, res });

  if (!accessToken || !jwt.verify(accessToken, process.env.JWT_KEY!)) {
    res.status(401).send("Unauthorized");
    return;
  }

  const authRepository = new AuthRepository();
  const decodedAccessToken = jwt.decode(accessToken);

  if (decodedAccessToken === null || typeof decodedAccessToken === "string") {
    res.status(401).send("Unauthorized");
    return;
  }

  const auth = authRepository.readAuth(decodedAccessToken.id);

  if (!auth) {
    res.status(401).send("Unauthorized");
    return;
  }

  /**
   * Getting activities from Strava
   */
  stravaV3.client(auth.accessToken);
  const activities: DetailedActivityResponse[] =
    await stravaV3.athlete.listActivities({ per_page: 10 });

  res.status(200).json({ activities });
};

export default activitiesHandler;
