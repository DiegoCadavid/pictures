import {
  useEffect,
  useRef,
  useState,
  type DragEvent,
  type ChangeEvent,
  type BaseSyntheticEvent,
} from "react";

interface Props {
  handleFiles: (file: File) => void;
  image: File | null;
  disabled?: boolean;
}

const Dropzone = ({ handleFiles, image, disabled }: Props) => {
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const refInputFile = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setImagePreview(image ? URL.createObjectURL(image) : null);
  }, [image]);

  const verifyImage = (image: File): Promise<boolean> => {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(image);

    return new Promise((resolve, reject) => {
      img.onload = () => {
        if (img.width == 0 || img.height == 0) {
          return resolve(false);
        }

        return resolve(true);
      };
    });
  };

  // EVENTS HANDLER

  const targetPrevent = <T extends BaseSyntheticEvent>(e: T) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    targetPrevent(e);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragActive(true);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    targetPrevent(e);

    if (!isDragActive) {
      setIsDragActive(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    targetPrevent(e);
    setIsDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    targetPrevent(e);
    setIsDragActive(false);

    const wrapper = async () => {
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0 && !disabled) {
        const image = e.dataTransfer.files.item(0) as File;
        const isValidImage = await verifyImage(image);
        if(!isValidImage) return;

        handleFiles(image);
        e.dataTransfer.clearData();
      }
    }

    void wrapper();
  };

  const handleClick = () => {
    if (refInputFile.current != null && !disabled) {
      refInputFile.current.click();
    }
  };

  const handleChangeInputFile = (e: ChangeEvent<HTMLInputElement>) => {
    const wrapper = async () => {
      if (
        e.target != null &&
        e.target?.files &&
        e.target.files.length > 0 &&
        !disabled
      ) {
        const image = e.target.files.item(0) as File;
        const isValidImage = await verifyImage(image);
        if(!isValidImage) return;
        handleFiles(image);
      }
    };

    void wrapper();
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`group flex flex-1 items-center justify-center  ${
        isDragActive
          ? "border-red-500 text-red-500"
          : "border-gray-400 text-gray-400 hover:border-gray-500 hover:text-gray-500"
      } ${
        !imagePreview
          ? "max-h-[500px] rounded-2xl border-2 border-dashed"
          : "h-fit min-h-fit "
      }`}
    >
      <div className="pointer-events-none relative w-full">
        <input
          type="file"
          ref={refInputFile}
          accept="image/*"
          className="absolute opacity-0"
          onChange={handleChangeInputFile}
        />
        {imagePreview ? (
          <div>
            <img
              src={imagePreview || ""}
              alt="image preview"
              className={`w-full select-none rounded-2xl ${
                !disabled
                  ? "ring-red-500 ring-offset-2 group-hover:ring-2"
                  : "opacity-80"
              }`}
            />
            <p
              className={
                !disabled
                  ? "mt-2 text-zinc-400 group-hover:text-zinc-500"
                  : "mt-2 text-zinc-400"
              }
            >
              Drag or click on the image to change
            </p>
          </div>
        ) : (
          <p className="text-center">
            {isDragActive ? ":)" : "Drag or click to upload"}{" "}
          </p>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
