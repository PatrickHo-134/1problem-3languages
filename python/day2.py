with open("/home/patrick/Documents/projects/1problem-3languages/day2_input.txt", "r") as f:
    file_content = f.readlines()


def process_input(item):
    policy, password = item.replace("\n", "").split(":")
    char_policy, character = policy.split(" ")
    char_frequency = list(map(int, char_policy.split("-")))

    output = [char_frequency, character, password.strip()]

    return output


processed_input = [process_input(item) for item in file_content]


# PART 1
def check_password(entry):
    '''Takes an password entry which can be explained in the following order:
       character policy, character in a password and the password.
       The character policy indicates required minimum and maximum occurence of the character in the given password.
       Return true if the occurence of the character greater or equal then the minimum value
       and equal or less than maximum value'''
    if len(entry) == 3:
        min_fre, max_fre = entry[0]
        char = entry[1]
        password = entry[2]

        return (min_fre <= password.count(char)) and (password.count(char) <= max_fre)
    else:
        return false


# Note that filter function always returns a result as an iterator.
# That's why we need to convert the result to a list if we want to use count for it.
correct_password = list(filter(check_password, processed_input))
print(len(correct_password))

# PART 2
def exist_at_position(char, password, index):
    return char == password[index]


def repeat_exactly_once(char, password, indexes):
    repeat = 0
    for index in indexes:
        if exist_at_position(char, password, index):
            repeat += 1

    return repeat == 1


def check_password2(entry):
    policy, character, password = entry

    indexes = [policy[0]-1, policy[1]-1]

    return repeat_exactly_once(character, password, indexes)


correct_password = list(filter(check_password2, processed_input))
print(len(correct_password))
