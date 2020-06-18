import tkinter
import json
import urllib.request
import os
from PIL import Image, ImageTk
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('-t', '--tag', type=str, default='데일리룩.json', help="json path here")
parser.add_argument('-n', '--start_image_number', type=int, default=210000, help="image number here")
config = parser.parse_args()

tag = config.tag
start = config.start_image_number
window = tkinter.Tk()
canvas=tkinter.Canvas(window, relief="solid", bd=2)
data = []
selected_tag = []
idx = 0
result = []
tag_buttons = []
count = 0
with open(tag, 'r', encoding='UTF-8') as f:
    a = json.load(f)
    data_length = len(data)
    window.title("자동 아니고 수동 태그편집기")
    window.geometry("1280x720+0+0")
    window.resizable(False,False)
    label = tkinter.Label(window, image='')
    label2 = tkinter.Label(window, text='')
    for k, v in a.items():
        data.append(v)
    label3 = tkinter.Label(window, text=f'{idx}/{len(data)}')
    label4 = tkinter.Label(window, text=f'저장된 데이터 : {count}개')
    label3.place(x=550, y=0)
    label4.place(x=800, y=0)
    def btn_click_event(key='default'):
        global idx, start, selected_tag, tag_buttons
        for button in tag_buttons:
            button.destroy()
        tag_buttons = []
        for tag in data[idx].get('tags'):
            temp = tag[:]
            btn = tkinter.Button(window, text=f'{tag}')
            btn.config(command=lambda x=temp: tag_click(x))
            tag_buttons.append(btn)
        tag = "#동물스타그램"
        temp = tag[:]
        btn = tkinter.Button(window, text=f'{tag}')
        btn.config(command=lambda x=temp: tag_click(x))
        tag_buttons.append(btn)
        start += 1
        try :
            urllib.request.urlretrieve(data[idx].get('img_url'), f'images/{start}.jpg')
            image = Image.open(f'images/{start}.jpg').resize((540,540))
            photo = ImageTk.PhotoImage(image)
            if idx > 0:
                label.config(image='')
            label.config(image=photo)
            label.img = photo # this line is not always needed, but include it anyway to prevent bugs
            label.place(x=0, y=0)
            for i, button in enumerate(tag_buttons):
                button.place(x=600 + (i//20)*100, y=((i%20)+1) * 25)
            label3.config(text=f'{idx}/{len(data)}')
            idx += 1
            selected_tag = []
            label2.config(text='')
            label2.config(text='선택된 태그 = ' + ' '.join(selected_tag))
        except :
            print("게시글이 삭제되었습니다.")
            idx += 1
    
    def pass_button_click(key='default'):
        if idx > 0:
            os.remove(f'images/{start}.jpg')
        btn_click_event(key)

    def tag_click(text):
        for i, tag in enumerate(selected_tag):
            if tag == text:
                selected_tag.pop(i)
                break
        else:
            selected_tag.append(text)

        label2.config(text='')
        label2.config(text='선택된 태그 = ' + ' '.join(selected_tag))
        label2.place(x=0, y=550)

    def next_btn_click(key='default'):
        global count
        count += 1
        label4.config(text=f'저장된 데이터 : {count}개')
        result.append(f'{start}.jpg, {" ".join(selected_tag)}\n')
        btn_click_event(key)
    
    def save_btn_click():
        with open(f'{config.tag[:-5]}.txt', 'w', encoding='UTF-8') as f:
            f.writelines(result)

    btn = tkinter.Button(window, text="건너뛰기", command=btn_click_event)
    btn.place(x=1100, y=0, width=100, height=50)
    btn = tkinter.Button(window, text="건뛰 + 이미지삭제", command=pass_button_click)
    btn.place(x=1100, y=50, width=100, height=50)
    btn_next = tkinter.Button(window, text='저장후다음', command=next_btn_click)
    btn_next.place(x=1100, y=100, width=100, height=100)
    btn_save = tkinter.Button(window, text='텍스트로 저장', command=save_btn_click)
    btn_save.place(x=1100, y=200, width=100, height=100)
    window.bind('<Return>', next_btn_click)
    window.bind('<Right>', pass_button_click)
    window.mainloop()



        
    
    