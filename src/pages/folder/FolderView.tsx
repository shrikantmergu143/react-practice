/* eslint-disable prettier/prettier */
import React, { useMemo, useState } from 'react';
import { folderViewData } from '../../components/static/folderData';

export default function FolderView(file: folderViewData) {
  const { level = 0 } = file;
  const [fileOpen, setFileOpen] = useState(false);
  const isFolder = useMemo(() => {
    if ((file?.children && file?.children?.length > 0) || file?.isFolder) {
      return true;
    }
    return false;
  }, [file?.children, file?.isFolder]);
  const handleOpen = () => {
    setFileOpen(!fileOpen);
  };
  return (
    <section className={`file-view w-full`}>
      <button
        onClick={handleOpen}
        className="p-2 px-2 rounded-md flex items-center w-full hover:bg-gray-100"
      >
        <div className="flex items-center" style={{ paddingLeft: `${(file?.level || 0) * 10}px` }}>
          <span className="text-xl pr-2">{file?.isFolder ? '📁' : '📄'}</span>
          <span>{file?.name}</span>
        </div>
      </button>
      {isFolder && fileOpen && (
        <div className="w-full pt-2">
          {file?.children && file?.children?.length > 0 ? (
            file?.children?.map?.((item, index) => (
              <FolderView {...item} index={index} key={index} level={level + 1} />
            ))
          ) : (
            <div style={{ paddingLeft: `${(file?.level || 1) * 15}px` }}>
              <span className="w-full flex px-3 p-2">No files found</span>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
