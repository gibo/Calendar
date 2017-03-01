import _ from "lodash";

export const CONTAINER_WIDTH = 600;
export const CONTAINER_HORIZONTAL_PADDING = 10;
export const CONTAINER_HEIGHT = 720;

export class Calendar {
  constructor(data) {
    this.data = data;
  }

  sort() {
    this.data.sort((a, b) => {
      if (a.start > b.start) {
        return 1;
      } else if (a.start < b.start) {
        return -1;
      }
      return 0;
    });
  }

  getEventsLayout() {
    this.sort();
    return this.findEventLayout(this.findCollumns(this.findCollisionGroup()));
  }

  findCollisionGroup() {
    let colliding = [];
    this.data.forEach(event => {
      if (!this.doesCollideInCollisionGroup(_.last(colliding), event)) {
        colliding.push([]);
      }
      _.last(colliding).push(event);
    });
    return colliding;
  }

  findCollumns(collisionGroups) {
    let colliding = [];
    collisionGroups.forEach((group, groupIndex) => {
      colliding.push([[]]);
      group.forEach(currentEvent => {
        let newColumn = true;
        let groupWithColumns = colliding[groupIndex];
        const groupWithColumnsLen = groupWithColumns.length;
        let i = 0;
        while (i < groupWithColumnsLen) {
          if (!this.doesCollide(currentEvent, _.last(groupWithColumns[i]))) {
            newColumn = false;
            break;
          }
          i++;
        }
        let columnIndex = newColumn ? groupWithColumns.push([]) - 1 : i;
        groupWithColumns[columnIndex].push(currentEvent);
      });
    });
    return colliding;
  }

  findEventLayout(eventsGrouped) {
    let events = [];
    eventsGrouped.forEach(group => {
      const widthDivisor = group.length;
      group.forEach((column, columnIndex) => {
        column.forEach(event => {
          const width = CONTAINER_WIDTH / widthDivisor;
          const style = {
            background: "#f6f6f6",
            borderLeft: "5px #00bb8f solid",
            color: "#00bb8f",
            left: columnIndex * width + CONTAINER_HORIZONTAL_PADDING,
            height: event.end - event.start,
            overflow: "hidden",
            position: "absolute",
            top: event.start,
            width: width
          };
          events.push(style);
        });
      });
    });
    return events;
  }

  doesCollideInCollisionGroup(collisionGroup, currentEvent) {
    if (!collisionGroup) {
      return false;
    }
    let i = collisionGroup.length;
    let collides = false;
    while (i--) {
      if (this.doesCollide(currentEvent, collisionGroup[i])) {
        collides = true;
        break;
      }
    }
    return collides;
  }

  doesCollide(curr, prev) {
    if (!prev) {
      return false;
    }
    return (
      (curr.start <= prev.start && prev.start <= curr.end) ||
      (curr.start <= prev.end && prev.end <= curr.end) ||
      (prev.start <= curr.start && curr.start <= prev.end) ||
      (prev.start <= curr.end && curr.end <= prev.end)
    );
  }
}
