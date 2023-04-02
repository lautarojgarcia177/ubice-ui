import { FileUploader, TextField } from "@aws-amplify/ui-react";
import MultipleFileUpload from "../components/multipleFileSelector/MultipleFileSelector";

export default function UploadPhotos() {
  const onSuccess = ({ key }) => {
    console.log("upload success", key);
  };
  return (
    <>
      <TextField
        placeholder="171"
        label="Codigo del evento"
        errorMessage="El codigo es incorrecto"
        isRequired={true}
      />
      <FileUploader
        acceptedFileTypes={[".jpeg", ".jpg"]}
        accessLevel="private"
        isPreviewerVisible={true}
        isResumable={true}
        onSuccess={onSuccess}

      />
      <MultipleFileUpload />
    </>
  );
}
