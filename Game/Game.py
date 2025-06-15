
import time
import numpy as np
import math
from cvzone.ClassificationModule import Classifier
import mediapipe
import pyautogui
import cv2
from cvzone.HandTrackingModule import HandDetector
import subprocess
import requests


cap=cv2.VideoCapture(0)
detector=HandDetector(maxHands=1)
classifier=Classifier('C:/Users/dell/Desktop/Game/keras_model.h5','C:/Users/dell/Desktop/Game/labels.txt')
offset=20
imgsize=300
counter=0
labls=["up","down","left","right"]

isEdgeOpen = False

while True:
    success,img=cap.read()

    imgoutput=img.copy()
    # if img is None:
    #     break
    # imgoutput = img.copy()
    hands,img=detector.findHands(img)
    if hands:
        hand=hands[0]
        x,y,w,h=hand['bbox']
        imgwhite=np.ones((imgsize,imgsize,3),np.uint8)*255
        imgCrop=img[y-offset:y+h+offset,x-offset:x+w+offset]
        imgCropshape=imgCrop.shape
        aspectratio=h/w
        if aspectratio>1:
            k=imgsize/h
            wcal=math.ceil(k*w)
            imgResize=cv2.resize(imgCrop,(wcal,imgsize))
            imgResizeshape = imgResize.shape
            wGap=math.ceil((imgsize-wcal)/2)
            imgwhite[:,wGap:wcal+wGap] = imgResize
            prediction,index=classifier.getPrediction(imgwhite)



        else:
            k = imgsize / w
            hcal = math.ceil(k * h)
            imgResize = cv2.resize(imgCrop, (imgsize,hcal ))
            imgResizeshape = imgResize.shape
            hGap = math.ceil((imgsize - hcal) / 2)
            imgwhite[hGap:hcal + hGap, : ] = imgResize
            prediction, index = classifier.getPrediction(imgwhite)
        # cv2.putText(imgoutput,labls[index],(x,y-20),cv2.FONT_HERSHEY_COMPLEX,4,(255,255,0))

        print(labls[index])
        temp = labls[index]
        # if(temp=="A" and isEdgeOpen==False):
        #     isEdgeOpen = True
        #     subprocess.Popen(["C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"])
        # if(temp == "up"):
        #     requests.get('http://localhost:3535/setup')

        # B = Pause
        # L = Left
        # c = Right
        if (temp=="up"):
            requests.get('http://localhost:3535/setup')
        if (temp == "right"):
            requests.get('http://localhost:3535/setright')
        if (temp == "left"):
            requests.get('http://localhost:3535/setleft')
        if (temp == "down"):
            requests.get('http://localhost:3535/setdown')
        # cv2.imshow('abcd',imgCrop)
        cv2.imshow('abc', imgwhite)
        # time.sleep(1)
    cv2.imshow('asd',img)
    cv2.waitKey(1)








