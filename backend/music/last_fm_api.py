import requests
import json
import time
import random
from pprint import pprint
from itertools import combinations

def lastfm_get(payload):
    API_KEY = '552c5795a19b23b431b21d1b47c080e6'
    USER_AGENT = 'carrotww'

    headers = {'user-agent': USER_AGENT}
    url = 'https://ws.audioscrobbler.com/2.0/'

    # Add API key and format to the payload
    payload['api_key'] = API_KEY
    payload['format'] = 'json'

    response = requests.get(url, headers=headers, params=payload)
    return response


# def jprint(obj):
#     # create a formatted string of the Python JSON object
#     text = json.dumps(obj, sort_keys=True, indent=4)
#     print(text)

# test = {'method': 'chart.gettopartists'}
# temp = lastfm_get(test)
# jprint(temp.json()['artists']['@attr'])

def lookup_artist_tags(artist):
    response = lastfm_get({
        'method': 'artist.getTopTags',
        'artist':  artist
    })
    result = set()

    if response.status_code != 200:
        return None

    tags = [t['name'] for t in response.json()['toptags']['tag'][:3]]
    for ta in tags:
        result.add(ta)

    if not getattr(response, 'from_cache', False):
        time.sleep(0.25)
    return result

def lookup_all_tags():
    response = lastfm_get({
        'method': 'tag.getTopTags',
    })
    tags = [t['name'] for t in response.json()['toptags']['tag']]
    result = [x for x in tags]

    if response.status_code != 200:
        return None

    if not getattr(response, 'from_cache', False):
        time.sleep(0.25)

    return result

def lookup_similar_tag(tag):
    response = lastfm_get({
        'method': 'tag.getSimilar',
        'tag': tag
    })
    print(response.json())

    return

def lookup_taginfo_tag(tag):
    lang = 'kr'
    response = lastfm_get({
        'method': 'tag.getSimilar',
    })

    return response.json()

# tag 기반 음악 추천 함수
# + 검색 기능
def lookup_track_search(tag:list):
    # tag가 5개 들어옴
    recommend_music_list = []

    if len(tag) >= 2:
        tag_list = list(combinations(tag, 2))
        for i in tag_list:
            response = lastfm_get({
            'method': 'track.search',
            'track': i})
            recommend_all_list = [(x['artist'], x['name']) for x in response.json()['results']['trackmatches']['track']]
            recommend_music_list.append(random.choice(recommend_all_list))

        return recommend_music_list

    elif len(tag) == 1:
        response = lastfm_get({
        'method': 'track.search',
        'track': tag})
        search_result_list = [(x['artist'], x['name']) for x in response.json()['results']['trackmatches']['track'][0:5]]

        return search_result_list

def lookup_track_info(track_info:list):
    artist, track_name = track_info[0], track_info[1]
    response = lastfm_get({
        'method': 'track.search',
        'track': track_name,
        'artist': artist,
    })

    pprint(response.json()['results']['trackmatches']['track'][0])
    
    return

# print(lookup_artist_tags('버즈'))
# print(lookup_all_tags())
# print(lookup_similar_tag('spring'))
# temp = ['rock', 'jazz']
# print(lookup_track_search(['버즈', ' 트와이스', 'pop']))
# print(lookup_track_search(['버즈']))
# print(lookup_track_info(('Black Eyed Peas', 'Rock That Body')))