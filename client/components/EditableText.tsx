"use client";

import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { userStoreType } from "@/hooks/useAuth";

interface ETProps {
  text: string;
  query: string;
  mutation: string;
  user: userStoreType;
}

const EditableText = ({ text, query, mutation, user }: ETProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [textData, setTextData] = useState(text || "Без названия");
  const [isEditing, setIsEditing] = useState(false);

  const enableInput = () => {
    setTextData(text);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextData(event.target.value);
    // update({
    //   id: initData._id,
    //   title: event.target.value || "Без названия",
    // });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableInput();
    }
  };

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <Input
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={textData}
          className="h-7 px-2 focus-visible:ring-transparent"
        />
      ) : (
        <Button
          onClick={enableInput}
          variant="ghost"
          size="sm"
          className="font-normal h-auto p-1"
        >
          <span className="truncate">{text}</span>
        </Button>
      )}
    </div>
  );
};

export default EditableText;
