import React, { useEffect, useState } from 'react';
import { IFile, IStorageFiles } from '../utils/types';
import { ROUTE_API_STORAGE } from '../utils/consts';

const FileList: React.FC = () => {
  const [files, setFiles] = useState<IFile[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);

  const fetchFiles = (url: string) => {
    fetch(url, {credentials: 'include',})
      .then((response) => {
        console.log(response)
        return response.json()
      })
      .then((data: IStorageFiles) => {
        setFiles(data.results);
        setNextPage(data.next);
        setPrevPage(data.previous);
      });
  };

  useEffect(() => {
    // fetchFiles('/api/storagefiles/by_user/');
    fetchFiles(import.meta.env.VITE_SERVER_URL+'/'+ROUTE_API_STORAGE);

  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4">My Files</h2>
      <ul>
        {files.map(file => (
          <li key={file.id}>{file.original_name} - {file.size} bytes</li>
        ))}
      </ul>
      <div className="mt-4">
        {prevPage && <button onClick={() => fetchFiles(prevPage)} className="mr-2 bg-gray-300 px-4 py-2">Previous</button>}
        {nextPage && <button onClick={() => fetchFiles(nextPage)} className="bg-gray-300 px-4 py-2">Next</button>}
      </div>
    </div>
  );
};

export default FileList;
