import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  HStack,
  Text,
  Icon,
  IconButton,
  VStack,
  Popover,
} from "native-base";
import {useRecoilState, useRecoilValue} from "recoil";
import { ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  modeState,
  markerState,
  routeState, viewToastState,
} from "../Utils/atom";
import { AntDesign } from "@expo/vector-icons";

export const DefaultSaveScreen = () => {
  let [mode, setMode] = useRecoilState(modeState);
  let [keys, setKeys] = useState([]);
  let [marker,setMarker] = useRecoilState(markerState);
  let [route, setRoute] = useRecoilState(routeState);
  const [isOpen, setIsOpen] = useState(false);
  const viewToast =useRecoilValue(viewToastState)

  const getAllKeys = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      setKeys(keys.map(
        (key) => {
          return {
            name: key,
            selected: false,
          }
        }
      ));
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    getAllKeys();
  }, []);

  const remove = async () => {
    try {
      const allPromises = keys.map(async (key) => {
        if (key.selected) {
          await AsyncStorage.removeItem(key.name);
        }
      });
      await Promise.all(allPromises);
      getAllKeys();
    } catch (e) {
      // error reading value
    }
  };

  const load = async () => {
    try {
      const allPromises =
      keys.map(async (key) => {
        if (key.selected) {
          const value = await AsyncStorage.getItem(key.name);
          return JSON.parse(value);
        }
      });

      const allData = await Promise.all(allPromises);

      allData.forEach((data, idx) => {
        if (data?.marker) {
          setMarker((prev)=>{
            return [...prev, ...data.marker];
          })
        }
        if(data?.route){
          setRoute((prev)=>{
            return [...prev, data.route]
          })
        }
      });
    } catch (e) {
      console.log(e)
      // error reading value
    }
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
      <Center width={"90%"} height="30%">
        <Text fontSize={40}>저장</Text>
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
            {keys.map((key, idx) =>
                <VStack key={idx}>
                  <Center>
                    <AntDesign
                      name="save"
                      size={50}
                      color={key.selected ? "red" : "black"}
                      onPress={() => {
                        setKeys(
                          keys.map((parent, index) => {
                            if (index === idx) {
                              return {
                                ...parent,
                                selected: !parent.selected,
                              };
                            }
                            return parent;
                          })
                        )
                      }}
                    />
                    <Text>{key.name.slice(0, 10)}</Text>
                    <Text>{key.name.slice(11, key.length)}</Text>
                  </Center>
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
        <VStack space={2} alignItems={"center"}>
        <AntDesign
          name="download"
          size={50}
          color="black"
          onPress={async() => {
            if(keys.findIndex(key => key.selected) !== -1) {
              await load();
            }else {
              viewToast("파일을 선택해주세요")
            }
          }}
        />
        <Text>
          불러오기
        </Text>
        </VStack>
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
                      if(keys.findIndex(key => key.selected) !== -1) {
                        setIsOpen(!isOpen)
                      }else {
                        viewToast("파일을 선택해주세요")
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
              <Popover.Header>파일 삭제</Popover.Header>
              <Popover.Body h={"60"}>
                <Text>파일을 정말로</Text>
                <Text>삭제하시겠습니까?</Text>
              </Popover.Body>
              <Popover.Footer justifyContent={"space-between"}>
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
        </Box>
        <VStack space={2} alignItems={"center"}>
        <AntDesign
          name="save"
          size={50}
          color="black"
          onPress={() => {
            setMode("file");
          }}
        />
        <Text>
          저장
        </Text>
        </VStack>
      </Center>
    </Box>
  );
};
