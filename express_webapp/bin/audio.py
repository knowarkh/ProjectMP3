import os
import json
import sys
from pprint import pprint
#os.system('sudo apt-get install audiowaveform')
#os.system('sudo apt-get install mp3info')

# Method to get the duration in second of the mp3file
def getDuration(filename):
    os.system('mediainfo --Inform="Audio;%Duration%" '+ repr(filename) + ' > musique.txt')
    duration = readFirstLine('musique.txt')
    if duration == '':
        duration = 0
    else:
        duration = int(float(duration)/1000)
    print duration
    return duration

# Fonction qui permet de lire la premiere ligne d'un fichier
# Parametre : nom du fichier
def readFirstLine(nomFichier):
    firstLine = ''
    with open(nomFichier) as fichier:
        firstLine = fichier.readline()
    return firstLine

# Fonction qui permet de retourner le PGCD des deux nombres en parametre
def pgcd(a,b):
	rep=0
	if b==0:
		rep=a
	elif b == 1:
			rep=400
	else:
		r=a%b
		rep=pgcd(b,r)
	return rep

# Method used to retrieve the content of the file as a Tab
def getFileContent(filename):
    with open(filename) as content_file:
        content = json.loads(content_file.read())
        contentData = content["data"]
        # pprint(content)
        return content

# Method that turn the content of the json into a tab that contains all the curve value
def removeNegativeValue(content):
    i = 0
    y = 0
    content = content["data"]
    contentPositive = content[0:len(content)/2]
    for i in range (0, len(content)):
        if i%2 != 0:
            contentPositive[y] = content[i]
            y +=  1
    # pprint(contentPositive)
    # pprint(len(contentPositive))
    return contentPositive

# Create the final tab from the value of the tab with only positive value
def getFinalTab(contentPositive, result):
    finalContent = contentPositive[0:400]
    n = 0
    for i in range (0, 400):
        average = 0
        for y in range (0, result):
            average = average + contentPositive[n]
            n += 1
        finalContent[i] = average/result
    pprint(finalContent)
    pprint(len(finalContent))
    return finalContent

# Main function that is launched at the start
def main() :
    filename = sys.argv[1]
    duration = getDuration(filename)
    stickNumber = 400
    pgcdValue = 0
    pgcdValue = pgcd(duration,stickNumber)
    duration = duration * pgcdValue
    # print "Apres multiplication on obtient  " + repr(duration)
    result = duration / stickNumber
    #print "On recupere 1 point tout les " + repr(resultat) + "points"
    os.system('audiowaveform -i ' + repr(filename) + ' -o musique.json -b 8 --pixels-per-second ' + repr(int(pgcdValue)))
    content = getFileContent('musique.json')
    contentPositive = removeNegativeValue(content)
    contentFinal = getFinalTab(contentPositive, result)
    content["data"] = contentFinal
    with open('musique.json', 'w') as outfile:
        json.dump(contentFinal, outfile)

main()
# os.system('rm musique.txt')
