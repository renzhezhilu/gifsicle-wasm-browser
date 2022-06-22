importScripts("gifsicle.js");
onmessage = function (e) {
  const main = async () => {
    let outputU8Data = await gifsicle(
      e.data
    ).catch((_) => null);

    postMessage(outputU8Data);
  };
  main().catch((e) => {
    postMessage(null);
  });
};
