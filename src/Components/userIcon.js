import { React, useState } from "react";
import {
  Box,
  Button,
  Image,
  Stagger,
  useDisclose,
  VStack,
} from "native-base";
import { AntDesign} from "@expo/vector-icons";
import { useRecoilState } from "recoil";
import { modeState } from "../Utils/atom";

export const UserIcon = () => {
  const { isOpen, onToggle } = useDisclose();
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [mode, setMode] = useRecoilState(modeState);

  return (
    <Box position={"absolute"} right={5} top={5}>
      {userInfo ? (
        userInfo?.picture ? (
          <Button onPress={onToggle} background={"00000000"}>
            <Image
              source={{ uri: userInfo?.picture }}
              size={50}
              rounded="full"
            />
          </Button>
        ) : (
          <AntDesign name="user" size={50} color={"white"} onPress={onToggle} />
        )
      ) : (
        <AntDesign name="user" size={50} color={"white"} onPress={onToggle} />
      )}
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
            <AntDesign
              name="google"
              size={50}
              color="black"
              onPress={async () => {
                await promptAsync();
              }}
            />
            {Platform.OS === "ios" ? (
              <AntDesign
                name="apple1"
                size={50}
                color="black"
                onPress={async () => {
                  await appleLogin();
                }}
              />
            ) : null}
          </VStack>
        </Stagger>
      ) : null}
    </Box>
  );
};
