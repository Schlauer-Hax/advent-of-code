package com.hax.adventofcode.solutions;

import com.hax.adventofcode.core.Solution;
import com.hax.adventofcode.core.Utils;

public class S1902 implements Solution {


    @Override
    public void run() {

        String input = Utils.getFileContent(this);
        String[] commands = input.split(",");

        commands[1] = "12";
        commands[2] = "2";

        String[] result = runcommands(commands);

        System.out.println(String.join(",", result));
        System.out.println(result[0]);

        Integer number = 19690720;
        int i2 = 0;
        int i1 = 0;
        while (true) {
            commands = input.split(",");
            commands[1] = String.valueOf(i1);
            commands[2] = String.valueOf(i2);
            String[] bruhmoment = runcommands(commands);
            if (bruhmoment[0].equals(number + "")) {
                System.out.println("You did it. You crazy son of a bitch, you did it.");
                System.out.println(i1 * 100 + i2);
                return;
            } else {
                if (i2 == 99) {
                    if (i1 == 99) {
                        System.out.println("Wait what");
                        return;
                    } else {
                        i1++;
                        i2 = 0;
                    }
                } else i2++;
            }
        }
    }


    public String[] runcommands(String[] commands) {
        for (int i = 0; i < commands.length; i = i + 4) {
            String command = commands[i];
            if (command.equals("99")) {
                break;
            }
            String firstnumber = commands[Integer.parseInt(commands[i + 1])];
            String secondnumber = commands[Integer.parseInt(commands[i + 2])];
            String savenumber = commands[i + 3];

            if (command.equals("1")) {
                int sum = Integer.parseInt(firstnumber) + Integer.parseInt(secondnumber);
                commands[Integer.parseInt(savenumber)] = String.valueOf(sum);

            } else if (command.equals("2")) {
                int sum = Integer.parseInt(firstnumber) * Integer.parseInt(secondnumber);
                commands[Integer.parseInt(savenumber)] = String.valueOf(sum);
            }

        }

        return commands;
    }
}
