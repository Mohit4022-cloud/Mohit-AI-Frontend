import { isDevelopment, isProduction } from "./config";

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: any;
  error?: Error;
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 100;

  private shouldLog(level: LogLevel): boolean {
    if (isDevelopment) return true;

    // In production, only log warnings and errors
    return level === "warn" || level === "error";
  }

  private formatMessage(level: LogLevel, message: string, data?: any): void {
    const timestamp = new Date().toISOString();
    const entry: LogEntry = { level, message, timestamp, data };

    // Store log entry
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    if (!this.shouldLog(level)) return;

    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
    const style = this.getStyle(level);

    if (isDevelopment) {
      console.log(`%c${prefix} ${message}`, style, data || "");
    } else {
      // In production, send to error tracking service
      if (level === "error" && typeof window !== "undefined") {
        // Send to Sentry or your error tracking service
        this.sendToErrorTracking(entry);
      }
    }
  }

  private getStyle(level: LogLevel): string {
    const styles = {
      debug: "color: #6B7280",
      info: "color: #3B82F6",
      warn: "color: #F59E0B",
      error: "color: #EF4444; font-weight: bold",
    };
    return styles[level];
  }

  private sendToErrorTracking(entry: LogEntry): void {
    // Implement error tracking service integration
    // Example: Sentry, LogRocket, etc.
    if (window.Sentry) {
      window.Sentry.captureMessage(entry.message, {
        level: entry.level as any,
        extra: entry.data,
      });
    }
  }

  debug(message: string, data?: any): void {
    this.formatMessage("debug", message, data);
  }

  info(message: string, data?: any): void {
    this.formatMessage("info", message, data);
  }

  warn(message: string, data?: any): void {
    this.formatMessage("warn", message, data);
  }

  error(message: string, error?: Error | any, data?: any): void {
    const errorData = {
      ...data,
      error: error?.stack || error?.message || error,
    };
    this.formatMessage("error", message, errorData);
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }
}

// Singleton instance
export const logger = new Logger();

// Global window error handler
if (typeof window !== "undefined") {
  window.addEventListener("unhandledrejection", (event) => {
    logger.error("Unhandled Promise Rejection", event.reason);
  });

  window.addEventListener("error", (event) => {
    logger.error("Global Error", event.error, {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });
}

// Extend window interface for Sentry
declare global {
  interface Window {
    Sentry?: any;
  }
}
