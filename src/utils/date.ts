import { DateTime } from "luxon";
import { locale } from "../consts/locale";

const defaultFormat = "d LLLL yyyy";

export const formatDate = (dateString: string, format = defaultFormat) => {
  return DateTime.fromISO(dateString, { locale }).toFormat(format);
};
