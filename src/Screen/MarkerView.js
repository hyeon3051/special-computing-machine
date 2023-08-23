import React, { useEffect, useState, useRef } from "react";
import { ScrollView, Dimensions } from "react-native";
import {
  Box,
  Text,
  Center,
  HStack,
  Image,
  VStack,
  AspectRatio,
  TextField
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useRecoilState } from "recoil";
import {
  modeState,
  markerState,
  dataLocationState,
} from "../Utils/atom";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const MarkerView = () => {
  const [mode, setMode] = useRecoilState(modeState);
  const [dataLocation, setDataLocation] = useRecoilState(dataLocationState);
  const [markers, setMarkers] = useRecoilState(markerState);
  const [selectedMarker, setSelectedMarker] = useState({});


  useEffect(() => {
    let idx = markers.findIndex((item) => {
      return item.selected === true;
    });
    setSelectedMarker(markers[idx]);
  }, []);


  return (
    <Box
      position={"absolute"}
      flex={1}
      bottom={0}
      width={Dimensions.get("window").width}
      height={"50%"}
      justifyContent={"space-around"}
      alignItems={"center"}
      background={"white"}
    >
      <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={130}>
        <VStack>
          <Box width={"100%"} padding={2}>
            <HStack flex={1} justifyContent={"space-between"}>
              <Box>
                <Text fontSize={25} alignSelf={"flex-start"}>
                  <AntDesign
                    name="close"
                    size={24}
                    color="black"
                    onPress={() => {
                      setMode("default");
                      setDataLocation([]);
                      setMarkers(
                        markers.map((parent, index) => {
                            return {
                              ...parent,
                              selected: false,
                            };
                        }
                      ));
                    }}
                  />
                </Text>
              </Box>
            </HStack>
          </Box>
        </VStack>
        <VStack>
          <Box width={"100%"} padding={2}>
            <VStack space={2}>
              <Box>
                <HStack space={2}>
                  <Box
                    rounded={10}
                    padding={2}
                    background={"warmGray.500"}

                  >
                    <Center>
                      <Text fontSize={15} alignSelf={"center"}>
                        {selectedMarker.latitude?.toFixed(5)}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize={15} alignSelf={"center"}>
                        경도
                      </Text>
                    </Center>
                  </Box>
                  <Box
                    rounded={10}
                    padding={2}
                    background={"warmGray.500"}
                  >
                    <Center>
                      <Text fontSize={15} alignSelf={"flex-start"}>
                        {selectedMarker.longitude?.toFixed(5)}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize={15} alignSelf={"center"}>
                        위도
                      </Text>
                    </Center>
                  </Box>
                  <Box
                    width={"45%"}
                    rounded={10}
                    padding={2}
                    background={"warmGray.500"}
                  >
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      <Text
                        fontSize={15}
                        alignSelf={"flex-start"}
                        flexShrink={1}
                      >
                        {selectedMarker.address}
                      </Text>
                    </ScrollView>
                    <Center>
                      <Text fontSize={15} alignSelf={"center"}>
                        주소
                      </Text>
                    </Center>
                  </Box>
                </HStack>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </KeyboardAwareScrollView>
    </Box>
  );
};
