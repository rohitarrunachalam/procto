import mediapipe as mp
from mediapipe.tasks import python as mp_python
import concurrent.futures
import time
import cv2
import numpy as np
import datetime
import cv2
from ultralytics import YOLO
import time
import json
# Load a pretrained YOLOv8n model
model = YOLO('yolov8n.pt')

fpsLimit = 0.25 # throttle limit
startTime = time.time()

MP_TASK_FILE = "face_landmarker.task"

fmapping = {0: '_neutral', 1: 'browDownLeft', 2: 'browDownRight', 3: 'browInnerUp', 4: 'browOuterUpLeft', 5: 'browOuterUpRight', 6: 'cheekPuff', 7: 'cheekSquintLeft', 8: 'cheekSquintRight', 9: 'eyeBlinkLeft', 10: 'eyeBlinkRight', 11: 'eyeLookDownLeft', 12: 'eyeLookDownRight', 13: 'eyeLookInLeft', 14: 'eyeLookInRight', 15: 'eyeLookOutLeft', 16: 'eyeLookOutRight', 17: 'eyeLookUpLeft', 18: 'eyeLookUpRight', 19: 'eyeSquintLeft', 20: 'eyeSquintRight', 21: 'eyeWideLeft', 22: 'eyeWideRight', 23: 'jawForward', 24: 'jawLeft', 25: 'jawOpen', 26: 'jawRight', 27: 'mouthClose', 28: 'mouthDimpleLeft', 29: 'mouthDimpleRight', 30: 'mouthFrownLeft', 31: 'mouthFrownRight', 32: 'mouthFunnel', 33: 'mouthLeft', 34: 'mouthLowerDownLeft', 35: 'mouthLowerDownRight', 36: 'mouthPressLeft', 37: 'mouthPressRight', 38: 'mouthPucker', 39: 'mouthRight', 40: 'mouthRollLower', 41: 'mouthRollUpper', 42: 'mouthShrugLower', 43: 'mouthShrugUpper', 44: 'mouthSmileLeft', 45: 'mouthSmileRight', 46: 'mouthStretchLeft', 47: 'mouthStretchRight', 48: 'mouthUpperUpLeft', 49: 'mouthUpperUpRight', 50: 'noseSneerLeft', 51: 'noseSneerRight'}

mapping = {11: 'eyeLookDownLeft', 12: 'eyeLookDownRight', 13: 'eyeLookInLeft', 14: 'eyeLookInRight', 15: 'eyeLookOutLeft', 16: 'eyeLookOutRight', 17: 'eyeLookUpLeft', 18: 'eyeLookUpRight'}

class FaceMeshDetector:

    def __init__(self):
        with open(MP_TASK_FILE, mode="rb") as f:
            f_buffer = f.read()
        base_options = mp_python.BaseOptions(model_asset_buffer=f_buffer)
        options = mp_python.vision.FaceLandmarkerOptions(
            base_options=base_options,
            output_face_blendshapes=True,
            output_facial_transformation_matrixes=True,
            running_mode=mp.tasks.vision.RunningMode.LIVE_STREAM,
            num_faces=1,
            result_callback=self.mp_callback)
        self.model = mp_python.vision.FaceLandmarker.create_from_options(
            options)

        self.landmarks = None
        self.blendshapes = None
        self.latest_time_ms = 0

    def mp_callback(self, mp_result, output_image, timestamp_ms: int):
        if len(mp_result.face_landmarks) >= 1 and len(
                mp_result.face_blendshapes) >= 1:

            self.landmarks = mp_result.face_landmarks[0]
            self.blendshapes = [b.score for b in mp_result.face_blendshapes[0]]

    def update(self, frame):
        t_ms = int(time.time() * 1000)
        if t_ms <= self.latest_time_ms:
            return

        frame_mp = mp.Image(image_format=mp.ImageFormat.SRGB, data=frame)
        self.model.detect_async(frame_mp, t_ms)
        self.latest_time_ms = t_ms

    def get_results(self):
        return self.landmarks, self.blendshapes

pool = concurrent.futures.ThreadPoolExecutor(max_workers=4)


facemesh_detector = FaceMeshDetector()
cap = cv2.VideoCapture(0)
# print(cap.get(cv2.CAP_PROP_FPS))
l = []
count_l = 0
count_r = 0
count_u = 0
count_d = 0

frame_c = 0
mobile_counter = 0
extra_people_counter = 0

while True:
    ret, frame = cap.read()
    print(frame)
    nowTime = time.time()
    if (float(nowTime - startTime)) > fpsLimit:
        facemesh_detector.update(frame)
        landmarks, blendshapes = facemesh_detector.get_results()
        if (landmarks is None) or (blendshapes is None):
            continue

        # mapping = {0: 'eyeLookDownLeft', 1: 'eyeLookDownRight', 
        #            2: 'eyeLookInLeft', 3: 'eyeLookInRight', 
        #            4: 'eyeLookOutLeft', 5: 'eyeLookOutRight', 
        #            6: 'eyeLookUpLeft', 7: 'eyeLookUpRight'}

        #     left = eyeLookInRight and eyeLookOutLeft
        #     right = eyeLookInLeft and eyeLookOutRight
        #     down = eyeLookDownLeft eyeLookDownRight
        #     up = eyeLookUpLeft and eyeLookUpRight

        req_blendshapes = blendshapes[11:19]
        # print(req_blendshapes)
        #Left
        if (req_blendshapes[3]>=0.50 and req_blendshapes[4]>=0.50):
             count_l+=1
        #Right
        elif (req_blendshapes[2]>=0.50 and req_blendshapes[5]>=0.50):
            count_r+=1
        #Down
        elif (req_blendshapes[0]>=0.50 and req_blendshapes[1]>=0.50):
            count_d+=1
        #Up
        elif (req_blendshapes[6]>=0.50 and req_blendshapes[7]>=0.50):
            count_u+=1
        else:
            pass
        if count_l>=3:
            print("Suspicious Activity Detected")
            count_l = 0
        if count_r>=3:
            print("Suspicious Activity Detected")
            count_r = 0
        if count_d>=3:
            print("Suspicious Activity Detected")
            count_u = 0
        if count_u>=3:
            print("Suspicious Activity Detected")
            count_d = 0
        else:
            pass

        if frame_c % 5 == 0:
            results = model.predict(frame)
            for i in results:
                boxes = [j.xyxy[0] for j in i.boxes]
                classes = [j.cls[0] for j in i.boxes]

            mobile_detected = False
            extra_people_detected = False
            mobile_bbox = [boxes[i].detach().cpu().numpy() for i in range(len(classes)) if classes[i] == 67]
            if(len(mobile_bbox)>0):
                mobile_detected = True
            person_bbox = [boxes[i].detach().cpu().numpy() for i in range(len(classes)) if classes[i] == 0]
            if(len(person_bbox)>1):
                extra_people_detected = True

            if mobile_detected:
                mobile_counter += 1
            if extra_people_detected:
                extra_people_counter += 1

            if mobile_counter >= 3:
                print("Mobile Detected")
                mobile_counter = 0
            if extra_people_counter >= 3:
                print("More Than One Person Detected")
                extra_people_counter = 0

        frame_c += 1
        # blendshapes_dict = {}
        # for k, v in enumerate(blendshapes):
        #     if k>= 11 and k<=18:
        #     # if k in (11,12,13,14,15,16,17,18):
        #         blendshapes_dict.update({mapping[k]:blendshapes[k]})
        #     print(blendshapes_dict)

        # results = model(source=frame)

        startTime = time.time()
    cv2.imshow('frame', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
exit()