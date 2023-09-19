import React, {useEffect, useRef} from "react";
import {Box, StatusBar} from "native-base";
import {DefaultMapScreen} from "./src/MapScreen/defaultMapScreen";
import {useRecoilState} from "recoil";
import {Dimensions, BackHandler, Alert, AppState} from "react-native";
import {DefaultScreen} from "./src/Screen/DefaultScreen";
import {DefaultIcon} from "./src/Screen/DefaultIcon";
import {BannerAd} from "react-native-google-mobile-ads";
import {myLocationState, routeState} from "./src/Utils/atom";
import BackgroundService from 'react-native-background-actions';
import * as Location from "expo-location"
import * as TaskManager from "expo-task-manager"
import AsyncStorage from "@react-native-async-storage/async-storage";


const LOCATION_TRACKING = "LOCATION_TRACKING"

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

export default function Default() {
    const adUnitId = "ca-app-pub-5218306923860994/2970041329";
    const appState = useRef(AppState.currentState);
    const [routes, setRoutes] = useRecoilState(routeState);
    const [myInfoLocation, setMyInfoLocation] = useRecoilState(myLocationState);
    const startLocationTracking = async()=>{
        await Location.startLocationUpdatesAsync(
            LOCATION_TRACKING,{
                accuracy: Location.Accuracy.High,
                deferredUpdatesDistance: 5,
                timeInterval:5000,
                showsBackgroundLocationIndicator: true,
                foregroundService:{
                    notificationTitle: "Covid Tracker",
                    notificationBody: "hello world",
                    notificationColor: "#AA1111"
                }
            }
        )
        const hasStarted = await Location.hasStartedLocationUpdatesAsync(
            LOCATION_TRACKING
        );
        console.log('tracking started?', hasStarted);
    }
    const requestPermission = async() => {
        const {status} = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            console.error('위치 권한이 없습니다.');
            const {status: status2} = await Location.requestBackgroundPermissionsAsync();
            if (status2 !== 'granted') {
                console.error('백그라운드 위치 권한이 없습니다.');
            }

        }
    }
    const veryIntensiveTask = async () => {
        // Example of an infinite loop task
        await new Promise( async (resolve) => {
            for (let i = 0; BackgroundService.isRunning(); i++) {
                await fetchLocation()
                await sleep(1250)
            }
        });
    };
    const options = {
        taskName: 'Example',
        taskTitle: 'ExampleTask title',
        taskDesc: 'ExampleTask description',
        taskIcon: {
            name: 'ic_launcher',
            type: 'mipmap',
        },
        color: '#ff00ff',
        parameters: {
            delay: 1000,
        },
    };

    const fetchLocation = async() => {
            const myLocation = await AsyncStorage.getItem('myLocation');
            if (myLocation) {
            let {latitude, longitude} = JSON.parse(myLocation);
            setMyInfoLocation([longitude, latitude])
            setRoutes((prev) =>
            [
                [
                    [...prev[0][0], [longitude, latitude]],
                    ...prev[0].slice(1)
                ],
                ...prev.slice(1)
            ]
            )}
      }

    useEffect(() => {
        requestPermission()
        startLocationTracking()
        const backAction = () => {
            Alert.alert('나가기', '정말로 종료 할거야(백그라운드 task로 남길거면 백그라운드로 종료)', [
                {
                    text: '취소',
                    onPress: () => null,
                    style: 'cancel',
                },
                {
                    text: "종료", onPress: ()=>{
                        stopLocationUpdatesAsync()
                        BackHandler.exitApp()
                    }
                }
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    useEffect( ()=>{
        BackgroundService.start(veryIntensiveTask, options);
        BackgroundService.updateNotification({taskDesc: 'New ExampleTask description'});
    },[])

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
                <Box alignItems={"center"} justifyContent={"center"} flex={1}>
                    <DefaultMapScreen/>
                </Box>
                <DefaultScreen/>
                <DefaultIcon/>
            </Box>
        </>
    );
}

TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
    if (error) {
        console.log('LOCATION_TRACKING task ERROR:', error);
        return;
    }
    if (data) {
        console.log(
            `${new Date(Date.now()).toLocaleString()}`
        );
        let {latitude, longitude} = data.locations[0].coords
        console.log(latitude,longitude)
        if(latitude > 0 || longitude > 0) {
            await AsyncStorage.setItem('myLocation', JSON.stringify({latitude, longitude}))
        }
    }
});
