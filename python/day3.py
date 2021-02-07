with open("D:/Program_files/Projects/hacker_rank/1problem-3languages/day3_input.txt", "r") as f:
    file_content = f.readlines()

processed_input = list(map(lambda x: x.replace("\n", ""), file_content))


def is_a_tree(area, coordinate):
    col = coordinate[0]
    row = coordinate[1]
    position = area[row][col]

    return "#" == position
