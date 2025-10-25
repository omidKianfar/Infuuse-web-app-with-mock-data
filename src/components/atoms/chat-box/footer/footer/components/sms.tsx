import { Divider, Stack, } from '@mui/material';
import VoiceChat from '@/components/atoms/voice-menu';
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
    setProgressbar: React.Dispatch<React.SetStateAction<number>>;
    SMSeditorOutput?: string;
    setSMSEditorOutput?: React.Dispatch<React.SetStateAction<string>>;

}

const SMSComponent = ({ uploadedFile, setUploadedFile, setProgressbar, SMSeditorOutput, setSMSEditorOutput }: Props) => {
    return (
        <>
            {uploadedFile?.type === 'voice' ? (
                <Stack mb={1}>
                    <VoiceChat setUploadedFile={setUploadedFile} />
                </Stack>
            ) : uploadedFile?.type === 'photo' ||
                uploadedFile?.type === 'video' ||
                uploadedFile?.type === 'file' ? (
                <Stack mb={1}>
                    <ShowUploadedBox
                        uploadedFile={uploadedFile}
                        setUploadedFile={setUploadedFile}
                        setProgressbar={setProgressbar}
                    />
                </Stack>
            ) : null}
            <SMSEditor editorOutput={SMSeditorOutput} setEditorOutput={setSMSEditorOutput} />
            <Divider sx={{ mt: 1 }} />
        </>
    )
}

export default SMSComponent
