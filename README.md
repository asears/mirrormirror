# mirrormirror

reflecting on WASM

Installing emscripten sdk

<https://gist.github.com/marcusbelcher/fc9b831bd9e6384799ed6505552ca44b>

Conversion of C++ to Javascript and wasm binary.

`emcc LightReflection.cpp -o LightReflection.js -s EXPORTED_FUNCTIONS="['_CalculateReflection', "_free", "_malloc"]" -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' -o LightReflection.wasm`

<https://github.com/emscripten-core/emscripten/blob/main/ChangeLog.md#3131---012623>
