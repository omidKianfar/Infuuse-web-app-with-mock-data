import MainSearch from "@/components/atoms/search/main-search";
import FilterList from "@/components/atoms/select-filter/business-filter-list";
import { UserType, useUser_GetCurrentUserQuery } from "@/graphql/generated";
import { Stack, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
    handleClose: () => void;
}

const SearchModal = ({ handleClose }: Props) => {
    const theme = useTheme()

    // -------------------------------states
    const [businessId, setBusinessId] = useState(null);
    const [choosenContactId, setChoosenContactId] = useState<number | null>(null);
    const [choosenContactName, setChoosenContactName] = useState<string | null>(null);


    // -------------------------------query
    // current user
    const { data: User } = useUser_GetCurrentUserQuery();
    const CurrentUser = User?.user_getCurrentUser?.result;

    // ------------------------------- functions
    useEffect(() => {
        if (businessId === null) setBusinessId(CurrentUser?.businessAccesses?.[0]?.business?.id);
    }, [businessId]);

    return (
        <Stack width={'400px'} height={'100%'} bgcolor={theme?.palette?.infuuse?.gray200} p={3} borderRadius={2} justifyContent={'center'} alignItems={'center'}>
            {CurrentUser?.user?.userType === UserType?.AgencyMember &&
                <Stack width={'100%'} >
                    <FilterList setBusinessId={setBusinessId} businessId={businessId} />
                </Stack>}

            <Stack mt={3} width={'100%'}>
                <MainSearch
                    handleClose={handleClose}
                    BusinessId={businessId}
                    choosenContactId={choosenContactId}
                    setChoosenContactId={setChoosenContactId}
                    choosenContactName={choosenContactName}
                    setChoosenContactName={setChoosenContactName}
                />
            </Stack>

        </Stack>
    );
};

export default SearchModal;
