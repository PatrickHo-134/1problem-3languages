(ns aoc-2020.day1
  (:require [clojure.string :as s]))

(def my-input (-> (slurp "/home/patrick/Documents/projects/1problem-3languages/day1_input.txt")
                  (s/split #"\n")))

(def sorted-input (->> my-input
                       (map #(Integer. %))
                       (sort)))

(defn binary-search [coll item]
  (let [first-idx   (atom 0)
        last-idx    (atom (- (count coll) 1))
        current-idx (atom -1)]

    (while (and (<= @first-idx @last-idx)
                (= @current-idx -1))
      (let [middle-idx   (int (/ (+ @first-idx @last-idx) 2))
            middle-value (nth coll middle-idx)]
        (cond
          (= middle-value item)
          (reset! current-idx middle-idx)

          (> middle-value item)
          (reset! last-idx (- middle-idx 1))

          (< middle-value item)
          (reset! first-idx (+ middle-idx 1)))))

    @current-idx))

;; PART 1
(defn find-value-pair-by-sum [coll sum]
  (let [sorted-input (sort coll)
        result       (atom [])]
    (doseq [idx (range (- (count sorted-input) 2))]
      (let [item           (nth sorted-input idx)
            target-value   (- sum item)

            list-to-search (drop (+ idx 1) sorted-input)
            target-idx     (binary-search list-to-search target-value)]
        (when-not (= target-idx -1)
          (let [found-item (nth list-to-search target-idx)]
            (reset! result [item found-item])))))
    @result))

(let [result (find-value-pair-by-sum sorted-input 2020)]
  (apply * result))

;; PART 2
(defn find-trio-by-sum [coll sum]
  (let [result       (atom [])]
    (doseq [idx (range (- (count coll) 2))]
      (let [item         (nth coll idx)
            target-value (- sum item)

            pair         (find-value-pair-by-sum coll target-value)]
        (when (seq pair)
          (let [trio (conj pair item)]
            (reset! result trio)))))
    @result))

(let [result (find-trio-by-sum sorted-input 2020)]
  (apply * result))