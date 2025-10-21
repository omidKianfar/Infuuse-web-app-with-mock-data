import React, { useCallback, useEffect, useMemo, useState } from 'react';
import isHotkey from 'is-hotkey';
import { withReact, useSlate, Slate, ReactEditor } from 'slate-react';
import { Editor, Transforms, createEditor, Descendant, Element as SlateElement, BaseEditor, Text } from 'slate';
import { withHistory } from 'slate-history';
import escapeHTML from 'escape-html';
import { Toolbar } from './components';
import { jsx } from 'slate-hyperscript';
import { Box, Button, InputAdornment, MenuItem, Stack, Typography, useTheme } from '@mui/material';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useSnapshot } from 'valtio';
import chatStore from '@/store/chat.store';

// ------------------------------------------ import icons
import {
	FormatBoldIcon,
	FormatItalicIcon,
	FormatListBulletedIcon,
	FormatListNumberedIcon,
	FormatUnderlinedIcon,
	CodeIcon,
	FormatAlignLeftIcon,
	FormatAlignRightIcon,
	FormatAlignCenterIcon,
	FormatAlignJustifyIcon,
	FormatColorTextIcon,
	FormatColorFillIcon,
	TitleIcon,
} from './icons';

// ------------------------------------------ import styles
import { CustomTextField, CustomEditable, CustomButton } from './styles';

// ------------------------------------------ import data
import { ColorItems, fontFamilyOptions, HOTKEYS, LIST_TYPES, TEXT_ALIGN_TYPES } from './data';
import EmojiHappyIcon from '@/assets/emoji-happy-icon';
import resetStore from '@/store/reset.store';
import { useRouter } from 'next/router';

// ----------------------------------------------------- editor imports
type CustomElement = { type: 'paragraph'; children: CustomText[] };

type CustomText = { text: string };

declare module 'slate' {
	interface CustomTypes {
		Editor: BaseEditor & ReactEditor;
		Element: CustomElement;
		Text: CustomText;
	}
}

// ------------------------------ imports
interface Props {
	editorOutput?: string;
	setEditorOutput?: React.Dispatch<React.SetStateAction<string>>;
	editorKey?: number;
}

// ------------------------------ slate.js
const SlateEditor = ({ editorOutput, setEditorOutput, editorKey }: Props) => {
	// -------------------------------tools
	const theme = useTheme();
	const router = useRouter();

	// -------------------------------state management
	const { chatSidebar, dealSidebar } = useSnapshot(chatStore);

	// -------------------------------editor
	const renderElement = useCallback((props) => <Element {...props} />, []);
	const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
	const editor = useMemo(() => withHtml(withReact(withHistory(createEditor()))), []);

	const document = new DOMParser().parseFromString(editorOutput, 'text/html');

	// -------------------------------functions
	// font color
	const [fontColorState, setFontColorState] = useState(null);

	const changeColor = (color) => {
		setFontColorState(color);
		Transforms.setNodes(editor, { color }, { match: (n) => Text.isText(n), split: true });
	};

	// font bg color
	const [fontBgColorState, setFontBgColorState] = useState(null);

	const changeBackgroundColor = (color) => {
		setFontBgColorState(color);
		Transforms.setNodes(editor, { backgroundColor: color }, { match: (n) => Text.isText(n), split: true });
	};

	// font family
	const [fontFamilyState, setFontFamilyState] = useState('"Times New Roman", Times, serif');

	const changeFontFamily = (fontFamily) => {
		setFontFamilyState(fontFamily);
		Transforms.setNodes(editor, { fontFamily }, { match: (n) => Text.isText(n), split: true });
	};

	// emoji
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);

	const insertEmoji = (emoji) => {
		const emojiText = emoji.native;
		Transforms.insertText(editor, emojiText);
		setShowEmojiPicker(false);
	};

	const removeSecondLine = useCallback(() => {
		if (editor.children.length > 1) {
			Transforms.delete(editor, { at: [1] }); // Removes the second line
		}
	}, [editor]);

	useEffect(() => {
		resetStore.reset = () => {
			// loop delete all
			editor.children.map((item) => {
				Transforms.delete(editor, { at: [0] });
			});

			// reset init
			editor.children = [
				{
					type: 'paragraph',
					children: [{ text: '' }],
				},
				{
					type: 'paragraph',
					children: [{ text: '' }],
				},
			];
		};
	}, []);

	useEffect(() => {
		removeSecondLine(); // Remove the second line on component mount
	}, [removeSecondLine]);

	return (
		// -------------------------------------------- editor
		<Slate
			key={editorKey}
			editor={editor}
			initialValue={[...initialValue, ...deserialize(document.body)]}
			onChange={(value) => {
				const html = value.map((node) => serialize(node)).join('');
				setEditorOutput(html);
			}}
		>
			{/* ------------------------------------------- toolbar */}
			<Toolbar>
				<Stack
					bgcolor={theme?.palette?.infuuse?.gray400}
					p={'8px'}
					borderRadius={'8px 8px 0 0'}
					width={'100%'}
					border={`1px solid ${theme?.palette?.infuuse?.blue100}`}
					borderBottom={'none'}
				>
					<Box
						display={'flex'}
						justifyContent={'start'}
						alignItems={'center'}
						width={'100%'}
						flexWrap={'wrap'}
						sx={{ gap: '10px 0' }}
					>
						<CustomTextField
							select
							onChange={(e) => changeFontFamily(e.target.value)}
							sx={{ width: '200px' }}
							value={fontFamilyState}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<TitleIcon sx={{ fontSize: '18px' }} />
									</InputAdornment>
								),
							}}
						>
							{fontFamilyOptions.map((fontStyle) => (
								<MenuItem key={fontStyle.value} value={fontStyle.value}>
									<Typography sx={{ fontFamily: fontStyle?.value }}>{fontStyle.name}</Typography>
								</MenuItem>
							))}
						</CustomTextField>

						<CustomTextField
							select
							onChange={(e) => changeColor(e.target.value)}
							value={''}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<FormatColorTextIcon
											sx={{
												fontSize: '18px',
												fill: fontColorState === '#fff' ? '#ADa6aa' : fontColorState,
											}}
										/>
									</InputAdornment>
								),
							}}
						>
							<MenuItem value={null} sx={{ px: '8px' }}>
								<Box
									display={'flex'}
									flexDirection={'row'}
									justifyContent={'center'}
									alignItems={'center'}
									width="100%"
									height="24px"
									border={`1px solid ${theme?.palette?.common?.black}`}
									borderRadius={'2px'}
								>
									<Typography fontSize={'12px'}>No Color</Typography>
								</Box>
							</MenuItem>
							{ColorItems.map((color) => (
								<MenuItem key={color.value} value={color.value} sx={{ px: '8px' }}>
									<Box
										display={'flex'}
										flexDirection={'row'}
										justifyContent={'center'}
										alignItems={'center'}
										width="100%"
										height="24px"
										border={`1px solid ${theme?.palette?.common?.black}`}
										borderRadius={'2px'}
									>
										<Box
											sx={{
												bgcolor: color?.value,
												width: '100%',
												height: '100%',
												cursor: 'pointer',
											}}
										></Box>
									</Box>
								</MenuItem>
							))}
						</CustomTextField>

						<CustomTextField
							select
							onChange={(e) => changeBackgroundColor(e.target.value)}
							value={''}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<FormatColorFillIcon
											sx={{
												fontSize: '18px',
												fill: fontBgColorState === '#fff' ? '#ADa6aa' : fontBgColorState,
											}}
										/>
									</InputAdornment>
								),
							}}
						>
							<MenuItem value={null} sx={{ px: '8px' }}>
								<Box
									display={'flex'}
									flexDirection={'row'}
									justifyContent={'center'}
									alignItems={'center'}
									width="100%"
									height="24px"
									border={`1px solid ${theme?.palette?.common?.black}`}
									borderRadius={'2px'}
								>
									<Typography fontSize={'12px'}>No Color</Typography>
								</Box>
							</MenuItem>
							{ColorItems.map((color) => (
								<MenuItem key={color.value} value={color.value} sx={{ px: '8px' }}>
									<Box
										display={'flex'}
										flexDirection={'row'}
										justifyContent={'center'}
										alignItems={'center'}
										width="100%"
										height="24px"
										border={`1px solid ${theme?.palette?.common?.black}`}
										borderRadius={'2px'}
									>
										<Box
											sx={{
												bgcolor: color?.value,
												width: '100%',
												height: '100%',
												cursor: 'pointer',
											}}
										></Box>
									</Box>
								</MenuItem>
							))}
						</CustomTextField>

						<BlockButton
							format="headingOne"
							icon={
								<Typography fontWeight={'bold'} fontSize={'17px'}>
									H1
								</Typography>
							}
						/>

						<BlockButton
							format="headingTwo"
							icon={
								<Typography fontWeight={'bold'} fontSize={'17px'}>
									H2
								</Typography>
							}
						/>

						<BlockButton
							format="headingThree"
							icon={
								<Typography fontWeight={'bold'} fontSize={'17px'}>
									H3
								</Typography>
							}
						/>

						<BlockButton
							format="headingFour"
							icon={
								<Typography fontWeight={'bold'} fontSize={'17px'}>
									H4
								</Typography>
							}
						/>

						<BlockButton
							format="headingFive"
							icon={
								<Typography fontWeight={'bold'} fontSize={'17px'}>
									H5
								</Typography>
							}
						/>

						<BlockButton
							format="headingSix"
							icon={
								<Typography fontWeight={'bold'} fontSize={'17px'}>
									H6
								</Typography>
							}
						/>

						<MarkButton format="bold" icon={<FormatBoldIcon />} />

						<MarkButton format="italic" icon={<FormatItalicIcon />} />

						<MarkButton format="underline" icon={<FormatUnderlinedIcon />} />

						<MarkButton format="code" icon={<CodeIcon />} />

						<BlockButton format="numberedList" icon={<FormatListNumberedIcon />} />

						<BlockButton format="bulletedList" icon={<FormatListBulletedIcon />} />

						<BlockButton format="left" icon={<FormatAlignLeftIcon />} />

						<BlockButton format="center" icon={<FormatAlignCenterIcon />} />

						<BlockButton format="right" icon={<FormatAlignRightIcon />} />

						<BlockButton format="justify" icon={<FormatAlignJustifyIcon />} />

						<Box position={'relative'}>
							<CustomButton
								onMouseDown={(event) => {
									event.preventDefault();
									setShowEmojiPicker(!showEmojiPicker);
								}}
							>
								<EmojiHappyIcon
									fill={showEmojiPicker ? theme?.palette?.infuuse?.blue100 : theme?.palette?.gray500}
								/>
							</CustomButton>

							{showEmojiPicker && (
								<Box
									sx={{
										position: 'absolute',
										bottom: router.pathname.includes('/templates') ? '-200px' : '-32px',
										right: router.pathname.includes('/message')
											? null
											: !chatSidebar || !dealSidebar
												? '45px'
												: null,
										left: router.pathname.includes('/message')
											? '45px'
											: chatSidebar || dealSidebar
												? '45px'
												: null,
										zIndex: 10000,
									}}
								>
									<Picker data={data} onEmojiSelect={(emoji) => insertEmoji(emoji)} emojiSize={20} />
								</Box>
							)}
						</Box>
					</Box>
				</Stack>
			</Toolbar>

			{/* ------------------------------------------- editor text rich editable */}
			<CustomEditable
				renderElement={renderElement}
				renderLeaf={renderLeaf}
				placeholder=""
				spellCheck
				autoFocus
				// readOnly={ScenarioData?.status === ScenarioStatus?.Draft ? false : true}
				onKeyDown={(event) => {
					if (isHotkey('mod+enter', event)) {  // mod represents Ctrl on Windows/Linux and Command on macOS
						event.preventDefault();
						editor.insertText('\n'); // Insert a new line when Ctrl+Enter is pressed
					} else if (isHotkey('enter', event)) {
						event.preventDefault();
						// Handle the case when just Enter is pressed (you might want to submit the form or do nothing)
					} else {
						for (const hotkey in HOTKEYS) {
							if (isHotkey(hotkey, event as any)) {
								event.preventDefault();
								const mark = HOTKEYS[hotkey];
								toggleMark(editor, mark);
							}
						}
					}
				}}
			/>
		</Slate>
	);
};

// ----------------------------------- initial value slate.js
const initialValue: Descendant[] = [
	{
		type: 'paragraph',
		children: [{ text: '' }],
	},
	{
		type: 'paragraph',
		children: [{ text: '' }],
	},
];

// -----------------------------------serialize
const serialize = (node) => {
	// tags for marking text
	if (Text.isText(node)) {
		let string = escapeHTML(node.text);

		if (node.bold) {
			string = `<strong>${string}</strong>`;
		}
		if (node.italic) {
			string = `<em>${string}</em>`;
		}
		if (node.underline) {
			string = `<u>${string}</u>`;
		}
		if (node.code) {
			string = `<code>${string}</code>`;
		}
		if (node.fontFamily) {
			string = `<span style="font-family: ${node.fontFamily}">${string}</span>`;
		}
		if (node.color) {
			string = `<span style="color: ${node.color}">${string}</span>`;
		}
		if (node.backgroundColor) {
			string = `<span style="background-color: ${node.backgroundColor}">${string}</span>`;
		}
		return string;
	}

	const children = node.children.map((n) => serialize(n)).join('');

	let style = '';

	if (node.align) {
		style = ` style="text-align: ${node.align};"`;
	}

	// tags element
	switch (node.type) {
		case 'paragraph':
			return `<P ${style}>${children}</P>`;
		case 'headingOne':
			return `<h1 ${style}>${children}</h1>`;
		case 'headingTwo':
			return `<h2 ${style}>${children}</h2>`;
		case 'headingThree':
			return `<h3 ${style}>${children}</h3>`;
		case 'headingFour':
			return `<h4 ${style}>${children}</h4>`;
		case 'headingFive':
			return `<h5 ${style}>${children}</h5>`;
		case 'headingSix':
			return `<h6 ${style}>${children}</h6>`;
		case 'bulletedList':
			return `<ul ${style}>${children}</ul>`;
		case 'numberedList':
			return `<ol ${style}>${children}</ol>`;
		case 'listItem':
			return `<li ${style}>${children}</li>`;
		case 'br':
			return `<br/>`;
		default:
			return children;
	}
};

// -----------------------------------leaf
const Leaf = ({ attributes, children, leaf }) => {
	if (leaf.paragraph) {
		children = <p {...attributes}>{children}</p>;
	}
	if (leaf.headingOne) {
		children = <h1 {...attributes}>{children}</h1>;
	}
	if (leaf.headingTwo) {
		children = <h2 {...attributes}>{children}</h2>;
	}
	if (leaf.headingThree) {
		children = <h3 {...attributes}>{children}</h3>;
	}
	if (leaf.headingFour) {
		children = <h4 {...attributes}>{children}</h4>;
	}
	if (leaf.headingFive) {
		children = <h5 {...attributes}>{children}</h5>;
	}
	if (leaf.headingSix) {
		children = <h6 {...attributes}>{children}</h6>;
	}
	if (leaf.bold) {
		children = <strong {...attributes}>{children}</strong>;
	}
	if (leaf.italic) {
		children = <em {...attributes}>{children}</em>;
	}
	if (leaf.underline) {
		children = <u {...attributes}>{children}</u>;
	}
	if (leaf.code) {
		children = <code {...attributes}>{children}</code>;
	}
	if (leaf.bulletedList) {
		children = <ul {...attributes}>{children}</ul>;
	}
	if (leaf.numberedList) {
		children = <ol {...attributes}>{children}</ol>;
	}
	if (leaf.listItem) {
		children = <li {...attributes}>{children}</li>;
	}
	if (leaf.left) {
		children = (
			<p {...attributes} style={{ textAlign: 'left' }}>
				{children}
			</p>
		);
	}
	if (leaf.right) {
		children = (
			<p {...attributes} style={{ textAlign: 'right' }}>
				{children}
			</p>
		);
	}
	if (leaf.center) {
		children = (
			<p {...attributes} style={{ textAlign: 'center' }}>
				{children}
			</p>
		);
	}
	if (leaf.justify) {
		children = (
			<p {...attributes} style={{ textAlign: 'justify' }}>
				{children}
			</p>
		);
	}
	if (leaf.br) {
		children = <br />;
	}

	return (
		<span
			{...attributes}
			style={{ color: leaf.color, backgroundColor: leaf.backgroundColor, fontFamily: leaf.fontFamily }}
		>
			{children}
		</span>
	);
};

// -----------------------------------importing element
const Element = (props) => {
	const { attributes, children, element } = props;

	const style = { textAlign: element.align };
	switch (element.type) {
		case 'paragraph':
			return (
				<p style={style} {...attributes}>
					{children}
				</p>
			);
		case 'headingOne':
			return (
				<h1 style={style} {...attributes}>
					{children}
				</h1>
			);
		case 'headingTwo':
			return (
				<h2 style={style} {...attributes}>
					{children}
				</h2>
			);
		case 'headingThree':
			return (
				<h3 style={style} {...attributes}>
					{children}
				</h3>
			);
		case 'headingFour':
			return (
				<h4 style={style} {...attributes}>
					{children}
				</h4>
			);
		case 'headingFive':
			return (
				<h5 style={style} {...attributes}>
					{children}
				</h5>
			);
		case 'headingSix':
			return (
				<h6 style={style} {...attributes}>
					{children}
				</h6>
			);
		case 'bold':
			return (
				<strong style={style} {...attributes}>
					{children}
				</strong>
			);
		case 'italic':
			return (
				<em style={style} {...attributes}>
					{children}
				</em>
			);
		case 'underline':
			return (
				<u style={style} {...attributes}>
					{children}
				</u>
			);
		case 'code':
			return (
				<code style={style} {...attributes}>
					{children}
				</code>
			);

		case 'bulletedLlist':
			return (
				<ul style={style} {...attributes}>
					{children}
				</ul>
			);
		case 'numberedList':
			return (
				<ol style={style} {...attributes}>
					{children}
				</ol>
			);

		case 'listItem':
			return (
				<li style={style} {...attributes}>
					{children}
				</li>
			);

		case 'br':
			return <br />;
		default:
			return (
				<p style={style} {...attributes}>
					{children}
				</p>
			);
	}
};

// ---------------------------------- convert to html
const withHtml = (editor) => {
	const { insertData, isInline, isVoid } = editor;

	editor.isVoid = (element) => {
		return element.type === 'image' ? true : isVoid(element);
	};

	editor.insertData = (data) => {
		const html = data.getData('text/html');

		if (html) {
			const parsed = new DOMParser().parseFromString(html, 'text/html');
			const fragment = deserialize(parsed.body);
			Transforms.insertFragment(editor, fragment);
			return;
		}

		insertData(data);
	};

	return editor;
};

// -------------------------------------------------- export tag
export const deserialize: any = (el, markAttributes = {}) => {
	// node
	if (el.nodeType === Node.TEXT_NODE) {
		return jsx('text', markAttributes, el.textContent);
	} else if (el.nodeType !== Node.ELEMENT_NODE) {
		return null;
	}

	// styles
	const nodeAttributes = { ...markAttributes };

	const style = el.getAttribute('style');
	if (style) {
		const styleAttributes = style.split(';').reduce((acc, rule) => {
			const [key, value] = rule.split(':');
			if (key && value) {
				acc[key.trim()] = value.trim();
			}
			return acc;
		}, {});

		if (styleAttributes['font-family']) {
			nodeAttributes.fontFamily = styleAttributes['font-family'];
		}
		if (styleAttributes['color']) {
			nodeAttributes.color = styleAttributes['color'];
		}
		if (styleAttributes['background-color']) {
			nodeAttributes.backgroundColor = styleAttributes['background-color'];
		}
		if (styleAttributes['text-align']) {
			nodeAttributes.align = styleAttributes['text-align'];
		}
	}

	// define attributes for text nodes
	switch (el.nodeName) {
		case 'STRONG':
			nodeAttributes.bold = true;
			break;
		case 'U':
			nodeAttributes.underline = true;
			break;
		case 'I':
			nodeAttributes.italic = true;
			break;
		case 'CODE':
			nodeAttributes.code = true;
			break;
		default:
			break;
	}

	const children = Array.from(el.childNodes)
		.map((node) => deserialize(node, nodeAttributes))
		.flat();

	if (children.length === 0) {
		children.push(jsx('text', nodeAttributes, ''));
	}

	switch (el.nodeName) {
		case 'BODY':
			return jsx('fragment', {}, children);
		case 'BR':
			return '\n';
		case 'BLOCKQUOTE':
			return jsx('element', { type: 'quote', ...nodeAttributes }, children);
		case 'P':
			return jsx('element', { type: 'paragraph', ...nodeAttributes }, children);
		case 'A':
			return jsx('element', { type: 'link', url: el.getAttribute('href') }, children);
		case 'H1':
			return jsx('element', { type: 'headingOne', ...nodeAttributes }, children);
		case 'H2':
			return jsx('element', { type: 'headingTwo', ...nodeAttributes }, children);
		case 'H3':
			return jsx('element', { type: 'headingThree', ...nodeAttributes }, children);
		case 'H4':
			return jsx('element', { type: 'headingFour', ...nodeAttributes }, children);
		case 'H5':
			return jsx('element', { type: 'headingFive', ...nodeAttributes }, children);
		case 'H5':
			return jsx('element', { type: 'headingSix', ...nodeAttributes }, children);
		case 'UL':
			return jsx('element', { type: 'bulletedLlist', ...nodeAttributes }, children);
		case 'OL':
			return jsx('element', { type: 'numberedList', ...nodeAttributes }, children);
		case 'LI':
			return jsx('element', { type: 'listItem', ...nodeAttributes }, children);

		default:
			return children;
	}
};

// ------------------------------------------------------ func
// activing for block tags
const isBlockActive = (editor, format, blockType = 'type') => {
	const { selection } = editor;
	if (!selection) return false;

	const [match] = Array.from(
		Editor.nodes(editor, {
			at: Editor.unhangRange(editor, selection),
			match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n[blockType] === format,
		})
	);

	return !!match;
};

// activing for mark tags
const isMarkActive = (editor, format) => {
	const marks = Editor.marks(editor);
	return marks ? marks[format] === true : false;
};

// block tags
const toggleBlock = (editor, format) => {
	const isActive = isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type');
	const isList = LIST_TYPES.includes(format);

	Transforms.unwrapNodes(editor, {
		match: (n) =>
			!Editor.isEditor(n) &&
			SlateElement.isElement(n) &&
			LIST_TYPES.includes(n.type) &&
			!TEXT_ALIGN_TYPES.includes(format),
		split: true,
	});
	let newProperties: Partial<SlateElement>;

	if (TEXT_ALIGN_TYPES.includes(format)) {
		newProperties = {
			align: isActive ? undefined : format,
		};
	} else {
		newProperties = {
			type: isActive ? 'paragraph' : isList ? 'listItem' : format,
		};
	}

	Transforms.setNodes<SlateElement>(editor, newProperties);

	if (!isActive && isList) {
		const block = { type: format, children: [] };
		Transforms.wrapNodes(editor, block);
	}
};

// marking tags
const toggleMark = (editor, format) => {
	const isActive = isMarkActive(editor, format);

	if (isActive) {
		Editor.removeMark(editor, format);
	} else {
		Editor.addMark(editor, format, true);
	}
};

// ----------------------------------------- button
// toolbar block button
const BlockButton = ({ format, icon }) => {
	const editor = useSlate();
	return (
		<CustomButton
			active={isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type')}
			onMouseDown={(event) => {
				event.preventDefault();
				toggleBlock(editor, format);
			}}
		>
			{icon}
		</CustomButton>
	);
};

// toolbar mark button
const MarkButton = ({ format, icon }) => {
	const editor = useSlate();
	return (
		<CustomButton
			active={isMarkActive(editor, format)}
			onMouseDown={(event) => {
				event.preventDefault();
				toggleMark(editor, format);
			}}
		>
			{icon}
		</CustomButton>
	);
};

export default SlateEditor;
