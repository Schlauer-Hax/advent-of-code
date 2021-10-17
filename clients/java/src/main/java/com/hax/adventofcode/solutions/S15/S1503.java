package com.hax.adventofcode.solutions.S15;

import com.hax.adventofcode.Solution;

import java.util.ArrayList;
import java.util.Arrays;

public class S1503 implements Solution {

    @Override
    public Object firstPart(String data, String[] lines) {
        ArrayList<Integer[]> visited = new ArrayList<>();
        Integer[] coords = new Integer[]{0, 0}; // X, Y
        for (String s : data.split("")) {
            switch (s) {
                case "^" -> {
                    coords[1] += 1;
                }

                case ">" -> {
                    coords[0] += 1;
                }

                case "v" -> {
                    coords[1] -= 1;
                }

                case "<" -> {
                    coords[0] -= 1;
                }
            }
            boolean add = true;
            for (Integer[] list : visited) {
                if (list[0].equals(coords[0]) && list[1].equals(coords[1])) {
                    add = false;
                }
            }
            if (add) visited.add(Arrays.copyOf(coords, 2));
        }
        return visited.size();
    }

    @Override
    public Object secondPart(String data, String[] lines) {
        ArrayList<Integer[]> visited = new ArrayList<>();
        Integer[] coords1 = new Integer[]{0, 0}; // X, Y
        Integer[] coords2 = new Integer[]{0, 0}; // X, Y
        for (int i = 0; i < data.split("").length; i++) {
            String s = data.split("")[i];
            Integer[] coords;
            if (i % 2 == 0) coords = coords1;
            else coords = coords2;
            switch (s) {
                case "^" -> {
                    coords[1] += 1;
                }

                case ">" -> {
                    coords[0] += 1;
                }

                case "v" -> {
                    coords[1] -= 1;
                }

                case "<" -> {
                    coords[0] -= 1;
                }
            }
            boolean add = true;
            for (Integer[] list : visited) {
                if (list[0].equals(coords[0]) && list[1].equals(coords[1])) {
                    add = false;
                }
            }
            if (add) visited.add(Arrays.copyOf(coords, 2));
        }
        return visited.size();
    }
}
