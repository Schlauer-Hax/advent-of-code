package com.hax.adventofcode.solutions.S20;

import com.hax.adventofcode.Solution;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class S2007 implements Solution {

    int count = 0;

    @Override
    public Object firstPart(String data, String[] lines) {
        HashMap<String, ArrayList<String>> rules = new HashMap<>();
        for (String line : lines) {
            String[] bags = line.split(" contain ");
            String outerbag = bags[0];
            ArrayList<String> innerbags = new ArrayList<>(Arrays.asList(bags[1].replace(".", "").split(", ")));
            rules.put(outerbag, innerbags);
        }
        ArrayList<String> bags = new ArrayList<>();
        bags.add("shiny gold bags");
        checkbags(bags, rules);
        return bags.size() - 1;
    }

    public boolean checkbags(ArrayList<String> bags, HashMap<String, ArrayList<String>> rules) {
        count++;
        int before = bags.size();
        for (Map.Entry<String, ArrayList<String>> rule : rules.entrySet()) {
            for (String innerbag : rule.getValue()) {
                if (innerbag.endsWith("bag")) innerbag += "s";
                for (String bag : new ArrayList<>(bags))
                    if (innerbag.contains(bag) && !bags.contains(rule.getKey())) {
                        bags.add(rule.getKey() + (rule.getKey().endsWith("s") ? "" : "s"));
                    }
            }
        }
        int after = bags.size();
        System.out.println(count + " - " + bags.size());
        if (after > before) {
            return checkbags(bags, rules);
        } else {
            return true;
        }
    }

    @Override
    public Object secondPart(String data, String[] lines) {
        HashMap<String, ArrayList<String>> rules = new HashMap<>();
        for (String line : lines) {
            String[] bags = line.split(" contain ");
            String outerbag = bags[0];
            ArrayList<String> innerbags = new ArrayList<>(Arrays.asList(bags[1].replace(".", "").split(", ")));
            rules.put(outerbag, innerbags);
        }
        return sum(rules, "shiny gold bags") - 1;
    }

    public int sum(HashMap<String, ArrayList<String>> rules, String name) {
        ArrayList<String> innerbags = rules.get(name);
        int count = 1;
        for (String innerbag : innerbags) {
            if (!innerbag.startsWith("no"))
                count += sum(rules, innerbag.replace(innerbag.split(" ")[0] + " ", "") + (innerbag.endsWith("s") ? "" : "s")) * Integer.parseInt(innerbag.split(" ")[0]);
        }
        return count;
    }
}
