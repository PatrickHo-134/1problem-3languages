# 1 problem - 3 languages
This repository contains solutions to challenges of [Advent of Code 2020](https://adventofcode.com/2020/day/1), written in 3 languages: Python, Javascript and Clojure. The reason for the existence of this repo is to demonstrate how my thinking process and coding style has significantly changed after moving away from object-oriented programming to functional programming for almost a year.

## How to run code in this project
Scripts are stored in 3 different folders: Python, Javascript and Clojure.

### To run Python code
You will need python 3 installed on your machine.

Use the following command to run a Python file
```python
$ python filename.py
```

### To run Javascript files
The easiest way is having [Node.js](https://nodejs.org/en/download/) installed on your machine and use the following command to run a javascript file:
```shell
node filename.js
```

### To run Clojure files
You will need to install [Leiningen](https://leiningen.org/), then create a leiningen project and copy the source scripts in *clojure* directory to the *src* directory of the leiningen project.

#### Installation of Leiningen on Linux
```shell
$ sudo apt update
$ sudo apt install leiningen
```
#### Installation of Leiningen on Windows
[Install Leiningen on Windows 10](https://leiningen.org/)

#### Start a leiningen project
Run this command to create a new leiningen project
```shell
$ lein new app projectName
```
Copy all clojure files in this directory and paste them to the **src/projectName** 
Start a REPL (read-eval-print-loop) and run through the code in each file.