"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface ApiTest {
  name: string;
  endpoint: string;
  method: string;
  requiresAuth: boolean;
  body?: any;
}

const apiTests: ApiTest[] = [
  {
    name: "Health Check",
    endpoint: "/api/health",
    method: "GET",
    requiresAuth: false,
  },
  {
    name: "Login Test",
    endpoint: "/api/auth/login",
    method: "POST",
    requiresAuth: false,
    body: {
      email: "demo@harperai.com",
      password: "password123",
    },
  },
  {
    name: "Get Current User",
    endpoint: "/api/auth/me",
    method: "GET",
    requiresAuth: true,
  },
  {
    name: "Get Settings",
    endpoint: "/api/settings",
    method: "GET",
    requiresAuth: true,
  },
  {
    name: "Get Contacts",
    endpoint: "/api/contacts",
    method: "GET",
    requiresAuth: true,
  },
  {
    name: "Get Dashboard Metrics",
    endpoint: "/api/dashboard/metrics",
    method: "GET",
    requiresAuth: true,
  },
];

export function ApiDebugPanel() {
  const [results, setResults] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [token, setToken] = useState<string | null>(null);
  const [apiBaseUrl, setApiBaseUrl] = useState("");

  useEffect(() => {
    // Get API base URL
    const baseUrl = window.location.origin;
    setApiBaseUrl(baseUrl);

    // Try to get token from localStorage
    try {
      const authStorage = localStorage.getItem("auth-storage");
      if (authStorage) {
        const parsed = JSON.parse(authStorage);
        if (parsed.state?.token) {
          setToken(parsed.state.token);
        }
      }
    } catch (error) {
      console.error("Failed to get auth token:", error);
    }
  }, []);

  const runTest = async (test: ApiTest) => {
    setLoading((prev) => ({ ...prev, [test.name]: true }));
    setResults((prev) => ({ ...prev, [test.name]: null }));

    try {
      const url = `${apiBaseUrl}${test.endpoint}`;
      const options: RequestInit = {
        method: test.method,
        headers: {
          "Content-Type": "application/json",
          ...(test.requiresAuth && token
            ? { Authorization: `Bearer ${token}` }
            : {}),
        },
      };

      if (test.body) {
        options.body = JSON.stringify(test.body);
      }

      const startTime = Date.now();
      const response = await fetch(url, options);
      const responseTime = Date.now() - startTime;

      let data;
      try {
        data = await response.json();
      } catch {
        data = await response.text();
      }

      // If login was successful, save the token
      if (test.name === "Login Test" && response.ok && data.token) {
        setToken(data.token);
      }

      setResults((prev) => ({
        ...prev,
        [test.name]: {
          success: response.ok,
          status: response.status,
          statusText: response.statusText,
          data,
          responseTime,
          headers: Object.fromEntries(response.headers.entries()),
        },
      }));
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        [test.name]: {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        },
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [test.name]: false }));
    }
  };

  const runAllTests = async () => {
    // Run non-auth tests first
    for (const test of apiTests.filter((t) => !t.requiresAuth)) {
      await runTest(test);
      // Small delay between tests
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // Then run auth tests if we have a token
    if (token) {
      for (const test of apiTests.filter((t) => t.requiresAuth)) {
        await runTest(test);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }
  };

  const getStatusIcon = (result: any) => {
    if (!result) return <AlertCircle className="h-4 w-4 text-gray-400" />;
    if (result.success)
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    return <XCircle className="h-4 w-4 text-red-500" />;
  };

  const getStatusBadge = (result: any) => {
    if (!result) return null;
    if (result.success) {
      return (
        <Badge variant="outline" className="text-green-600">
          {result.status} {result.statusText}
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="text-red-600">
        {result.status ? `${result.status} ${result.statusText}` : "Error"}
      </Badge>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>API Debug Panel</CardTitle>
        <div className="text-sm text-gray-600 space-y-1">
          <p>Base URL: {apiBaseUrl}</p>
          <p>
            Auth Token:{" "}
            {token ? `${token.substring(0, 20)}...` : "Not authenticated"}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={runAllTests} className="w-full">
            Run All Tests
          </Button>

          <div className="space-y-2">
            {apiTests.map((test) => (
              <div key={test.name} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {loading[test.name] ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      getStatusIcon(results[test.name])
                    )}
                    <span className="font-medium">{test.name}</span>
                    <Badge variant="secondary">{test.method}</Badge>
                    <code className="text-xs text-gray-600">
                      {test.endpoint}
                    </code>
                    {test.requiresAuth && (
                      <Badge variant="outline" className="text-xs">
                        Auth Required
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {results[test.name] && (
                      <>
                        {getStatusBadge(results[test.name])}
                        {results[test.name].responseTime && (
                          <span className="text-xs text-gray-500">
                            {results[test.name].responseTime}ms
                          </span>
                        )}
                      </>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => runTest(test)}
                      disabled={
                        loading[test.name] || (test.requiresAuth && !token)
                      }
                    >
                      Test
                    </Button>
                  </div>
                </div>

                {results[test.name] && (
                  <div className="mt-2 space-y-1">
                    {results[test.name].error && (
                      <p className="text-sm text-red-600">
                        Error: {results[test.name].error}
                      </p>
                    )}
                    {results[test.name].data && (
                      <details className="text-xs">
                        <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                          Response Data
                        </summary>
                        <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto max-h-40">
                          {JSON.stringify(results[test.name].data, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
