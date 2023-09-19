import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  HStack,
  Text,
  VStack,
  Popover,
  IconButton,
  Icon
} from "native-base";
import {useRecoilState, useRecoilValue} from "recoil";
import { ScrollView } from "react-native";
import {
    modeState,
    routeState, viewToastState,
} from "../Utils/atom";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../Utils/Consts";

export const DefaultRouteScreen = () => {
  const [mode, setMode] = useRecoilState(modeState);
  const [rawRoute, setRawRoute] = useRecoilState(routeState);
  const [route, setRoute] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const viewToast = useRecoilValue(viewToastState)

  useEffect(() => {
    setRoute(rawRoute.slice(1).map(
      (item) => {
        return {
          route: item,
          selected: false,
        }
      }
    )
    )
  }, []);

  const mergeRoute = () => {
    let selectedRoute = []
    let selectedIdxList = [];
    route.forEach((item, idx) => {
      if (item.selected) {
        selectedRoute.push(item.route);
        selectedIdxList.push(idx);
      }
    });
    let newRoute = rawRoute.slice(1).filter(
      (item,idx)=>
        !selectedIdxList.includes(idx)
    )
    newRoute.length === 0 ?
    setRawRoute(
      [
        [
          ...rawRoute[0],
          ...selectedRoute
        ],
      ]
    ) :
    setRawRoute(
        [
          [
            ...rawRoute[0],
            ...selectedRoute
          ],
          ...newRoute
        ]
      )
    setMode("default");
  }

  const remove = () => {
    let selectedIdxList = [];
    route.forEach((item, idx) => {
      if (item.selected) {
        selectedIdxList.push(idx);
      }
    });
    console.log(selectedIdxList)
    let newRoute = rawRoute.slice(1).filter(
      (item,idx)=>
        !selectedIdxList.includes(idx)
    )
    newRoute.length === 0 ?
    setRawRoute(
      [
        [
          ...rawRoute[0]
        ],
      ]
    ) :
    setRawRoute(
        [
          [
            ...rawRoute[0],
          ],
          ...newRoute
        ]
      )
    setMode("default");
  };

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
      <Center width={"90%"} height={"30%"}>
        <Text fontSize={40}>경로</Text>
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
            {route.map(
              (item,idx)=>{
                return (
                  <VStack space={2} alignItems={"center"}>
                  <AntDesign
                    key={idx}
                    name="fork"
                    size={50}
                    color={
                      item.selected ?
                      Colors[idx % Colors.length] + "ff":
                      Colors[idx % Colors.length] + "66"
                    }
                    onPress={() => {
                      setRoute(
                        route.map((parent, index) => {
                          if (index === idx) {
                            return {
                              ...parent,
                              selected: !parent.selected,
                            };
                          }
                          return parent;
                        })
                      );
                      console.log(item.route)
                    }}
                />
                <Text>{"과거 경로 " + `${idx}`}</Text>
                </VStack>
                )
              }
            )}
          </HStack>
      </ScrollView>
      </Box>
      <Box
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
          <Text>
            취소
          </Text>
        </VStack>
        <VStack space={2} alignItems={"center"}>
        <Popover
            position="top"
            isOpen={isOpen}
            trigger={(triggerProps) => {
              return (
                <VStack space={0} alignItems={"center"}>
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
                        if(route.findIndex(data=> data.selected) !== -1) {
                            setIsOpen(!isOpen)
                        }else{
                            viewToast("루트를 선택해주세요")
                        }
                    }}
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
                    remove();
                  }}
                />
                <Text>
                  삭제
                </Text>
                </VStack>
              </Popover.Footer>
            </Popover.Content>
          </Popover>
        </VStack>
        <VStack space={2} alignItems={"center"}>
          <AntDesign
            name="arrowsalt"
            size={50}
            color="black"
            onPress={() => {
                if(route.filter(data => data.selected).length >= 2) {
                    mergeRoute();
                }else{
                    viewToast("두 개의 경로가 있어야 합니다")
                }
            }}
          />
          <Text>
            합치기
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};
