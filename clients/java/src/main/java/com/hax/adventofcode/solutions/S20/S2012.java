package com.hax.adventofcode.solutions.S20;

import com.hax.adventofcode.Solution;

public class S2012 implements Solution {

    @Override
    public Object firstPart(String data, String[] lines) {
        int direction = 90;
        int heigth = 0;
        int length = 0;

        for (String line : lines) {
            int number = Integer.parseInt(line.replace(line.substring(0, 1), ""));
            switch (line.split("")[0]) {
                case "N":
                    heigth += number;
                    break;
                case "S":
                    heigth -= number;
                    break;

                case "E":
                    length += number;
                    break;
                case "W":
                    length -= number;
                    break;

                case "R":
                    direction += number;
                    if (direction >= 360) direction -= 360;
                    break;

                case "L":
                    direction -= number;
                    if (direction < 0) direction += 360;
                    break;

                case "F":
                    if (direction == 90) length += number;
                    if (direction == 180) heigth -= number;
                    if (direction == 270) length -= number;
                    if (direction == 0) heigth += number;
                    break;
            }
        }

        return Math.abs(heigth) + Math.abs(length);
    }

    @Override
    public Object secondPart(String data, String[] lines) {
        int heigth = 1;
        int shipheigth = 0;
        int length = 10;
        int shiplength = 0;


        for (String line : lines) {
            int number = Integer.parseInt(line.replace(line.substring(0, 1), ""));
            switch (line.split("")[0]) {
                case "N":
                    heigth += number;
                    break;
                case "S":
                    heigth -= number;
                    break;

                case "E":
                    length += number;
                    break;
                case "W":
                    length -= number;
                    break;

                case "R":
                    for (int i = 0; i < number / 90; i++) {
                        int tmp = heigth;
                        heigth = length * -1;
                        length = tmp;
                    }
                    break;

                case "L":
                    for (int i = 0; i < number / 90; i++) {
                        int tmp = length;
                        length = heigth * -1;
                        heigth = tmp;
                    }
                    break;

                case "F":
                    shipheigth += heigth * number;
                    shiplength += length * number;
                    break;
            }
        }

        return Math.abs(shipheigth) + Math.abs(shiplength);
    }
}
