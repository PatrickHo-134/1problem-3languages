from functools import reduce


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


def have_required_fields(password, optional_fields):
    required_fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid']

    return optional_fields in required_fields


print(['a', 'v'] in ['a', 'v', 'b'])
