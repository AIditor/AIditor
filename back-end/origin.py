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
import face_recognition as fr
import pickle
from decouple import config as dc_config
from tensorflow import keras
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

colab_label = ['person', 'bird', 'cat', 'dog', 'horse', 'sheep', 'cow', 'elephant', 'bear', 'zebra',
                'giraffe', 'banana', 'apple', 'sandwich', 'orange', 'broccoli', 'carrot', 'hot dog',
                'pizza', 'donut', 'cake', 'cell phone', 'mouse', 'teddy bear', 'keyboard', 'laptop', 'tv']


CORS(app, resources={r"/*": {"orgins" : "*"}})


def initt():
    global additional_tags, tag_model, tokenizer
    additional_tags = [
    ['none'],
    ['벚꽃놀이', '일상', '데일리', 'daily', '벚꽃스타그램'],
    ['일상', '데일리', 'daily', '책'],
    ['풍경', '일상', '데일리', 'daily', '노을스타그램'],
    ['회식', '먹스타', '일상', '데일리', 'daily', '먹스타그램'],
    ['여행스타그램', '여행', 'travel', '일상', '데일리', 'daily'],
    ['셀피', '셀카', '셀스타그램', 'selfie', '일상', '데일리', 'daily'],
    ['육아스타그램', '도치맘', '육아기록', '육아소통', '베이비스타그램', '인스타베이비'],
    ['신나는파티', '일상', '데일리', 'daily'],
    ['집스타그램', '일상', '데일리', 'daily', '하우스그램'],
    ['공부', '공스타', '일상', '데일리', 'daily', '동기부여', '공부기록', '공스타맞팔', '필기'],
    ['호텔', '또가고싶다', '휴가', '여행', '일상', '데일리', 'daily'],
    ['캣스타그램', '냥스타', '고양이', 'cat', '일상', '데일리', 'daily', '집사의하루', '냥이', '야옹이', '집사', '캣스타'],
    ['풍경', '풍경사진', '야경맛집', '야경사진', '경치', '일상', '데일리', 'daily'],
    ['데이트스타그램', '럽스타그램', '커플', '럽스타', '커플스타그램'],
    ['셀피', '얼스타그램', 'selfie', '셀스타그램', '데일리', '일상', 'daily', '선팔', '맞팔', '소통', 'selstagram'],
    ['dailylook', '코디', '데일리코디', '옷스타그램', '데일리룩코디', '오늘의코디', '패션', '일상', '데일리', 'daily'],
    ['운동스타그램', '운동그램', '헬창', '헬스타그램', '헬스스타그램', '데일리', '일상', 'daily'],
    ['술', '술스타', '안주맛집', '일상', '데일리', 'daily'],
    ['졸업', '행복한하루', '일상', '데일리', 'daily']
    ]

    tag_model = keras.models.load_model(os.path.join(os.getcwd(), 'model3.h5'))
    tag_model._make_predict_function()

    with open(os.path.join(os.getcwd(),'tokenizer_my.bin'), 'rb') as f:
        tokenizer = pickle.load(f)


@app.route('/api/faces', methods=['POST'])
def faces():
    recv_file = request.files["images"]
    file_name = recv_file.filename
    recv_file.save(os.path.join(os.getcwd(), file_name))
    image_path = os.getcwd()+'//'+file_name
    image_for_face = cv2.imread(os.path.join(image_path))
    face_location = fr.face_locations(image_for_face)
    image = fr.load_image_file(os.path.join(image_path))
    os.remove(image_path)
    result = []

    for top, right, bottom, left in face_location:
        face = image[top:bottom, left:right]
        face = cv2.cvtColor(face, cv2.COLOR_RGB2BGR)
        _, temp = cv2.imencode('.jpg', face)
        encoded_face = base64.b64encode(temp)
        result.append({'x': int(left), 'y': int(top), 'width': int(right-left), 'height': int(bottom - top), 'base64': encoded_face})
    try:
        return jsonify({
            "response": result,
    #        "response2": result2,
            }), 200
    except FileNotFoundError:
        abort(404)

@app.route('/api/tags', methods=['POST'])
def get_tags():
    print("load tag model")
    recv_file = request.files["images"]
    file_name = recv_file.filename
    recv_file.save(os.path.join(os.getcwd(), file_name))
    image_path = os.getcwd()+'//'+file_name
    image_for_tag = cv2.imread(os.path.join(image_path))

    image_for_tag = cv2.resize(image_for_tag, (128, 128), interpolation=cv2.INTER_LINEAR)
    image_for_tag = np.array(image_for_tag)
    image_for_tag = image_for_tag / 255.0
    image_for_tag = image_for_tag.reshape(1,128,128,3)
    prediction = tag_model.predict(image_for_tag)
    result = []
    for i, v in enumerate(prediction[0]):
        if prediction[0][i] >= 0.2:
            print(i, v)
            result.append(tokenizer.index_word[i])
            for tag in additional_tags[i]:
                if not (tag in result):
                    result.append(tag)
    os.remove(image_path)
    try:
        return jsonify({"response": result}), 200
    except FileNotFoundError:
        abort(404)



@app.route('/api/images', methods=['POST'])
def get_images():

    recv_file = request.files["images"]
    file_name = recv_file.filename
    recv_file.save(os.path.join(os.getcwd(), file_name))
    image_path = os.getcwd()+'//'+file_name
    image = cv2.imread(os.path.join(image_path))
    h = image.shape[0]
    w = image.shape[1]
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = imutils.resize(image, width=512)
    model.keras_model._make_predict_function()
    print("[INFO] making predictions with Mask R-CNN...")

    r = model.detect([image], verbose=1)[0]
    imparams = [cv2.IMWRITE_PNG_COMPRESSION, 0]
    res = []
    
    for i in range(0, r["rois"].shape[0]):
        
        classID = r["class_ids"][i]
        label = CLASS_NAMES[classID]

        if label not in colab_label:
            continue

        mask = r["masks"][:, :, i]

        img = Image.open(os.path.join(image_path))
        img = img.convert("RGBA")

        img = np.array(img)
        img = imutils.resize(img, width=512)

        img[...,3] = img[...,3] * mask
        img = imutils.resize(img, width=w)

        img = cv2.cvtColor(img, cv2.COLOR_RGBA2BGRA)
        _, ret = cv2.imencode('.png', img, imparams)
        
        im = base64.b64encode(ret)
        res.append(im)

    os.remove(image_path)
    return jsonify(res), 200




if __name__ == '__main__':
    initt()
    ap = argparse.ArgumentParser()
    ap.add_argument("-w", "--weights", default='mask_rcnn_coco.h5',
    help="path to Mask R-CNN model weights pre-trained on COCO")
    ap.add_argument("-l", "--labels", default='coco_labels.txt',
    help="path to class labels file")
    ap.add_argument("-i", "--image", default='images/30th_birthday.jpg',
    help="path to input image to apply Mask R-CNN to")
    args = vars(ap.parse_args())

    CLASS_NAMES = open(args["labels"]).read().strip().split("\n")


    class SimpleConfig(Config):
        NAME = "coco_inference"

        GPU_COUNT = 1
        IMAGES_PER_GPU = 1

        NUM_CLASSES = len(CLASS_NAMES)

    config = SimpleConfig()

    print("[INFO] loading Mask R-CNN model...")
    model = modellib.MaskRCNN(mode="inference", config=config,
		model_dir=os.getcwd())
    model.load_weights(args["weights"], by_name=True)

    app.run(
            debug=False, 
            host = '0.0.0.0', 
            port=5000, 
            ssl_context=(dc_config('CERT'), dc_config('PKEY'))
            )
