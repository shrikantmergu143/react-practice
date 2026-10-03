import reverseCode from "../code/reverse.code";
import CodePreview from "../components/CodePreview/CodePreview";
import FolderView from "../PageComponent/folder/FolderView";
import getReverseString from "../PageComponent/javascript/getReverseString";

export default function ReverseString() {

  return (
        <CodePreview code={reverseCode}>
        {getReverseString('dlroW olleH')}
      </CodePreview>
  )
}
