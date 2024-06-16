import React, { useState } from 'react';
import { format } from 'date-fns';
import { FaTrash, FaEdit, FaLink } from 'react-icons/fa';
import Paginator from './Paginator';
import { useChangeFileCommentMutation, useDeleteFileMutation, useFetchFilesQuery } from '../api/fileApi';
import { formatBytes, handleCopyLink, truncateFileName } from '../utils/utils';
import { useFetchUserFilesQuery } from '../api/api';
import DeleteConfirmationModal from './modals/DeleteConfirmationModal';

interface FileListProps {
  userId?: number;
}

const FileList: React.FC<FileListProps> = ({ userId }) => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<number | undefined>(undefined);

  const limit = 5;
  const offset = (currentPage - 1) * limit;
  
  // Определяем, какой хук использовать в зависимости от наличия userId
  const useFetchFiles = userId ? useFetchUserFilesQuery : useFetchFilesQuery;

  const { 
    data: files = undefined,
    error,
    isLoading,
    refetch: refetchUserFiles,
  } = useFetchFiles({ limit, offset, userId: userId as number });


  const [deleteFile] = useDeleteFileMutation();
  const [changeFileComment] = useChangeFileCommentMutation();

  const handleDelete = (fileId: number) => {
    setShowDeleteModal(true);
    setFileToDelete(fileId);
  };

  const confirmDelete = async () => {
    if (fileToDelete !== undefined) {
      await deleteFile(fileToDelete);
      refetchUserFiles();
      setShowDeleteModal(false);
      setFileToDelete(undefined);
    }
  };

  const cancelDelete = async () => {
    setShowDeleteModal(false);
    setFileToDelete(undefined);
  };

  const handleRename = async (fileId: number) => {
    const newComment = prompt('Enter new comment:');
    if (newComment) {
      await changeFileComment({ fileId, newComment });
      refetchUserFiles();
    }
  };
  
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading files</p>;

  return (
    <div className='flex-1'>
      <h2 className="text-2xl mb-4">Files id:{userId}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                File Name
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Comment
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Size
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Uploaded
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Downloaded
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Operations
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {files && files.results.map((file) => (
              <tr key={file.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <a href={file.file} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">
                    {truncateFileName(file.original_name, 20)}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.comment}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatBytes(file.size)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{format(new Date(file.upload_date), 'PPP')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.last_download_date ? format(new Date(file.last_download_date), 'PPP') : 'Never'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => handleDelete(file.id)} className="text-red-600 hover:text-red-900 mr-2"><FaTrash /></button>
                  <button onClick={() => handleRename(file.id)} className="text-yellow-600 hover:text-yellow-900 mr-2"><FaEdit /></button>
                  {file.short_link &&
                    <button onClick={() => handleCopyLink(file.short_link)} className="text-green-600 hover:text-green-900"><FaLink /></button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {files && <Paginator
         currentPage={currentPage}
         totalPages={Math.ceil(files.count / limit)}
         onPageChange={setCurrentPage}
      />}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default FileList;
