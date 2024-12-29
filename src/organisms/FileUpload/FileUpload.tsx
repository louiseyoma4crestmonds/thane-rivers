import { useState, useRef } from "react";
import styles from "./FileUpload.module.css";
import { FileUploadProps } from "./FileUpload.types";

function FileUpload(props: FileUploadProps): JSX.Element {
  const {
    type,
    mp4,
    mkv,
    webp,
    png,
    jpg,
    maximumFileSize,
    fileUploadSuccess = undefined,
    uploadFile,
  } = props;
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    // Trigger the hidden file input

    fileInputRef?.current?.click();
  };

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
    uploadFile(event.target.files[0]);
  };

  console.log("ddd", fileUploadSuccess);

  return (
    <div className={styles.frame}>
      <div className="text-base font-medium text-white900 ">
        {type === "" ? "" : "Upload"} {type}
      </div>
      <div className="flex place-content-center bg-white100 h-auto w-full text-center border border-black800 border-dashed rounded ">
        <div className="self-center space-y-4 py-4">
          <div className="text-black500">
            <div className="font-bold">Click to upload file</div>
            <div className="text-sm">
              ({mp4 ? "MP4," : ""}
              {mkv ? "MKV," : ""}
              {webp ? "WEB," : ""}
              {png ? "PNG," : ""} {jpg ? "JPG," : ""})
              <span className="font-bold text-xs">
                Max. File Size: {maximumFileSize}
              </span>
            </div>
          </div>
          <div className="w-full flex place-content-center self-center">
            <div className="w-[244px]">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />

              <div
                tabIndex={0}
                role="button"
                onKeyDown={handleClick}
                onClick={handleClick}
                className="w-full h-[40px] px-8 flex flex-row-reverse text-sm gap-x-1 place-content-center bg-maroon100 rounded-lg py-3 px-2"
              >
                <div className="self-center text-white">
                  {selectedFile ? selectedFile.name : "Browse File"}
                </div>
                <div className="self-center">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.83334 13.8334C11.1471 13.8334 13.8333 11.1471 13.8333 7.83337C13.8333 4.51967 11.1471 1.83337 7.83334 1.83337C4.51963 1.83337 1.83334 4.51967 1.83334 7.83337C1.83334 11.1471 4.51963 13.8334 7.83334 13.8334Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.12 14.2932C13.4733 15.3599 14.28 15.4666 14.9 14.5332C15.4666 13.6799 15.0933 12.9799 14.0666 12.9799C13.3066 12.9732 12.88 13.5666 13.12 14.2932Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
