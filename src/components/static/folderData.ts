/* eslint-disable prettier/prettier */
export interface IFolderData {
  name: string;
  isFolder: boolean;
  children?: IFolderData[];
}
export interface folderViewData extends IFolderData {
  index?: number;
  level?: number;
}
const folderData: IFolderData = {
  name: 'Documents',
  isFolder: true,
  children: [
    {
      name: 'Work',
      isFolder: true,
      children: [
        {
          name: 'Report.docx',
          isFolder: false,
        },
        {
          name: 'index.docx',
          isFolder: false,
        },
        {
          name: 'Projects',
          isFolder: true,
          children: [
            {
              name: 'Projects',
              isFolder: true,
              children: [],
            },
          ],
        },
      ],
    },
    {
      name: 'image.jpg',
      isFolder: false,
    },
  ],
};
export default folderData;
