import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { FormControl } from "@material-ui/core";

export default function DatePicker({
  fullWidth,
  handleChange,
  format,
  name,
  label,
  disableFuture,
  disablePast,
  variant,
}) {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
    handleChange({ target: { name, value: date.toISOString() } });
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableFuture={disableFuture || false}
        disablePast={disablePast || false}
        disableToolbar
        variant="inline"
        format={format || "MM/dd/yyyy"}
        margin="normal"
        id="date-picker-inline"
        label={label}
        name={name}
        value={selectedDate}
        defaultValue={new Date()}
        onChange={handleDateChange}
        fullWidth={fullWidth}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
