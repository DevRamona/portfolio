#include <stdio.h>
#include <math.h>

// Function to round the number
int roundNumber(float number) {
    return (int)(number + 0.5);
}

// Function to implement DDA Algorithm
void DDA(int x1, int y1, int x2, int y2) {
    // Calculate dx and dy
    int dx = x2 - x1;
    int dy = y2 - y1;

    // Calculate steps required for generating pixels
    int steps = abs(dx) > abs(dy) ? abs(dx) : abs(dy);

    // Calculate increment in x & y for each steps
    float xIncrement = dx / (float) steps;
    float yIncrement = dy / (float) steps;

    // Put pixel for each step
    float x = x1;
    float y = y1;
    for (int i = 0; i <= steps; i++) {
        printf("(%d, %d)\n", roundNumber(x), roundNumber(y));
        x += xIncrement;
        y += yIncrement;
    }
}

int main() {
    int x1, y1, x2, y2;

    // Example coordinates
    x1 = 2; y1 = 3;
    x2 = 14; y2 = 8;

    // Function call for DDA algorithm
    DDA(x1, y1, x2, y2);

    return 0;
}