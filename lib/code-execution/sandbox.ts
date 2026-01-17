export interface ExecutionResult {
  output: string[];
  error?: string;
}

export class CodeSandbox {
  private static readonly EXECUTION_TIMEOUT = 5000; // 5 seconds
  private static readonly MIN_EXECUTION_INTERVAL = 1000; // 1 second
  private static lastExecution = 0;

  /**
   * Sanitize output to prevent XSS
   */
  private static sanitizeOutput(value: unknown): string {
    if (typeof value === 'string') {
      return value
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
    }
    if (typeof value === 'object' && value !== null) {
      try {
        return JSON.stringify(value, null, 2);
      } catch {
        return String(value);
      }
    }
    return String(value);
  }

  /**
   * Check if enough time has passed since last execution (rate limiting)
   */
  private static checkRateLimit(): boolean {
    const now = Date.now();
    if (now - this.lastExecution < this.MIN_EXECUTION_INTERVAL) {
      return false;
    }
    this.lastExecution = now;
    return true;
  }

  /**
   * Execute code with safety measures
   */
  static async execute(code: string): Promise<ExecutionResult> {
    // Rate limiting
    if (!this.checkRateLimit()) {
      return {
        output: [],
        error: 'Please wait before running code again (rate limit: 1 execution per second)',
      };
    }

    const logs: string[] = [];
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    // Capture console output
    console.log = (...args: unknown[]) => {
      logs.push(args.map((arg) => this.sanitizeOutput(arg)).join(' '));
    };

    console.error = (...args: unknown[]) => {
      logs.push('ERROR: ' + args.map((arg) => this.sanitizeOutput(arg)).join(' '));
    };

    console.warn = (...args: unknown[]) => {
      logs.push('WARNING: ' + args.map((arg) => this.sanitizeOutput(arg)).join(' '));
    };

    return new Promise((resolve) => {
      let completed = false;

      // Timeout mechanism
      const timeoutId = setTimeout(() => {
        if (!completed) {
          completed = true;
          console.log = originalLog;
          console.error = originalError;
          console.warn = originalWarn;
          resolve({
            output: logs,
            error: 'Execution timeout: Code took longer than 5 seconds to execute',
          });
        }
      }, this.EXECUTION_TIMEOUT);

      try {
        // Restricted scope - no access to dangerous globals
        const restrictedEval = (code: string) => {
          'use strict';

          // Prevent access to potentially dangerous objects
          const window = undefined;
          const document = undefined;
          const localStorage = undefined;
          const sessionStorage = undefined;
          const fetch = undefined;
          const XMLHttpRequest = undefined;

          // Execute the code
          // eslint-disable-next-line no-eval
          return eval(code);
        };

        restrictedEval(code);

        if (!completed) {
          completed = true;
          clearTimeout(timeoutId);
          console.log = originalLog;
          console.error = originalError;
          console.warn = originalWarn;
          resolve({ output: logs });
        }
      } catch (error) {
        if (!completed) {
          completed = true;
          clearTimeout(timeoutId);
          console.log = originalLog;
          console.error = originalError;
          console.warn = originalWarn;
          resolve({
            output: logs,
            error: `Error: ${error instanceof Error ? error.message : String(error)}`,
          });
        }
      }
    });
  }
}
