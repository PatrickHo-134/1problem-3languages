(ns aoc-2020.day4
  (:require [clojure.string :as s]))

(def passports (-> (slurp "D:/Program_files/Projects/hacker_rank/1problem-3languages/day4_input.txt")
                   (s/split #"\n")
                   (#(map (fn [s]
                            (if (not= s "\r")
                              (s/replace s "\r" "")
                              s))
                          %))
                   (#(reduce (fn [s1 s2] (str s1 " " s2)) "" %))
                   (s/split #"\r")
                   (#(map s/trim %))
                   (#(map (fn [s] (s/split s #" ")) %))))

