package com.hax.adventofcode.solutions.S15;

import com.hax.adventofcode.core.Solution;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class S1504 implements Solution {

    private static final char[] HEX_DIGITS = "0123456789ABCDEF".toCharArray();
    long firstresult = 0;
    long secondresult = 0;

    public static String toHex(byte[] data) {
        char[] chars = new char[data.length * 2];
        for (int i = 0; i < data.length; i++) {
            chars[i * 2] = HEX_DIGITS[(data[i] >> 4) & 0xf];
            chars[i * 2 + 1] = HEX_DIGITS[data[i] & 0xf];
        }
        return new String(chars);
    }

    @Override
    public void firstPart(String key, String[] lines) {
        long i = 0;
        while (true) {
            try {
                String yourString = key + i;
                byte[] bytesOfMessage = yourString.getBytes("UTF-8");

                MessageDigest md = MessageDigest.getInstance("MD5");
                byte[] thedigest = md.digest(bytesOfMessage);
                String hashtext = toHex(thedigest);
                System.out.println(i + " - " + hashtext);
                if (hashtext.startsWith("00000")) {
                    firstresult = i;
                    return;
                }
                i++;
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void secondPart(String key, String[] lines) {
        long i = 0;
        while (true) {
            try {
                String yourString = key + i;
                byte[] bytesOfMessage = yourString.getBytes("UTF-8");

                MessageDigest md = MessageDigest.getInstance("MD5");
                byte[] thedigest = md.digest(bytesOfMessage);
                String hashtext = toHex(thedigest);
                System.out.println(i + " - " + hashtext);
                if (hashtext.startsWith("000000")) {
                    secondresult = i;
                    return;
                }
                i++;
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void end() {
        System.out.println(firstresult);
        System.out.println(secondresult);
    }
}
