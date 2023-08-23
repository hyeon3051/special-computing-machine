import { React } from "react";
import {
  Box,
  Text,
  VStack,
} from "native-base";
import { AntDesign} from "@expo/vector-icons";
import { useRecoilState } from "recoil";
import { modeState } from "../Utils/atom";

export const LeftIcon = () => {
  const [mode, setMode] = useRecoilState(modeState);
  return (
    <Box position={"absolute"} left={5} bottom={10}>
      <VStack space={2} alignItems="center">
        <AntDesign
          name="pluscircleo"
          size={50}
          left={0}
          bottom={0}
          color={"yellow"}
          onPress={() => setMode("plusMarker")}
        />
        <Text 
          color={"white"}
          bold
        >
          마커 추가
        </Text>
      </VStack>
    </Box>
  );
};
