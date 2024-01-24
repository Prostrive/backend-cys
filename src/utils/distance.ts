export type Coordinate = {
  latitude: number;
  longitude: number;
};

export const getDistanceBetweenTwoPoints = (
  coord1: Coordinate,
  coord2: Coordinate,
) => {
  if (
    coord1.latitude === coord2.latitude &&
    coord1.longitude === coord2.longitude
  ) {
    return 0;
  }

  const radianLatitude1 = (Math.PI * coord1.latitude) / 180;
  const radianLatitude2 = (Math.PI * coord2.latitude) / 180;

  const theta = coord1.longitude - coord2.longitude;
  const radianTheta = (Math.PI * theta) / 180;

  let distance =
    Math.sin(radianLatitude1) * Math.sin(radianLatitude2) +
    Math.cos(radianLatitude1) *
      Math.cos(radianLatitude2) *
      Math.cos(radianTheta);

  if (distance > 1) {
    distance = 1;
  }

  distance = Math.acos(distance);
  distance = (distance * 180) / Math.PI;
  distance = distance * 60 * 1.1515;

  return distance;
};
