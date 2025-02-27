export const uploadToS3 = async (formData: FormData, key: string) => {
  formData.append("key", key);

  const response = await fetch("/api/upload/s3", {
    method: "POST",
    body: formData,
  });

  const { Key } = await response.json();

  return {
    location: `https://liberum-bucket.s3.eu-west-3.amazonaws.com/${Key}`,
  };
};
