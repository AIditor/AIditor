# USAGE
# python maskrcnn_predict.py --weights mask_rcnn_coco.h5 --labels coco_labels.txt --image images/30th_birthday.jpg

# import the necessary packages
from mrcnn.config import Config
from mrcnn import model as modellib
from mrcnn import visualize
from flask import Flask, request, jsonify, Response
from flask_cors import CORS, cross_origin
from keras.backend import clear_session
from json import JSONEncoder
from PIL import Image
from IPython import embed
import numpy as np
import colorsys
import argparse
import imutils
import random
import codecs
import json
import base64
import cv2
import os
import tensorflow.compat.v1 as tf
tf.disable_v2_behavior()

app = Flask(__name__)

CORS(app, resources={r"/*": {"orgins" : "*"}})

colab_label = ['person', 'bird', 'cat', 'dog', 'horse', 'sheep', 'cow', 'elephant', 'bear', 'zebra',
                'giraffe', 'banana', 'apple', 'sandwich', 'orange', 'broccoli', 'carrot', 'hot dog',
                'pizza', 'donut', 'cake', 'cell phone', 'mouse', 'teddy bear', 'keyboard', 'laptop', 'tv']


@app.route('/images', methods=['POST'])
def get_images():
    # numpy to json
    class NumpyArrayEncoder(JSONEncoder):
        def default(self, obj):
            if isinstance(obj, np.ndarray):
                return obj.tolist()
            return JSONEncoder.default(self, obj)



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
    model.keras_model._make_predict_function()
    # perform a forward pass of the network to obtain the results
    print("[INFO] making predictions with Mask R-CNN...")
    # clear_session()

    r = model.detect([image], verbose=1)[0]

    # image = cv2.imread(os.path.join(image_path), cv2.IMREAD_UNCHANGED)
    # image = imutils.resize(image, width=512)
    imparams = [cv2.IMWRITE_PNG_COMPRESSION, 0]
    res = []
    
    # loop over of the detected object's bounding boxes and masks
    for i in range(0, r["rois"].shape[0]):
    # extract the class ID and mask for the current detection, then
    # grab the color to visualize the mask (in BGR format)
        # classID = r["class_ids"][i]

        classID = r["class_ids"][i]
        label = CLASS_NAMES[classID]

        if label not in colab_label:
            continue

        mask = r["masks"][:, :, i]
        # color = COLORS[classID][::-1]
        img = Image.open(os.path.join(image_path))
        img = img.convert("RGBA")

        # h = np.array(img)[0]
        (startY, startX, endY, endX) = r["rois"][i]
        # endX += startX
        # endY += startY
        # endY += d
        # startY = h - startY
        # endY = h - endY
        # embed()
        # view_i = img.crop((startY, startX, endY, endX))
        # view_img = np.array(view_i)

        img = np.array(img)
        w = img.shape[1]

        img = imutils.resize(img, width=512)
        bef_w = img.shape[1]

        img[...,3] = img[...,3] * mask

        view_img = img[startY:endY, startX:endX,:]
        img = imutils.resize(img, width=w)
        view_w_ratio = float(w / bef_w)
        after_view_w = int(view_w_ratio * view_img.shape[1])
        view_img = imutils.resize(view_img, width=after_view_w)

        img = cv2.cvtColor(img, cv2.COLOR_RGBA2BGRA)
        view_img = cv2.cvtColor(view_img, cv2.COLOR_RGBA2BGRA)
        _, ret = cv2.imencode('.png', img, imparams)
        _, view_ret = cv2.imencode('.png', view_img, imparams)

        # img.resize(1, len(img[0]), len(img[0][0]), 3)
        # embed()

        # tmp2 = Image.fromarray(img, 'RGBA')
        # tmp = Image.new("RGB", tmp2.size, (255, 255, 255))
        # tmp.paste(tmp2, mask=tmp2.split()[3])
        # img = np.array(tmp)

        # img = cv2.cvtColor(img, cv2.COLOR_RGBA2RGB)
        # img = cv2.cvtColor(img, cv2.COLOR_BGRA2BGR)

        # img.putdata(newData)
        # _, ret = cv2.imencode('.png', img)
        # return Response(response=bytes(view_ret), status=200, mimetype='image/png')



        # for j in range(image.shape[2]):
        #     image[:,:,j] = image[:,:,j] * mask

        # image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
        # _, ret = cv2.imencode('.png', image)

        # im_bytes = ret.tobytes()
        # im = base64.b64encode(im_bytes)
        im = base64.b64encode(ret)
        view_im = base64.b64encode(view_ret)
        res.append({
            'view':view_im,
            'origin':im
        })
        # res.append(im)
        # res.append({view_img, img})

        # return Response(response=bytes(view_ret), status=200, mimetype='image/png')
    # print(res)
    os.remove(image_path)
    print(len(res))
    return jsonify(res), 200
    # return jsonify("success"), 200


    # return Response(response=bytes(response), status=200, mimetype='image/png')
	# visualize the pixel-wise mask of the object
	# image = visualize.apply_mask(image, mask, color, alpha=0.5)

    # convert the image back to BGR so we can use OpenCV's drawing
    # functions
    # image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

    # loop over the predicted scores and class labels
    # for i in range(0, len(r["scores"])):
    # # extract the bounding box information, class ID, label, predicted
    # # probability, and visualization color
    #     (startY, startX, endY, endX) = r["rois"][i]
    #     classID = r["class_ids"][i]
    #     label = CLASS_NAMES[classID]
    #     score = r["scores"][i]
    #     # color = [int(c) for c in np.array(COLORS[classID]) * 255]

    #     response.append({
    #             "classID": int(classID),
    #             "label": label,
    #             "score": float(score)
    #     })

    # draw the bounding box, class label, and score of the object
    #.rectangle(image, (startX, startY), (endX, endY), color, 2)
    # text = "{}: {:.3f}".format(label, score)
    # y = startY - 10 if startY - 10 > 10 else startY + 10

    #cv2.putText(image, text, (startX, y), cv2.FONT_HERSHEY_SIMPLEX,
    #	0.6, color, 2)

    # # show the output image
    # cv2.imshow("Output", image)
    # cv2.waitKey()

    # try:
    #     return response, 200
    # except FileNotFoundError:
    #     abort(404)


if __name__ == '__main__':
    # construct the argument parse and parse the arguments
    ap = argparse.ArgumentParser()
    ap.add_argument("-w", "--weights", default='mask_rcnn_coco.h5',
    help="path to Mask R-CNN model weights pre-trained on COCO")
    ap.add_argument("-l", "--labels", default='coco_labels.txt',
    help="path to class labels file")
    # ap.add_argument("-i", "--image", default='images/30th_birthday.jpg',
    # help="path to input image to apply Mask R-CNN to")
    args = vars(ap.parse_args())

    # load the class label names from disk, one label per line
    CLASS_NAMES = open(args["labels"]).read().strip().split("\n")

    # generate random (but visually distinct) colors for each class label
    # (thanks to Matterport Mask R-CNN for the method!)
    # hsv = [(i / len(CLASS_NAMES), 1, 1.0) for i in range(len(CLASS_NAMES))]
    # COLORS = list(map(lambda c: colorsys.hsv_to_rgb(*c), hsv))
    # random.seed(42)
    # random.shuffle(COLORS)

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

    # initialize the Mask R-CNN model for inference and then load the
    # weights
    print("[INFO] loading Mask R-CNN model...")
    model = modellib.MaskRCNN(mode="inference", config=config,
		model_dir=os.getcwd())
    model.load_weights(args["weights"], by_name=True)

    app.run(debug=False, host = '0.0.0.0', port=5002)
