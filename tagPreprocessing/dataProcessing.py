# load library
import urllib.request
import os
import json


tag = "키움히어로즈"
file_path = "./"+tag+".json"
result = {}
with open(file_path, "r", encoding='UTF-8-sig') as json_file:
    json_data = json.load(json_file)
    json_data = list(zip(json_data.values(), json_data.keys()))
    print("")
    # print(json_data[0][0]['img_url'])
    # print(json_data[0][0]['tags'])
    print("")
    
    num = 200000
    outpath = "./"+tag+"/"

    # Create when directory does not exist
    if not os.path.isdir(outpath):
        os.makedirs(outpath)

    for item in json_data:
        # image url to download
        url = item[0]['img_url']
        
        # file path and file name to download
        outfile = str(num) + ".jpg"

        # download
        urllib.request.urlretrieve(url, outpath+outfile)

        #write
        result[str(num)] = {'tags': item[0]['tags']}
        num += 1

with open(f'./dataProcessed/{tag}.json', 'w', encoding='UTF-8') as f:
    json.dump(result, f, ensure_ascii = False)

print("complete!")