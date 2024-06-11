import React, { useState } from 'react';
import { format } from 'date-fns';
import { FaTrash, FaEdit, FaLink } from 'react-icons/fa';
import Paginator from './Paginator';
import { useChangeFileCommentMutation, useDeleteFileMutation, useFetchFilesQuery } from '../api/fileApi';
import { formatBytes, handleCopyLink, truncateFileName } from '../utils/utils';

const FileList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const offset = (currentPage - 1) * limit;

  const { data, error, isLoading } = useFetchFilesQuery({ limit, offset });
  const [deleteFile] = useDeleteFileMutation();
  const [changeFileComment] = useChangeFileCommentMutation();

  const handleDelete = async (fileId: number) => {
    await deleteFile(fileId);
  };

  const handleRename = async (fileId: number) => {
    const newComment = prompt('Enter new comment:');
    if (newComment) {
      await changeFileComment({ fileId, newComment });
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">My Files</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error.toString()}</p>}
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
            {data && data.results.map((file) => (
              <tr key={file.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <a href={file.file} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">
                    {truncateFileName(file.original_name, 50)}
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
      {data && <Paginator
         currentPage={currentPage}
         totalPages={Math.ceil(data.count / limit)}
         onPageChange={setCurrentPage}
      />}
    </div>
  );
};

export default FileList;
