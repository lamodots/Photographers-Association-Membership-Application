// import { useState } from "react";

// const [wordCount, setWordCount] = useState(0);

export const handleWordCount = (text: string) => {
  const words = text.trim().split(/\s+/);
  return words.length;
};
