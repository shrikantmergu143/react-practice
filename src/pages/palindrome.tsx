import palindromeCode from "../code/palindrome.code";
import CodePreview from "../components/CodePreview/CodePreview";
import isPalindrome from "../PageComponent/javascript/isPalindrome";

export default function Palindrome() {

  return (
        <CodePreview code={palindromeCode}>
        <p>{isPalindrome('RAR')}</p>
        <p>{isPalindrome('dlroW olleH')}</p>
      </CodePreview>
  )
}