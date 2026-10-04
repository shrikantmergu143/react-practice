import duplicateValueRemoveCode from "../code/duplicateValueRemove.code";
import primeNumberCode from "../code/primeNumber.code";
import CodePreview from "../components/CodePreview/CodePreview";
import duplicateValueRemove from "../PageComponent/javascript/duplicateValueRemove";
import { isPrimeNumber } from "../PageComponent/javascript/primeNumber";

export default function ReverseString() {

    return (
        <CodePreview code={primeNumberCode}>
            <p>{isPrimeNumber(8)}</p>
            <p>{isPrimeNumber(7)}</p>
        </CodePreview>
    )
}
