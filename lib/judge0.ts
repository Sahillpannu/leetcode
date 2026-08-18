import axios, { AxiosError } from "axios";

const PUBLIC_JUDGE0_URL = "https://ce.judge0.com";
const JUDGE0_URL = (
  process.env.JUDGE0_API_URL || PUBLIC_JUDGE0_URL
).replace(/\/$/, "");
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;
const JUDGE0_API_HOST = process.env.JUDGE0_API_HOST;

const languageMap = {
  PYTHON: 71,
  JAVASCRIPT: 63,
  JAVA: 62,
};

export function getJudge0languageId(language: string) {
  return languageMap[language.toUpperCase() as keyof typeof languageMap];
}

export function getLanguageName(languageId: number) {
  const LANGUAGE_NAMES = {
    74: "TypeScript",
    63: "JavaScript",
    71: "Python",
    62: "Java",
  };
  return LANGUAGE_NAMES[languageId as keyof typeof LANGUAGE_NAMES] || "Unknown";
}

export function normalizeJudgeOutput(value?: string | null) {
  if (value == null) return "";

  return value
    .trim()
    .replace(/\r\n/g, "\n")
    .replace(/[\[\]\(\)\{\},]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .join(" ");
}

function judge0Headers(url: string) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const isRapidApi = url.includes("rapidapi.com");
  if (isRapidApi && JUDGE0_API_KEY) {
    headers["x-rapidapi-key"] = JUDGE0_API_KEY;
    headers["x-rapidapi-host"] =
      JUDGE0_API_HOST || new URL(url).host;
  }

  return headers;
}

function getJudge0Candidates() {
  const urls = [JUDGE0_URL];
  if (JUDGE0_URL !== PUBLIC_JUDGE0_URL) {
    urls.push(PUBLIC_JUDGE0_URL);
  }
  return [...new Set(urls)];
}

function getJudge0ErrorMessage(error: unknown) {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const data = error.response?.data as
      | { messages?: string; message?: string }
      | undefined;

    if (status === 502 || status === 503) {
      return "Code execution service is temporarily unavailable. Please try again.";
    }

    return data?.messages || data?.message || error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Code execution service is unavailable";
}

let activeJudge0Url = JUDGE0_URL;

async function postBatch(url: string, submissions: any) {
  const { data } = await axios.request({
    method: "POST",
    url: `${url}/submissions/batch`,
    params: {
      base64_encoded: "false",
    },
    headers: judge0Headers(url),
    data: {
      submissions,
    },
    timeout: 20000,
  });

  if (!Array.isArray(data)) {
    throw new Error("Unexpected response from code execution service");
  }

  return data;
}

export async function submitBatch(submissions: any) {
  const candidates = getJudge0Candidates();
  let lastError: unknown;

  for (const url of candidates) {
    try {
      const data = await postBatch(url, submissions);
      activeJudge0Url = url;
      return data;
    } catch (error) {
      lastError = error;
      console.error(`Judge0 submit failed for ${url}:`, getJudge0ErrorMessage(error));
    }
  }

  throw new Error(getJudge0ErrorMessage(lastError));
}

export async function pollBatchResults(tokens: string[]) {
  while (true) {
    const { data } = await axios.request({
      method: "GET",
      url: `${activeJudge0Url}/submissions/batch`,
      params: {
        tokens: tokens.join(","),
        base64_encoded: "false",
        fields: "*",
      },
      headers: judge0Headers(activeJudge0Url),
      timeout: 20000,
    });

    const results = data.submissions;

    if (!Array.isArray(results)) {
      throw new Error("Unexpected response from code execution service");
    }

    const isAllDone = results.every(
      (r: any) => r.status.id !== 1 && r.status.id !== 2,
    );

    if (isAllDone) return results;

    await sleep(1000);
  }
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
