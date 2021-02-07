from functools import reduce

with open("/home/patrick/Documents/projects/1problem-3languages/day3_input.txt", "r") as f:
    file_content = f.readlines()

my_map = list(map(lambda x: x.replace("\n", ""), file_content))

def is_a_tree(area, coordinate):
    col = coordinate[0]
    row = coordinate[1]
    position = area[row][col]

    return "#" == position

def make_a_move(coordinate=[0,0], slope=[3,1]):
    x = coordinate[0]
    y = coordinate[1]
    step_right = slope[0]
    step_down = slope[1]

    return [x+step_right, y+step_down]

def expand_map(current_area, adding_area):
    assert len(current_area) == len(adding_area), \
           "Adding area doesn't have the same length as of current area"

    new_area = list(map(lambda a, b: a + b, current_area, adding_area))
    return new_area

def should_expand_map(current_area, coordinate):
    current_index = coordinate[0]
    max_index     = len(current_area[0]) - 1
    right_steps   = coordinate[0]

    return ((max_index - current_index) < right_steps)

# PART 1
def count_trees_on_path(area, slope=[3,1]):
    position     = [0,0]
    count_trees  = 0
    current_area = area

    while position[1] < (len(area) - slope[1]):
        if is_a_tree(current_area, position):
            count_trees += 1

        if should_expand_map(current_area, position):
            current_area = expand_map(current_area, area)

        position = make_a_move(position, slope)

    return count_trees

print(count_trees_on_path(my_map))

# PART 2
slopes = [[1,1], [3,1], [5,1], [7,1], [1,2]]
tree_counts = list(map(lambda x: count_trees_on_path(my_map, x), slopes))

print(reduce(lambda x, y: x*y, tree_counts))