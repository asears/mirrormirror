const wasmModule = './LightReflection.wasm';

(async () => {
  const { instance } = await WebAssembly.instantiateStreaming(fetch(wasmModule));
  const calculateReflection = instance.exports._CalculateReflection;

  const incidentX = 1.0;
  const incidentY = 1.0;
  const normalX = 0.0;
  const normalY = 1.0;

  const resultX = new Float64Array(1);
  const resultY = new Float64Array(1);

  const rxPtr = instance.exports._malloc(8);
  const ryPtr = instance.exports._malloc(8);

  instance.exports._memcpy(rxPtr, resultX.byteOffset, 8);
  instance.exports._memcpy(ryPtr, resultY.byteOffset, 8);

  calculateReflection(incidentX, incidentY, normalX, normalY, rxPtr, ryPtr);

  resultX[0] = instance.exports._getValue(rxPtr, 'double');
  resultY[0] = instance.exports._getValue(ryPtr, 'double');

  instance.exports._free(rxPtr);
  instance.exports._free(ryPtr);

  console.log('Reflected Ray:', resultX[0], resultY[0]);
})();
