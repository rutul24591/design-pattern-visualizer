"use client";

import { useState } from "react";
import { Pattern } from "@/types/pattern";
import { CodeEditor } from "@/components/code/code-editor";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeSandbox } from "@/lib/code-execution/sandbox";

interface CodePlaygroundProps {
  pattern: Pattern;
}

export function CodePlayground({ pattern }: CodePlaygroundProps) {
  const [code, setCode] = useState(pattern.code);
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [isRunning, setIsRunning] = useState(false);

  const runCode = async () => {
    setIsRunning(true);
    setOutput([]);
    setError(undefined);

    try {
      const result = await CodeSandbox.execute(code);
      setOutput(result.output);
      if (result.error) {
        setError(result.error);
      }
    } catch (err) {
      setError(`Unexpected error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(pattern.code);
    setOutput([]);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg">Interactive Code Editor</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={resetCode}
              disabled={isRunning}
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={runCode}
              disabled={isRunning}
            >
              <Play className="h-4 w-4 mr-1" />
              Run Code
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <CodeEditor value={code} onChange={setCode} height="400px" />
        </CardContent>
      </Card>

      {(output.length > 0 || error) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Output</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-black text-green-400 rounded-lg p-4 font-mono text-sm space-y-2">
              {output.map((line, index) => (
                <div key={index} dangerouslySetInnerHTML={{ __html: line }} />
              ))}
              {error && (
                <div className="flex items-start gap-2 text-red-400 mt-2 pt-2 border-t border-red-400/30">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
