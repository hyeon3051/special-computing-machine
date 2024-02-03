import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Box, Center, Text } from "native-base";
import { modeState, recordState  } from "../Utils/atom";
import { LeftIcon } from "../Components/leftIcon";
import { RightIcon } from "../Components/RightIcon";
import { UserIcon } from "../Components/userIcon";

export const DefaultIcon = () => {
  let mode = useRecoilValue(modeState);
  let record = useRecoilValue(recordState);
  useEffect(() => {}, [mode]);
  return (
    <>
      {mode === "default" ? (
        <>
          <LeftIcon />
          <RightIcon />
          <Box width={"50%"} position={"absolute"} >
            <Center>
              <Text fontSize="xl" fontWeight="bold" color={"red.500"}>
                {record ? "Rec" : "Stop"}
              </Text>
            </Center>
          </Box>
          <UserIcon />
        </>
      ) : null}
    </>
  );
};
