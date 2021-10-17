package com.hax.adventofcode.solutions.S20;

import com.hax.adventofcode.Solution;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class S2004 implements Solution {

    @Override
    public Object firstPart(String data, String[] lines) {
        int count = 0;
        String[] batches = data.split("\n\n");
        for (String batch : batches) {
            List<String> neededfields =
                    new ArrayList<>(Arrays.asList("byr", "iyr",
                            "eyr", "hgt", "hcl", "ecl", "pid"));
            String[] infos = batch.replace("\n", " ")
                    .split(" ");
            for (String info : infos) {
                neededfields.remove(info.split(":")[0]);
            }
            if (neededfields.size() == 0)
                count++;
        }
        return count;
    }

    @Override
    public Object secondPart(String data, String[] lines) {
        int count = 0;
        String[] batches = data.split("\n\n");
        for (String batch : batches) {
            List<String> neededfields =
                    new ArrayList<>(Arrays.asList("byr", "iyr",
                            "eyr", "hgt", "hcl", "ecl", "pid"));
            String[] infos = batch.replace("\n", " ")
                    .split(" ");
            for (String info : infos) {
                if (isValid(info))
                    neededfields.remove(info.split(":")[0]);
            }
            if (neededfields.size() == 0)
                count++;
        }
        return count;
    }

    public boolean isValid(String info) {
        String[] split = info.split(":");
        switch (split[0]) {
            case "byr": {
                int yr = Integer.parseInt(split[1]);
                return yr >= 1920 && yr <= 2002;
            }

            case "iyr": {
                int yr = Integer.parseInt(split[1]);
                return yr >= 2010 && yr <= 2020;
            }

            case "eyr": {
                int yr = Integer.parseInt(split[1]);
                return yr >= 2020 && yr <= 2030;
            }

            case "hgt": {
                if (split[1].endsWith("cm")) {
                    int number = Integer.parseInt(
                            split[1].replace("cm", ""));
                    return number >= 150 && number <= 193;
                }
                if (split[1].endsWith("in")) {
                    int number = Integer.parseInt(
                            split[1].replace("in", ""));
                    return number >= 59 && number <= 76;
                }
                return false;
            }

            case "hcl": {
                return split[1].matches("^#[0-9a-f]+");
            }

            case "ecl": {
                String[] colors = {"amb", "blu", "brn", "gry", "grn"
                        , "hzl", "oth"};
                return Arrays.asList(colors).contains(split[1]);
            }

            case "pid": {
                return split[1].matches("([0-9]{9})+");
            }

        }
        return false;
    }
}
