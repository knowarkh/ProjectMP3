import os
import json
import sys
import apt
from pprint import pprint

# Method to get the duration in second of the mp3file
# filename : the name of the file
def get_duration(filename):
    os.system('mediainfo --Inform="Audio;%Duration%" '+ repr(filename) + ' > musique.txt')
    duration = read_first_line('musique.txt')
    if duration == '':
        duration = 0
    else:
        duration = int(float(duration)/1000)
    pprint(duration)
    return duration

# Method that read and return the first line of a file
# filename : the name of the file
def read_first_line(filename):
    first_line = ''
    with open(filename) as file:
        first_line = file.readline()
    return first_line

# Method that found the smallest multiplier beetween to number
# a : the first number
# b : the second number
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
# filename : the name of the file
def get_file_content(filename):
    with open(filename) as content_file:
        content = json.loads(content_file.read())
        return content

# Method that turn the content of the json into a tab that contains all the curve value
# content : the table of all the value generated from the audiowaveform command
def remove_negative_value(content):
    i = 0
    y = 0
    content = content["data"]
    content_positive = content[0:len(content)/2]
    for i in range (0, len(content)):
        if i%2 != 0:
            content_positive[y] = content[i]
            y +=  1
    return content_positive

# Method that create the final tab from the value of the tab with only positive value
# content_positive : the table that contains all the positive value from the table generated using the audiowaveform command
# result : the number of value that need to be regrouped to get a final value for the final table
def get_final_tab(content_positive, result):
    final_content = content_positive[0:400]
    n = 0
    for i in range (0, 400):
        average = 0
        for y in range (0, result):
            average = average + content_positive[n]
            n += 1
        final_content[i] = average/result
    return final_content

# Method that make the user download the mandatory package for the script
def install_mandatory_packages ():
    cache = apt.Cache()
    try:
        if not cache['audiowaveform'].is_installed:
            os.system('sudo add-apt-repository -y ppa:chris-needham/ppa')
            os.system('sudo apt-get update')
            os.system('sudo apt-get install -y audiowaveform')
    except KeyError:
        os.system('sudo add-apt-repository -y ppa:chris-needham/ppa')
        os.system('sudo apt-get update')
        os.system('sudo apt-get install -y audiowaveform')

    try:
        if not cache['mediainfo'].is_installed:
            os.system('sudo apt-get install -y mediainfo')
    except KeyError:
        os.system('sudo apt-get install -y mediainfo')

# Main function that is launched at the beginning of the script
def main() :
    install_mandatory_packages()
    filename = sys.argv[1]
    duration = get_duration(filename)
    stick_number = 400
    pgcd_value = 0
    pgcd_value = pgcd(duration,stick_number)
    duration = duration * pgcd_value
    result = duration / stick_number
    os.system('touch musique.json')
    os.system('audiowaveform -i ' + repr(filename) + ' -o musique.json -b 8 --pixels-per-second ' + repr(int(pgcd_value)))
    content = get_file_content('musique.json')
    content_positive = remove_negative_value(content)
    contentFinal = get_final_tab(content_positive, result)
    content["data"] = contentFinal
    with open('musique.json', 'w') as outfile:
        json.dump(contentFinal, outfile)
    os.system('rm musique.txt')


main()
