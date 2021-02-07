with open("/home/patrick/Documents/projects/1problem-3languages/day4_input.txt", "r") as f:
    file_content = f.readlines()

my_map = list(filter(lambda x: x != "\n", file_content))

print(file_content)