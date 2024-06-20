import axios from 'axios';
import { toast } from "react-toastify";
import { getRouteApiDownloadById, getRouteApiDownloadByShortLink } from "./consts";

export const handleCopyLink = (shortLink: string) => {
  const baseUrl = import.meta.env.VITE_SERVER_URL;
  const fullLink = `${baseUrl}/${getRouteApiDownloadByShortLink(shortLink)}`
  navigator.clipboard.writeText(fullLink);
  toast.success(`Link copied to clipboard! ${fullLink}`, { position: 'top-center' });
};

export const truncateFileName = (name: string, limit: number) => {
  if (name.length <= limit) return name;
  const extension = name.slice(name.lastIndexOf('.'));
  const nameWithoutExtension = name.slice(0, name.lastIndexOf('.'));
  const charsToShow = Math.floor((limit - extension.length) / 2);
  return `${nameWithoutExtension.slice(0, charsToShow+10)}...${nameWithoutExtension.slice(-charsToShow)}${extension}`;
};

export const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

const getToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return `Token ${token}`;
  }
  return null;
};

export async function downloadFileById(fileId: string | number) {
  const baseUrl = import.meta.env.VITE_SERVER_URL;
  const url = `${baseUrl}/${getRouteApiDownloadById(fileId)}`;

  try {
    const response = await axios({
      url: url,
      method: 'GET',
      headers: {
        'Authorization': `${getToken()}`
      },
      responseType: 'blob',
    });

    const contentDisposition = response.headers['content-disposition'];
    let filename = 'file';
    if (contentDisposition) {
      const matches = contentDisposition.match(/filename="([^"]+)"/);
      if (matches && matches.length > 1) {
          filename = matches[1];
      }
    }

    const blob = new Blob([response.data], { type: 'application/octet-stream' });
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = downloadUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(downloadUrl);
    document.body.removeChild(a);

  } catch (error) {
    console.log(error)
    throw new Error('Error downloading file: ' + error);
  }
}
