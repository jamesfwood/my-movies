import sys
from imdb import IMDb
from decimal import Decimal
import json

# TODO: Make this into a common libray to share with updateTool.py
def getImdbDetails(imdb):
    details = { 'id': imdb.movieID, 'title': imdb['title'], 'year': imdb['year'], 'votes': imdb['votes'] }

    try:
        mpaa = imdb['mpaa']
        mpaa_arr = mpaa.split(" ", 2)

        if len(mpaa_arr) > 2:
            details['mpaa_rating'] = mpaa_arr[1]

        details['mpaa'] = mpaa
    except:
        pass

    details['full_size_cover_url'] = imdb['full-size cover url']
    details['rating'] = imdb['rating']
    
    details['genres'] = []
    for genre in imdb['genres']:
        details['genres'].append(genre)

    details['directors'] = []
    for director in imdb['director']:
        details['directors'].append(director['name'])

    details['writers'] = []
    for writer in imdb['writer']:
        details['writers'].append(writer['name'])

    return details



if __name__ == '__main__':
    #print("Starting my update tool!")
    id = sys.argv[1]

    ia = IMDb()

    imdb = ia.get_movie(id)

    results = getImdbDetails(imdb)

    #results = { 'id': 34344, 'title': 'Allied' }

    #print(str(results))
    r = json.dumps(results)
    #sys.stdout.write(r)
    #sys.stdout.write(str(r))
    print(r)
    #sys.stdout.flush()
  #  sys.exit(0)