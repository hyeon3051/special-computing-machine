import { React } from "react";
import {
  Box,
  Text,
  Stagger,
  useDisclose,
  VStack,
  HStack,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useRecoilState } from "recoil";
import {
  modeState,
  recordState,
  myLocationState,
  dataLocationState
} from "../Utils/atom";
export const RightIcon = () => {
  const [mode, setMode] = useRecoilState(modeState);
  const [record, setRecord] = useRecoilState(recordState);
  const { isOpen, onToggle } = useDisclose();
  const [location, setLocation] = useRecoilState(myLocationState)
  const [dataLocation,setDataLocation] = useRecoilState(dataLocationState)

  return (
    <Box position={"absolute"} left={0} right={0} bottom={0} w='100%' backgroundColor={"black"} justifyContent={"space-around"} alignItems={"center"}>
          <HStack space={2} alignItems="center">
            <VStack alignItems={"center"}>
            <AntDesign name="camerao" size={50} color={record ? "red" : "white"} onPress={()=>{
              if(record){
              setMode("file");
              setRecord(true)
              }else{
                setRecord(false)
              }
            }} />
              </VStack>
            <VStack alignItems={"center"}>
            <AntDesign
              name="save"
              size={50}
              color="white"
              onPress={() => setMode("save")}
            />
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
            </VStack>
            <VStack alignItems="center">
        <AntDesign name="enviromento" size={50} color="yellow" onPress={async()=>{
          let longitude = location[0];
          let latitude = location[1];
          setDataLocation([longitude, latitude])
        }} />
          </VStack>
          </HStack>
    </Box>
  );
};
