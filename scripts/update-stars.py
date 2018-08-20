import json
from pprint import pprint

ENV_FILE = '../data/envs.json'
ENV_OUT_FILE = '../data/envs_out.json'

def extract_tags(json):
    tags = {}
    
    envs = json['envs']

    for env in envs:
        env_tags = env['tags']
        
        for tag in env_tags:
            if tag in tags.keys():
                tags[tag] = tags[tag] + 1
            else:
                tags[tag] = 1

    return tags

def save_tags(tags, TAG_FILE):
    with open(TAG_FILE, 'w') as fp:
        json.dump(tags, fp)


with open(ENV_FILE) as f:
    data = json.load(f)

    tags = extract_tags(data)
    
    save_tags(tags, TAG_FILE)