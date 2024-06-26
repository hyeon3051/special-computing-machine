import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import {
  Box,
  Text,
  Center,
  HStack,
  Icon,
  IconButton,
  VStack,
  Popover,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  modeState,
  markerState,
  viewToastState,
} from "../Utils/atom";

export const DeleteMarkerView = () => {
  const [mode, setMode] = useRecoilState(modeState);
  const [marker, setMarker] = useRecoilState(markerState);
  const [isOpen, setIsOpen] = useState(false);
  const viewToast = useRecoilValue(viewToastState);
  const deleteMarker = () => {
    setMarker(
      marker.filter((data) => {
        return !data.deleteToggle
      }
    ))
    console.log(marker)
  }
  
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
        <Text fontSize={40}>마커 삭제</Text>
      </Center>
      <Box
        h="50%"
        width={"100%"}
        flex={1}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <ScrollView horizontal={true}>
          <HStack space={5}>
            {marker.map((data) =>
            <VStack key={data.key} space={2} alignItems={"center"}>
              <AntDesign
                name={data.icon}
                size={50}
                color={data.deleteToggle ? "red" : "black"}
                key={data.key}
                onPress={() =>{
                  setMarker(
                    marker.map((parent) => {
                      if (parent.key === data.key) {
                        return {
                          ...parent,
                          deleteToggle:  parent.deleteToggle ? false : true,
                        };
                      }
                      return parent;
                    })
                  )
                  console.log(marker)
                }
              }
              />
              <Text>{data.name}</Text>
            </VStack>
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
        <Box>
          <Popover
            position="top"
            isOpen={isOpen}
            trigger={(triggerProps) => {
              return (
                <VStack space={2} alignItems={"center"}>
                  <IconButton
                    icon={
                      <Icon
                        as={AntDesign}
                        name="delete"
                        size={"50"}
                        color={"black"}
                      />
                    }
                    {...triggerProps}
                    onPress={() => {
                      if(marker.findIndex(data=> data.deleteToggle) !== -1) {
                        setIsOpen(!isOpen)
                      }else{
                        viewToast("마커를 선택해주세요")
                    }}
                  }
                  />
                  <Text>
                    삭제
                  </Text>
                </VStack>
              );
            }}
          >
            <Popover.Content accessibilityLabel="hello world">
              <Popover.CloseButton onPress={() => setIsOpen(false)} />
              <Popover.Header>마커 삭제</Popover.Header>
              <Popover.Body h={"50  "}>
                <Text>정말로 삭제 하실 건가요?</Text>
              </Popover.Body>
              <Popover.Footer justifyContent="space-around">
                <VStack space={2} alignItems={"center"}>
                <AntDesign
                  name="closecircleo"
                  size={40}
                  color="black"
                  onPress={() => {
                    setIsOpen(false);
                  }}
                />
                <Text>
                  취소
                </Text>
                </VStack>
                <VStack space={2} alignItems={"center"}>
                <AntDesign
                  name="delete"
                  size={40}
                  color="black"
                  onPress={() => {
                    setIsOpen(false);
                    deleteMarker();
                  }}
                />
                <Text>
                  삭제
                </Text>
                </VStack>
              </Popover.Footer>
            </Popover.Content>
          </Popover>
        </Box>
      </Center>
    </Box>
  );
};
