import { Calendar } from "./calendar";

const INPUT_UNSORTED = [
  { start: 30, end: 150 },
  { start: 560, end: 620 },
  { start: 540, end: 600 },
  { start: 610, end: 670 }
];

const INPUT_SORTED = [
  { start: 30, end: 150 },
  { start: 540, end: 600 },
  { start: 560, end: 620 },
  { start: 610, end: 670 }
];

describe("calendar", () => {
  it("sorts events by start", () => {
    const expected = [
      { start: 30, end: 150 },
      { start: 540, end: 600 },
      { start: 560, end: 620 },
      { start: 610, end: 670 }
    ];

    const calendar = new Calendar(INPUT_UNSORTED);
    calendar.sort();

    expect(calendar.data).toEqual(expected);
  });

  it("finds colliding events", () => {
    const expected = [
      [{ start: 30, end: 150 }],
      [
        { start: 540, end: 600 },
        { start: 560, end: 620 },
        { start: 610, end: 670 }
      ]
    ];

    const calendar = new Calendar(INPUT_SORTED);

    expect(calendar.findCollisionGroup()).toEqual(expected);
  });

  describe("finds colliding events and columns", () => {
    it("scenario 1", () => {
      const expected = [
        [[{ start: 30, end: 150 }]],
        [
          [{ start: 540, end: 600 }, { start: 610, end: 670 }],
          [{ start: 560, end: 620 }]
        ]
      ];

      const calendar = new Calendar(INPUT_SORTED);

      expect(calendar.findCollumns(calendar.findCollisionGroup())).toEqual(
        expected
      );
    });

    it("scenario 2", () => {
      const input = [
        { start: 440, end: 550 },
        { start: 450, end: 500 },
        { start: 510, end: 570 }
      ];

      const expected = [
        [
          [{ start: 440, end: 550 }],
          [{ start: 450, end: 500 }, { start: 510, end: 570 }]
        ]
      ];

      const calendar = new Calendar(input);

      expect(calendar.findCollumns(calendar.findCollisionGroup())).toEqual(
        expected
      );
    });

    it("scenario 3", () => {
      const input = [
        { start: 600, end: 720 },
        { start: 630, end: 720 },
        { start: 660, end: 720 },
        { start: 690, end: 720 }
      ];

      const expected = [
        [
          [{ start: 600, end: 720 }],
          [{ start: 630, end: 720 }],
          [{ start: 660, end: 720 }],
          [{ start: 690, end: 720 }]
        ]
      ];

      const calendar = new Calendar(input);

      expect(calendar.findCollumns(calendar.findCollisionGroup())).toEqual(
        expected
      );
    });

    it("scenario 4", () => {
      const input = [
        { start: 0, end: 120 },
        { start: 45, end: 165 },
        { start: 90, end: 210 },
        { start: 135, end: 195 },
        { start: 180, end: 300 },
        { start: 210, end: 330 }
      ];

      const expected = [
        [
          [
            { start: 0, end: 120 },
            { start: 135, end: 195 },
            { start: 210, end: 330 }
          ],
          [{ start: 45, end: 165 }, { start: 180, end: 300 }],
          [{ start: 90, end: 210 }]
        ]
      ];

      const calendar = new Calendar(input);

      expect(calendar.findCollumns(calendar.findCollisionGroup())).toEqual(
        expected
      );
    });
  });

  it("returns event layout as style objects", () => {
    let expected = [
      {
        background: "#f6f6f6",
        borderLeft: "5px #00bb8f solid",
        color: "#00bb8f",
        left: 10,
        height: 120,
        overflow: "hidden",
        position: "absolute",
        top: 30,
        width: 600
      },
      {
        background: "#f6f6f6",
        borderLeft: "5px #00bb8f solid",
        color: "#00bb8f",
        left: 10,
        height: 60,
        overflow: "hidden",
        position: "absolute",
        top: 540,
        width: 300
      },
      {
        background: "#f6f6f6",
        borderLeft: "5px #00bb8f solid",
        color: "#00bb8f",
        left: 10,
        height: 60,
        overflow: "hidden",
        position: "absolute",
        top: 610,
        width: 300
      },
      {
        background: "#f6f6f6",
        borderLeft: "5px #00bb8f solid",
        color: "#00bb8f",
        left: 310,
        height: 60,
        overflow: "hidden",
        position: "absolute",
        top: 560,
        width: 300
      }
    ];

    let calendar = new Calendar(INPUT_UNSORTED);

    expect(calendar.getEventsLayout()).toEqual(expected);
  });
});
