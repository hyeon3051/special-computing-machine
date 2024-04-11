import React from "react";
import { View, ScrollView } from "react-native";
import {
  Box,
  Text,
  Center,
  HStack,
  VStack,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  modeState,
  markerState,
  viewToastState,
  dataLocationState,
} from "../Utils/atom";

export const MarkerInfo = () => {
  const [mode, setMode] = useRecoilState(modeState);
  const [marker, setMarker] = useRecoilState(markerState);
  const [dataLocation, setDataLocation] = useRecoilState(dataLocationState);
  const viewToast = useRecoilValue(viewToastState);
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
      <Center width={"90%"} height="30%">
        <Text fontSize={40}>마커</Text>
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
            {marker.map((data, index) => {
              return (
                <VStack key={index}>
                  <Center>
                    <AntDesign
                      name={data.icon}
                      size={50}
                      color={data.selected ? "red" : "black"}
                      onPress={() => {
                        setDataLocation([
                          data.longitude, data.latitude
                        ])
                        setMarker(
                          marker.map((parent, idx) => {
                            if (index === idx) {
                              return {
                                ...parent,
                                selected: true,
                              };
                            }
                            return {
                              ...parent,
                              selected: false,
                            }
                          })
                        )
                      }}
                    />
                    <Text>{data.name}</Text>
                  </Center>
                </VStack>
              );
            })}
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
              setDataLocation([]);
              setMarker(
                marker.map((parent) => {
                  return {
                    ...parent,
                    selected: false,
                  };
                })
              )
            }}
          />
          <Text>
            닫기
          </Text>
        </VStack>
        <VStack space={2} alignItems={"center"}>
          <AntDesign
            name="infocirlceo"
            size={50}
            color="black"
            onPress={() => {
              if (dataLocation.length === 0) {
                viewToast("마커를 선택해주세요.");
                return;
              }
              setMode("markerView");
            }}
          />
          <Text>
            정보
          </Text>
        </VStack>
      </Center>
    </Box>
  );
};
