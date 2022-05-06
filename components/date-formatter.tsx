import { format, parseISO } from "date-fns";
import React from "react";

type Props = {
  dateString: string;
};

const DateFormatter: React.FC<Props> = ({ dateString }) => {
  const date = parseISO(dateString);
  const formatted = format(date, "LLLL	d, yyyy");

  return <time dateTime={dateString}>{formatted}</time>;
};

export default DateFormatter;
