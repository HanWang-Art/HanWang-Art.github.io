import sys
import os

def get_file_list(path):
	return [ f for f in os.listdir(path)]

def filter_file_list(file_list):
    return [f for f in file_list if f.find("thumbnail") == -1]

def make_csv(csv_file_name, image_file_list, base_path):
    with open(csv_file_name, "w") as fp:
        fp.write("title,image_path,thumbnail_path,description\n")
        for image_file in image_file_list:
            dot_pos = image_file.rfind('.')
            image_file_name = image_file[:dot_pos]
            title = "\""+image_file_name + "\""
            image_path = "\"" + base_path + image_file + "\""
            image_thumbnail_path = "\"" + base_path + image_file_name + "_thumbnail.jpg" + "\""
            description = title
            fp.write(title+','+image_path+','+image_thumbnail_path+','+description+'\n')

if __name__ == '__main__':
    file_list = get_file_list(sys.argv[1])
    file_list = filter_file_list(file_list)
    make_csv(sys.argv[2], file_list, sys.argv[1])