import json
from pprint import pprint

import requests

# Store your github API access credentials here to protect them from the interwebz.
import secret

ENV_FILE = '../data/envs.json'
ENV_OUT_FILE = '../data/envs_public.json'

def fetch_stars(json):
    
    
    envs = json['envs']


    for i in range(0, len(envs)):
        env = envs[i]
        repo_url = env['url']
        
        if "github.com" not in repo_url:
            continue

        url_pieces = repo_url.split("github.com")
        url_pieces = url_pieces[1].split('/')

        repo_user = url_pieces[1]
        repo_name = url_pieces[2]

        url = "https://api.github.com/repos/"+repo_user+"/"+repo_name+"?access_token="+secret.TOKEN        
        print(url)
        
        repo_info = requests.get(url)
        repo_info = repo_info.json()

        print(repo_info)

        envs[i]['stars'] = repo_info['stargazers_count']

    return envs

def save_env(envs, ENV_OUT_FILE):
    with open(ENV_OUT_FILE, 'w') as fp:
        json.dump(envs, fp)


with open(ENV_FILE) as f:
    data = json.load(f)

    data = fetch_stars(data)
    
    save_env(data, ENV_OUT_FILE)