import fibonacciCode from "../code/fibonacci.code";
import CodePreview from "../components/CodePreview/CodePreview";
import FolderView from "../PageComponent/folder/FolderView";
import getFibonacci, { getNthFibonacci } from "../PageComponent/javascript/fibonacci";
import getReverseString from "../PageComponent/javascript/getReverseString";

export default function ReverseString() {

    return (
        <CodePreview code={fibonacciCode}>
            <p>{getFibonacci(10)}</p>
            <p>{getNthFibonacci(10)}</p>
        </CodePreview>
    )
}
