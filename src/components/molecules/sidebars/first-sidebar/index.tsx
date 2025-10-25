import React, { lazy, Suspense } from 'react';
import { CustomSidebarLayout, Sidebar, UserActive } from './styles';
import Avatar from '@/components/atoms/avatar';
import { Box, Stack, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { LineStatus, UserDto, UserType, useUser_GetCurrentUserQuery } from '@/graphql/generated';
import { getFullImageUrl } from '@/utils';
import LoadingProgress from '@/components/atoms/ProgressBar/CircularProgress';


const AdminSidebar = lazy(() => import('./admin'))
const UserSidebar = lazy(() => import('./user'))

const FirstSidebar = () => {
  const router = useRouter();
  const theme = useTheme();

  const { data: User } = useUser_GetCurrentUserQuery();
  const CurrentUser = User?.user_getCurrentUser?.result;


  const userLineStatus = CurrentUser?.user?.lineStatus || LineStatus.Away;


  return (
    <CustomSidebarLayout>
      <Sidebar direction="column" justifyContent="start" alignItems="center">
        <Stack justifyContent="center" alignItems="center" mb={4} position="relative">
          <Box onClick={() => router.push('/profile')} sx={{ cursor: 'pointer' }}>
            <Avatar src={getFullImageUrl(CurrentUser?.user?.photoUrl)} />
          </Box>
          <UserActive
            sx={{
              bgcolor:
                userLineStatus === LineStatus.Active
                  ? theme.palette.infuuse.green100
                  : theme.palette.infuuse.orange200,
            }}
          />
        </Stack>

        <Suspense fallback={<LoadingProgress />}>
          {CurrentUser?.user?.userType === UserType.Administrator ? (
            <AdminSidebar CurrentUser={CurrentUser as UserDto} />
          ) : (
            <UserSidebar CurrentUser={CurrentUser as UserDto} />
          )}

        </Suspense>

      </Sidebar>
    </CustomSidebarLayout>
  );
};

export default FirstSidebar;
