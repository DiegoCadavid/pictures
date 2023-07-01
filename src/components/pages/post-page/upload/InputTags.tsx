import { type ConfigTags } from "@/hooks/useTags";
import Tag from "./Tag";

interface Props {
  config: ConfigTags;
  disabled?: boolean;
}

const InputTags = ({ config, disabled }: Props) => {
  const { tagsRaw, addTag, handleChangeTagsRaw, removeTag, tags } = config;
  return (
    <div className="-mt-2">
      <p className="mb-0.5 text-sm text-zinc-500">
        Separate your tags with comma {"(,)"} or space
      </p>
      <div className="relative">
        <input
          type="text"
          placeholder="tags"
          className="input-text"
          value={tagsRaw}
          disabled={disabled}
          onChange={(e) => {
            handleChangeTagsRaw(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter" && !disabled) {
              addTag(tagsRaw);
            }
          }}
        />
        <button
          type="button"
          className="btn-icon btn-secondary absolute right-3 top-1/2 h-8 w-8 -translate-y-1/2"
          disabled={disabled}
          onClick={() => {
            if (!disabled) {
              addTag(tagsRaw);
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
      {tags.length == 0 && (
        <p className="mt-0.5 text-sm text-zinc-500">
          min 2, max 8, tags can only have between 2 and 8 characters{" "}
        </p>
      )}

      {tags.length > 0 && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {tags.map((tag) => {
            return (
              <Tag
                key={tag}
                tag={tag}
                removeTag={removeTag}
                disabled={disabled}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InputTags;
