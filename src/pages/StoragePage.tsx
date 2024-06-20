import { useRef } from 'react';
import FileList from "../components/FileList";
import FileUploadComponent from "../components/FileUploadComponent";

const StoragePage = (): JSX.Element => {
  const refetchUserFilesRef = useRef<(() => void) | null>(null);

  const setRefetchUserFiles = (refetchFunc: () => void) => {
    refetchUserFilesRef.current = refetchFunc;
  };

  const handleFileUploadSuccess = () => {
    if (refetchUserFilesRef.current) {
      refetchUserFilesRef.current();
    }
  };

  return (
    <>
      <FileList setRefetchUserFiles={setRefetchUserFiles} />
      <FileUploadComponent onUploadSuccess={handleFileUploadSuccess} />
    </>
  );
};

export default StoragePage;
