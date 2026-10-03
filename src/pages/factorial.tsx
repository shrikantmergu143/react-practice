import factorialCode from "../code/factorial.code";
import CodePreview from "../components/CodePreview/CodePreview";
import getFactorial from "../PageComponent/javascript/getFactorial";

export default function Factorial() {

  return (
        <CodePreview code={factorialCode}>
        <p>5 = {getFactorial(5)}</p>
        <p>10 = {getFactorial(10)}</p>
      </CodePreview>
  )
}
