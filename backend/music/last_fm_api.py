import requests
import json
import time
import random
from pprint import pprint
from itertools import combinations
from bs4 import BeautifulSoup

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

def get_youtube_url(url):
    headers = {'User-Agent': 'Mozilla/5.0'}
    default_url = 'https://www.youtube.com'
    default_img = ''
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        html = response.text
        soup = BeautifulSoup(html, 'html.parser')
        try:
            result_url = soup.find('a', {'class': "image-overlay-playlink-link js-playlink"})['data-youtube-url']
        except:
            result_url = default_url
        try:
            result_image_url = soup.find('img', {'class': "video-preview"})['src']
        except:
            result_image_url = default_img
        return result_url, result_image_url
    else:
        return default_url, default_img

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
    result = response.json()

    return result

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
            temp = ' '.join(i)
            response = lastfm_get({
            'method': 'track.search',
            'track': temp})
            music_list = [(x['artist'], x['name'], x['url']) for x in response.json()['results']['trackmatches']['track']]
            recommend_music_list.append(random.choice(music_list))
        recommend_result_music = [(x[0], x[1], x[2]) for x in recommend_music_list]

        result_music = []
        for x in recommend_result_music:
            youtube_url, music_image = get_youtube_url(x[2])
            try:
                youtube_url = youtube_url.replace('watch?v=','embed/')
            except:
                pass
            result_music.append((x[0], x[1], x[2], youtube_url, music_image))

        return result_music

    elif len(tag) == 1:
        result_music = []
        response = lastfm_get({
        'method': 'track.search',
        'track': tag})
        music_list = [(x['artist'], x['name'], x['url']) for x in response.json()['results']['trackmatches']['track']][0:5]
        for x in music_list:
            youtube_url, music_image = get_youtube_url(x[2])
            try:
                youtube_url = youtube_url.replace('watch?v=','embed/')
            except:
                pass
            result_music.append((x[0], x[1], x[2], youtube_url, music_image))
        

        return result_music

def lookup_track_info(track_info:list):
    artist, track_name = track_info[0], track_info[1]
    response = lastfm_get({
        'method': 'track.search',
        'track': track_name,
        'artist': artist,
    })
    result = response.json()['results']['trackmatches']['track'][0]

    return result

# print(lookup_artist_tags('버즈'))
# print(lookup_all_tags())
# print(lookup_similar_tag('spring'))
# temp = ['rock', 'jazz']
# print(lookup_track_search(['rock', ' jazz', ' kpop']))
# print(lookup_track_search(['버즈']))
# print(lookup_track_info(('Black Eyed Peas', 'Rock That Body')))
