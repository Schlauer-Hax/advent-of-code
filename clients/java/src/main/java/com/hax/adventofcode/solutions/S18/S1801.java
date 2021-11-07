package com.hax.adventofcode.solutions.S18;

import com.hax.adventofcode.Solution;

import java.util.ArrayList;

public class S1801 implements Solution {

    @Override
    public Object[] run(String content) {
        int[] solutions = calc(content, 0, new ArrayList<>(), 0, false, 0, 0);
        return new Object[]{solutions[0], solutions[1]};
    }

    public int[] calc(String content, int i, ArrayList<Integer> reachedNumbers, int twicereachednumber, boolean numberreachedtwice, int run, int firstsolution) {
        for (String nextString : content.split("\n")) {
            i += Integer.parseInt(nextString);
            if (reachedNumbers.contains(i)) {
                if (!numberreachedtwice) {
                    twicereachednumber = i;
                    numberreachedtwice = true;
                }
            }
            reachedNumbers.add(i);
        }
        if (run == 0 && firstsolution == 0) {
            firstsolution = i;
        }
        if (!numberreachedtwice)
            return calc(content, i, reachedNumbers, twicereachednumber, numberreachedtwice, run + 1, firstsolution);
        else return new int[]{firstsolution, twicereachednumber};
    }
}
