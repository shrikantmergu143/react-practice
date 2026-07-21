import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";
import sharp from "sharp";
import fs from "fs/promises";
import os from "os";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";
import pngquant from "pngquant-bin";

const exec = promisify(execFile);

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

    form.parse(req, async (err, _, files) => {
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

        const temp = os.tmpdir();

        const sharpPNG = path.join(temp, `sharp-${Date.now()}.png`);
        const quantPNG = path.join(temp, `quant-${Date.now()}.png`);

        try {
            const image = sharp(inputPath)
                .rotate()
                .withMetadata({});

            const metadata = await image.metadata();

            const format: any = metadata.format;

            let buffer: Buffer;
            let contentType = "";
            let extension = "";

            switch (format) {
                case "png": {
                    // First create a PNG with Sharp
                    await image
                        .png({
                            compressionLevel: 6,
                            adaptiveFiltering: true,
                            effort: 10,
                        })
                        .toFile(sharpPNG);

                    const original = await fs.readFile(inputPath);

                    try {
                        await exec(pngquant, [
                            "--force",
                            "--output",
                            quantPNG,
                            "--strip",
                            "--quality=80-100",
                            "--speed=1",
                            sharpPNG,
                        ]);

                        const quant = await fs.readFile(quantPNG);

                        // Return whichever is smaller
                        buffer =
                            quant.length < original.length
                                ? quant
                                : original;
                    } catch {
                        // pngquant failed, return original
                        buffer = original;
                    }

                    contentType = "image/png";
                    extension = "png";
                    break;
                }


                case "jpeg":
                case "jpg": {
                    buffer = await image
                        .jpeg({
                            quality: 90,
                            mozjpeg: true,
                            progressive: true,
                            optimiseCoding: true,
                            chromaSubsampling: "4:4:4",
                        })
                        .toBuffer();

                    contentType = "image/jpeg";
                    extension = "jpg";
                    break;
                }

                case "webp": {
                    buffer = await image
                        .webp({
                            quality: 92,
                            alphaQuality: 100,
                            effort: 6,
                            smartSubsample: true,
                        })
                        .toBuffer();

                    contentType = "image/webp";
                    extension = "webp";
                    break;
                }

                case "avif": {
                    buffer = await image
                        .avif({
                            quality: 68,
                            effort: 9,
                            chromaSubsampling: "4:4:4",
                        })
                        .toBuffer();

                    contentType = "image/avif";
                    extension = "avif";
                    break;
                }

                default:
                    return res.status(400).json({
                        success: false,
                        message:
                            "Supported formats: PNG, JPG, JPEG, WEBP, AVIF",
                    });
            }

            res.setHeader("Content-Type", contentType);

            res.setHeader(
                "Content-Disposition",
                `attachment; filename="optimized.${extension}"`
            );

            res.setHeader("Content-Length", buffer.length);

            return res.status(200).send(buffer);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Compression failed",
            });
        } finally {
            await Promise.all([
                fs.unlink(inputPath).catch(() => {}),
                fs.unlink(sharpPNG).catch(() => {}),
                fs.unlink(quantPNG).catch(() => {}),
            ]);
        }
    });
}
