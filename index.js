const wasmModule = './LightReflection.wasm';

(async () => {
  const { instance } = await WebAssembly.instantiateStreaming(fetch(wasmModule));
  const calculateReflection = instance.exports._CalculateReflection;
  const malloc = instance.exports._malloc;
  const free = instance.exports._free;

  const incidentX = 1.0;
  const incidentY = 1.0;
  const normalX = 0.0;
  const normalY = 1.0;

  const resultX = new Float64Array(1);
  const resultY = new Float64Array(1);

  const rxPtr = malloc(8);
  const ryPtr = malloc(8);

  // Copy the memory from the result arrays to the allocated pointers
  new Uint8Array(instance.exports.memory.buffer).set(new Uint8Array(resultX.buffer), rxPtr);
  new Uint8Array(instance.exports.memory.buffer).set(new Uint8Array(resultY.buffer), ryPtr);

  calculateReflection(incidentX, incidentY, normalX, normalY, rxPtr, ryPtr);

  resultX[0] = new Float64Array(instance.exports.memory.buffer, rxPtr, 1)[0];
  resultY[0] = new Float64Array(instance.exports.memory.buffer, ryPtr, 1)[0];

  free(rxPtr);
  free(ryPtr);

  console.log('Reflected Ray:', resultX[0], resultY[0]);
})();
