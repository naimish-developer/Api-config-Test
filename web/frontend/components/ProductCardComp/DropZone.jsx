import {
  DropZone,
  LegacyStack,
  Thumbnail,
  Banner,
  List,
  Text,
  Icon,
} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import { CancelMajor } from "@shopify/polaris-icons";
export default function DropZoneWithImageFileUpload({media}) {


  const [files, setFiles] = useState([...media]);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const hasError = rejectedFiles.length > 0;

  const handleDrop = useCallback(
    (_droppedFiles, acceptedFiles, rejectedFiles) => {
      setFiles((files) => [...files, ...acceptedFiles]);
      setRejectedFiles(rejectedFiles);
    },
    [],
  );
  const removeImghendler=(e,src)=>{
    e.stopPropagation();
    const newsrc=files.filter(val=>( val.src || val.name) !== src);
   setFiles(newsrc)
  }

  const fileUpload = !files.length && <DropZone.FileUpload />;
  
  const uploadedFiles = files.length > 0 && (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      {files.map((file, index) => (
        <>
          <div style={{ position: "relative" }}>
            <img
              src={file.src || window.URL.createObjectURL(file)}
              alt={file.name}
              style={{
                height: "100px",
                width: "100px",
                objectFit: "cover",
              }}
            />
            <button
            onClick={(e)=>removeImghendler(e, file.src || file.name)}
              style={{
                zIndex:10,
                position: "absolute",
                background: "whit",
                border: "none",
                borderRadius: "50%",
                padding: "3px",
                left: "2px",
                top: "2px",
                cursor: "pointer",
              }}
            >
              <Icon source={CancelMajor} color="base" />
            </button>
          </div>
        </>
      ))}
    </div>
  );

  const errorMessage = hasError && (
    <Banner
      title="The following images couldn’t be uploaded:"
      status="critical"
    >
      <List type="bullet">
        {rejectedFiles.map((file, index) => (
          <List.Item key={index}>
            {`"${file.name}" is not supported. File type must be .gif, .jpg, .png or .svg.`}
          </List.Item>
        ))}
      </List>
    </Banner>
  );
  return (
    <LegacyStack vertical>
      {errorMessage}
      <DropZone accept="image/*" type="image" onDrop={handleDrop}>
        <div style={{ margin: "5px" }}>
        {uploadedFiles}

        </div>
        {fileUpload}
      </DropZone>
    </LegacyStack>
  );
}