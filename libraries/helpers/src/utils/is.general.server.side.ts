export const isGeneralServerSide = () => {
  return !!process.env.IS_GENERAL;
};

// Product name for page titles: the white-label name when one is set
export const brandTitle = () => {
  return (
    (process.env.BRAND_NAME || '').replace(/[<>]/g, '').trim() ||
    (isGeneralServerSide() ? 'Postiz' : 'Gitroom')
  );
};
