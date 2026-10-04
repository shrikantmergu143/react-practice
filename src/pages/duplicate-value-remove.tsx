import duplicateValueRemoveCode from "../code/duplicateValueRemove.code";
import CodePreview from "../components/CodePreview/CodePreview";
import duplicateValueRemove from "../PageComponent/javascript/duplicateValueRemove";

export default function ReverseString() {

    return (
        <CodePreview code={duplicateValueRemoveCode}>
            <p>{duplicateValueRemove([1, 2, 3, 4,5,6, 7, 3, 4,5]).join(", ")}</p>
        </CodePreview>
    )
}
