import { useRef, useState } from "react";

interface UploadFile {
  id: string;
 file: File;
 preview: string;

 compressing?: boolean;

 compressedBlob?: Blob;
 compressedUrl?: string;
 compressedSize?: number;
}
export default function ImagePng() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
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


  const compressFile = async (id: string) => {
    const current = files.find((f) => f.id === id);
    if (!current) return;

    setFiles((prev) =>
      prev.map((f) =>
        f.id === id
          ? {
              ...f,
              compressing: true,
            }
          : f
      )
    );

    try {
      const formData = new FormData();
      formData.append("image", current.file);

      const response = await fetch("/api/png-minify", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error();

      const blob = await response.blob();

      setFiles((prev) =>
        prev.map((f) =>
          f.id === id
            ? {
                ...f,
                compressing: false,
                compressedBlob: blob,
                compressedUrl: URL.createObjectURL(blob),
                compressedSize: blob.size,
              }
            : f
        )
      );
    } catch {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === id
            ? {
                ...f,
                compressing: false,
              }
            : f
        )
      );
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

              <div className="grid grid-cols-1">

              {files.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md md:flex-row md:items-center"
                >
                  {/* Image */}
                  <div className="flex justify-center md:w-40">
                    <img
                      src={item.preview}
                      alt={item.file.name}
                      className="h-28 w-28 rounded-lg border bg-gray-100 object-contain"
                    />
                  </div>

                  {/* File Details */}
                  <div className="flex-1">
                    <h3 className="truncate text-lg font-semibold">
                      {item.file.name}
                    </h3>

                    <div className="mt-3 grid grid-cols-2 gap-y-2 text-sm md:grid-cols-4">
                      <div>
                        <p className="text-gray-500">Original</p>
                        <p className="font-medium">
                          {formatSize(item.file.size)}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500">Compressed</p>
                        <p className="font-medium text-green-600">
                          {item.compressedSize
                            ? formatSize(item.compressedSize)
                            : "--"}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500">Saved</p>
                        <p className="font-medium">
                          {item.compressedSize
                            ? `${(
                                ((item.file.size - item.compressedSize) /
                                  item.file.size) *
                                100
                              ).toFixed(1)}%`
                            : "--"}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500">Status</p>

                        {item.compressedUrl ? (
                          <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                            Completed
                          </span>
                        ) : item.compressing ? (
                          <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                            Compressing...
                          </span>
                        ) : (
                          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                            Pending
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 md:w-40">
                    {!item.compressedUrl && (
                      <button
                        onClick={() => compressFile(item.id)}
                        disabled={item.compressing}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                      >
                        {item.compressing ? "Compressing..." : "Compress"}
                      </button>
                    )}

                    {item.compressedUrl && (
                      <button
                        onClick={() => downloadFile(item)}
                        className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                      >
                        Download
                      </button>
                    )}

                    <button
                      onClick={() => removeFile(item.id)}
                      className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  );
}