module.exports = function webmanifestLoader(source) {
  const callback = this.async();
  const manifest = JSON.parse(source);

  Promise.all(
    manifest.icons.map(async (icon) => {
      const newSrc = await this.importModule(icon.src);

      return {
        ...icon,
        src: newSrc,
      };
    })
  )
    .then((icons) => {
      callback(null, JSON.stringify({ ...manifest, icons }));
    })
    .catch((err) => {
      callback(err);
    });
};
