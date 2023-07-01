const getAverageColor = (image64: string): Promise<string> => {
  if (typeof window === "undefined") {
    throw new Error("Can't get blur on server side");
  }

  const image = new Image();
  image.src = image64;

  return new Promise((resolve) => {
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;

      const context = canvas.getContext("2d") as CanvasRenderingContext2D;
      context.drawImage(image, 0, 0);
      const imageData = context.getImageData(0, 0, image.width, image.height);

      let rSum = 0;
      let gSum = 0;
      let bSum = 0;

      for (let i = 0; i < imageData.data.length; i += 4) {
        rSum += imageData.data[i] as number;
        gSum += imageData.data[i + 1] as number;
        bSum += imageData.data[i + 2] as number;
      }

      const pixelCount = imageData.data.length / 4;
      const averageRed = Math.floor(rSum / pixelCount);
      const averageGreen = Math.floor(gSum / pixelCount);
      const averageBlue = Math.floor(bSum / pixelCount);

      resolve(
        "#" +
          ((1 << 24) | (averageRed << 16) | (averageGreen << 8) | averageBlue)
            .toString(16)
            .slice(1)
      );
    };
  });
};

export default getAverageColor;
