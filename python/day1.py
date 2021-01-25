import functools

my_file = open("/home/patrick/Documents/projects/1problem-3languages/day1_input.txt", 'r')

my_input = list(my_file.readlines())
sorted_input = sorted(list(map(int, my_input)))

def BinarySearch(collection, val):
    first = 0
    last = len(collection)-1
    index = -1
    while (first <= last) and (index == -1):
        mid = (first+last)//2
        if collection[mid] == val:
            index = mid
        elif val<collection[mid]:
            last = mid -1
        else:
            first = mid +1
    return index


# PART 1
def find_numbers_by_sum(collection, sum):
    sorted_list = sorted(collection)
    result = []

    for i in range(len(sorted_list)-1):
        first_value = sorted_list[i]

        value_to_find = sum - first_value
        list_to_search = sorted_list[i+1:]

        result_index = BinarySearch(list_to_search, value_to_find)
        
        if result_index != -1:
            result =  [first_value, list_to_search[result_index]]
            break

    return result

pair_values = find_numbers_by_sum(sorted_input, 2020)
p1_result = (pair_values[0] * pair_values[1])
print(p1_result)

# PART 2
def find_trio_by_sum(collection, sum):
    for i in range(len(collection)-2):
        first_num = collection[i]
        
        target = sum - first_num
        search_list = collection[i+1:]
        adding_items = find_numbers_by_sum(search_list, target)
        if adding_items:
            # Note: there is a reason why I use + for adding to a list instead of using append
            trio = adding_items + [first_num]
            break
    return trio

trio_values = find_trio_by_sum(sorted_input, 2020)
print(functools.reduce(lambda a,b: a*b, trio_values))

