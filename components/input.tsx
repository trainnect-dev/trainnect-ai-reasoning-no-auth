"use client";

import { toast } from "sonner";
import { Message, CreateMessage, ChatRequestOptions } from "ai";

interface InputProps {
  input: string;
  setInput: (value: string) => void;
  selectedModelId: string;
  isGeneratingResponse: boolean;
  isReasoningEnabled: boolean;
  append?: (message: Message | CreateMessage, chatRequestOptions?: ChatRequestOptions) => Promise<string | null | undefined>;
}

export function Input({
  input,
  setInput,
  selectedModelId,
  isGeneratingResponse,
  isReasoningEnabled,
  append,
}: InputProps) {

  return (
    <textarea
      className="mb-12 resize-none w-full min-h-12 outline-none bg-transparent placeholder:text-zinc-400"
      placeholder="Send a message"
      value={input}
      autoFocus
      onChange={(event) => {
        setInput(event.currentTarget.value);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();

          if (input === "") {
            return;
          }

          if (isGeneratingResponse) {
            toast.error("Please wait for the model to finish its response!");

            return;
          }

          if (append) {
            append({
              role: "user",
              content: input,
            });
          }

          setInput("");
        }
      }}
    />
  );
}
