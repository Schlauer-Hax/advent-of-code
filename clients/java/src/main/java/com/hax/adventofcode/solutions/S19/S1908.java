package com.hax.adventofcode.solutions.S19;

import com.hax.adventofcode.Solution;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Base64;

public class S1908 implements Solution {
    @Override
    public Object[] run(String[] content) {
        String picture = content[0];
        Integer wide = Integer.parseInt(content[1]);
        Integer tall = Integer.parseInt(content[2]);

        int pixels = wide * tall;

        ArrayList<String> layers = new ArrayList<>();
        for (int i = 0; i < picture.length(); i += pixels) {
            layers.add(picture.substring(i, i + pixels));
        }

        int zeros = 99999999;
        String fewstlayer = "";
        for (String layer : layers) {
            int zeroslayer = 0;
            for (char number : layer.toCharArray()) {
                if (String.valueOf(number).equals("0")) zeroslayer++;
            }

            if (zeros > zeroslayer) {
                zeros = zeroslayer;
                fewstlayer = layer;
            }
        }


        int ones = 0;
        int twos = 0;
        for (char number : fewstlayer.toCharArray()) {
            if (String.valueOf(number).equals("1")) ones++;
            if (String.valueOf(number).equals("2")) twos++;
        }

        StringBuilder image = new StringBuilder();
        for (int i = 0; i < fewstlayer.length(); i++) {
            image.append(getImageInt(i, 0, layers));
        }

        BufferedImage drawimage = new BufferedImage(wide, tall, Image.SCALE_DEFAULT);
        for (int i = 0; i < tall; i++) {
            for (int j = 0; j < wide; j++) {
                switch (Integer.parseInt(String.valueOf(image.toString().charAt(i * wide + j)))) {
                    case 1:
                        drawimage.setRGB(j, i, Color.WHITE.getRGB());
                        break;

                    case 0:
                        drawimage.setRGB(j, i, Color.BLACK.getRGB());
                        break;
                }
            }
        }
        try {
            ImageIO.write(drawimage, "png", new File("output.png"));
            System.out.println("image saved to output.png");
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            return new Object[]{ones * twos, new String(Base64.getEncoder().encode(Files.readAllBytes(new File("output.png").toPath())), "UTF-8")};
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }


    public String getImageInt(int i, int layer, ArrayList<String> layers) {
        if (layer < layers.size()) {
            String number = String.valueOf(layers.get(layer).charAt(i));
            switch (number) {
                case "0":
                    return "0";
                case "1":
                    return "1";
                case "2":
                    return getImageInt(i, layer + 1, layers);
            }
        }
        return "3";
    }
}
