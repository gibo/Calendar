import React from "react";

const Time = () => {
  const times = [
    "9:00 AM",
    "9:30",
    "10:00 AM",
    "10:30",
    "11:00 AM",
    "11:30",
    "12:00 PM",
    "12:30",
    "1:00 PM",
    "1:30",
    "2:00 PM",
    "2:30",
    "3:00 PM",
    "3:30",
    "4:00 PM",
    "4:30",
    "5:00 PM",
    "5:30",
    "6:00 PM",
    "6:30",
    "7:00 PM",
    "7:30",
    "8:00 PM",
    "8:30",
    "9:00 PM"
  ];

  const timesStyle = {
    float: "left",
    listStyle: "none",
    margin: 0,
    padding: "0 10px",
    textAlign: "right"
  };

  return (
    <ul style={timesStyle}>
      {times.map((time, index) => {
        let timeStyle = {
          paddingBottom: 15
        };
        if (index % 2) {
          timeStyle.fontSize = 10;
        } else {
          timeStyle.fontWeight = "bold";
        }
        return (
          <li style={timeStyle} key={time}>
            {time}
          </li>
        );
      })}
    </ul>
  );
};

export default Time;
