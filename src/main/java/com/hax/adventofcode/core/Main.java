package com.hax.adventofcode.core;

import org.reflections.Reflections;
import org.reflections.scanners.SubTypesScanner;

import java.lang.reflect.InvocationTargetException;
import java.util.Scanner;
import java.util.Set;

public class Main {

    public static void main(String[] args) {
        Reflections reflections = new Reflections(
                "com.hax.adventofcode.solutions", new SubTypesScanner());
        Set<Class<? extends Solution>> classes = reflections.getSubTypesOf(Solution.class);


    }

    public void run(Set<Class<? extends Solution>> classes) {
        System.out.println("Please select the Solution you want to run");
        System.out.println("IDs are build like this: S<year><count>");
        System.out.println("An example for this would be: S1901");

        Scanner scanner = new Scanner(System.in);
        String id = scanner.next();

        for (Class<? extends Solution> clazz : classes) {
            if (clazz.getSimpleName().equals(id)) {
                try {
                    int returncode = clazz.getDeclaredConstructor().newInstance().run();
                } catch (InstantiationException e) {
                    e.printStackTrace();
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                } catch (InvocationTargetException e) {
                    e.printStackTrace();
                } catch (NoSuchMethodException e) {
                    e.printStackTrace();
                }
                run(classes);
            }
        }
    }

}
