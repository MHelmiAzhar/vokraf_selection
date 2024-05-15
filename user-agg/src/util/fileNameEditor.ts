export const fileNameEditor = (req, file, cb) => {
  const fileNameSplit = file.originalname.split('.');
  const fileExt = fileNameSplit[fileNameSplit.length - 1];
  cb(null, `${Date.now()}.${fileExt}`);
};
