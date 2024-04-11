import React from "react";
import {
    Box,
    Center,
    Text,
    TextField,
    KeyboardAvoidingView,
} from "native-base";
import {useRecoilState, useRecoilValue} from "recoil";
import { Dimensions, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    modeState,
    routeState,
    markerState,
    fileNameState, recordState, viewToastState
} from "../Utils/atom";
import { AntDesign } from "@expo/vector-icons";

export const DefaultFileScreen = () => {
    const [mode, setMode] = useRecoilState(modeState);
    const [route, setRoute] = useRecoilState(routeState);
    const [marker, setMarker] = useRecoilState(markerState);
    const [record, setRecord] = useRecoilState(recordState)
    const [fileName, setFileName] = useRecoilState(fileNameState);

    const saveFile = async () => {
        const date = new Date();
        const utcDate = date.toISOString().replace(/\..+/, "");

        const data = {
            key: utcDate,
            marker: marker,
            route: route[0][0]
        }

        const storeData = async (value) => {
            try {
                const jsonValue = JSON.stringify(value);
                const file = fileName ? fileName : utcDate;
                if(await AsyncStorage.getItem(file)){
                    AsyncStorage.removeItem(file)
                }
                await AsyncStorage.setItem(file, jsonValue);
                setFileName(file)
            } catch (e) {

            }
        };

        await storeData(data);
    };

    return (
        <KeyboardAvoidingView
            h={'100%'}
            position={"absolute"}
            flex={1}
            bottom={0}
            width={Dimensions.get("window").width}
            backgroundColor={"white"}
            justifyContent={"space-around"}
            alignItems={"center"}
            behavior="padding"
        >
            <Center width={"90%"} height="30%">
                <Text fontSize={40}>파일</Text>
            </Center>
            <TextField
                w="80%"
                h="25%"
                alignSelf={"center"}
                placeholder="파일 이름을 입력하세요"
                onChangeText={(text) => {
                    setFileName(text);
                }}
            />
            <Box width={"90%"} h="30%">
                <Center flex={1} flexDirection={"row"} justifyContent={"space-around"}>
                    <AntDesign
                        name="leftcircle"
                        size={50}
                        color="black"
                        onPress={() => {
                            setRecord(false)
                            setMode("save");
                        }}
                    />
                    <AntDesign
                        name="save"
                        size={50}
                        color="black"
                        onPress={async () => {
                            if(!fileName) {
                                Alert.alert("응 안돼 ㅋㅋㅋ")
                                return;
                            }
                            await saveFile();
                            setMode("default");
                        }}
                    />
                </Center>
            </Box>
        </KeyboardAvoidingView>
    );
};
