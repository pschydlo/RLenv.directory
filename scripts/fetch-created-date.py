import json
from pprint import pprint
import sys
import requests
import collections
from operator import itemgetter

# Store your github API access credentials here to protect them from the interwebz.
import secret

ENV_FILE = '../site/data/envs.json'
ENV_OUT_FILE = '../site/data/envs.json'

def fetch_stars(envs):

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
        
        repo_info = requests.get(url)
        repo_info = repo_info.json()

        envs[i]['created_at'] = repo_info['created_at'] 

        log_txt = "\r{0}/{1}".format(i+1, len(envs))

        sys.stdout.write(log_txt)
        sys.stdout.flush()

    print(" ")
    return envs

def save_env(envs, ENV_OUT_FILE):
    with open(ENV_OUT_FILE, 'w') as fp:
        json.dump(envs, fp, indent=4)

def order_dict_keys(envs):
    ordered_envs = []
    
    for env in envs:
        ordered_env = [('name', env['name']), 
                       ('url', env['url']),
                       ('short_descr', env['short_descr']),
                       ('long_descr', env['long_descr']),
                       ('stars', env['stars']),
                       ('num_agents', env['num_agents']),
                       ('complexity', env['complexity']),
                       ('tags', env['tags']),
                       ('created_at', env['created_at'])]
        
        ordered_env = collections.OrderedDict(ordered_env)
        ordered_envs.append(ordered_env)
    
    return ordered_envs


with open(ENV_FILE) as f:
    data = json.load(f)

    envs = data['envs']

    # Iterate through environments and get updated star count from github
    envs = fetch_stars(envs)

    # Sort by environment name and define attribute order
    envs = sorted(envs, key=itemgetter('name')) 
    envs = order_dict_keys(envs)
    
    data_out = {}
    data_out['envs'] = envs
    
    save_env(data_out, ENV_OUT_FILE)