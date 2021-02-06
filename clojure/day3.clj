(ns aoc-2020.day3
  (:require [clojure.string :as s]))

(def my-map (-> (slurp "D:/Program_files/Projects/hacker_rank/1problem-3languages/day3_input.txt")
                (s/split #"\n")
                (#(map (fn [s] (s/replace s "\r" "")) %))))

(def levels (count my-map))

(defn expand-map! [current-area adding-area]
  (map str current-area adding-area))

(defn is-a-tree? [area-map coordinate]
  (let [x (first coordinate)
        y (second coordinate)
        position (-> area-map
                     (nth y)
                     (nth x)
                     (str))]
    (= position "#")))

(defn make-a-move! [coordinate slope]
  (let [step-right (first slope)
        step-down  (second slope)
        new-x (+ (first coordinate) step-right)
        new-y (+ (second coordinate) step-down)]
    [new-x new-y]))

(defn expand-map? [current-map coordinate slope]
  (let [max-x       (dec (count (first current-map)))
        current-x   (first coordinate)
        right-steps (first slope)]
    (< (- max-x current-x) right-steps)))

;; PART 1
(defn count-trees-on-path [area slope]
  (let [coordinate    (atom [0 0])
        current-area  (atom area)
        count-tree    (atom 0)]
    (while (< (second @coordinate) (dec (count @current-area)))
      (when (expand-map? @current-area @coordinate slope)
        (swap! current-area expand-map! area))

      (reset! coordinate (make-a-move! @coordinate slope))

      (when (is-a-tree? @current-area @coordinate)
        (swap! count-tree inc)))
    @count-tree))

(count-trees-on-path my-map [3 1])
;; => 203

;; PART 2
(def slopes [[1 1] [3 1] [5 1] [7 1] [1 2]])

(->> slopes
     (map #(count-trees-on-path my-map %))
     (apply *))
;; => 3316272960

