import { Divider, Stack } from '@mui/material';
import React from 'react';
import VoiceChat from '@/components/atoms/voice-menu';
import SlateEditor from '@/components/atoms/slatejs-editor';
import ShowUploadedBox from './show-uploaded-box';
import SMSEditor from './sms-editor';

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
    setProgressbar: React.Dispatch<React.SetStateAction<number>>
}

const SupportChatComponent = ({ uploadedFile, setUploadedFile, editorOutput, setEditorOutput, setProgressbar }: Props) => {
    return (
        <>
            {uploadedFile?.type === 'voice' ? (
                <VoiceChat setUploadedFile={setUploadedFile} />
            ) : uploadedFile?.type === 'text' ? (

                <SMSEditor editorOutput={editorOutput} setEditorOutput={setEditorOutput} />

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

export default SupportChatComponent
