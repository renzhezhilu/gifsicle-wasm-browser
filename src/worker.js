importScripts("gifsicle.js");
onmessage = function (e) {

  const main = async () => {
    let outputU8Data = await gifsicle(
      e.data
    ).catch((err) => {
      postMessage(err);
    });

    postMessage(outputU8Data);
  };
  main().catch((e) => {
    postMessage(null);
  });
};
