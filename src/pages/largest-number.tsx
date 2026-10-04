import largestNumberCode from "../code/largestNumber.code";
import primeNumberCode from "../code/primeNumber.code";
import CodePreview from "../components/CodePreview/CodePreview";
import largestNumber from "../PageComponent/javascript/largestNumber";
import { isPrimeNumber } from "../PageComponent/javascript/primeNumber";

export default function LargestNumber() {

    return (
        <CodePreview code={largestNumberCode}>
            <p>{largestNumber([2, 3, 5, 6, 22, 33, 22])}</p>
        </CodePreview>
    )
}
