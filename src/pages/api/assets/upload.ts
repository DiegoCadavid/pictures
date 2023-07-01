import { type NextApiRequest, type NextApiResponse } from "next";
import { env } from "@/env.mjs";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import Cloudinary from "cloudinary";

const cloudinary = Cloudinary.v2;

cloudinary.config({
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  cloud_name: env.CLOUDINARY_API_CLOUD_NAME,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      msg: "Only POST requests allowed",
    });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({
      msg: "Unauthorized",
    });
  }

  const { image: imageB64 } = req.body as { image: string };

  try {
    const result = await cloudinary.uploader.upload(imageB64, {
      use_filename: false,
      unique_filename: true,
    });

    return res.status(200).json({
      secure_url: result.secure_url,
      id: result.public_id,
      width: result.width,
      height: result.height,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};
export default handler;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
