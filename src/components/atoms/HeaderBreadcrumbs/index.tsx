import NextLink from 'next/link';
import { Typography, Link, SxProps, Breadcrumbs as MUIBreadcrumbs } from '@mui/material';

export interface LinkInterface {
	name: string;
	href?: string;
}

type HeaderBreadcrumbsType = React.ComponentProps<typeof MUIBreadcrumbs> & {
	sx?: SxProps;
	activeLast?: boolean;
	links: Array<LinkInterface>;
};

export default function HeaderBreadcrumbs({ sx, links, activeLast = false, ...other }: HeaderBreadcrumbsType) {
	const currentLink = links[links.length - 1]?.name;

	const listDefault = links?.map((link) => <Typography key={link?.name}>{link?.name}</Typography>);

	const listActiveLast = links?.map((link: LinkInterface) => (
		<div key={link?.name}>
			{link?.name !== currentLink ? (
				<Typography>{link?.name}</Typography>
			) : (
				<Typography
					sx={{
						fontSize: 14,
						maxWidth: 150,
						lineHeight: 2,

						color: '#000000dd',
						fontWeight: 'bold',
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
					}}
				>
					{currentLink}
				</Typography>
			)}
		</div>
	));

	return (
		<MUIBreadcrumbs
			separator={
				<Typography fontSize={14} color="#00000099">
					/
				</Typography>
			}
			{...other}
		>
			{activeLast ? listDefault : listActiveLast}
		</MUIBreadcrumbs>
	);
}

function LinkItem({ link }: { link: LinkInterface }) {
	const { href = '', name } = link;
	return (
		<NextLink href={href} passHref legacyBehavior>
			<Link
				key={name}
				underline="none"
				sx={{
					fontSize: 14,
					lineHeight: 2,
					fontWeight: 'bold',
					display: 'flex',
					color: '#00000099',
					alignItems: 'center',
					'&:hover': {
						color: 'primary.main',
					},
				}}
			>
				{name}
			</Link>
		</NextLink>
	);
}
