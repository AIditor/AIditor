# USAGE
# python maskrcnn_predict.py --weights mask_rcnn_coco.h5 --labels coco_labels.txt --image images/30th_birthday.jpg

# import the necessary packages
from mrcnn.config import Config
from mrcnn import model as modellib
from mrcnn import visualize
from flask import Flask, request, jsonify
import numpy as np
import colorsys
import argparse
import imutils
import random
import cv2
import os
import tensorflow.compat.v1 as tf
tf.disable_v2_behavior()

# app = Flask(__name__)

# @app.route('/images', methods=['POST'])
# def get_images():


# construct the argument parse and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-w", "--weights", default='mask_rcnn_coco.h5',
help="path to Mask R-CNN model weights pre-trained on COCO")
ap.add_argument("-l", "--labels", default='coco_labels.txt',
help="path to class labels file")
ap.add_argument("-i", "--image", default='images/30th_birthday.jpg',
help="path to input image to apply Mask R-CNN to")
args = vars(ap.parse_args())

# load the class label names from disk, one label per line
CLASS_NAMES = open(args["labels"]).read().strip().split("\n")

# generate random (but visually distinct) colors for each class label
# (thanks to Matterport Mask R-CNN for the method!)
hsv = [(i / len(CLASS_NAMES), 1, 1.0) for i in range(len(CLASS_NAMES))]
COLORS = list(map(lambda c: colorsys.hsv_to_rgb(*c), hsv))
random.seed(42)
random.shuffle(COLORS)


def initt():
	print("[INFO] loading Mask R-CNN model...")
	global model
	model = modellib.MaskRCNN(mode="inference", config=config, model_dir=os.getcwd())
	model.load_weights(args["weights"], by_name=True)

class SimpleConfig(Config):
	# give the configuration a recognizable name
	NAME = "coco_inference"

	# set the number of GPUs to use along with the number of images
	# per GPU
	GPU_COUNT = 1
	IMAGES_PER_GPU = 1

	# number of classes (we would normally add +1 for the background
	# but the background class is *already* included in the class
	# names)
	NUM_CLASSES = len(CLASS_NAMES)

# initialize the inference configuration
config = SimpleConfig()


app = Flask(__name__)

@app.route('/images', methods=['POST'])
def get_images():
# initialize the Mask R-CNN model for inference and then load the
# weights
	# print("[INFO] loading Mask R-CNN model...")
	# model = modellib.MaskRCNN(mode="inference", config=config,
	# 	model_dir=os.getcwd())
	# model.load_weights(args["weights"], by_name=True)

# 이미지ㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣ



# app = Flask(__name__)

# @app.route('/images', methods=['POST'])
# def get_images():
# load the input image, convert it from BGR to RGB channel
# ordering, and resize the image
	# image = cv2.imread(args["image"])
	recv_file = request.files["images"]
	file_name = recv_file.filename
	recv_file.save(os.path.join(os.getcwd(), file_name))
	image_path = os.getcwd()+'//'+file_name
	image = cv2.imread(os.path.join(image_path))
	image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
	image = imutils.resize(image, width=512)

# perform a forward pass of the network to obtain the results
	print("[INFO] making predictions with Mask R-CNN...")
	r = model.detect([image], verbose=1)[0]

	response = []

# loop over of the detected object's bounding boxes and masks
	#for i in range(0, r["rois"].shape[0]):
	# extract the class ID and mask for the current detection, then
	# grab the color to visualize the mask (in BGR format)
		#classID = r["class_ids"][i]
		#mask = r["masks"][:, :, i]
		#color = COLORS[classID][::-1]

	# visualize the pixel-wise mask of the object
	# image = visualize.apply_mask(image, mask, color, alpha=0.5)

# convert the image back to BGR so we can use OpenCV's drawing
# functions
# image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

# loop over the predicted scores and class labels
	for i in range(0, len(r["scores"])):
	# extract the bounding box information, class ID, label, predicted
	# probability, and visualization color
		(startY, startX, endY, endX) = r["rois"][i]
		classID = r["class_ids"][i]
		label = CLASS_NAMES[classID]
		score = r["scores"][i]
		color = [int(c) for c in np.array(COLORS[classID]) * 255]

		response.append({
				"classID": int(classID),
				"label": label,
				"score": float(score)
		})

	# draw the bounding box, class label, and score of the object
	#.rectangle(image, (startX, startY), (endX, endY), color, 2)
	# text = "{}: {:.3f}".format(label, score)
	# y = startY - 10 if startY - 10 > 10 else startY + 10
	
	#cv2.putText(image, text, (startX, y), cv2.FONT_HERSHEY_SIMPLEX,
	#	0.6, color, 2)

# # show the output image
# cv2.imshow("Output", image)
# cv2.waitKey()
	os.remove(image_path)

	try:
		return jsonify({"response":response}), 200
	except FileNotFoundError:
		abort(404)
	# return response

if __name__ == '__main__':
	initt()
	app.run(debug=True, host = '0.0.0.0', port=5000)