with open("/home/patrick/Documents/projects/1problem-3languages/day5_input.txt", "r") as f:
    file_content = f.readlines()

boarding_passes = list(map(lambda x: x.strip(), file_content))

# PART 1
def go_to_row(direction, range):
    low = 0
    high = len(range)-1

    if (len(range) == 2) and (direction == "F"):
        return range[low]
    elif (len(range) == 2) and (direction == "B"):
        return range[high]
    elif direction == "F":
        high = int((high+1)/2)
        return range[:high]
    elif direction == "B":
        low = int((high+1)/2)
        return range[low:]
    else:
        raise Exception("Cannot handle case with direction " +
                        direction +
                        " and range [" + str(range[0]) + ", " + str(range[-1]) + "]")

def go_to_seat(direction, range):
    low = 0
    high = len(range)-1

    if (len(range) == 2) and (direction == "L"):
        return range[low]
    elif (len(range) == 2) and (direction == "R"):
        return range[high]
    elif direction == "L":
        high = int((high+1)/2)
        return range[:high]
    elif direction == "R":
        low = int((high+1)/2)
        return range[low:]
    else:
        raise Exception("Cannot handle case with direction " +
                        direction +
                        " and range [" + str(range[0]) + ", " + str(range[-1]) + "]")

def get_row_number(boarding_pass):
    directions = list(boarding_pass)[:7]
    row_range = list(range(0, 128))

    for d in directions:
        row_range = go_to_row(d, row_range)

    return row_range

def get_seat_number(boading_pass):
    directions = list(boading_pass)[-3:]
    seat_range = list(range(0, 8))

    for d in directions:
        seat_range = go_to_seat(d, seat_range)

    return seat_range

def get_seat_id(boarding_pass):
    row = get_row_number(boarding_pass)
    seat = get_seat_number(boarding_pass)
    return row * 8 + seat

seat_ids = list(map(lambda x: get_seat_id(x), boarding_passes))

print(max(seat_ids)) # => 928
# print(min(seat_ids)) # => 91

# PART 2

missing_id = (set(list(range(91, 929))) - set(sorted(seat_ids))).pop()
print(missing_id) # 610
