/* eslint-disable prettier/prettier */
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodePreviewProps {
  code: string;
  children: React.ReactNode;
  language?: string;
}

const CodePreview = ({ code, children, language = 'tsx' }: CodePreviewProps) => {
  return (
    <div className="max-h-[calc(100vh-64px)] overflow-hidden shadow">
      <div className="grid md:grid-cols-2">
        {/* Code */}
        <div className="bg-[#282C34] overflow-auto">
          <div className="px-4 py-2 text-white border-b border-gray-700 font-semibold">Code</div>

          <SyntaxHighlighter
            language={language}
            style={oneDark}
            customStyle={{
              margin: 0,
              height: 'calc(100dvh - 106px)',
              fontSize: 14,
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>

        {/* Preview */}
        <div className="bg-white">
          <div className="px-4 py-2 border-b font-semibold">Preview</div>

          <div className="p-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CodePreview;
