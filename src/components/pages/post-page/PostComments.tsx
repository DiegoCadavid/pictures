const PostComments = ({}) => {
  return (
    <div className="mt-4 ">
      <form className="relative ">
        <input
          type="text"
          placeholder="Add a comment..."
          className="w-full rounded-2xl bg-zinc-200 px-6 py-3 outline-none"
        />
      </form>
    </div>
  );
};

export default PostComments;
