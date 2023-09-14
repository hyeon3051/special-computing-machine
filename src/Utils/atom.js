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
      []
    ],
    []
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
