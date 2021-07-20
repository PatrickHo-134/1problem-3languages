(ns aoc-2020.day5
  (:require [clojure.string :as s]))

(def boarding-passes (-> (slurp "/home/patrick/Documents/projects/1problem-3languages/day5_input.txt")
                         (s/split #"\n")))

;; PART 1

(defn go-to-row [row-range direction]
  (let [rear-idx  (- (count row-range) 1)]
    (cond
      (and (= \F direction) (= 2 (count row-range)))
      (first row-range)

      (and (= \B direction) (= 2 (count row-range)))
      (second row-range)

      (and (= \F direction) (< 2 (count row-range)))
      (->> row-range 
           (split-at (/ (+ rear-idx 1) 2))
           (first))
      
      (and (= \B direction) (< 2 (count row-range)))
      (->> row-range
           (split-at (/ (+ rear-idx 1) 2))
           (second)))))

(defn get-row-number [boarding-pass]
  (let [row-range  (range 0 128)
        directions (take 7 (vec boarding-pass))]
    (reduce go-to-row row-range directions)))

(defn go-to-seat [seat-range direction]
  (let [rear-idx  (- (count seat-range) 1)]
    (cond
      (and (= \L direction) (= 2 (count seat-range)))
      (first seat-range)

      (and (= \R direction) (= 2 (count seat-range)))
      (second seat-range)

      (and (= \L direction) (< 2 (count seat-range)))
      (->> seat-range
           (split-at (/ (+ rear-idx 1) 2))
           (first))

      (and (= \R direction) (< 2 (count seat-range)))
      (->> seat-range
           (split-at (/ (+ rear-idx 1) 2))
           (second)))))

(defn get-seat-number [boarding-pass]
  (let [seat-range (range 0 8)
        directions (take-last 3 (vec boarding-pass))]
    (reduce go-to-seat seat-range directions)))

(defn get-seat-id [boarding-pass]
  (let [row-number (get-row-number boarding-pass)
        seat-number (get-seat-number boarding-pass)]
    (+ (* row-number 8) seat-number)))

(apply max (map get-seat-id boarding-passes))
;; => 928

;; PART 2

(apply min (map get-seat-id boarding-passes))
;; => 91

(clojure.set/difference (set (range 91 929)) (set (sort (map get-seat-id boarding-passes))))
;; => #{610}
