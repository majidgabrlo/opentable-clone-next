import axios from "axios";
import { useState } from "react";

type fetchAvailabilitiesArguments = {
  slug: string;
  partySize: number;
  day: string;
  time: string;
};

type DataType = {
  time: {
    time: string;
    displayTime: string;
  };
  available: boolean;
};

const useAvailabilities = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<DataType[] | null>(null);

  const fetchAvailabilities = async ({
    slug,
    partySize,
    day,
    time,
  }: fetchAvailabilitiesArguments) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/restaurant/${slug}/availability`, {
        params: { day, time, partySize },
      });
      setData(response.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(true);
      setError(error.response.data.errorMessage);
    }
  };
  return { loading, data, error, fetchAvailabilities };
};

export default useAvailabilities;
