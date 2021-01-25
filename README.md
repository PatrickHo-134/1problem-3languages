# 1 problem - 3 languages
This repository is used to demonstrate how a problem can be solved in 3 different languages such as python, javascript and clojure.

Programming challenges utilised for this demonstration are taken from [Advent of Code 2020](https://adventofcode.com/2020/day/1).

## How to run code in this project
Scripts are stored in 3 different folders: python, javascript and clojure.

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
You will need to install [Leiningen](https://leiningen.org/), then create a leinigen project and copy the source scripts in *clojure* directory to the *src* directory of the leiningen project.

#### Installation of Leiningen on Linux
```shel
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