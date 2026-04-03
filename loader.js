// module.loader.js — replaces the original getSource file
// Fetches split b64 parts from jsDelivr and reassembles them

window.getSource = async function() {
  const urls = [
    "https://cdn.jsdelivr.net/gh/therealkein/bltropr@latest/module.part1.js",
    "https://cdn.jsdelivr.net/gh/therealkein/bltropr@latest/module.part2.js",
    "https://cdn.jsdelivr.net/gh/therealkein/bltropr@latest/module.part3.js",
    "https://cdn.jsdelivr.net/gh/therealkein/bltropr@latest/module.part4.js",
    "https://cdn.jsdelivr.net/gh/therealkein/bltropr@latest/module.part5.js",
    "https://cdn.jsdelivr.net/gh/therealkein/bltropr@latest/module.part6.js",
    "https://cdn.jsdelivr.net/gh/therealkein/bltropr@latest/module.part7.js"
  ];

  console.log("Loading module parts...");
  const parts = await Promise.all(
    urls.map((url, i) =>
      fetch(url)
        .then(r => r.text())
        .then(src => {
          console.log(`Part ${i + 1}/${urls.length} loaded`);
          return src.replace(/^export default "/, '').replace(/";s*$/, '');
        })
    )
  );

  const b64 = parts.join('');
  console.log("Reassembled. Decoding...");

  const b=new Uint8Array(await (await fetch("data:application/zip;base64," + b64)).arrayBuffer());
  return b;
};
