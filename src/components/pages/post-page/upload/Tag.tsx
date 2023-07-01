interface Props {
  tag: string;
  removeTag: (tag: string) => void;
  disabled?: boolean;
}

const Tag = ({ tag, removeTag, disabled }: Props) => {
  return (
    <div
      key={tag}
      className="flex items-center gap-1 rounded-full border border-zinc-300 bg-zinc-200 pl-3 pr-2 py-1.5 text-sm"
    >
      {tag}
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            removeTag(tag);
          }
        }}
        className="rounded-full bg-zinc-300 p-0.5 hover:bg-zinc-400 disabled:hover:bg-zinc-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default Tag;
