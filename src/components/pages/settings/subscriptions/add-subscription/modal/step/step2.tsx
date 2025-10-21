import CloseIconBox from '@/assets/close-icon-box';
import { NextButton } from '@/components/atoms/Button'
import { AccountStateDto, usePayment_ModifyOperatorCountMutation, usePayment_OperatorModificationCostQuery } from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { Box, Stack, Typography, useTheme } from '@mui/material'
import { enqueueSnackbar } from 'notistack';
import { queryClient } from 'pages/_app';
import React from 'react'

interface Props {
    handleClose: () => void;
    operators: number | null;
    setCounter: React.Dispatch<React.SetStateAction<number>>
    operatorData: AccountStateDto
}

const Step2 = ({ handleClose, operators, setCounter, operatorData }: Props) => {
    const theme = useTheme()

    const { data: operatorCost } = usePayment_OperatorModificationCostQuery({
        operatorCount: Number(operatorData?.maxOperatorCount - operators)
    })

    const operatorCostData = operatorCost?.payment_operatorModificationCost?.result

    const { mutate: ChangeOperator } = usePayment_ModifyOperatorCountMutation()

    // ---------------------------- function
    const PaySubscriptionHandler = () => {
        ChangeOperator(
            {
                quantity: Number(operators)
            },
            {
                onSuccess: (data) => {
                    const { status } = responseDestructure(data);
                    if (status.code == 1) {
                        setCounter(0)
                        enqueueSnackbar(status.description, { variant: 'success' });
                        handleClose()
                        queryClient.invalidateQueries(['business_getAccountState'])
                        queryClient.invalidateQueries(['agency_getAccountState'])
                        queryClient.invalidateQueries(['paymentHistory_getList'])
                    } else if (status.code == 9) {
                        enqueueSnackbar(`Your currently have ${operatorData?.activeOperatorCount} allocated seats, please remove ${Number(operatorData?.activeOperatorCount - operators)} operator permission(s)`, { variant: 'error' });
                    } else {
                        enqueueSnackbar(status.description, { variant: 'error' });
                    }
                },
            }
        );
    }
    return (

        <Stack width={'100%'}>
            <Stack width={'100%'} direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={1}>
                <Box>

                </Box>

                <Box onClick={handleClose} sx={{ cursor: 'pointer' }}>
                    <CloseIconBox />
                </Box>
            </Stack>

            <Stack justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap'} bgcolor={theme?.palette?.infuuse?.orange200} borderRadius={2} p={1}>
                <Typography color={theme?.palette?.infuuse?.blueDark500} textAlign={'center'}>
                    {`Current available seats: ${operatorData?.maxOperatorCount}`}
                </Typography>
                <Typography color={theme?.palette?.infuuse?.blueDark500} textAlign={'center'}>
                    {`Desired number of seats: ${operators}`}
                </Typography>
            </Stack>

            <Box p={'8px 16px'} borderRadius={2}>
                <Typography color={theme?.palette?.infuuse?.blueDark500} textAlign={'center'}>
                    {Number(operatorCostData?.cost) > 0 ? `$${Number(operatorCostData?.cost)} will be refunded to your account at the end of ${operatorCostData?.period}` : `$${Number(operatorCostData?.cost * -1)} will be withdrawn from your account at the end of ${operatorCostData?.period}`}
                </Typography>
                <Typography color={theme?.palette?.infuuse?.blueDark500} textAlign={'center'} fontWeight={'bold'} mt={1}>
                    {`Do you wish to proceed?`}
                </Typography>
            </Box>


            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mt={2} width={'100%'}>
                <NextButton onClick={handleClose} sx={{ height: '40px', width: '150px' }}>
                    Cancel
                </NextButton>

                <NextButton onClick={PaySubscriptionHandler} sx={{ height: '40px', width: '150px', }}>
                    Proceed
                </NextButton>
            </Stack>

        </Stack>
    )
}

export default Step2
