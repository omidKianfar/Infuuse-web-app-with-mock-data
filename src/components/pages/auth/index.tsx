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
  // -------------------------------tools
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <ContainerAuth direction={"row"}>
      <CenterSection direction={"row"} position="relative">
        {/* -------------------------------left section*/}
        {!isMobile && (
          <Stack mt={"150px"}>
            <Image
              src={"/images/auth-left.png"}
              style={{ width: "200px", height: "400px" }}
            />
          </Stack>
        )}

        {/* -------------------------------center section*/}
        <MainSection>
          <AuthHeader />

          {/* -------------------------------main section */}
          <MainCenterSection>
            {children}

            {/* -------------------------------main footer section */}
            <AuthFooter />
          </MainCenterSection>
        </MainSection>

        {/* -------------------------------right section*/}
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
