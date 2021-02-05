(ns aoc-2020.day3
  (:require [clojure.string :as s]))

(def my-map (-> (slurp "/home/patrick/Documents/projects/1problem-3languages/day3_input.txt")
                (s/split #"\n")))

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

(defn make-a-move! [coordinate]
  (let [new-x (+ (first coordinate) 3)
        new-y (inc (second coordinate))]
    [new-x new-y]))

(defn expand-map? [current-map coordinate]
  (let [max-x     (dec (count (first current-map)))
        current-x (first coordinate)]
    (> 3 (- max-x current-x))))

(let [coordinate    (atom [0 0])
      current-area  (atom my-map)
      count-tree    (atom 0)]
  (while (< (second @coordinate) (count @current-area))
    (print @coordinate)
    ;; (when (expand-map? @current-area @coordinate))
    ;; (swap! current-area expand-map! my-map)

    (swap! current-area expand-map! my-map)
    (reset! coordinate (make-a-move! @coordinate))
    (when (is-a-tree? @current-area @coordinate)
      (swap! count-tree inc)))
  @count-tree)