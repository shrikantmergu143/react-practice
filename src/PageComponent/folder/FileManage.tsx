import { useMemo, useState } from 'react';
import { IFolderData } from '../../components/static/folderData';
import FolderView from './FolderView';
import CodePreview from '../../components/CodePreview/CodePreview';
import folderCode from './../../code/FolderView.code';
const RenderFile = (file: IFolderData) => {
  const [fileOpen, setFileOpen] = useState(false);
  //   const getExtension = file?.name?.split('.')?.pop();
  const hasFolder = useMemo(() => {
    if ((file?.children && file?.children?.length > 0) || file?.isFolder) {
      return true;
    }
    return false;
  }, [file?.children, file?.isFolder]);
  const handleOpen = () => {
    setFileOpen(!fileOpen);
  };
  return (
    <div className={' w-full'}>
      <button
        onClick={handleOpen}
        className={`${fileOpen && hasFolder ? 'text-white bg-pink-500' : 'bg-transparent '} b-0 w-full flex items-center px-3 py-2  mb-2 rounded-lg `}
      >
        <span className="text-xl pr-2">{file?.isFolder ? '📁' : '📄'}</span>
        <h3 className={`is-folder ${file?.isFolder ? 'folder' : ' file'}`}>{file?.name}</h3>
      </button>
      {fileOpen && hasFolder && (
        <>
          {file?.children && file?.children?.length > 0 ? (
            <div className="filter-list pl-4">
              {file?.children?.map((item: IFolderData, index: number) => (
                <div className="file-folder" key={index}>
                  <RenderFile {...item} />
                </div>
              ))}
            </div>
          ) : (
            <div className="filter-list pl-4">
              <span>No files found</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default function FileManage() {
  const data = {
    name: 'src',
    isFolder: true,
    children: [
      {
        name: 'components',
        isFolder: true,
        children: [
          { name: 'Button.tsx', isFolder: false },
          { name: 'Card.tsx', isFolder: false },
        ],
      },
      {
        name: 'pages',
        isFolder: true,
        children: [{ name: 'Home.tsx', isFolder: false }],
      },
    ],
  };

  return (
    <aside className="flex flex-row flex-wrap">
      {/* <section className="max-w-[350px] w-full p-3 border border-1 border-gray rounded-md">
        {RenderFile(folderData)}
      </section>
      <section className="max-w-[350px] w-full p-3 border border-1 border-gray rounded-md">
        <FolderView {...folderData} />
      </section> */}
      <CodePreview code={folderCode}>
        <FolderView {...data} />
      </CodePreview>
    </aside>
  );
}
