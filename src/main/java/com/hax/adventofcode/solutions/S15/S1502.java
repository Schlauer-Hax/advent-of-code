package com.hax.adventofcode.solutions.S15;

import com.hax.adventofcode.core.Solution;

import java.util.Arrays;
import java.util.Collections;

public class S1502 implements Solution {

    @Override
    public void firstPart(String data, String[] lines) {
        int sumsum = 0;
        for (String line : lines) {
            String[] dims = line.split("x"); // L, W, H
            int length = Integer.parseInt(dims[0]);
            int width = Integer.parseInt(dims[1]);
            int height = Integer.parseInt(dims[2]);
            int sum = 2 * length * width + 2 * width * height + 2 * height * length + Collections.min(Arrays.asList(length * width, width * height, height * length));
            sumsum += sum;
        }
        System.out.println(sumsum);
    }

    @Override
    public void secondPart(String data, String[] lines) {
        int sumsum = 0;
        for (String line : lines) {
            String[] dims = line.split("x"); // L, W, H
            int length = Integer.parseInt(dims[0]);
            int width = Integer.parseInt(dims[1]);
            int height = Integer.parseInt(dims[2]);
            Integer[] sorted = Arrays.asList(length, width, height).stream().sorted().toArray(Integer[]::new);
            int sum = sorted[0] * 2 + sorted[1] * 2 + length * width * height;
            sumsum += sum;
        }
        System.out.println(sumsum);
    }
}
