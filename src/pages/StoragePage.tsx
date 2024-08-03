import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FileList from "../components/FileList";
import FileUploadComponent from "../components/FileUploadComponent";
import { RootState } from '../store/store';
import { ROUTE_ADMIN } from '../utils/consts';

const StoragePage = (): JSX.Element => {
  const navigate = useNavigate();
  const { isAdmin } = useSelector((state: RootState) => state.auth);

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
      {isAdmin ? (
        <div className="w-full flex justify-end px-4">
          <button
            onClick={() => navigate(ROUTE_ADMIN)}
            className="w-48 text-white bg-indigo-600 hover:bg-indigo-700  px-4 py-2 rounded mr-2"
          >
            Open Admin panel
          </button>
        </div>
      ) : (
        <></>
      )}
      <FileList setRefetchUserFiles={setRefetchUserFiles} />
      <FileUploadComponent onUploadSuccess={handleFileUploadSuccess} />
    </>
  );
};

export default StoragePage;
