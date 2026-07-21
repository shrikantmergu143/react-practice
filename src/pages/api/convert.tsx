import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";
import sharp from "sharp";
import fs from "fs/promises";

export const config = {
    api: {
        bodyParser: false,
    },
};

type ErrorResponse = {
    success: false;
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Buffer | ErrorResponse>
) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method Not Allowed",
        });
    }

    const form = formidable({
        multiples: false,
        keepExtensions: true,
        maxFileSize: 25 * 1024 * 1024,
    });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }

        const uploaded = files.image as File | File[] | undefined;

        if (!uploaded) {
            return res.status(400).json({
                success: false,
                message: "No image uploaded",
            });
        }

        const file = Array.isArray(uploaded) ? uploaded[0] : uploaded;

        if (!file.mimetype?.startsWith("image/")) {
            return res.status(400).json({
                success: false,
                message: "Invalid image",
            });
        }

        const inputPath = file.filepath;

        const format =
            (Array.isArray(fields.format)
                ? fields.format[0]
                : fields.format) || "webp";

        const quality = Number(
            (Array.isArray(fields.quality)
                ? fields.quality[0]
                : fields.quality) || 90
        );

        try {
            let image = sharp(inputPath).rotate();

            let buffer: Buffer;
            let extension = "";
            let contentType = "";

            switch (format.toLowerCase()) {
                case "png":
                    buffer = await image
                        .png({
                            compressionLevel: 9,
                            adaptiveFiltering: true,
                            effort: 10,
                        })
                        .toBuffer();

                    extension = "png";
                    contentType = "image/png";
                    break;

                case "jpg":
                case "jpeg":
                    buffer = await image
                        .jpeg({
                            quality,
                            mozjpeg: true,
                            progressive: true,
                            optimiseCoding: true,
                            chromaSubsampling: "4:4:4",
                        })
                        .toBuffer();

                    extension = "jpg";
                    contentType = "image/jpeg";
                    break;

                case "webp":
                    buffer = await image
                        .webp({
                            quality,
                            effort: 6,
                            smartSubsample: true,
                            alphaQuality: 100,
                        })
                        .toBuffer();

                    extension = "webp";
                    contentType = "image/webp";
                    break;

                case "avif":
                    buffer = await image
                        .avif({
                            quality,
                            effort: 9,
                            chromaSubsampling: "4:4:4",
                        })
                        .toBuffer();

                    extension = "avif";
                    contentType = "image/avif";
                    break;

                default:
                    return res.status(400).json({
                        success: false,
                        message:
                            "Supported formats: png, jpg, jpeg, webp, avif",
                    });
            }

            res.setHeader("Content-Type", contentType);

            res.setHeader(
                "Content-Disposition",
                `attachment; filename="converted.${extension}"`
            );

            res.setHeader("Content-Length", buffer.length);

            return res.status(200).send(buffer);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Conversion failed",
            });
        } finally {
            await fs.unlink(inputPath).catch(() => {});
        }
    });
}
