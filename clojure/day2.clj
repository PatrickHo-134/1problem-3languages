(ns aoc-2020.day2
  (:require [clojure.string :as s]))

(defn process-password-entry [entry]
  (let [[policy password]  (s/split entry #":")
        [frequencies char] (s/split policy #" ")
        [min max]          (-> frequencies
                               (s/split #"-")
                               (#(map read-string %)))]
    [[min max] char (s/trim password)]))

(def my-input (-> (slurp "/home/patrick/Documents/projects/1problem-3languages/day2_input.txt")
                  (s/split #"\n")
                  (#(map process-password-entry %))))

;; PART 1
(defn check-password 
  "Takes an password entry which can be explained in the following order:
  character policy, character in a password and the password.
  The character policy indicates required minimum and maximum occurence of the character in the given password.
  Return true if the occurence of the character greater or equal then the minimum value
  and equal or less than maximum value"
  [entry]
  (let [[frequencies char password] entry
        char-count                  (->> password
                                         (#(s/split % #""))
                                         (filter #(= char %))
                                         (count))]
    (and (<= (first frequencies) char-count)
         (>= (second frequencies) char-count))))

(->> my-input
     (map check-password)
     (filter true?)
     (count)) ; => 640

;; PART 2
(defn repeat-exactly-once? [entry]
  (let [[indexes char password] entry
        exist-at-position?      (fn [c s pos] (= c (str (nth s pos))))
        exist-at-indexes        (->> indexes
                                     ;; index of this problem begins with 1
                                     (map dec)
                                     (map #(exist-at-position? char password %)))]
    ;; need to check the result sequence doesn't contain all true values or all false values
    (and (not (every? true? exist-at-indexes))
         (not (every? false? exist-at-indexes)))))

(->> my-input
     (map repeat-exactly-once?)
     (filter true?)
     (count)) ; => 472