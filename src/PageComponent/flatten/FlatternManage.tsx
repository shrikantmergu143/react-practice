/* eslint-disable prettier/prettier */

import CodePreview from "../../components/CodePreview/CodePreview";
import FlattenIndex from "./FlattenIndex";
import folderCode from "../../code/Flatten.code"
export default function FlattenManage() {

  return (
    <aside className="flex flex-row flex-wrap">
      <CodePreview code={folderCode}>
        <FlattenIndex  />
      </CodePreview>
    </aside>
  );
}
