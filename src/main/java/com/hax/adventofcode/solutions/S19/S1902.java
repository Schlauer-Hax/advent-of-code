package com.hax.adventofcode.solutions.S19;

import com.hax.adventofcode.core.Solution;
import com.hax.adventofcode.core.Utils;

public class S1902 implements Solution {


    public static Integer[] StringArrToIntArr(String[] s) {
        Integer[] result = new Integer[s.length];
        for (int i = 0; i < s.length; i++) {
            result[i] = Integer.parseInt(s[i].replace("\r\n", ""));
        }
        return result;
    }

    @Override
    public void run() {
        String code = Utils.getFileContent(this);
        String[] instructions = code.split(",");
        System.out.println(this.runCode(StringArrToIntArr(instructions))[0]);

        for (int i1 = 0; i1 <= 99; i1++) {
            for (int i2 = 0; i2 <= 99; i2++) {
                Integer[] editedinstructions = StringArrToIntArr(instructions.clone());
                editedinstructions[1] = i1;
                editedinstructions[2] = i2;
                Integer[] result = this.runCode(editedinstructions);
                if (result[0] == 19690720) {
                    System.out.println(100 * i1 + i2);
                    System.exit(0);
                }
            }
        }
    }

    public Integer[] runCode(Integer[] instructions) {
        forloop:
        for (int i = 0; i < instructions.length; i++) {
            Integer instruction = instructions[i];
            switch (instruction) {

                case 1:
                    instructions[instructions[i + 3]] = instructions[instructions[i + 1]] + instructions[instructions[i + 2]];
                    i += 3;
                    break;

                case 2:
                    instructions[instructions[i + 3]] = instructions[instructions[i + 1]] * instructions[instructions[i + 2]];
                    i += 3;
                    break;

                case 99:
                    break forloop;

                default:
                    System.err.println("Something went wrong");
                    System.exit(1);
                    break;
            }
        }
        return instructions;
    }

}
