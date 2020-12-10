package com.hax.adventofcode.solutions.S20;

import com.hax.adventofcode.core.Solution;

import java.util.ArrayList;
import java.util.Collections;

public class S2010 implements Solution {

    ArrayList<ArrayList<Integer>> correctLists = new ArrayList<>();

    @Override
    public void firstPart(String data, String[] lines) {
        ArrayList<Integer> sortedList = new ArrayList<>();
        sortedList.add(0);
        for (String line : lines) sortedList.add(Integer.parseInt(line));

        Collections.sort(sortedList);

        sortedList.add(sortedList.get(sortedList.size() - 1) + 3);

        int diff1 = 0;
        int diff3 = 0;
        for (int i = 0; i < sortedList.size(); i++) {
            if (i == 0) continue;
            int difference = sortedList.get(i) - sortedList.get(i - 1);
            if (difference == 1) diff1++;
            else if (difference == 3) diff3++;
        }
        System.out.println(diff1 * diff3);
    }

    @Override
    public void secondPart(String data, String[] lines) {
        ArrayList<Integer> sortedList = new ArrayList<>();
        sortedList.add(0);
        for (String line : lines) sortedList.add(Integer.parseInt(line));

        Collections.sort(sortedList);

        sortedList.add(sortedList.get(sortedList.size() - 1) + 3);

        long[] pathCount = new long[sortedList.size()];
        pathCount[0] = 1;
        // Goes thru the List skipping the first
        for (int i = 1; i < sortedList.size(); i++) {
            // Gets last 3
            for (int j = i - 3; j < i; j++) {
                if (j >= 0 && sortedList.get(i) - sortedList.get(j) <= 3) {
                    pathCount[i] += pathCount[j];
                }
            }
        }
        System.out.println(pathCount[pathCount.length - 1]);
    }
}
