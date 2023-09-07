import { React } from "react";
import {
  Box,
  Text,
  Stagger,
  useDisclose,
  VStack,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useRecoilState } from "recoil";
import {
  modeState,
  recordState,
  myLocationState,
  dataLocationState
} from "../Utils/atom";
import MapboxGL from  "@rnmapbox/maps"
export const RightIcon = () => {
  const [mode, setMode] = useRecoilState(modeState);
  const [record, setRecord] = useRecoilState(recordState);
  const { isOpen, onToggle } = useDisclose();
  const [location, setLocation] = useRecoilState(myLocationState)
  const [dataLocation,setDataLocation] = useRecoilState(dataLocationState)

  return (
    <Box position={"absolute"} right={5} bottom={10}>
      {isOpen ? (
        <Stagger
          visible={isOpen}
          initial={{ opacity: 0, scale: 0, translateY: 34 }}
          animate={{
            translateY: 0,
            scale: 1,
            opacity: 1,
            transition: {
              type: "spring",
              mass: 0.8,
              stagger: { offset: 30, reverse: true },
            },
          }}
          exit={{
            translateY: 34,
            scale: 0.5,
            opacity: 0,
            transition: {
              duration: 100,
              stagger: { offset: 30, reverse: true },
            },
          }}
        >
          <VStack space={2} alignItems="center">
          { record ? (
          <VStack alignItems={"center"}>
          <AntDesign name="camera" size={50} color="white" onPress={()=>{
            setRecord(false)
          }} />
              <Text color={"white"}>
                측정 종료
              </Text>
            </VStack>
          ) : (
            <VStack alignItems={"center"}>
            <AntDesign name="camerao" size={50} color="white" onPress={()=>{
              setMode("file");
              setRecord(true)
            }} />
                <Text color={"white"}>
                  측정 시작
                </Text>
              </VStack>
          )}
            <VStack alignItems={"center"}>
            <AntDesign
              name="save"
              size={50}
              color="white"
              onPress={() => setMode("save")}
            />
            <Text color={"white"}>
              저장
            </Text>
            </VStack>
            <VStack alignItems={"center"}>
            <AntDesign
              name="delete"
              size={50}
              color="white"
              onPress={() => {
                setMode("deleteMarker")
              }}
            />
            <Text color={"white"}>
              마커 삭제
            </Text>
            </VStack>
            <VStack alignItems={"center"}>
            <AntDesign
              name="pushpin"
              size={50}
              color="white"
              onPress={() => {
                setMode("MarkerInfo")
              }}
            />
            <Text color={"white"}>
              마커 정보
            </Text>
            </VStack>
            <VStack alignItems={"center"}>
            <AntDesign
              name="fork"
              size={50}
              color="white"
              onPress={() => {
                setMode("route")
              }}
            />
            <Text color={"wxhite"}>
              루트 정보
            </Text>
            </VStack>
          </VStack>
        </Stagger>
      ) : null}
      {!isOpen ?
      <VStack alignItems="center">
        <AntDesign name="enviromento" size={50} color="yellow" onPress={()=>{
          setDataLocation(prev=> [])
        }} />
        <Text color={"white"}>
          내 위치
        </Text>
      </VStack> : null
      }
      <VStack alignItems="center">
        <AntDesign name="menu-fold" size={50} color="yellow" onPress={onToggle} />
        <Text color={"white"}>
          메뉴
        </Text>
      </VStack>
    </Box>
  );
};
