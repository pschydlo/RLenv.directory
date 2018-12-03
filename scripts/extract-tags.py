import json
from pprint import pprint
from operator import itemgetter
from collections import OrderedDict

ENV_FILE = '../site/data/envs.json'
TAG_FILE = '../site/data/tags.json'

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
        json.dump(tags, fp, indent=4)


with open(ENV_FILE) as f:
    data = json.load(f)

    tags = extract_tags(data)

    tags = OrderedDict(sorted(tags.items(), key=itemgetter(0), reverse=False))
    
    save_tags(tags, TAG_FILE)