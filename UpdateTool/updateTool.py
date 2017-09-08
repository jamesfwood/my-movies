import os
from MediaInfoDLL import MediaInfo, Stream
import boto3
from boto3.dynamodb.conditions import Key, Attr
from datetime import datetime
import tmdbsimple as tmdb
import MovieFilename as movieFilename
from botocore.exceptions import ClientError
import xmltodict
from time import sleep
#from imdb import IMDb
import requests
from decimal import Decimal

tmdb.API_KEY = os.environ['TMDB_API_KEY']

#ia = IMDb()

# TODO
# Update IMDb vote score if changes
# Change database key to UUID??

def findFileInDb(items, str):
    for item in items:
        if item["filename"] == str:
            return True

    return False


def findFileNotWatchedInDb(items, str):
    for item in items:
        if item["filename"] == str and not item["watched"]:
            return True

    return False


#def getImdbDetails(imdb):
 #   details = { 'id': imdb.movieID, 'title': imdb['title'], 'year': imdb['year'], 'votes': imdb['votes'] }

  #  try:
 #       mpaa = imdb['mpaa']
  #      mpaa_arr = mpaa.split(" ", 2)

  #      if len(mpaa_arr) > 2:
  #          details['mpaa_rating'] = mpaa_arr[1]

  #      details['mpaa'] = mpaa
 #   except:
 #       pass

 #   details['full_size_cover_url'] = imdb['full-size cover url']
 #   details['rating'] = Decimal(repr(imdb['rating']))

 #   details['genres'] = []
 #   for genre in imdb['genres']:
 #       details['genres'].append(genre)

 #   details['directors'] = []
 #   for director in imdb['director']:
 #       details['directors'].append(director['name'])

#    details['writers'] = []
 #   for writer in imdb['writer']:
 #       details['writers'].append(writer['name'])

 #   return details


def removeEmpty(d):
    for k, v in d.items():
        if v == '' or v == None:
            del d[k]
        elif isinstance(v, dict):
            removeEmpty(v)


def getImdbDetails(imdb_id):

    r = requests.get('http://35.165.93.15:9000/imdb/api/v1.0/movie/' + imdb_id)

    if r.status_code == requests.codes.ok:
        imdb = r.json()

        imdb['rating'] = Decimal(repr(imdb['rating']))

        return imdb
        #imdb = json.loads(r.text)

        #return imdb
    else:
        print('Error:  Could not get Imdb for id ' + imdb_id)


# TODO: Figure out why:
#  To Be Takei
#  Indie Game: The Movie
# Failed to load IMDB data.  Their IMDB data is null.

def addToDb(table, filename, duration, mediaInfoXML, tmdbDetails):
    date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    try:
        mediaInfo = xmltodict.parse(mediaInfoXML)

        if tmdbDetails is not None:

            #imdb = ia.get_movie(tmdbDetails.imdb_id[2:])

            #imdbDetails = getImdbDetails(imdb)

            imdbDetails = getImdbDetails(tmdbDetails.imdb_id[2:])
            
            dictTmdb = tmdbDetails.__dict__
            dictTmdb['popularity'] = Decimal(repr(dictTmdb['popularity']))
            dictTmdb['vote_average'] = Decimal(repr(dictTmdb['vote_average']))

            removeEmpty(dictTmdb)

            del dictTmdb['production_countries']
            del dictTmdb['video']
            del dictTmdb['spoken_languages']
            del dictTmdb['adult']
            del dictTmdb['production_companies']

            table.put_item(
                Item = {
                    'userId': 'jamesfwood@hotmail.com',
                    'filename': filename,
          #          'title': imdb['title'],
          #          'mpaa': imdb['mpaa'],
           #         'year': imdb['year'],
                    'imdb': imdbDetails,
                    'duration': duration,
                    'tmdb': dictTmdb,
           #         'imdb_id': ids['imdb_id'],
            #        'tmdb_id': ids['tmdb_id'],
            #        'cover_url': imdb['full-size cover url'],
                    'watched': False,
                    'mediaInfo': mediaInfo,
                    "created": date,
                    "updated": date
                }
            )
        else:
            table.put_item(
                Item = {
                    'userId': 'jamesfwood@hotmail.com',
                    'filename': filename,
                    'duration': duration,
                    'watched': False,
                    'mediaInfo': mediaInfo,
                    "created": date,
                    "updated": date
                }
            )

        print("Added {} to database".format(filename))

    except ClientError as e:
        print(e.response['Error']['Message'])


def convertMillis(millis):
    x = millis / 1000
    seconds = int(x % 60)
    x /= 60
    minutes = int(x % 60)
    x /= 60
    hours = int(x)

    return (hours, minutes, seconds)


def findBestMatch(search_results, duration):
    
    #result = { 'imdb_id': -1, 'tmdb_id': -1 }
    #result = {}

    #id = -1
    if len(search_results) == 1:
        for s in search_results:
            movie = tmdb.Movies(s['id'])
            response = movie.info()

            #result['tmdb'] = movie

            return movie

         #   result['tmdb_id'] = movie.id
          #  result['imdb_id'] = movie.imdb_id
            #id = s['id']
    else:
        try:
            # If search_results return more than 8, then it may be a mismatch
            #if len(search_results) > 8:
            #    return result

            # Try to find best match, len(result) > 1
            duration_min = duration / 1000 / 60         # convert miliseconds to minutes

            bestIndex = -1
            timeDiff = -1

            for i in range(0, len(search_results)):

                movie = tmdb.Movies(search_results[i]['id'])
                response = movie.info()

                if movie.runtime != None:
                    try:
                        runtime = int(movie.runtime)

                        if i == 0 or abs(duration_min - runtime) < timeDiff:
                            bestIndex = i
                            timeDiff = abs(duration_min - runtime)

                    except ValueError:
                        print("Runtime not avaiable", movie)

            if bestIndex != -1 and timeDiff < 2:
                #id = search_results[bestIndex]['id']
                movie = tmdb.Movies(search_results[bestIndex]['id'])
                response = movie.info()

                #result['tmdb_id'] = movie.id
                #result['imdb_id'] = movie.imdb_id
                return movie

        except Exception as e:
            print("Unexpected error in findBestMatch", e)
            print("search_results", search_results)
            print("duration", duration)
            #id = -1
            #result['tmdb_id'] = -1
            #result['imdb_id'] = -1

    return None

def updateMovieWatched(filename):

    date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    userId = 'jamesfwood@hotmail.com'
    
    table.update_item(
        Key={
            'userId': userId,
            'filename': filename
            },
            UpdateExpression='SET watched = :val1, updated = :val2',
            ExpressionAttributeValues = { ':val1': True, ':val2': date }
    )

    print("Marked {} as watched!".format(filename))


def updateWatched(dir):
    
    print("Processing dir (Update Watched): " + dir)

    # traverse root directory, and list directories as dirs and files as files
    for root, dirs, files in os.walk(dir):

        for file in files:
            try:
                filename = os.path.join(root, file)
                #print("Processing file: " + filename)

                if findFileNotWatchedInDb(items, file) is True:
                    updateMovieWatched(file)
            except Exception as e:
                print("Unexpected error:", e)


def loadMovies(dir):

    print("Processing dir: " + dir)

    # traverse root directory, and list directories as dirs and files as files
    for root, dirs, files in os.walk(dir):

        for file in files:
            try:
                filename = os.path.join(root, file)

                #print("Processing file: " + filename)

                if findFileInDb(items, file) == False:

                    mediaInfo.Open(filename)

                    duration_string = mediaInfo.Get(Stream.Video, 0, "Duration")

                    if duration_string != '':
                        
                        #mediaInfo.Option("Inform", "MAXML")
                        #print(mediaInfo.Inform())
                        #mediaInfo.Option("Inform", "MIXML")
                        #print(mediaInfo.Inform())
                        try:
                            duration = int(float(duration_string))

                            if duration > 900000:
                                con_hour, con_min, con_sec = convertMillis(duration)

                                print("{0}h {1}min {2}sec".format(con_hour, con_min, con_sec))

                                titleDict = movieFilename.parse(file)

                                #ids = { 'imdb_id': -1, 'tmdb_id': -1 }
                                tmdbDetails = None
                                if titleDict['Title'] != '' and titleDict['Index'] != -1:
                                    search = tmdb.Search()
                                    movie = search.movie(query=titleDict['Title'], year=titleDict['Year'], include_adult=False)
                                    tmdbDetails = findBestMatch(search.results, duration)

                                mediaInfo.Option("Inform", "XML")

                                addToDb(table, file, duration, mediaInfo.Inform(), tmdbDetails)

                                # Delay to not overload TheMovieDb API
                                sleep(5)
                        except ValueError:
                            print("Error reading duration")
                        except Exception as e:
                            print("Unexpected error (duration_string):", e)

                    mediaInfo.Close()
            except Exception as e:
                print("Unexpected error:", e)



if __name__ == '__main__':
    print("Starting my update tool!")

    dynamodb = boto3.resource('dynamodb')

    # Instantiate a table resource object without actually
    # creating a DynamoDB table. Note that the attributes of this table
    # are lazy-loaded: a request is not made nor are the attribute
    # values populated until the attributes
    # on the table resource are accessed or its load() method is called.
    table = dynamodb.Table('movies')

    # Print out some data about the table.
    # This will cause a request to be made to DynamoDB and its attribute
    # values will be set based on the response.
    #print(table.creation_date_time)

    response = table.scan(
        FilterExpression=Attr('userId').eq('jamesfwood@hotmail.com'),
        ProjectionExpression='filename, watched'
    )
    items = response['Items']

    while 'LastEvaluatedKey' in response:
        response = table.scan(
            FilterExpression=Attr('userId').eq('jamesfwood@hotmail.com'),
            ProjectionExpression='filename, watched',
            ExclusiveStartKey=response['LastEvaluatedKey']
        )

        for i in response['Items']:
            items.append(i)

    mediaInfo = MediaInfo()

    print("The current time is ", datetime.now().strftime('%Y-%m-%d %H:%M:%S'))

    loadMovies('F:\\Media Library\\Movies\\New')
    loadMovies('G:\\Media Library\\Movies\\New')
    loadMovies('H:\\Media Library\\Movies\\New')

    print("Done loading movies!!")

    updateWatched('F:\\Media Library\\Movies\\New\\_Done')
    updateWatched('G:\\Media Library\\Movies\\New\\_Done')
    updateWatched('H:\\Media Library\\Movies\\New\\_Done')

    print("Done updating watched movies!!")
