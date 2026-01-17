"use client";

import { useCallback, useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { EditorView } from "@codemirror/view";
import { useTheme } from "next-themes";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  height?: string;
}

export function CodeEditor({
  value,
  onChange,
  readOnly = false,
  height = "400px",
}: CodeEditorProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = useCallback(
    (val: string) => {
      onChange(val);
    },
    [onChange]
  );

  if (!mounted) {
    return (
      <div
        className="rounded-lg border border-[var(--foreground)]/10 bg-[var(--foreground)]/5"
        style={{ height }}
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-[var(--foreground)]/10">
      <CodeMirror
        value={value}
        height={height}
        theme={theme === "dark" ? "dark" : "light"}
        extensions={[
          javascript({ typescript: true }),
          EditorView.lineWrapping,
        ]}
        onChange={handleChange}
        editable={!readOnly}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightSpecialChars: true,
          foldGutter: true,
          drawSelection: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          syntaxHighlighting: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          searchKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          lintKeymap: true,
        }}
        className="font-mono text-sm"
      />
    </div>
  );
}
