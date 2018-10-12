#include <stdio.h>

const int NUM_JOBS = 10;

struct Input {
  int arrival;
  int processTime;
  int due;
};

struct Result {
  int start;
  int finish;
  float flow;
  float delay;
};

Input input[NUM_JOBS] = {
  {-3, 9, 31},
  {-10, 5, 43},
  {0, 15, 50},
  {-12, 1, 16},
  {-2, 8, 54},
  {-3, 14, 42},
  {-14, 3, 1},
  {-8, 10, 22},
  {-3, 9, 39},
  {-2, 4, 34}
};

float getPDT(Input* jobs, int len) {
  printf("getPDT\n");

  return 0.0;
}

int main() {
  printf("Hello, world\n");

  getPDT(input, NUM_JOBS);

  return 0;
}
