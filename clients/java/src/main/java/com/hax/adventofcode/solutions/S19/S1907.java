package com.hax.adventofcode.solutions.S19;

import com.hax.adventofcode.Solution;

import java.util.ArrayList;
import java.util.Arrays;

public class S1907 implements Solution {
    public static Integer[] StringArrToIntArr(String[] s) {
        Integer[] result = new Integer[s.length];
        for (int i = 0; i < s.length; i++) {
            result[i] = Integer.parseInt(s[i].replace("\r\n", "").replace("\n", ""));
        }
        return result;
    }

    @Override
    public Object[] run(String content) {
        String[] split = content.split("\r\n");
        String code = split[0];

        int biggestpower = 0;
        String modes = "";
        for (int mode1 = 0; mode1 < 5; mode1++) {
            for (int mode2 = 0; mode2 < 5; mode2++) {
                if (mode1 != mode2)
                    for (int mode3 = 0; mode3 < 5; mode3++) {
                        if (mode3 != mode2 && mode3 != mode1)
                            for (int mode4 = 0; mode4 < 5; mode4++) {
                                if (mode4 != mode3 && mode4 != mode2 && mode4 != mode1)
                                    for (int mode5 = 0; mode5 < 5; mode5++) {
                                        if (mode1 != mode5 && mode2 != mode5 && mode3 != mode5 && mode4 != mode5) {
                                            int result1 = this.runCode(StringArrToIntArr(code.split(",")), mode1, 0);
                                            int result2 = this.runCode(StringArrToIntArr(code.split(",")), mode2, result1);
                                            int result3 = this.runCode(StringArrToIntArr(code.split(",")), mode3, result2);
                                            int result4 = this.runCode(StringArrToIntArr(code.split(",")), mode4, result3);
                                            int result5 = this.runCode(StringArrToIntArr(code.split(",")), mode5, result4);

                                            if (biggestpower < result5) {
                                                biggestpower = result5;
                                                modes = String.format("%d %d %d %d %d", mode1, mode2, mode3, mode4, mode5);
                                            }
                                        }
                                    }
                            }
                    }
            }
        }
        System.out.println(biggestpower);
        System.out.println(modes);
        // TODO: Part 2
        return new Object[]{biggestpower, null};
    }

    // Int code Computer
    public int runCode(Integer[] originstructions, Integer input, Integer input2) {
        ArrayList<Integer> instructions = new ArrayList<>(Arrays.asList(originstructions.clone()));
        int inputcount = 0;
        forloop:
        for (int i = 0; i < instructions.size(); i++) {
            Integer instruction = instructions.get(i);
            String instructionstring = instruction.toString();
            Integer switchint;
            if (instruction.toString().length() > 1)
                switchint = Integer.parseInt(instructionstring.substring(instructionstring.length() - 2));
            else
                switchint = instruction;

            switch (switchint) {

                case 1:
                    instructions.set(instructions.get(i + 3),
                            getRightInt(instruction, instructions, 0, i)
                                    + getRightInt(instruction, instructions, 1, i));
                    i += 3;
                    break;

                case 2:
                    instructions.set(instructions.get(i + 3),
                            getRightInt(instruction, instructions, 0, i)
                                    * getRightInt(instruction, instructions, 1, i));
                    i += 3;
                    break;

                case 3:
                    if (inputcount == 0) {
                        instructions.set(instructions.get(i + 1), input);
                        inputcount++;
                    } else instructions.set(instructions.get(i + 1), input2);
                    i += 1;
                    break;

                case 4:
                    return getRightInt(instruction, instructions, 0, i);

                case 5:
                    if (getRightInt(instruction, instructions, 0, i) != 0) {
                        i = getRightInt(instruction, instructions, 1, i) - 3;
                    }
                    i += 2;
                    break;

                case 6:
                    if (getRightInt(instruction, instructions, 0, i) == 0) {
                        i = getRightInt(instruction, instructions, 1, i) - 3;
                    }
                    i += 2;
                    break;

                case 7:
                    if (getRightInt(instruction, instructions, 0, i) < getRightInt(instruction, instructions, 1, i)) {
                        instructions.set(instructions.get(i + 3), 1);
                    } else instructions.set(instructions.get(i + 3), 0);
                    i += 3;
                    break;

                case 8:
                    if (getRightInt(instruction, instructions, 0, i) == getRightInt(instruction, instructions, 1, i)) {
                        instructions.set(instructions.get(i + 3), 1);
                    } else instructions.set(instructions.get(i + 3), 0);
                    i += 3;
                    break;

                case 99:
                    break forloop;

                default:
                    System.err.println("Something went wrong");
                    System.err.println(i);
                    System.err.println(switchint);
                    System.err.println(instructions);
                    System.err.println(Arrays.toString(originstructions));
                    System.exit(1);
                    break;
            }
        }
        return 0;
    }

    public Integer getMode(Integer instruction, Integer arg) {
        String instructionstring = instruction.toString();
        if (instructionstring.length() - 3 - arg >= 0)
            return Integer.parseInt(instructionstring.substring(instructionstring.length() - 3 - arg, instructionstring.length() - 2 - arg));
        else
            return 0;
    }

    public int returnbasedonmode(Integer mode, Integer positionmode, Integer immediatemode) {
        return mode == 0 ? positionmode : immediatemode;
    }

    public int getRightInt(Integer instruction, ArrayList<Integer> instructions, Integer arg, Integer i) {
        return instructions.get(returnbasedonmode(getMode(instruction, arg), instructions.get(i + arg + 1), i + arg + 1));
    }
}
