import { ExtendedAnime } from "@/types/Anime";
import { BuildFieldOptions, BuildFieldReturnType } from "@/types/BuildField";
import { GenericField, GenericValue } from "@/types/GenericField";
import { Prisma, anime } from "@prisma/client";
import { capitalCase } from "change-case";

export const buildFilter = (searchQuery = "") => {
  const filter: Prisma.animeFindManyArgs = {
    where: {
      name: {
        contains: searchQuery,
        mode: "insensitive",
      },
    },
  };
  return filter;
};

export const buildField = (fieldName: string, options: BuildFieldOptions = {}): BuildFieldReturnType => {
  const { value = "", required = false, hidden = false, selectOptions = [], type = "text", label = fieldName } = options;
  return { fieldName, value, required, hidden, selectOptions, type, label };
};

export const deleteActionField = (data: { [key: string]: any }) => {
  for (const key in data) {
    if (key.startsWith("$ACTION_ID")) {
      delete data[key];
    } else if (key.startsWith("id")) {
      delete data[key];
    }
  }
  return data;
};

export const buildInputs = (
  fields: GenericField,
  defaultValues?: any,
  styles?: {
    inputClassName?: React.ComponentProps<"div">["className"];
    spanClassName?: React.ComponentProps<"div">["className"];
    selectClassName?: React.ComponentProps<"div">["className"];
    optionClassName?: React.ComponentProps<"div">["className"];
  }
) => {
  return Object.entries(fields).map(([key, { required, value, hidden, selectOptions = [], type = "text", label }]) => (
    <>
      <label key={key} className={`${hidden ? "hidden" : "block"} ${styles?.spanClassName || ""}`}>
        {capitalCase(label || key)}
      </label>
      {selectOptions.length === 0 ? (
        <input
          className={`text-black p-2 ${styles?.inputClassName || ""}`}
          type={type}
          name={key}
          required={required}
          hidden={hidden}
          defaultValue={value || defaultValues?.[key] || ""}
        />
      ) : (
        <select name={key} className={`text-black p-2 ${styles?.selectClassName}`}>
          {selectOptions.map((option) => (
            <option className={`text-black p-2 ${styles?.optionClassName}`} value={`${option}`}>
              {option}
            </option>
          ))}
        </select>
      )}
    </>
  ));
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
