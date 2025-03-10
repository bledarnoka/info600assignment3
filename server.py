from flask import Flask, request, send_from_directory, make_response
 
import json
 
import uuid
 
from shutil import copyfile
 
 
 
app = Flask(__name__, static_url_path='')
 
 
 
# Main route to display form.html for the root index
 
 
 
 
 
@app.route('/')
 
def index():
 
    return send_from_directory('.', 'form.html')
 
 
 
 
 
# Routes for static resources
 
 
 
@app.route('/js/<path:path>')
 
def get_js(path):
 
    return send_from_directory('js', path)
 
 
 
 
 
@app.route('/css/<path:path>')
 
def get_css(path):
 
    return send_from_directory('css', path)
 
 
 
# Route to retrieve data file
 
@app.route('/data/<path:path>')
 
def get_data(path):
 
    return send_from_directory('data', path)
 
 
 
 
 
# HTTP actions for assignment 3
 
 
 
@app.route('/users', methods=['GET'])
 
def getUsers():
 
    with open('data/entries.json', 'r') as f:
 
        d = json.load(f)
 
        return(d)
 
 
 
 
 
@app.route('/users', methods=['POST','GET'])
 
def addUser():
 
    newId = uuid.uuid4().hex[:6]
 
 
 
    newUser = {
 
        "id": newId,
 
        "fullName": request.form.get("fullName"),
 
        "major": request.form.get("major"),
 
        "startYear": int(request.form.get("startYear"))
 
    }
 
 
 
    data = ''
 
    fileName = 'data/entries.json'
 
    with open(fileName, 'r') as f:
 
        # Read the JSON into a variable
 
        data = json.load(f)
 
 
 
        # Add a new record to the JSON
 
        data["records"].append(newUser)
 
 
 
    writeToFile(fileName, data)
 
 
 
 
 
@app.route('/user/<user_id>', methods=['DELETE'])
 
def deleteUser(user_id):
 
    data = ''
 
    fileName = 'data/entries.json'
 
    with open(fileName, 'r') as f:
 
        data = json.load(f)
 
 
 
    # Iterate through records, delete one that matches user id
 
    for i, record in enumerate(data["records"]):
 
        if record["id"] == user_id:
 
            del data["records"][i]
 
 
 
    writeToFile(fileName, data)
 
    return make_response('', 200)
 
 
 
 
 
def writeToFile(filePath, jsonString):
 
    with open(filePath, 'w') as f:
 
        # Write the modified list to file
 
        json.dump(jsonString, f, sort_keys=True, indent=4)
 
 
 
 
 
if __name__ == '__main__':
 
    # If you mess up your data, re-run the container and it will be restored
 
    copyfile('data/entries_orig.json', 'data/entries.json')
 
 
 
    app.run(host='0.0.0.0', port=8081, debug=True)
 
 
 
 
 
'''
 
Build the Docker image:
 
   docker image build -t assignment3 .
 
Run the Docker image:
 
   docker run --rm -it --mount src="$(pwd)",target=/app,type=bind -p 8081:8081 assignment3
 
'''