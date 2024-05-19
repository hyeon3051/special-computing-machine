import React, {useEffect, useRef} from "react";
import {Box, StatusBar} from "native-base";
import {DefaultMapScreen} from "./src/MapScreen/defaultMapScreen";
import {useRecoilState, useRecoilValue} from "recoil";
import {Dimensions, BackHandler, Alert, AppState} from "react-native";
import {DefaultScreen} from "./src/Screen/DefaultScreen";
import {DefaultIcon} from "./src/Screen/DefaultIcon";
import {BannerAd} from "react-native-google-mobile-ads";
import {myLocationState, routeState, fileNameState, modeState} from "./src/Utils/atom";
import Geolocation from '@react-native-community/geolocation';

Geolocation.setRNConfiguration(
    {
        authorizationLevel: 'always',
        skipPermissionRequests: false,
    }
)

export default function Default() {
    const adUnitId = "ca-app-pub-5218306923860994/2970041329";
    const [routes, setRoutes] = useRecoilState(routeState);
    const [mode, setMode] = useRecoilState(modeState)
    const [fileName, setFileName] = useRecoilState(fileNameState)
    const [myInfoLocation, setMyInfoLocation] = useRecoilState(myLocationState);
      
      Geolocation.watchPosition(location=>{
        let {longitude, latitude} = location.coords
        setMyInfoLocation([longitude, latitude])
          if(fileName) {
              setRoutes((prev) => [
                  [
                      [...prev[0][0], [longitude, latitude]],
                      ...prev[0].slice(1)
                  ],
                  ...prev.slice(1)
              ])
          }
      }, err=>{console.log(err)},
        {
            interval: 5000,
            enableHighAccuracy: true,
            fastestInterval: 2000,
            distanceFilter: 10,
        }
      )

    useEffect(() => {
        const backAction = () => {
            console.log(mode)
            if(mode !== "default"){
                setMode("default")
            }else{
                Alert.alert('나가기', '정말로 종료 할거야(백그라운드 task로 남길거면 백그라운드로 종료)', [
                {
                    text: '취소',
                    onPress: () => null,
                    style: 'cancel',
                },
                {
                    text: "종료", onPress: ()=>{
                        BackHandler.exitApp()
                    }
                }
            ])
        }
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [mode]);

    let adWidth = Dimensions.get("window").width;
    adWidth = adWidth.toFixed(0);

    return (
        <>
            <StatusBar backgroundColor={"#000000"}/>
            <Box height={"50"} width={`${adWidth}px`}>
                <BannerAd
                    unitId={adUnitId}
                    size={`${adWidth}x50`}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                />
            </Box>
            <Box
                space={2}
                width={Dimensions.get("window").width}
                height={Dimensions.get("window").height - 50}
            >
                <Box alignItems={"center"} justifyContent={"center"} flex={1} onTouchStart={() => {
                    setMode("default")
                }
                }>
                    <DefaultMapScreen/>
                </Box>
                <DefaultScreen/>
                <DefaultIcon/>
            </Box>
        </>
    );
}
