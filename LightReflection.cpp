#include <cstdlib>

extern "C" {
    void CalculateReflection(double ix, double iy, double nx, double ny, double* rx, double* ry) {
        double dotProduct = ix * nx + iy * ny;
        *rx = ix - 2 * dotProduct * nx;
        *ry = iy - 2 * dotProduct * ny;
    }

    void* _malloc(size_t size) {
        return malloc(size);
    }

    void _free(void* ptr) {
        free(ptr);
    }
}

int main() {
    // This main function is required for WebAssembly compilation.
    return 0;
}
