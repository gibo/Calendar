import React from "react";
import _ from "lodash";

import Events from "./components/events";
import Time from "./components/time";

const App = ({ data }) => (
  <div>
    <Time />
    <Events data={data} />
  </div>
);

export default App;
