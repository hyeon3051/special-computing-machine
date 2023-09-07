import React from "react";
import { NativeBaseProvider } from "native-base";
import { RecoilRoot} from "recoil";
import Default from "./Default";
export default function App() {

  return (
    <NativeBaseProvider>
      <RecoilRoot>
        <Default/>
      </RecoilRoot>
    </NativeBaseProvider>
  );
}