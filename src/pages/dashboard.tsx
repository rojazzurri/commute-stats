import {useCallback, useEffect, useState} from "react";
import { DetailedActivityResponse } from "strava-v3";


const DashboardPage = () => {
  const [activities, setActivities] = useState<DetailedActivityResponse[]>([]);

  const startActivitiesFetch = useCallback(async () => {
    try {
      const response = await fetch('/api/startFetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to start fetching activities');
      }

      const data = await response.json();
      console.log(data.message); // Or handle this message in your UI
    } catch (error) {
      console.error('Error:', error);
      // Implement any error handling logic here
    }
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch('/api/store/activities/getActivities');
        const data = await res.json();
        setActivities(data);
      } catch (error) {
        console.error('Failed to fetch activities:', error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="container mx-auto pt-10">
      <div className="mt-5">
        <button onClick={startActivitiesFetch}>Fetch Activities</button>
      </div>

      <div className="flex flex-col mt-5 gap-3">
        Already stored activities:
        {activities.map((activity) => (
          <div key={activity.id} className="border rounded-lg px-3 py-3">
            <p className="font-medium">{activity.name}</p>
            <p>{`Duration: ${activity.elapsed_time} seconds`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
