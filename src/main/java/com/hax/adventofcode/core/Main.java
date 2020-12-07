package com.hax.adventofcode.core;

import org.reflections.Reflections;
import org.reflections.scanners.SubTypesScanner;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Scanner;
import java.util.Set;

public class Main {

    public static void main(String[] args) {
        Reflections reflections = new Reflections(
                "com.hax.adventofcode.solutions", new SubTypesScanner());
        Set<Class<? extends Solution>> classes = reflections.getSubTypesOf(Solution.class);

        new Main().run(classes);
    }

    public void run(Set<Class<? extends Solution>> classes) {
        String id = null;
        File debugFile = new File("DEBUG.txt");
        if (debugFile.exists()) {
            try {
                id = new String(Files.readAllBytes(debugFile.toPath())).replace("\r\n", "");
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        if (id == null) {
            System.out.println("Please select the Solution you want to run");
            System.out.println("IDs are build like this: S<year><count>");
            System.out.println("An example for this would be: S1901");

            Scanner scanner = new Scanner(System.in);
            id = scanner.next();
        }

        for (Class<? extends Solution> clazz : classes) {
            if (clazz.getSimpleName().equals(id)) {
                try {
                    Solution solution = clazz.getDeclaredConstructor().newInstance();
                    solution.run();
                    String data = Utils.getFileContent(solution);
                    data = data.replaceAll("\r", "");
                    String[] lines = data.split("\n");
                    System.out.println();
                    solution.firstPart(data, lines);
                    System.out.println();
                    solution.secondPart(data, lines);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }

}
