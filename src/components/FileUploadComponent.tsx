import React, { useEffect, useRef, useState } from 'react';
import { useUploadFileMutation } from '../api/fileApi';
import { toast } from 'react-toastify';
import { FileUploader } from 'react-drag-drop-files';

interface FileUploadComponentProps {
  onUploadSuccess: () => void;
}

const FileUploadComponent: React.FC<FileUploadComponentProps> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [comment, setComment] = useState<string>('');
  const [uploadFile, { isLoading, isError, isSuccess }] = useUploadFileMutation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isSuccess) {
      toast.success('File uploaded successfully!');
    }
    if (isError) {
      toast.error('Error uploading file.');
    }
  }, [isSuccess, isError]);

  const handleDrop = (file: File) => {
    setFile(file);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleUpload = async () => {
    if (file) {
      await uploadFile({ file, comment });
      onUploadSuccess();
    }
    setFile(null);
    setComment('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-xl my-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Upload File</label>
        <FileUploader
          classes="w-full h-32 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4"
          required
          handleChange={handleDrop}
          name="file"
          types={["JPG", "JPEG", "PNG", "GIF", "PDF"]}
        />
        {file && <p className="mt-2 text-sm text-gray-500">{file.name}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Comment</label>
        <input
          type="text"
          value={comment}
          onChange={handleCommentChange}
          placeholder="Add a comment"
          className="
            mt-1 block w-full text-sm 
            text-gray-900 border border-gray-300 
            rounded-lg focus:outline-none focus:ring-2 
            focus:ring-offset-2 focus:ring-indigo-500
          "
        />
      </div>
      <button
        onClick={handleUpload}
        disabled={isLoading}
        className="
          w-full py-2 px-4 border border-transparent 
          text-sm font-medium rounded-md text-white 
          bg-indigo-600 hover:bg-indigo-700 
          focus:outline-none focus:ring-2 focus:ring-offset-2 
          focus:ring-indigo-500 disabled:opacity-50
        "
      >
        {isLoading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default FileUploadComponent;
