"use client";
import { getJudge0languageId } from "@/lib/judge0";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { executeCode } from "../actions";

export function useEditor(problem: any, initialLanguage = "JAVASCRIPT") {
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);
  const [code, setCode] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [executionResponse, setExecutionResponse] = useState(null);
  const loadedLanguage = useRef<string | null>(null);

  useEffect(() => {
    const snippet = problem?.codeSnippets?.[selectedLanguage];
    if (!snippet) return;

    if (loadedLanguage.current !== selectedLanguage) {
      setCode(snippet);
      loadedLanguage.current = selectedLanguage;
    }
  }, [selectedLanguage, problem]);

  const runAgainstTests = async () => {
    if (!problem) return;

    try {
      setIsRunning(true);
      setIsSubmitting(true);
      const language_id = getJudge0languageId(selectedLanguage);
      const stdin = problem.testCases.map((tc) => tc.input);
      const expected_outputs = problem.testCases.map((tc) => tc.output);

      const res = await executeCode(code , language_id , stdin , expected_outputs , problem.id);
      setExecutionResponse(res);

      if(res.success){
        toast.success(res.submission?.status === "Accepted" ? "All test cases passed" : res.submission?.status || "Code executed")
      } else {
        toast.error(res.error || "Error executing code")
      }
    } catch (error) {
       console.error('Error executing code', error);
      toast.error('Error executing code');
    }
    finally{
      setIsRunning(false)
      setIsSubmitting(false)
    }
  };

  const handleRun = () => {
    runAgainstTests();
  };

  const handleSubmit = async () => {
    await runAgainstTests();
  };

  return {
    selectedLanguage,
    setSelectedLanguage,
    code,
    setCode,
    isRunning,
    isSubmitting,
    executionResponse,
    handleRun,
    handleSubmit,
  };
}
