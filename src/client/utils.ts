export const convertToBYTEA = (imageFile: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(imageFile);
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const byteArray = new Uint8Array(arrayBuffer);
      resolve(byteArray); // Resolve the Promise with the byteArray
    };
    reader.onerror = (error) => {
      reject(error); // Reject the Promise if an error occurs during reading
    };
  });
};

export function shortenUUID(id: string | undefined) {
  if (id) {
    return id.split("-")[0];
  }
  return "";
}
