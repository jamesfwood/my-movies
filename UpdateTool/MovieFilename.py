# Module: MovieFilename.py
from datetime import datetime

# Find "space" character
def getSpace(str):

    count_dot = 0
    count_space = 0
    count_dash = 0

    for c in str:
        if c == '.':
            count_dot += 1
        if c == ' ':
            count_space += 1
        if c == '-':
            count_dash += 1

    if count_dot > count_space and count_dot > count_dash:
        return '.'
    if count_space > count_dot and count_space > count_dash:
        return ' '
    if count_dash > count_dot and count_dash > count_dot:
        return '-'
        
    return '.'


def findYearPosition(words):

    result = { 'Index': -1, 'Year': -999 }

    for i in range(len(words)):

        try:
            word = words[i]

            if i == len(words) - 1:
                word = word.replace('.mkv', '')

            if word.startswith('(') and word.endswith(')'):
                year = int(word[1:-1])
            else:
                year = int(word)

            if year > 1900 and year < datetime.now().year + 2:
                result['Index'] = i
                result['Year'] = year

                return result
          #      return [ i, year ]
        except ValueError:
            pass

    return result

# Check if filename contains resolution
# Example: 2003.Final.Destination.2.1920x1080.BDRip.x264.AC3.mkv
def findResolutionPosition(words):

    index = -1

    for i in range(len(words)):

        if '1920' in words[i] or '1080' in words[i] or '720' in words[i] or '2160' in words[i] or '3840' in words[i] or '4k' in words[i]:
            index = i

            return index

    return index


def getTitle(words, year):
    title = ''

    index = year['Index']
    if index != -1:
        if index != 0:
            for i in range(0, index):
                title += words[i].strip() + ' '
        else:
            # Starts with the year
            resIndex = findResolutionPosition(words)

            for i in range(1, resIndex):
                title += words[i].strip() + ' '

        title = title.strip()

    return title


def parse(filename):

    space = getSpace(filename)
    words = filename.split(space)

    data = findYearPosition(words)

    title = getTitle(words, data)

    #print("words", words)
    #print("yearData", yearData)
    print("title:", title)

    data['Title'] = title

    return data
