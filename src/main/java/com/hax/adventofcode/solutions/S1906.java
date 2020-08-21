package com.hax.adventofcode.solutions;

import com.hax.adventofcode.core.Solution;
import com.hax.adventofcode.core.Utils;

import java.util.ArrayList;
import java.util.List;

public class S1906 implements Solution {
    @Override
    public void run() {
        String content = Utils.getFileContent(this);
        String[] lines = content.split("\n");
        ArrayList<Orbit> orbits = new ArrayList<>();
        for (String line : lines) {
            String[] split = line.split("\\)");
            String orbit1name = split[0].replace("\r", "");
            String orbit2name = split[1].replace("\r", "");
            Orbit orbit1 = getOrbit(orbit1name, orbits);

            if (orbit1==null) {
                Orbit neworbit = new Orbit(orbit1name);
                orbit1 = neworbit;
                orbits.add(neworbit);
            }

            Orbit orbit2 = getOrbit(orbit2name, orbits);

            if (orbit2==null) {
                Orbit neworbit = new Orbit(orbit2name);
                orbit2 = neworbit;
                orbits.add(neworbit);
            }

            orbit2.setDirectobit(orbit1);
        }

        for (Orbit orbit : orbits) {
            if (orbit.getDirectobit()!=null)
                addDirectOrbitstoIndirect(orbit, orbit.getDirectobit());
        }

        int count = 0;
        for (Orbit orbit : orbits) {
            if (orbit.getDirectobit()!=null) count++;
            count+=orbit.getIndirectobits().size();
        }

        System.out.println(count);

        Orbit you = getOrbit("YOU", orbits);

        search(you, orbits, new ArrayList<>());

    }

    public void search(Orbit orbit, List<Orbit> orbits, List<Orbit> scannedorbits) {
        scannedorbits.add(orbit);
        for (Orbit behindorbit : getBehindOrbits(orbit, orbits)) {
            if (behindorbit.getName().equals("SAN")) {
                processfound(scannedorbits);
                System.exit(0);
            }
            if (!scannedorbits.contains(behindorbit))
                search(behindorbit, orbits, scannedorbits);
        }

        if (orbit.getDirectobit()!=null)
            search(orbit.getDirectobit(), orbits, scannedorbits);
    }

    public void processfound(List<Orbit> scannedorbits) {
        ArrayList<String> names = new ArrayList<>();
        for (Orbit orbit : scannedorbits) {
            if (names.contains(orbit.getName())) {
                for (int i = names.size()-1; i>=0; i--) {
                    if (!names.get(i).equals(orbit.getName())) {
                        names.remove(i);
                    } else break;
                }
            } else
                names.add(orbit.getName());
        }
        System.out.println(names.size()-2);
    }

    public List<Orbit> getBehindOrbits(Orbit orbit, List<Orbit> orbits) {
        List<Orbit> behindorbits = new ArrayList<>();
        for (Orbit scanorbit : orbits) {
            if (scanorbit.getDirectobit()!=null) {
                if (scanorbit.getDirectobit().equals(orbit)) {
                    behindorbits.add(scanorbit);
                }
            }
        }
        return behindorbits;
    }

    public Orbit addDirectOrbitstoIndirect(Orbit addorbit, Orbit orbit) {
        if (orbit.getDirectobit()==null) return addorbit;
        addorbit.addIndirectobit(orbit.getDirectobit());
        return addDirectOrbitstoIndirect(addorbit, orbit.getDirectobit());
    }

    public Orbit getOrbit(String name, List<Orbit> orbits) {
        for (Orbit orbit : orbits) {
            if (orbit.getName().equals(name)) return orbit;
        }
        return null;
    }

    public class Orbit {
        Orbit directobit;
        List<Orbit> indirectobits;

        String name;

        public Orbit(String name) {
            this.indirectobits = new ArrayList<>();
            this.name = name;
        }

        public Orbit getDirectobit() {
            return directobit;
        }

        public void setDirectobit(Orbit directobit) {
            this.directobit = directobit;
        }

        public List<Orbit> getIndirectobits() {
            return indirectobits;
        }

        public void setIndirectobits(List<Orbit> indirectobits) {
            this.indirectobits = indirectobits;
        }

        public void addIndirectobit(Orbit indirectobit) {
            this.indirectobits.add(indirectobit);
        }

        public String getName() {
            return name;
        }
    }
}
