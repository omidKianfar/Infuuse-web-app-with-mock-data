import { Stack, useMediaQuery, useTheme } from "@mui/material";
import React, { PropsWithChildren } from "react";
import {
  MainCenterSection,
  MainSection,
  CenterSection,
  ContainerAuth,
} from "./styles";
import AuthHeader from "./auth-header";
import AuthFooter from "./auth-footer";
import Image from "@/components/atoms/Image";

const AuthSection = ({ children }: PropsWithChildren) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <ContainerAuth direction={"row"}>
      <CenterSection direction={"row"} position="relative">
        {!isMobile && (
          <Stack mt={"150px"}>
            <Image
              src={"/images/auth-left.png"}
              style={{ width: "200px", height: "400px" }}
            />
          </Stack>
        )}

        <MainSection>
          <AuthHeader />

          <MainCenterSection>
            {children}

            <AuthFooter />
          </MainCenterSection>
        </MainSection>

        {!isMobile && (
          <Stack mt={"150px"}>
            <Image
              src={"/images/auth-right.png"}
              style={{ width: "200px", height: "400px" }}
            />
          </Stack>
        )}
      </CenterSection>
    </ContainerAuth>
  );
};

export default AuthSection;
