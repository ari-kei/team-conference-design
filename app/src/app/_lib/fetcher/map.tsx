import { GeoCode } from "@/app/domain/map";
import opencage from "opencage-api-client";

export async function fetchAddress(address: string): Promise<GeoCode> {
  return opencage
    .geocode({ q: address })
    .then((data) => {
      if (data.status?.code === 200 && data.results.length > 0) {
        return data.results[0].geometry;
      } else {
        console.log("Status", data.status.message);
        console.log("total_results", data.total_results);
      }
    })
    .catch((error) => {
      console.log("Error", error.message);
      if (error.status?.code === 402) {
        console.log("hit free trial daily limit");
        console.log("become a customer: https://opencagedata.com/pricing");
      }
    });
}
