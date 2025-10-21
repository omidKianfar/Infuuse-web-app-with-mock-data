import { Stack } from '@mui/material'
import React, { useState } from 'react'
import MonthlyChart from './chart'
import CallsTable from './Calls-table'

const LeftSide = () => {
    const [chartShow, setChartShow] = useState(true)
    return (
        <Stack>
            {chartShow ? <MonthlyChart chartShow={chartShow} setChartShow={setChartShow}/> : <CallsTable setChartShow={setChartShow}/>}


        </Stack>
    )
}

export default LeftSide
