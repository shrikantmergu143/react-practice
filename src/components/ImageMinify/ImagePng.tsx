import { useRef, useState } from "react";

interface UploadFile {
  id: string;
  file: File;
  preview: string;

  compressedBlob?: Blob;
  compressedUrl?: string;
  compressedSize?: number;
}

export default function ImagePng() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: UploadFile[] = [];

    Array.from(selectedFiles).forEach((file) => {
      if (file.type !== "image/png") return;

      const exists = files.some(
        (f) =>
          f.file.name === file.name &&
          f.file.size === file.size &&
          f.file.lastModified === file.lastModified
      );

      if (!exists) {
        newFiles.push({
          id: crypto.randomUUID(),
          file,
          preview: URL.createObjectURL(file),
        });
      }
    });

    setFiles((prev) => [...prev, ...newFiles]);
  };


  const uploadAll = async () => {
  if (!files.length) return;

  setLoading(true);

  try {
    const updatedFiles = [...files];

    for (let i = 0; i < updatedFiles.length; i++) {
      const item = updatedFiles[i];

      const formData = new FormData();
      formData.append("image", item.file);

      const response = await fetch("/api/png-minify", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) continue;

      const blob = await response.blob();

      updatedFiles[i] = {
        ...item,
        compressedBlob: blob,
        compressedUrl: URL.createObjectURL(blob),
        compressedSize: blob.size,
      };
    }

    setFiles(updatedFiles);
  } finally {
    setLoading(false);
  }
};

  const formatSize = (size: number) => {
    if (size < 1024) return `${size} B`;

    if (size < 1024 * 1024)
      return `${(size / 1024).toFixed(1)} KB`;

    return `${(size / 1024 / 1024).toFixed(2)} MB`;
  };
const downloadFile = (item: UploadFile) => {
  if (!item.compressedUrl) return;

  const a = document.createElement("a");
  a.href = item.compressedUrl;
  a.download = item.file.name;
  a.click();
};
const removeFile = (id: string) => {
  setFiles((prev) => {
    const file = prev.find((x) => x.id === id);

    if (file) {
      URL.revokeObjectURL(file.preview);

      if (file.compressedUrl) {
        URL.revokeObjectURL(file.compressedUrl);
      }
    }

    return prev.filter((x) => x.id !== id);
  });
};
const clearFiles = () => {
  files.forEach((file) => {
    URL.revokeObjectURL(file.preview);

    if (file.compressedUrl) {
      URL.revokeObjectURL(file.compressedUrl);
    }
  });

  setFiles([]);
};
  return (
    <div className="overflow-auto bg-slate-100 py-10">
      <div className="mx-auto max-w-5xl rounded-xl bg-white shadow-lg">

        <div className="border-b px-8 py-6">
          <h1 className="text-3xl font-bold">
            PNG Lossless Compressor
          </h1>

          <p className="mt-2 text-gray-500">
            Drag & drop PNG images or browse your computer.
          </p>
        </div>

        <div className="p-8">

          {/* Upload Area */}

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              addFiles(e.dataTransfer.files);
            }}
            className={`cursor-pointer rounded-xl border-2 border-dashed p-12 text-center transition-all
              ${
                dragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-blue-500 hover:bg-gray-50"
              }`}
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              hidden
              multiple
              type="file"
              accept=".png"
              onChange={(e) => addFiles(e.target.files)}
            />

            <div className="space-y-4">

              <div className="text-6xl">📁</div>

              <div>

                <h2 className="text-xl font-semibold">
                  Drag & Drop PNG files
                </h2>

                <p className="mt-2 text-gray-500">
                  or click here to browse
                </p>

              </div>

            </div>
          </div>

          {/* Selected Files */}

          {files.length > 0 && (
            <div className="mt-10">

              <div className="mb-5 flex items-center justify-between">

                <h2 className="text-xl font-bold">
                  Selected Files ({files.length})
                </h2>

                <button
                  onClick={clearFiles}
                  className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                  Clear All
                </button>

              </div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                {files.map((item) => (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-lg"
                  >
                    <img
                      src={item.preview}
                      className="h-48 w-full object-contain bg-gray-100"
                    />

                    <div className="space-y-2 p-4">
                            <div className="flex justify-between">
                                <span>Original</span>
                                <span>{formatSize(item.file.size)}</span>
                            </div>

                            {item.compressedSize && (
                                <>
                                <div className="flex justify-between text-green-600 font-semibold">
                                    <span>Compressed</span>
                                    <span>{formatSize(item.compressedSize)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Saved</span>
                                    <span>
                                    {(
                                        ((item.file.size - item.compressedSize) /
                                        item.file.size) *
                                        100
                                    ).toFixed(1)}
                                    %
                                    </span>
                                </div>
                                </>
                            )}

                        <div className="mt-4 space-y-2">

                        {item.compressedUrl && (
                            <button
                            onClick={() => downloadFile(item)}
                            className="w-full rounded-lg bg-green-600 py-2 text-white hover:bg-green-700"
                            >
                            Download
                            </button>
                        )}

                        <button
                            onClick={() => removeFile(item.id)}
                            className="w-full rounded-lg bg-red-500 py-2 text-white hover:bg-red-600"
                        >
                            Remove
                        </button>

                        </div>

                    </div>
                  </div>
                ))}

              </div>

              <div className="mt-8">

                <button
                  disabled={loading}
                  onClick={uploadAll}
                  className="rounded-xl bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading
                    ? "Compressing..."
                    : `Compress ${files.length} File${
                        files.length > 1 ? "s" : ""
                      }`}
                </button>

              </div>

            </div>
          )}


        </div>
      </div>
    </div>
  );
}