extern "C" {
    void CalculateReflection(double ix, double iy, double nx, double ny, double* rx, double* ry) {
        double dotProduct = ix * nx + iy * ny;
        *rx = ix - 2 * dotProduct * nx;
        *ry = iy - 2 * dotProduct * ny;
    }
}
