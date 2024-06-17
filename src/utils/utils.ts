import { toast } from "react-toastify";
import { ROUTE_API_DOWNLOAD } from "./consts";

export const handleCopyLink = (shortLink: string) => {
  const baseUrl = import.meta.env.VITE_SERVER_URL;
  const fullLink = `${baseUrl}/${ROUTE_API_DOWNLOAD}/${shortLink}`
  navigator.clipboard.writeText(fullLink);
  toast.success(`Link copied to clipboard! ${fullLink}`, { position: 'top-center' });
};

export const truncateFileName = (name: string, limit: number) => {
  if (name.length <= limit) return name;
  const extension = name.slice(name.lastIndexOf('.'));
  const nameWithoutExtension = name.slice(0, name.lastIndexOf('.'));
  const charsToShow = Math.floor((limit - extension.length) / 2);
  return `${nameWithoutExtension.slice(0, charsToShow)}...${nameWithoutExtension.slice(-charsToShow)}${extension}`;
};

export const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}