import React from "react";

import Background from "./background.png";
import {
  Calendar,
  CONTAINER_WIDTH,
  CONTAINER_HORIZONTAL_PADDING,
  CONTAINER_HEIGHT
} from "./calendar";

const Events = ({ data }) => {
  const events = new Calendar(data).getEventsLayout();

  const calendarStyle = {
    background: `url(${Background})`,
    border: "1px #f6f6f6 solid",
    float: "left",
    height: CONTAINER_HEIGHT,
    paddingLeft: CONTAINER_HORIZONTAL_PADDING,
    paddingRight: CONTAINER_HORIZONTAL_PADDING,
    position: "relative",
    top: 7,
    width: CONTAINER_WIDTH + CONTAINER_HORIZONTAL_PADDING * 2
  };

  const titleStyle = {
    fontWeight: "bold"
  };

  const locationStyle = {
    fontSize: 10
  };

  const eventInnerStyle = {
    padding: 10
  };

  return (
    <div style={calendarStyle}>
      {events.map((event, index) => {
        return (
          <div style={event} key={index}>
            <div style={eventInnerStyle}>
              <span style={titleStyle}>Sample item</span>
              <br />
              <span style={locationStyle}>Sample location</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Events;
