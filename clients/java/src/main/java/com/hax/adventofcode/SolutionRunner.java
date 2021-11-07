package com.hax.adventofcode;

import org.reflections.Reflections;
import org.reflections.scanners.Scanners;
import org.reflections.scanners.SubTypesScanner;

import java.util.Set;

public class SolutionRunner {

    Set<Class<? extends Solution>> classes;

    public SolutionRunner() {
        this.classes = getSolutionClasses();
    }

    public Set<Class<? extends Solution>> getSolutionClasses() {
        Reflections reflections = new Reflections(
                "com.hax.adventofcode.solutions", Scanners.SubTypes);
        Set<Class<? extends Solution>> classes = reflections.getSubTypesOf(Solution.class);
        return classes;
    }

    public String[] runClass(String name, String data) {
        for (Class<? extends Solution> clazz : classes) {
            if (clazz.getSimpleName().equals(name)) {
                try {
                    Solution solution = clazz.getDeclaredConstructor().newInstance();
                    data = data.replaceAll("\r", "");
                    String[] lines = data.split("\n");
                    {
                        Object[] result = solution.run(data);
                        if (result[0] != "") {
                            return new String[]{String.valueOf(result[0]), String.valueOf(result[1])};
                        }
                    }
                    {
                        Object[] result = solution.run(lines);
                        if (result[0]!="") {
                            return new String[]{String.valueOf(result[0]), String.valueOf(result[1])};
                        }
                    }
                    {
                        String firstresult = String.valueOf(solution.firstPart(data, lines));
                        String secondresult = String.valueOf(solution.secondPart(data, lines));
                        return new String[]{firstresult, secondresult};
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
        return null;
    }

}
