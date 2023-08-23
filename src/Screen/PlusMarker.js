import { React, useState } from "react";
import {
  Box,
  Center,
  HStack,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  modeState,
  markerState,
  myLocationState,
} from "../Utils/atom";

export const PlusMarker = () => {
  const [markersImage, setMarkersImage] = useState("");
  const [markerName, setMarkerName] = useState([
    "pushpin",
    "star",
    "eye",
    "flag",
    "heart",
    "gift",
    "like1",
    "slack",
  ]);
  const [mode, setMode] = useRecoilState(modeState);
  const [marker, setMarker] = useRecoilState(markerState);
  const myInfoLocation = useRecoilValue(myLocationState);
  return (
    <Box
      position={"absolute"}
      flex={1}
      bottom={0}
      width={"100%"}
      height={"40%"}
      backgroundColor={"white"}
      justifyContent={"space-around"}
      alignItems={"center"}
    >
      <Center width={"90%"} height="40%">
        <Text fontSize={40}>마커 추가</Text>
      </Center>
      <Box
        h="50%"
        width={"90%"}
        flex={1}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <ScrollView horizontal={true}>
          <HStack space={5}>
            {markerName.map((name, index) => 
                <AntDesign
                  key={index}
                  name={name}
                  size={50}
                  color={markersImage === name ? "red" : "black"}
                  onPress={() => {
                    setMarkersImage(name);
                  }}
                />
              )}
          </HStack>
        </ScrollView>
      </Box>
      <Center
        flex={1}
        width={"90%"}
        h="30%"
        flexDirection={"row"}
        justifyContent={"space-around"}
      >
        <VStack space={2} alignItems={"center"}>
          <AntDesign
            name="closecircleo"
            size={50}
            color="black"
            onPress={() => {
              setMode("default");
            }}
          />
          <Text>취소</Text>
        </VStack>
        <VStack space={2} alignItems={"center"}>
        <AntDesign
          name="checkcircleo"
          size={50}
          color="black"
          onPress={() => {
            setMode("default");
            setMarker((marker)=>{
              return [
                ...marker,
                {
                  key: marker.length,
                  selected: false,
                  name: markersImage,
                  latitude: myInfoLocation[1],
                  longitude: myInfoLocation[0],
                  icon: markersImage,
                  createdAt: new Date(),
                },
              ];
            });
          }}
        />
        <Text>확인</Text>
        </VStack>
      </Center>
    </Box>
  );
};
