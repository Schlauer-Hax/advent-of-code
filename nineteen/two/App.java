package com.hax.adventofcode.nineteen.two;

public class App {

    public static void main(String[] args) {
        new App().main();
    }

    public void main() {
        String input = "1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,13,1,19,1,10,19,23,1,6,23,27,1,5,27,31,1,10,31,35,2,10,35,39,1,39,5,43,2,43,6,47,2,9,47,51,1,51,5,55,1,5,55,59,2,10,59,63,1,5,63,67,1,67,10,71,2,6,71,75,2,6,75,79,1,5,79,83,2,6,83,87,2,13,87,91,1,91,6,95,2,13,95,99,1,99,5,103,2,103,10,107,1,9,107,111,1,111,6,115,1,115,2,119,1,119,10,0,99,2,14,0,0";
        String[] commands = input.split(",");

        commands[1] = "12";
        commands[2] = "2";

        String[] result = run(commands);

        System.out.println(String.join(",", result));
        System.out.println(result[0]);

        Integer number = 19690720;
        int i2 = 0;
        int i1 = 0;
        while (true) {
            int sum = i1*100+i2;
            commands = input.split(",");
            commands[1] = String.valueOf(i1);
            commands[2] = String.valueOf(i2);
            String[] bruhmoment = run(commands);
            if (bruhmoment[0].equals(number+"")) {
                System.out.println("You did it. You crazy son of a bitch, you did it.");
                System.out.println(i1*100+i2);
                return;
            } else {
                if (i2==99) {
                    if (i1==99) {
                        System.out.println("Wait what");
                        return;
                    } else {
                        i1++;
                        i2=0;
                    }
                } else i2++;
            }
        }
    }

    public String[] run(String[] commands) {
        for (int i =0; i<commands.length; i= i+4) {
            String command = commands[i];
            if (command.equals("99")) {
                break;
            }
            String firstnumber=commands[Integer.parseInt(commands[i+1])];
            String secondnumber=commands[Integer.parseInt(commands[i+2])];
            String savenumber = commands[i+3];

            if (command.equals("1")) {
                int sum = Integer.parseInt(firstnumber)+Integer.parseInt(secondnumber);
                commands[Integer.parseInt(savenumber)] = String.valueOf(sum);

            } else if (command.equals("2")) {
                int sum = Integer.parseInt(firstnumber)*Integer.parseInt(secondnumber);
                commands[Integer.parseInt(savenumber)] = String.valueOf(sum);
            }

        }

        return commands;
    }

}