package com.hax.adventofcode.solutions.S19;

import com.hax.adventofcode.Solution;

import java.util.ArrayList;
import java.util.Arrays;

public class S1905 implements Solution {


    public static Integer[] StringArrToIntArr(String[] s) {
        Integer[] result = new Integer[s.length];
        for (int i = 0; i < s.length; i++) {
            result[i] = Integer.parseInt(s[i].replace("\r\n", ""));
        }
        return result;
    }

    @Override
    public Object[] run(String content) {
        String[] split = content.split("\r\n");
        String code = split[0];

        return new Object[]{this.runCode(StringArrToIntArr(code.split(",")), 1), this.runCode(StringArrToIntArr(code.split(",")), 5)};
    }

    public Integer[] runCode(Integer[] originstructions, Integer input) {
        ArrayList<Integer> instructions = new ArrayList<>(Arrays.asList(originstructions.clone()));
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
                    instructions.set(instructions.get(i + 1), input);
                    i += 1;
                    break;

                case 4:
                    System.out.println(getRightInt(instruction, instructions, 0, i));
                    i += 1;
                    break;

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
        return instructions.toArray(Integer[]::new);
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
