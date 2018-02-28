import treadmill from "./treadmill.svg";
import bike from "./bike.png";
import elliptical from "./elliptical.png";

const machineTypes = {
  "Bikes": bike,
  "Elliptical machines": elliptical,
  "Pull-up machines": "",
  "Stepmills": "",
  "Treadmills": treadmill,
  "All": "",
};

const machines = [
  {
    id: 101,
    type: "Elliptical machines",
    queueSize: 3,
    description: "This machine is located on the second floor near the water fountain",
  },
  {
    id: 102,
    type: "Bikes",
    queueSize: 2,
    description: "This machine is located on the second floor near the water fountain",
  },
  {
    id: 103,
    type: "Treadmills",
    queueSize: 0,
    description: "This machine is located on the second floor near the water fountain",
  },
  {
    id: 202,
    type: "Bikes",
    queueSize: 3,
    description: "This machine is located on the second floor near the water fountain",
  },
  {
    id: 203,
    type: "Treadmills",
    queueSize: 10,
    description: "This machine is located on the second floor near the water fountain",
  }
];

let evalStatus = m => {
  if (m.queueSize >= 1 && m.queueSize < 10) {
    return "busy";
  } else if (m.queueSize >= 10) {
    return "full";
  } else if (m.queueSize < 0) {
    return "inactive";
  } else {
    return "available";
  }
}

export { machines, machineTypes, evalStatus };
