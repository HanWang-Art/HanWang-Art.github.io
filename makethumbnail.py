from PIL import Image
import sys
import os

def get_file_list(path):
	return [ path+f for f in os.listdir(path)]

def filter_with_extend(filelist, extend=".jpg"):
	extend_length = len(extend)
	return [ f for f in filelist if len(f)>extend_length and f[-extend_length:] == extend]

def get_thumbnail_name(image_path):
	dot_pos = image_path.rfind('.')
	return image_path[:dot_pos] + "_thumbnail" + image_path[dot_pos:]

def make_thumbnail(image_path,thumb_size=(256,256)):
	print("make thumbnail for ", image_path)
	im = Image.open(image_path)
	im.thumbnail(thumb_size)
	thumbnail_path = get_thumbnail_name(image_path)
	print("output thumbnail at ", thumbnail_path)
	im.save(thumbnail_path)

if __name__ == "__main__":
#	make_thumbnail(sys.argv[1])

	filelist = get_file_list(sys.argv[1])
	filelist = filter_with_extend(filelist)
	for f in filelist:
		make_thumbnail(f)
