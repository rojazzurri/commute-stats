import { useCallback, useState } from "react";
import Button from "../ui/components/Button";
import Link from "next/link";
import { getStravaAuthUrl } from "../modules/auth/functions/getStravaAuthUrl";

const HomePage = () => {
  const [authToken, setAuthToken] = useState<string>();

  const onSignout = useCallback(() => {
    setAuthToken(undefined);
  }, []);

  return (
    <div className="container mx-auto pt-10">
      <div className="mt-5">
        {authToken === undefined && (
          <Link href={getStravaAuthUrl()}>
            <Button>Sign in with Strava</Button>
          </Link>
        )}
        {authToken !== undefined && (
          <Button onClick={onSignout}>Sign out</Button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
