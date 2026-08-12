import path from "path";

const getDataUri = (file) => {
  const extName = path.extname(file.originalname);

  return {
    content: `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
    name: `${path.basename(file.originalname, extName)}${extName}`,
  };
};

export default getDataUri;
