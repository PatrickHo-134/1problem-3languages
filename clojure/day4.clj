(ns aoc-2020.day4
  (:require
   [clojure.string :as string]
   [medley.core :as medley]))

(defn create-passport [s]
  (let [->kv-vec (fn [kv-str] (string/split kv-str #":"))
        kv-pairs (-> s
                     (string/replace "\n" " ")
                     (string/split #" "))]
    (->> kv-pairs
         (map ->kv-vec)
         (into {})
         (medley/map-keys keyword))))

(def passports (-> (slurp "/home/patrick/Documents/projects/1problem-3languages/day4_input.txt")
                   (string/split #"\n\n")
                   (#(map create-passport %))))

;; PART 1

(defn valid-passport? [p]
  (let [required-fields [:byr :iyr :eyr :hgt :hcl :ecl :pid]]
    (= (sort required-fields) (-> p
                                  (dissoc :cid)
                                  keys
                                  sort))))

(count (filter valid-passport? passports))
;; => 239

;; PART 2

(defn- read-string-when-not-empty [s]
  (when (not (string/blank? s))
    (read-string s)))

(defn valid-byr? [{byr :byr}]
  (when-let [year (some->> byr
                           (re-find #"\d+")
                           (read-string-when-not-empty))]
    (and (>= year 1920)
         (<= year 2002))))

(defn valid-iyr? [{iyr :iyr}]
  (when-let [year (some->> iyr
                           (re-find #"\d+")
                           (read-string-when-not-empty))]
    (and (>= year 2010)
         (<= year 2020))))

(defn valid-eyr? [{eyr :eyr}]
  (when-let [year (some->> eyr
                           (re-find #"\d+")
                           (read-string-when-not-empty))]
    (and (>= year 2020)
         (<= year 2030))))

(defn valid-hgt? [{hgt :hgt}]
  (when hgt
    (let [height (some->> hgt
                          (re-find #"\d+")
                          (read-string-when-not-empty))
          unit   (some->> hgt
                          (re-find #"\D+"))]
      (case unit
        "cm"
        (and (>= height 150) (<= height 193))

        "in"
        (and (>= height 59) (<= height 76))

        nil))))

(defn valid-hcl? [{hcl :hcl}]
  (when hcl
    (and (= 7 (count hcl))
         (= \# (first hcl))
         (= 6 (->> hcl (re-find #"[a-zA-Z0-9]+") (count))))))

(defn valid-ecl? [{ecl :ecl}]
  (when ecl
    (contains? #{"amb" "blu" "brn" "gry" "grn" "hzl" "oth"}
               (re-find #"[a-z]+" ecl))))

(defn valid-pid? [{pid :pid}]
  (when pid
    (and (every? #(java.lang.Character/isDigit %) (seq pid))
         (= 9 (count pid)))))

(defn is-valid-passport? [p]
  (and (valid-byr? p)
       (valid-iyr? p)
       (valid-eyr? p)
       (valid-hgt? p)
       (valid-hcl? p)
       (valid-ecl? p)
       (valid-pid? p)))

(count (filter is-valid-passport? passports))
;; => 188
