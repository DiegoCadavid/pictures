import { useState, useEffect } from "react";

export interface ConfigTags {
  handleChangeTagsRaw: (value: string) => void;
  addTag: (value: string) => void;
  removeTag: (value: string) => void;
  tagsRaw: string;
  tags: string[];
}

const useTags = (): {
  config: ConfigTags;
  tags: string[];
  clearTags: () => void;
} => {
  const [tagsRaw, setTagsRaw] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  // Get control of Enter
  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (e.key == "Enter" && target.tagName != "TEXTAREA") {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleEnter);

    return () => {
      window.removeEventListener("keydown", handleEnter);
    };
  }, []);

  const isValidTag = (tag: string): false | string => {
    const sanitizedTag = tag.trim().toLowerCase();
    if (
      !sanitizedTag ||
      sanitizedTag.includes(",") ||
      sanitizedTag.length < 2 ||
      sanitizedTag.length > 12 ||
      tags.includes(sanitizedTag) ||
      tags.length > 8
    ) {
      return false;
    }

    return sanitizedTag;
  };

  const handleChangeTagsRaw = (value: string) => {
    const regexTag = /[,|\s]/g;

    if (regexTag.test(value)) {
      const tagsArray = value.split(regexTag).reduce<string[]>((prev, curr) => {
        const tag = isValidTag(curr);

        if (!tag) {
          return prev;
        }

        return [...prev, tag];
      }, []);

      if(tagsArray.length == 0) {
        return
      }

      setTags([...tags, ...tagsArray]);
      setTagsRaw("");
      return;
    }

    setTagsRaw(value);
  };

  const addTag = (tag: string) => {
    const validTag = isValidTag(tag);
    if (!validTag) return;

    setTags([...tags, validTag]);
    setTagsRaw("");
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const clearTags = () => {
    setTagsRaw("");
    setTags([]);
  };

  const config: ConfigTags = {
    handleChangeTagsRaw,
    addTag,
    removeTag,
    tagsRaw,
    tags,
  };

  return {
    config,
    tags,
    clearTags,
  };
};

export default useTags;
