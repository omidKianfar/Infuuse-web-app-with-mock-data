import React, { useState } from 'react';
import {Stack, useTheme } from '@mui/material';
import Step1 from './step/step1';
import Step2 from './step/step2';
import { AccountStateDto } from '@/graphql/generated';

interface Props {
    handleClose: () => void;
    operatorData: AccountStateDto;
}

const AddOperator = ({ handleClose, operatorData }: Props) => {
    const theme = useTheme()

    // ---------------------------- states
    const [operators, setOperators] = useState<number | null>(null)
    const [counter, setCounter] = useState<number>(0)

    return (
        <Stack
            width={'400px'}
            height={'100%'}
            p={'16px'}
            bgcolor={theme?.palette?.infuuse?.gray100}
            boxShadow={4}
            borderRadius={2}
            justifyContent={'center'}
            alignItems={'center'}
        >

            {counter === 0
                ? <Step1 handleClose={handleClose} operators={operators} setOperators={setOperators} setCounter={setCounter} operatorData={operatorData}/>
                : <Step2 handleClose={handleClose} operators={operators} setCounter={setCounter} operatorData={operatorData} />}
        </Stack>
    );
};

export default AddOperator;

