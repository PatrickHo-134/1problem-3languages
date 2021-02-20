from functools import reduce
import re

def convert_list_to_dictionary(l):
    dict = {}

    for i in range(len(l)):
        [k, v] = l[i].split(":")
        dict[k] = v

    return dict

def process_file_content(content):
    processed_content = list(map(lambda x: x.replace("\n", "") if x != "\n" else x,
                                 content))
    processed_content = reduce(lambda x, y: x + " " + y,
                               processed_content)
    processed_content = processed_content.split("\n")
    processed_content = list(map(lambda x: x.strip().split(" "),
                                 processed_content))
    processed_content = list(map(convert_list_to_dictionary,
                                 processed_content))

    return processed_content

with open("D:/Program_files/Projects/hacker_rank/1problem-3languages/day4_input.txt", "r") as f:
    file_content = f.readlines()
passports = process_file_content(file_content)

def have_required_fields(passport, optional_fields=['cid']):
    required_fields = sorted(
        ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid'])
    passport_fields = sorted(list(passport.keys()))

    missing_fields = list(set(sorted(required_fields)) - set(passport_fields))

    return (missing_fields == sorted(optional_fields) or
            required_fields == passport_fields)

# PART 1
passports_have_valid_fields = list(
    filter(lambda x: have_required_fields(x), passports))
print(len(passports_have_valid_fields))
# => 239

# PART 2
def check_year_field(value, digit_num=4, year_range=[1920,2002]):
    year = int(value)
    lower_range, upper_range = year_range

    return ((len(value) == digit_num) and
            (lower_range <= year and year <= upper_range))

def get_uom(height_value):
    chars = list(filter(lambda x: x.isalpha(), height_value))
    return "".join(chars)

def check_height(h):
    height = int(re.findall(r'\d+', h)[0])
    uom = get_uom(h)

    if uom == 'in':
        return (59 <= height and height <= 76)
    elif uom == 'cm':
        return (150 <= height and height <= 193)
    else:
        return False

def check_hair(hair_value):
    return (re.findall(r'^#*\d*\w', hair_value) != [] and
            re.findall(r'[g-z]', hair_value) == [] and
            len(hair_value) == 7)

def check_eyes(e):
    return e in ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']

def check_passport_id(passport):
    return (len(passport) == 9 and
            re.findall(r'\d{9}', passport) != [])

def is_valid_passport(passport):
    if passport.get('byr'):
        byr = check_year_field(passport.get('byr'), 4, [1920, 2002])
    else:
        byr = False

    if passport.get('iyr'):
        iyr = check_year_field(passport.get('iyr'), 4, [2010, 2020])
    else:
        iyr = False

    if passport.get('eyr'):
        eyr = check_year_field(passport.get('eyr'), 4, [2020, 2030])
    else:
        eyr = False

    if passport.get('hgt'):
        hgt = check_height(passport.get('hgt'))
    else:
        hgt = False

    if passport.get('hcl'):
        hcl = check_hair(passport.get('hcl'))
    else:
        hcl = False

    if passport.get('ecl'):
        ecl = check_eyes(passport.get('ecl'))
    else:
        ecl = False

    if passport.get('pid'):
        pid = check_passport_id(passport.get('pid'))
    else:
        pid = False

    return (byr and
            iyr and
            eyr and
            hgt and
            hcl and
            ecl and
            pid and
            have_required_fields(passport, ['cid']))

valid_passports = list(filter(is_valid_passport, passports))
print(len(valid_passports))
# => 188