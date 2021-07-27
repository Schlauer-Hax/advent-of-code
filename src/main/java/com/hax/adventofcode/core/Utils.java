package com.hax.adventofcode.core;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

public class Utils {

    public static String getFileContent(Solution solution) {
        File file = new File("./data/" + solution.getClass().getSimpleName() + ".txt");
        if (!file.exists()) {
            System.err.println("File " + file.getName() + " not found!");
            return "";
        }
        try {
            System.out.println("Reading from " + file.getName());
            String content = new String(Files.readAllBytes(file.toPath()));
            System.out.println("Finished reading " + file.getName());
            return content;
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.err.println("Something went wrong");
        System.exit(1);
        return "";
    }

}
