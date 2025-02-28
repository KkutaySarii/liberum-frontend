export const formatAddress = (address: string) => {
  if (!address || typeof address !== "string") {
    return "";
  }

  return address.slice(0, 10) + "..." + address.slice(-8);
};
