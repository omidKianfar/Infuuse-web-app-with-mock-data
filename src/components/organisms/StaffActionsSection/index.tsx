import { Stack } from '@mui/material';
import { Button, IconButton } from '@/components/atoms';
import { Add, AddCircleRounded, FilterAlt } from '@mui/icons-material';
import { useResponsive } from '@/hooks/useResponsive';

interface Props {
	width?: number;
	addTitle: string;
	onAdd: () => void;
	onFilter: () => void;
}
export default function StaffActionsSection({ onAdd, addTitle, onFilter, width = 200 }: Props) {
	const isMobile = useResponsive('down', 'md');

	return isMobile ? (
		<Stack direction="row" alignItems="center">
			<IconButton size="large" color="primary" onClick={onFilter}>
				<FilterAlt />
			</IconButton>
			<IconButton size="large" color="primary" onClick={onAdd}>
				<AddCircleRounded />
			</IconButton>
		</Stack>
	) : (
		<>
			<Button width={150} variant="outlined" onClick={onFilter} startIcon={<FilterAlt />}>
				Filter
			</Button>
			<Button width={width} onClick={onAdd} startIcon={<Add />}>
				Add {addTitle}
			</Button>
		</>
	);
}
