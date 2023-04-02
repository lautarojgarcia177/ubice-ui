import { FileUploader } from "@aws-amplify/ui-react";

export default function UploadPhotos() {
  return (
    <>
      <FileUploader
        acceptedFileTypes={[".jpeg", ".jpg"]}
        accessLevel="private"
        isPreviewerVisible={true}
        isResumable={true}
      />
    </>
  );
}
