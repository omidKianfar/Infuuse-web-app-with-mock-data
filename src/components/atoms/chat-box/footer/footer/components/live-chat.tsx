import { Divider, Stack } from '@mui/material';
import React from 'react';
import VoiceChat from '@/components/atoms/voice-menu';
import SlateEditor from '@/components/atoms/slatejs-editor';
import ShowUploadedBox from './show-uploaded-box';

interface Props {
    uploadedFile: {
        photoUrl: string;
        videoUrl: string;
        fileUrl: string;
        voiceUrl: string;
        type: string;
    };
    setUploadedFile: React.Dispatch<React.SetStateAction<{
        photoUrl: string;
        videoUrl: string;
        fileUrl: string;
        voiceUrl: string;
        type: string;
    }>>;
    editorOutput: string;
    setEditorOutput: React.Dispatch<React.SetStateAction<string>>;
    editorKey: number;
    setProgressbar: React.Dispatch<React.SetStateAction<number>>
}

const LiveChatComponent = ({ uploadedFile, setUploadedFile, editorOutput, setEditorOutput, editorKey, setProgressbar }: Props) => {
    return (
        <>
            {uploadedFile?.type === 'voice' ? (
                <VoiceChat setUploadedFile={setUploadedFile} />
            ) : uploadedFile?.type === 'text' ? (

                <SlateEditor
                    editorOutput={editorOutput}
                    setEditorOutput={setEditorOutput}
                    editorKey={editorKey}
                />
            ) : (
                <Stack>
                    <ShowUploadedBox
                        uploadedFile={uploadedFile}
                        setUploadedFile={setUploadedFile}
                        setProgressbar={setProgressbar}
                    />
                    <Divider sx={{ mt: 1 }} />
                </Stack>
            )}
        </>
    )
}

export default LiveChatComponent
