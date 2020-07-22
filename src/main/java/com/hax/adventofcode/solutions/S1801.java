package com.hax.adventofcode.solutions;

import com.hax.adventofcode.core.Solution;
import com.hax.adventofcode.core.Utils;

import java.util.ArrayList;

public class S1801 implements Solution {
    @Override
    public void run() {
        String content = Utils.getFileContent(this);

        int twicereachednumber = calc(content, 0, new ArrayList<>(), 0, false, 0);

        System.out.println(twicereachednumber);
    }

    public int calc(String content, int i, ArrayList<Integer> reachedNumbers, int twicereachednumber, boolean numberreachedtwice, int run) {
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
        if (run==0) {
            System.out.println(i);
        }
        if (!numberreachedtwice) return calc(content, i, reachedNumbers, twicereachednumber, numberreachedtwice, run+1);
        else return twicereachednumber;
    }
}
