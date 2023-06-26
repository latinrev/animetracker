import { Prisma } from "@prisma/client";

export const buildFilter = (searchQuery = "") => {
  const filter: Prisma.animeFindManyArgs = searchQuery
    ? {
        where: {
          AND: {
            name: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
        },
      }
    : { where: { AND: {} } };
  return filter;
};

export const deleteActionField = (data) => {
  for (const key in data) {
    if (key.startsWith("$ACTION_ID")) {
      delete data[key];
    } else if (key.startsWith("id")) {
      delete data[key];
    }
  }
  return data;
};

export function calculateDaysUntilNextDayOfWeek(nextDayOfWeek: string) {
  const dayString = `New chapter available in`;
  const currentDate = new Date();
  let nextDay = currentDate.getDay(); // Current day of the week (0 - Sunday, 1 - Monday, ..., 6 - Saturday)

  // Convert the nextDayOfWeek string to lowercase and get the corresponding day index
  nextDayOfWeek = nextDayOfWeek.toLowerCase();
  const dayOfWeekIndex = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].indexOf(nextDayOfWeek);

  if (dayOfWeekIndex === -1) {
    // Invalid day of the week provided
    return -1;
  }

  // Calculate the difference in days until the next day of the week
  let daysDifference = dayOfWeekIndex - nextDay;
  if (daysDifference < 0) {
    // The next day of the week occurs in the following week
    daysDifference += 7;
  }

  if (daysDifference === 1) {
    return `${dayString} ${daysDifference} day`;
  } else if (daysDifference === 0) {
    return `There is a new chapter available today!`;
  } else {
    return `${dayString} ${daysDifference} days`;
  }
}
