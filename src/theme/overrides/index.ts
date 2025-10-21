// ? Overwrite MUI components here

import Card from './Card';
import Chip from './Chip';
import List from './List';
import Link from './Link';
import Menu from './Menu';
import Tabs from './Tabs';
import Alert from './Alert';
import Badge from './Badge';
import Input from './Input';
import Paper from './Paper';
import Table from './Table';
import Avatar from './Avatar';
import Button from './Button';
import Drawer from './Drawer';
import Dialog from './Dialog';
import Switch from './Switch';
import Popover from './Popover';
import Checkbox from './Checkbox';
import Skeleton from './Skeleton';
import Backdrop from './Backdrop';
import Accordion from './Accordion';
import Typography from './Typography';
import Pagination from './Pagination';
import CssBaseline from './CssBaseline';
import Autocomplete from './Autocomplete';
import LoadingButton from './LoadingButton';

export default function ComponentsOverrides(theme: ThemeOverrideType) {
	return Object.assign(
		Card(theme),
		Chip(theme),
		Link(theme),
		List(theme),
		Menu(theme),
		// Tabs(theme),
		Alert(theme),
		Badge(theme),
		Input(theme),
		Paper(theme),
		// Table(theme),
		Avatar(theme),
		Button(theme),
		Dialog(theme),
		Drawer(theme),
		Switch(theme),
		Popover(theme),
		Skeleton(theme),
		Backdrop(theme),
		Checkbox(theme),
		Accordion(theme),
		Typography(theme),
		Pagination(theme),
		CssBaseline(theme),
		Autocomplete(theme),
		LoadingButton(theme)
	);
}
