import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { FaTrash, FaEdit, FaLink } from 'react-icons/fa';
import { IFile, IStorageFiles } from '../utils/types';
import { ROUTE_API_STORAGE } from '../utils/consts';
import Paginator from './Paginator';
import { toast } from 'react-toastify';

const FileList: React.FC = () => {
  const [files, setFiles] = useState<IFile[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 2;

  const fetchFiles = (page: number) => {
    const offset = (page - 1) * limit;
    const url = `${import.meta.env.VITE_SERVER_URL}/${ROUTE_API_STORAGE}?limit=${limit}&offset=${offset}`;

    fetch(url, {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data: IStorageFiles) => {
        setFiles(data.results);
        setTotalPages(Math.ceil(data.count / limit));
      });
  };

  useEffect(() => {
    return fetchFiles(currentPage);
  }, [currentPage]);

  const handleDelete = (fileId: number) => {
    console.log('delete: ', fileId)
  };

  const handleRename = (fileId: number) => {
    console.log('rename: ', fileId)

  };

  const handleCopyLink = (shortLink: string) => {
    navigator.clipboard.writeText(shortLink);
    toast.success(`Link copied to clipboard! ${shortLink}`, { position: 'top-center' });
  };

  const truncateFileName = (name: string, limit: number) => {
    if (name.length <= limit) return name;
    const extension = name.slice(name.lastIndexOf('.'));
    const nameWithoutExtension = name.slice(0, name.lastIndexOf('.'));
    const charsToShow = Math.floor((limit - extension.length) / 2);
    return `${nameWithoutExtension.slice(0, charsToShow)}...${nameWithoutExtension.slice(-charsToShow)}${extension}`;
  };

  function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }

  return (
    <div>
      <h2 className="text-2xl mb-4">My Files</h2>
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
            {files.map((file) => (
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
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default FileList;
