import { iptuData } from "@/data";

export const getData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 0));

  return iptuData;
};
