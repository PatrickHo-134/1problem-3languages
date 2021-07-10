import re

with open("/home/patrick/Documents/projects/1problem-3languages/day4_input.txt", "r") as f:
    file_content = f.read()

def create_passport(l):
    kv_pairs = l.replace("\n", " ").split()
    passport = {}

    for p in kv_pairs:
        kv = p.split(":")
        passport[kv[0]] = kv[1]

    return passport

passports = list(map(lambda x: create_passport(x), file_content.split("\n\n")))


# PART 1
# missing cid is fine but missing any other is not

def is_valid_passport(p):
    required_fields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"] # cid is optional

    if "cid" in p:
        del p["cid"]

    return (sorted(required_fields) == sorted(list(p.keys())))

print(len(list(filter(lambda x: is_valid_passport(x), passports))))

# PART 2

def is_valid_birth_year(p):
    if "byr" in p:
        return int(p["byr"]) >= 1920 and int(p["byr"]) <= 2002
    else:
        return False

def is_valid_issue_year(p):
    if "iyr" in p:
        return int(p["iyr"]) >= 2010 and int(p["iyr"]) <= 2020
    else:
        return False

def is_valid_exp_year(p):
    if "eyr" in p:
        return int(p["eyr"]) >= 2020 and int(p["eyr"]) <= 2030
    else:
        return False

def is_valid_height(p):
    if "hgt" in p:
        unit = re.findall("[a-zA-Z]+", p["hgt"])
        value = int(re.findall('[0-9]+', p["hgt"])[0])

        if len(unit) == 1 and unit[0] == "cm":
            return value >= 150 and value <= 193
        elif len(unit) == 1 and unit[0] == "in":
            return value >= 59 and value <= 76
        else:
            return False
    else:
        return False

def is_valid_hair(p):
    if "hcl" in p:
        color = re.findall("[a-zA-Z0-9]+", p["hcl"])[0]
        return p["hcl"][0] == "#" and len(color) == 6
    else:
        return False

def is_valid_eye(p):
    if "ecl" in p:
        return p["ecl"] in ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]
    else:
        return False

def is_valid_pid(p):
    if "pid" in p:
        pid = re.findall("[0-9]+", p["pid"])[0]
        return len(pid) == 9
    else:
        return False

def stricter_passport_check(p):
    return is_valid_birth_year(p)\
       and is_valid_issue_year(p)\
       and is_valid_exp_year(p)\
       and is_valid_height(p)\
       and is_valid_hair(p)\
       and is_valid_eye(p)\
       and is_valid_pid(p)

print(len(list(filter(lambda x: stricter_passport_check(x), passports))))