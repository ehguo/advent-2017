/**
--- Day 3: Spiral Memory ---

You come across an experimental new kind of memory
stored on an infinite two-dimensional grid.

Each square on the grid is allocated in a spiral pattern starting
at a location marked 1 and then counting up while spiraling outward.
For example, the first few squares are allocated like this:

65  64  63  62  61  60  59  58  57
66  37  36  35  34  33  32  31  56
67  38  17  16  15  14  13  30  55
68  39  18   5   4   3  12  29  54
69  40  19   6   1   2  11  28  53
70  41  20   7   8   9  10  27  52
71  42  21  22  23  24  25  26  51
72  43  44  45  46  47  48  49  50
73  74  75  76  77  78  79  80  81

While this is very space-efficient (no squares are skipped),
requested data must be carried back to square 1
(the location of the only access port for this memory system)
by programs that can only move up, down, left, or right.
They always take the shortest path:
the Manhattan Distance between the location of the data and square 1.

For example:

Data from square 1 is carried 0 steps, since it's at the access port.
Data from square 12 is carried 3 steps, such as: down, left, left.
Data from square 23 is carried only 2 steps: up twice.
Data from square 1024 must be carried 31 steps.

How many steps are required to carry the data from the square identified in your puzzle input all the way to the access port?

 */

const input = 361527;

class SpiralMemory {
  constructor(input) {
    this.input = input;
  }

  get squareRoot() {
    return Math.sqrt(this.input)
  }

  get closestRoot() {
    return Math.round(this.squareRoot)
  }

  get inputIsSquare() {
    return this.squareRoot === this.closestRoot
  }

  get stepsToRoot() {
    return this.closestRoot - 1
  }

  get stepsToRootLayer() {
    return Math.floor(this.closestRoot / 2)
  }

  get inputSquareDifference() {
    const closestSquare = Math.pow(this.closestRoot, 2)
    return Math.abs(this.input - closestSquare)
  }

  get inputCloserToEvenSquare() {
    return this.closestRoot % 2 === 0
  }

  get inputGreaterThanClosestRoot() {
    return this.input > Math.pow(this.closestRoot, 2)
  }

  get distance() {
    if (this.inputIsSquare) return this.stepsToRoot

    // Closer to, and greater than even root
    if (this.inputCloserToEvenSquare && this.inputGreaterThanClosestRoot) {
      let steps = this.stepsToRoot + 1
      if (this.input === Math.pow(this.closestRoot, 2) + 1) return steps
      let remainingSteps = this.inputSquareDifference - 1
      let isSubtracting = true
      while (remainingSteps) {
        if (steps === this.stepsToRootLayer) isSubtracting = false
        isSubtracting ? steps-- : steps++
        remainingSteps--
      }
      return steps
    }

    // Closer to, but less than even root
    if (this.inputCloserToEvenSquare && !this.inputGreaterThanClosestRoot) {
      let steps = this.stepsToRoot
      let stepsToLayerSteps = this.stepsToRootLayer - 1
      let remainingSteps = this.inputSquareDifference
      let isSubtracting = true
      while (remainingSteps) {
        if (stepsToLayerSteps-- === 0) isSubtracting = false
        isSubtracting ? steps-- : steps++
        remainingSteps--
      }
      return steps
    }

    // Closer to, and greater than odd root
    if (!this.inputCloserToEvenSquare && this.inputGreaterThanClosestRoot) {
      let steps = this.stepsToRoot + 1
      if (this.input === Math.pow(this.closestRoot, 2) + 1) return steps
      let stepsToLayerSteps = this.stepsToRootLayer
      let remainingSteps = this.inputSquareDifference - 1
      let isSubtracting = true
      while (remainingSteps) {
        if (stepsToLayerSteps-- === 0) isSubtracting = false
        isSubtracting ? steps-- : steps++
        remainingSteps--
      }
      return steps
    }

    // Closer to, but less than odd root
    if (!this.inputCloserToEvenSquare && !this.inputGreaterThanClosestRoot) {
      let steps = this.stepsToRoot
      let stepsToLayerSteps = this.stepsToRootLayer
      let remainingSteps = this.inputSquareDifference
      let isSubtracting = true
      while (remainingSteps) {
        if (stepsToLayerSteps-- === 0) isSubtracting = false
        isSubtracting ? steps-- : steps++
        remainingSteps--
      }
      return steps
    }
  }
}

const spiralMemory = new SpiralMemory(input)
console.log(spiralMemory.distance)
