import { atom } from "recoil";
import AsyncStorage from '@react-native-async-storage/async-storage';

const modeState = atom({
  key: "modeState",
  default: "default",
});

const myLocationState = atom({
  key: "myLocationState",
  default: [-1, -1],
});

const dataLocationState = atom({
  key: "dataLocationState",
  default: [],
});

const markerState = atom({
  key: "markerState",
  default: []
})

const fileNameState = atom({
  key: "fileNameState",
  default: "",
})

const recordState = atom({
  key: "recordState",
  default: false
})

const routeState = atom({
  key: "routeState",
  default: [
    [
      [],
    ],
    [
      [120.1763111, 23.93851111],
      [121.5673111, 24.98241111],
      [122.6562111, 25.12341111],
      [123.4321111, 26.78901111],
      [124.9832111, 27.09121111],
      [125.1289111, 28.29381111]
    ]
  ]
})
const viewToastState = atom({
  key: "viewToastState",
  default: () => {},
});

export {
  modeState,
  myLocationState,
  dataLocationState,
  fileNameState,
  recordState,
  markerState,
  routeState,
  viewToastState,
};
