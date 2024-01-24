import { getHours, getMinutes, addDays } from 'date-fns';

export const isTimeWithinRange = (
  currentTime: Date,
  startTime: Date,
  endTime: Date,
) => {
  const openingTimeMinutes = getHours(startTime) * 60 + getMinutes(startTime);
  const closingTimeMinutes = getHours(endTime) * 60 + getMinutes(endTime);
  const currentTimeMinutes =
    getHours(currentTime) * 60 + getMinutes(currentTime);

  if (closingTimeMinutes < openingTimeMinutes) {
    // Closing time is on the next day, so add a day to the current time
    const nextDayCurrentTime = addDays(currentTime, 1);
    const nextDayCurrentTimeMinutes =
      getHours(nextDayCurrentTime) * 60 + getMinutes(nextDayCurrentTime);

    // Check if the current time is within the opening time and the closing time of the next day
    return (
      (openingTimeMinutes <= currentTimeMinutes &&
        currentTimeMinutes <= 1440) || // Check within current day
      (0 <= nextDayCurrentTimeMinutes &&
        nextDayCurrentTimeMinutes <= closingTimeMinutes) // Check within next day
    );
  } else {
    // Closing time is on the same day
    return (
      openingTimeMinutes <= currentTimeMinutes &&
      currentTimeMinutes <= closingTimeMinutes
    );
  }
};
