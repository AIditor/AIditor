import requests
from bs4 import BeautifulSoup as bs4
import json
from pprint import pprint
import time

tag = "키움히어로즈"
crawled_data = []
result = {}
res = requests.get(f'https://www.instagram.com/graphql/query/?query_hash=298b92c8d7cad703f7565aa892ede943&variables={{"tag_name":"{tag}","first":12,"after":""}}').text
# print(res)
graphql_data = json.loads(res).get('data').get('hashtag').get('edge_hashtag_to_media')
for i in graphql_data.get('edges'):
    crawled_data.append(i)
page = 1
for i in range(page):
    if i%10 == 0:
        print('page', i)
    time.sleep(1)
    res = requests.get(f'https://www.instagram.com/graphql/query/?query_hash=298b92c8d7cad703f7565aa892ede943&variables={{"tag_name":"{tag}","first":12,"after":"{graphql_data.get("page_info").get("end_cursor")}"}}').text
    try:
        graphql_data = json.loads(res).get('data').get('hashtag').get('edge_hashtag_to_media')
        for j in graphql_data.get('edges'):
            crawled_data.append(j)
    except:
        continue
    

for data in crawled_data:
    text = data.get('node').get('edge_media_to_caption').get('edges')
    if len(text) > 0:
        text = text[0].get('node').get('text')
        tags = []
        start = 0
        end = 0
        flag = False
        for j, char in enumerate(text):
            if char == '#':
                start = j
                flag = True
            elif char == ' ' and flag:
                end = j
                tags.append(text[start:end])
                flag = False
        if len(tags) > 0:
            result[data.get('node').get('id')] = {'img_url': data.get('node').get('display_url'), 'tags': tags}
print(f'{len(result)} data crawled')
print('done')

with open(f'./{tag}.json', 'w', encoding='UTF-8') as f:
    json.dump(result, f, ensure_ascii = False)