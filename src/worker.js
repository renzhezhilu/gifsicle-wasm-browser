
(function () {
  importScripts("gifsicle.js");
  // console.log(gifsicle);
  onmessage = function (e) {
    const main = async () => {
      // let { inputFiles, command,folder } = e.data;
      // let buf = await fetch(url).then(file => file.arrayBuffer());
      let outputU8Data = await gifsicle(
        e.data
        // {
        // data: inputFiles,
        // command: command,
        // folder,
        // }
      ).catch((_) => null);

      postMessage(outputU8Data);
    };
    main().catch((e) => {
      postMessage(null);
    });
  };
})();
