export default defineEventHandler(async (event) => {
  console.log(process.env.R2_ACCOUNT_ID);
  console.log(process.env.R2_ACCESS_KEY_ID);
  console.log(process.env.R2_SECRET_ACCESS_KEY);
  console.log(process.env.R2_BUCKET_NAME);
  const { cloudflare } = event.context;

  const filename = `file-${Date.now()}.txt`;
  const content = `Merhaba! Sistem saati: ${new Date().toISOString()}`;

  await cloudflare.env.directus_uploads.put(filename, content);
  await cloudflare.env.NITRO_CACHE.put("test", content);

  useStorage("cache").setItem("test2", content);

  return {
    message: "Dosya yüklendi!",
    filename,
    url: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${process.env.R2_BUCKET_NAME}/${filename}`,
  };
});
