import Image from "@/components/atoms/Image";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

const AuthHeader = () => {
  // -------------------------------tools
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack height={"100px"}>
      <Stack mx={"auto"} mt={isMobile ? "10px" : 0}>
        <Image
          src={"/images/auth-head.png"}
          style={{ width: "100%", height: isMobile ? "250px" : "300px" }}
        />
      </Stack>

      <Stack position={"absolute"} left={0} top={150} zIndex={2}>
        <Image
          src={"/images/auth-head-2.svg"}
          style={{ width: "100%", height: "auto" }}
        />
      </Stack>
    </Stack>
  );
};

export default AuthHeader;
