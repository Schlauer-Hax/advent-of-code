package com.hax.adventofcode.solutions.S19;

import com.hax.adventofcode.Solution;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

public class S1903 implements Solution {
    @Override
    public Object[] run(String content) {
        String wire1 = content.split("\n")[0];
        String wire2 = content.split("\n")[1];

        ArrayList<Integer[]> intersections = getIntersections(getCoords(wire1.split(",")), getCoords(wire2.split(",")));
        Map.Entry<Integer, Integer[]> entry = getNearest(intersections);
        Map.Entry<Integer, Integer[]> entry2 = getShortest(intersections);
        return new Object[]{entry.getKey(), entry2.getKey()};
    }

    public Map.Entry<Integer, Integer[]> getNearest(ArrayList<Integer[]> intersections) {
        HashMap<Integer, Integer[]> distance = new HashMap<>();
        for (Integer[] intersection : intersections) {
            distance.put(Integer.parseInt(String.valueOf(intersection[0]).replace("-", "")) +
                    Integer.parseInt(String.valueOf(intersection[1]).replace("-", "")), intersection);
        }
        Map<Integer, Integer[]> sortedmap = new TreeMap<Integer, Integer[]>(distance);
        Map.Entry<Integer, Integer[]> entry = (Map.Entry<Integer, Integer[]>) sortedmap.entrySet().toArray()[0];

        return entry;
    }

    public Map.Entry<Integer, Integer[]> getShortest(ArrayList<Integer[]> intersections) {
        HashMap<Integer, Integer[]> distance = new HashMap<>();
        for (Integer[] intersection : intersections) {
            distance.put(intersection[2] + intersection[3], intersection);
        }
        Map<Integer, Integer[]> sortedmap = new TreeMap<Integer, Integer[]>(distance);
        Map.Entry<Integer, Integer[]> entry = (Map.Entry<Integer, Integer[]>) sortedmap.entrySet().toArray()[0];

        return entry;
    }

    public ArrayList<Integer[]> getIntersections(ArrayList<Integer[]> wire1, ArrayList<Integer[]> wire2) {
        ArrayList<Integer[]> intersections = new ArrayList<>();
        for (Integer[] coordlist : wire1) {
            for (Integer[] coordlist2 : wire2) {
                if (coordlist2[0].equals(coordlist[0]) && coordlist[1].equals(coordlist2[1])) {
                    intersections.add(new Integer[]{coordlist[0], coordlist[1], coordlist[2], coordlist2[2]});
                }
            }
        }
        return intersections;
    }

    public ArrayList<Integer[]> getCoords(String[] wiremoves) {
        ArrayList<Integer[]> coords = new ArrayList<Integer[]>();
        int posx = 0;
        int posy = 0;
        int steps = 1;
        for (String move : wiremoves) {
            if (move.startsWith("L")) {
                for (int i = 0; i < Integer.parseInt(move.replace("L", "")); i++) {
                    posx--;
                    coords.add(new Integer[]{posx, posy, steps});
                    steps++;
                }
            } else if (move.startsWith("R")) {
                for (int i = 0; i < Integer.parseInt(move.replace("R", "")); i++) {
                    posx++;
                    coords.add(new Integer[]{posx, posy, steps});
                    steps++;
                }
            } else if (move.startsWith("U")) {
                for (int i = 0; i < Integer.parseInt(move.replace("U", "")); i++) {
                    posy++;
                    coords.add(new Integer[]{posx, posy, steps});
                    steps++;
                }
            } else if (move.startsWith("D")) {
                for (int i = 0; i < Integer.parseInt(move.replace("D", "")); i++) {
                    posy--;
                    coords.add(new Integer[]{posx, posy, steps});
                    steps++;
                }
            }

        }
        return coords;
    }
}
