import { createClient, AddressComponent } from "@google/maps";

const maps = createClient({
  key: `${process.env.G_GEOCODE_KEY}`,
  Promise: Promise, //the value here is actual promise constructor itself
});


const parseAddress = (addressComponents: AddressComponent<string>[]) => {
  let country = null;
  let admin = null;
  let city = null;

  for (const component of addressComponents) {
    if (component.types.includes("country")) {
      country = component.long_name;
    }

    if (component.types.includes("administrative_area_level_1")) {
      admin = component.long_name;
    }

    if (
      component.types.includes("locality") ||
      component.types.includes("postal_town")
    ) {
      city = component.long_name;
    }
  }

  console.log(city);
  return { country, admin, city };
};

export const GeoCode = {
  geoCode: async (address: string) => {
    const res = await maps.geocode({ address }).asPromise();
  
    if (res.status < 200 || res.status > 299) {
      throw new Error("Failed to geocode address");
    }

    return parseAddress(res.json.results[0].address_components);
  },
};
