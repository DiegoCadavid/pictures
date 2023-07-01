
const toBase64 = (file: File | Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result?.toString() as string)
    };
    reader.onerror = error => reject(error);
  });
}

export default toBase64;